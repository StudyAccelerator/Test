import Image from 'next/image'
import Header from '@/components/header'
import PricingSection from '@/components/ui/pricing-section'
import FaqSection from '@/components/ui/faq-section'
import { ScrollFade } from '@/components/ui/scroll-fade'

export const metadata = {
  title: 'Top 1% Study System - Stay Ahead Without Burning Out',
  description: 'Build a system to stay on top of your A-Level workload, improve your grades, and stop wasting time on ineffective revision.',
}

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif text-brand-gold mb-6 font-bold">
            Why Most A-Level Students Fall Behind <span className="text-brand-cream">And How to Stay Ahead Without Burning Out</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-6 opacity-95 max-w-3xl mx-auto">
            Build a system to stay on top of your workload, improve your grades, and stop wasting time on ineffective revision.
          </p>
          <p className="text-lg md:text-xl mb-10 opacity-85 max-w-2xl mx-auto">
            Designed for Year 12 &amp; 13 students who feel overwhelmed, behind, or unsure how to study effectively.
          </p>
          <a
            href="#tiers"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Choose Your Programme
          </a>
        </div>
      </section>

      {/* Problem Statement */}
      <ScrollFade>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-8">
              The Real Challenge Isn&apos;t the Content... It&apos;s Managing Everything
            </h2>
            <p className="text-lg mb-6 text-brand-text">
              You&apos;re juggling classes, homework, revision, exams, and university applications, all at the same time.
            </p>
            <p className="text-lg mb-6 text-brand-text">
              Most students try to cope by working harder.
            </p>
            <p className="text-lg mb-6 text-brand-text">
              But that&apos;s where things go wrong.
            </p>
            <p className="text-lg mb-4 text-brand-text font-semibold">They:</p>
            <ul className="text-lg text-brand-text space-y-2 mb-8 inline-block text-left">
              <li>• Spend hours revising without improving</li>
              <li>• Feel constantly behind</li>
              <li>• Don&apos;t know what to prioritise</li>
              <li>• Burn out before it matters most</li>
            </ul>
            <p className="text-xl text-brand-text mt-6">
              <span className="text-brand-gold font-semibold">The problem isn&apos;t how much you have to do, it&apos;s that you don&apos;t have a system to handle it.</span>
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Solution Section - What Top Students Do Differently */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-8">
              What Top Students Do Differently
            </h2>
            <p className="text-lg mb-6 text-brand-text">
              Top students aren&apos;t working more hours.
            </p>
            <p className="text-lg mb-6 text-brand-text">
              They&apos;re using better systems.
            </p>
            <p className="text-lg mb-4 text-brand-text font-semibold">They know:</p>
            <ul className="text-lg text-brand-text space-y-2 mb-8 inline-block text-left">
              <li>• What actually improves their grades</li>
              <li>• How to structure their time effectively</li>
              <li>• How to revise in a way that actually sticks</li>
              <li>• How to stay consistent without burning out</li>
            </ul>
            <p className="text-xl text-brand-text mt-6">
              <span className="text-brand-gold font-semibold">That&apos;s exactly what you&apos;ll learn inside the Top 1% Study Series.</span>
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Programme Breakdown - 4 Weeks */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What You&apos;ll Learn Over 4 Weeks
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 1</h3>
                <h4 className="text-xl font-semibold text-brand-gold mb-4">Take Control of Your Workload</h4>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Identify what actually matters (and what doesn&apos;t)</span>
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

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 2</h3>
                <h4 className="text-xl font-semibold text-brand-gold mb-4">Stop Procrastinating and Start Executing</h4>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Understand why you procrastinate</span>
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

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 3</h3>
                <h4 className="text-xl font-semibold text-brand-gold mb-4">Handle a Heavy Workload Without Burning Out</h4>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Avoid overload and last-minute stress</span>
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

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Week 4</h3>
                <h4 className="text-xl font-semibold text-brand-gold mb-4">Revise and Improve Like a Top Student</h4>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Learn how to actually improve weak topics</span>
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

      {/* Who This Is For */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Who This Is For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-brand-light-gray p-6 rounded-lg flex items-start gap-4">
                <span className="text-3xl">📚</span>
                <p className="text-lg text-brand-text">Students who feel overwhelmed by A-Levels</p>
              </div>
              <div className="bg-brand-light-gray p-6 rounded-lg flex items-start gap-4">
                <span className="text-3xl">⚡</span>
                <p className="text-lg text-brand-text">Students working hard but not seeing results</p>
              </div>
              <div className="bg-brand-light-gray p-6 rounded-lg flex items-start gap-4">
                <span className="text-3xl">🎯</span>
                <p className="text-lg text-brand-text">Students unsure how to revise effectively</p>
              </div>
              <div className="bg-brand-light-gray p-6 rounded-lg flex items-start gap-4">
                <span className="text-3xl">🏆</span>
                <p className="text-lg text-brand-text">Students aiming for top grades and top universities</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Credentials Section */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Why Trust Us
            </h2>

            <div className="max-w-4xl mx-auto mb-16 bg-white p-8 rounded-lg shadow-sm">
              <p className="text-lg text-brand-text mb-4">
                All teaching is delivered by <span className="font-semibold text-brand-gold">Dr Waleed Ahmad</span>, a qualified medical doctor who has worked with thousands of students and consistently scores within the <span className="font-semibold text-brand-gold">top 1%</span>. He knows exactly what it takes to excel at A-Level because he&apos;s done it himself — and helped countless others achieve the same level of excellence.
              </p>
              <p className="text-lg text-brand-text">
                Whether through university applications, exam preparation, or study strategy coaching, <span className="font-semibold text-brand-gold">Dr Waleed</span> has helped over <span className="font-semibold text-brand-gold">1000+ students</span> achieve their dream universities and master the systems that set top performers apart.
              </p>
            </div>

            <h3 className="text-2xl text-brand-purple font-serif text-center mb-8">
              What Students Say
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                'Dr Waleed Ahmad is a great speaker and host! The sessions were very engaging and incredibly helpful.',
                'I found it really helpful and I liked all of the examples you used. It was a very engaging session. Thank you!',
                'I love each session because it is highly interactive. We can give answers which Dr Waleed gives feedback on — that\'s incredibly valuable.',
              ].map((quote, i) => (
                <div key={i} className="bg-white p-8 rounded-lg border-t-4 border-brand-gold shadow-sm italic text-brand-text">
                  <div className="text-4xl text-brand-gold leading-none mb-2">&ldquo;</div>
                  <p>{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Tier Comparison Table */}
      <ScrollFade delay={0.2}>
        <section id="tiers" className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Choose Your Level of Support
            </h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-16">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left w-1/5"></th>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-1/5">Study Series</th>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-3/10">Study Accelerator</th>
                    <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-3/10">Top 1% Mentorship</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Price</td>
                    <td className="p-4 w-1/5"><span className="text-xl font-bold text-brand-gold">£119</span></td>
                    <td className="p-4 w-3/10"><span className="text-xl font-bold text-brand-gold">£499</span></td>
                    <td className="p-4 w-3/10"><span className="text-xl font-bold text-brand-gold">£2,000/yr</span></td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Focus</td>
                    <td className="p-4 w-1/5">Learn the System</td>
                    <td className="p-4 w-3/10">Implement the System</td>
                    <td className="p-4 w-3/10">Optimise &amp; Accelerate</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Live Sessions</td>
                    <td className="p-4 w-1/5"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> 4 sessions + weekly accountability</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Bi-weekly 1:1 calls</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Group Q&amp;A</td>
                    <td className="p-4 w-1/5"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Ongoing</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">1:1 Support</td>
                    <td className="p-4 w-1/5"></td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Personalised guidance</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> 24/7 Access to Dr Waleed</td>
                  </tr>
                  <tr className="border-b border-brand-cream-dark">
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Personal Plan</td>
                    <td className="p-4 w-1/5"></td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Templates &amp; feedback</td>
                    <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Fully customised</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-brand-purple w-1/5">Best For</td>
                    <td className="p-4 w-1/5">Students who want clarity and structure</td>
                    <td className="p-4 w-3/10">Students who want support, accountability &amp; faster progress</td>
                    <td className="p-4 w-3/10">Serious students aiming for top grades &amp; competitive universities</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Pricing Section (detailed cards) */}
      <ScrollFade delay={0.2}>
        <div>
          <PricingSection />
        </div>
      </ScrollFade>

      {/* Guarantee Section */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white p-10 rounded-lg shadow-md border-2 border-brand-gold">
              <div className="text-5xl mb-4">🛡️</div>
              <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
                Try the First Session Risk-Free
              </h2>
              <p className="text-lg text-brand-text">
                If you attend the first session and don&apos;t find it valuable, you can request a full refund.{' '}
                <span className="text-brand-gold font-semibold">No questions asked!</span>
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
        <section className="py-32 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              Stop Falling Behind, Build Your System Now
            </h2>
            <p className="text-lg text-brand-text mb-4">
              The earlier you fix this, the easier A-Levels become.
            </p>
            <p className="text-lg text-brand-text mb-12">
              The longer you wait, the harder it gets to catch up.
            </p>
            <a
              href="#tiers"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Join the Programme
            </a>
          </div>
        </section>
      </ScrollFade>

      {/* Footer */}
      <footer id="contact" className="bg-brand-purple text-brand-cream pt-8 px-8 text-center pb-8">
        <div className="max-w-3xl mx-auto">
          <a href="#top" className="block">
            <Image
              src="/logo-header.png?v=2"
              alt="A-Level Accelerators"
              width={400}
              height={400}
              className="h-96 w-auto mx-auto -my-16 hover:opacity-80 transition"
              unoptimized
            />
          </a>
          <div className="py-6">
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
