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
            <h1
              aria-label="Free A-level revision timetable maker and topic audit. Stop revising in the dark."
              className="font-serif text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl"
            >
              <span className={`${EYEBROW} mb-3 block font-normal`}>
                Free A-level revision timetable maker and topic audit
              </span>
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
                  marks, then builds the week around fixing them. I&apos;ve worked with over 1,000 A-level
                  students; diagnose before you treat is the whole method.
                </p>
              </div>
            </HeroFade>
          </div>
        </section>

        <TrackerApp />

        <section className="px-5 pb-16 pt-4 print:hidden">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-8">
            <p className={EYEBROW}>Go one level deeper</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">
              A timetable fixes when you revise. Not how.
            </h2>
            <p className="mt-3 leading-relaxed text-brand-text/75">
              If you work hard and the grades still are not moving, the leak is usually the method itself. The free{' '}
              <a
                href="/revision-diagnostic"
                className="font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 transition hover:text-brand-gold"
              >
                Revision Diagnostic
              </a>{' '}
              scores how you actually study and tells you what to fix first. 20 questions, about 4 minutes.
            </p>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  )
}
