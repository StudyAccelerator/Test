import type { Metadata } from 'next'
import {
  ArticleLayout,
  Lead,
  P,
  H2,
  UL,
  LI,
  Strong,
  A,
  QuickAnswer,
  KeyTakeaways,
  Callout,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('ucas-personal-statement-three-questions')!

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
    q: 'What are the three UCAS personal statement questions?',
    a: 'Question 1: Why do you want to study this course or subject? Question 2: How have your qualifications and studies helped you to prepare for this course or subject? Question 3: What else have you done to prepare outside of education, and why are these experiences useful? You answer all three in separate boxes, and universities read the three answers together as one statement.',
  },
  {
    q: 'How long should each personal statement answer be?',
    a: "The overall limit is 4,000 characters including spaces across all three answers, and each answer must be at least 350 characters. Beyond that, the split is yours. A sensible default is weighting question 1 heaviest, with questions 2 and 3 sharing the rest according to where your strongest evidence lives, but there is no official ideal split: the strength of the evidence should decide it, not a formula.",
  },
  {
    q: 'When is the personal statement deadline for 2027 entry?',
    a: "The statement goes in with your whole application: 6pm on 15 October 2026 for Oxford, Cambridge and most medicine, dentistry and veterinary courses, and 6pm on 13 January 2027 for most other courses. The deadline that actually governs you is earlier: your school's internal deadline for references and checks, which often sits weeks before the national one. Ask for it this week if you don't know it.",
  },
  {
    q: 'Can I use AI to write my personal statement?',
    a: "Not to write it, and not because you might not get away with it: because AI-written statements read as exactly what they are, generic and evidence-free, and admissions tutors read thousands. The statement's whole value is specific things YOU did and what you took from them, which no tool can invent for you. Drafting badly in your own words and editing it sharp beats a polished paragraph that says nothing every single time. And the statement has to survive the interview sitting next to it: if you can't talk naturally about what you wrote, it wasn't yours.",
  },
  {
    q: 'What makes a strong answer to the first question?',
    a: 'Specific evidence of genuine engagement, not declared passion. The pattern that works: a real moment where the subject caught you (a topic, a problem, a question you met), what you did about it off your own bat (read, watched, built, investigated), and what that tells you about why this course fits. "I have always been passionate about chemistry" earns nothing. "The mechanism I couldn\'t explain, and the two weeks I spent finding out why" earns the interview.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        The UCAS personal statement is three questions: why this course, how your studies have prepared
        you, and what you&apos;ve done outside education to prepare. You get 4,000 characters including
        spaces across all three answers, minimum 350 per answer, split as you choose, and universities
        read them as one statement. The method that works: gather your specific evidence first, weight
        question 1 heaviest, write every claim as a concrete thing you did plus what you took from it,
        and have a full draft before your school&apos;s internal deadline, which lands well before 15
        October 2026 (Oxbridge and most medicine) or 13 January 2027 (most other courses).
      </QuickAnswer>

      <Lead>
        4,000 characters. That&apos;s the space you get to argue for the next three years of your life, split across three set questions. Students treat it as an essay-writing
        problem. It isn&apos;t. It&apos;s an evidence problem. Across more than 1,000 students I&apos;ve read draft after draft, and the weak ones are always beautifully written claims about passion, while the strong ones are plainly written lists of things the student actually did. The three-question format rewards the second
        kind more than the old single essay ever did, and that&apos;s good news, because evidence can be
        gathered on purpose.
      </Lead>

      <KeyTakeaways
        points={[
          'Three set questions, 4,000 characters total including spaces, minimum 350 per answer, your choice of split. Universities read the three answers as one statement.',
          'Every sentence should carry evidence: a specific thing you did, plus what it taught you about the course. Adjectives about passion earn nothing.',
          'Weight question 1 heaviest by default, then split 2 and 3 by where your real evidence lives.',
          'Your school\'s internal deadline is the real one, weeks before UCAS\'s 15 October 2026 (Oxbridge, most medicine) and 13 January 2027 dates.',
          'Draft badly in your own voice first, then edit sharp. AI-written statements read generic and evidence-free to people who mark thousands.',
        ]}
      />

      <H2 id="the-format">The format, so we&apos;re precise</H2>
      <P>
        Since the 2026 application cycle, the single personal statement essay is gone. In its place,
        three set questions, each answered in its own box:{' '}
        <Strong>why do you want to study this course or subject</Strong>,{' '}
        <Strong>how have your qualifications and studies helped you to prepare</Strong>, and{' '}
        <Strong>what else have you done to prepare outside of education, and why are these experiences
        useful</Strong>. The limits: 4,000 characters including spaces across the three answers combined,
        and at least 350 characters in each box. Universities receive the three answers together and read
        them as one statement, so the questions are structure, not walls: a thread can run through all
        three.
      </P>

      <H2 id="question-1">Question 1: why this course? Show the moment, not the passion</H2>
      <P>
        What admissions tutors are actually asking: is your interest real, specific and yours, or
        assembled the night before? The test they apply is simple, and you can apply it to your own
        draft: could another applicant have written this sentence? &quot;I have always been fascinated by medicine&quot; turns up in thousands of statements a year. What can&apos;t be copied is the
        specific moment your subject caught you and what you did next: the topic that didn&apos;t make
        sense until it suddenly did, the question your teacher couldn&apos;t fully answer, the thing you
        then read, watched or worked through off your own bat. Structure the answer as two or three of
        those engagements, each with the same shape: what it was, what you did, what it showed you about
        why this course fits you. Weight this answer heaviest in your character split. It&apos;s the one
        that carries the &quot;why you&quot;.
      </P>

      <H2 id="question-2">Question 2: how have your studies prepared you? Skills, not syllabus</H2>
      <P>
        The trap here is writing a subject list: &quot;Biology taught me about cells and Chemistry taught
        me about bonding.&quot; The tutor knows the A-level syllabus. What they&apos;re asking is what
        studying it built in you that the course will use. So pick the two or three genuine bridges:
        the practical write-ups that taught you to handle messy data, the maths that made the
        quantitative side of the course unthreatening, the essay subject that taught you to build an
        argument from sources. Name the skill, evidence it with something specific you did in the
        classroom, and connect it forward to the course. If your grades dipped somewhere, this answer is
        not the confession box: the reference handles context, and{' '}
        <A href="/blog/predicted-grades-lower-than-expected/">a weaker prediction is fought with
        evidence, not statement apologies</A>.
      </P>

      <H2 id="question-3">Question 3: what else have you done? Reflection beats inventory</H2>
      <P>
        The third box is where students dump the CV: jobs, clubs, awards, the school trip. An inventory
        earns almost nothing, because the question&apos;s second half is the actual question: <Strong>why
        are these experiences useful?</Strong>{' '}One experience, reflected on properly, beats five
        listed. The part-time job becomes evidence when you write what it taught you about dealing with
        people who are stressed and rude, and why that matters for a ward, a classroom or a courtroom.
        Choose the two or three experiences with the clearest bridge to the course, and spend your
        characters on the bridge, not the job title. If your list feels thin, that&apos;s a September
        problem with an October fix: a public lecture attended, a serious book worked through and argued
        with, a free online course finished. Small is fine. Specific and reflected-on is the bar.
      </P>

      <Callout title="Dividing the 4,000 characters">
        There&apos;s no official split, and anyone selling you one is guessing. The honest default: make
        question 1 the biggest answer, and divide the rest by where your strongest material genuinely
        sits. A student with two years of relevant work experience tilts toward question 3; a student
        whose case is academic tilts toward 2. Write all three long first, then cut to fit: cutting
        weak sentences from strong drafts beats padding thin ones every time.
      </Callout>

      <H2 id="timeline">The timeline that keeps this calm</H2>
      <UL>
        <LI><Strong>Now:</Strong>{' '}gather evidence into a rough document before you write a single styled sentence: moments, projects, reading, experiences, one line each on what it taught you.</LI>
        <LI><Strong>This month:</Strong>{' '}full ugly draft, your own words, all three answers over-length. Show it to one teacher and one person who knows you well.</LI>
        <LI><Strong>Then:</Strong>{' '}two or three editing passes: first for evidence (every claim carries a specific), then for cut (down to 4,000), last for voice (does it sound like you on a good day?).</LI>
        <LI><Strong>The deadlines:</Strong>{' '}6pm on 15 October 2026 for Oxford, Cambridge and most medicine, dentistry and veterinary; 6pm on 13 January 2027 for most other courses. Your school&apos;s internal deadline sits weeks earlier and is the one to write on your wall.</LI>
      </UL>
      <P>
        The statement is one part of an application that also carries your predicted grades, and the
        same weeks you&apos;re drafting are the weeks predictions can still move:{' '}
        <A href="/blog/how-to-improve-predicted-grades/">the predicted grades playbook</A>{' '}runs in
        parallel with this one. And if you want one useful revision or application method in your inbox
        every week while you&apos;re at it, that&apos;s exactly what{' '}
        <A href="/newsletter/">The Sunday Session</A>{' '}is for.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI><A href="https://www.ucas.com/applying/applying-to-university/writing-your-personal-statement/how-to-write-your-personal-statement-for-2026-entry-onwards">UCAS: the personal statement for 2026 entry onwards (the three questions, character limits)</A></LI>
        <LI><A href="https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications">UCAS: dates and deadlines for university applications</A></LI>
      </UL>
    </ArticleLayout>
  )
}
