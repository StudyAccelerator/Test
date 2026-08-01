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

const post = getPost('resitting-a-levels')!

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
    q: 'How many times can you retake A-levels?',
    a: "There's no official limit. You can resit an A-level as many times as you want, at any age. In practice, most students who resit do it once, the following summer, and universities are mainly interested in your final grades and how you explain the journey.",
  },
  {
    q: 'Are A-level resits harder than the first attempt?',
    a: "The papers are the same standard, set and graded the same way. What changes is your position: you've already covered the whole course, you know exactly where you lost marks, and you've got a full year to fix it. Resit students who treat the year seriously can jump two grades or more. The risk isn't harder papers. It's drifting through the year without structure.",
  },
  {
    q: 'How much do A-level resits cost?',
    a: 'If you resit through your own school or college, exam entry fees are typically around £100 to £200 per subject. As a private candidate at an external exam centre, expect £150 to £400 or more per subject once admin fees are included, with sciences sometimes costing extra if practical endorsements are involved. Tuition or resit courses cost more on top, so total budgets range from a few hundred pounds to a few thousand.',
  },
  {
    q: 'When are A-level resits in 2026 and 2027?',
    a: 'The next A-level resit exams run in the May to June 2027 summer series, with results in August 2027. Entries close in late February 2027 (schools and exam centres set earlier internal deadlines), so the organising happens in autumn 2026: choose your route, book a centre if you are a private candidate, and sort practical endorsements for sciences.',
  },
  {
    q: 'Can you resit A-levels in November?',
    a: 'No. There is no autumn or November resit series for A-levels; the November exam series only covers GCSE English language and maths. A-level resits happen once a year, in the May to June summer series.',
  },
  {
    q: 'Can you retake just one A-level subject?',
    a: 'Yes. You can resit a single subject and keep your other grades. Because A-levels are linear, you retake all the exam papers for that subject, but only that subject. Many students resit one subject to meet a specific university requirement.',
  },
  {
    q: 'Do universities accept A-level resits?',
    a: 'Most do, and plenty of students get into strong universities with resit grades. You must declare resits and previously achieved grades on your UCAS application. A small number of very competitive courses, notably medicine at some schools, have specific policies about resits, so always check the exact entry requirements of your target courses before committing to the year.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Yes, you can resit A-levels, as many times as you like and at any age. Because A-levels are linear, you
        retake all the exam papers for a subject in the following May and June series, either through a school
        or college or as a private candidate at an exam centre. There is no November resit series for
        A-levels. Entry fees run from roughly £100 to £200 per subject through a school, or £150 to £400 or
        more privately. Register early, around six months before the exams, and declare resits and previous
        grades on your UCAS application.
      </QuickAnswer>

      <Lead>
        Results day maths is brutal. One grade can be the difference between the course you planned and a
        completely different path. So let me say the thing that students in that position most need to hear: a
        resit year isn&apos;t a failure year. Some of the most impressive students I&apos;ve worked with are the ones
        who took a second run at it, because this time they knew exactly what they were doing and why. Here&apos;s
        how resitting actually works, what it costs, and how to make the year count.
      </Lead>

      <KeyTakeaways
        points={[
          'Anyone can resit A-levels, in one subject or several, with no limit on attempts and no age restriction.',
          'A-levels are linear, so a resit means retaking all the exam papers for that subject in the next May and June exam series.',
          'You can resit through your school or college, or as a private candidate at an external exam centre. Register around six months ahead.',
          'Costs range from roughly £100 to £200 per subject via a school to £150 to £400 or more as a private candidate, before any tuition.',
          'Resits must be declared on UCAS along with your previous grades. Most universities accept resit applicants; a few competitive courses have specific policies, so check first.',
        ]}
      />

      <H2 id="how-resits-work">How A-level resits actually work</H2>
      <P>
        Since A-levels went linear, there are no January modules or unit retakes. The whole subject is assessed
        in one set of exams at the end, sat in May and June. So resitting a subject means retaking all of its
        papers in the next summer series. Miss that window and you&apos;re waiting another year, which is why the
        decision is best made in the autumn, not the spring.
      </P>
      <P>You&apos;ve got two routes:</P>
      <UL>
        <LI>
          Through a school or sixth form college. Some let former students return to resit, sometimes with
          classes, sometimes exams only. This is usually the cheapest route, with entry fees typically around
          £100 to £200 per subject.
        </LI>
        <LI>
          As a private candidate. You study independently (or with a tutor or online course) and sit the exams
          at a registered exam centre. Expect £150 to £400 or more per subject once centre admin fees are
          added, and note that science practical endorsements need special arrangements, so sort those early.
        </LI>
      </UL>
      <Callout title="The deadline that catches people out">
        Exam entries for the summer series close months in advance, and late entries cost significantly more.
        If you&apos;re resitting as a private candidate, find and book your exam centre around six months before
        the exams, which in practice means getting organised in the autumn. Centres can and do turn away late
        applicants.
      </Callout>

      <H2 id="resit-dates">When are A-level resits? The 2026 to 2027 calendar</H2>
      <P>
        The single most important date fact: <Strong>there is no autumn resit series for A-levels</Strong>.
        The November exam series only exists for GCSE English language and maths. If you didn&apos;t get the
        grades in August 2026, your next chance to sit A-level papers is the summer 2027 series. That sounds
        brutal, but it also means you have a full year to fix what went wrong, and the calendar below is how
        that year actually runs.
      </P>
      <div className="overflow-x-auto my-8 rounded-lg shadow-sm">
        <table className="w-full bg-white text-left text-brand-text">
          <thead>
            <tr className="bg-brand-purple text-brand-cream">
              <th className="p-4 font-semibold">When</th>
              <th className="p-4 font-semibold">What happens</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold whitespace-nowrap">September to October 2026</td>
              <td className="p-4">Decide whether to resit, do the post-mortem on your papers, and choose your route: through a school or college, or as a private candidate.</td>
            </tr>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold whitespace-nowrap">Autumn 2026</td>
              <td className="p-4">Private candidates: find and book your exam centre now, and sort science practical endorsement arrangements early. Centres fill up and turn away late applicants.</td>
            </tr>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold whitespace-nowrap">By late February 2027</td>
              <td className="p-4">Exam entries close for the summer series. Schools and centres set their own internal deadlines before this, and late entries cost significantly more.</td>
            </tr>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold whitespace-nowrap">May to June 2027</td>
              <td className="p-4">The exam series. You sit all the papers for each subject you are resitting.</td>
            </tr>
            <tr className="border-t border-brand-cream-dark">
              <td className="p-4 font-semibold whitespace-nowrap">August 2027</td>
              <td className="p-4">Results day. Your new grades replace the old ones in practice: universities look at what you achieved this time, alongside a declared resit history on UCAS.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="should-you-resit">Should you actually resit? The honest questions</H2>
      <OL>
        <LI>
          Do the grades actually block your goal? If your offer course accepts your grades, or Clearing found
          you somewhere you&apos;re genuinely happy with, a resit year may solve a problem you don&apos;t have.
        </LI>
        <LI>
          Do you know why the first attempt went wrong? &quot;I&apos;ll work harder&quot; isn&apos;t a diagnosis. Wrong
          revision methods, weak exam technique, a bad exam day, personal circumstances: name the cause,
          because the plan depends on it.
        </LI>
        <LI>
          Will you run the year differently? A resit year with the same methods produces the same grades. The
          students who jump two grades change the system, not just the effort.
        </LI>
        <LI>
          Have you checked your target course&apos;s resit policy? Most universities are relaxed about resits.
          Some competitive courses, especially medicine at certain schools, are not. Twenty minutes of
          checking entry requirements now saves a wasted year.
        </LI>
      </OL>

      <P>
        Still weighing a resit against Clearing, an appeal or your insurance choice? Work through{' '}
        <A href="/blog/didnt-get-the-grades-a-level-results/">the results day triage guide</A>{' '}first: it
        puts all four options in the right order for the morning itself.
      </P>

      <H2 id="ucas">Resits and your UCAS application</H2>
      <P>
        You must declare resits on UCAS, including the grades you previously achieved. That&apos;s not the
        weakness it sounds like. Admissions tutors read thousands of applications from students who&apos;ve never
        faced a setback. A student who took a hit, diagnosed the problem and came back with better grades is
        showing exactly the resilience universities say they want. Use the personal statement to tell that
        story straight: what went wrong, what you changed, what the second run proved.
      </P>

      <H2 id="make-it-count">How to make a resit year actually count</H2>
      <P>
        You have one enormous advantage this time: you know the whole course, and you know exactly where the
        marks went missing. So the year shouldn&apos;t look like year one repeated.
      </P>
      <UL>
        <LI>
          Start with the post-mortem. Get your marked papers back if you can (or request them), and list where
          marks were lost: which topics, and whether the cause was knowledge, application or technique.
        </LI>
        <LI>
          Build a <A href="/blog/how-to-make-a-revision-timetable/">topic-level revision plan</A>{' '}weighted
          toward those weak areas, and run it all year, not just in the spring.
        </LI>
        <LI>
          Revise with <A href="/blog/blurting-method-a-level-revision/">active recall</A>{' '}and spaced
          repetition rather than re-reading. If re-reading worked, the first attempt would have gone
          differently.
        </LI>
        <LI>
          Make past papers the centre of the year. By spring you should be sitting full timed papers weekly
          and logging every lost mark.
        </LI>
        <LI>
          Get structure and accountability. The hardest part of a resit year, especially outside school, is
          being your own teacher and examiner for twelve months. A live course or structured programme solves
          the loneliest part of the problem.
        </LI>
      </UL>

      <TrackerCTA />

      <H2 id="bottom-line">The bottom line</H2>
      <P>
        Resitting A-levels is common, accepted by most universities, and often the single best academic
        decision a student makes, provided the year is run differently from the first attempt. Diagnose what
        went wrong, check your target course&apos;s policy, book your exams early, and build the year around
        testing yourself rather than re-reading. A grade you earn on the second attempt counts just the same
        on the certificate.
      </P>

      <CourseCTA
        href="/subject-accelerators/"
        heading="Running a resit year? Don't do it alone"
        body="Our live A-Level programmes in Biology, Chemistry and Maths give resit students the structure that independent study lacks: specialist teaching, exam-question-first sessions, homework and progress tracking. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
