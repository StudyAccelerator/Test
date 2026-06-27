import Image from 'next/image'
import Header from '@/components/header'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'

export const metadata = {
  title: 'A-Level Summer Accelerator | Get Ahead for Year 13 | A-Level Accelerators',
  description: 'A 6-week live A-Level summer course for Year 12 students going into Year 13. Master the high-yield topics that decide your predicted grades. Biology, Chemistry, Maths and Physics. Starts 25th July.',
}

const Divider = () => (
  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
)

// Purchase CTAs use clearly-named placeholders to be swapped for Stripe links later.
const STRIPE_LINK_ONE_SUBJECT = 'STRIPE_LINK_ONE_SUBJECT'
const STRIPE_LINK_TWO_SUBJECTS = 'STRIPE_LINK_TWO_SUBJECTS'
const STRIPE_LINK_THREE_SUBJECTS = 'STRIPE_LINK_THREE_SUBJECTS'
const STRIPE_LINK_FOUR_SUBJECTS = 'STRIPE_LINK_FOUR_SUBJECTS'
const BOOK_A_CALL_LINK = 'BOOK_A_CALL_LINK'

export default function SummerAccelerators() {
  const subjects = [
    { name: 'Biology', emoji: '🧬' },
    { name: 'Chemistry', emoji: '🧪' },
    { name: 'Maths', emoji: '➗' },
    { name: 'Physics', emoji: '⚛️' },
  ]

  // Single source of truth for FAQ copy: used for both the rendered accordion
  // and the FAQPage JSON-LD structured data.
  const faqs = [
    {
      q: "Who's the Summer Accelerator for?",
      a: "Any Year 12 student moving into Year 13 who wants to start the year ahead. It doesn't matter where your mocks landed. If there's a gap between your current grades and the grades you want, we close it. If you're already performing well, we make sure you stay there and go into Year 13 in control.",
    },
    {
      q: "When does it start and how's it structured?",
      a: "The next cohort starts Saturday 25th July. It runs for six weeks, with two live sessions a week, two hours each. That's 24 hours of live teaching across the summer. Exact session times are confirmed when you book.",
    },
    {
      q: "Which subjects can I choose?",
      a: "Biology, Chemistry, Maths, and Physics. You can take one subject or several, and the more you take, the more you save.",
    },
    {
      q: "Who teaches the sessions?",
      a: "Your subjects are taught live by expert tutors who know the spec inside out, have achieved all A*s themselves and helped 100s do the same. Dr Waleed runs the final sessions himself on exam technique, active recall, and study strategy, so you leave knowing how to turn the content into actual marks.",
    },
    {
      q: "What topics do you actually cover?",
      a: "The high-yield Year 13 topics that carry the most marks and show up in the mocks that set your predicted grades. We don't waste your summer on filler. We teach the things that move your grade.",
    },
    {
      q: "Do I need to be struggling to benefit?",
      a: "No. Plenty of students join already doing well and want to stay ahead. The Accelerator works whether you're closing a gap or protecting top grades. Everyone walks into Year 13 ahead of where they'd be otherwise.",
    },
    {
      q: "What if I miss a session?",
      a: "Every session is recorded, so you'll never fall behind if something comes up. You'll have access to the recordings to catch up or revise whenever you need.",
    },
    {
      q: "What happens after the six weeks?",
      a: "You'll go into Year 13 already on top of the key topics. If you want support through the Year 13 year itself, Dr Waleed runs a 12-week Study Accelerator that takes you through the content and exam prep right up to your final exams. There's no pressure to continue, it's simply there if you want it.",
    },
    {
      q: "Is there a guarantee if it's not right for me?",
      a: "Yes. Try your first session completely risk-free. If it's not right for you, request a full refund, no questions asked.",
    },
    {
      q: "Not sure which package is right for you?",
      a: "If you're unsure how many subjects to take or which option fits best, book a free call with Dr Waleed and he'll help you decide. There's no obligation to buy. The quickest way to lock in your place is to secure it directly above before this cohort fills.",
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <main>
      {/* FAQ structured data for rich results and answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream pt-24 pb-14 px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            <span className="text-brand-gold">Master the Topics That Decide</span> <span className="text-brand-cream">Your Predicted Grades!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Six weeks this summer on the high-yield Year 13 topics that determine your predicted grades!
          </p>
          <a
            href="#pricing"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Start September Ahead
          </a>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base md:text-lg text-brand-gold opacity-90 font-medium">
            <span>Expert A-Level tutors + Dr Waleed</span>
            <span aria-hidden="true">·</span>
            <span>1,000+ students supported</span>
            <span aria-hidden="true">·</span>
            <span>First session risk-free</span>
          </div>
        </div>
      </section>

      {/* Urgency Bar */}
      <ScrollFade>
        <section className="py-6 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base md:text-lg text-brand-purple font-semibold">
              ⏳ The next cohort starts Saturday 25th July with limited spaces. Secure your place now!
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Why Learn With Me */}
      <ScrollFade>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Why Learn With Us
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-72 h-72 overflow-hidden rounded-2xl"
                  style={{ boxShadow: '3px 3px 8px rgba(46, 37, 87, 0.18)' }}
                >
                  <Image
                    src="/graduation.jpg"
                    alt="Dr Waleed Ahmad"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 45%', transform: 'scale(1.25)', transformOrigin: 'center 45%' }}
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm italic text-brand-gold font-semibold">Dr. Waleed Ahmad, MBBS</p>
              </div>

              <div className="space-y-6 text-lg text-brand-text">
                <p>I&apos;m Dr Waleed Ahmad, a doctor and the founder of A-Level Accelerators. I&apos;ve worked with over 1,000 students, and I built this programme around one idea: the students who get ahead over summer walk into Year 13 in control, while everyone else spends first term catching up.</p>
                <p>Your subjects are taught live by expert tutors who know exactly which topics carry the most marks. I run the final sessions myself, where I teach the exam technique, active recall, and study systems that turn knowing the content into actually securing top grades.</p>
                <p>By the end of six weeks, you won&apos;t just have covered the highest-value Year 13 topics. You&apos;ll know them well enough to walk into the mocks that set your predicted grades already ahead.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* What the Summer Accelerator Is */}
      <ScrollFade delay={0.2}>
        <section className="py-24 px-4 bg-brand-cream">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-8">
              What the Summer Accelerator Is
            </h2>

            <div className="space-y-6">
              {[
                {
                  num: '01',
                  title: 'The Topics That Decide Your Grades',
                  body: 'We cover the high-yield Year 13 topics that carry the most marks and show up in the mocks that set your predicted grades. You learn the things that actually move your grade, not filler.',
                },
                {
                  num: '02',
                  title: 'Taught Live by Expert Tutors',
                  body: 'Every session is taught live by subject specialists who know the spec inside out, have achieved top grades themselves and helped hundreds do the same. You ask questions in real time and get answers on the spot, not a pre-recorded video you watch alone.',
                },
                {
                  num: '03',
                  title: 'Ahead From Day One of Year 13',
                  body: "You won't be playing catch-up in September. You'll start Year 13 already knowing the topics your classmates are seeing for the first time, with the exam technique to back it up.",
                },
              ].map((item) => (
                <div key={item.num} className="bg-white rounded-xl shadow-sm border border-brand-purple/10 p-6 md:p-8 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                  <span className="text-6xl md:text-7xl font-serif font-bold text-brand-gold leading-none flex-shrink-0 w-20 text-center" aria-hidden="true">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-brand-purple mb-3">{item.title}</h3>
                    <p className="text-lg text-brand-text leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* The Difference a Summer Makes */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              The Difference a Summer Makes
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-brand-light-gray p-8 rounded-lg shadow-sm border-l-4 border-red-300">
                <h3 className="text-xl font-semibold text-brand-purple mb-6">Students who coast the summer</h3>
                <ul className="space-y-4 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Start Year 13 seeing key topics for the first time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Spend first term catching up instead of getting ahead</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Go into predicted-grade mocks underprepared</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Feel behind before the year&apos;s even started</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg shadow-sm border-l-4 border-brand-gold">
                <h3 className="text-xl font-semibold text-brand-purple mb-6">Students who use the Accelerator</h3>
                <ul className="space-y-4 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Walk into Year 13 already on top of the high-value topics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Start the year ahead and stay ahead</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Go into predicted-grade mocks confident and prepared</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Have the exam technique to turn knowledge into marks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Subjects */}
      <ScrollFade delay={0.2}>
        <section id="subjects" className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              Choose Your Subjects
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-2xl mx-auto">
              Get ahead in the subjects that matter most for your Year 13.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {subjects.map((subject) => (
                <a
                  key={subject.name}
                  href="#pricing"
                  className="block bg-brand-light-gray p-8 rounded-lg shadow-md border-l-4 border-brand-gold text-center hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-4" aria-hidden="true">{subject.emoji}</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-purple">{subject.name}</h3>
                </a>
              ))}
            </div>

            {/* Every package includes strip */}
            <div className="bg-brand-cream rounded-xl px-6 py-4 mt-10 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:text-base text-brand-text font-medium">
                {[
                  '24 hours of live teaching',
                  'Every session recorded',
                  'High-yield topics across your chosen subjects',
                  'Taught by expert tutors, final sessions led by Dr Waleed',
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="text-brand-gold font-bold" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Pricing */}
      <ScrollFade delay={0.2}>
        <section id="pricing" className="py-20 px-4 bg-brand-purple">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-cream font-serif text-center mb-4">
              Secure Your Summer Place
            </h2>
            <p className="text-center text-lg text-brand-cream opacity-80 mb-10 max-w-2xl mx-auto">
              The next cohort starts Saturday 25th July. The more subjects you take, the more you save. Prices rise after this cohort.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-10">
              {/* One Subject */}
              <div className="flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-1">One Subject</h3>
                <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Get ahead in one</p>
                <p className="text-4xl font-bold text-brand-gold mb-1">£289</p>
                <p className="text-xs text-brand-text opacity-60 mb-6">per subject</p>
                <ul className="text-brand-text text-sm mb-8 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Full 6-week Summer Accelerator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Choose Biology, Chemistry, Maths or Physics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Live teaching with exam technique built in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Session recordings included</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_ONE_SUBJECT} className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Join One Subject
                </a>
              </div>

              {/* Two Subjects */}
              <div className="flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-1">Two Subjects</h3>
                <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Save £39</p>
                <p className="text-4xl font-bold text-brand-gold mb-1">£539</p>
                <p className="text-xs text-brand-text opacity-60 mb-6">save £39 vs individual</p>
                <ul className="text-brand-text text-sm mb-8 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Everything in One Subject, ×2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Any two of the four subjects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Get ahead across two Year 13 courses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Save £39 vs booking separately</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_TWO_SUBJECTS} className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Join Two Subjects
                </a>
              </div>

              {/* Three Subjects (featured) */}
              <div className="flex flex-col bg-brand-cream rounded-xl text-center shadow-2xl border-4 border-brand-gold transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(46,37,87,0.25)] overflow-hidden">
                <div className="bg-brand-gold text-brand-purple py-2 px-4 text-sm font-bold text-center">
                  Most Popular
                </div>
                <div className="flex flex-col flex-grow p-8">
                  <h3 className="text-xl font-serif font-bold text-brand-purple mb-1">Three Subjects</h3>
                  <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Save £128</p>
                  <p className="text-4xl font-bold text-brand-gold mb-1">£739</p>
                  <p className="text-xs text-brand-text opacity-60 mb-6">save £128 vs individual</p>
                  <ul className="text-brand-text text-sm mb-8 space-y-3 text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                      <span>Everything in One Subject, ×3</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                      <span>Any three of the four subjects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                      <span>The choice most students make</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                      <span>Save £128 vs booking separately</span>
                    </li>
                  </ul>
                  <a href={STRIPE_LINK_THREE_SUBJECTS} className="mt-auto block w-full py-3 px-6 bg-brand-gold text-brand-purple font-semibold rounded-lg hover:bg-brand-gold-light transition-all shadow-lg hover:shadow-xl">
                    Join Three Subjects
                  </a>
                </div>
              </div>

              {/* Four Subjects */}
              <div className="flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-1">Four Subjects</h3>
                <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide mb-4">Best value · Save £307</p>
                <p className="text-4xl font-bold text-brand-gold mb-1">£849</p>
                <p className="text-xs text-brand-text opacity-60 mb-6">save £307 vs individual</p>
                <ul className="text-brand-text text-sm mb-8 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>All four subjects included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Biology, Chemistry, Maths &amp; Physics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Complete head start across the sciences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Biggest saving of any option</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_FOUR_SUBJECTS} className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Join All Subjects
                </a>
              </div>
            </div>

            <p className="text-center text-brand-cream opacity-80 text-base max-w-2xl mx-auto">
              Early-bird places are limited and fill on a first-come basis. Secure your place now to lock in the summer rate before the September cohorts open at a higher price.
            </p>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Help choosing a package */}
      <ScrollFade delay={0.2}>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto bg-brand-cream border border-brand-gold/30 rounded-xl px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <p className="text-brand-text">
                Not sure which option fits? Book a free call and I&apos;ll help you choose.
              </p>
              <a
                href={BOOK_A_CALL_LINK}
                className="inline-block whitespace-nowrap px-6 py-2.5 border-2 border-brand-gold text-brand-purple font-semibold rounded-lg hover:bg-brand-gold hover:text-brand-purple transition-all"
              >
                Book a Free Call
              </a>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Guarantee */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="bg-brand-cream p-12 rounded-lg shadow-lg border-4 border-brand-gold text-center">
              <div className="text-5xl mb-6" aria-hidden="true">🛡️</div>
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

      {/* FAQ */}
      <ScrollFade delay={0.2}>
        <section id="faq" className="py-20 px-4 bg-brand-cream">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={<p>{faq.a}</p>} />
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Closing CTA */}
      <ScrollFade delay={0.2}>
        <section id="secure" className="pt-24 pb-16 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              Walk Into September Already Ahead
            </h2>
            <p className="text-lg text-brand-text mb-12 leading-relaxed">
              This summer is the only window to get genuinely ahead before the pressure starts. Don&apos;t waste your first term catching up!
            </p>
            <a
              href="#pricing"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Secure My Place
            </a>
            <a
              href={BOOK_A_CALL_LINK}
              className="block mt-6 text-sm text-brand-text underline opacity-70 hover:opacity-100 transition"
            >
              Or book a free call if you have any questions
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
              <div className="flex gap-8 justify-center text-sm">
                <a href="mailto:Waleed@alevelaccelerators.com" className="text-brand-gold hover:text-white transition text-center">Email</a>
                <a href={BOOK_A_CALL_LINK} className="text-brand-gold hover:text-white transition text-center">Book a Call</a>
              </div>
            </div>
          </div>
          <div className="h-px bg-brand-gold opacity-20 my-4"></div>
          <div className="flex justify-center mb-4">
            <a
              href="/revision-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-cream opacity-50 hover:opacity-80 border border-brand-cream/20 hover:border-brand-cream/40 rounded px-4 py-1.5 transition"
            >
              Free Revision Tracker
            </a>
          </div>
          <p className="text-center text-xs opacity-60">
            &copy; 2026 A-Level Accelerators. All rights reserved. | Helping A-Level students become the top of their class.
          </p>
        </div>
      </footer>
    </main>
  )
}
