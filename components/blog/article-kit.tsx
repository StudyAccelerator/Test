import Image from 'next/image'
import Header from '@/components/header'
import { posts, SITE_URL, type Post } from '@/lib/posts'

/* ---------- Typography ---------- */

export const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl text-brand-text leading-relaxed mb-8">{children}</p>
)

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-brand-text leading-relaxed mb-6">{children}</p>
)

export const H2 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-3xl text-brand-purple font-serif mt-14 mb-6 scroll-mt-40">
    {children}
  </h2>
)

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl text-brand-purple font-serif mt-10 mb-4">{children}</h3>
)

export const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-3 text-lg text-brand-text mb-6 list-disc pl-6">{children}</ul>
)

export const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="space-y-3 text-lg text-brand-text mb-6 list-decimal pl-6">{children}</ol>
)

export const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="leading-relaxed">{children}</li>
)

export const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-brand-purple">{children}</strong>
)

export const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-brand-purple underline decoration-brand-gold decoration-2 underline-offset-2 hover:text-brand-gold transition">
    {children}
  </a>
)

/* ---------- Answer-engine blocks ---------- */

// Direct answer box at the top of the article — the snippet AI assistants and
// featured snippets lift. Keep it to 2-3 sentences that answer the title question.
export const QuickAnswer = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white border-l-4 border-brand-gold rounded-r-lg shadow-md p-6 mb-10">
    <p className="text-sm font-bold uppercase tracking-wide text-brand-gold mb-2">Quick answer</p>
    <div className="text-lg text-brand-text leading-relaxed">{children}</div>
  </div>
)

export const KeyTakeaways = ({ points }: { points: React.ReactNode[] }) => (
  <div className="bg-brand-cream-dark/60 rounded-lg p-6 mb-10">
    <p className="text-sm font-bold uppercase tracking-wide text-brand-purple mb-3">Key takeaways</p>
    <ul className="space-y-2 text-lg text-brand-text">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-brand-gold font-bold">✓</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
)

export const Callout = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="bg-white border-2 border-brand-gold rounded-lg p-6 my-8 shadow-sm">
    {title && <p className="font-bold text-brand-purple mb-2">{title}</p>}
    <div className="text-lg text-brand-text leading-relaxed">{children}</div>
  </div>
)

/* ---------- Conversion blocks ---------- */

export const TrackerCTA = () => (
  <div className="bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-xl p-8 my-10 text-center">
    <p className="text-2xl font-serif text-brand-gold mb-3">Free: get a revision timetable built for you</p>
    <p className="text-brand-cream mb-6 max-w-xl mx-auto">
      Answer a few questions about your subjects and weak topics, and our free revision tracker builds you a
      personalised weekly plan using spaced repetition — the same method covered in this article.
    </p>
    <a
      href="/revision-tracker"
      className="inline-block px-8 py-3 bg-brand-gold text-brand-purple font-semibold rounded-md hover:bg-brand-gold-light transition"
    >
      Build My Free Timetable
    </a>
  </div>
)

export const CourseCTA = ({
  heading = 'Want expert help, not just advice?',
  body = 'A-Level Accelerators runs live online classes in Biology, Chemistry, Maths and Physics, taught by subject specialists and led by Dr Waleed Ahmad — a doctor and former top-performing A-level student. Small groups, real exam technique, first session risk-free.',
  label = 'See Our A-Level Courses',
  href = '/',
}: {
  heading?: string
  body?: string
  label?: string
  href?: string
}) => (
  <div className="bg-white border-2 border-brand-gold rounded-xl p-8 my-10 text-center shadow-md">
    <p className="text-2xl font-serif text-brand-purple mb-3">{heading}</p>
    <p className="text-brand-text mb-6 max-w-xl mx-auto">{body}</p>
    <a
      href={href}
      className="inline-block px-8 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition"
    >
      {label}
    </a>
  </div>
)

/* ---------- FAQ block (renders + emits FAQPage schema) ---------- */

export type FAQ = { q: string; a: string }

export const FAQBlock = ({ faqs }: { faqs: FAQ[] }) => (
  <section className="mt-14">
    <h2 className="text-3xl text-brand-purple font-serif mb-8">Frequently asked questions</h2>
    <div className="space-y-6">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-brand-purple mb-3">{faq.q}</h3>
          <p className="text-lg text-brand-text leading-relaxed">{faq.a}</p>
        </div>
      ))}
    </div>
  </section>
)

/* ---------- Article layout ---------- */

const AuthorBio = () => (
  <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mt-14 flex flex-col md:flex-row gap-6 items-center md:items-start">
    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
      <Image
        src="/graduation.jpg"
        alt="Dr Waleed Ahmad, founder of A-Level Accelerators"
        width={96}
        height={96}
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center 40%', transform: 'scale(1.3)' }}
        unoptimized
      />
    </div>
    <div>
      <p className="font-bold text-brand-purple text-lg">Written by Dr Waleed Ahmad, MBBS</p>
      <p className="text-brand-text mt-2 leading-relaxed">
        Waleed is a UK doctor and former top-performing A-level student. He founded A-Level Accelerators and has
        worked with over 1,000 A-level students on revision systems, exam technique and grade improvement. Everything
        on this blog comes from methods he used himself and teaches students every week.
      </p>
      <a href="/#contact" className="text-brand-gold font-semibold hover:underline mt-2 inline-block">
        Questions? Get in touch →
      </a>
    </div>
  </div>
)

const RelatedPosts = ({ currentSlug }: { currentSlug: string }) => {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3)
  if (related.length === 0) return null
  return (
    <section className="mt-14">
      <h2 className="text-2xl text-brand-purple font-serif mb-6">Keep reading</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}/`} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition block">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-gold mb-2">{p.category}</p>
            <p className="font-bold text-brand-purple leading-snug">{p.title}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

const BlogFooter = () => (
  <footer className="bg-brand-purple text-brand-cream py-10 px-8 mt-20">
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
)

export function ArticleLayout({
  post,
  faqs,
  children,
}: {
  post: Post
  faqs?: FAQ[]
  children: React.ReactNode
}) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: 'Dr Waleed Ahmad',
      honorificSuffix: 'MBBS',
      jobTitle: 'Founder, A-Level Accelerators',
      description: 'UK doctor and former top-performing A-level student; has worked with over 1,000 A-level students.',
      url: `${SITE_URL}/#founder`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'A-Level Accelerators',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-header-new.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}/` },
    ],
  }

  const faqSchema = faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  const formattedDate = new Date(post.dateModified).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="bg-brand-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-muted mb-6">
          <a href="/" className="hover:text-brand-gold">Home</a>
          <span className="mx-2">/</span>
          <a href="/blog/" className="hover:text-brand-gold">Blog</a>
          <span className="mx-2">/</span>
          <span className="text-brand-purple">{post.category}</span>
        </nav>
        <p className="text-sm font-bold uppercase tracking-wide text-brand-gold mb-3">{post.category}</p>
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-brand-muted mb-10 pb-8 border-b border-brand-cream-dark">
          <span className="font-semibold text-brand-purple">Dr Waleed Ahmad, MBBS</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.dateModified}>Updated {formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        {children}

        {faqs && faqs.length > 0 && <FAQBlock faqs={faqs} />}
        <AuthorBio />
        <RelatedPosts currentSlug={post.slug} />
      </article>
      <BlogFooter />
    </main>
  )
}
