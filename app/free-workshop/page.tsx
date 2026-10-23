import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WorkshopForm from '@/components/workshop/workshop-form'
import { WORKSHOP } from '@/lib/workshop'

/* The free online workshop sign-up page (23 October 2026). Deliberately just
   a form: Waleed sells the workshop himself from the stage (first at The Medic
   Life's KCL work experience day, 24 October 2026, 350 students), so the page
   has nothing to persuade anyone of. The short link alevelaccelerators.com/kcl
   redirects here with ?src=kcl so those sign-ups are labelled in MailerLite.
   Dates, times and links come from lib/workshop.ts, so the next workshop is a
   one-file change. Not in the header, footer or sitemap: it is reached by QR
   code, the short link and the emails. */

export const metadata: Metadata = {
  title: 'Save your place: the free Academic Accelerator Workshop',
  description:
    'Sign up for the free 90 minute live workshop with Dr Waleed Ahmad: how to get ahead of Year 12, prioritise your subjects and avoid burnout later in the year.',
  alternates: { canonical: 'https://alevelaccelerators.com/free-workshop/' },
  robots: { index: false, follow: true },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/free-workshop/',
    title: 'Save your place: the free Academic Accelerator Workshop',
    description:
      'A free 90 minute live workshop with Dr Waleed Ahmad on how to get ahead of Year 12 without burning out.',
    images: ['/og-default.png'],
  },
}

export default function FreeWorkshopPage() {
  return (
    <>
      <Header />
      <main className="px-5 pb-16 pt-10 sm:pt-14">
        <div className="mx-auto max-w-2xl">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60">
            Free live workshop with Dr Waleed Ahmad
          </p>
          <h1 className="mt-3 text-center font-serif text-3xl font-bold tracking-tight text-brand-purple sm:text-4xl">
            {WORKSHOP.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-brand-text/70">
            {WORKSHOP.strap} Sign up below and the Zoom link comes to your inbox.
          </p>
          <div id="signup" className="mt-8 scroll-mt-24">
            <WorkshopForm />
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-brand-text/60">
            Can&apos;t make it live? Sign up anyway. Everyone who signs up gets the replay the next morning.
            Parents are welcome to sit in.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
