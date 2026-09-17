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

const post = getPost('how-to-revise-a-level-maths')!

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
    q: 'What is the best way to revise for A-level Maths?',
    a: "Do questions, mark them honestly, log every error, and re-attempt the failures cold a few days later. That loop is the entire core of maths revision. Reading notes, watching solution videos and copying worked examples all feel like revision and build almost nothing, because maths is a performance skill: the only way to get better at doing questions under pressure is doing questions under pressure.",
  },
  {
    q: 'Why do I understand maths in class but fail the tests?',
    a: "Because following a solution and producing one are different skills. When a teacher or video walks through a problem, every step looks obvious, and your brain files it as \"I can do this\". The test then asks you to generate the steps yourself, from a blank page, under time pressure, and the ability was never built. The fix is brutal and simple: after any worked example, cover it and do the whole question yourself from scratch. If you can't, you haven't learned it yet.",
  },
  {
    q: 'How many past paper questions should I do for A-level Maths?',
    a: "More than any other subject, because in maths the questions ARE the revision, not the test of it. Practically: topic-sorted questions from the very start of revision, mixed-topic sets once a topic is stable, and full timed papers in the run-up to mocks and exams. But the count matters less than the follow-up: ten questions with every error logged and re-attempted beat thirty that were marked and forgotten.",
  },
  {
    q: 'Should I make notes or flashcards for A-level Maths?',
    a: "Very few, and only for the things that are genuinely recall: key formulae not on the formula sheet, exact definitions, standard method outlines (the steps for a proof by induction, say). Everything else in maths is procedural, and procedures live in your hands, not on cards. One page of must-memorise facts per module is plenty; the rest of your time belongs to questions.",
  },
  {
    q: 'How do I revise the topics I find hardest in Maths?',
    a: "Backwards from failure, in three passes. First, find where the topic actually breaks: attempt a question and note the exact step you can't make. Second, patch that specific step (one worked example, then reproduce it covered). Third, return to full questions on the topic, cold, a few days later, and log it in your error list until it stops appearing. Avoiding the hardest topics is the most expensive habit in maths revision, because papers weight the harder skills.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        A-level Maths is revised by doing, full stop: attempt questions, mark them against the scheme, keep
        an error log of every mistake, and re-attempt those questions cold days later. Notes, videos and
        re-read worked examples don&apos;t build the skill the exam tests. Split your time between fluency
        (standard methods done fast and accurately) and problem-solving (unfamiliar, multi-step
        questions), and let past papers arrive early, because in maths they are the revision.
      </QuickAnswer>

      <Lead>
        &quot;You can&apos;t really revise for maths.&quot; Students say it every year, usually after an evening
        of reading notes achieved nothing, and it&apos;s half true. You can&apos;t revise maths the way you
        revise a content subject. Reading about integration does roughly as much for your grade as
        reading about press-ups does for your chest. Maths is a performance subject, and once you revise
        it like one, it becomes the most improvable A-level there is: the paper has no essay marks, no
        examiner taste, just skills that are either built or not built yet.
      </Lead>

      <KeyTakeaways
        points={[
          'Maths revision is doing questions. Reading, watching and copying feel productive and build almost nothing.',
          'The core loop: attempt, mark honestly against the scheme, log the error, re-attempt cold days later. The error log is the highest-yield document you will own.',
          'Understanding a worked example is not the skill. Producing the solution yourself, covered, from scratch, is the skill.',
          'Split training between fluency (standard methods, fast and accurate) and problem-solving (unfamiliar multi-step questions). Papers pay for both.',
          'Show your working and know the time-per-mark: method marks rescue wrong answers, and unfinished papers lose more grades than hard questions do.',
        ]}
      />

      <H2 id="why-it-fails">Why most Maths revision does nothing</H2>
      <P>
        Three habits eat almost every wasted maths hour. <Strong>Passive input:</Strong>{' '}re-reading
        notes and watching solution videos, where every step looks obvious because someone else is making
        the steps. <Strong>Comfortable repetition:</Strong>{' '}doing another twenty questions on the
        topic you already score full marks on, because it feels good. <Strong>Unmarked practice:</Strong>{' '}
        doing questions but never checking them against the mark scheme, so the same errors compound for
        months, rehearsed rather than fixed. If your marks are flat despite real effort, you&apos;ll find at
        least one of the three in your week, and our free{' '}
        <A href="/revision-diagnostic/">revision diagnostic</A>{' '}will find the rest of the leak in about
        four minutes.
      </P>

      <H2 id="core-loop">The core loop: attempt, mark, log, re-attempt</H2>
      <OL>
        <LI>
          <Strong>Attempt from cold.</Strong>{' '}Pick questions on the topic and try them properly before
          any help: full written working, no peeking. Struggle is not a sign it&apos;s going wrong. The
          struggle is the training.
        </LI>
        <LI>
          <Strong>Mark against the scheme, honestly.</Strong>{' '}Method marks, accuracy marks, the lot.
          &quot;I basically had it&quot; is the most expensive sentence in maths: the scheme either paid your
          working or it didn&apos;t.
        </LI>
        <LI>
          <Strong>Log every error with its cause.</Strong>{' '}One line each in a notebook: topic, question,
          and whether the miss was knowledge (didn&apos;t know the method), selection (knew it, didn&apos;t
          spot it applied), or slip (sign error, algebra, calculator). Different causes get different
          fixes, and the log shows you your real weak list, which is never quite the one you&apos;d guess.
        </LI>
        <LI>
          <Strong>Re-attempt cold, days later.</Strong>{' '}The step almost everyone skips, and the one
          that builds the grade: the same questions, from scratch, three or four days on. Solved cold,
          the error retires from the log. Failed again, it stays. The log shrinking over weeks IS your
          revision progress, measured.
        </LI>
      </OL>
      <P>
        Schedule the loop rather than hoping it happens: our free{' '}
        <A href="/revision-tracker/">revision tracker</A>{' '}builds the week around your weakest topics
        with the re-attempt gaps baked in, and{' '}
        <A href="/blog/how-to-make-a-revision-timetable/">the timetable guide</A>{' '}explains the spacing
        logic if you want to run it on paper.
      </P>

      <Callout title="The covered-page rule">
        Worked examples are allowed exactly once per problem type. Study it, understand every step, then
        cover it and produce the full solution yourself on a blank page. If you can&apos;t, you&apos;ve
        rehearsed recognition, not ability. This one rule converts the most common fake revision in maths
        into the real thing, and it&apos;s the maths version of{' '}
        <A href="/blog/blurting-method-a-level-revision/">the blank-page test</A>{' '}every subject needs.
      </Callout>

      <H2 id="fluency-and-problems">Train both halves: fluency and problem-solving</H2>
      <P>
        A-level Maths papers pay for two different abilities, and most students only train one.{' '}
        <Strong>Fluency</Strong>{' '}is the standard methods (differentiate this, solve that) done fast and
        clean; it&apos;s built with short, regular drills, and it buys you the time the paper&apos;s back half
        demands. <Strong>Problem-solving</Strong>{' '}is the multi-step, unfamiliar questions that don&apos;t
        announce which method they want; it&apos;s built by deliberately doing questions you haven&apos;t been
        told the topic of, so the selection skill develops. A good week trains both: a couple of short
        fluency drills, one or two mixed sets where the topics arrive unlabelled.
      </P>

      <H2 id="exam-craft">The exam craft that rescues grades</H2>
      <UL>
        <LI>
          <Strong>Show working, always.</Strong>{' '}Method marks are the safety net under every wrong
          answer, and unshown mental steps earn nothing when the final line is off.
        </LI>
        <LI>
          <Strong>Know the time-per-mark and keep moving.</Strong>{' '}A rough minute a mark with slack for
          checking: a question consuming triple its worth is a question to leave and return to. More
          grades die from unfinished papers than from hard questions.
        </LI>
        <LI>
          <Strong>Bank the front, fight the back.</Strong>{' '}Early questions are fluency territory; take
          those marks quickly and cleanly so the harder problem-solving gets the time it needs.
        </LI>
        <LI>
          <Strong>Rehearse under real conditions before it counts.</Strong>{' '}Timed sections first, full
          papers as mocks approach, and treat every one as data:{' '}
          <A href="/blog/a-level-exam-confidence/">confidence is built from evidence</A>, not hope.
        </LI>
      </UL>

      <DiagnosticCTA />

      <H2 id="the-week">What a converting Maths week looks like</H2>
      <P>
        Inside{' '}
        <A href="/blog/how-many-hours-revision-a-level/">the honest hours for your year group</A>: two or
        three error-log loops on weak topics, one short fluency drill, one mixed set with unlabelled
        topics, and, later in the year, one timed paper section. Nothing exotic, relentlessly repeated.
        Maths rewards that consistency faster than any other subject, which is also why{' '}
        <A href="/blog/best-way-to-revise-for-a-levels/">the general ranking of revision methods</A>{' '}
        puts practice testing at the top: in maths, practice testing is close to the whole game.
      </P>

      <CourseCTA
        href="/a-level-maths-tutoring/"
        heading="Want Maths trained, not re-explained?"
        body="Our live A-level Maths programme runs 12 weekly small-group sessions built on exactly this system: exam questions first, error-driven teaching, problem-solving under real conditions. Taught by specialists and led by Dr Waleed Ahmad, MBBS. On average, our students jump two grades, and the first session is risk-free."
        label="See A-Level Maths Tutoring"
      />
    </ArticleLayout>
  )
}
