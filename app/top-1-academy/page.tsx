import type { Metadata } from 'next'
import Image from 'next/image'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'
import TestimonialWall from '@/components/home/testimonial-wall'
import JoinButton from '@/components/academy/join-button'
import PriceCard from '@/components/academy/price-card'
import StickyJoinBar from '@/components/academy/sticky-join-bar'
import Vsl from '@/components/academy/vsl'
import { ACADEMY } from '@/lib/academy'

/* The Top 1% Academy sales page, rebuilt long-form on 30 October 2026
   (Waleed: the first version led with the price and read bare; parents who
   are forwarded this page by their teenager are cold, so the page has to
   warm them up before it asks). Order: promise and video, the mirror, the
   four tiers, who's teaching, what the Academy is (with the three session
   covers), a week inside, who it's for, every testimonial, the tutoring
   price anchor, the price itself, both guarantees, FAQ, parents, the close.
   Standalone like /free-workshop/: no site chrome, so the one decision on
   the page is to join. Every price, date and link comes from lib/academy.ts;
   every join button is JoinButton, so the Stripe links go in once. */

export const metadata: Metadata = {
  title: 'Top 1% Academy: weekly live coaching on how to study, with Dr Waleed',
  description:
    'Two live sessions a week on Zoom with Dr Waleed Ahmad: Study Academy and Hot Seat on Wednesdays, The Marks Clinic on Sundays, every session recorded, 24/7 access in between. Monthly, cancel any time, 7 day money-back guarantee.',
  alternates: { canonical: 'https://alevelaccelerators.com/top-1-academy/' },
  robots: { index: false, follow: false },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/top-1-academy/',
    title: 'Top 1% Academy',
    description: ACADEMY.tagline,
    images: ['/academy/study-academy.png'],
  },
}

const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'
const EYEBROW = 'font-mono text-xs uppercase tracking-[0.2em] text-brand-purple/60'
const H2 = 'font-serif tracking-tight text-3xl md:text-5xl text-brand-purple leading-tight'

const MIRROR = [
  'Works hard every evening and is still sitting on a B',
  'Knows a topic at home, then can\'t bring it back in the exam',
  'Loses marks on questions they understood, because the wording wasn\'t what the examiner wanted',
  'Has had a tutor for one subject and the grade barely moved',
  'Doesn\'t know which subject should get the hours this week, so everything gets a bit',
  'Is heading for the February burnout: tired, behind, and revising the comfortable topics',
]

const TIERS = [
  ['1', 'Knowledge', 'You never learned it properly.', 'What school and subject tutors work on. The only tier most students ever fix.'],
  ['2', 'Recall', 'You learned it, but you couldn\'t bring it back under pressure.', 'Re-reading and highlighting feel productive and never test this.'],
  ['3', 'Application', 'You knew it. The examiner wanted something else, and you wrote something else.', 'Mark scheme wording, command words, the shape of a six-marker.'],
  ['4', 'Exam mastery', 'You knew it and could apply it, then ran out of time or made a silly mistake.', 'Marks per minute, reading the question twice, checking the units.'],
]

const SESSIONS = [
  {
    img: '/academy/study-academy.png',
    when: 'Every Wednesday · 7pm to 9pm',
    name: 'Study Academy + Hot Seat',
    body: 'Hour one, Dr Waleed teaches one part of the study system properly, with a worked example from a real subject: the RAG list, the blurt cycle, strategy stacking, reading a mark scheme like an examiner. Hour two is the Hot Seat. You post your actual problem before the session, and it gets fixed live in front of everyone, because the student watching usually has the same one.',
  },
  {
    img: '/academy/marks-clinic.png',
    when: 'Every Sunday · 10am to 12pm',
    name: 'The Marks Clinic',
    body: 'Bring your paper. Upload a piece of real marked work by Saturday evening, a timed paper, an essay, a week plan, and Dr Waleed goes through it on screen: where the marks went, which tier they went in, what changes next time. You learn as much from everyone else\'s paper as from your own, because the mistakes are the same mistakes in every subject.',
  },
  {
    img: '/academy/method-library.png',
    when: 'Every session, the same night',
    name: 'The Method Library',
    body: 'Every Study Academy, Hot Seat and Marks Clinic is recorded and on the shelf the same night, so a clash with football, work or a family dinner never costs you anything. The workshop replay sits at the front as your Start Here course, in four lessons.',
  },
]

const WEEK = [
  ['Monday', 'Post your plan for the week in Weekly Plans. Which Red topic gets the deep sessions, and the one evening you leave empty on purpose.'],
  ['Wednesday, 6pm', 'Post your Hot Seat problem. "I can\'t get past 6/10 on Biology six-markers" beats "Biology is hard".'],
  ['Wednesday, 7pm to 9pm', 'Study Academy, then the Hot Seat. Live on Zoom, cameras off is fine.'],
  ['Saturday, 6pm', 'Upload one piece of real marked work for the Clinic. Don\'t tidy it up first.'],
  ['Sunday, 10am to 12pm', 'The Marks Clinic. Your work, on screen, with the fix.'],
  ['Any time', 'Message Dr Waleed in the community. Replies the same day, in public, so everyone gets the benefit.'],
]

const FAQ: [string, string][] = [
  [
    'What if I miss a session?',
    'Every session is recorded and in the Method Library the same night, so a missed session is never a lost one. You can still post a Hot Seat problem or upload work for the Clinic and get it answered.',
  ],
  [
    'Is this subject tutoring?',
    'No. Dr Waleed teaches how to study and how to perform in exams, and you run it on every subject you take. The Marks Clinic looks at your real work in any subject, because the method is the same everywhere.',
  ],
  [
    'Which years is it for?',
    'Year 12 first, because this is the year to get the system right. Year 13 students are welcome, and the Clinic was built with your mocks and real papers in mind.',
  ],
  [
    'What happens after I pay?',
    'You are sent straight to the Academy community to request access with the email you paid with. Dr Waleed lets you in the same day, and your welcome email carries the Zoom links and your first three jobs.',
  ],
  [
    'How do I cancel?',
    'Any time, from the link in your receipt or by emailing Dr Waleed. Your membership runs to the end of the month you have paid for and then stops. No notice period, no awkward conversation.',
  ],
  [
    'Can my parents sit in?',
    'Yes, on any live session. The community itself is for the student, and all coaching happens in public threads, never in private messages.',
  ],
  [
    'What does the founding price mean?',
    `Join by ${ACADEMY.foundingDeadlineLabel} and £${ACADEMY.foundingPrice} a month is your price for as long as you stay a member. Everyone who joins after that pays £${ACADEMY.standardPrice}. If you leave and come back later, you come back at the standard price.`,
  ],
  [
    'How does the grade guarantee work?',
    'It is for the founding cohort. Work with Dr Waleed for six months, and if you do not get the grades you need for your university offer, he keeps working with you for free until you do. He offers it because 96% of his students get their first-choice offer.',
  ],
]

export default function AcademyPage() {
  return (
    <main className="bg-brand-cream pb-24 md:pb-0">
      {/* ── 1 · Hero: the promise and the video ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[36rem] rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-12 md:pb-16 md:pt-20">
          <HeroFade delay={0}>
            <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-brand-gold">
              Top 1% Academy · with Dr Waleed Ahmad, NHS doctor
            </p>
          </HeroFade>
          <h1 className="mx-auto mt-5 max-w-4xl text-center font-serif text-4xl font-bold leading-[1.05] tracking-tight text-brand-purple sm:text-5xl lg:text-[4.25rem]">
            <HeroHeadline>
              <HeroWord>Hard</HeroWord> <HeroWord>work</HeroWord> <HeroWord>isn&apos;t</HeroWord> <HeroWord>the</HeroWord>{' '}
              <HeroWord>problem.</HeroWord> <HeroWord className="italic text-brand-gold">Your</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">study</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">system</HeroWord> <HeroWord>is.</HeroWord>
            </HeroHeadline>
          </h1>
          <HeroFade delay={0.45}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-brand-text/75 md:text-xl">
              Weekly live coaching on how to study, with the NHS doctor who has taught the system to over 1,000
              A-level students. Two live sessions a week, every one recorded, and 24/7 access to him in between.
            </p>
          </HeroFade>
          <HeroFade delay={0.6}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <JoinButton placement="hero" />
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-full border border-brand-purple/20 bg-white px-7 py-4 text-lg font-semibold text-brand-purple transition hover:border-brand-gold"
              >
                See how it works
              </a>
            </div>
          </HeroFade>
          <HeroFade delay={0.75} className="mt-10">
            <Vsl />
          </HeroFade>
          <HeroFade delay={0.9}>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['NHS doctor', 'Dr Waleed Ahmad, MBBS'],
                ['1,000+', 'A-level students taught'],
                ['6 years', 'teaching the system'],
                ['96%', 'get their first-choice offer'],
              ].map(([big, small]) => (
                <li key={big} className={`${CARD} px-4 py-4 text-center`}>
                  <p className="font-serif text-2xl font-bold text-brand-purple">{big}</p>
                  <p className="mt-0.5 text-xs text-brand-text/65">{small}</p>
                </li>
              ))}
            </ul>
          </HeroFade>
        </div>
      </section>

      {/* ── 2 · The mirror ─────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={EYEBROW}>Does this sound familiar?</p>
            <h2 className={`${H2} mt-4 max-w-3xl`}>
              Think of a student who&apos;s revising every evening <span className="italic text-brand-gold">and still sitting on a B.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-text/75">
              Maybe that&apos;s you. Or if you&apos;re a parent reading this, maybe it&apos;s your son or daughter. They&apos;re
              doing all the right things. And the grade isn&apos;t moving.
            </p>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {MIRROR.map((line) => (
                <li key={line} className={`${CARD} flex gap-4 p-5`}>
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    ✗
                  </span>
                  <span className="leading-relaxed text-brand-text/85">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-3xl bg-brand-purple p-7 text-brand-cream md:p-10">
              <p className="font-serif text-2xl font-bold leading-snug md:text-3xl">
                It isn&apos;t ability. It isn&apos;t effort.{' '}
                <span className="text-brand-gold">School teaches you what to learn. Nobody teaches you how to learn it.</span>
              </p>
              <p className="mt-4 max-w-2xl text-brand-cream/80">
                Those are two completely different skills, and the second one is the one the exam pays for. Top students
                don&apos;t do more. They do things better. And every one of those things can be taught.
              </p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 3 · The four tiers ─────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={EYEBROW}>Where the marks actually go</p>
            <h2 className={`${H2} mt-4 max-w-3xl`}>
              There are only four reasons <span className="italic text-brand-gold">you ever lose a mark.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-text/75">
              If you don&apos;t know which of the four is costing you the most, you can&apos;t fix it. Most students assume
              it&apos;s the first one and go back to the notes. For most of the students Dr Waleed works with, the marks
              are leaking in the other three.
            </p>
            <ol className="mt-10 grid gap-4 md:grid-cols-2">
              {TIERS.map(([n, name, what, note]) => (
                <li key={name} className="rounded-2xl border border-brand-purple/10 bg-brand-cream p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">Tier {n}</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-brand-purple">{name}</p>
                  <p className="mt-2 leading-relaxed text-brand-text/85">{what}</p>
                  <p className="mt-2 text-sm text-brand-text/60">{note}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-text/80">
              A subject tutor teaches Tier 1, in one subject. If the marks are going in Tiers 2 to 4, a family can pay
              £400 a month and watch the grade stay exactly where it was. The Academy works on all four, in every
              subject you take.
            </p>
            <div className="mt-8">
              <JoinButton placement="tiers" />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 4 · Who's teaching ─────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className={EYEBROW}>Who&apos;s teaching</p>
              <h2 className={`${H2} mt-4`}>
                An NHS doctor who was an <span className="italic text-brand-gold">average Year 12.</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-brand-text/80">
                <p>
                  I&apos;m Dr Waleed Ahmad. During my A-levels I worked as hard as anyone I knew. Re-reading, highlighting,
                  beautiful notes. And I was sitting on Bs.
                </p>
                <p>
                  Then I rebuilt how I studied. Same hours, pointed at the right work. I finished in the top 10% of my
                  year and got into medicine. Medical school then forced me to learn properly: active recall, spaced
                  repetition, working to the mark scheme.
                </p>
                <p>
                  For the last six years I&apos;ve taught that system to over 1,000 A-level students. On average, my students
                  jump two grades within four months, and 96% get their first-choice university offer. The Academy is
                  that system, taught live, every week, with my eyes on your actual work.
                </p>
              </div>
            </div>
            <div>
              <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-purple/10">
                <Image
                  src="/photos/waleed-portrait-wide.jpg"
                  alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators, at his desk in scrubs"
                  width={1200}
                  height={913}
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
              <div className={`${CARD} mt-4 flex items-center gap-4 px-5 py-4`}>
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-purple font-serif text-lg font-bold text-brand-gold">
                  W
                </div>
                <div>
                  <p className="font-semibold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
                  <p className="text-sm text-brand-text/65">NHS doctor · 1,000+ A-level students over 6 years</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 5 · What the Academy is ────────────────────────────────────── */}
      <section id="how" className="scroll-mt-16 bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollFade>
            <p className={EYEBROW}>Inside the Academy</p>
            <h2 className={`${H2} mt-4 max-w-3xl`}>
              Two live sessions a week. <span className="italic text-brand-gold">16 hours a month with Dr Waleed.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-text/75">
              Not a course you watch. A room you show up to, twice a week, with the recordings and the community
              carrying you between sessions.
            </p>
          </ScrollFade>
          <div className="mt-12 space-y-10">
            {SESSIONS.map((s, i) => (
              <ScrollFade key={s.name} delay={0.05}>
                <div className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-purple/10 transition-transform duration-300 hover:-translate-y-1">
                    <Image src={s.img} alt={s.name} width={1460} height={752} unoptimized className="h-auto w-full" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">{s.when}</p>
                    <h3 className="mt-2 font-serif text-3xl font-bold text-brand-purple">{s.name}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-brand-text/80">{s.body}</p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
          <ScrollFade>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-brand-purple p-7 text-brand-cream">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">Between sessions</p>
                <p className="mt-2 font-serif text-2xl font-bold">24/7 access to Dr Waleed</p>
                <p className="mt-3 text-brand-cream/80">
                  Message him in the community whenever you&apos;re stuck. He replies the same day, in public, so every
                  answer helps the whole Academy instead of one person.
                </p>
              </div>
              <div className="rounded-3xl bg-brand-cream p-7 ring-1 ring-brand-purple/10">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">The first fortnight</p>
                <p className="mt-2 font-serif text-2xl font-bold text-brand-purple">
                  Starts {ACADEMY.firstSessionLabel}
                </p>
                <p className="mt-3 text-brand-text/80">
                  First Study Academy and Hot Seat on {ACADEMY.firstSessionLabel} at 7pm. First Marks Clinic on{' '}
                  {ACADEMY.firstClinicLabel} at 10am. Term time, UK time.
                </p>
              </div>
            </div>
            <div className="mt-10 text-center">
              <JoinButton placement="inside" />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ── 6 · A week inside ──────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={EYEBROW}>A week inside</p>
            <h2 className={`${H2} mt-4 max-w-3xl`}>
              What your week looks like <span className="italic text-brand-gold">once you&apos;re in.</span>
            </h2>
            <ol className="mt-10 space-y-3">
              {WEEK.map(([when, what], i) => (
                <li key={when} className={`${CARD} flex gap-5 p-5`}>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-purple font-mono text-sm font-bold text-brand-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-purple">{when}</p>
                    <p className="mt-1 leading-relaxed text-brand-text/80">{what}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </ScrollFade>

      {/* ── 7 · Who it's for ───────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={EYEBROW}>Is it for you?</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-brand-cream p-7 ring-1 ring-brand-purple/10">
                <p className="font-serif text-2xl font-bold text-brand-purple">The Academy is for you if</p>
                <ul className="mt-4 space-y-3">
                  {[
                    'You\'re in Year 12 or Year 13 and keen to improve your grades',
                    'You work hard and the marks don\'t match the hours',
                    'You want someone to show you how, every week, rather than once',
                    'You\'d rather fix how you study than pay for one more subject tutor',
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-brand-text/85">
                      <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-gold text-[11px] font-bold text-brand-purple">
                        ✓
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-brand-purple/10 p-7">
                <p className="font-serif text-2xl font-bold text-brand-purple">It isn&apos;t for you if</p>
                <ul className="mt-4 space-y-3">
                  {[
                    'You want someone to teach you the content of one subject, line by line',
                    'You want to be told the answers rather than shown the method',
                    'You won\'t turn up, post a problem, or upload a paper',
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-brand-text/70">
                      <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-purple/10 text-[11px] font-bold text-brand-purple">
                        ✗
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 8 · Every testimonial ──────────────────────────────────────── */}
      <TestimonialWall />

      {/* ── 9 · The price anchor ───────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={EYEBROW}>What families usually pay</p>
            <h2 className={`${H2} mt-4 max-w-3xl`}>
              One tutor covers one subject. <span className="italic text-brand-gold">This covers how you study.</span>
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-brand-purple/10 p-7">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-text/50">A private tutor</p>
                <ul className="mt-4 space-y-3 text-brand-text/80">
                  <li className="flex justify-between gap-4 border-b border-brand-purple/10 pb-3">
                    <span>£50 an hour, 2 hours a week</span>
                    <span className="font-semibold">£100 a week</span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-brand-purple/10 pb-3">
                    <span>One subject, every month</span>
                    <span className="font-semibold">£400 a month</span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-brand-purple/10 pb-3">
                    <span>Two or three subjects</span>
                    <span className="font-semibold">£800 to £1,200 a month</span>
                  </li>
                  <li className="flex justify-between gap-4 pb-1">
                    <span>Covers</span>
                    <span className="font-semibold">The content of that subject</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl bg-brand-purple p-7 text-brand-cream">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">The Top 1% Academy</p>
                <ul className="mt-4 space-y-3 text-brand-cream/85">
                  <li className="flex justify-between gap-4 border-b border-brand-cream/15 pb-3">
                    <span>4 hours a week, live with Dr Waleed</span>
                    <span className="font-semibold text-brand-cream">16 hours a month</span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-brand-cream/15 pb-3">
                    <span>Covers</span>
                    <span className="font-semibold text-brand-cream">Every subject you take</span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-brand-cream/15 pb-3">
                    <span>Plus</span>
                    <span className="font-semibold text-brand-cream">Replays and 24/7 access</span>
                  </li>
                  <li className="flex justify-between gap-4 pb-1">
                    <span>You&apos;d expect to pay</span>
                    <span className="font-semibold text-brand-gold">The same, if not double</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-text/80">
              It isn&apos;t. The Academy is £{ACADEMY.standardPrice} a month, which works out at under £10 an hour with a
              doctor who has done this with over a thousand students. And for the founding cohort, it&apos;s less than
              that.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* ── 10 · The price ─────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={`${EYEBROW} text-center`}>Your place</p>
            <h2 className={`${H2} mt-4 text-center`}>
              Join the <span className="italic text-brand-gold">founding cohort.</span>
            </h2>
            <div className="mt-10">
              <PriceCard />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 11 · FAQ ───────────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className={EYEBROW}>Questions</p>
            <h2 className={`${H2} mt-4`}>
              The things people ask <span className="italic text-brand-gold">before they join.</span>
            </h2>
            <div className="mt-8 divide-y divide-brand-purple/10 rounded-2xl bg-brand-cream ring-1 ring-brand-purple/10">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-purple">
                    {q}
                    <span className="text-brand-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-brand-text/75">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 12 · For parents ───────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 py-16 md:py-24">
          <div className={`${CARD} mx-auto max-w-3xl p-7 md:p-10`}>
            <p className={EYEBROW}>For parents</p>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-brand-purple md:text-3xl">
              What you&apos;re paying for, in plain words
            </h2>
            <p className="mt-4 leading-relaxed text-brand-text/80">
              Two live group sessions a week with Dr Waleed, recorded, plus 24/7 access to him in a private community
              where every question is answered in public the same day. It teaches how to study and how to perform in
              exams, across every subject your child takes. It is not subject tutoring, and there are no private messages
              between members and the teacher.
            </p>
            <p className="mt-3 leading-relaxed text-brand-text/80">
              Monthly, cancel any time, {ACADEMY.guaranteeDays} day money-back guarantee. You are welcome to sit in on any
              session, and to email Dr Waleed directly at{' '}
              <a href={`mailto:${ACADEMY.contactEmail}`} className="font-semibold text-brand-purple underline underline-offset-2">
                {ACADEMY.contactEmail}
              </a>
              .
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* ── 13 · The close ─────────────────────────────────────────────── */}
      <section className="bg-brand-purple px-6 py-20 text-brand-cream md:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.4fr]">
          <ScrollFade>
            <div className="mx-auto w-56 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-brand-gold/40 md:w-full">
              <Image
                src="/photos/waleed-grad-portrait.jpg"
                alt="Dr Waleed Ahmad at his medical school graduation"
                width={600}
                height={800}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </ScrollFade>
          <ScrollFade delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-gold">The next step</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">
              I&apos;ll see you on <span className="italic text-brand-gold">{ACADEMY.firstSessionLabel} at 7pm.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-cream/80">
              Join, request access to the community with the email you paid with, and I&apos;ll let you in the same day.
              Then introduce yourself, finish your RAG list, and post your first Hot Seat problem. Do those three and
              you&apos;ll get more out of your first week than most students get out of a term.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <JoinButton placement="close" tone="gold" />
              <a href="#pricing" className="text-center text-sm font-semibold text-brand-cream/80 underline underline-offset-4 sm:text-left">
                See what&apos;s included
              </a>
            </div>
            <p className="mt-6 text-sm text-brand-cream/60">
              {ACADEMY.guaranteeDays} day money-back guarantee. Come to your first week, and if it isn&apos;t for you, email
              me and you get every penny back.
            </p>
          </ScrollFade>
        </div>
        <p className="mt-16 text-center text-xs text-brand-cream/40">
          <a href="/privacy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Privacy policy
          </a>
          {' · '}
          <a href="/terms/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Terms
          </a>
          {' · '}A-Level Accelerators
        </p>
      </section>

      <StickyJoinBar />
    </main>
  )
}
