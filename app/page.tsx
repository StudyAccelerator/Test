import Image from 'next/image'
import Header from '@/components/header'
import PricingSection from '@/components/ui/pricing-section'
import FaqSection from '@/components/ui/faq-section'
import { ScrollFade } from '@/components/ui/scroll-fade'

export const metadata = {
  title: 'Top 1% Study System - Stay Ahead Without Burning Out',
  description: 'Build a system to stay on top of your A-Level workload and improve your grades without wasting time.',
}

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif text-brand-gold mb-8 font-bold leading-tight">
            Why Most A-Level Students Fall Behind <span className="text-brand-cream">And How to Stay Ahead Without Burning Out</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Build a system to stay on top of your workload and improve your grades without wasting time.
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
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              The Real Challenge Isn&apos;t the Content—It&apos;s Managing Everything
            </h2>
            <div className="space-y-6 text-lg text-brand-text text-center">
              <p>You are juggling lessons, homework, revision, exams and university applications all at once.</p>
              <p>Most students respond by working harder. But that is exactly why they stay stuck.</p>
              <p className="text-brand-gold font-semibold pt-4">You&apos;re not struggling because you&apos;re lazy. You&apos;re struggling because you&apos;re using the wrong system.</p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Solution Section - What Top Students Do Differently */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-16">
              What Top Students Do Differently
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-brand-light-gray p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-6">Top students do not:</h3>
                <ul className="space-y-3 text-lg text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold text-xl">✗</span>
                    <span>Try to do everything</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold text-xl">✗</span>
                    <span>Study longer just to feel productive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold text-xl">✗</span>
                    <span>Rely on motivation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-light-gray p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-6">Instead, they:</h3>
                <ul className="space-y-3 text-lg text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold text-xl">✓</span>
                    <span>Focus on high-impact work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold text-xl">✓</span>
                    <span>Follow a clear system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold text-xl">✓</span>
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

      {/* Programme Breakdown - 4 Weeks */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What You&apos;ll Learn Over 4 Weeks
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 1</h3>
                <p className="text-brand-gold font-semibold mb-4">Take Control of Your Workload</p>
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
                <p className="text-brand-gold font-semibold mb-4">Stop Procrastinating and Start Executing</p>
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
                <p className="text-brand-gold font-semibold mb-4">Handle a Heavy Workload Without Burning Out</p>
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
                <p className="text-brand-gold font-semibold mb-4">Revise and Improve Like a Top Student</p>
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

      {/* Why Trust Us - With Image */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-16">
              Why Trust Us
            </h2>

            <div className="grid md:grid-cols-2 gap-2 items-start md:items-center mb-16">
              <div className="flex justify-center">
                <div className="relative w-48">
                  <div className="absolute -bottom-2 -left-2 w-full h-full rounded-lg bg-brand-purple opacity-15"></div>
                  <div className="relative w-full overflow-hidden rounded-lg" style={{height: '280px'}}>
                    <Image
                      src="/graduation.jpg"
                      alt="Dr Waleed Ahmad"
                      fill
                      className="object-cover"
                      style={{objectPosition: 'center -20px'}}
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:text-left">
                <p className="text-lg text-brand-text leading-relaxed">
                  I have worked with over 1,000 students to help them improve their grades, manage their workload and build study systems that actually work.
                </p>
                <p className="text-lg text-brand-text leading-relaxed">
                  As a medical doctor and former top-performing A-Level student, I understand what it takes to perform under pressure without burning out.
                </p>
                <p className="text-lg text-brand-text leading-relaxed">
                  I built these systems myself while going through A-Levels, and now I teach students how to use them across every subject.
                </p>
              </div>
            </div>

            <h3 className="text-2xl text-brand-purple font-serif text-center mb-8">
              What Students Say
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  before: 'Was falling behind and unsure how to catch up',
                  after: 'Now has a clear system that works',
                  result: 'Caught up with her workload and improved her grades'
                },
                {
                  before: 'Studied for hours but saw no improvement',
                  after: 'Learned to study strategically',
                  result: 'Improved grades while studying less'
                },
                {
                  before: 'Felt overwhelmed and burnt out',
                  after: 'Now has a sustainable approach',
                  result: 'This helped me improve without burning out'
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-brand-light-gray p-8 rounded-lg shadow-sm">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-brand-gold mb-2">Before</p>
                    <p className="text-brand-text">{testimonial.before}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-brand-gold mb-2">After</p>
                    <p className="text-brand-text">{testimonial.after}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-gold mb-2">Result</p>
                    <p className="text-brand-text font-semibold">{testimonial.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Tier Comparison Table */}
      <ScrollFade delay={0.2}>
        <section id="tiers" className="py-20 px-4 bg-brand-light-gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              Choose Your Level of Support
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-2xl mx-auto">
              Most students choose the Accelerator for faster results, accountability and direct support.
            </p>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-16">
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

      {/* Pricing Section (detailed cards) */}
      <ScrollFade delay={0.2}>
        <div id="pricing-cards">
          <PricingSection />
        </div>
      </ScrollFade>

      {/* Guarantee Section */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-brand-light-gray">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-12 rounded-lg shadow-lg border-4 border-brand-gold text-center">
              <div className="text-5xl mb-6">🛡️</div>
              <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
                Try Your First Session Risk-Free
              </h2>
              <p className="text-lg text-brand-text">
                If the first session is not valuable, you can request a full refund.
              </p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* FAQ Section */}
      <ScrollFade delay={0.2}>
        <FaqSection />
      </ScrollFade>

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
      <footer id="contact" className="bg-brand-purple text-brand-cream pt-2 px-8 text-center pb-2">
        <div className="max-w-3xl mx-auto">
          <a href="#top" className="block">
            <Image
              src="/logo-header.png?v=2"
              alt="A-Level Accelerators"
              width={400}
              height={400}
              className="h-80 w-auto mx-auto -my-12 hover:opacity-80 transition"
              unoptimized
            />
          </a>
          <div className="py-2">
            <h3 className="text-lg text-brand-gold font-serif mb-4 text-center">Get in Touch</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-3 text-sm">
              <a href="mailto:contact@alevelaccelerators.com" className="text-brand-gold hover:text-white transition">Email</a>
              <a href="ZOOM_BOOKING_LINK" className="text-brand-gold hover:text-white transition">Book a Call</a>
              <a href="/revision-tracker.html" className="text-brand-gold hover:text-white transition">Free Revision Tracker</a>
            </div>
            <p className="opacity-80 text-xs">
              &copy; 2026 A-Level Accelerators. All rights reserved. | Helping A-Level students become the top of their class.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
