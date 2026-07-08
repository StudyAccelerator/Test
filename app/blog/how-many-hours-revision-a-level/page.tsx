import type { Metadata } from 'next'
import {
  ArticleLayout,
  Lead,
  P,
  H2,
  H3,
  UL,
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

const post = getPost('how-many-hours-revision-a-level')!

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
    q: 'How many hours a day should I revise during exam season?',
    a: 'During study leave and exam season, 4–6 focused hours a day is the realistic maximum for most students, split into 3 blocks with proper breaks. Beyond that, quality collapses: you are re-reading rather than retrieving, and you are borrowing energy from tomorrow. Never exceed 8 hours — the marginal hour is close to worthless.',
  },
  {
    q: 'How many hours a week should a Year 12 student study outside lessons?',
    a: 'During term time, aim for 1–1.5 hours per subject per week of genuine consolidation on top of homework — roughly 4–6 hours a week for three subjects. It sounds modest, but done weekly with active recall it prevents the content debt that forces panicked 8-hour days later.',
  },
  {
    q: 'Is it better to revise in the morning or at night?',
    a: 'The best time is when you can reliably focus — consistency beats chronobiology. That said, most students focus better earlier: a morning block gets done before the day erodes your willpower, and late-night sessions cost sleep, which is when memories consolidate. Sacrificing sleep to revise is trading the thing that makes revision work.',
  },
  {
    q: 'How long should each revision session be?',
    a: 'Work in blocks of 45–60 minutes with 10–15 minute breaks, or 25-minute Pomodoro cycles if your focus is shaky. One subject or one topic per block. The break is part of the method — attention genuinely degrades, and short recovery restores it.',
  },
  {
    q: 'What if I can only manage 2 hours a day?',
    a: 'Two genuinely focused hours of active recall — blurting, past-paper questions, flashcards — outperforms six hours of note re-reading. If your time is tight, spend all of it on retrieval practice on your weakest topics, and let a timetable decide which topic each day so no subject silently disappears.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        During term time, 1–1.5 hours per subject per week of real consolidation is enough for Year 12, rising
        to 2 hours in Year 13. In holidays, 1.5–2 focused hours a day. During exam season, 4–6 hours a day in
        blocks — and almost never more than that. The multiplier is not the hour count; it is whether those
        hours are spent on active recall rather than re-reading notes.
      </QuickAnswer>

      <Lead>
        &quot;How many hours do you revise?&quot; is the most-asked and worst question in every sixth form common room. I
        got top A-level grades and then survived a medical degree, and the honest answer is that the students
        pulling 8-hour library days were rarely the ones at the top of the results list. Hours are an input.
        Exams pay for output. Here are the actual numbers that matter — by year group and time of year — and the
        reason &quot;more hours&quot; so often produces worse results.
      </Lead>

      <KeyTakeaways
        points={[
          'Year 12 term time: 4–6 hours a week of consolidation beyond homework. Year 13 term time: 6–8 hours a week.',
          'Holidays: 1.5–2 focused hours a day, five days a week — including the crucial Year 12 summer.',
          'Exam season: 4–6 hours a day in 45–60 minute blocks. The hours past six add almost nothing.',
          'One focused hour of active recall outperforms three passive hours of re-reading — technique is the multiplier on time.',
          'Sleep is part of revision: memory consolidates overnight, so late-night cramming actively undoes the day’s work.',
        ]}
      />

      <H2 id="why-hours-is-wrong">Why &quot;how many hours&quot; is the wrong question</H2>
      <P>
        Two students revise for the same biology exam. Student A spends six hours re-reading and highlighting
        notes — it feels thorough, and the familiar pages feel like knowledge. Student B spends two hours doing
        past-paper questions and <A href="/blog/blurting-method-a-level-revision/">blurting</A> — repeatedly
        forcing content out of their memory and checking the gaps. Student B walks in better prepared, in a third
        of the time. This isn&apos;t motivational fluff; the superiority of retrieval practice over re-reading is one
        of the most consistent findings in learning research.
      </P>
      <P>
        So the real question is: <Strong>how many hours of high-quality retrieval practice, spaced across the
        week, does each stage of A-levels need?</Strong> That has concrete answers.
      </P>

      <H2 id="by-stage">The numbers, by year group and season</H2>
      <H3>Year 12, term time: 4–6 hours a week</H3>
      <P>
        On top of homework, aim for 1–1.5 hours per subject per week of genuine consolidation: turning the week&apos;s
        lessons into flashcards, blurting the new topics, doing a handful of exam questions. It sounds
        undramatic. It is also precisely what separates students who arrive at Year 12 exams calm from those who
        discover in May that they have a year of debt to repay — and Year 12 exams largely set your
        <A href="/blog/how-to-improve-predicted-grades/"> predicted grades</A>.
      </P>
      <H3>The Year 12 summer: 1.5–2 hours a day</H3>
      <P>
        Two weeks of full rest, then roughly 60–80 hours across the holiday split between repairing weak Year 12
        topics and previewing early Year 13 content. This is the highest-leverage revision period of the entire
        two years — we&apos;ve written a <A href="/blog/year-12-summer-revision/">complete guide to the Year 12
        summer</A>.
      </P>
      <H3>Year 13, term time: 6–8 hours a week</H3>
      <P>
        Two hours per subject: one consolidating new content, one retrieving older content so it doesn&apos;t decay.
        The students who do this hit spring needing to <em>polish</em>; everyone else hits spring needing to
        <em> relearn</em>.
      </P>
      <H3>Easter and exam season: 4–6 hours a day</H3>
      <P>
        Three blocks of 90–120 minutes, each with breaks inside it. Prioritise past papers under timed conditions
        and recall on weak topics. Six hours of this, daily, is a formidable amount of work — students who claim
        ten are usually counting the time their notes were open, not the time their brain was.
      </P>

      <Callout title="The 8-hour myth">
        Focused attention is a depleting resource. Studies of deliberate practice across fields keep finding the
        same ceiling: around 4–5 hours of genuinely demanding mental work a day, even for elite performers. A
        17-year-old announcing 10-hour revision days is describing 4 hours of work stretched across 10 hours of
        low-grade guilt — with the added cost of exhaustion, and none of the sleep that consolidates memory.
      </Callout>

      <H2 id="structure">Structure beats willpower</H2>
      <UL>
        <LI>
          <Strong>Work in blocks:</Strong> 45–60 minutes on, 10–15 off. One topic per block, chosen in advance —
          deciding what to revise <em>during</em> revision time is how an hour disappears.
        </LI>
        <LI>
          <Strong>Space your subjects:</Strong> revisit each topic on a rising interval (next day, then day 3–4,
          then a week later) rather than binging one subject for a week. Interleaving feels harder; it remembers
          better.
        </LI>
        <LI>
          <Strong>Protect sleep like a grade depends on it,</Strong> because it does — overnight consolidation is
          when the day&apos;s retrieval practice gets written into long-term memory.
        </LI>
        <LI>
          <Strong>Put the phone in a different room.</Strong> Every glance costs the several minutes of refocusing
          that follow it. Most &quot;six-hour days&quot; contain ninety phone-minutes nobody counted.
        </LI>
      </UL>

      <P>
        If you&apos;d rather not hand-build the schedule, this is exactly what our free tool does: it takes your
        subjects, weak topics and fixed commitments, and generates a weekly plan with spaced repetition and
        active-recall sessions already placed.
      </P>

      <TrackerCTA />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        Revise less than you feared, better than you planned. During term, protect a modest weekly rhythm. In
        holidays, two good morning hours. In exam season, four to six serious ones. Spend them on retrieval —
        blurting, flashcards, past papers — and spend them on your weakest topics, which is where every cheap
        mark lives. The student doing that for three hours a day will beat the eight-hour highlighter every
        single time.
      </P>

      <CourseCTA
        heading="Want the hours to count for more?"
        body="Our live small-group A-level courses in Biology, Chemistry, Maths and Physics teach the high-yield content and exam technique directly — so your independent hours go further. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
      />
    </ArticleLayout>
  )
}
