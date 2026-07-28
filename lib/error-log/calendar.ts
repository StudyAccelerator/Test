/* Calendar reminders for retests: builds an .ics file with one all-day event
   per upcoming retest date, so the student's own phone does the nudging. A
   static site cannot send push notifications (that needs a server), but every
   student already carries a calendar that can. UIDs are keyed to the date, so
   re-downloading after new mistakes updates the same events in most calendar
   apps instead of duplicating them. */

import { TIERS } from './taxonomy'
import { fromKey, type Mistake } from './engine'

const CAL_URL = 'https://alevelaccelerators.com/error-log/'

/* RFC 5545 text escaping */
function esc(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

/* Lines longer than 75 octets must fold onto continuation lines */
function fold(line: string): string {
  if (line.length <= 74) return line
  const parts: string[] = []
  let rest = line
  while (rest.length > 74) {
    parts.push(rest.slice(0, 74))
    rest = ' ' + rest.slice(74)
  }
  parts.push(rest)
  return parts.join('\r\n')
}

function basicDate(key: string): string {
  return key.replace(/-/g, '')
}

function nextDay(key: string): string {
  const d = fromKey(key)
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

export function buildRetestCalendar(mistakes: Mistake[], todayKey: string): string | null {
  const upcoming = mistakes.filter((m) => m.status === 'learning' && m.due >= todayKey)
  if (upcoming.length === 0) return null

  const byDate = new Map<string, Mistake[]>()
  for (const m of upcoming) {
    const list = byDate.get(m.due) ?? []
    list.push(m)
    byDate.set(m.due, list)
  }
  const dates = [...byDate.keys()].sort()

  const now = new Date()
  const stamp =
    `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}` +
    `T${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}${String(now.getUTCSeconds()).padStart(2, '0')}Z`
  const seq = Math.floor(now.getTime() / 1000)

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//A-Level Accelerators//Error Log//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Error Log retests',
  ]

  for (const date of dates) {
    const items = byDate.get(date)!
    const detail = items
      .map((m) => `${m.subject}${m.topic ? ` · ${m.topic}` : ''} (Tier ${TIERS[m.tier].n} ${TIERS[m.tier].label})`)
      .join('\n')
    lines.push(
      'BEGIN:VEVENT',
      `UID:ala-errorlog-${date}@alevelaccelerators.com`,
      `SEQUENCE:${seq}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${basicDate(date)}`,
      `DTEND;VALUE=DATE:${nextDay(date)}`,
      fold(`SUMMARY:${esc(`Error Log: ${items.length} retest${items.length === 1 ? '' : 's'} due`)}`),
      fold(`DESCRIPTION:${esc(`Answer from memory first, then reveal and be honest.\n${detail}\n${CAL_URL}`)}`),
      `URL:${CAL_URL}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Error Log retests due today',
      'TRIGGER:PT8H',
      'END:VALARM',
      'END:VEVENT'
    )
  }

  lines.push('END:VCALENDAR')
  return lines.join('\r\n') + '\r\n'
}

/* Builds and downloads the file. Returns false when there was nothing to add. */
export function downloadRetestCalendar(mistakes: Mistake[], todayKey: string): boolean {
  const ics = buildRetestCalendar(mistakes, todayKey)
  if (!ics) return false
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'error-log-retests.ics'
  a.click()
  URL.revokeObjectURL(url)
  return true
}
