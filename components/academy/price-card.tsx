'use client'

import { useEffect, useState } from 'react'
import { ACADEMY } from '@/lib/academy'
import JoinButton, { useFounding } from '@/components/academy/join-button'

/* The pricing block: standard price struck through, founding price large and
   bold, the real deadline with a live count, what is included, and both
   guarantees. After the deadline it shows the standard price plainly. */

const INCLUDED = [
  ['Study Academy + Hot Seat', 'Every Wednesday, 7pm to 9pm, live with Dr Waleed'],
  ['The Marks Clinic', 'Every Sunday, 10am to 12pm, your real work on screen'],
  ['16 hours a month live', 'Across every subject you take'],
  ['The Method Library', 'Every session recorded, in the library the same night'],
  ['24/7 access to Dr Waleed', 'Message any time in the community, replies the same day'],
  ['The Workshop Replay', 'Your Start Here course, in four lessons'],
]

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    const tick = () => setLeft(Date.parse(iso) - Date.now())
    tick()
    const t = setInterval(tick, 30_000)
    return () => clearInterval(t)
  }, [iso])
  return left
}

function countdownLabel(ms: number): string {
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  if (days >= 1) return `${days} day${days === 1 ? '' : 's'} and ${hours} hour${hours === 1 ? '' : 's'} left`
  const mins = Math.floor((ms % 3_600_000) / 60_000)
  return `${hours} hour${hours === 1 ? '' : 's'} and ${mins} minute${mins === 1 ? '' : 's'} left`
}

export default function PriceCard() {
  const founding = useFounding()
  const left = useCountdown(ACADEMY.foundingDeadlineISO)

  return (
    <div
      id="pricing"
      className="scroll-mt-20 overflow-hidden rounded-3xl bg-brand-purple text-brand-cream shadow-2xl ring-1 ring-brand-purple/20"
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        {/* Left: the price */}
        <div className="p-7 sm:p-10">
          {founding ? (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Founding cohort price</p>
              <p className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
                <span className="font-serif text-3xl text-brand-cream/45 line-through decoration-brand-gold/80 decoration-[3px] sm:text-4xl">
                  £{ACADEMY.standardPrice}
                </span>
                <span className="font-serif text-7xl font-bold leading-none text-brand-gold sm:text-8xl">
                  £{ACADEMY.foundingPrice}
                </span>
                <span className="pb-2 text-lg text-brand-cream/80">a month</span>
              </p>
              <p className="mt-5 text-lg leading-relaxed text-brand-cream/85">
                Join this week and <strong className="text-brand-cream">£{ACADEMY.foundingPrice} a month is your price for as long as you stay</strong>,
                even once it rises to £{ACADEMY.standardPrice} for everyone else.
              </p>
              <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-brand-gold/10 px-5 py-4">
                <p className="font-semibold text-brand-gold">Founding price closes {ACADEMY.foundingDeadlineLabel}</p>
                {left !== null && left > 0 && (
                  <p className="mt-1 font-mono text-sm text-brand-cream/80">{countdownLabel(left)}</p>
                )}
                <p className="mt-1 text-sm text-brand-cream/70">
                  First session {ACADEMY.firstSessionLabel}, 7pm. First Marks Clinic {ACADEMY.firstClinicLabel}, 10am.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Membership</p>
              <p className="mt-5 flex items-end gap-3">
                <span className="font-serif text-7xl font-bold leading-none text-brand-gold sm:text-8xl">
                  £{ACADEMY.standardPrice}
                </span>
                <span className="pb-2 text-lg text-brand-cream/80">a month</span>
              </p>
              <p className="mt-5 text-lg leading-relaxed text-brand-cream/85">
                Monthly, cancel any time. Your first live session is the next Wednesday after you join.
              </p>
            </>
          )}

          <div className="mt-8">
            <JoinButton placement="price_card" size="xl" tone="gold" to="checkout" className="w-full" />
          </div>
          <p className="mt-4 text-center text-sm text-brand-cream/65">
            Secure checkout with Stripe. Monthly, cancel any time, no notice period.
          </p>
        </div>

        {/* Right: what's included and the guarantees */}
        <div className="border-t border-brand-cream/10 bg-white/[0.04] p-7 sm:p-10 md:border-l md:border-t-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Everything included</p>
          <ul className="mt-5 space-y-4">
            {INCLUDED.map(([title, body]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-gold text-[11px] font-bold text-brand-purple">
                  ✓
                </span>
                <span>
                  <span className="block font-semibold text-brand-cream">{title}</span>
                  <span className="block text-sm text-brand-cream/70">{body}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <div className="rounded-2xl bg-brand-cream p-5 text-brand-text">
              <p className="font-serif text-lg font-bold text-brand-purple">{ACADEMY.guaranteeDays} day money-back guarantee</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-text/75">
                Come to your first week of sessions. If it isn&apos;t for you, email Dr Waleed and you get every penny
                back, no questions asked.
              </p>
            </div>
            {founding && (
              <div className="rounded-2xl border border-brand-gold/50 bg-brand-gold/10 p-5">
                <p className="font-serif text-lg font-bold text-brand-gold">The founding cohort grade guarantee</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-cream/80">
                  Work with Dr Waleed for six months, and if you don&apos;t get the grades you need for your university
                  offer, he keeps working with you for free until you do.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
