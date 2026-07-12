'use client'

import { useState } from 'react'
import { subscribeNewsletter } from '@/lib/mailerlite'

type FormState = 'idle' | 'sending' | 'done' | 'error'

export default function NewsletterSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return
    const trimmedEmail = email.trim()
    const trimmedName = name.trim()
    if (!trimmedName || !trimmedEmail.includes('@')) {
      setState('error')
      setMessage('Add your first name and a real email address and you are in.')
      return
    }
    setState('sending')
    const result = await subscribeNewsletter(trimmedEmail, trimmedName)
    if (result === 'ok') {
      setState('done')
    } else if (result === 'invalid-email') {
      setState('error')
      setMessage('That email address does not look right. Check it and try again.')
    } else {
      setState('error')
      setMessage('Something went wrong on our end. Try again in a minute.')
    }
  }

  if (state === 'done') {
    return (
      <div
        role="status"
        className="rounded-2xl bg-brand-purple px-6 py-8 text-center sm:px-8"
      >
        <p className="font-serif text-2xl font-bold text-brand-gold">You&apos;re in.</p>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-brand-cream/90">
          The next issue lands on Sunday at 5pm. Until then, the{' '}
          <a href="/revision-diagnostic" className="font-semibold text-brand-gold underline underline-offset-4">
            Revision Diagnostic
          </a>{' '}
          will tell you what your revision needs first.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="ss-name">
          First name
        </label>
        <input
          id="ss-name"
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-brand-purple/15 bg-white px-4 py-3 text-brand-text placeholder:text-brand-text/40 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 sm:w-44"
        />
        <label className="sr-only" htmlFor="ss-email">
          Email address
        </label>
        <input
          id="ss-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-xl border border-brand-purple/15 bg-white px-4 py-3 text-brand-text placeholder:text-brand-text/40 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="rounded-xl bg-brand-purple px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-purple/90 disabled:opacity-60"
        >
          {state === 'sending' ? 'Joining…' : 'Join free'}
        </button>
      </div>
      {state === 'error' && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}
      <p className="mt-3 text-sm text-brand-text/60">
        One email a week. No spam, no daily drip, unsubscribe any time.
      </p>
    </form>
  )
}
