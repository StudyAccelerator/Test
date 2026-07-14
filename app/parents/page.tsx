import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { HeroFade, HeroHeadline, HeroWord } from '@/components/home/hero-reveal'
import { ScrollFade } from '@/components/ui/scroll-fade'
import ParentsForm from './parents-form'

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-brand-purple/60'

export const metadata: Metadata = {
  title: "Free Parents' Guide",
  description:
    'Download the free parent guide that explains why your child may be working hard but still not getting the grades they need, and the free plan to fix it.',
  alternates: { canonical: 'https://alevelaccelerators.com/parents/' },
}

const INSIDE: [string, string][] = [
  [
    'The real reason grades stall',
    'Why effort alone stops converting into marks, and why more hours on the same method will not move the grade.',
  ],
  [
    'The four tiers of exam performance',
    'The skill levels that separate B students from A and A* students, and where your child is probably stuck.',
  ],
  [
    'Three questions to ask your child this week',
    'They open a conversation about how your child studies, not just how much. The answers tell you more than any report card.',
  ],
  [
    'A free plan you can start tonight',
    'Step by step: the diagnostic, the tracker and the weekly newsletter, before you spend a penny on help.',
  ],
]

const parentsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free Parent Guide',
  url: 'https://alevelaccelerators.com/parents/',
  description:
    'A free guide for parents that explains why a child may be working hard at A-level but still not getting the grades they need, and what actually moves results.',
  isPartOf: { '@type': 'WebSite', '@id': 'https://alevelaccelerators.com/#website' },
  about: { '@type': 'Organization', '@id': 'https://alevelaccelerators.com/#organization' },
}

export default function ParentsLanding() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(parentsSchema) }}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-5 pb-12 pt-12 text-center sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <h1
              aria-label="Working hard, but the grades are not moving?"
              className="font-serif text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl"
            >
              <span className={`${EYEBROW} mb-3 block font-normal`}>
                Free parents&apos; guide · for parents of A-level students
              </span>
              <HeroHeadline>
                <HeroWord>Working</HeroWord> <HeroWord>hard,</HeroWord>{' '}
                <HeroWord>but</HeroWord> <HeroWord>the</HeroWord> <HeroWord>grades</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">aren&apos;t</HeroWord>{' '}
                <HeroWord className="italic text-brand-gold">moving?</HeroWord>
              </HeroHeadline>
            </h1>
            <HeroFade delay={0.35}>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-text/70">
                If your child puts the hours in and the results still don&apos;t show it, effort
                isn&apos;t the problem. The free parents&apos; guide explains what is, and gives you
                a plan you can start this week. Written by Dr Waleed Ahmad, MBBS.
              </p>
            </HeroFade>
            <HeroFade delay={0.5}>
              <div className="mt-8">
                <a
                  href="#get-guide"
                  className="inline-block rounded-md bg-brand-gold px-10 py-4 text-lg font-bold text-brand-purple transition-all hover:-translate-y-0.5 hover:bg-brand-gold-light hover:shadow-lg"
                >
                  Get the Free Guide
                </a>
              </div>
            </HeroFade>
          </div>
        </section>

        {/* ── What's inside ─────────────────────────────────────────────── */}
        <section className="px-5 pb-4">
          <div className="mx-auto max-w-4xl">
            <p className={`${EYEBROW} text-center`}>Inside the guide</p>
            <h2 className="mt-2 text-center font-serif text-3xl font-bold text-brand-purple">
              A short read. Nothing padded.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-brand-text/70">
              Written for parents who can see their child trying hard but not getting the results
              they deserve.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {INSIDE.map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10"
                >
                  <h3 className="font-serif text-xl font-bold text-brand-purple">{title}</h3>
                  <p className="mt-2 leading-relaxed text-brand-text/75">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who wrote it ──────────────────────────────────────────────── */}
        <ScrollFade>
          <section className="px-5 py-14">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
              <div className="flex flex-shrink-0 flex-col items-center">
                <div
                  className="h-56 w-56 overflow-hidden rounded-2xl"
                  style={{ boxShadow: '3px 3px 8px rgba(46, 37, 87, 0.18)' }}
                >
                  <Image
                    src="/graduation.jpg"
                    alt="Dr Waleed Ahmad"
                    width={224}
                    height={224}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: 'center 45%',
                      transform: 'scale(1.25)',
                      transformOrigin: 'center 45%',
                    }}
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm font-semibold italic text-brand-gold">
                  Dr Waleed Ahmad, MBBS
                </p>
                <p className="text-xs text-brand-text/60">Founder, A-Level Accelerators</p>
              </div>

              <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10">
                <p className={EYEBROW}>Who wrote it</p>
                <p className="mt-3 leading-relaxed text-brand-text/80">
                  I&apos;m a doctor and a former top-performing A-level student, and I&apos;ve
                  worked with over <strong className="text-brand-purple">1,000 students</strong> on
                  their grades, their workload and their study systems.
                </p>
                <p className="mt-3 leading-relaxed text-brand-text/80">
                  I wrote this guide for parents who can see their child is trying hard but not
                  getting the results they deserve. It tells you why, without the jargon, and what
                  to do next.
                </p>
              </div>
            </div>
          </section>
        </ScrollFade>

        {/* ── Form ──────────────────────────────────────────────────────── */}
        <section id="get-guide" className="scroll-mt-24 px-5 pb-14">
          <div className="mx-auto max-w-4xl rounded-2xl bg-brand-purple px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center text-brand-cream">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cream/50">
                  Free, straight to your inbox
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-brand-gold">
                  Get your free guide
                </h2>
                <p className="mt-2 text-lg opacity-90">
                  Enter your details below and we&apos;ll send it over within a minute.
                </p>
              </div>
              <ParentsForm />
            </div>
          </div>
        </section>

        {/* ── The free tools the guide points to ────────────────────────── */}
        <ScrollFade>
          <section className="px-5 pb-16">
            <div className="mx-auto max-w-4xl">
              <p className={`${EYEBROW} text-center`}>While the guide is on its way</p>
              <h2 className="mt-2 text-center font-serif text-3xl font-bold text-brand-purple">
                See the problem before you fix it.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-brand-text/70">
                Everything the guide recommends is free and lives on this site. The best first step:
                ask your teenager to take the diagnostic tonight.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <a
                  href="/revision-diagnostic"
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow-md"
                >
                  <p className="font-serif text-lg font-bold text-brand-purple">
                    Revision Diagnostic
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text/70">
                    20 questions, about 4 minutes. Shows exactly where their revision is leaking
                    hours and marks, so you both know what to fix first.
                  </p>
                </a>
                <a
                  href="/revision-tracker"
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow-md"
                >
                  <p className="font-serif text-lg font-bold text-brand-purple">Revision Tracker</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text/70">
                    They rate their topics, it builds their week around the weakest ones, with a
                    method for every session.
                  </p>
                </a>
                <a
                  href="/newsletter"
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow-md"
                >
                  <p className="font-serif text-lg font-bold text-brand-purple">
                    The Sunday Session
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text/70">
                    My free weekly email for students. One revision method every Sunday at 5pm,
                    usable that evening.
                  </p>
                </a>
              </div>
            </div>
          </section>
        </ScrollFade>
      </main>
      <Footer />
    </>
  )
}
