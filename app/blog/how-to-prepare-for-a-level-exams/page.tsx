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

const post = getPost('how-to-prepare-for-a-level-exams')!

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
    q: 'When should I start preparing for A-level exams?',
    a: "Proper exam preparation starts about six months out, which means January for summer exams. That's when past papers, timed practice and a structured revision plan should begin. But the honest answer is that preparation starts the week you start the course: students who consolidate weekly from September need far less rescue work in the spring.",
  },
  {
    q: 'How many hours should I study each day before A-levels?',
    a: 'During term time, 1 to 2 hours per subject per week of consolidation on top of homework. During study leave and exam season, 4 to 6 focused hours a day in blocks with proper breaks. More than that and quality collapses. One focused hour of testing yourself beats three hours of re-reading notes.',
  },
  {
    q: 'What is the best revision method for A-levels?',
    a: 'Active recall, spaced repetition and timed past papers, in that combination. Test yourself from memory (blurting, flashcards, practice questions), bring each topic back at growing intervals, and sit full papers under exam conditions in the final months. Re-reading and highlighting feel productive and do almost nothing.',
  },
  {
    q: 'How do I stay motivated while preparing for A-levels?',
    a: 'Stop relying on motivation and build structure instead. A weekly plan that tells you exactly what to do each session removes the daily negotiation with yourself, and small visible wins (topics turning from red to green, past paper scores creeping up) generate more motivation than any pep talk. Rest days are part of the structure, not a break from it.',
  },
  {
    q: 'Can tutoring improve A-level exam preparation?',
    a: "Yes, if it's the right kind. Look for teaching built around exam questions and mark schemes rather than pure content explanation, with homework and testing between sessions. That's how our programmes at A-Level Accelerators are structured: brief content coverage, then straight into exam practice.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        A-level exam preparation comes down to five steps. Audit every topic and rate your confidence on each.
        Build a weekly revision plan weighted toward your weak topics. Learn with active recall, not
        re-reading. From about six months out, add past papers, moving to full timed papers in the final
        stretch. And train exam technique deliberately: mark schemes, command words, timing. Start six months
        before the exams as a minimum. Steady beats heroic.
      </QuickAnswer>

      <Lead>
        Every year I watch two kinds of students walk into A-level exams. The first kind spent two years
        &quot;keeping up&quot; and then threw everything at the final three months. The second kind did something far
        less dramatic: a steady weekly system, started early, built around testing themselves. The second group
        sleeps better, revises less in total, and collects most of the A and A* grades. Having worked with over
        1,000 A-level students, I can tell you the difference between them was never intelligence. It was
        preparation that started before it felt urgent. Here&apos;s the complete playbook.
      </Lead>

      <KeyTakeaways
        points={[
          'Real preparation is a system, not a sprint: weekly consolidation from September, structured revision from January, full timed papers in the final months.',
          'Audit first. Rate every topic in every subject as confident, shaky or no idea, and let that list drive everything.',
          'Learn with active recall (blurting, flashcards, practice questions) and spaced repetition. Re-reading notes is the great time thief of A-levels.',
          'Past papers are the single highest-yield preparation activity, and they only count when done under timed conditions with honest marking.',
          'Exam technique is a separate skill: mark schemes, command words, timing and question selection. Train it deliberately.',
        ]}
      />

      <H2 id="the-timeline">The preparation timeline that actually works</H2>
      <H3>September to December: build the base</H3>
      <P>
        Nothing dramatic here. One to two hours per subject per week of consolidation on top of homework: turn
        each week&apos;s lessons into flashcards, <A href="/blog/blurting-method-a-level-revision/">blurt</A>{' '}the
        new topics, do a few exam questions. This is quiet, boring and completely decisive, because it means
        January-you inherits a tidy house instead of a year of debt. It also feeds directly into your predicted
        grades, which get set from your assessments along the way.
      </P>
      <H3>January to March: structured revision begins</H3>
      <P>
        Six months out is when preparation proper starts. Build a full
        <A href="/blog/how-to-make-a-revision-timetable/"> revision timetable</A>{' '}at topic level, weighted
        toward your weak areas. Start doing past paper questions by topic. This is also the window to fix any
        foundations that are genuinely broken, while there&apos;s still time to relearn rather than patch.
      </P>
      <H3>April to exams: papers, papers, papers</H3>
      <P>
        The final stretch belongs to full past papers under timed conditions, marked honestly against the real
        mark scheme, with every lost mark logged and understood. Between papers, use recall sessions to patch
        the gaps the papers expose. By now you shouldn&apos;t be meeting new content at all.
      </P>

      <H2 id="step-one-audit">Step 1: Audit before you revise</H2>
      <P>
        I&apos;m a doctor, so forgive the analogy, but I can&apos;t treat a patient until I know what&apos;s wrong. Same with
        revision. Print the specification for each subject and rate every topic: confident, shaky, no idea. Use
        mock results and marked homework to keep yourself honest, because feelings lie and marks don&apos;t. This
        one-hour exercise is worth more than a week of unfocused revision, because every session afterwards has
        a target.
      </P>

      <H2 id="step-two-plan">Step 2: Plan the week, not the term</H2>
      <P>
        Grand 12-week colour-coded plans collapse. What works is a rough long-term map plus a real plan for
        this week, rebuilt every Sunday based on what your testing showed. Fill at most 80% of your available
        time so bad days have somewhere to go. The full method is in my guide
        to <A href="/blog/how-to-make-a-revision-timetable/">building a revision timetable that actually
        works</A>, or our free <A href="/revision-tracker/">Revision Tracker</A>{' '}will generate one for you in
        about three minutes.
      </P>

      <H2 id="step-three-technique">Step 3: Revise with techniques that earn marks</H2>
      <UL>
        <LI>
          Active recall. Close the notes and force it out of your memory: blurting, flashcards, practice
          questions. This is the engine. Everything else is decoration.
        </LI>
        <LI>
          Spaced repetition. Bring each topic back at growing intervals: next day, day 3 or 4, a week later.
          You&apos;re timing each review for the moment just before you&apos;d forget.
        </LI>
        <LI>
          Interleaving. Mix subjects across the day instead of binging one. It feels harder. It sticks
          better.
        </LI>
        <LI>
          And drop the low-yield stuff: re-reading, highlighting, making beautiful notes. They feel productive
          because they take time. That&apos;s all they take.
        </LI>
      </UL>

      <H2 id="step-four-papers">Step 4: Make past papers your main event</H2>
      <P>
        A-levels don&apos;t test whether you know things. They test whether you can retrieve and apply them, in
        writing, against a mark scheme, with a clock running. The only way to train that is to do it. Sit
        papers timed. Mark them with the real mark scheme, harshly. Keep an error log: what went wrong, why,
        and what you&apos;ll do differently. Students who do ten papers properly beat students who &quot;covered&quot; the
        spec three times, every single year.
      </P>

      <H2 id="step-five-exam-craft">Step 5: Train exam technique as its own subject</H2>
      <P>
        Were you ever taught, in school, how a mark scheme actually works? How examiners award each mark, what
        each command word demands, which questions to attack first, what to do when your mind goes blank?
        Probably not. Nobody teaches it, and it&apos;s worth a grade. Learn your board&apos;s command words, study how
        marks are broken down, practise timing per mark, and have a plan for panic. I&apos;ve covered the
        confidence side in <A href="/blog/a-level-exam-confidence/">how to feel confident before A-level
        exams</A>.
      </P>

      <Callout title="The mistakes that quietly cost grades">
        Starting past papers in May. Revising your favourite topics because they feel nice. Confusing
        recognising your notes with knowing them. All-nighters that trade away the sleep your memory
        consolidates on. And ignoring the mark scheme until results day, when an examiner finally shows you
        what they were looking for.
      </Callout>

      <TrackerCTA />

      <CourseCTA
        heading="Preparation with a structure already built in"
        body="Our live A-Level programmes in Biology, Chemistry, Maths and Physics do the heavy lifting: high-yield content, straight into exam questions and mark schemes, homework and progress tracking between sessions. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
