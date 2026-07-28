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
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('choosing-a-levels-after-gcse')!

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
    q: 'How many A-levels should you take?',
    a: "Three, for almost everyone. Universities build their offers on three grades, so a fourth subject rarely adds anything to an application and always takes time away from the other three. A fourth earns its place in a few specific cases: further maths alongside maths if you want the most maths-heavy degrees, or starting with four and reviewing at October half term with a genuine plan to drop one.",
  },
  {
    q: 'Which A-levels do you need for medicine?',
    a: "Chemistry is the subject you cannot do without: medicine courses ask for it almost universally, and most want biology alongside it. The third subject is usually a free choice, so pick something you enjoy and can score well in. Exact requirements vary between courses, so before you commit, read the entry pages of a few courses you can imagine applying to and let those set your list.",
  },
  {
    q: 'Can you change your A-level choices after GCSE results day?',
    a: "Usually, yes, and results week is the best window you will get. Sixth forms expect changes in the days after results come out, whilst classes are still being organised, so a swap that is easy on 20 August can be genuinely awkward by late September. If your grades have changed the plan, contact your sixth form the same day and ask what your options are.",
  },
  {
    q: 'Should you choose A-levels based on your GCSE grades?',
    a: "Treat the grade as a signal, not an instruction. A strong GCSE says you have aptitude, but subjects change character at A-level: the content deepens, the questions demand application rather than memory, and you may have a completely different teacher. Weigh the grade alongside honest enjoyment. Two years is a long time to spend with a subject you only liked because of who taught it.",
  },
  {
    q: 'What if I want a subject I have never studied, like psychology or economics?',
    a: "Test-drive it before you commit. Read the exam board's specification rather than the prospectus blurb, look at a real past paper, and ask a Year 13 who takes it what surprised them. New subjects catch people out through their assessment style: psychology involves more maths and research methods than most students expect, and economics leans hard on essays and data. Ten minutes with a past paper tells you the truth.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Work backwards from the doors you want open: check entry requirements for any degree you might
        plausibly want, because some courses are closed without specific subjects (medicine needs chemistry
        and usually biology; most maths-heavy degrees need maths). Then score each subject on enjoyment and
        aptitude together, choose three you can do well rather than four you can do adequately, and
        test-drive any subject you&apos;ve never studied before committing. If results day changes the plan,
        talk to your sixth form that week, whilst everything is still flexible.
      </QuickAnswer>

      <Lead>
        Picture the evening of Thursday 20 August. The envelope&apos;s been open since breakfast, the grades
        are what they are, and somewhere on the kitchen table is the form your sixth form wants back: three
        boxes, maybe four, that decide what you&apos;ll spend the next two years doing. Most students fill it
        in on a gut feeling and whatever their best mate picked. You can do better than that in one evening.
        Here&apos;s the five-step framework I wish someone had handed me at 16, in the order the steps should
        be taken.
      </Lead>

      <KeyTakeaways
        points={[
          'Choose backwards from degree entry requirements, not forwards from your favourite GCSE lessons. Some doors close quietly at 16 if the right subjects are missing.',
          'Score every candidate subject on enjoyment and aptitude together. A GCSE grade is a signal, not a verdict: the subject and the teaching both change at A-level.',
          'Three subjects done well beats four done adequately. Universities build offers on three grades, and a fourth mostly dilutes your time.',
          'Never commit to a subject you have never met, like psychology or economics, without reading its specification and a real past paper first.',
          'Results week is the most flexible week in the sixth-form calendar. If your grades change the plan on 20 August, have the conversation that day, not in September.',
        ]}
      />

      <H2 id="doors">Step 1: Work backwards from the doors you want open</H2>
      <P>
        Most students choose forwards: which lessons did I enjoy, which teachers did I like, what are my
        friends doing? The stronger move is to choose backwards, from the degrees you might plausibly want in
        two years&apos; time. You don&apos;t need to know your career at 16. Almost nobody does. What you need
        to know is which doors you&apos;re not willing to close, because some of them close quietly at this
        exact moment and are expensive to reopen later.
      </P>
      <P>
        The classic examples: medicine needs <Strong>chemistry</Strong>, and most courses want biology
        alongside it. The heavily mathematical degrees, engineering, physics, economics at many universities,
        computer science at plenty, expect <Strong>maths</Strong>. If any of those futures is even a maybe
        for you, the required subject goes on your list now, not as an afterthought.
      </P>
      <P>
        So here&apos;s the exercise. Pick three degrees you can imagine yourself doing, even loosely. Look up
        their entry requirements on the course pages. Write down every subject that appears as required or
        preferred. If one subject shows up across all three, that&apos;s not a coincidence, that&apos;s your
        anchor. And if you genuinely have no idea what you want yet, lean towards the traditional core
        subjects, maths, the sciences, English, history, geography, languages, because they keep the widest
        range of courses open whilst you decide.
      </P>

      <H2 id="grid">Step 2: Run every subject through the enjoyment times aptitude grid</H2>
      <P>
        Two years is a long time. Longer than it sounds on results night. So every candidate subject gets two
        honest questions. One: do I actually enjoy this, as in, would I think about it when nobody&apos;s
        making me? Two: am I genuinely good at it? You want subjects that score well on both, because
        enjoyment carries you through the boring patches and aptitude carries you through the hard ones. A
        subject that only scores on one is a risk. A subject that scores on neither is a two-year sentence.
      </P>
      <P>
        Your GCSE grade helps you answer the aptitude question, but treat it as a signal, not a verdict.
        Subjects change character at A-level: the content goes deeper, the questions stop rewarding memory
        and start demanding application, and{' '}
        <A href="/blog/gcse-to-a-level-jump/">the jump from GCSE to A-level</A>{' '}catches out plenty of
        students who cruised at GCSE. The teaching changes too. The teacher who made GCSE history feel alive
        may not be the one taking the A-level class.
      </P>
      <P>
        Which leads to the honesty check most students skip: strip out the teacher effect. Be honest with
        yourself. Did you love the subject, or did you love how it was taught? One of those follows you into
        Year 12. The other doesn&apos;t.
      </P>

      <H2 id="three-not-four">Step 3: Choose three done well, not four done adequately</H2>
      <P>
        Here&apos;s the honest take, and some people won&apos;t like it: for most students, taking four
        A-levels is a mistake dressed up as ambition. University offers are built on three grades. A fourth
        subject almost never improves an offer, but it reliably takes a quarter of your study time away from
        the three that decide your future. A-level workloads are heavy enough that{' '}
        <A href="/blog/how-many-hours-revision-a-level/">the weekly hours</A>{' '}for three subjects done
        properly already surprise most Year 12s. AAB in three beats BBBB in four, every single time.
      </P>
      <P>When does a fourth make sense? A few genuine cases:</P>
      <UL>
        <LI>
          <Strong>Further maths alongside maths</Strong>, if you&apos;re aiming at the most maths-heavy
          degrees. The two subjects overlap enough that the fourth costs less than it looks, and for those
          courses it genuinely strengthens the application.
        </LI>
        <LI>
          <Strong>Starting with four, planning for three.</Strong>{' '}If you truly can&apos;t decide between
          two subjects, some sixth forms will let you start both and drop one later. That&apos;s fine, if you
          set a real review point, October half term, and actually drop one. Carrying four out of vague guilt
          helps nobody.
        </LI>
        <LI>
          <Strong>You&apos;re a genuine outlier.</Strong>{' '}Strong grades across the board at GCSE, a light
          extracurricular load, and a specific reason the fourth subject matters. Rare, but real.
        </LI>
      </UL>
      <P>
        What&apos;s not a reason: &quot;four looks impressive.&quot; It doesn&apos;t. Three high grades look
        impressive.
      </P>

      <H2 id="new-subjects">Step 4: Test-drive the subjects you&apos;ve never met</H2>
      <P>
        Psychology, economics, sociology, politics, law: most students choosing these have never sat a single
        lesson in them. That&apos;s not a reason to avoid them. Some of the happiest A-level students I meet
        are the ones who discovered a new subject at 16. But choosing blind, off a one-line description in a
        prospectus, is how students end up begging to switch classes in October. So test-drive before you
        sign:
      </P>
      <UL>
        <LI>
          Read the exam board&apos;s <Strong>specification</Strong>, the actual document, free online. It
          lists every topic you&apos;ll study. If the topic list bores you on page two, believe it.
        </LI>
        <LI>
          Open a <Strong>past paper</Strong>{' '}and read the questions. This is what the subject asks of you
          at the end. Psychology has more maths and research methods than almost anyone expects. Economics
          wants essays and data analysis, not business anecdotes.
        </LI>
        <LI>
          Find a <Strong>Year 13 who takes it</Strong>{' '}and ask one question: what surprised you? Their
          answer is worth more than any open evening speech.
        </LI>
        <LI>
          Watch or read a first-topic lesson&apos;s worth of real content. An hour of genuine material tells
          you more than a term of imagining it.
        </LI>
      </UL>

      <H2 id="results-week">Step 5: If results week changes the plan, move fast</H2>
      <P>
        GCSE results arrive on <Strong>Thursday 20 August 2026, from 8am</Strong>. Sometimes they confirm the
        plan. Sometimes they don&apos;t: a grade comes in lower in a subject you&apos;d banked on, or higher
        in one you&apos;d written off, and suddenly the form on the kitchen table needs different boxes
        ticked.
      </P>
      <P>
        Here&apos;s what most families don&apos;t realise: results week is the single most flexible week in
        the sixth-form calendar. Class lists are still being built, places are still moving, and the staff
        who make these decisions are expecting exactly these conversations. Every sixth form sets its own
        entry requirements and handles changes its own way, so the answer lives with them, not with any blog
        post. Ring them or go in on the day, or the day after. The same conversation gets harder every week
        you wait, because by mid-September the timetable has set like concrete.
      </P>
      <P>
        And if a grade came in lower in a subject you still want to take, ask the honest question before you
        fight for the place: is this one bad paper, or is the aptitude signal telling me something? Both
        answers are fine. Only one of them should change your list.
      </P>

      <Callout title="For parents: how to help without choosing for them">
        Your job in results week is questions, not answers. Ask the grid questions from step 2, then let your
        child fill them in: which subject would you read about when nobody&apos;s making you? Resist the urge
        to hand down the subjects you loved or the career you wanted, and be wary of pushing a fourth subject
        as &quot;insurance&quot;, because it usually costs more than it protects. Where you can genuinely
        help: be the calm one on results day, drive the practical side of the test-drive in step 4, and get
        familiar with what the next two years ask of them. My{' '}
        <A href="/parents/">free guide for parents</A>{' '}covers how to support without hovering, and{' '}
        <A href="/blog/help-your-child-revise-a-levels/">this guide on helping your child revise</A>{' '}will
        matter more than you expect by Year 12 mocks.
      </Callout>

      <H2 id="commit">Choose, then commit</H2>
      <P>
        One last thing, and it&apos;s the thing I most want you to take from this. The choice matters, which
        is why it deserves an evening of real thought. But once it&apos;s made, <Strong>how you work will
        matter more than what you chose</Strong>. Students with the &quot;wrong&quot; subjects and the right
        study system beat students with the perfect subjects and no system, every year. Start with{' '}
        <A href="/blog/how-to-prepare-for-a-level-exams/">how to prepare for A-level exams</A>{' '}when
        you&apos;re ready to think about that side. And if you want one short, useful email a week through
        sixth form, the kind of thing I wish someone had sent me at 17, join{' '}
        <A href="/newsletter/">The Sunday Session</A>. It&apos;s free, and it starts making sense of Year 12
        before Year 12 starts.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI>
          <A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/03/Notice_to_Centres-Release_of_results_June_2026_FINAL.pdf">
            JCQ notice: release of results, summer 2026 (PDF; GCSE results day Thursday 20 August, from 8am)
          </A>
        </LI>
      </UL>
    </ArticleLayout>
  )
}
