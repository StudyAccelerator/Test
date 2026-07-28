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

const post = getPost('after-bad-a-level-results')!

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
    q: 'My child accepted a Clearing place in a panic. Can they change their mind?',
    a: "Yes, carefully. Clearing choices can be added until 19 October 2026, so there is time to look again. But the UCAS 'Decline my place' self-release is irreversible, it cancels any accommodation or scholarship arrangements tied to the offer, and it can last be used on 2 September 2026. The family rule: never release a confirmed place until a better alternative is confirmed in writing.",
  },
  {
    q: 'When is the next chance to resit A-levels?',
    a: 'June 2027. There is no autumn A-level resit series, and the November 2026 exams cover GCSE English language and maths only. That makes a resit a ten-month commitment rather than a quick fix, which is exactly why it works for students who run the year differently, and why it fails for students who repeat the same methods with more pressure attached.',
  },
  {
    q: 'Can my child reapply to university with the grades they already have?',
    a: 'Yes. Applications for 2027 entry can be submitted from 1 September 2026, with a 15 October 2026 deadline for Oxford, Cambridge and most medicine, dentistry and veterinary courses, and 13 January 2027 for most others. Applying with achieved grades removes the uncertainty of predictions: universities see exactly what your child holds, and your child applies only to courses those grades genuinely reach.',
  },
  {
    q: 'Is a foundation year the same as a gap year?',
    a: 'No. A foundation year is an extra year of study at a university, often called Year 0, with lower entry requirements, leading into the first year of a degree. It adds a year of tuition fees and living costs. A gap year is a year out of education entirely, usually spent working or resitting, before reapplying. They solve different problems, so start by asking which problem your child actually has.',
  },
  {
    q: 'Should we appeal the grades as well as planning next steps?',
    a: 'Sometimes, but never as the whole plan. If a university place depends on the outcome, the school must request a priority review of marking by 20 August 2026, and the answer comes within 15 calendar days. Grades can go down as well as up on a review, and your child has to give written consent. Run any appeal in parallel with a real plan, not instead of one.',
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        After bad A-level results, your child has five real options: keep or rethink a Clearing place,
        resit for the June 2027 exams, take a gap year and reapply with achieved grades, start a
        foundation year, or take an apprenticeship. None of them has to be decided on results day
        itself. Clearing stays open until 19 October 2026, so give the choice the week it deserves:
        gather the facts on each door together, then let your child make the final call.
      </QuickAnswer>

      <Lead>
        There&apos;s a particular kind of helplessness in watching your child go quiet over a results
        sheet. You&apos;d carry the grades yourself if you could. And underneath the sympathy sits a
        question you might feel guilty for even thinking: did they not work hard enough? In almost
        every family I speak to after a disappointing results day, the answer is no. The work happened.
        The method failed, or the exam day did. So your job this week isn&apos;t to relitigate the last
        two years. It&apos;s to help your child choose the next one well. This is the guide to that
        week. If the morning itself is still ahead of you, start with{' '}
        <A href="/blog/a-level-results-day-parents-guide/">the results day guide for parents</A>{' '}
        and give your child{' '}
        <A href="/blog/didnt-get-the-grades-a-level-results/">the student triage guide</A>{' '}for the
        first two hours.
      </Lead>

      <KeyTakeaways
        points={[
          'Nothing has to be decided on results day. Clearing runs until 19 October 2026, and rushed choices are the ones families regret.',
          'There are five real doors: the Clearing place, a resit year, a gap year plus reapplying with achieved grades, a foundation year, and an apprenticeship.',
          'There is no autumn A-level resit series. The next exams are June 2027, so a resit is a full-year commitment, not a quick patch.',
          "A Clearing place taken in a panic can be released, but the 'Decline my place' button is irreversible and last usable 2 September 2026. Never press it without a confirmed alternative.",
          'You run the process. Your child owns the choice. A path picked by a parent rarely survives the year.',
        ]}
      />

      <H2 id="slow-down">First: slow the week down</H2>
      <P>
        Results morning rewards speed. The week after rewards the opposite. Only one strand of this
        decision is genuinely urgent: if your child missed narrowly and the offer was withdrawn, a
        phone call to the university and a possible appeal both have short windows. The school must
        request a <Strong>priority review of marking by 20 August 2026</Strong>, and it only applies
        when a university place depends on the result. The details are in{' '}
        <A href="/blog/a-level-appeals-2026/">the appeals guide</A>{' '}and{' '}
        <A href="/blog/missed-university-offer-by-one-grade/">the missed-by-one-grade playbook</A>.
        Know before you start that grades can go down as well as up on a review, and your child must
        give written consent.
      </P>
      <P>
        Everything else has weeks, not hours. Clearing choices can be added until 19 October 2026.
        Resit registration is months away. Apprenticeship vacancies appear all year. So take a breath,
        pick a calm evening a few days from now, and walk through five doors together.
      </P>

      <H2 id="door-one-clearing">Door one: the Clearing place they already accepted</H2>
      <P>
        Plenty of students say yes to a Clearing offer within hours of opening their results.
        Sometimes it&apos;s a genuinely good match found under pressure. Sometimes it&apos;s an escape
        hatch. Just under 70,000 students were placed through Clearing routes in 2025, so this is a
        normal way to start university and nothing about it needs defending. What it does need is a
        sanity check before your child commits three years to it.
      </P>
      <UL>
        <LI>
          Would this course have made their shortlist a month ago? If they&apos;d never heard of the
          university before 9am on results day, that&apos;s not disqualifying, but it means the
          research happens now, after the yes.
        </LI>
        <LI>
          Did they choose the course or the exit? A degree picked to end an awful morning feels very
          different in a November lecture hall.
        </LI>
        <LI>
          Have they actually read the course pages? Modules, assessment style, placement options.
          Twenty minutes of reading now can save a miserable first term.
        </LI>
        <LI>Can they visit before term starts, even virtually?</LI>
      </UL>
      <P>
        The cost of this door is the same as the original plan: tuition fees and living costs at a
        different address. The timeline is generous in one direction and brutal in the other. New
        choices can be added until 19 October, but the release mechanism is one-way.
      </P>
      <Callout title="The self-release button is irreversible">
        If your child wants to swap a confirmed place, the UCAS &apos;Decline my place&apos;
        self-release cancels the existing offer permanently, along with any accommodation or
        scholarship arrangements tied to it, and it can last be used on 2 September 2026. The family
        rule: nobody presses it until the better alternative is confirmed. Not promised. Confirmed.
      </Callout>
      <P>
        Who this door suits: the student who found a genuinely comparable course, wants to start this
        September, and can answer the questions above without flinching.
      </P>

      <H2 id="door-two-resit">Door two: a resit year</H2>
      <P>
        Here&apos;s the fact that shapes everything: <Strong>there is no autumn A-level resit
        series</Strong>. The next A-level exams are in June 2027, and the November 2026 series covers
        GCSE English language and maths only. A resit isn&apos;t a patch. It&apos;s a ten-month
        project, and it should be judged as one.
      </P>
      <P>
        That length is exactly why resits work when they work. Your child already knows the whole
        course, and buried in their marked papers is a map of exactly where the marks went missing. A
        year is long enough to rebuild the method properly instead of running the old one harder. The
        reverse is also true: the same methods repeated for a second year produce the same grades with
        more pressure attached. So before anyone commits, three questions need honest answers. Does
        the target course accept resit applicants? Most universities do, though some competitive
        courses, medicine in particular, have specific policies worth checking first. Does your child
        know why the first attempt went wrong? And will the year genuinely look different?
      </P>
      <P>
        Costs run from exam entry fees alone, if your child studies independently, up to full-time
        resit colleges. The routes, registration deadlines and entry fees are all laid out in{' '}
        <A href="/blog/resitting-a-levels/">the resitting guide</A>, so I won&apos;t repeat them here.
        Who this door suits: the student chasing a specific course that&apos;s worth a year of their
        life, who can name what failed the first time.
      </P>

      <DiagnosticCTA audience="parent" />

      <H2 id="door-three-gap-year">Door three: a gap year, then reapplying with achieved grades</H2>
      <P>
        This is the most underrated door, and the quietest. Instead of resitting or taking whatever
        Clearing holds, your child steps out for a year, works, grows up a little, and reapplies with
        their actual results in hand. No predictions, no gamble on what teachers think they might get.
        Universities see the real grades, and your child applies only to courses those grades
        genuinely reach.
      </P>
      <P>
        The timeline is friendlier than most parents expect. Applications for 2027 entry can be
        submitted from <Strong>1 September 2026</Strong>. The deadline for Oxford, Cambridge and most
        medicine, dentistry and veterinary courses is 15 October 2026, and the equal-consideration
        deadline for most other courses is 13 January 2027. So the application lands early in the gap
        year, and the remaining months belong to your child.
      </P>
      <P>
        This is also the cheapest door on the list, and the only one that can pay your child rather
        than the other way round. The questions to ask are about content, because an aimless year
        helps nobody: what will the months actually hold, and does the plan strengthen the application
        or simply delay it? Who it suits: the student whose grades still open good doors, just not the
        original one, and the student who needs to catch their breath before another academic sprint.
        One more thing worth noticing: a resit year is really a gap year with exams inside it, so
        doors two and three combine well.
      </P>

      <H2 id="door-four-foundation">Door four: a foundation year</H2>
      <P>
        A foundation year, often listed as Year 0, is an extra year of study built onto the front of a
        degree, with lower entry requirements than the degree itself. It exists precisely for students
        whose grades landed short of a course they&apos;re suited to. The price is time and money: it
        adds a year of tuition fees and living costs, turning a three-year degree into four.
      </P>
      <P>Before anyone accepts one, put four questions to the university directly:</P>
      <UL>
        <LI>
          Does passing the foundation year guarantee progression into Year 1 of the degree, or is
          there another selection round?
        </LI>
        <LI>What marks does progression require, and what happens to students who miss them?</LI>
        <LI>
          Is the foundation year taught at the university itself or at a partner college somewhere
          else?
        </LI>
        <LI>
          Does it lead into the named degree your child wants, or a general menu of related courses?
        </LI>
      </UL>
      <P>
        Who this door suits: the student set on a specific, competitive subject whose grades fell well
        short of the entry requirements, who wants to stay in formal education and start this
        September. Some foundation years recruit through Clearing, so this door can sometimes be
        opened with the same phone calls as door one.
      </P>

      <H2 id="door-five-apprenticeship">Door five: an apprenticeship</H2>
      <P>
        The door schools mention least. An apprenticeship, including degree apprenticeships at the top
        end, means paid employment with structured training: your child earns a wage from day one,
        pays no tuition fees, and finishes with a qualification alongside years of real experience.
        For a student who learns by doing and has had enough of classrooms, it can beat every other
        door on this list.
      </P>
      <P>
        Two honest caveats. First, the well-known schemes are fiercely competitive, sometimes harder
        to get into than the equivalent university course, so this door needs a proper application
        campaign, not one hopeful form. Second, make sure your child is running toward the work rather
        than away from the exams. Ask what the training leads to, what qualification sits at the end,
        and where the last few cohorts ended up. Vacancies appear all year round, so unlike Clearing,
        this door has no closing time. Who it suits: the practical, self-starting student who wants to
        build a career now and would treat a lecture theatre as a delay.
      </P>

      <H2 id="kitchen-table">The kitchen-table conversation: you run the process, they own the choice</H2>
      <P>
        Now the part nobody prints on a UCAS page. How the family decides matters as much as what it
        decides, and the division of labour that works is this: <Strong>the parent runs the process,
        the student owns the choice</Strong>.
      </P>
      <P>
        Running the process means you book the conversation for a calm evening a few days after
        results day, not the afternoon of. You gather the facts on each door, and this article is most
        of them. You hold the deadlines: 20 August for a priority appeal, 2 September for self-release,
        19 October for Clearing. And you ask questions rather than deliver verdicts. A useful opener:
        which of these five doors can we rule out? Ruling out is easier than choosing, and it gets
        your child talking about their reasons.
      </P>
      <P>
        Owning the choice means the final call is theirs. I&apos;ve sat with a lot of students during
        the year that follows this decision, and a path chosen by a parent rarely survives it. A
        student resitting because they were told to revises like someone serving a sentence. Your
        veto lives at the level of process, and it&apos;s legitimate: whichever door they pick has to
        come with a plan, deadlines and structure. That&apos;s a fair condition. Picking the door for
        them isn&apos;t.
      </P>

      <H2 id="paying-for-help">When paying for help with a resit year earns its cost</H2>
      <P>
        Four of these five doors need very little spending beyond what was already planned. The resit
        door is the exception, so let me be straight about when support is worth paying for, given
        that I sell it.
      </P>
      <P>
        Structured help earns its cost in one situation: the diagnosis says the method was the
        problem, and your child won&apos;t rebuild that method alone. If the first attempt failed on
        revision technique, retrieval and exam performance rather than effort, a year of unsupervised
        self-study tends to reproduce the failure. If, on the other hand, your child missed their
        grades through illness or circumstances and their method is sound, they may need nothing more
        than an exam entry and a quiet desk. And if nobody has diagnosed anything yet, don&apos;t buy
        tuition yet either. That&apos;s paying for a fix before anyone has named the problem.
      </P>
      <P>
        For calibration, published prices as of July 2026: one-to-one tutoring starts around £26 an
        hour at MyTutor, Tutorful&apos;s price guide puts the average A-level rate at £41.95 an hour,
        and Justin Craig&apos;s intensive courses run from roughly £675 to £1,595. Our own live
        12-week Subject Accelerators are £339 for one subject. I&apos;ve written an honest breakdown
        of when tutoring is and isn&apos;t worth the money in{' '}
        <A href="/blog/is-a-level-tutoring-worth-it/">the tutoring value guide</A>, and it applies
        double to a resit year, where the stakes and the timescale are both bigger.
      </P>
      <P>
        If you want more structure for your own side of this,{' '}
        <A href="/parents/">the free guide for parents</A>{' '}covers how to support without hovering.
        And if you&apos;d rather talk your child&apos;s specific situation through, you can{' '}
        <A href="https://scheduler.zoom.us/dr-waleed-ahmad/a-level">book a free call with me</A>.
        I&apos;ll tell you plainly if the honest answer is that you don&apos;t need us.
      </P>
      <P>
        Whatever door they pick, hold onto this: the grades this August were a description of a method
        on a day. They were never a verdict on your child.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI>
          <A href="https://www.ucas.com/applying/after-you-apply/clearing-and-results-day/what-is-clearing">
            UCAS: what is Clearing (Clearing dates, decisions and self-release rules)
          </A>
        </LI>
        <LI>
          <A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/03/Notice_to_Centres-Release_of_results_June_2026_FINAL.pdf">
            JCQ notice: release of results, summer 2026 (PDF; results day timing)
          </A>
        </LI>
        <LI>
          <A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/05/Post-Results-Service_26_FINAL.pdf">
            JCQ post-results services booklet 2026 (PDF; priority review deadline and consent rules)
          </A>
        </LI>
        <LI>
          <A href="https://nationalcareers.service.gov.uk/exam-results/resits">
            National Careers Service: resits (no autumn A-level series; June 2027 timing)
          </A>
        </LI>
        <LI>
          <A href="https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications">
            UCAS: dates and deadlines for university applications (2027 entry)
          </A>
        </LI>
        <LI>
          <A href="https://www.ucas.com/data-and-analysis/undergraduate-statistics-and-reports/statistical-releases-daily-clearing-analysis-2025">
            UCAS daily Clearing analysis 2025 (Clearing placement numbers)
          </A>
        </LI>
      </UL>
    </ArticleLayout>
  )
}
