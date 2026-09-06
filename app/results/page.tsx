import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import TestimonialWall from '@/components/home/testimonial-wall'
import { ScrollFade } from '@/components/ui/scroll-fade'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'
const CARD =
  'rounded-2xl bg-white shadow-[0_1px_2px_rgba(46,37,87,0.06),0_8px_24px_rgba(46,37,87,0.08)] ring-1 ring-brand-purple/5'

export const metadata: Metadata = {
  title: { absolute: 'Our Results | 96% First-Choice University Offers' },
  description:
    "A-Level Accelerators results: 96% of our students got into their first-choice university, and students average a 2-grade improvement across 3 months. Real students, real grades, measured over 6 years and 1,000+ students.",
  alternates: { canonical: 'https://alevelaccelerators.com/results/' },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/results/',
    title: 'Our Results | 96% First-Choice University Offers',
    description:
      '96% of our students got into their first-choice university, and students average a 2-grade improvement across 3 months.',
    images: ['/og-default.png'],
  },
}

/* PLACEHOLDER RULE (same as lib/tutors.ts): anything in [square brackets] is a
   slot for Waleed to fill with the real student's details. Nothing in brackets
   ships live. The three journeys below are the three students who gave video
   testimonial permission on Zoom, September 2026. */
const GRADE_JOURNEYS = [
  {
    name: '[Student 1 first name]',
    subject: '[Subject(s), e.g. Chemistry]',
    from: '[D]',
    to: '[B]',
    months: '[3]',
    line: '[One line from their video call, in their words, about what changed.]',
  },
  {
    name: '[Student 2 first name]',
    subject: '[Subject(s), e.g. Biology]',
    from: '[C]',
    to: '[A]',
    months: '[3]',
    line: '[One line from their video call, in their words, about what changed.]',
  },
  {
    name: '[Student 3 first name]',
    subject: '[Subject(s), e.g. Maths]',
    from: '[C]',
    to: '[A]',
    months: '[3]',
    line: '[One line from their video call, in their words, about what changed.]',
  },
]

const RESULTS_FAQS = [
  {
    q: "How quickly will my child's grades improve?",
    a: "Most students feel the difference within the first couple of weeks, because they stop wasting hours on revision that doesn't move the needle. On average, our students improve by 2 grades across about 3 months, and the ones who apply the system fully often go further.",
  },
  {
    q: 'Do you offer a guarantee?',
    a: "Yes. Every programme comes with a satisfaction guarantee: join a session, and if you're not completely satisfied, you get your money back. No questions asked.",
  },
  {
    q: 'Which subjects do you cover?',
    a: 'Our live programmes cover A-level Biology, Chemistry and Maths, taught by specialists in each subject. The Study System works across every A-level subject, because it trains how your child revises and performs in exams, not just what they know.',
  },
  {
    q: 'How do we get started?',
    a: "Start with the free Revision Diagnostic, which shows exactly where your child's marks are leaking, or book a free 30 minute call with Dr Waleed and he'll map out the right route for your child.",
  },
]

const resultsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://alevelaccelerators.com/results/#webpage',
  url: 'https://alevelaccelerators.com/results/',
  name: 'Our Results | A-Level Accelerators',
  description:
    '96% of A-Level Accelerators students got into their first-choice university. Students average a 2-grade improvement across 3 months.',
  inLanguage: 'en-GB',
  isPartOf: { '@type': 'WebSite', '@id': 'https://alevelaccelerators.com/#website' },
  about: { '@type': 'EducationalOrganization', '@id': 'https://alevelaccelerators.com/#organization' },
}

const resultsFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: RESULTS_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function ResultsPage() {
  return (
    <main>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resultsPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resultsFaqSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-cream px-6 pb-14 pt-16 text-center md:pb-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className={EYEBROW}>Our results</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-purple sm:text-5xl md:text-6xl">
            96% of our students get into their{' '}
            <span className="italic text-brand-gold">first-choice university</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text/75 md:text-xl">
            That&apos;s across 6 years and more than 1,000 A-level students, from one-to-one
            tutoring to today&apos;s live programmes. Here are the numbers, the grade jumps, and
            the students in their own words. Your child can be next.
          </p>
        </div>
      </section>

      {/* ── Stat band ────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-brand-purple px-6 py-14 text-center md:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              ['96%', 'got into their first-choice university'],
              ['2 grades', 'average improvement across 3 months'],
              ['1,000+', 'students taught over 6 years'],
            ].map(([n, d]) => (
              <div key={n as string}>
                <p className="font-serif text-4xl font-bold text-brand-gold md:text-5xl">{n}</p>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-white/80">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* ── Where the numbers come from ──────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className={EYEBROW}>What the numbers mean</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
              What a 2-grade jump <span className="italic text-brand-gold">actually looks like</span>
            </h2>
            <div className="mt-6 space-y-4 text-left leading-relaxed text-brand-text/80">
              <p>
                So what does a 2-grade improvement mean in real life? It&apos;s the student who
                joined us working at a D and sat their exam at a B. It&apos;s the C that became an
                A. That&apos;s the average jump we see across about 3 months, and plenty of
                students go further.
              </p>
              <p>
                And those jumps are what the 96% is built on. Better working grades turn the
                predicted grades around, the predicted grades bring the offers, and results day
                confirms them. It&apos;s not luck, and it&apos;s not talent. It&apos;s a system,
                applied properly, by students who&apos;d been told for years to just work harder.
              </p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── Grade journeys ───────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-brand-cream px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className={EYEBROW}>Success stories</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
                Our students, <span className="italic text-brand-gold">in their own words</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brand-text/75">
                Here are a few from our latest cohort, sharing what changed and where their grades
                went, on camera and in their own words.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {GRADE_JOURNEYS.map((s) => (
                <div key={s.name} className={`${CARD} flex flex-col p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-xl font-bold text-brand-purple">{s.name}</p>
                      <p className="mt-0.5 text-sm text-brand-text/60">{s.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 font-serif text-2xl font-bold">
                      <span className="text-brand-text/50">{s.from}</span>
                      <span aria-hidden="true" className="text-brand-gold">→</span>
                      <span className="text-brand-purple">{s.to}</span>
                    </div>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    in {s.months} months
                  </p>
                  <p className="mt-4 flex-1 leading-relaxed text-brand-text/80">
                    &ldquo;{s.line}&rdquo;
                  </p>
                  {/* Video slot: replaced with the student's clip once Waleed
                      cuts and uploads it (YouTube unlisted). */}
                  <div className="mt-5 flex aspect-video items-center justify-center rounded-xl bg-brand-purple/90">
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/90">
                        <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-brand-purple" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                        Video · coming soon
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── Testimonial wall (shared, real quotes) ───────────────────────── */}
      <TestimonialWall />

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className={EYEBROW}>Questions</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
                What parents ask us
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {RESULTS_FAQS.map((f) => (
                <div key={f.q} className={`${CARD} p-6`}>
                  <h3 className="font-serif text-lg font-bold text-brand-purple">{f.q}</h3>
                  <p className="mt-2 leading-relaxed text-brand-text/80">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-brand-purple px-6 py-16 text-center md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-white md:text-4xl">
              The next results are{' '}
              <span className="italic text-brand-gold">being written now</span>
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Every student above started the same way: by finding out exactly where their marks
              were leaking. Take the free diagnostic, or book a free 30 minute call and I&apos;ll
              tell you honestly what I&apos;d do in your position.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/revision-diagnostic/"
                className="w-full rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:opacity-90 sm:w-auto"
              >
                Take the free diagnostic
              </a>
              <a
                href={BOOK_A_CALL_LINK}
                className="w-full rounded-full border-2 border-brand-gold px-8 py-3 font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-purple sm:w-auto"
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
