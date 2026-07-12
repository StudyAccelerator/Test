/* The tracker scheduling engine. Pure functions, no DOM, so it can be unit
   tested in node and reused by the live capacity meter, the plan renderer,
   the print sheet and the PNG export.

   Design rules (these are the product, do not weaken them):
   - Demand driven: schedules exactly the dose each topic's rating needs.
     It never fills spare hours with extra sessions. Free time stays free.
   - Full cycle or parked: a Struggling or Shaky topic is only scheduled if
     its whole retrieval cycle fits inside the week. A 90 minute deep block
     with no follow up retrieval is restudy in disguise, so it never happens.
   - Hard caps, matching Waleed's published guidance: at most ~6 focused
     hours a day on free days, ~2.5 on school days, deep blocks steered to
     free days, and 30 minutes of wind down before bed.
   - Weakest first: Struggling topics claim the week before Shaky, Shaky
     before Solid. What does not fit is parked, never silently dropped. */

import {
  DOSES,
  TECHNIQUES,
  doseFullMins,
  type DoseStep,
  type Rating,
  type SessionType,
} from './techniques'

export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

export type TopicInput = {
  subject: string
  topic: string
  rating: Rating
}

export type Commitment = {
  day: number // 0 = Monday
  startMin: number
  endMin: number
  label: string
}

export type WeekSettings = {
  wakeMin: number
  sleepMin: number // may be past midnight (smaller than wakeMin)
  breakfastMin: number
  lunchMin: number
  dinnerMin: number
  commitments: Commitment[] // school already expanded into per-day commitments
}

export type PlacedEvent = {
  startMin: number
  endMin: number
  kind: SessionType | 'freestyle' | 'meal' | 'fixed' | 'break' | 'free'
  subject?: string
  topic?: string
  label?: string
}

export type DayPlan = {
  dayIndex: number
  dayName: string
  events: PlacedEvent[]
  studyMins: number
}

/* How much of the ideal dose a topic received:
   full = the ideal spaced cycle; compressed = complete cycle, tighter spacing;
   starter = blurt + next day recall, spaced review carries to next week;
   single = one maintenance recall (solid topics only) */
export type Coverage = 'full' | 'compressed' | 'starter' | 'single'

export type ScheduledTopic = TopicInput & {
  sessions: { day: number; type: SessionType }[]
  coverage: Coverage
}

export type PlanResult = {
  days: DayPlan[]
  scheduled: ScheduledTopic[]
  parked: TopicInput[]
  papers: { subject: string; day: number }[] // one timed paper per subject, when the week has room
  availableStudyMins: number // week's capped, usable study capacity
  usedStudyMins: number
  sessionCount: number
}

/* The label a timed paper session carries in place of a topic */
export const PAPER_TOPIC = 'Past paper questions'

const WIND_DOWN = 30
/* Meals are proper pauses, not pit stops: a full hour for lunch and dinner
   splits the day into three natural working blocks */
const BREAKFAST_MINS = 30
const LUNCH_MINS = 60
const DINNER_MINS = 60
/* A freestyle block: an hour of the student's own choosing, added only when a
   working day still has spare capacity under the daily ceiling */
const FREESTYLE_MINS = 60
const FREESTYLE_BREAK = 15
const FREE_DAY_CAP = 360 // 6h of study, the published "hours past six add almost nothing" line
const SCHOOL_DAY_CAP = 150 // 2.5h after a full school day
const SCHOOL_DAY_THRESHOLD = 4 * 60 // a day with 4h+ of fixed daytime commitments is a school-pattern day
const MAX_BLURTS_FREE_DAY = 3 // three deep blocks a day, the blog's exam season shape
const MAX_BLURTS_SCHOOL_DAY = 1

type Interval = { start: number; end: number }

type DayCapacity = {
  intervals: Interval[] // free gaps between wake, meals, commitments, wind down
  remaining: number[] // remaining minutes per interval (mirrors intervals)
  studyLeft: number // remaining study minutes under the day cap
  blurtsLeft: number
  isSchoolDay: boolean
  sessions: { type: SessionType; subject: string; topic: string; intervalIdx: number }[]
}

function cutoffMin(s: WeekSettings): number {
  const rawCutoff = s.sleepMin > s.wakeMin ? s.sleepMin : s.sleepMin + 1440
  return rawCutoff - WIND_DOWN
}

/* Meals and commitments for one day, merged and clipped to the waking window */
function dayBlockers(s: WeekSettings, day: number): { start: number; end: number; kind: 'meal' | 'fixed'; label: string }[] {
  const cutoff = cutoffMin(s)
  const raw: { start: number; end: number; kind: 'meal' | 'fixed'; label: string }[] = []
  for (const c of s.commitments) {
    if (c.day !== day) continue
    const start = Math.max(c.startMin, s.wakeMin)
    const end = Math.min(c.endMin, cutoff)
    if (end > start) raw.push({ start, end, kind: 'fixed', label: c.label })
  }
  const meals: [number, string, number][] = [
    [s.breakfastMin, 'Breakfast', BREAKFAST_MINS],
    [s.lunchMin, 'Lunch', LUNCH_MINS],
    [s.dinnerMin, 'Dinner', DINNER_MINS],
  ]
  for (const [t, label, dur] of meals) {
    if (t < s.wakeMin || t + dur > cutoff) continue
    // commitments win over meals
    const clash = raw.some((b) => t < b.end && t + dur > b.start)
    if (!clash) raw.push({ start: t, end: t + dur, kind: 'meal', label })
  }
  raw.sort((a, b) => a.start - b.start)
  // merge overlapping fixed blocks
  const merged: typeof raw = []
  for (const b of raw) {
    const last = merged[merged.length - 1]
    if (last && b.start < last.end) {
      last.end = Math.max(last.end, b.end)
      if (b.kind === 'fixed') last.kind = 'fixed'
    } else {
      merged.push({ ...b })
    }
  }
  return merged
}

function buildDayCapacity(s: WeekSettings, day: number): DayCapacity {
  const cutoff = cutoffMin(s)
  const blockers = dayBlockers(s, day)
  const intervals: Interval[] = []
  let cursor = s.wakeMin
  for (const b of blockers) {
    if (b.start > cursor) intervals.push({ start: cursor, end: b.start })
    cursor = Math.max(cursor, b.end)
  }
  if (cutoff > cursor) intervals.push({ start: cursor, end: cutoff })
  const usable = intervals.filter((iv) => iv.end - iv.start >= 30)
  const fixedDaytime = blockers
    .filter((b) => b.kind === 'fixed' && b.start < 17 * 60)
    .reduce((sum, b) => sum + (b.end - b.start), 0)
  const isSchoolDay = fixedDaytime >= SCHOOL_DAY_THRESHOLD
  return {
    intervals: usable,
    remaining: usable.map((iv) => iv.end - iv.start),
    studyLeft: isSchoolDay ? SCHOOL_DAY_CAP : FREE_DAY_CAP,
    blurtsLeft: isSchoolDay ? MAX_BLURTS_SCHOOL_DAY : MAX_BLURTS_FREE_DAY,
    isSchoolDay,
    sessions: [],
  }
}

/* Can this day host a session of this type right now? Returns the interval
   index it would use, or -1. */
function findSlot(cap: DayCapacity, type: SessionType, subject: string, topic: string): number {
  const dur = TECHNIQUES[type].mins
  if (cap.studyLeft < dur) return -1
  if (type === 'blurt' && cap.blurtsLeft < 1) return -1
  // one session per topic per day keeps the spacing honest
  if (cap.sessions.some((sess) => sess.topic === topic && sess.subject === subject)) return -1
  for (let i = 0; i < cap.remaining.length; i++) {
    // require room for the session; the break after it can shrink at an interval's end
    if (cap.remaining[i] >= dur) return i
  }
  return -1
}

function takeSlot(cap: DayCapacity, type: SessionType, subject: string, topic: string, intervalIdx: number) {
  const t = TECHNIQUES[type]
  cap.remaining[intervalIdx] = Math.max(0, cap.remaining[intervalIdx] - (t.mins + t.breakAfter))
  cap.studyLeft -= t.mins
  if (type === 'blurt') cap.blurtsLeft -= 1
  cap.sessions.push({ type, subject, topic, intervalIdx })
}

/* Order topics weakest tier first; inside a tier, round robin across subjects
   in the order the student entered them, so one subject cannot hog the week. */
export function orderTopics(topics: TopicInput[]): TopicInput[] {
  const tiers: Rating[] = ['struggling', 'shaky', 'solid']
  const out: TopicInput[] = []
  for (const tier of tiers) {
    const bySubject = new Map<string, TopicInput[]>()
    for (const t of topics) {
      if (t.rating !== tier) continue
      const list = bySubject.get(t.subject) ?? []
      list.push(t)
      bySubject.set(t.subject, list)
    }
    let took = true
    while (took) {
      took = false
      for (const list of bySubject.values()) {
        const next = list.shift()
        if (next) {
          out.push(next)
          took = true
        }
      }
    }
  }
  return out
}

/* Latest anchor day that still lets the full dose finish inside the week */
function latestAnchor(rating: Rating): number {
  const steps = DOSES[rating]
  const lastStep = steps[steps.length - 1]
  const earliestLastOffset = Math.min(lastStep.offset, ...lastStep.fallbacks.filter((f) => f > 0))
  return 6 - earliestLastOffset
}

type Attempt = { day: number; type: SessionType; intervalIdx: number }

/* Compressed but still complete cycle used to rescue weak topics that cannot
   fit their full dose: blurt, recall the next day, review a couple of days
   on. Tighter spacing than the ideal, but every deep block keeps retrieval
   follow up, which is the rule that matters. */
const RESCUE_DOSE: DoseStep[] = [
  { type: 'blurt', offset: 0, fallbacks: [] },
  { type: 'recall', offset: 1, fallbacks: [2] },
  { type: 'review', offset: 2, fallbacks: [3, 4] },
]

/* Late week starter: the blurt and its next day recall happen this week, the
   spaced review lands at the top of next week's rebuilt plan. The deep block
   still gets retrieval follow up, which is the non negotiable. */
const STARTER_DOSE: DoseStep[] = [
  { type: 'blurt', offset: 0, fallbacks: [] },
  { type: 'recall', offset: 1, fallbacks: [] },
]

/* Try to place a dose. Returns the placements or null. Does not mutate
   capacity unless the whole dose fits. */
function tryPlaceDose(caps: DayCapacity[], topic: TopicInput, anchor: number, steps: DoseStep[]): Attempt[] | null {
  const attempts: Attempt[] = []
  // simulate on cheap copies of the counters
  const sim = caps.map((c) => ({
    remaining: [...c.remaining],
    studyLeft: c.studyLeft,
    blurtsLeft: c.blurtsLeft,
    topics: c.sessions.map((sess) => `${sess.subject}|${sess.topic}`),
  }))
  for (const step of steps) {
    const tech = TECHNIQUES[step.type]
    const tryDays = [step.offset, ...step.fallbacks]
      .map((off) => anchor + off)
      .filter((d) => d >= 0 && d <= 6)
    let placed = false
    for (const d of tryDays) {
      const simDay = sim[d]
      if (simDay.studyLeft < tech.mins) continue
      if (step.type === 'blurt' && simDay.blurtsLeft < 1) continue
      if (simDay.topics.includes(`${topic.subject}|${topic.topic}`)) continue
      const idx = simDay.remaining.findIndex((r) => r >= tech.mins)
      if (idx < 0) continue
      simDay.remaining[idx] = Math.max(0, simDay.remaining[idx] - (tech.mins + tech.breakAfter))
      simDay.studyLeft -= tech.mins
      if (step.type === 'blurt') simDay.blurtsLeft -= 1
      simDay.topics.push(`${topic.subject}|${topic.topic}`)
      attempts.push({ day: d, type: step.type, intervalIdx: idx })
      placed = true
      break
    }
    if (!placed) return null
  }
  return attempts
}

/* Assign every topic's dose to days (not times yet). Weakest first; deep
   blocks prefer free days; whole cycle fits or the topic is parked. */
function assignWeek(s: WeekSettings, topics: TopicInput[]) {
  const caps = Array.from({ length: 7 }, (_, d) => buildDayCapacity(s, d))
  const ordered = orderTopics(topics)
  const scheduled: ScheduledTopic[] = []
  const parked: TopicInput[] = []

  function anchorOrder(topic: TopicInput, maxAnchor: number, needsBlurt: boolean): number[] {
    // candidate anchors: free days first for deep blocks, then days with the
    // least of this subject already (variety), then lightest load, then earliest
    return Array.from({ length: maxAnchor + 1 }, (_, d) => d).sort((a, b) => {
      const capA = caps[a]
      const capB = caps[b]
      if (needsBlurt && capA.isSchoolDay !== capB.isSchoolDay) return capA.isSchoolDay ? 1 : -1
      const subjA = capA.sessions.filter((sess) => sess.subject === topic.subject).length
      const subjB = capB.sessions.filter((sess) => sess.subject === topic.subject).length
      if (subjA !== subjB) return subjA - subjB
      const loadA = capA.sessions.length
      const loadB = capB.sessions.length
      if (loadA !== loadB) return loadA - loadB
      return a - b
    })
  }

  function placeWithDose(topic: TopicInput, steps: DoseStep[], maxAnchor: number): Attempt[] | null {
    const needsBlurt = steps[0].type === 'blurt'
    for (const anchor of anchorOrder(topic, maxAnchor, needsBlurt)) {
      const placed = tryPlaceDose(caps, topic, anchor, steps)
      if (placed) return placed
    }
    return null
  }

  function commit(topic: TopicInput, placed: Attempt[], coverage: Coverage) {
    for (const a of placed) takeSlot(caps[a.day], a.type, topic.subject, topic.topic, a.intervalIdx)
    scheduled.push({ ...topic, sessions: placed.map((a) => ({ day: a.day, type: a.type })), coverage })
  }

  for (const topic of topics.length ? ordered : []) {
    const placed = placeWithDose(topic, DOSES[topic.rating], latestAnchor(topic.rating))
    if (placed) commit(topic, placed, 'full')
    else parked.push(topic)
  }

  // rescue pass: weak topics whose ideal dose did not fit get the compressed
  // cycle before they are parked, weakest first
  for (const topic of [...parked]) {
    if (topic.rating === 'solid') continue
    const placed = placeWithDose(topic, RESCUE_DOSE, 4)
    if (placed) {
      commit(topic, placed, 'compressed')
      parked.splice(parked.indexOf(topic), 1)
    }
  }

  // starter pass: a weak topic that still has no home gets its cycle STARTED
  // late in the week (blurt plus next day recall); the spaced review leads
  // next week's rebuilt plan. Better than parking it while Saturday sits empty.
  for (const topic of [...parked]) {
    if (topic.rating === 'solid') continue
    const placed = placeWithDose(topic, STARTER_DOSE, 5)
    if (placed) {
      commit(topic, placed, 'starter')
      parked.splice(parked.indexOf(topic), 1)
    }
  }

  // a solid topic that cannot fit its pair still earns a single recall
  for (const topic of [...parked]) {
    if (topic.rating !== 'solid') continue
    for (let d = 0; d <= 6; d++) {
      const idx = findSlot(caps[d], 'recall', topic.subject, topic.topic)
      if (idx >= 0) {
        commit(topic, [{ day: d, type: 'recall', intervalIdx: idx }], 'single')
        parked.splice(parked.indexOf(topic), 1)
        break
      }
    }
  }

  // timed paper pass: the blog's weekly cycle ends with a test, so each
  // subject with enough on the plan earns one mixed past paper session under
  // exam conditions, once that subject has been introduced. Free days first.
  const papers: { subject: string; day: number }[] = []
  const subjectsInPlan = [...new Set(scheduled.map((t) => t.subject))]
  for (const subject of subjectsInPlan) {
    const subjectTopics = scheduled.filter((t) => t.subject === subject)
    if (subjectTopics.length < 2) continue
    const firstDay = Math.min(...subjectTopics.flatMap((t) => t.sessions.map((sess) => sess.day)))
    const blurtDays = subjectTopics.flatMap((t) => t.sessions.filter((sess) => sess.type === 'blurt').map((sess) => sess.day))
    const lastBlurt = blurtDays.length ? Math.max(...blurtDays) : firstDay
    const candidatesAfter = (cutoffDay: number) =>
      Array.from({ length: 7 }, (_, d) => d)
        .filter((d) => d > cutoffDay)
        .sort((a, b) => {
          if (caps[a].isSchoolDay !== caps[b].isSchoolDay) return caps[a].isSchoolDay ? 1 : -1
          return caps[b].studyLeft - caps[a].studyLeft
        })
    // ideally the paper tests the week's material, so it follows the last deep
    // block; if nothing fits there, any day after the subject's introduction
    let placed = false
    for (const cutoff of lastBlurt > firstDay ? [lastBlurt, firstDay] : [firstDay]) {
      for (const d of candidatesAfter(cutoff)) {
        const idx = findSlot(caps[d], 'paper', subject, PAPER_TOPIC)
        if (idx >= 0) {
          takeSlot(caps[d], 'paper', subject, PAPER_TOPIC, idx)
          papers.push({ subject, day: d })
          placed = true
          break
        }
      }
      if (placed) break
    }
  }

  // top up pass: if hours remain, the weakest topics earn extra work rather
  // than leaving half the weekend idle. One blurt per topic per week is a
  // SOFT rule: a struggling topic can earn a second Blurt and Fix at least
  // two days after its first (a genuine spaced re-visit of the gaps), and a
  // shaky topic can too once everything weaker is served. Bounded per topic,
  // always after the topic's introduction, never twice in a day.
  const topupRounds: { rating: Rating; type: SessionType }[] = [
    { rating: 'struggling', type: 'blurt' },
    { rating: 'struggling', type: 'recall' },
    { rating: 'shaky', type: 'recall' },
    { rating: 'struggling', type: 'review' },
    { rating: 'shaky', type: 'blurt' },
    { rating: 'shaky', type: 'review' },
  ]
  for (const round of topupRounds) {
    for (const t of scheduled) {
      if (t.rating !== round.rating || t.sessions.length < 2) continue
      const firstDay = Math.min(...t.sessions.map((sess) => sess.day))
      if (round.type === 'blurt') {
        // second deep visit only: max two blurts per topic per week
        if (t.sessions.filter((sess) => sess.type === 'blurt').length >= 2) continue
      }
      const blurtDaysOfTopic = t.sessions.filter((sess) => sess.type === 'blurt').map((sess) => sess.day)
      const minDay = round.type === 'blurt' && blurtDaysOfTopic.length ? Math.max(...blurtDaysOfTopic) + 2 : firstDay + 1
      // spread onto the day with the most room, after the topic's introduction
      const candidates = Array.from({ length: 7 }, (_, d) => d)
        .filter((d) => d >= minDay && !t.sessions.some((sess) => sess.day === d))
        .sort((a, b) => caps[b].studyLeft - caps[a].studyLeft)
      for (const d of candidates) {
        const idx = findSlot(caps[d], round.type, t.subject, t.topic)
        if (idx >= 0) {
          takeSlot(caps[d], round.type, t.subject, t.topic, idx)
          t.sessions.push({ day: d, type: round.type })
          break
        }
      }
    }
  }

  // freestyle pass: a working day with a decent gap left gets one OPTIONAL
  // open hour of the student's own choosing. It sits on top of the six
  // focused hours rather than inside them (light work or even a proper break,
  // so a day can nudge past the cap, but never by more than this one block).
  // Days with fewer than two sessions stay light on purpose.
  const freestyleDays: number[] = []
  for (let d = 0; d < 7; d++) {
    const cap = caps[d]
    if (cap.sessions.length < 2) continue
    const idx = cap.remaining.findIndex((r) => r >= FREESTYLE_MINS + FREESTYLE_BREAK)
    if (idx < 0) continue
    cap.remaining[idx] = Math.max(0, cap.remaining[idx] - (FREESTYLE_MINS + FREESTYLE_BREAK))
    freestyleDays.push(d)
  }

  // keep the audit honest: scheduled list in weakest first order
  const tierRank: Record<Rating, number> = { struggling: 0, shaky: 1, solid: 2 }
  scheduled.sort((a, b) => tierRank[a.rating] - tierRank[b.rating])
  return { caps, scheduled, parked, papers, freestyleDays }
}

/* Lay one day's assigned sessions onto the clock. Deep blocks first (peak
   energy), then recalls, then reviews, switching subjects between sessions
   where possible to keep the student fresh. */
function layoutDay(s: WeekSettings, day: number, cap: DayCapacity, hasFreestyle: boolean): DayPlan {
  const cutoff = cutoffMin(s)
  const blockers = dayBlockers(s, day)
  const events: PlacedEvent[] = blockers.map((b) => ({
    startMin: b.start,
    endMin: b.end,
    kind: b.kind,
    label: b.label,
  }))

  type QueueItem = { type: SessionType | 'freestyle'; subject: string; topic: string }
  const itemMins = (q: QueueItem) => (q.type === 'freestyle' ? FREESTYLE_MINS : TECHNIQUES[q.type].mins)
  const itemBreak = (q: QueueItem) => (q.type === 'freestyle' ? FREESTYLE_BREAK : TECHNIQUES[q.type].breakAfter)

  const queue: QueueItem[] = cap.sessions.map((sess) => ({ type: sess.type, subject: sess.subject, topic: sess.topic }))
  if (hasFreestyle) queue.push({ type: 'freestyle', subject: '', topic: '' })

  /* Deep blocks first while the head is fresh, papers next, then recall and
     review, with the open freestyle hour at the tail of the day */
  const pickOrder: (SessionType | 'freestyle')[] = ['blurt', 'paper', 'recall', 'review', 'freestyle']
  let lastSubject = ''
  function pickFit(room: number): number {
    for (const t of pickOrder) {
      const candidates = queue
        .map((q, i) => ({ q, i }))
        .filter(({ q }) => q.type === t && itemMins(q) <= room)
      if (!candidates.length) continue
      const differ = candidates.find(({ q }) => q.subject !== lastSubject && q.subject !== '')
      return (differ ?? candidates[0]).i
    }
    return -1
  }

  /* The day's open segments, divided by meals and commitments. Sessions are
     spread across them in proportion to their size, so a full day breathes
     between morning, afternoon and evening instead of packing the morning
     and dumping all the slack at the end. */
  const segments: { start: number; end: number }[] = []
  {
    let segCursor = s.wakeMin
    for (const b of blockers) {
      if (b.start > segCursor) segments.push({ start: segCursor, end: b.start })
      segCursor = Math.max(segCursor, b.end)
    }
    if (cutoff > segCursor) segments.push({ start: segCursor, end: cutoff })
  }
  const openTime = segments.reduce((sum, seg) => sum + (seg.end - seg.start), 0)
  const queueLoad = queue.reduce((sum, q) => sum + itemMins(q) + itemBreak(q), 0)
  const fillFraction = Math.min(1, (queueLoad * 1.08) / Math.max(1, openTime))

  let studyMins = 0
  const segCursors = segments.map((seg) => seg.start)

  function placeInSegment(si: number, targetMins: number) {
    const seg = segments[si]
    let used = segCursors[si] - seg.start
    while (queue.length && used < targetMins) {
      const room = seg.end - segCursors[si]
      const idx = pickFit(room)
      if (idx < 0) break
      const [item] = queue.splice(idx, 1)
      const mins = itemMins(item)
      events.push({
        startMin: segCursors[si],
        endMin: segCursors[si] + mins,
        kind: item.type,
        subject: item.subject,
        topic: item.topic,
        label: item.type === 'freestyle' ? 'Open Hour' : undefined,
      })
      // the optional freestyle hour is not counted as focused study
      if (item.type !== 'freestyle') studyMins += mins
      segCursors[si] += mins
      used += mins
      if (item.subject) lastSubject = item.subject
      const brk = itemBreak(item)
      if (queue.length && seg.end - segCursors[si] >= brk + 30) {
        events.push({ startMin: segCursors[si], endMin: segCursors[si] + brk, kind: 'break', label: 'Break' })
        segCursors[si] += brk
        used += brk
      }
    }
  }

  // proportional pass, then a mop up pass so nothing assigned goes unplaced
  segments.forEach((seg, si) => placeInSegment(si, Math.round((seg.end - seg.start) * fillFraction)))
  segments.forEach((seg, si) => placeInSegment(si, seg.end - seg.start))

  events.sort((a, b) => a.startMin - b.startMin)

  // label the honest free time (45 min or more) so the plan shows the hours it saved
  const withFree: PlacedEvent[] = []
  let free = s.wakeMin
  for (const ev of events) {
    if (ev.startMin - free >= 45) {
      withFree.push({ startMin: free, endMin: ev.startMin, kind: 'free', label: 'Free' })
    }
    withFree.push(ev)
    free = Math.max(free, ev.endMin)
  }
  if (cutoff - free >= 45) withFree.push({ startMin: free, endMin: cutoff, kind: 'free', label: 'Free' })

  return { dayIndex: day, dayName: DAY_NAMES[day], events: withFree, studyMins }
}

export function planWeek(s: WeekSettings, topics: TopicInput[]): PlanResult {
  const { caps, scheduled, parked, papers, freestyleDays } = assignWeek(s, topics)
  const days = caps.map((cap, d) => layoutDay(s, d, cap, freestyleDays.includes(d)))
  const usedStudyMins = days.reduce((sum, d) => sum + d.studyMins, 0)
  const freshCaps = Array.from({ length: 7 }, (_, d) => buildDayCapacity(s, d))
  const availableStudyMins = freshCaps.reduce(
    (sum, cap) => sum + Math.min(cap.studyLeft, cap.remaining.reduce((a, b) => a + b, 0)),
    0
  )
  const sessionCount = days.reduce(
    (sum, d) =>
      sum +
      d.events.filter(
        (e) => e.kind === 'blurt' || e.kind === 'recall' || e.kind === 'review' || e.kind === 'paper'
      ).length,
    0
  )
  return { days, scheduled, parked, papers, availableStudyMins, usedStudyMins, sessionCount }
}

/* Raw free minutes across the week (gaps between sleep, meals and fixed
   commitments), before any daily study cap. Drives the step 1 readout. */
export function weeklyFreeMins(s: WeekSettings): number {
  return Array.from({ length: 7 }, (_, d) => buildDayCapacity(s, d)).reduce(
    (sum, cap) => sum + cap.remaining.reduce((a, b) => a + b, 0),
    0
  )
}

/* Live meter numbers for step 2, before generating */
export function capacitySummary(s: WeekSettings, topics: TopicInput[]) {
  const result = planWeek(s, topics)
  const demandMins = topics.reduce((sum, t) => sum + doseFullMins(t.rating), 0)
  return {
    availableStudyMins: result.availableStudyMins,
    demandMins,
    fits: result.parked.length === 0,
    scheduledCount: result.scheduled.length,
    parkedCount: result.parked.length,
    parked: result.parked,
  }
}

/* The doctor moment: one computed sentence opening the plan */
export function diagnosisLine(result: PlanResult): string {
  const weakMins = new Map<string, number>()
  for (const t of result.scheduled) {
    if (t.rating === 'solid') continue
    const mins = t.sessions.reduce((sum, sess) => sum + TECHNIQUES[sess.type].mins, 0)
    weakMins.set(t.subject, (weakMins.get(t.subject) ?? 0) + mins)
  }
  if (weakMins.size === 0) {
    return "Everything is holding. This week is maintenance, and it's meant to feel light."
  }
  const ranked = [...weakMins.entries()].sort((a, b) => b[1] - a[1])
  const [topSubject, topMins] = ranked[0]
  const totalH = Math.round(result.usedStudyMins / 30) / 2
  const topH = Math.round(topMins / 30) / 2
  const holding = [
    ...new Set(
      result.scheduled
        .filter((t) => t.rating === 'solid')
        .map((t) => t.subject)
        .filter((subj) => !weakMins.has(subj))
    ),
  ]
  const holdingNote =
    holding.length === 0
      ? ''
      : holding.length === 1
        ? ` ${holding[0]} is holding, so it stays on maintenance.`
        : ` ${holding.slice(0, -1).join(', ')} and ${holding[holding.length - 1]} are holding, so they stay on maintenance.`
  return `Diagnosis: ${topSubject} needs the most work, so it gets ${topH} of your ${totalH} study hours this week.${holdingNote}`
}
