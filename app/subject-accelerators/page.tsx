import Image from 'next/image'
import Header from '@/components/header'
import { ScrollFade } from '@/components/ui/scroll-fade'

export const metadata = {
  title: 'A-Level Subject Accelerators - 10 Week Exam Prep',
  description: 'Link 10 week exam preparation for Maths, Biology & Chemistry. Structured, exam-focused study materials.',
}

export default function SubjectAccelerators() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-serif text-brand-gold mb-6 font-bold">
            A-Level Subject Accelerators
          </h1>
          <p className="text-2xl md:text-3xl mb-8 opacity-95 max-w-2xl mx-auto">
            Link 10 Week Exam Preparation for Maths, Biology & Chemistry
          </p>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Access our exam-focused study materials for your A-Level subjects. Structured content designed to accelerate your exam preparation.
          </p>
          <a
            href="#subjects"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            View Subjects & Know More
          </a>
        </div>
      </section>

      {/* What is A-Level Accelerators */}
      <ScrollFade>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What is A-Level Accelerators?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">Image</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-brand-purple mb-3">The Programmes</h3>
                <p className="text-brand-text">Structured, exam-focused content for Maths, Biology, and Chemistry. Each programme covers essential topics needed for exam success.</p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">Image</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-brand-purple mb-3">The Focus</h3>
                <p className="text-brand-text">Focused on exam requirements and past paper questions. We distill what matters most for your A-Level exams.</p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">Image</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-brand-purple mb-3">This is Not 1:1 Tutoring</h3>
                <p className="text-brand-text">Comprehensive study programmes delivered in an organised, structured format. Learn independently with our carefully curated materials.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Why Prefer This */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Why Choose Subject Accelerators?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-purple mb-4">This programme is ideal for students who:</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span>Want structured, exam-focused content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span>Prefer independent learning with guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span>Need targeted exam preparation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span>Want to maximize their exam performance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-purple mb-4">This programme may not be ideal for students who:</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">•</span>
                    <span>Need personalized 1:1 teaching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">•</span>
                    <span>Require live interactive sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">•</span>
                    <span>Are looking for general subject tutoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">•</span>
                    <span>Prefer immediate feedback on work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* What's Included */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What's Included in Each Accelerator?
            </h2>

            <div className="space-y-4">
              {[
                { title: '10 Week Structured Programme', desc: 'Complete exam preparation spanning 10 weeks with clear milestones.' },
                { title: 'Topic-by-Topic Guides', desc: 'In-depth guides for every essential topic in your subject.' },
                { title: 'Past Paper Questions', desc: 'Exam-style questions with worked solutions.' },
                { title: 'Formula Sheets', desc: 'Quick-reference guides for important formulas and facts.' },
                { title: 'Study Notes', desc: 'Comprehensive revision notes covering all exam board requirements.' },
                { title: 'Mark Scheme Walkthroughs', desc: 'Video explanations of how to get full marks on exam questions.' },
              ].map((item, i) => (
                <div key={i} className="bg-brand-light-gray p-6 rounded-lg border-l-4 border-brand-gold">
                  <h3 className="text-lg font-semibold text-brand-purple mb-2">{item.title}</h3>
                  <p className="text-brand-text">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Choose Subject */}
      <ScrollFade delay={0.2}>
        <section id="subjects" className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Choose Your A-Level Subject
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Maths', color: 'bg-blue-50', borderColor: 'border-blue-300' },
                { name: 'Biology', color: 'bg-green-50', borderColor: 'border-green-300' },
                { name: 'Chemistry', color: 'bg-purple-50', borderColor: 'border-purple-300' },
              ].map((subject) => (
                <div
                  key={subject.name}
                  className={`${subject.color} p-8 rounded-lg border-2 ${subject.borderColor} text-center`}
                >
                  <h3 className="text-2xl font-bold text-brand-purple mb-4">{subject.name}</h3>
                  <p className="text-brand-text mb-6">
                    10 week structured exam preparation programme with everything you need to excel.
                  </p>
                  <a
                    href="#pricing"
                    className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition"
                  >
                    View Pricing
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Pricing */}
      <ScrollFade delay={0.2}>
        <section id="pricing" className="py-16 px-4 bg-brand-purple">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-cream font-serif text-center mb-12">
              Pricing
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Single Subject', price: 'Price TBA', subjects: '1 Subject (10 weeks)' },
                { name: 'Two Subjects', price: 'Price TBA', subjects: '2 Subjects (10 weeks each)' },
                { name: 'All Three Subjects', price: 'Price TBA', subjects: 'Maths + Biology + Chemistry' },
              ].map((tier) => (
                <div key={tier.name} className="bg-brand-cream p-8 rounded-lg text-center shadow-lg">
                  <h3 className="text-2xl font-bold text-brand-purple mb-4">{tier.name}</h3>
                  <p className="text-3xl font-bold text-brand-gold mb-2">{tier.price}</p>
                  <p className="text-brand-text mb-6">{tier.subjects}</p>
                  <a
                    href="mailto:contact@alevelaccelerators.com"
                    className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition"
                  >
                    Enrol Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* FAQ */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                { q: 'How long is each programme?', a: 'Each programme is 10 weeks long with structured weekly content.' },
                { q: 'Can I study multiple subjects?', a: 'Yes, you can enrol in 1, 2, or all 3 subjects.' },
                { q: 'Is this suitable for all exam boards?', a: 'Our content covers the core requirements across all major exam boards.' },
                { q: 'Do I get support while studying?', a: 'Materials are self-contained. Email support available for questions.' },
                { q: 'Can I access the materials after 10 weeks?', a: 'Yes, you retain access to all materials for ongoing revision.' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-brand-purple mb-2">{item.q}</h3>
                  <p className="text-brand-text">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* CTA Section */}
      <ScrollFade delay={0.2}>
        <section className="py-32 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              Ready to Accelerate Your A-Levels?
            </h2>
            <p className="text-lg text-brand-text mb-12">
              Choose your subject and start your 10-week exam preparation journey today.
            </p>
            <a
              href="#subjects"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Explore Subjects
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
