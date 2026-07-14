'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Answers,
  Question,
  QUESTIONS,
  SECTIONS,
  getWorryOptions,
} from '@/lib/diagnostic'

const EASE = [0.22, 1, 0.36, 1] as const
const LETTERS = 'ABCDEFGHIJKL'

interface QuizProps {
  answers: Answers
  onAnswer: (id: string, value: string | string[]) => void
  onComplete: () => void
  onExit: () => void
}

export default function Quiz({ answers, onAnswer, onComplete, onExit }: QuizProps) {
  /* Resume where the student left off: first unanswered question. */
  const firstUnanswered = QUESTIONS.findIndex((q) => answers[q.id] === undefined)
  const [index, setIndex] = useState(firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered)
  const [direction, setDirection] = useState(1)
  const [locked, setLocked] = useState(false)
  const [flash, setFlash] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const question = QUESTIONS[index]
  const options = useMemo(
    () => (question.type === 'worry' ? getWorryOptions(answers) : question.options),
    [question, answers]
  )

  const total = QUESTIONS.length
  const progress = index / total

  const goNext = useCallback(() => {
    setFlash(null)
    setLocked(false)
    if (index + 1 >= total) {
      onComplete()
    } else {
      setDirection(1)
      setIndex((i) => i + 1)
    }
  }, [index, total, onComplete])

  const goBack = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    setFlash(null)
    setLocked(false)
    if (index === 0) {
      onExit()
    } else {
      setDirection(-1)
      setIndex((i) => i - 1)
    }
  }, [index, onExit])

  const pickSingle = useCallback(
    (optionId: string) => {
      if (locked) return
      setLocked(true)
      setFlash(optionId)
      onAnswer(question.id, optionId)
      advanceTimer.current = setTimeout(goNext, reduceMotion ? 80 : 300)
    },
    [locked, question.id, onAnswer, goNext, reduceMotion]
  )

  const toggleMulti = useCallback(
    (optionId: string) => {
      const current = (answers[question.id] as string[] | undefined) ?? []
      const next = current.includes(optionId)
        ? current.filter((s) => s !== optionId)
        : [...current, optionId]
      onAnswer(question.id, next)
    },
    [answers, question.id, onAnswer]
  )

  const multiSelection = (answers[question.id] as string[] | undefined) ?? []
  const multiReady = question.type === 'multi' && multiSelection.length > 0

  /* Keyboard: letters 1 to 9 pick, Enter continues, Escape or Backspace steps back. */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      const num = parseInt(e.key, 10)
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        e.preventDefault()
        if (question.type === 'multi') toggleMulti(options[num - 1].id)
        else pickSingle(options[num - 1].id)
      } else if (e.key === 'Enter' && question.type === 'multi' && multiReady) {
        e.preventDefault()
        goNext()
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault()
        goBack()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [options, question.type, pickSingle, toggleMulti, goNext, goBack, multiReady])

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
  }, [])

  /* Scroll to top of the quiz on question change (mobile keeps context). */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [index])

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduceMotion ? 0 : 36 * dir }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduceMotion ? 0 : -36 * dir }),
  }

  return (
    <div className="min-h-[100svh] flex flex-col bg-brand-cream">
      {/* ── Top bar: back, section, progress ── */}
      <div className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur border-b border-brand-purple/10">
        <div className="max-w-3xl mx-auto px-5 pt-4 pb-3">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple/60 hover:text-brand-purple transition -ml-1 px-1 py-1"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </button>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/55">
              {SECTIONS[question.section]}
            </p>
            <p className="font-mono text-[11px] tracking-[0.08em] text-brand-purple/55 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {total}
            </p>
          </div>
          <div className="mt-3 h-1 rounded-full bg-brand-purple/10 overflow-hidden" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total}>
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light"
              initial={false}
              animate={{ width: `${Math.max(3, progress * 100)}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>
        </div>
      </div>

      {/* ── Question ── */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-5 py-10 sm:py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: EASE }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-4">
                {question.type === 'multi' ? 'Pick all that apply' : 'Pick one'}
              </p>
              <h2 className="font-serif font-bold tracking-tight text-[1.65rem] leading-snug sm:text-4xl sm:leading-tight text-brand-purple">
                {question.title}
              </h2>
              {question.help && (
                <p className="mt-3 text-brand-text/60 leading-relaxed">{question.help}</p>
              )}

              {/* Options */}
              {question.layout === 'chips' ? (
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {options.map((opt) => {
                    const selected =
                      question.type === 'multi'
                        ? multiSelection.includes(opt.id)
                        : answers[question.id] === opt.id || flash === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => (question.type === 'multi' ? toggleMulti(opt.id) : pickSingle(opt.id))}
                        aria-pressed={selected}
                        className={`group inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-[15px] font-semibold transition-all duration-150 ${
                          selected
                            ? 'border-brand-purple bg-brand-purple text-brand-cream shadow-[0_6px_16px_rgba(46,37,87,.25)]'
                            : 'border-brand-purple/15 bg-white text-brand-purple hover:border-brand-gold hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(46,37,87,.1)]'
                        }`}
                      >
                        {question.type === 'multi' && (
                          <span
                            aria-hidden="true"
                            className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 text-[10px] transition ${
                              selected ? 'border-brand-gold bg-brand-gold text-brand-purple' : 'border-brand-purple/25 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        )}
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-8 space-y-3">
                  {options.map((opt, i) => {
                    const selected = answers[question.id] === opt.id || flash === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => pickSingle(opt.id)}
                        aria-pressed={selected}
                        className={`group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-150 ${
                          selected
                            ? 'border-brand-purple bg-brand-purple shadow-[0_10px_24px_rgba(46,37,87,.3)]'
                            : 'border-transparent bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.07),0_2px_4px_rgba(46,37,87,.04),0_10px_20px_rgba(46,37,87,.05)] hover:-translate-y-0.5 hover:[box-shadow:0_0_0_2px_rgba(201,169,110,.6),0_8px_18px_rgba(46,37,87,.12)]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition ${
                            selected
                              ? 'bg-brand-gold text-brand-purple'
                              : 'bg-brand-cream text-brand-purple/60 ring-1 ring-brand-purple/10 group-hover:bg-brand-gold/20 group-hover:text-brand-purple'
                          }`}
                        >
                          {LETTERS[i]}
                        </span>
                        <span className="min-w-0">
                          <span className={`block font-semibold leading-snug ${selected ? 'text-brand-cream' : 'text-brand-purple'}`}>
                            {opt.label}
                          </span>
                          {opt.detail && (
                            <span className={`mt-0.5 block text-sm leading-snug ${selected ? 'text-brand-cream/70' : 'text-brand-text/55'}`}>
                              {opt.detail}
                            </span>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Continue for multi-select */}
              {question.type === 'multi' && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!multiReady}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-brand-cream px-8 py-3.5 font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    Continue
                    <span aria-hidden="true">→</span>
                  </button>
                  <p className="mt-3 text-sm text-brand-text/50">
                    {multiSelection.length === 0
                      ? 'Pick at least one subject'
                      : `${multiSelection.length} selected`}
                  </p>
                </div>
              )}

              <p className="mt-10 hidden sm:block font-mono text-[11px] tracking-[0.08em] text-brand-purple/35">
                Keys 1 to {Math.min(options.length, 9)} to answer
                {question.type === 'multi' ? ' · Enter to continue' : ''} · Esc to go back
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
