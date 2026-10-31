'use client'

import { useEffect, useState } from 'react'
import { ACADEMY, foundingOpen } from '@/lib/academy'

/* Every "join" call to action on the Academy page goes through this one
   component, so the price, the Stripe link and the founding/standard switch
   live in one place. The deadline check runs in the browser (static export).
   While Waleed has not pasted the Stripe links in, the button is an honest
   note rather than a dead link. Each click logs a GA4 event with its
   placement so the page's hot spots can be read later. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function useFounding(): boolean {
  const [founding, setFounding] = useState(true)
  useEffect(() => {
    setFounding(foundingOpen())
    const t = setInterval(() => setFounding(foundingOpen()), 60_000)
    return () => clearInterval(t)
  }, [])
  return founding
}

export default function JoinButton({
  placement,
  label,
  size = 'lg',
  tone = 'purple',
  to = 'checkout',
  className = '',
}: {
  placement: string
  label?: string
  size?: 'md' | 'lg' | 'xl'
  tone?: 'purple' | 'gold'
  /* "pricing" scrolls to the price block (Waleed, 31 October: every button
     above it reads "Secure your place now" and takes the reader down to the
     offer); "checkout" is the Stripe link itself, used on the price card. */
  to?: 'pricing' | 'checkout'
  className?: string
}) {
  const founding = useFounding()
  const price = founding ? ACADEMY.foundingPrice : ACADEMY.standardPrice
  const stripe = founding ? ACADEMY.stripeFoundingUrl : ACADEMY.stripeStandardUrl
  const href = to === 'pricing' ? '#pricing' : stripe
  const text = label ?? (to === 'pricing' ? 'Secure your place now' : founding ? 'Become a founding member' : `Join the Top 1% Academy, £${price} a month`)

  const sizes = {
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }[size]
  const tones = {
    purple:
      'bg-brand-purple text-brand-cream shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light',
    gold: 'bg-brand-gold text-brand-purple shadow-[inset_0_-8px_10px_rgba(255,255,255,.25),0_10px_24px_rgba(0,0,0,.25)] hover:brightness-105',
  }[tone]

  if (!href) {
    return (
      <p
        className={`inline-flex max-w-md items-center justify-center rounded-full border border-brand-gold/50 px-6 py-3 text-center text-sm font-semibold text-brand-purple ${className}`}
      >
        Membership opens again shortly. Email {ACADEMY.contactEmail} to join.
      </p>
    )
  }

  return (
    <a
      href={href}
      onClick={() => {
        try {
          window.gtag?.('event', 'academy_join_click', { placement, to, founding: founding ? 'yes' : 'no', price })
        } catch {}
      }}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all hover:-translate-y-0.5 ${sizes} ${tones} ${className}`}
    >
      {text}
    </a>
  )
}
