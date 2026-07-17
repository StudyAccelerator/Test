'use client'

import { useState } from 'react'
import { TIERS } from '@/lib/error-log/taxonomy'
import {
  daysBetween,
  dueMistakes,
  formatDue,
  nextDueDate,
  recordReview,
  type Mistake,
  type ReviewResult,
} from '@/lib/error-log/engine'
import { CARD, TierBadge } from './ui'

/* One due mistake: the retest. The fix stays hidden until the student has
   had a go from memory, because the reveal is the whole method. */
function RetestCard({
  m,
  todayKey,
  onResult,
}: {
  m: Mistake
  todayKey: string
  onResult: (m: Mistake, result: ReviewResult) => void
}) {
  const [revealed, setRevealed] = useState(false)
  const t = TIERS[m.tier]
  const overdueBy = Math.max(0, daysBetween(m.due, todayKey))

  return (
    <div className={`${CARD} p-5 sm:p-6`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-brand-purple">{m.subject}</span>
        {m.topic && <span className="text-brand-text/60">· {m.topic}</span>}
        <TierBadge tier={m.tier} size="sm" />
        {overdueBy > 0 && (
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
            {overdueBy === 1 ? '1 day late' : `${overdueBy} days late`}
          </span>
        )}
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-brand-text/80">{m.what}</p>

      {!revealed ? (
        <div className="mt-4 rounded-xl border-2 border-dashed border-brand-purple/25 bg-brand-cream/60 p-4 text-center">
          <p className="text-sm font-semibold text-brand-purple">
            Before you peek: answer it again now, out loud or on paper, from memory.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-3 rounded-lg bg-brand-purple px-5 py-2.5 text-sm font-bold text-brand-cream transition hover:bg-brand-purple-light"
          >
            Done. Show me the fix
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-xl p-4" style={{ background: t.tint }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-purple/55">The fix you wrote</p>
            <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed text-brand-text/85">{m.fix}</p>
          </div>
          <p className="mt-4 text-sm font-semibold text-brand-purple">Did you get it right this time, from memory?</p>
          <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onResult(m, 'got')}
              className="flex-1 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800 active:translate-y-px"
            >
              Got it right ✓
            </button>
            <button
              type="button"
              onClick={() => onResult(m, 'wrong')}
              className="flex-1 rounded-xl border-2 border-brand-purple/20 px-5 py-3 font-bold text-brand-purple transition hover:border-brand-purple active:translate-y-px"
            >
              Still got it wrong
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function ReviewQueue({
  mistakes,
  todayKey,
  onUpdate,
  onGoToForm,
  onPrint,
}: {
  mistakes: Mistake[]
  todayKey: string
  onUpdate: (updated: Mistake) => void
  onGoToForm: () => void
  onPrint: () => void
}) {
  const [justDone, setJustDone] = useState<{ result: ReviewResult; next: Mistake; prev: Mistake } | null>(null)

  const due = dueMistakes(mistakes, todayKey)

  function handleResult(m: Mistake, result: ReviewResult) {
    const next = recordReview(m, result, todayKey)
    onUpdate(next)
    setJustDone({ result, next, prev: m })
  }

  function undo() {
    if (!justDone) return
    onUpdate(justDone.prev)
    setJustDone(null)
  }

  const banner = justDone && (
    <div
      aria-live="polite"
      className={`mb-4 rounded-2xl border-l-4 p-5 ${
        justDone.result === 'got' ? 'border-emerald-600 bg-emerald-50' : 'border-brand-gold bg-brand-gold/10'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-semibold text-brand-purple">
          {justDone.result === 'got'
            ? justDone.next.status === 'mastered'
              ? `Mastered. ${justDone.prev.subject}${justDone.prev.topic ? ` · ${justDone.prev.topic}` : ''} can't take those marks off you again.`
              : `Good. ${justDone.prev.subject}${justDone.prev.topic ? ` · ${justDone.prev.topic}` : ''} comes back ${formatDue(justDone.next.due, todayKey)}.`
            : `Honest counts for more than right. It goes back to the start of the ladder: retest ${formatDue(justDone.next.due, todayKey)}.`}
        </p>
        <button
          type="button"
          onClick={undo}
          className="text-[13px] font-semibold text-brand-purple/60 underline underline-offset-4 transition hover:text-brand-purple"
        >
          Undo
        </button>
      </div>
      {justDone.result === 'wrong' && (
        <p className="mt-2 text-[13px] leading-relaxed text-brand-text/70">
          Restudy the fix now, while it&apos;s open in front of you. {TIERS[justDone.prev.tier].fix}
        </p>
      )}
    </div>
  )

  if (mistakes.length === 0) {
    return (
      <section className={`${CARD} p-6 text-center sm:p-10`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/50">Retests</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">Nothing to retest yet.</h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-brand-text/65">
          Log your first mistake and this tab becomes your retest queue: each one comes back at 3 days, 1 week, 2 weeks
          and 1 month, until you&apos;ve beaten it four times in a row.
        </p>
        <button
          type="button"
          onClick={onGoToForm}
          className="mt-5 rounded-xl bg-brand-purple px-6 py-3 font-serif text-lg font-bold text-brand-cream transition hover:bg-brand-purple-light"
        >
          Log my first mistake
        </button>
      </section>
    )
  }

  if (due.length === 0) {
    const next = nextDueDate(mistakes, todayKey)
    return (
      <div>
        {banner}
        <section className={`${CARD} p-6 text-center sm:p-10`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">All clear</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">Nothing due today.</h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-brand-text/65">
            {next ? (
              <>
                Next retest {formatDue(next.due, todayKey)}: {next.count} mistake{next.count === 1 ? '' : 's'} coming
                back. Until then, go make some new mistakes on past papers. That&apos;s the useful kind.
              </>
            ) : (
              <>Everything in your log is mastered. Go earn some new mistakes on a past paper.</>
            )}
          </p>
        </section>
      </div>
    )
  }

  return (
    <div>
      {banner}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-brand-text/70">
          <strong className="font-serif text-xl text-brand-purple">{due.length}</strong>{' '}
          retest{due.length === 1 ? '' : 's'} due. Cover the fix, answer from memory, then be honest.
        </p>
        <button
          type="button"
          onClick={onPrint}
          className="rounded-lg border border-brand-purple/20 px-3.5 py-2 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
        >
          Print today&apos;s retest sheet
        </button>
      </div>
      <div className="space-y-4">
        {due.map((m) => (
          <RetestCard key={m.id} m={m} todayKey={todayKey} onResult={handleResult} />
        ))}
      </div>
    </div>
  )
}
