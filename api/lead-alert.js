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
 * Deliberately plain CommonJS JavaScript in a TypeScript repo: the project
 * tsconfig compiles with module ESNext, and @vercel/node followed it, emitting
 * ESM syntax into a CommonJS lambda that crashed at load on every request
 * (FUNCTION_INVOCATION_FAILED, 13 August 2026). A .js file with require()
 * involves no compiler and no ambiguity. Do not convert it back to .ts.
 *
 * The MailerLite key stays single-sourced in lib/mailerlite.ts and is read
 * from that file at runtime; vercel.json's functions.includeFiles ships it
 * with this function.
 *
 * ACTIVATION (done 13 August 2026; kept for the record). The URL keeps its
 * trailing slash: the bare path 308-redirects (trailingSlash site) and
 * webhook senders cannot be trusted to follow redirects:
 *   curl -X POST https://connect.mailerlite.com/api/webhooks \
 *     -H "Authorization: Bearer <ML_API_KEY>" -H "Content-Type: application/json" \
 *     -d '{"name":"Lead alerts to Waleed","events":["subscriber.added_to_group"],"url":"https://alevelaccelerators.com/api/lead-alert/?token=ala-lead-alert-2f9c81d64a0b"}'
 */

const { readFileSync } = require('fs')
const { join } = require('path')
const { waitUntil } = require('@vercel/functions')

/* Shared-secret gate: MailerLite calls the URL with ?token=..., anyone without
   it gets a 401. Rotate by changing it here and re-registering the webhook. */
const TOKEN = 'ala-lead-alert-2f9c81d64a0b'

const ALERTS_GROUP = '195685757299459217' // "Lead alerts (internal)": Waleed only, never anyone else

/* Only joins to these groups alert; route groups are deliberately absent so a
   diagnostic signup (master + route join) emails once, not twice. */
const WATCHED = {
  '192687508025247162': 'Revision Diagnostic (student)',
  '193102828818925394': 'Revision Diagnostic Parents',
  '187183128836573106': 'Revision Tracker',
  '188021995515937985': "Parents' Guide",
  '192801700892903405': 'Sunday Session newsletter',
}

const OWN_ADDRESSES = ['waleedahmad042.319@gmail.com', 'waleed@alevelaccelerators.com']

/* Instant phone push via ntfy.sh, added 15 August 2026 on Waleed's instruction:
   the email alert rides MailerLite's campaign pipeline (about 2 minutes door to
   door), which is too slow for his call-while-they-read-the-report play. ntfy
   delivers to his phone in about a second. He subscribes to this topic in the
   free ntfy app; the topic name is the only secret, so keep it long and random
   and rotate it here if it ever leaks. The email alert stays as the full record. */
const NTFY_TOPIC = 'ala-leads-8f4c2e91b7d3a650'


function mailerliteKey() {
  const candidates = [join(process.cwd(), 'lib', 'mailerlite.ts'), '/var/task/lib/mailerlite.ts']
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

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const token =
    (req.query && req.query.token) || new URL(req.url || '', 'https://x').searchParams.get('token')
  if (token !== TOKEN) return res.status(401).json({ error: 'bad token' })

  /* MailerLite webhook payloads nest differently per event version; take the
     subscriber and group wherever they are rather than assuming one shape. */
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const sub = body.subscriber || (body.data && body.data.subscriber) || body.data || body
  const group = body.group || (body.data && body.data.group) || null

  const email = (sub && sub.email) || ''
  if (!email) return res.status(200).json({ ignored: 'no subscriber in payload' })
  if (OWN_ADDRESSES.includes(email.toLowerCase())) return res.status(200).json({ ignored: 'own address' })

  const groupLabel = group && group.id != null ? WATCHED[String(group.id)] : undefined
  if (group && group.id != null && !groupLabel) return res.status(200).json({ ignored: 'unwatched group' })

  const f = sub.fields || {}
  const name = f.name || email
  const lines = []

  lines.push(`<strong>${esc(name)}</strong>${f.diag_taker ? ` (${esc(f.diag_taker)})` : ''}`)
  if (groupLabel) lines.push(`Joined: ${esc(groupLabel)}`)
  if (f.diag_child_name) lines.push(`Child: ${esc(f.diag_child_name)}`)
  if (f.year_group) lines.push(`Year group: ${esc(f.year_group)}`)
  /* Spelled out both ways round: the stored field is a double negative
     ("no" means they did NOT opt out, so calling is fine) and misreading it
     either loses a call or breaks an opt-out. */
  if (String(f.diag_no_contact) === 'yes') {
    lines.push(
      f.phone
        ? `DO NOT CALL. They ticked the opt-out. (Number on file, ${esc(f.phone)}, for your records only.)`
        : 'DO NOT CALL. They ticked the opt-out.'
    )
  } else if (f.phone) {
    lines.push(`OK TO CALL: ${esc(f.phone)}`)
  } else {
    lines.push('No phone left')
  }
  if (f.diag_support_needed) lines.push(`They want: ${esc(f.diag_support_needed)}`)
  if (f.subjects) lines.push(`Subjects: ${esc(f.subjects)}`)
  if (f.diag_worry_subject) lines.push(`Worry subject: ${esc(f.diag_worry_subject)}`)
  if (f.diag_grades) {
    lines.push(`Grades: ${esc(f.diag_grades)}`)
  } else if (f.diag_current_grade || f.diag_target_grade) {
    lines.push(`Grades: ${esc(f.diag_current_grade || '?')} to ${esc(f.diag_target_grade || '?')}`)
  }
  if (f.diag_archetype) lines.push(`Profile: ${esc(f.diag_archetype)}`)
  if (f.diag_bottleneck) lines.push(`Biggest leak: ${esc(f.diag_bottleneck)}`)
  if (f.diag_route) lines.push(`Route: ${esc(f.diag_route)}`)
  if (f.diag_low_yield_hours) lines.push(`Wasted hours a week: ${esc(f.diag_low_yield_hours)}`)
  if (f.diag_support) lines.push(`Existing support: ${esc(f.diag_support)}`)
  if (f.diag_support_detail) lines.push(`Support detail: ${esc(f.diag_support_detail)}`)
  if (f.diag_notes) lines.push(`Their note: ${esc(f.diag_notes)}`)
  lines.push(`Email: ${esc(email)}`)

  const firstName = String(name).split(' ')[0]
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')

  /* Acknowledge BEFORE doing the slow work. A cold start plus two MailerLite
     round trips overran their webhook timeout, they retried, and one signup
     emailed Waleed twice (13 August 2026). The 200 goes back instantly and
     waitUntil keeps the lambda alive to send the alert; a genuine send
     failure is logged and caught by the daily digest failsafe Routine. */
  res.status(200).json({ accepted: email })

  /* The push goes FIRST and never blocks the email: speed is its whole job. */
  const callLine =
    String(f.diag_no_contact) === 'yes'
      ? 'DO NOT CALL (opted out)'
      : f.phone
        ? `OK TO CALL ${f.phone}`
        : 'no phone left'
  waitUntil(
    fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        Title: `New lead: ${firstName}${f.diag_taker ? ` (${f.diag_taker})` : ''}`,
        Priority: 'high',
        Tags: 'telephone',
      },
      body: [
        callLine,
        f.diag_child_name ? `Child: ${f.diag_child_name}` : '',
        f.diag_archetype ? `Profile: ${f.diag_archetype}` : '',
        f.diag_support_needed ? `Wants: ${f.diag_support_needed}` : '',
        groupLabel || '',
      ]
        .filter(Boolean)
        .join('\n'),
    }).catch((err) => console.error(`ntfy push FAILED for ${email}:`, err))
  )

  waitUntil(
    (async () => {
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
      if (!create.ok) throw new Error(`campaign create ${create.status}`)
      const created = await create.json()
      const campaignId = created && created.data && created.data.id
      const send = await fetch(`https://connect.mailerlite.com/api/campaigns/${campaignId}/schedule`, {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({ delivery: 'instant' }),
      })
      if (!send.ok) throw new Error(`campaign schedule ${send.status}`)
      console.log(`lead alert sent for ${email}`)
    })().catch((err) => {
      console.error(`lead alert FAILED for ${email}:`, err)
    })
  )
}
