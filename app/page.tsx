import Image from 'next/image'
import Header from '@/components/header'
import PricingSection from '@/components/ui/pricing-section'
import FaqSection from '@/components/ui/faq-section'
import TestimonialSlider from '@/components/ui/testimonial-slider'
import { ScrollFade } from '@/components/ui/scroll-fade'

export const metadata = {
  title: 'Top 1% Study System - Stay Ahead Without Burning Out',
  description: 'Build a system to stay on top of your A-Level workload and improve your grades without wasting time.',
}

const Divider = () => (
  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
)

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif text-brand-gold mb-8 font-bold leading-tight">
            Why Most A-Level Students Fall Behind <span className="text-brand-cream">And How to Stay Ahead Without Burning Out</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Build a system to stay on top of your workload, improve your grades, and stop feeling behind!
          </p>
          <a
            href="#tiers"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Problem Statement */}
      <ScrollFade>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              The Real Challenge Isn&apos;t the Content, It&apos;s Managing Everything
            </h2>
            <div className="space-y-6 text-lg text-brand-text text-center">
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
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What You&apos;ll Learn Over 4 Weeks
            </h2>

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

      {/* Testimonials Slider */}
      <TestimonialSlider />

      <Divider />

      {/* Tier Comparison Table */}
      <ScrollFade delay={0.2}>
        <section id="tiers" className="pt-20 pb-6 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              Choose Your Level of Support
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-2xl mx-auto">
              Most students choose the Accelerator for faster results, accountability and direct support.
            </p>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-4">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left w-1/5"></th>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-1/5">Study Series</th>
                    <th className="bg-brand-gold text-brand-purple p-4 text-left font-semibold w-3/10">Study Accelerator</th>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-3/10">Top 1% Mentorship</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Price</td>
                    <td className="p-4 w-1/5"><span className="text-xl font-bold text-brand-gold">£119</span></td>
                    <td className="p-4 w-3/10 bg-brand-gold bg-opacity-10"><span className="text-xl font-bold text-brand-gold">£499</span></td>
                    <td className="p-4 w-3/10"><span className="text-xl font-bold text-brand-gold">£2,000/yr</span></td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Focus</td>
                    <td className="p-4 w-1/5">Learn the System</td>
                    <td className="p-4 w-3/10 bg-brand-gold bg-opacity-10">Implement the System</td>
                    <td className="p-4 w-3/10">Optimise &amp; Accelerate</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Live Sessions</td>
                    <td className="p-4 w-1/5"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                    <td className="p-4 w-3/10 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> 12 sessions + weekly accountability</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Fortnightly calls, year-round</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Group Q&amp;A</td>
                    <td className="p-4 w-1/5"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                    <td className="p-4 w-3/10 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Ongoing</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">1:1 Support</td>
                    <td className="p-4 w-1/5"></td>
                    <td className="p-4 w-3/10 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> Personalised guidance</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> 24/7 access to Dr. Waleed</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Personal Plan</td>
                    <td className="p-4 w-1/5"></td>
                    <td className="p-4 w-3/10 bg-brand-gold bg-opacity-10"><span className="text-green-700 font-bold">✓</span> Templates &amp; feedback</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Fully customised</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Cohort Start Date — seamlessly continues the gradient section above */}
      <ScrollFade delay={0.2}>
        <section className="pt-6 pb-16 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full px-6 py-2 mb-4">
                <p className="text-brand-purple font-semibold text-sm uppercase tracking-wide">Limited Spots Available</p>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-4">
                Next Cohort Starts Wednesday, May 6th
              </h3>
              <p className="text-lg text-brand-text mb-6">
                Secure your spot before the programme fills up
              </p>
              <a
                href="#pricing-cards"
                className="inline-block px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-purple-light text-brand-cream font-semibold rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
              >
                Join Now →
              </a>
            </div>
          </div>
        </section>
      </ScrollFade>

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
      <footer id="contact" className="bg-brand-purple text-brand-cream py-8 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-2">
            <a href="/#hero" className="relative overflow-hidden md:flex-1 h-36 flex justify-center items-center hover:opacity-80 transition">
              <Image
                src="/logo-header.png?v=2"
                alt="A-Level Accelerators"
                width={400}
                height={400}
                className="absolute h-[27rem] w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                unoptimized
              />
            </a>
            <div className="hidden md:block w-px h-36 bg-brand-gold opacity-40 flex-shrink-0"></div>
            <div className="md:hidden h-px w-40 bg-brand-gold opacity-30"></div>
            <div className="md:flex-1 text-center">
              <h3 className="text-lg text-white font-bold mb-4 text-center">Get in Touch</h3>
              <div className="grid grid-cols-3 gap-x-6 text-sm max-w-xs mx-auto">
                <a href="mailto:Waleed@alevelaccelerators.com" className="text-brand-gold hover:text-white transition text-center">Email</a>
                <a href="https://scheduler.zoom.us/dr-waleed-ahmad/top-1-mentorship-meeting" className="text-brand-gold hover:text-white transition text-center">Book a Call</a>
                <a href="/revision-tracker" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-white transition text-center whitespace-nowrap">Free Revision Tracker</a>
              </div>
            </div>
          </div>
          <div className="h-px bg-brand-gold opacity-20 my-4"></div>
          <p className="text-center text-xs opacity-60">
            &copy; 2026 A-Level Accelerators. All rights reserved. | Helping A-Level students become the top of their class.
          </p>
        </div>
      </footer>
    </main>
  )
}
