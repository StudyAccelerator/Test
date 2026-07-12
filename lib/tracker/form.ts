/* Form-side types and helpers for the tracker: time parsing, the bridge from
   form state to engine WeekSettings, and the subject colour dots. */

import type { Commitment, TopicInput, WeekSettings } from './engine'
import type { Rating } from './techniques'

export type TopicForm = { id: number; name: string; rating: Rating }
export type SubjectForm = { id: number; name: string; topics: TopicForm[] }
export type CommitmentForm = { id: number; day: number; start: string; end: string; label: string }

export type TrackerForm = {
  name: string
  yearGroup: string
  email: string
  wake: string
  breakfast: string
  lunch: string
  dinner: string
  sleep: string
  hasSchool: boolean
  schoolDays: number[]
  schoolStart: string
  schoolEnd: string
  subjects: SubjectForm[]
  commitments: CommitmentForm[]
}

export const DEFAULT_FORM: TrackerForm = {
  name: '',
  yearGroup: '',
  email: '',
  wake: '07:00',
  breakfast: '07:30',
  lunch: '12:00',
  dinner: '18:00',
  sleep: '23:00',
  hasSchool: false,
  schoolDays: [0, 1, 2, 3, 4],
  schoolStart: '08:30',
  schoolEnd: '16:00',
  subjects: [],
  commitments: [],
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10))
  if (Number.isNaN(h) || Number.isNaN(m)) return NaN
  return h * 60 + m
}

export function toHHMM(mins: number): string {
  const norm = ((mins % 1440) + 1440) % 1440
  return `${String(Math.floor(norm / 60)).padStart(2, '0')}:${String(norm % 60).padStart(2, '0')}`
}

export function sleepDurationMins(form: TrackerForm): number {
  const w = toMinutes(form.wake)
  const s = toMinutes(form.sleep)
  if (Number.isNaN(w) || Number.isNaN(s)) return NaN
  return s <= w ? w - s : 1440 - s + w
}

export function buildWeekSettings(form: TrackerForm): WeekSettings {
  const commitments: Commitment[] = []
  if (form.hasSchool) {
    const start = toMinutes(form.schoolStart)
    const end = toMinutes(form.schoolEnd)
    if (!Number.isNaN(start) && !Number.isNaN(end) && end > start) {
      for (const day of form.schoolDays) {
        commitments.push({ day, startMin: start, endMin: end, label: 'School' })
      }
    }
  }
  for (const c of form.commitments) {
    const start = toMinutes(c.start)
    const end = toMinutes(c.end)
    if (!c.label.trim() || Number.isNaN(start) || Number.isNaN(end) || end <= start) continue
    commitments.push({ day: c.day, startMin: start, endMin: end, label: c.label.trim() })
  }
  return {
    wakeMin: toMinutes(form.wake),
    sleepMin: toMinutes(form.sleep),
    breakfastMin: toMinutes(form.breakfast),
    lunchMin: toMinutes(form.lunch),
    dinnerMin: toMinutes(form.dinner),
    commitments,
  }
}

export function collectTopics(form: TrackerForm): TopicInput[] {
  const out: TopicInput[] = []
  for (const s of form.subjects) {
    const subject = s.name.trim()
    if (!subject) continue
    for (const t of s.topics) {
      if (t.name.trim()) out.push({ subject, topic: t.name.trim(), rating: t.rating })
    }
  }
  return out
}

/* Subject identity dots: saturated enough to read on the purple, green and
   gold session blocks (each gets a white ring when rendered) */
const SUBJECT_DOTS = ['#F472B6', '#60A5FA', '#FBBF24', '#34D399', '#C4B5FD', '#FB923C']

export function subjectDotMap(subjects: string[]): Map<string, string> {
  const map = new Map<string, string>()
  subjects.forEach((name, i) => {
    if (!map.has(name)) map.set(name, SUBJECT_DOTS[map.size % SUBJECT_DOTS.length])
  })
  return map
}

export const YEAR_GROUPS = ['Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Gap Year', 'Other']

export const TOPIC_PLACEHOLDERS: Record<string, string> = {
  Mathematics: 'e.g. Integration',
  Maths: 'e.g. Integration',
  Biology: 'e.g. Cardiac cycle',
  Chemistry: 'e.g. Organic mechanisms',
  Physics: 'e.g. Electric fields',
  English: 'e.g. Character analysis',
  History: 'e.g. Causes and effects',
  Economics: 'e.g. Supply and demand',
  Geography: 'e.g. Coastal processes',
}

export const MAX_TOPICS_PER_SUBJECT = 5

/* localStorage persistence, so next week's rebuild starts from this week's audit */
export const STORAGE_KEY = 'ala-tracker-v2'

export type StoredState = { form: TrackerForm; parked: { subject: string; topic: string }[]; savedAt: string }

export function saveState(form: TrackerForm, parked: { subject: string; topic: string }[]) {
  try {
    const stored: StoredState = { form, parked, savedAt: new Date().toISOString() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    /* storage full or blocked: fine, the tool still works */
  }
}

export function loadState(): StoredState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredState
    if (!parsed || typeof parsed !== 'object' || !parsed.form || !Array.isArray(parsed.form.subjects)) return null
    return parsed
  } catch {
    return null
  }
}
