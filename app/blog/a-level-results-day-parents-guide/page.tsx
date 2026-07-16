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
  DiagnosticCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('a-level-results-day-parents-guide')!

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
    q: 'What time do A-level results come out on 13 August 2026?',
    a: "From 8am, both at school and on UCAS Hub, where your child sees their university decision rather than their grades. If Clearing is needed, choices can only be added in UCAS from 1pm, so the morning is for reading, phoning and thinking, not clicking. One useful fact: schools receive the results the day before under embargo, so the staff at school already know the situation and can help quickly.",
  },
  {
    q: "Can I collect my child's results for them?",
    a: "Usually yes, if it's arranged with the school in advance and in writing; policies vary, so ask the exams office this week rather than on the morning. If your child is abroad or unwell, schools can also often email results or arrange access. What you can't do is handle the university conversations for them: those need the applicant.",
  },
  {
    q: 'Should I phone the universities on behalf of my child?',
    a: "No, and most universities will politely refuse to discuss the application with anyone but the applicant. That's not bureaucracy, it's data protection, and honestly, it's also better for your child: admissions teams respond to a prepared student, and the act of making the call is the first step of the recovery. Your jobs are beside the phone, not on it: notes, the UCAS ID, the offer conditions, tea.",
  },
  {
    q: 'What should I actually say if the grades are bad?',
    a: 'Less than you think, and slower than you want. Name what happened without minimising it ("that\'s really hard, and I can see how disappointed you are") before any talk of solutions. Avoid instant silver linings, avoid "I told you", and avoid announcing your own disappointment: they are carrying enough. The plan talk lands far better after food, and after the UCAS Hub has actually been read, because the situation is often better than the grades suggest.',
  },
  {
    q: 'Can my child still go to university this year with lower grades?',
    a: 'Very possibly. Universities confirm near-miss students routinely, insurance choices exist for exactly this, and just under 70,000 students found places through Clearing routes in 2025. Beyond that sit foundation years with lower entry requirements, resits next summer, and reapplying with achieved grades. The honest message for the kitchen table: one plan changed, the options did not run out.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Your job on A-level results morning is prepared and calm. Results release from 8am on Thursday 13
        August 2026; the UCAS Hub shows the university decision at the same time; Clearing choices can be
        added from 1pm. If the grades disappoint, your child makes the university calls (most admissions
        teams will only speak to the applicant) while you run everything around the calls: the paperwork,
        the notes, the food, the steadiness. Nothing irreversible needs deciding before lunch, and the
        genuinely big decisions keep until the weekend.
      </QuickAnswer>

      <Lead>
        I work in a hospital, and I watch families receive difficult news every week. The relatives who
        help most all share one skill: they stay steady so the patient doesn&apos;t have to. Results morning
        runs on the same physics. And I&apos;ve seen it happen time and time again with my own students:
        what a teenager needs from the adults in the room on results morning isn&apos;t answers, and it
        isn&apos;t spin. It&apos;s someone whose face says the world is still standing. Here&apos;s how to be that
        parent on 13 August, with the 2026 dates, the process, and the scripts.
      </Lead>

      <KeyTakeaways
        points={[
          'Results from 8am on Thursday 13 August 2026. UCAS Hub updates at 8am with the decision; Clearing choices can be added from 1pm.',
          'Before the day: write down the firm and insurance offer conditions, agree the morning plan, and agree what happens if it goes wrong.',
          'Read the UCAS Hub before reacting to grades: universities confirm near-miss students every year (82% of UK 18-year-old offer-holders got their firm choice in 2025).',
          'Your child makes the calls. You make the notes, hold the UCAS ID, and keep the morning fed and moving.',
          'Clearing placed just under 70,000 students in 2025. It is a real route, not a consolation prize, and the first offer is not the only offer.',
          'Appeals have a hard edge: priority reviews for university-dependent grades must be requested by 20 August 2026, through the school.',
        ]}
      />

      <H2 id="before-the-day">Before the day: three things to sort this week</H2>
      <UL>
        <LI>
          <Strong>Know the numbers.</Strong>{' '}Write down the firm offer, the insurance offer, and their exact
          conditions, plus your child&apos;s UCAS personal ID. On the morning, this piece of paper is worth
          more than any advice.
        </LI>
        <LI>
          <Strong>Agree the plan.</Strong>{' '}Where will they open the results: school or home? Who gets told,
          and who doesn&apos;t, in the first hour? Whose phone stays off? Teenagers do better when the morning
          has a shape.
        </LI>
        <LI>
          <Strong>Agree the sentence.</Strong>{' '}Decide together, in advance, what happens if it goes wrong:
          &quot;then we&apos;ll look at the options, and there are several.&quot; Don&apos;t promise it&apos;ll be fine.
          False reassurance is a loan the morning may call in.
        </LI>
      </UL>

      <H2 id="timeline">The timeline parents should have in their heads</H2>
      <P>
        From <Strong>8am</Strong>, results are released and the UCAS Hub embargo lifts. The Hub is the
        important screen: it shows whether your child is placed, not what they scored. Teachers saw the
        results the previous day under embargo, so the school&apos;s exams office is the fastest expert help
        available all morning. Exam boards publish grade boundaries from 8am too, which matters only if a
        mark looks close enough to a boundary to query. And <Strong>1pm</Strong>{' '}is when Clearing choices
        can be added in UCAS, which builds a natural pause into a hard morning: time to compare rather
        than grab.
      </P>

      <H2 id="if-good">If the grades are good: don&apos;t skip the moment</H2>
      <P>
        Two years of work deserves more than &quot;well done, what&apos;s for lunch&quot;. Mark it properly. And
        one caution in the happy direction too: read the Hub even when the grades look right, because
        placement is the decision that counts, and occasionally it holds a surprise in either direction.
      </P>

      <H2 id="first-hour">If the grades disappoint: the first hour</H2>
      <P>
        Steady, fed, and sequenced. That&apos;s the whole job. The sequence your child should follow is:
        read the UCAS Hub, phone the firm choice if it hasn&apos;t confirmed, let the insurance do its work,
        then approach Clearing deliberately after 1pm. I&apos;ve written that playbook for students in{' '}
        <A href="/blog/didnt-get-the-grades-a-level-results/">the results day triage guide</A>, including{' '}
        <A href="/blog/missed-university-offer-by-one-grade/">what to say on the phone after a one-grade
        miss</A>. Read both tonight; forward them to your child only if asked, or leave them open on the
        kitchen table, which works more often.
      </P>
      <P>Meanwhile, your specific, practical jobs:</P>
      <UL>
        <LI>Sit beside the calls with a pen: note names, times, exact offers and deadlines. A verbal Clearing offer with no note attached evaporates by evening.</LI>
        <LI>Hold the logistics: the UCAS ID, the conditions sheet, the charged phone, the lift to school if the exams office is needed.</LI>
        <LI>Produce food at intervals. Nobody triages well on an empty stomach. This is the least glamorous advice I give and the most reliably useful.</LI>
        <LI>Guard the room: siblings, grandparents and the family group chat can all wait until there&apos;s a plan to report.</LI>
      </UL>
      <Callout title="Why you shouldn't make the calls">
        Most universities will only discuss an application with the applicant, so a parent on the line
        usually costs a place in the phone queue and gains nothing. But the deeper reason is better: the
        student who makes their own calls on the worst morning of their school career starts rebuilding
        agency at the exact moment they most need it. Be the support crew, not the driver.
      </Callout>

      <H2 id="clearing-for-parents">Clearing in 2026, translated for parents</H2>
      <P>
        Clearing is how UCAS matches unplaced students to courses with space. It has been open since
        early July, but for results-day students the real window runs from results morning until 19
        October 2026, and it placed just under 70,000 students in 2025. Strong courses appear in it
        every year. Your child sees official vacancy listings plus a personalised &quot;matches&quot; list,
        phones a shortlist, collects verbal offers, and adds one choice in UCAS from 1pm.
      </P>
      <P>
        One thing worth knowing as you read other guides this week: most &quot;parents&apos; guides to
        Clearing&quot; are published by universities, and a university&apos;s guide has an understandable goal,
        which is your child in their Clearing intake. I don&apos;t have a Clearing line to fill. So here&apos;s
        the independent version: encourage a shortlist of at least three, compare the actual course
        modules and not just the town, treat the first offer as a first offer, and if your child already
        holds a confirmed place somewhere, be very careful before they press &quot;Decline my place&quot;: that
        button is irreversible and cancels accommodation and scholarships with it.
      </P>

      <H2 id="keep-decisions">The decisions that keep until the weekend</H2>
      <P>
        Appeals, resits, gap years and reapplying are real options with real deadlines, and none of them
        are 8am decisions. If a mark sits close to a boundary and the school agrees, the priority review
        route for university-dependent grades closes on <Strong>20 August 2026</Strong>: the process,
        costs and honest odds are in <A href="/blog/a-level-appeals-2026/">the appeals guide</A>. If a
        resit year enters the conversation, know that the next A-level exams are June 2027 (there&apos;s no
        autumn series), and read <A href="/blog/resitting-a-levels/">how resits actually work</A>{' '}before
        anyone commits to anything. Saturday, with tea, is when those conversations belong.
      </P>

      <H2 id="younger-child">If you also have a younger one coming up behind</H2>
      <P>
        Results day has a quieter lesson for parents of Year 12s and GCSE students: the students opening
        envelopes this week are finding out how their revision methods performed, two years after those
        methods formed. If you&apos;ve watched your younger child work hard all year for grades that don&apos;t
        match the effort, that gap has a cause, and it&apos;s almost never intelligence or laziness. It&apos;s
        method, and method is fixable while there&apos;s still time on the clock. That&apos;s the entire reason
        our <A href="/parents/">free guide for parents</A>{' '}and the diagnostic below exist.
      </P>

      <DiagnosticCTA audience="parent" />

      <H2 id="sources">Sources</H2>
      <UL>
        <LI><A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/03/Notice_to_Centres-Release_of_results_June_2026_FINAL.pdf">JCQ notice: release of results, summer 2026 (PDF; 8am release, school embargo timings)</A></LI>
        <LI><A href="https://www.ucas.com/applying/after-you-apply/clearing-and-results-day/results-day">UCAS: results day and Clearing 2026 (Hub and Clearing timings)</A></LI>
        <LI><A href="https://www.ucas.com/corporate/news-and-key-documents/news/number-of-uk-18-year-olds-accepted-into-university-or-college-hits-record-high">UCAS, 14 August 2025: placement figures</A></LI>
        <LI><A href="https://www.ucas.com/data-and-analysis/undergraduate-statistics-and-reports/statistical-releases-daily-clearing-analysis-2025">UCAS daily Clearing analysis 2025 (Clearing placements)</A></LI>
        <LI><A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/05/Post-Results-Service_26_FINAL.pdf">JCQ post-results services booklet 2026 (PDF; priority review deadline)</A></LI>
      </UL>
    </ArticleLayout>
  )
}
