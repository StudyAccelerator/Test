import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { founder, tutors, type TeamMember } from '@/lib/tutors'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: { absolute: 'Meet the Tutors | A-Level Accelerators' },
  description:
    'Meet the team behind A-Level Accelerators: founder Dr Waleed Ahmad, an NHS doctor, and the subject specialists who teach his revision method in small-group Biology, Chemistry and Maths classes.',
  alternates: { canonical: 'https://alevelaccelerators.com/tutors/' },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/tutors/',
    title: 'Meet the Tutors | A-Level Accelerators',
    description:
      'Founder Dr Waleed Ahmad and the subject specialists who teach his revision method in small-group A-level classes.',
    images: ['/og-default.png'],
  },
}

/* Placeholder entries stay out of structured data: no invented people in schema. */
const realTutors = tutors.filter((t) => !t.placeholder)

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://alevelaccelerators.com/tutors/#webpage',
  url: 'https://alevelaccelerators.com/tutors/',
  name: 'Meet the Tutors at A-Level Accelerators',
  description:
    'The team behind A-Level Accelerators: founder Dr Waleed Ahmad and the subject specialists who teach his revision method.',
  isPartOf: { '@type': 'WebSite', '@id': 'https://alevelaccelerators.com/#website' },
  about: {
    '@type': 'Organization',
    '@id': 'https://alevelaccelerators.com/#organization',
    name: 'A-Level Accelerators',
    founder: {
      '@type': 'Person',
      name: 'Dr Waleed Ahmad',
      jobTitle: 'Founder',
      description:
        'NHS doctor, former top-performing A-level student, and founder of A-Level Accelerators.',
    },
    ...(realTutors.length > 0 && {
      employee: realTutors.map((t) => ({
        '@type': 'Person',
        name: t.name,
        jobTitle: t.role,
      })),
    }),
  },
}

function SubjectChips({ subjects }: { subjects: string[] }) {
  if (subjects.length === 0) return null
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {subjects.map((s) => (
        <span
          key={s}
          className="rounded-full bg-brand-gold/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-purple"
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function TutorCard({ tutor }: { tutor: TeamMember }) {
  return (
    <div
      className={`rounded-2xl bg-white p-7 text-center shadow-sm sm:p-8 ${
        tutor.placeholder
          ? 'border-2 border-dashed border-brand-purple/25'
          : 'ring-1 ring-brand-purple/10'
      }`}
    >
      {tutor.headshot ? (
        <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-brand-gold/40">
          <Image
            src={tutor.headshot}
            alt={`${tutor.name}, ${tutor.role} at A-Level Accelerators`}
            width={tutor.headshotSize?.width ?? 400}
            height={tutor.headshotSize?.height ?? 400}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-brand-purple/5 ring-4 ring-brand-purple/10"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-14 w-14 text-brand-purple/25"
          >
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
          </svg>
        </div>
      )}
      {tutor.placeholder && (
        <p className="mt-4 inline-block rounded-full bg-brand-purple/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-purple/50">
          Details being added
        </p>
      )}
      <h3 className="mt-4 font-serif text-2xl font-bold text-brand-purple">{tutor.name}</h3>
      <p className="mt-1 font-semibold text-brand-text/70">{tutor.role}</p>
      <SubjectChips subjects={tutor.subjects} />
      <ul className="mt-4 space-y-1 font-mono text-sm text-brand-purple/70">
        {tutor.credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="mt-4 space-y-3 text-left">
        {tutor.bio.map((p) => (
          <p key={p} className="leading-relaxed text-brand-text/75">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function TutorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Header />
      <main className="bg-brand-cream">
        <section className="relative overflow-hidden px-5 pb-12 pt-12 text-center sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className={EYEBROW}>The team</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-brand-purple md:text-5xl">
              One method. A team picked to teach it.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/75">
              A-Level Accelerators isn&apos;t a tutoring marketplace, and there&apos;s no database of
              strangers here. I built the method, I know everyone on this page, and this is who
              your child would actually be learning from.
            </p>
          </div>
        </section>

        {/* Founder */}
        <ScrollFade>
          <section className="px-5 py-6">
            <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-2xl bg-brand-purple p-7 sm:p-10 md:grid-cols-[1fr_1.3fr] md:gap-12">
              <div className="mx-auto w-full max-w-xs">
                <div className="overflow-hidden rounded-3xl ring-4 ring-brand-gold/40">
                  <Image
                    src={founder.headshot as string}
                    alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators, at his desk in scrubs"
                    width={founder.headshotSize?.width ?? 1200}
                    height={founder.headshotSize?.height ?? 913}
                    unoptimized
                    className="h-auto w-full"
                  />
                </div>
                <ul className="mt-5 space-y-1.5 text-center font-mono text-sm text-brand-cream/70">
                  {founder.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-left">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
                  The founder
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-brand-gold">
                  {founder.name}
                </h2>
                <p className="mt-1 font-semibold text-brand-cream/80">{founder.role}</p>
                <div className="mt-4 space-y-3">
                  {founder.bio.map((p) => (
                    <p key={p} className="leading-relaxed text-brand-cream/90">
                      {p}
                    </p>
                  ))}
                </div>
                <a
                  href="/#founder"
                  className="mt-5 inline-block font-semibold text-brand-gold underline decoration-brand-gold/50 underline-offset-4 transition hover:text-white"
                >
                  Read the full founder story
                </a>
              </div>
            </div>
          </section>
        </ScrollFade>

        {/* Tutors */}
        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className={EYEBROW}>The tutors</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-brand-purple md:text-4xl">
                  Specialists in their subject, teaching my system.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brand-text/75">
                  Subject Accelerator classes are led by specialists who achieved top grades in
                  their subject themselves, and helped hundreds do the same. Every class runs on
                  the same revision and exam method. The team is deliberately small, and it grows
                  carefully.
                </p>
              </div>
              <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
                {tutors.map((t) => (
                  <TutorCard key={t.slug} tutor={t} />
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-brand-text/60">
                Looking for Physics? It runs inside the{' '}
                <a
                  href="/summer-accelerators/"
                  className="font-semibold text-brand-purple underline decoration-brand-gold/60 underline-offset-4 transition hover:text-brand-gold"
                >
                  Summer Accelerator
                </a>{' '}
                for now. When a physics specialist joins the team, this is where you&apos;ll meet
                them.
              </p>
            </div>
          </section>
        </ScrollFade>

        {/* How the team works */}
        <ScrollFade>
          <section className="px-5 py-10">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center font-serif text-3xl font-bold text-brand-purple">
                How the team works
              </h2>
              <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7">
                  <h3 className="font-serif text-lg font-bold text-brand-purple">
                    The method comes first
                  </h3>
                  <p className="mt-2 leading-relaxed text-brand-text/75">
                    Every class runs on the system I built: retrieval, spaced review and exam
                    technique. A Biology class and a Maths class here feel like the same
                    programme, because they are.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7">
                  <h3 className="font-serif text-lg font-bold text-brand-purple">
                    Hand-picked, never matched
                  </h3>
                  <p className="mt-2 leading-relaxed text-brand-text/75">
                    Nobody here gets assigned by an algorithm. I choose every tutor myself, and
                    the team stays small enough that I know exactly how each one teaches.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 sm:p-7">
                  <h3 className="font-serif text-lg font-bold text-brand-purple">
                    Small groups, honest sizes
                  </h3>
                  <p className="mt-2 leading-relaxed text-brand-text/75">
                    Group sizes stay small on purpose, so nobody gets lost in the crowd and the
                    tutor knows every student&apos;s name and weak spots.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollFade>

        {/* CTA */}
        <ScrollFade>
          <section className="px-5 pb-16 pt-4">
            <div className="mx-auto max-w-3xl rounded-2xl bg-brand-purple p-8 text-center sm:p-10">
              <h2 className="font-serif text-3xl font-bold text-brand-gold">
                Want to know who&apos;d be teaching your child?
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-brand-cream/90">
                Book a free 30 minute call and I&apos;ll tell you straight which programme fits,
                who teaches it, and whether we&apos;re the right fit at all.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={BOOK_A_CALL_LINK}
                  className="inline-block rounded-md bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
                >
                  Book a Free 30 Minute Call
                </a>
                <a
                  href="/revision-diagnostic/?for=parents"
                  className="inline-block rounded-md border-2 border-brand-gold/60 px-8 py-3 font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-purple"
                >
                  Start with the free diagnostic
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
