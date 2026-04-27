'use client'

import { useState } from 'react'

const MAILERLITE_FORM_ACTION = 'https://assets.mailerlite.com/jsonp/2113061/forms/184389361466344885/subscribe'

const SUBJECT_OPTIONS = ['Maths', 'Biology', 'Chemistry', 'Other'] as const

export default function WorkshopForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      // Build URL-encoded body — MailerLite's endpoint expects
      // application/x-www-form-urlencoded, not multipart/form-data.
      const formData = new FormData(e.currentTarget)
      const params = new URLSearchParams()
      for (const [key, value] of formData.entries()) {
        params.append(key, value as string)
      }
      // no-cors: browser blocks reading the opaque response but MailerLite
      // still receives and processes the subscription.
      await fetch(MAILERLITE_FORM_ACTION, {
        method: 'POST',
        body: params,
        mode: 'no-cors',
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email Waleed@alevelaccelerators.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-4 border-brand-gold p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-3xl font-serif font-bold text-brand-purple mb-4">
          You&apos;re in!
        </h3>
        <p className="text-lg text-brand-text mb-3">
          Check your inbox for your confirmation email with the Zoom link and full details.
        </p>
        <p className="text-sm text-brand-muted">
          Can&apos;t find it? Check your spam/promotions folder, or email{' '}
          <a href="mailto:Waleed@alevelaccelerators.com" className="text-brand-gold underline">
            Waleed@alevelaccelerators.com
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border-2 border-brand-gold/40 p-8 md:p-10 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="first-name" className="block text-sm font-bold text-brand-purple mb-2">
            First name <span className="text-brand-gold">*</span>
          </label>
          <input
            id="first-name"
            name="fields[name]"
            type="text"
            required
            autoComplete="given-name"
            className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-bold text-brand-purple mb-2">
            Last name
          </label>
          <input
            id="last-name"
            name="fields[last_name]"
            type="text"
            autoComplete="family-name"
            className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-brand-purple mb-2">
          Email <span className="text-brand-gold">*</span>
        </label>
        <input
          id="email"
          name="fields[email]"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition"
        />
      </div>

      <div>
        <span className="block text-sm font-bold text-brand-purple mb-2">
          A-Level subjects
        </span>
        <div className="grid grid-cols-2 gap-3">
          {SUBJECT_OPTIONS.map((subject) => (
            <label
              key={subject}
              className="flex items-center gap-3 px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 cursor-pointer hover:border-brand-gold transition"
            >
              <input
                type="checkbox"
                name="fields[subjects][]"
                value={subject}
                className="w-4 h-4 accent-brand-gold"
              />
              <span className="text-brand-text font-medium">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="grades" className="block text-sm font-bold text-brand-purple mb-2">
          Current grades you&apos;re working at
        </label>
        <input
          id="grades"
          name="fields[current_grades]"
          type="text"
          placeholder="e.g. Maths: B, Biology: A, Chemistry: B"
          className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition"
        />
      </div>

      <div>
        <label htmlFor="concern" className="block text-sm font-bold text-brand-purple mb-2">
          What is currently your biggest academic concern?
        </label>
        <textarea
          id="concern"
          name="fields[concern]"
          rows={4}
          className="w-full px-4 py-3 rounded-md border-2 border-brand-cream-dark bg-brand-cream/40 text-brand-text focus:outline-none focus:border-brand-gold transition resize-y"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-8 py-4 bg-brand-gold text-brand-purple font-bold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {submitting ? 'Reserving your spot…' : 'Reserve My Free Spot →'}
      </button>

      <p className="text-xs text-brand-muted text-center">
        We&apos;ll email your Zoom link straight away. No spam, unsubscribe anytime.
      </p>
    </form>
  )
}
