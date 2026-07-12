'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const PROGRAMME_LINKS = [
  ['/summer-accelerators', 'Summer Accelerator'],
  ['/study-systems', 'Study System'],
  ['/subject-accelerators', 'Subject Accelerators'],
]

const FREE_TOOL_LINKS = [
  ['/revision-diagnostic', 'Revision Diagnostic'],
  ['/revision-tracker', 'Revision Tracker'],
  ['/A-Level-Accelerators-Blurting-Template.pdf', 'Blurting Template'],
]

const MORE_LINKS = [
  ['/blog/', 'Blog'],
  ['/faqs', 'FAQs'],
]

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close the free tools dropdown on outside click or Escape */
  useEffect(() => {
    if (!toolsOpen) return
    const onClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setToolsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [toolsOpen])

  return (
    <header
      style={{
        backgroundColor: hasScrolled || open ? '#F3EBD8' : 'transparent',
      }}
      className="text-brand-purple py-0 sticky top-0 z-50 shadow-md border-b-4 border-brand-gold transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16 lg:h-32">
        <a href="/" className="flex items-center lg:h-80 lg:-my-32">
          <Image
            src="/logo-mark.png"
            alt="A-Level Accelerators"
            width={1326}
            height={365}
            className="h-12 w-auto lg:hidden"
            priority
            unoptimized
          />
          <Image
            src="/logo-header-new.png"
            alt=""
            aria-hidden="true"
            width={450}
            height={450}
            className="hidden lg:block h-80 w-auto"
            priority
            unoptimized
          />
        </a>
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 text-[15px] xl:gap-6 xl:text-base">
          {PROGRAMME_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="text-brand-purple hover:text-brand-gold font-semibold transition">
              {label}
            </a>
          ))}
          {/* Free tools dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              onClick={() => setToolsOpen(!toolsOpen)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1.5 font-semibold transition ${
                toolsOpen ? 'text-brand-gold' : 'text-brand-purple hover:text-brand-gold'
              }`}
            >
              Free Tools
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 rounded-2xl bg-white p-2 [box-shadow:0_0_0_1px_rgba(46,37,87,.08),0_8px_16px_rgba(46,37,87,.08),0_24px_48px_rgba(46,37,87,.16)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-white [box-shadow:-1px_-1px_0_rgba(46,37,87,.08)]"
                />
                {FREE_TOOL_LINKS.map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 font-semibold text-brand-purple hover:bg-brand-gold/10 hover:text-brand-gold transition"
                  >
                    {label}
                    <span aria-hidden="true" className="text-brand-gold/70 text-sm">→</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {MORE_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="text-brand-purple hover:text-brand-gold font-semibold transition">
              {label}
            </a>
          ))}
          <a
            href={BOOK_A_CALL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-brand-purple font-semibold border-2 border-brand-gold rounded-lg px-4 py-1.5 hover:bg-brand-gold transition"
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
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-lg text-brand-purple"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <nav className="lg:hidden px-4 pb-5 pt-1 flex flex-col gap-1">
          {PROGRAMME_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 font-semibold text-brand-purple hover:bg-brand-gold/15 transition"
            >
              {label}
            </a>
          ))}
          <p className="mt-2 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-purple/50">Free tools</p>
          {FREE_TOOL_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 font-semibold text-brand-purple hover:bg-brand-gold/15 transition"
            >
              {label}
            </a>
          ))}
          <div aria-hidden="true" className="my-1 h-px bg-brand-purple/10" />
          {MORE_LINKS.map(([href, label]) => (
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
