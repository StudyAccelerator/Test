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

const post = getPost('best-way-to-revise-for-a-levels')!

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
    q: 'When should I start revising for A-levels?',
    a: "Structured revision should start around six months before the exams, so January for the summer series. But low-level consolidation (turning each week's lessons into flashcards and recall practice) should run all year from September. Students who do that weekly need far less rescue work in the spring, and their predicted grades benefit too.",
  },
  {
    q: 'What is the best way to revise for A-levels?',
    a: 'Active recall plus spaced repetition plus timed past papers. Test yourself from memory using blurting, flashcards or practice questions, bring every topic back at growing intervals, and sit real papers under exam conditions in the final months. This combination beats re-reading and highlighting by a wide margin in study after study.',
  },
  {
    q: 'How many hours should I revise each day for A-levels?',
    a: 'During term time, 1 to 2 hours per subject per week on top of homework. In holidays, 1.5 to 2 focused hours a day. During exam season, 4 to 6 hours a day in blocks of 45 to 60 minutes. Beyond six hours the quality collapses and you start borrowing energy from tomorrow.',
  },
  {
    q: 'Are past papers the best way to prepare for A-level exams?',
    a: 'In the final months, yes, nothing else comes close. A-level exams test retrieval and application under time pressure, and past papers are the only activity that trains exactly that. They only count when done under timed conditions and marked honestly against the real mark scheme.',
  },
  {
    q: 'Can a tutor help improve my A-level revision?',
    a: 'The right kind can. Look for teaching built around exam questions and mark schemes rather than pure content explanation, with homework and testing in between. Our programmes at A-Level Accelerators are built exactly that way: brief content coverage, then straight into exam practice.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        The best way to revise for A-levels is active recall, spaced repetition and timed past papers, weighted
        toward your weakest topics. Test yourself from memory instead of re-reading, bring each topic back at
        growing intervals (next day, day 3 or 4, day 7), and make full timed papers the centre of your final
        months. Re-reading notes and highlighting feel productive and barely move your grade.
      </QuickAnswer>

      <Lead>
        Let me ask you a question I ask my students. Are you someone who reads through your notes,
        feels like you know the topic, then opens an exam paper and can&apos;t produce it? That gap has a simple
        cause. Most revision trains recognition, and exams test retrieval. They&apos;re different skills, and once
        you start training the right one, the same hours produce completely different results. Here&apos;s how to
        revise properly, ranked by what actually moves grades, with specific advice for maths, chemistry,
        physics and biology.
      </Lead>

      <KeyTakeaways
        points={[
          'Revision splits into high-yield and low-yield. High-yield: testing yourself from memory, timed past papers, error logs. Low-yield: re-reading, highlighting, rewriting notes neatly.',
          'Active recall is the engine: blurting, flashcards and practice questions force your brain to retrieve, which is what strengthens memory.',
          'Spaced repetition schedules each topic at growing intervals, timed for the moment just before you forget it.',
          'Weight your time toward weak topics, roughly 60% weak, 25% medium, 15% keeping strengths warm.',
          'In the final months, full timed past papers with honest marking are worth more than any other activity.',
        ]}
      />

      <H2 id="high-vs-low">High-yield versus low-yield revision</H2>
      <P>
        Be really strict with yourself and audit your week. Where&apos;s the time actually going? Low-yield
        activities are the comfortable ones: reading notes again, highlighting textbooks, rewriting notes so
        they look neater, watching a &quot;learn all of biology in 16 minutes&quot; video at midnight. They feel
        productive precisely because they take a lot of time. But they don&apos;t correlate with exam performance,
        and I wasted a lot of my own sixth form on them.
      </P>
      <P>
        High-yield activities are the uncomfortable ones: testing yourself from memory, doing questions under
        time pressure, marking your own work harshly against a mark scheme, and keeping an error log of every
        mistake. Top students aren&apos;t doing more revision. They&apos;re doing better revision.
      </P>

      <H2 id="core-techniques">The three techniques that do the heavy lifting</H2>
      <H3>Active recall</H3>
      <P>
        Close the notes and force the content out of your brain: <A href="/blog/blurting-method-a-level-revision/">blurting</A>,
        flashcards, practice questions from memory. Retrieval is the skill the exam tests, and it&apos;s also the
        thing that strengthens the memory itself. This is the single biggest upgrade most students can make.
      </P>
      <H3>Spaced repetition</H3>
      <P>
        Memory decays on a curve, so one heroic session on a topic is a plan for forgetting it. Bring each
        topic back at growing intervals: learn it, recall it the next day, review it on day 3 or 4, test it at
        a week. Each pass takes less time and the memory lasts longer. A proper
        <A href="/blog/how-to-make-a-revision-timetable/"> revision timetable</A>{' '}builds this in automatically.
      </P>
      <H3>Timed past papers</H3>
      <P>
        The final boss. From about two to three months out, full papers under exam conditions, marked with the
        real mark scheme, with every lost mark logged: what went wrong, why, and what you&apos;ll do differently.
        Ten papers done properly beat thirty done casually.
      </P>

      <H2 id="subject-specific">Subject-specific revision advice</H2>
      <H3>How to revise A-level Maths</H3>
      <P>
        Maths rewards doing, not reading. You can&apos;t revise maths by looking at solved examples any more than
        you can get fit watching the gym. Do questions daily, mix topics so you practise choosing the method
        (the exam never tells you which chapter a question came from), and keep an error log. When you get
        something wrong, redo it from scratch three days later. Fluency in algebra and calculus pays rent in
        every other topic, so drill those foundations hardest.
      </P>
      <H3>How to revise A-level Chemistry</H3>
      <P>
        Chemistry splits into three kinds of work. Definitions and equations want flashcards, and exam papers
        reward the exact wording, so learn definitions to the letter. Organic mechanisms want blurting: draw
        the full mechanism from memory, arrows and all, then check. Calculations (moles, titrations,
        equilibria, pH) want repetition until they&apos;re boring. And across all of it, mark scheme fluency
        matters enormously, because chemistry examiners award marks for specific points, not general
        understanding.
      </P>
      <H3>How to revise A-level Physics</H3>
      <P>
        Physics fails students in two places: setting up problems and required practicals. For the first,
        practise translating wordy questions into diagrams and equations, because that translation step is
        where marks die. Derive key equations from memory rather than just memorising them, so you can rebuild
        under pressure. For the second, know your required practicals cold: method, variables, error sources,
        improvements. Those questions are the most predictable marks on the paper.
      </P>
      <H3>How to revise A-level Biology</H3>
      <P>
        Biology is the heaviest content load of the sciences, which makes spaced repetition non-negotiable:
        there&apos;s simply too much to cram. Blurt whole processes (protein synthesis, the cardiac cycle,
        respiration) as flow diagrams from memory. Then train application hard, because modern biology papers
        put familiar ideas in unfamiliar contexts, and students who only memorised the textbook freeze. Past
        paper questions teach you the difference between knowing the content and answering the question.
      </P>

      <Callout title="The mistake that undoes everything else">
        Revising your favourite topics. It feels good, it looks like work, and it wins you almost nothing,
        because the marks you&apos;re missing live in the topics you avoid. Rate every topic honestly, then spend
        most of your time where it hurts. That&apos;s the whole secret.
      </Callout>

      <H2 id="putting-it-together">Putting it together</H2>
      <P>
        Audit your topics. Build a weekly plan weighted toward the weak ones, with each topic cycling through
        deep work, next-day recall, a light review and a test. Work in 45 to 60 minute blocks, phone in
        another room, and protect your sleep, because that&apos;s when the day&apos;s work gets written into long-term
        memory. If you want the schedule built for you, our free <A href="/revision-tracker/">Revision
        Tracker</A>{' '}generates the whole structure in about three minutes.
      </P>

      <TrackerCTA />

      <CourseCTA
        heading="Want this taught, not just read?"
        body="Our live A-Level programmes in Biology, Chemistry, Maths and Physics run exactly this way: high-yield content, straight into exam questions and mark schemes, with recall practice between sessions. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
