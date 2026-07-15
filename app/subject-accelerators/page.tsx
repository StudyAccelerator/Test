import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'

export const metadata = {
  title: 'Live 12-Week A-Level Exam Programmes',
  description: 'Boost your A-Level Biology, Chemistry, and Maths performance with Subject Accelerators. Gain expert guidance, targeted revision, and exam-focused learning.',
  alternates: { canonical: 'https://alevelaccelerators.com/subject-accelerators/' },
}

const STRIPE_LINK_ONE_SUBJECT = 'https://buy.stripe.com/7sYdRafdM2HA8nE36Ic3m09'
const STRIPE_LINK_TWO_SUBJECTS = 'https://buy.stripe.com/28E14o3v495Y9rIazac3m0a'
const STRIPE_LINK_THREE_SUBJECTS = 'https://buy.stripe.com/8x2eVe2r0cia47o36Ic3m0b'
const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

export default function SubjectAccelerators() {
  const faqs = [
    {
      question: "Why not just get a tutor instead?",
      answer: (
        <>
          <p className="mb-4">Tutors help explain content.</p>
          <p className="mb-4">But most students don't struggle with understanding alone.</p>
          <p className="mb-4">They struggle with:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Applying knowledge in exams</li>
            <li>Knowing what to focus on</li>
            <li>Improving weak areas efficiently</li>
          </ul>
          <p>This programme focuses on those gaps directly through structured, exam-focused teaching over 12 weeks.</p>
        </>
      )
    },
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
            <li><strong>Maths:</strong> Saturdays 13:00 to 15:00</li>
            <li><strong>Biology:</strong> Sundays 10:00 to 12:00</li>
            <li><strong>Chemistry:</strong> Sundays 13:00 to 15:00</li>
          </ul>
          <p>If you're taking all three subjects, the bundle pricing (£849) gives you significant savings compared to enrolling individually.</p>
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
            <li><strong>Maths:</strong> Saturdays, 1:00 PM to 3:00 PM (13:00 to 15:00)</li>
            <li><strong>Biology:</strong> Sundays, 10:00 AM to 12:00 PM (10:00 to 12:00)</li>
            <li><strong>Chemistry:</strong> Sundays, 1:00 PM to 3:00 PM (13:00 to 15:00)</li>
          </ul>
          <p>Each session is <strong>2 hours long</strong> with time for teaching, practice, Q&A, and consolidation. The weekend timing allows you to focus on schoolwork during the week.</p>
        </>
      )
    },
    {
      question: "What's the expected workload outside of sessions?",
      answer: (
        <>
          <p className="mb-4">Each accelerator requires approximately <strong>2 to 3 hours of independent work per week</strong> outside the live sessions.</p>
          <p className="mb-4">This work includes:</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Completing weekly worksheets and practice questions</li>
            <li>Reviewing the session recordings and notes</li>
            <li>Attempting exam-style questions to apply what you've learned</li>
            <li>Reinforcing challenging concepts</li>
          </ul>
          <p>This is a manageable amount, less than many students spend on a single subject otherwise, but far more focused and effective. Remember, this isn't busy work, it's strategic practice aligned to your exam board and mark scheme.</p>
        </>
      )
    },
    {
      question: "What if I can't attend a session?",
      answer: (
        <>
          <p className="mb-4">If you miss a live session, <strong>don't worry</strong>: all teaching is recorded.</p>
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
          <p>This is structured learning with clear, measurable progression, not vague feedback. You'll see tangible improvement in your exam technique and understanding as weeks progress.</p>
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'A-Level Subject Accelerators',
    serviceType: 'Live online A-level courses',
    description:
      'Live 12-week exam-focused A-level programmes in Biology, Chemistry and Maths, taught online in small groups.',
    url: 'https://alevelaccelerators.com/subject-accelerators/',
    areaServed: 'GB',
    provider: { '@type': 'Organization', '@id': 'https://alevelaccelerators.com/#organization' },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-cream pt-16 pb-16 md:pt-24 md:pb-20 px-6 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="relative max-w-4xl mx-auto">
          <HeroFade delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/10 bg-brand-purple/[0.04] px-4 py-1.5 text-sm font-semibold text-brand-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              Subject Accelerators · 12-Week Live Programmes
            </span>
          </HeroFade>
          <h1 className="mt-6 font-serif font-bold tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl text-brand-purple">
            <HeroHeadline>
              <HeroWord>Struggling</HeroWord> <HeroWord>with</HeroWord> <HeroWord>A-Level</HeroWord>{' '}
              <HeroWord className="italic text-green-600">Biology,</HeroWord>{' '}
              <HeroWord className="italic text-violet-600">Chemistry</HeroWord>{' '}
              <HeroWord>or</HeroWord> <HeroWord className="italic text-blue-600">Maths?</HeroWord>
            </HeroHeadline>
          </h1>
          <HeroFade delay={0.45}>
            <p className="mt-6 text-lg md:text-xl text-brand-text/75 leading-relaxed max-w-2xl mx-auto">
              Structured, high-impact support that actually improves your grades, without relying on endless tutoring. Designed for students who are falling behind, stuck on certain topics, or not seeing results from revision.
            </p>
          </HeroFade>
          <HeroFade delay={0.55}>
            <a
              href="#subjects"
              className="mt-9 inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
            >
              Explore Your Subject Programme
            </a>
          </HeroFade>
        </div>
      </section>

      {/* Key Insight */}
      <ScrollFade>
        <section className="py-12 px-4 bg-brand-purple border-y-2 border-brand-gold/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-brand-cream font-semibold">
              💡 Most students aren't struggling because they're not working hard. They're struggling because they're focusing on <span className="text-brand-gold">the wrong things</span>.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* What is A-Level Accelerators */}
      <ScrollFade>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What is A-Level Accelerators?
            </h2>

            <p className="text-lg text-brand-text mb-12 text-center">
              A-Level Accelerators are designed to help you improve your grades by focusing on the topics that actually matter, and teaching you how to approach exam questions properly.
            </p>

            <div className="space-y-8">
              <div className="bg-brand-light-gray p-8 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">The Programme</h3>
                <p className="text-brand-text">
                  Structured weekly sessions focused on high-yield topics and exam technique.
                </p>
              </div>

              <div className="bg-brand-light-gray p-8 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">The Focus</h3>
                <p className="text-brand-text">
                  We prioritise what actually comes up in exams, not everything in the textbook.
                </p>
              </div>

              <div className="bg-brand-light-gray p-8 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">Not Just Tutoring</h3>
                <p className="text-brand-text">
                  This is not just explanation, it's about improving how you approach questions and perform under exam conditions.
                </p>
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
              Why this works better than typical tutoring
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-purple mb-6">This Programme</h3>
                <ul className="space-y-4 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Focuses on exam questions, not just content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Teaches how to actually apply knowledge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Targets weak topics directly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Gives structured guidance, not just explanations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-purple mb-6">Typical Tutoring</h3>
                <ul className="space-y-4 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg flex-shrink-0">✕</span>
                    <span>Often re-teaches content you already covered</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg flex-shrink-0">✕</span>
                    <span>Doesn't fix exam technique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg flex-shrink-0">✕</span>
                    <span>Can feel slow and repetitive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg flex-shrink-0">✕</span>
                    <span>Doesn't address how to improve performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Urgency Bar */}
      <ScrollFade>
        <section className="py-6 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base md:text-lg text-brand-purple font-semibold">
              ⏳ The next cohort starts Sunday, September 13th with limited spaces. Secure your place now!
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* What's Included */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              You'll get
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-purple mb-6 text-center border-b-2 border-brand-gold pb-4">High-Impact Teaching</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>12 live weekly sessions</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Focus on key topics</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-purple mb-6 text-center border-b-2 border-brand-gold pb-4">Exam-Focused Practice</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Past paper questions</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Mark scheme breakdowns</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-purple mb-6 text-center border-b-2 border-brand-gold pb-4">Structured Support</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Weekly guidance</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Clear focus each session</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-3 text-brand-text max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <span className="text-brand-gold font-bold text-lg flex-shrink-0">✓</span>
                <span>Full access to session recordings and slides</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-brand-gold font-bold text-lg flex-shrink-0">✓</span>
                <span>Weekly structured worksheets and practice</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-brand-gold font-bold text-lg flex-shrink-0">✓</span>
                <span>Weekly Q&A support to clarify misunderstandings</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Choose Accelerator */}
      <ScrollFade delay={0.2}>
        <section id="subjects" className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Choose your A-Level Accelerator
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-400 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold mb-4 self-start">Maths</div>
                <h3 className="text-3xl font-serif font-bold text-brand-purple mb-2">Maths Accelerator</h3>
                <p className="text-blue-600 font-semibold mb-2">Saturdays · 13:00 to 15:00</p>
                <p className="text-brand-purple font-semibold mb-4">For students who need structure and consistent practice to improve</p>
                <ul className="space-y-2 text-brand-text mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Problem-solving and exam technique focus</span>
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
                  href={STRIPE_LINK_ONE_SUBJECT}
                  className="block w-full text-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                  Join Maths ➗
                </a>
              </div>

              <div className="flex flex-col bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-2 border-green-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold mb-4 self-start">Biology</div>
                <h3 className="text-3xl font-serif font-bold text-brand-purple mb-2">Biology Accelerator</h3>
                <p className="text-green-700 font-semibold mb-2">Sundays · 10:00 to 12:00</p>
                <p className="text-brand-purple font-semibold mb-4">Perfect for students struggling with application and exam questions</p>
                <ul className="space-y-2 text-brand-text mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Exam question analysis and technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Common misconceptions addressed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Weekly structured practice</span>
                  </li>
                </ul>
                <a
                  href={STRIPE_LINK_ONE_SUBJECT}
                  className="block w-full text-center px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
                >
                  Join Biology 🧬
                </a>
              </div>

              <div className="flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border-2 border-purple-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="inline-block px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold mb-4 self-start">Chemistry</div>
                <h3 className="text-3xl font-serif font-bold text-brand-purple mb-2">Chemistry Accelerator</h3>
                <p className="text-purple-700 font-semibold mb-2">Sundays · 13:00 to 15:00</p>
                <p className="text-brand-purple font-semibold mb-4">Ideal for students who understand content but lose marks in exams</p>
                <ul className="space-y-2 text-brand-text mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>How to structure answers to score maximum marks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>How to avoid mark-losing errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Weekly exam-style problem-solving</span>
                  </li>
                </ul>
                <a
                  href={STRIPE_LINK_ONE_SUBJECT}
                  className="block w-full text-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
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

            <div className="grid md:grid-cols-3 gap-6 items-end mb-6">
              {/* Single Subject */}
              <div className="bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-serif font-bold text-brand-purple mb-2">Single Subject</h3>
                <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Choose one</p>
                <p className="text-4xl font-bold text-brand-gold mb-2">£339</p>
                <p className="text-xs text-brand-text opacity-60 mb-6">per subject</p>
                <ul className="text-brand-text mb-8 space-y-3">
                  <li className="flex items-center gap-2 justify-center">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Full 12-week Accelerator</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Maths, Biology or Chemistry</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_ONE_SUBJECT} className="block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Join 1 Subject
                </a>
              </div>

              {/* Two Subjects — featured */}
              <div className="bg-brand-cream rounded-xl text-center shadow-2xl border-4 border-brand-gold transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(46,37,87,0.25)] md:scale-105 md:-mt-4 overflow-hidden">
                <div className="bg-brand-gold text-brand-purple py-2 px-4 text-sm font-bold text-center">
                  Best value for most students
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-brand-purple mb-2">Two Subjects</h3>
                  <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Most popular</p>
                  <p className="text-4xl font-bold text-brand-gold mb-2">£629</p>
                  <p className="text-xs text-brand-text opacity-60 mb-6">save £49</p>
                  <ul className="text-brand-text mb-8 space-y-3">
                    <li className="flex items-center gap-2 justify-center">
                      <span className="text-brand-gold font-bold">✓</span>
                      <span>Any two subjects</span>
                    </li>
                    <li className="flex items-center gap-2 justify-center">
                      <span className="text-brand-gold font-bold">✓</span>
                      <span>Save £49 vs individual enrolment</span>
                    </li>
                  </ul>
                  <a href={STRIPE_LINK_TWO_SUBJECTS} className="block w-full py-3 px-6 bg-brand-gold text-brand-purple font-semibold rounded-lg hover:bg-brand-gold-light transition-all shadow-lg hover:shadow-xl">
                    Join 2 Subjects
                  </a>
                </div>
              </div>

              {/* All Three */}
              <div className="bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-serif font-bold text-brand-purple mb-2">All Three Subjects</h3>
                <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Complete coverage</p>
                <p className="text-4xl font-bold text-brand-gold mb-2">£849</p>
                <p className="text-xs text-brand-text opacity-60 mb-6">save £168</p>
                <ul className="text-brand-text mb-8 space-y-3">
                  <li className="flex items-center gap-2 justify-center">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Maths, Biology &amp; Chemistry</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="text-brand-gold font-bold">✓</span>
                    <span>Save £168 vs individual enrolment</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_THREE_SUBJECTS} className="block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
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

      {/* Guarantee */}
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

      {/* FAQ */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-cream">
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
              Start Improving Your Grades with the Right Support
            </h2>
            <p className="text-lg text-brand-text mb-12">
              The sooner you focus on what actually matters, the faster your results improve.
            </p>
            <a
              href="#subjects"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Join an Accelerator
            </a>
          </div>
        </section>
      </ScrollFade>

      {/* Footer */}
      <Footer />
    </main>
  )
}
