import Header from '@/components/header'
import Footer from '@/components/footer'
import { HeroFade, HeroHeadline, HeroWord } from '@/components/home/hero-reveal'
import TrackerApp from '@/components/tracker/tracker-app'

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export default function RevisionTrackerPage() {
  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>

      <main>
        <section className="relative overflow-hidden px-5 pb-10 pt-12 text-center sm:pt-16 print:hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className={EYEBROW}>Free A-level revision timetable maker and topic audit</p>
            <h1
              aria-label="Stop revising in the dark."
              className="mt-3 font-serif text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl"
            >
              <HeroHeadline>
                <HeroWord>Stop</HeroWord> <HeroWord>revising</HeroWord> <HeroWord>in</HeroWord>{' '}
                <HeroWord>the</HeroWord> <HeroWord className="italic text-brand-gold">dark.</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.35}>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/70">
                Find your weakest topics first, then get a week built around fixing them, inside the hours you actually
                have. Free, and it takes about three minutes.
              </p>
            </HeroFade>
            <HeroFade delay={0.5}>
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {['Topic audit', 'Your real hours, respected', 'A method for every session'].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-brand-purple ring-1 ring-brand-purple/10"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </HeroFade>
            <HeroFade delay={0.6}>
              <div className="mt-8 rounded-2xl bg-brand-purple px-6 py-5 text-left sm:px-8">
                <p className="text-[15px] leading-relaxed text-brand-cream/90">
                  <strong className="text-brand-gold">How this works.</strong>{' '}I&apos;m a doctor. I can&apos;t treat a
                  patient until I&apos;ve found what&apos;s wrong, and revision works exactly the same way. Most
                  timetables just schedule your time. This one audits your topics first, finds where you&apos;re leaking
                  marks, then builds the week around fixing them. It&apos;s the same structure I&apos;ve used with over
                  1,000 A-level students.
                </p>
              </div>
            </HeroFade>
          </div>
        </section>

        <TrackerApp />
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  )
}
