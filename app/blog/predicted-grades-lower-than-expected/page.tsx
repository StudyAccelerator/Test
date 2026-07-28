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

const post = getPost('predicted-grades-lower-than-expected')!

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
    q: 'Can you challenge predicted grades?',
    a: "There's no formal appeal system for predicted grades the way there is for exam results, but they can change right up until your UCAS application is submitted. The route that works is evidence, not argument: ask what the prediction was based on, ask what would need to change for it to be reviewed, then produce that work. Schools review predictions when the new evidence is real and the request is civil.",
  },
  {
    q: 'Can I apply to a course with higher entry requirements than my predicted grades?',
    a: "Yes. UCAS won't stop you, and universities assess the whole application: personal statement, reference, GCSEs and any admissions test, alongside the prediction. Be honest about the trade, though. Predictions below the typical offer lower your chances, especially on competitive courses. Applying above your prediction works best as one aspirational choice among five, with the rest of your list sitting at or below the grades you've actually been given.",
  },
  {
    q: 'When are predicted grades set, and can they change afterwards?',
    a: "Most schools set predictions in September or October of Year 13, built mainly on end-of-Year-12 evidence like summer exams and classwork. They aren't locked until your application is submitted, so they can move in the weeks between. What moves them is new marked evidence: a timed test at a higher standard, or a sustained step up in class, delivered before your school's internal UCAS deadline.",
  },
  {
    q: 'What evidence do teachers need to raise a predicted grade?',
    a: "Work at the standard of the higher grade, produced under conditions they trust. In practice that means a timed test or past paper marked at the new level, plus classwork and homework that hold that standard for several weeks rather than one impressive night. A promise doesn't count, and neither does needing the grade for an offer. Ask each teacher directly what they'd want to see and by when, then produce exactly that.",
  },
  {
    q: 'Should my parents contact the school about my predicted grades?',
    a: "Not as the first move. A complaint from an upset parent lands the same way as an angry email from you: it turns an evidence question into a dispute. The pattern I see work is the student leading the conversation, calmly and with a plan, while parents stay informed and support from home. If the school's own process genuinely wasn't followed, a polite parental query to the head of sixth form is reasonable later.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Don&apos;t email anyone for 48 hours. First find out exactly which assessments your predicted
        grades were built on and what evidence would change them. Then run two routes at once: hand your
        teachers new evidence before your application is submitted, because predictions can move until
        that moment, and build a five-choice UCAS list where at least one typical offer sits at or below
        your current predictions. The deadlines make this urgent: 15 October 2026 for Oxbridge and most
        medicine, 13 January 2027 for most other courses, and your school&apos;s internal deadline earlier
        still.
      </QuickAnswer>

      <Lead>
        You know the email I mean. It arrives in September or October of Year 13, with a subject line so
        bland it could be about the car park. You open it between lessons, scroll past the paragraph about
        references, and there they are: your predicted grades. One of them, maybe two, is lower than the
        grade your whole university list was built around. Your stomach drops, and your first instinct is
        to fire back a reply, or to get your parents to. Don&apos;t. Not yet. I&apos;ve worked with over
        1,000 A-level students, and the ones who end up with better predictions, or better offers, are
        almost never the ones who argued loudest in week one. Here&apos;s the two-week plan instead.
      </Lead>

      <KeyTakeaways
        points={[
          "Predicted grades aren't locked until your UCAS application is submitted. Teachers can and do raise them when new evidence appears.",
          'Spend the first 48 hours gathering information, not sending emails: which assessments set the prediction, and what would change it.',
          'Run both routes at once: produce evidence that moves the prediction, and build an application that still works if it never moves.',
          'You can apply above your prediction, but be honest about the odds: one aspirational choice is strategy, five is a gamble.',
          "The deadlines set your pace: 15 October 2026 for Oxford, Cambridge and most medicine, 13 January 2027 for most other courses, and your school's internal deadlines land earlier.",
        ]}
      />

      <H2 id="the-first-48-hours">The first 48 hours: gather, don&apos;t fire</H2>
      <P>
        The angriest email of the autumn term gets written within an hour of predictions landing, and it
        almost always makes things worse. Here&apos;s why. A prediction is a professional judgement, and
        when you attack the person who made it, they defend it. The conversation stops being about
        evidence and starts being about whether your teacher is fair, and no teacher has ever raised a
        grade to prove they&apos;re fair. So for 48 hours, send nothing.
      </P>
      <P>
        Use that time to get one thing: <Strong>the basis</Strong>. You want to know which assessments the
        prediction was built on, how much each one counted, and what would have to change for it to be
        reviewed. Most predictions are set in September or October of Year 13, leaning heavily on your
        end-of-Year-12 evidence: the summer exams, the last stretch of classwork. That detail matters,
        because a prediction built on June evidence can be outweighed by September and October evidence.
        You can&apos;t outweigh what you haven&apos;t seen.
      </P>
      <P>
        One more thing before the routes. Your parents will want to help, and an email from an upset
        parent lands exactly like an angry email from you. Show them{' '}
        <A href="/blog/predicted-grades-parents-guide/">the parents&apos; guide to predicted grades</A>{' '}
        so everyone at home understands how the system works, then agree that you lead the conversation
        and they back you up from home.
      </P>

      <H2 id="route-one-evidence">Route one: move the prediction with evidence</H2>
      <P>
        Here&apos;s the fact that changes everything: a predicted grade isn&apos;t final when the email
        arrives. It&apos;s final when your application is submitted. Between those two moments it can
        move, and I&apos;ve watched it move plenty of times. What moves it is never a better argument.
        It&apos;s better evidence.
      </P>
      <P>
        Teachers predict what they can defend, so give them something defensible. Marked work at the
        standard of the grade you want. A timed test that looks nothing like June. Homework at a level
        they haven&apos;t seen from you before, sustained over weeks rather than produced once. A
        prediction is a forecast of your final exam performance, and forecasts update when the data
        changes.
      </P>
      <P>
        If weak Year 12 results are what set the low prediction in the first place, start with{' '}
        <A href="/blog/bad-year-12-results-what-now/">what to do after bad Year 12 results</A>, because
        the repair and the evidence are the same work. And for the full playbook on raising a prediction,
        what counts as evidence, how to time it and how to present it, use{' '}
        <A href="/blog/how-to-improve-predicted-grades/">the guide to improving your predicted grades</A>.
        This post is the two-week emergency version. That one is the complete method.
      </P>

      <DiagnosticCTA />

      <H2 id="route-two-strategy">Route two: build an application that works either way</H2>
      <P>
        Now the route almost nobody explains properly. You don&apos;t need permission from your
        predictions to apply anywhere. The entry requirements on a course page describe the offer
        you&apos;d typically get, and universities make decisions on the whole application: your personal
        statement, your reference, your GCSEs, an admissions test where there is one. Students apply above
        their predictions every year, and some of them get offers.
      </P>
      <P>
        I&apos;ll be straight with you, though, because pretending otherwise wastes your choices: applying
        with predictions below a course&apos;s typical offer lowers your odds. Some universities are
        flexible. The most competitive courses mostly aren&apos;t. So the question isn&apos;t whether
        you&apos;re allowed to aim high. It&apos;s how much of your application you&apos;re willing to bet
        on it.
      </P>
      <P>The sane answer is one choice out of five. Here&apos;s the shape:</P>
      <UL>
        <LI>
          <Strong>One aspirational choice.</Strong>{' '}A course whose requirements sit above your
          prediction, where you&apos;d happily accept the longer odds for the upside.
        </LI>
        <LI>
          <Strong>Two or three at your prediction.</Strong>{' '}Courses whose typical offers match the
          grades your teachers have actually written down. This is the core of the list.
        </LI>
        <LI>
          <Strong>At least one below it.</Strong>{' '}A course whose typical offer sits at or below your
          prediction, and, this is the part people skip, one you&apos;d genuinely be happy to attend. A
          safety choice you&apos;d resent isn&apos;t a safety choice.
        </LI>
      </UL>
      <P>
        When your numbers sit on a boundary, the written parts of the application carry more weight. The
        personal statement is now three set questions, and most applicants answer them on autopilot, which
        is exactly why a properly answered one stands out. I&apos;ve broken down how to handle each one
        in{' '}
        <A href="/blog/ucas-personal-statement-three-questions/">
          the guide to the three personal statement questions
        </A>.
      </P>

      <H2 id="the-teacher-script">The teacher conversation, word for word</H2>
      <P>
        This conversation decides route one, so don&apos;t improvise it. The tone you want is curious and
        evidence-led. You&apos;re not there to win the meeting. You&apos;re there to find out exactly what
        winning would take.
      </P>
      <OL>
        <LI>
          <Strong>Book a proper slot.</Strong>{' '}&quot;Could I grab ten minutes this week to talk
          through my prediction?&quot; Corridor conversations get corridor answers.
        </LI>
        <LI>
          <Strong>Open with curiosity, not challenge.</Strong>{' '}&quot;I&apos;m not here to argue with
          the grade. I want to understand what it was based on, because I think I can do better and I want
          to know what better needs to look like.&quot;
        </LI>
        <LI>
          <Strong>Listen, and write it down.</Strong>{' '}Which assessments counted, and how much.
          You&apos;re mapping the evidence you have to replace.
        </LI>
        <LI>
          <Strong>Ask the only question that matters.</Strong>{' '}&quot;What would you need to see from
          me, and by when, for this prediction to be looked at again?&quot;
        </LI>
        <LI>
          <Strong>Agree something concrete and dated.</Strong>{' '}A timed past paper next Friday. The
          class test in three weeks. A specific piece of work, marked. Vague goodwill evaporates. A date
          doesn&apos;t.
        </LI>
        <LI>
          <Strong>Close the loop.</Strong>{' '}&quot;If I get that done by then, will you review the
          prediction before my application goes in?&quot; Now you both know the deal.
        </LI>
      </OL>
      <P>
        And the things that should never leave your mouth: &quot;Everyone else got predicted
        higher.&quot; &quot;My mum thinks it&apos;s unfair.&quot; &quot;But I need an A for my
        offer.&quot; Your need isn&apos;t evidence, and comparisons make it personal. Save the head of
        sixth form for later, and only if the school&apos;s own process genuinely wasn&apos;t followed.
        Going over a teacher&apos;s head in week one burns the relationship that route one depends on.
      </P>

      <H2 id="the-deadlines">The deadlines that set your pace</H2>
      <P>
        How fast you have to run depends on where you&apos;re applying. If your list includes Oxford,
        Cambridge, or most medicine, dentistry and veterinary courses, your whole application is due by
        18:00 on 15 October 2026. Predictions typically land in September, which means route one has a
        window of a few weeks, not a term. The teacher conversation happens in week one. The evidence
        lands in weeks two to four. There is no slack.
      </P>
      <P>
        For most other courses, the equal consideration deadline is 18:00 on 13 January 2027, and that
        changes the game completely: you have most of the autumn term to produce evidence and get
        predictions reviewed before anything is submitted. Applications for 2027 entry can be sent from 1
        September 2026, but nothing says you have to send yours early with predictions you believe are
        wrong.
      </P>
      <Callout title="The deadline that actually bites first">
        Your school&apos;s internal deadline comes before the UCAS one, sometimes by weeks, because staff
        need time to finalise references and predicted grades for every applicant. Find out that date in
        your first conversation back. If you&apos;re on route one, it&apos;s the date your new evidence
        has to exist by.
      </Callout>
      <P>
        The full calendar for 2027 entry, with every date in one place, is in{' '}
        <A href="/blog/ucas-deadlines-2027-entry/">the UCAS deadlines guide</A>.
      </P>

      <H2 id="two-weeks-from-now">Two weeks from now</H2>
      <P>
        Here&apos;s where you should be a fortnight after that email. You know exactly which assessments
        set each prediction. Every teacher whose number you want to move has told you what evidence would
        move it, and you have a dated plan to produce it. Your five choices are shaped so one is a reach,
        most sit level with your predictions, and at least one sits underneath as a genuine yes. That&apos;s
        the whole job. Not one desperate email. Two routes, running at the same time, so that whichever
        way the predictions move, you still end up somewhere worth going.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI>
          <A href="https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications">
            UCAS dates and deadlines for 2027 entry university applications
          </A>
        </LI>
      </UL>
    </ArticleLayout>
  )
}
