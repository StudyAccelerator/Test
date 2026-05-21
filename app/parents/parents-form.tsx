'use client'

import { useState } from 'react'

// Direct MailerLite API call — same proven approach as the revision tracker
const ML_API_KEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjUzMWQ4MTgyNzM5NmM3MTViZDVjN2ZhZDY5ZTYxMjNiYzZjMTViNjM1Y2Q3YjkwODI4YWY1YjlmMzgwYjE4Yjg5MmQ0N2FmM2M3YTM0ZWYiLCJpYXQiOjE3Nzg1MTIzODEuMjUwMjI2LCJuYmYiOjE3Nzg1MTIzODEuMjUwMjI5LCJleHAiOjQ5MzQxODU5ODEuMjQ2MjY1LCJzdWIiOiIyMTMxNzg2Iiwic2NvcGVzIjpbXX0.QQkqYoMhCzwoGI4g3LfZWhiGWZ_dWxGfQOrNfebTqL4R7OKHgpaEduW-J9AAdhWo2_bsRpKvi6NnVJA_rdeTPQUBnCmmXcvzahU4bVx7_Ulff0Ld_8_8a5boETdU3UrKTWMCjdXQkmpJ-1TiM5_Mi4iLOpB0vvPvG_U3Cya_ORnGsTSyDv5qQ7MQHqjytbaZ0R_aRWDA1-emMFymr2dXOv-iOW1Dly1dflxrIo6Yb0BPA-v6Chs4TjlHdEvwFvSRgzZAATN9dDSjGENQbhQIFmuUGQ00HiP1xsmS6qKaCU__iARC8z91GZyrbcf0m9ryHNhkScckYMoGu1sYIC9Hm2Wj_BKpI970L0-CAT5dDpolTbTd8absVHR3UOxuiWZSEHVcumvtPsZ6K5GP0zQ_ccFlMaqLrPs7o80wy9DWt97fDZ8_KuScHY20zKSG-beSojlzuUXXj4rpH33-9PeJ4puXIMirOWzsKJIaEEckRDumvyhawrliPhHMwelKhgpCxMZlA_Bc3-nwZMDiEZf_CtXgXOkzUSkJohkboZBELdeLOrv83EPRhpHXahEyZkOhURucBLtb5Fs0lFIkLKeI-RXAz_7TPByqlHkcxZV8xObgZpqtCGVd1q8oI2pwrD7D85H4i5wP70q-Lsv8BZl_G8RTosjdYckZn0nXlOTjehM'
const ML_GROUP_ID = '188021995515937985'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export default function ParentsForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState<string | null>(null)

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
      <div className="bg-white rounded-2xl shadow-lg border-4 border-brand-gold p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-3xl font-serif font-bold text-brand-purple mb-4">
          Thank you!
        </h3>
        <p className="text-lg text-brand-text mb-4">
          Your guide is on its way. You should receive it within the next minute.
        </p>
        <p className="text-sm text-brand-muted">
          Please check your spam and promotions folder if you do not see it in your inbox.
          If you have any questions, simply reply to that email and we will get back to you.
        </p>
      </div>
    )
  }

  /* ── Form ───────────────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border-2 border-brand-gold/40 p-8 md:p-10 space-y-5"
    >
      {/* First name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-bold text-brand-purple mb-2">
          First name <span className="text-brand-gold">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder="e.g. Sarah"
          className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-brand-purple mb-2">
          Email address <span className="text-brand-gold">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition"
        />
      </div>

      {/* Child's year group */}
      <div>
        <label htmlFor="yearGroup" className="block text-sm font-bold text-brand-purple mb-2">
          Child&apos;s year group <span className="text-brand-gold">*</span>
        </label>
        <select
          id="yearGroup"
          name="yearGroup"
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition appearance-none"
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
        <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-8 py-4 bg-brand-gold text-brand-purple font-bold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {submitting ? 'Sending your guide…' : 'Send Me the Free Guide'}
      </button>

      <p className="text-xs text-brand-muted text-center">
        No spam. Just useful advice for parents of A-Level students.
      </p>
    </form>
  )
}
