'use client'

import { useState } from 'react'

// Direct MailerLite API call, same proven approach as the revision tracker
const ML_API_KEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjUzMWQ4MTgyNzM5NmM3MTViZDVjN2ZhZDY5ZTYxMjNiYzZjMTViNjM1Y2Q3YjkwODI4YWY1YjlmMzgwYjE4Yjg5MmQ0N2FmM2M3YTM0ZWYiLCJpYXQiOjE3Nzg1MTIzODEuMjUwMjI2LCJuYmYiOjE3Nzg1MTIzODEuMjUwMjI5LCJleHAiOjQ5MzQxODU5ODEuMjQ2MjY1LCJzdWIiOiIyMTMxNzg2Iiwic2NvcGVzIjpbXX0.QQkqYoMhCzwoGI4g3LfZWhiGWZ_dWxGfQOrNfebTqL4R7OKHgpaEduW-J9AAdhWo2_bsRpKvi6NnVJA_rdeTPQUBnCmmXcvzahU4bVx7_Ulff0Ld_8_8a5boETdU3UrKTWMCjdXQkmpJ-1TiM5_Mi4iLOpB0vvPvG_U3Cya_ORnGsTSyDv5qQ7MQHqjytbaZ0R_aRWDA1-emMFymr2dXOv-iOW1Dly1dflxrIo6Yb0BPA-v6Chs4TjlHdEvwFvSRgzZAATN9dDSjGENQbhQIFmuUGQ00HiP1xsmS6qKaCU__iARC8z91GZyrbcf0m9ryHNhkScckYMoGu1sYIC9Hm2Wj_BKpI970L0-CAT5dDpolTbTd8absVHR3UOxuiWZSEHVcumvtPsZ6K5GP0zQ_ccFlMaqLrPs7o80wy9DWt97fDZ8_KuScHY20zKSG-beSojlzuUXXj4rpH33-9PeJ4puXIMirOWzsKJIaEEckRDumvyhawrliPhHMwelKhgpCxMZlA_Bc3-nwZMDiEZf_CtXgXOkzUSkJohkboZBELdeLOrv83EPRhpHXahEyZkOhURucBLtb5Fs0lFIkLKeI-RXAz_7TPByqlHkcxZV8xObgZpqtCGVd1q8oI2pwrD7D85H4i5wP70q-Lsv8BZl_G8RTosjdYckZn0nXlOTjehM'
const ML_GROUP_ID = '188021995515937985'

// Shared field styling: soft border, gentle cream fill, gold focus ring
const fieldClass =
  'w-full rounded-xl border border-brand-purple/15 bg-brand-cream/50 px-4 py-3.5 text-brand-text placeholder:text-brand-text/35 transition focus:border-brand-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-gold/15'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export default function ParentsForm() {
  const [submitting, setSubmitting]     = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [error, setError]               = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData  = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const email     = formData.get('email')     as string
    const yearGroup = formData.get('yearGroup') as string

    try {
      const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${ML_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          fields: { name: firstName, year_group: yearGroup },
          groups: [ML_GROUP_ID],
        }),
      })

      if (!res.ok) {
        const body = await res.text()
        console.error('[parents-form] MailerLite error:', res.status, body)
        setError('Something went wrong. Please try again or email Waleed@alevelaccelerators.com.')
        return
      }

      // Fire conversion events after confirmed success
      window.fbq?.('track', 'Lead')
      window.gtag?.('event', 'generate_lead')

      setSubmittedName(firstName)
      setSubmitted(true)
    } catch (err) {
      console.error('[parents-form] Fetch error:', err)
      setError('Something went wrong. Please try again or email Waleed@alevelaccelerators.com.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Success state ──────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,.22)] sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/15 ring-1 ring-brand-gold/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-brand-gold"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-purple sm:text-3xl">
          {submittedName}, your guide is on its way
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-brand-text/70">
          It lands in your inbox within a minute. If it is not there, have a quick look in your spam
          or promotions folder, it sometimes hides.
        </p>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-brand-text/55">
          Any questions, just reply to that email or{' '}
          <a
            href="mailto:Waleed@alevelaccelerators.com"
            className="font-semibold text-brand-gold underline underline-offset-2 transition hover:text-brand-purple"
          >
            email me directly
          </a>
          . I read every one.
        </p>
      </div>
    )
  }

  /* ── Form ───────────────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,.22)] sm:p-10"
    >
      {/* First name */}
      <div>
        <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-brand-purple">
          First name <span className="text-brand-gold">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder="e.g. Sarah"
          className={fieldClass}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-purple">
          Email address <span className="text-brand-gold">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className={fieldClass}
        />
      </div>

      {/* Child's year group */}
      <div>
        <label htmlFor="yearGroup" className="mb-1.5 block text-sm font-semibold text-brand-purple">
          Child&apos;s year group <span className="text-brand-gold">*</span>
        </label>
        <select
          id="yearGroup"
          name="yearGroup"
          required
          defaultValue=""
          className={`${fieldClass} appearance-none`}
          style={{
            backgroundImage:    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%232E2557' d='M0 0l5 6 5-6z'/></svg>")`,
            backgroundRepeat:   'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight:       '40px',
          }}
        >
          <option value="" disabled>Select year group</option>
          <option value="Year 9">Year 9</option>
          <option value="Year 10">Year 10</option>
          <option value="Year 11">Year 11</option>
          <option value="Year 12">Year 12</option>
          <option value="Year 13">Year 13</option>
          <option value="Gap Year">Gap Year</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-gold px-8 py-4 text-lg font-bold text-brand-purple shadow-[0_12px_28px_rgba(201,169,110,.35)] transition-all hover:-translate-y-0.5 hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {submitting ? 'Sending your guide…' : 'Send me the free guide'}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-brand-text/50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        No spam. Just useful advice for parents of A-level students.
      </p>
    </form>
  )
}
