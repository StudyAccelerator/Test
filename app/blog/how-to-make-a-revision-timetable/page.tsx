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

const post = getPost('how-to-make-a-revision-timetable')!

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
    q: 'Why do most revision timetables fail?',
    a: 'Three reasons: they are built around subjects instead of topics, so weak areas hide inside vague blocks like “Chemistry, 2 hours”; they schedule each topic once instead of at spaced intervals, so content decays; and they assume a perfect week, so the first missed session collapses the whole plan. A working timetable is topic-level, spaced, and built with slack.',
  },
  {
    q: 'How far in advance should I make my revision timetable?',
    a: 'Plan one week at a time inside a rough long-term map. You need the long view to know how many topics must be covered before exams, but weekly planning lets the timetable respond to what you actually got done and which topics came back weak in testing.',
  },
  {
    q: 'Should every subject get equal time in my timetable?',
    a: 'No — weight time toward your weakest subjects and, within each subject, your weakest topics. Marks come from fixing what you cannot do, not from polishing what you can. A good rule is roughly 60% of time on weak topics, 25% on medium ones, and 15% keeping strengths warm.',
  },
  {
    q: 'How do I stick to a revision timetable?',
    a: 'Make it survivable rather than impressive: schedule at most 70–80% of your available time so overruns and bad days have somewhere to go, put your hardest subject in your best hours, include full rest slots, and review the plan every Sunday. A timetable you follow at 80% beats a perfect one you abandon by Wednesday.',
  },
  {
    q: 'What is the best free revision timetable maker for A-levels?',
    a: 'Our free Revision Tracker at alevelaccelerators.com/revision-tracker builds a personalised weekly A-level timetable around your subjects, topic-by-topic confidence ratings and fixed commitments — with spaced repetition and active recall sessions placed automatically. Unlike generic timetable apps, it schedules topics, not just subjects.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        A revision timetable that works is built in this order: list every topic per subject and rate your
        confidence on each; weight time toward weak topics; schedule each topic multiple times at spaced
        intervals (learn it, recall it next day, review it day 3–4, test it at a week); fill at most 80% of
        your available hours; and review the plan weekly. Or use a tool that does this automatically — our free
        Revision Tracker builds the whole thing in about three minutes.
      </QuickAnswer>

      <Lead>
        Every January and every April, the same ritual: students spend an entire evening colour-coding a
        beautiful revision timetable, follow it for four days, miss one session, and abandon the whole thing by
        the weekend. The problem is almost never discipline. It&apos;s that most timetables are designed to look
        reassuring rather than to work with how memory actually behaves. Here&apos;s how to build one that survives
        contact with real life — by hand, or with the free tool we built that does it for you.
      </Lead>

      <KeyTakeaways
        points={[
          'Plan topics, not subjects — “Chemistry: electrode potentials” gets revised; “Chemistry, 2 hours” gets wasted.',
          'Schedule each topic several times at spaced intervals (day 1 learn → day 2 recall → day 3–4 review → day 7 test), not once.',
          'Weight time toward weak topics: roughly 60% weak, 25% medium, 15% maintaining strengths.',
          'Fill only 70–80% of your available time — slack is what keeps one bad day from collapsing the week.',
          'Review and rebuild every Sunday based on what your testing revealed, not what the old plan assumed.',
        ]}
      />

      <H2 id="why-timetables-fail">Why your last timetable failed</H2>
      <P>
        Post-mortems on abandoned revision timetables almost always find the same three design flaws:
      </P>
      <OL>
        <LI>
          <Strong>Subject-level blocks.</Strong> &quot;Biology, 4–6pm&quot; lets you spend two hours on the photosynthesis
          notes you already like, while genetic drift — the topic that actually costs you marks — never comes up.
          The unit of revision has to be the topic.
        </LI>
        <LI>
          <Strong>One-and-done scheduling.</Strong> Most timetables march through the specification once, front to
          back. But memory decays on a curve — what you revise this Monday is substantially gone in a fortnight
          unless it comes back. A plan that never revisits is a plan for forgetting things in a tidy order.
        </LI>
        <LI>
          <Strong>Zero slack.</Strong> The classic timetable fills every waking hour, assumes no bad days, no
          overruns, no life. The first missed block creates a backlog, the backlog creates guilt, and the guilt
          kills the plan. Fragile schedules don&apos;t fail occasionally — they fail always.
        </LI>
      </OL>

      <H2 id="the-method">Building one that works: the five steps</H2>
      <H3>Step 1: Audit at topic level (about an hour, once)</H3>
      <P>
        Print or list the specification for each subject and rate every topic: <Strong>confident / shaky / no
        idea</Strong>. Use mock results and marked homework to keep yourself honest — feelings lie, marks don&apos;t.
        This list, not the calendar, is the real revision plan; the timetable is just the delivery mechanism.
      </P>
      <H3>Step 2: Count your real hours</H3>
      <P>
        Map your actual week — school, travel, clubs, work, meals, and non-negotiable rest. What&apos;s left is your
        theoretical capacity. Take roughly 80% of it. (For how much total time each stage of A-levels needs,
        see <A href="/blog/how-many-hours-revision-a-level/">how many hours a day you should revise</A>.)
      </P>
      <H3>Step 3: Weight by weakness</H3>
      <P>
        Distribute your hours roughly 60/25/15 across weak/medium/strong topics. This feels wrong — everyone
        gravitates to the topics they enjoy, which are the topics they already know. But grade improvements live
        almost entirely in the &quot;shaky&quot; column: those are marks you&apos;re currently losing that you&apos;re capable of
        winning.
      </P>
      <H3>Step 4: Schedule each topic on a spaced cycle</H3>
      <P>
        This is the step that separates a working timetable from wallpaper. Each weak topic should appear in your
        week several times, in different modes:
      </P>
      <UL>
        <LI><Strong>Day 1 — Deep work:</Strong> learn or relearn the topic properly (notes, videos, worked examples).</LI>
        <LI><Strong>Day 2 — Active recall:</Strong> <A href="/blog/blurting-method-a-level-revision/">blurt it</A> or
        do questions from memory; mark the gaps.</LI>
        <LI><Strong>Day 3–4 — Light review:</Strong> a short pass over the gaps, 15–20 minutes.</LI>
        <LI><Strong>Day 7 — Test:</Strong> past-paper questions on the topic, timed where possible.</LI>
      </UL>
      <P>
        Interleave subjects across the day rather than binging one subject — avoid three same-subject blocks in a
        row. It feels less tidy and works considerably better; mixing forces your brain to keep re-selecting the
        right method, which is exactly what exams demand.
      </P>
      <H3>Step 5: The Sunday rebuild (20 minutes)</H3>
      <P>
        Each week, look at what testing revealed: topics that came back clean get demoted to maintenance; topics
        that fell apart get promoted to deep work. Then rebuild next week&apos;s grid. A timetable is a living
        document — the version that matters is always next week&apos;s.
      </P>

      <Callout title="Or let the tool do steps 2–5 for you">
        We built a free <Strong>Revision Tracker</Strong> that takes your subjects, your topic-by-topic confidence
        ratings and your fixed commitments, and generates this exact structure automatically — deep work, next-day
        recall, spaced reviews, interleaved subjects, capped daily hours. It takes about three minutes and doesn&apos;t
        need an email address. <A href="/revision-tracker">Build your free timetable here</A>.
      </Callout>

      <H2 id="example">What a working week actually looks like</H2>
      <P>
        For a Year 13 student with Biology, Chemistry and Maths, revising around school in the spring term, a
        realistic week looks like: one deep-work block on a weak topic most weekdays (45–60 minutes), a
        next-day recall slot for whatever yesterday&apos;s deep work covered (20–30 minutes), light reviews stacked
        onto two evenings, and one longer weekend session dominated by past-paper questions. Total: 8–10 hours,
        every subject touched multiple times, no heroics — and crucially, two evenings completely free, so the
        plan bends instead of breaking.
      </P>

      <TrackerCTA />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        A revision timetable has one job: to make sure the right topic, in the right mode, comes back at the
        right moment — without you having to renegotiate it with yourself every evening. Build it at topic level,
        space the repetitions, bias it toward what you can&apos;t yet do, and leave room for being human. Do that and
        the timetable stops being a January decoration and starts being the quiet machine behind your grades.
      </P>

      <CourseCTA />
    </ArticleLayout>
  )
}
