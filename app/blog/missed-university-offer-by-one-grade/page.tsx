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

const post = getPost('missed-university-offer-by-one-grade')!

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
    q: 'Will a university still accept me if I miss my offer by one grade?',
    a: "Often, yes. Universities confirm near-miss applicants every year when the course has room and your application was strong: in 2025, 82% of UK 18-year-old offer-holders were placed at their firm choice, and that figure includes students who dipped a grade. It is a decision, not a rule, which is why the phone call matters when the UCAS Hub doesn't confirm you automatically.",
  },
  {
    q: 'Can I ask my firm university for a different course instead?',
    a: "Yes, and they'll sometimes suggest it before you ask. It's called a changed course offer: the same university offers you an alternative programme, commonly a related course with lower requirements or a version with a foundation year. You don't have to accept it on the phone. Ask for the exact course name, look it up, and reply once you've thought.",
  },
  {
    q: 'If my firm releases me, does my insurance have to take me?',
    a: "If you met your insurance offer's conditions, yes, that place is yours. If you missed both sets of conditions, your insurance makes the same judgement call your firm did, and near-miss confirmations happen there too. The sequence is automatic on UCAS: firm decides first, then insurance. You don't need to do anything to trigger it.",
  },
  {
    q: "What if I can't get through to the university on the phone?",
    a: "Keep trying, and work the other channels while you do: many admissions teams run online callback forms, live chat and email on results day. Have your UCAS personal ID in every message. And don't read a busy line as a no. Results morning is their busiest day of the year, and the queue is full of students in exactly your position.",
  },
  {
    q: 'Should I accept a Clearing place or wait for my appeal?',
    a: "Do both in parallel, carefully. If your school agrees a mark looks wrong, ask your firm university whether they'll hold your place pending a priority review of marking (the request deadline is 20 August 2026, with results inside 15 days). Universities can say yes. Meanwhile, securing a Clearing place protects you if the review changes nothing, which is the more common outcome. What you shouldn't do is turn down everything and gamble the year on the appeal.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        Missing your offer by one grade is not a rejection. Your firm university decides: confirm you
        anyway, offer you an alternative course, or release you, and near-miss students are confirmed every
        single year. Check UCAS Hub from 8am on 13 August 2026 first. If it doesn&apos;t confirm you, phone
        the admissions line and make your case with the script below, then let your insurance do its job,
        then use Clearing from 1pm. In that order.
      </QuickAnswer>

      <Lead>
        AAB when the offer said AAA. It&apos;s the most common bad-news story of results morning, and it&apos;s
        also the one with the best odds of a happy ending, which is exactly why it deserves better than
        guesswork and a shaking phone hand. Here&apos;s what actually happens inside the system when you miss
        by one, and precisely what to say to give yourself the best chance.
      </Lead>

      <KeyTakeaways
        points={[
          'One grade short is a judgement call for the university, not an automatic rejection. In 2025, 82% of UK 18-year-old offer-holders got their firm place, near-misses included.',
          'UCAS Hub from 8am tells you the decision before you make a single call. Read it first.',
          'The order is fixed: your firm decides, then your insurance, then Clearing (choices addable from 1pm).',
          'A changed course offer from your firm is common: same university, adjusted course. You may negotiate without knowing it was possible.',
          "If a mark looks wrong near a boundary, the priority appeal deadline is 20 August 2026, and you can ask the university to hold your place while it's reviewed.",
        ]}
      />

      <H2 id="what-happens-inside">What the university actually does with a near miss</H2>
      <P>
        By the time you wake up on results day, your university has already seen your grades and made a
        first decision: they received results before you did. Three things drive whether a one-grade miss
        gets confirmed. <Strong>Space:</Strong>{' '}if the course has capacity, borderline cases get treated generously.
        <Strong> Which grade slipped:</Strong>{' '}dropping to a B in your third subject reads differently from
        dropping the A in the subject you&apos;re applying to study. <Strong>Your file:</Strong>{' '}they liked
        you enough to make an offer; a strong application still argues for you now. None of this is luck.
        It&apos;s a decision made by people, which means a polite, prepared phone call can still influence it.
      </P>

      <H2 id="hub-states">Read the Hub correctly before you dial</H2>
      <UL>
        <LI><Strong>&quot;Unconditional&quot;:</Strong>{' '}you&apos;re in. The grade you dropped no longer matters. Celebrate.</LI>
        <LI><Strong>A changed course offer:</Strong>{' '}your firm is offering you an alternative: different course, foundation year, or different start. You choose whether to accept. Research it before you reply.</LI>
        <LI><Strong>&quot;Unsuccessful&quot; at your firm:</Strong>{' '}the decision passes to your insurance automatically. If you met the insurance conditions, that place is yours.</LI>
        <LI><Strong>Unsuccessful at both:</Strong>{' '}you&apos;re in Clearing, and the phone becomes your main tool. Keep reading.</LI>
      </UL>

      <H2 id="the-script">The call to your firm: what to say, word for word</H2>
      <P>
        Phone the admissions line, not the general switchboard, as early as you can. Have your UCAS
        personal ID, your grades and your offer conditions in front of you. Then:
      </P>
      <P>
        <Strong>Opening:</Strong>{' '}&quot;Good morning. My name is [name], UCAS ID [number]. I hold a firm offer
        for [course] and I&apos;ve just missed my conditions: I got AAB against AAA, with the B in [subject].
        I wanted to ask whether you&apos;re able to confirm my place.&quot;
      </P>
      <P>
        <Strong>If they hesitate:</Strong>{' '}&quot;This course is genuinely my first choice, and I&apos;d take the
        place without hesitation if you can make it work. Is there anything that would help my case, or
        anyone else I should speak to?&quot;
      </P>
      <P>
        <Strong>If it&apos;s a no:</Strong>{' '}&quot;I understand. Is there a related course or a foundation route
        you&apos;d consider me for instead?&quot; Then thank them properly. Thirty seconds of grace on a hard
        call costs nothing and is remembered more often than you&apos;d think.
      </P>
      <Callout title="Who makes the call">
        You do. Not your parents. Universities want to hear from the applicant, and some will only discuss
        the application with you. A parent in the room with a notepad is support; a parent on the phone is
        a red flag. Parents: your morning role is covered in{' '}
        <A href="/blog/a-level-results-day-parents-guide/">the parents&apos; results day guide</A>.
      </Callout>

      <H2 id="clearing-with-intent">If both say no: Clearing, played properly</H2>
      <P>
        Clearing placed just under 70,000 students in 2025. The students who do it well treat it like a
        shortlist exercise, not a jumble sale: pick three to five courses from the UCAS vacancy listings
        and your &quot;Clearing matches&quot;, rank them, and call in order using the same script structure
        above (swap the opening line for: &quot;I&apos;m in Clearing with AAB and I&apos;m very interested in
        [course]. Are you considering applicants with my grades?&quot;).
      </P>
      <P>
        One honest myth-check, because every August produces articles promising &quot;the list of
        universities accepting lower grades in Clearing&quot;: no stable list exists. Flexibility is decided
        course by course, day by day, based on how many places are left. The way you find it is the
        unglamorous one: the official vacancy listings, and the phone. A university that quotes BBB in the
        listings may still say yes to your ABC this afternoon. Ask, don&apos;t assume, in either direction.
      </P>

      <H2 id="appeal-question">The appeal question, quickly</H2>
      <P>
        If one mark sits close to a grade boundary (boundaries are published from 8am on results day) and
        your teachers agree the script deserves review, a priority review of marking exists precisely for
        students whose university place depends on it: request it through school by 20 August 2026, results
        within 15 days, and marks can move down as well as up. The strategy, costs and honest success odds
        are in <A href="/blog/a-level-appeals-2026/">the full appeals guide</A>.
      </P>

      <H2 id="zoom-out">Keep the day the right size</H2>
      <P>
        A one-grade miss feels enormous at 8:05am. By September it&apos;s a footnote: you&apos;ll be at your
        firm, your insurance, a Clearing course you chose deliberately, or planning{' '}
        <A href="/blog/resitting-a-levels/">a resit year</A>{' '}with a better method than the first attempt.
        Every one of those paths leads somewhere good. If you want the whole morning mapped out step by
        step, start with{' '}
        <A href="/blog/didnt-get-the-grades-a-level-results/">the results day triage guide</A>.
      </P>

      <H2 id="sources">Sources</H2>
      <UL>
        <LI><A href="https://www.ucas.com/applying/after-you-apply/clearing-and-results-day/results-day">UCAS: results day 2026 (Hub timings, Clearing from 1pm)</A></LI>
        <LI><A href="https://www.ucas.com/corporate/news-and-key-documents/news/number-of-uk-18-year-olds-accepted-into-university-or-college-hits-record-high">UCAS, 14 August 2025: firm-choice placement and acceptance figures</A></LI>
        <LI><A href="https://www.ucas.com/data-and-analysis/undergraduate-statistics-and-reports/statistical-releases-daily-clearing-analysis-2025">UCAS daily Clearing analysis 2025 (Clearing placements)</A></LI>
        <LI><A href="https://www.jcq.org.uk/wp-content/uploads/sites/2/2026/05/Post-Results-Service_26_FINAL.pdf">JCQ post-results services booklet 2026 (PDF; priority review deadline and timings)</A></LI>
      </UL>
    </ArticleLayout>
  )
}
