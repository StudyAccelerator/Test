import type { Metadata } from 'next'
import Header from '@/components/header'
import { posts, SITE_URL } from '@/lib/posts'
import { HeroHeadline, HeroWord } from '@/components/home/hero-reveal'

export const metadata: Metadata = {
  title: 'A-Level Revision Blog: Advice From a Doctor & Former Top Student',
  description:
    'A-level revision advice that actually works: study techniques, revision timetables, predicted grades and UCAS strategy. Written by Dr Waleed Ahmad, MBBS, a doctor, former top A-level student and founder of A-Level Accelerators.',
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    title: 'A-Level Revision Blog | A-Level Accelerators',
    description:
      'A-level revision advice that actually works: study techniques, revision timetables, predicted grades and UCAS strategy.',
    type: 'website',
    url: `${SITE_URL}/blog/`,
  },
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'A-Level Revision Blog',
  url: `${SITE_URL}/blog/`,
  description:
    'A-level revision advice from Dr Waleed Ahmad, MBBS, a doctor and former top-performing A-level student.',
  publisher: {
    '@type': 'Organization',
    name: 'A-Level Accelerators',
    url: SITE_URL,
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogIndex() {
  const [featured, ...rest] = posts

  return (
    <main className="bg-brand-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />

      <section className="max-w-5xl mx-auto px-6 pt-14 pb-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-gold mb-3">The A-Level Accelerators Blog</p>
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold tracking-tight leading-tight mb-5">
          <HeroHeadline>
            <HeroWord>Revision</HeroWord> <HeroWord>advice</HeroWord> <HeroWord>that</HeroWord>{' '}
            <HeroWord className="italic text-brand-gold">actually</HeroWord> <HeroWord>works</HeroWord>
          </HeroHeadline>
        </h1>
        <p className="text-lg text-brand-text max-w-2xl mx-auto">
          Study techniques, revision timetables, predicted grades and UCAS strategy, written by
          Dr Waleed Ahmad, MBBS, former top-performing A-level student, and founder of A-Level
          Accelerators. No recycled study tips; only what works.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        {featured && (
          <a
            href={`/blog/${featured.slug}/`}
            className="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 md:p-10 mb-10 border-l-4 border-brand-gold"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-brand-gold mb-3">
              {featured.category} · Featured
            </p>
            <h2 className="text-2xl md:text-3xl text-brand-purple font-serif font-bold leading-snug mb-3">
              {featured.title}
            </h2>
            <p className="text-brand-text text-lg leading-relaxed mb-4">{featured.description}</p>
            <p className="text-sm text-brand-muted">
              Dr Waleed Ahmad, MBBS · {formatDate(featured.dateModified)} · {featured.readingMinutes} min read
            </p>
          </a>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {rest.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition p-8"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-brand-gold mb-3">{post.category}</p>
              <h2 className="text-xl text-brand-purple font-serif font-bold leading-snug mb-3">{post.title}</h2>
              <p className="text-brand-text leading-relaxed mb-4">{post.description}</p>
              <p className="text-sm text-brand-muted">
                {formatDate(post.dateModified)} · {post.readingMinutes} min read
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-xl p-8 md:p-10 text-center">
          <p className="text-2xl font-serif text-brand-gold mb-3">Get a free revision timetable built for you</p>
          <p className="text-brand-cream mb-6 max-w-xl mx-auto">
            Our free Revision Tracker turns your subjects, weak topics and commitments into a personalised weekly
            plan built on spaced repetition, the same methods this blog teaches.
          </p>
          <a
            href="/revision-tracker"
            className="inline-block px-8 py-3 bg-brand-gold text-brand-purple font-semibold rounded-md hover:bg-brand-gold-light transition"
          >
            Build My Free Timetable
          </a>
        </div>
      </section>

      <footer className="bg-brand-purple text-brand-cream py-10 px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-serif text-2xl text-brand-gold">A-Level Accelerators</p>
          <div className="flex gap-8 justify-center text-sm">
            <a href="/" className="text-brand-gold hover:text-white transition">Courses</a>
            <a href="/blog/" className="text-brand-gold hover:text-white transition">Blog</a>
            <a href="/revision-tracker" className="text-brand-gold hover:text-white transition">Free Revision Tracker</a>
            <a href="mailto:Waleed@alevelaccelerators.com" className="text-brand-gold hover:text-white transition">Email</a>
          </div>
          <p className="text-xs opacity-60">
            &copy; 2026 A-Level Accelerators. All rights reserved. | Helping A-Level students become the top of their class.
          </p>
        </div>
      </footer>
    </main>
  )
}
