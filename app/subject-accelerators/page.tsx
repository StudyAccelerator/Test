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
      answer: (
        <>
          <p className="mb-4">Each programme runs for <strong>12 weeks</strong> with structured, specialist-led teaching.</p>
          <p className="mb-4">This timeframe is carefully designed to:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Build understanding progressively, week by week</li>
            <li>Cover key exam topics and techniques without rushing</li>
            <li>Allow time for practice and consolidation</li>
            <li>Prepare you thoroughly before your actual A-Level exams</li>
          </ul>
          <p>Each week builds on the previous one, so consistency and attendance matter. However, all sessions are recorded, so you can catch up if you need to.</p>
        </>
      )
    },
    {
      question: "Can I study multiple subjects?",
      answer: (
        <>
          <p className="mb-4"><strong>Yes, absolutely.</strong> You can enrol in:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>1 subject (Maths, Biology, or Chemistry)</li>
            <li>Any 2 subjects</li>
            <li>All 3 subjects for complete coverage</li>
          </ul>
          <p className="mb-4">There are <strong>no clashes between sessions</strong>, so you can attend all three accelerators without scheduling conflicts:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li><strong>Maths:</strong> Saturdays 13:00–15:00</li>
            <li><strong>Biology:</strong> Sundays 10:00–12:00</li>
            <li><strong>Chemistry:</strong> Sundays 13:00–15:00</li>
          </ul>
          <p>If you're taking all three subjects, the bundle pricing (£699) gives you significant savings compared to enrolling individually.</p>
        </>
      )
    },
    {
      question: "Are the sessions recorded?",
      answer: (
        <>
          <p className="mb-4"><strong>Yes, all sessions are fully recorded and available to all students.</strong></p>
          <p className="mb-4">This means:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>If you miss a live session, you can watch the recording anytime</li>
            <li>You can rewatch difficult explanations as many times as you need</li>
            <li>Recordings stay available for the full duration of the programme</li>
            <li>You can study at your own pace while keeping up with the weekly structure</li>
            <li>Perfect for consolidating concepts you find challenging</li>
          </ul>
          <p>However, live sessions provide real-time Q&A where you can ask questions immediately, so we encourage attendance whenever possible.</p>
        </>
      )
    },
    {
      question: "What times do the sessions run?",
      answer: (
        <>
          <p className="mb-4">Sessions are scheduled to minimize clashes with school and other commitments:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li><strong>Maths:</strong> Saturdays, 1:00 PM – 3:00 PM (13:00–15:00)</li>
            <li><strong>Biology:</strong> Sundays, 10:00 AM – 12:00 PM (10:00–12:00)</li>
            <li><strong>Chemistry:</strong> Sundays, 1:00 PM – 3:00 PM (13:00–15:00)</li>
          </ul>
          <p>Each session is <strong>2 hours long</strong> with time for teaching, practice, Q&A, and consolidation. The weekend timing allows you to focus on schoolwork during the week.</p>
        </>
      )
    },
    {
      question: "What's the expected workload outside of sessions?",
      answer: (
        <>
          <p className="mb-4">Each accelerator requires approximately <strong>2–3 hours of independent work per week</strong> outside the live sessions.</p>
          <p className="mb-4">This work includes:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Completing weekly worksheets and practice questions</li>
            <li>Reviewing the session recordings and notes</li>
            <li>Attempting exam-style questions to apply what you've learned</li>
            <li>Reinforcing challenging concepts</li>
          </ul>
          <p>This is a manageable amount — less than many students spend on a single subject otherwise, but far more focused and effective. Remember, this isn't busy work; it's strategic practice aligned to your exam board and mark scheme.</p>
        </>
      )
    },
    {
      question: "What if I can't attend a session?",
      answer: (
        <>
          <p className="mb-4">If you miss a live session, <strong>don't worry</strong> — all teaching is recorded.</p>
          <p className="mb-4">Here's what you do:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Watch the session recording at your own pace</li>
            <li>Review the slides and notes provided</li>
            <li>Complete the weekly worksheet and practice questions</li>
            <li>Ask questions during the next session's Q&A time</li>
          </ul>
          <p>However, we do encourage consistent attendance when possible, as the live Q&A and peer learning element adds value. If you're going to miss a session, let us know so we can provide any additional support.</p>
        </>
      )
    },
    {
      question: "Is this suitable for all ability levels?",
      answer: (
        <>
          <p className="mb-4"><strong>Yes, this programme is designed for all ability levels.</strong></p>
          <p className="mb-4">Here's why:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li><strong>Teaching to the mark scheme:</strong> We focus on exactly what examiners are looking for, so students at any level can improve</li>
            <li><strong>Structured progression:</strong> Each week builds systematically, so no one is left behind</li>
            <li><strong>Repeat access:</strong> You can rewatch sessions as many times as you need</li>
            <li><strong>Weekly Q&A:</strong> Any confusion gets cleared up before moving forward</li>
            <li><strong>Exam-style practice:</strong> Everyone practices the same questions, so you can benchmark your progress</li>
          </ul>
          <p>Whether you're aiming for an A*, struggling to grasp concepts, or wanting to consolidate your understanding, this programme is designed to help you improve.</p>
        </>
      )
    },
    {
      question: "How will my progress be tracked?",
      answer: (
        <>
          <p className="mb-4">You'll track your own progress through:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li><strong>Weekly practice questions:</strong> Attempt these and see how your accuracy improves week by week</li>
            <li><strong>Exam-style question walkthroughs:</strong> Compare your approach to the model solutions provided</li>
            <li><strong>Feedback during Q&A:</strong> Ask about specific questions you found tricky</li>
            <li><strong>Concept consolidation:</strong> Revisit earlier recordings to see how much clearer things are</li>
          </ul>
          <p>This is structured learning with clear, measurable progression — not vague feedback. You'll see tangible improvement in your exam technique and understanding as weeks progress.</p>
        </>
      )
    },
    {
      question: "What if I need more support than the weekly sessions offer?",
      answer: (
        <>
          <p className="mb-4">This accelerator is designed to be comprehensive, but if you need additional 1:1 support:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Use the weekly Q&A time to ask detailed questions</li>
            <li>Share specific practice questions you're stuck on</li>
            <li>Access the recordings and worksheets to reinforce learning at your own pace</li>
            <li>Reach out directly for personalized coaching (available through our Study System tier)</li>
          </ul>
          <p className="mb-4">For students needing comprehensive 1:1 support, weekly accountability, and a fully customised approach, our <strong>Study System</strong> programme is available separately and can complement these accelerators perfectly.</p>
          <p>Book a free consultation to discuss which option suits your needs.</p>
        </>
      )
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
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-400 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold mb-4">Maths</div>
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Maths Accelerator</h3>
                <p className="text-blue-600 font-semibold mb-4">Saturdays · 13:00–15:00</p>
                <ul className="space-y-2 text-brand-text mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Core A-level Maths explained step-by-step</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Problem-solving & exam technique focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Common pitfalls and how to avoid them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Weekly exam-style practice</span>
                  </li>
                </ul>
                <a
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                  Join Maths ➗
                </a>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-2 border-green-400 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold mb-4">Biology</div>
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Biology Accelerator</h3>
                <p className="text-green-600 font-semibold mb-4">Sundays · 10:00–12:00</p>
                <ul className="space-y-2 text-brand-text mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Clear explanations of difficult biological concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Exam-board-focused teaching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Data interpretation & long-answer technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Weekly exam-style questions</span>
                  </li>
                </ul>
                <a
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                >
                  Join Biology 🧬
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border-2 border-purple-400 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-block px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-semibold mb-4">Chemistry</div>
                <h3 className="text-2xl font-bold text-brand-purple mb-2">Chemistry Accelerator</h3>
                <p className="text-purple-600 font-semibold mb-4">Sundays · 13:00–15:00</p>
                <ul className="space-y-2 text-brand-text mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span>Organic, inorganic & physical chemistry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span>Step-by-step exam question walkthroughs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span>Method marks & calculations made clear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span>Weekly exam-style questions</span>
                  </li>
                </ul>
                <a
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition"
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
