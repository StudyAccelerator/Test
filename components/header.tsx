'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

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

const EASE = [0.22, 1, 0.36, 1] as const

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Hover intent: open straight away, close on a short grace delay so the
     cursor can travel from the trigger into the panel without it vanishing. */
  const openTools = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setToolsOpen(true)
  }, [])

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setToolsOpen(false), 180)
  }, [])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  /* Close on outside click (touch devices) or Escape */
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
          {MORE_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="text-brand-purple hover:text-brand-gold font-semibold transition">
              {label}
            </a>
          ))}
          {/* Free tools dropdown: opens on hover or focus, click still works for touch */}
          <div
            className="relative"
            ref={toolsRef}
            onMouseEnter={openTools}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setToolsOpen(!toolsOpen)}
              onFocus={openTools}
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
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.14, ease: 'easeIn' } }}
                  transition={{ duration: 0.24, ease: EASE }}
                  style={{ transformOrigin: 'top center' }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-56"
                >
                  <div className="relative rounded-2xl bg-white p-2 [box-shadow:0_0_0_1px_rgba(46,37,87,.08),0_8px_16px_rgba(46,37,87,.08),0_24px_48px_rgba(46,37,87,.16)]">
                    <span
                      aria-hidden="true"
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-white [box-shadow:-1px_-1px_0_rgba(46,37,87,.08)]"
                    />
                    {FREE_TOOL_LINKS.map(([href, label], i) => (
                      <motion.a
                        key={href}
                        href={href}
                        onClick={() => setToolsOpen(false)}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: EASE, delay: 0.05 + i * 0.045 }}
                        className="group flex items-center justify-between rounded-xl px-4 py-2.5 font-semibold text-brand-purple hover:bg-brand-gold/10 hover:text-brand-gold transition"
                      >
                        {label}
                        <span
                          aria-hidden="true"
                          className="text-brand-gold/70 text-sm transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
