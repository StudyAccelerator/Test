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

const post = getPost('how-to-improve-predicted-grades')!

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
    q: 'Can predicted grades be changed after they are set?',
    a: 'Yes — right up until your school submits your UCAS application, teachers can revise predicted grades. Once the application is sent to UCAS, they are locked for that cycle. That is why the window between September and your submission date is so important: it is your last chance to present new evidence.',
  },
  {
    q: 'Do universities ever accept students who miss their predicted grades?',
    a: 'Often, yes. Universities make offers based on predictions but confirm places based on actual results, and many show flexibility if you narrowly miss — especially if you performed well in relevant subjects. But relying on flexibility is a gamble; the far stronger position is a prediction that reflects your genuine ability.',
  },
  {
    q: 'When are A-level predicted grades decided?',
    a: 'Most schools set predicted grades early in the autumn term of Year 13, typically September to October, drawing heavily on end-of-Year-12 exams and early Year 13 assessments. Some schools finalise them as late as their internal UCAS deadline, which gives you a few extra weeks to present evidence.',
  },
  {
    q: 'Can I ask my teacher directly to raise my predicted grade?',
    a: 'You can and should — but bring evidence, not enthusiasm. A polite conversation along the lines of "I want to be predicted an A. What would you need to see from me by October?" turns your teacher into an ally and gives you a concrete target. Teachers respond to marked work, mock results and consistent classwork, not promises.',
  },
  {
    q: 'Do predicted grades matter for medicine and Oxbridge?',
    a: 'Enormously. Medicine, dentistry, veterinary science and Oxbridge applications are submitted by the mid-October deadline, and most medical schools screen applicants against minimum predicted grades (typically AAA) before they even look at the rest of the application. A one-grade difference in a prediction can decide whether your application is read at all.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        You can improve your A-level predicted grades — but only before your school submits your UCAS
        application, and only with evidence. Teachers raise predictions when they see improved marks in mocks
        and assessments, consistently strong classwork, and a credible plan. That evidence takes 6–10 weeks to
        build, which is why the students who succeed start in the summer, not in October.
      </QuickAnswer>

      <Lead>
        Every autumn I speak to students who have just discovered their predicted grades — and are devastated.
        A BBC prediction when they need AAB. A teacher who "played it safe". A UCAS application that suddenly
        looks like it can&apos;t carry the universities they actually want. The good news: predicted grades are not a
        verdict. They are a judgement based on evidence, and evidence can change. The bad news: almost every
        student who tries to change them starts too late.
      </Lead>

      <KeyTakeaways
        points={[
          'Predicted grades are set by your teachers, usually in September–October of Year 13, based mostly on your end-of-Year-12 exams.',
          'They can be changed any time before your school submits your UCAS application — after that, they are locked.',
          <>Teachers need <Strong>evidence</Strong> to raise a prediction: better mock results, resat assessments, and consistent classwork — not promises.</>,
          'The realistic window to build that evidence is the summer holiday plus the first half-term of Year 13.',
          'For medicine, dentistry and Oxbridge (mid-October deadline), the window is even shorter — evidence needs to exist by early October.',
        ]}
      />

      <H2 id="what-predicted-grades-are">What predicted grades actually are (and who decides them)</H2>
      <P>
        A predicted grade is your teacher&apos;s professional judgement of the grade you are <Strong>most likely to
        achieve</Strong> in your final A-level exams. It goes on your UCAS application, and universities use it — alongside
        your GCSEs and personal statement — to decide whether to make you an offer.
      </P>
      <P>
        Teachers don&apos;t pluck these numbers from the air. In most schools the prediction is built from:
      </P>
      <UL>
        <LI>Your <Strong>end-of-Year-12 exams</Strong> — usually the single heaviest factor</LI>
        <LI>Mock exams and in-class assessments through Year 12 and early Year 13</LI>
        <LI>The quality and consistency of your classwork and homework</LI>
        <LI>Your trajectory — whether your marks are climbing, flat, or sliding</LI>
        <LI>The school&apos;s own history — how students with your profile have performed in previous years</LI>
      </UL>
      <P>
        Notice what&apos;s on that list: <Strong>evidence</Strong>. Written, marked, dated evidence. That matters, because it tells
        you exactly what you need to produce if you want the number to move.
      </P>

      <H2 id="can-they-change">Yes, predicted grades can be changed — here&apos;s the deadline that matters</H2>
      <P>
        The single most common myth I hear is "predictions are final once they&apos;re set". They aren&apos;t. Your school
        can revise a predicted grade at any point <Strong>up until your UCAS application is submitted</Strong>. After
        submission, they are fixed for that application cycle.
      </P>
      <P>That creates two very different timelines depending on what you&apos;re applying for:</P>
      <UL>
        <LI>
          <Strong>Medicine, dentistry, veterinary science, Oxford and Cambridge:</Strong> the UCAS deadline is
          mid-October of Year 13. Realistically your school will want everything finalised by early October. Your
          evidence window is the summer holiday plus about four weeks of term.
        </LI>
        <LI>
          <Strong>All other courses:</Strong> the main UCAS equal-consideration deadline is the end of January, and
          many students submit between October and December. You have the whole autumn term — if you use it.
        </LI>
      </UL>
      <Callout title="The trap almost everyone falls into">
        Students hear their predictions in September, feel deflated for a fortnight, and only start acting in
        mid-October — after the school&apos;s internal deadlines have passed or their application has gone in. The
        students who successfully move a prediction decided to act <Strong>before</Strong> the predictions were even
        published, by walking into September with better evidence than they left Year 12 with.
      </Callout>

      <H2 id="what-teachers-need">What actually convinces a teacher to raise a prediction</H2>
      <P>
        Put yourself in your teacher&apos;s position for a moment. Their predictions are tracked. If they predict you an
        A and you get a C, that discrepancy reflects on them and on the school&apos;s credibility with universities. So
        "I&apos;ll work really hard this year, I promise" moves nothing. These four things do:
      </P>
      <OL>
        <LI>
          <Strong>A better mark in a formal assessment.</Strong> The gold standard. If your school runs September or
          October assessments — or lets you resit a Year 12 paper — a jump from a C to an A on real exam questions
          is almost impossible to ignore.
        </LI>
        <LI>
          <Strong>A resit of the exam that caused the low prediction.</Strong> Many schools will let you resit
          end-of-Year-12 papers early in the autumn term if you ask. Most students never ask.
        </LI>
        <LI>
          <Strong>A visible run of strong classwork.</Strong> Four to six weeks of consistently excellent homework,
          test scores and contribution builds the "trajectory" argument — that your Year 12 result was the old you.
        </LI>
        <LI>
          <Strong>A credible plan.</Strong> Teachers take students more seriously when they can see structure: a
          proper revision timetable, targeted work on weak topics, tutoring or structured support in place. It
          signals the improvement will continue rather than being a one-off.
        </LI>
      </OL>

      <H2 id="the-plan">The 8-week plan to raise a predicted grade</H2>
      <P>
        Here is the sequence I walk our students through. It assumes you&apos;re starting in the summer or the first
        days of September — adjust the compression if you&apos;re starting later.
      </P>
      <H3>Weeks 1–2: Find out the rules of the game</H3>
      <UL>
        <LI>Ask each subject teacher (politely, by email if term hasn&apos;t started): <Strong>"What grade are you currently
        planning to predict me, and what would you need to see to predict a grade higher?"</Strong></LI>
        <LI>Find out when your school finalises predictions and whether resits or early assessments are possible.</LI>
        <LI>Get your Year 12 exam papers back and identify exactly where the marks went — by topic, not by paper.</LI>
      </UL>
      <H3>Weeks 2–6: Build the evidence</H3>
      <UL>
        <LI>Target your <Strong>three weakest topics per subject</Strong> — these are where a grade boundary&apos;s worth of
        marks is hiding. Relearn them properly, then drill past-paper questions on them.</LI>
        <LI>Use active recall methods (<A href="/blog/blurting-method-a-level-revision/">blurting</A>, past papers,
        flashcards) rather than re-reading notes — you need marks on paper, and only retrieval practice produces them.</LI>
        <LI>Treat every piece of homework as evidence. It genuinely is: teachers flick back through their mark books
        when deciding predictions.</LI>
      </UL>
      <H3>Weeks 6–8: Convert evidence into a new prediction</H3>
      <UL>
        <LI>Sit the resit or early assessment you arranged in week 1–2.</LI>
        <LI>Book a five-minute conversation with each teacher. Bring the marked work. Ask directly: <Strong>"Based on
        this, would you be willing to predict me an A?"</Strong></LI>
        <LI>If the answer is no, ask what specifically is missing and when they&apos;d be willing to look again — then
        deliver exactly that before the UCAS submission date.</LI>
      </UL>

      <TrackerCTA />

      <H2 id="if-they-wont-move">If your prediction still won&apos;t move</H2>
      <P>
        Sometimes a teacher won&apos;t budge, even with decent evidence. You still have options:
      </P>
      <UL>
        <LI>
          <Strong>Apply strategically.</Strong> Use your five UCAS choices to cover a realistic spread — including at
          least one course whose typical offer sits at or below your prediction.
        </LI>
        <LI>
          <Strong>Remember that offers are conditional on results, not predictions.</Strong> Your real leverage is
          August. Students outperform pessimistic predictions every single year, and Clearing and adjustment exist
          for exactly that reason.
        </LI>
        <LI>
          <Strong>Ask about the reference.</Strong> Even if the number stays put, teachers can add context to your
          UCAS reference — an upward trajectory, extenuating circumstances, a strong recent performance. Admissions
          tutors do read it.
        </LI>
      </UL>

      <H2 id="the-real-lesson">The uncomfortable truth about predicted grades</H2>
      <P>
        When I was doing my A-levels, I noticed something that has been confirmed a hundred times since I started
        teaching: the students with the strongest predictions weren&apos;t usually the cleverest in the room. They were
        the ones who treated Year 12 exams — and the first term of Year 13 — as the real thing, while everyone else
        saved their effort for "the exams that count".
      </P>
      <P>
        By the time most students start working seriously, the two numbers that shape their university options —
        GCSE results and predicted grades — have already been written down. If you&apos;re reading this in the summer or
        early autumn, you are, right now, in the last window where that second number is still yours to change.
      </P>

      <CourseCTA
        heading="Want your predictions to take care of themselves?"
        body="Our small-group A-level courses in Biology, Chemistry, Maths and Physics are built around exactly this: mastering the high-mark topics and exam technique that move real assessment results — which is what moves predictions. Taught by subject specialists and led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
