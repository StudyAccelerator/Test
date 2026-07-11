import type { Metadata } from 'next'
import { LANDING_FAQS } from '@/lib/diagnostic'

export const metadata: Metadata = {
  title: 'Free A-Level Revision Diagnostic | Find Where Your Marks Are Leaking',
  description:
    'A free 4 minute diagnostic for A-level students. Get your revision profile, scores for the five systems behind every top grade, an honest estimate of your wasted study hours, and a personalised 7 day plan. Built by Dr Waleed Ahmad MBBS.',
  alternates: { canonical: 'https://alevelaccelerators.com/revision-diagnostic/' },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'A-Level Revision Diagnostic',
  url: 'https://alevelaccelerators.com/revision-diagnostic/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web browser',
  description:
    'Free diagnostic that scores how an A-level student revises across five systems, identifies their revision profile and biggest bottleneck, estimates low-yield study hours, and produces a personalised 7 day plan.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', '@id': 'https://alevelaccelerators.com/#organization' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: LANDING_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function RevisionDiagnosticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
