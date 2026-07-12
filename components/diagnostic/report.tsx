'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Answers,
  DIMS,
  DIM_META,
  Diagnosis,
  dimNote,
  gradeLabel,
  verdictFor,
} from '@/lib/diagnostic'

const EASE = [0.22, 1, 0.36, 1] as const
const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'
const EYEBROW = 'font-mono text-xs uppercase tracking-[0.2em] text-brand-purple/60'
const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

const TONE_CHIP: Record<string, string> = {
  strong: 'bg-emerald-100 text-emerald-700',
  steady: 'bg-brand-gold/25 text-brand-purple',
  leaking: 'bg-amber-100 text-amber-700',
  critical: 'bg-red-100 text-red-700',
}
const TONE_BAR: Record<string, string> = {
  strong: 'bg-emerald-500',
  steady: 'bg-brand-gold',
  leaking: 'bg-amber-500',
  critical: 'bg-red-500',
}

/* ── Count-up number, starts when scrolled into view ── */
function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setShown(value)
      return
    }
    const start = performance.now()
    const duration = 1100
    let raf: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}

/* ── Overall score ring ── */
function ScoreRing({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const R = 56
  const C = 2 * Math.PI * R

  return (
    <div ref={ref} className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(251,248,243,.14)" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * (1 - value / 100) } : {}}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-serif font-bold text-[2.6rem] leading-none text-brand-cream tabular-nums">
          <CountUp value={value} />
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cream/60">out of 100</p>
      </div>
    </div>
  )
}

/* ── Section shell ── */
function Section({
  number,
  title,
  children,
  lead,
}: {
  number: string
  title: string
  lead?: string
  children: React.ReactNode
}) {
  return (
    <section className="px-5 sm:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <p className={EYEBROW}>
          {number} · {title}
        </p>
        {lead && (
          <h2 className="mt-3 font-serif font-bold tracking-tight text-2xl md:text-[2rem] leading-tight text-brand-purple">
            {lead}
          </h2>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

interface ReportProps {
  diagnosis: Diagnosis
  answers: Answers
  firstName: string
  onRetake: () => void
}

export default function Report({ diagnosis, answers, firstName, onRetake }: ReportProps) {
  const { archetype, scores, overall, bottleneck, hoursLeak, prescription, plan, routing } = diagnosis
  const worry = (answers.worry as string) ?? ''
  const worryShown = worry && worry !== 'unsure' ? worry : ''
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const blocks = Math.round(hoursLeak.weeklyMid)
  const leakBlocks = Math.min(blocks - 1, hoursLeak.lowYieldHours)
  const isOptimiser = archetype.id === 'optimiser'

  const [downloading, setDownloading] = useState(false)

  const downloadCard = async () => {
    setDownloading(true)
    try {
      drawShareCard(firstName, archetype.name, archetype.strapline, overall, scores)
    } finally {
      setTimeout(() => setDownloading(false), 800)
    }
  }

  return (
    <div className="bg-brand-cream">
      {/* ══ Report cover ══ */}
      <section className="relative overflow-hidden bg-[#241d47] text-brand-cream">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-[-12%] h-[26rem] w-[34rem] rounded-full bg-brand-gold/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-[-10%] h-[24rem] w-[30rem] rounded-full bg-brand-purple-light/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/55">
              <span className="text-brand-gold">Revision Diagnostic</span>
              <span aria-hidden="true" className="hidden sm:inline h-px w-8 bg-brand-gold/40" />
              <span>Personal report</span>
            </div>

            <div className="mt-10 md:mt-12 grid md:grid-cols-[1.6fr_1fr] gap-10 md:gap-8 items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cream/60">
                  Prepared for <span className="text-brand-cream">{firstName}</span> · {today}
                </p>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">Your revision profile</p>
                <h1 className="mt-3 font-serif font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl leading-[0.98]">
                  <span className="italic text-brand-gold">{archetype.name}</span>
                </h1>
                <p className="mt-5 font-serif italic text-xl sm:text-2xl text-brand-cream/85 leading-snug">
                  {archetype.strapline}
                </p>
                <div className="mt-8 rounded-xl border border-brand-gold/25 bg-white/[0.04] px-5 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold/80 mb-1.5">Chart note</p>
                  <p className="font-mono text-[13px] leading-relaxed text-brand-cream/75">{archetype.clinicalNote}</p>
                </div>
              </div>

              <div className="flex md:flex-col items-center justify-center gap-6">
                <ScoreRing value={overall} />
                <p className="max-w-[10rem] text-center text-sm text-brand-cream/60 leading-snug">
                  Your revision system score, across five dimensions
                </p>
              </div>
            </div>

            {/* Dimension pills */}
            <div className="mt-10 flex flex-wrap gap-2">
              {DIMS.map((d) => {
                const v = verdictFor(scores[d])
                const isBottleneck = d === bottleneck && !isOptimiser
                return (
                  <span
                    key={d}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold ${
                      isBottleneck
                        ? 'bg-brand-gold text-brand-purple shadow-[0_6px_16px_rgba(201,169,110,.35)]'
                        : 'bg-white/[0.07] text-brand-cream/80 ring-1 ring-white/10'
                    }`}
                  >
                    {DIM_META[d].label}
                    <span className={`font-mono text-xs ${isBottleneck ? 'text-brand-purple/70' : 'text-brand-gold'}`}>{scores[d]}</span>
                    {isBottleneck && <span className="font-mono text-[10px] uppercase tracking-wider">· the leak</span>}
                  </span>
                )
              })}
            </div>
          </motion.div>
        </div>
        <div aria-hidden="true" className="relative h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
      </section>

      {/* ══ 01 · The finding ══ */}
      <Section number="01" title="The finding" lead="What your answers actually show">
        <div className="space-y-4 text-[1.05rem] text-brand-text/80 leading-relaxed">
          {archetype.diagnosis.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {worryShown && (
          <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-xl bg-brand-purple/[0.05] border border-brand-purple/10 px-4 py-3 text-sm text-brand-text/70">
            <span className="font-bold text-brand-purple">Watch list:</span>
            {worryShown} · working at {gradeLabel(answers.currentGrade as string)} · target {gradeLabel(answers.targetGrade as string)}
          </p>
        )}
      </Section>

      {/* ══ 02 · System scores ══ */}
      <section className="px-5 sm:px-6 py-12 md:py-16 bg-white/60 border-y border-brand-purple/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className={EYEBROW}>02 · The five systems</p>
          <h2 className="mt-3 font-serif font-bold tracking-tight text-2xl md:text-[2rem] leading-tight text-brand-purple">
            Your revision system, scored
          </h2>
          <p className="mt-3 text-brand-text/65 leading-relaxed max-w-xl">
            Top grades run on five systems working together. Here is where each of yours stands today.
          </p>
          <div className="mt-8 space-y-5">
            {DIMS.map((d, i) => {
              const v = verdictFor(scores[d])
              const isB = d === bottleneck && !isOptimiser
              return (
                <div key={d} className={`${CARD} p-5 ${isB ? 'ring-2 ring-brand-gold' : ''}`}>
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif font-bold text-lg text-brand-purple">{DIM_META[d].label}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${TONE_CHIP[v.tone]}`}>{v.label}</span>
                      {isB && (
                        <span className="rounded-full bg-brand-gold text-brand-purple px-2.5 py-0.5 text-[11px] font-bold">
                          Fix first
                        </span>
                      )}
                    </div>
                    <p className="font-serif font-bold text-2xl text-brand-purple tabular-nums">
                      <CountUp value={scores[d]} />
                      <span className="text-sm text-brand-purple/40 font-sans font-semibold"> /100</span>
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-brand-text/55 italic">{DIM_META[d].question}</p>
                  <div className="mt-3 h-2 rounded-full bg-brand-purple/[0.08] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${TONE_BAR[v.tone]}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${scores[d]}%` }}
                      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                      transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                    />
                  </div>
                  <p className="mt-3 text-[15px] text-brand-text/75 leading-snug">{dimNote(d, scores[d])}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ 03 · The hours leak ══ */}
      <Section
        number="03"
        title="Where the hours go"
        lead={
          isOptimiser
            ? 'Your hours are mostly landing where they should'
            : 'The expensive part is not the hours. It is where they go.'
        }
      >
        <div className={`${CARD} p-6 md:p-8`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/50">
            A typical week, based on your answers
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5" aria-hidden="true">
            {Array.from({ length: blocks }).map((_, i) => {
              const isLeak = i < leakBlocks
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg text-[10px] font-mono font-bold ${
                    isLeak
                      ? 'bg-brand-purple/[0.07] text-brand-purple/35 border border-dashed border-brand-purple/30'
                      : 'bg-brand-gold/25 text-brand-purple ring-1 ring-brand-gold/40'
                  }`}
                >
                  1h
                </motion.span>
              )
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-brand-text/70">
              <span className="h-3 w-3 rounded bg-brand-gold/60 ring-1 ring-brand-gold" aria-hidden="true" />
              High-yield: retrieval, papers, spaced returns
            </span>
            <span className="inline-flex items-center gap-2 text-brand-text/70">
              <span className="h-3 w-3 rounded bg-brand-purple/10 border border-dashed border-brand-purple/30" aria-hidden="true" />
              Low-yield: re-reading, copying, recognising
            </span>
          </div>
          <p className="mt-6 text-lg md:text-xl font-serif text-brand-purple leading-snug">
            {isOptimiser ? (
              <>Of your {hoursLeak.weeklyPhrase} weekly hours, only around{' '}
              <span className="font-bold">{hoursLeak.lowYieldHours}</span> look low-yield. That is what strong looks like.</>
            ) : (
              <>About <span className="font-bold text-3xl">{hoursLeak.lowYieldHours}</span> of your {hoursLeak.weeklyPhrase} weekly
              hours are going into work that <span className="italic text-brand-gold">feels</span> productive but scores very little.</>
            )}
          </p>
          <p className="mt-3 text-sm text-brand-text/55 leading-relaxed">
            Based on what you told us about your default methods. The point is not to study more hours. It is to make the
            same hours score.
          </p>
        </div>
      </Section>

      {/* ══ 04 · Fix this first ══ */}
      <section className="px-5 sm:px-6 py-12 md:py-16 bg-white/60 border-y border-brand-purple/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className={EYEBROW}>04 · The prescription</p>
          <h2 className="mt-3 font-serif font-bold tracking-tight text-2xl md:text-[2rem] leading-tight text-brand-purple">
            {prescription.headline}
          </h2>
          <p className="mt-3 text-brand-text/70 leading-relaxed max-w-xl">{prescription.why}</p>
          <div className="mt-8 space-y-4">
            {prescription.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className={`${CARD} border-l-4 border-l-brand-gold p-5 md:p-6 flex gap-4`}
              >
                <span className="font-mono text-sm font-bold text-brand-gold pt-0.5">0{i + 1}</span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-purple">{step.title}</h3>
                  <p className="mt-1.5 text-[15px] text-brand-text/75 leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`/blog/${prescription.articleSlug}/`}
              className="font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 hover:text-brand-gold transition"
            >
              Read: {prescription.articleTitle}
            </a>
            {prescription.blurtingTemplate && (
              <a
                href="/A-Level-Accelerators-Blurting-Template.pdf"
                className="font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 hover:text-brand-gold transition"
              >
                Download the free blurting template
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ══ 05 · Next 7 days ══ */}
      <Section number="05" title="The plan" lead="Your next 7 days">
        <p className="text-brand-text/65 leading-relaxed max-w-xl -mt-2 mb-8">
          Small, specific, and in order. Do these and next week starts from a different place.
        </p>
        <ol className="relative space-y-0 border-l-2 border-brand-gold/30 ml-3">
          {plan.map((item, i) => (
            <motion.li
              key={item.day}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              className="relative pl-8 pb-8 last:pb-0"
            >
              <span aria-hidden="true" className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-gold ring-4 ring-brand-cream" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/50">{item.day}</p>
              <h3 className="mt-1 font-serif font-bold text-lg text-brand-purple">{item.task}</h3>
              <p className="mt-1 text-[15px] text-brand-text/70 leading-relaxed max-w-xl">{item.detail}</p>
              {item.task === 'Build next week properly' && (
                <a
                  href="/revision-tracker"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple underline underline-offset-4 decoration-brand-gold/60 hover:text-brand-gold transition"
                >
                  Open the free Revision Tracker
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </motion.li>
          ))}
        </ol>
      </Section>

      {/* ══ 06 · Your route ══ */}
      <section className="px-5 sm:px-6 py-14 md:py-20 bg-[#241d47] relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-8%] h-[22rem] w-[28rem] rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">06 · {routing.primary.eyebrow}</p>
          <h2 className="mt-3 font-serif font-bold tracking-tight text-3xl md:text-4xl leading-tight text-brand-cream">
            {firstName}, this is your fastest route
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-8 rounded-3xl bg-white p-7 md:p-9 [box-shadow:0_0_0_2px_rgba(201,169,110,.55),0_24px_48px_rgba(0,0,0,.35)]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-gold text-brand-purple text-xs font-bold px-3 py-1.5">
                Matched to your diagnosis
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-purple/50">{routing.primary.meta}</span>
            </div>
            <h3 className="mt-4 font-serif font-bold text-3xl md:text-4xl text-brand-purple">{routing.primary.name}</h3>
            <p className="mt-2 font-serif italic text-lg text-brand-gold leading-snug">{routing.primary.strap}</p>
            <p className="mt-4 text-brand-text/80 leading-relaxed">{routing.primary.why}</p>
            <ul className="mt-5 space-y-2.5 text-[15px] text-brand-text/75">
              {routing.primary.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={routing.primary.href}
                className="inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-8 py-4 font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
              >
                {routing.primary.cta}
                <span aria-hidden="true" className="ml-2">→</span>
              </a>
              <a
                href={BOOK_A_CALL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center rounded-full border-2 border-brand-purple/20 text-brand-purple px-8 py-4 font-semibold hover:border-brand-gold hover:text-brand-gold transition-all"
              >
                Book a Free Call Instead
              </a>
            </div>
          </motion.div>

          <p className="mt-6 text-sm text-brand-cream/65 leading-relaxed max-w-2xl">{routing.secondaryLine}</p>
        </div>
      </section>

      {/* ══ Actions footer ══ */}
      <section className="px-5 sm:px-6 py-12 md:py-16 print:hidden">
        <div className="max-w-3xl mx-auto">
          <div className={`${CARD} p-6 md:p-8`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <div className="flex-1">
                <h3 className="font-serif font-bold text-xl text-brand-purple">Keep your report</h3>
                <p className="mt-1 text-sm text-brand-text/60 leading-relaxed">
                  Download your profile card, or come back any time: this page remembers your result on this device.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={downloadCard}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-purple px-6 py-3 font-bold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all disabled:opacity-60"
                >
                  {downloading ? 'Preparing…' : 'Download my card'}
                </button>
                <button
                  type="button"
                  onClick={onRetake}
                  className="inline-flex items-center rounded-full border-2 border-brand-purple/20 text-brand-purple px-6 py-3 font-semibold hover:border-brand-gold hover:text-brand-gold transition"
                >
                  Retake
                </button>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-brand-text/55">
            Share it with whoever pays for things in your house.
          </p>
        </div>
      </section>
    </div>
  )
}

/* ── Downloadable share card (1080 x 1350, Instagram portrait) ── */
function drawShareCard(
  name: string,
  archetypeName: string,
  strapline: string,
  overall: number,
  scores: import('@/lib/diagnostic').Scores
) {
  const W = 1080
  const H = 1350
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const c = cv.getContext('2d')
  if (!c) return

  /* Background */
  const bg = c.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#241d47')
  bg.addColorStop(1, '#2E2557')
  c.fillStyle = bg
  c.fillRect(0, 0, W, H)

  /* Gold glow */
  const glow = c.createRadialGradient(W * 0.85, H * 0.1, 40, W * 0.85, H * 0.1, 500)
  glow.addColorStop(0, 'rgba(201,169,110,0.22)')
  glow.addColorStop(1, 'rgba(201,169,110,0)')
  c.fillStyle = glow
  c.fillRect(0, 0, W, H)

  /* Header */
  c.fillStyle = '#C9A96E'
  c.font = 'bold 30px Menlo, monospace'
  c.textAlign = 'center'
  c.fillText('THE REVISION DIAGNOSTIC', W / 2, 120)
  c.fillStyle = 'rgba(251,248,243,0.55)'
  c.font = '26px Menlo, monospace'
  c.fillText((name ? name.toUpperCase() + "'S " : 'MY ') + 'REVISION PROFILE', W / 2, 168)

  /* Archetype */
  c.fillStyle = '#C9A96E'
  c.font = 'italic bold 108px Georgia, serif'
  let label = archetypeName
  while (c.measureText(label).width > W - 120) {
    c.font = `italic bold ${parseInt(c.font.match(/\d+/)![0]) - 6}px Georgia, serif`
  }
  c.fillText(label, W / 2, 330)
  c.fillStyle = 'rgba(251,248,243,0.85)'
  c.font = 'italic 40px Georgia, serif'
  c.fillText(strapline, W / 2, 400)

  /* Score ring: number centred inside, label sits clear below the ring */
  const cx = W / 2
  const cy = 590
  const r = 135
  c.lineWidth = 24
  c.strokeStyle = 'rgba(251,248,243,0.12)'
  c.beginPath()
  c.arc(cx, cy, r, 0, Math.PI * 2)
  c.stroke()
  c.strokeStyle = '#C9A96E'
  c.lineCap = 'round'
  c.beginPath()
  c.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * overall) / 100)
  c.stroke()
  c.fillStyle = '#FBF8F3'
  c.font = 'bold 110px Georgia, serif'
  c.textAlign = 'center'
  c.fillText(String(overall), cx, cy + 38)
  c.fillStyle = 'rgba(251,248,243,0.55)'
  c.font = '24px Menlo, monospace'
  c.fillText('SYSTEM SCORE / 100', cx, cy + r + 52)

  /* Dimension bars */
  const dims: [string, number][] = [
    ['Method', scores.method],
    ['Retention', scores.retention],
    ['Exam Craft', scores.examCraft],
    ['Targeting', scores.prioritisation],
    ['Consistency', scores.consistency],
  ]
  const barX = 160
  const barW = W - 2 * barX
  let y = 878
  c.textAlign = 'left'
  dims.forEach(([lbl, val]) => {
    c.fillStyle = 'rgba(251,248,243,0.8)'
    c.font = 'bold 26px -apple-system, Arial, sans-serif'
    c.fillText(lbl, barX, y)
    c.textAlign = 'right'
    c.fillStyle = '#C9A96E'
    c.font = 'bold 26px Menlo, monospace'
    c.fillText(String(val), barX + barW, y)
    c.textAlign = 'left'
    /* Track */
    c.fillStyle = 'rgba(251,248,243,0.12)'
    roundRect(c, barX, y + 12, barW, 14, 7)
    c.fill()
    /* Fill */
    c.fillStyle = '#C9A96E'
    roundRect(c, barX, y + 12, Math.max(14, (barW * val) / 100), 14, 7)
    c.fill()
    y += 66
  })

  /* Footer, spaced clear of the last bar */
  c.textAlign = 'center'
  c.fillStyle = 'rgba(251,248,243,0.5)'
  c.font = '24px Menlo, monospace'
  c.fillText('Find your profile free at', W / 2, H - 108)
  c.fillStyle = '#FBF8F3'
  c.font = 'bold 30px Menlo, monospace'
  c.fillText('alevelaccelerators.com/revision-diagnostic', W / 2, H - 62)

  cv.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-revision-profile.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, 'image/png')
}

function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath()
  c.moveTo(x + r, y)
  c.arcTo(x + w, y, x + w, y + h, r)
  c.arcTo(x + w, y + h, x, y + h, r)
  c.arcTo(x, y + h, x, y, r)
  c.arcTo(x, y, x + w, y, r)
  c.closePath()
}
