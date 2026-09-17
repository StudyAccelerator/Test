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
  DiagnosticCTA,
  type FAQ,
} from '@/components/blog/article-kit'
import { getPost, SITE_URL } from '@/lib/posts'

const post = getPost('is-my-child-revising-properly')!

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
    q: 'How do I know if my child is actually revising?',
    a: "Stop measuring the inputs (hours at the desk, the tidy notes) and check one output a week: ask them to explain a topic they revised, out loud, in their own words, with the book closed. Real revision survives that test comfortably. Re-reading and highlighting do not. It's a two-minute check, it needs no subject knowledge from you, and done with genuine curiosity rather than suspicion it doesn't start a fight.",
  },
  {
    q: "My child revises for hours but their grades don't improve. Why?",
    a: "Because hours measure effort, not method. The most common pattern I see is a student genuinely working hard at the wrong activities: re-reading notes, copying them out neatly, highlighting, watching explainer videos. All of it feels like work and none of it forces the brain to retrieve anything, and exams only pay for retrieval. When effort is high and grades are flat, the method is broken in one of four places: knowledge, recall, application or exam technique, and each has a different fix.",
  },
  {
    q: "Should I supervise my teenager's revision?",
    a: "Not in the checking-hours sense, no. Surveillance turns revision into a war about trust, and hours are the wrong metric anyway. The parent moves that work are outcome checks (one explain-it-to-me a week), logistics (quiet, food, a phone parked by agreement), and helping them get a plan they built themselves, which they'll defend instead of resist. You're aiming to be the calendar, not the police.",
  },
  {
    q: 'What is the blank-page test?',
    a: "The cheapest revision audit there is: after revising a topic, the student writes everything they can remember on a blank page, book closed, then compares it against their notes. The gaps are what revision hasn't actually secured yet. Students call the method blurting. If nothing in your child's revision ever happens from a blank page, that is the single clearest sign the hours aren't converting into marks.",
  },
  {
    q: 'When does ineffective revision become a bigger problem?',
    a: "When it runs unfixed into the evidence windows: Year 12 end-of-year exams and the autumn of Year 13, when predicted grades are set, and mock season, when those predictions get confirmed or cut. A term of comfortable, ineffective revision before any of those points quietly costs university options. That's why the right moment to check the method is now, not after the next set of disappointing results.",
  },
]

export default function Page() {
  return (
    <ArticleLayout post={post} faqs={faqs}>
      <QuickAnswer>
        You can&apos;t tell whether your child is revising properly from hours at a desk or tidy notes,
        because the most common revision methods look like work and produce almost nothing. The reliable
        checks are outputs: can they explain a topic aloud from memory, do they ever test themselves from a
        blank page, and do their marks move with their effort? If the answer to those is no, the revision
        isn&apos;t working, and the fix is a change of method, not more hours.
      </QuickAnswer>

      <Lead>
        Let me describe seventeen-year-old me, seen from the doorway of my bedroom. Desk lamp on. Textbook
        open. Highlighters in four colours. Pages of neat notes growing steadily. Any parent would have
        closed the door reassured, and mine did. Here&apos;s the uncomfortable truth I only understood years
        later, after working with more than 1,000 A-level students: almost none of that was revision. It
        was the theatre of revision, and from the doorway the two are indistinguishable.
      </Lead>

      <KeyTakeaways
        points={[
          'Visible effort is the worst predictor of results. Re-reading, highlighting and note-making feel like work, look like work, and secure almost nothing.',
          'Exams pay for retrieval: pulling knowledge out of memory under pressure. Revision that never practises retrieval never builds it.',
          "Six signs tell you the hours aren't converting, and all six are visible from outside without checking a single page of their work.",
          'The parent fix is outcome checks, not surveillance: one explain-it-to-me a week beats any amount of hour-counting.',
          'A neutral diagnosis beats a parent-child argument. The free revision diagnostic has a parent version answered from what you observe at home.',
        ]}
      />

      <H2 id="the-trap">The trap: revision that looks perfect and does nothing</H2>
      <P>
        The methods most students default to are the ones that LOOK most like studying: read the notes
        again, write them out more neatly, highlight the important lines, watch a video explaining the
        topic. Every one of them has the same flaw. They put information in front of the brain, and the
        brain nods along, recognising it all. Recognition feels like knowing. Then the exam asks the
        student to produce the material from memory and apply it to an unfamiliar question, which is a
        completely different skill, and the marks collapse. Psychologists call it the illusion of
        competence. Parents experience it as &quot;they revise constantly and the grades never move&quot;.
      </P>
      <P>
        This is why the question &quot;is my child revising properly?&quot; can&apos;t be answered by watching them
        revise. It can only be answered by checking what the revision produces.
      </P>

      <H2 id="six-signs">Six signs the hours aren&apos;t working</H2>
      <OL>
        <LI>
          <Strong>They can&apos;t explain a topic out loud.</Strong>{' '}Ask, with real curiosity, &quot;talk me
          through what you revised today, I&apos;m interested.&quot; A student whose revision is landing can
          teach it back in their own words. A student who has spent two hours re-reading will reach for
          the notes within a sentence.
        </LI>
        <LI>
          <Strong>Nothing ever happens from a blank page.</Strong>{' '}Real revision involves closed-book
          writing: practice questions, or{' '}
          <A href="/blog/blurting-method-a-level-revision/">blurting</A>, where you write everything you
          remember and then find the gaps. If every session happens with the notes open, nothing is being
          retrieved, only recognised.
        </LI>
        <LI>
          <Strong>No past-paper marks exist anywhere.</Strong>{' '}By Year 12&apos;s second term, and certainly
          in Year 13, revision should generate a trail of attempted questions and honest scores. If your
          child cannot show you a single marked attempt, the revision has never been tested against the
          thing it exists for.
        </LI>
        <LI>
          <Strong>The same comfortable topics keep getting &quot;revised&quot;.</Strong>{' '}Revising what you
          already know feels good and is close to worthless. Watch for the same subject, even the same
          topic, appearing week after week while the hard one never comes up.
        </LI>
        <LI>
          <Strong>Hours rise and marks don&apos;t.</Strong>{' '}One bad test is noise. Effort climbing for six
          weeks while scores stay flat is a signal, and it points at method, not ability or laziness.
        </LI>
        <LI>
          <Strong>They can&apos;t tell you what went wrong last time.</Strong>{' '}Students running a real
          system know exactly which topics and question types cost them marks in the last test, because
          that list is what they revise from. &quot;I just messed it up&quot; means no one has looked.
        </LI>
      </OL>

      <Callout title="Why bright students fall into this hardest">
        If your child got strong GCSEs, they probably never needed a real revision method: memory and
        classroom attention were enough. A-level is where that stops working, usually in the first term of
        Year 12, and the collapse gets misread as lost ability. I&apos;ve written a full guide to{' '}
        <A href="/blog/gcse-to-a-level-jump/">the GCSE to A-level jump and why it catches good students
        out</A>.
      </Callout>

      <H2 id="what-to-do">What to do about it, without starting a war</H2>
      <P>
        The instinct is surveillance: check the hours, confiscate the phone, stand over the desk. It
        fails, partly because hours are the wrong metric, and mostly because it turns revision into a
        battle about trust that you cannot win with a seventeen-year-old. Swap it for three moves:
      </P>
      <UL>
        <LI>
          <Strong>One outcome check a week.</Strong>{' '}The explain-it-to-me conversation, framed as
          interest, never as a test. Over dinner works better than at the desk.
        </LI>
        <LI>
          <Strong>Suggest the blank-page test as an experiment, not an accusation.</Strong>{' '}&quot;I read
          about this method, apparently most students who try it are shocked. Bet you&apos;d find it easy&quot;
          lands very differently from &quot;prove you&apos;ve learned it&quot;.
        </LI>
        <LI>
          <Strong>Get the plan owned by them.</Strong>{' '}A timetable a parent writes is a demand; a
          timetable the student builds is a commitment. Our free{' '}
          <A href="/revision-tracker/">revision tracker</A>{' '}builds one around their weakest topics in
          about three minutes, with the retrieval methods baked in, and{' '}
          <A href="/blog/how-many-hours-revision-a-level/">the honest hours targets</A>{' '}stop the
          argument about whether they&apos;re doing enough.
        </LI>
      </UL>

      <DiagnosticCTA audience="parent" />

      <H2 id="neutral-diagnosis">The neutral diagnosis, and when to get help</H2>
      <P>
        The strongest move of all is taking the argument out of the family entirely. When a parent says
        &quot;your revision isn&apos;t working&quot;, it&apos;s criticism. When an outside diagnostic says &quot;your
        marks are leaking at the recall step, here&apos;s the fix&quot;, it&apos;s information, and teenagers act
        on information they weren&apos;t argued into. That&apos;s exactly what the free diagnostic above does,
        and the parent version means you can get the read even if your child won&apos;t sit it themselves
        yet. If the diagnosis points at a gap that needs teaching rather than method, that&apos;s the point
        where{' '}
        <A href="/blog/one-to-one-a-level-tutoring/">the right kind of help</A>{' '}earns its cost, and{' '}
        <A href="/blog/how-much-does-a-level-tutoring-cost/">what that should cost</A>{' '}is worth reading
        before you spend anything. On average, our students jump two grades, and every programme starts
        with exactly this diagnosis, because treating the wrong problem is the most expensive mistake in
        tutoring.
      </P>
    </ArticleLayout>
  )
}
