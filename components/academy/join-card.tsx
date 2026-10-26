'use client'

import { useEffect, useState } from 'react'
import { ACADEMY, foundingOpen } from '@/lib/academy'

/* The price-and-join card for the Top 1% Academy page. A client component
   because the founding price closes at a fixed instant (lib/academy.ts) and
   the site is a static export, so the switch has to happen in the browser.
   Renders the founding offer by default (what a build sees before the
   deadline) and corrects itself on mount. While Waleed has not pasted the
   Stripe links in, the button is replaced by an honest note rather than a
   dead link. */

const INCLUDED = [
  'Tuesday 7pm to 9pm: one hour of teaching, one hour of Hot Seat',
  'Saturday 2pm to 4pm: The Marks Clinic, your real work on screen',
  'Every session recorded and in the library the same night',
  'Ask Dr Waleed anything in the community, answered in public',
  'The Workshop Replay as your Start Here course',
]

export default function JoinCard({ compact = false }: { compact?: boolean }) {
  const [founding, setFounding] = useState(true)
  useEffect(() => {
    setFounding(foundingOpen())
    const t = setInterval(() => setFounding(foundingOpen()), 60_000)
    return () => clearInterval(t)
  }, [])

  const price = founding ? ACADEMY.foundingPrice : ACADEMY.standardPrice
  const href = founding ? ACADEMY.stripeFoundingUrl : ACADEMY.stripeStandardUrl

  return (
    <div
      id={compact ? undefined : 'join'}
      className="scroll-mt-24 overflow-hidden rounded-3xl bg-brand-purple text-brand-cream shadow-xl ring-1 ring-brand-purple/20"
    >
      <div className="p-6 sm:p-8">
        {founding ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">
            Founding cohort price, closes {ACADEMY.foundingDeadlineLabel}
          </p>
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Membership</p>
        )}
        <p className="mt-3 flex items-end gap-2">
          <span className="font-serif text-6xl font-bold leading-none">£{price}</span>
          <span className="pb-1 text-brand-cream/70">a month</span>
          {founding && (
            <span className="pb-1 text-brand-cream/50 line-through">£{ACADEMY.standardPrice}</span>
          )}
        </p>
        <p className="mt-3 leading-relaxed text-brand-cream/80">
          {founding
            ? `Join from the workshop and £${ACADEMY.foundingPrice} a month is your price for as long as you stay, even after it rises to £${ACADEMY.standardPrice}.`
            : 'Monthly, cancel any time. Your first live session is the next Tuesday after you join.'}
        </p>

        {!compact && (
          <ul className="mt-6 space-y-2.5">
            {INCLUDED.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-snug text-brand-cream/90">
                <span className="mt-1 h-4 w-4 flex-none rounded-full bg-brand-gold text-center text-[10px] font-bold leading-4 text-brand-purple">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7">
          {href ? (
            <a
              href={href}
              className="block w-full rounded-xl bg-brand-gold px-6 py-4 text-center text-lg font-semibold text-brand-purple transition hover:brightness-105"
            >
              Join the Top 1% Academy, £{price} a month
            </a>
          ) : (
            <p className="rounded-xl border border-brand-gold/40 px-5 py-4 text-center text-[15px] text-brand-cream/85">
              Founding places open straight after Saturday&apos;s workshop. The link lands in your email the same day.
            </p>
          )}
          <p className="mt-3 text-center text-sm text-brand-cream/70">
            {ACADEMY.guaranteeDays}{' '}day money-back guarantee. Come to your first week of sessions, and if it isn&apos;t
            for you, email Dr Waleed and you get every penny back.
          </p>
        </div>
      </div>
    </div>
  )
}
