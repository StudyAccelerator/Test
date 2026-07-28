import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { HeroFade, HeroHeadline, HeroWord } from '@/components/home/hero-reveal'
import NewsletterSignup from '@/components/newsletter-signup'

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: 'The Sunday Session: free weekly A-level newsletter',
  description:
    'One thing school never taught you, every Sunday at 5pm. A free weekly email for A-level students from Dr Waleed Ahmad: one revision method per issue, usable that evening.',
  alternates: { canonical: 'https://alevelaccelerators.com/newsletter/' },
}

const SECTIONS: [string, string][] = [
  [
    'The teach',
    'One method per issue, taught properly. Not a list of links, not ten tips you will never use. One thing, explained the way I explain it to my own students, with a "tonight, do this" at the end.',
  ],
  [
    'The clinic',
    'A real question from a real student, answered straight. Reply to any issue and yours might be next.',
  ],
  [
    'High-yield, low-yield',
    'Two one-liners. One thing worth your hours this week, one thing to stop doing. The bit students screenshot.',
  ],
  [
    'The door',
    'If something we run fits the season, I say so in two or three honest sentences, clearly labelled. Some weeks there is no door at all.',
  ],
]

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden px-5 pb-12 pt-12 text-center sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <h1
              aria-label="The Sunday Session. One thing school never taught you."
              className="font-serif text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl"
            >
              <span className={`${EYEBROW} mb-3 block font-normal`}>
                The Sunday Session · free weekly newsletter
              </span>
              <HeroHeadline>
                <HeroWord>One</HeroWord> <HeroWord>thing</HeroWord> <HeroWord>school</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">never</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">taught</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">you.</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.35}>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/70">
                Every Sunday at 5pm, one revision method you can use that same evening. A five minute
                read for A-level students, written by a doctor who sat where you are sitting and came
                top. Free, and it stays free.
              </p>
            </HeroFade>
            <HeroFade delay={0.5}>
              <div className="mt-8">
                <NewsletterSignup />
              </div>
            </HeroFade>
          </div>
        </section>

        <section className="px-5 pb-4">
          <div className="mx-auto max-w-4xl">
            <p className={`${EYEBROW} text-center`}>In every issue</p>
            <h2 className="mt-2 text-center font-serif text-3xl font-bold text-brand-purple">
              Same running order, every week.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-brand-text/70">
              Ritual beats novelty. You will know exactly where everything lives by issue two.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SECTIONS.map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10"
                >
                  <h3 className="font-serif text-xl font-bold text-brand-purple">{title}</h3>
                  <p className="mt-2 leading-relaxed text-brand-text/75">{body}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-brand-text/60">
              Written for Year 12 and Year 13 students. Parents: this one is for your teenager, but
              the{' '}
              <a href="/parents/" className="font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60">
                free parents&apos; guide
              </a>{' '}
              was written for you.
            </p>
          </div>
        </section>

        <section className="px-5 py-14">
          <div className="mx-auto max-w-4xl rounded-2xl bg-brand-purple px-6 py-8 sm:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
              While you wait for Sunday
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-brand-cream">
              Two free tools that work tonight.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href="/revision-diagnostic/"
                className="group rounded-xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <p className="font-serif text-lg font-bold text-brand-gold">Revision Diagnostic</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-cream/80">
                  20 questions, about 4 minutes. Scores how you actually study and tells you what to
                  fix first.
                </p>
              </a>
              <a
                href="/revision-tracker/"
                className="group rounded-xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <p className="font-serif text-lg font-bold text-brand-gold">Revision Tracker</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-cream/80">
                  Rate your topics, get a week built around your weakest ones, with a method for
                  every session.
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
