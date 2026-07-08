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
    a: 'Around 1.5 to 2 focused hours a day, five days a week, is the sweet spot — enough to consolidate Year 12 and preview key Year 13 topics without burning out before the most important year of school. That is roughly 60–80 hours across the holiday, which is transformative if spent on the right material.',
  },
  {
    q: 'Should I start Year 13 content over the summer or just revise Year 12?',
    a: 'Both, weighted about 40/60. Fix your weakest Year 12 topics first — Year 13 content builds directly on them and A-level exams test both years. Then preview the first term of Year 13 topics, because walking into lessons having already met the material is the single biggest confidence advantage you can give yourself.',
  },
  {
    q: 'Is it too late to improve my grades if Year 12 went badly?',
    a: 'No — Year 12 results do not appear on your certificate; final exams cover everything and are sat at the end of Year 13. But predicted grades are usually set within weeks of returning in September, so if Year 12 went badly, the summer is precisely when the turnaround has to happen.',
  },
  {
    q: 'Should I take a complete break after Year 12 exams?',
    a: 'Yes — take two full guilt-free weeks off. Rest is part of the plan, not a betrayal of it. The mistake is not the break; it is letting two weeks silently become seven and arriving in September having forgotten a term of content.',
  },
  {
    q: 'What about my personal statement and UCAS preparation?',
    a: 'The summer is the right time for those too — draft your personal statement, research courses, and book any admissions tests. But treat them as a separate, second workstream. Students who spend the whole summer polishing a personal statement while their subject knowledge decays have optimised the wrong thing: grades open doors, statements decorate them.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Yes — but not the way most students imagine. The evidence-backed approach is: two weeks of complete
        rest, then around 1.5–2 focused hours a day spent 40% fixing weak Year 12 topics and 60% previewing
        early Year 13 content. Predicted grades are usually set within weeks of returning in September, so this
        is the last summer where a modest amount of work changes your university options.
      </QuickAnswer>

      <Lead>
        There are two lies students tell themselves in July. The first: &quot;I&apos;ll rest for a bit, then do loads of
        work in August.&quot; The second: &quot;Summer work doesn&apos;t matter — I&apos;ll catch up in Year 13.&quot; I believed the
        second one myself, briefly, until an older student pointed out something that changed how I approached the
        whole year: <Strong>your predicted grades are decided before Year 13 has really begun.</Strong>
      </Lead>

      <KeyTakeaways
        points={[
          'Predicted grades — the numbers that decide which universities you can apply to — are typically set in September–October, based mostly on your end-of-Year-12 performance.',
          'The Year 12 summer is therefore the last input into those numbers, not a neutral gap between school years.',
          'You need roughly 60–80 focused hours across the holiday: about 1.5–2 hours a day, five days a week — with two full weeks off first.',
          'Split the time: ~40% repairing weak Year 12 topics, ~60% previewing first-term Year 13 content.',
          'Forgetting is the enemy: without any retrieval practice, a large share of Year 12 content fades over six weeks — and Year 13 builds directly on it.',
        ]}
      />

      <H2 id="why-this-summer-matters">Why this particular summer matters more than any other</H2>
      <P>
        Most school holidays are genuinely neutral: rest, come back, carry on. The summer between Year 12 and
        Year 13 is different for three compounding reasons.
      </P>
      <OL>
        <LI>
          <Strong>Predicted grades are set almost immediately after it.</Strong> Your teachers will write down the
          grades that go on your UCAS form in September or October, based overwhelmingly on how you finished Year 12
          and how you start Year 13. The summer is your only chance to change the evidence they&apos;ll be looking at.
          (Full guide: <A href="/blog/how-to-improve-predicted-grades/">how to improve your predicted grades</A>.)
        </LI>
        <LI>
          <Strong>A-level content is cumulative.</Strong> Year 13 maths assumes Year 12 maths. A2 organic chemistry
          assumes AS organic chemistry. Any Year 12 gap you carry into September doesn&apos;t stay the same size — it
          compounds, because every new topic built on it wobbles too.
        </LI>
        <LI>
          <Strong>Memory decays fast without retrieval.</Strong> Six weeks of zero contact with your subjects means a
          significant chunk of Year 12 quietly evaporates. Students feel this in September as the &quot;I know I learned
          this&quot; sensation — recognising material without being able to use it. Rebuilding it costs weeks of Year 13
          that you don&apos;t have.
        </LI>
      </OL>

      <Callout title="The September split">
        Every September, the same scene plays out in Year 13 classrooms. The teacher references a Year 12 concept in
        the first week of new content. A third of the room nods and moves on; two-thirds reach for their phones to
        look it up. Those two groups usually receive different predicted grades six weeks later — not because of
        ability, but because of what they did in August.
      </Callout>

      <H2 id="rest-first">Step 1: Take a real break (two weeks, non-negotiable)</H2>
      <P>
        This isn&apos;t token advice. Year 12 exams are draining, and students who grind straight through the summer
        reliably crack in the winter of Year 13 — which is the worst possible time. Take two full weeks with no
        academic work and no guilt. See friends, sleep, get a job, go on holiday.
      </P>
      <P>
        The discipline isn&apos;t in the break. It&apos;s in the <Strong>edge</Strong> of the break: pick the date your working
        summer starts, put it in your phone, and honour it the way you&apos;d honour an exam date.
      </P>

      <H2 id="the-plan">Step 2: The 60–80 hour summer plan</H2>
      <P>
        Here&apos;s the structure I recommend to our students — about 1.5–2 hours a day, five days a week, for the
        remaining four to five weeks. Mornings work best; the day then belongs to you.
      </P>
      <H3>Part A — Repair Year 12 (roughly 40% of your time)</H3>
      <UL>
        <LI>
          <Strong>Audit before you revise.</Strong> Go through each subject specification and rate every topic:
          confident / shaky / no idea. Your exam papers and mock feedback tell you where the marks actually leaked.
        </LI>
        <LI>
          <Strong>Attack the &quot;shaky&quot; and &quot;no idea&quot; topics only.</Strong> Re-covering what you already know feels
          productive and achieves nothing. Three genuinely repaired weak topics per subject is a spectacular summer.
        </LI>
        <LI>
          <Strong>Use retrieval, not re-reading.</Strong> The <A href="/blog/blurting-method-a-level-revision/">blurting
          method</A> and past-paper questions, not highlighters. You&apos;re trying to produce marks on paper in September,
          and only practising retrieval does that.
        </LI>
      </UL>
      <H3>Part B — Preview Year 13 (roughly 60% of your time)</H3>
      <UL>
        <LI>
          <Strong>Find out what&apos;s taught first.</Strong> Ask your teachers before term ends, or check the
          specification order. You only need the first term&apos;s topics, not the whole year.
        </LI>
        <LI>
          <Strong>Aim for familiarity, not mastery.</Strong> Watch a video on each topic, read the textbook chapter,
          make skeleton notes, attempt a few basic questions. When the teacher then covers it properly, the lesson
          becomes your <em>second</em> exposure — which is when things actually stick.
        </LI>
        <LI>
          <Strong>Prioritise the high-yield topics.</Strong> Every subject has topics that carry disproportionate
          exam weight and feed into everything else — in maths it&apos;s calculus and algebra fluency; in chemistry,
          organic mechanisms; in biology, the molecules-and-cells foundations. Preview those first.
        </LI>
      </UL>

      <TrackerCTA />

      <H2 id="what-to-skip">What <em>not</em> to do this summer</H2>
      <UL>
        <LI>
          <Strong>Don&apos;t try to &quot;do Year 13&quot; solo.</Strong> Teaching yourself the entire A2 course from scratch leads
          to burnout and half-learned everything. Preview the first term; leave the rest.
        </LI>
        <LI>
          <Strong>Don&apos;t make beautiful notes for topics you already know.</Strong> Note-making is the most seductive
          form of procrastination in existence.
        </LI>
        <LI>
          <Strong>Don&apos;t revise eight hours a day.</Strong> It isn&apos;t sustainable, it isn&apos;t necessary, and the quality
          collapses after hour four anyway. (More on this: <A href="/blog/how-many-hours-revision-a-level/">how many
          hours a day you should actually revise</A>.)
        </LI>
        <LI>
          <Strong>Don&apos;t leave your personal statement until September.</Strong> Draft it in the summer as a separate,
          smaller workstream — September is already crowded with predicted-grade evidence-building.
        </LI>
      </UL>

      <H2 id="structured-option">If you want structure instead of willpower</H2>
      <P>
        Everything above is doable alone. The honest failure mode isn&apos;t the plan — it&apos;s that self-directed summer
        work requires you to be your own teacher, examiner and accountability system for six weeks, and most
        seventeen-year-olds (and most adults) struggle with that. That&apos;s the exact problem our
        <Strong> Summer Accelerator</Strong> was built to solve: live small-group teaching through the summer that
        covers the high-yield Year 13 topics in Biology, Chemistry, Maths and Physics, so you walk into September
        already ahead — right when predicted grades are being decided.
      </P>

      <CourseCTA
        heading="Start September ahead of your class"
        body="The Summer Accelerator is a six-week live online programme covering the high-yield topics that decide Year 13 predicted grades — taught in small groups by subject specialists and led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. Two sessions a week per subject, recordings included, first session risk-free."
        label="Explore the Summer Accelerator"
      />
    </ArticleLayout>
  )
}
