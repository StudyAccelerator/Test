/* The built-in guide: how to run an error log properly, for students who have
   never kept one. Server-rendered, below the app. Reads the taxonomy so the
   teaching and the tool can never disagree. */

import { LADDER_LABELS, RETEST_LADDER, TIERS, TIER_ORDER } from '@/lib/error-log/taxonomy'
import { CARD, EYEBROW, TierBadge } from './ui'

export const GUIDE_FAQS = [
  {
    q: 'What counts as a mistake worth logging?',
    a: 'Every mark you dropped in marked work: past papers, homework, class tests, mocks. Not just the disasters. If you would shrug and call something a silly mistake, log it anyway, because silly is usually exam craft, and exam craft mistakes repeat until you train them out. The only things not worth logging are marks you lost on content your teacher has not covered yet.',
  },
  {
    q: 'How is this different from making notes on my wrong answers?',
    a: 'Notes get read; a log gets retested. Reading your corrections feels productive and moves almost nothing, because recognising a fix is not the same as producing it under pressure. The log brings each mistake back at 3 days, 1 week, 2 weeks and 1 month, and makes you answer from memory before you see the fix. That retrieval is what closes the gap.',
  },
  {
    q: 'How many mistakes should I be logging?',
    a: 'After a properly marked past paper, expect a good handful per subject. An empty log almost never means error-free work. It usually means work that is not being marked harshly, or not being marked at all. Thirty seconds per mistake is the going rate, so a full paper costs you a few minutes of logging.',
  },
  {
    q: 'What if I keep getting the same mistake wrong?',
    a: 'Then the log is doing its job: it keeps coming back until you beat it four times in a row. If a mistake bounces back to the start twice, stop and treat it differently. The fix you wrote is not good enough yet. Rewrite it, get the idea explained properly, and give that topic a full revision session this week rather than another quick retest.',
  },
]

export default function Guide() {
  return (
    <section id="how-to" className="px-5 pb-4 pt-2 print:hidden">
      <div className="mx-auto max-w-3xl">
        <div className={`${CARD} p-6 sm:p-10`}>
          <p className={EYEBROW}>The method</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-brand-purple">How to run an error log properly</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-text/75">
            In medicine we have a saying: the scan is only as good as the follow-up. Finding the problem changes
            nothing on its own. Most students treat mistakes the way I treated my first timetable: a bad feeling, a
            quick look at the right answer, move on. The mark stays lost, and it gets lost again in the real exam.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-text/75">
            An error log flips that. Wrong answers are the highest-yield revision material you own, because each one
            is a mark you personally, provably lose. This tool keeps the log for you and does the part almost nobody
            does by hand: it brings every mistake back at the right moment, and makes you re-answer it from memory.
          </p>

          {/* The routine */}
          <h3 className="mt-8 font-serif text-xl font-bold text-brand-purple">The routine, start to finish</h3>
          <ol className="mt-4 space-y-3">
            {[
              [
                'Mark your work harshly',
                'Past paper, homework, class test: marked against the real mark scheme, like the examiner who does not know you. Every dropped mark is raw material.',
              ],
              [
                'Log it while it stings',
                'Straight after marking, thirty seconds per mistake: what the question asked, what you did, and the fix written in your own words.',
              ],
              [
                'Tag the cause, not the topic',
                'Two students drop the same mark for opposite reasons: one never knew it, one knew it and ran out of time. Same mark, different disease, different treatment. The four causes below are the ones I teach.',
              ],
              [
                'Turn up when the retests are due',
                'The tool schedules each mistake back at 3 days, 1 week, 2 weeks and 1 month. Answer from memory first, then reveal your fix and mark yourself honestly. Four passes in a row and it is mastered. One fail and the ladder restarts.',
              ],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold font-serif text-lg font-bold text-brand-purple"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-brand-purple">{title}</p>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-brand-text/70">{body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* The taxonomy */}
          <h3 className="mt-9 font-serif text-xl font-bold text-brand-purple">The four causes, and what each one needs</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-text/70">
            These are the four tiers I teach my own students: content and understanding, recall, application, and the
            exam itself. Diagnose before you treat; the tag decides the treatment.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TIER_ORDER.map((id) => {
              const t = TIERS[id]
              return (
                <div key={id} className="rounded-xl p-4" style={{ background: t.tint }}>
                  <TierBadge tier={id} size="sm" />
                  <p className="mt-2.5 text-[14px] font-semibold leading-snug text-brand-purple">
                    &ldquo;{t.strap}&rdquo;
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-brand-text/70">{t.fix}</p>
                </div>
              )
            })}
          </div>

          {/* Worked example */}
          <h3 className="mt-9 font-serif text-xl font-bold text-brand-purple">What a good entry looks like</h3>
          <div className="mt-4 rounded-xl border border-brand-purple/10 bg-brand-cream p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-brand-purple">Biology</span>
              <span className="text-brand-text/60">· Cardiac cycle</span>
              <TierBadge tier="application" size="sm" />
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-brand-purple/70 ring-1 ring-brand-purple/10">
                3 marks · past paper
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-brand-text/80">
              <strong className="text-brand-purple/80">What went wrong:</strong> 5 marker on pressure changes in the
              cardiac cycle. I described the valves opening and closing but never explained why, so I got 2 of 5.
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-brand-text/80">
              <strong className="text-brand-purple/80">The fix:</strong> Valves are pressure operated, and every mark
              wants a pressure comparison. Atrioventricular valves open when atrial pressure rises above ventricular
              pressure, and shut when the ventricles contract and reverse it. Semilunar valves open when ventricular
              pressure beats the pressure in the arteries. Describe the change, then give the because.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-brand-text/55">
              Notice what makes it retestable: the question is specific, the fix is complete enough to mark yourself
              against, and the tag is the cause (knew it, could not use it) rather than the topic.
            </p>
          </div>

          {/* The schedule, explained */}
          <h3 className="mt-9 font-serif text-xl font-bold text-brand-purple">Why those review dates</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-text/70">
            Memory fades on a curve, so the retests land just as each fix would otherwise slip away:{' '}
            {RETEST_LADDER.join(', ').replace(/, (\d+)$/, ' and then $1')} days, each gap roughly doubling. Redo it
            three days later, retest the log weekly, then stretch it out. Pass all four from memory and the fix has
            survived a month of forgetting; that is what mastered means here. Fail one and the clock honestly starts
            again.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {LADDER_LABELS.map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                <span className="rounded-full bg-brand-purple px-3 py-1.5 text-[12px] font-bold text-brand-cream">
                  {label}
                </span>
                {i < LADDER_LABELS.length - 1 && (
                  <span aria-hidden="true" className="text-brand-purple/40">
                    →
                  </span>
                )}
              </span>
            ))}
            <span aria-hidden="true" className="text-brand-purple/40">
              →
            </span>
            <span className="rounded-full bg-emerald-700 px-3 py-1.5 text-[12px] font-bold text-white">Mastered</span>
          </div>

          {/* FAQs */}
          <h3 className="mt-9 font-serif text-xl font-bold text-brand-purple">Questions students actually ask</h3>
          <div className="mt-4 space-y-4">
            {GUIDE_FAQS.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-brand-purple">{f.q}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-brand-text/70">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
