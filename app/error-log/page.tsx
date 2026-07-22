import Header from '@/components/header'
import Footer from '@/components/footer'
import { HeroFade, HeroHeadline, HeroWord } from '@/components/home/hero-reveal'
import ErrorLogApp from '@/components/error-log/error-log-app'
import Guide from '@/components/error-log/guide'

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export default function ErrorLogPage() {
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
              aria-label="Free A-level error log and mistake tracker. Never lose the same mark twice."
              className="font-serif text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl"
            >
              <span className={`${EYEBROW} mb-3 block font-normal`}>
                Free A-level error log and mistake tracker
              </span>
              <HeroHeadline>
                <HeroWord>Never</HeroWord> <HeroWord>lose</HeroWord> <HeroWord>the</HeroWord>{' '}
                <HeroWord>same</HeroWord> <HeroWord>mark</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">twice.</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.35}>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/70">
                Log every dropped mark, tag what actually caused it, and get each one back in front of you at 3 days,
                1 week, 2 weeks and 1 month, until you&apos;ve beaten it four times from memory. Free for students:
                sign up once and this device remembers you. The log itself stays private in your browser.
              </p>
            </HeroFade>
            <HeroFade delay={0.5}>
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {['The four causes, tagged', 'Retests on a schedule', 'Calendar and paper reminders'].map((chip) => (
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
                  <strong className="text-brand-gold">How this works.</strong>{' '}I&apos;m a doctor. When something goes
                  wrong on a ward, we don&apos;t feel bad about it and move on: we write it up, find the cause, and
                  change the system so it can&apos;t happen the same way again. Your lost marks deserve the same
                  treatment. Most students glance at the right answer and turn the page, which is why the same
                  mistakes resurface in the real exam. This log records each one, tags the cause using the four tiers
                  I teach my own students, then retests you on a schedule built around how memory actually fades.
                </p>
              </div>
            </HeroFade>
          </div>
        </section>

        <ErrorLogApp />

        <Guide />

        <section className="px-5 pb-16 pt-4 print:hidden">
          <div className="mx-auto max-w-3xl space-y-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-8">
              <p className={EYEBROW}>Go one level deeper</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">
                The log fixes your mistakes. Not your method.
              </h2>
              <p className="mt-3 leading-relaxed text-brand-text/75">
                If the same tier keeps filling up week after week, that&apos;s not bad luck, it&apos;s a diagnosis. The
                free{' '}
                <a
                  href="/revision-diagnostic/"
                  className="font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 transition hover:text-brand-gold"
                >
                  Revision Diagnostic
                </a>{' '}
                scores how you actually study across five systems and tells you what to fix first. 20 questions, about
                4 minutes. And when a topic keeps appearing in your log, the free{' '}
                <a
                  href="/revision-tracker/"
                  className="font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 transition hover:text-brand-gold"
                >
                  Revision Tracker
                </a>{' '}
                will build it a proper week of blurting, recall and spaced review.
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  )
}
