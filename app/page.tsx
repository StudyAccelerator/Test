import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'

export const metadata = {
  title: 'A-Level Accelerators | Live A-Level Courses, Study Systems & Free Revision Tools',
  description:
    'Doctor-led A-level education: live online courses in Biology, Chemistry, Maths and Physics, the Top 1% Study System, and free revision tools. Founded by Dr Waleed Ahmad MBBS, trusted by 1,000+ students.',
  alternates: { canonical: 'https://alevelaccelerators.com/' },
}

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

/* Layered shadow stack: the one card surface used across the page */
const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'

const EYEBROW = 'font-mono text-xs uppercase tracking-[0.2em] text-brand-purple/60'

const programmesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'A-Level Accelerators Programmes',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Summer Accelerator', url: 'https://alevelaccelerators.com/summer-accelerators/' },
    { '@type': 'ListItem', position: 2, name: 'Subject Accelerators', url: 'https://alevelaccelerators.com/subject-accelerators/' },
    { '@type': 'ListItem', position: 3, name: 'Top 1% Study System', url: 'https://alevelaccelerators.com/study-systems/' },
  ],
}

const PROGRAMMES = [
  {
    audience: 'For Year 12 going into Year 13',
    name: 'Summer Accelerator',
    badge: 'Enrolling now · starts 25th July',
    outcome:
      'Six weeks, live. Master the high-yield Year 13 topics that decide your predicted grades, and walk into September already ahead.',
    href: '/summer-accelerators',
    cta: 'Explore the Summer Accelerator',
  },
  {
    audience: 'For students who know their weak subject',
    name: 'Subject Accelerators',
    badge: 'Runs through the school year',
    outcome:
      'Twelve-week live exam programmes in Biology, Chemistry and Maths. Small groups, specialist tutors, taught to the mark scheme.',
    href: '/subject-accelerators',
    cta: 'Explore Subject Accelerators',
  },
  {
    audience: 'For students whose problem is how they study',
    name: 'Top 1% Study System',
    badge: 'The method itself',
    outcome:
      'High-yield revision, time management and exam performance. The system behind everything we teach, so you stay ahead without burning out.',
    href: '/study-systems',
    cta: 'Explore the Study System',
  },
]

const WALL_QUOTES = [
  {
    quote:
      'I liked how we worked together to get the answers instead of the tutor doing it for us. We go straight into exam practice instead of spending ages on content, and it works.',
    name: 'Maahil',
    role: 'A-Level Chemistry Student',
  },
  {
    quote: 'The exam question walk-throughs were brilliant, really focused on applying what we know rather than just repeating content',
    name: 'Naysa',
    role: 'A-Level Biology Student',
  },
  {
    quote: 'All the information provided was clear and understandable. It was really helpful and improved my confidence!',
    name: 'Biju',
    role: 'Gap Year Student',
  },
  {
    quote:
      'The topics were really hard to approach while researching alone so seeing it broken down into manageable points was useful to apply it even better',
    name: 'Delicia',
    role: 'Year 13 Student',
  },
  {
    quote: 'I liked how the session was so exam-technique focused, with a great balance of exam questions and the content behind them',
    name: 'Furkan',
    role: 'Year 13 Student',
  },
  {
    quote:
      'The lessons were interactive with well explained concepts, easy to follow and very informative. Even the best students had something to improve on',
    name: 'Jay',
    role: 'Year 12 Student',
  },
]

export default function Home() {
  return (
    <main className="bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programmesSchema) }}
      />

      <Header />

      {/* ── 1 · Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 40% at 80% 15%, rgba(201,169,110,0.13) 0%, rgba(201,169,110,0) 100%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <HeroFade delay={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/10 bg-brand-purple/[0.04] px-4 py-1.5 text-sm font-semibold text-brand-purple">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                Doctor-led A-Level education
              </span>
            </HeroFade>
            <h1 className="mt-6 font-serif font-bold tracking-tight leading-[1.04] text-4xl sm:text-5xl lg:text-[4rem] text-brand-purple">
              <HeroHeadline>
                <HeroWord>Top</HeroWord> <HeroWord>grades</HeroWord> <HeroWord>are</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">a system,</HeroWord>{' '}
                <HeroWord>not</HeroWord> <HeroWord>a</HeroWord> <HeroWord>talent.</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.45}>
              <p className="mt-6 text-lg md:text-xl text-brand-text/75 leading-relaxed max-w-xl">
                Live A-level courses and study systems for Biology, Chemistry, Maths and Physics. Built and taught by Dr Waleed Ahmad MBBS, an NHS doctor who has worked with over 1,000 students.
              </p>
            </HeroFade>
            <HeroFade delay={0.55}>
              <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#programmes"
                  className="inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-8 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
                >
                  Explore the Programmes
                </a>
                <a
                  href="/revision-tracker"
                  className="inline-flex justify-center items-center rounded-full border border-brand-purple/20 text-brand-purple px-8 py-4 text-lg font-semibold hover:border-brand-gold hover:bg-brand-gold/5 transition-all"
                >
                  Try the Free Tracker
                </a>
              </div>
              <p className="mt-4 text-sm text-brand-text/55">
                Three programmes, one method. The tracker is free and takes about three minutes.
              </p>
            </HeroFade>
          </div>

          <HeroFade delay={0.3} className="relative">
            <div className={`relative overflow-hidden rotate-1 ${CARD} !rounded-3xl`}>
              <Image
                src="/photos/waleed-hero.jpg"
                alt="Dr Waleed Ahmad, founder of A-Level Accelerators, at his desk in scrubs"
                width={1600}
                height={900}
                priority
                unoptimized
                className="w-full h-auto"
              />
              <span className="absolute top-4 left-4 rounded-full bg-brand-purple/90 backdrop-blur text-brand-cream text-xs font-semibold px-3.5 py-1.5">
                NHS doctor · former top A-level student
              </span>
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-auto sm:right-10 sm:w-auto rounded-2xl bg-white/90 backdrop-blur border border-brand-gold/30 shadow-xl px-5 py-3.5 flex items-center gap-4">
              <div className="h-11 w-11 shrink-0 rounded-full bg-brand-purple text-brand-gold flex items-center justify-center font-serif font-bold text-lg">
                W
              </div>
              <div className="leading-tight">
                <p className="font-bold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
                <p className="text-sm text-brand-text/70">Founder · teaches every cohort</p>
              </div>
            </div>
          </HeroFade>
        </div>
      </section>

      {/* ── 2 · Trust strip ──────────────────────────────────────────────── */}
      <ScrollFade>
        <section className="border-y border-brand-purple/10 bg-white/50">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">
            {[
              'MBBS · NHS doctor',
              '1,000+ students taught',
              'Biology · Chemistry · Maths · Physics',
              'AQA, OCR and Edexcel covered',
              'First session risk-free',
            ].map((badge) => (
              <span key={badge} className="font-mono text-xs uppercase tracking-[0.15em] text-brand-purple/70">
                {badge}
              </span>
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* ── 3 · Programme router ─────────────────────────────────────────── */}
      <section id="programmes" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className={`${EYEBROW} mb-4`}>Choose your route</p>
            <h2 className="font-serif tracking-tight text-3xl md:text-5xl text-brand-purple max-w-2xl leading-tight">
              Three programmes. <span className="italic text-brand-gold">One</span> method.
            </h2>
            <p className="mt-4 max-w-xl text-brand-text/70">
              Everything we run trains the same thing: turning what you know into marks. Start from where you actually are.
            </p>
          </ScrollFade>
          <div className="mt-14 grid md:grid-cols-3 border-y border-brand-purple/10">
            {PROGRAMMES.map((p, i) => (
              <ScrollFade key={p.name} delay={i * 0.12}>
                <a
                  href={p.href}
                  className="group/card relative flex flex-col h-full py-10 px-8 md:border-r border-brand-purple/10 md:first:border-l max-md:border-b max-md:last:border-b-0 hover:bg-gradient-to-t hover:from-brand-purple/[0.03] hover:to-transparent transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-10 w-1 h-6 group-hover/card:h-12 bg-brand-gold rounded-r-full transition-all duration-300"
                  />
                  <p className={EYEBROW}>{p.audience}</p>
                  <h3 className="mt-4 font-serif text-2xl md:text-[1.7rem] font-bold text-brand-purple group-hover/card:translate-x-2 transition-transform duration-300">
                    {p.name}
                  </h3>
                  <span className="mt-3 self-start rounded-full bg-brand-gold/15 text-brand-purple text-xs font-bold px-3 py-1">
                    {p.badge}
                  </span>
                  <p className="mt-4 leading-relaxed text-brand-text/75">{p.outcome}</p>
                  <span className="mt-auto pt-8 font-semibold text-brand-gold group-hover/card:underline underline-offset-4">
                    {p.cta} →
                  </span>
                </a>
              </ScrollFade>
            ))}
          </div>
          <ScrollFade delay={0.2}>
            <p className="mt-8 text-center text-brand-text/60">
              Not ready for a programme?{' '}
              <a href="#tracker" className="font-semibold text-brand-purple underline underline-offset-4 hover:text-brand-gold transition">
                Start with the free revision timetable
              </a>
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* ── 4 · Method statement ─────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto text-center">
            <p className={`${EYEBROW} mb-8`}>How every programme works</p>
            <p className="font-serif tracking-tight text-3xl sm:text-4xl md:text-[3.4rem] text-brand-purple leading-[1.15]">
              I <span className="italic text-brand-gold">diagnose</span>
              <sup className="font-mono text-sm text-brand-purple/50 ml-1">01</sup> how you actually study, {' '}
              <span className="italic text-brand-gold">rebuild</span>
              <sup className="font-mono text-sm text-brand-purple/50 ml-1">02</sup> your revision around what moves marks, and {' '}
              <span className="italic text-brand-gold">coach</span>
              <sup className="font-mono text-sm text-brand-purple/50 ml-1">03</sup> you all the way to exam day.
            </p>
            <p className="mt-8 text-brand-text/60 max-w-xl mx-auto">
              I am a doctor. I do not treat anything before diagnosing it, and we do not teach anyone before finding where the marks are leaking.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* ── 5 · How it works: 01 / 02 / 03 ──────────────────────────────── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
          {/* 01 Diagnose */}
          <ScrollFade>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className={EYEBROW}>01 · Diagnose</p>
                <h3 className="mt-4 font-serif tracking-tight text-2xl md:text-4xl text-brand-purple leading-tight">
                  First we find where the marks are leaking
                </h3>
                <p className="mt-4 text-brand-text/75 leading-relaxed max-w-lg">
                  Every student starts with an honest audit: every topic, rated for real confidence, not familiarity. The topics you avoid are usually where your grade is hiding.
                </p>
              </div>
              <div className={`${CARD} p-6 md:p-8`}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-purple/50 mb-4">Topic audit · Chemistry</p>
                <ul className="space-y-3">
                  {[
                    ['Electrochemistry', 'avoiding it', 'bg-red-100 text-red-700'],
                    ['Kinetics', 'shaky', 'bg-amber-100 text-amber-700'],
                    ['Aromatic chemistry', 'shaky', 'bg-amber-100 text-amber-700'],
                    ['Bonding', 'solid', 'bg-emerald-100 text-emerald-700'],
                  ].map(([topic, status, cls]) => (
                    <li key={topic as string} className="flex items-center justify-between gap-4 rounded-xl border border-brand-purple/10 px-4 py-3">
                      <span className="font-medium text-brand-text">{topic}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${cls}`}>{status}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-brand-gold font-semibold">↑ Most of this grade is hiding in the first row</p>
              </div>
            </div>
          </ScrollFade>

          {/* 02 Rebuild */}
          <ScrollFade>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="md:order-2">
                <p className={EYEBROW}>02 · Rebuild</p>
                <h3 className="mt-4 font-serif tracking-tight text-2xl md:text-4xl text-brand-purple leading-tight">
                  Then the same hours go into the right work
                </h3>
                <p className="mt-4 text-brand-text/75 leading-relaxed max-w-lg">
                  Re-reading and highlighting feel productive and move nothing. We rebuild your week around deep work, active recall the day after, and spaced review, so every hour earns marks.
                </p>
              </div>
              <div className={`${CARD} p-6 md:p-8 md:order-1`}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-purple/50 mb-4">Your week · rebuilt</p>
                <div className="space-y-3">
                  {[
                    ['Mon', 'Deep Work · Electrochemistry', '90 min', 'bg-brand-purple text-brand-cream'],
                    ['Tue', 'Active Recall · blurt yesterday from memory', '45 min', 'bg-brand-gold/20 text-brand-purple'],
                    ['Thu', 'Light Review · consolidate and re-test', '30 min', 'bg-brand-cream-dark text-brand-purple'],
                  ].map(([day, task, len, cls]) => (
                    <div key={day as string} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-brand-purple/50 w-9">{day}</span>
                      <span className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${cls}`}>{task}</span>
                      <span className="font-mono text-xs text-brand-purple/50">{len}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-brand-gold font-semibold">Spaced exactly when your brain is about to forget</p>
              </div>
            </div>
          </ScrollFade>

          {/* 03 Coach */}
          <ScrollFade>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className={EYEBROW}>03 · Coach</p>
                <h3 className="mt-4 font-serif tracking-tight text-2xl md:text-4xl text-brand-purple leading-tight">
                  Live teaching, straight to exam technique
                </h3>
                <p className="mt-4 text-brand-text/75 leading-relaxed max-w-lg">
                  Sessions are live and interactive, never pre-recorded. You attempt real exam questions, get feedback on your actual answers, and learn to write in the language the mark scheme rewards.
                </p>
                <a
                  href={BOOK_A_CALL_LINK}
                  className="mt-7 inline-flex items-center rounded-full bg-brand-purple text-brand-cream px-7 py-3.5 font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
                >
                  Book a Free Call
                </a>
                <p className="mt-3 text-sm text-brand-text/55">Fifteen minutes, no obligation. An honest look at where you are.</p>
              </div>
              <div>
                <div className={`${CARD} p-6 md:p-8`}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-purple/50 mb-4">Session note · week 4</p>
                  <p className="text-brand-text leading-relaxed">
                    &ldquo;You lost 3 marks on the 6-marker to phrasing, not knowledge. We drilled the mark scheme wording today. Before Thursday: two timed questions, same topic, closed notes.&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brand-purple">Dr Waleed</p>
                </div>
                <figure className={`${CARD} p-6 mt-5`}>
                  <blockquote className="text-brand-text/85 leading-relaxed">
                    &ldquo;We go straight into exam practice instead of spending ages on content, and it works.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-brand-purple">
                    Maahil · A-Level Chemistry Student
                  </figcaption>
                </figure>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ── 6 · Meet Dr Waleed ───────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-center">
            <div className="relative">
              <div className={`overflow-hidden -rotate-1 ${CARD} !rounded-3xl`}>
                <Image
                  src="/photos/waleed-notebook.jpg"
                  alt="Dr Waleed Ahmad planning a student session at his desk"
                  width={1200}
                  height={675}
                  unoptimized
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-6 -right-2 sm:-right-5 w-24 sm:w-28 rotate-3 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-brand-purple/10">
                <Image
                  src="/photos/waleed-young.jpg"
                  alt="Waleed as a school student"
                  width={700}
                  height={933}
                  unoptimized
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-center text-[10px] font-medium text-brand-text/60 pt-1 pb-0.5">me, before the system</p>
              </div>
            </div>
            <div>
              <p className={EYEBROW}>Who is teaching you</p>
              <h2 className="mt-4 font-serif tracking-tight text-3xl md:text-5xl text-brand-purple leading-tight">
                I did everything school said. It nearly <span className="italic text-brand-gold">wasn&apos;t enough.</span>
              </h2>
              <div className="mt-6 space-y-4 text-brand-text/80 leading-relaxed">
                <p>
                  At A-level I worked as hard as anyone I knew. Re-reading, highlighting, beautiful notes. It got me into medicine, but only because I threw hundreds of extra hours at a method that wasted most of them.
                </p>
                <p>
                  Medical school forced me to learn properly: active recall, spaced repetition, working to the mark scheme. Same hours, pointed at the right work. That system is what I teach now, and I hold every session to the standard I needed at 17.
                </p>
              </div>
              <ul className="mt-7 space-y-2 font-mono text-sm text-brand-purple/70">
                <li>MBBS · NHS Foundation Doctor</li>
                <li>Former top-performing A-level student</li>
                <li>1,000+ students worked with over 6 years</li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 7 · Free tracker capture ─────────────────────────────────────── */}
      <ScrollFade>
        <section id="tracker" className="px-6 pb-24 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className={`${EYEBROW} mb-4`}>Free tool</p>
            <h2 className="font-serif tracking-tight text-3xl md:text-5xl text-brand-purple leading-tight">
              Your first week, planned <span className="italic text-brand-gold">tonight</span>
            </h2>
            <p className="mt-4 text-brand-text/70 max-w-xl mx-auto">
              The Revision Tracker builds you a personalised weekly timetable on the same method we teach: deep work, recall the next day, review before you forget.
            </p>
            <div className={`${CARD} relative mt-12 p-6 md:p-8 text-left`}>
              <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-purple shadow border border-brand-purple/10">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold mr-1.5" aria-hidden="true" />
                Active recall, day 1
              </span>
              <span className="absolute -top-3 right-8 hidden sm:inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-purple shadow border border-brand-purple/10">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold mr-1.5 mt-1" aria-hidden="true" />
                Light review, day 3
              </span>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  ['Monday', [['Deep Work', 'Biology · Respiration', 'bg-brand-purple text-brand-cream'], ['Deep Work', 'Maths · Integration', 'bg-brand-purple/85 text-brand-cream']]],
                  ['Tuesday', [['Active Recall', 'Blurt respiration, closed notes', 'bg-brand-gold/25 text-brand-purple'], ['Past paper', 'Integration, timed', 'bg-brand-gold/25 text-brand-purple']]],
                  ['Thursday', [['Light Review', 'Respiration flashcards', 'bg-brand-cream-dark text-brand-purple'], ['Light Review', 'Error log check', 'bg-brand-cream-dark text-brand-purple']]],
                ].map(([day, blocks]) => (
                  <div key={day as string}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-brand-purple/50 mb-2">{day as string}</p>
                    <div className="space-y-2">
                      {(blocks as string[][]).map(([kind, what, cls]) => (
                        <div key={what} className={`rounded-lg px-3 py-2.5 ${cls}`}>
                          <p className="text-[11px] font-bold uppercase tracking-wide opacity-80">{kind}</p>
                          <p className="text-xs sm:text-sm font-semibold leading-snug">{what}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="/revision-tracker"
              className="mt-10 inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
            >
              Build My Free Timetable
            </a>
            <p className="mt-3 text-sm text-brand-text/55">Free. Takes about three minutes.</p>
          </div>
        </section>
      </ScrollFade>

      {/* ── 8 · Testimonial wall ─────────────────────────────────────────── */}
      <ScrollFade>
        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto">
            <p className={`${EYEBROW} mb-4 text-center`}>From real feedback forms</p>
            <h2 className="text-center font-serif tracking-tight text-3xl md:text-5xl text-brand-purple leading-tight">
              What students <span className="italic text-brand-gold">actually</span> say
            </h2>
            <div className="mt-14 columns-1 md:columns-3 gap-6 [&>figure]:break-inside-avoid">
              {WALL_QUOTES.map((t) => (
                <figure key={t.name} className={`${CARD} p-7 mb-6`}>
                  <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand-gold/70 block">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 text-brand-text/85 leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-bold text-brand-purple">{t.name}</span>
                    <span className="text-brand-text/60"> · {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 9 · Final CTA: the one dark chapter ─────────────────────────── */}
      <section className="bg-brand-purple text-brand-cream py-24 md:py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollFade>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-8">Start here</p>
            <h2 className="font-serif tracking-tight text-4xl md:text-6xl leading-[1.08]">
              Stop revising <span className="italic text-brand-gold">harder.</span>
              <br />
              Start revising right.
            </h2>
            <p className="mt-8 text-lg text-brand-cream/80 leading-relaxed max-w-xl mx-auto">
              Fifteen minutes with Dr Waleed. An honest diagnosis of where the marks are leaking, and a clear recommendation, even if it is not us.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={BOOK_A_CALL_LINK}
                className="inline-flex justify-center items-center rounded-full bg-brand-gold text-brand-purple px-9 py-4 text-lg font-bold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Book a Free Call
              </a>
              <a
                href="#programmes"
                className="inline-flex justify-center items-center rounded-full border border-brand-cream/30 text-brand-cream px-9 py-4 text-lg font-semibold hover:border-brand-gold hover:text-brand-gold transition-all"
              >
                See the Programmes
              </a>
            </div>
            <p className="mt-5 text-sm text-brand-cream/60">
              Free call, no obligation. Not ready to talk?{' '}
              <a href="/revision-tracker" className="underline underline-offset-4 hover:text-brand-gold transition">
                Start with the free tracker
              </a>
              .
            </p>
          </ScrollFade>
        </div>
      </section>

      <Footer />
    </main>
  )
}
