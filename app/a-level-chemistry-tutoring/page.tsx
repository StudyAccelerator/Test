import SubjectTutoringPage, { subjectMetadata, type SubjectPageConfig } from '@/components/subject-tutoring/page-template'

const c: SubjectPageConfig = {
  slug: 'a-level-chemistry-tutoring',
  subject: 'Chemistry',
  metaTitle: 'A-Level Chemistry Tutoring Online | A-Level Accelerators',
  metaDescription:
    'Live online A-level Chemistry tutoring in small groups: 12 weekly specialist-led sessions on calculations, mechanisms and exam technique, led by Dr Waleed Ahmad, MBBS. First session risk-free.',
  h1: 'A-level Chemistry tutoring that fixes the marks you keep losing',
  heroSub:
    'Chemistry is the subject where hard workers stall hardest: the content makes sense in class, then the paper asks a five-step calculation or an unfamiliar mechanism and the marks vanish. Our live 12-week programme trains exactly those skills, on real exam questions, every week.',
  leaksHeading: 'Where Chemistry marks actually leak',
  leaks: [
    {
      title: 'Multi-step calculations that collapse in the middle',
      body: 'Moles, titrations, equilibrium constants, energetics: Chemistry papers chain four or five steps together and one slip kills the lot. We teach a written method for setting out calculations so errors get caught early, then drill it under exam conditions until it holds.',
    },
    {
      title: 'Organic mechanisms and synthesis routes',
      body: "Memorising individual mechanisms isn't the skill. The exam asks you to choose the right one, draw it precisely, and link reactions into multi-step synthesis routes. That selection-and-connection skill is trained deliberately, mechanism by mechanism.",
    },
    {
      title: 'Explanations that sound right but score zero',
      body: "Chemistry mark schemes want specific terminology in specific logical order. 'It's more reactive because it's bigger' feels like an answer and earns nothing. We work against real mark schemes every session so students learn what examiners actually pay for.",
    },
    {
      title: 'Practical and data questions',
      body: 'Required practical knowledge, error analysis, graph interpretation: these questions reward familiarity with how the paper asks, more than lab brilliance. Past-paper repetition builds that familiarity fast.',
    },
  ],
  quoteNames: ['Maahil', 'Ahreen'],
  faqs: [
    {
      q: 'Is this one-to-one Chemistry tutoring?',
      a: "No, it's a live small-group programme taught by a Chemistry specialist, which is how it costs about £14 per teaching hour rather than the £50 an hour typical of one-to-one. Sessions are interactive and questions get answered in the room. If you think you need one-to-one specifically, book a free call and we'll tell you honestly whether it's the right spend.",
    },
    {
      q: 'Which exam boards does the Chemistry programme cover?',
      a: 'AQA, OCR and Edexcel. Teaching is built around the shared core of the specs, with past-paper work drawn from the board each student actually sits.',
    },
    {
      q: 'How does the 12-week Chemistry Accelerator work?',
      a: 'One live 2-hour session a week for 12 weeks, at weekends so school is unaffected. Brief content coverage, then straight into exam questions against mark schemes. All sessions are recorded and weekly practice questions keep the skills moving between sessions.',
    },
    {
      q: 'Is the programme suitable for Year 12 and Year 13?',
      a: 'Yes. The exam skills are identical in both years, and Year 12 students who train them early walk into Year 13 with their predicted grades protected. Book a free call if you want an honest view on timing for your situation.',
    },
    {
      q: 'What does A-level Chemistry tutoring cost here?',
      a: 'The 12-week Chemistry Accelerator is £339, about £14 per hour of live specialist teaching. The three-subject bundle with Biology and Maths is £849. First session risk-free, full refund if it is not right.',
    },
  ],
}

export const metadata = subjectMetadata(c)

export default function Page() {
  return <SubjectTutoringPage c={c} />
}
