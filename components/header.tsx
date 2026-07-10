'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  ['/summer-accelerators', 'Summer Accelerator'],
  ['/study-systems', 'Study System'],
  ['/subject-accelerators', 'Subject Accelerators'],
  ['/revision-tracker', 'Free Tracker'],
  ['/blog/', 'Blog'],
  ['/faqs', 'FAQs'],
]

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        backgroundColor: hasScrolled || open ? '#F3EBD8' : 'transparent',
      }}
      className="text-brand-purple py-0 sticky top-0 z-50 shadow-md border-b-4 border-brand-gold transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16 md:h-32">
        <a href="/" className="flex items-center md:h-80 md:-my-32">
          <Image
            src="/logo-mark.png"
            alt="A-Level Accelerators"
            width={1326}
            height={365}
            className="h-12 w-auto md:hidden"
            priority
            unoptimized
          />
          <Image
            src="/logo-header-new.png"
            alt=""
            aria-hidden="true"
            width={450}
            height={450}
            className="hidden md:block h-80 w-auto"
            priority
            unoptimized
          />
        </a>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-base">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="text-brand-purple hover:text-brand-gold font-semibold transition">
              {label}
            </a>
          ))}
          <a
            href={BOOK_A_CALL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-purple font-semibold border-2 border-brand-gold rounded-lg px-4 py-1.5 hover:bg-brand-gold transition"
          >
            Book a Free Call
          </a>
        </nav>
        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-brand-purple"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-7 w-7" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden px-4 pb-5 pt-1 flex flex-col gap-1">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 font-semibold text-brand-purple hover:bg-brand-gold/15 transition"
            >
              {label}
            </a>
          ))}
          <a
            href={BOOK_A_CALL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg border-2 border-brand-gold px-3 py-2.5 text-center font-semibold text-brand-purple hover:bg-brand-gold transition"
          >
            Book a Free Call
          </a>
        </nav>
      )}
    </header>
  )
}
