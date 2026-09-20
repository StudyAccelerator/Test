import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { TUTORS } from '@/lib/tutors'
import { TutorPortrait } from '@/components/tutors/tutor-photo'
import { WALL_QUOTES } from '@/lib/testimonials'

export const metadata = {
  title: 'Meet the Team | A-Level Biology, Chemistry and Maths Tutors',
  description:
    'The people who teach A-Level Accelerators: specialist Biology, Chemistry and Maths tutors, led by Dr Waleed Ahmad MBBS, the NHS doctor behind the Top 1% Mentorship.',
  alternates: { canonical: 'https://alevelaccelerators.com/tutors/' },
  /* Draft gate: the page carries placeholder copy until Waleed supplies the
     real tutor bios and photos. Remove this robots block when it goes live
     for real, and add the page to public/llms.txt at the same time. */
  robots: { index: false, follow: true },
}

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/academic-strategy-call'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/50'

/* Real feedback-form quotes from the shared testimonial list, so the words
   stay identical everywhere they appear. Each tutor card shows the quote
   named in lib/tutors.ts; three more close the page. */
const STRIP_QUOTES = WALL_QUOTES.filter((q) =>
  ['Rayanna', 'Ahreen', 'Catherine'].includes(q.name)
)

export default function MeetTheTeam() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-cream px-6 pb-14 pt-16 text-center md:pb-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className={EYEBROW}>Meet the team</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-purple sm:text-5xl md:text-6xl">
            Taught by people who&apos;ve been top of the subject themselves
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-text/75 md:text-xl">
            Every A-Level Accelerators subject is taught by a specialist who achieved top grades in
            it and now teaches it every week. And behind all of them sits one method, built by a
            doctor who used it to get there first.
          </p>
        </div>
      </section>

      {/* Waleed: founder band */}
      <ScrollFade>
        <section className="px-5 py-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-purple">
            <div className="grid items-stretch md:grid-cols-[2fr,3fr]">
              <div className="relative min-h-[20rem] md:min-h-0">
                <Image
                  src="/photos/waleed-scrubs-portrait.jpg"
                  alt="Dr Waleed Ahmad, founder of A-Level Accelerators"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="p-8 sm:p-10 md:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
                  Founder · Leads the Top 1% Mentorship
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-brand-gold sm:text-4xl">
                  Dr Waleed Ahmad, MBBS
                </h2>
                <p className="mt-5 leading-relaxed text-brand-cream/90">
                  I&apos;m an NHS doctor and a former top-performing A-level student. Over 6 years
                  I&apos;ve worked with more than 1,000 students, and everything we teach comes from
                  one idea: top grades are a system, not a talent.{' '}
                  <span className="font-semibold text-brand-gold">
                    On average, our students jump two grades.
                  </span>
                </p>
                <p className="mt-4 leading-relaxed text-brand-cream/90">
                  I built the method behind every programme, and inside the Top 1% Mentorship I
                  work with students directly: exam technique, revision strategy and coaching. The
                  subject teaching belongs to three specialists I trust completely, and you can meet
                  them below.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-sm font-semibold text-brand-gold">
                    Top 1% Mentorship
                  </span>
                  <span className="rounded-full border border-brand-cream/20 px-4 py-1.5 text-sm text-brand-cream/80">
                    Exam technique &amp; strategy
                  </span>
                  <span className="rounded-full border border-brand-cream/20 px-4 py-1.5 text-sm text-brand-cream/80">
                    1,000+ students over 6 years
                  </span>
                </div>
                <a
                  href="/study-systems/"
                  className="mt-7 inline-block rounded-md bg-brand-gold px-6 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
                >
                  See the Top 1% Mentorship
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* The three tutors */}
      <section className="bg-white px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <ScrollFade>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>The subject specialists</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
                Specialists teach the subject. A doctor teaches the exam.
              </h2>
              <p className="mt-4 leading-relaxed text-brand-text/75">
                Three tutors, three subjects, one method. Each of them knows their spec inside out,
                achieved top grades themselves and teaches the same way every session: exam
                questions first, mark schemes always.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-purple/10 bg-brand-purple/[0.04] px-4 py-1.5 text-sm font-semibold text-brand-purple">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                Next 12-week cohort starts Sunday 17 January
              </p>
            </div>
          </ScrollFade>

          <div className="mt-12 space-y-12">
            {TUTORS.map((tutor, idx) => {
              const studentQuote = WALL_QUOTES.find((q) => q.name === tutor.studentQuoteName)
              return (
              <ScrollFade key={tutor.slug}>
                <article
                  id={tutor.slug}
                  className="overflow-hidden rounded-3xl bg-brand-cream ring-1 ring-brand-purple/10"
                >
                  <div
                    className={`grid items-stretch md:grid-cols-[2fr,3fr] ${
                      idx % 2 === 1 ? 'md:[direction:rtl]' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-5 p-6 md:p-8 [direction:ltr]">
                      <div className="h-72 md:flex-1 md:min-h-[20rem]">
                        <TutorPortrait tutor={tutor} />
                      </div>
                      {studentQuote && (
                        <figure className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-purple/10">
                          <span aria-hidden="true" className="text-sm tracking-tight text-brand-gold">
                            ★★★★★
                          </span>
                          <blockquote className="mt-2 text-sm leading-relaxed text-brand-text/80">
                            &ldquo;{studentQuote.quote}&rdquo;
                          </blockquote>
                          <figcaption className="mt-3 text-sm font-semibold text-brand-purple">
                            {studentQuote.name} · {studentQuote.role}
                          </figcaption>
                        </figure>
                      )}
                    </div>
                    <div className="px-6 pb-8 md:py-8 md:pr-10 [direction:ltr]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full ${tutor.color.chip} px-3 py-1 text-sm font-semibold text-white`}
                        >
                          {tutor.subject}
                        </span>
                        <span className={`text-sm font-semibold ${tutor.color.accent}`}>
                          {tutor.sessionTime}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-3xl font-bold text-brand-purple">
                        {tutor.name}
                      </h3>
                      <p className="mt-1 font-semibold text-brand-text/60">{tutor.headline}</p>

                      {tutor.about.map((para) => (
                        <p key={para} className="mt-4 leading-relaxed text-brand-text/80">
                          {para}
                        </p>
                      ))}

                      <p className="mt-5 text-sm">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-purple/50">
                          Currently studying
                        </span>
                        <span className="mt-1 block font-semibold text-brand-purple">
                          {tutor.studying}
                        </span>
                      </p>

                      <h4 className="mt-6 font-serif text-lg font-bold text-brand-purple">
                        How {tutor.name} gets students to A*s
                      </h4>
                      <ul className="mt-3 space-y-2 text-brand-text/80">
                        {tutor.aStar.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span className={`font-bold ${tutor.color.accent}`}>✓</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <figure className="mt-6 rounded-xl border-l-4 border-brand-gold bg-white p-5 shadow-sm">
                        <blockquote className="italic leading-relaxed text-brand-text/80">
                          &ldquo;{tutor.waleedOn}&rdquo;
                        </blockquote>
                        <figcaption className="mt-3 text-sm font-semibold text-brand-purple">
                          Dr Waleed Ahmad · Founder
                        </figcaption>
                      </figure>

                      <a
                        href="/subject-accelerators/#subjects"
                        className={`mt-6 inline-block rounded-md ${tutor.color.chip} px-6 py-3 font-semibold text-white transition hover:opacity-90`}
                      >
                        Join the {tutor.subject} Accelerator
                      </a>
                    </div>
                  </div>
                </article>
              </ScrollFade>
              )
            })}
          </div>
        </div>
      </section>

      {/* Real student quotes */}
      <ScrollFade>
        <section className="bg-brand-light-gray px-5 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-serif text-3xl font-bold text-brand-purple">
              Straight from the feedback forms
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-brand-text/70">
              Real, unedited feedback from students in the live sessions.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {STRIP_QUOTES.map((q) => (
                <figure
                  key={q.name}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10"
                >
                  <blockquote className="leading-relaxed text-brand-text/80">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-brand-purple">
                    {q.name} · {q.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Guarantee */}
      <ScrollFade>
        <section className="px-5 pt-14">
          <div className="mx-auto max-w-2xl rounded-3xl border-4 border-brand-gold bg-brand-cream p-10 text-center shadow-lg">
            <div className="mb-4 text-4xl">🛡️</div>
            <h2 className="font-serif text-2xl font-bold text-brand-purple sm:text-3xl">
              Every programme is backed by our guarantee
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-text">
              Join the first session, and if you&apos;re not completely satisfied, you get your
              money back, no questions asked.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Final CTA */}
      <ScrollFade>
        <section className="px-5 pb-20 pt-14 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
              Want to know which of us you need?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brand-text/75">
              Take the free Revision Diagnostic: 20 questions that show where your marks are
              leaking and which programme fixes it. Or book a free call and talk it through with me
              directly.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

      <Footer />
    </main>
  )
}
