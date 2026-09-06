import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'
const CARD =
  'rounded-2xl bg-white shadow-[0_1px_2px_rgba(46,37,87,0.06),0_8px_24px_rgba(46,37,87,0.08)] ring-1 ring-brand-purple/5'

export const metadata: Metadata = {
  title: { absolute: 'About A-Level Accelerators | The Doctor Behind the Method' },
  description:
    'A-Level Accelerators was founded by Dr Waleed Ahmad MBBS, an NHS doctor and former top A-level student. Over 6 years and 1,000+ students, 96% got into their first-choice university.',
  alternates: { canonical: 'https://alevelaccelerators.com/about/' },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/about/',
    title: 'About A-Level Accelerators | The Doctor Behind the Method',
    description:
      'Founded by Dr Waleed Ahmad MBBS, an NHS doctor and former top A-level student. Over 6 years and 1,000+ students, 96% got into their first-choice university.',
    images: ['/og-default.png'],
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://alevelaccelerators.com/about/#webpage',
  url: 'https://alevelaccelerators.com/about/',
  name: 'About A-Level Accelerators',
  description:
    'The story behind A-Level Accelerators: founded by Dr Waleed Ahmad MBBS, an NHS doctor and former top A-level student.',
  inLanguage: 'en-GB',
  isPartOf: { '@type': 'WebSite', '@id': 'https://alevelaccelerators.com/#website' },
  mainEntity: {
    '@type': 'EducationalOrganization',
    '@id': 'https://alevelaccelerators.com/#organization',
    name: 'A-Level Accelerators',
    url: 'https://alevelaccelerators.com/',
    founder: {
      '@type': 'Person',
      '@id': 'https://alevelaccelerators.com/#founder',
      name: 'Dr Waleed Ahmad',
      honorificSuffix: 'MBBS',
      jobTitle: 'Founder',
      description:
        'NHS foundation doctor, former top-performing A-level student, and founder of A-Level Accelerators.',
    },
  },
}

export default function AboutPage() {
  return (
    <main>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-cream px-6 pb-14 pt-16 text-center md:pb-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className={EYEBROW}>About us</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-purple sm:text-5xl md:text-6xl">
            Why a doctor{' '}
            <span className="italic text-brand-gold whitespace-nowrap">teaches A-levels</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text/75 md:text-xl">
            I started A-Level Accelerators because of what nearly happened to me during my own
            A-levels. So this page is the story: where the method came from, who teaches it now,
            and what it&apos;s done for the 1,000+ students since.
          </p>
        </div>
      </section>

      {/* ── The story ────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
            <div className="mx-auto w-full max-w-md md:mx-0">
              <div className="relative">
                <div className={`overflow-hidden ${CARD} !rounded-3xl`}>
                  <Image
                    src="/photos/waleed-portrait-wide.jpg"
                    alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators, at his desk in scrubs"
                    width={1200}
                    height={913}
                    unoptimized
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute -top-5 -right-3 w-36 rotate-3 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-brand-purple/10">
                  <Image
                    src="/photos/stressed-student.jpg"
                    alt="Waleed as a stressed student during his A-levels"
                    width={640}
                    height={437}
                    unoptimized
                    className="h-auto w-full rounded-lg"
                  />
                  <p className="pb-0.5 pt-1 text-center text-[9px] font-medium text-brand-text/60">
                    before the system
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-center font-mono text-sm text-brand-purple/70 md:text-left">
                <li>MBBS · NHS Foundation Doctor</li>
                <li>Former top-performing A-level student</li>
                <li>1,000+ students worked with over 6 years</li>
              </ul>
            </div>
            <div>
              <p className={EYEBROW}>The story</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
                Working hard nearly{' '}
                <span className="italic text-brand-gold">wasn&apos;t enough</span>
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-brand-text/80">
                <p>
                  During my A-levels I worked as hard as anyone I knew. Re-reading, highlighting,
                  beautiful notes, hours every night. On paper I was the model student. In mock
                  after mock, the marks didn&apos;t match the effort, and nobody could tell me why.
                </p>
                <p>
                  I got into medicine, but honestly, only because I threw hundreds of extra hours
                  at a method that wasted most of them. I was one bad exam week away from a
                  completely different life. And I didn&apos;t find out what I&apos;d been doing
                  wrong until medical school, where I finally learned to study properly: active
                  recall, spaced repetition, working backwards from the mark scheme.
                </p>
                <p>
                  So I started teaching A-level students in my spare time, first one to one, then
                  in small groups, testing the system on the exact problems I&apos;d had at 17.
                  That was 6 years and more than 1,000 students ago. Today A-Level Accelerators
                  runs live programmes in Biology, Chemistry and Maths, taught by specialists to
                  one method, and I still hold every session to the standard I needed back then.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── The numbers ──────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-brand-purple px-6 py-16 text-center md:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold/80">
              What it adds up to
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['96%', 'of our students got into their first-choice university'],
                ['2 grades', 'average improvement across 3 months of work'],
                ['1,000+', 'A-level students taught across every exam board'],
                ['6 years', 'of refining one method, from 1:1 tutoring to live programmes'],
              ].map(([n, d]) => (
                <div key={n as string}>
                  <p className="font-serif text-4xl font-bold text-brand-gold md:text-5xl">{n}</p>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-white/80">
                    {d}
                  </p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/60">
              These numbers come from 6 years of teaching, from one-to-one tutoring to
              today&apos;s live programmes.
            </p>
            <a
              href="/results/"
              className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:opacity-90"
            >
              See our results
            </a>
          </div>
        </section>
      </ScrollFade>

      {/* ── The method ───────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className={EYEBROW}>How we work</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
              Diagnose first. <span className="italic text-brand-gold">Then treat.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brand-text/75">
              I use this analogy all the time, because it applies really well. As a doctor,
              before I can prescribe anything, I need to diagnose the patient first. You need to
              figure out where the issue actually lies in order to fix it. And grades work exactly
              the same way.
            </p>
            <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
              {[
                [
                  '01 · Diagnose',
                  'First we find where the marks are actually leaking: content gaps, weak recall, or exam technique. Every student starts with the free Revision Diagnostic, and every programme starts by testing, not guessing.',
                ],
                [
                  '02 · Rebuild',
                  'Then the same study hours get pointed at the right work. Active recall over re-reading, spaced review over cramming, past paper questions from week one. Nothing exotic, just the methods with evidence behind them, done properly.',
                ],
                [
                  '03 · Coach',
                  'Live teaching keeps it honest. Small groups, real exam questions, and someone checking the work is actually being done the right way, week after week, until the grades move.',
                ],
              ].map(([t, d]) => (
                <div key={t as string} className={`${CARD} p-6`}>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-gold">
                    {t}
                  </p>
                  <p className="mt-3 leading-relaxed text-brand-text/80">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-brand-text/70">
              The full method, week by week, lives on the{' '}
              <a href="/study-systems/" className="font-semibold text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-gold">
                Study System page
              </a>
              .
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* ── The team ─────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-brand-cream px-6 py-16 md:py-20">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:justify-between md:text-left">
            <div className="max-w-xl text-center md:text-left">
              <p className={EYEBROW}>The team</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
                One method, taught by{' '}
                <span className="italic text-brand-gold">subject specialists</span>
              </h2>
              <p className="mt-4 leading-relaxed text-brand-text/75">
                I don&apos;t teach every session any more, and that&apos;s deliberate. Each subject
                is taught by a specialist who achieved top grades in it themselves and teaches it
                every week, trained on the same method. I stay across every group.
              </p>
            </div>
            <a
              href="/tutors/"
              className="inline-block rounded-full bg-brand-purple px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Meet the team
            </a>
          </div>
        </section>
      </ScrollFade>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 text-center md:py-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
              Start where every student starts
            </h2>
            <p className="mt-4 leading-relaxed text-brand-text/75">
              Take the free Revision Diagnostic to see exactly where the marks are leaking, or
              book a free 30 minute call and I&apos;ll tell you what I&apos;d do in your
              child&apos;s position, step by step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/revision-diagnostic/"
                className="w-full rounded-full bg-brand-purple px-8 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                Take the free diagnostic
              </a>
              <a
                href={BOOK_A_CALL_LINK}
                className="w-full rounded-full border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-white sm:w-auto"
              >
                Book a free call
              </a>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Footer />
    </main>
  )
}
