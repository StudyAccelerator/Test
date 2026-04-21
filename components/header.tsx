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
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-0 h-20">
        <a href="#top" className="h-16 w-auto flex items-center">
          <Image
            src="/logo-header-new.png"
            alt="A-Level Accelerators"
            width={450}
            height={450}
            className="h-16 w-auto"
            priority
            unoptimized
          />
        </a>
        <nav className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <a href="#tiers" className="text-brand-purple hover:text-brand-gold font-semibold transition">Our Programmes</a>
          <a href="/subject-accelerators" className="text-brand-purple hover:text-brand-gold font-semibold transition">Subject Accelerators</a>
          <a href="#faq" className="text-brand-purple hover:text-brand-gold font-semibold transition">FAQs</a>
          <a href="#contact" className="text-brand-purple hover:text-brand-gold font-semibold transition">Contact</a>
        </nav>
      </div>
    </header>
  )
}
