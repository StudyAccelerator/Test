import type { Metadata } from 'next'
import { GUIDE_FAQS } from '@/components/error-log/guide'

export const metadata: Metadata = {
  title: 'Free A-Level Error Log: Never Lose the Same Mark Twice',
  description:
    'Log every mark you drop in past papers and tests, tag the real cause (knowledge, recall, application or exam craft), and retest each mistake at 3 days, 1 week, 2 weeks and 1 month until it stays fixed. Free, private, saves in your browser.',
  alternates: { canonical: 'https://alevelaccelerators.com/error-log/' },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'A-Level Error Log and Mistake Tracker',
  url: 'https://alevelaccelerators.com/error-log/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web browser',
  description:
    'Free tool that records every mark an A-level student drops, tags the cause against the four tiers of the A* Performance Pyramid, and schedules spaced retests at 3, 7, 14 and 30 days so mistakes get re-answered from memory instead of re-read.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', '@id': 'https://alevelaccelerators.com/#organization' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GUIDE_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function ErrorLogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
