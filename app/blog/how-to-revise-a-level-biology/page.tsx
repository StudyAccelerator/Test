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
  CourseCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('how-to-revise-a-level-biology')!

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
    q: 'What is the best way to revise for A-level Biology?',
    a: "Retrieval against the specification, not re-reading the textbook. Work topic by topic: blurt the topic from memory onto a blank page, check it against the specification and your notes, then immediately do exam questions on it with the mark scheme open. Biology rewards precise wording, so the mark scheme study matters as much as the content study. Repeat each topic on a spaced schedule rather than in one heroic sitting.",
  },
  {
    q: 'Why am I working hard in Biology but still getting low marks?',
    a: "Almost always one of three leaks. Volume: Biology has more recallable detail than any other science, and re-reading can't hold it, only retrieval can. Precision: you know the idea but your wording doesn't match the mark scheme's required terms, so the mark isn't awarded. Application: the paper wraps familiar content in an unfamiliar context and you don't recognise which piece of knowledge it's asking for. Diagnose which one is yours before changing anything, because the fixes are different.",
  },
  {
    q: 'How should I revise the required practicals?',
    a: "Like content, not like memories of a fun lesson. For each required practical, be able to state the aim, the method's key steps and WHY each step exists, the variables, the expected result, and the classic evaluation points (accuracy, reliability, validity improvements). Exam questions on practicals are mostly why-questions in disguise, and students who only remember what they did, rather than why, lose those marks.",
  },
  {
    q: 'How early should I start past papers for Biology?',
    a: "Far earlier than feels comfortable, but in the right form: topic questions from day one of revision, full papers later. Use questions on a topic immediately after revising it, open book at first if needed. Save full timed papers for when most of the course is covered. The mistake isn't doing papers too early, it's doing only full papers and treating them as a content-learning tool, which they're not.",
  },
  {
    q: 'Is A-level Biology harder than GCSE Biology?',
    a: "Much, and in a specific way: the volume of detail multiplies, and the questions shift from recall to application, so you're asked to use ideas in contexts you've never seen (a new organism, an unfamiliar experiment). Students who memorised their way through GCSE hit this hardest. The subject is very learnable, but it needs a system built on retrieval and exam questions rather than beautiful notes.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Revise A-level Biology by working the specification, not the textbook: for each topic, write what
        you know from memory (blurting), close the gaps, then do exam questions on that topic with the
        mark scheme open, learning the exact wording that earns each mark. Cycle topics on a spaced
        schedule, treat required practicals as why-questions, and don&apos;t neglect the maths hiding in the
        paper. Re-reading and copying notes feel productive in Biology and are quietly useless.
      </QuickAnswer>

      <Lead>
        Biology has a reputation as the &quot;easy science&quot; right up until the first A-level paper hands
        back a grade nobody expected. I took it, I got into medicine off the back of it, and I&apos;ve now
        worked with more than 1,000 A-level students, so let me say it plainly: Biology is not a memory
        test you can brute-force with highlighters. It&apos;s a precision-and-application subject wearing a
        memory test&apos;s clothing, and once you revise it for what it actually is, the marks move fast.
      </Lead>

      <KeyTakeaways
        points={[
          'Biology fails students in three ways: volume (more recallable detail than any A-level science), precision (marks require exact terms), and application (familiar content in unfamiliar contexts).',
          'The specification is your revision checklist. If a line is in the spec, it can be asked; if you can\'t retrieve it from memory, it isn\'t revised yet.',
          'Blurting then exam questions, topic by topic, beats any amount of re-reading. The mark scheme is a vocabulary list: learn the wording that gets paid.',
          'Required practicals are why-questions in disguise, and the maths skills woven through the paper catch more students than the content does.',
          'Space the cycle: each topic several times across weeks, not once in a marathon. Biology\'s volume makes spacing non-negotiable.',
        ]}
      />

      <H2 id="why-grades-disappoint">Why Biology grades disappoint hard-working students</H2>
      <P>
        Every disappointed Biology student I&apos;ve met has one of three leaks, and the first job is
        knowing which is yours.
      </P>
      <UL>
        <LI>
          <Strong>The volume leak.</Strong>{' '}A-level Biology simply contains more recallable detail than
          the other sciences: names, sequences, structures, processes. Re-reading cannot hold that
          volume in memory. Only repeated retrieval can, which is why the method below is built on it.
        </LI>
        <LI>
          <Strong>The precision leak.</Strong>{' '}You understood the idea, you wrote a sensible sentence,
          and the mark scheme wanted &quot;complementary base pairing&quot; or &quot;water potential&quot; and
          didn&apos;t award your paraphrase. Biology mark schemes pay for specific terms used correctly, and
          students who never study the schemes never learn the vocabulary that earns the marks.
        </LI>
        <LI>
          <Strong>The application leak.</Strong>{' '}The examiner&apos;s favourite trick: your course content,
          dressed in an organism or experiment you&apos;ve never met. Students freeze because it looks new.
          It never is. It&apos;s the same specification point wearing a costume, and spotting that is a
          trainable skill, not a talent.
        </LI>
      </UL>
      <P>
        If you&apos;re not sure which leak is costing you, our free{' '}
        <A href="/revision-diagnostic/">revision diagnostic</A>{' '}pins it down in about four minutes, and
        the method below fixes all three in a different proportion depending on your answer.
      </P>

      <H2 id="the-method">The method: spec, blurt, questions, scheme</H2>
      <OL>
        <LI>
          <Strong>Print the specification and make it the master checklist.</Strong>{' '}Not the textbook&apos;s
          contents page: the exam board&apos;s specification, because papers are written from it line by
          line. Rate every line honestly: could I answer questions on this from memory today?
        </LI>
        <LI>
          <Strong>Blurt the topic before you re-read it.</Strong>{' '}Blank page, book closed, write
          everything you know about the topic: definitions, processes, diagrams. Then open the notes and
          add what&apos;s missing in another colour. The coloured gaps are your actual revision list, and
          the retrieval effort is what fixes the volume leak.{' '}
          <A href="/blog/blurting-method-a-level-revision/">The full blurting guide is here</A>, with a
          free printable template.
        </LI>
        <LI>
          <Strong>Do exam questions on the topic the same day.</Strong>{' '}Not next month: the same
          session or the same day, while the retrieval is fresh. Topic-sorted question packs exist for
          every board. Open book is fine at the start; the point is meeting the question styles early.
        </LI>
        <LI>
          <Strong>Mark with the scheme open, and steal its language.</Strong>{' '}Every time your wording
          didn&apos;t earn the mark, write the scheme&apos;s phrase into your notes and use it in your next
          blurt. Over a term this quietly builds the examiner&apos;s vocabulary into your writing, which is
          the entire fix for the precision leak.
        </LI>
        <LI>
          <Strong>Space the cycle.</Strong>{' '}Each topic wants revisiting on a stretching schedule: next
          day, later that week, a couple of weeks on. Our free{' '}
          <A href="/revision-tracker/">revision tracker</A>{' '}builds that schedule around your weakest
          topics automatically, and{' '}
          <A href="/blog/how-to-make-a-revision-timetable/">the timetable guide</A>{' '}explains the
          principle if you&apos;d rather build it by hand.
        </LI>
      </OL>

      <Callout title="The maths hiding inside Biology">
        A meaningful slice of every Biology paper is maths in disguise: percentage change, magnification,
        statistical tests, ratios, rates from graphs. Students who avoid these questions in revision
        donate those marks on the day. Drill the calculation types on your specification until they&apos;re
        routine; they are the most learnable marks on the paper.
      </Callout>

      <H2 id="practicals">Required practicals: revise the why, not the memory</H2>
      <P>
        Practical questions feel unfair because students revise them as memories (&quot;we did the potato
        osmosis one&quot;) when the paper asks them as reasoning: why that variable was controlled, why the
        rinse step exists, how you&apos;d improve reliability. For each required practical, build a one-page
        answer to five questions: the aim, the key steps and the why of each, the variables, the expected
        pattern, and two improvements you could defend. That page converts practical questions from dread
        into predictable marks.
      </P>

      <H2 id="extended-response">Longer answers: plan for the marks, not the word count</H2>
      <P>
        Extended-response questions (including the essay, on boards that set one) are marked for organised,
        relevant biology, not for length. The rescue habit: before writing, list the specification points
        the question is fishing for, then write one clear sentence per point, linked logically. Six
        relevant, precise sentences beat two pages of everything-I-know. This is exam technique, and it&apos;s
        trainable in weeks:{' '}
        <A href="/blog/a-level-exam-confidence/">the exam confidence guide</A>{' '}covers the wider skill.
      </P>

      <DiagnosticCTA />

      <H2 id="plan">A week of Biology revision that actually converts</H2>
      <P>
        Concretely, inside{' '}
        <A href="/blog/how-many-hours-revision-a-level/">the honest weekly hours for your year group</A>:
        two or three topic cycles (blurt, gap-fill, questions, scheme), one calculation drill, one
        practical page, and later in the year one timed paper section. That&apos;s it. No topic gets one
        marathon; every topic gets several short returns. Students who run this for half a term usually
        stop recognising their own marks, and the wider ranking of{' '}
        <A href="/blog/best-way-to-revise-for-a-levels/">which revision methods actually work</A>{' '}
        explains why each piece is there.
      </P>

      <CourseCTA
        href="/a-level-biology-tutoring/"
        heading="Want Biology taught the way the paper tests it?"
        body="Our live A-level Biology programme runs 12 weekly small-group sessions built around exam questions and mark schemes: application questions you've never seen, extended-response marks, the maths inside Biology. Taught by specialists and led by Dr Waleed Ahmad, MBBS. On average, our students jump two grades, and the first session is risk-free."
        label="See A-Level Biology Tutoring"
      />
    </ArticleLayout>
  )
}
