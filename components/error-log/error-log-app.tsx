'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  dateKey,
  dueMistakes,
  loadLog,
  loadAccess,
  saveLog,
  type Mistake,
  type AccessRecord,
} from '@/lib/error-log/engine'
import { CARD } from './ui'
import SignupGate from './signup-gate'
import LogForm from './log-form'
import ReviewQueue from './review-queue'
import LogBook from './log-book'
import PrintSheet from './print-sheet'

type Tab = 'log' | 'review' | 'book'

export default function ErrorLogApp() {
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const [tab, setTab] = useState<Tab>('log')
  const [loaded, setLoaded] = useState(false)
  const [access, setAccess] = useState<AccessRecord | null>(null)
  const [justOpened, setJustOpened] = useState(false)

  const todayKey = dateKey(new Date())

  /* Restore the signup record and the log, and open on the retests if any
     are waiting: the queue is the point of the tool, not the form. */
  useEffect(() => {
    setAccess(loadAccess())
    const stored = loadLog()
    if (stored && stored.length > 0) {
      setMistakes(stored)
      if (dueMistakes(stored, dateKey(new Date())).length > 0) setTab('review')
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) saveLog(mistakes)
  }, [mistakes, loaded])

  const due = useMemo(() => dueMistakes(mistakes, todayKey), [mistakes, todayKey])

  const add = (m: Mistake) => setMistakes((all) => [...all, m])
  const update = (m: Mistake) => setMistakes((all) => all.map((x) => (x.id === m.id ? m : x)))
  const remove = (id: string) => setMistakes((all) => all.filter((x) => x.id !== id))
  const replace = (all: Mistake[]) => setMistakes(all)

  const TabButton = ({ id, label, badge }: { id: Tab; label: string; badge?: number }) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      aria-pressed={tab === id}
      className={`relative flex-1 rounded-xl px-3 py-2.5 text-[14px] font-bold transition sm:text-[15px] ${
        tab === id ? 'bg-brand-purple text-brand-cream shadow-md' : 'text-brand-purple hover:bg-brand-purple/[0.06]'
      }`}
    >
      {label}
      {typeof badge === 'number' && badge > 0 && (
        <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 font-mono text-[11px] text-brand-purple">
          {badge}
        </span>
      )}
    </button>
  )

  /* Deterministic first paint on server and client; the real state swaps in
     once the load effect has read localStorage. */
  if (!loaded) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 print:hidden" id="error-log-app">
        <div className={`${CARD} p-10 text-center`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-purple/50">Opening your log...</p>
        </div>
      </div>
    )
  }

  if (!access) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 print:hidden" id="error-log-app">
        <SignupGate
          onOpen={(rec) => {
            setAccess(rec)
            setJustOpened(true)
            requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
          }}
        />
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 print:hidden" id="error-log-app">
        {justOpened && mistakes.length === 0 && (
          <div role="status" className="mb-4 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50 px-5 py-4">
            <p className="font-semibold text-brand-purple">
              You&apos;re in, {access.name.split(' ')[0]}. This is yours now, on this device, every visit.
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-brand-text/70">
              Log the first mistake while it still stings. The guide further down this page shows you exactly how to
              run the log properly.
            </p>
          </div>
        )}
        <div
          aria-label="Error log sections"
          className="sticky top-16 z-30 mb-6 flex gap-1 rounded-2xl bg-white p-1.5 [box-shadow:0_0_0_1px_rgba(46,37,87,.06),0_6px_16px_rgba(46,37,87,.08)] lg:top-2"
        >
          <TabButton id="log" label="Log a mistake" />
          <TabButton id="review" label="Retests" badge={due.length} />
          <TabButton id="book" label="Your log" />
        </div>

        {tab === 'log' && (
          <LogForm mistakes={mistakes} onAdd={add} onGoToLog={() => setTab('book')} todayKey={todayKey} />
        )}
        {tab === 'review' && (
          <ReviewQueue
            mistakes={mistakes}
            todayKey={todayKey}
            onUpdate={update}
            onGoToForm={() => setTab('log')}
            onPrint={() => window.print()}
          />
        )}
        {tab === 'book' && (
          <LogBook
            mistakes={mistakes}
            todayKey={todayKey}
            onReplace={replace}
            onDelete={remove}
            onGoToForm={() => setTab('log')}
          />
        )}
      </div>

      <PrintSheet due={due} todayKey={todayKey} />
    </>
  )
}
