'use client'

import { useEffect, useState } from 'react'
import { ACADEMY } from '@/lib/academy'
import JoinButton, { useFounding } from '@/components/academy/join-button'

/* Mobile-only bar pinned to the bottom of the screen once the reader has
   scrolled past the hero, so the join button is never more than a thumb
   away. Hides while the pricing block itself is on screen. */

export default function StickyJoinBar() {
  const founding = useFounding()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const pricing = document.getElementById('pricing')
    let pricingVisible = false
    const io = pricing
      ? new IntersectionObserver(([e]) => {
          pricingVisible = e.isIntersecting
          setShow(window.scrollY > 600 && !pricingVisible)
        })
      : null
    if (pricing && io) io.observe(pricing)
    const onScroll = () => setShow(window.scrollY > 600 && !pricingVisible)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [])

  if (!ACADEMY.stripeFoundingUrl && !ACADEMY.stripeStandardUrl) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-purple/10 bg-brand-cream/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-lg font-bold leading-tight text-brand-purple">
            {founding ? (
              <>
                <span className="text-brand-text/45 line-through">£{ACADEMY.standardPrice}</span>{' '}
                £{ACADEMY.foundingPrice} a month
              </>
            ) : (
              <>£{ACADEMY.standardPrice} a month</>
            )}
          </p>
          <p className="truncate text-xs text-brand-text/65">
            {founding ? `Founding price closes ${ACADEMY.foundingDeadlineLabel}` : 'Cancel any time'}
          </p>
        </div>
        <JoinButton placement="sticky_bar" size="md" to="pricing" label="Secure your place" className="flex-none" />
      </div>
    </div>
  )
}
