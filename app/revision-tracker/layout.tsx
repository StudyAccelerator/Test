import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free A-Level Revision Timetable Maker | Revision Tracker',
  description:
    'Build a personalised weekly A-level revision timetable in about three minutes. Free, no email needed. Spaced repetition and active recall sessions placed automatically around your subjects and commitments.',
  alternates: { canonical: 'https://alevelaccelerators.com/revision-tracker/' },
}

export default function RevisionTrackerLayout({ children }: { children: React.ReactNode }) {
  return children
}
