import type { Metadata } from 'next'
import {
  ArticleLayout,
  Lead,
  P,
  H2,
  UL,
  LI,
  Strong,
  A,
  QuickAnswer,
  KeyTakeaways,
  Callout,
  DiagnosticCTA,
  CourseCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('how-much-does-a-level-tutoring-cost')!

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  keywords: post.keywords,
  alternates: { canonical: `${SITE_URL}/blog/${post.slug}/` },
  openGraph: {
    title: post.title,
    description: post.description,
    type: 'article',
    images: ['/og-default.png'],
    url: `${SITE_URL}/blog/${post.slug}/`,
  },
}

const faqs: FAQ[] = [
  {
    q: 'How much does an A-level tutor cost per hour?',
    a: "One-to-one A-level tutoring averages around £50 an hour in the UK, with marketplace listings commonly running from roughly £20 to £70 an hour depending on the subject, the tutor's experience and qualifications, and demand. Our live small-group programmes work out at £12 to £14 an hour, far cheaper than one-to-one, because the teaching cost is shared across the group.",
  },
  {
    q: 'How much does A-level tutoring cost per year?',
    a: 'At around £50 an hour, weekly one-to-one tutoring in a single subject costs roughly £200 a month, which adds up to £1,500 or more across a school year, per subject. Our structured group programmes cover the same weekly hour count at a fraction of that, which is why families with more than one weak subject often go the group route.',
  },
  {
    q: 'Is more expensive tutoring better?',
    a: 'Not reliably. Price mostly tracks experience, qualifications and demand, not results. What actually predicts progress is whether sessions are built around exam questions and mark schemes, whether the tutor diagnoses why marks are being lost before teaching, and whether your child does retrieval work between sessions. A £70 an hour tutor re-explaining the textbook loses to a £14 an hour group session built on past-paper technique.',
  },
  {
    q: 'Why is group tutoring so much cheaper than one-to-one?',
    a: "Simple maths: the cost of the teacher's hour is split across the group. A specialist teaching eight students at once can charge each family a fraction of a private rate and still be better paid than a solo tutor, which is how our programmes can afford stronger, more specialist teachers per pound than a £50 an hour private rate buys. What you give up is having the full hour steered around one student, which matters most when a student has unusual, specific gaps.",
  },
  {
    q: 'When is one-to-one tutoring worth the money?',
    a: 'When the problem is narrow and specific: one topic that has collapsed, a particular paper, or a student who will not ask questions in any group setting. For broad problems, working hard but underperforming across a subject, weak exam technique, no revision system, our structured group programmes give you far more hours of expert input for the same budget.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        One-to-one A-level tutoring averages around £50 an hour in the UK, with listed rates commonly
        between £20 and £70 depending on subject, experience and demand. Weekly private tutoring in one
        subject runs to roughly £1,500 or more over a school year. Our live small-group programmes work
        out at £12 to £14 an hour for the same weekly structure. Price is not the number that
        matters most, though: what predicts results is whether the teaching is built on exam questions,
        not re-explained content.
      </QuickAnswer>

      <Lead>
        Parents ask me about tutoring prices almost as often as they ask about grades, and the honest answer
        is that the market is confusing on purpose. Rates run from pocket money to eye watering, quality does
        not line up neatly with price, and nobody tells you what you are actually buying. So here are the real
        numbers, what drives them, and the two or three questions that matter far more than the hourly rate.
      </Lead>

      <KeyTakeaways
        points={[
          'UK one-to-one A-level tutoring averages around £50 an hour; marketplace listings commonly run from roughly £20 to £70.',
          'Weekly one-to-one tutoring in a single subject costs in the region of £200 a month, or £1,500 plus across a school year.',
          "Our live small-group programmes cost £12 to £14 an hour, a fraction of one-to-one, because the specialist's time is shared.",
          'Price tracks experience and demand, not results. Exam-question-first teaching predicts progress far better than the rate.',
          'Match the format to the problem: one-to-one for narrow, specific gaps; our structured group programmes for broad underperformance.',
        ]}
      />

      <H2 id="the-numbers">The real numbers in 2026</H2>
      <div className="overflow-x-auto my-8 rounded-lg shadow-sm">
        <table className="w-full bg-white text-left text-brand-text">
          <thead>
            <tr className="bg-brand-purple text-brand-cream">
              <th className="p-4 font-semibold">Format</th>
              <th className="p-4 font-semibold">Typical cost</th>
              <th className="p-4 font-semibold">What that means over a year</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold">One-to-one, marketplace tutor</td>
              <td className="p-4">Roughly £20 to £70 an hour; around £50 is the working average</td>
              <td className="p-4">About £200 a month per subject for a weekly hour; £1,500 plus over a school year</td>
            </tr>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold">One-to-one, agency or premium tutor</td>
              <td className="p-4">£60 an hour and upwards, sometimes well beyond</td>
              <td className="p-4">£2,000 plus per subject per year, before exam-season top-ups</td>
            </tr>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold">Our live small-group programmes</td>
              <td className="p-4">£12 to £14 an hour (£289 to £339 per subject)</td>
              <td className="p-4">A full 12-week programme costs less than two months of weekly one-to-one</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Two honest caveats on those figures. Listed marketplace rates move with subject and season: maths and
        the sciences price higher because demand outstrips supply, and rates climb in the spring as exams
        approach. And the cheapest end of the market is cheap for a reason, usually students or recent
        graduates learning to teach on your child&apos;s time.
      </P>

      <H2 id="what-drives-price">What actually drives the price</H2>
      <UL>
        <LI>
          <Strong>Experience and qualifications.</Strong>{' '}Qualified teachers and examiners charge the most.
          Undergraduates charge the least. Both can be excellent or useless; the certificate tells you about
          the tutor, not about what your child will do differently in an exam.
        </LI>
        <LI>
          <Strong>Subject demand.</Strong>{' '}Maths, Chemistry, Biology and Physics tutors are outnumbered by the
          students who need them, so they price higher than most humanities.
        </LI>
        <LI>
          <Strong>Format.</Strong>{' '}One-to-one means one family pays for the whole hour. Groups share it. This
          is the single biggest lever on cost, and the one families use least.
        </LI>
        <LI>
          <Strong>Middlemen.</Strong>{' '}Agencies and platforms take a cut, often a large one. A £45 an hour
          platform tutor may be receiving £25 of it.
        </LI>
        <LI>
          <Strong>Season.</Strong>{' '}From January to May, good tutors fill up and prices harden. The families
          who pay least locked in their support in the autumn.
        </LI>
      </UL>

      <H2 id="cost-per-grade">Stop thinking cost per hour. Think cost per grade.</H2>
      <P>
        Here is the reframe I give every parent who asks about prices. The hourly rate is the wrong unit,
        because you are not buying hours, you are buying a grade change. A cheap tutor whose sessions produce
        nothing costs infinitely more per grade than an expensive one who moves the needle. And the thing that
        moves grades is depressingly consistent: <Strong>working exam questions against mark schemes until
        the marks stop leaking</Strong>, plus a revision system between sessions. Content re-explanation
        feels helpful and moves grades least. I&apos;ve written about{' '}
        <A href="/blog/one-to-one-a-level-tutoring/">when one-to-one tutoring actually improves grades</A>{' '}
        and <A href="/blog/how-to-choose-an-a-level-tutor/">how to choose a tutor</A>{' '}in detail, and both
        come down to the same test: ask any prospective tutor how much of the session happens inside past
        papers. The answer tells you more than the price does.
      </P>

      <Callout title="The question that saves families money">
        Before paying anyone, ask: &quot;What happens in a typical session, and how much of it is spent on
        exam questions?&quot; If the answer is mostly re-teaching content, you are about to pay tutor prices
        for what a textbook does for £20.
      </Callout>

      <H2 id="our-prices">Where our courses sit, transparently</H2>
      <P>
        Since this is an article about prices, here are ours, in the open. Our live 12-week{' '}
        <A href="/subject-accelerators/">Subject Accelerators</A>{' '}in Biology, Chemistry and Maths cost
        £339 per subject, which works out at roughly £14 per teaching hour, with a bundle price of £849 for
        all three. The six-week{' '}
        <A href="/summer-accelerators/">Summer Accelerator</A>{' '}starts at £289 per subject, around £12 per
        live teaching hour, with discounts as you add subjects. Small groups, specialist teachers, sessions
        built around exam questions and mark schemes, first session risk-free. That is how the one-to-one maths above gets beaten.
      </P>

      <DiagnosticCTA audience="parent" />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        Budget around £50 an hour for decent one-to-one tutoring, £1,500 plus per subject over a year if it
        runs weekly. Pay it happily if the problem is narrow and the tutor lives inside past papers. If the
        problem is broad, and for most students working hard without results it is, structured group teaching
        buys the same weekly expert hours for a fraction of the price. Either way, judge the teaching by how
        it treats exam questions, not by the rate card.
      </P>

      <CourseCTA
        heading="See what £14 an hour of specialist teaching looks like"
        body="Live 12-week A-level programmes in Biology, Chemistry and Maths. Small groups, exam-question-first sessions, led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Programmes and Prices"
        href="/subject-accelerators/"
      />
    </ArticleLayout>
  )
}
