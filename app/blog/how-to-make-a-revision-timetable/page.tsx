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
    a: 'Three reasons. They plan by subject instead of by topic, so your weak areas hide inside vague blocks like "Chemistry, 2 hours". They schedule each topic once instead of at spaced intervals, so the content fades. And they assume a perfect week, so the first missed session collapses the whole plan. A working timetable is topic-level, spaced, and built with slack.',
  },
  {
    q: 'How far in advance should I make my revision timetable?',
    a: 'Plan one week at a time inside a rough long-term map. You need the long view to know how many topics have to be covered before your exams, but planning weekly lets the timetable respond to what you actually got done and which topics came back weak when you tested them.',
  },
  {
    q: 'Should every subject get equal time in my timetable?',
    a: "No. Weight your time toward your weakest subjects, and within each subject, your weakest topics. Marks come from fixing what you can't do, not from polishing what you can. A good rule of thumb is roughly 60% of your time on weak topics, 25% on medium ones, and 15% keeping your strengths warm.",
  },
  {
    q: 'How do I stick to a revision timetable?',
    a: 'Make it survivable rather than impressive. Schedule at most 70 to 80% of your available time so overruns and bad days have somewhere to go. Put your hardest subject in your best hours. Include proper rest. And review the plan every Sunday. A timetable you follow at 80% beats a perfect one you abandon by Wednesday.',
  },
  {
    q: 'What is the best free revision timetable maker for A-levels?',
    a: 'Our free Revision Tracker at alevelaccelerators.com/revision-tracker builds a personalised weekly A-level timetable around your subjects, your topic-by-topic confidence ratings and your fixed commitments, with spaced repetition and active recall sessions placed automatically. Unlike generic timetable apps, it schedules topics, not just subjects.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        A revision timetable that works gets built in this order. List every topic per subject and rate your
        confidence on each. Weight your time toward the weak topics. Schedule each topic several times at
        spaced intervals: learn it, recall it the next day, review it on day 3 or 4, test it at a week. Fill
        at most 80% of your available hours. Review the plan every Sunday. Or use a tool that does all of this
        automatically. Our free Revision Tracker builds the whole thing in about three minutes.
      </QuickAnswer>

      <Lead>
        Every January and every April, the same ritual. Students spend an entire evening colour-coding a
        beautiful revision timetable, follow it for four days, miss one session, and abandon the whole thing by
        the weekend. I want to be upfront: I&apos;m really guilty of this one. When I was at your stage I spent
        hours building the perfect timetable, then realised those hours could have gone on actually learning.
        The problem is almost never discipline. Most timetables are designed to look reassuring, not to work
        with how memory actually behaves. Here&apos;s how to build one that survives contact with real life.
      </Lead>

      <KeyTakeaways
        points={[
          'Plan topics, not subjects. "Chemistry: electrode potentials" gets revised. "Chemistry, 2 hours" gets wasted.',
          'Schedule each topic several times at spaced intervals (day 1 learn, day 2 recall, day 3 or 4 review, day 7 test), not once.',
          'Weight your time toward weak topics: roughly 60% weak, 25% medium, 15% maintaining strengths.',
          'Fill only 70 to 80% of your available time. Slack is what stops one bad day collapsing the week.',
          'Rebuild the plan every Sunday based on what your testing revealed, not what the old plan assumed.',
        ]}
      />

      <H2 id="why-timetables-fail">Why your last timetable failed</H2>
      <P>
        Do a post-mortem on any abandoned revision timetable and you&apos;ll usually find the same three design
        flaws:
      </P>
      <OL>
        <LI>
          Subject-level blocks. &quot;Biology, 4 to 6pm&quot; lets you spend two hours on the photosynthesis notes you
          already like, while genetic drift, the topic actually costing you marks, never comes up. The unit of
          revision has to be the topic.
        </LI>
        <LI>
          One-and-done scheduling. Most timetables march through the specification once, front to back. But
          memory decays on a curve. What you revise this Monday is mostly gone in a fortnight unless it comes
          back. A plan that never revisits anything is a plan for forgetting things in a tidy order.
        </LI>
        <LI>
          Zero slack. The classic timetable fills every waking hour and assumes no bad days, no overruns, no
          life. The first missed block creates a backlog, the backlog creates guilt, and the guilt kills the
          plan. Fragile schedules don&apos;t fail occasionally. They fail every time.
        </LI>
      </OL>

      <H2 id="the-method">Building one that works: the five steps</H2>
      <H3>Step 1: Audit at topic level (about an hour, once)</H3>
      <P>
        Print the specification for each subject and rate every topic: confident, shaky, or no idea. Use your
        mock results and marked homework to keep yourself honest. Feelings lie, marks don&apos;t. This list, not
        the calendar, is the real revision plan. The timetable is just the delivery mechanism. And notice
        what&apos;s happening here: you&apos;re diagnosing before you treat. I&apos;m a doctor. I can&apos;t give you a
        medication until I know what&apos;s wrong. Same principle.
      </P>
      <H3>Step 2: Count your real hours</H3>
      <P>
        Map your actual week. School, travel, clubs, work, meals, and rest you won&apos;t give up. What&apos;s left is
        your theoretical capacity. Take roughly 80% of it. For how much total time each stage of A-levels
        needs, see <A href="/blog/how-many-hours-revision-a-level/">how many hours a day you should
        revise</A>.
      </P>
      <H3>Step 3: Weight by weakness</H3>
      <P>
        Spread your hours roughly 60/25/15 across weak, medium and strong topics. This feels wrong. Everyone
        gravitates to the topics they enjoy, and the topics you enjoy are the ones you already know. But grade
        improvements live almost entirely in the shaky column. Those are marks you&apos;re currently losing that
        you&apos;re fully capable of winning.
      </P>
      <H3>Step 4: Schedule each topic on a spaced cycle</H3>
      <P>
        This is the step that separates a working timetable from wallpaper. Each weak topic should appear in
        your week several times, in different modes:
      </P>
      <UL>
        <LI>Day 1, deep work: learn or relearn the topic properly. Notes, videos, worked examples.</LI>
        <LI>Day 2, active recall: <A href="/blog/blurting-method-a-level-revision/">blurt it</A> or do
        questions from memory, and mark the gaps.</LI>
        <LI>Day 3 or 4, light review: a short pass over the gaps, 15 to 20 minutes.</LI>
        <LI>Day 7, test: past paper questions on the topic, timed where possible.</LI>
      </UL>
      <P>
        And mix your subjects across the day rather than binging one. Avoid three same-subject blocks in a
        row. It feels less tidy, but it works better, because mixing forces your brain to keep re-selecting
        the right method. Which is exactly what an exam paper does to you.
      </P>
      <H3>Step 5: The Sunday rebuild (20 minutes)</H3>
      <P>
        Each week, look at what your testing revealed. Topics that came back clean get demoted to maintenance.
        Topics that fell apart get promoted to deep work. Then rebuild next week&apos;s grid. A timetable is a
        living document. The version that matters is always next week&apos;s.
      </P>

      <Callout title="Or let the tool do steps 2 to 5 for you">
        We built a free Revision Tracker that takes your subjects, your topic-by-topic confidence ratings and
        your fixed commitments, and generates this exact structure automatically. Deep work, next-day recall,
        spaced reviews, mixed subjects, capped daily hours. It takes about three minutes and doesn&apos;t ask for
        an email address. <A href="/revision-tracker">Build your free timetable here</A>.
      </Callout>

      <H2 id="example">What a working week actually looks like</H2>
      <P>
        Take a Year 13 student with Biology, Chemistry and Maths, revising around school in the spring term. A
        realistic week looks like this. One deep-work block on a weak topic most weekdays, 45 to 60 minutes. A
        next-day recall slot for whatever yesterday&apos;s deep work covered, 20 to 30 minutes. Light reviews
        stacked onto two evenings. One longer weekend session built around past paper questions. Total: 8 to
        10 hours, every subject touched several times, no heroics. And two evenings completely free, so the
        plan bends instead of breaking.
      </P>

      <TrackerCTA />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        A revision timetable has one job. It makes sure the right topic, in the right mode, comes back at the
        right moment, without you having to renegotiate it with yourself every evening. Build it at topic
        level, space the repetitions, bias it toward what you can&apos;t yet do, and leave room for being human. Do
        that and the timetable stops being a January decoration and becomes the quiet machine behind your
        grades.
      </P>

      <CourseCTA />
    </ArticleLayout>
  )
}
