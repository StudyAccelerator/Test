import type { Metadata } from 'next'
import Image from 'next/image'
import JoinCard from '@/components/academy/join-card'
import { ACADEMY } from '@/lib/academy'
import { WALL_QUOTES } from '@/lib/testimonials'

/* The Top 1% Academy sales page (26 October 2026). Built for the founding
   cohort from the Free Academic Accelerator Workshop (31 October) and, later,
   for cold traffic off the recorded workshop. STANDALONE like the workshop
   page: no site header, footer or navigation, because the people who land
   here were sent by Waleed's email and the one decision on the page is to
   join. Every price, date and link comes from lib/academy.ts. Short link
   alevelaccelerators.com/academy. noindex until Waleed says otherwise. */

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'
const H2 = 'mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-brand-purple sm:text-4xl'

export const metadata: Metadata = {
  title: 'Top 1% Academy: weekly live coaching on how to study, with Dr Waleed',
  description:
    'Two live sessions a week on Zoom with Dr Waleed Ahmad: Tuesday teaching and Hot Seat, Saturday Marks Clinic. Every session recorded. Monthly, cancel any time, 7 day money-back guarantee.',
  alternates: { canonical: 'https://alevelaccelerators.com/top-1-academy/' },
  robots: { index: false, follow: false },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/top-1-academy/',
    title: 'Top 1% Academy',
    description: ACADEMY.tagline,
    images: ['/og-default.png'],
  },
}

const FAQ: [string, string][] = [
  [
    'What if I miss a session?',
    'Every session is recorded and in the library the same night, so a missed session is never a lost one. You can still post a Hot Seat problem or upload work for the Clinic and get it answered.',
  ],
  [
    'Is this subject tutoring?',
    'No. Dr Waleed teaches how to study and how to perform in exams, and you run it on every subject you take. The Marks Clinic looks at your real work in any subject, because the method is the same everywhere.',
  ],
  [
    'Which years is it for?',
    'Year 12 first, because this is the year to get the system right. Year 13 students are welcome and the Clinic is built for them too.',
  ],
  [
    'What happens after I pay?',
    'You are sent straight to the Academy community to request access with the email you paid with. Dr Waleed lets you in the same day, and your welcome email carries the Zoom links and your first three jobs.',
  ],
  [
    'How do I cancel?',
    'Any time, from the link in your receipt or by emailing Dr Waleed. Your membership runs to the end of the month you have paid for and then stops. No notice period.',
  ],
  [
    'Can my parents sit in?',
    'Yes, on any live session. The community itself is for the student, and all coaching happens in public threads, never in private messages.',
  ],
]

export default function AcademyPage() {
  const quotes = WALL_QUOTES.slice(0, 3)
  return (
    <main className="min-h-screen bg-brand-cream px-5 pb-16 pt-10 sm:pt-14">
      <div className="mx-auto max-w-2xl">
        {/* 1 · Name, promise, join */}
        <h1 className="text-center font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          <span className="block text-brand-gold">{ACADEMY.name}</span>
          <span className="mt-2 block text-2xl text-brand-purple sm:text-3xl">{ACADEMY.tagline}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-brand-text/70">
          Two live sessions a week on Zoom with Dr Waleed Ahmad, every one recorded. For A-level students who want
          top grades and want someone to show them how, every week, rather than once.
        </p>
        <div className="mt-8">
          <JoinCard />
        </div>

        {/* 2 · Every week */}
        <section className="mt-16">
          <p className={EYEBROW}>Every week</p>
          <h2 className={H2}>
            Two sessions. <span className="italic text-brand-gold">About 16 hours a month.</span>
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ACADEMY.sessions.map((s) => (
              <div key={s.day} className="rounded-2xl bg-white p-5 ring-1 ring-brand-purple/10">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-gold">
                  {s.day} · {s.time}
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-brand-purple">{s.name}</p>
                <p className="mt-2 leading-relaxed text-brand-text/75">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-text/60">
            First sessions: {ACADEMY.firstTuesdayLabel} and {ACADEMY.firstSaturdayLabel}. Term time, UK time. Every
            session is recorded and in the library the same night.
          </p>
        </section>

        {/* 3 · The comparison */}
        <section className="mt-16">
          <p className={EYEBROW}>The maths</p>
          <h2 className={H2}>
            One tutor covers one subject. <span className="italic text-brand-gold">This covers how you study.</span>
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-purple/10">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="bg-brand-purple/5 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-purple/70">
                  <th className="px-4 py-3 font-semibold"> </th>
                  <th className="px-4 py-3 font-semibold">One subject tutor</th>
                  <th className="px-4 py-3 font-semibold text-brand-purple">Top 1% Academy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-purple/10 text-brand-text/80">
                <tr>
                  <td className="px-4 py-3 font-semibold text-brand-purple">Covers</td>
                  <td className="px-4 py-3">The content of one subject</td>
                  <td className="px-4 py-3">How you study, across every subject</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-brand-purple">Time with a teacher</td>
                  <td className="px-4 py-3">About 8 hours a month</td>
                  <td className="px-4 py-3">About 16 hours a month, plus the replays</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-brand-purple">Cost a month</td>
                  <td className="px-4 py-3">£320 to £400 at £40 to £50 an hour</td>
                  <td className="px-4 py-3 font-semibold text-brand-purple">
                    £{ACADEMY.standardPrice} (£{ACADEMY.foundingPrice} founding)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 · Dr Waleed */}
        <section className="mt-16">
          <p className={EYEBROW}>Who&apos;s teaching</p>
          <h2 className={H2}>
            An NHS doctor who was an <span className="italic text-brand-gold">average Year 12.</span>
          </h2>
          <div className="mt-6 overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-purple/10">
            <Image
              src="/photos/waleed-portrait-wide.jpg"
              alt="Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators, at his desk in scrubs"
              width={1200}
              height={913}
              unoptimized
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-brand-purple/70">
            Dr Waleed Ahmad, MBBS · NHS doctor · 1,000+ A-level students over 6 years
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-brand-text/80">
            <p>
              I worked as hard as anyone I knew during my A-levels and it nearly wasn&apos;t enough. Then I rebuilt how
              I studied, finished in the top 10% of my year, and got into medicine.
            </p>
            <p>
              I&apos;ve taught that system to over 1,000 A-level students in the last six years. On average, my students
              jump two grades within four months, and 96% get their first-choice university offer. The Academy is
              that system taught live, every week, with my eyes on your actual work.
            </p>
          </div>
        </section>

        {/* 5 · Students */}
        <section className="mt-16">
          <p className={EYEBROW}>Students on the sessions</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q.name} className="rounded-2xl bg-white p-5 ring-1 ring-brand-purple/10">
                <blockquote className="text-[15px] leading-relaxed text-brand-text/80">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 font-mono text-xs text-brand-purple/70">
                  {q.name}, {q.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 6 · Parents */}
        <section className="mt-16 rounded-3xl bg-white p-6 ring-1 ring-brand-purple/10 sm:p-8">
          <p className={EYEBROW}>For parents</p>
          <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-brand-purple sm:text-3xl">
            What you&apos;re paying for, in plain words
          </h2>
          <p className="mt-4 leading-relaxed text-brand-text/80">
            Two live group sessions a week with Dr Waleed, recorded, plus a private community where every question is
            answered in public. It teaches how to study and how to perform in exams, across every subject your child
            takes. It is not subject tutoring and there are no private messages between members and the teacher.
          </p>
          <p className="mt-3 leading-relaxed text-brand-text/80">
            Monthly, cancel any time, {ACADEMY.guaranteeDays}{' '}day money-back guarantee. You are welcome to sit in on
            any session, and to email Dr Waleed directly at{' '}
            <a href={`mailto:${ACADEMY.contactEmail}`} className="underline underline-offset-2">
              {ACADEMY.contactEmail}
            </a>
            .
          </p>
        </section>

        {/* 7 · FAQ */}
        <section className="mt-16">
          <p className={EYEBROW}>Questions</p>
          <div className="mt-4 divide-y divide-brand-purple/10 rounded-2xl bg-white ring-1 ring-brand-purple/10">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-brand-purple">{q}</summary>
                <p className="mt-2 leading-relaxed text-brand-text/75">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 8 · Join again */}
        <section className="mt-16">
          <JoinCard compact />
        </section>

        <p className="mt-12 text-center text-xs text-brand-text/45">
          <a href="/privacy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Privacy policy
          </a>
          {' · '}
          <a href="/terms/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Terms
          </a>
        </p>
      </div>
    </main>
  )
}
