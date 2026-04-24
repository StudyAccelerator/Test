'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "I'm already swamped with schoolwork. Will this take up even more time?",
    answer: (
      <>
        <p className="mb-4">The programmes require just <strong>2-3 hours per week of your time</strong>. Yes, that&apos;s an investment upfront. But here&apos;s the reality: those 2-3 hours will save you <strong>weeks and months</strong> over your study journey.</p>
        <p className="mb-4">Why? Because you&apos;ll stop wasting time on ineffective study methods. You&apos;ll revise smarter, not harder. Students who use proper systems complete the same work in half the time and retain it better. It&apos;s not about adding more work — it&apos;s about working strategically.</p>
        <p className="text-brand-gold font-semibold">👉 This replaces wasted study time, it doesn&apos;t add more.</p>
      </>
    ),
  },
  {
    question: "How is this different from 1-to-1 subject tutoring?",
    answer: (
      <>
        <p className="mb-4 text-brand-gold font-semibold">Tutors help you understand content. This programme helps you manage everything that determines your results.</p>
        <p className="mb-4">Most 1-to-1 tutoring focuses on going through content — explaining what you need to know. That&apos;s not where students actually struggle.</p>
        <p className="mb-4">The real gap is in <strong>study technique</strong>. Students don&apos;t know how to prioritise effectively, manage their time, stay focused, or revise efficiently. These struggles apply to every subject.</p>
        <p className="mb-4">This programme teaches you <strong>how to become a better student</strong> — systems that work across all your subjects, now and for life. You&apos;ll learn to:</p>
        <ul className="list-disc ml-8 mb-4 space-y-1">
          <li>Identify which topics matter most (80/20 principle)</li>
          <li>Study at optimal times (peak energy blocks)</li>
          <li>Revise that actually sticks (active recall, spaced repetition)</li>
          <li>Overcome procrastination and burnout</li>
        </ul>
        <p>Combined, these systems elevate your performance across all A-Levels.</p>
      </>
    ),
  },
  {
    question: "Why not just get a tutor?",
    answer: (
      <>
        <p className="mb-4">Tutors help with individual subjects.</p>
        <p className="mb-4">But most students don&apos;t struggle with understanding, they struggle with:</p>
        <ul className="list-disc ml-8 mb-4 space-y-1">
          <li>managing their workload</li>
          <li>knowing what to prioritise</li>
          <li>staying consistent</li>
          <li>revising effectively</li>
        </ul>
        <p className="text-brand-gold font-semibold">This programme solves those problems across all subjects.</p>
      </>
    ),
  },
  {
    question: "How quickly will I see results?",
    answer: (
      <>
        <p className="mb-4">You&apos;ll see immediate improvements:</p>
        <ul className="list-disc ml-8 mb-4 space-y-1">
          <li><strong>Week 1:</strong> Clarity on what to prioritise. Less overwhelm.</li>
          <li><strong>Weeks 2-4:</strong> Better time management. More efficient study sessions.</li>
          <li><strong>Months 2-3:</strong> Noticeable grade improvements as systems compound.</li>
          <li><strong>By exam season:</strong> Noticeable improvements in how you study, prioritise, and manage your workload.</li>
        </ul>
        <p>The key is consistency. Apply the systems from day one, and you&apos;ll outpace peers who don&apos;t.</p>
      </>
    ),
  },
  {
    question: "Do you cover all A-Level subjects?",
    answer: (
      <>
        <p className="mb-4"><strong>Yes.</strong> The study systems work for any subject. You&apos;re not learning content; you&apos;re learning the <strong>meta-skills</strong> of how to study effectively.</p>
        <p className="mb-4">Whether it&apos;s Mathematics, Biology, History, or Languages — the principles of prioritisation, active recall, spaced repetition, and time management apply universally.</p>
        <p>In the Top 1% Mentorship tier, you also get subject-specific support for your particular A-Levels.</p>
      </>
    ),
  },
  {
    question: "What if I'm not happy with the programme?",
    answer: (
      <>
        <p className="mb-4 text-brand-gold font-semibold">👉 You can request a full refund after the first session if it&apos;s not right for you.</p>
        <p>For the Top 1% Mentorship, book your free consultation first. We&apos;ll discuss if it&apos;s the right fit for you.</p>
      </>
    ),
  },
  {
    question: "When does the next cohort start?",
    answer: (
      <>
        <p className="mb-4 text-brand-gold font-semibold">👉 Next cohort starts Wednesday May 6th.</p>
        <p>The Top 1% Mentorship is by appointment — we schedule 1:1s based on your availability.</p>
      </>
    ),
  },
  {
    question: "Can parents attend or get updates?",
    answer: (
      <>
        <p className="mb-4">The programmes are designed for students. However, parents are welcome to understand the systems so they can support at home.</p>
        <p>For the Top 1% Mentorship tier, we can include periodic updates with parents if that&apos;s helpful.</p>
      </>
    ),
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 px-4 bg-brand-light-gray">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-brand-purple text-center mb-12 font-serif">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full bg-brand-purple text-brand-cream p-6 flex justify-between items-center font-semibold text-left hover:bg-brand-purple-light transition"
                >
                  <span>{faq.question}</span>
                  <span className={`text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isOpen && (
                  <div className="p-6 text-brand-text leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
