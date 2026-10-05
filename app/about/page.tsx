import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { WALL_QUOTES } from '@/lib/testimonials'

export const metadata = {
  title: 'About Dr Waleed Ahmad | The NHS Doctor Behind A-Level Accelerators',
  description:
    'Dr Waleed Ahmad MBBS is an NHS doctor and former A-level student who built the study system behind A-Level Accelerators. Over 6 years he has worked with 1,000+ students.',
  alternates: { canonical: 'https://alevelaccelerators.com/about/' },
  /* Draft gate: the page carries [bracketed] slots until Waleed supplies the
     personal facts, and Sarah's quote needs her confirmed consent. Remove
     this robots block at go-live and add the page to public/llms.txt. */
  robots: { index: false, follow: true },
}

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/academic-strategy-call'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/50'

/* Real feedback-form quotes from the shared testimonial list, so the words
   stay identical everywhere they appear on the site. */
const VOICE_QUOTES = WALL_QUOTES.filter((q) =>
  ['Maahil', 'Naysa', 'Rayanna'].includes(q.name)
)

/* The journey, anchored on the approved founder story. Anything in
   [square brackets] is a slot for a fact only Waleed can supply. */
const JOURNEY = [
  {
    label: 'The A-level years',
    photo: '/photos/stressed-student.jpg',
    alt: 'Waleed as a stressed student during his A-levels',
    body: [
      'I worked as hard as anyone I knew. Re-reading, highlighting, beautiful notes until midnight. It looked like dedication. It was actually hundreds of hours thrown at a method that wasted most of them.',
      '[Where you grew up and did your A-levels, which subjects you took, and how close it came: the grades story in your words.]',
    ],
  },
  {
    label: 'Medical school',
    photo: '/photos/waleed-graduation.jpg',
    alt: 'Dr Waleed Ahmad at his medical school graduation',
    body: [
      'Medicine does not care how long you stare at a textbook. The volume forced me to learn properly: active recall, spaced repetition, working backwards from what the examiner actually rewards. Same hours, pointed at the right work.',
      '[Where you studied medicine and when you graduated, and anything you want to say about those years.]',
    ],
  },
  {
    label: 'The NHS',
    photo: '/photos/waleed-scrubs-portrait.jpg',
    alt: 'Dr Waleed Ahmad working as an NHS doctor',
    body: [
      "I work as an NHS doctor. Medicine trains you to diagnose before you treat, and that habit runs through everything we do here: find the real reason the marks are leaking first, then fix that, not everything.",
      '[Anything you want to add about doctor life: your rotations, the on-call rota that students hear about in your emails, what the job has taught you about pressure.]',
    ],
  },
  {
    label: 'A-Level Accelerators',
    photo: '/photos/waleed-desk-calm.jpg',
    alt: 'Dr Waleed Ahmad teaching online from his desk',
    body: [
      "Over 6 years I have worked with more than 1,000 A-level students, and the same pattern keeps appearing: students who work hard but underperform, because nobody ever taught them how to study. So I built the system I needed at 17, and I hold every session to that standard.",
      '[How it actually started: your first students, why you kept going, and the moment it became A-Level Accelerators.]',
    ],
  },
]

export default function AboutDrWaleed() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-cream px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.2fr,1fr]">
          <div className="text-center md:text-left">
            <p className={EYEBROW}>About the founder</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-purple sm:text-5xl md:text-6xl">
              Top grades are a system. I built mine{' '}
              <span className="italic text-brand-gold">the hard way.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-text/75 md:mx-0 md:text-xl">
              I&apos;m Dr Waleed Ahmad, an NHS doctor, a former A-level student whose hard work
              very nearly wasn&apos;t enough, and the founder of A-Level Accelerators. This is the
              story, and the proof.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start justify-center">
              <a
                href={BOOK_A_CALL_LINK}
                className="inline-block rounded-md bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
              >
                Book a Free Call With Me
              </a>
              <a
                href="#journey"
                className="inline-block rounded-md border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
              >
                Read My Story
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[300px] md:max-w-none">
            <div className="rotate-2 rounded-2xl bg-white p-1.5 shadow-[0_0_0_1px_rgba(46,37,87,.08),0_16px_32px_rgba(46,37,87,.18)]">
              <Image
                src="/photos/waleed-hero.jpg"
                alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators"
                width={800}
                height={1000}
                priority
                unoptimized
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-brand-purple/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple font-serif font-bold text-brand-gold">
                W
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
                <p className="mt-0.5 text-[11px] text-brand-text/65">
                  NHS doctor · Founder of A-Level Accelerators
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="bg-white px-5 py-16 scroll-mt-24">
        <div className="mx-auto max-w-4xl">
          <ScrollFade>
            <div className="text-center">
              <p className={EYEBROW}>My journey</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
                From nearly falling short to teaching the system
              </h2>
            </div>
          </ScrollFade>
          <div className="mt-12 space-y-10">
            {JOURNEY.map((step, idx) => (
              <ScrollFade key={step.label}>
                <div
                  className={`grid items-center gap-6 md:grid-cols-[1fr,1.6fr] ${
                    idx % 2 === 1 ? 'md:[direction:rtl]' : ''
                  }`}
                >
                  <div className="[direction:ltr]">
                    <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-purple/10">
                      <Image
                        src={step.photo}
                        alt={step.alt}
                        width={640}
                        height={480}
                        unoptimized
                        className="h-56 w-full object-cover md:h-64"
                      />
                    </div>
                  </div>
                  <div className="[direction:ltr]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">
                      {String(idx + 1).padStart(2, '0')} · {step.label}
                    </p>
                    {step.body.map((para) => (
                      <p key={para} className="mt-3 leading-relaxed text-brand-text/80">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Proof band */}
      <ScrollFade>
        <section className="bg-brand-purple px-5 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
              The results
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-gold sm:text-4xl">
              On average, our students jump two grades.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brand-cream/90">
              Over 6 years, we&apos;ve helped 1,000+ students towards top grades and first-choice
              university offers. And every programme is backed by the same guarantee: join the
              first session, and if you&apos;re not completely satisfied, you get your money back,
              no questions asked.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Results spotlight */}
      <section className="bg-brand-light-gray px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <ScrollFade>
            <h2 className="text-center font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
              Two students, in their own words
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-brand-text/70">
              Recorded interviews with students who finished the full 12 weeks. Their words, not
              mine.
            </p>
          </ScrollFade>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ScrollFade>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-purple/10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                    A · Biology
                  </span>
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-semibold text-white">
                    A · Chemistry
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 space-y-4 leading-relaxed text-brand-text/80">
                  <p>
                    &ldquo;I definitely had the knowledge. In class, if the teacher asked me a
                    question, I could answer it. But when it came to exams, sometimes I waffled
                    too much, or missed what the question was actually asking. It wasn&apos;t
                    about my knowledge, but about exam technique. And that was helped by the
                    sessions, by literally going through the questions and seeing how the tutors
                    thought.&rdquo;
                  </p>
                  <p>
                    &ldquo;It&apos;s literally like having extra teachers to help you out. And,
                    for sure, it gave my parents peace of mind.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 border-t border-brand-purple/10 pt-4 text-sm">
                  <span className="font-bold text-brand-purple">Vernon</span>
                  <span className="block text-brand-text/65">
                    Subject Accelerator alumnus, now at Brighton and Sussex Medical School
                  </span>
                </figcaption>
              </figure>
            </ScrollFade>
            <ScrollFade>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-purple/10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                    A* · Biology
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 space-y-4 leading-relaxed text-brand-text/80">
                  <p>
                    &ldquo;I definitely improved. I think I started with Bs for everything, but
                    throughout my mocks I started getting more of a mixture of As and Bs, a
                    couple of A*s. So I think it got better over the year, actually.&rdquo;
                  </p>
                  <p>
                    &ldquo;Because it&apos;s small groups as well, it still felt like I was
                    still being listened to.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 border-t border-brand-purple/10 pt-4 text-sm">
                  <span className="font-bold text-brand-purple">Sarah</span>
                  <span className="block text-brand-text/65">
                    Subject Accelerator alumna, now studying veterinary science at Bristol, her
                    first choice
                  </span>
                </figcaption>
              </figure>
            </ScrollFade>
          </div>

          {/* Shorter voices */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {VOICE_QUOTES.map((q) => (
              <ScrollFade key={q.name}>
                <figure className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10">
                  <span aria-hidden="true" className="text-sm tracking-tight text-brand-gold">
                    ★★★★★
                  </span>
                  <blockquote className="mt-2 text-sm leading-relaxed text-brand-text/80">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-brand-purple">
                    {q.name} · {q.role}
                  </figcaption>
                </figure>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Where I spend my time */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <ScrollFade>
            <div className="text-center">
              <p className={EYEBROW}>Working with me</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
                Where you&apos;ll find me
              </h2>
            </div>
          </ScrollFade>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ScrollFade>
              <div className="flex h-full flex-col rounded-3xl border-2 border-brand-gold bg-brand-cream p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">
                  With me, directly
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-brand-purple">
                  The Top 1% Mentorship
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-brand-text/80">
                  My main work outside the hospital. I diagnose what&apos;s actually holding your
                  grades back, rebuild how you study, then coach you through the year with
                  fortnightly follow-ups. I keep it to five places, because each student gets me
                  personally.
                </p>
                <a
                  href="/study-systems/"
                  className="mt-6 inline-block self-start rounded-md bg-brand-gold px-6 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
                >
                  See the Mentorship
                </a>
              </div>
            </ScrollFade>
            <ScrollFade>
              <div className="flex h-full flex-col rounded-3xl bg-brand-cream p-8 ring-1 ring-brand-purple/10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/50">
                  Built on my method
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-brand-purple">
                  The Subject Accelerators
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-brand-text/80">
                  Live 12-week Biology, Chemistry and Maths programmes, taught by specialist
                  tutors I trust completely: Tanya, Advait and Andrii. Each achieved top grades
                  in their subject and teaches it my way: exam questions first, mark schemes
                  always.
                </p>
                <a
                  href="/subject-accelerators/"
                  className="mt-6 inline-block self-start rounded-md border-2 border-brand-purple px-6 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
                >
                  Meet the Team
                </a>
              </div>
            </ScrollFade>
          </div>
          <ScrollFade>
            <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-brand-text/70">
              Not ready for either? Start with the free{' '}
              <a href="/revision-diagnostic/" className="font-semibold text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-2 hover:text-brand-gold transition">
                Revision Diagnostic
              </a>
              : 20 questions that show exactly where your marks are leaking, and what I&apos;d fix
              first.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Final CTA */}
      <ScrollFade>
        <section className="bg-brand-cream px-5 pb-20 pt-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
              Let&apos;s build your plan together
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brand-text/75">
              Book a free call and I&apos;ll personally go through where you are, where the marks
              are leaking, and build your academic strategy plan with you.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOK_A_CALL_LINK}
                className="inline-block rounded-md bg-brand-gold px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-gold-light"
              >
                Book Your Free Call
              </a>
              <a
                href="/revision-diagnostic/"
                className="inline-block rounded-md border-2 border-brand-purple px-8 py-3 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
              >
                Take the Free Diagnostic
              </a>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Footer />
    </main>
  )
}
