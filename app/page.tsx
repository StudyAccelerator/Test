import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'
import TestimonialWall from '@/components/home/testimonial-wall'

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

/* Card artwork: brand-styled DOM graphics, no photography */
const GradeClimbArt = () => (
  <div className="flex items-end justify-center gap-3.5 h-full pb-3" aria-hidden="true">
    {[
      ['B', 'h-14 w-14 bg-white text-brand-purple/60 ring-1 ring-brand-purple/10 text-xl'],
      ['A', 'h-20 w-20 bg-brand-gold/25 text-brand-purple ring-1 ring-brand-gold/40 text-2xl'],
      ['A*', 'h-24 w-24 bg-brand-purple text-brand-gold text-3xl shadow-lg shadow-brand-purple/30'],
    ].map(([g, cls]) => (
      <span key={g as string} className={`flex items-center justify-center rounded-2xl font-serif font-bold ${cls}`}>
        {g}
      </span>
    ))}
  </div>
)

const MarkSchemeArt = () => (
  <div className="relative flex items-center justify-center h-full" aria-hidden="true">
    <span className="absolute left-4 top-14 -rotate-6 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 shadow-sm">Biology</span>
    <span className="absolute right-4 top-16 rotate-6 rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold text-violet-700 shadow-sm">Chemistry</span>
    <span className="absolute left-6 bottom-5 rotate-3 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700 shadow-sm">Maths</span>
    <span className="absolute right-6 bottom-6 -rotate-3 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 shadow-sm">Physics</span>
    <div className="w-44 rotate-[-2deg] rounded-xl bg-white p-4 shadow-lg shadow-brand-purple/10 ring-1 ring-brand-purple/10">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand-purple/50 mb-2.5">Mark scheme</p>
      {[true, true, false].map((ticked, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${ticked ? 'bg-brand-gold text-brand-purple' : 'ring-1 ring-brand-purple/20 text-transparent'}`}>
            ✓
          </span>
          <span className={`h-1.5 rounded-full ${ticked ? 'bg-brand-purple/25' : 'bg-brand-purple/10'} ${i === 0 ? 'w-24' : i === 1 ? 'w-20' : 'w-24'}`} />
        </div>
      ))}
      <p className="mt-2.5 inline-block rounded-full bg-brand-gold/20 px-2 py-0.5 text-[9px] font-bold text-brand-purple">+2 marks found</p>
    </div>
  </div>
)

const TopOnePercentArt = () => (
  <div className="relative flex items-end justify-center gap-2.5 h-full pb-2" aria-hidden="true">
    {[10, 16, 22].map((h) => (
      <span key={h} className="w-9 rounded-t-lg bg-brand-purple/15" style={{ height: `${h * 4}px` }} />
    ))}
    <div className="relative">
      <span className="block w-9 rounded-t-lg bg-brand-purple shadow-lg shadow-brand-purple/30" style={{ height: '116px' }} />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-bold text-brand-purple whitespace-nowrap shadow">
        top 1%
      </span>
    </div>
    <svg
      viewBox="0 0 200 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute bottom-2 left-1/2 h-[140px] w-[200px] -translate-x-1/2 text-brand-gold"
    >
      <path d="M16 128 C 60 122, 105 96, 162 44" />
      <path d="M164 42 l-17 3 M164 42 l-6 17" />
    </svg>
  </div>
)

const PROGRAMMES = [
  {
    featured: true,
    audience: 'For Year 12 going into Year 13',
    name: 'Summer Accelerator',
    badge: 'Enrolling now · starts 8th August',
    hook: 'Master the topics that decide your predicted grades.',
    art: <GradeClimbArt />,
    artBg: 'bg-gradient-to-br from-brand-gold/15 via-brand-cream to-brand-cream-dark',
    outcome:
      'Six weeks, live. Cover the high-yield Year 13 topics over summer, and walk into September already ahead.',
    points: ['Biology, Chemistry, Maths and Physics', 'Two live sessions a week per subject', 'Every session recorded'],
    href: '/summer-accelerators/',
    cta: 'Explore the Summer Accelerator',
  },
  {
    featured: false,
    audience: 'For students who know their weak subject',
    name: 'Subject Accelerators',
    badge: 'Runs through the school year',
    hook: 'Struggling with your exam technique?',
    art: <MarkSchemeArt />,
    artBg: 'bg-gradient-to-br from-brand-purple/[0.07] via-brand-cream to-brand-cream-dark',
    outcome:
      'Twelve-week live exam programmes in Biology, Chemistry and Maths. Small groups, specialist tutors, taught to the mark scheme.',
    points: ['Pick one subject or bundle three', 'Weekend sessions, no clashes', 'Exam technique in every session'],
    href: '/subject-accelerators/',
    cta: 'Explore Subject Accelerators',
  },
  {
    featured: false,
    audience: 'For students whose problem is how they study',
    name: 'Top 1% Study System',
    badge: 'The method itself',
    hook: 'Study like the top 1%.',
    art: <TopOnePercentArt />,
    artBg: 'bg-gradient-to-br from-brand-gold/10 via-brand-cream to-brand-purple/[0.06]',
    outcome:
      'High-yield revision, time management and exam performance. The system behind everything we teach, so you stay ahead without burning out.',
    points: ['Active recall and spaced repetition', 'Workload and burnout control', 'Exam performance under pressure'],
    href: '/study-systems/',
    cta: 'Explore the Study System',
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
          className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[36rem] rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-12 md:pt-24 md:pb-16 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div>
            <h1 className="font-serif font-bold tracking-tight leading-[1.04] text-4xl sm:text-5xl lg:text-[4rem] text-brand-purple">
              <HeroHeadline>
                <HeroWord>Top</HeroWord> <HeroWord>grades</HeroWord> <HeroWord>are</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">a system,</HeroWord>{' '}
                <HeroWord>not</HeroWord> <HeroWord>a</HeroWord> <HeroWord>talent.</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.45}>
              <p className="mt-6 text-lg md:text-xl text-brand-text/75 leading-relaxed max-w-xl">
                Live A-level courses and study systems for Biology, Chemistry, Maths and Physics. Built by Dr Waleed Ahmad MBBS and designed to help you achieve your desired grades with confidence.
              </p>
            </HeroFade>
            <HeroFade delay={0.55}>
              <div className="mt-9 flex justify-center max-w-xl">
                <a
                  href="#programmes"
                  className="inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
                >
                  Explore Our Programmes
                </a>
              </div>
              <p className="mt-4 text-sm text-brand-text/55 text-center max-w-xl">
                Try your first session risk-free.
              </p>
            </HeroFade>
          </div>

          <div className="relative max-w-lg mx-auto lg:max-w-none w-full min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-[1.55fr_1fr] gap-4 sm:gap-5 items-start">
              {/* Left: the route to results day + the offer it unlocks */}
              <div className="min-w-0">
                <HeroFade delay={0.3}>
                  <div className={`${CARD} p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-2 hover:-rotate-1`}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/55">
                      Your route to results day
                    </p>
                    <div className="mt-10 flex items-end gap-2.5 sm:gap-3" aria-hidden="true">
                      {[
                        ['C/D', 'h-12 sm:h-14 bg-brand-purple/5 text-brand-text/40 text-base sm:text-lg', 'where you start'],
                        ['B', 'h-[4.75rem] sm:h-20 bg-white ring-1 ring-brand-purple/10 text-brand-purple/60 text-lg sm:text-xl', 'content rebuilt'],
                        ['A', 'h-24 sm:h-28 bg-brand-gold/25 ring-1 ring-brand-gold/45 text-brand-purple text-xl sm:text-2xl', 'technique trained'],
                      ].map(([g, cls, lbl]) => (
                        <div key={g} className="flex-1 flex flex-col items-center gap-2">
                          <span className={`w-full flex items-center justify-center rounded-xl font-serif font-bold ${cls}`}>{g}</span>
                          <span className="text-[10px] sm:text-[11px] font-semibold text-brand-text/55 text-center leading-tight">{lbl}</span>
                        </div>
                      ))}
                      <div className="relative flex-1 flex flex-col items-center gap-2">
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-bold text-brand-purple whitespace-nowrap shadow">
                          Results day
                        </span>
                        <span className="w-full h-32 sm:h-36 flex items-center justify-center rounded-xl bg-brand-purple text-brand-gold font-serif font-bold text-2xl sm:text-3xl shadow-lg shadow-brand-purple/30">
                          A*
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-brand-text/55 text-center leading-tight">
                          <span className="text-brand-gold font-bold">your new</span>
                          <br />
                          grades
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-2">
                      {[['01', 'Diagnose'], ['02', 'Rebuild'], ['03', 'Coach']].map(([n, t]) => (
                        <span key={t} className="flex-1 text-center rounded-full border border-brand-gold/35 bg-brand-gold/10 px-1 py-2 text-[11px] font-bold text-brand-purple">
                          <span className="font-mono text-brand-gold mr-1">{n}</span>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </HeroFade>
                <HeroFade delay={0.5}>
                  <div className={`${CARD} sm:rotate-1 border-t-4 border-brand-gold p-5 sm:p-6 mt-4 sm:ml-6 sm:-mr-1 transition-transform duration-300 hover:sm:rotate-2 hover:-translate-y-1.5`}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/55">University offers</p>
                    <p className="mt-1.5 font-serif italic text-2xl sm:text-3xl text-brand-purple">Congratulations!</p>
                    <p className="mt-1.5 text-sm text-brand-text/65 leading-snug">Your firm choice has confirmed your place.</p>
                    <span className="mt-3.5 inline-block rounded-full bg-brand-gold/20 px-3.5 py-1 text-xs font-extrabold text-brand-purple">
                      Offer confirmed ✓
                    </span>
                  </div>
                </HeroFade>
              </div>
              {/* Right: the founder photo + name card */}
              <div className="min-w-0 w-full max-w-[260px] mx-auto sm:max-w-none sm:mx-0">
                <HeroFade delay={0.4}>
                  <div className="relative sm:rotate-2 rounded-2xl bg-white p-1.5 shadow-[0_0_0_1px_rgba(46,37,87,.08),0_16px_32px_rgba(46,37,87,.18)] transition-transform duration-300 hover:sm:rotate-3 hover:-translate-y-2 hover:scale-[1.02]">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full bg-brand-purple text-brand-cream text-[11px] font-bold px-3.5 py-1 shadow-lg">
                      where it leads
                    </span>
                    <Image
                      src="/photos/waleed-grad-portrait.jpg"
                      alt="Dr Waleed Ahmad, founder of A-Level Accelerators, at his medical school graduation"
                      width={640}
                      height={878}
                      priority
                      unoptimized
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                </HeroFade>
                <HeroFade delay={0.55}>
                  <div className={`mt-3 ${CARD} px-4 py-3 flex items-center gap-3 transition-transform duration-300 hover:-translate-y-1.5 hover:sm:rotate-1`}>
                    <div className="h-9 w-9 shrink-0 rounded-full bg-brand-purple text-brand-gold flex items-center justify-center font-serif font-bold text-base">
                      W
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
                      <p className="text-[11px] text-brand-text/65 mt-0.5">Founder of A-Level Accelerators</p>
                    </div>
                  </div>
                </HeroFade>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · Programme router ─────────────────────────────────────────── */}
      <section id="programmes" className="pt-12 pb-24 md:pt-16 md:pb-32 px-6">
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
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {PROGRAMMES.map((p, i) => (
              <ScrollFade key={p.name} delay={i * 0.12}>
                <a
                  href={p.href}
                  className={`group/card isolate relative flex flex-col h-full overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-2 ${
                    p.featured
                      ? '[box-shadow:0_0_0_2px_rgba(201,169,110,.55),0_2px_4px_rgba(46,37,87,.06),0_16px_32px_rgba(46,37,87,.12)] hover:[box-shadow:0_0_0_2px_rgba(201,169,110,.8),0_8px_16px_rgba(46,37,87,.1),0_24px_48px_rgba(46,37,87,.16)]'
                      : '[box-shadow:0_0_0_1px_rgba(46,37,87,.06),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)] hover:[box-shadow:0_0_0_1px_rgba(46,37,87,.08),0_8px_16px_rgba(46,37,87,.08),0_24px_48px_rgba(46,37,87,.12)]'
                  }`}
                >
                  <div className={`relative h-44 overflow-hidden rounded-t-3xl ${p.artBg}`}>
                    {p.art}
                    <span
                      className={`absolute top-4 left-4 rounded-full text-xs font-bold px-3 py-1.5 ${
                        p.featured ? 'bg-brand-gold text-brand-purple' : 'bg-white text-brand-purple ring-1 ring-brand-purple/10'
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] leading-snug text-brand-purple/55 md:min-h-[31px]">{p.audience}</p>
                    <h3 className="mt-2 font-serif text-2xl md:text-[1.7rem] font-bold text-brand-purple">
                      {p.name}
                    </h3>
                    <p className="mt-2 font-serif italic text-lg text-brand-gold leading-snug">{p.hook}</p>
                    <p className="mt-3 leading-relaxed text-brand-text/75">{p.outcome}</p>
                    <ul className="mt-5 space-y-2 text-sm text-brand-text/70">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-7 inline-flex items-center gap-1.5 font-semibold text-brand-purple group-hover/card:text-brand-gold transition-colors">
                      {p.cta}
                      <span aria-hidden="true" className="transition-transform group-hover/card:translate-x-1.5">→</span>
                    </span>
                  </div>
                </a>
              </ScrollFade>
            ))}
          </div>
          <ScrollFade delay={0.2}>
            <p className="mt-8 text-center text-brand-text/60">
              Not ready for a programme?{' '}
              <a href={BOOK_A_CALL_LINK} className="font-semibold text-brand-purple underline underline-offset-4 hover:text-brand-gold transition">
                Book a free call
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
            <p className="font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl text-brand-purple leading-[1.25]">
              We <span className="italic text-brand-gold">diagnose</span> how you actually study, <span className="italic text-brand-gold">rebuild</span> your revision around what moves marks, and <span className="italic text-brand-gold">coach</span> you all the way to exam day.
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
                <a
                  href="/revision-diagnostic/"
                  className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 hover:text-brand-gold transition"
                >
                  Run the free Revision Diagnostic
                  <span aria-hidden="true">→</span>
                </a>
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
                  Sessions are live and interactive, never pre-recorded. Expert tutors, every one an A* graduate in the subject they teach, work through real exam questions with you and coach your answers into the language the mark scheme rewards.
                </p>
                <div className="mt-7 flex justify-center max-w-lg">
                  <a
                    href={BOOK_A_CALL_LINK}
                    className="inline-flex items-center rounded-full bg-brand-purple text-brand-cream px-7 py-3.5 font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
                  >
                    Book a Free Call
                  </a>
                </div>
                <p className="mt-3 text-sm text-brand-text/55 text-center max-w-lg">Half an hour, no obligation. An honest look at where you are.</p>
              </div>
              <div>
                <div className={`${CARD} p-6 md:p-8`}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-purple/50 mb-4">Inside a live session · 2 hours</p>
                  <ul className="space-y-3">
                    {[
                      ['Recap and recall check', '10 min', 'bg-brand-cream-dark text-brand-purple'],
                      ['High-yield content review', '30 min', 'bg-brand-gold/25 text-brand-purple'],
                      ['Real exam questions with mark scheme mastery', '60 min', 'bg-brand-purple text-brand-cream'],
                      ['Personalised feedback + Q&A', '20 min', 'bg-brand-cream-dark text-brand-purple'],
                    ].map(([what, len, cls]) => (
                      <li key={what as string} className="flex items-center gap-3">
                        <span className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${cls}`}>{what}</span>
                        <span className="font-mono text-xs text-brand-purple/50 shrink-0">{len}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <figure className={`${CARD} p-6 mt-5`}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-brand-gold font-serif font-bold">
                      F
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-brand-purple">Furkan</p>
                      <p className="text-xs text-brand-text/60">Year 13 Student</p>
                    </div>
                    <span aria-hidden="true" className="ml-auto text-brand-gold text-sm tracking-tight">★★★★★</span>
                  </div>
                  <blockquote className="mt-4 text-brand-text/85 leading-relaxed">
                    &ldquo;I liked how the session was so exam-technique focused, with a great balance of exam questions and the content behind them.&rdquo;
                  </blockquote>
                </figure>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ── 5b · The diagnosis principle (pull quote) ────────────────────── */}
      <ScrollFade>
        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div aria-hidden="true" className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            <span aria-hidden="true" className="font-serif text-7xl leading-none text-brand-gold/60 block">&ldquo;</span>
            <p className="mt-2 font-serif italic tracking-tight text-2xl sm:text-3xl md:text-4xl text-brand-purple leading-snug">
              A doctor diagnoses to treat accurately, and we apply that same practice. My team diagnoses where you&apos;re leaking marks, then we help you fix it!
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-brand-purple/60">
              Dr Waleed Ahmad · Founder
            </p>
            <div aria-hidden="true" className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </div>
        </section>
      </ScrollFade>

      {/* ── 6 · Meet Dr Waleed ───────────────────────────────────────────── */}
      <ScrollFade>
        <section id="founder" className="px-6 pb-24 md:pb-32 scroll-mt-28">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-12 items-center">
            <div className="max-w-md mx-auto md:mx-0 w-full">
              <div className="relative">
                <div className={`overflow-hidden ${CARD} !rounded-3xl`}>
                  <Image
                    src="/photos/waleed-portrait-wide.jpg"
                    alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators, at his desk in scrubs"
                    width={1200}
                    height={913}
                    unoptimized
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -top-5 -right-3 w-36 rotate-3 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-brand-purple/10">
                  <Image
                    src="/photos/stressed-student.jpg"
                    alt="Waleed as a stressed student during his A-levels"
                    width={640}
                    height={437}
                    unoptimized
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-center text-[9px] font-medium text-brand-text/60 pt-1 pb-0.5">before the system</p>
                </div>
              </div>
              <ul className="mt-6 space-y-2 font-mono text-sm text-brand-purple/70 text-center md:text-left">
                <li>MBBS · NHS Foundation Doctor</li>
                <li>Former top-performing A-level student</li>
                <li>1,000+ students worked with over 6 years</li>
              </ul>
            </div>
            <div>
              <p className={EYEBROW}>Who built this</p>
              <h2 className="mt-4 font-serif tracking-tight text-3xl md:text-5xl text-brand-purple leading-tight">
                I did everything school said. It nearly <span className="italic text-brand-gold">wasn&apos;t enough.</span>
              </h2>
              <div className="mt-6 space-y-4 text-brand-text/80 leading-relaxed">
                <p>
                  During my A-levels I worked as hard as anyone I knew. Re-reading, highlighting, beautiful notes. It got me into medicine, but only because I threw hundreds of extra hours at a method that wasted most of them.
                </p>
                <p>
                  Medical school forced me to learn properly: active recall, spaced repetition, working to the mark scheme. Same hours, pointed at the right work. That system is what A-Level Accelerators runs on today, and I hold every session to the standard I needed at 17.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── 7 · Free tracker capture ─────────────────────────────────────── */}
      <ScrollFade>
        <section id="tracker" className="px-6 pb-24 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
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
                Spaced review, before you forget
              </span>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  ['Monday', [['Deep Work', 'Biology · Respiration', 'bg-brand-purple text-brand-cream'], ['Deep Work', 'Maths · Integration', 'bg-brand-purple/85 text-brand-cream']]],
                  ['Tuesday', [['Active Recall', 'Blurt respiration, closed notes', 'bg-brand-gold/25 text-brand-purple'], ['Past paper', 'Integration, timed', 'bg-brand-gold/25 text-brand-purple']]],
                  ['Wednesday', [['Deep Work', 'Chemistry · Kinetics', 'bg-brand-purple text-brand-cream'], ['Light Review', 'Error log check', 'bg-brand-cream-dark text-brand-purple']]],
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
              href="/revision-tracker/"
              className="mt-10 inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
            >
              Build My Free Timetable
            </a>
            <p className="mt-3 text-sm text-brand-text/55">Free. Takes about three minutes.</p>
          </div>
        </section>
      </ScrollFade>

      {/* ── 8 · Testimonial wall (shared site-wide) ──────────────────────── */}
      <TestimonialWall className="pb-24 md:pb-32" />

      {/* ── 9 · Final CTA: the one dark chapter ─────────────────────────── */}
      <section className="bg-brand-purple text-brand-cream py-16 md:py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollFade>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-5">Start here</p>
            <h2 className="font-serif tracking-tight text-4xl md:text-6xl leading-[1.08]">
              Stop revising <span className="italic text-brand-gold">harder.</span>
              <br />
              Start revising right.
            </h2>
            <p className="mt-6 text-lg text-brand-cream/80 leading-relaxed max-w-xl mx-auto">
              Half an hour with Dr Waleed. An honest diagnosis of where the marks are leaking, and a clear recommendation, even if it is not us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
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
              <a href="/revision-tracker/" className="underline underline-offset-4 hover:text-brand-gold transition">
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
