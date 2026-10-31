/*
 * Stripe webhook for the Top 1% Academy (31 October 2026).
 *
 * When a checkout on the Academy payment link completes, Stripe POSTs a
 * checkout.session.completed event here. We add the payer to the MailerLite
 * group "Top 1% Academy members" (202397742297777684), which fires the
 * welcome automation "Academy: welcome (A0)": thank you, what to expect, the
 * Skool community link, both guarantees. Waleed then approves the Skool
 * request by hand and records the enrolment in the HQ.
 *
 * Same shape as api/lead-alert.js, for the same reasons: plain CommonJS .js
 * (the repo tsconfig emits ESM into a CommonJS lambda and crashes it), the
 * MailerLite key read from lib/mailerlite.ts at runtime via vercel.json's
 * includeFiles, and a 200 answered before the MailerLite work so Stripe never
 * retries. The shared-secret ?token= gate is the same mechanism MailerLite's
 * webhook uses; Stripe's signature header is not checked because that would
 * need the signing secret as a Vercel environment variable, which only
 * Waleed can set. Trusting the payload is safe here: the worst a forged call
 * can do is send one welcome email to an address the forger already knows.
 *
 * Register in Stripe: Developers > Webhooks > Add endpoint
 *   URL: https://alevelaccelerators.com/api/academy-paid/?token=ala-academy-paid-7c3e19b0d4f2
 *   Events: checkout.session.completed
 * (keep the trailing slash before the ?, the bare path 308-redirects on this
 * trailingSlash site). Rotate the token here and in Stripe if it ever leaks.
 */

const { readFileSync } = require('fs')
const { join } = require('path')
const { waitUntil } = require('@vercel/functions')

const TOKEN = 'ala-academy-paid-7c3e19b0d4f2'
const MEMBERS_GROUP = '202397742297777684' // "Top 1% Academy members"
const NTFY_TOPIC = 'ala-leads-8f4c2e91b7d3a650' // Waleed's phone, same topic as the lead alerts

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

function firstName(full) {
  const s = String(full || '').trim()
  if (!s) return ''
  const first = s.split(/\s+/)[0]
  return first.charAt(0).toUpperCase() + first.slice(1)
}

async function addMember(session) {
  const key = mailerliteKey()
  const details = session.customer_details || {}
  const email = (details.email || session.customer_email || '').trim().toLowerCase()
  if (!email) return
  const custom = (session.custom_fields || [])
    .map((f) => `${(f.label && f.label.custom) || f.key}: ${(f.text && f.text.value) || (f.dropdown && f.dropdown.value) || ''}`)
    .join('; ')
  const amount = session.amount_total != null ? `£${(session.amount_total / 100).toFixed(0)}` : ''

  const body = {
    email,
    fields: {
      name: firstName(details.name),
      academy_paid_at: new Date().toISOString().slice(0, 10),
      academy_price: amount,
      academy_note: custom.slice(0, 250),
    },
    groups: [MEMBERS_GROUP],
    status: 'active',
  }
  const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  })
  const text = await r.text()
  if (!r.ok) console.error('academy-paid: MailerLite refused', r.status, text.slice(0, 300))

  try {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: { Title: 'ACADEMY: new member paid', Priority: '4', Tags: 'moneybag' },
      body: `${details.name || email} paid ${amount} for the Top 1% Academy. Approve them in Skool (same email: ${email}) and record the enrolment in the HQ.${custom ? ' ' + custom : ''}`,
    })
  } catch (e) {
    console.error('academy-paid: ntfy failed', e)
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  const token = (req.query && req.query.token) || new URL(req.url || '', 'https://x').searchParams.get('token')
  if (token !== TOKEN) return res.status(401).json({ error: 'bad token' })

  const event = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  if (event.type !== 'checkout.session.completed') return res.status(200).json({ ignored: event.type || 'no type' })
  const session = (event.data && event.data.object) || {}
  if (session.payment_status && session.payment_status !== 'paid') {
    return res.status(200).json({ ignored: `payment_status ${session.payment_status}` })
  }

  res.status(200).json({ ok: true })
  waitUntil(addMember(session).catch((e) => console.error('academy-paid failed', e)))
}
