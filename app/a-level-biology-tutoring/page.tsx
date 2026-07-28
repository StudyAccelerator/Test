import SubjectTutoringPage, { subjectMetadata, type SubjectPageConfig } from '@/components/subject-tutoring/page-template'

const c: SubjectPageConfig = {
  slug: 'a-level-biology-tutoring',
  subject: 'Biology',
  metaTitle: 'A-Level Biology Tutoring Online | A-Level Accelerators',
  metaDescription:
    'Live online A-level Biology tutoring in small groups: 12 weekly specialist-led sessions built around exam questions and mark schemes, led by Dr Waleed Ahmad, MBBS. First session risk-free.',
  h1: 'A-level Biology tutoring built around the exam, not the textbook',
  heroSub:
    "Most Biology students don't fail on knowledge. They fail on applying it to questions they've never seen. Our live 12-week programme teaches the subject the way the paper tests it: exam questions first, mark schemes open, every week.",
  leaksHeading: 'Where Biology marks actually leak',
  leaks: [
    {
      title: 'Application questions you have never seen before',
      body: "Biology papers love 'suggest' and 'explain' questions set in unfamiliar contexts. Students who learned the content by re-reading freeze here, because the exam isn't asking what you know, it's asking what you can do with it. We train that skill directly, on real past-paper questions, every single week.",
    },
    {
      title: 'Extended response and essay marks',
      body: 'The long-answer questions reward structure and mark-scheme language, not everything you can remember about the topic. We break down how examiners award these marks and drill the writing pattern until it is automatic.',
    },
    {
      title: 'The maths hiding inside Biology',
      body: 'Magnification, percentage change, statistical tests, water potential: a meaningful slice of the paper is quantitative, and it is where confident writers quietly lose grades. Those skills get dedicated practice.',
    },
    {
      title: 'Sheer content volume with no retrieval system',
      body: "Biology has more raw content than almost any A-level. Without active recall and spaced review, it leaks out as fast as it goes in. Alongside the teaching, we build the revision system that makes the content stick, because that's the method side our whole company is built on.",
    },
  ],
  quoteNames: ['Naysa', 'Rayanna'],
  faqs: [
    {
      q: 'Is this one-to-one Biology tutoring?',
      a: "No, and that's deliberate. It's a live small-group programme taught by a Biology specialist, which is how we keep it around £14 per teaching hour instead of the £50 an hour typical for one-to-one. Sessions are interactive: students ask questions in real time and work through papers together. If you specifically need one-to-one help, book a free call and we'll give you an honest steer on whether it's worth it for your situation.",
    },
    {
      q: 'Which exam boards does the Biology programme cover?',
      a: 'AQA, OCR and Edexcel. The teaching is built around the shared core of the specifications, and past-paper practice uses questions from the board each student sits.',
    },
    {
      q: 'How does the 12-week Biology Accelerator work?',
      a: 'One live 2-hour session each week for 12 weeks, scheduled at weekends so it never clashes with school. Content is covered briefly, then the session moves into exam questions and mark schemes. Every session is recorded, and there are weekly practice questions between sessions.',
    },
    {
      q: 'My child is aiming for an A or A*. Is this still useful?',
      a: 'That jump is exactly what the programme is built for. B-grade students usually know the content; what separates A and A* is application to unfamiliar questions and examiner-grade answer construction, which is precisely what the sessions train.',
    },
    {
      q: 'What does A-level Biology tutoring cost here?',
      a: 'The 12-week Biology Accelerator is £339, which works out at about £14 per hour of live specialist teaching. Taking Biology, Chemistry and Maths together is £849. The first session is risk-free: if it is not right, you get a full refund.',
    },
  ],
}

export const metadata = subjectMetadata(c)

export default function Page() {
  return <SubjectTutoringPage c={c} />
}
