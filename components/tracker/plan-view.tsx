'use client'

import { useMemo, useState, type RefObject } from 'react'
import { diagnosisLine, DAY_NAMES, type PlanResult, type PlacedEvent } from '@/lib/tracker/engine'
import { subjectDotMap, toHHMM, type TrackerForm } from '@/lib/tracker/form'
import { RATINGS, TECHNIQUES, type SessionType } from '@/lib/tracker/techniques'
import { renderPlanImage } from './plan-image'

const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'

const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const isSession = (kind: PlacedEvent['kind']): kind is SessionType =>
  kind === 'blurt' || kind === 'recall' || kind === 'review' || kind === 'paper'

function fmtRange(ev: PlacedEvent) {
  return `${toHHMM(ev.startMin)} to ${toHHMM(ev.endMin)}`
}

function hours(mins: number) {
  const h = Math.round(mins / 30) / 2
  return `${h} hour${h === 1 ? '' : 's'}`
}

/* ---------- semantic day cards (mobile view + screen reader source) ---------- */

function DayCards({
  plan,
  dots,
  selected,
  onSelect,
  mode = 'tabs',
}: {
  plan: PlanResult
  dots: Map<string, string>
  selected?: number
  onSelect?: (d: number) => void
  mode?: 'tabs' | 'list'
}) {
  return (
    <div>
      {mode === 'tabs' && (
      <div role="tablist" aria-label="Day of the week" className="mb-4 grid grid-cols-7 gap-1">
        {plan.days.map((day) => {
          const count = day.events.filter((e) => isSession(e.kind) || e.kind === 'freestyle').length
          const active = day.dayIndex === selected
          return (
            <button
              key={day.dayIndex}
              role="tab"
              aria-selected={active}
              aria-controls={`day-panel-${day.dayIndex}`}
              onClick={() => onSelect?.(day.dayIndex)}
              className={`flex min-h-[52px] flex-col items-center justify-center rounded-lg border text-[13px] font-bold transition ${
                active
                  ? 'border-brand-purple bg-brand-purple text-brand-cream'
                  : 'border-brand-purple/15 bg-white text-brand-purple/70'
              }`}
            >
              {DAY_SHORT[day.dayIndex]}
              <span className={`text-[10px] font-normal ${active ? 'text-brand-gold' : 'text-brand-text/45'}`}>
                {count === 0 ? 'rest' : count}
              </span>
            </button>
          )
        })}
      </div>
      )}
      {plan.days.map((day) => {
        const hasStudy = day.events.some((e) => isSession(e.kind) || e.kind === 'freestyle')
        const sessions = hasStudy ? day.events.filter((e) => e.kind !== 'free') : []
        return (
          <section
            key={day.dayIndex}
            id={mode === 'tabs' ? `day-panel-${day.dayIndex}` : undefined}
            role={mode === 'tabs' ? 'tabpanel' : undefined}
            aria-label={day.dayName}
            hidden={mode === 'tabs' && day.dayIndex !== selected}
            className={mode === 'list' ? 'mb-5' : undefined}
          >
            <h3 className="mb-3 font-serif text-xl font-bold text-brand-purple">
              {day.dayName}
              <span className="ml-2 font-mono text-[11px] font-normal uppercase tracking-[0.15em] text-brand-purple/50">
                {day.studyMins > 0 ? `${hours(day.studyMins)} of study` : 'rest day'}
              </span>
            </h3>
            {!hasStudy && (
              <p className="rounded-xl border border-dashed border-brand-purple/20 bg-white px-4 py-5 text-center text-sm text-brand-text/55">
                Nothing scheduled. Rest is part of the system, not a reward.
              </p>
            )}
            <ul className="space-y-2">
              {sessions.map((ev, i) => {
                if (isSession(ev.kind)) {
                  const tech = TECHNIQUES[ev.kind]
                  return (
                    <li key={i} className={`${CARD} p-4`} style={{ background: tech.tint }}>
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                          style={{ background: tech.bg, color: tech.fg }}
                        >
                          {tech.label} · {tech.mins} min
                        </span>
                        <span className="font-mono text-[11px] text-brand-purple/60">{fmtRange(ev)}</span>
                      </div>
                      <p className="text-[15px] font-bold text-brand-purple">
                        <span
                          aria-hidden="true"
                          className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                          style={{ background: dots.get(ev.subject || '') || '#fff' }}
                        />
                        {ev.subject}: {ev.topic}
                      </p>
                      <p className="mt-0.5 text-[13px] text-brand-text/60">{tech.strap}</p>
                    </li>
                  )
                }
                if (ev.kind === 'freestyle') {
                  return (
                    <li key={i} className="rounded-2xl border-2 border-dashed border-brand-purple/30 bg-white p-4">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="rounded-full border border-brand-purple/30 px-2.5 py-0.5 text-[11px] font-bold text-brand-purple">
                          Freestyle · 60 min
                        </span>
                        <span className="font-mono text-[11px] text-brand-purple/60">{fmtRange(ev)}</span>
                      </div>
                      <p className="text-[15px] font-bold text-brand-purple">Optional hour. Your call.</p>
                      <p className="mt-0.5 text-[13px] text-brand-text/60">
                        Light work on any subject, any method. Flashcards, a past paper question, tidying a topic. Or a
                        proper break if you're spent. No guilt either way.
                      </p>
                    </li>
                  )
                }
                return (
                  <li
                    key={i}
                    className={`flex items-center justify-between rounded-lg px-4 py-2 text-[13px] ${
                      ev.kind === 'fixed' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-brand-cream text-brand-text/60'
                    }`}
                  >
                    <span className="font-semibold">{ev.label}</span>
                    <span className="font-mono text-[11px]">{fmtRange(ev)}</span>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

/* ---------- desktop timeline grid (visual projection, aria-hidden) ---------- */

function WeekGrid({ plan, dots }: { plan: PlanResult; dots: Map<string, string> }) {
  const PX = 1.05
  const starts = plan.days.flatMap((d) => d.events.map((e) => e.startMin))
  const start = starts.length ? Math.min(...starts) : 420
  const end = Math.max(...plan.days.flatMap((d) => d.events.map((e) => e.endMin)), start + 60)
  const totalH = Math.round((end - start) * PX)
  const startHour = Math.ceil(start / 60)
  const endHour = Math.floor(end / 60)

  return (
    <div aria-hidden="true" className="overflow-x-auto rounded-b-2xl bg-white p-2">
      <div className="min-w-[860px]">
        <div className="flex border-b-2 border-brand-cream">
          <div className="w-12 shrink-0" />
          {plan.days.map((d) => (
            <div
              key={d.dayIndex}
              className="mx-px flex-1 rounded-t-md bg-brand-purple py-2 text-center font-serif text-xs font-bold uppercase tracking-[0.1em] text-brand-cream"
            >
              {DAY_SHORT[d.dayIndex]}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="relative w-12 shrink-0" style={{ height: totalH }}>
            {Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i).map((h) => (
              <span
                key={h}
                className="absolute right-1.5 -translate-y-1/2 font-mono text-[10px] text-brand-text/40"
                style={{ top: Math.max(6, Math.round((h * 60 - start) * PX)) }}
              >
                {String(((h % 24) + 24) % 24).padStart(2, '0')}:00
              </span>
            ))}
          </div>
          {plan.days.map((d) => (
            <div key={d.dayIndex} className="relative mx-px flex-1 bg-[#FBFAF6]" style={{ height: totalH }}>
              {Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i).map((h) => (
                <div
                  key={h}
                  className="absolute inset-x-0 h-px bg-brand-purple/10"
                  style={{ top: Math.round((h * 60 - start) * PX) }}
                />
              ))}
              {d.events.map((ev, i) => {
                const top = Math.round((ev.startMin - start) * PX)
                const height = Math.max(16, Math.round((ev.endMin - ev.startMin) * PX))
                if (isSession(ev.kind)) {
                  const tech = TECHNIQUES[ev.kind]
                  return (
                    <div
                      key={i}
                      className="absolute inset-x-0.5 overflow-hidden rounded px-1.5 py-1 leading-tight"
                      style={{ top, height, background: tech.bg, color: tech.fg }}
                    >
                      {height >= 34 && <span className="block text-[9px] opacity-75">{fmtRange(ev)}</span>}
                      <span className="block text-[11px] font-bold">
                        <span
                          className="mr-1 inline-block h-1.5 w-1.5 rounded-full ring-1 ring-white/80"
                          style={{ background: dots.get(ev.subject || '') || '#fff' }}
                        />
                        {tech.shortLabel}: {ev.subject}
                      </span>
                      {height >= 52 && <span className="block text-[10px] opacity-80">{ev.topic}</span>}
                    </div>
                  )
                }
                const style =
                  ev.kind === 'fixed'
                    ? 'bg-[#A0A0B8] text-white'
                    : ev.kind === 'freestyle'
                      ? 'border-2 border-dashed border-brand-purple/40 bg-brand-purple/5 font-bold text-brand-purple'
                      : ev.kind === 'free'
                        ? 'border border-dashed border-brand-purple/20 text-brand-text/40 italic'
                        : 'bg-brand-cream-dark text-brand-text/60'
                return (
                  <div
                    key={i}
                    className={`absolute inset-x-0.5 overflow-hidden rounded px-1.5 py-1 text-[10px] leading-tight ${style}`}
                    style={{ top, height }}
                  >
                    {ev.label}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- print sheet: A4 landscape, greyscale safe ---------- */

function PrintSheet({ plan, form, diagnosis }: { plan: PlanResult; form: TrackerForm; diagnosis: string }) {
  return (
    <div id="tracker-print" className="hidden print:block">
      <div className="mb-2 flex items-baseline justify-between border-b-2 border-brand-purple pb-1.5">
        <h2 className="font-serif text-xl font-bold text-brand-purple">
          {form.name.trim() ? `${form.name.trim()}'s` : 'My'} Revision Week
        </h2>
        <span className="text-[10px] text-brand-text/60">
          {plan.sessionCount} sessions · {hours(plan.usedStudyMins)} of focused study · weakest topics first
        </span>
      </div>
      <p className="mb-2 text-[11px] text-brand-text/80">{diagnosis}</p>
      <div className="grid grid-cols-7 gap-1">
        {plan.days.map((day) => (
          <div key={day.dayIndex}>
            <div className="mb-1 bg-brand-purple py-0.5 text-center font-serif text-[10px] font-bold uppercase tracking-wide text-white">
              {DAY_SHORT[day.dayIndex]}
            </div>
            {day.events
              .filter((e) => e.kind !== 'free' && e.kind !== 'break' && e.kind !== 'meal')
              .map((ev, i) => {
                if (isSession(ev.kind)) {
                  const tech = TECHNIQUES[ev.kind]
                  return (
                    <div
                      key={i}
                      className="mb-1 px-1 py-0.5 text-[8.5px] leading-tight"
                      style={{
                        borderLeft: `3px ${tech.edge} #2E2557`,
                        background: tech.tint,
                      }}
                    >
                      <span className="block font-bold">
                        {toHHMM(ev.startMin)} {tech.shortLabel} · {tech.mins}m
                      </span>
                      <span className="block">
                        {ev.subject}: {ev.topic}
                      </span>
                    </div>
                  )
                }
                if (ev.kind === 'freestyle') {
                  return (
                    <div key={i} className="mb-1 border border-dashed border-brand-purple/50 px-1 py-0.5 text-[8.5px] leading-tight text-brand-purple">
                      <span className="block font-bold">{toHHMM(ev.startMin)} Freestyle · 60m</span>
                      <span className="block">Your call: any subject, any method</span>
                    </div>
                  )
                }
                return (
                  <div key={i} className="mb-1 border-l-[3px] border-brand-text/25 bg-black/5 px-1 py-0.5 text-[8px] leading-tight text-brand-text/70">
                    {toHHMM(ev.startMin)} {ev.label}
                  </div>
                )
              })}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2 border-t border-brand-purple/30 pt-1.5">
        {(Object.keys(TECHNIQUES) as SessionType[]).map((k) => {
          const tech = TECHNIQUES[k]
          return (
            <div key={k} className="text-[8.5px] leading-snug" style={{ borderLeft: `3px ${tech.edge} #2E2557`, paddingLeft: 5 }}>
              <span className="font-bold">
                {tech.label} ({tech.mins} min).
              </span>{' '}
              {tech.strap} {tech.howTo[0]}
            </div>
          )
        })}
      </div>
      <p className="mt-1.5 text-center text-[8px] text-brand-text/50">
        Built free at alevelaccelerators.com/revision-tracker · A-Level Accelerators, founded by Dr Waleed Ahmad MBBS
      </p>
    </div>
  )
}

/* ---------- the full plan view ---------- */

export default function PlanView({
  plan,
  form,
  headingRef,
  onEdit,
}: {
  plan: PlanResult
  form: TrackerForm
  headingRef: RefObject<HTMLHeadingElement | null>
  onEdit: () => void
}) {
  const [selectedDay, setSelectedDay] = useState(() => (new Date().getDay() + 6) % 7)
  const [pngUrl, setPngUrl] = useState<string | null>(null)
  const diagnosis = useMemo(() => diagnosisLine(plan), [plan])
  const dots = useMemo(
    () => subjectDotMap(plan.scheduled.map((t) => t.subject)),
    [plan]
  )
  const starters = plan.scheduled.filter((t) => t.coverage === 'starter')
  const freestyleCount = plan.days.reduce(
    (sum, d) => sum + d.events.filter((e) => e.kind === 'freestyle').length,
    0
  )
  const counts = {
    struggling: plan.scheduled.filter((t) => t.rating === 'struggling').length,
    shaky: plan.scheduled.filter((t) => t.rating === 'shaky').length,
    solid: plan.scheduled.filter((t) => t.rating === 'solid').length,
  }

  async function downloadImage() {
    const url = await renderPlanImage(plan, form, diagnosis)
    setPngUrl(url)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(form.name.trim() || 'my').toLowerCase().replace(/\s+/g, '-')}-revision-week.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-16">
      {/* Header card */}
      <div className="print:hidden">
        <div className="rounded-t-2xl bg-brand-purple px-6 py-7 text-center sm:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Your personal plan</p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-1 font-serif text-3xl font-bold text-brand-cream outline-none sm:text-4xl">
            {form.name.trim() ? `${form.name.trim()}'s Week` : 'Your Week'}
          </h2>
          <p className="mt-2 text-sm text-brand-cream/75">
            {plan.sessionCount} sessions · {hours(plan.usedStudyMins)} of focused study · weakest topics first · every
            break protected
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-xl bg-white/10 px-4 py-3 text-[15px] leading-relaxed text-brand-cream">
            {diagnosis}
          </p>
        </div>

        {/* Desktop timeline (visual projection) with a screen reader day list */}
        <div className="hidden md:block">
          <WeekGrid plan={plan} dots={dots} />
        </div>
        <div className="sr-only hidden md:block">
          <DayCards plan={plan} dots={dots} mode="list" />
        </div>
        {/* Mobile day tabs */}
        <div className="rounded-b-2xl bg-white p-4 md:hidden">
          <DayCards plan={plan} dots={dots} selected={selectedDay} onSelect={setSelectedDay} />
        </div>

        {/* Actions */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={downloadImage}
            className="rounded-xl bg-brand-purple px-5 py-3.5 font-semibold text-brand-cream transition hover:bg-brand-purple-light"
          >
            Download as image
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl border-2 border-brand-purple px-5 py-3.5 font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
          >
            Print or save as PDF
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border-2 border-brand-purple/25 px-5 py-3.5 font-semibold text-brand-purple/80 transition hover:border-brand-purple hover:text-brand-purple"
          >
            ← Edit my answers
          </button>
        </div>
        {pngUrl && (
          <figure className="mt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pngUrl} alt="Your weekly revision plan as an image" className="w-full rounded-xl ring-1 ring-brand-purple/10" />
            <figcaption className="mt-2 text-center text-[13px] text-brand-text/55">
              On a phone? Press and hold the image, then save it to your photos. Print it and stick it on your wall.
            </figcaption>
          </figure>
        )}

        {/* Audit panel */}
        <section aria-labelledby="audit-heading" className={`${CARD} mt-8 p-6 sm:p-8`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/60">Your topic audit</p>
          <h3 id="audit-heading" className="mt-1 font-serif text-2xl font-bold text-brand-purple">
            Where your week went, and why
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(['struggling', 'shaky', 'solid'] as const).map((r) => (
              <div key={r} className="rounded-xl bg-brand-cream px-4 py-3">
                <p className="flex items-center gap-2 font-bold text-brand-purple">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: RATINGS[r].dot }} />
                  {counts[r]} {RATINGS[r].label.toLowerCase()}
                </p>
                <p className="mt-0.5 text-[13px] text-brand-text/60">
                  {r === 'struggling' && "Deep blocks plus double recall. That's where the marks are."}
                  {r === 'shaky' && 'A full cycle: blurt, recall, then a spaced review.'}
                  {r === 'solid' && 'Short recall sessions only, to keep them warm.'}
                </p>
              </div>
            ))}
          </div>
          {counts.solid > 0 && (
            <p className="mt-4 text-[15px] leading-relaxed text-brand-text/75">
              Your Solid topics get maintenance only, and that's deliberate. A 90 minute deep block on a topic you
              already know is low-yield work in disguise. That's where your saved hours come from.
            </p>
          )}
          {starters.length > 0 && (
            <p className="mt-3 text-[15px] leading-relaxed text-brand-text/75">
              {starters.length === 1 ? 'One topic' : `${starters.length} topics`} only just fit, so{' '}
              {starters.length === 1 ? 'it gets' : 'they get'}{' '}a starter cycle: the blurt and its next day recall
              happen this week, and the spaced review leads next week&apos;s plan. Starting a topic properly beats
              parking it.
            </p>
          )}
          {freestyleCount > 0 && (
            <p className="mt-3 text-[15px] leading-relaxed text-brand-text/75">
              {freestyleCount === 1 ? 'One optional Freestyle hour sits' : `${freestyleCount} optional Freestyle hours sit`}{' '}
              on top of your focused study: light work on anything you like, or a proper break if you need one. They can
              nudge a day past the cap, but only ever by that one hour.
            </p>
          )}
          {plan.papers.length > 0 && (
            <p className="mt-3 text-[15px] leading-relaxed text-brand-text/75">
              {plan.papers.length === 1 ? 'One subject also gets' : `${plan.papers.length} subjects also get`} a Timed
              Paper session: mixed past paper questions, clock running, mark scheme closed. Exams test recall under
              pressure, and the clock is part of the exam.
            </p>
          )}
          <p className="mt-3 text-[15px] leading-relaxed text-brand-text/75">
            One more rule: if a Solid topic goes badly in its recall session, it's Shaky on next week&apos;s audit.
            Rebuild this plan every week. The re-rating is the system.
          </p>

          {plan.parked.length > 0 && (
            <div className="mt-5 rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-4">
              <h4 className="font-serif text-lg font-bold text-brand-purple">Parked for next week</h4>
              <p className="mt-1 text-[14px] leading-relaxed text-brand-text/70">
                Your hours properly cover {plan.scheduled.length} topics, so these wait. That's triage, not failure.
                Cramming them in would wreck the ones that made the cut. They will lead next week&apos;s plan.
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {plan.parked.map((t) => (
                  <li
                    key={`${t.subject}|${t.topic}`}
                    className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-brand-purple ring-1 ring-brand-purple/15"
                  >
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: RATINGS[t.rating].dot }} />
                    {t.subject}: {t.topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Method cards */}
        <section aria-labelledby="method-heading" className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/60">How to run each session</p>
          <h3 id="method-heading" className="mt-1 mb-4 font-serif text-2xl font-bold text-brand-purple">
            The plan only works if the sessions do
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(TECHNIQUES) as SessionType[]).map((k) => {
              const tech = TECHNIQUES[k]
              return (
                <article key={k} className={`${CARD} flex flex-col p-6`}>
                  <span
                    className="self-start rounded-full px-3 py-1 text-[12px] font-bold"
                    style={{ background: tech.bg, color: tech.fg }}
                  >
                    {tech.label} · {tech.mins} min
                  </span>
                  <p className="mt-3 font-serif text-lg font-bold text-brand-purple">{tech.strap}</p>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[14px] leading-relaxed text-brand-text/75">
                    {tech.howTo.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {k === 'blurt' && (
                    <a
                      href="/A-Level-Accelerators-Blurting-Template.pdf"
                      className="mt-3 text-[14px] font-semibold text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-2 hover:text-brand-purple-light"
                    >
                      Grab the free blurting template (PDF)
                    </a>
                  )}
                </article>
              )
            })}
          </div>
          <p className="mt-4 text-[13px] text-brand-text/55">
            Why these three? Testing yourself beats re-reading, and spacing beats cramming. That's decades of memory
            research, and it's the whole design of this week.
          </p>
        </section>

        {/* Soft CTA */}
        <section className={`${CARD} mt-8 border-t-4 border-brand-gold p-6 text-center sm:p-8`}>
          <p className="mx-auto max-w-xl font-serif text-xl font-bold text-brand-purple">
            This plan tells you what to fix. The Summer Accelerator is where we fix it, live.
          </p>
          <a
            href="/summer-accelerators"
            className="mt-4 inline-block rounded-xl bg-brand-purple px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-purple-light"
          >
            See the Summer Accelerator
          </a>
          <p className="mt-3 text-[13px] text-brand-text/55">
            Or{' '}
            <a
              href="https://scheduler.zoom.us/dr-waleed-ahmad/a-level"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-2"
            >
              book a free call
            </a>{' '}
            and we&apos;ll look at your audit together.
          </p>
        </section>
      </div>

      <PrintSheet plan={plan} form={form} diagnosis={diagnosis} />

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0.8cm; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  )
}
