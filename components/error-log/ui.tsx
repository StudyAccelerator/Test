/* Shared style tokens and small pieces for the error log UI. Matches the
   tracker's design language so the free tools read as one family. */

import { TIERS, type TierId } from '@/lib/error-log/taxonomy'

export const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'
export const INPUT =
  'w-full rounded-lg border border-brand-purple/15 bg-white px-3.5 py-2.5 text-[15px] text-brand-text transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/15'
export const LABEL = 'block text-sm font-semibold text-brand-purple mb-1.5'
export const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/60'

/* The coloured tier tag shown on cards, queue items and the print sheet */
export function TierBadge({ tier, size = 'md' }: { tier: TierId; size?: 'sm' | 'md' }) {
  const t = TIERS[tier]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-[12px]'
      }`}
      style={{ background: t.bg, color: t.fg }}
    >
      <span className="font-mono text-[0.85em] uppercase tracking-wide opacity-80">Tier {t.n}</span>
      {t.label}
    </span>
  )
}

export function StatTile({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/10">
      <p className="font-serif text-3xl font-bold text-brand-cream">{value}</p>
      <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide text-brand-cream/70">{label}</p>
      {sub && <p className="mt-1 text-[11px] leading-snug text-brand-cream/55">{sub}</p>}
    </div>
  )
}

/* Common A-level subjects for the datalist; free text always allowed */
export const SUBJECT_SUGGESTIONS = [
  'Biology',
  'Chemistry',
  'Physics',
  'Maths',
  'Further Maths',
  'Psychology',
  'Economics',
  'Business',
  'History',
  'Geography',
  'English Literature',
  'Sociology',
  'Computer Science',
  'Politics',
  'Religious Studies',
]
