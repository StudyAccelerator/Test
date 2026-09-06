import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { TUTORS, type Tutor } from '@/lib/tutors'
import { WALL_QUOTES } from '@/lib/testimonials'

export const metadata = {
  title: 'Meet the Team | A-Level Biology, Chemistry and Maths Tutors',
  description:
    'The people who teach A-Level Accelerators: specialist Biology, Chemistry and Maths tutors, led by Dr Waleed Ahmad MBBS, an NHS doctor who teaches the Study System himself.',
  alternates: { canonical: 'https://alevelaccelerators.com/tutors/' },
  /* Draft gate: the page carries placeholder copy until Waleed supplies the
     real tutor bios and photos. Remove this robots block when it goes live
     for real, and add the page to public/llms.txt at the same time. */
  robots: { index: false, follow: true },
}

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/50'
const CARD =
  'rounded-2xl bg-white shadow-[0_1px_2px_rgba(46,37,87,0.06),0_8px_24px_rgba(46,37,87,0.08)] ring-1 ring-brand-purple/5'

/* One real feedback-form quote per teaching subject, pulled from the shared
   testimonial list so the words stay identical everywhere they appear.
   Swap in tutor-specific quotes here when Waleed collects them. */
const TEAM_QUOTES = WALL_QUOTES.filter((q) => ['Maahil', 'Naysa', 'Rayanna'].includes(q.name))

/* The reveal panel: always visible on small screens (no hover on touch),
   revealed on hover or keyboard focus from md up. */
const REVEAL =
  'overflow-hidden transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-80 md:group-hover:opacity-100 md:group-focus-within:max-h-80 md:group-focus-within:opacity-100'

function CircleAvatar({ tutor }: { tutor: Tutor }) {
  if (tutor.photo) {
    return (
      <Image
        src={tutor.photo}
        alt={`${tutor.name}, A-Level ${tutor.subject} tutor`}
        width={320}
        height={320}
        unoptimized
        className="h-32 w-32 rounded-full object-cover shadow-lg ring-4 ring-white"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`flex h-32 w-32 items-center justify-center rounded-full ${tutor.color.chip} font-serif text-5xl font-bold text-white shadow-lg ring-4 ring-white`}
    >
      {tutor.name.charAt(0)}
    </span>
  )
}

function TutorCircleCard({ tutor }: { tutor: Tutor }) {
  return (
    <div
      tabIndex={0}
      className="group relative flex flex-col items-center rounded-3xl p-6 text-center outline-none transition duration-300 hover:bg-white hover:shadow-[0_1px_2px_rgba(46,37,87,0.06),0_8px_24px_rgba(46,37,87,0.10)] focus-visible:ring-2 focus-visible:ring-brand-gold"
    >
      <CircleAvatar tutor={tutor} />
      <p className="mt-4 font-serif text-xl font-bold text-brand-purple">{tutor.name}</p>
      <span
        className={`mt-2 rounded-full ${tutor.color.chip} px-3 py-1 text-xs font-semibold text-white`}
      >
        {tutor.subject}
      </span>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-purple/50">
        {tutor.sessionTime}
      </p>
      <div className={REVEAL}>
        <div className="mt-4 space-y-3 text-left text-sm leading-relaxed text-brand-text/80">
          {tutor.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="text-brand-text/60">{tutor.studying}</p>
          <p className={`border-l-2 pl-3 italic ${tutor.color.accent} border-current`}>
            {tutor.waleedOn}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function MeetTheTeam() {
  return (
    <main>
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-cream px-6 pb-10 pt-16 text-center md:pb-12 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className={EYEBROW}>Meet the team</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-purple sm:text-5xl md:text-6xl">
            Taught by people who&apos;ve been{' '}
            <span className="italic text-brand-gold">top of the subject</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text/75 md:text-xl">
            Every subject is taught by a specialist who achieved top grades in it themselves, all
            teaching one method. Hover over anyone to read more about them.
          </p>
        </div>
      </section>

      {/* ── The team ─────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 pb-16 pt-6 md:pb-20">
          <div className="mx-auto grid max-w-6xl items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Waleed */}
            <div
              tabIndex={0}
              className="group relative flex flex-col items-center rounded-3xl p-6 text-center outline-none transition duration-300 hover:bg-white hover:shadow-[0_1px_2px_rgba(46,37,87,0.06),0_8px_24px_rgba(46,37,87,0.10)] focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <Image
                src="/photos/waleed-portrait-wide.jpg"
                alt="Dr Waleed Ahmad, founder of A-Level Accelerators"
                width={320}
                height={320}
                unoptimized
                className="h-32 w-32 rounded-full object-cover object-top shadow-lg ring-4 ring-white"
              />
              <p className="mt-4 font-serif text-xl font-bold text-brand-purple">
                Dr Waleed Ahmad
              </p>
              <span className="mt-2 rounded-full bg-brand-purple px-3 py-1 text-xs font-semibold text-white">
                Founder
              </span>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-purple/50">
                Teaches the Study System
              </p>
              <div className={REVEAL}>
                <div className="mt-4 space-y-3 text-left text-sm leading-relaxed text-brand-text/80">
                  <p>
                    NHS doctor, former top-performing A-level student, and the person the method
                    started with. I&apos;ve worked with over 1,000 students across 6 years, and I
                    teach the Study System sessions myself.
                  </p>
                  <p className="text-brand-text/60">MBBS · NHS Foundation Doctor</p>
                </div>
              </div>
            </div>
            {TUTORS.map((t) => (
              <TutorCircleCard key={t.slug} tutor={t} />
            ))}
          </div>
          <p className="mt-8 text-center text-brand-text/70">
            The story behind the method is on the{' '}
            <a
              href="/about/"
              className="font-semibold text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-gold"
            >
              About page
            </a>
            .
          </p>
        </section>
      </ScrollFade>

      {/* ── What students say ────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-brand-cream px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className={EYEBROW}>From the feedback forms</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
                What our students <span className="italic text-brand-gold">say about the teaching</span>
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TEAM_QUOTES.map((q) => (
                <figure key={q.name} className={`${CARD} p-6`}>
                  <blockquote className="leading-relaxed text-brand-text/80">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 font-semibold text-brand-purple">
                    {q.name}
                    <span className="block text-sm font-normal text-brand-text/60">{q.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 text-center md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-brand-purple md:text-4xl">
              Come and meet us properly
            </h2>
            <p className="mt-4 leading-relaxed text-brand-text/75">
              The quickest way to see how we teach is to experience it. Book a free 30 minute call
              with Dr Waleed, or start with the free Revision Diagnostic.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={BOOK_A_CALL_LINK}
                className="w-full rounded-full bg-brand-purple px-8 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                Book a free call
              </a>
              <a
                href="/revision-diagnostic/"
                className="w-full rounded-full border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-white sm:w-auto"
              >
                Take the free diagnostic
              </a>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Footer />
    </main>
  )
}
