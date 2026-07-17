'use client'

import { useState } from 'react'

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-brand-purple text-brand-cream p-6 flex justify-between items-center font-semibold text-left hover:bg-brand-purple-light transition"
      >
        <span>{question}</span>
        <span className={`text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {/* Always render the answer in the HTML (hidden until opened): AI answer
          engines and search crawlers read static HTML and never click. */}
      <div className={`p-6 text-brand-text leading-relaxed ${isOpen ? '' : 'hidden'}`}>
        {answer}
      </div>
    </div>
  )
}
