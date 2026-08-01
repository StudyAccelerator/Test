import SubjectTutoringPage, { subjectMetadata, type SubjectPageConfig } from '@/components/subject-tutoring/page-template'

const c: SubjectPageConfig = {
  slug: 'a-level-maths-tutoring',
  subject: 'Maths',
  metaTitle: 'A-Level Maths Tutoring Online | A-Level Accelerators',
  metaDescription:
    'Live online A-level Maths tutoring in small groups: 12 weekly specialist-led sessions on problem-solving and exam technique, led by Dr Waleed Ahmad, MBBS. First session risk-free.',
  h1: 'A-level Maths tutoring for students who understand it in class and lose it in the exam',
  heroSub:
    "The classic Maths story: everything makes sense when the teacher does it, then the paper asks a question that doesn't announce which method it wants and the marks disappear. Our live 12-week programme trains problem-solving on real exam questions, every week, until unfamiliar stops meaning impossible.",
  leaksHeading: 'Where Maths marks actually leak',
  leaks: [
    {
      title: "Questions that don't tell you the method",
      body: "A-level Maths went heavy on problem-solving: questions no longer signpost which technique to use. Students trained on textbook exercises, where the chapter tells you the method, hit these and stall. We train method selection itself, the skill of reading a question and knowing where to start.",
    },
    {
      title: 'Algebraic slips under time pressure',
      body: 'Most lost Maths marks are not conceptual. They are sign errors, dropped terms and rushed rearrangements in minute 80 of a 120-minute paper. We build the layout habits and checking discipline that stop the bleed, and drill them under timed conditions.',
    },
    {
      title: 'The applied papers: mechanics and statistics',
      body: "Pure maths gets all the classroom time; the applied content decides a third of the grade. Translating a wordy mechanics scenario into equations, or interpreting statistical output correctly, are learnable skills that most students simply haven't practised enough. We practise them deliberately.",
    },
    {
      title: 'Showing the working the mark scheme pays for',
      body: 'Method marks are a gift the exam hands out for organised working, and untidy answers refuse the gift. We teach the setting-out patterns that collect method marks even when the final answer goes wrong.',
    },
  ],
  quoteNames: ['Jay', 'Catherine'],
  faqs: [
    {
      q: 'Is this one-to-one Maths tutoring?',
      a: "No, it's a live small-group programme taught by a Maths specialist, which is how it costs around £14 per teaching hour instead of the £50 an hour typical for one-to-one. Sessions are interactive, and students work through problems live rather than watching. If your situation genuinely needs one-to-one, book a free call and we'll say so honestly.",
    },
    {
      q: 'Which exam boards does the Maths programme cover?',
      a: 'AQA, OCR and Edexcel. A-level Maths content is closely aligned across boards, and past-paper practice uses the board each student sits.',
    },
    {
      q: 'How does the 12-week Maths Accelerator work?',
      a: 'One live 2-hour session each week for 12 weeks, scheduled at weekends. Short, sharp content coverage, then the bulk of every session inside exam questions with mark schemes open. Recorded sessions and weekly practice questions in between.',
    },
    {
      q: 'Does it cover pure maths, mechanics and statistics?',
      a: 'Yes. The programme works across the full A-level: pure methods plus the applied content, with problem-solving and exam technique trained throughout, because that is where papers award and remove the most marks.',
    },
    {
      q: 'What does A-level Maths tutoring cost here?',
      a: 'The 12-week Maths Accelerator is £339, roughly £14 per hour of live specialist teaching. The bundle with Biology and Chemistry is £849. First session risk-free, full refund if it is not right for you.',
    },
  ],
}

export const metadata = subjectMetadata(c)

export default function Page() {
  return <SubjectTutoringPage c={c} />
}
