'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'
import Quiz from '@/components/diagnostic/quiz'
import Report from '@/components/diagnostic/report'
import {
  Answers,
  Diagnosis,
  LANDING_FAQS,
  QUESTIONS,
  diagnose,
  gradeLabel,
  scoresToString,
  yearLabel,
} from '@/lib/diagnostic'
import { subscribeDiagnostic } from '@/lib/mailerlite'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

const EASE = [0.22, 1, 0.36, 1] as const
const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'
const EYEBROW = 'font-mono text-xs uppercase tracking-[0.2em] text-brand-purple/60'

type Stage = 'intro' | 'quiz' | 'analysing' | 'gate' | 'report'

const STORAGE_KEY = 'ala-diagnostic-v1'

interface Stored {
  v: 1
  answers: Answers
  firstName: string
  unlockedAt: string | null
}

function loadStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.v !== 1) return null
    return parsed as Stored
  } catch {
    return null
  }
}

function saveStored(s: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    /* private mode: the session still works, it just will not persist */
  }
}

const allAnswered = (answers: Answers) => QUESTIONS.every((q) => answers[q.id] !== undefined)

export default function DiagnosticApp() {
  const [stage, setStage] = useState<Stage>('intro')
  const [answers, setAnswers] = useState<Answers>({})
  const [firstName, setFirstName] = useState('')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [resumeCount, setResumeCount] = useState(0)

  /* Restore a previous run: unlocked report, or progress mid-quiz. */
  useEffect(() => {
    const stored = loadStored()
    if (!stored) return
    setAnswers(stored.answers)
    setFirstName(stored.firstName)
    if (stored.unlockedAt && allAnswered(stored.answers)) {
      setDiagnosis(diagnose(stored.answers))
      setStage('report')
    } else {
      setResumeCount(Object.keys(stored.answers).length)
    }
  }, [])

  const handleAnswer = useCallback((id: string, value: string | string[]) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value }
      /* Changing subjects can invalidate the worry answer */
      if (id === 'subjects') {
        const worry = next.worry as string | undefined
        const list = value as string[]
        if (worry && worry !== 'unsure' && !list.includes(worry)) delete next.worry
      }
      const current = loadStored()
      saveStored({
        v: 1,
        answers: next,
        firstName: current?.firstName ?? '',
        unlockedAt: null,
      })
      return next
    })
  }, [])

  const startQuiz = () => {
    setStage('quiz')
    window.scrollTo({ top: 0 })
  }

  const handleQuizComplete = () => {
    setStage('analysing')
    window.scrollTo({ top: 0 })
  }

  const handleAnalysed = useCallback(() => setStage('gate'), [])

  const handleUnlock = (name: string) => {
    setFirstName(name)
    setDiagnosis(diagnose(answers))
    saveStored({ v: 1, answers, firstName: name, unlockedAt: new Date().toISOString() })
    setStage('report')
    window.scrollTo({ top: 0 })
  }

  const handleRetake = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setAnswers({})
    setDiagnosis(null)
    setResumeCount(0)
    setStage('quiz')
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      {(stage === 'intro' || stage === 'report') && <Header />}
      {stage === 'intro' && <Landing onStart={startQuiz} resumeCount={resumeCount} />}
      {stage === 'quiz' && (
        <Quiz answers={answers} onAnswer={handleAnswer} onComplete={handleQuizComplete} onExit={() => setStage('intro')} />
      )}
      {stage === 'analysing' && <Analysing onDone={handleAnalysed} />}
      {stage === 'gate' && <EmailGate answers={answers} onUnlock={handleUnlock} />}
      {stage === 'report' && diagnosis && (
        <Report diagnosis={diagnosis} answers={answers} firstName={firstName || 'you'} onRetake={handleRetake} />
      )}
      {(stage === 'intro' || stage === 'report') && <Footer />}
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Landing
   ═══════════════════════════════════════════════════════════════════════ */

function MiniRing({ value }: { value: number }) {
  const R = 26
  const C = 2 * Math.PI * R
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(251,248,243,.15)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif font-bold text-lg text-brand-cream">
        {value}
      </span>
    </div>
  )
}

function ReportPreviewCluster() {
  return (
    <div className="relative max-w-md mx-auto lg:max-w-none w-full min-w-0" aria-hidden="true">
      {/* Dark report cover */}
      <HeroFade delay={0.35}>
        <div className="relative rounded-2xl bg-[#241d47] p-6 shadow-[0_0_0_1px_rgba(201,169,110,.25),0_24px_48px_rgba(46,37,87,.35)] sm:-rotate-1 transition-transform duration-300 hover:rotate-0 hover:-translate-y-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold">Revision Diagnostic · Report</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-cream/50">Your revision profile</p>
              <p className="mt-1 font-serif font-bold italic text-3xl text-brand-gold">The Grinder</p>
              <p className="mt-1 font-serif italic text-sm text-brand-cream/75">Hours in. Marks missing.</p>
            </div>
            <MiniRing value={54} />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              ['Method', '31'],
              ['Retention', '44'],
              ['Exam Craft', '62'],
            ].map(([l, v]) => (
              <span key={l} className="rounded-full bg-white/[0.07] ring-1 ring-white/10 px-2.5 py-1 text-[10px] font-semibold text-brand-cream/75">
                {l} <span className="font-mono text-brand-gold">{v}</span>
              </span>
            ))}
          </div>
        </div>
      </HeroFade>

      {/* Hours leak */}
      <HeroFade delay={0.5}>
        <div className={`${CARD} p-5 mt-4 sm:ml-10 sm:rotate-1 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1.5`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-purple/50">Where the hours go</p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className={`h-6 flex-1 rounded ${i < 9 ? 'bg-brand-purple/[0.07] border border-dashed border-brand-purple/30' : 'bg-brand-gold/30 ring-1 ring-brand-gold/40'}`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-brand-text/75 leading-snug">
            <span className="font-bold text-brand-purple">About 9 of 12 hours</span> going into low-yield work
          </p>
        </div>
      </HeroFade>

      {/* Route card */}
      <HeroFade delay={0.62}>
        <div className={`${CARD} border-t-4 border-brand-gold p-5 mt-4 sm:-ml-4 sm:mr-8 sm:-rotate-1 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1.5`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-purple/50">Your fastest route</p>
          <p className="mt-1.5 font-serif font-bold text-lg text-brand-purple">Summer Accelerator</p>
          <p className="text-sm text-brand-text/65 leading-snug">Matched to your diagnosis, with the reasons why.</p>
          <span className="mt-3 inline-block rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-extrabold text-brand-purple">
            Personalised 7 day plan included
          </span>
        </div>
      </HeroFade>
    </div>
  )
}

function Landing({ onStart, resumeCount }: { onStart: () => void; resumeCount: number }) {
  const archetypeNames = [
    'The Grinder',
    'The Perfectionist',
    'The Crammer',
    'The Re-Learner',
    'The Scholar',
    'The Comfort Reviser',
    'The Optimiser',
  ]

  return (
    <main className="bg-brand-cream">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[36rem] rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
          <div>
            <HeroFade delay={0.05}>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-bold text-brand-purple">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                The A-Level Revision Diagnostic
              </p>
            </HeroFade>
            <h1 className="mt-6 font-serif font-bold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-[3.6rem] text-brand-purple">
              <HeroHeadline>
                <HeroWord>Frustrated</HeroWord> <HeroWord>by</HeroWord> <HeroWord>marks</HeroWord>{' '}
                <HeroWord>that</HeroWord> <HeroWord>don&apos;t</HeroWord> <HeroWord>match</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">the hours?</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.45}>
              <p className="mt-6 text-lg md:text-xl text-brand-text/80 leading-relaxed max-w-xl">
                Even though you&apos;re putting the work in, or watching your teenager put it in night after
                night? Effort was never the problem. Where it goes is.
              </p>
              <p className="mt-4 text-base md:text-lg text-brand-text/65 leading-relaxed max-w-xl">
                20 honest questions. About 4 minutes. The diagnostic finds exactly where the marks are leaking,
                then hands you your revision profile and a plan for what to fix first.
              </p>
            </HeroFade>
            <HeroFade delay={0.55}>
              <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
                >
                  {resumeCount > 0 ? `Resume my diagnostic (${resumeCount} of ${QUESTIONS.length} done)` : 'Start my diagnostic'}
                  <span aria-hidden="true" className="ml-2">→</span>
                </button>
              </div>
              <p className="mt-4 text-sm text-brand-text/55">
                No right answers. Just honest ones. Parents: you can take it for your child. Answer as they
                actually revise, not as you hope they do.
              </p>
            </HeroFade>
          </div>
          <ReportPreviewCluster />
        </div>
      </section>

      {/* ── Credibility strip ── */}
      <ScrollFade>
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className={`${CARD} px-6 py-5 md:px-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6`}>
              <div className="flex items-center gap-3 shrink-0">
                <Image
                  src="/photos/waleed-grad-portrait.jpg"
                  alt="Dr Waleed Ahmad"
                  width={96}
                  height={96}
                  unoptimized
                  className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-brand-gold/50"
                />
                <div className="leading-tight">
                  <p className="text-sm font-bold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
                  <p className="text-xs text-brand-text/60">NHS doctor · founder, A-Level Accelerators</p>
                </div>
              </div>
              <div aria-hidden="true" className="hidden sm:block h-10 w-px bg-brand-purple/10" />
              <p className="text-sm md:text-[15px] text-brand-text/70 leading-relaxed text-center sm:text-left">
                &ldquo;I can&apos;t treat a patient until I know what&apos;s wrong. Revision is the same: diagnose
                first, then fix the right thing. This is the exact audit I run with my own students.&rdquo;
              </p>
            </div>

            {/* The gap, in numbers */}
            <div className={`${CARD} mt-6 grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-brand-purple/[0.08]`}>
              {(
                [
                  ['9.4%', 'of UK A-level entries were an A* last summer. The offers worth chasing usually want at least one.', false],
                  ['1,000+', 'A-level students Dr Waleed has helped towards top grades and first-choice offers.', true],
                ] as const
              ).map(([stat, caption, ours]) => (
                <div key={stat} className="px-6 py-6 md:px-8 text-center sm:text-left">
                  <p
                    className={`font-serif font-bold text-4xl md:text-[2.6rem] leading-none ${
                      ours ? 'text-brand-gold' : 'text-brand-purple'
                    }`}
                  >
                    {stat}
                  </p>
                  <p className="mt-2.5 text-sm text-brand-text/65 leading-relaxed">{caption}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[15px] md:text-base text-brand-text/75 leading-relaxed max-w-2xl mx-auto">
              Don&apos;t be in the 90.6% who miss the A*. That gap, between the grade you have and the grade
              your offer needs, closes with a system, not more hours. The diagnostic measures yours in 4
              minutes and gives you the plan to close it.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* ── What you get ── */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className={`${EYEBROW} mb-4`}>Your report</p>
            <h2 className="font-serif font-bold tracking-tight text-3xl md:text-[2.6rem] text-brand-purple max-w-2xl leading-tight">
              Specific enough to <span className="italic text-brand-gold">act on tonight</span>
            </h2>
          </ScrollFade>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                n: '01',
                title: 'Your revision profile',
                body: 'One of seven evidence-based profiles, from The Grinder to The Optimiser. Which one you are, why it happens, and what it costs you.',
                art: (
                  <div className="flex items-center justify-center h-full" aria-hidden="true">
                    <div className="rounded-xl bg-[#241d47] px-5 py-4 shadow-lg -rotate-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brand-gold">Your profile</p>
                      <p className="mt-1 font-serif font-bold italic text-2xl text-brand-gold">The Grinder</p>
                      <p className="font-serif italic text-xs text-brand-cream/70">Hours in. Marks missing.</p>
                    </div>
                  </div>
                ),
              },
              {
                n: '02',
                title: 'Five system scores',
                body: 'Method, Retention, Exam Craft, Targeting and Consistency, each scored out of 100, with the one leak to fix first flagged in gold.',
                art: (
                  <div className="flex flex-col justify-center gap-2 h-full px-6" aria-hidden="true">
                    {[
                      ['Method', 31, 'bg-red-400'],
                      ['Retention', 44, 'bg-amber-400'],
                      ['Exam Craft', 62, 'bg-brand-gold'],
                      ['Consistency', 78, 'bg-emerald-500'],
                    ].map(([l, v, cls]) => (
                      <div key={l as string} className="flex items-center gap-2">
                        <span className="w-20 font-mono text-[9px] uppercase tracking-wider text-brand-purple/55 text-right">{l}</span>
                        <span className="flex-1 h-2 rounded-full bg-brand-purple/[0.08] overflow-hidden">
                          <span className={`block h-full rounded-full ${cls}`} style={{ width: `${v}%` }} />
                        </span>
                        <span className="font-mono text-[10px] font-bold text-brand-purple">{v}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                n: '03',
                title: 'Your route, with reasons',
                body: 'A 7 day plan for the leak itself, and the programme that fits your diagnosis, whether that is the summer course, a subject programme, or the system.',
                art: (
                  <div className="flex items-center justify-center h-full" aria-hidden="true">
                    <div className="rounded-xl bg-white px-5 py-4 shadow-lg ring-1 ring-brand-purple/10 rotate-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brand-purple/50">Day 2</p>
                      <p className="mt-0.5 font-bold text-sm text-brand-purple">First blurting session</p>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-brand-purple/50">Day 5</p>
                      <p className="mt-0.5 font-bold text-sm text-brand-purple">One timed exam section</p>
                      <span className="mt-2.5 inline-block rounded-full bg-brand-gold/20 px-2.5 py-0.5 text-[10px] font-extrabold text-brand-purple">
                        matched to your answers
                      </span>
                    </div>
                  </div>
                ),
              },
            ].map((card, i) => (
              <ScrollFade key={card.n} delay={i * 0.1}>
                <div className={`${CARD} h-full overflow-hidden`}>
                  <div className="h-44 bg-gradient-to-br from-brand-gold/10 via-brand-cream to-brand-cream-dark">{card.art}</div>
                  <div className="p-6">
                    <p className={EYEBROW}>{card.n}</p>
                    <h3 className="mt-2 font-serif font-bold text-xl text-brand-purple">{card.title}</h3>
                    <p className="mt-2 text-[15px] text-brand-text/70 leading-relaxed">{card.body}</p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── The seven profiles teaser ── */}
      <ScrollFade>
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <p className={`${EYEBROW} mb-4`}>Seven profiles</p>
            <h2 className="font-serif font-bold tracking-tight text-3xl md:text-4xl text-brand-purple leading-tight">
              Every sixth form has all seven. <span className="italic text-brand-gold">Which one is you?</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {archetypeNames.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-brand-purple/15 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-6 text-brand-text/60 max-w-xl mx-auto">
              I was three of these at different points of Year 13. Each one leaks marks in a different place, and
              each one has a different fix.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* ── How it works ── */}
      <ScrollFade>
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                ['01', 'Answer honestly', '20 questions about how you actually revise. About 4 minutes. No trick questions.'],
                ['02', 'We score the system', 'Your answers score five systems and locate your single biggest leak.'],
                ['03', 'Get the report', 'Profile, scores, wasted-hours estimate, 7 day plan, and your recommended route.'],
              ].map(([n, t, b]) => (
                <div key={n} className="relative pl-5 border-l-2 border-brand-gold/40">
                  <p className="font-mono text-xs text-brand-gold font-bold">{n}</p>
                  <h3 className="mt-1.5 font-serif font-bold text-xl text-brand-purple">{t}</h3>
                  <p className="mt-2 text-[15px] text-brand-text/70 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ── FAQ ── */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <ScrollFade>
            <p className={`${EYEBROW} mb-4`}>Before you start</p>
            <h2 className="font-serif font-bold tracking-tight text-3xl md:text-4xl text-brand-purple leading-tight">
              Quick questions, quick answers
            </h2>
          </ScrollFade>
          <div className="mt-8 space-y-4">
            {LANDING_FAQS.map((faq, i) => (
              <ScrollFade key={faq.q} delay={i * 0.06}>
                <div className={`${CARD} p-6`}>
                  <h3 className="font-serif font-bold text-lg text-brand-purple">{faq.q}</h3>
                  <p className="mt-2 text-[15px] text-brand-text/75 leading-relaxed">{faq.a}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-brand-purple text-brand-cream py-16 md:py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollFade>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-5">Diagnose before you treat</p>
            <h2 className="font-serif font-bold tracking-tight text-4xl md:text-5xl leading-[1.08]">
              You can&apos;t fix a leak <span className="italic text-brand-gold">you can&apos;t see.</span>
            </h2>
            <p className="mt-6 text-lg text-brand-cream/80 leading-relaxed max-w-xl mx-auto">
              Four minutes of honesty now saves a whole summer of revision that feels productive and moves
              nothing.
            </p>
            <button
              type="button"
              onClick={onStart}
              className="mt-8 inline-flex justify-center items-center rounded-full bg-brand-gold text-brand-purple px-9 py-4 text-lg font-bold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Start the free diagnostic
            </button>
            <p className="mt-5 text-sm text-brand-cream/60">
              Prefer to plan first?{' '}
              <a href="/revision-tracker" className="underline underline-offset-4 hover:text-brand-gold transition">
                Build a free timetable instead
              </a>
              .
            </p>
          </ScrollFade>
        </div>
      </section>
    </main>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Analysing
   ═══════════════════════════════════════════════════════════════════════ */

const ANALYSIS_STEPS = [
  'Reading your 20 answers',
  'Scoring your five systems',
  'Locating the primary leak',
  'Writing your prescription',
]

function Analysing({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    ANALYSIS_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 620 * (i + 1)))
    })
    timers.push(setTimeout(onDone, 620 * ANALYSIS_STEPS.length + 500))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-[#241d47] px-6">
      <div className="w-full max-w-sm text-center">
        <motion.div
          aria-hidden="true"
          className="mx-auto h-20 w-20 rounded-full border-2 border-dashed border-brand-gold/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <div className="h-full w-full rounded-full flex items-center justify-center">
            <span className="font-serif font-bold text-2xl text-brand-gold">A*</span>
          </div>
        </motion.div>
        <h2 className="mt-8 font-serif font-bold text-2xl text-brand-cream">Running your diagnostic</h2>
        <ul className="mt-7 space-y-3 text-left">
          {ANALYSIS_STEPS.map((label, i) => {
            const done = step > i
            const active = step === i
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                    done ? 'bg-brand-gold text-brand-purple' : active ? 'border border-brand-gold/70 text-transparent' : 'border border-white/15 text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className={`text-[15px] transition-colors duration-300 ${done ? 'text-brand-cream' : active ? 'text-brand-cream/85' : 'text-brand-cream/35'}`}>
                  {label}
                  {active && <AnimatedDots />}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function AnimatedDots() {
  return (
    <span aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
        >
          .
        </motion.span>
      ))}
    </span>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Email gate
   ═══════════════════════════════════════════════════════════════════════ */

function EmailGate({ answers, onUnlock }: { answers: Answers; onUnlock: (name: string) => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [taker, setTaker] = useState<'student' | 'parent' | null>(null)
  const failCount = useRef(0)
  const phoneWarned = useRef(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const data = new FormData(e.currentTarget)
    const name = (data.get('firstName') as string).trim()
    const email = (data.get('email') as string).trim()
    const phoneRaw = ((data.get('phone') as string) ?? '').trim()

    if (!name) {
      setError('Pop your first name in so the report knows who it belongs to.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('That email does not look right. Check for typos.')
      return
    }
    /* Phone stays optional and never blocks the report: one gentle nudge on a
       number that looks mistyped, then the report opens regardless. */
    const phoneClean = phoneRaw.replace(/[\s().-]/g, '')
    const phoneValid = phoneClean === '' || /^\+?\d{7,15}$/.test(phoneClean)
    if (!phoneValid && !phoneWarned.current) {
      phoneWarned.current = true
      setError('That phone number looks incomplete. Fix it or clear the box. Your report opens either way.')
      return
    }

    setSubmitting(true)
    const d = diagnose(answers)

    const result = await subscribeDiagnostic({
      email,
      name,
      phone: phoneValid ? phoneClean : '',
      taker: taker ?? '',
      yearGroup: yearLabel(answers.year as string),
      subjects: ((answers.subjects as string[]) ?? []).join(', '),
      /* Empty when unsure so MailerLite merge defaults can fire ({$diag_worry_subject|default('...')}) */
      worrySubject: answers.worry === 'unsure' ? '' : ((answers.worry as string) ?? ''),
      currentGrade: gradeLabel(answers.currentGrade as string),
      targetGrade: gradeLabel(answers.targetGrade as string),
      hoursPerWeek: d.hoursLeak.weeklyPhrase,
      lowYieldHours: `about ${d.hoursLeak.lowYieldHours} of ${d.hoursLeak.weeklyPhrase}`,
      archetype: d.archetype.name,
      bottleneck: d.bottleneckLabel,
      scores: `${scoresToString(d.scores)}, overall ${d.overall}`,
      route: d.routing.primary.name,
    })

    if (result === 'ok') {
      window.fbq?.('track', 'Lead')
      window.gtag?.('event', 'generate_lead')
      onUnlock(name)
      return
    }
    if (result === 'invalid-email') {
      setSubmitting(false)
      setError('That email was rejected by our list. Double-check it and try once more.')
      return
    }
    /* Network hiccup: one retry prompt, then never hold the report hostage. */
    failCount.current += 1
    if (failCount.current >= 2) {
      onUnlock(name)
      return
    }
    setSubmitting(false)
    setError('Could not reach our email service. Give it one more go.')
  }

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center bg-[#241d47] px-5 py-14 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[-10%] h-[26rem] w-[32rem] rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="relative w-full max-w-4xl grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        {/* Sealed report preview */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hidden md:block"
          aria-hidden="true"
        >
          <div className="relative rounded-2xl border border-brand-gold/25 bg-white/[0.04] p-6 -rotate-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold">Revision Diagnostic · Report</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-cream/45">Your revision profile</p>
            <div className="mt-2 h-9 w-52 rounded bg-brand-gold/25 blur-[7px]" />
            <div className="mt-2 h-4 w-40 rounded bg-brand-cream/20 blur-[6px]" />
            <div className="mt-6 space-y-2.5">
              {[70, 55, 85, 45, 62].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-16 rounded bg-brand-cream/15 blur-[3px]" />
                  <div className="h-2 flex-1 rounded-full bg-white/[0.08]">
                    <div className="h-full rounded-full bg-brand-gold/40 blur-[2px]" style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-16 rounded-xl bg-white/[0.05] blur-[2px]" />
            <span className="absolute top-4 right-4 rounded-full border border-brand-gold/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gold">
              Sealed
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">Diagnostic complete</p>
          <h2 className="mt-3 font-serif font-bold tracking-tight text-3xl sm:text-4xl text-brand-cream leading-tight">
            Your report is ready.
          </h2>
          <p className="mt-3 text-brand-cream/70 leading-relaxed">
            20 answers scored. One place to send it. Your profile, your five scores and your 7 day plan open the
            moment you do.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <fieldset>
              <legend className="block text-sm font-bold text-brand-cream/85 mb-1.5">
                Who&apos;s filling this in?
              </legend>
              <div className="flex gap-2.5">
                {(
                  [
                    ['student', 'The student'],
                    ['parent', 'A parent'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTaker(value)}
                    aria-pressed={taker === value}
                    className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                      taker === value
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                        : 'border-white/10 bg-white/[0.06] text-brand-cream/75 hover:border-white/25'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {taker === 'parent' && (
                <p className="mt-2 text-xs text-brand-cream/55 leading-relaxed">
                  The report and emails come to you. The report is written to the student, so read it together.
                </p>
              )}
            </fieldset>
            <div>
              <label htmlFor="diag-name" className="block text-sm font-bold text-brand-cream/85 mb-1.5">
                {taker === 'parent' ? 'Your first name' : 'First name'}
              </label>
              <input
                id="diag-name"
                name="firstName"
                type="text"
                required
                maxLength={30}
                autoComplete="given-name"
                placeholder="e.g. Waleed"
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.06] px-4 py-3.5 text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold transition"
              />
            </div>
            <div>
              <label htmlFor="diag-email" className="block text-sm font-bold text-brand-cream/85 mb-1.5">
                Email address
              </label>
              <input
                id="diag-email"
                name="email"
                type="email"
                required
                maxLength={100}
                autoComplete="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.06] px-4 py-3.5 text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold transition"
              />
            </div>
            <div>
              <label htmlFor="diag-phone" className="block text-sm font-bold text-brand-cream/85 mb-1.5">
                Phone number <span className="font-normal text-brand-cream/50">(optional)</span>
              </label>
              <input
                id="diag-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                maxLength={20}
                autoComplete="tel"
                placeholder="07..."
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.06] px-4 py-3.5 text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold transition"
              />
              <p className="mt-1.5 text-xs text-brand-cream/50 leading-relaxed">
                Add one if you&apos;d like to talk the report through. Used for that, nothing else.
              </p>
            </div>

            {error && (
              <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-brand-gold text-brand-purple px-8 py-4 text-lg font-bold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all shadow-[0_12px_28px_rgba(201,169,110,.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? 'Unsealing your report…' : 'Show my report'}
            </button>
            <p className="text-xs text-brand-cream/50 leading-relaxed">
              Free, and stays free. You will also get Dr Waleed&apos;s revision emails: the fixes from your report,
              one at a time, then one a week. Unsubscribe any time.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
