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
  DiagnosticCTA,
  CourseCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('is-a-level-tutoring-worth-it')!

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
    q: 'Is A-level tutoring worth the money?',
    a: "It depends entirely on what the tutoring is for. Paying to close a genuine knowledge gap, coach exam technique from mark schemes, or add accountability a student can't build alone is usually money well spent. Paying for a weekly hour of re-explaining while the student's revision method stays the same rarely changes grades. Name the specific problem first, then judge any tutor or programme by whether it targets that problem.",
  },
  {
    q: 'When should you get a tutor for A-levels?',
    a: "As soon as a specific problem has a name, and ideally before the spring panic. The classic trigger points are a topic that never recovered after illness or absence, mock results that show marks leaking to exam technique rather than knowledge, and the start of a resit year. Buying tutoring in October to fix a named gap beats buying it in March to calm everyone down. If nobody can say what the tutor is for yet, work that out first.",
  },
  {
    q: 'Do A-level students need a tutor to get top grades?',
    a: "No. Every year students earn A and A* grades with no tutoring at all, using past papers, mark schemes and a revision method built on active recall. What top grades genuinely require is the right method plus honest self-testing, and both are free. A tutor speeds things up when there's a specific gap or the student needs outside accountability, but tutoring is an accelerator, never a requirement.",
  },
  {
    q: 'How much does A-level tutoring cost in the UK?',
    a: "Published rates as of July 2026: MyTutor lists 1:1 lessons from £26 an hour, and Tutorful's price guide puts the average A-level rate at £41.95 an hour, so a weekly hour runs to roughly £1,250 over a 30-week school year. Intensive courses such as Justin Craig's sit around £675 to £1,595. Small-group programmes cost less per hour: our own 12-week Subject Accelerators are £339 for one subject.",
  },
  {
    q: "What are the signs tutoring isn't working?",
    a: "The student understands everything in the session but the test marks don't move. Nothing happens between sessions because no work is set or checked. The sessions drift through the syllabus instead of targeting named weak topics. And there's no agreed checkpoint, so nobody can say what improvement was expected by when. If two of those are true after a half term, pause and work out what the actual problem is before paying for another block of lessons.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        A-level tutoring is worth it when it fixes a named problem: a genuine knowledge gap in a specific
        topic area, missing exam technique, or accountability the student can&apos;t build alone. It&apos;s not
        worth it when the real problem is revision method and the tutoring is an hour a week of comfortable
        re-explaining. Before paying anyone, work out which tier is failing (knowledge, recall, application
        or exam mastery), then match the help to that tier.
      </QuickAnswer>

      <Lead>
        Here&apos;s a confession my accountant would rather I kept quiet. I sell tutoring for a living, and
        I&apos;m about to talk you out of buying some of it. A decent share of the tutoring bought in this
        country every autumn changes nothing except the family bank balance, and after working with over
        1,000 A-level students I can usually tell in advance which kind a family is about to buy. So before
        any money moves, let&apos;s work out whether tutoring is the right purchase at all. And if it is,
        which kind.
      </Lead>

      <KeyTakeaways
        points={[
          "Tutoring is worth paying for when it targets a named problem. It's the most expensive way in education to re-explain content a student never practises.",
          "Three signs it won't be worth it: passive re-explaining, no work between sessions, and content teaching when the real gap is exam technique.",
          "Four signs it will be: a genuine knowledge gap in a specific topic area, accountability home can't provide, mark-scheme coaching, or a resit year that needs structure.",
          'Match the format to the problem: 1:1 for targeted gaps, small groups for accountability at a lower cost, free tools where the discipline already exists.',
          'Do the total spend maths before committing. A weekly hour at typical UK rates runs into four figures across a school year.',
        ]}
      />

      <H2 id="not-worth-it">Start with the uncomfortable half: when tutoring is not worth it</H2>
      <P>
        A quick note first. It&apos;s usually a parent paying, so I&apos;ve written this for you, but if
        you&apos;re the student, every word applies. Just swap &apos;your child&apos; for &apos;you&apos;.
      </P>
      <P>
        Nobody selling tutoring opens with this part, so I will. There are three situations where tutoring,
        including mine, is a poor use of your money. They also happen to be the three most common
        situations I see.
      </P>

      <H3>1. The problem is method, and the tutoring is re-explaining</H3>
      <P>
        This is the big one. A student who works hard but revises by re-reading and highlighting
        doesn&apos;t have a content problem. They have a method problem. Hand that student a tutor and the
        sessions become an hour of being talked through material they&apos;d half met before. It feels
        productive. The student nods, the tutor explains beautifully, everyone leaves happier. Then the
        next test comes back the same, because nothing has changed about how the student studies for the
        other 167 hours of the week. Passive re-explaining is comfortable, expensive, and changes very
        little. If your child is already putting the hours in and the grades still aren&apos;t moving,
        read{' '}
        <A href="/blog/working-hard-grades-not-improving/">why working hard isn&apos;t moving the grades</A>{' '}
        before you spend a penny, because the fix there costs nothing.
      </P>

      <H3>2. The student won&apos;t do anything between sessions</H3>
      <P>
        Tutoring is one hour a week. Learning happens in the practice between the hours. If the student
        won&apos;t attempt questions, finish set work, or open the subject between sessions, the tutor
        becomes the only revision of the week, and one hour a week doesn&apos;t outrun six days of nothing.
        I&apos;d love to tell you a great tutor fixes this. Occasionally one does, through sheer force of
        accountability. Usually the sessions turn into a weekly performance of understanding, and the exam
        eventually asks for what was never practised. Exams test recall, not recognition, and recall is
        built between sessions or not at all.
      </P>

      <H3>3. The gap is exam technique, but the tutor teaches content</H3>
      <P>
        Look at a recent marked paper before you buy anything. If the marks are going missing to timing,
        misread command words, and answers that say true things the mark scheme doesn&apos;t pay for, then
        your child doesn&apos;t need the syllabus explained again. They need someone who works from mark
        schemes and examiner reports. Plenty of tutors, including genuinely excellent subject experts,
        default to teaching content because it&apos;s what they know. Buying content teaching for a
        technique problem is buying the wrong product entirely, however good the teaching is.
      </P>

      <Callout title="If it feels bigger than a plateau">
        If you&apos;re here because grades have collapsed rather than stalled, tutoring is not the first
        move. I&apos;ve written a calmer, step-by-step plan for exactly that situation in{' '}
        <A href="/blog/my-child-is-failing-a-levels/">my child is failing A-levels</A>. Read that first: it
        will tell you whether tutoring even makes the list right now.
      </Callout>

      <H2 id="worth-it">When tutoring genuinely earns its cost</H2>
      <P>
        Now the other half, because tutoring absolutely can be worth every pound. Four situations where it
        earns its keep:
      </P>
      <UL>
        <LI>
          <Strong>A genuine knowledge gap in a specific topic area.</Strong>{' '}Six weeks of term lost to
          illness, a module taught badly, a topic that never went in. Targeted teaching closes a defined
          gap faster than anything else a family can buy, and this is where good 1:1 is at its best.
        </LI>
        <LI>
          <Strong>Accountability that home can&apos;t provide.</Strong>{' '}Some students will produce work
          for an outside adult in a way they never will for a parent. A standing weekly session, set work,
          someone checking. That&apos;s a real, purchasable thing, and for some families it&apos;s the whole
          value of tutoring.
        </LI>
        <LI>
          <Strong>Mark-scheme and exam-technique coaching.</Strong>{' '}A tutor who sits down with past
          papers and examiner reports and teaches how marks are actually awarded is buying marks directly.
          This is the highest-yield help at A-level and weirdly the least bought.
        </LI>
        <LI>
          <Strong>A resit year that needs structure.</Strong>{' '}A student resitting outside school has to
          be their own teacher, timetabler and examiner for a year. Paying for structure, pacing and honest
          testing is often the difference between a resit that changes the grade and one that repeats it.
        </LI>
      </UL>
      <P>
        Notice what all four have in common. Each one names the problem before it names the product.
        That&apos;s the entire trick to this decision.
      </P>

      <H2 id="tier-logic">The tier logic: match the help to the failing tier</H2>
      <P>
        Grades are built in four tiers. <Strong>Knowledge</Strong>: is the content in there?{' '}
        <Strong>Recall</Strong>: can they get it out on a blank page? <Strong>Application</Strong>: can
        they use it on an unfamiliar question? <Strong>Exam mastery</Strong>: can they perform all of that
        under timed conditions, in the shape the mark scheme rewards? Every struggling student is stuck at
        one of these, and the reason so much tutoring disappoints is that it&apos;s a knowledge-tier product
        applied to every tier.
      </P>
      <P>
        A knowledge gap? Tutoring works brilliantly. A recall failure, where they knew it the night before
        and lost it in the test? That&apos;s fixed by changing how they revise, active recall instead of
        re-reading, and no amount of explanation fixes it, because being told something again is
        recognition, and exams don&apos;t pay for recognition. Application and exam mastery? Tutoring works
        if, and only if, the tutor coaches from real exam questions and mark schemes. So the question is
        never &quot;is tutoring worth it?&quot; in the abstract. It&apos;s &quot;which tier is failing, and
        does this particular tutoring target that tier?&quot;
      </P>
      <P>
        If you can&apos;t yet tell which tier your child is stuck at, that&apos;s normal. From the outside
        they all look identical: hours going in, marks not coming out.
      </P>

      <DiagnosticCTA audience="parent" />

      <H2 id="formats">The three formats, honestly compared</H2>

      <H3>One-to-one</H3>
      <P>
        Best at closing targeted gaps, because the whole hour bends around one student&apos;s exact
        sticking points. Also the dearest option. Published rates as of July 2026: MyTutor lists lessons
        from £26 an hour, and Tutorful&apos;s price guide puts the average A-level rate at £41.95 an hour.
        Whether 1:1 actually moves grades, and how to run it so it does, is its own question, and
        I&apos;ve answered it properly in{' '}
        <A href="/blog/one-to-one-a-level-tutoring/">does one-to-one tutoring work at A-level</A>, so I
        won&apos;t repeat it here. This article is about whether to buy tutoring at all.
      </P>

      <H3>Small group</H3>
      <P>
        A small group trades some personal attention for accountability at a lower price: the scheduled
        session, the set work, the pull of other students, with the cost of the teacher split across the
        group. It suits the student who needs the structure of a weekly commitment more than they need
        forty minutes on one personal sticking point. It&apos;s also the format I sell, so weigh my bias:
        our 12-week Subject Accelerators are £339 for one subject, which is roughly eight hours of 1:1 at
        the average UK rate. The logic holds either way.
      </P>

      <H3>Self-serve and free tools</H3>
      <P>
        Then there&apos;s the option nobody selling tutoring mentions: not buying any. Past papers and mark
        schemes are free. So are the tools we build, like the{' '}
        <A href="/revision-tracker/">revision tracker</A>{' '}that plans the week around the weakest
        topics. The honest catch is discipline. If your child can run a system without an adult attached,
        start free and keep your money. If they can&apos;t, that missing discipline is itself the problem
        you&apos;d be paying to fix, and the format that fixes it is the one with scheduled sessions in it.
      </P>

      <H2 id="before-you-pay">What to ask before you pay anyone</H2>
      <P>Five questions. Put them to any tutor, any company, any programme. Including mine.</P>
      <OL>
        <LI>
          <Strong>What exactly are we paying to fix?</Strong>{' '}If the answer is &quot;general
          support&quot; or &quot;consolidating understanding&quot;, that&apos;s a subscription to feeling
          better. Keep your money until someone names the gap.
        </LI>
        <LI>
          <Strong>What happens between sessions, and who checks it?</Strong>{' '}No set work between
          sessions means you&apos;re renting an explainer, and the needle won&apos;t move.
        </LI>
        <LI>
          <Strong>Do you teach from mark schemes and past papers, or from the textbook?</Strong>{' '}For
          most A-level students the marks are lost at the exam end, so this answer matters more than the
          tutor&apos;s degree.
        </LI>
        <LI>
          <Strong>When will we review whether it&apos;s working?</Strong>{' '}Agree a checkpoint, a real
          test or mock after a half term, and agree in advance what &quot;working&quot; looks like.
        </LI>
        <LI>
          <Strong>What&apos;s the total spend?</Strong>{' '}A weekly hour at Tutorful&apos;s average
          A-level rate of £41.95 comes to roughly £1,250 across a 30-week school year. Intensive courses
          such as Justin Craig&apos;s run about £675 to £1,595. Neither is wrong. But run the number for
          the whole year, then ask whether that budget, pointed at the actual failing tier, would buy
          something better.
        </LI>
      </OL>
      <P>
        There&apos;s a longer version of this checklist, with the red flags and the questions tutors hate,
        in{' '}
        <A href="/blog/how-to-choose-an-a-level-tutor/">how to choose an A-level tutor</A>, and a full
        breakdown of UK prices in{' '}
        <A href="/blog/a-level-tutor-cost-uk/">the A-level tutor cost guide</A>.
      </P>

      <H2 id="bottom-line">The honest bottom line</H2>
      <P>
        Is A-level tutoring worth it? Matched to a named problem: yes, and it can be some of the best money
        a family ever spends on education. Bought as reassurance: it&apos;s an expensive way to feel like
        something is being done, and I&apos;d rather you didn&apos;t buy it, even from me. Name the problem
        first. Match the format to the failing tier. Set a review point. Do those three things and
        whichever way you decide, the decision will be sound.
      </P>
      <P>Any questions, just message me. I&apos;m always happy to talk it through.</P>

      <CourseCTA
        href="/subject-accelerators"
        heading="If a small group turns out to be the right fit"
        body="Our 12-week Subject Accelerators run live small-group classes in Biology, Chemistry and Maths from £339 a subject: structured teaching, mark-scheme coaching and weekly accountability, led by Dr Waleed Ahmad, MBBS. No rush. Name the problem first, then have a look."
        label="See the Subject Accelerators"
      />
    </ArticleLayout>
  )
}
