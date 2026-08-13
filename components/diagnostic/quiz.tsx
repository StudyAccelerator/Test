'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Answers,
  QUESTIONS,
  SECTIONS,
  SECTIONS_PARENT,
  Taker,
  getSupportNeededOptions,
  getWorryOptions,
  gradePairs,
  gradeRows,
  gradesComplete,
  isAnswered,
  oDetail,
  oLabel,
  qHelp,
  qTitle,
} from '@/lib/diagnostic'

const EASE = [0.22, 1, 0.36, 1] as const
const LETTERS = 'ABCDEFGHIJKL'

interface QuizProps {
  answers: Answers
  taker: Taker
  onAnswer: (id: string, value: string | string[]) => void
  onComplete: () => void
  onExit: () => void
}

export default function Quiz({ answers, taker, onAnswer, onComplete, onExit }: QuizProps) {
  /* Resume where the student left off: first incomplete question. */
  const firstUnanswered = QUESTIONS.findIndex((q) => !isAnswered(q, answers))
  const [index, setIndex] = useState(firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered)
  const [direction, setDirection] = useState(1)
  const [locked, setLocked] = useState(false)
  const [flash, setFlash] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const question = QUESTIONS[index]
  const options = useMemo(
    () =>
      question.type === 'worry'
        ? getWorryOptions(answers)
        : question.id === 'supportNeeded'
          ? getSupportNeededOptions(answers)
          : question.options,
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

  /* The support follow-up: which option is picked, and does it open one? */
  const pickedOption = useMemo(
    () => options.find((o) => o.id === answers[question.id]),
    [options, answers, question.id]
  )
  const followUp = question.id === 'support' ? pickedOption?.followUp : undefined

  const pickSingle = useCallback(
    (optionId: string) => {
      if (locked) return
      const opt = options.find((o) => o.id === optionId)
      onAnswer(question.id, optionId)
      /* An option with a follow-up keeps the card open for the extra detail;
         everything else advances on its own. */
      if (question.id === 'support' && opt?.followUp) {
        setFlash(null)
        return
      }
      setLocked(true)
      setFlash(optionId)
      advanceTimer.current = setTimeout(goNext, reduceMotion ? 80 : 300)
    },
    [locked, options, question.id, onAnswer, goNext, reduceMotion]
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

  /* Per-subject grades: pairs stored as "Subject|gradeId". Advancing happens
     when the last unrated subject gets its grade; edits after that stay put. */
  const rateSubject = useCallback(
    (subject: string, gradeId: string) => {
      if (locked) return
      const wasComplete = gradesComplete(answers, question.id)
      const pairs = ((answers[question.id] as string[] | undefined) ?? []).filter(
        (p) => p.slice(0, p.lastIndexOf('|')) !== subject
      )
      pairs.push(`${subject}|${gradeId}`)
      onAnswer(question.id, pairs)
      const nowComplete = gradeRows(answers).every(
        (s) => s === subject || gradePairs(answers, question.id)[s] !== undefined
      )
      if (!wasComplete && nowComplete) {
        setLocked(true)
        advanceTimer.current = setTimeout(goNext, reduceMotion ? 120 : 450)
      }
    },
    [locked, answers, question.id, onAnswer, goNext, reduceMotion]
  )

  const multiSelection = (answers[question.id] as string[] | undefined) ?? []
  const multiReady = question.type === 'multi' && multiSelection.length > 0
  const gradesReady = question.type === 'grades' && gradesComplete(answers, question.id)
  const showContinue = question.type === 'multi' || followUp !== undefined || gradesReady

  /* Rare edge: subjects was "Other" only, so a grades question has no rows.
     Nothing to ask; move straight on. */
  useEffect(() => {
    if (question.type === 'grades' && gradeRows(answers).length === 0) goNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id])

  /* Keyboard: letters 1 to 9 pick, Enter continues, Escape or Backspace steps back. */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      const num = parseInt(e.key, 10)
      if (question.type !== 'grades' && !isNaN(num) && num >= 1 && num <= options.length) {
        e.preventDefault()
        if (question.type === 'multi') toggleMulti(options[num - 1].id)
        else pickSingle(options[num - 1].id)
      } else if (e.key === 'Enter' && (multiReady || followUp !== undefined || gradesReady)) {
        e.preventDefault()
        goNext()
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault()
        goBack()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [options, question.type, pickSingle, toggleMulti, goNext, goBack, multiReady, followUp, gradesReady])

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

  const eyebrow =
    question.type === 'multi'
      ? 'Pick all that apply'
      : question.type === 'grades'
        ? 'One grade per subject'
        : 'Pick one'

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
              {(taker === 'parent' ? SECTIONS_PARENT : SECTIONS)[question.section]}
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
              {taker === 'parent' && index === 0 && (
                <div className="mb-6 rounded-xl border border-brand-gold/30 bg-brand-gold/[0.08] px-4 py-3 text-sm text-brand-text/75 leading-relaxed">
                  Best done with your teenager next to you. If they&apos;re not around, answer from what you
                  actually see day to day. Honest beats perfect.
                </div>
              )}
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-4">{eyebrow}</p>
              <h2 className="font-serif font-bold tracking-tight text-[1.65rem] leading-snug sm:text-4xl sm:leading-tight text-brand-purple">
                {qTitle(question, taker)}
              </h2>
              {qHelp(question, taker) && (
                <p className="mt-3 text-brand-text/60 leading-relaxed">{qHelp(question, taker)}</p>
              )}

              {/* Options */}
              {question.type === 'grades' ? (
                <div className="mt-8 space-y-4">
                  {gradeRows(answers).map((subject) => {
                    const picked = gradePairs(answers, question.id)[subject]
                    return (
                      <div
                        key={subject}
                        className="rounded-2xl bg-white p-4 sm:p-5 [box-shadow:0_0_0_1px_rgba(46,37,87,.07),0_2px_4px_rgba(46,37,87,.04),0_10px_20px_rgba(46,37,87,.05)]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <p className="font-serif font-bold text-brand-purple">{subject}</p>
                          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={`${subject} grade`}>
                            {options.map((opt) => {
                              const selected = picked === opt.id
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={selected}
                                  onClick={() => rateSubject(subject, opt.id)}
                                  className={`rounded-full border-2 px-3.5 py-1.5 text-sm font-bold transition-all duration-150 ${
                                    selected
                                      ? 'border-brand-purple bg-brand-purple text-brand-cream'
                                      : 'border-brand-purple/15 bg-white text-brand-purple hover:border-brand-gold'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : question.layout === 'chips' ? (
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
                        {oLabel(opt, taker)}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-8 space-y-3">
                  {options.map((opt, i) => {
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
                          {question.type === 'multi' && selected ? '✓' : LETTERS[i]}
                        </span>
                        <span className="min-w-0">
                          <span className={`block font-semibold leading-snug ${selected ? 'text-brand-cream' : 'text-brand-purple'}`}>
                            {oLabel(opt, taker)}
                          </span>
                          {oDetail(opt, taker) && (
                            <span className={`mt-0.5 block text-sm leading-snug ${selected ? 'text-brand-cream/70' : 'text-brand-text/55'}`}>
                              {oDetail(opt, taker)}
                            </span>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Support follow-up: the detail behind the answer */}
              {followUp && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-5 rounded-2xl border-2 border-brand-gold/40 bg-brand-gold/[0.07] p-5"
                >
                  <p className="font-semibold text-brand-purple">
                    {taker === 'parent' ? followUp.promptParent ?? followUp.prompt : followUp.prompt}
                  </p>
                  {followUp.kind === 'subjects' && gradeRows(answers).length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {gradeRows(answers).map((subject) => {
                        const picked = Array.isArray(answers.supportDetail) && answers.supportDetail.includes(subject)
                        return (
                          <button
                            key={subject}
                            type="button"
                            aria-pressed={picked}
                            onClick={() => {
                              const current = Array.isArray(answers.supportDetail) ? answers.supportDetail : []
                              onAnswer(
                                'supportDetail',
                                picked ? current.filter((s) => s !== subject) : [...current, subject]
                              )
                            }}
                            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                              picked
                                ? 'border-brand-purple bg-brand-purple text-brand-cream'
                                : 'border-brand-purple/15 bg-white text-brand-purple hover:border-brand-gold'
                            }`}
                          >
                            {subject}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      maxLength={120}
                      value={typeof answers.supportDetail === 'string' ? answers.supportDetail : ''}
                      onChange={(e) => onAnswer('supportDetail', e.target.value)}
                      placeholder={followUp.placeholder}
                      className="mt-3 w-full rounded-xl border-2 border-brand-purple/15 bg-white px-4 py-3 text-brand-purple placeholder:text-brand-text/35 focus:outline-none focus:border-brand-gold transition"
                    />
                  )}
                  <p className="mt-2.5 text-xs text-brand-text/50">Optional, but it makes my advice sharper.</p>
                </motion.div>
              )}

              {/* Continue: multi-select, follow-ups, and completed grade grids */}
              {showContinue && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={question.type === 'multi' ? !multiReady : question.type === 'grades' ? !gradesReady : false}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-brand-cream px-8 py-3.5 font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    Continue
                    <span aria-hidden="true">→</span>
                  </button>
                  {question.type === 'multi' && (
                    <p className="mt-3 text-sm text-brand-text/50">
                      {multiSelection.length === 0
                        ? question.id === 'subjects'
                          ? 'Pick at least one subject'
                          : 'Pick at least one'
                        : `${multiSelection.length} selected`}
                    </p>
                  )}
                </div>
              )}

              <p className="mt-10 hidden sm:block font-mono text-[11px] tracking-[0.08em] text-brand-purple/35">
                {question.type === 'grades'
                  ? 'Tap a grade for each subject · Esc to go back'
                  : `Keys 1 to ${Math.min(options.length, 9)} to answer${question.type === 'multi' ? ' · Enter to continue' : ''} · Esc to go back`}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
