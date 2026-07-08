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
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-0 h-auto md:h-32 py-4 md:py-0">
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
        <nav className="mt-3 md:mt-0 grid grid-cols-2 md:flex gap-x-8 gap-y-3 md:gap-6 text-sm md:text-base text-center md:text-left">
          <a href="/" className="text-brand-purple hover:text-brand-gold font-semibold transition">Study System</a>
          <a href="/subject-accelerators" className="text-brand-purple hover:text-brand-gold font-semibold transition">Subject Accelerators</a>
          <a href="/blog/" className="text-brand-purple hover:text-brand-gold font-semibold transition">Blog</a>
          <a href="/#faq" className="text-brand-purple hover:text-brand-gold font-semibold transition">FAQs</a>
          <a href="/#contact" className="text-brand-purple hover:text-brand-gold font-semibold transition">Contact</a>
        </nav>
      </div>
    </header>
  )
}
