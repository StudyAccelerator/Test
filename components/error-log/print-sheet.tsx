/* The paper version of today's retests: prompts up front, fixes overleaf, so
   a student can retest at a desk with the answers genuinely out of sight.
   Hidden on screen; becomes the only visible thing when printing. */

import { TIERS } from '@/lib/error-log/taxonomy'
import { fromKey, type Mistake } from '@/lib/error-log/engine'

const EDGE_STYLE: Record<string, string> = {
  solid: '4px solid',
  dashed: '4px dashed',
  dotted: '4px dotted',
  double: '6px double',
}

function longDate(key: string): string {
  return fromKey(key).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PrintSheet({ due, todayKey }: { due: Mistake[]; todayKey: string }) {
  if (due.length === 0) return null
  return (
    <div className="hidden print:block">
      <div className="mb-6 flex items-baseline justify-between border-b-2 border-brand-purple pb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-purple/60">
            A-Level Accelerators · The Error Log
          </p>
          <h1 className="font-serif text-2xl font-bold text-brand-purple">Retest sheet · {longDate(todayKey)}</h1>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wide text-brand-purple/50">
          {due.length} retest{due.length === 1 ? '' : 's'}
        </p>
      </div>

      <p className="mb-5 text-[13px] leading-relaxed text-brand-text/70">
        Answer each one from memory in the space below it. No notes, no peeking: the fixes are on the last page. Mark
        yourself honestly against them, then log each result back in the tool so the schedule stays true.
      </p>

      <ol className="space-y-5">
        {due.map((m, i) => {
          const t = TIERS[m.tier]
          return (
            <li
              key={m.id}
              className="break-inside-avoid pl-4"
              style={{ borderLeft: `${EDGE_STYLE[t.edge]} ${t.bg}` }}
            >
              <p className="text-[12px] font-bold text-brand-purple">
                {i + 1}. {m.subject}
                {m.topic ? ` · ${m.topic}` : ''}{' '}
                <span className="font-mono text-[10px] font-normal uppercase tracking-wide text-brand-purple/55">
                  · Tier {t.n} {t.label}
                </span>
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-brand-text/85">{m.what}</p>
              <div className="mt-3 space-y-5">
                <div className="border-b border-brand-purple/25" />
                <div className="border-b border-brand-purple/25" />
                <div className="border-b border-brand-purple/25" />
              </div>
            </li>
          )
        })}
      </ol>

      <div style={{ breakBefore: 'page' }}>
        <h2 className="mb-1 mt-6 font-serif text-xl font-bold text-brand-purple">The fixes</h2>
        <p className="mb-4 text-[12px] text-brand-text/60">
          Only after you&apos;ve answered everything overleaf. Right from memory moves a mistake up the ladder; wrong
          sends it back to the start. Be the harsh examiner.
        </p>
        <ol className="space-y-3">
          {due.map((m, i) => (
            <li key={m.id} className="break-inside-avoid text-[12px] leading-relaxed text-brand-text/85">
              <strong className="text-brand-purple">
                {i + 1}. {m.subject}
                {m.topic ? ` · ${m.topic}` : ''}:
              </strong>{' '}
              {m.fix}
            </li>
          ))}
        </ol>
        <p className="mt-8 border-t border-brand-purple/20 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-brand-purple/50">
          alevelaccelerators.com/error-log
        </p>
      </div>
    </div>
  )
}
