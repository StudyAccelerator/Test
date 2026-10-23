import type { Metadata } from 'next'
import Image from 'next/image'
import WorkshopForm from '@/components/workshop/workshop-form'
import { WORKSHOP } from '@/lib/workshop'

/* The free workshop sign-up page (23 October 2026). STANDALONE on purpose,
   Waleed's instruction the same day: no site header, footer, logo or
   navigation, so a student who scans the QR code in the lecture theatre
   cannot click through to the paid programmes and read the workshop as a
   sales funnel. His running order, also 23 October: the form first ("Save
   your free place"), then "My story" (the homepage's founder section, same
   desk photo and copy), then the four things the workshop covers, kept
   short. He sells the workshop himself from the stage. The short link
   alevelaccelerators.com/kcl redirects here with ?src=kcl so those sign-ups
   are labelled in MailerLite. Dates, times and links come from
   lib/workshop.ts. Not in the header, footer or sitemap, and noindex. */

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: 'Save your place: the Free Academic Accelerator Workshop',
  description:
    'Sign up for the free 90 minute live workshop with Dr Waleed Ahmad: how to get ahead of Year 12, prioritise your subjects and avoid burnout later in the year.',
  alternates: { canonical: 'https://alevelaccelerators.com/free-workshop/' },
  robots: { index: false, follow: false },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/free-workshop/',
    title: 'Save your place: the Free Academic Accelerator Workshop',
    description:
      'A free 90 minute live workshop with Dr Waleed Ahmad on how to get ahead of Year 12 without burning out.',
    images: ['/og-default.png'],
  },
}

/* Waleed's four, 23 October 2026, kept short on his instruction */
const TAKEAWAYS: [string, string][] = [
  ['How to prioritise and weigh your hours', 'Which subject gets your time this term, and why it is never an equal split.'],
  [
    'How to crack a topic the first time',
    'Learn it once so it sticks, instead of wasting hours relearning the same thing again and again.',
  ],
  ['How to learn topics 80% faster', 'The small slice of each subject that carries most of the marks, and how to find it.'],
  ['Never lose the same mark twice', 'The habit that turns every lost mark into a mark you keep next time.'],
]

export default function FreeWorkshopPage() {
  return (
    <main className="min-h-screen bg-brand-cream px-5 pb-16 pt-10 sm:pt-14">
      <div className="mx-auto max-w-2xl">
        {/* 1 · Save your free place */}
        <p className={`${EYEBROW} text-center`}>Free Academic Accelerator Workshop</p>
        <h1 className="mt-3 text-center font-serif text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl">
          Save your free place
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-brand-text/70">
          {WORKSHOP.dateLabel}, {WORKSHOP.timeLabel}. {WORKSHOP.durationLabel} with Dr Waleed Ahmad. {WORKSHOP.strap}
        </p>
        <div id="signup" className="mt-8 scroll-mt-24">
          <WorkshopForm />
        </div>
        <p className="mt-4 text-center text-sm leading-relaxed text-brand-text/60">
          Can&apos;t make it live? Sign up anyway. Everyone who signs up gets the replay the next morning.
          Parents are welcome to sit in.
        </p>

        {/* 2 · My story: the homepage founder section, same photo and copy */}
        <section className="mt-16">
          <p className={EYEBROW}>My story</p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-brand-purple sm:text-4xl">
            I did everything school said. It nearly <span className="italic text-brand-gold">wasn&apos;t enough.</span>
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
              During my A-levels I worked as hard as anyone I knew. Re-reading, highlighting, beautiful notes. It
              got me into medicine, but only because I threw hundreds of extra hours at a method that wasted most
              of them.
            </p>
            <p>
              Medical school forced me to learn properly: active recall, spaced repetition, working to the mark
              scheme. Same hours, pointed at the right work. That system is what I have taught to over 1,000
              A-level students in the last six years, and on average our students jump two grades.
            </p>
            <p>This workshop is the first lesson of it, free, because Year 12 is the year to get it right.</p>
          </div>
        </section>

        {/* 3 · What you'll walk away with */}
        <section className="mt-16">
          <p className={EYEBROW}>What we&apos;ll cover</p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-brand-purple sm:text-4xl">
            What you&apos;ll walk away with <span className="italic text-brand-gold">in 90 minutes</span>
          </h2>
          <ol className="mt-6 space-y-3">
            {TAKEAWAYS.map(([title, body], i) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-brand-purple/10">
                <span className="font-mono text-sm text-brand-gold">0{i + 1}</span>
                <div>
                  <p className="font-serif text-xl font-bold text-brand-purple">{title}</p>
                  <p className="mt-1 leading-relaxed text-brand-text/75">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <a
              href="#signup"
              className="inline-block rounded-xl bg-brand-purple px-8 py-4 text-lg font-semibold text-brand-cream transition hover:bg-brand-purple-light"
            >
              Save my free place
            </a>
            <p className="mt-3 text-sm text-brand-text/60">
              {WORKSHOP.dateLabel}, {WORKSHOP.timeLabel}. Free, live, replay for everyone who signs up.
            </p>
          </div>
        </section>

        <p className="mt-12 text-center text-xs text-brand-text/45">
          <a href="/privacy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Privacy policy
          </a>
        </p>
      </div>
    </main>
  )
}
