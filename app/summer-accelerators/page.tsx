import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollFade } from '@/components/ui/scroll-fade'
import FAQItem from '@/components/ui/faq-item'
import TestimonialWall from '@/components/home/testimonial-wall'
import { HeroHeadline, HeroWord, HeroFade } from '@/components/home/hero-reveal'

export const metadata = {
  title: 'A-Level Summer Accelerator | Get Ahead for Year 13 | A-Level Accelerators',
  description: 'A 6-week live A-Level summer course for Year 12 students going into Year 13. Master the high-yield topics that decide your predicted grades. Biology, Chemistry, Maths and Physics. Starts 25th July.',
  alternates: { canonical: 'https://alevelaccelerators.com/summer-accelerators/' },
}

const Divider = () => (
  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
)

const STRIPE_LINK_ONE_SUBJECT = 'https://buy.stripe.com/9B614oe9I6XQdHYdLmc3m06'
const STRIPE_LINK_TWO_SUBJECTS = 'https://buy.stripe.com/dRmdRa2r04PI5bs6iUc3m07'
const STRIPE_LINK_THREE_SUBJECTS = 'https://buy.stripe.com/14A00k6Hgeqi0Vc8r2c3m08'
const STRIPE_LINK_FOUR_SUBJECTS = 'https://buy.stripe.com/dRm14o3v4aa2avM9v6c3m05'
const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

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
      q: 'Who is the Summer Accelerator for?',
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
      q: "Will the sessions for different subjects overlap?",
      a: "No. Session times are scheduled so subjects never clash, so you can take all four and still make every session live.",
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
      q: "Which exam boards do you cover?",
      a: "We teach to the three exam boards used most across A-Levels: AQA, OCR and Edexcel.",
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
      <section id="hero" className="relative overflow-hidden bg-brand-cream pt-16 pb-16 md:pt-24 md:pb-20 px-6 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 40% at 50% 0%, rgba(201,169,110,0.14) 0%, rgba(201,169,110,0) 100%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto">
          <HeroFade delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/10 bg-brand-purple/[0.04] px-4 py-1.5 text-sm font-semibold text-brand-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              Summer Accelerator · Six Weeks, Live
            </span>
          </HeroFade>
          <h1 className="mt-6 font-serif font-bold tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl text-brand-purple">
            <HeroHeadline>
              <HeroWord>Master</HeroWord> <HeroWord>the</HeroWord> <HeroWord>Topics</HeroWord>{' '}
              <HeroWord>That</HeroWord> <HeroWord>Decide</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">Your</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">Predicted</HeroWord>{' '}
              <HeroWord className="italic text-brand-gold">Grades!</HeroWord>
            </HeroHeadline>
          </h1>
          <HeroFade delay={0.45}>
            <p className="mt-6 text-lg md:text-xl text-brand-text/75 leading-relaxed max-w-2xl mx-auto">
              A six-week live summer course covering the high-yield Year 13 topics in Biology, Chemistry, Maths and Physics. Built by a doctor, taught by subject specialists.
            </p>
          </HeroFade>
          <HeroFade delay={0.55}>
            <a
              href="#pricing"
              className="mt-9 inline-flex justify-center items-center rounded-full bg-brand-purple text-brand-cream px-9 py-4 text-lg font-semibold shadow-[inset_0_-8px_10px_rgba(255,255,255,.12),0_10px_24px_rgba(46,37,87,.25)] hover:bg-brand-purple-light hover:-translate-y-0.5 transition-all"
            >
              Start September Ahead
            </a>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-brand-text/70">
              <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> Built by Dr Waleed, taught by expert A-Level tutors</li>
              <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> 1,000+ students supported</li>
              <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> First session risk-free</li>
            </ul>
          </HeroFade>
        </div>
      </section>

      {/* Urgency Bar */}
      <ScrollFade>
        <section className="py-6 px-4 bg-brand-purple border-y-2 border-brand-gold/50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base md:text-lg text-brand-cream font-semibold">
              ⏳ The next cohort starts <span className="text-brand-gold">Saturday 25th July</span> with limited spaces. Secure your place now!
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Proof strip: concrete numbers before any pitch */}
      <ScrollFade>
        <section className="py-10 px-4 bg-white border-b border-brand-cream-dark">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
            {[
              { stat: '1,000+', label: 'students worked with' },
              { stat: '24 hrs', label: 'of live teaching per subject' },
              { stat: '£9 to £12', label: 'per hour, vs £50/hr average for 1:1 tutoring' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl md:text-4xl font-serif font-bold text-brand-purple">{item.stat}</p>
                <p className="text-sm text-brand-text opacity-75 mt-2 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* Testimonials: proof before pitch */}
      <TestimonialWall />

      <Divider />

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
                <p>Hi, I&apos;m Dr Waleed Ahmad, the founder of A-Level Accelerators. I&apos;ve worked with over 1,000 students, and I built this programme around one idea: the students who get ahead over summer walk into Year 13 in control, while everyone else spends first term catching up.</p>
                <p>Your subjects are taught live by expert tutors who know exactly which topics carry the most marks. I run the final sessions myself, where I teach the exam technique, active recall, and study systems that turn knowing the content into actually securing top grades.</p>
                <p>By the end of six weeks, you won&apos;t just have covered the highest-value Year 13 topics. You&apos;ll know them well enough to walk into the mocks that set your predicted grades with confidence and already ahead!</p>
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
              What the Summer Accelerator Includes
            </h2>

            <div className="space-y-6">
              {[
                {
                  num: '01',
                  title: 'The Topics That Decide Your Grades',
                  body: 'In six weeks (two-hour sessions, twice a week), we cover the high-yield Year 13 topics that carry the most marks and show up in the mocks that set your predicted grades. You learn the things that actually move your grade, not filler.',
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
            <p className="text-center text-brand-gold font-semibold text-base md:text-lg mt-4">
              Average 1:1 tutoring costs £50/hr. Our packages work out at £9 to £12/hr.
            </p>
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
              The next cohort starts Saturday 25th July. Session times never overlap, so you can take all four subjects and still attend every session live.
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
                <a href={STRIPE_LINK_ONE_SUBJECT} className="mt-auto block w-full py-3 px-6 text-sm bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
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
                    <span>48 hours of teaching for less than 11 hours of 1:1 tutoring</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_TWO_SUBJECTS} className="mt-auto block w-full py-3 px-6 text-sm bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
                  Join Two Subjects
                </a>
              </div>

              {/* Three Subjects (featured) */}
              <div className="relative flex flex-col bg-brand-cream rounded-xl p-8 text-center shadow-2xl border-4 border-brand-gold transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(46,37,87,0.25)]">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-gold text-brand-purple text-sm font-bold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
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
                    <span>72 hours of teaching for less than 15 hours of 1:1 tutoring</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_THREE_SUBJECTS} className="mt-auto block w-full py-3 px-6 text-sm bg-brand-gold text-brand-purple font-semibold rounded-lg hover:bg-brand-gold-light transition-all shadow-lg hover:shadow-xl">
                  Join Three Subjects
                </a>
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
                    <span>96 hours of teaching for less than 17 hours of 1:1 tutoring</span>
                  </li>
                </ul>
                <a href={STRIPE_LINK_FOUR_SUBJECTS} className="mt-auto block w-full py-3 px-6 text-sm bg-brand-gold bg-opacity-80 text-brand-purple font-semibold rounded-lg hover:bg-brand-gold transition-all hover:shadow-md">
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
          <div className="max-w-4xl mx-auto bg-brand-cream border border-brand-gold/30 rounded-xl px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <p className="text-sm sm:whitespace-nowrap text-brand-text">
                Not sure which option fits? Book a free call with Dr Waleed to help you choose.
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

      {/* Soft path for visitors who are not ready to buy */}
      <section className="py-14 px-4 bg-brand-cream text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-brand-purple font-serif mb-4">
            Not Ready to Decide Yet?
          </h2>
          <p className="text-brand-text mb-8 leading-relaxed">
            Start with the free Revision Tracker instead. It builds you a personalised weekly revision timetable in about three minutes, using the same method we teach on the course.
          </p>
          <a
            href="/revision-tracker"
            className="inline-block px-8 py-3 border-2 border-brand-gold text-brand-purple font-semibold rounded-md hover:bg-brand-gold transition-all"
          >
            Build My Free Timetable
          </a>
        </div>
      </section>

      {/* Sticky mobile CTA: on a page this long, the next buy button is
          thousands of pixels from the hero on a phone */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-brand-purple border-t-2 border-brand-gold px-4 py-2.5 flex items-center justify-between gap-3">
        <span className="text-brand-cream text-sm font-medium leading-snug">Cohort starts 25th July</span>
        <a
          href="#pricing"
          className="shrink-0 px-5 py-2 bg-brand-gold text-brand-purple text-sm font-bold rounded-md"
        >
          Secure my place
        </a>
      </div>
      <div className="h-14 md:hidden" aria-hidden="true" />

      {/* Footer */}
      <Footer />
    </main>
  )
}
