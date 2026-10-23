/*
 * The free online workshop (first run: the one pitched from the stage at The
 * Medic Life's KCL work experience day, 24 October 2026). Every date, link and
 * label the sign-up page and its thank-you state need lives HERE, in one
 * place, so a new workshop is a one-file edit: change these, re-run the email
 * engine for the reminder drafts, and the page follows.
 *
 * Two values are Waleed's to paste in (both can be empty while he decides,
 * and the page copes: it promises the Zoom link by email instead of showing
 * it, and hides the WhatsApp card entirely until the invite link exists):
 *   zoomUrl      the Zoom join link for the workshop
 *   whatsappUrl  the WhatsApp community invite link
 */

export const WORKSHOP = {
  /* Shown in the page title and the thank-you state */
  title: 'The Academic Accelerator Workshop',
  strap: 'How to get ahead of Year 12, prioritise your subjects and avoid the burnout that hits most students after Christmas.',

  /* ISO date and UK local times. Proposed Sunday 1 November 2026, 6pm to
     7:30pm: eight days after KCL, close enough to keep the room's momentum,
     Sunday evening because that is when students are home. Waleed confirms
     or moves it; nothing else needs to change when he does. */
  dateISO: '2026-11-01',
  startTime: '18:00',
  endTime: '19:30',
  /* Human labels, kept in step with the three values above */
  dateLabel: 'Sunday 1 November',
  timeLabel: '6pm to 7:30pm (UK time)',
  durationLabel: '90 minutes, live on Zoom',

  /* Paste the Zoom join link here once the meeting exists. Empty means
     "arrives by email". */
  zoomUrl: '',

  /* Paste the WhatsApp community invite link here once the community exists.
     Empty hides the WhatsApp card and the phone field's promise. */
  whatsappUrl: '',

  /* MailerLite group "Free Workshop: Year 12 Head Start (Nov 2026)",
     created 23 October 2026. Joining it is what the reminder emails and the
     replay email send to. Deliberately NOT watched by api/lead-alert.js: a
     room of 350 signing up at once must not ring Waleed's phone 350 times. */
  groupId: '202138192036496596',
} as const

/* Where the sign-up came from, read from ?src= on the page URL. The short
   link alevelaccelerators.com/kcl redirects to /free-workshop/?src=kcl, so a
   student who scans the QR code in the lecture theatre is labelled kcl in
   MailerLite (field workshop_source); anyone arriving another way is
   labelled by that route or "website". */
export function workshopSource(search: string): string {
  try {
    const src = new URLSearchParams(search).get('src')
    if (src && /^[a-z0-9-]{1,40}$/i.test(src)) return src.toLowerCase()
  } catch {}
  return 'website'
}

/* The two "add to calendar" routes the thank-you state offers: a Google
   Calendar link and a downloadable .ics (Apple, Outlook). Both carry the Zoom
   link in the description when it is known. Times are UK local; the .ics uses
   the Europe/London TZID so it lands at the right hour whatever the device's
   zone, and the Google link uses the same. */
function compact(dateISO: string, hhmm: string): string {
  return dateISO.replace(/-/g, '') + 'T' + hhmm.replace(':', '') + '00'
}

export function googleCalendarUrl(): string {
  const w = WORKSHOP
  const details = [w.strap, w.zoomUrl ? `Join on Zoom: ${w.zoomUrl}` : 'Your Zoom link arrives by email before the workshop.'].join('\n\n')
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${w.title} with Dr Waleed Ahmad`,
    dates: `${compact(w.dateISO, w.startTime)}/${compact(w.dateISO, w.endTime)}`,
    ctz: 'Europe/London',
    details,
    location: w.zoomUrl || 'Zoom (link by email)',
  })
  return `https://calendar.google.com/calendar/render?${q.toString()}`
}

export function icsDataUrl(): string {
  const w = WORKSHOP
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
  const description = esc(
    [w.strap, w.zoomUrl ? `Join on Zoom: ${w.zoomUrl}` : 'Your Zoom link arrives by email before the workshop.'].join('\n\n'),
  )
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//A-Level Accelerators//Workshop//EN',
    'BEGIN:VEVENT',
    `UID:workshop-${w.dateISO}@alevelaccelerators.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
    `DTSTART;TZID=Europe/London:${compact(w.dateISO, w.startTime)}`,
    `DTEND;TZID=Europe/London:${compact(w.dateISO, w.endTime)}`,
    `SUMMARY:${esc(`${w.title} with Dr Waleed Ahmad`)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${esc(w.zoomUrl || 'Zoom (link by email)')}`,
    w.zoomUrl ? `URL:${w.zoomUrl}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'))
}
