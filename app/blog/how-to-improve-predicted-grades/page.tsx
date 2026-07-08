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
    q: "Can predicted grades be changed after they're set?",
    a: "Yes. Right up until your school submits your UCAS application, your teachers can revise your predicted grades. Once the application goes off to UCAS, they're locked for that cycle. So the window between September and your submission date really matters. It's your last chance to show new evidence.",
  },
  {
    q: 'Do universities ever accept students who miss their predicted grades?',
    a: "Often, yes. Universities make offers based on predictions but confirm places based on your actual results, and plenty of them show flexibility if you narrowly miss, especially if you did well in the subjects that matter for the course. But relying on that's a gamble. You're in a much stronger position with a prediction that reflects what you can actually do.",
  },
  {
    q: 'When are A-level predicted grades decided?',
    a: 'Most schools set predicted grades early in the autumn term of Year 13, usually September to October. They lean heavily on your end of Year 12 exams and your first few weeks back. Some schools finalise them as late as their internal UCAS deadline, which buys you a few extra weeks to show evidence.',
  },
  {
    q: 'Can I ask my teacher directly to raise my predicted grade?',
    a: "You can, and you should. But bring evidence, not enthusiasm. Something like \"I want to be predicted an A. What would you need to see from me by October?\" turns your teacher into an ally and gives you a concrete target. Teachers respond to marked work, mock results and consistent classwork. They don't respond to promises.",
  },
  {
    q: 'Do predicted grades matter for medicine and Oxbridge?',
    a: 'Massively. Medicine, dentistry, veterinary science and Oxbridge applications go in by the mid-October deadline, and most medical schools screen applicants against minimum predicted grades (typically AAA) before they even read the rest of the application. One grade on a prediction can decide whether your application gets looked at.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        You can improve your A-level predicted grades, but only before your school submits your UCAS
        application, and only with evidence. Teachers raise predictions when they see better marks in mocks and
        assessments, consistently strong classwork, and a proper plan. That evidence takes 6 to 10 weeks to
        build. The students who pull it off start in the summer, not in October.
      </QuickAnswer>

      <Lead>
        Every autumn I speak to students who have just found out their predicted grades, and they&apos;re gutted.
        A BBB prediction when they need AAB. A teacher who played it safe. A UCAS application that suddenly
        can&apos;t carry the universities they actually want. Here&apos;s the good news: a predicted grade isn't a
        verdict. It&apos;s a judgement based on evidence, and evidence can change. The bad news? Almost every
        student who tries to change it starts too late.
      </Lead>

      <KeyTakeaways
        points={[
          'Your teachers set your predicted grades, usually in September or October of Year 13, based mostly on your end of Year 12 exams.',
          "They can be changed any time before your school submits your UCAS application. After that, they're locked.",
          'Teachers need evidence to raise a prediction. Better mock results, resat assessments, consistent classwork. Not promises.',
          "Realistically you've the summer holiday plus the first half term of Year 13 to build that evidence.",
          'Applying for medicine, dentistry or Oxbridge? The deadline is mid-October, so your evidence needs to exist by early October.',
        ]}
      />

      <H2 id="what-predicted-grades-are">What predicted grades actually are, and who decides them</H2>
      <P>
        A predicted grade is your teacher&apos;s professional judgement of the grade you&apos;re most likely to get in
        your final exams. It goes on your UCAS application, and universities use it, alongside your GCSEs and
        personal statement, to decide whether to make you an offer.
      </P>
      <P>
        Now, teachers don&apos;t pluck these numbers out of thin air. In most schools the prediction comes from:
      </P>
      <UL>
        <LI>Your end of Year 12 exams. Usually the single biggest factor.</LI>
        <LI>Mock exams and class assessments through Year 12 and early Year 13.</LI>
        <LI>How consistent your classwork and homework have been.</LI>
        <LI>Your trajectory. Are your marks climbing, flat, or sliding?</LI>
        <LI>The school&apos;s own history with students like you in previous years.</LI>
      </UL>
      <P>
        Look at that list again. Every single thing on it is written, marked, dated evidence. That matters,
        because it tells you exactly what you need to produce if you want the number to move.
      </P>

      <H2 id="can-they-change">Yes, predicted grades can be changed. Here&apos;s the deadline that matters</H2>
      <P>
        The most common myth I hear is that predictions are final once they&apos;re set. They aren&apos;t. Your school
        can revise a predicted grade at any point up until your UCAS application is submitted. After
        submission, they&apos;re fixed for that cycle.
      </P>
      <P>That creates two very different timelines depending on what you&apos;re applying for:</P>
      <UL>
        <LI>
          Medicine, dentistry, veterinary science, Oxford and Cambridge: the UCAS deadline is mid-October of
          Year 13. Realistically your school wants everything finalised by early October. Your evidence window
          is the summer holiday plus about four weeks of term. That&apos;s it.
        </LI>
        <LI>
          Everything else: the main UCAS deadline is the end of January, and most students submit somewhere
          between October and December. You&apos;ve got the whole autumn term. If you use it.
        </LI>
      </UL>
      <Callout title="The trap almost everyone falls into">
        Students hear their predictions in September, feel deflated for a fortnight, and only start acting in
        mid-October. By then the school&apos;s internal deadlines have passed or the application has already gone
        in. The students who actually move a prediction decided to act before the predictions were even
        published. They walked into September with better evidence than they left Year 12 with.
      </Callout>

      <H2 id="what-teachers-need">What actually convinces a teacher to raise a prediction</H2>
      <P>
        Put yourself in your teacher&apos;s shoes for a second. Their predictions get tracked. If they predict you
        an A and you get a C, that reflects on them and on the school&apos;s credibility with universities. So
        &quot;I&apos;ll work really hard this year, I promise&quot; moves nothing. These four things do:
      </P>
      <OL>
        <LI>
          A better mark in a formal assessment. This is the gold standard. If your school runs September or
          October assessments, or lets you resit a Year 12 paper, jumping from a C to an A on real exam
          questions is almost impossible to ignore.
        </LI>
        <LI>
          A resit of the exam that caused the low prediction. Many schools will let you resit end of Year 12
          papers early in the autumn term if you ask. Most students never ask.
        </LI>
        <LI>
          A visible run of strong classwork. Four to six weeks of consistently excellent homework and test
          scores builds the trajectory argument: that your Year 12 result was the old you.
        </LI>
        <LI>
          A proper plan. Teachers take you more seriously when they can see structure. A real revision
          timetable, targeted work on your weak topics, extra support in place. It tells them the improvement
          will continue rather than being a one-off.
        </LI>
      </OL>

      <H2 id="the-plan">The 8-week plan to raise a predicted grade</H2>
      <P>
        This is the sequence I walk our students through. It assumes you&apos;re starting in the summer or the
        first days of September. Starting later? Compress it, but the order stays the same.
      </P>
      <H3>Weeks 1 to 2: Find out the rules of the game</H3>
      <UL>
        <LI>Ask each subject teacher, politely: &quot;What grade are you currently planning to predict me, and what
        would you need to see to predict a grade higher?&quot; Email works if term hasn&apos;t started.</LI>
        <LI>Find out when your school finalises predictions, and whether resits or early assessments are possible.</LI>
        <LI>Get your Year 12 papers back and work out exactly where the marks went. By topic, not by paper.</LI>
      </UL>
      <H3>Weeks 2 to 6: Build the evidence</H3>
      <UL>
        <LI>Target your three weakest topics per subject. That&apos;s where a grade boundary&apos;s worth of marks is
        hiding. Relearn them properly, then drill past paper questions on them.</LI>
        <LI>Use active recall (<A href="/blog/blurting-method-a-level-revision/">blurting</A>, past papers,
        flashcards) rather than re-reading your notes. You need marks on paper, and only testing yourself
        produces them.</LI>
        <LI>Treat every piece of homework as evidence. Because it is. Teachers flick back through their mark
        books when they decide predictions.</LI>
      </UL>
      <H3>Weeks 6 to 8: Turn the evidence into a new prediction</H3>
      <UL>
        <LI>Sit the resit or early assessment you arranged back in week 1.</LI>
        <LI>Book five minutes with each teacher. Bring the marked work. Ask directly: &quot;Based on this, would you
        be willing to predict me an A?&quot;</LI>
        <LI>If the answer is no, ask what specifically is missing and when they&apos;d look again. Then deliver
        exactly that before the UCAS submission date.</LI>
      </UL>

      <TrackerCTA />

      <H2 id="if-they-wont-move">If your prediction still won&apos;t move</H2>
      <P>
        Sometimes a teacher won&apos;t budge, even with decent evidence. You still have options:
      </P>
      <UL>
        <LI>
          Apply strategically. Use your five UCAS choices to cover a realistic spread, including at least one
          course whose typical offer sits at or below your prediction.
        </LI>
        <LI>
          Remember that offers are conditional on results, not predictions. August is where your real power is.
          Students beat pessimistic predictions every single year, and Clearing exists for exactly that reason.
        </LI>
        <LI>
          Ask about the reference. Even if the number stays put, teachers can add context to your UCAS
          reference: an upward trajectory, extenuating circumstances, a strong recent performance. Admissions
          tutors do read it.
        </LI>
      </UL>

      <H2 id="the-real-lesson">The uncomfortable truth about predicted grades</H2>
      <P>
        When I was doing my A-levels, I noticed something that has been confirmed to me a hundred times since I
        started teaching. The students with the strongest predictions weren&apos;t usually the cleverest in the
        room. They were the ones who treated Year 12 exams and the first term of Year 13 as the real thing,
        while everyone else saved their effort for &quot;the exams that count&quot;.
      </P>
      <P>
        By the time most students start working seriously, the two numbers that shape their university options
        have already been written down: their GCSE results and their predicted grades. If you&apos;re reading this
        in the summer or early autumn, you&apos;re in the last window where that second number is still yours to
        change. Use it.
      </P>

      <CourseCTA
        heading="Want your predictions to take care of themselves?"
        body="Our small-group A-level courses in Biology, Chemistry, Maths and Physics are built around exactly this: mastering the high-yield topics and exam technique that move real assessment results, which is what moves predictions. Taught by subject specialists and led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
