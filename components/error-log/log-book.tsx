'use client'

import { useMemo, useState } from 'react'
import { RETEST_LADDER, TIERS, TIER_ORDER, causeLabel, sourceLabel, type TierId } from '@/lib/error-log/taxonomy'
import {
  buildInsights,
  exportLog,
  formatDue,
  formatShort,
  importLog,
  type Mistake,
} from '@/lib/error-log/engine'
import { CARD, EYEBROW, StatTile, TierBadge } from './ui'

/* What a lopsided tier count means, and the free next step that fits it.
   Routing stays honest: each tier points at the resource that treats it. */
const TIER_MEANING: Record<TierId, { meaning: string; href: string; linkLabel: string }> = {
  knowledge: {
    meaning:
      'Most of your lost marks are content that never went in properly. That is the most fixable kind: relearn the gaps, then blurt them from memory to prove they stuck.',
    href: '/A-Level-Accelerators-Blurting-Template.pdf',
    linkLabel: 'Grab the free blurting template',
  },
  recall: {
    meaning:
      'You understand things that then refuse to come out under pressure. More re-reading will not touch this; retrieval on a schedule will. Keep feeding this log, and build your week around testing yourself cold.',
    href: '/revision-tracker/',
    linkLabel: 'Build a week of retrieval with the Revision Tracker',
  },
  application: {
    meaning:
      'The knowledge is there. The marks die between your head and the paper: command words, context, structure. The treatment is unseen questions with the mark scheme open afterwards, not more notes.',
    href: '/blog/how-to-prepare-for-a-level-exams/',
    linkLabel: 'Read the exam preparation protocol',
  },
  exam: {
    meaning:
      'Your revision engine is mostly fine and the exam room is where it leaks: timing, wording, misreads, pressure. Exam craft is a trainable skill of its own, and it is the cheapest grade boost there is.',
    href: '/revision-diagnostic/',
    linkLabel: 'Score your exam craft in the free diagnostic',
  },
}

function LadderDots({ m }: { m: Mistake }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rung ${Math.min(m.step, RETEST_LADDER.length)} of ${RETEST_LADDER.length} on the retest ladder`}>
      {RETEST_LADDER.map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${i < m.step ? 'bg-emerald-600' : 'bg-brand-purple/15'}`}
        />
      ))}
    </span>
  )
}

function EntryRow({
  m,
  todayKey,
  onDelete,
}: {
  m: Mistake
  todayKey: string
  onDelete: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const t = TIERS[m.tier]
  const cause = causeLabel(m.tier, m.cause)

  return (
    <li className="rounded-xl border border-brand-purple/10 bg-white transition hover:border-brand-purple/25">
      <button
        type="button"
        onClick={() => {
          setOpen(!open)
          setConfirming(false)
        }}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
      >
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-brand-purple">{m.subject}</span>
            {m.topic && <span className="text-[14px] text-brand-text/60">· {m.topic}</span>}
            <TierBadge tier={m.tier} size="sm" />
            {m.status === 'mastered' ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                Mastered
              </span>
            ) : (
              <LadderDots m={m} />
            )}
          </span>
          <span className={`mt-1.5 block text-[14px] leading-snug text-brand-text/70 ${open ? '' : 'line-clamp-2'}`}>
            {m.what}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <span className="font-mono text-[10px] uppercase tracking-wide text-brand-purple/45">
            {formatShort(m.createdOn)}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`h-3.5 w-3.5 text-brand-purple/40 transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-brand-purple/10 p-4">
          <div className="rounded-lg p-3.5" style={{ background: t.tint }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-purple/55">The fix</p>
            <p className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-brand-text/85">{m.fix}</p>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-brand-text/60">
            {cause && (
              <>
                <strong className="text-brand-purple/80">Cause:</strong> {cause} ·{' '}
              </>
            )}
            <strong className="text-brand-purple/80">From:</strong> {sourceLabel(m.source)}
            {typeof m.marks === 'number' && (
              <>
                {' '}· <strong className="text-brand-purple/80">Cost:</strong> {m.marks} mark{m.marks === 1 ? '' : 's'}
              </>
            )}
            {' '}· <strong className="text-brand-purple/80">Retested:</strong>{' '}
            {m.reviews.length === 0 ? 'not yet' : `${m.reviews.length} time${m.reviews.length === 1 ? '' : 's'}`}
            {m.status === 'learning' && (
              <>
                {' '}· <strong className="text-brand-purple/80">Next:</strong> {formatDue(m.due, todayKey)}
              </>
            )}
          </p>
          <div className="mt-3 text-right">
            {confirming ? (
              <span className="text-[13px]">
                <span className="text-brand-text/60">Delete this mistake for good?</span>{' '}
                <button
                  type="button"
                  onClick={() => onDelete(m.id)}
                  className="font-bold text-red-700 underline underline-offset-2"
                >
                  Yes, delete
                </button>{' '}
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="font-semibold text-brand-purple/60 underline underline-offset-2"
                >
                  Keep it
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="text-[13px] font-semibold text-brand-purple/40 transition hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  )
}

export default function LogBook({
  mistakes,
  todayKey,
  onReplace,
  onDelete,
  onGoToForm,
}: {
  mistakes: Mistake[]
  todayKey: string
  onReplace: (all: Mistake[]) => void
  onDelete: (id: string) => void
  onGoToForm: () => void
}) {
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
  const [importNote, setImportNote] = useState<string | null>(null)

  const insights = useMemo(() => buildInsights(mistakes, todayKey), [mistakes, todayKey])

  const subjects = insights.bySubject.map((s) => s.subject)
  const filtered = (subjectFilter === 'all' ? mistakes : mistakes.filter((m) => m.subject === subjectFilter))
    .slice()
    .sort((a, b) => (a.createdOn < b.createdOn ? 1 : -1))

  function downloadBackup() {
    const blob = new Blob([exportLog(mistakes)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `error-log-backup-${todayKey}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function restoreBackup(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      const merged = importLog(String(reader.result ?? ''), mistakes)
      if (!merged) {
        setImportNote('That file does not look like an error log backup. Nothing was changed.')
        return
      }
      onReplace(merged)
      setImportNote(`Restored. Your log now holds ${merged.length} mistake${merged.length === 1 ? '' : 's'}.`)
    }
    reader.readAsText(file)
  }

  if (mistakes.length === 0) {
    return (
      <section className={`${CARD} p-6 text-center sm:p-10`}>
        <p className={EYEBROW}>Your log</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-brand-purple">Empty, for now. That&apos;s normal.</h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-brand-text/65">
          Every mistake you log lands here, tagged by cause. Once there are five or so, this page starts showing you
          the pattern behind them, and the pattern is the diagnosis.
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

  const maxTier = Math.max(1, ...TIER_ORDER.map((t) => insights.tierCounts[t]))

  return (
    <div className="space-y-6">
      {/* The pattern: dark statement panel, same language as the rest of the site */}
      <section className="rounded-2xl bg-brand-purple p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">The pattern</p>
        <h2 className="mt-1.5 font-serif text-2xl font-bold text-brand-cream">
          {insights.biggestTier ? (
            <>
              Your marks are leaking at Tier {TIERS[insights.biggestTier].n}:{' '}
              {TIERS[insights.biggestTier].label}.
            </>
          ) : (
            <>Every mistake here is a mark you can get back.</>
          )}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <StatTile value={String(insights.total)} label="Logged" />
          <StatTile value={String(insights.learning)} label="In training" />
          <StatTile value={String(insights.mastered)} label="Mastered" />
          {insights.marksEntered ? (
            <StatTile
              value={String(insights.marksMastered)}
              label="Marks won back"
              sub={`of ${insights.marksLogged} logged`}
            />
          ) : (
            <StatTile value={String(insights.dueToday)} label="Due today" />
          )}
        </div>

        <div className="mt-6 space-y-2">
          {TIER_ORDER.map((id) => {
            const t = TIERS[id]
            const count = insights.tierCounts[id]
            const pct = insights.total > 0 ? Math.round((count / insights.total) * 100) : 0
            return (
              <div key={id} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[12px] font-semibold text-brand-cream/80 sm:w-32">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-brand-cream/50">T{t.n}</span>{' '}
                  {t.label}
                </span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${Math.max(count > 0 ? 4 : 0, Math.round((count / maxTier) * 100))}%`, background: id === 'knowledge' ? '#C9A96E' : t.bg }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right font-mono text-[11px] text-brand-cream/70">
                  {count} · {pct}%
                </span>
              </div>
            )
          })}
        </div>

        {insights.biggestTier ? (
          <div className="mt-6 rounded-xl bg-white/[0.07] p-4 ring-1 ring-white/10">
            <p className="text-[14px] leading-relaxed text-brand-cream/85">
              {TIER_MEANING[insights.biggestTier].meaning}
            </p>
            <a
              href={TIER_MEANING[insights.biggestTier].href}
              className="mt-2.5 inline-block text-[14px] font-bold text-brand-gold underline decoration-brand-gold/50 underline-offset-4 transition hover:text-brand-gold-light"
            >
              {TIER_MEANING[insights.biggestTier].linkLabel} →
            </a>
          </div>
        ) : (
          <p className="mt-6 text-[13px] leading-relaxed text-brand-cream/60">
            Log {Math.max(0, 5 - insights.total)} more and I&apos;ll tell you which tier of your revision is leaking
            the most marks. Diagnose before you treat.
          </p>
        )}

        {insights.repeatTopics.length > 0 && (
          <div className="mt-4 rounded-xl bg-brand-gold/15 p-4 ring-1 ring-brand-gold/25">
            <p className="text-[14px] leading-relaxed text-brand-cream/90">
              <strong className="text-brand-gold">Repeat offender:</strong>{' '}
              {insights.repeatTopics[0].subject} · {insights.repeatTopics[0].topic} has cost you marks{' '}
              {insights.repeatTopics[0].count} times. That topic has earned a proper session of its own this week, not
              another retest.
            </p>
            <a
              href="/revision-tracker/"
              className="mt-2 inline-block text-[14px] font-bold text-brand-gold underline decoration-brand-gold/50 underline-offset-4 transition hover:text-brand-gold-light"
            >
              Put it in your week with the Revision Tracker →
            </a>
          </div>
        )}
      </section>

      {/* The full log */}
      <section className={`${CARD} p-5 sm:p-6`}>
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          {['all', ...subjects].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubjectFilter(s)}
              aria-pressed={subjectFilter === s}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${
                subjectFilter === s
                  ? 'border-brand-purple bg-brand-purple text-brand-cream'
                  : 'border-brand-purple/15 bg-white text-brand-purple hover:border-brand-purple/40'
              }`}
            >
              {s === 'all' ? `All (${insights.total})` : s}
            </button>
          ))}
        </div>

        <ul className="space-y-2.5">
          {filtered.map((m) => (
            <EntryRow key={m.id} m={m} todayKey={todayKey} onDelete={onDelete} />
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-brand-purple/10 pt-4">
          <p className="text-[12px] leading-relaxed text-brand-text/50">
            Your log lives in this browser only. The signup told me who you are; the mistakes themselves are never
            sent anywhere. Back it up before clearing your history or switching devices.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={downloadBackup}
              className="rounded-lg border border-brand-purple/20 px-3 py-1.5 text-[13px] font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
            >
              Back up
            </button>
            <label className="cursor-pointer rounded-lg border border-brand-purple/20 px-3 py-1.5 text-[13px] font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream">
              Restore
              <input
                type="file"
                accept="application/json,.json"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) restoreBackup(f)
                  e.target.value = ''
                }}
              />
            </label>
          </div>
        </div>
        {importNote && (
          <p role="status" className="mt-2 text-[13px] font-semibold text-brand-purple">
            {importNote}
          </p>
        )}
      </section>
    </div>
  )
}
