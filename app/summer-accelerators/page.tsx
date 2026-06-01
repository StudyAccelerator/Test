import Image from 'next/image'
import Header from '@/components/header'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'

export const metadata = {
  title: 'Summer Accelerator - Get Ahead in Year 13 This Summer',
  description: 'A 6-week summer accelerator taking Year 12 students into Year 13 already ahead, with the topic knowledge and exam technique that most students build too late.',
}

const Divider = () => (
  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
)

export default function SummerAccelerators() {
  const subjects = [
    { name: 'Biology', emoji: '🧬', accent: 'green' },
    { name: 'Chemistry', emoji: '🧪', accent: 'purple' },
    { name: 'Maths', emoji: '➗', accent: 'blue' },
    { name: 'Physics', emoji: '⚛️', accent: 'gold' },
  ]

  const faqs = [
    {
      question: 'When does it run?',
      answer: (
        <p>Mid-July to the end of August, finishing just before the new school year.</p>
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
  ]

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-brand-purple to-brand-purple-light text-brand-cream py-28 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-brand-gold/20 border border-brand-gold/40 rounded-full px-5 py-2 mb-6">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-wide">6-Week Summer Accelerator</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-brand-gold mb-8 font-bold leading-tight">
            Get Ahead in Year 13 This Summer
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Our 6 week summer accelerator takes Year 12 students into Year 13 already ahead, with the topic knowledge and the exam technique that most students don&apos;t build until it&apos;s too late...
          </p>
          <a
            href="#pricing"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-purple font-semibold rounded-md text-lg hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Secure My Place
          </a>
        </div>
      </section>

      {/* The Problem */}
      <ScrollFade>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              The Summer Is the One Window to Get Genuinely Ahead
            </h2>
            <div className="space-y-6 text-lg text-brand-text">
              <p>Year 13 is the biggest academic step most students ever make. The workload jumps. The content gets harder. And the students who struggle most are almost always the ones who spent the summer doing nothing, then spent the first term trying to catch up.</p>
              <p className="text-brand-gold font-semibold text-center text-xl py-2">It does not have to be that way.</p>
              <p>Whether your mocks went well or not, the summer is the one window where you can get genuinely ahead before the pressure starts. The students who use it are the ones who walk into September calm, confident, and already on top of the material everyone else is seeing for the first time.</p>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* What It Is */}
      <ScrollFade delay={0.2}>
        <section className="py-20 px-4 bg-gradient-to-r from-yellow-50 via-pink-50 to-yellow-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-12">
              What It Is
            </h2>
            <div className="space-y-6 text-lg text-brand-text">
              <p>The Summer Accelerator covers the highest-yield foundational topics of Year 13 in your subject, taught live by expert tutors, through the A-Level Accelerators system.</p>
              <p>That last part matters. This is not a tutor reading through content. Every session teaches the topic and then immediately trains you to retrieve it under pressure and apply it to exam questions, because understanding a topic and scoring marks on it are two completely different skills.</p>
              <p className="text-brand-purple font-semibold text-center text-xl pt-2">We build both from day one.</p>
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Subjects */}
      <ScrollFade delay={0.2}>
        <section id="subjects" className="py-20 px-4 bg-brand-cream">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif text-center mb-4">
              Subjects
            </h2>
            <p className="text-center text-lg text-brand-text mb-12 max-w-2xl mx-auto">
              Choose the subjects you want to get ahead in this summer.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.name}
                  className="bg-white p-8 rounded-lg shadow-md border-l-4 border-brand-gold text-center hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-4">{subject.emoji}</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-purple">{subject.name}</h3>
                </div>
              ))}
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
              Pricing
            </h2>
            <p className="text-center text-lg text-brand-cream opacity-80 mb-12 max-w-2xl mx-auto">
              The more subjects you take, the more you save.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-10">
              {/* One Subject */}
              <div className="flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-2">One Subject</h3>
                <p className="text-4xl font-bold text-brand-gold mb-6 mt-2">£289</p>
                <a href="#secure" className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Secure My Place
                </a>
              </div>

              {/* Two Subjects */}
              <div className="flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-2">Two Subjects</h3>
                <p className="text-4xl font-bold text-brand-gold mb-6 mt-2">£539</p>
                <a href="#secure" className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Secure My Place
                </a>
              </div>

              {/* Three Subjects — featured */}
              <div className="flex flex-col bg-brand-cream rounded-xl text-center shadow-2xl border-4 border-brand-gold transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(46,37,87,0.25)] overflow-hidden">
                <div className="bg-brand-gold text-brand-purple py-2 px-4 text-sm font-bold text-center">
                  Most popular
                </div>
                <div className="flex flex-col flex-grow p-8">
                  <h3 className="text-xl font-serif font-bold text-brand-purple mb-2">Three Subjects</h3>
                  <p className="text-4xl font-bold text-brand-gold mb-6 mt-2">£739</p>
                  <a href="#secure" className="mt-auto block w-full py-3 px-6 bg-brand-gold text-brand-purple font-semibold rounded-lg hover:bg-brand-gold-light transition-all shadow-lg hover:shadow-xl">
                    Secure My Place
                  </a>
                </div>
              </div>

              {/* Four Subjects */}
              <div className="flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-lg border-2 border-brand-cream-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-2">Four Subjects</h3>
                <p className="text-4xl font-bold text-brand-gold mb-6 mt-2">£849</p>
                <a href="#secure" className="mt-auto block w-full py-3 px-6 bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
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
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      <Divider />

      {/* Final CTA */}
      <ScrollFade delay={0.2}>
        <section id="secure" className="py-24 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-brand-purple font-serif mb-6">
              Walk Into September Already Ahead
            </h2>
            <p className="text-lg text-brand-text mb-10 leading-relaxed">
              Early-bird places are limited and fill on a first-come basis. Lock in the summer rate before the September cohorts open at a higher price.
            </p>
            <a
              href="https://scheduler.zoom.us/dr-waleed-ahmad/top-1-mentorship-meeting"
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
                <a href="https://scheduler.zoom.us/dr-waleed-ahmad/top-1-mentorship-meeting" className="text-brand-gold hover:text-white transition text-center">Book a Call</a>
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
