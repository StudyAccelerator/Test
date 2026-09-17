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
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('predicted-grades-lower-than-expected')!

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
    q: 'Can you challenge predicted grades at A-level?',
    a: "You can ask for a prediction to be reviewed, and schools change them when new evidence appears, but there's no formal appeals process: predictions belong to your school. The route that works is evidence plus a calm conversation: find out what the prediction was based on, ask specifically what would move it, then produce that thing. Demanding a higher number without new evidence hardens positions and changes nothing.",
  },
  {
    q: 'Can predicted grades change after they are first set?',
    a: "Yes, right up until your school submits your UCAS application, and sometimes between drafts if your school enters predictions late. Teachers update predictions when the evidence changes: a strong test result, a resat assessment, weeks of visibly better work. That's why the weeks between predictions landing and your application going in are the window that matters, and why October internal deadlines make speed important.",
  },
  {
    q: 'Can I apply to a university with higher entry requirements than my predicted grades?',
    a: "Yes. Nothing stops the application, and offers are made on the whole picture: predictions, GCSEs, your personal statement and reference. One aspirational choice among your five is sensible strategy, especially where your evidence is trending upward. Be honest with yourself about the odds, and balance the list so at least one course's typical offer sits at or below your prediction. It's a strategy question, not a permission question.",
  },
  {
    q: 'What should I say to a teacher about a low predicted grade?',
    a: 'Curiosity, not confrontation, in three questions: "What was this prediction based on?", "What specifically would you need to see to predict a grade higher?", and "Is there an assessment or piece of work coming up that could count?" Then do the thing they name. Teachers defend judgements when attacked and update them when evidenced, and they write your reference too, which is a second reason to keep the conversation warm.',
  },
  {
    q: 'How long do I have before predictions are locked into UCAS?',
    a: "Until your school submits the application, and school internal deadlines are the real clock: many sit weeks before the national ones. For 2027 entry, the UCAS deadline is 15 October 2026 (6pm) for Oxford, Cambridge and most medicine, dentistry and veterinary courses, and 13 January 2027 (6pm) for most other courses. If you're applying in the January window, you may have two months or more of evidence time. Ask your school for its internal dates today.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        If your predicted grades came back lower than expected, you have two live routes and a deadline.
        The evidence route: predictions can change until your school submits your UCAS application, so
        find out what each prediction was based on, ask what would move it, and produce that evidence
        fast. The strategy route: you can still apply with one aspirational choice and a balanced list,
        because offers weigh the whole application. What doesn&apos;t work is arguing the number without new
        evidence. For 2027 entry the clocks are 15 October 2026 for Oxbridge and most medicine, and 13
        January 2027 for most other courses, with school internal deadlines weeks earlier.
      </QuickAnswer>

      <Lead>
        There&apos;s a particular silence in September when the predicted grades email lands and the numbers
        are lower than the plan. Students read BBB and see the course they wanted disappear. Parents read
        it and don&apos;t know whether to fight the school or comfort the child. After working with more than 1,000 A-level students, I can tell you the two things the email doesn&apos;t: the
        number is a judgement, not a verdict, and the next few weeks decide which one it stays.
      </Lead>

      <KeyTakeaways
        points={[
          'Predictions are evidence-based judgements, and they can change until your school submits the UCAS application. The window is real but short.',
          'First 48 hours: no angry emails. Find out what each prediction was based on and exactly what would move it. Teachers update on evidence, not pressure.',
          'Route one is evidence: a strong upcoming assessment, a resat test, weeks of visibly different work. Route two is strategy: apply anyway, with a balanced five.',
          'The real deadlines are your school\'s internal ones, often weeks before UCAS\'s 15 October 2026 (Oxbridge, most medicine) and 13 January 2027 dates.',
          'A low prediction is also information: it tells you where the evidence is weak, which is exactly what a good revision system fixes.',
        ]}
      />

      <H2 id="first-48-hours">The first 48 hours: gather, don&apos;t fire</H2>
      <P>
        The instinct is to fire off an email that afternoon, or to have a parent do it. Hold. A
        prediction is a professional judgement your teachers will be asked to defend, and judgements
        attacked in writing get defended, not revised. Spend the first two days gathering instead: which
        assessments each prediction was based on, what your school&apos;s process and internal UCAS deadline
        are, and, subject by subject, the honest gap between the prediction and the grade you need. Only
        then have the conversation, and have it as the student, not the parent: the question &quot;what
        would you need to see to predict higher?&quot; lands completely differently from &quot;we think this
        is wrong&quot;.
      </P>

      <H2 id="evidence-route">Route one: move the number with evidence</H2>
      <P>
        Teachers predict from evidence, so the route to a different number is new evidence, produced
        quickly. The strongest forms, in rough order: a better mark in a formal assessment (ask whether
        anything is coming up, or whether a resat test is possible), a run of visibly stronger classwork
        and homework, and a credible, structured plan that explains why the improvement will hold. I&apos;ve
        written the complete playbook, including the eight-week version, in{' '}
        <A href="/blog/how-to-improve-predicted-grades/">how to improve your predicted grades before
        UCAS</A>: everything there applies double once a disappointing number is already on the table.
      </P>
      <P>
        Be honest about the diagnosis first, though. A prediction that surprised you usually means the
        evidence trail from Year 12 was weaker than it felt from inside, and the cause is nearly always
        method rather than ability:{' '}
        <A href="/blog/bad-year-12-results-what-now/">bad Year 12 results have the same four causes</A>,
        and fixing the right one is what makes the new evidence appear. Our free{' '}
        <A href="/revision-diagnostic/">revision diagnostic</A>{' '}names yours in about four minutes.
      </P>

      <Callout title="If the school won't move">
        Sometimes the answer is no, politely or otherwise. You still have the strategy route below, and
        one more honest consideration: ask your teacher whether the reference can record your upward
        trajectory. Admissions tutors read references, and &quot;working significantly above these
        predictions since September&quot; in a reference softens a cautious number more than students
        realise.
      </Callout>

      <H2 id="strategy-route">Route two: apply well anyway</H2>
      <UL>
        <LI>
          <Strong>One aspirational choice is sane, five is not.</Strong>{' '}Courses publish entry
          requirements, but offers are decisions about whole applications. Keep one reach on the list,
          especially where your evidence is trending up.
        </LI>
        <LI>
          <Strong>Balance the other four.</Strong>{' '}At least one course whose typical offer sits at or
          below your prediction turns results day from a cliff into a choice. The goal is a list where
          every outcome in August leads somewhere you&apos;d actually go.
        </LI>
        <LI>
          <Strong>Make the rest of the application argue for you.</Strong>{' '}Predictions are one input.
          A precise, evidenced personal statement is the part you fully control, and this year&apos;s
          format rewards it:{' '}
          <A href="/blog/ucas-personal-statement-three-questions/">the three-question personal statement
          guide</A>{' '}shows exactly how.
        </LI>
        <LI>
          <Strong>Remember August exists.</Strong>{' '}Offers are confirmed on real results, and students
          beat cautious predictions every summer. A lower prediction narrows the application; it does not
          decide the exam.
        </LI>
      </UL>

      <DiagnosticCTA />

      <H2 id="deadlines">The clocks, precisely</H2>
      <P>
        For 2027 entry: applications to Oxford, Cambridge and most medicine, dentistry and veterinary
        courses close at 6pm on <Strong>15 October 2026</Strong>. Most other courses have equal
        consideration until 6pm on <Strong>13 January 2027</Strong>. Your school&apos;s internal deadlines
        for references and checks sit earlier, sometimes by several weeks, and they are the dates that
        actually govern your evidence window. If you&apos;re in the October cycle, the window is tight and
        the conversation happens this week. In the January cycle, a whole term of evidence is still on
        the table, which is exactly enough time for a method change to show up in marks.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI><A href="https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications">UCAS: dates and deadlines for university applications (2027 entry)</A></LI>
      </UL>
    </ArticleLayout>
  )
}
