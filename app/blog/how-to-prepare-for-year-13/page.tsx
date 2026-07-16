import type { Metadata } from 'next'
import {
  ArticleLayout,
  Lead,
  P,
  H2,
  UL,
  OL,
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

const post = getPost('how-to-prepare-for-year-13')!

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
    q: 'When should I start preparing for Year 13?',
    a: 'About four to six weeks before term starts, after a proper two-week break. That gives you enough time to close your weakest Year 12 topics, draft your personal statement and set up a routine, without burning out before the year that actually counts. Starting the night before results day in August is late; starting in June was unnecessary.',
  },
  {
    q: 'Is Year 13 really harder than Year 12?',
    a: "The content is a step up, but that's not the real difference. The real difference is density: you're finishing the syllabus, sitting mocks that set your predicted grades, writing a UCAS application and starting revision for the final exams, all in about seven months. Students who struggle in Year 13 usually aren't short of ability. They're short of a system that was never tested properly in Year 12.",
  },
  {
    q: 'Should I learn Year 13 content over the summer?',
    a: "Preview it, don't master it. Skim the first topics of each subject so the vocabulary is familiar, and spend the bigger share of your time fixing weak Year 12 topics. Year 13 content builds directly on Year 12, so a shaky foundation costs you twice.",
  },
  {
    q: 'Do Year 12 results affect my predicted grades?',
    a: 'Heavily. Predicted grades are typically set in September or October of Year 13, and teachers base them mostly on how you finished Year 12: mocks, end-of-year exams and classwork. If Year 12 went badly, the evidence you show in the first weeks of September is what changes their mind.',
  },
  {
    q: 'What should I have ready for UCAS by September of Year 13?',
    a: 'A shortlist of five courses you could genuinely see yourself on, a rough first draft of your personal statement, and a diary note of the deadlines that apply to you. Medicine, dentistry, veterinary and Oxbridge applications have a mid-October deadline, which arrives about six weeks into term.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Preparing for Year 13 means four things: fix your weakest Year 12 topics before term starts, get
        your revision system tested and working, draft your UCAS basics (course shortlist and personal
        statement) over the summer, and plan to bank evidence in September, because that&apos;s when predicted
        grades get set. Around 1.5 to 2 focused hours a day for the last few weeks of the holiday is enough.
      </QuickAnswer>

      <Lead>
        Year 13 has a big secret: the year is half decided before it starts. Predicted grades get set
        within weeks of you walking back through the door. The UCAS deadline for medicine and Oxbridge lands
        about six weeks into term. And every new topic your teachers introduce sits on top of Year 12
        foundations that may or may not hold. I&apos;ve worked with over 1,000 A-level students, and the ones
        who have a calm Year 13 aren&apos;t necessarily the cleverest. They&apos;re the ones who used August
        properly.
      </Lead>

      <KeyTakeaways
        points={[
          'Predicted grades are typically set in September or October, based mostly on your Year 12 evidence. September is an audition, and most students walk in unprepared.',
          'Fix weak Year 12 topics before previewing Year 13 content. The new material assumes the old material.',
          'Draft your personal statement and course shortlist in the summer. September is too crowded to do it well.',
          'Test your revision system now, while the stakes are low. Year 13 is a bad time to discover your method never worked.',
          'Around 1.5 to 2 focused hours a day in the last month of summer is the honest target. More than that burns the fuel you need for the actual year.',
        ]}
      />

      <H2 id="what-changes">What actually changes in Year 13</H2>
      <P>
        Everyone tells you Year 13 is harder. Almost nobody tells you <Strong>how</Strong>, so here it is.
        The content steps up, yes. But the real change is that everything happens at once. You finish the
        syllabus while applying to university. You sit mocks that decide your predicted grades while writing
        a personal statement. You start final revision while your teachers are still teaching new topics.
        Year 12 gave you slack. Year 13 doesn&apos;t.
      </P>
      <P>
        That&apos;s why preparation matters more for this year than any other. Not because you need to be ahead
        on content, but because you need the machinery working before the workload arrives. A doctor
        doesn&apos;t learn where the equipment is during the emergency.
      </P>

      <H2 id="predicted-grades">Your predicted grades are set embarrassingly early</H2>
      <P>
        Predicted grades are the numbers that decide which universities will even look at you, and they&apos;re
        typically set in September or October of Year 13. Teachers don&apos;t predict from hope. They predict
        from evidence, and at that point the evidence is almost entirely how you finished Year 12.
      </P>
      <P>
        Here&apos;s the part most students miss: the first few weeks of September are your window to add new
        evidence. A strong start to term, done deliberately, can move a prediction before it&apos;s written
        down. I&apos;ve explained exactly how that works, and what teachers need to see, in{' '}
        <A href="/blog/how-to-improve-predicted-grades/">how to improve your predicted grades before UCAS</A>.
        The summer plan below is what makes that September performance possible.
      </P>

      <H2 id="the-plan">The pre-September plan, in order</H2>
      <OL>
        <LI>
          <Strong>Take two real weeks off.</Strong>{' '}Zero guilt. Burnout in October costs far more than a
          fortnight of rest in July.
        </LI>
        <LI>
          <Strong>Diagnose Year 12 honestly.</Strong>{' '}Before you revise anything, work out what actually went
          wrong and why. Was it missing knowledge, or knowledge you couldn&apos;t recall under pressure? Weak
          understanding, or weak exam technique? The fix is different for each, and guessing wastes your
          summer. Our free <A href="/revision-diagnostic/">revision diagnostic</A>{' '}does this in about three
          minutes if you want the shortcut.
        </LI>
        <LI>
          <Strong>Close your three weakest topics per subject.</Strong>{' '}Not all of them. The three per
          subject that hurt most, worked on with active recall and past-paper questions rather than
          re-reading. If blurting is new to you, start with{' '}
          <A href="/blog/blurting-method-a-level-revision/">the blurting method</A>.
        </LI>
        <LI>
          <Strong>Preview, lightly, the first Year 13 topics.</Strong>{' '}Skim them so the vocabulary is
          familiar when your teacher introduces them. I&apos;ve set out the full summer structure, including
          the 40/60 split between fixing and previewing, in{' '}
          <A href="/blog/year-12-summer-revision/">the Year 12 summer revision guide</A>.
        </LI>
        <LI>
          <Strong>Draft your UCAS basics.</Strong>{' '}A shortlist of five courses and a rough personal
          statement draft. Rough is fine. Existing is the point, because September you will be busy proving
          things to your teachers.
        </LI>
        <LI>
          <Strong>Build the September timetable before September.</Strong>{' '}Decide your weekly structure now:
          which evenings hold revision, where past papers live, when you rest. Our free{' '}
          <A href="/revision-tracker/">revision tracker</A>{' '}builds the week around your weakest topics
          automatically, and it refuses to let you overload it.
        </LI>
      </OL>

      <Callout title="The honest hours target">
        About 1.5 to 2 focused hours a day, five days a week, for the last month of the holiday. That&apos;s
        roughly 40 to 60 hours of real work, and it&apos;s enough to change how September goes. Eight-hour
        summer days aren&apos;t dedication, they&apos;re a burnout deposit you&apos;ll withdraw in November.
      </Callout>

      <H2 id="what-not-to-do">What not to do in August</H2>
      <UL>
        <LI>
          Don&apos;t try to self-teach the whole of Year 13. You&apos;ll do it slowly, badly, and at the cost of
          the Year 12 repairs that predictions are actually based on.
        </LI>
        <LI>
          Don&apos;t rewrite your Year 12 notes &quot;to get organised&quot;. Beautiful notes are the most convincing
          way to waste a summer. I&apos;ve made this mistake for you already.
        </LI>
        <LI>
          Don&apos;t leave the personal statement until term starts. It&apos;s now three structured questions
          rather than one long essay, and a rough draft in August turns a September crisis into a September
          edit.
        </LI>
        <LI>
          Don&apos;t plan a schedule you can&apos;t keep. A plan that survives four weeks at 2 hours a day beats
          one that dies in four days at 6.
        </LI>
      </UL>

      <DiagnosticCTA />

      <H2 id="september">The first two weeks of September decide more than the last two of August</H2>
      <P>
        Walk in with your weak topics repaired, your statement drafted and your weekly system already
        running, and September stops being a scramble. Do the homework properly in week one. Volunteer
        answers you&apos;ve rehearsed. Hand your teacher reasons to believe the upgraded version of you is
        real, because their belief becomes a number on your UCAS form remarkably quickly.
      </P>
      <P>
        If Year 12 went genuinely badly and you&apos;re not sure the summer is enough on your own, I&apos;ve
        written a separate honest guide to <A href="/blog/bad-year-12-results-what-now/">what bad Year 12
        results actually mean and how to fix them</A>.
      </P>

      <CourseCTA
        href="/summer-accelerators"
        heading="Want the summer plan run for you, live?"
        body="The Summer Accelerator is our six-week live programme for Year 12 students going into Year 13: Biology, Chemistry, Maths and Physics, taught in small groups with the exact diagnose-and-repair method this article describes. Led by Dr Waleed Ahmad. First session risk-free."
        label="See the Summer Accelerator"
      />
    </ArticleLayout>
  )
}
