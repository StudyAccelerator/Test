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
    url: `${SITE_URL}/blog/${post.slug}/`,
  },
}

const faqs: FAQ[] = [
  {
    q: 'How long is the new UCAS personal statement?',
    a: "4,000 characters including spaces, which works out at roughly 600 to 700 words. That total covers all three answers combined, and each answer must be at least 350 characters. Beyond that minimum the split is entirely yours, so weight the space towards wherever your strongest evidence sits rather than dividing it into three equal blocks.",
  },
  {
    q: 'What are the three questions on the UCAS personal statement?',
    a: 'Question one asks why you want to study this course or subject. Question two asks how your qualifications and studies have prepared you for it. Question three asks what else you have done outside education to prepare. All three answers share one 4,000 character budget, with a minimum of 350 characters each, and universities read them exactly as you wrote them.',
  },
  {
    q: 'When is the UCAS deadline for 2027 entry?',
    a: "Applications can be submitted from 1 September 2026. The deadline for Oxford, Cambridge and most medicine, dentistry and veterinary courses is 6pm UK time on 15 October 2026. Most other courses have an equal consideration deadline of 6pm on 13 January 2027. Your school's internal deadlines will land earlier than all of these, usually in the autumn term, so plan around those.",
  },
  {
    q: 'Can I use ChatGPT to write my UCAS personal statement?',
    a: "You shouldn't. Statements pass through similarity software, and admissions tutors read enough of them to recognise AI's fluent, empty style very quickly. AI-written answers are generic by design, and generic loses against an applicant with real examples. Use a tool to check grammar if you like, but the ideas, the evidence and the voice have to be yours.",
  },
  {
    q: 'How should I split the 4,000 characters between the three answers?',
    a: "There's no official split beyond the 350 character minimum per answer. For most applicants question one deserves the largest share, because it carries the core argument for your place. Give question two more room if you have an EPQ or coursework that maps onto the degree, and question three more if you're applying for a vocational course where experience matters, such as medicine or nursing.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Since 2026 entry, the UCAS personal statement is three set questions instead of one open essay:
        why you want to study this course or subject, how your qualifications and studies have prepared
        you, and what else you have done outside education to prepare. You get 4,000 characters in total,
        spaces included, with a minimum of 350 characters per answer and the split left to you. Answer
        each question with specific evidence, give question one the biggest share, and draft in the
        summer, because school deadlines arrive well before the real ones.
      </QuickAnswer>

      <Lead>
        4,000 characters. That&apos;s what UCAS gives you to argue for the next three years of your life.
        Not 4,000 words: characters, spaces included, which comes out at somewhere around 600 to 700
        words of actual writing. And since 2026 entry you don&apos;t spend them on one open essay any
        more. The blank page has been replaced by three set questions, each with a minimum of 350
        characters, and everything you want an admissions tutor to know has to fit inside them. Most
        students relax when they hear &quot;questions&quot;, because questions sound easier than essays.
        They&apos;re not. A blank page lets you hide behind waffle. A direct question exposes the dodge
        instantly.
      </Lead>

      <KeyTakeaways
        points={[
          'The blank-page essay is gone. Three set questions structure every personal statement, and each answer needs at least 350 characters.',
          'The budget is 4,000 characters including spaces, roughly 600 to 700 words. You choose the split, and question one usually deserves the most.',
          'Specific evidence wins: a topic that gripped you and what you did about it beats any paragraph of adjectives.',
          'Draft in the summer. Schools set internal deadlines weeks before the real ones, and 15 October 2026 is the deadline for medicine and Oxbridge.',
          'Write a bad first draft in your own voice, then edit hard. Admissions tutors and their software can spot AI-written mush.',
        ]}
      />

      <H2 id="question-one">Question 1: &quot;Why do you want to study this course or subject?&quot;</H2>
      <P>
        What the tutor is actually asking is not &quot;do you like it?&quot;. Every applicant likes it, or
        says so. The real question is whether you&apos;ve met the subject properly, the version that exists
        beyond the A-level specification, and whether you moved towards it under your own steam.
        Curiosity that never turned into action isn&apos;t curiosity. It&apos;s a preference.
      </P>
      <P>
        So the evidence that belongs here is specific. One or two moments where a topic gripped you, and
        what you did next. A unit in class raised a question the textbook didn&apos;t answer, so you found
        the lecture, the paper, the podcast, the documentary, and it changed how you saw the subject.
        That chain, interest then action then thought, is what an admissions tutor reads for, because it
        predicts how you&apos;ll behave on their course. &quot;I find chemistry fascinating&quot; carries no
        information. Which topic? What did you do about it? What did you conclude?
      </P>
      <UL>
        <LI>
          <Strong>The famous quote opener.</Strong>{' '}Tutors have read that Einstein line hundreds of
          times, and it spends your tightest characters on someone else&apos;s words. Open with your own
          thinking.
        </LI>
        <LI>
          <Strong>&quot;From a young age I have always been passionate about medicine.&quot;</Strong>{' '}
          Nobody chose their degree at seven, the claim can&apos;t be evidenced, and every tutor scrolls
          straight past it.
        </LI>
        <LI>
          <Strong>Adjective stacking.</Strong>{' '}&quot;Fascinating, dynamic and constantly changing&quot;
          describes nothing. One concrete example outworks ten adjectives.
        </LI>
      </UL>

      <H2 id="question-two">Question 2: &quot;How have your qualifications and studies prepared you?&quot;</H2>
      <P>
        This one asks you to draw a line from what you&apos;ve studied to what you&apos;re applying for. The
        tutor already has your subjects, your grades and your predictions on the form, so repeating the
        list wastes characters. What they can&apos;t see is which parts of your studies actually matter for
        this degree, and whether you understand the connection.
      </P>
      <P>
        Point at content and skills, specifically. The statistics you used to test a hypothesis in
        biology coursework. The essay feedback in history that taught you to argue from evidence rather
        than assert. An EPQ, if you did one, is gold here: it&apos;s the closest thing sixth form offers to
        undergraduate work, so show what you researched and what the process taught you. Then close the
        loop and say why that preparation matters for this course in particular. Your grades tell the
        tutor what you achieved. This answer tells them what you can do with it, which is a different
        thing.
      </P>
      <UL>
        <LI>
          <Strong>Restating your subject list.</Strong>{' '}&quot;I study biology, chemistry and
          maths&quot; tells the tutor nothing the form hasn&apos;t already.
        </LI>
        <LI>
          <Strong>Describing the syllabus instead of your response to it.</Strong>{' '}They know what
          A-level chemistry covers. They don&apos;t know what you did with it.
        </LI>
        <LI>
          <Strong>Claiming skills without a receipt.</Strong>{' '}&quot;My A-levels taught me time
          management and teamwork&quot; convinces nobody. Show the moment the skill was earned.
        </LI>
      </UL>

      <H2 id="question-three">Question 3: &quot;What else have you done outside education to prepare?&quot;</H2>
      <P>
        This is the widest question and the most commonly fluffed. It covers work experience, part-time
        jobs, volunteering, caring responsibilities, clubs, competitions, wider reading, online courses:
        anything outside a classroom that got you ready for this course. And what the tutor is testing
        isn&apos;t the prestige of the list. It&apos;s whether you can reflect. A Saturday job dealing with
        difficult customers, reflected on honestly, outscores a fortnight of expensive shadowing
        described like an itinerary.
      </P>
      <P>
        The structure that works: what you did, what you noticed, and what it changed about your
        understanding of the course or the career it leads to. For vocational degrees like medicine,
        nursing and teaching, this answer carries real weight, because the tutor needs proof you&apos;ve
        seen the job as it actually is and still want it.
      </P>
      <UL>
        <LI>
          <Strong>The CV dump.</Strong>{' '}Twelve activities, zero reflection. Three experiences with
          genuine thought beat twelve without.
        </LI>
        <LI>
          <Strong>The sob story without relevance.</Strong>{' '}Difficult personal circumstances can
          belong in a statement, but only connected to what they built in you that this course needs.
          Hardship alone isn&apos;t an argument; what you did inside it can be. Pure context is often
          better carried by your referee.
        </LI>
        <LI>
          <Strong>Ancient history.</Strong>{' '}The Year 9 certificate doesn&apos;t show who you are at 18.
          Recent and relevant beats old and impressive.
        </LI>
      </UL>

      <H2 id="dividing-the-characters">How to divide the 4,000 characters</H2>
      <P>
        There&apos;s no single right split, and UCAS doesn&apos;t impose one beyond the minimum of 350
        characters per answer. But the weighting should follow the argument, and for most applicants
        that means <Strong>question one gets the biggest share</Strong>. It carries the heart of the
        case: this course, and your evidence that you belong on it. A sensible default is to give
        question one close to half the budget and split the rest according to where your strongest
        material sits. Strong EPQ or relevant coursework? Question two grows. Applying for a vocational
        course where experience is half the argument? Question three grows.
      </P>
      <Callout title="The floor is not a target">
        4,000 characters disappears faster than you expect: it&apos;s roughly 600 to 700 words across all
        three answers, so every sentence has to earn its slot. And the 350 character minimum is a floor,
        nothing more. An answer that limps to 360 characters reads like you had nothing to say, and
        tutors notice which question you dodged.
      </Callout>

      <H2 id="drafting-timeline">The drafting timeline: start earlier than feels necessary</H2>
      <P>
        For 2027 entry the dates are set. Applications can be submitted to UCAS from 1 September 2026.
        The deadline for Oxford, Cambridge and most medicine, dentistry and veterinary courses is 6pm UK
        time on 15 October 2026. Most other courses have until 6pm on 13 January 2027 for equal
        consideration. I&apos;ve broken the full calendar down in{' '}
        <A href="/blog/ucas-deadlines-2027-entry/">the UCAS deadlines guide</A>.
      </P>
      <P>
        But those aren&apos;t the deadlines that catch people. Your school will set internal deadlines well
        before the real ones, often within the first weeks of the autumn term, because your reference
        and your predicted grades are being assembled at the same time. Predictions are typically set in
        September or October, built mostly from your end-of-Year-12 evidence, so the fortnight
        you&apos;re polishing your statement is the same fortnight your teachers are deciding{' '}
        <A href="/blog/predicted-grades-lower-than-expected/">the grades that frame it</A>. Medicine
        applicants carry the UCAT in the same season too. October is crowded. Don&apos;t let it all land
        at once.
      </P>
      <P>
        So the move is boring and it works: a rough draft in August. It doesn&apos;t need to be good. It
        needs to exist, because an August draft turns a September crisis into a September edit. The
        whole pre-Year 13 summer plan, statement included, is in{' '}
        <A href="/blog/how-to-prepare-for-year-13/">the Year 13 preparation guide</A>.
      </P>

      <H2 id="write-it-badly-first">Write it badly first: the honest section about AI</H2>
      <P>
        I&apos;ll say the quiet part directly. A lot of statements this cycle will be drafted by AI, and
        admissions teams know it. Statements pass through similarity software, and tutors who read
        hundreds of them develop an ear for the mush: sentences that are grammatically perfect and
        completely empty, the same polished phrases surfacing in statement after statement. AI writing
        is fluent about nothing. Your statement has to be specific about you, which is the one thing a
        chatbot cannot supply.
      </P>
      <P>
        The fix is the oldest writing advice there is: <Strong>write it badly first</Strong>. Answer
        each question the way you&apos;d explain it to a friend, out loud if that helps, typos and all.
        That draft will be rough and it will be yours, and yours is the raw material that survives
        editing. Then rewrite it three or four times, cutting every sentence that could appear in
        anyone else&apos;s statement. Read it aloud at the end. If a sentence doesn&apos;t sound like
        something you would say, it goes.
      </P>
      <P>
        One last thing. The statement is one piece of a bigger autumn, and the other piece,{' '}
        <A href="/blog/how-to-improve-predicted-grades/">your predicted grades</A>, is decided in the
        same few weeks. I write one short email every Sunday for A-level students on exactly this kind
        of thing: revision that works, UCAS moves, running Year 13 properly. It&apos;s free, and you can
        join at <A href="/newsletter/">The Sunday Session</A>. Now go and write the bad draft. The good
        one is hiding inside it.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI>
          <A href="https://www.ucas.com/applying/applying-to-university/writing-your-personal-statement/the-new-personal-statement-for-2026-entry">
            UCAS: the new personal statement (the three questions and character rules)
          </A>
        </LI>
        <LI>
          <A href="https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications">
            UCAS: dates and deadlines for uni applications
          </A>
        </LI>
      </UL>
    </ArticleLayout>
  )
}
