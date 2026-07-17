'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  dateKey,
  dueMistakes,
  loadLog,
  saveLog,
  type Mistake,
} from '@/lib/error-log/engine'
import LogForm from './log-form'
import ReviewQueue from './review-queue'
import LogBook from './log-book'
import PrintSheet from './print-sheet'

type Tab = 'log' | 'review' | 'book'

export default function ErrorLogApp() {
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const [tab, setTab] = useState<Tab>('log')
  const [loaded, setLoaded] = useState(false)

  const todayKey = dateKey(new Date())

  /* Restore the log, and open on the retests if any are waiting: the queue is
     the point of the tool, not the form. */
  useEffect(() => {
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

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 print:hidden">
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
