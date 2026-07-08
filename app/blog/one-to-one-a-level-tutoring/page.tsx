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

const post = getPost('one-to-one-a-level-tutoring')!

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
    q: 'Does one-to-one tutoring improve A-level grades?',
    a: 'It can, especially when the problem is understanding. A good private tutor is excellent at fixing content gaps and rebuilding foundations. Where it tends to underdeliver is the last step from B to A or A*, because those grades come from recall under pressure, application and exam technique, which need sustained practice between lessons rather than more explanation within them.',
  },
  {
    q: 'How often should a student have tutoring?',
    a: "Once a week per subject is the standard, and it works if, and only if, there's structured work between sessions. The lesson should set up the week: what to practise, which topics to test, what to bring back. A weekly hour with nothing in between is a comfort blanket, not a grade strategy.",
  },
  {
    q: 'How effective is one-to-one tutoring compared with group teaching?',
    a: "For fixing individual misunderstandings, one-to-one wins. For building exam performance, structured small groups often match or beat it. Groups add pace, discussion and exposure to other students' mistakes and methods, and the famous research on tutoring gains was actually about mastery learning with regular testing, which good group programmes deliver too.",
  },
  {
    q: 'What are the benefits of one-to-one tutoring?',
    a: "Complete personalisation. The lesson goes exactly where the student needs it, questions get answered immediately, and shy students speak up more readily than in class. For a student who's lost in a subject, or who has specific gaps from illness or a school change, those benefits are hard to beat.",
  },
  {
    q: 'How much does one-to-one A-level tutoring cost?',
    a: 'Typically £30 to £60 an hour in the UK, more for examiners and in-demand specialists. Over two years of A-levels, weekly tutoring in one subject runs to £2,000 or more. Structured group programmes deliver specialist teaching for £9 to £15 per teaching hour, which is why more families now combine the two: group programmes for the system, occasional one-to-one for specific gaps.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        One-to-one A-level tutoring genuinely helps when the problem is understanding the content. But most
        students stuck at a B or C aren&apos;t short of understanding. They lose marks on recall under pressure,
        application and exam technique, and a weekly hour of explanation doesn&apos;t train any of those. That&apos;s
        why private tutoring alone tends to lift students to a B and then stall. The fix is a system: exam
        question practice, testing between sessions, and mark scheme training.
      </QuickAnswer>

      <Lead>
        I&apos;m going to be more honest about tutoring than most people who sell it. In every workshop I run, I ask
        students to put a yes in the chat if they&apos;ve ever had a private tutor. Most of them say yes. Then I ask
        how many of them got the grade jump they were hoping for. The chat goes rather quiet. Having worked
        with over 1,000 A-level students, I can tell you why that happens, and it&apos;s not because tutors are bad
        at their jobs.
      </Lead>

      <KeyTakeaways
        points={[
          'One-to-one tutoring is excellent at one thing: fixing gaps in understanding. If a student is genuinely lost in a subject, it works.',
          'But understanding is only the first tier of exam performance. Recall under pressure, application and exam technique decide the top grades.',
          "A weekly hour of explanation can't train those skills. They need practice between sessions, regular testing and mark scheme work.",
          'This is why tutored students so often rise to a B and then plateau.',
          'The best results come from a system: structured teaching, exam question practice and progress tracking, with one-to-one used surgically for specific gaps.',
        ]}
      />

      <H2 id="what-it-fixes">What one-to-one tutoring genuinely fixes</H2>
      <P>
        Let&apos;s give tutoring its due first, because it earns it. A good private tutor gives a student complete
        attention. Lessons move at exactly the right pace. Difficult ideas get as long as they need, questions
        get answered the moment they come up, and a student who&apos;d never raise a hand in class will happily say
        &quot;I don&apos;t get it&quot; to a tutor. If your child is genuinely lost in a subject, if the foundations are
        missing because of illness, a school change or a bad teaching year, one-to-one tutoring is exactly the
        right tool. Nothing rebuilds understanding faster.
      </P>

      <H2 id="the-ceiling">The ceiling: why tutored students plateau at a B</H2>
      <P>
        Here&apos;s the pattern I see over and over. A student starts tutoring at a D or C. Within a few months
        they&apos;re at a B. Everyone&apos;s pleased. Then nothing moves for a year, despite the weekly lessons
        continuing at £40 an hour.
      </P>
      <P>
        The reason is simple once you see it. Exam performance has four tiers: understanding the content,
        recalling it without prompts, applying it to unfamiliar questions, and performing on the day. Tutors
        live almost entirely in tier one. That&apos;s what a lesson is: someone explaining things to you. But
        A-level papers don&apos;t test whether things were once explained to you clearly. They test whether you can
        retrieve and apply knowledge under time pressure, with no notes and no prompts.
      </P>
      <P>
        And those skills can&apos;t be handed over in an hour of explanation. They&apos;re trained, like fitness,
        through repeated practice between sessions: <A href="/blog/blurting-method-a-level-revision/">active
        recall</A>, past paper questions under timed conditions, and honest reviews of where the marks went.
        A tutor can assign that work. They can&apos;t do it for you.
      </P>

      <Callout title="The question that diagnoses it">
        If your child has a tutor, ask them one question tonight. &quot;In your lessons, do you practise real exam
        questions and mark schemes, or does the tutor mostly explain topics?&quot; If it&apos;s mostly explanation,
        you&apos;re paying to strengthen the one skill your child probably already has.
      </Callout>

      <H2 id="what-works">What the research actually supports</H2>
      <P>
        People often quote research showing tutored students dramatically outperform classroom students. Worth
        knowing: the famous studies behind that claim weren&apos;t really about private tutoring as most families
        buy it. The gains came from mastery learning: teach a chunk, test it, fix the gaps, test again, only
        then move on. The magic ingredient was the constant testing and correction loop, not the private
        audience. Which means a well-designed group programme with regular testing captures most of the
        benefit, at a fraction of the cost. It also means an hour of pure explanation, one-to-one or not,
        captures very little of it.
      </P>

      <H2 id="group-alternative">Where small-group programmes win</H2>
      <UL>
        <LI>Every session is built around exam questions and mark schemes, so students train the skill the
        exam actually tests.</LI>
        <LI>Students see each other&apos;s mistakes and methods. Half of what you learn in a good group session is
        from questions you&apos;d never have thought to ask.</LI>
        <LI>There&apos;s pace and accountability. Homework exists, gets done, and gets reviewed.</LI>
        <LI>The economics change completely: specialist teaching at £9 to £15 per hour instead of £40 to £60.</LI>
      </UL>
      <P>
        Across our 12-week Biology and Chemistry Accelerators, students rated their confidence in each topic before and
        after every session. The average went from 6.2 out of 10 to 8.3. One student&apos;s feedback request was
        for more homework and harder exam questions, which tells you something about what a structured group
        does to motivation.
      </P>

      <H2 id="how-to-decide">How to decide for your child</H2>
      <OL>
        <LI>Genuinely lost in the subject, or missing foundations? Start with one-to-one tutoring, or a
        programme with small enough groups that nobody can hide.</LI>
        <LI>Understands the content but stuck at a B or C? A system problem, not a knowledge problem. Look for
        structured, exam-focused teaching plus a proper <A href="/blog/how-to-make-a-revision-timetable/">revision
        system</A> between sessions.</LI>
        <LI>Already at an A and pushing for A*? Past papers, mark scheme fluency and exam strategy. At that
        level, technique is nearly everything.</LI>
      </OL>

      <TrackerCTA />

      <CourseCTA
        heading="Teaching built around the exam, not just the content"
        body="A-Level Accelerators runs live small-group programmes in Biology, Chemistry, Maths and Physics. Brief content coverage, then straight into exam questions and mark schemes, with homework and progress tracking between sessions. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
