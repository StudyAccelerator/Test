import Image from 'next/image'
import { ScrollFade } from '@/components/ui/scroll-fade'
import WorkshopForm from './workshop-form'

export const metadata = {
  title: 'Free Top 1% Study Systems Workshop | A-Level Accelerators',
  description:
    'Free live workshop for A-Level students. Learn how to stay on top of your workload, avoid burnout and study like the top 1%. Saturday 2nd May, 10:00am London (live on Zoom).',
}

export default function WorkshopLanding() {
  return (
    <main className="bg-brand-cream">
      {/* Minimal logo bar, no nav, to keep ad traffic focused */}
      <header className="bg-brand-cream-dark border-b-4 border-brand-gold">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-center">
          <Image
            src="/logo-header-new.png"
            alt="A-Level Accelerators"
            width={550}
            height={150}
            className="h-96 w-auto"
            priority
            unoptimized
          />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-20 md:py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-brand-gold text-brand-purple px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-6">
            Free Live Workshop
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-gold leading-tight mb-6">
            Feeling <span className="text-white font-bold">Overwhelmed</span>{' '}Trying to Keep Up With School,
            Revision &amp; Everything Else?
          </h1>
          <p className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join the <span className="text-brand-cream font-bold">Free Top 1% Study Systems Workshop</span> and
            learn how to stay on top of your workload, avoid burnout, and study like the top 1%.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-base md:text-lg mb-10">
            <div className="flex items-center gap-2">
              <span className="text-brand-gold">📅</span>
              <span><strong>Saturday 2nd May</strong></span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-brand-gold opacity-40" />
            <div className="flex items-center gap-2">
              <span className="text-brand-gold">🕙</span>
              <span><strong>10:00am</strong> (London time)</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-brand-gold opacity-40" />
            <div className="flex items-center gap-2">
              <span className="text-brand-gold">💻</span>
              <span>Live on Zoom</span>
            </div>
          </div>

          <a
            href="#signup"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-bold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Reserve My Free Spot →
          </a>
          <p className="text-sm opacity-80 mt-4">Limited spots, workshop runs live online.</p>
        </div>
      </section>

      {/* What you'll learn */}
      <ScrollFade>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4 font-bold">
              What You&apos;ll Learn in 1 Hour
            </h2>
            <p className="text-center text-brand-text mb-12 text-lg">
              Focused, structured and interactive, come ready to think and participate.
            </p>

            <ul className="space-y-4">
              {[
                ['Manage your time', 'without feeling constantly behind'],
                ['Stay consistent', 'even when motivation drops'],
                ['Revise', 'in a way that actually works'],
                ['Handle pressure', 'during exams and deadlines'],
                ['Maximise your performance', 'in the final stretch before exams'],
                ['Study like the top 1%', 'using systems, not just willpower'],
              ].map(([bold, rest]) => (
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

      {/* Exclusive gift teaser */}
      <ScrollFade delay={0.1}>
        <section className="py-16 px-6 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md border-4 border-brand-gold p-8 md:p-10 text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-purple mb-4">
                Exclusive Gift for Live Attendees
              </h3>
              <p className="text-lg text-brand-text">
                As a thank you for showing up live, there will also be an{' '}
                <strong className="text-brand-gold">Exclusive Gift</strong>{' '}
                shared during the session.
                Trust me, you don&apos;t want to miss it.
              </p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Why trust me */}
      <ScrollFade delay={0.1}>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12 font-bold">
              Who&apos;s Running It
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
                    style={{ objectPosition: 'center 45%', transform: 'scale(1.25)', transformOrigin: 'center 45%' }}
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm italic text-brand-gold font-semibold">Dr. Waleed Ahmad, MBBS</p>
                <p className="text-xs text-brand-muted">Founder, A-Level Accelerators</p>
              </div>

              <div className="border-2 border-brand-gold rounded-xl p-6 bg-brand-cream/40 max-w-md">
                <p className="text-base md:text-lg text-brand-text leading-relaxed mb-4">
                  As a doctor and former top-performing A-Level student, I&apos;ve worked with over{' '}
                  <strong className="text-brand-purple">1,000 students</strong> to help them improve their grades,
                  manage their workload, and build study systems that actually work.
                </p>
                <p className="text-base md:text-lg text-brand-text leading-relaxed">
                  I built these systems myself going through A-Levels, and I know first-hand what it takes to
                  perform under pressure without burning out.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Sign-up form */}
      <ScrollFade delay={0.1}>
        <section
          id="signup"
          className="py-20 px-6 bg-gradient-to-br from-brand-purple to-brand-purple-light scroll-mt-24"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 text-brand-cream">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-gold mb-4">
                Reserve Your Free Spot
              </h2>
              <p className="text-lg opacity-90">
                Saturday 2nd May · 10:00am London · Live on Zoom
              </p>
            </div>

            <WorkshopForm />
          </div>
        </section>
      </ScrollFade>

      {/* Footer */}
      <footer className="bg-brand-purple text-brand-cream py-8 px-6 border-t-4 border-brand-gold">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-2">
            Questions before the workshop?{' '}
            <a href="mailto:Waleed@alevelaccelerators.com" className="text-brand-gold hover:text-white transition">
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
