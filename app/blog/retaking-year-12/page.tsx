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
  DiagnosticCTA,
  CourseCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('retaking-year-12')!

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
    q: 'Can you retake Year 12 at the same school?',
    a: "Often, yes, but it's a case-by-case decision rather than a right. The head of sixth form will usually decide in early September, weighing why the year went wrong, your attendance, whether you're changing subjects and whether there's space in the classes. Ask early, bring a specific plan rather than a promise to try harder, and be straightforward about illness or circumstances if they played a part.",
  },
  {
    q: 'Do you have to pay to repeat Year 12?',
    a: "It depends on the school or college and on your age, and the arrangements vary enough that no article can answer it for you. Some students repeat with no complications at all; others get different answers from different institutions. Before you make any decision, ask your sixth form or the college you're considering directly. It's one conversation, and it replaces forum guesswork with facts about your situation.",
  },
  {
    q: 'Is it better to retake Year 12 or carry on and resit A-levels later?',
    a: "It depends on what broke. If the subjects are wrong or the whole year was lost to illness or circumstances, restarting Year 12 fixes the cause. If the year was patchy rather than broken, pushing into Year 13 is usually better: Year 12 internal exams don't count toward the final grade, and you can resit an individual subject after Year 13 if one still falls short.",
  },
  {
    q: 'Does repeating Year 12 look bad to universities?',
    a: "No, provided the story makes sense. Universities see your final grades, predicted grades and reference, and an extra year in sixth form with a clear reason behind it, wrong subjects, illness, a genuine change of method, reads as maturity rather than weakness. What matters is that the repeat year produced better results and that you can explain the decision in a sentence or two.",
  },
  {
    q: 'Can you restart Year 12 at a different sixth form or college?',
    a: "Yes. You apply as a new student, and colleges in particular enrol restarting students every September, so it won't surprise anyone. Be honest at interview about why you're starting again, check the new place runs the exact subjects you want, and ask them directly about enrolment and funding arrangements for your age and situation, because those depend entirely on the institution.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Yes, you can retake Year 12. There are three routes: repeating the year at your current school
        (a case-by-case decision the sixth form usually makes in early September), restarting at a
        different sixth form or college, or pushing on into Year 13 and resitting individual subjects
        later. Whether you should comes down to one test: has the cause of the bad year actually
        changed? Funding and enrolment arrangements depend on the school or college and your age, so
        ask them directly.
      </QuickAnswer>

      <Lead>
        Can I just do Year 12 again? It&apos;s the question students type into a search bar at midnight
        and never say out loud, because asking it feels like admitting defeat. So let me answer it in
        the open. Yes, you can. Students restart Year 12 every September, at their own school and at
        new ones, and for the right student it&apos;s the best academic decision on the table. For the
        wrong student it&apos;s an expensive way to have the same year twice. This guide covers how
        retaking Year 12 works, the test that tells you which student you are, and how to run a repeat
        year so it produces a different result.
      </Lead>

      <KeyTakeaways
        points={[
          'Repeating Year 12 at your current school is a case-by-case conversation with the sixth form, usually settled in the first days of September.',
          "You can also restart Year 12 at a different sixth form or college, which is often the cleaner option if you're changing subjects.",
          "The third route is pushing into Year 13 and resitting specific subjects later. Repeating the whole year isn't the only fix.",
          "Funding and enrolment rules depend on the school or college and your age. There's no universal answer, so ask them directly.",
          'Only repeat the year if the cause is fixed (wrong subjects, illness, circumstances) or the method will genuinely change. Same revision system, same Year 12.',
        ]}
      />

      <H2 id="can-you-redo-year-12">Can you actually redo Year 12?</H2>
      <P>
        Yes. There&apos;s no national rule that says Year 12 happens once. Whether you can repeat it at
        your own school is a local decision, made by your sixth form, and students are quietly granted
        it every September. Others move to a college and restart there. Others push into Year 13 and
        fix specific subjects later. Three routes, and the right one depends entirely on why the year
        went wrong, which is the part most people skip.
      </P>
      <P>
        One thing before we get into it. If you&apos;re reading this after A-level results day rather
        than at the end of Year 12, you&apos;re facing a different decision with different options, and
        the place to start is{' '}
        <A href="/blog/didnt-get-the-grades-a-level-results/">the results day guide</A>. This article
        is for the student who has just finished Year 12 and doesn&apos;t like what the year produced.
      </P>

      <H2 id="the-three-routes">The three routes, and how each one actually works</H2>

      <H3>Route one: repeating Year 12 at your current school</H3>
      <P>
        This is a conversation, not a form. Every sixth form handles repeat years case by case, and the
        decision usually gets made in early September, once results are in and the school can see its
        numbers for the new year. So if you think you want this, don&apos;t wait for term to start.
        Email the head of sixth form now and ask to talk it through.
      </P>
      <P>
        What they&apos;ll weigh: why the year went wrong, your attendance, whether you&apos;re proposing
        new subjects or the same ones, and whether there&apos;s space. What convinces them is a reason
        and a plan. &quot;I&apos;ll try harder&quot; is neither. &quot;I picked the wrong subjects and I
        want to restart with these three&quot; is both. And if illness or family circumstances took the
        year from you, say so plainly. Schools say yes to that situation every year.
      </P>

      <H3>Route two: restarting at a different sixth form or college</H3>
      <P>
        If your school says no, or the thought of walking back through those doors makes your stomach
        drop, you can restart Year 12 somewhere new. Colleges enrol restarting students every September
        and it doesn&apos;t faze them. You apply like any other new student, usually with an interview,
        where the only sensible move is honesty: this is what went wrong, this is what I&apos;m
        changing.
      </P>
      <P>
        A fresh start has real advantages. New teachers with no memory of the old you. A clean subject
        choice. And because you&apos;re starting each course from the beginning, switching exam boards
        costs you nothing. The main check is practical: make sure the new place actually runs the
        subjects you want before you commit to anything.
      </P>

      <Callout title="The funding question, honestly">
        I&apos;m not going to quote figures here, because there aren&apos;t universal ones. What a
        repeat year means for enrolment and funding depends on the school or college and on your age,
        and two students in different towns can get two different answers. So ask the sixth form or
        college directly, before you decide anything. It&apos;s one email, and it turns a forum rumour
        into a fact about your own situation.
      </Callout>

      <H3>Route three: pushing into Year 13 and resitting later</H3>
      <P>
        The third route is the one nobody frames as a route: carry on. Year 12 internal exams
        don&apos;t appear on your A-level certificate, and because A-levels are linear, the whole grade
        is earned in the exams at the end of Year 13. A rough Year 12 hasn&apos;t cost you a single
        final mark yet. So if the subjects are right and the gaps are patchable, you can push into
        Year 13, close the gaps as you go, and if a grade still falls short next summer,{' '}
        <A href="/blog/resitting-a-levels/">resit that one subject</A>{' '}rather than repeating
        everything now.
      </P>
      <P>
        This route suits the student whose year was uneven rather than broken: two subjects fine, one
        on fire, or a bad spring after a decent autumn. If that&apos;s you, the summer plan is laid out
        in{' '}
        <A href="/blog/how-to-prepare-for-year-13/">how to prepare for Year 13</A>.
      </P>

      <H2 id="the-decision-test">The decision test: who should repeat, and who shouldn&apos;t</H2>
      <P>
        Here&apos;s the test, and it&apos;s the whole article in two sentences. Repeat Year 12 only if
        the cause of the bad year is fixed, or the method is genuinely going to change. If neither is
        true, a repeated year with the same revision system produces the same Year 12, just with a
        heavier feeling attached.
      </P>
      <P>Three causes pass the test:</P>
      <UL>
        <LI>
          <Strong>Wrong subjects.</Strong>{' '}If you spent a year fighting subjects you should never
          have picked, restarting with the right ones changes the whole game. The cause is fixed on
          day one.
        </LI>
        <LI>
          <Strong>Illness or circumstances.</Strong>{' '}If the year was taken from you by something
          outside your control, and that something has passed, a repeat year is exactly what the
          option exists for. You never got a real Year 12. This is you having one.
        </LI>
        <LI>
          <Strong>A method you will actually change.</Strong>{' '}This one passes conditionally. If you
          can name what was broken in how you revised, and you have a specific new system to replace
          it, the repeat pays. If the plan is the same notes, the same re-reading and the same
          night-before cramming with more effort behind it, the test fails.
        </LI>
      </UL>
      <P>
        And who shouldn&apos;t repeat? The student whose grades are disappointing but recoverable,
        which is most students. A bad Year 12 doesn&apos;t cap your final grade, and I&apos;ve
        written{' '}
        <A href="/blog/bad-year-12-results-what-now/">a full guide on what bad Year 12 results
        actually change</A>{' '}and how to repair them over a summer without repeating anything. Read
        it before you volunteer for an extra year. Repeating is the biggest intervention available.
        Most students need a smaller one.
      </P>

      <DiagnosticCTA />

      <H2 id="run-it-differently">How to run a repeat year differently</H2>
      <P>
        If you do repeat, the year has exactly one job: to not be the same year again. In my
        experience across more than 1,000 A-level students, three things make that real.
      </P>
      <UL>
        <LI>
          <Strong>Diagnose before you plan.</Strong>{' '}Get last year&apos;s marked papers and label
          every lost mark: didn&apos;t know it, knew it but couldn&apos;t recall it, recalled it but
          couldn&apos;t apply it, or lost it to exam technique. Those four failures look identical on
          a results sheet and each one needs a different fix. Until you&apos;ve done this, you
          don&apos;t know what to change, and the repeat year is guesswork.
        </LI>
        <LI>
          <Strong>Build the year on retrieval, not re-reading.</Strong>{' '}Exams test recall, not
          recognition. If last year&apos;s system was reading notes and highlighting them, that system
          was the problem, and bringing it to a second Year 12 guarantees a second set of the same
          grades. The replacement is simple and uncomfortable: write what you know from memory, check
          the gaps, and work past-paper questions from the first week of term, not from spring.
        </LI>
        <LI>
          <Strong>Collect evidence for your predictions.</Strong>{' '}Predicted grades are typically
          set in the September or October of Year 13, built mostly on end-of-Year-12 evidence. In a
          repeat year, that means every class test, mock and piece of homework is a deposit in the
          account your UCAS application will draw on. Treat them that way from week one.
        </LI>
      </UL>
      <P>
        That&apos;s the difference between repeating the year and merely having it again.
      </P>

      <H2 id="a-year-behind">Being a year behind your friends</H2>
      <P>
        Now the part that isn&apos;t academic, because I suspect it&apos;s the part actually keeping
        you up. Your friends will be in Year 13 talking about UCAS whilst you sit in a Year 12
        classroom with students a year younger. At 17 that feels enormous. I won&apos;t pretend it
        doesn&apos;t.
      </P>
      <P>
        But here&apos;s what the feeling gets wrong. At university, nobody knows or cares which
        September you were &quot;supposed&quot; to arrive in. Gap years, resits, deferrals and course
        changes mean every cohort is a mix of ages, and within a term the difference is invisible. You
        are making a decision about the next forty years of your working life, and the variable that
        matters is whether you arrive with the grades and the subjects you actually wanted. One year
        of feeling behind is the cheapest price on that list.
      </P>
      <P>
        The genuinely bad trade is the opposite one: spending two more years grinding through the
        wrong subjects to avoid one repeated year in the right ones. Being a year behind your friends
        matters far less than it feels right now. Being on the wrong course at 21 matters more.
      </P>

      <CourseCTA
        href="/subject-accelerators"
        heading="Repeating the year? Bring a new system with you"
        body="Our live A-level programmes in Biology, Chemistry, Maths and Physics give a repeat year the structure the first attempt lacked: specialist teaching, retrieval-first sessions and real exam technique from week one. Led by Dr Waleed Ahmad, a doctor and former top-performing A-level student. First session risk-free."
        label="See Our A-Level Courses"
      />
    </ArticleLayout>
  )
}
