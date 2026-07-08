import Image from 'next/image'
import { ScrollFade } from '@/components/ui/scroll-fade'
import ParentsForm from './parents-form'

export const metadata = {
  title: 'Free Parent Guide | A-Level Accelerators',
  description:
    'Download the free parent guide that explains why your child may be working hard but still not getting the grades they need.',
  alternates: { canonical: 'https://alevelaccelerators.com/parents/' },
}

const BULLETS: [string, string][] = [
  ['Why effort alone', 'is not enough to improve A-Level grades'],
  [
    'The 4-tier system',
    'that separates B students from A and A* students',
  ],
  [
    'Three questions to ask your child',
    'this week that will tell you more than any exam result',
  ],
]

export default function ParentsLanding() {
  return (
    <main className="bg-brand-cream">

      {/* ── Logo bar ────────────────────────────────────────────────────── */}
      <header className="bg-brand-cream-dark border-b-4 border-brand-gold h-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-center">
          <Image
            src="/logo-header-new.png"
            alt="A-Level Accelerators"
            width={450}
            height={450}
            className="h-64 w-auto"
            priority
            unoptimized
          />
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-20 md:py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-brand-gold text-brand-purple px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-6">
            Free Parent Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold leading-tight mb-6">
            Is Your Child Working Hard But Still Not Getting the{' '}
            <span className="text-white">Grades They Need?</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Download the free parent guide that explains exactly why and what to do about it.
          </p>
          <p className="text-sm text-brand-gold font-semibold mb-10 opacity-90">
            By Dr Waleed Ahmad, MBBS. Founder of A-Level Accelerators
          </p>
          <a
            href="#get-guide"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-bold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Get the Free Guide
          </a>
        </div>
      </section>

      {/* ── What's inside ────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4 font-bold">
              What&apos;s Inside the Guide
            </h2>
            <p className="text-center text-brand-text mb-12 text-lg">
              A straightforward guide written specifically for parents.
            </p>

            <ul className="space-y-4">
              {BULLETS.map(([bold, rest]) => (
                <li
                  key={bold}
                  className="flex items-start gap-4 bg-brand-cream/60 border-l-4 border-brand-gold rounded-md p-5"
                >
                  <span className="text-brand-gold font-bold text-xl leading-none mt-0.5">✓</span>
                  <p className="text-lg text-brand-text">
                    <strong className="text-brand-purple">{bold}</strong> {rest}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollFade>

      {/* ── Who wrote it ─────────────────────────────────────────────────── */}
      <ScrollFade delay={0.1}>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12 font-bold">
              Who Wrote It
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-64 h-64 overflow-hidden rounded-2xl"
                  style={{ boxShadow: '3px 3px 8px rgba(46, 37, 87, 0.18)' }}
                >
                  <Image
                    src="/graduation.jpg"
                    alt="Dr Waleed Ahmad"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: 'center 45%',
                      transform: 'scale(1.25)',
                      transformOrigin: 'center 45%',
                    }}
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm italic text-brand-gold font-semibold">
                  Dr Waleed Ahmad, MBBS
                </p>
                <p className="text-xs text-brand-muted">Founder, A-Level Accelerators</p>
              </div>

              <div className="border-2 border-brand-gold rounded-xl p-6 bg-brand-cream/40 max-w-md">
                <p className="text-base md:text-lg text-brand-text leading-relaxed mb-4">
                  As a doctor and former top-performing A-Level student, I have worked with over{' '}
                  <strong className="text-brand-purple">1,000 students</strong> to help them
                  improve their grades, manage their workload, and build study systems that
                  actually work.
                </p>
                <p className="text-base md:text-lg text-brand-text leading-relaxed">
                  I wrote this guide specifically for parents who can see their child is trying
                  hard but not getting the results they deserve.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <ScrollFade delay={0.1}>
        <section
          id="get-guide"
          className="py-20 px-6 bg-gradient-to-br from-brand-purple to-brand-purple-light scroll-mt-24"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 text-brand-cream">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-gold mb-4">
                Get Your Free Guide
              </h2>
              <p className="text-lg opacity-90">
                Enter your details below and we will send it straight to your inbox.
              </p>
            </div>

            <ParentsForm />
          </div>
        </section>
      </ScrollFade>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-brand-purple text-brand-cream py-8 px-6 border-t-4 border-brand-gold">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-2">
            Questions?{' '}
            <a
              href="mailto:Waleed@alevelaccelerators.com"
              className="text-brand-gold hover:text-white transition"
            >
              Waleed@alevelaccelerators.com
            </a>
          </p>
          <p className="text-xs opacity-60">
            &copy; 2026 A-Level Accelerators. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
