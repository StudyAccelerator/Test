import Image from 'next/image'
import Header from '@/components/header'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'

export const metadata = {
  title: 'A-Level Accelerators - Live 12-Week Exam Programs',
  description: 'Specialist-led live 12-week exam programs for A-Level Maths, Biology and Chemistry.',
}

export default function SubjectAccelerators() {
  const faqs = [
    {
      question: "How long is each programme?",
      answer: "Each programme runs for 12 weeks with specialist-led teaching and structured exam preparation."
    },
    {
      question: "Can I study multiple subjects?",
      answer: "Yes, you can enrol in 1, 2, or all 3 subjects (Maths, Biology, and Chemistry)."
    },
    {
      question: "Are the sessions recorded?",
      answer: "All teaching is repeated so students can catch up anytime if they miss a session."
    },
    {
      question: "What times do the sessions run?",
      answer: "Sessions run on Saturdays from 1 p.m. to 3 p.m. (13:00-15:00). There are no clashes between sessions."
    },
  ]

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-serif text-brand-gold mb-6 font-bold">
            A-Level Accelerators
          </h1>
          <p className="text-2xl md:text-3xl mb-8 opacity-95 max-w-2xl mx-auto">
            Live 12-week exam programs for Maths, Biology and Chemistry
          </p>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Structured specialist-led A-Level programs focus on developing the exam technique, confidence and consistency required for top grades.
          </p>
          <a
            href="#subjects"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            View subjects and enrol
          </a>
        </div>
      </section>

      {/* What is A-Level Accelerators */}
      <ScrollFade>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What is A-Level Accelerators?
            </h2>

            <p className="text-lg text-brand-text mb-8">
              A-Level Accelerators is a set of live, subject-specific exam programmes, each taught by a specialist A-level tutor.
            </p>

            <div className="space-y-8">
              <div className="bg-brand-light-gray p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">The Programme</h3>
                <ul className="space-y-3 text-brand-text">
                  <li>We offer three subjects: Maths, Biology and Chemistry, each delivered as a dedicated 12-week accelerator.</li>
                  <li>Every subject follows a structured weekly syllabus, taught live by a subject specialist, with a clear focus on exam technique and progression.</li>
                  <li>Students can enrol in one subject, combine two or all three for broader academic support.</li>
                </ul>
              </div>

              <div className="bg-brand-light-gray p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">The Focus</h3>
                <ul className="space-y-3 text-brand-text">
                  <li>Teaching explicitly aligned to A-level mark schemes</li>
                  <li>Regular breakdowns of examiner reports and common errors</li>
                  <li>Clear guidance on how marks are gained and lost in real exam questions</li>
                </ul>
              </div>

              <div className="bg-brand-light-gray p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">This is Not 1:1 Tutoring</h3>
                <p className="text-brand-text">It's a structured, high-quality accelerator for students who benefit from routine, clarity, and exam focus.</p>
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
              Why many students prefer this over one-to-one tutoring
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-purple mb-4">This programme is ideal for students who want:</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-green-700 font-bold text-lg">✓</span>
                    <span>Structured progression — a clear 12-week plan rather than isolated sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-700 font-bold text-lg">✓</span>
                    <span>Subject specialists — each subject taught by a dedicated expert, not a generalist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-700 font-bold text-lg">✓</span>
                    <span>Exam-led teaching — consistent focus on exam technique and mark schemes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-700 font-bold text-lg">✓</span>
                    <span>Repetition & reinforcement — concepts revisited and applied weekly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-700 font-bold text-lg">✓</span>
                    <span>Recordings included — students can rewatch explanations, which 1:1 tutoring doesn't allow</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-purple mb-4">This programme may not be suitable for students who:</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg">✕</span>
                    <span>Want purely ad-hoc, unstructured 1:1 sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg">✕</span>
                    <span>Prefer last-minute tutoring rather than consistent weekly teaching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg">✕</span>
                    <span>Are unable to commit to a structured programme</span>
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
              What's included in each accelerator?
            </h2>

            <div className="space-y-4">
              {[
                { title: '12 weeks of live, specialist-led teaching', desc: 'Structured weekly sessions designed to build understanding and exam confidence over time.' },
                { title: 'Full access to session recordings & slides', desc: 'Revisit difficult topics and consolidate learning at your own pace.' },
                { title: 'Weekly structured worksheets', desc: 'Focused practice aligned to the topics and skills covered each week.' },
                { title: 'Exam-style questions with guided walkthroughs', desc: 'Learn how marks are awarded and how to approach questions effectively.' },
                { title: 'Clear weekly progression', desc: 'A defined syllabus that avoids gaps, repetition, and last-minute cramming.' },
                { title: 'Weekly Q&A support', desc: 'Dedicated time to clarify misunderstandings and refine exam technique.' },
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

      {/* Choose Accelerator */}
      <ScrollFade delay={0.2}>
        <section id="subjects" className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Choose your A-Level accelerator
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border-2 border-blue-300">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Maths Accelerator</h3>
                <p className="text-brand-gold font-semibold mb-4">Saturdays · 13:00–15:00</p>
                <ul className="space-y-2 text-brand-text mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Core A-level Maths explained step-by-step</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Problem-solving & exam technique focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Common pitfalls and how to avoid them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Weekly exam-style practice</span>
                  </li>
                </ul>
                <a
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition"
                >
                  Join Maths ➗
                </a>
              </div>

              <div className="bg-white p-8 rounded-lg border-2 border-green-300">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Biology Accelerator</h3>
                <p className="text-brand-gold font-semibold mb-4">Sundays · 10:00–12:00</p>
                <ul className="space-y-2 text-brand-text mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Clear explanations of difficult biological concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Exam-board-focused teaching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Data interpretation & long-answer technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Weekly exam-style questions</span>
                  </li>
                </ul>
                <a
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition"
                >
                  Join Biology 🧬
                </a>
              </div>

              <div className="bg-white p-8 rounded-lg border-2 border-purple-300">
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Chemistry Accelerator</h3>
                <p className="text-brand-gold font-semibold mb-4">Sundays · 13:00–15:00</p>
                <ul className="space-y-2 text-brand-text mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Organic, inorganic & physical chemistry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Step-by-step exam question walkthroughs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Method marks & calculations made clear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Weekly exam-style questions</span>
                  </li>
                </ul>
                <a
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition"
                >
                  Join Chemistry 🧪
                </a>
              </div>
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

            <div className="grid md:grid-cols-3 gap-8 mb-6">
              <div className="bg-brand-cream p-8 rounded-lg text-center shadow-lg">
                <h3 className="text-2xl font-bold text-brand-purple mb-4">Single Subject</h3>
                <p className="text-3xl font-bold text-brand-gold mb-6">£289</p>
                <ul className="text-brand-text mb-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Full 12-Week Accelerator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Choose Maths, Biology or Chemistry</span>
                  </li>
                </ul>
                <a href="#subjects" className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition">
                  Join 1 Subject
                </a>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg text-center shadow-lg">
                <h3 className="text-2xl font-bold text-brand-purple mb-4">Two Subjects</h3>
                <p className="text-3xl font-bold text-brand-gold mb-6">£529</p>
                <ul className="text-brand-text mb-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Any two subjects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Save £49 compared to individual enrolment</span>
                  </li>
                </ul>
                <a href="#subjects" className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition">
                  Join 2 Subjects
                </a>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg text-center shadow-lg border-2 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-purple mb-4">All Three Subjects</h3>
                <p className="text-3xl font-bold text-brand-gold mb-6">£699</p>
                <ul className="text-brand-text mb-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Maths + Biology + Chemistry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Save £168 compared to individual enrolment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>Best value option</span>
                  </li>
                </ul>
                <a href="#subjects" className="inline-block px-6 py-3 bg-brand-purple text-brand-cream font-semibold rounded-md hover:bg-brand-purple-light transition">
                  Join All Subjects
                </a>
              </div>
            </div>

            <p className="text-center text-brand-cream opacity-80 text-sm">
              There are no clashes between sessions. All teaching is repeated so students can catch up anytime.
            </p>
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
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
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
              Ready to accelerate your A-Levels?
            </h2>
            <p className="text-lg text-brand-text mb-12">
              Choose your subject and start your 12-week exam preparation journey today.
            </p>
            <a
              href="#subjects"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              View programs and enrol
            </a>
          </div>
        </section>
      </ScrollFade>

      {/* Footer */}
      <footer id="contact" className="bg-brand-purple text-brand-cream pt-8 px-8 text-center pb-8">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="block">
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
