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

const post = getPost('gcse-to-a-level-jump')!

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
    q: 'Why are A-levels so much harder than GCSEs?',
    a: "Four things change at once: each subject roughly doubles in depth, nobody chases the work any more, the questions stop rewarding memorised answers and start rewarding application to unfamiliar problems, and there are far fewer graded checkpoints, so a problem can hide for months. Any one of those is manageable. All four landing in the same September is why even students with a run of 8s and 9s can feel out of their depth by October.",
  },
  {
    q: 'Is it normal to struggle in the first term of Year 12?',
    a: "Completely. The first term of Year 12 is the single most common time for a previously strong student to hit a wall, because the habits that carried GCSE (listen in class, cram before the test, rely on recognising familiar questions) stop working and no one has taught a replacement. Struggling in October says almost nothing about ability. Staying stuck until the spring is the thing to avoid, because Year 12 evidence feeds predicted grades.",
  },
  {
    q: 'How can I tell if my child is coping with A-levels?',
    a: "Watch the outputs, not the hours. Can they explain this week's topics out loud in their own words? Are they doing questions, or only reading and highlighting? Do test marks roughly match the effort you can see? Homework taking oddly long, beautiful notes paired with disappointing scores, and vague answers when a subject comes up are the three early signs the method isn't working.",
  },
  {
    q: 'Do GCSE grades predict A-level grades?',
    a: "Loosely at best. Strong GCSEs open the door to A-levels, but they were largely earned with memory and familiarity, and A-levels pay for retrieval and application instead. That's why the correlation breaks down so often in Year 12: the students who never needed a revision system at GCSE arrive without one, and the students who built a system early overtake them. The system, not the GCSE grades, is the predictor.",
  },
  {
    q: 'When should a parent step in, and how?',
    a: "Early in the autumn term, gently, and with a diagnosis rather than a verdict. If you're seeing the warning signs, don't start with more hours or a tutor. Start by finding out where the method is failing: knowledge, recall under pressure, application, or exam technique. Our free revision diagnostic does exactly that in about four minutes, and there's a parent version you can answer from what you observe at home.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        The GCSE to A-level jump catches bright students because the rules change, not because the content
        is impossible. Each subject roughly doubles in depth, nobody chases the work, and the questions
        switch from rewarding memory to rewarding application. Students who cruised GCSE without a revision
        system feel it hardest, usually in the first term of Year 12. The fix is a working study system set
        up now, in the autumn, not after the first bad mocks.
      </QuickAnswer>

      <Lead>
        If your child walked out of GCSEs with strong grades and is suddenly, visibly sinking three weeks
        into Year 12, you are living through the most predictable crisis in British education. It has a
        name in staff rooms: the jump. Nobody warns families about it properly, so parents watch a
        previously capable teenager start drowning and quietly wonder what went wrong at home. Almost
        always, nothing did. The rules of the game changed, and no one taught them the new rules.
      </Lead>

      <KeyTakeaways
        points={[
          'A-levels are harder in a specific way: double the depth per subject, full independence, application-style questions, and far fewer checkpoints.',
          'Strong GCSE students are hit hardest, because GCSE success rarely required a real revision system. The wall is the system gap, not an ability gap.',
          'The warning signs show at home before they show in grades: homework taking oddly long, beautiful notes with disappointing tests, vague answers about how subjects are going.',
          'The window matters: Year 12 evidence sets predicted grades in a year, and habits harden by Christmas. September and October are when the system gets built cheaply.',
          "Hitting the wall in October is common and fixable. Misreading it as \"not clever enough\" is the actual danger.",
        ]}
      />

      <H2 id="what-changes">What actually changes between GCSE and A-level</H2>
      <P>
        Parents are usually told A-levels are &quot;a big step up&quot; and left to guess what that means. Here&apos;s the machinery of it.
      </P>
      <UL>
        <LI>
          <Strong>The volume doubles, per subject.</Strong>{' '}Three A-levels go deeper than the whole GCSE slate did, and each topic goes far enough down that skimming stops working.
        </LI>
        <LI>
          <Strong>The scaffolding disappears.</Strong>{' '}At GCSE, teachers chase homework, set revision
          lessons and drill the exam questions. At A-level your child is expected to run their own study
          around lessons, and many schools say so once in September and never again.
        </LI>
        <LI>
          <Strong>The questions change species.</Strong>{' '}GCSE papers largely reward recognising familiar
          question types. A-level papers deliberately dress content in contexts your child has never seen,
          so knowing the material and scoring with it become two different skills.
        </LI>
        <LI>
          <Strong>The feedback loop stretches.</Strong>{' '}Fewer tests, fewer marked pieces, sometimes a
          whole term between real checkpoints. A method that isn&apos;t working can hide until November mocks,
          and by then a term of content sits on shaky foundations.
        </LI>
      </UL>

      <H2 id="why-bright-students">Why the strongest GCSE students stumble hardest</H2>
      <P>
        Here&apos;s the pattern I&apos;ve seen over and over across more than 1,000 A-level students, and it
        surprises every family it happens to. The students who found GCSEs easy never needed to learn how
        to study. Listening in class was enough. A weekend of cramming was enough. Their memory carried
        them, and it genuinely was enough, so they arrived in Year 12 with excellent grades and no system.
      </P>
      <P>
        Then A-level asks for something different: spaced, repeated retrieval of a much larger body of
        material, applied to unfamiliar problems under time pressure. The students who scraped their GCSEs
        with flashcards and past papers often adapt faster, because they already own a method. The
        high-fliers hit the wall. It is the system gap, not an ability gap, and that distinction changes
        everything about how a parent should respond.
      </P>

      <Callout title="The sentence that does damage">
        When a strong GCSE student starts failing A-level tests, the conclusion they quietly reach is
        &quot;I&apos;m not actually clever, the GCSEs were a fluke.&quot; It&apos;s wrong, it arrives silently, and it
        does more harm than any individual bad mark, because a student who believes it stops trying the
        thing that would fix the problem. If you only correct one belief at your kitchen table this term,
        correct that one.
      </Callout>

      <H2 id="warning-signs">The warning signs a parent can see from outside</H2>
      <P>
        You can&apos;t mark their essays, but you don&apos;t need to. The early signals are visible at home,
        weeks before any grade confirms them:
      </P>
      <UL>
        <LI>Homework takes oddly long. Two hours on something the teacher expected to take forty minutes usually means the underlying topic never landed.</LI>
        <LI>The notes are beautiful and the test marks aren&apos;t. Rewriting and highlighting feel like work and test nothing. It&apos;s the most common failure pattern in the first term.</LI>
        <LI>Subject talk goes vague. &quot;Fine&quot; and &quot;we&apos;re doing enzymes&quot; instead of anything with content in it. Students avoid talking about subjects that have started to frighten them.</LI>
        <LI>Everything is done the night before it&apos;s due. A-level workloads punish pure deadline-driven working within about six weeks.</LI>
        <LI>They study plenty but can&apos;t explain a topic out loud when asked with genuine curiosity. Explaining from memory is the cheapest test of real learning a parent has.</LI>
      </UL>
      <P>
        If several of these sound familiar, the follow-up question is which part of the method is failing,
        and I&apos;ve written a separate guide to{' '}
        <A href="/blog/is-my-child-revising-properly/">the signs revision isn&apos;t working and what to do
        about them</A>{' '}that goes deeper than this one.
      </P>

      <H2 id="september-setup">The September fix beats the January rescue</H2>
      <P>
        The reason to act in the autumn rather than waiting for mocks to confirm the problem: Year 12
        evidence is what teachers use to set predicted grades a year from now, and study habits harden
        fast. The good news is that the fix in September is small. It&apos;s a working weekly routine, built
        around retrieval rather than re-reading:
      </P>
      <UL>
        <LI>A fixed weekly rhythm of consolidation on top of homework, around{' '}<A href="/blog/how-many-hours-revision-a-level/">4 to 6 focused hours a week in Year 12</A>. Consistency beats volume all year.</LI>
        <LI>Testing from a blank page instead of re-reading:{' '}<A href="/blog/blurting-method-a-level-revision/">blurting</A>{' '}is the simplest version and takes ten minutes a topic.</LI>
        <LI>Questions early, not just before tests. At A-level, doing questions IS the revision, not the reward for finishing it.</LI>
        <LI>A plan the student built themselves. Our free{' '}<A href="/revision-tracker/">revision tracker</A>{' '}turns their subjects and weak topics into a weekly timetable in about three minutes, and a plan they own gets defended rather than resisted.</LI>
      </UL>

      <DiagnosticCTA audience="parent" />

      <H2 id="if-it-continues">If the wall doesn&apos;t move</H2>
      <P>
        Most students who set up a real system in the autumn are visibly steadier within a few weeks. If
        the struggle continues despite genuine effort, diagnose before you spend: the right help depends
        entirely on whether the gap is knowledge, recall, application or exam technique, and paying for
        the wrong kind is how families burn money without moving grades. I&apos;ve written honestly about{' '}
        <A href="/blog/how-much-does-a-level-tutoring-cost/">what tutoring costs</A>{' '}and{' '}
        <A href="/blog/how-to-choose-an-a-level-tutor/">how to choose it</A>{' '}when it is the right call.
        And if you want the diagnosis done for you, the free parent diagnostic above is the four-minute
        version, followed by a plan you can actually act on.
      </P>
    </ArticleLayout>
  )
}
