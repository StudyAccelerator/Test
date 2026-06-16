import Image from 'next/image'
import Header from '@/components/header'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'

export const metadata = {
  title: 'Summer Accelerator - Start Year 13 Already Ahead | A-Level Accelerators',
  description: 'A live 6-week summer accelerator that takes Year 12 students into Year 13 already ahead, with the high-yield topic knowledge and exam technique most students build too late. Biology, Chemistry, Maths and Physics.',
}

const Divider = () => (
  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
)

const BOOKING_URL = 'https://scheduler.zoom.us/dr-waleed-ahmad/top-1-mentorship-meeting'

export default function SummerAccelerators() {
  const subjects = [
    { name: 'Biology', emoji: '🧬' },
    { name: 'Chemistry', emoji: '🧪' },
    { name: 'Maths', emoji: '➗' },
    { name: 'Physics', emoji: '⚛️' },
  ]

  const faqs = [
    {
      question: 'When does it run?',
      answer: (
        <p>Mid-July to the end of August, finishing just before the new school year, so you walk into September already ahead.</p>
      ),
    },
    {
      question: 'Which exam boards does it cover?',
      answer: (
        <>
          <p className="mb-4">The content focuses on the foundational high-yield topics that set students up for all of Year 13, with core concepts and exam technique that apply across <strong>AQA, OCR, and Edexcel</strong>.</p>
          <p>When you sign up we ask for your exam board so your tutor can flag any board-specific differences in the sessions.</p>
        </>
      ),
    },
    {
      question: 'What if my school teaches topics in a different order?',
      answer: (
        <p>The topics we cover are the foundations that the rest of Year 13 builds on, so you will be ahead no matter what order your school teaches in.</p>
      ),
    },
    {
      question: 'Who teaches it?',
      answer: (
        <p>Expert subject tutors deliver the content, using the A-Level Accelerators system developed by Dr Waleed Ahmad.</p>
      ),
    },
    {
      question: 'What if I can only do one subject?',
      answer: (
        <p>That is completely fine. Most students take one to three. You can add more at any time before the start date.</p>
      ),
    },
    {
      question: 'What if I miss a live session?',
      answer: (
        <p>Every session is recorded, so if you miss one you can catch up at your own pace and rewatch any explanation as many times as you need. The live sessions also include time for questions, so attending where you can gets you the most value.</p>
      ),
    },
    {
      question: 'How do I secure my place?',
      answer: (
        <>
          <p className="mb-4">Early-bird places are limited and fill on a first-come basis. Choose how many subjects you want above and secure your place to lock in the summer rate.</p>
          <p>The September cohorts open at a higher price, so booking now is the cheapest way in.</p>
        </>
      ),
    },
  ]

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-brand-gold/20 border border-brand-gold/40 rounded-full px-5 py-2 mb-6">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-wide">Live 6-Week Summer Accelerator</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-brand-gold mb-6 font-bold leading-tight">
            Get Ahead in Year 13 <span className="text-brand-cream">This Summer</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Our 6 week summer accelerator takes Year 12 students into Year 13 already ahead, with the topic knowledge and the exam technique that most students don&apos;t build until it&apos;s too late.
          </p>
          <a
            href="#pricing"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Secure My Place
          </a>
        </div>
      </section>

      {/* Key Insight */}
      <ScrollFade>
        <section className="py-12 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-brand-purple font-semibold">
              💡 The students who struggle most in Year 13 are almost always the ones who spent the summer doing nothing, then spent the first term trying to catch up.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* The Problem */}
      <ScrollFade>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              Year 13 Is the Biggest Step You&apos;ll Take
            </h2>
            <div className="space-y-6 text-lg text-brand-text">
              <p>Year 13 is the biggest academic step most students ever make. The workload jumps. The content gets harder. And the students who struggle most are almost always the ones who spent the summer doing nothing, then spent the first term trying to catch up.</p>
              <p className="text-brand-gold font-semibold text-center text-xl py-2">It does not have to be that way.</p>
              <p>Whether your mocks went well or not, the summer is the one window where you can get genuinely ahead before the pressure starts. The students who use it are the ones who walk into September calm, confident, and already on top of the material everyone else is seeing for the first time.</p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* What It Is */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What the Summer Accelerator Is
            </h2>

            <p className="text-lg text-brand-text mb-12 text-center max-w-3xl mx-auto">
              The Summer Accelerator covers the highest-yield foundational topics of Year 13 in your subject, taught live by expert tutors, through the A-Level Accelerators system.
            </p>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">High-Yield Foundations</h3>
                <p className="text-brand-text">
                  We focus on the foundational topics the rest of Year 13 builds on, so you start the year on top of the material everyone else is seeing for the first time.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">Taught Live by Expert Tutors</h3>
                <p className="text-brand-text">
                  Every topic is taught live through the A-Level Accelerators system, not a tutor reading through content at you.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-semibold text-brand-purple mb-4">Knowledge and Marks, From Day One</h3>
                <p className="text-brand-text">
                  Every session teaches the topic and then immediately trains you to retrieve it under pressure and apply it to exam questions, because understanding a topic and scoring marks on it are two completely different skills. We build both from day one.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Comparison */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              The Difference a Summer Makes
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-brand-light-gray p-8 rounded-lg shadow-sm border-l-4 border-red-300">
                <h3 className="text-xl font-semibold text-brand-purple mb-6">Students who waste the summer</h3>
                <ul className="space-y-4 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Switch off completely and lose momentum</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Meet every Year 13 topic for the first time in class</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Spend the first term playing catch-up</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                    <span>Feel behind before the year has even started</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-cream p-8 rounded-lg shadow-sm border-l-4 border-brand-gold">
                <h3 className="text-xl font-semibold text-brand-purple mb-6">Students who use the Accelerator</h3>
                <ul className="space-y-4 text-brand-text">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Cover the high-yield Year 13 topics early</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Build exam technique from day one</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Walk into September calm and confident</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span>Stay ahead while everyone else catches up</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* What's Included */}
      <ScrollFade delay={0.2}>
        <section className="py-16 px-4 bg-brand-light-gray">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What You&apos;ll Get
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-purple mb-6 text-center border-b-2 border-brand-gold pb-4">Live Expert Teaching</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>6 weeks of live sessions</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Highest-yield Year 13 topics</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-purple mb-6 text-center border-b-2 border-brand-gold pb-4">Exam Technique Built In</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Retrieval under pressure</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Exam-question application</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-purple mb-6 text-center border-b-2 border-brand-gold pb-4">Ahead Before September</h3>
                <ul className="space-y-3 text-brand-text">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Foundations the year builds on</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-brand-gold font-bold">•</span>
                    <span>Walk in calm and confident</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-3 text-brand-text max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <span className="text-brand-gold font-bold text-lg flex-shrink-0">✓</span>
                <span>Full access to session recordings to catch up and rewatch</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-brand-gold font-bold text-lg flex-shrink-0">✓</span>
                <span>Exam-board-aware teaching across AQA, OCR and Edexcel</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-brand-gold font-bold text-lg flex-shrink-0">✓</span>
                <span>Taught through the proven A-Level Accelerators system</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Subjects */}
      <ScrollFade delay={0.2}>
        <section id="subjects" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              Choose Your Subjects
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-2xl mx-auto">
              Get ahead in the subjects that matter most for your Year 13.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.name}
                  className="bg-brand-light-gray p-8 rounded-lg shadow-md border-l-4 border-brand-gold text-center hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-4">{subject.emoji}</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-purple">{subject.name}</h3>
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
            <h2 className="text-3xl md:text-4xl text-brand-cream font-serif text-center mb-4">
              Secure Your Summer Place
            </h2>
            <p className="text-center text-lg text-brand-cream opacity-80 mb-12 max-w-2xl mx-auto">
              The more subjects you take, the more you save. Most students take one to three.
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
                    <span>Live teaching + exam technique built in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold font-bold flex-shrink-0">✓</span>
                    <span>Session recordings included</span>
                  </li>
                </ul>
                <a href={BOOKING_URL} className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Secure My Place
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
                <a href={BOOKING_URL} className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Secure My Place
                </a>
              </div>

              {/* Three Subjects — featured */}
              <div className="flex flex-col bg-brand-cream rounded-xl text-center shadow-2xl border-4 border-brand-gold transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(46,37,87,0.25)] overflow-hidden">
                <div className="bg-brand-gold text-brand-purple py-2 px-4 text-sm font-bold text-center">
                  Most popular
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
                  <a href={BOOKING_URL} className="mt-auto block w-full py-3 px-6 bg-brand-gold text-brand-purple font-semibold rounded-lg hover:bg-brand-gold-light transition-all shadow-lg hover:shadow-xl">
                    Secure My Place
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
                <a href={BOOKING_URL} className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Secure My Place
                </a>
              </div>
            </div>

            <p className="text-center text-brand-cream opacity-80 text-base max-w-2xl mx-auto">
              Early-bird places are limited and fill on a first-come basis. Secure your place now to lock in the summer rate before the September cohorts open at a higher price.
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
        <section id="faq" className="py-16 px-4 bg-brand-cream">
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
        <section id="secure" className="py-32 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              Walk Into September Already Ahead
            </h2>
            <p className="text-lg text-brand-text mb-12 leading-relaxed">
              The summer is the one window to get genuinely ahead before the pressure starts. Lock in the summer rate before the September cohorts open at a higher price.
            </p>
            <a
              href="#pricing"
              className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Secure My Place
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
                <a href={BOOKING_URL} className="text-brand-gold hover:text-white transition text-center">Book a Call</a>
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
