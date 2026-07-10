import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free A-Level Revision Timetable Maker | Revision Tracker',
  description:
    'Build a personalised weekly A-level revision timetable in about three minutes. Free, no email needed. Spaced repetition and active recall sessions placed automatically around your subjects and commitments.',
  alternates: { canonical: 'https://alevelaccelerators.com/revision-tracker/' },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'A-Level Revision Timetable Maker',
  url: 'https://alevelaccelerators.com/revision-tracker/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web browser',
  description:
    'Free tool that builds a personalised weekly A-level revision timetable in about three minutes, scheduling deep work, active recall and spaced review sessions around your subjects and commitments.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', '@id': 'https://alevelaccelerators.com/#organization' },
}

export default function RevisionTrackerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {children}
    </>
  )
}
