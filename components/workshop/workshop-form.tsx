'use client'

import { useEffect, useState } from 'react'
import { subscribeWorkshop } from '@/lib/mailerlite'
import { trackLead } from '@/lib/analytics'
import { checkPhone } from '@/lib/phone'
import { WORKSHOP, googleCalendarUrl, icsDataUrl, workshopSource } from '@/lib/workshop'

/* The sign-up form for the free workshop and its thank-you state. Collects
   what Waleed asked for on 23 October 2026: name, email, year, subjects, and
   an OPTIONAL phone number that only appears once they tick the WhatsApp
   community box, so nobody is asked for a number they have no reason to give.
   Everything goes straight to MailerLite from the browser (static export, no
   server), the same proven route as every other form on the site. */

type FormState = 'idle' | 'sending' | 'done' | 'error'

const YEARS = [
  ['Year 11', 'Year 11 (GCSEs this year)'],
  ['Year 12', 'Year 12'],
  ['Year 13', 'Year 13'],
  ['Other', 'Other'],
] as const

const SUBJECTS = [
  'Biology',
  'Chemistry',
  'Maths',
  'Physics',
  'Psychology',
  'Economics',
  'Further Maths',
  'English',
  'History',
  'Other',
]

const fieldClass =
  'w-full rounded-xl border border-brand-purple/15 bg-brand-cream/50 px-4 py-3.5 text-brand-text placeholder:text-brand-text/35 transition focus:border-brand-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-gold/15'

const chipBase =
  'rounded-full border px-3.5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold/30'
const chipOff = `${chipBase} border-brand-purple/15 bg-white text-brand-purple hover:border-brand-gold`
const chipOn = `${chipBase} border-brand-purple bg-brand-purple text-brand-cream`

function capitalise(s: string): string {
  return s.replace(/(^|[\s-'])([a-z])/g, (_, pre, ch) => pre + ch.toUpperCase())
}

export default function WorkshopForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [year, setYear] = useState('')
  const [subjects, setSubjects] = useState<string[]>([])
  const [otherSubject, setOtherSubject] = useState('')
  const [wantsWhatsapp, setWantsWhatsapp] = useState(false)
  const [phone, setPhone] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')
  const [source, setSource] = useState('website')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSource(workshopSource(window.location.search))
  }, [])

  const phoneCheck = phone.trim() ? checkPhone(phone) : null

  function toggleSubject(s: string) {
    setSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return
    const trimmedName = capitalise(name.trim())
    const trimmedEmail = email.trim()
    if (!trimmedName) return fail('Add your first name so I know who to welcome.')
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return fail('That email address does not look right, and it is where your Zoom link goes.')
    }
    if (!year) return fail('Pick your year group, so the workshop is pitched at the right year.')
    const chosen = subjects.filter((s) => s !== 'Other')
    const extra = otherSubject.trim()
    if (subjects.includes('Other') && extra) chosen.push(extra)
    if (chosen.length === 0) return fail('Tick at least one subject you are taking.')

    let e164 = ''
    if (wantsWhatsapp) {
      if (!phone.trim()) return fail('Add your mobile number for the WhatsApp community, or untick the box.')
      const pc = checkPhone(phone)
      if (!pc.ok) return fail(pc.error || 'That number does not look right.')
      e164 = pc.e164
    }

    setState('sending')
    const result = await subscribeWorkshop({
      email: trimmedEmail,
      name: trimmedName,
      yearGroup: year,
      subjects: chosen.join(', '),
      phone: e164,
      whatsapp: wantsWhatsapp && e164 ? 'yes' : 'no',
      source,
      groupId: WORKSHOP.groupId,
    })
    if (result === 'ok') {
      trackLead()
      setName(trimmedName)
      setState('done')
      try {
        document.getElementById('signup')?.scrollIntoView({ block: 'start' })
      } catch {}
    } else if (result === 'invalid-email') {
      fail('MailerLite did not accept that email address. Check it and try again.')
    } else {
      fail('Something went wrong on our end. Try again in a minute, or email Waleed@alevelaccelerators.com.')
    }
  }

  function fail(msg: string) {
    setState('error')
    setMessage(msg)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText('https://alevelaccelerators.com/free-workshop/')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  /* ── Thank-you state ──────────────────────────────────────────────────── */
  if (state === 'done') {
    const firstName = name.split(' ')[0]
    return (
      <div role="status" className="rounded-3xl bg-brand-purple p-6 text-brand-cream sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Your place is saved</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-brand-cream">You&apos;re in, {firstName}.</h2>
        <p className="mt-3 leading-relaxed text-brand-cream/85">
          {WORKSHOP.dateLabel}, {WORKSHOP.timeLabel}. {WORKSHOP.durationLabel}.
          {WORKSHOP.zoomUrl
            ? ' Your Zoom link is below and in your inbox in the next couple of minutes.'
            : ' Your Zoom link lands in your inbox before the day, with a reminder the day before and an hour before we start.'}
        </p>

        {WORKSHOP.zoomUrl && (
          <a
            href={WORKSHOP.zoomUrl}
            className="mt-5 block rounded-xl bg-brand-gold px-5 py-3.5 text-center font-semibold text-brand-purple transition hover:bg-brand-gold-light"
          >
            Open the Zoom link
          </a>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Add to Google Calendar
          </a>
          <a
            href={icsDataUrl()}
            download="academic-accelerator-workshop.ics"
            className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Add to Apple or Outlook calendar
          </a>
        </div>

        {WORKSHOP.whatsappUrl && (
          <div className="mt-6 rounded-2xl bg-white p-5 text-brand-text">
            <p className="font-serif text-lg font-bold text-brand-purple">
              {wantsWhatsapp ? 'Join the WhatsApp community now' : 'Want free advice between now and then?'}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-brand-text/75">
              Dr Waleed answers questions in the group community in public threads, so everyone learns from
              every answer. Admins only can post in the main channel, members&apos; numbers stay hidden, and you
              can leave with one tap.
            </p>
            <a
              href={WORKSHOP.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-xl bg-brand-purple px-5 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-purple-light"
            >
              Join the WhatsApp community
            </a>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
          <p className="font-serif text-lg font-bold text-brand-gold">Bring a friend (and your parents)</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-cream/80">
            Students who do this with a mate actually do it. Send them the link, and forward it to your parents
            too, because they are welcome to sit in. The more of your household that hears the plan, the easier
            it is to keep.
          </p>
          <button
            type="button"
            onClick={copyLink}
            className="mt-3 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
          >
            {copied ? 'Copied' : 'Copy the sign-up link'}
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-brand-cream/75">
          While you wait, the free{' '}
          <a href="/revision-diagnostic/" className="font-semibold text-brand-gold underline underline-offset-4">
            Revision Diagnostic
          </a>{' '}
          takes 4 minutes and tells you which part of your study system is leaking marks. Bring your result to
          the workshop and I&apos;ll tell you what I&apos;d fix first.
        </p>
      </div>
    )
  }

  /* ── The form ─────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-brand-purple/10 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60">Save your free place</p>
      <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">
        {WORKSHOP.dateLabel}, {WORKSHOP.timeLabel}
      </h2>
      <p className="mt-1 text-sm text-brand-text/65">{WORKSHOP.durationLabel}. Free. Replay sent to everyone who signs up.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-name" className="mb-1.5 block text-sm font-semibold text-brand-purple">
            First name
          </label>
          <input
            id="ws-name"
            type="text"
            autoComplete="given-name"
            autoCapitalize="words"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="ws-email" className="mb-1.5 block text-sm font-semibold text-brand-purple">
            Email (where the Zoom link goes)
          </label>
          <input
            id="ws-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 block text-sm font-semibold text-brand-purple">Your year</legend>
        <div className="flex flex-wrap gap-2">
          {YEARS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={year === value}
              onClick={() => setYear(value)}
              className={year === value ? chipOn : chipOff}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 block text-sm font-semibold text-brand-purple">
          Your subjects <span className="font-normal text-brand-text/55">(tick all that apply)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={subjects.includes(s)}
              onClick={() => toggleSubject(s)}
              className={subjects.includes(s) ? chipOn : chipOff}
            >
              {s}
            </button>
          ))}
        </div>
        {subjects.includes('Other') && (
          <input
            type="text"
            aria-label="Other subjects"
            placeholder="Which other subjects?"
            value={otherSubject}
            onChange={(e) => setOtherSubject(e.target.value)}
            className={`${fieldClass} mt-3`}
          />
        )}
      </fieldset>

      <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-brand-cream/60 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={wantsWhatsapp}
            onChange={(e) => setWantsWhatsapp(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-brand-purple/30 accent-brand-purple"
          />
          <span>
            <span className="block font-semibold text-brand-purple">
              Add me to the free WhatsApp community <span className="font-normal text-brand-text/55">(optional)</span>
            </span>
            <span className="mt-0.5 block text-sm leading-relaxed text-brand-text/70">
              Dr Waleed answers study questions there in public threads between workshops. Admin-only posting,
              numbers hidden from other members, leave any time.
            </span>
          </span>
        </label>
        {wantsWhatsapp && (
          <div className="mt-3">
            <label htmlFor="ws-phone" className="mb-1.5 block text-sm font-semibold text-brand-purple">
              Your mobile number (the one on WhatsApp)
            </label>
            <input
              id="ws-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="07xxx xxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
            />
            {phoneCheck && (
              <p className={`mt-1.5 text-sm ${phoneCheck.ok ? 'text-brand-text/65' : 'text-red-700'}`}>
                {phoneCheck.ok ? `We will add ${phoneCheck.display}` : phoneCheck.error}
              </p>
            )}
          </div>
        )}
      </div>

      {state === 'error' && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-6 w-full rounded-xl bg-brand-purple px-6 py-4 text-lg font-semibold text-brand-cream transition hover:bg-brand-purple-light disabled:opacity-60"
      >
        {state === 'sending' ? 'Saving your place…' : 'Save my free place'}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-brand-text/55">
        You will get the Zoom link, two reminders and the replay. Unsubscribe any time. Read the{' '}
        <a href="/privacy/" className="underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}
