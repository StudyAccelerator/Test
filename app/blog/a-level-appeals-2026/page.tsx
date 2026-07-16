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
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('a-level-appeals-2026')!

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
    q: 'Can A-level grades go down on appeal?',
    a: 'Yes. A clerical re-check or review of marking can lower your mark and your grade as well as raise it, and you have to give written consent acknowledging that before the review starts. The one exception: a review of moderation cannot lower your published subject grade in that exam series. This is why the sensible filter is boundary distance: ask how many marks you are from the next grade, in both directions, before you request anything.',
  },
  {
    q: 'How long does an A-level appeal take in 2026?',
    a: 'A priority review of marking, the route for students whose university place depends on the result, must be requested by 20 August 2026 and comes back within 15 calendar days. Standard reviews can be requested until 24 September 2026: a clerical re-check takes up to 10 days, a review of marking up to 20 days, and a review of moderation up to 35 days. A formal appeal to the exam board after a review adds further weeks, which is why most university-dependent cases live or die at the priority review stage.',
  },
  {
    q: 'How much does it cost to appeal an A-level grade?',
    a: 'Fees are set by each exam board and charged per subject or unit. As a guide for summer 2026: AQA charges £9.70 per unit for a clerical re-check, £51.95 for an A-level review of marking and £61.70 for the priority version; Pearson Edexcel charges £14, £57 and £68 for the equivalents, and charges nothing if your overall grade changes. Formal appeal fees are refunded if the appeal is upheld. Check your own board\'s current fee page before requesting, and note some schools cover or pass on these fees differently.',
  },
  {
    q: 'What is the difference between a remark and an appeal?',
    a: 'What most people call a remark is officially a review of marking: an examiner checks whether the original marking followed the mark scheme correctly. An appeal is the formal stage after that, where you challenge the review\'s outcome with the exam board, and beyond that sits Ofqual\'s Exam Procedures Review Service. Nearly every grade change that happens, happens at the review stage.',
  },
  {
    q: 'Can I request a review myself, or does it have to go through school?',
    a: 'Post-results services go through the centre that entered you for the exam, so for most students that means the school or college exams office, and results week is when they are set up to move fast. Private candidates use the exam centre where they sat the papers. Either way, start the conversation on results morning if a university place depends on the outcome, because the priority deadline of 20 August 2026 arrives quickly.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        There&apos;s no button marked &quot;appeal&quot;. What exists in 2026 is a ladder: a clerical re-check, a
        review of marking (what most people call a remark), and a review of moderation, all requested
        through your school, then a formal appeal to the exam board if you believe the review went wrong.
        If a university place depends on it, request a priority review of marking by 20 August 2026 and
        you&apos;ll have the answer within 15 days. Two facts before you start: grades can go down as well as
        up, and the best predictor of a worthwhile review is how close your mark sits to a boundary.
      </QuickAnswer>

      <Lead>
        The most dangerous belief about A-level appeals is that they&apos;re a free second roll of the dice.
        They&apos;re not free, they&apos;re not a re-mark of your ability, and they can move your grade in the
        wrong direction. They&apos;re also, for the right student in the right situation, the thing that
        rescues a university place. My job here is to make you the right student: here&apos;s the whole
        system, the 2026 deadlines, the real costs, and the honest decision test.
      </Lead>

      <KeyTakeaways
        points={[
          'The ladder: review of results (clerical re-check, review of marking, review of moderation), then a formal appeal to the exam board, then Ofqual. Everything routes through your school.',
          'Priority review of marking, for university-dependent grades: request by 20 August 2026, answered within 15 calendar days.',
          'Standard requests close 24 September 2026. Clerical takes up to 10 days, review of marking up to 20, moderation up to 35.',
          'Grades can go down as well as up, and you consent to that in writing. Reviews of moderation are the exception: they cannot lower the published grade.',
          'Typical 2026 fees: roughly £50 to £68 for a review of marking depending on the board, often waived or refunded if the grade changes.',
          'The filter that matters: marks-from-boundary. Grade boundaries are published from 8am on results day. Check yours before requesting anything.',
        ]}
      />

      <H2 id="the-ladder">What &quot;appealing&quot; actually means in 2026</H2>
      <P>
        The official name for the machinery is JCQ post-results services, and it&apos;s a three-rung ladder:
      </P>
      <OL>
        <LI>
          <Strong>Reviews of results.</Strong>{' '}Service 1 is a clerical re-check (were the marks added up
          and recorded correctly). Service 2 is a review of marking: a senior examiner checks the original
          marking applied the mark scheme properly. There&apos;s a priority version of Service 2 for students
          whose higher-education place depends on the outcome. Service 3 is a review of moderation and
          applies to internally assessed work.
        </LI>
        <LI>
          <Strong>Appeal to the exam board.</Strong>{' '}If you believe the review itself went wrong, either
          procedurally or in how the mark scheme was applied, your centre can lodge a formal appeal.
        </LI>
        <LI>
          <Strong>Ofqual&apos;s Exam Procedures Review Service.</Strong>{' '}The final rung, which checks whether
          the board followed its own procedures. Very few cases go this far.
        </LI>
      </OL>
      <P>
        You can also request a copy of your marked script (Access to Scripts). If time allows, it&apos;s the
        single most useful thing to look at before paying for anything, because it turns &quot;I&apos;m sure I
        did better&quot; into &quot;question 4 looks under-marked against the scheme&quot;, and your teachers can
        make exactly that judgement with you.
      </P>

      <H2 id="should-you">The decision test: should you ask for a review at all?</H2>
      <P>
        Disappointment is not evidence. Here&apos;s the test I&apos;d apply, in order. <Strong>One:</Strong>{' '}how
        far is the mark from the next boundary? Boundaries are public from 8am on results day; one or two
        marks away is review territory, fifteen is not. <Strong>Two:</Strong>{' '}what does the teacher who
        knows your work say after seeing the script or your paper breakdown? They&apos;ve seen hundreds of
        these. <Strong>Three:</Strong>{' '}what&apos;s actually at stake? A university place changes the maths
        completely; bragging rights don&apos;t. If all three line up, request it on results morning. If they
        don&apos;t, spend your energy on <A href="/blog/didnt-get-the-grades-a-level-results/">the parts of
        results day you can control</A>.
      </P>

      <H2 id="can-they-go-down">Yes, grades can go down. Here&apos;s how to think about that</H2>
      <P>
        Before a clerical re-check or review of marking starts, you sign written consent acknowledging
        that marks and grades can move in either direction. This isn&apos;t small print: papers do get
        re-marked downward. It&apos;s why the boundary check cuts both ways. Two marks above a boundary
        with a shaky paper is a reason <Strong>not</Strong>{' '}to request a review, and a mark comfortably
        mid-grade has little to gain and something to lose. The one carve-out: a review of moderation
        can&apos;t lower your published subject grade in that series.
      </P>

      <H2 id="deadlines">The 2026 deadlines and clocks</H2>
      <UL>
        <LI><Strong>20 August 2026:</Strong>{' '}deadline to request a priority review of marking (university-dependent students). Answered within 15 calendar days.</LI>
        <LI><Strong>24 September 2026:</Strong>{' '}deadline for all other review requests.</LI>
        <LI><Strong>Clocks:</Strong>{' '}clerical re-check up to 10 calendar days; review of marking up to 20; review of moderation up to 35.</LI>
      </UL>
      <Callout title="If a university place hangs on the review">
        Do two things on results morning, in parallel. Ask your school to submit the priority review, and
        phone the university: tell them a priority review is in, and ask whether they&apos;ll hold your place
        for the outcome. Some will. At the same time, protect yourself with a Clearing backup, because the
        most common review outcome is no change. The full playbook for that morning is in{' '}
        <A href="/blog/missed-university-offer-by-one-grade/">the one-grade miss guide</A>.
      </Callout>

      <H2 id="costs">What it costs in 2026</H2>
      <P>
        Boards set their own fees, per subject or unit. AQA this summer: £9.70 for a clerical re-check,
        £51.95 for an A-level review of marking, £61.70 for the priority version, and £299.75 for a review
        of moderation. Pearson Edexcel: £14, £57 and £68 respectively, with scripts free, and no fee at all
        if your overall grade changes. Formal appeal fees are refunded if the appeal is upheld. Always
        check your board&apos;s current fee page, and ask your exams office how payment works at your school,
        because practice varies.
      </P>

      <H2 id="odds">The honest odds</H2>
      <P>
        No one can give you a percentage that means anything for your paper, and I won&apos;t pretend
        otherwise. What&apos;s reliably true: most reviews don&apos;t change the grade, the changes that do
        happen cluster among scripts sitting within a mark or two of a boundary, and clerical errors are
        rare but real. That&apos;s exactly why the decision test above starts with boundary distance rather
        than feelings. Used that way, a review is a precision tool. Used as a lottery ticket, it&apos;s an
        expensive way to extend the worst week of your summer by three more.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI><A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/05/Post-Results-Service_26_FINAL.pdf">JCQ post-results services booklet 2026 (PDF; services, deadlines, consent rules)</A></LI>
        <LI><A href="https://www.aqa.org.uk/exams-administration/after-results/post-results">AQA post-results services and fees, summer 2026</A></LI>
        <LI><A href="https://qualifications.pearson.com/content/dam/pdf/Support/Fees-for-academic-and-vocational-qualifications/post-results-fees-2025-2026-uk.pdf">Pearson Edexcel post-results fees, 2025 to 2026</A></LI>
        <LI><A href="https://www.ocr.org.uk/administration/grade-boundaries/">OCR grade boundaries (publication timing)</A></LI>
      </UL>
    </ArticleLayout>
  )
}
