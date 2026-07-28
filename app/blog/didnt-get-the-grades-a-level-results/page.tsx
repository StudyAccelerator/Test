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
  CourseCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('didnt-get-the-grades-a-level-results')!

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
    q: 'What time do A-level results come out in 2026?',
    a: 'From 8am on Thursday 13 August 2026. That applies both to results collected from school and to your UCAS Hub, where the overnight embargo lifts at 8am. Schools actually receive the results the day before under embargo, which is why your teachers can help you quickly on the morning. If you plan to use Clearing, you can only add a Clearing choice in UCAS from 1pm.',
  },
  {
    q: 'If I miss my firm offer, do I automatically go to my insurance?',
    a: "Not automatically, no. Your firm university decides first: they can confirm you anyway, offer you an alternative (a changed course, sometimes a foundation year), or release you. Only once your firm has released you does your insurance choice come into play, and they confirm you if you've met their conditions. Check UCAS Hub before phoning anyone, because the decision may already be made in your favour.",
  },
  {
    q: 'What happens if I missed my grades by just one grade?',
    a: "You have a genuine chance of being confirmed anyway. Universities regularly take near-miss students, especially where the course has space. In 2025, 82% of UK 18-year-old offer-holders were placed at their firm choice, and that includes plenty who dipped a grade. If the Hub still says unsuccessful, phone the university's admissions line and make your case. We've written a full guide to the one-grade miss, including exactly what to say.",
  },
  {
    q: 'Is failing your A-levels the end of university?',
    a: 'No, and the numbers say so emphatically: just under 70,000 students found university places through Clearing routes in 2025. Beyond Clearing there are foundation years with lower entry requirements, resits next summer, higher and degree apprenticeships, and reapplying next cycle with achieved grades. What ends on results day is one specific plan, not the goal itself.',
  },
  {
    q: 'When does Clearing close in 2026?',
    a: 'The last day to add a Clearing choice is 19 October 2026, and universities make their final Clearing decisions by 21 October. In practice, most courses with vacancies fill in the first days after results day, so if you want to use Clearing seriously, the useful window is results week itself.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        If your A-level grades are lower than your offer, do things in this order: read your UCAS Hub from
        8am before you panic, because near-miss students are often confirmed anyway. If it says unsuccessful,
        phone your firm choice, then your insurance. Then look at Clearing (you can add a choice from 1pm on
        13 August 2026). Appeals and resits come after the calls, not before. Nothing about this morning
        requires a five-year decision by 9am.
      </QuickAnswer>

      <Lead>
        I work in a hospital. When several patients arrive at once, we don&apos;t treat them in the order they
        shout. We triage: what&apos;s urgent, what&apos;s serious, what can safely wait. Results morning needs
        exactly that discipline, because a teenager staring at the wrong grades will happily make the
        biggest decision of their life in a corridor before breakfast. So here is the triage, step by step,
        with the 2026 dates and the real numbers.
      </Lead>

      <KeyTakeaways
        points={[
          'Results release from 8am on Thursday 13 August 2026, at school and on UCAS Hub. Clearing choices can only be added from 1pm.',
          'Read the Hub first: universities confirm near-miss students all the time. In 2025, 82% of UK 18-year-old offer-holders got their firm place.',
          'The order of calls: firm choice, then insurance, then Clearing. Not the other way round.',
          "Never press \"Decline my place\" in a rush. Self-release is irreversible and it cancels your accommodation and scholarship arrangements with the place you're leaving.",
          'The priority appeal deadline for university-dependent grades is 20 August 2026, and grades can go down as well as up on review.',
          'There is no autumn A-level resit series. The next chance to sit the papers is June 2027, which is why the resit decision deserves a calm week, not a panicked morning.',
        ]}
      />

      <H2 id="night-before">The night before: set up the morning</H2>
      <P>
        Ten minutes of preparation removes half the chaos. Have ready: your UCAS login (test it), your
        firm and insurance offer conditions written out, your UCAS personal ID number, a charged phone, a
        pen, and somewhere quiet you can sit at 8am. If you&apos;re collecting in person, take ID. And know
        this in advance: your teachers saw the results the day before under embargo. On the morning, the
        exams office already knows the story and can help you fast. Use them.
      </P>

      <H2 id="timeline">How the morning actually runs on 13 August 2026</H2>
      <UL>
        <LI><Strong>From 8am:</Strong>{' '}results are released to students, and the UCAS Hub embargo lifts. The Hub shows your placement decision, not your grades: the grades come from school or your exam board documents.</LI>
        <LI><Strong>8am onwards:</Strong>{' '}exam boards publish grade boundaries publicly, if you want to see how close a mark sits to the line. That matters for the appeal question later.</LI>
        <LI><Strong>From 1pm:</Strong>{' '}if you&apos;re in Clearing, you can add a Clearing choice in UCAS. The morning is for phone calls and decisions; the button comes after lunch.</LI>
      </UL>

      <H2 id="step-1">Step 1: read the Hub before you feel anything</H2>
      <P>
        The single most common results-day mistake is reacting to the grades before reading the decision.
        Universities set conditions, but they confirm students who narrowly miss them every single year:
        in 2025, 82% of UK 18-year-old offer-holders were placed at their firm choice, and a record 439,180
        applicants were accepted on the day. Your Hub may say <Strong>Unconditional</Strong>{' '}even though
        your grades dipped. It may offer you a changed course: same university, adjusted programme,
        sometimes a foundation year. Read it slowly. If you&apos;re placed somewhere you&apos;re happy with, the
        triage ends here and the day becomes a celebration.
      </P>

      <H2 id="step-2">Step 2: if it says unsuccessful, make two calls</H2>
      <P>
        Call your firm choice&apos;s admissions line first, even if the Hub has released you. Be polite, be
        brief, have your UCAS ID ready, and ask the direct question: &quot;I&apos;ve missed my conditions by X.
        Is there any flexibility, or an alternative course you&apos;d consider me for?&quot; Sometimes the answer
        is yes. Then, if needed, your insurance: if you&apos;ve met their conditions, that place is yours to
        confirm. If you missed your offer by a single grade, read{' '}
        <A href="/blog/missed-university-offer-by-one-grade/">the one-grade miss guide</A>{' '}before you dial;
        it includes a word-for-word script for the call.
      </P>

      <H2 id="step-3">Step 3: Clearing, without the panic</H2>
      <P>
        Clearing is not the naughty step. Just under 70,000 students found places through Clearing routes
        in 2025, and it includes strong courses at strong universities. From results morning, UCAS shows
        you vacancy listings and a matched shortlist (&quot;Your Clearing matches&quot;), and universities you
        contact can make you a verbal offer on the phone; you add your chosen one in the Hub from 1pm.
      </P>
      <P>
        Two rules keep Clearing sane. First, phone the university yourself: it&apos;s your course, your call,
        and admissions teams want to speak to the applicant, not the parent. Second, treat the first offer
        like a first offer, not a lifeboat. You&apos;re allowed hours to compare courses, look at modules and
        accommodation, and choose deliberately. The vacancies don&apos;t all vanish by 10am.
      </P>
      <Callout title="The one truly irreversible button">
        If you&apos;re holding a confirmed place but want to shop for a different one, understand
        &quot;Decline my place&quot; before you touch it. Self-release is permanent: it cancels your contract
        with that university, along with any accommodation or scholarship tied to it, and there is no undo.
        Explore first, decline second. The button works until 2 September 2026, so there is never a reason
        to press it at 8:15am.
      </Callout>

      <H2 id="step-4">Step 4: appeals, with honest expectations</H2>
      <P>
        An appeal (formally a review of marking) is for grades that look genuinely wrong, usually where
        your mark sits close to a boundary and your teachers agree the script deserves a second look. It is
        not a lottery ticket for disappointment: marks can go down as well as up, and you have to consent
        to that in writing. If a university place depends on the outcome, the priority review deadline is
        20 August 2026 and results come back within 15 days. The full process, costs and realistic odds are
        in <A href="/blog/a-level-appeals-2026/">the appeals guide</A>. Talk to your school on results
        morning if you think this is you, because the clock is short.
      </P>

      <H2 id="step-5">Step 5: the resit route</H2>
      <P>
        Here&apos;s the fact that shapes the resit decision: there is no autumn A-level series. The next time
        these exams run is June 2027. A resit year is therefore a real year, and it&apos;s also a genuinely
        good decision for the right student: universities accept resit applicants routinely, and a year run
        with a fixed method produces different grades. I&apos;ve written the complete guide to{' '}
        <A href="/blog/resitting-a-levels/">how resits work, what they cost and the deadlines</A>. Read it
        next week, not today. It&apos;s a decision for a calm kitchen table, not a school corridor.
      </P>

      <H2 id="what-not-to-do">What not to do on results morning</H2>
      <UL>
        <LI>Don&apos;t decide your future from the group chat. Comparison is a terrible triage nurse.</LI>
        <LI>Don&apos;t accept the first Clearing offer out of fear. Compare at least two.</LI>
        <LI>Don&apos;t self-release from a confirmed place to &quot;see what&apos;s out there&quot;.</LI>
        <LI>Don&apos;t commit to a gap year, a resit year or a different career by lunchtime. Give the big forks 48 hours.</LI>
        <LI>Don&apos;t skip the phone calls because they feel scary. Five awkward minutes changes outcomes.</LI>
      </UL>
      <P>
        And if you&apos;re a parent reading this to prepare: your job on the morning is specific and it isn&apos;t
        dialling. We&apos;ve written{' '}
        <A href="/blog/a-level-results-day-parents-guide/">a separate guide for parents</A>{' '}on exactly how
        to help without making it worse.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI><A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/03/Notice_to_Centres-Release_of_results_June_2026_FINAL.pdf">JCQ notice: release of results, summer 2026 (PDF; 8am release, embargo timings)</A></LI>
        <LI><A href="https://www.ucas.com/applying/after-you-apply/clearing-and-results-day/results-day">UCAS: results day and Clearing 2026 (Hub timings, adding Clearing choices from 1pm)</A></LI>
        <LI><A href="https://www.ucas.com/corporate/news-and-key-documents/news/number-of-uk-18-year-olds-accepted-into-university-or-college-hits-record-high">UCAS, 14 August 2025: firm-choice and acceptance figures</A></LI>
        <LI><A href="https://www.ucas.com/data-and-analysis/undergraduate-statistics-and-reports/statistical-releases-daily-clearing-analysis-2025">UCAS daily Clearing analysis 2025 (Clearing placement figures)</A></LI>
        <LI><A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/05/Post-Results-Service_26_FINAL.pdf">JCQ post-results services booklet 2026 (PDF; reviews of marking, priority deadlines)</A></LI>
      </UL>

      <CourseCTA
        href="/subject-accelerators/"
        heading="If the answer turns out to be a resit year"
        body="Our live 12-week Subject Accelerators in Biology, Chemistry and Maths give resit students what independent study can't: specialist teaching, weekly structure, exam-question-first sessions and someone checking the work got done. Led by Dr Waleed Ahmad, MBBS. First session risk-free."
        label="See the Subject Accelerators"
      />
    </ArticleLayout>
  )
}
