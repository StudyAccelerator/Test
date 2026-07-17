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
    images: ['/og-default.png'],
    url: `${SITE_URL}/blog/${post.slug}/`,
  },
}

const faqs: FAQ[] = [
  {
    q: 'How many hours a day should I revise during exam season?',
    a: 'During study leave and exam season, 4 to 6 focused hours a day is the realistic maximum for most students, split into three blocks with proper breaks. Beyond that, quality collapses. You end up re-reading rather than testing yourself, and you borrow energy from tomorrow. Going past 8 hours is almost never worth it. That marginal hour adds close to nothing.',
  },
  {
    q: 'How many hours a week should a Year 12 student study outside lessons?',
    a: 'During term time, aim for around 1.5 hours per subject per week of genuine consolidation on top of homework. So roughly 4 to 6 hours a week across three or four subjects. It sounds modest, but done weekly with active recall it stops the content debt building up, which is what forces panicked 8-hour days later.',
  },
  {
    q: 'Is it better to revise in the morning or at night?',
    a: 'The best time is whenever you can reliably focus. Consistency beats everything else. That said, most students focus better earlier. A morning block gets done before the day wears down your willpower, and late-night sessions cost you sleep, which is when memories actually consolidate. Sacrificing sleep to revise means trading away the thing that makes revision work.',
  },
  {
    q: 'How long should each revision session be?',
    a: 'Work in blocks of 45 to 60 minutes with breaks of 10 to 15 minutes, or 25-minute Pomodoro cycles if your focus is shaky. One subject or one topic per block. The break is part of the method. Your attention genuinely runs down, and a short recovery restores it.',
  },
  {
    q: 'What if I can only manage 2 hours a day?',
    a: 'Two genuinely focused hours of active recall (blurting, past paper questions, flashcards) beats six hours of re-reading notes. If your time is tight, spend all of it testing yourself on your weakest topics, and let a timetable decide which topic each day so no subject silently disappears.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        During term time, 1 to 1.5 hours per subject per week of real consolidation is enough for Year 12,
        rising to 2 hours in Year 13. In the holidays, 1.5 to 2 focused hours a day. During exam season, 4 to 6
        hours a day in blocks, and almost never more than that. But the multiplier isn&apos;t the hour count. It&apos;s
        whether those hours go on testing yourself rather than re-reading your notes.
      </QuickAnswer>

      <Lead>
        &quot;How many hours do you revise?&quot; It&apos;s the most asked question in every sixth form common room, and it&apos;s
        the wrong one. I got top A-level grades and then survived a medical degree, and I can tell you honestly:
        the students pulling 8-hour library days were rarely the ones at the top of the results list. Hours are
        an input. Exams pay for output. So let&apos;s go through the actual numbers that matter, by year group and
        time of year, and why doing more so often produces less.
      </Lead>

      <KeyTakeaways
        points={[
          'Year 12 term time: 4 to 6 hours a week of consolidation beyond homework. Year 13 term time: 6 to 8 hours a week.',
          'Holidays: 1.5 to 2 focused hours a day, five days a week. That includes the all-important Year 12 summer.',
          'Exam season: 4 to 6 hours a day in blocks of 45 to 60 minutes. The hours past six add almost nothing.',
          'One focused hour of active recall beats three passive hours of re-reading. Technique multiplies time.',
          "Sleep is part of revision. Your memory consolidates overnight, so late-night cramming actively undoes the day's work.",
        ]}
      />

      <H2 id="why-hours-is-wrong">Why &quot;how many hours&quot; is the wrong question</H2>
      <P>
        Let me give you two students revising for the same biology exam. Student A spends six hours re-reading
        and highlighting notes. It feels thorough, and the familiar pages feel like knowledge. Student B spends
        two hours doing past paper questions and <A href="/blog/blurting-method-a-level-revision/">blurting</A>,
        repeatedly forcing content out of their memory and checking the gaps. Student B walks in better
        prepared, in a third of the time. That&apos;s not a motivational poster. The advantage of testing yourself
        over re-reading is one of the most consistent findings in the whole science of learning.
      </P>
      <P>
        So the real question is this. How many hours of high-quality recall practice, spread across the week,
        does each stage of A-levels need? And that has concrete answers.
      </P>

      <H2 id="by-stage">The numbers, by year group and season</H2>
      <H3>Year 12, term time: 4 to 6 hours a week</H3>
      <P>
        On top of homework, aim for around 1.5 hours per subject per week of genuine consolidation. Turn the
        week&apos;s lessons into flashcards, blurt the new topics, do a handful of exam questions. It sounds
        undramatic. It&apos;s also exactly what separates students who arrive at Year 12 exams calm from students
        who discover in May that they&apos;ve got a year of debt to repay. And remember, Year 12 exams largely set
        your <A href="/blog/how-to-improve-predicted-grades/">predicted grades</A>.
      </P>
      <H3>The Year 12 summer: 1.5 to 2 hours a day</H3>
      <P>
        Two weeks of full rest, then roughly 30 to 50 focused hours across the holiday, split between repairing weak
        Year 12 topics and previewing early Year 13 content. Hour for hour, this is the most valuable revision period of
        the entire two years. I&apos;ve written a <A href="/blog/year-12-summer-revision/">complete guide to the
        Year 12 summer</A>.
      </P>
      <H3>Year 13, term time: 6 to 8 hours a week</H3>
      <P>
        Two hours per subject. One consolidating new content, one retrieving older content so it doesn&apos;t
        decay. Students who do this hit spring needing to polish. Everyone else hits spring needing to
        relearn.
      </P>
      <H3>Easter and exam season: 4 to 6 hours a day</H3>
      <P>
        Three blocks of 90 to 120 minutes, each with breaks inside it. Prioritise past papers under timed
        conditions and recall work on your weak topics. Six hours of this, daily, is a serious amount of work.
        Students who claim ten are usually counting the time their notes were open, not the time their brain
        was.
      </P>

      <Callout title="The 8-hour myth">
        Focused attention runs out. Studies of deliberate practice across every field keep finding the same
        ceiling: around 4 to 5 hours of genuinely demanding mental work a day, even for elite performers. So
        when a seventeen-year-old announces 10-hour revision days, what they&apos;re usually describing is 4 hours
        of work stretched across 10 hours of low-grade guilt. Plus exhaustion, minus the sleep that
        consolidates memory.
      </Callout>

      <H2 id="structure">Structure beats willpower</H2>
      <UL>
        <LI>
          Work in blocks. 45 to 60 minutes on, 10 to 15 off. One topic per block, chosen in advance. Deciding
          what to revise during revision time is how an hour disappears.
        </LI>
        <LI>
          Space your subjects. Revisit each topic on a rising interval (next day, then day 3 or 4, then a week
          later) rather than binging one subject for a week. Mixing feels harder. It sticks better.
        </LI>
        <LI>
          Protect your sleep like a grade depends on it, because it does. Overnight is when the day&apos;s recall
          practice gets written into long-term memory.
        </LI>
        <LI>
          Put your phone in a different room. Every glance costs you the several minutes of refocusing that
          follow it. Most &quot;six-hour days&quot; contain ninety phone-minutes that nobody counted.
        </LI>
      </UL>

      <P>
        If you&apos;d rather not build the schedule by hand, this is exactly what our free tool does. It takes your
        subjects, weak topics and fixed commitments, and generates a weekly plan with spaced repetition and
        active recall sessions already placed.
      </P>

      <TrackerCTA />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        Revise less than you feared, better than you planned. During term, protect a modest weekly rhythm. In
        the holidays, two good morning hours. In exam season, four to six serious ones. Spend them testing
        yourself, and spend them on your weakest topics, because that&apos;s where every cheap mark lives. The
        student doing that for three hours a day beats the eight-hour highlighter every single time.
      </P>

      <CourseCTA
        heading="Want the hours to count for more?"
        body="Our live small-group A-level courses in Biology, Chemistry, Maths and Physics teach the high-yield content and exam technique directly, so your independent hours go further. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
      />
    </ArticleLayout>
  )
}
