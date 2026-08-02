import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'
import { WALL_QUOTES, type WallQuote } from '@/lib/testimonials'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const SITE_URL = 'https://alevelaccelerators.com'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export type SubjectPageConfig = {
  slug: string
  subject: string
  metaTitle: string
  metaDescription: string
  h1: string
  /* Trailing part of the H1 rendered in italic gold, matching the house hero style. */
  h1Gold?: string
  heroSub: string
  leaksHeading: string
  leaks: { title: string; body: string }[]
  quoteNames: string[]
  faqs: { q: string; a: string }[]
}

/* One honest template for the per-subject tutoring pages. The copy lives in
   each route's config so every page reads as its own page, not a mail merge.
   Format honesty is non-negotiable: these pages describe live small-group
   teaching led by specialists, never one-to-one matching. */
export function subjectMetadata(c: SubjectPageConfig) {
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `${SITE_URL}/${c.slug}/` },
    openGraph: {
      siteName: 'A-Level Accelerators',
      type: 'website' as const,
      url: `${SITE_URL}/${c.slug}/`,
      title: c.metaTitle,
      description: c.metaDescription,
      images: ['/og-default.png'],
    },
  }
}

export default function SubjectTutoringPage({ c }: { c: SubjectPageConfig }) {
  const quotes: WallQuote[] = WALL_QUOTES.filter((q) => c.quoteNames.includes(q.name))

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `A-Level ${c.subject} Accelerator`,
    description: `Live online 12-week A-level ${c.subject} programme: small groups, specialist teaching, sessions built around exam questions and mark schemes.`,
    provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'A-Level Accelerators' },
    offers: {
      '@type': 'Offer',
      price: '339',
      priceCurrency: 'GBP',
      category: 'Paid',
      url: `${SITE_URL}/subject-accelerators/`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT2H',
      location: { '@type': 'VirtualLocation', url: `${SITE_URL}/subject-accelerators/` },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: `A-Level ${c.subject} Tutoring`, item: `${SITE_URL}/${c.slug}/` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="bg-brand-cream">
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-12 pt-12 text-center sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className={EYEBROW}>Live online · small groups · exam-question-first</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-brand-purple md:text-5xl">
              {c.h1}
              {c.h1Gold ? <>{' '}<span className="italic text-brand-gold">{c.h1Gold}</span></> : null}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/75">{c.heroSub}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/subject-accelerators/"
                className="inline-block rounded-md bg-brand-purple px-8 py-3 font-semibold text-brand-cream transition hover:bg-brand-purple-light"
              >
                See the 12-Week Programme
              </a>
              <a
                href={BOOK_A_CALL_LINK}
                className="inline-block rounded-md border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
              >
                Book a Free Call
              </a>
            </div>
            <p className="mt-4 text-sm text-brand-text/60">
              £339 for 12 weeks (works out to ~£14/hr) · first session risk-free
            </p>
          </div>
        </section>

        {/* Format honesty, up front */}
        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
              {[
                ['Live, not recorded lectures', '12 weekly 2-hour sessions taught live, with questions answered in the room. Every session is recorded for catch-up.'],
                ['Small group, not a marketplace', "This isn't tutor matching. It's one specialist-led group programme, built and led by Dr Waleed Ahmad, MBBS."],
                ['Exam questions, not re-teaching', 'Content is covered briefly, then sessions go straight into past-paper questions against real mark schemes.'],
              ].map(([t, b]) => (
                <div key={t} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10">
                  <p className="font-serif text-lg font-bold text-brand-purple">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text/70">{b}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollFade>

        {/* Subject-specific: where the marks leak */}
        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-3xl">
              <p className={`${EYEBROW} text-center`}>Why {c.subject} specifically</p>
              <h2 className="mt-2 text-center font-serif text-3xl font-bold text-brand-purple">
                {c.leaksHeading}
              </h2>
              <div className="mt-8 space-y-4">
                {c.leaks.map((l) => (
                  <div key={l.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7">
                    <h3 className="font-serif text-lg font-bold text-brand-purple">{l.title}</h3>
                    <p className="mt-2 leading-relaxed text-brand-text/75">{l.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollFade>

        {/* Who teaches */}
        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-brand-purple px-6 py-10 text-center sm:px-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">Who teaches it</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-brand-gold">
                Specialists teach the subject. A doctor teaches the exam.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brand-cream/90">
                Your {c.subject} sessions are taught live by subject specialists who know the spec inside out,
                achieved top grades themselves and helped their students do the same. Dr Waleed Ahmad, MBBS, an NHS doctor and former
                top-performing A-level student who has worked with over 1,000 students, built the method and
                leads the exam technique and study strategy sessions himself. We teach AQA, OCR and Edexcel.
              </p>
            </div>
          </section>
        </ScrollFade>

        {/* Real quotes */}
        {quotes.length > 0 && (
          <ScrollFade>
            <section className="px-5 py-10">
              <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
                {quotes.map((q) => (
                  <figure key={q.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10">
                    <blockquote className="leading-relaxed text-brand-text/80">&ldquo;{q.quote}&rdquo;</blockquote>
                    <figcaption className="mt-3 text-sm font-semibold text-brand-purple">
                      {q.name} · {q.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </ScrollFade>
        )}

        {/* FAQs */}
        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-serif text-3xl font-bold text-brand-purple">Quick answers</h2>
              <div className="mt-8 space-y-3">
                {c.faqs.map((f) => (
                  <FAQItem key={f.q} question={f.q} answer={<p>{f.a}</p>} />
                ))}
              </div>
            </div>
          </section>
        </ScrollFade>

        {/* Final CTA */}
        <ScrollFade>
          <section className="px-5 pb-16 pt-6 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-bold text-brand-purple">
                Not sure if it&apos;s the right fit?
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-brand-text/75">
                Take the free Revision Diagnostic first: 20 questions that show where the marks are actually
                leaking, and whether structured {c.subject} teaching is even the right fix. Or book a free
                call and talk it through with Dr Waleed directly.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/revision-diagnostic/"
                  className="inline-block rounded-md bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
                >
                  Take the Free Diagnostic
                </a>
                <a
                  href={BOOK_A_CALL_LINK}
                  className="inline-block rounded-md border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
                >
                  Book a Free Call
                </a>
              </div>
            </div>
          </section>
        </ScrollFade>
      </main>
      <Footer />
    </>
  )
}
