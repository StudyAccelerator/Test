/* The error log engine: pure functions, no browser APIs except in the storage
   helpers at the bottom. A mistake is logged once, tagged with the tier of the
   A* Performance Pyramid that caused it, then retested on the ladder defined
   in taxonomy.ts (3, 7, 14, 30 days). Passing a retest moves it up a rung;
   failing one sends it back to the start. Pass the final rung and the mistake
   is mastered: marks it can never take again. */

import { RETEST_LADDER, type SourceId, type TierId } from './taxonomy'

export type ReviewResult = 'got' | 'wrong'

export type Review = { on: string; result: ReviewResult }

export type Mistake = {
  id: string
  subject: string
  topic: string
  /* What the question asked and what went wrong, in the student's words */
  what: string
  /* The fix: the correct answer or method, written out properly */
  fix: string
  tier: TierId
  cause?: string
  source: SourceId
  /* Marks it cost, if the student knows. Never invented, never defaulted. */
  marks?: number
  createdOn: string
  /* Rung on the retest ladder: index into RETEST_LADDER */
  step: number
  /* Date-only key (YYYY-MM-DD) of the next retest */
  due: string
  reviews: Review[]
  status: 'learning' | 'mastered'
}

export type ErrorLogState = {
  mistakes: Mistake[]
  savedAt: string
}

/* ---------- date helpers (local time, date-only keys) ---------- */

export function dateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map((n) => parseInt(n, 10))
  return new Date(y, (m || 1) - 1, d || 1)
}

export function addDays(key: string, days: number): string {
  const d = fromKey(key)
  d.setDate(d.getDate() + days)
  return dateKey(d)
}

export function daysBetween(fromKeyStr: string, toKeyStr: string): number {
  const ms = fromKey(toKeyStr).getTime() - fromKey(fromKeyStr).getTime()
  return Math.round(ms / 86400000)
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/* "Friday 24 July", relative where it reads better */
export function formatDue(key: string, todayKey: string): string {
  const diff = daysBetween(todayKey, key)
  if (diff <= 0) return 'today'
  if (diff === 1) return 'tomorrow'
  const d = fromKey(key)
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function formatShort(key: string): string {
  const d = fromKey(key)
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
}

/* ---------- the ladder ---------- */

export function newMistake(
  input: Omit<Mistake, 'id' | 'createdOn' | 'step' | 'due' | 'reviews' | 'status'>,
  todayKey: string
): Mistake {
  return {
    ...input,
    id: `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    createdOn: todayKey,
    step: 0,
    due: addDays(todayKey, RETEST_LADDER[0]),
    reviews: [],
    status: 'learning',
  }
}

/* Apply a retest outcome. Intervals anchor to the day the retest actually
   happened, not the day it was due, so a late retest still spaces properly. */
export function recordReview(m: Mistake, result: ReviewResult, todayKey: string): Mistake {
  const reviews = [...m.reviews, { on: todayKey, result }]
  if (result === 'wrong') {
    return { ...m, reviews, step: 0, due: addDays(todayKey, RETEST_LADDER[0]), status: 'learning' }
  }
  const nextStep = m.step + 1
  if (nextStep >= RETEST_LADDER.length) {
    return { ...m, reviews, step: nextStep, due: '', status: 'mastered' }
  }
  return { ...m, reviews, step: nextStep, due: addDays(todayKey, RETEST_LADDER[nextStep]), status: 'learning' }
}

export function isDue(m: Mistake, todayKey: string): boolean {
  return m.status === 'learning' && m.due <= todayKey
}

export function dueMistakes(mistakes: Mistake[], todayKey: string): Mistake[] {
  return mistakes.filter((m) => isDue(m, todayKey)).sort((a, b) => (a.due < b.due ? -1 : 1))
}

/* The next date anything comes due, for the "nothing due today" state */
export function nextDueDate(mistakes: Mistake[], todayKey: string): { due: string; count: number } | null {
  const upcoming = mistakes.filter((m) => m.status === 'learning' && m.due > todayKey)
  if (upcoming.length === 0) return null
  const due = upcoming.reduce((min, m) => (m.due < min ? m.due : min), upcoming[0].due)
  return { due, count: upcoming.filter((m) => m.due === due).length }
}

/* ---------- insights ---------- */

export type Insights = {
  total: number
  learning: number
  mastered: number
  dueToday: number
  tierCounts: Record<TierId, number>
  /* Tier with the most mistakes, only once there is enough signal */
  biggestTier: TierId | null
  bySubject: { subject: string; count: number; mastered: number }[]
  /* Same subject + topic logged 3+ times: the topic is asking for a full session */
  repeatTopics: { subject: string; topic: string; count: number }[]
  /* Mark totals only over entries where the student gave a number */
  marksLogged: number
  marksMastered: number
  marksEntered: boolean
}

export function buildInsights(mistakes: Mistake[], todayKey: string): Insights {
  const tierCounts: Record<TierId, number> = { knowledge: 0, recall: 0, application: 0, exam: 0 }
  const subjects = new Map<string, { count: number; mastered: number }>()
  const topics = new Map<string, { subject: string; topic: string; count: number }>()
  let marksLogged = 0
  let marksMastered = 0
  let marksEntered = false

  for (const m of mistakes) {
    tierCounts[m.tier] += 1
    const s = subjects.get(m.subject) ?? { count: 0, mastered: 0 }
    s.count += 1
    if (m.status === 'mastered') s.mastered += 1
    subjects.set(m.subject, s)
    if (m.topic.trim()) {
      const key = `${m.subject.toLowerCase()}|${m.topic.trim().toLowerCase()}`
      const t = topics.get(key) ?? { subject: m.subject, topic: m.topic.trim(), count: 0 }
      t.count += 1
      topics.set(key, t)
    }
    if (typeof m.marks === 'number' && m.marks > 0) {
      marksEntered = true
      marksLogged += m.marks
      if (m.status === 'mastered') marksMastered += m.marks
    }
  }

  const total = mistakes.length
  let biggestTier: TierId | null = null
  if (total >= 5) {
    const entries = Object.entries(tierCounts) as [TierId, number][]
    const top = entries.reduce((a, b) => (b[1] > a[1] ? b : a))
    /* Only call it a pattern if the lead is real, not a tie */
    if (top[1] > 0 && entries.filter(([, n]) => n === top[1]).length === 1) biggestTier = top[0]
  }

  return {
    total,
    learning: mistakes.filter((m) => m.status === 'learning').length,
    mastered: mistakes.filter((m) => m.status === 'mastered').length,
    dueToday: dueMistakes(mistakes, todayKey).length,
    tierCounts,
    biggestTier,
    bySubject: [...subjects.entries()]
      .map(([subject, v]) => ({ subject, ...v }))
      .sort((a, b) => b.count - a.count),
    repeatTopics: [...topics.values()].filter((t) => t.count >= 3).sort((a, b) => b.count - a.count),
    marksLogged,
    marksMastered,
    marksEntered,
  }
}

/* ---------- persistence ---------- */

export const STORAGE_KEY = 'ala-error-log-v1'

export function saveLog(mistakes: Mistake[]) {
  try {
    const state: ErrorLogState = { mistakes, savedAt: new Date().toISOString() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* storage full or blocked: the session still works in memory */
  }
}

function isMistake(m: unknown): m is Mistake {
  if (!m || typeof m !== 'object') return false
  const x = m as Record<string, unknown>
  return (
    typeof x.id === 'string' &&
    typeof x.subject === 'string' &&
    typeof x.what === 'string' &&
    typeof x.fix === 'string' &&
    typeof x.tier === 'string' &&
    ['knowledge', 'recall', 'application', 'exam'].includes(x.tier as string) &&
    typeof x.step === 'number' &&
    Array.isArray(x.reviews)
  )
}

export function loadLog(): Mistake[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ErrorLogState
    if (!parsed || !Array.isArray(parsed.mistakes)) return null
    return parsed.mistakes.filter(isMistake)
  } catch {
    return null
  }
}

/* Backup file: everything, human-readable JSON */
export function exportLog(mistakes: Mistake[]): string {
  return JSON.stringify({ tool: 'A-Level Accelerators Error Log', version: 1, mistakes }, null, 2)
}

/* Restore from a backup file. Merges by id so importing on a second device
   never duplicates entries; the imported copy wins on conflicts. */
export function importLog(raw: string, current: Mistake[]): Mistake[] | null {
  try {
    const parsed = JSON.parse(raw) as { mistakes?: unknown[] }
    if (!parsed || !Array.isArray(parsed.mistakes)) return null
    const incoming = parsed.mistakes.filter(isMistake)
    if (incoming.length === 0) return null
    const byId = new Map(current.map((m) => [m.id, m]))
    for (const m of incoming) byId.set(m.id, m)
    return [...byId.values()]
  } catch {
    return null
  }
}
