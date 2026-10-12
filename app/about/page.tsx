import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'

export const metadata = {
  title: 'About Dr Waleed Ahmad | The NHS Doctor Behind A-Level Accelerators',
  description:
    'Dr Waleed Ahmad MBBS is an NHS doctor and former A-level student who built the study system behind A-Level Accelerators. Over 6 years he has worked with 1,000+ students.',
  alternates: { canonical: 'https://alevelaccelerators.com/about/' },
  /* Draft gate: the testimonials below need the speakers' (or parents')
     confirmation, which Waleed is collecting himself. Remove this robots
     block at go-live and add the page to public/llms.txt. */
  robots: { index: false, follow: true },
}

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/academic-strategy-call'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/50'

/* Every image renders at its own aspect ratio (w-full h-auto), so nothing
   is ever cropped. Portraits get a narrower column so they do not tower. */
const JOURNEY = [
  {
    label: 'The A-level years',
    photo: '/photos/stressed-student.jpg',
    alt: 'Waleed as a stressed student during his A-levels',
    portrait: false,
    body: [
      'I got As and A*s all the way through school, GCSEs and A-levels alike. From the outside it looked easy. It wasn\'t. I worked harder than anyone I knew: hours and hours, every evening, every weekend, and by the end it had burnt me out.',
      'Hard work got me the grades. It also came close to breaking me, and I had no idea there was a better way.',
    ],
  },
  {
    label: 'Medical school',
    photo: '/photos/waleed-scrubs-portrait.jpg',
    alt: 'Waleed as a medical student at St George\'s, in scrubs',
    portrait: true,
    body: [
      'At St George\'s, University of London, the volume was on another level. Hard work, the only tool I had, stopped being enough. For the first time I had to learn how to learn: how memory actually works, what examiners actually reward, how to make every hour count.',
      'So I built myself a system, and everything changed. If I\'d had it at 17, I\'d have got the same grades in a fraction of the time, without the burnout.',
    ],
  },
  {
    label: 'Becoming a doctor',
    photo: '/photos/waleed-graduation.jpg',
    alt: 'Dr Waleed Ahmad at his medical school graduation',
    portrait: true,
    body: [
      'I graduated in 2025 and I\'m now a Foundation Year 2 doctor at St George\'s. Medicine trains you to diagnose before you treat, and that is exactly how I work with a student: find out why the marks are leaking first, then fix that, not everything.',
      'It also means I teach around a hospital rota. My students know their teacher still sits exams, still revises, and still uses the system every week.',
    ],
  },
  {
    label: 'A-Level Accelerators',
    photo: '/photos/waleed-desk-calm.jpg',
    alt: 'Dr Waleed Ahmad teaching online from his desk',
    portrait: false,
    body: [
      'I started tutoring six years ago, in medical school, one GCSE and A-level student at a time. It was subject support, and it worked: grades went up. But I was only fixing the knowledge side. What I really wanted to fix was how my students studied.',
      'Once I started teaching the system instead of the subject, the results became consistent. On average my students jump two grades within four months, and 96% get their first-choice university offer. More than 1,000 students later, that system is A-Level Accelerators.',
    ],
  },
]

/* Testimonials: the point made clearly, in the speaker's own meaning if
   not their exact filler. Sources: dashboard/data/testimonials-master.md
   and the Fathom call recordings. Waleed collects each consent before
   go-live. */
const RESULTS = [
  {
    name: 'Sarah',
    before: 'C',
    after: 'A*',
    subject: 'Biology',
    quote:
      'I started the year on Bs, and in Biology I was sometimes getting Cs. By my mocks I was getting A*s, and I finished with an A* in Biology. It would have been so much harder on my own.',
    role: 'Now studying veterinary science at Bristol',
  },
  {
    name: 'Vernon',
    before: 'B/C',
    after: 'A',
    subject: 'Biology and Chemistry',
    quote:
      'I knew the content. In class I could answer anything. In exams I waffled and missed what the question was asking. The sessions fixed how I answered, and I finished with an A in Biology and an A in Chemistry. It gave my parents peace of mind too.',
    role: 'Now studying at Brighton and Sussex Medical School',
  },
]

const PARENTS = [
  {
    quote: 'Daniel has had so many tutors over the years. Not one of them ever explained it like this.',
    who: 'Jeeva, Daniel\'s mum',
    context: 'Enrolled Daniel on the Top 1% Mentorship the same call',
  },
  {
    quote:
      'I\'m a dentist and I still couldn\'t help my daughter with this. I needed someone who had actually cracked it. Then we found Dr Waleed.',
    who: 'Anam\'s mum',
    context: 'Year 12 parent',
  },
]

const STUDENTS = [
  {
    quote:
      'I paid £70 an hour for an examiner and it didn\'t help. This isn\'t a tutoring session. It\'s the whole system, and someone there when I fall back.',
    who: 'Kavi, Year 13',
  },
  {
    quote: 'It gets to the root of the problem and fixes it.',
    who: 'Samar, resitting Biology and Chemistry',
  },
  {
    quote:
      'Every tutor I had felt like another school lesson: the same thing taught to me again. This was the part that was always missing.',
    who: 'Doreen, Year 13',
  },
  {
    quote:
      'Ask a tutor how to get better at studying and they talk about the subject. Procrastination and burnout are an afterthought to them. This is nothing like typical tuition.',
    who: 'Hani, Year 13, predicted A*A*A',
  },
  {
    quote:
      'I could do the knowledge part myself. What I didn\'t know was how to answer the way the mark scheme wants. Now I can see exactly which small bits I was missing.',
    who: 'Azka, Year 12',
  },
  {
    quote:
      'Nobody at school had told me any of this. It\'s completely different to what my teachers say, and it\'s helped.',
    who: 'Yusuf, Year 11',
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
              I&apos;m Dr Waleed Ahmad: NHS doctor, founder of A-Level Accelerators, and a former
              student who got the A*s through sheer hours, then found a far better way. This is
              the story, and the proof.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
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
          <div className="mx-auto w-full max-w-[320px] md:max-w-none">
            <div className="rotate-2 rounded-2xl bg-white p-1.5 shadow-[0_0_0_1px_rgba(46,37,87,.08),0_16px_32px_rgba(46,37,87,.18)]">
              <Image
                src="/photos/waleed-hero.jpg"
                alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators"
                width={1600}
                height={900}
                priority
                unoptimized
                className="h-auto w-full rounded-xl"
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
      <section id="journey" className="scroll-mt-24 bg-white px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <ScrollFade>
            <div className="text-center">
              <p className={EYEBROW}>My journey</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
                From burning out on the grades to teaching the system
              </h2>
            </div>
          </ScrollFade>
          <div className="mt-12 space-y-12">
            {JOURNEY.map((step, idx) => (
              <ScrollFade key={step.label}>
                <div
                  className={`grid items-center gap-8 md:grid-cols-[1fr,1.6fr] ${
                    idx % 2 === 1 ? 'md:[direction:rtl]' : ''
                  }`}
                >
                  <div className="[direction:ltr]">
                    <div
                      className={`mx-auto overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-purple/10 ${
                        step.portrait ? 'max-w-[260px] md:max-w-[300px]' : 'max-w-md md:max-w-none'
                      }`}
                    >
                      <Image
                        src={step.photo}
                        alt={step.alt}
                        width={step.portrait ? 900 : 1200}
                        height={step.portrait ? 1200 : 675}
                        unoptimized
                        className="h-auto w-full"
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
              On average, our students jump two grades within four months.
            </h2>
            <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ['1,000+', 'students over 6 years'],
                ['2 grades', 'average jump, within 4 months'],
                ['96%', 'get their first-choice university offer'],
              ].map(([stat, label]) => (
                <div key={stat} className="rounded-2xl border border-brand-cream/15 bg-white/5 px-4 py-5">
                  <p className="font-serif text-3xl font-bold text-brand-gold">{stat}</p>
                  <p className="mt-1 text-sm text-brand-cream/80">{label}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-cream/90">
              And every programme is backed by the same guarantee: join the first session, and if
              you&apos;re not completely satisfied, you get your money back, no questions asked.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Results: two students */}
      <section className="bg-brand-light-gray px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <ScrollFade>
            <h2 className="text-center font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
              From Cs to A*s, in their own words
            </h2>
          </ScrollFade>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {RESULTS.map((r) => (
              <ScrollFade key={r.name}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-purple/10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl bg-brand-cream px-3 py-2 font-serif text-2xl font-bold text-brand-text/50">
                      {r.before}
                    </span>
                    <span aria-hidden="true" className="text-xl text-brand-gold">
                      →
                    </span>
                    <span className="rounded-xl bg-brand-purple px-3 py-2 font-serif text-2xl font-bold text-brand-gold">
                      {r.after}
                    </span>
                    <span className="ml-1 text-sm font-semibold text-brand-purple">{r.subject}</span>
                  </div>
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-brand-text/85">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-brand-purple/10 pt-4">
                    <span className="font-bold text-brand-purple">{r.name}</span>
                    <span className="block text-sm text-brand-text/65">{r.role}</span>
                  </figcaption>
                </figure>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Parents */}
      <ScrollFade>
        <section className="bg-brand-purple px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
              What parents say
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {PARENTS.map((p) => (
                <figure key={p.who} className="rounded-3xl border border-brand-gold/30 bg-white/5 p-8">
                  <blockquote className="font-serif text-2xl font-bold leading-snug text-brand-cream sm:text-3xl">
                    &ldquo;{p.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5">
                    <span className="font-semibold text-brand-gold">{p.who}</span>
                    <span className="block text-sm text-brand-cream/70">{p.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Students on the method */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <ScrollFade>
            <div className="text-center">
              <p className={EYEBROW}>Inside the Top 1% Mentorship</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-purple sm:text-4xl">
                Why students pick this over another tutor
              </h2>
            </div>
          </ScrollFade>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STUDENTS.map((s) => (
              <ScrollFade key={s.who}>
                <figure className="flex h-full flex-col rounded-2xl bg-brand-cream p-6 ring-1 ring-brand-purple/10">
                  <span aria-hidden="true" className="text-sm tracking-tight text-brand-gold">
                    ★★★★★
                  </span>
                  <blockquote className="mt-3 flex-1 font-semibold leading-relaxed text-brand-purple">
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-brand-text/65">{s.who}</figcaption>
                </figure>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Where I spend my time */}
      <section className="bg-brand-light-gray px-5 py-16">
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
              <div className="flex h-full flex-col rounded-3xl border-2 border-brand-gold bg-white p-8">
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
              <div className="flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-brand-purple/10">
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
              <a href="/revision-diagnostic/" className="font-semibold text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-2 transition hover:text-brand-gold">
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
