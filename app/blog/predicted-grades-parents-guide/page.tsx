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

const post = getPost('predicted-grades-parents-guide')!

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
    q: 'Who sets predicted grades for A-levels?',
    a: "Your child's subject teachers each propose a grade, and the school then moderates them, usually through the head of department or head of sixth form, before they go to UCAS with the reference. It's a professional judgement built on evidence: end-of-Year-12 exams and mocks mostly, plus classwork, homework and what teachers see in lessons. No single person plucks the number from the air, which is also why no single conversation can change it.",
  },
  {
    q: 'When are predicted grades set?',
    a: "Typically in September or October of Year 13, once teachers have seen how students come back from the summer. The evidence behind them is mostly how Year 12 ended, plus the first weeks of the new term. Students applying for Oxford, Cambridge, medicine, dentistry or veterinary courses face a mid-October application deadline, so their predictions settle earlier still. That's why the summer and early September carry so much weight.",
  },
  {
    q: 'Can a parent get a predicted grade changed?',
    a: "Not by asking for it directly, and pushing usually backfires: a teacher who feels pressured has to defend the existing number, and positions harden. What genuinely moves predictions is new evidence, delivered early. That means the student producing work in the first weeks of term that looks better than June did, and asking each teacher what specifically would justify a higher grade. Parents shape the conditions; students supply the evidence.",
  },
  {
    q: 'What evidence do teachers use to set predicted grades?',
    a: "Mostly the end-of-Year-12 record: internal exams, mocks, assessed classwork and homework across the year. Consistency in lessons feeds in too, and so does the start of Year 13, because predictions are usually written a few weeks into the autumn term. Teachers are careful with the number because their accuracy is tracked year on year, and a school that over-predicts loses credibility with the universities reading its forms.",
  },
  {
    q: "What if my child's predicted grades are too low for their chosen course?",
    a: "First, check whether the prediction can still move: many schools will revisit a grade if strong new evidence appears before the application is submitted. If it can't, the choice is between applying anyway to one or two ambitious courses while keeping realistic options on the list, or adjusting the shortlist. Either way, treat the number as information about how your child is currently revising, because that's the part that can genuinely change.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Predicted grades are set by your child&apos;s subject teachers, usually in September or October of
        Year 13, then checked by the school before they go to UCAS. They&apos;re built mostly on
        end-of-Year-12 evidence, and they decide which university courses will take the application
        seriously. You can&apos;t negotiate the number. What you can do is shape the evidence it&apos;s built
        from: the summer, the first weeks of term, and the questions your child asks each teacher.
      </QuickAnswer>

      <Lead>
        The email from school lands on a weekday afternoon. Your child opens it at the kitchen table, and
        one of the numbers is lower than anyone had discussed. An A where every conversation had been
        about A*, or a C where the reports all said B. Your first instinct is to reply to the teacher and
        ask them to explain themselves. Hold that instinct, because it&apos;s usually the one move that makes
        things worse. I&apos;ve worked with over 1,000 A-level students, and behind many of them is a parent
        who was never told how predicted grades actually work. This is the explanation the school never
        sends home.
      </Lead>

      <KeyTakeaways
        points={[
          'Subject teachers propose the prediction; the school moderates it before it reaches the UCAS form.',
          'Predictions are typically written in September or October of Year 13, built mostly on how Year 12 ended.',
          'Teachers are cautious on purpose: their accuracy is tracked, and a school that over-predicts loses credibility with universities.',
          'The prediction decides which courses will consider the application, so it shapes the shortlist before a single real exam is sat.',
          'You can protect the evidence window and keep home calm. You cannot negotiate, and demanding a higher number usually hardens it.',
        ]}
      />

      <H2 id="who-sets-them">Who actually sets predicted grades?</H2>
      <P>
        Each of your child&apos;s subject teachers proposes a grade: their honest professional judgement of
        what this student is likely to achieve next summer. Those proposals are then moderated inside the
        school, usually by the head of department and the head of sixth form, before they&apos;re entered on
        the UCAS form alongside the reference. So the number your child brings home has already been
        through at least two pairs of hands. It isn&apos;t one teacher&apos;s mood on a bad day, and it isn&apos;t a
        clerical guess.
      </P>
      <P>
        The evidence behind it is mostly <Strong>how Year 12 ended</Strong>: the internal exams or mocks,
        assessed classwork, homework across the year, and what the teacher saw in lessons week after week.
        A brilliant fortnight in September helps, but it&apos;s weighed against a whole year of record.
      </P>
      <P>
        Here&apos;s the part parents rarely hear. Teachers are cautious with predictions <Strong>because
        their accuracy is tracked</Strong>. Every summer, the grades a school predicted get compared with
        the grades its students actually achieved, and universities notice the schools whose forms
        consistently promise more than they deliver. The official guidance asks for predictions that are
        &quot;aspirational but achievable&quot;, and most teachers read that conservatively, because
        over-prediction spends the school&apos;s credibility. The practical consequence for your child: the
        benefit of the doubt isn&apos;t the default. It has to be earned with evidence.
      </P>

      <H2 id="the-calendar">When are they set? The calendar nobody shows you</H2>
      <P>
        The single biggest deposit of evidence is made in the summer term of Year 12, when the
        end-of-year exams are sat. If those went well, the prediction largely writes itself. If they went
        badly, nothing is finished, but the clock is now running: predictions are typically written in{' '}
        <Strong>September or October of Year 13</Strong>, just a few weeks after term starts.
      </P>
      <P>
        That makes the summer holiday a quietly open window. A student who repairs their weakest topics in
        August walks into September able to produce work that looks different from June, and teachers do
        notice. I&apos;ve written a full guide to that repair in{' '}
        <A href="/blog/bad-year-12-results-what-now/">what to do after bad Year 12 results</A>, and the
        first weeks of term are the second half of the same window: the first homework done properly,
        answers volunteered in class, a September assessment that breaks the Year 12 pattern.
      </P>
      <P>
        One group has even less time. If your child is applying for Oxford, Cambridge, medicine, dentistry
        or veterinary science, the whole application is due in mid-October, so their predictions are
        settled earlier still. For those students, the summer isn&apos;t preparation. It&apos;s the deadline.
      </P>
      <Callout title="The window in one line">
        The number is written in October, but it&apos;s earned in June, over the summer, and in the first
        three weeks of September. Everything a family can usefully do happens inside that window.
      </Callout>

      <H2 id="what-they-decide">What do predicted grades actually decide?</H2>
      <P>
        Predictions never appear on the final certificate, and admissions tutors know they&apos;re estimates.
        What they decide is <Strong>which courses will consider the application at all</Strong>. When a
        course asks for AAB and the form says BBC, most admissions teams filter the application out before
        a human reads the personal statement. So the prediction doesn&apos;t determine your child&apos;s results.
        It determines their shortlist, months before a single real exam is sat.
      </P>
      <P>
        That&apos;s why an under-prediction stings: it quietly shrinks the list of courses your child can
        realistically apply to. If that&apos;s where you already are, I&apos;ve covered the decisions that follow
        in{' '}
        <A href="/blog/predicted-grades-lower-than-expected/">what to do when predicted grades come in lower than expected</A>, including when to apply ambitiously anyway.
      </P>

      <H2 id="your-role">Your role: what you can influence, and what you can&apos;t</H2>
      <P>
        Parents have real influence here. It just isn&apos;t where most parents point it.
      </P>
      <UL>
        <LI>
          <Strong>The evidence window.</Strong>{' '}You can make sure the summer repair actually happens:
          not by standing over the desk, but by agreeing a routine, protecting it from a holiday that
          swallows August whole, and asking about topics rather than hours. I&apos;ve set out what useful
          support looks like in{' '}
          <A href="/blog/help-your-child-revise-a-levels/">how to help your child revise</A>{' '}without
          becoming the enemy.
        </LI>
        <LI>
          <Strong>Logistics and calm.</Strong>{' '}September runs on sleep, food, a quiet place to work and
          an absence of drama. A calm house in the first three weeks of term is worth more than any
          strongly worded email to the school. Your child is trying to show teachers a new version of
          themselves; they can&apos;t do that from the middle of a row about revision.
        </LI>
        <LI>
          <Strong>The right question, asked by the right person.</Strong>{' '}The single most effective move
          is your child asking each teacher, one to one: &quot;What would you need to see from me to
          predict a grade higher, and by when?&quot; That question turns a fixed number into a checklist,
          and it tells the teacher this student is serious. Your job is to make sure it gets asked. It
          lands far better from the student than from you.
        </LI>
      </UL>
      <P>
        And the thing you can&apos;t do: <Strong>negotiate</Strong>. A parent demanding a higher prediction
        almost always hardens the teacher&apos;s position, because the teacher now has to defend the number
        rather than reconsider it, and the moderation process exists precisely so that one uncomfortable
        conversation can&apos;t move a grade. Pressure changes the relationship. Evidence changes the number.
      </P>

      <H2 id="the-script">The parents&apos; evening script that works</H2>
      <P>
        Go in curious, not adversarial. The goal of the conversation is information, because information
        is the thing you can act on. Four questions do the job:
      </P>
      <UL>
        <LI>&quot;How was the prediction arrived at? Which pieces of evidence carried the most weight?&quot;</LI>
        <LI>&quot;What would need to change for it to move, and when is the last realistic point it could be revisited?&quot;</LI>
        <LI>&quot;What specifically would you want to see over the next three weeks?&quot;</LI>
        <LI>&quot;Is there anything we can do at home that would help?&quot;</LI>
      </UL>
      <P>
        Notice what&apos;s missing: any sentence that begins &quot;We think the grade should be...&quot;. The
        teacher leaves that meeting as your ally, holding a shared plan, and your child follows up by
        doing the things that were named. The student side of that playbook, week by week, is in{' '}
        <A href="/blog/how-to-improve-predicted-grades/">how to improve predicted grades</A>. Read it
        together if you can.
      </P>

      <H2 id="useful-information">When a low prediction is useful information</H2>
      <P>
        Sometimes a prediction is stale: built on one bad week in June that no longer describes the
        student. But sometimes it&apos;s an honest measurement, and that&apos;s worth taking seriously. If your
        child works hard, genuinely hard, and the number still came back low, the problem is almost never
        effort and rarely intelligence. It&apos;s usually the method: revision that produces familiarity
        instead of recall, hours that feel productive and leak marks. A low prediction from a hardworking
        student is a signal that something in the system needs fixing, and fixing it matters far more than
        the number itself, because the same leak will otherwise turn up in the real exams.
      </P>
      <P>
        Find the cause before you pay for a cure. Tutoring hours pointed at the wrong problem change
        nothing except the invoice.
      </P>

      <DiagnosticCTA audience="parent" />

      <P>
        One last thing. If you want the wider picture, the questions to ask, the tiers of support, what to
        do at each stage of the year, it&apos;s all in the{' '}
        <A href="/parents/">free parents&apos; guide</A>. And any questions, just message me. I&apos;m always
        happy to talk it through.
      </P>
    </ArticleLayout>
  )
}
