'use client'

import { useRef, useState } from 'react'
import { subscribeErrorLog } from '@/lib/mailerlite'
import { trackLead } from '@/lib/analytics'
import { dateKey, saveAccess, type AccessRecord } from '@/lib/error-log/engine'
import { CARD, INPUT, LABEL, SUBJECT_SUGGESTIONS } from './ui'

/* The signup gate: the error log is free, but it is earned with a proper
   introduction. Everything captured here lands on the MailerLite subscriber
   (Error Log group) so Waleed can actually follow up. The signup record is
   stored locally, so a student only ever sees this form once per device. */

const YEAR_GROUPS = ['Year 10', 'Year 11', 'Year 12', 'Year 13', 'Resitting', 'Other']

const BOARDS = ['AQA', 'Edexcel', 'OCR', 'WJEC / Eduqas', 'CAIE', 'Other / not sure']

const WORKING_AT = ['A*', 'A', 'B', 'C', 'D', 'E', 'U', 'Not sure yet']

const TARGETS = ['A*', 'A', 'B', 'C', 'D', 'E']

type SubjectRow = { id: number; name: string; board: string; current: string; target: string }

let nextId = 1
const newRow = (): SubjectRow => ({ id: nextId++, name: '', board: '', current: '', target: '' })

const MAX_ROWS = 5

export default function SignupGate({ onOpen }: { onOpen: (rec: AccessRecord) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [yearGroup, setYearGroup] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [rows, setRows] = useState<SubjectRow[]>([newRow()])
  const [errors, setErrors] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const errorsRef = useRef<HTMLDivElement>(null)

  function updateRow(id: number, patch: Partial<SubjectRow>) {
    setRows((all) => all.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  async function submit() {
    const problems: string[] = []
    if (!name.trim()) problems.push('Add your first name.')
    if (!/^[^ @]+@[^ @]+\.[^ @]+$/.test(email.trim())) problems.push('Enter a valid email address.')
    if (!yearGroup) problems.push('Pick your year group.')

    const started = rows.filter((r) => r.name.trim() || r.board || r.current || r.target)
    const complete = started.filter((r) => r.name.trim() && r.board && r.current && r.target)
    if (complete.length === 0) {
      problems.push('Add at least one subject with its exam board and grades.')
    } else if (started.length !== complete.length) {
      problems.push('One of your subjects is missing its board or grades. Complete it or clear it.')
    }

    const phoneDigits = phone.replace(/[^\d]/g, '')
    if (phone.trim() && phoneDigits.length < 7) problems.push('That phone number looks too short. Fix it or leave it blank.')

    setErrors(problems)
    if (problems.length > 0) {
      requestAnimationFrame(() => errorsRef.current?.focus())
      return
    }

    const subjectLines = complete
      .map((r) =>
        r.current === 'Not sure yet'
          ? `${r.name.trim()} (${r.board}) target ${r.target}`
          : `${r.name.trim()} (${r.board}) ${r.current} to ${r.target}`
      )
      .join('; ')
    const subjectNames = complete.map((r) => r.name.trim()).join(', ')

    setSubmitting(true)
    const result = await subscribeErrorLog({
      email: email.trim(),
      name: name.trim(),
      yearGroup,
      subjectLines,
      subjectNames,
      phone: phone.trim(),
      notes: notes.trim(),
    })
    setSubmitting(false)

    if (result === 'invalid-email') {
      setErrors(['That email address was rejected. Check it for typos and try again.'])
      requestAnimationFrame(() => errorsRef.current?.focus())
      return
    }
    /* 'ok' or 'network-error': a MailerLite outage must never brick the tool.
       The lead conversion only fires when the signup actually landed. */
    if (result === 'ok') trackLead()
    const rec: AccessRecord = { name: name.trim(), email: email.trim(), on: dateKey(new Date()) }
    saveAccess(rec)
    onOpen(rec)
  }

  return (
    <section className={`${CARD} p-6 sm:p-8`} aria-labelledby="gate-heading">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/60">One-time signup</p>
      <h2 id="gate-heading" className="mt-1 font-serif text-2xl font-bold text-brand-purple sm:text-3xl">
        Open your Error Log
      </h2>
      <p className="mt-2 mb-6 text-[15px] leading-relaxed text-brand-text/70">
        It&apos;s free, and it takes about thirty seconds. Tell me who you are and what you&apos;re working towards,
        and the log is yours: this device remembers you, so you&apos;ll never see this form again.
      </p>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <div>
          <label htmlFor="g-name" className={LABEL}>
            First name <span className="text-brand-gold">*</span>
          </label>
          <input
            id="g-name"
            type="text"
            maxLength={30}
            placeholder="e.g. Sarah"
            className={`${INPUT} mb-4`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="g-email" className={LABEL}>
            Email address <span className="text-brand-gold">*</span>
          </label>
          <input
            id="g-email"
            type="email"
            maxLength={100}
            placeholder="your@email.com"
            className={`${INPUT} mb-4`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="g-year" className={LABEL}>
            Year group <span className="text-brand-gold">*</span>
          </label>
          <select id="g-year" className={`${INPUT} mb-4`} value={yearGroup} onChange={(e) => setYearGroup(e.target.value)}>
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
        <div>
          <label htmlFor="g-phone" className={LABEL}>
            Phone <span className="font-normal text-brand-text/50">(optional)</span>
          </label>
          <input
            id="g-phone"
            type="tel"
            maxLength={20}
            placeholder="07..."
            className={`${INPUT} mb-1`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="mb-4 text-[12px] leading-snug text-brand-text/50">
            Only if you&apos;re happy for me to check in about your revision. Never shared, never spammed.
          </p>
        </div>
      </div>

      <fieldset className="mb-4">
        <legend className={LABEL}>
          Your A-level subjects <span className="text-brand-gold">*</span>
        </legend>
        <p className="mb-3 text-[13px] text-brand-text/55">
          Board and grades matter: they decide which mark schemes and advice actually apply to you.
        </p>
        {rows.map((r, i) => (
          <div key={r.id} className="relative mb-2.5 rounded-xl border border-brand-purple/10 bg-brand-cream p-3 pr-12">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[1.4fr,1fr,1fr,1fr]">
              <input
                aria-label={`Subject ${i + 1} name`}
                type="text"
                list="gate-subjects"
                maxLength={40}
                placeholder="Subject, e.g. Biology"
                className={INPUT}
                value={r.name}
                onChange={(e) => updateRow(r.id, { name: e.target.value })}
              />
              <select
                aria-label={`Subject ${i + 1} exam board`}
                className={INPUT}
                value={r.board}
                onChange={(e) => updateRow(r.id, { board: e.target.value })}
              >
                <option value="" disabled>
                  Exam board
                </option>
                {BOARDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                aria-label={`Subject ${i + 1} current working grade`}
                className={INPUT}
                value={r.current}
                onChange={(e) => updateRow(r.id, { current: e.target.value })}
              >
                <option value="" disabled>
                  Working at
                </option>
                {WORKING_AT.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <select
                aria-label={`Subject ${i + 1} target grade`}
                className={INPUT}
                value={r.target}
                onChange={(e) => updateRow(r.id, { target: e.target.value })}
              >
                <option value="" disabled>
                  Aiming for
                </option>
                {TARGETS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            {rows.length > 1 && (
              <button
                type="button"
                aria-label={`Remove ${r.name || 'subject'}`}
                onClick={() => setRows((all) => all.filter((x) => x.id !== r.id))}
                className="absolute right-2 top-1/2 flex h-11 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-xl text-brand-purple/50 transition hover:bg-red-50 hover:text-red-600"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <datalist id="gate-subjects">
          {SUBJECT_SUGGESTIONS.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        {rows.length < MAX_ROWS && (
          <button
            type="button"
            onClick={() => setRows((all) => [...all, newRow()])}
            className="w-full rounded-lg border-2 border-dashed border-brand-purple/25 py-2.5 text-sm font-semibold text-brand-purple transition hover:border-brand-purple hover:bg-brand-purple hover:text-brand-cream"
          >
            + Add another subject
          </button>
        )}
      </fieldset>

      <label htmlFor="g-notes" className={LABEL}>
        Anything else I should know? <span className="font-normal text-brand-text/50">(optional)</span>
      </label>
      <textarea
        id="g-notes"
        rows={2}
        maxLength={250}
        placeholder="e.g. mocks in November, resitting Year 12, aiming for a pharmacy course, essays are the struggle"
        className={`${INPUT} mb-5 resize-y`}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {errors.length > 0 && (
        <div
          ref={errorsRef}
          tabIndex={-1}
          role="alert"
          className="mb-4 rounded-xl border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <strong className="mb-1 block">Nearly in. Fix these first:</strong>
          <ul className="list-disc pl-5">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={submitting}
        className="w-full rounded-xl bg-brand-purple px-6 py-4 font-serif text-lg font-bold tracking-wide text-brand-cream shadow-lg shadow-brand-purple/20 transition hover:bg-brand-purple-light active:translate-y-px disabled:opacity-60"
      >
        {submitting ? 'Opening...' : 'Open My Error Log →'}
      </button>
      <p className="mt-2.5 text-center text-[13px] text-brand-text/50">
        I&apos;ll send you the study tips I share with my own students, and check in on how the log is going.
        Unsubscribe whenever. Your logged mistakes stay on this device; they are never sent to me.
      </p>
    </section>
  )
}
