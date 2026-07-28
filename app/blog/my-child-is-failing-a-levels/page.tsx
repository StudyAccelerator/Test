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
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('my-child-is-failing-a-levels')!

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
    q: 'How do I know if my child is actually failing A-levels?',
    a: "Look for a pattern across time rather than one result. Falling marks across two or three tests, teacher emails about missed work or lost focus, and avoidance at home (vague answers, refusal to discuss school) together make a real pattern. One bad test after a hard week is noise. If the school's data and what you see at home point the same way, treat it as a pattern and start with a diagnosis.",
  },
  {
    q: 'Should I hire a tutor if my child is failing A-levels?',
    a: "Not as a first move. Tutoring works when it targets a diagnosed problem, like a genuine knowledge gap in one subject. If the real cause is how your child revises, a weekly tutor adds another hour of passive input to a method that already isn't working. Diagnose first, fix the revision system, then add targeted subject help where the diagnosis points. That order costs less and works better.",
  },
  {
    q: 'Can my child recover from failing Year 12?',
    a: 'Yes. Year 12 marks never appear on the A-level certificate; the final grade is earned entirely in the exams at the end of Year 13. What Year 12 evidence does shape is predicted grades, which are typically set in September or October of Year 13. So the recovery window is real but has a deadline: diagnose the cause now, rebuild over the summer, and hand teachers new evidence early in the autumn term.',
  },
  {
    q: 'Why is my child working hard but still failing A-levels?',
    a: 'Because effort multiplied by the wrong method still produces the wrong result. Most struggling students revise by re-reading notes and highlighting, which builds recognition rather than recall, and exams pay for retrieval from a blank page under time pressure. A child can put in long evenings of that kind of work and still go blank in the exam hall. The fix is changing the method, not adding hours.',
  },
  {
    q: 'When should I contact the school about my child\'s falling grades?',
    a: "Early, as soon as you see the pattern, and with specific questions. Ask which topics or papers the marks are being lost on, what the teacher thinks the cause is, and what support the school can offer. Teachers usually know precisely where a student is struggling and will share it when asked directly. Waiting for parents' evening or for predicted grades to be set costs you the months when the problem is cheapest to fix.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        If your child is failing A-levels, start with evidence, not punishment. Confirm it&apos;s a pattern
        (marks falling across time, teacher concerns, avoidance at home) rather than one bad test, then work
        out which of four causes is driving it: missing knowledge, recall that fails under pressure, weak
        application to unfamiliar questions, or exam technique. More hours fix none of these if the method is
        wrong. Diagnose first, rebuild the revision system, then add targeted help only where the diagnosis
        points.
      </QuickAnswer>

      <Lead>
        There&apos;s a message I get from parents every term. The wording changes, the shape never does:
        &quot;He&apos;s failing Year 12. We&apos;ve taken the phone, we&apos;ve cancelled football, and
        nothing&apos;s changing. What do we do?&quot; Sometimes it&apos;s the other version: &quot;She&apos;s
        at her desk every night and the marks keep sliding.&quot; I&apos;m a doctor. The first thing
        we&apos;re taught about a frightening result is to separate the drama from the data, because you
        can&apos;t treat a panic. You can only treat a cause. So this is the calm version of the conversation
        I have with those parents, in the order I&apos;d have it.
      </Lead>

      <KeyTakeaways
        points={[
          'One bad test is noise. Falling marks across time, teacher emails and avoidance at home together make a pattern worth acting on.',
          'A-level grades collapse for four reasons: missing knowledge, recall that fails under pressure, weak application to unfamiliar questions, and exam technique. Each has a different fix.',
          'If the cause is method, more hours changes nothing except how exhausted your child is.',
          'Skip the classic mistakes: punishment-first responses, confiscation ultimatums, panic-buying weekly tutoring, and comparing siblings.',
          'The plan is staged: diagnose the cause this week (free), rebuild the revision system, then add targeted help only where the diagnosis says it is needed.',
        ]}
      />

      <H2 id="drama-vs-data">First, separate the drama from the data</H2>
      <P>
        &quot;Failing&quot; is doing a lot of work in that sentence, so pin it down. One bad test after a
        rough fortnight is noise. Every student produces a result like that at some point, and treating it as
        a crisis mostly teaches your child to hide the next one from you.
      </P>
      <P>A real problem looks like a pattern, and patterns show up in three places:</P>
      <UL>
        <LI>
          <Strong>Marks across time.</Strong>{' '}Not one grade but a line: homework marks, class tests and
          mocks drifting down, or stuck well below target, over weeks and months. Ask to see the actual
          numbers, gently.
        </LI>
        <LI>
          <Strong>What the school is saying.</Strong>{' '}Teacher emails about incomplete work, a form tutor
          mentioning lost focus, a subject teacher raising a flag unprompted. Teachers watch thirty students
          at once; when they single yours out, weigh it.
        </LI>
        <LI>
          <Strong>Avoidance at home.</Strong>{' '}The subject that never gets mentioned. &quot;It&apos;s
          fine&quot; as a complete answer. Revision that always happens behind a closed door with nothing to
          show afterwards. Avoidance is usually shame wearing a disguise, and it grows in the gap between one
          bad result and the next.
        </LI>
      </UL>
      <P>
        If two of those three point the same way, treat it as a pattern. I&apos;ve written a fuller guide to
        reading the signs at home in{' '}
        <A href="/blog/is-my-child-revising-properly/">is my child revising properly</A>, but the short
        version is: trust evidence over mood, in both directions.
      </P>

      <H2 id="four-causes">The four causes, translated for parents</H2>
      <P>
        Across more than 1,000 A-level students, I&apos;ve seen grades collapse for four reasons. They look
        identical on a results sheet, and they have completely different fixes, which is why guessing is
        expensive.
      </P>
      <UL>
        <LI>
          <Strong>Missing knowledge.</Strong>{' '}Whole topics never went in, usually from a patch of term
          where they fell behind and never circled back. What you hear at home: &quot;we haven&apos;t really
          covered that&quot; about material the class finished months ago.
        </LI>
        <LI>
          <Strong>Recall that fails under pressure.</Strong>{' '}They knew it the night before; in the exam
          it was gone. This is the most common cause and the most misread. Re-reading notes builds
          recognition, and exams pay for retrieval from a blank page. What you hear: &quot;I revised loads
          and my mind just went blank.&quot;
        </LI>
        <LI>
          <Strong>Can&apos;t apply it to unfamiliar questions.</Strong>{' '}They can recite the content, but
          the exam dressed it in a context they hadn&apos;t seen and the marks slipped away. Common in maths
          and the sciences. What you hear: &quot;the questions were nothing like what we did in class.&quot;
        </LI>
        <LI>
          <Strong>Exam technique.</Strong>{' '}The knowledge was fine; the performance wasn&apos;t. Ran out
          of time, missed command words, wrote everything they knew instead of what the mark scheme rewards.
          What you hear: &quot;I ran out of time&quot; or, more painfully, &quot;I thought that one went
          well.&quot;
        </LI>
      </UL>

      <H2 id="more-hours">Why more hours won&apos;t fix it</H2>
      <P>
        Here&apos;s the part that catches loving, sensible parents. If the cause is any of the four above,
        adding hours changes nothing. Three more hours a night of re-reading builds more recognition and no
        more recall. More past papers without fixing technique rehearse the same mistakes faster. Effort
        multiplied by the wrong method gives you the same grade with a more exhausted child attached, and
        I&apos;ve watched that exact loop wear down some of the hardest-working students I know. If your
        child is already putting the time in and the marks won&apos;t move, read{' '}
        <A href="/blog/working-hard-grades-not-improving/">working hard but grades not improving</A>:
        it&apos;s the same disease seen from the student&apos;s side of the desk.
      </P>

      <H2 id="what-not-to-do">What not to do (I say this kindly)</H2>
      <P>Every instinct on this list is understandable. I&apos;ve seen every one of them backfire.</P>
      <UL>
        <LI>
          <Strong>Punishment first.</Strong>{' '}Punishment works on effort problems. Failing A-levels is
          almost never an effort problem, so it lands on a child who is already trying and already ashamed,
          and the main thing it teaches is to hide results from you.
        </LI>
        <LI>
          <Strong>Confiscation ultimatums.</Strong>{' '}&quot;No phone until the grades come back up&quot;
          feels decisive. But if the method is broken, the grades can&apos;t come back up, so you&apos;ve
          built a standoff with no exit and made yourself the enemy instead of the ally.
        </LI>
        <LI>
          <Strong>Panic-buying weekly tutoring.</Strong>{' '}A tutor bought before a diagnosis is a
          prescription written before the examination. If the real problem is how your child revises between
          sessions, you&apos;ll pay every week for an hour that can&apos;t stick. I&apos;ve written honestly
          about when it does earn its cost in{' '}
          <A href="/blog/is-a-level-tutoring-worth-it/">is A-level tutoring worth it</A>.
        </LI>
        <LI>
          <Strong>Comparing siblings.</Strong>{' '}&quot;Your sister never had this problem&quot; has never
          once produced a better grade. It produces a teenager who stops talking to you about school, which
          removes your best source of evidence exactly when you need it most.
        </LI>
      </UL>

      <H2 id="staged-plan">The staged plan: diagnose, rebuild, then target</H2>
      <P>
        Here&apos;s the order that works, and the reason it&apos;s staged is the reason medicine is staged:
        each step tells you whether you need the next one.
      </P>
      <OL>
        <LI>
          <Strong>Diagnose this week, for free.</Strong>{' '}Two sources of evidence. First, the marked
          papers: sit down together, calmly and not as an ambush, and label where the marks went using the
          four causes above. Second, our free Revision Diagnostic has a parent version: 20 questions answered
          from what you observe at home, and it names the pattern and what to do about it.
        </LI>
        <LI>
          <Strong>Rebuild the system.</Strong>{' '}Whatever the diagnosis, the fix nearly always includes
          replacing re-reading with retrieval: blurting, past-paper questions, spaced review. Your role
          isn&apos;t to teach any of that. It&apos;s to make space for it and stop rewarding the wrong kind
          of busy. The practical version, including what to say and what to stop saying, is in{' '}
          <A href="/blog/help-your-child-revise-a-levels/">how to help your child revise</A>.
        </LI>
        <LI>
          <Strong>Then targeted help, only where the diagnosis points.</Strong>{' '}A genuine knowledge gap
          in one subject is a case for subject-specific teaching. A broken revision method is a case for
          fixing the method, and no amount of subject tutoring fixes a method. Buying help after the
          diagnosis means paying for the right thing once instead of the wrong thing weekly.
        </LI>
      </OL>

      <DiagnosticCTA audience="parent" />

      <P>
        And if you&apos;d rather talk it through with a person first, you can{' '}
        <A href="https://scheduler.zoom.us/dr-waleed-ahmad/a-level">book a free call with me</A>{' '}and
        bring the marked papers. I&apos;ll tell you honestly what I see, including if what I see is a problem
        we&apos;re not the right fix for.
      </P>

      <H2 id="involve-school">When to involve the school (early, and specifically)</H2>
      <P>
        Go in earlier than feels comfortable, and go in with specific questions rather than general worry.
        Which topics or papers is he losing marks on? What does the teacher think the cause is? What support
        already exists in school? Teachers usually know exactly where a student is struggling, and a specific
        question gets a specific answer where &quot;how is he doing&quot; gets a diplomatic one. Timing
        matters more than most parents realise: predicted grades are typically set in September or October of
        Year 13, built mostly on end-of-Year-12 evidence, so a Year 12 slide has a real deadline attached. If
        that&apos;s where you are,{' '}
        <A href="/blog/bad-year-12-results-what-now/">bad Year 12 results: what now</A>{' '}walks through the
        repair window in detail.
      </P>

      <Callout title="One thing I&apos;ll say as a doctor rather than a tutor">
        If your child&apos;s sleep, mood or appetite has changed and stayed changed for a few weeks,
        that&apos;s a conversation for your GP, not a revision plan. Everything else in this article waits
        patiently behind that one.
      </Callout>

      <P>
        The message I&apos;d send back to every one of those parents is the same. Your child isn&apos;t
        failing because they&apos;re lazy, and they&apos;re not short of ability. Something specific is going
        wrong, it&apos;s findable, and finding it costs nothing. Start there. For the fuller picture of how
        to back them from home, our free{' '}
        <A href="/parents/">parents&apos; guide</A>{' '}covers the whole journey. Any questions, just message
        me. I&apos;m always happy to talk it through.
      </P>
    </ArticleLayout>
  )
}
