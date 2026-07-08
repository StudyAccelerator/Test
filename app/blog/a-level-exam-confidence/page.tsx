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

const post = getPost('a-level-exam-confidence')!

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
    q: 'How can I feel more confident before A-level exams?',
    a: "Confidence comes from evidence, not affirmations. Sit timed past papers and watch your scores climb, keep a record of topics moving from shaky to solid, and rehearse the exam day itself with mocks. By the real exam, your brain should have proof that you can perform, because you've already done it several times under the same conditions.",
  },
  {
    q: 'How do I stop cramming before exams?',
    a: "Cramming is a planning failure, not a willpower failure. The fix is a weekly revision plan that starts months out and schedules each topic at spaced intervals, so nothing depends on the final week. If you're reading this late, triage instead of cramming everything: weight the highest-mark topics and past papers, and protect your sleep. A tired brain loses more marks than an unrevised topic.",
  },
  {
    q: 'What should I do the week before my A-level exams?',
    a: 'Light recall on your strongest and shakiest topics, one or two timed papers early in the week, then taper. Sleep at your normal times, prepare your equipment and logistics the day before, and stop revising by early evening before each exam. The week before is for consolidation, not new learning. Nothing new goes in usefully at that point.',
  },
  {
    q: 'How can I manage A-level exam anxiety?',
    a: "Some anxiety is normal and even useful, because adrenaline sharpens focus. Manage the excess with preparation you can point to, slow breathing before the paper starts (long exhales work fastest), a plan for mind blanks (move on, come back), and consistent sleep. If anxiety is severe or affecting your daily life, speak to your GP or school counsellor. That's a health matter, not a study technique.",
  },
  {
    q: 'Can a tutor help improve exam confidence?',
    a: 'Yes, if the teaching is exam-focused. Confidence grows from successful reps: working through real exam questions, understanding mark schemes, and watching your scores improve. In our own programmes, students rate their confidence in each topic before and after every session, and the average rose from 6.6 to 8.3 out of 10 across our most recent 12-week programme.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Exam confidence isn&apos;t a personality trait. It&apos;s the by-product of evidence: timed past papers you&apos;ve
        already performed on, topics you&apos;ve watched move from shaky to solid, and a rehearsed plan for the day
        itself. Build it with a steady routine that starts months out, mocks under real conditions, proper
        sleep, and a specific plan for panic and mind blanks. Cramming does the opposite: it burns the sleep
        your memory needs and walks you in exhausted.
      </QuickAnswer>

      <Lead>
        Here&apos;s a scene from every exam hall. Two students, same school, similar ability. One is pale, flicking
        through notes at the door, running on four hours of sleep. The other is calm, almost bored. The
        difference isn&apos;t talent and it isn&apos;t nerves of steel. The calm one has sat this exam before, in mock
        form, several times, and knows exactly what to do if their mind goes blank. I&apos;m a doctor, and I sat
        some of the highest-pressure exams there are. Calm is trainable. Here&apos;s the training.
      </Lead>

      <KeyTakeaways
        points={[
          'Confidence is evidence. Every timed paper you complete is proof to your own brain that you can perform under pressure.',
          "Cramming trades away sleep, and sleep is when memory consolidates. It's the worst deal in revision.",
          "A steady routine started months out removes the need for last-minute heroics: that's where calm actually comes from.",
          'Mock exams under real conditions are confidence training, not just assessment. Treat every one as a rehearsal for the day.',
          'Have a rehearsed plan for the bad moments: mind blanks, hard first questions, time pressure. Panic thrives on surprise.',
        ]}
      />

      <H2 id="why-confidence-beats-cramming">Why confidence beats cramming</H2>
      <P>
        Let&apos;s be clear about what cramming actually is: borrowing marks from tomorrow to feel busy tonight.
        The all-nighter costs you the sleep your brain needs to consolidate what you learned, and walks you
        into the paper with a foggy working memory. You lose more marks to exhaustion than you gained from the
        extra hours. Meanwhile, anxiety fills the gap that preparation left. Students don&apos;t panic in exams
        because they&apos;re anxious people. They panic because part of them knows the preparation was thin, and
        no breathing exercise fully argues with the truth.
      </P>
      <P>
        So the real confidence strategy has two halves: preparation that leaves nothing to argue with, and a
        few performance skills for the day itself.
      </P>

      <H2 id="the-routine">The routine that builds confidence</H2>
      <H3>Start with a plan, months out</H3>
      <P>
        Nothing calms an anxious student like a plan they believe. A weekly
        <A href="/blog/how-to-make-a-revision-timetable/"> revision timetable</A> at topic level, weighted
        toward weak areas, removes the nightly negotiation with yourself. You always know what today&apos;s
        session is for, and you can see the pile shrinking week by week. That visible progress is confidence,
        being manufactured on schedule.
      </P>
      <H3>Revise for understanding, test for proof</H3>
      <P>
        Learn with <A href="/blog/blurting-method-a-level-revision/">active recall</A> so knowledge is
        genuinely retrievable, not just familiar. Then collect proof: topic scores, past paper marks, a list
        of topics that moved from red to green. Keep the record somewhere visible. On a wobbly day, evidence
        beats reassurance.
      </P>
      <H3>Rehearse the exam, not just the content</H3>
      <P>
        Mocks under real conditions are the single best confidence tool that exists. Full paper, real timing,
        no notes, phone in another room, marked harshly with the actual mark scheme. The first one will feel
        horrible. That&apos;s the point. Every one after feels less horrible, and by the real exam your brain
        files it as &quot;a thing I&apos;ve done many times&quot; instead of a threat.
      </P>

      <H2 id="body-basics">The health basics that are secretly exam technique</H2>
      <UL>
        <LI>
          Sleep is the big one, and I say this as a doctor, not a wellness account. Memory consolidates
          overnight. Seven to nine hours in the exam weeks isn&apos;t self-care, it&apos;s mark protection. Keep your
          wake time fixed, even on weekends.
        </LI>
        <LI>
          Eat normally and drink water. Skipping breakfast before a three-hour paper is giving away marks. No
          need for anything fancy: normal food, normal times.
        </LI>
        <LI>
          Take real breaks. Attention is a resource that runs out, and revision past the point of focus is
          just anxiety rehearsal. Blocks of 45 to 60 minutes with 10 to 15 minute breaks, and at least one
          full rest slot per week even in exam season.
        </LI>
      </UL>

      <H2 id="managing-anxiety">Managing exam anxiety on the day</H2>
      <OL>
        <LI>
          Slow your breathing before the paper starts. Long, slow exhales tell your nervous system the threat
          has passed. It&apos;s physiology, and it works in under a minute.
        </LI>
        <LI>
          Have a mind blank plan, rehearsed in advance: mark the question, move on, come back. Blanks are
          retrieval traffic jams and they clear on their own. Panic is what keeps them jammed.
        </LI>
        <LI>
          Expect a hard question early and decide now that it means nothing. Every paper has one. Finding it
          just means you found it first.
        </LI>
        <LI>
          Replace &quot;I must get an A&quot; with a process goal you fully control: &quot;I&apos;ll attempt every question and
          collect every mark I know.&quot; Outcome thoughts spike anxiety mid-paper. Process thoughts direct it.
        </LI>
      </OL>
      <Callout title="When it's more than nerves">
        A word as a doctor rather than a tutor. If anxiety is stopping you sleeping for weeks, affecting your
        eating, or spilling well beyond exams, that&apos;s beyond study advice. Speak to your GP, or your school&apos;s
        counsellor. Getting help early is the strong move, not the weak one.
      </Callout>

      <H2 id="signs-youre-ready">Signs you&apos;re actually ready</H2>
      <P>
        You can recall your weak topics from memory, not just recognise them. Your last few timed papers sit
        at or near your target grade. You know the mark schemes well enough to predict what they&apos;ll reward.
        And the night before feels like the night before a match you&apos;ve trained for: not calm exactly, but
        ready. That feeling isn&apos;t luck. It&apos;s the receipt for months of doing it properly.
      </P>

      <TrackerCTA />

      <CourseCTA
        heading="Confidence, taught deliberately"
        body="Our live A-Level programmes in Biology, Chemistry, Maths and Physics build confidence the honest way: exam questions and mark schemes every session, and measurable progress week by week. In our most recent 12-week programme, students' self-rated topic confidence rose from 6.6 to 8.3 out of 10 on average. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
