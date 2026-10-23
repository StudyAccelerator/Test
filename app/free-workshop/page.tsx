import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WorkshopForm from '@/components/workshop/workshop-form'
import { WORKSHOP } from '@/lib/workshop'

/* The free online workshop sign-up page (23 October 2026). First pitched from
   the stage at The Medic Life's KCL work experience day on 24 October 2026
   (350 students); the short link alevelaccelerators.com/kcl redirects here
   with ?src=kcl so those sign-ups are labelled in MailerLite. Dates, times
   and links come from lib/workshop.ts, so the next workshop is a one-file
   change. Not in the header or footer: it is a campaign page, reached by QR
   code, the short link and the emails. */

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: 'Free A-level workshop: get ahead of Year 12 without burning out',
  description:
    'A free 90 minute live workshop with Dr Waleed Ahmad, NHS doctor and founder of A-Level Accelerators: how to get ahead of Year 12, prioritise your subjects and set up a study system that lasts the whole year.',
  alternates: { canonical: 'https://alevelaccelerators.com/free-workshop/' },
  openGraph: {
    siteName: 'A-Level Accelerators',
    type: 'website',
    url: 'https://alevelaccelerators.com/free-workshop/',
    title: 'Free A-level workshop: get ahead of Year 12 without burning out',
    description:
      'A free 90 minute live workshop with Dr Waleed Ahmad: how to get ahead of Year 12, prioritise your subjects and avoid burnout later in the year.',
    images: ['/og-default.png'],
  },
}

const TAKEAWAYS: [string, string][] = [
  [
    'Your priority map',
    'Which of your subjects gets the most hours this term and why. Most students split time evenly, and that is exactly how the weakest subject stays weak until mocks.',
  ],
  [
    'The 80/20 of each subject',
    'The topics and question types that carry the marks, and the ones that eat your evenings for almost nothing. High-yield and low-yield, the way we triage in a hospital.',
  ],
  [
    'A week that does not collapse',
    'How many hours a Year 12 actually needs, where they go, and the two habits that stop the January and February crash most students hit after a strong September.',
  ],
  [
    'How to learn, not just what',
    'School gives you the content. Nobody shows you how to get it to stick. You will leave with the method I used to go from average to top of my year, and that 1,000+ students have used since.',
  ],
]

const FAQS: [string, string][] = [
  ['Is it really free?', 'Yes. No card, no catch. At the end I will tell you how I work with students who want more, and you can take it or leave it.'],
  ['Do I need my camera on?', 'No. Join on your phone or laptop, cameras off is fine. Bring a pen and the list of subjects you take.'],
  ['Can my parents come?', 'Please bring them. The plan is easier to keep when the people at home have heard it too, and they usually have the best questions.'],
  ["I can't make it live", 'Sign up anyway. Everyone who registers gets the replay the next morning, with the slides.'],
  ["I'm in Year 11 or Year 13", 'Year 11: this is the head start before you arrive. Year 13: the prioritising and the method apply straight to your mocks, so come.'],
]

export default function FreeWorkshopPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-10 pt-10 sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className={EYEBROW}>
                Free live workshop · {WORKSHOP.dateLabel} · {WORKSHOP.timeLabel}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-purple sm:text-5xl">
                School teaches you <span className="italic text-brand-gold">what</span> to learn. Nobody teaches you{' '}
                <span className="italic text-brand-gold">how</span>.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-text/75">
                {WORKSHOP.title}: 90 minutes with Dr Waleed Ahmad on how to get ahead of Year 12, prioritise your
                subjects properly, and set up a study system that still works in February, when most students
                are running on empty.
              </p>

              <div className="mt-7 flex items-center gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-brand-purple/10">
                <Image
                  src="/photos/waleed-grad-portrait.jpg"
                  alt="Dr Waleed Ahmad at his graduation"
                  width={64}
                  height={64}
                  unoptimized
                  className="h-16 w-16 rounded-full object-cover object-top"
                />
                <div>
                  <p className="font-semibold text-brand-purple">Dr Waleed Ahmad, MBBS</p>
                  <p className="text-sm leading-relaxed text-brand-text/70">
                    NHS doctor. Founder of A-Level Accelerators. 1,000+ A-level students over 6 years, and on
                    average our students jump two grades.
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  'Which subject gets your hours, and why',
                  'The high-yield topics in each of your subjects',
                  'A weekly plan that survives the Christmas slump',
                  'The method that gets content to stick first time',
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-brand-text/80">
                    <span aria-hidden="true" className="mt-1 inline-block h-5 w-5 flex-none rounded-full bg-brand-gold/25 text-center text-xs font-bold leading-5 text-brand-purple">
                      ✓
                    </span>
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="signup" className="scroll-mt-24">
              <WorkshopForm />
            </div>
          </div>
        </section>

        {/* What you leave with */}
        <section className="px-5 py-14">
          <div className="mx-auto max-w-5xl">
            <p className={`${EYEBROW} text-center`}>What you leave with</p>
            <h2 className="mt-2 text-center font-serif text-3xl font-bold text-brand-purple">
              Four things you can use on Monday morning.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TAKEAWAYS.map(([title, body], i) => (
                <div key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10">
                  <p className="font-mono text-xs text-brand-gold">0{i + 1}</p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-brand-purple">{title}</h3>
                  <p className="mt-2 leading-relaxed text-brand-text/75">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why a doctor */}
        <section className="px-5 pb-14">
          <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-3xl bg-brand-purple px-6 py-10 text-brand-cream sm:px-10 lg:grid-cols-[1fr_1.4fr]">
            <Image
              src="/photos/waleed-scrubs-portrait.jpg"
              alt="Dr Waleed Ahmad in scrubs"
              width={420}
              height={520}
              unoptimized
              className="mx-auto h-72 w-56 rounded-2xl object-cover object-top shadow-xl lg:h-80 lg:w-64"
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Why a doctor is teaching this</p>
              <h2 className="mt-2 font-serif text-3xl font-bold">I was an average student until I changed how I studied.</h2>
              <p className="mt-4 leading-relaxed text-brand-cream/85">
                In Year 12 I worked hard and got average marks, and the hours kept going up while the grades
                stayed put. The thing that changed was not effort. It was realising that studying is a skill
                with a method, exactly like taking a history or reading an ECG, and nobody had ever taught me
                the method.
              </p>
              <p className="mt-3 leading-relaxed text-brand-cream/85">
                I rebuilt how I studied, finished top of my year, and got into medicine. For the last six years
                I have taught that system to more than 1,000 A-level students alongside working as a doctor.
                This workshop is the first 90 minutes of it, free, because Year 12 is the one year where getting
                it right early changes everything after.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-5 pb-16">
          <div className="mx-auto max-w-3xl">
            <p className={`${EYEBROW} text-center`}>Quick answers</p>
            <h2 className="mt-2 text-center font-serif text-3xl font-bold text-brand-purple">Before you ask.</h2>
            <dl className="mt-8 divide-y divide-brand-purple/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-purple/10">
              {FAQS.map(([q, a]) => (
                <div key={q} className="px-6 py-5">
                  <dt className="font-serif text-lg font-bold text-brand-purple">{q}</dt>
                  <dd className="mt-1.5 leading-relaxed text-brand-text/75">{a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 text-center">
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
          </div>
        </section>
      </main>

      {/* Mobile sticky bar: the page is read on a phone in a lecture theatre */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-purple/10 bg-white/95 p-3 backdrop-blur lg:hidden">
        <a
          href="#signup"
          className="block rounded-xl bg-brand-purple px-5 py-3.5 text-center font-semibold text-brand-cream"
        >
          Save my free place · {WORKSHOP.dateLabel}
        </a>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <Footer />
    </>
  )
}
