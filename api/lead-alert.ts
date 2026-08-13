/*
 * Instant lead alerts: MailerLite webhook receiver.
 *
 * A Vercel serverless function (root api/ directory, NOT a Next.js app route,
 * so the static export is unaffected). MailerLite calls it the moment a
 * subscriber joins one of the five lead-capture groups; it emails Waleed the
 * lead's full details by instant-sending a MailerLite campaign to the internal
 * group "Lead alerts (internal)" (195685757299459217), which contains only his
 * own two addresses. Replaces the latency of the polling Routines with a push.
 *
 * ACTIVATION (after this branch deploys to production):
 *   1. Register the webhook (key from lib/mailerlite.ts). The URL must keep
 *      its trailing slash: the bare path 308-redirects (trailingSlash site)
 *      and webhook senders cannot be trusted to follow redirects:
 *      curl -X POST https://connect.mailerlite.com/api/webhooks \
 *        -H "Authorization: Bearer <ML_API_KEY>" -H "Content-Type: application/json" \
 *        -d '{"name":"Lead alerts to Waleed","events":["subscriber.added_to_group"],"url":"https://alevelaccelerators.com/api/lead-alert/?token=ala-lead-alert-2f9c81d64a0b"}'
 *   2. Prove it end to end: add a test subscriber to the Sunday Session group,
 *      check the email arrives, then delete the test subscriber.
 *   3. Retire the two polling Routines (diagnostic-lead-alerts-hourly and
 *      diagnostic-lead-alerts-halfhour) to a single daily failsafe, so leads
 *      are not double-alerted.
 *
 * The MailerLite key stays single-sourced in lib/mailerlite.ts: importing
 * across the api/ boundary crashed the function bundle at load
 * (FUNCTION_INVOCATION_FAILED, 13 August 2026), so the key is read from the
 * file at runtime instead; vercel.json's functions.includeFiles ships the
 * file with this function.
 */

import { readFileSync } from 'fs'
import { join } from 'path'

function mailerliteKey(): string {
  const candidates = [
    join(process.cwd(), 'lib', 'mailerlite.ts'),
    '/var/task/lib/mailerlite.ts',
  ]
  for (const path of candidates) {
    try {
      const m = readFileSync(path, 'utf8').match(/ML_API_KEY =\s*'([^']+)'/)
      if (m) return m[1]
    } catch {
      /* try the next location */
    }
  }
  throw new Error('ML_API_KEY not found: lib/mailerlite.ts missing from the function bundle')
}

/* Shared-secret gate: MailerLite calls the URL with ?token=..., anyone without
   it gets a 401. Rotate by changing it here and re-registering the webhook. */
const TOKEN = 'ala-lead-alert-2f9c81d64a0b'

const ALERTS_GROUP = '195685757299459217' // "Lead alerts (internal)": Waleed only, never anyone else

/* Only joins to these groups alert; route groups are deliberately absent so a
   diagnostic signup (master + route join) emails once, not twice. */
const WATCHED: Record<string, string> = {
  '192687508025247162': 'Revision Diagnostic (student)',
  '193102828818925394': 'Revision Diagnostic Parents',
  '187183128836573106': 'Revision Tracker',
  '188021995515937985': "Parents' Guide",
  '192801700892903405': 'Sunday Session newsletter',
}

const OWN_ADDRESSES = ['waleedahmad042.319@gmail.com', 'waleed@alevelaccelerators.com']

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const token = req.query?.token ?? new URL(req.url ?? '', 'https://x').searchParams.get('token')
  if (token !== TOKEN) return res.status(401).json({ error: 'bad token' })

  /* MailerLite webhook payloads nest differently per event version; take the
     subscriber and group wherever they are rather than assuming one shape. */
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {})
  const sub = body.subscriber ?? body.data?.subscriber ?? body.data ?? body
  const group = body.group ?? body.data?.group ?? null

  const email: string = sub?.email ?? ''
  if (!email) return res.status(200).json({ ignored: 'no subscriber in payload' })
  if (OWN_ADDRESSES.includes(email.toLowerCase())) return res.status(200).json({ ignored: 'own address' })

  const groupLabel = group?.id != null ? WATCHED[String(group.id)] : undefined
  if (group?.id != null && !groupLabel) return res.status(200).json({ ignored: 'unwatched group' })

  const f = sub.fields ?? {}
  const name: string = f.name || email
  const lines: string[] = []

  lines.push(`<strong>${esc(name)}</strong>${f.diag_taker ? ` (${esc(String(f.diag_taker))})` : ''}`)
  if (groupLabel) lines.push(`Joined: ${esc(groupLabel)}`)
  if (f.diag_child_name) lines.push(`Child: ${esc(String(f.diag_child_name))}`)
  if (f.year_group) lines.push(`Year group: ${esc(String(f.year_group))}`)
  if (String(f.diag_no_contact) === 'yes') {
    lines.push('DO NOT CALL, they ticked the opt-out')
  } else if (f.phone) {
    lines.push(`Phone: ${esc(String(f.phone))}`)
  } else {
    lines.push('No phone left')
  }
  if (f.subjects) lines.push(`Subjects: ${esc(String(f.subjects))}`)
  if (f.diag_worry_subject) lines.push(`Worry subject: ${esc(String(f.diag_worry_subject))}`)
  if (f.diag_grades) {
    lines.push(`Grades: ${esc(String(f.diag_grades))}`)
  } else if (f.diag_current_grade || f.diag_target_grade) {
    lines.push(`Grades: ${esc(String(f.diag_current_grade || '?'))} to ${esc(String(f.diag_target_grade || '?'))}`)
  }
  if (f.diag_archetype) lines.push(`Profile: ${esc(String(f.diag_archetype))}`)
  if (f.diag_bottleneck) lines.push(`Biggest leak: ${esc(String(f.diag_bottleneck))}`)
  if (f.diag_route) lines.push(`Route: ${esc(String(f.diag_route))}`)
  if (f.diag_low_yield_hours) lines.push(`Wasted hours a week: ${esc(String(f.diag_low_yield_hours))}`)
  if (f.diag_support) lines.push(`Existing support: ${esc(String(f.diag_support))}`)
  if (f.diag_support_detail) lines.push(`Support detail: ${esc(String(f.diag_support_detail))}`)
  if (f.diag_support_needed) lines.push(`They want: ${esc(String(f.diag_support_needed))}`)
  if (f.diag_notes) lines.push(`Their note: ${esc(String(f.diag_notes))}`)
  lines.push(`Email: ${esc(email)}`)

  const firstName = name.split(' ')[0]
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const auth = { Authorization: `Bearer ${mailerliteKey()}`, 'Content-Type': 'application/json' }

  const create = await fetch('https://connect.mailerlite.com/api/campaigns', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      name: `Lead alert ${stamp}`,
      type: 'regular',
      groups: [ALERTS_GROUP],
      emails: [
        {
          subject: `New lead: ${firstName}`,
          from_name: 'A-Level Accelerators lead alerts',
          from: 'waleed@alevelaccelerators.com',
          content: `<html><body><p>${lines.join('</p><p>')}</p></body></html>`,
        },
      ],
    }),
  })
  if (!create.ok) return res.status(500).json({ error: `campaign create ${create.status}` })
  const campaignId = (await create.json())?.data?.id

  const send = await fetch(`https://connect.mailerlite.com/api/campaigns/${campaignId}/schedule`, {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({ delivery: 'instant' }),
  })
  /* Non-2xx makes MailerLite retry the webhook, which retries the email */
  if (!send.ok) return res.status(500).json({ error: `campaign schedule ${send.status}` })

  return res.status(200).json({ alerted: email })
}
