'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)

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
        backgroundColor: hasScrolled ? '#F3EBD8' : 'transparent',
      }}
      className="text-brand-purple py-0 sticky top-0 z-50 shadow-md border-b-4 border-brand-gold transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-0 h-32">
        <a href="/" className="h-80 w-auto flex items-center -my-32">
          <Image
            src="/logo-header-new.png"
            alt="A-Level Accelerators"
            width={450}
            height={450}
            className="h-80 w-auto"
            priority
            unoptimized
          />
        </a>
        <nav className="flex flex-wrap justify-center items-center gap-6 text-sm md:text-base">
          <a href="/" className="text-brand-purple hover:text-brand-gold font-semibold transition">Summer Accelerator</a>
          <a href="/study-systems" className="text-brand-purple hover:text-brand-gold font-semibold transition">Study System</a>
          <a href="/subject-accelerators" className="text-brand-purple hover:text-brand-gold font-semibold transition">Subject Accelerators</a>
          <a href="/revision-tracker" className="text-brand-purple hover:text-brand-gold font-semibold transition">Free Tracker</a>
          <a href="/blog/" className="text-brand-purple hover:text-brand-gold font-semibold transition">Blog</a>
          <a href="/faqs" className="text-brand-purple hover:text-brand-gold font-semibold transition">FAQs</a>
          <a
            href="https://scheduler.zoom.us/dr-waleed-ahmad/a-level"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-purple font-semibold border-2 border-brand-gold rounded-lg px-4 py-1.5 hover:bg-brand-gold transition"
          >
            Book a Free Call
          </a>
        </nav>
      </div>
    </header>
  )
}
