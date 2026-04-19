import Image from 'next/image'
import PricingSection from '@/components/ui/pricing-section'
import FaqSection from '@/components/ui/faq-section'

export const metadata = {
  title: 'Top 1% Study System - A-Level Excellence Programme',
  description: 'Master your A-Levels with our proven system. Choose from Series, Accelerator, or System tiers.',
}

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="bg-brand-purple text-brand-cream py-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Image
            src="/logo.png"
            alt="A-Level Accelerators"
            width={200}
            height={50}
            className="h-12 w-auto"
            priority
          />
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#tiers" className="text-brand-cream hover:text-brand-gold transition">Our Programmes</a>
            <a href="#faq" className="text-brand-cream hover:text-brand-gold transition">FAQs</a>
            <a href="#contact" className="text-brand-cream hover:text-brand-gold transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif text-brand-gold mb-6 font-bold">
            Master Your A-Levels
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-2xl mx-auto">
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

      {/* Credentials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
            Why Trust Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { number: '1000+', text: 'Students helped achieve their dream universities through tailored applications and study strategies' },
              { number: '200+', text: 'Five-star reviews from my Medical Interview Masterclass series' },
              { number: 'Med Degree', text: 'Qualified medical doctor who knows exactly what it takes to excel at A-Level' },
            ].map((cred, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border-l-4 border-brand-gold shadow-sm">
                <div className="text-4xl font-bold text-brand-gold mb-2">{cred.number}</div>
                <p className="text-brand-text">{cred.text}</p>
              </div>
            ))}
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

      {/* Tier Comparison Table */}
      <section id="tiers" className="py-16 px-4 bg-brand-light-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
            Three Paths to Excellence
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-brand-purple text-brand-cream p-6 text-left"></th>
                  <th className="bg-brand-purple text-brand-cream p-6 text-left font-semibold">Study Series</th>
                  <th className="bg-brand-purple text-brand-cream p-6 text-left font-semibold">Study Accelerator</th>
                  <th className="bg-brand-purple text-brand-cream p-6 text-left font-semibold">Study System</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">Price</td>
                  <td className="p-6"><span className="text-xl font-bold text-brand-gold">£89</span> (from £189)</td>
                  <td className="p-6"><span className="text-xl font-bold text-brand-gold">£499</span></td>
                  <td className="p-6"><span className="text-xl font-bold text-brand-gold">From £2,000/yr</span></td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">Format</td>
                  <td className="p-6">4 live group sessions</td>
                  <td className="p-6">Everything in Series + more</td>
                  <td className="p-6">Complete 1:1 programme</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">Live Sessions</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> 4 sessions</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Weekly 1:1 calls</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">Group Q&amp;A</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Ongoing</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">WhatsApp Access</td>
                  <td className="p-6"></td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span></td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> 24/7</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">1:1 Coaching</td>
                  <td className="p-6"></td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Fortnightly</td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Weekly</td>
                </tr>
                <tr className="border-b border-brand-cream-dark">
                  <td className="p-6 font-semibold text-brand-purple">Personal Plan</td>
                  <td className="p-6"></td>
                  <td className="p-6"></td>
                  <td className="p-6"><span className="text-green-700 font-bold">✓</span> Fully customised</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-brand-purple">Best For</td>
                  <td className="p-6">Getting the core system</td>
                  <td className="p-6">Extra support &amp; accountability</td>
                  <td className="p-6">Complete transformation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section (detailed cards) */}
      <PricingSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
            Ready to Transform Your A-Levels?
          </h2>
          <p className="text-lg text-brand-text mb-8">
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

      {/* Footer */}
      <footer id="contact" className="bg-brand-purple text-brand-cream py-12 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <Image
            src="/logo.png"
            alt="A-Level Accelerators"
            width={160}
            height={40}
            className="h-10 w-auto mx-auto mb-4"
          />
          <h3 className="text-xl text-brand-gold font-serif mb-6">Get in Touch</h3>
          <p className="mb-6">Questions? Get in touch directly:</p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="mailto:contact@alevelaccelerators.com" className="text-brand-gold hover:text-white transition">Email</a>
            <a href="ZOOM_BOOKING_LINK" className="text-brand-gold hover:text-white transition">Book a Call</a>
            <a href="/revision-tracker.html" className="text-brand-gold hover:text-white transition">Free Revision Tracker</a>
          </div>
          <p className="opacity-80 text-sm">
            &copy; 2026 A-Level Accelerators. All rights reserved.
            <br />
            Helping A-Level students become the top of their class.
          </p>
        </div>
      </footer>
    </main>
  )
}
