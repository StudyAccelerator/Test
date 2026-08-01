import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: { absolute: 'Contact A-Level Accelerators | Book a Free Call' },
  description:
    "Get in touch with Dr Waleed Ahmad and the A-Level Accelerators team: book a free 30 minute call, or email us about courses, the free tools, or your child's revision.",
  alternates: { canonical: 'https://alevelaccelerators.com/contact/' },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/contact/',
    title: 'Contact A-Level Accelerators | Book a Free Call',
    description:
      "Book a free 30 minute call with Dr Waleed Ahmad, or email us about courses, the free tools, or your child's revision.",
    images: ['/og-default.png'],
  },
}

const CONTACT_FAQS = [
  {
    q: 'Is the free call a sales call?',
    a: "No. It's 30 minutes of honest advice on what's actually going wrong and what to do about it. If the right answer is one of our programmes, I'll say so and explain why. If the right answer is the free tools, or something else entirely, I'll say that instead. Nobody gets talked into anything.",
  },
  {
    q: 'Can parents book the call?',
    a: "Yes, and most calls are with parents. It works with or without your teenager on the call, though it's usually more useful with them there, because the plan lands better when they've heard the reasoning themselves.",
  },
  {
    q: 'Do you have a phone number or an office I can visit?',
    a: "Everything runs online: live sessions, the free tools, and the calls. That's deliberate, it's a big part of how the prices stay where they are. Email and the booking link above are the two ways in, and both get a proper reply.",
  },
]

const contactFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTACT_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://alevelaccelerators.com/contact/#webpage',
  url: 'https://alevelaccelerators.com/contact/',
  name: 'Contact A-Level Accelerators',
  description:
    'Book a free 30 minute call with Dr Waleed Ahmad or email the A-Level Accelerators team.',
  isPartOf: { '@type': 'WebSite', '@id': 'https://alevelaccelerators.com/#website' },
  about: {
    '@type': 'Organization',
    '@id': 'https://alevelaccelerators.com/#organization',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'Waleed@alevelaccelerators.com',
      availableLanguage: 'English',
    },
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }}
      />
      <Header />
      <main className="bg-brand-cream">
        <section className="relative overflow-hidden px-5 pb-12 pt-12 text-center sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className={EYEBROW}>Contact us</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-brand-purple md:text-5xl">
              Talk to us before you spend a penny.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/75">
              I&apos;d rather answer your questions properly than have anyone buy the wrong thing. Two ways to
              reach us, and both get a real reply.
            </p>
          </div>
        </section>

        <ScrollFade>
          <section className="px-5 py-6">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-purple p-7 text-center sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
                  The fastest route
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-brand-gold">Book a free call</h2>
                <p className="mt-3 leading-relaxed text-brand-cream/90">
                  30 minutes with me, Dr Waleed Ahmad. We&apos;ll work out what&apos;s actually holding the grades
                  back and what to do next. If the answer is a free tool rather than a paid programme,
                  that&apos;s the answer you&apos;ll get.
                </p>
                <a
                  href={BOOK_A_CALL_LINK}
                  className="mt-5 inline-block rounded-md bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
                >
                  Book a Free 30 Minute Call
                </a>
              </div>
              <div className="rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-brand-purple/10 sm:p-8">
                <p className={EYEBROW}>Prefer to write?</p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">Email us</h2>
                <p className="mt-3 leading-relaxed text-brand-text/75">
                  Tell me the year group, the subjects, and what&apos;s actually happening with the marks, and
                  you&apos;ll get a useful answer rather than a brochure. We reply within one working day.
                </p>
                <a
                  href="mailto:Waleed@alevelaccelerators.com"
                  className="mt-5 inline-block rounded-md border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
                >
                  Waleed@alevelaccelerators.com
                </a>
              </div>
            </div>
          </section>
        </ScrollFade>

        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-purple/10 sm:p-8">
              <p className={EYEBROW}>For parents</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">
                Worried about your child&apos;s grades?
              </h2>
              <p className="mt-3 leading-relaxed text-brand-text/75">
                The call works with or without your teenager present. And while you wait, two free things
                will tell you more than any brochure: the{' '}
                <a href="/parents/" className="font-semibold text-brand-purple underline decoration-brand-gold/60 underline-offset-4 transition hover:text-brand-gold">
                  free parents&apos; guide
                </a>{' '}
                explains why hard-working students get stuck, and the{' '}
                <a href="/revision-diagnostic/?for=parents" className="font-semibold text-brand-purple underline decoration-brand-gold/60 underline-offset-4 transition hover:text-brand-gold">
                  parent version of the Revision Diagnostic
                </a>{' '}
                shows you exactly where their revision is leaking marks.
              </p>
            </div>
          </section>
        </ScrollFade>

        <ScrollFade>
          <section className="px-5 pb-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-serif text-3xl font-bold text-brand-purple">Quick answers</h2>
              <div className="mt-8 space-y-4">
                {CONTACT_FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7">
                    <h3 className="font-serif text-lg font-bold text-brand-purple">{f.q}</h3>
                    <p className="mt-2 leading-relaxed text-brand-text/75">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollFade>
      </main>
      <Footer />
    </>
  )
}
