import type { Metadata } from 'next'
import {
  ArticleLayout,
  Lead,
  P,
  H2,
  H3,
  UL,
  OL,
  LI,
  Strong,
  A,
  QuickAnswer,
  KeyTakeaways,
  Callout,
  TrackerCTA,
  CourseCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('year-12-summer-revision')!

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
    q: 'How much should I study over the Year 12 summer holidays?',
    a: 'Around 1.5 to 2 focused hours a day, five days a week, is the sweet spot. Enough to consolidate Year 12 and preview key Year 13 topics without burning out before the most important year of school. That works out to roughly 60 to 80 hours across the holiday, which makes a huge difference if you spend it on the right material.',
  },
  {
    q: 'Should I start Year 13 content over the summer or just revise Year 12?',
    a: 'Both, weighted about 40/60. Fix your weakest Year 12 topics first, because Year 13 content builds directly on them and your final exams test both years. Then preview the first term of Year 13 topics. Walking into lessons having already met the material is the biggest confidence advantage you can give yourself.',
  },
  {
    q: 'Is it too late to improve my grades if Year 12 went badly?',
    a: "No. Year 12 results don't appear on your certificate. Your final exams cover everything and you sit them at the end of Year 13. But predicted grades are usually set within weeks of returning in September, so if Year 12 went badly, the summer is exactly when the turnaround has to happen.",
  },
  {
    q: 'Should I take a complete break after Year 12 exams?',
    a: "Yes. Take two full weeks off with zero guilt. Rest is part of the plan, not a betrayal of it. The mistake isn't the break. The mistake is letting two weeks quietly become seven and arriving in September having forgotten a term of content.",
  },
  {
    q: 'What about my personal statement and UCAS preparation?',
    a: 'The summer is the right time for those too. Draft your personal statement, research courses, book any admissions tests. But treat them as a separate, smaller job. Students who spend the whole summer polishing a personal statement while their subject knowledge fades have got it backwards. Grades open doors. Statements decorate them.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Yes, but not the way most students imagine. Take two weeks of complete rest first. Then do around 1.5
        to 2 focused hours a day, spending about 40% fixing weak Year 12 topics and 60% previewing early Year
        13 content. Predicted grades are usually set within weeks of returning in September, so this is the
        last summer where a modest amount of work changes your university options.
      </QuickAnswer>

      <Lead>
        There are two lies students tell themselves in July. The first: &quot;I&apos;ll rest for a bit, then do loads of
        work in August.&quot; The second: &quot;Summer work doesn&apos;t matter, I&apos;ll catch up in Year 13.&quot; I believed the
        second one myself, briefly, until an older student pointed something out that changed how I approached
        the whole year. Your predicted grades get decided before Year 13 has really begun.
      </Lead>

      <KeyTakeaways
        points={[
          "Predicted grades, the numbers that decide which universities you can apply to, are typically set in September or October. They're based mostly on how you finished Year 12.",
          "So the Year 12 summer is the last input into those numbers. It's not a neutral gap between school years.",
          'You need roughly 60 to 80 focused hours across the holiday. About 1.5 to 2 hours a day, five days a week, after two full weeks off.',
          'Split the time: around 40% repairing weak Year 12 topics, 60% previewing first-term Year 13 content.',
          'Forgetting is the enemy. Six weeks of zero contact with your subjects and a big chunk of Year 12 quietly disappears. Year 13 builds directly on it.',
        ]}
      />

      <H2 id="why-this-summer-matters">Why this particular summer matters more than any other</H2>
      <P>
        Most school holidays are genuinely neutral. Rest, come back, carry on. The summer between Year 12 and
        Year 13 is different, for three reasons that stack on top of each other.
      </P>
      <OL>
        <LI>
          Predicted grades get set almost immediately after it. Your teachers will write down the grades that
          go on your UCAS form in September or October, based overwhelmingly on how you finished Year 12 and
          how you start Year 13. The summer is your only chance to change the evidence they&apos;ll be looking at.
          I&apos;ve written a full guide on <A href="/blog/how-to-improve-predicted-grades/">how to improve your
          predicted grades</A>.
        </LI>
        <LI>
          A-level content is cumulative. Year 13 maths assumes Year 12 maths. A2 organic chemistry assumes AS
          organic chemistry. Any gap you carry into September doesn&apos;t stay the same size. It grows, because
          every new topic built on it wobbles too.
        </LI>
        <LI>
          Memory fades fast when you don&apos;t use it. Six weeks of zero contact with your subjects means a big
          chunk of Year 12 quietly evaporates. You&apos;ll feel it in September as that horrible &quot;I know I learned
          this&quot; sensation, where you recognise the material but can&apos;t actually use it. Rebuilding it costs
          weeks of Year 13 that you don&apos;t have.
        </LI>
      </OL>

      <Callout title="The September split">
        Every September, the same scene plays out in Year 13 classrooms. The teacher references a Year 12
        concept in the first week of new content. A third of the room nods and moves on. Two thirds reach for
        their phones to look it up. Those two groups usually end up with different predicted grades six weeks
        later. And it&apos;s got nothing to do with ability. It comes down to what they did in August.
      </Callout>

      <H2 id="rest-first">Step 1: Take a real break. Two weeks, non-negotiable</H2>
      <P>
        This isn&apos;t token advice. Year 12 exams are draining, and students who grind straight through the
        summer reliably crack in the winter of Year 13, which is the worst possible time. Take two full weeks
        with no academic work and no guilt. See your friends, sleep, get a job, go on holiday.
      </P>
      <P>
        The discipline isn&apos;t in the break. It&apos;s in the edge of the break. Pick the date your working summer
        starts, put it in your phone, and honour it the way you&apos;d honour an exam date.
      </P>

      <H2 id="the-plan">Step 2: The 60 to 80 hour summer plan</H2>
      <P>
        Here&apos;s the structure I recommend to our students. About 1.5 to 2 hours a day, five days a week, for
        the remaining four to five weeks. Mornings work best. Get it done early and the rest of the day is
        yours, guilt-free.
      </P>
      <H3>Part A: Repair Year 12 (roughly 40% of your time)</H3>
      <UL>
        <LI>
          Audit before you revise. Go through each subject specification and rate every topic: confident,
          shaky, or no idea. Your exam papers and mock feedback tell you where the marks actually leaked.
        </LI>
        <LI>
          Then attack only the shaky and no-idea topics. Going over what you already know feels productive and
          achieves nothing. Three genuinely repaired weak topics per subject is a brilliant summer.
        </LI>
        <LI>
          Use testing, not re-reading. The <A href="/blog/blurting-method-a-level-revision/">blurting
          method</A> and past paper questions, not highlighters. You&apos;re trying to produce marks on paper in
          September, and only practising recall does that.
        </LI>
      </UL>
      <H3>Part B: Preview Year 13 (roughly 60% of your time)</H3>
      <UL>
        <LI>
          Find out what&apos;s taught first. Ask your teachers before term ends, or check the specification order.
          You only need the first term&apos;s topics, not the whole year.
        </LI>
        <LI>
          Aim for familiarity, not mastery. Watch a video on each topic, read the textbook chapter, make
          skeleton notes, try a few basic questions. When your teacher covers it properly in September, the
          lesson becomes your second exposure. And the second exposure is when things actually stick.
        </LI>
        <LI>
          Prioritise the high-yield topics. Every subject has topics that carry disproportionate exam weight
          and feed into everything else. In maths it&apos;s calculus and algebra fluency. In chemistry, organic
          mechanisms. In biology, the molecules and cells foundations. Preview those first.
        </LI>
      </UL>

      <TrackerCTA />

      <H2 id="what-to-skip">What <em>not</em> to do this summer</H2>
      <UL>
        <LI>
          Don&apos;t try to teach yourself the whole of Year 13. That road leads to burnout and half-learned
          everything. Preview the first term and leave the rest.
        </LI>
        <LI>
          Don&apos;t make beautiful notes for topics you already know. I&apos;m really guilty of this one, and I can
          tell you from experience it&apos;s the most seductive form of procrastination there is.
        </LI>
        <LI>
          Don&apos;t revise eight hours a day. You can&apos;t sustain it, you don&apos;t need it, and the quality collapses
          after hour four anyway. I&apos;ve covered this properly in <A href="/blog/how-many-hours-revision-a-level/">how
          many hours a day you should actually revise</A>.
        </LI>
        <LI>
          Don&apos;t leave your personal statement until September. Draft it in the summer as a separate, smaller
          job. September is already crowded with evidence-building for your predictions.
        </LI>
      </UL>

      <H2 id="structured-option">If you want structure instead of willpower</H2>
      <P>
        Everything above is doable on your own. The honest failure mode isn&apos;t the plan. It&apos;s that
        self-directed summer work asks you to be your own teacher, examiner and accountability system for six
        weeks, and most seventeen-year-olds (and most adults, if we&apos;re honest) struggle with that. That&apos;s the
        exact problem our Summer Accelerator was built to solve. Live small-group teaching through the summer,
        covering the high-yield Year 13 topics in Biology, Chemistry, Maths and Physics, so you walk into
        September already ahead. Right when predicted grades are being decided.
      </P>

      <CourseCTA
        href="/summer-accelerators"
        heading="Start September ahead of your class"
        body="The Summer Accelerator is a six-week live online programme covering the high-yield topics that decide Year 13 predicted grades. Small groups, taught by subject specialists and led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. Two sessions a week per subject, recordings included, first session risk-free."
        label="Explore the Summer Accelerator"
      />
    </ArticleLayout>
  )
}
