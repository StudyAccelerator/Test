import Image from 'next/image'
import Header from '@/components/header'
import PricingSection from '@/components/ui/pricing-section'
import FaqSection from '@/components/ui/faq-section'
import { ScrollFade } from '@/components/ui/scroll-fade'

export const metadata = {
  title: 'Top 1% Study System - A-Level Excellence Programme',
  description: 'Master your A-Levels with our proven system. Choose from Series, Accelerator, or System tiers.',
}

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-serif text-brand-gold mb-6 font-bold">
            Master Your A-Levels
          </h1>
          <p className="text-2xl md:text-3xl mb-8 opacity-95 max-w-2xl mx-auto">
            Learn the exact systems used by top students. Transform your study habits, boost your confidence, and achieve your dream grades.
          </p>
          <a
            href="#tiers"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            View Our Programmes
          </a>
        </div>
      </section>

      {/* Problem Statement */}
      <ScrollFade>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              The Challenge Every A-Level Student Faces
            </h2>
          <p className="text-lg mb-6 text-brand-text">
            You&apos;re juggling mocks, coursework, personal statements, university applications, and mountains of content to revise. The pressure is overwhelming, and{' '}
            <span className="text-brand-gold font-semibold">working harder isn&apos;t the answer</span>.
          </p>
          <p className="text-lg mb-6 text-brand-text">
            Most students spend hours studying without a system. They revise topics that feel easy, hide from their weaknesses, and wonder why they&apos;re not improving despite the effort.
          </p>
          <p className="text-lg text-brand-text">
            <span className="text-brand-gold font-semibold">The secret isn&apos;t more work — it&apos;s better systems.</span>
          </p>
          </div>
        </section>
      </ScrollFade>

      {/* Credentials Section */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
            Why Trust Us
          </h2>

          <div className="max-w-4xl mx-auto mb-16 bg-brand-light-gray p-8 rounded-lg">
            <p className="text-lg text-brand-text mb-4">
              All teaching is delivered by <span className="font-semibold text-brand-gold">Dr Waleed Ahmad</span>, a qualified medical doctor who has worked with thousands of students and consistently scores within the <span className="font-semibold text-brand-gold">top 1%</span>. He knows exactly what it takes to excel at A-Level because he's done it himself — and helped countless others achieve the same level of excellence.
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
        <section id="tiers" className="py-16 px-4 bg-brand-light-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
            Three Paths to Excellence
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-16">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="bg-brand-purple text-brand-cream p-4 text-left w-1/5"></th>
                  <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-1/5">Study Series</th>
                  <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-3/10">Study Accelerator</th>
                  <th className="bg-brand-purple text-brand-cream p-4 text-left font-semibold w-3/10">Study System</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-4 font-semibold text-brand-purple w-1/5">Price</td>
                  <td className="p-4 w-1/5"><span className="text-xl font-bold text-brand-gold">£119</span></td>
                  <td className="p-4 w-3/10"><span className="text-xl font-bold text-brand-gold">£499</span></td>
                  <td className="p-4 w-3/10"><span className="text-xl font-bold text-brand-gold">From £2,000/yr</span></td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-4 font-semibold text-brand-purple w-1/5">Format</td>
                  <td className="p-4 w-1/5">4 live group sessions</td>
                  <td className="p-4 w-3/10">Three Months of Application-Focused Support</td>
                  <td className="p-4 w-3/10">Complete 1:1 programme</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-4 font-semibold text-brand-purple w-1/5">Live Sessions</td>
                  <td className="p-4 w-1/5"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Weekly 1:1 calls</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-4 font-semibold text-brand-purple w-1/5">Group Q&amp;A</td>
                  <td className="p-4 w-1/5"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Ongoing</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-4 font-semibold text-brand-purple w-1/5">1:1 Coaching</td>
                  <td className="p-4 w-1/5"></td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Coaching community access</td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> 24/7 Access to Dr Waleed</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-4 font-semibold text-brand-purple w-1/5">Personal Plan</td>
                  <td className="p-4 w-1/5"></td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Templates & deep dives</td>
                  <td className="p-4 w-3/10"><span className="text-green-700 font-bold">✓</span> Fully customised</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-brand-purple w-1/5">Best For</td>
                  <td className="p-4 w-1/5">Getting the core system</td>
                  <td className="p-4 w-3/10">Extra support &amp; accountability</td>
                  <td className="p-4 w-3/10">Complete transformation</td>
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

      {/* FAQ Section */}
      <ScrollFade delay={0.2}>
        <FaqSection />
      </ScrollFade>

      {/* CTA Section */}
      <ScrollFade delay={0.2}>
        <section className="py-32 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              Ready to Transform Your A-Levels?
            </h2>
            <p className="text-lg text-brand-text mb-12">
              Choose the programme that fits your needs and start applying proven systems today.
            </p>
            <a
              href="#tiers"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              View All Programmes
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
