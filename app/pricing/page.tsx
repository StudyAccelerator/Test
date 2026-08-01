import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: { absolute: 'A-Level Course Pricing | A-Level Accelerators' },
  description:
    "Every A-Level Accelerators price on one page: the Summer Accelerator, 12-week Subject Accelerators and the Study System, with honest per-hour maths and what's included.",
  alternates: { canonical: 'https://alevelaccelerators.com/pricing/' },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/pricing/',
    title: 'A-Level Course Pricing | A-Level Accelerators',
    description:
      'Every A-Level Accelerators price on one page, with honest per-hour maths and what each programme includes.',
    images: ['/og-default.png'],
  },
}

const PRICING_FAQS = [
  {
    q: 'Which programme should I pick?',
    a: "Start with the problem, not the price list. If you don't know why the marks aren't moving, take the free Revision Diagnostic first: it names the problem and points at the right fix, which is sometimes free. If you already know the weak subject, that's a Subject Accelerator. If the problem is how you study rather than one subject, that's the Study System. And if you're a Year 12 going into Year 13, the Summer Accelerator is built for exactly that jump. Still unsure? Book the free call and we'll work it out together.",
  },
  {
    q: "What's included in the price?",
    a: 'Live teaching in small groups, a recording of every session so nothing is ever missed, and weekly practice materials built around exam questions. There are no hidden extras to buy afterwards.',
  },
  {
    q: 'Is there a discount for taking more subjects?',
    a: 'Yes. On the Summer Accelerator: one subject is £289, two are £539, three are £739 and all four are £849. On the Subject Accelerators: one subject is £339 and all three are £849. The more you take, the less each one costs.',
  },
  {
    q: "What if it's not right for us?",
    a: 'Every programme starts with a risk-free first session. If it is not right, ask for a full refund, no questions asked. That policy exists because I would rather lose a sale than keep a student in the wrong thing.',
  },
]

const pricingFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const pricingPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://alevelaccelerators.com/pricing/#webpage',
  url: 'https://alevelaccelerators.com/pricing/',
  name: 'A-Level Course Pricing',
  description:
    'All A-Level Accelerators programme prices on one page: Summer Accelerator, Subject Accelerators and the Study System.',
  isPartOf: { '@type': 'WebSite', '@id': 'https://alevelaccelerators.com/#website' },
}

/* Prices here must always match the programme pages. Rule recorded in
   CLAUDE.md: any price change updates both places in the same commit. */
const ROWS: {
  name: string
  href: string
  price: string
  format: string
  builtFor: string
  cta: string
}[] = [
  {
    name: 'Free tools',
    href: '/revision-diagnostic/',
    price: '£0',
    format: 'Revision Diagnostic, Revision Tracker, the blog and the Sunday Session newsletter. Usable tonight.',
    builtFor: 'Finding out what is actually wrong before spending anything',
    cta: 'Start with the Diagnostic',
  },
  {
    name: 'Summer Accelerator',
    href: '/summer-accelerators/',
    price: '£289 one subject · £539 two · £739 three · £849 all four',
    format: 'Six weeks, live online, around 24 hours of teaching per subject. Works out near £12 per teaching hour.',
    builtFor: 'Year 12 students getting ahead of Year 13 before September',
    cta: 'See the Summer Accelerator',
  },
  {
    name: 'Subject Accelerators',
    href: '/subject-accelerators/',
    price: '£339 per subject · £849 for all three',
    format: 'Twelve weeks, live weekend sessions, in Biology, Chemistry and Maths. Works out near £14 per teaching hour.',
    builtFor: 'Fixing one weak subject properly through the school year',
    cta: 'See Subject Accelerators',
  },
  {
    name: 'Top 1% Study System',
    href: '/study-systems/',
    price: 'Study Series £119 · Study Accelerator £499 · Top 1% Mentorship £2,000 a year',
    format: 'The method itself: high-yield revision, time management and exam performance, taught live.',
    builtFor: 'Students whose problem is how they study, not one subject',
    cta: 'See the Study System',
  },
]

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      <Header />
      <main className="bg-brand-cream">
        <section className="relative overflow-hidden px-5 pb-10 pt-12 text-center sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className={EYEBROW}>Pricing</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-brand-purple md:text-5xl">
              Every price, on one page.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/75">
              Tutoring pricing is murky on purpose. Ours isn&apos;t. Here is everything we charge, what it
              works out at per hour of live teaching, and what each programme is actually for. For how these
              numbers compare to the wider market,{' '}
              <a
                href="/blog/how-much-does-a-level-tutoring-cost/"
                className="font-semibold text-brand-purple underline decoration-brand-gold/60 underline-offset-4 transition hover:text-brand-gold"
              >
                I&apos;ve written the honest guide to what A-level tutoring costs
              </a>
              .
            </p>
          </div>
        </section>

        <ScrollFade>
          <section className="px-5 py-6">
            <div className="mx-auto max-w-4xl space-y-4">
              {ROWS.map((r) => (
                <div
                  key={r.name}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6"
                >
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-purple">{r.name}</h2>
                    <p className="mt-1 font-semibold text-brand-gold">{r.price}</p>
                    <p className="mt-2 leading-relaxed text-brand-text/75">{r.format}</p>
                    <p className="mt-1 text-sm text-brand-text/60">Built for: {r.builtFor}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href={r.href}
                      className="inline-block rounded-md bg-brand-purple px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-purple-light"
                    >
                      {r.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollFade>

        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-brand-purple px-6 py-10 text-center sm:px-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
                The honest comparison
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-brand-gold">
                The same money, spent two ways
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brand-cream/90">
                One-to-one tutoring averages around £50 an hour in the UK, which is roughly £200 a month per
                subject for a weekly hour, and £1,500 or more across a school year. Our small-group
                programmes put a specialist in front of your child every week for £12 to £14 per teaching
                hour, because the cost of the hour is shared. Same weekly structure, a fraction of the
                price, and every session built on exam questions rather than re-taught content.
              </p>
              <p className="mt-4 font-semibold text-brand-cream">
                Every programme starts with a risk-free first session. Full refund if it&apos;s not right.
              </p>
            </div>
          </section>
        </ScrollFade>

        <ScrollFade>
          <section className="px-5 pb-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-serif text-3xl font-bold text-brand-purple">Quick answers</h2>
              <div className="mt-8 space-y-4">
                {PRICING_FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7">
                    <h3 className="font-serif text-lg font-bold text-brand-purple">{f.q}</h3>
                    <p className="mt-2 leading-relaxed text-brand-text/75">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollFade>

        <ScrollFade>
          <section className="px-5 pb-16 pt-4 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-bold text-brand-purple">Not sure which fits?</h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-brand-text/75">
                Take the free diagnostic and let the data decide, or book a free 30 minute call and we&apos;ll
                work it out together. No obligation either way.
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
                  Book a Free 30 Minute Call
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
