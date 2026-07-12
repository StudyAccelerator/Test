import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free A-Level Revision Timetable Maker and Topic Audit',
  description:
    'Audit your weakest A-level topics, keep the week inside the hours you genuinely have, and get a printable revision timetable where every session uses a real technique: blurting, active recall and spaced review. Free, in about three minutes.',
  alternates: { canonical: 'https://alevelaccelerators.com/revision-tracker/' },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'A-Level Revision Timetable Maker and Topic Audit',
  url: 'https://alevelaccelerators.com/revision-tracker/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web browser',
  description:
    'Free tool that audits your weakest A-level topics, caps the week to the hours you genuinely have, and builds a printable revision timetable of blurting, active recall and spaced review sessions around school and commitments.',
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
