import type { Metadata } from 'next'
import Image from 'next/image'
import WorkshopForm from '@/components/workshop/workshop-form'
import { WORKSHOP } from '@/lib/workshop'

/* The free workshop sign-up page (23 October 2026). STANDALONE on purpose,
   Waleed's instruction the same day: no site header, footer or navigation,
   so a student who scans the QR code in the lecture theatre cannot click
   through to the paid programmes and read the workshop as a sales funnel.
   Just a short who-I-am proof block with his photo (the homepage's own
   approved lines), the form, and a privacy link. Waleed sells the workshop
   himself from the stage, so the page persuades nobody of anything. The short
   link alevelaccelerators.com/kcl redirects here with ?src=kcl so those
   sign-ups are labelled in MailerLite. Dates, times and links come from
   lib/workshop.ts. Not in the header, footer or sitemap, and noindex. */

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

export default function FreeWorkshopPage() {
  return (
    <main className="min-h-screen bg-brand-cream px-5 pb-16 pt-8 sm:pt-12">
      <div className="mx-auto max-w-2xl">
        {/* Wordmark only: deliberately not a link, so there is nowhere to click through to */}
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/logo-header-new.png"
            alt="A-Level Accelerators"
            width={44}
            height={44}
            unoptimized
            className="h-11 w-auto"
          />
          <span className="font-serif text-lg font-bold text-brand-purple">A-Level Accelerators</span>
        </div>

        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60">
          Free live workshop · {WORKSHOP.dateLabel} · {WORKSHOP.timeLabel}
        </p>
        <h1 className="mt-3 text-center font-serif text-3xl font-bold tracking-tight text-brand-purple sm:text-4xl">
          {WORKSHOP.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-brand-text/70">
          {WORKSHOP.strap} Sign up below and the Zoom link comes to your inbox.
        </p>

        {/* Who I am: the homepage's approved founder lines, nothing more */}
        <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl bg-white p-6 ring-1 ring-brand-purple/10 sm:flex-row sm:items-start sm:text-left">
          <Image
            src="/photos/waleed-grad-portrait.jpg"
            alt="Dr Waleed Ahmad at his graduation"
            width={96}
            height={96}
            unoptimized
            className="h-24 w-24 flex-none rounded-full object-cover object-top"
          />
          <div className="text-center sm:text-left">
            <p className="font-serif text-xl font-bold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
            <p className="mt-0.5 text-sm font-semibold text-brand-text/60">NHS doctor · Founder of A-Level Accelerators</p>
            <p className="mt-3 leading-relaxed text-brand-text/75">
              I was an average Year 12 who worked out how to study, finished top of my year and got into medicine.
              Over the last 6 years I&apos;ve taught that system to 1,000+ A-level students alongside the day job,
              and on average our students jump two grades. This workshop is the first lesson of it, free.
            </p>
          </div>
        </div>

        <div id="signup" className="mt-6 scroll-mt-24">
          <WorkshopForm />
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-brand-text/60">
          Can&apos;t make it live? Sign up anyway. Everyone who signs up gets the replay the next morning.
          Parents are welcome to sit in.
        </p>
        <p className="mt-10 text-center text-xs text-brand-text/45">
          A-Level Accelerators ·{' '}
          <a href="/privacy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Privacy policy
          </a>
        </p>
      </div>
    </main>
  )
}
