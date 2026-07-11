'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { capacitySummary, planWeek, weeklyFreeMins, DAY_NAMES, type PlanResult } from '@/lib/tracker/engine'
import {
  buildWeekSettings,
  collectTopics,
  loadState,
  saveState,
  sleepDurationMins,
  DEFAULT_FORM,
  MAX_TOPICS_PER_SUBJECT,
  TOPIC_PLACEHOLDERS,
  YEAR_GROUPS,
  type CommitmentForm,
  type SubjectForm,
  type TrackerForm,
} from '@/lib/tracker/form'
import { RATINGS, type Rating } from '@/lib/tracker/techniques'
import PlanView from './plan-view'

/* MailerLite direct integration: do not change the endpoint, key, group or
   fields. The revision tracker email automation hangs off this exact group. */
const ML_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjUzMWQ4MTgyNzM5NmM3MTViZDVjN2ZhZDY5ZTYxMjNiYzZjMTViNjM1Y2Q3YjkwODI4YWY1YjlmMzgwYjE4Yjg5MmQ0N2FmM2M3YTM0ZWYiLCJpYXQiOjE3Nzg1MTIzODEuMjUwMjI2LCJuYmYiOjE3Nzg1MTIzODEuMjUwMjI5LCJleHAiOjQ5MzQxODU5ODEuMjQ2MjY1LCJzdWIiOiIyMTMxNzg2Iiwic2NvcGVzIjpbXX0.QQkqYoMhCzwoGI4g3LfZWhiGWZ_dWxGfQOrNfebTqL4R7OKHgpaEduW-J9AAdhWo2_bsRpKvi6NnVJA_rdeTPQUBnCmmXcvzahU4bVx7_Ulff0Ld_8_8a5boETdU3UrKTWMCjdXQkmpJ-1TiM5_Mi4iLOpB0vvPvG_U3Cya_ORnGsTSyDv5qQ7MQHqjytbaZ0R_aRWDA1-emMFymr2dXOv-iOW1Dly1dflxrIo6Yb0BPA-v6Chs4TjlHdEvwFvSRgzZAATN9dDSjGENQbhQIFmuUGQ00HiP1xsmS6qKaCU__iARC8z91GZyrbcf0m9ryHNhkScckYMoGu1sYIC9Hm2Wj_BKpI970L0-CAT5dDpolTbTd8absVHR3UOxuiWZSEHVcumvtPsZ6K5GP0zQ_ccFlMaqLrPs7o80wy9DWt97fDZ8_KuScHY20zKSG-beSojlzuUXXj4rpH33-9PeJ4puXIMirOWzsKJIaEEckRDumvyhawrliPhHMwelKhgpCxMZlA_Bc3-nwZMDiEZf_CtXgXOkzUSkJohkboZBELdeLOrv83EPRhpHXahEyZkOhURucBLtb5Fs0lFIkLKeI-RXAz_7TPByqlHkcxZV8xObgZpqtCGVd1q8oI2pwrD7D85H4i5wP70q-Lsv8BZl_G8RTosjdYckZn0nXlOTjehM'
const ML_GROUP_ID = '187183128836573106'

const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'
const INPUT =
  'w-full rounded-lg border border-brand-purple/15 bg-white px-3.5 py-2.5 text-[15px] text-brand-text transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/15'
const LABEL = 'block text-sm font-semibold text-brand-purple mb-1.5'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/60'

let nextId = 1
const newId = () => nextId++

function StepCard({
  step,
  title,
  subtitle,
  children,
}: {
  step: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={`step-${step}-heading`} className={`${CARD} relative p-6 sm:p-8 mb-6`}>
      <div className="flex items-baseline gap-3 mb-1">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 translate-y-1 items-center justify-center rounded-full bg-brand-gold font-serif text-lg font-bold text-brand-purple"
        >
          {step}
        </span>
        <h2 id={`step-${step}-heading`} className="font-serif text-2xl font-bold text-brand-purple">
          {title}
        </h2>
      </div>
      <p className="text-sm text-brand-text/60 mb-6 sm:ml-11">{subtitle}</p>
      <div className="sm:ml-11">{children}</div>
    </section>
  )
}

function RatingControl({
  groupName,
  topicName,
  value,
  onChange,
}: {
  groupName: string
  topicName: string
  value: Rating
  onChange: (r: Rating) => void
}) {
  return (
    <fieldset className="mt-2">
      <legend className="sr-only">How is {topicName || 'this topic'} going?</legend>
      <div className="grid grid-cols-3 gap-1.5">
        {(Object.keys(RATINGS) as Rating[]).map((r) => {
          const meta = RATINGS[r]
          const active = value === r
          return (
            <label
              key={r}
              className={`flex min-h-[44px] cursor-pointer flex-col items-center justify-center rounded-lg border px-1 py-1.5 text-center transition focus-within:ring-2 focus-within:ring-brand-purple/40 ${
                active
                  ? 'border-brand-purple bg-brand-purple text-brand-cream'
                  : 'border-brand-purple/15 bg-white text-brand-text/70 hover:border-brand-purple/40'
              }`}
            >
              <input
                type="radio"
                name={groupName}
                className="sr-only"
                checked={active}
                onChange={() => onChange(r)}
              />
              <span className="flex items-center gap-1 text-[12px] font-bold leading-tight sm:gap-1.5 sm:text-[13px]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: meta.dot }} />
                {meta.label}
              </span>
              <span className={`text-[10px] leading-tight ${active ? 'text-brand-cream/70' : 'text-brand-text/45'}`}>
                {meta.strap}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function TrackerApp() {
  const [form, setForm] = useState<TrackerForm>(DEFAULT_FORM)
  const [plan, setPlan] = useState<PlanResult | null>(null)
  const [view, setView] = useState<'form' | 'plan'>('form')
  const [errors, setErrors] = useState<string[]>([])
  const [restored, setRestored] = useState(false)
  const planHeadingRef = useRef<HTMLHeadingElement>(null)
  const errorsRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof TrackerForm>(key: K, value: TrackerForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  /* Carry last week's audit forward, parked topics first */
  useEffect(() => {
    const stored = loadState()
    if (!stored) return
    const parkedKeys = new Set(stored.parked.map((p) => `${p.subject}|${p.topic}`))
    const subjects = stored.form.subjects.map((s) => ({
      ...s,
      topics: [...s.topics].sort((a, b) => {
        const ap = parkedKeys.has(`${s.name}|${a.name}`) ? 0 : 1
        const bp = parkedKeys.has(`${s.name}|${b.name}`) ? 0 : 1
        return ap - bp
      }),
    }))
    setForm({ ...DEFAULT_FORM, ...stored.form, subjects })
    if (subjects.some((s) => s.topics.length > 0)) setRestored(true)
  }, [])

  const sleepMins = sleepDurationMins(form)
  const sleepOk = Number.isNaN(sleepMins) || sleepMins >= 480

  const settings = useMemo(() => buildWeekSettings(form), [form])
  const topics = useMemo(() => collectTopics(form), [form])
  const freeMins = useMemo(() => (sleepOk ? weeklyFreeMins(settings) : 0), [settings, sleepOk])
  const meter = useMemo(
    () => (sleepOk && topics.length > 0 ? capacitySummary(settings, topics) : null),
    [settings, topics, sleepOk]
  )

  const freeH = Math.round(freeMins / 30) / 2

  function addSubject() {
    setForm((f) => ({
      ...f,
      subjects: [...f.subjects, { id: newId(), name: '', topics: [] }],
    }))
  }

  function updateSubject(id: number, patch: Partial<SubjectForm>) {
    setForm((f) => ({
      ...f,
      subjects: f.subjects.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  }

  function addCommitment() {
    setForm((f) => ({
      ...f,
      commitments: [...f.commitments, { id: newId(), day: 0, start: '17:00', end: '18:30', label: '' }],
    }))
  }

  function updateCommitment(id: number, patch: Partial<CommitmentForm>) {
    setForm((f) => ({
      ...f,
      commitments: f.commitments.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }))
  }

  function generate() {
    const problems: string[] = []
    if (!form.name.trim()) problems.push('Add your first name in step 1.')
    if (!form.yearGroup) problems.push('Pick your year group in step 1.')
    if (!sleepOk)
      problems.push('Your wake and sleep times leave less than 8 hours of sleep. Fix that first; sleep is part of the system.')
    if (topics.length === 0) problems.push('Add at least one subject with one topic in step 2.')
    if (!/^[^ @]+@[^ @]+\.[^ @]+$/.test(form.email.trim())) problems.push('Enter a valid email address in step 3.')
    setErrors(problems)
    if (problems.length > 0) {
      requestAnimationFrame(() => errorsRef.current?.focus())
      return
    }

    /* Fire and forget MailerLite subscription: the plan shows regardless of outcome */
    fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ML_API_KEY },
      body: JSON.stringify({
        email: form.email.trim(),
        fields: { name: form.name.trim(), year_group: form.yearGroup },
        groups: [ML_GROUP_ID],
      }),
    }).catch((err) => console.warn('MailerLite subscribe failed:', err))

    const result = planWeek(settings, topics)
    setPlan(result)
    setView('plan')
    saveState(form, result.parked.map((p) => ({ subject: p.subject, topic: p.topic })))
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    setTimeout(() => planHeadingRef.current?.focus({ preventScroll: true }), 400)
  }

  if (view === 'plan' && plan) {
    return (
      <PlanView
        plan={plan}
        form={form}
        headingRef={planHeadingRef}
        onEdit={() => {
          setView('form')
          requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
        }}
      />
    )
  }

  const meterTone = meter && !meter.fits ? 'amber' : 'green'

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-28 md:pb-16">
      {/* Step 1 */}
      <StepCard
        step="1"
        title="Your real week"
        subtitle="Sleep, meals, school and anything fixed. The plan is built inside what is left, not on top of it."
      >
        <div className="grid gap-x-5 sm:grid-cols-2">
          <div>
            <label htmlFor="t-name" className={LABEL}>
              First name <span className="text-brand-gold">*</span>
            </label>
            <input
              id="t-name"
              type="text"
              maxLength={30}
              placeholder="e.g. Sarah"
              className={`${INPUT} mb-4`}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="t-year" className={LABEL}>
              Year group <span className="text-brand-gold">*</span>
            </label>
            <select
              id="t-year"
              className={`${INPUT} mb-4`}
              value={form.yearGroup}
              onChange={(e) => set('yearGroup', e.target.value)}
            >
              <option value="" disabled>
                Select your year group
              </option>
              {YEAR_GROUPS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">
          {(
            [
              ['wake', 'Wake up'],
              ['sleep', 'Bedtime'],
              ['breakfast', 'Breakfast'],
              ['lunch', 'Lunch'],
              ['dinner', 'Dinner'],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label htmlFor={`t-${key}`} className={LABEL}>
                {label}
              </label>
              <input
                id={`t-${key}`}
                type="time"
                className={`${INPUT} mb-4`}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        {!sleepOk && (
          <p role="status" className="mb-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-4 py-2.5 text-sm text-red-800">
            That is {Math.floor(sleepMins / 60)}h {String(sleepMins % 60).padStart(2, '0')}m of sleep. You need at least 8
            hours. Non negotiable; tired brains cannot retrieve.
          </p>
        )}

        <div className="rounded-xl bg-brand-cream p-4 mb-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-[15px] font-semibold text-brand-purple">
            <input
              type="checkbox"
              className="h-[18px] w-[18px] accent-brand-purple"
              checked={form.hasSchool}
              onChange={(e) => set('hasSchool', e.target.checked)}
            />
            I have school or college this week
          </label>
          {form.hasSchool && (
            <div className="mt-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((d) => (
                  <label
                    key={d}
                    className={`flex min-h-[40px] cursor-pointer items-center rounded-lg border px-3 text-sm font-semibold transition ${
                      form.schoolDays.includes(d)
                        ? 'border-brand-purple bg-brand-purple text-brand-cream'
                        : 'border-brand-purple/15 bg-white text-brand-text/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.schoolDays.includes(d)}
                      onChange={(e) =>
                        set(
                          'schoolDays',
                          e.target.checked ? [...form.schoolDays, d].sort() : form.schoolDays.filter((x) => x !== d)
                        )
                      }
                    />
                    {DAY_NAMES[d].slice(0, 3)}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="t-school-start" className={LABEL}>
                    Leave for school
                  </label>
                  <input
                    id="t-school-start"
                    type="time"
                    className={INPUT}
                    value={form.schoolStart}
                    onChange={(e) => set('schoolStart', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="t-school-end" className={LABEL}>
                    Home from school
                  </label>
                  <input
                    id="t-school-end"
                    type="time"
                    className={INPUT}
                    value={form.schoolEnd}
                    onChange={(e) => set('schoolEnd', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-2">
          <div className="mb-2 flex items-center justify-between">
            <span className={LABEL + ' mb-0'}>Fixed commitments</span>
            <button
              type="button"
              onClick={addCommitment}
              className="rounded-lg border border-brand-purple/20 px-3 py-1.5 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-brand-cream"
            >
              + Add
            </button>
          </div>
          <p className="mb-3 text-[13px] text-brand-text/55">
            Sport, work, family, anything you cannot move. It gets blocked out before a single session is placed.
          </p>
          {form.commitments.map((c) => (
            <div key={c.id} className="relative mb-2.5 rounded-xl border border-brand-purple/10 bg-brand-cream p-3 pr-12">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <select
                  aria-label="Day"
                  className={INPUT}
                  value={c.day}
                  onChange={(e) => updateCommitment(c.id, { day: parseInt(e.target.value, 10) })}
                >
                  {DAY_NAMES.map((d, i) => (
                    <option key={d} value={i}>
                      {d}
                    </option>
                  ))}
                </select>
                <input
                  aria-label="What is it?"
                  type="text"
                  maxLength={40}
                  placeholder="e.g. Football"
                  className={INPUT}
                  value={c.label}
                  onChange={(e) => updateCommitment(c.id, { label: e.target.value })}
                />
                <input
                  aria-label="Start time"
                  type="time"
                  className={INPUT}
                  value={c.start}
                  onChange={(e) => updateCommitment(c.id, { start: e.target.value })}
                />
                <input
                  aria-label="End time"
                  type="time"
                  className={INPUT}
                  value={c.end}
                  onChange={(e) => updateCommitment(c.id, { end: e.target.value })}
                />
              </div>
              <button
                type="button"
                aria-label={`Remove ${c.label || 'commitment'}`}
                onClick={() => setForm((f) => ({ ...f, commitments: f.commitments.filter((x) => x.id !== c.id) }))}
                className="absolute right-2 top-1/2 flex h-11 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-xl text-brand-purple/50 transition hover:bg-red-50 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {sleepOk && (
          <p role="status" className="mt-4 rounded-xl border-l-4 border-brand-gold bg-brand-cream px-4 py-3 text-[15px] text-brand-purple">
            {form.name.trim() ? `${form.name.trim()}, you` : 'You'}&apos;ve got about <strong>{freeH} free hours</strong>{' '}
            this week, around school, sleep and everything else that&apos;s fixed. The next step decides where they go.
          </p>
        )}
      </StepCard>

      {/* Step 2 */}
      <StepCard
        step="2"
        title="The topic audit"
        subtitle="Diagnose before you treat. Rate each topic by your last test or past paper question on it, not by how familiar the notes feel."
      >
        {restored && (
          <div role="status" className="mb-4 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-sm text-brand-purple">
            <strong>Welcome back.</strong>{' '}Last week&apos;s audit is loaded, with parked topics at the top. Re-rate anything
            that&apos;s changed, then rebuild your week.
          </div>
        )}
        <p className="mb-4 text-[13px] text-brand-text/55">
          Start with your worst 4 to 6 topics per subject. This is an audit of this week, not the whole spec.
        </p>

        {form.subjects.map((s) => {
          const placeholder = TOPIC_PLACEHOLDERS[s.name.trim()] || 'e.g. A topic you got wrong recently'
          const counts = {
            struggling: s.topics.filter((t) => t.rating === 'struggling').length,
            shaky: s.topics.filter((t) => t.rating === 'shaky').length,
          }
          return (
            <div key={s.id} className="relative mb-4 rounded-xl border border-brand-purple/10 bg-brand-cream p-4 pr-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <input
                  aria-label="Subject name"
                  type="text"
                  maxLength={40}
                  placeholder="Subject, e.g. Biology"
                  className={`${INPUT} font-semibold`}
                  value={s.name}
                  onChange={(e) => updateSubject(s.id, { name: e.target.value })}
                />
                <button
                  type="button"
                  aria-label={`Remove ${s.name || 'subject'}`}
                  onClick={() => setForm((f) => ({ ...f, subjects: f.subjects.filter((x) => x.id !== s.id) }))}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl text-brand-purple/50 transition hover:bg-red-50 hover:text-red-600"
                >
                  ×
                </button>
              </div>
              {s.topics.length > 0 && (
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-purple/50">
                  {s.topics.length} topic{s.topics.length === 1 ? '' : 's'} · {counts.struggling} struggling ·{' '}
                  {counts.shaky} shaky
                </p>
              )}
              {s.topics.map((t) => (
                <div key={t.id} className="mb-3 rounded-lg bg-white p-3 [box-shadow:0_1px_3px_rgba(46,37,87,.08)]">
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Topic name"
                      type="text"
                      maxLength={50}
                      placeholder={placeholder}
                      className={INPUT}
                      value={t.name}
                      onChange={(e) =>
                        updateSubject(s.id, {
                          topics: s.topics.map((x) => (x.id === t.id ? { ...x, name: e.target.value } : x)),
                        })
                      }
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${t.name || 'topic'}`}
                      onClick={() => updateSubject(s.id, { topics: s.topics.filter((x) => x.id !== t.id) })}
                      className="flex h-11 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-brand-purple/50 transition hover:bg-red-50 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                  <RatingControl
                    groupName={`rating-${s.id}-${t.id}`}
                    topicName={t.name}
                    value={t.rating}
                    onChange={(rating) =>
                      updateSubject(s.id, {
                        topics: s.topics.map((x) => (x.id === t.id ? { ...x, rating } : x)),
                      })
                    }
                  />
                </div>
              ))}
              {s.topics.length < MAX_TOPICS_PER_SUBJECT ? (
                <button
                  type="button"
                  onClick={() =>
                    updateSubject(s.id, {
                      topics: [...s.topics, { id: newId(), name: '', rating: 'shaky' }],
                    })
                  }
                  className="w-full rounded-lg border-2 border-dashed border-brand-purple/25 py-2.5 text-sm font-semibold text-brand-purple transition hover:border-brand-purple hover:bg-brand-purple hover:text-brand-cream"
                >
                  + Add topic
                </button>
              ) : (
                <p className="text-center text-[13px] text-brand-text/50">
                  Five topics is plenty for one subject in one week.
                </p>
              )}
            </div>
          )
        })}

        <button
          type="button"
          onClick={addSubject}
          className="w-full rounded-xl border-2 border-dashed border-brand-purple/30 py-3.5 font-semibold text-brand-purple transition hover:border-brand-purple hover:bg-brand-purple hover:text-brand-cream"
        >
          + Add a subject
        </button>

        {meter && (
          <div
            role="status"
            className={`mt-5 rounded-xl border-l-4 px-4 py-3.5 ${
              meterTone === 'green' ? 'border-emerald-600 bg-emerald-50' : 'border-brand-gold bg-brand-gold/10'
            }`}
          >
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="font-serif text-lg font-bold text-brand-purple">
                {meter.fits
                  ? `All ${meter.scheduledCount} topic${meter.scheduledCount === 1 ? '' : 's'} fit your week.`
                  : `${meter.scheduledCount} of ${topics.length} topics fit this week.`}
              </span>
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-brand-purple/60">
                {Math.round(meter.demandMins / 30) / 2}h needed · {Math.round(meter.availableStudyMins / 30) / 2}h held
              </span>
            </div>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-brand-purple/10">
              <div
                className={`h-full rounded-full ${meterTone === 'green' ? 'bg-emerald-600' : 'bg-brand-gold'}`}
                style={{
                  width: `${Math.min(100, Math.round((meter.demandMins / Math.max(1, meter.availableStudyMins)) * 100))}%`,
                }}
              />
            </div>
            <p className="text-[13px] leading-relaxed text-brand-text/70">
              {meter.fits
                ? 'Weakest topics get the most sessions. Anything you add past capacity gets parked, never crammed.'
                : 'That is more than one week can properly hold. I will build the week around your weakest ones and park the rest for next week. Nothing gets dropped.'}{' '}
              I cap you at about six focused hours a day; in my experience the hours past six add almost nothing.
            </p>
          </div>
        )}
      </StepCard>

      {/* Step 3 */}
      <StepCard
        step="3"
        title="Build my week"
        subtitle="Every session comes labelled with the technique to use and how to run it."
      >
        <label htmlFor="t-email" className={LABEL}>
          Email address <span className="text-brand-gold">*</span>
        </label>
        <input
          id="t-email"
          type="email"
          maxLength={100}
          placeholder="your@email.com"
          className={`${INPUT} mb-2`}
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
        />
        <p className="mb-5 text-[13px] text-brand-text/55">
          Pop your email in and the plan is yours. I&apos;ll also send you the free study tips I share with my own
          students. Unsubscribe whenever.
        </p>

        {errors.length > 0 && (
          <div
            ref={errorsRef}
            tabIndex={-1}
            role="alert"
            className="mb-4 rounded-xl border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <strong className="block mb-1">Nearly there. Fix these first:</strong>
            <ul className="list-disc pl-5">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={generate}
          className="w-full rounded-xl bg-brand-purple px-6 py-4 font-serif text-lg font-bold tracking-wide text-brand-cream shadow-lg shadow-brand-purple/20 transition hover:bg-brand-purple-light active:translate-y-px"
        >
          Run My Audit and Build My Week →
        </button>
        <p className="mt-2.5 text-center text-[13px] text-brand-text/50">
          Free. Print it, stick it on your wall, rebuild it every week.
        </p>
      </StepCard>

      {/* Sticky capacity bar, phones only */}
      {meter && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-purple/10 bg-white/95 px-4 py-2.5 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${meterTone === 'green' ? 'bg-emerald-600' : 'bg-brand-gold'}`}
            />
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-brand-purple">
              {meter.fits
                ? `All ${meter.scheduledCount} topics fit your week`
                : `${meter.scheduledCount} of ${topics.length} topics fit, rest parked`}
            </span>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-brand-purple/55">
              {Math.round(meter.demandMins / 30) / 2}h / {Math.round(meter.availableStudyMins / 30) / 2}h
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
