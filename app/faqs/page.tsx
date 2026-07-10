import Header from '@/components/header'
import Footer from '@/components/footer'
import FAQItem from '@/components/ui/faq-item'
import { HeroHeadline, HeroWord } from '@/components/home/hero-reveal'

export const metadata = {
  title: 'FAQs | A-Level Accelerators',
  description:
    'Answers to common questions from students and parents about A-Level Accelerators: our live courses, pricing, tutors, exam boards, results and refunds.',
  alternates: { canonical: 'https://alevelaccelerators.com/faqs/' },
}

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

type QA = { q: string; a: string }
type Group = { heading: string; items: QA[] }

const groups: Group[] = [
  {
    heading: 'About A-Level Accelerators',
    items: [
      {
        q: 'What is A-Level Accelerators?',
        a: "We're a UK A-level tuition company that runs live, small-group online courses in Biology, Chemistry, Maths and Physics. Every session is built around exam questions and mark schemes rather than just re-teaching content, and it's led by Dr Waleed Ahmad, a doctor and former top-performing A-level student who has worked with over 1,000 students.",
      },
      {
        q: 'Who teaches the sessions?',
        a: "Your subjects are taught live by subject specialists who know the spec inside out, achieved top grades themselves and have helped hundreds of students do the same. Dr Waleed runs the final sessions himself on exam technique, active recall and study strategy, so students leave knowing how to turn content into actual marks.",
      },
      {
        q: 'What makes you different from a normal tutor?',
        a: "A typical tutor mostly re-explains content, which usually lifts a student to a B and then stalls. We focus on the things that actually move grades from B to A and A*: recall under pressure, applying knowledge to unfamiliar questions, and exam technique. That's why our sessions go straight into exam questions after covering the key content briefly.",
      },
      {
        q: 'How do I know if it works?',
        a: "Students rate their confidence in each topic before and after every session, and it climbs consistently across our 12-week programmes. You can also read real student feedback on our homepage. And because the first session is risk-free, you can judge the teaching yourself before committing.",
      },
    ],
  },
  {
    heading: 'Courses & how they work',
    items: [
      {
        q: 'Which subjects can I take?',
        a: "Biology, Chemistry, Maths and Physics. You can take one subject or several, and on the Summer Accelerator the more you take, the more you save.",
      },
      {
        q: 'What is the difference between your programmes?',
        a: "The Summer Accelerator is a six-week course over the summer that gets Year 12 students ahead on the high-yield Year 13 topics before term starts. The Subject Accelerators are live 12-week exam programmes that run through the year. The Study System teaches the exam technique and revision strategy that sit on top of subject knowledge. If you're not sure which fits, book a free call and we'll help you choose.",
      },
      {
        q: 'How are the sessions structured?',
        a: "Sessions are live and interactive, typically two hours each. We cover the key content briefly, then work through exam questions and mark schemes together, so students are practising the skill the exam actually tests rather than passively watching.",
      },
      {
        q: 'What if I miss a session?',
        a: "Every session is recorded, so you'll never fall behind if something comes up. You get access to the recordings to catch up or revise whenever you need.",
      },
      {
        q: 'Which exam boards do you cover?',
        a: "We teach to the three exam boards used most across A-levels: AQA, OCR and Edexcel.",
      },
      {
        q: 'Do sessions for different subjects overlap?',
        a: "No. On the Summer Accelerator, session times are scheduled so subjects never clash, so you can take all four and still attend every session live.",
      },
    ],
  },
  {
    heading: 'Pricing, payment & refunds',
    items: [
      {
        q: 'How much do the courses cost?',
        a: "Summer Accelerator pricing starts at £289 for one subject, with discounts for taking more (£539 for two, £739 for three, £849 for all four). That works out at roughly £9 to £12 per hour of live teaching, compared with an average of around £50 an hour for one-to-one tutoring. Exact pricing for each programme is shown on its page.",
      },
      {
        q: 'How do I pay?',
        a: "You can pay securely by card through the checkout links on each course page. If you'd like to talk it through first, book a free call with Dr Waleed.",
      },
      {
        q: 'Is there a guarantee?',
        a: "Yes. Try your first session completely risk-free. If it's not right for you, request a full refund, no questions asked.",
      },
    ],
  },
  {
    heading: 'For parents',
    items: [
      {
        q: 'Is this suitable if my child is already doing well?',
        a: "Absolutely. Plenty of students join already performing well and want to protect and extend their lead. The teaching is built around exam technique and application, which is exactly what takes a student from an A to an A*. It works whether your child is closing a gap or pushing for the top.",
      },
      {
        q: 'My child is struggling. Will they be able to keep up?',
        a: "Yes. The groups are small, sessions are interactive, and students can ask questions in real time. If your child has genuine gaps in understanding, the sessions rebuild them, and the recordings let them go back over anything they need. Book a free call if you'd like to talk through where they're at.",
      },
      {
        q: 'How can I support my child during A-levels?',
        a: "The most useful things are practical: help them protect their sleep, keep a calm home environment during exam season, and encourage a steady weekly routine rather than last-minute cramming. Our revision blog has detailed guides written for exactly this, and our free Revision Tracker builds them a personalised weekly plan.",
      },
      {
        q: 'How do I get in touch?',
        a: "Email Waleed@alevelaccelerators.com or book a free call. We're happy to answer any questions before you commit.",
      },
    ],
  },
  {
    heading: 'Results & revision',
    items: [
      {
        q: 'Can this improve my predicted grades?',
        a: "It's designed to. Predicted grades are set largely from the mocks and assessments in Year 12 and early Year 13, and those reward exam technique and application, which is exactly what we teach. Getting ahead early is the single biggest lever on your predictions.",
      },
      {
        q: 'What is the best way to revise for A-levels?',
        a: "Active recall (testing yourself from memory), spaced repetition (bringing topics back at growing intervals), and timed past papers. Re-reading and highlighting feel productive but barely move grades. Our blog covers this in depth, and the free Revision Tracker builds these methods into a weekly plan for you.",
      },
      {
        q: 'Do you offer free resources?',
        a: "Yes. Our revision blog, the free Revision Tracker timetable tool, and a printable blurting template are all free and linked in the footer of every page.",
      },
    ],
  },
]

const allItems = groups.flatMap((g) => g.items)

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQsPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      <section className="max-w-3xl mx-auto px-6 pt-14 pb-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-gold mb-3">Help &amp; Answers</p>
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold tracking-tight leading-tight mb-5">
          <HeroHeadline>
            <HeroWord>Frequently</HeroWord> <HeroWord className="italic text-brand-gold">Asked</HeroWord>{' '}
            <HeroWord>Questions</HeroWord>
          </HeroHeadline>
        </h1>
        <p className="text-lg text-brand-text max-w-2xl mx-auto">
          Everything students and parents usually want to know about our courses, pricing, teaching and results.
          Can&apos;t find your answer? Email us or book a free call.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10 space-y-12">
        {groups.map((group) => (
          <div key={group.heading}>
            <h2 className="text-2xl text-brand-purple font-serif font-bold mb-6">{group.heading}</h2>
            <div className="space-y-4">
              {group.items.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={<p>{faq.a}</p>} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-xl p-8 md:p-10 text-center">
          <p className="text-2xl font-serif text-brand-gold mb-3">Still have a question?</p>
          <p className="text-brand-cream mb-6 max-w-xl mx-auto">
            Book a free call with Dr Waleed and get everything answered before you decide, with no obligation.
          </p>
          <a
            href={BOOK_A_CALL_LINK}
            className="inline-block px-8 py-3 bg-brand-gold text-brand-purple font-semibold rounded-md hover:bg-brand-gold-light transition"
          >
            Book a Free Call
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
