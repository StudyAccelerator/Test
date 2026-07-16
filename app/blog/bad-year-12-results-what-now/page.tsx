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

const post = getPost('bad-year-12-results-what-now')!

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  keywords: post.keywords,
  alternates: { canonical: `${SITE_URL}/blog/${post.slug}/` },
  openGraph: {
    title: post.title,
    description: post.description,
    type: 'article',
    url: `${SITE_URL}/blog/${post.slug}/`,
  },
}

const faqs: FAQ[] = [
  {
    q: 'Do Year 12 results affect my final A-level grade?',
    a: "No. Your final A-level grade comes from the exams you sit at the end of Year 13, plus coursework in the minority of subjects that include it. Year 12 mocks and end-of-year exams never appear on your certificate. What they do affect is your predicted grades, which shape your university options, and that's why they're worth taking seriously without panicking about them.",
  },
  {
    q: 'Do universities see my Year 12 results?',
    a: "Not directly. Universities see your GCSE grades, your predicted A-level grades and your school reference. Year 12 marks aren't sent to them. But your predictions are built from those marks, and your reference is written by teachers who watched you earn them, so Year 12 reaches universities second-hand.",
  },
  {
    q: 'How important are Year 12 mocks?',
    a: "They're the main evidence teachers use when setting predicted grades in September or October of Year 13, and they're your best diagnostic data: they show exactly which topics and which skills leak marks under real conditions. What they are not is a ceiling. A bad mock predicts nothing about a student who changes method over the summer.",
  },
  {
    q: 'Can I still get an A* after a bad Year 12?',
    a: "Yes, and students do it every year. A-levels are assessed at the end of Year 13, so the grade belongs to whoever turns up to those exams. The honest condition: something has to change. The same method that produced a D in Year 12 produces a D in Year 13, just with more stress attached. Different method, different outcome.",
  },
  {
    q: 'Are Year 12 mocks harder than the real A-level exams?',
    a: "They're different rather than harder. Schools often use real A-level papers or questions, sometimes with full A-level grade boundaries, while you've only covered part of the course and have had less practice under timed conditions. That's why a disappointing mock grade is a warning light, not a verdict. Read it as information about your method, not your ability.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Bad Year 12 results don&apos;t cap your final grades and never appear on your A-level certificate. But
        teachers use them to set predicted grades in September or October of Year 13, and predictions decide
        which universities you can apply to. So the job now is simple and urgent: diagnose why the marks
        went missing, repair your weakest topics over the summer, and hand your teachers new evidence in the
        first weeks of term, before the predictions get written down.
      </QuickAnswer>

      <Lead>
        Let me guess how it went. You worked. Maybe not perfectly, but you worked, and the grades came back
        B, C, or worse, and now there&apos;s a quiet panic about what this means for university and whether
        you&apos;re just not an A student. I&apos;m a doctor. When a test result comes back bad, we don&apos;t
        diagnose the patient as &quot;bad at health&quot;. We find the cause. Year 12 results are a test result,
        and I&apos;ve seen enough of them, across more than 1,000 students, to tell you the cause is almost
        never intelligence.
      </Lead>

      <KeyTakeaways
        points={[
          'Year 12 results decide your predicted grades, not your final grades. The certificate only ever shows what you do at the end of Year 13.',
          'Predictions are typically set within weeks of returning in September, so the repair window is now, over the summer.',
          'Diagnose before you revise: a knowledge gap, a recall failure, an application gap and a technique gap all look identical on a results sheet and all have different fixes.',
          'Universities never see Year 12 marks directly. They see the predictions built from them.',
          'A bad mock is data, not destiny. Same method next year means same grades next year; that is the only real risk.',
        ]}
      />

      <H2 id="what-they-decide">What bad Year 12 results actually decide (and what they don&apos;t)</H2>
      <P>
        Start with the facts, because panic hates facts. Year 12 internal exams and mocks do not go on your
        A-level certificate. They are not sent to universities. They do not limit what you can score next
        summer. Every mark of your final grade is still available to you.
      </P>
      <P>
        What they do decide is your <Strong>predicted grades</Strong>. When teachers sit down in September
        or October of Year 13 to write the numbers that go on your UCAS application, the biggest single
        input is how you finished Year 12. They also shape softer things: which set you&apos;re in, how your
        reference reads, and occasionally a harder conversation with your sixth form about whether you carry
        on with a subject. All of that is built from the same evidence, which means all of it moves when the
        evidence moves.
      </P>

      <H2 id="how-important">How important are Year 12 mocks, honestly?</H2>
      <P>
        Important enough to act on, not important enough to grieve over. Two things make them matter. First,
        the predictions, as above. Second, and almost nobody uses this properly: a mock is the most honest
        diagnostic you&apos;ll get all year. It shows you exactly which topics collapse under pressure and
        which skills leak marks when the clock is running. Schools charge nothing for this information and
        most students never read it. Don&apos;t waste a bad mock by only feeling bad about it.
      </P>

      <H2 id="diagnosis">The diagnosis: four reasons grades collapse</H2>
      <P>
        &quot;I&apos;ll work harder&quot; is not a plan, because working harder at the wrong thing produces the same
        grade with more exhaustion. In my experience there are four distinct failures, and they look
        identical on a results sheet:
      </P>
      <UL>
        <LI>
          <Strong>A knowledge gap.</Strong>{' '}Some topics genuinely never went in, usually from a patch of
          term where you fell behind and never circled back. The tell: you couldn&apos;t have answered those
          questions even with the textbook open.
        </LI>
        <LI>
          <Strong>A recall failure.</Strong>{' '}You knew it the night before. In the exam it was gone. That&apos;s
          not a memory problem, it&apos;s a method problem: recognising your notes is not the same as
          retrieving them from a blank page, and exams only pay for retrieval.
        </LI>
        <LI>
          <Strong>An application gap.</Strong>{' '}You could recite the content but the question was dressed in
          an unfamiliar context and the marks slipped away. Common in maths and the sciences, where knowing
          and using are different tiers.
        </LI>
        <LI>
          <Strong>A technique gap.</Strong>{' '}Ran out of time, missed command words, wrote everything you knew
          instead of what the mark scheme pays for. The knowledge was fine. The performance wasn&apos;t.
        </LI>
      </UL>
      <P>
        Go through your marked papers and label every lost mark with one of those four. It takes an
        afternoon and it&apos;s the highest-yield afternoon of your summer, because each failure has a
        different fix, and the fix for the wrong one costs you six weeks.
      </P>

      <DiagnosticCTA />

      <H2 id="the-repair">The six-week repair</H2>
      <P>
        Once you know your failure pattern, the summer plan is short and boring, which is why it works.
        Rest properly first. Then around 1.5 to 2 focused hours a day: close your three weakest topics per
        subject using <A href="/blog/blurting-method-a-level-revision/">blurting</A>{' '}and past-paper
        questions rather than re-reading, and lightly preview the first Year 13 topics. I&apos;ve laid out the
        full structure in <A href="/blog/how-to-prepare-for-year-13/">how to prepare for Year 13</A>{' '}and{' '}
        <A href="/blog/year-12-summer-revision/">the Year 12 summer guide</A>, so I won&apos;t repeat it here.
      </P>
      <Callout title="If you sat real AS exams">
        Most Year 12 exams in England are internal, but if you sat actual AS-levels, those grades are
        standalone qualifications and they stay on your record. They still don&apos;t decide your final
        A-level grade: A-levels are assessed at the end of Year 13. The repair plan is identical.
      </Callout>

      <H2 id="september">September: changing your teacher&apos;s mind</H2>
      <P>
        Teachers predict from evidence, so give them new evidence, early and deliberately. The first
        homework of term done properly. Answers volunteered on the topics you repaired in August. A mock or
        class test in September that looks nothing like June. Predictions are usually written within weeks
        of term starting, which makes the first fortnight of Year 13 the highest-yield fortnight of your
        school career. The exact playbook, including what to say to a teacher who has already decided, is
        in <A href="/blog/how-to-improve-predicted-grades/">the predicted grades guide</A>.
      </P>

      <H2 id="bigger-conversation">When bad results mean a bigger conversation</H2>
      <P>
        Sometimes the honest answer is structural. If you&apos;re carrying four subjects and one is drowning
        the rest, dropping to three focused subjects is usually a strength, not a retreat. If the whole year
        went wrong for reasons beyond method, illness, circumstances, the wrong subject choices, then
        repeating Year 12 or moving college is a real option, and it&apos;s a conversation to have with your
        school early in September, not after predictions are set. And if the diagnosis says your system is
        the problem and you know you won&apos;t rebuild it alone, that&apos;s the one situation where structured
        help this summer earns its keep.
      </P>

      <CourseCTA
        href="/summer-accelerators"
        heading="Six weeks to repair Year 12, live"
        body="The Summer Accelerator takes Year 12 students going into Year 13 through exactly this repair: diagnose the leaks, rebuild the weak topics in Biology, Chemistry, Maths or Physics, and walk into September with evidence. Small live groups, led by Dr Waleed Ahmad, MBBS. First session risk-free."
        label="See the Summer Accelerator"
      />
    </ArticleLayout>
  )
}
