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

const post = getPost('how-to-choose-an-a-level-tutor')!

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
    q: 'How much do online A-level tutors cost in the UK?',
    a: "Most private A-level tutors charge somewhere between \u00a330 and \u00a360 an hour, with experienced specialists and examiners often charging more. Structured group programmes work out far cheaper per hour of teaching, typically \u00a39 to \u00a315, because the tutor's time is shared across a small group. Cheapest isn't the goal though. Cost per grade improved is the number that matters.",
  },
  {
    q: 'What qualifications should an A-level tutor have?',
    a: "At minimum, a strong degree in the subject they teach and real experience with your exam board's papers and mark schemes. Top grades at A-level in that subject are a good sign too, because it means they've personally done what they're asking your child to do. Teaching qualifications help but aren't essential. What is essential is evidence of past students improving.",
  },
  {
    q: 'Is online A-level tutoring as effective as face-to-face?',
    a: "For A-levels, yes, and often better. Online lessons give you access to specialists across the whole country instead of whoever lives nearby, recordings you can rewatch before exams, and shared-screen working that suits maths and science teaching well. The quality of the tutor matters far more than whether they're sitting next to you.",
  },
  {
    q: 'What questions should I ask before hiring an A-level tutor?',
    a: 'Four questions do most of the work. Which exam board do you teach, and how well do you know its mark schemes? How do you measure progress between lessons? Can you share results or feedback from previous students? And what happens in a typical hour? If the answer to the last one is mostly re-explaining content rather than practising exam questions, keep looking.',
  },
  {
    q: 'What subjects can you study with an online A-level tutor?',
    a: 'Almost any A-level subject is available online, but the biggest demand and the deepest tutor pools are in maths and the sciences. At A-Level Accelerators we run live group programmes in Biology, Chemistry, Maths and Physics, the four subjects where exam technique makes the biggest difference to grades.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Choose an A-level tutor on evidence, not price or friendliness. You want proof of subject expertise,
        deep knowledge of your exam board&apos;s mark schemes, a teaching approach built around practising exam
        questions rather than re-explaining content, and some form of progress tracking. Ask for results or
        feedback from past students before you commit. And check whether a structured group programme would get
        better results for a fraction of the hourly cost.
      </QuickAnswer>

      <Lead>
        Having worked with over 1,000 A-level students, I&apos;ve seen every version of the tutoring story. The
        tutor who transformed a student&apos;s chemistry in a term. The tutor who was lovely, reliable, £45 an hour,
        and made no measurable difference in a year. Parents usually can&apos;t tell which one they&apos;ve hired until
        results day, and by then it&apos;s too late. So here&apos;s the checklist I&apos;d give my own family: what actually
        predicts results, what to ask, and the red flags that should end the conversation.
      </Lead>

      <KeyTakeaways
        points={[
          "The best predictor of results isn't qualifications alone. It's whether lessons are built around exam questions and mark schemes for your specific exam board.",
          'Ask every tutor four things: exam board knowledge, how they track progress, evidence from past students, and what a typical hour looks like.',
          'Red flags: no questions about your goals, lessons that are all content and no exam practice, no homework, and no way of measuring improvement.',
          "One-to-one isn't automatically better. Small group programmes with a strong structure often beat solo tutoring on results and cost a fraction per hour.",
          'Typical UK rates are £30 to £60 an hour for one-to-one. Judge value by cost per grade improved, not cost per hour.',
        ]}
      />

      <H2 id="why-it-matters">Why the choice matters more than parents realise</H2>
      <P>
        Here&apos;s something I say in every workshop I run. Schools teach students what to learn, but almost nobody
        teaches them how to perform in exams. Those are two different skills. Most students who sit at a B
        aren&apos;t short of knowledge. They lose marks on application, exam technique and recall under pressure.
      </P>
      <P>
        That&apos;s exactly why tutor choice matters. A tutor who only re-explains content is fixing the thing your
        child probably doesn&apos;t need fixed, one hour at a time, at £45 an hour. A tutor who trains exam
        performance changes the grade. They look identical on a profile page.
      </P>

      <H2 id="what-to-look-for">What to look for in an A-level tutor</H2>
      <H3>Subject expertise, proven at A-level standard</H3>
      <P>
        A strong degree in the subject matters, and so does having personally scored top grades at A-level.
        A-levels are a specific game. Someone who mastered that game recently can teach the moves. Be a little
        careful with tutors whose expertise is university-level but who haven&apos;t touched an A-level paper in
        years. Brilliant and useful aren&apos;t always the same thing.
      </P>
      <H3>Exam board fluency</H3>
      <P>
        AQA, Edexcel, OCR. Same subject, different papers, different mark schemes, different command words. A
        tutor who knows your board&apos;s mark schemes inside out can teach your child to write answers that
        examiners can actually give marks to. Ask directly: &quot;Which boards do you teach, and how do you use mark
        schemes in lessons?&quot; A vague answer here is disqualifying.
      </P>
      <H3>A teaching approach built on doing, not watching</H3>
      <P>
        In our sessions, we cover content briefly and then go straight into exam questions, because that&apos;s
        where the learning actually happens. One of our students put it better than I ever could in their
        feedback: &quot;I liked how we worked together to get the answers instead of the tutor doing it for us.&quot;
        That&apos;s the sentence you want to hear about any tutor you hire.
      </P>
      <H3>Progress you can see</H3>
      <P>
        Between-lesson homework, topic scores, mock results, confidence ratings. The format matters less than
        the fact that something gets measured. If nobody&apos;s measuring, nobody knows whether the money is
        working.
      </P>

      <H2 id="questions-to-ask">The four questions to ask before hiring anyone</H2>
      <OL>
        <LI>&quot;Which exam board do you teach, and how well do you know its mark schemes?&quot; You want specifics,
        not reassurance.</LI>
        <LI>&quot;How will you measure my child&apos;s progress?&quot; Listen for anything concrete: scores, papers,
        topic tracking.</LI>
        <LI>&quot;Can you share results or feedback from previous students?&quot; Anyone good has this ready.</LI>
        <LI>&quot;Walk me through a typical hour.&quot; If it&apos;s 50 minutes of explaining and 10 minutes of questions,
        that&apos;s a content lesson, not exam training.</LI>
      </OL>

      <H2 id="red-flags">Red flags that should end the conversation</H2>
      <UL>
        <LI>They don&apos;t ask about your child&apos;s current grades, target grades or exam board before quoting.</LI>
        <LI>No homework between sessions. One hour a week with nothing in between barely moves anything.</LI>
        <LI>They promise specific grades. Nobody can promise an A*. They can only promise a process.</LI>
        <LI>Every lesson is content explanation. Ask your child after session three: &quot;Are you doing past paper
        questions in lessons?&quot; If the answer is no, that&apos;s your answer.</LI>
      </UL>

      <H2 id="group-vs-one-to-one">One-to-one or group teaching? The honest comparison</H2>
      <P>
        Parents assume one-to-one is the premium option. Sometimes it is. If your child has deep gaps in
        understanding, a good private tutor is the right call. But for students who broadly understand the
        content and need exam performance, structured small-group teaching often works better. There&apos;s pace,
        there&apos;s a bit of healthy competition, students learn from each other&apos;s mistakes, and the cost per hour
        drops from £40 or more to something like £9 to £15. I&apos;ve written a full breakdown
        in <A href="/blog/one-to-one-a-level-tutoring/">does one-to-one tutoring actually improve grades</A>.
      </P>

      <Callout title="What this looks like at A-Level Accelerators">
        Our programmes are live small-group courses in Biology, Chemistry, Maths and Physics, taught by subject
        specialists and led by me, Dr Waleed Ahmad. Every session covers the content briefly and then goes
        straight into exam questions and mark schemes. Across our recent 12-week Biology and Chemistry programmes, students
        rated their topic confidence 6.2 out of 10 on average before sessions and 8.3 after. The first session
        is risk-free, so you can judge the teaching before you commit.
      </Callout>

      <TrackerCTA />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        Don&apos;t hire on warmth, price or proximity. Hire on evidence: exam board fluency, lessons built around
        doing questions, measurable progress, and proof from past students. Then give it four to six weeks and
        check the thing that actually matters. Not &quot;does my child like the tutor?&quot; but &quot;are the marks on real
        exam questions going up?&quot;
      </P>

      <CourseCTA
        heading="See what specialist-led group teaching looks like"
        body="A-Level Accelerators runs live online programmes in Biology, Chemistry, Maths and Physics. Small groups, exam-question-first teaching, led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
