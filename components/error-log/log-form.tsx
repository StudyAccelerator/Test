'use client'

import { useRef, useState } from 'react'
import {
  LADDER_LABELS,
  RETEST_LADDER,
  SOURCES,
  TIERS,
  TIER_ORDER,
  type SourceId,
  type TierId,
} from '@/lib/error-log/taxonomy'
import { formatDue, newMistake, type Mistake } from '@/lib/error-log/engine'
import { CARD, INPUT, LABEL, SUBJECT_SUGGESTIONS, TierBadge } from './ui'

type Draft = {
  subject: string
  topic: string
  what: string
  fix: string
  tier: TierId | null
  cause: string | undefined
  marks: string
  source: SourceId
}

const EMPTY: Draft = { subject: '', topic: '', what: '', fix: '', tier: null, cause: undefined, marks: '', source: 'paper' }

/* Ten-second diagnosis: the question sequence Waleed teaches for working out
   which tier a lost mark belongs to. Each answer either lands on a tier or
   moves to the next question. */
const HELPER_STEPS = [
  {
    q: 'Sitting at home with your notes open, would you have got it right?',
    options: [
      { label: 'No, honestly', tier: 'knowledge' as TierId },
      { label: 'Yes, easily', tier: null },
    ],
  },
  {
    q: 'In the moment, did the knowledge actually come back to you?',
    options: [
      { label: 'No, it went missing', tier: 'recall' as TierId },
      { label: 'Yes, it was in my head', tier: null },
    ],
  },
  {
    q: 'So you knew it. What actually stopped the marks?',
    options: [
      { label: 'Turning it into the answer this question wanted', tier: 'application' as TierId },
      { label: 'The clock, the wording, a misread or a slip', tier: 'exam' as TierId },
    ],
  },
]

export default function LogForm({
  mistakes,
  onAdd,
  onGoToLog,
  todayKey,
}: {
  mistakes: Mistake[]
  onAdd: (m: Mistake) => void
  onGoToLog: () => void
  todayKey: string
}) {
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [errors, setErrors] = useState<string[]>([])
  const [saved, setSaved] = useState<Mistake | null>(null)
  const [helperOpen, setHelperOpen] = useState(false)
  const [helperStep, setHelperStep] = useState(0)
  const errorsRef = useRef<HTMLDivElement>(null)
  const whatRef = useRef<HTMLTextAreaElement>(null)

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }))

  const knownSubjects = [...new Set([...mistakes.map((m) => m.subject), ...SUBJECT_SUGGESTIONS])]

  function pickTier(tier: TierId) {
    setDraft((d) => ({ ...d, tier, cause: undefined }))
    setHelperOpen(false)
    setHelperStep(0)
  }

  function save() {
    const problems: string[] = []
    if (!draft.subject.trim()) problems.push('Which subject was it? Add that first.')
    if (!draft.what.trim()) problems.push('Write down what went wrong. Future you needs the detail.')
    if (!draft.fix.trim()) problems.push('Write the fix in your own words. This is the half that earns the marks back.')
    if (!draft.tier) problems.push('Tag the cause. If you are not sure, use the ten second diagnosis.')
    const marks = draft.marks.trim() === '' ? undefined : parseInt(draft.marks, 10)
    if (draft.marks.trim() !== '' && (Number.isNaN(marks) || marks! < 1 || marks! > 50))
      problems.push('Marks lost should be a whole number between 1 and 50, or left blank.')
    setErrors(problems)
    if (problems.length > 0) {
      requestAnimationFrame(() => errorsRef.current?.focus())
      return
    }
    const m = newMistake(
      {
        subject: draft.subject.trim(),
        topic: draft.topic.trim(),
        what: draft.what.trim(),
        fix: draft.fix.trim(),
        tier: draft.tier!,
        cause: draft.cause,
        source: draft.source,
        marks,
      },
      todayKey
    )
    onAdd(m)
    setSaved(m)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  function logAnother() {
    /* Keep subject and source: students log a batch straight after marking */
    setDraft((d) => ({ ...EMPTY, subject: d.subject, source: d.source }))
    setSaved(null)
    setErrors([])
    requestAnimationFrame(() => whatRef.current?.focus())
  }

  if (saved) {
    const t = TIERS[saved.tier]
    return (
      <section aria-live="polite" className={`${CARD} p-6 sm:p-8`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">Banked</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-brand-purple">
          That mark doesn&apos;t get lost twice.
        </h2>
        <div className="mt-4 rounded-xl border border-brand-purple/10 bg-brand-cream p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-brand-purple">{saved.subject}</span>
            {saved.topic && <span className="text-brand-text/60">· {saved.topic}</span>}
            <TierBadge tier={saved.tier} size="sm" />
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-brand-text/75">{saved.what}</p>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-brand-purple">Its retest schedule, starting now:</p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-4">
            {RETEST_LADDER.map((days, i) => (
              <li key={days} className={`rounded-lg border px-3 py-2 ${i === 0 ? 'border-brand-purple bg-brand-purple text-brand-cream' : 'border-brand-purple/15 bg-white text-brand-text/70'}`}>
                <p className={`font-mono text-[10px] uppercase tracking-wide ${i === 0 ? 'text-brand-cream/70' : 'text-brand-purple/50'}`}>
                  {LADDER_LABELS[i]}
                </p>
                <p className="text-[13px] font-semibold">
                  {i === 0 ? formatDue(saved.due, todayKey) : 'if the last one passes'}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[13px] leading-relaxed text-brand-text/60">
            First retest {formatDue(saved.due, todayKey)}. Pass all four from memory and it&apos;s mastered: that&apos;s
            a {t.label} gap closed for good. Get one wrong and it goes back to the start of the ladder, because gaps
            don&apos;t close by being looked at.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={logAnother}
            className="flex-1 rounded-xl bg-brand-purple px-5 py-3.5 font-serif text-lg font-bold text-brand-cream transition hover:bg-brand-purple-light active:translate-y-px"
          >
            Log another mistake
          </button>
          <button
            type="button"
            onClick={onGoToLog}
            className="flex-1 rounded-xl border-2 border-brand-purple/20 px-5 py-3.5 font-serif text-lg font-bold text-brand-purple transition hover:border-brand-purple"
          >
            See my log
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={`${CARD} p-6 sm:p-8`}>
      <h2 className="font-serif text-2xl font-bold text-brand-purple">Log a mistake</h2>
      <p className="mt-1 mb-6 text-sm text-brand-text/60">
        Straight after marking, while it still stings. Thirty seconds per mistake is all it takes.
      </p>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <div>
          <label htmlFor="el-subject" className={LABEL}>
            Subject <span className="text-brand-gold">*</span>
          </label>
          <input
            id="el-subject"
            type="text"
            list="el-subjects"
            maxLength={40}
            placeholder="e.g. Chemistry"
            className={`${INPUT} mb-4`}
            value={draft.subject}
            onChange={(e) => set('subject', e.target.value)}
          />
          <datalist id="el-subjects">
            {knownSubjects.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="el-topic" className={LABEL}>
            Topic
          </label>
          <input
            id="el-topic"
            type="text"
            maxLength={50}
            placeholder="e.g. Electrolysis"
            className={`${INPUT} mb-4`}
            value={draft.topic}
            onChange={(e) => set('topic', e.target.value)}
          />
        </div>
      </div>

      <label htmlFor="el-what" className={LABEL}>
        What went wrong <span className="text-brand-gold">*</span>
      </label>
      <textarea
        id="el-what"
        ref={whatRef}
        rows={3}
        maxLength={500}
        placeholder="What did the question ask, and what did you write? e.g. 6 marker on electrolysis of brine. I wrote about the wrong electrode and never mentioned the half equations."
        className={`${INPUT} mb-4 resize-y`}
        value={draft.what}
        onChange={(e) => set('what', e.target.value)}
      />

      <label htmlFor="el-fix" className={LABEL}>
        The fix, in your own words <span className="text-brand-gold">*</span>
      </label>
      <textarea
        id="el-fix"
        rows={3}
        maxLength={800}
        placeholder="The right answer or method, written so future you can retest from it. If you can't write this bit yet, that's the revision task."
        className={`${INPUT} mb-1 resize-y`}
        value={draft.fix}
        onChange={(e) => set('fix', e.target.value)}
      />
      <p className="mb-5 text-[13px] text-brand-text/55">
        Copying the mark scheme word for word is allowed. Understanding it enough to rewrite it is better.
      </p>

      {/* The taxonomy: pick the tier that caused it */}
      <fieldset className="mb-1">
        <legend className={LABEL}>
          Why did it happen? <span className="text-brand-gold">*</span>
        </legend>
        <p className="mb-3 text-[13px] text-brand-text/55">
          Tag the cause, not the topic. Two students can drop the same mark for opposite reasons, and the fixes are
          different.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIER_ORDER.map((id) => {
            const t = TIERS[id]
            const active = draft.tier === id
            return (
              <label
                key={id}
                className={`cursor-pointer rounded-xl border-2 p-3.5 transition focus-within:ring-2 focus-within:ring-brand-purple/40 ${
                  active ? 'border-brand-purple bg-brand-purple/[0.04]' : 'border-brand-purple/10 bg-white hover:border-brand-purple/35'
                }`}
                style={active ? { borderColor: t.bg } : undefined}
              >
                <input
                  type="radio"
                  name="el-tier"
                  className="sr-only"
                  checked={active}
                  onChange={() => pickTier(id)}
                />
                <span className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold"
                    style={{ background: t.bg, color: t.fg }}
                  >
                    {t.n}
                  </span>
                  <span className="font-semibold text-brand-purple">{t.label}</span>
                </span>
                <span className="mt-1.5 block text-[13px] leading-snug text-brand-text/70">&ldquo;{t.strap}&rdquo;</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Ten-second diagnosis for students who can't tell yet */}
      {!draft.tier && (
        <div className="mt-3 rounded-xl bg-brand-cream p-4">
          {!helperOpen ? (
            <button
              type="button"
              onClick={() => {
                setHelperOpen(true)
                setHelperStep(0)
              }}
              className="text-sm font-semibold text-brand-purple underline decoration-brand-gold/60 underline-offset-4 transition hover:text-brand-gold"
            >
              Not sure which one? Diagnose it in ten seconds →
            </button>
          ) : (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-purple/50">
                Question {helperStep + 1} of {HELPER_STEPS.length}
              </p>
              <p className="mt-1 font-semibold text-brand-purple">{HELPER_STEPS[helperStep].q}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                {HELPER_STEPS[helperStep].options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      if (opt.tier) pickTier(opt.tier)
                      else setHelperStep((s) => s + 1)
                    }}
                    className="flex-1 rounded-lg border border-brand-purple/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand-purple transition hover:border-brand-purple hover:bg-brand-purple hover:text-brand-cream"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sharper cause within the chosen tier */}
      {draft.tier && (
        <div className="mt-3 rounded-xl p-4" style={{ background: TIERS[draft.tier].tint }}>
          <p className="text-[13px] leading-relaxed text-brand-text/75">{TIERS[draft.tier].test}</p>
          <p className="mt-3 mb-2 text-sm font-semibold text-brand-purple">Pin it down further, if you can:</p>
          <div className="flex flex-wrap gap-1.5">
            {TIERS[draft.tier].causes.map((c) => {
              const active = draft.cause === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => set('cause', active ? undefined : c.id)}
                  className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${
                    active
                      ? 'border-brand-purple bg-brand-purple text-brand-cream'
                      : 'border-brand-purple/20 bg-white text-brand-purple hover:border-brand-purple'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-x-5 sm:grid-cols-2">
        <div>
          <label htmlFor="el-marks" className={LABEL}>
            Marks it cost
          </label>
          <input
            id="el-marks"
            type="number"
            min={1}
            max={50}
            step={1}
            placeholder="Optional"
            className={`${INPUT} mb-4`}
            value={draft.marks}
            onChange={(e) => set('marks', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="el-source" className={LABEL}>
            Where it happened
          </label>
          <select
            id="el-source"
            className={`${INPUT} mb-4`}
            value={draft.source}
            onChange={(e) => set('source', e.target.value as SourceId)}
          >
            {SOURCES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          ref={errorsRef}
          tabIndex={-1}
          role="alert"
          className="mb-4 rounded-xl border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <strong className="mb-1 block">Nearly there. Fix these first:</strong>
          <ul className="list-disc pl-5">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={save}
        className="w-full rounded-xl bg-brand-purple px-6 py-4 font-serif text-lg font-bold tracking-wide text-brand-cream shadow-lg shadow-brand-purple/20 transition hover:bg-brand-purple-light active:translate-y-px"
      >
        Bank This Mistake →
      </button>
      <p className="mt-2.5 text-center text-[13px] text-brand-text/50">
        It gets a retest date the moment you log it: 3 days, then 1 week, 2 weeks, 1 month.
      </p>
    </section>
  )
}
