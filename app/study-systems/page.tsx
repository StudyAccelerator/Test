import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import PricingSection from '@/components/ui/pricing-section'
import FaqSection from '@/components/ui/faq-section'
import TestimonialWall from '@/components/home/testimonial-wall'
import { ScrollFade } from '@/components/ui/scroll-fade'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'

export const metadata = {
  title: 'Top 1% Study System - Stay Ahead Without Burning Out',
  description: 'Discover A-Level study systems from A-Level Accelerators, UK, designed to improve revision, time management, and exam performance for better results.',
  alternates: { canonical: 'https://alevelaccelerators.com/study-systems/' },
}

const Divider = () => (
  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
)

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Top 1% Study System',
  serviceType: 'A-level study skills programme',
  description:
    'A structured A-level study system covering revision methods, time management and exam performance, built around active recall and spaced repetition.',
  url: 'https://alevelaccelerators.com/study-systems/',
  areaServed: 'GB',
  provider: { '@type': 'Organization', '@id': 'https://alevelaccelerators.com/#organization' },
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-brand-cream pt-16 pb-16 md:pt-24 md:pb-20 px-6 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative max-w-4xl mx-auto">
          <HeroFade delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/10 bg-brand-purple/[0.04] px-4 py-1.5 text-sm font-semibold text-brand-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              Top 1% Study System
            </span>
          </HeroFade>
          <h1 className="mt-6 font-serif font-bold tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl text-brand-purple">
            <HeroHeadline>
              <HeroWord>Why</HeroWord> <HeroWord>Most</HeroWord> <HeroWord>A-Level</HeroWord>{' '}
              <HeroWord>Students</HeroWord> <HeroWord>Fall</HeroWord> <HeroWord>Behind,</HeroWord>{' '}
              <HeroWord>and</HeroWord> <HeroWord>How</HeroWord> <HeroWord>to</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">Stay</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">Ahead</HeroWord>{' '}
              <HeroWord>Without</HeroWord> <HeroWord>Burning</HeroWord> <HeroWord>Out</HeroWord>
            </HeroHeadline>
          </h1>
          <HeroFade delay={0.45}>
            <p className="mt-6 text-lg md:text-xl text-brand-text/75 leading-relaxed max-w-2xl mx-auto">
              Build a system to stay on top of your workload, improve your grades, and stop feeling behind!
            </p>
          </HeroFade>
          <HeroFade delay={0.55}>
            <a
              href="#tiers"
              className="mt-9 inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
            >
              See How It Works
            </a>
          </HeroFade>
        </div>
      </section>

      {/* Problem Statement */}
      <ScrollFade>
        <section className="py-20 px-4 bg-brand-purple border-y-2 border-brand-gold/40">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-gold font-serif text-center mb-12">
              The Real Challenge Isn&apos;t the Content, It&apos;s Managing Everything
            </h2>
            <div className="space-y-6 text-lg text-brand-cream/90 text-center">
              <p>You are juggling lessons, homework, revision, exams and university applications all at once.</p>
              <p>Most students respond by working harder. But that is exactly why they stay stuck.</p>
              <p className="text-brand-gold font-semibold pt-4">You&apos;re not struggling because you&apos;re lazy. You&apos;re struggling because you&apos;re using the wrong system.</p>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Solution Section - What Top Students Do Differently */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-16">
              What Top Students Do Differently
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-6">Most students:</h3>
                <ul className="space-y-3 text-lg text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-xl">✗</span>
                    <span>Try to do everything at once</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-xl">✗</span>
                    <span>Study for hours and see no improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-xl">✗</span>
                    <span>Rely on willpower and burn out</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-6">Top students:</h3>
                <ul className="space-y-3 text-lg text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Focus only on what moves the needle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Follow a system, not a feeling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Stay consistent without burning out</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-xl text-center text-brand-purple font-semibold">
              That is exactly what you will learn inside the Top 1% Study Series.
            </p>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Programme Breakdown - 4 Weeks */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-brand-cream">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              The System You&apos;ll Learn in the First 4 Weeks
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-3xl mx-auto italic">
              This is the foundation, taught live across the four Study Series sessions. The Top 1% Mentorship then builds on it, working directly with Dr Waleed.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 1</h3>
                <p className="text-brand-gold font-bold mb-4">Take Control of Your Workload</p>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span><strong>Identify what actually matters</strong> (and what doesn&apos;t)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Build a weekly system you can realistically follow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Stop wasting time on low-impact work</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 2</h3>
                <p className="text-brand-gold font-bold mb-4">Stop Procrastinating and Start Executing</p>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span><strong>Understand why you procrastinate</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Build a system to start work quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Stay consistent without relying on motivation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 3</h3>
                <p className="text-brand-gold font-bold mb-4">Handle a Heavy Workload Without Burning Out</p>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span><strong>Avoid overload and last-minute stress</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Manage your time and energy properly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Stay productive without exhausting yourself</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 4</h3>
                <p className="text-brand-gold font-bold mb-4">Revise and Improve Like a Top Student</p>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span><strong>Learn how to actually improve weak topics</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Use the right revision method for the right situation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Turn mistakes into progress using structured feedback</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Why Trust Us - With Image */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-16">
              Why Trust Us
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-16">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-80 h-80 overflow-hidden rounded-2xl"
                  style={{boxShadow: '3px 3px 8px rgba(46, 37, 87, 0.18)'}}
                >
                  <Image
                    src="/graduation.jpg"
                    alt="Dr Waleed Ahmad"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    style={{objectPosition: 'center 45%', transform: 'scale(1.25)', transformOrigin: 'center 45%'}}
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm italic text-brand-gold font-semibold">Dr. Waleed Ahmad, MBBS</p>
              </div>

              <div className="border-2 border-brand-gold rounded-xl p-6 bg-white max-w-md">
                <div className="space-y-4">
                  <p className="text-lg text-brand-text leading-relaxed">
                    As a doctor and former top-performing A-Level student, I have worked with over 1,000 students to help them improve their grades, manage their workload, and build study systems that actually work.
                  </p>
                  <p className="text-lg text-brand-text leading-relaxed">
                    I built these systems myself while going through A-Levels, and I know first-hand what it takes to perform under pressure without burning out. Now I teach students how to use them across every subject.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Tier Comparison Table */}
      <ScrollFade delay={0.2}>
        <section id="tiers" className="pt-20 pb-6 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              Choose Your Level of Support
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-2xl mx-auto">
              The Study Series teaches the system in four live sessions. The Top 1% Mentorship installs it, working directly with Dr Waleed.
            </p>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-4">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left w-1/3"></th>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-1/3">Study Series</th>
                    <th className="bg-brand-gold text-brand-purple p-4 text-left font-semibold w-1/3">Top 1% Mentorship</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/3">Price</td>
                    <td className="p-4 w-1/3"><span className="text-xl font-bold text-brand-gold">£119</span></td>
                    <td className="p-4 w-1/3 bg-brand-gold bg-opacity-10"><span className="text-xl font-bold text-brand-gold">£300/month</span></td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/3">Focus</td>
                    <td className="p-4 w-1/3">Learn the System</td>
                    <td className="p-4 w-1/3 bg-brand-gold bg-opacity-10">Optimise &amp; Accelerate</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/3">Live Sessions</td>
                    <td className="p-4 w-1/3"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                    <td className="p-4 w-1/3 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> Fortnightly calls, year-round</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/3">Group Q&amp;A</td>
                    <td className="p-4 w-1/3"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                    <td className="p-4 w-1/3 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> Ongoing</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/3">1:1 Support</td>
                    <td className="p-4 w-1/3"></td>
                    <td className="p-4 w-1/3 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> 24/7 access to Dr. Waleed</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/3">Personal Plan</td>
                    <td className="p-4 w-1/3"></td>
                    <td className="p-4 w-1/3 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> Fully customised</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Testimonials: proof before pitch */}
      <TestimonialWall />

      {/* Pricing Section (detailed cards) */}
      <ScrollFade delay={0.2}>
        <div id="pricing-cards">
          <PricingSection />
        </div>
      </ScrollFade>

      <Divider />

      {/* Guarantee Section */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="bg-brand-cream p-12 rounded-lg shadow-lg border-4 border-brand-gold text-center">
              <div className="text-5xl mb-6">🛡️</div>
              <h2 className="text-3xl md:text-4xl text-brand-purple font-serif font-bold mb-6">
                Try Your First Session Risk-Free
              </h2>
              <p className="text-lg text-brand-text">
                If the first session is not valuable, you can request a full refund <span className="italic text-brand-text opacity-75">(no questions asked)</span>.
              </p>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* FAQ Section */}
      <ScrollFade delay={0.2}>
        <FaqSection />
      </ScrollFade>

      <Divider />

      {/* Final CTA Section */}
      <ScrollFade delay={0.2}>
        <section className="py-24 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-8">
              Stop Falling Behind, Fix Your Systems Now!
            </h2>
            <p className="text-base italic text-brand-text mb-8 leading-relaxed">
              The earlier you fix this, the easier A-Levels become. The longer you wait, the harder it is to catch up.
            </p>
            <a
              href="#pricing-cards"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Join the Programme
            </a>
          </div>
        </section>
      </ScrollFade>

      {/* Footer */}
      <Footer />
    </main>
  )
}
