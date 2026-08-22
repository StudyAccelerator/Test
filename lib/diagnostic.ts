/*
 * The Revision Diagnostic: scoring engine and content.
 *
 * Pure data + pure functions, no React. The quiz UI feeds answers in,
 * this module returns the full diagnosis: five system scores, a revision
 * archetype, the hours leak estimate, a prescription, and the programme
 * route. Everything shown on the report is derived here so it can be
 * checked without a browser.
 *
 * Pedagogy mirrors the rest of the site: retrieval beats recognition,
 * spacing beats cramming, mark schemes are a language, and effort goes
 * to the weakest topics first. The hours-leak number is arithmetic on
 * the student's own answers, never an invented statistic.
 */

export type Dim = 'method' | 'retention' | 'examCraft' | 'prioritisation' | 'consistency'

/* Who is filling the diagnostic in. Chosen at the fork before question one.
   Same engine either way: parent answers describe the child, so ids and
   scoring are identical, only the wording changes. */
export type Taker = 'student' | 'parent'

export const DIMS: Dim[] = ['method', 'retention', 'examCraft', 'prioritisation', 'consistency']

export const DIM_META: Record<Dim, { label: string; short: string; question: string; questionParent: string }> = {
  method: {
    label: 'Method',
    short: 'M',
    question: 'Is your revision retrieval, or recognition?',
    questionParent: 'Is their revision retrieval, or recognition?',
  },
  retention: {
    label: 'Retention',
    short: 'R',
    question: 'Does what you learn stay learned?',
    questionParent: 'Does what they learn stay learned?',
  },
  examCraft: {
    label: 'Exam Craft',
    short: 'E',
    question: 'Can you turn knowledge into marks under exam conditions?',
    questionParent: 'Can they turn knowledge into marks under exam conditions?',
  },
  prioritisation: {
    label: 'Targeting',
    short: 'T',
    question: 'Do your hours go where the marks are missing?',
    questionParent: 'Do their hours go where the marks are missing?',
  },
  consistency: {
    label: 'Consistency',
    short: 'C',
    question: 'Does your revision run on a system, or on mood?',
    questionParent: 'Does their revision run on a system, or on mood?',
  },
}

/* ── Questions ─────────────────────────────────────────────────────────── */

export interface Option {
  id: string
  label: string
  /* Parent-path wording. Same id and scores: the behaviour being described
     is identical, the observer is different. Falls back to label. */
  labelParent?: string
  detail?: string
  detailParent?: string
  scores?: Partial<Record<Dim, number>> // 0 to 1: how healthy this behaviour is
  flags?: string[]
  /* Picking this option opens a small follow-up on the same card (which
     subjects, which course, why it stopped). Detail is context for Waleed's
     call, stored in diag_support_detail; it never blocks the quiz. */
  followUp?: {
    kind: 'subjects' | 'text'
    prompt: string
    promptParent?: string
    placeholder?: string
  }
}

export interface Question {
  id: string
  section: number
  title: string
  titleParent?: string
  help?: string
  helpParent?: string
  /* 'grades' renders one row of grade chips per chosen subject; the answer is
     stored as "Subject|gradeId" pairs so Answers stays a flat string map. */
  type: 'single' | 'multi' | 'worry' | 'grades'
  layout: 'cards' | 'chips'
  weights?: Partial<Record<Dim, number>>
  options: Option[]
}

/* Wording helpers: one call site per string, no mechanical pronoun swaps. */
export const qTitle = (q: Question, taker: Taker) => (taker === 'parent' ? q.titleParent ?? q.title : q.title)
export const qHelp = (q: Question, taker: Taker) => (taker === 'parent' ? q.helpParent ?? q.help : q.help)
export const oLabel = (o: Option, taker: Taker) => (taker === 'parent' ? o.labelParent ?? o.label : o.label)
export const oDetail = (o: Option, taker: Taker) => (taker === 'parent' ? o.detailParent ?? o.detail : o.detail)

export const SECTIONS = [
  'About you',
  'Your week',
  'How you revise',
  'Memory and targeting',
  'Exam performance',
  'What you need',
]

export const SECTIONS_PARENT = [
  'About your child',
  'Their week',
  'How they revise',
  'Memory and targeting',
  'Exam performance',
  'What they need',
]

export const SUBJECT_CHOICES = [
  'Biology',
  'Chemistry',
  'Maths',
  'Physics',
  'Psychology',
  'Economics',
  'History',
  'English',
  'Geography',
  'Business',
  'Computer Science',
  'Other',
]

/* The Summer Accelerator only exists as a recommendation while its cohort is
   still ahead: the 2026 cohort started Saturday 22 August, so from that date
   the diagnostic stops routing anyone to it and sends Year 12 STEM students to
   the September programmes instead. Change this date (or delete the guard)
   when a new summer cohort is on sale. */
const SUMMER_COHORT_START = '2026-08-22'
const summerOnSale = () => new Date().toISOString().slice(0, 10) < SUMMER_COHORT_START

const SUMMER_SUBJECTS = ['Biology', 'Chemistry', 'Maths', 'Physics']
const SUBJECT_ACCEL_SUBJECTS = ['Biology', 'Chemistry', 'Maths']

/* The needs question: the signal Waleed reads first on every lead. Unscored,
   and the report's routing stays honest to the diagnosis; this is what THEY
   think they need, which is exactly why it's asked last, after the honest
   answers, and stored on the subscriber as diag_support_needed. */
const SUPPORT_NEEDED_BASE: Option[] = [
  {
    id: 'oneToOne',
    label: 'One-to-one subject tutoring',
    detail: 'A specialist working through your weakest subject with you',
    detailParent: 'A specialist working through their weakest subject with them',
  },
  {
    id: 'method',
    label: 'A better way to revise',
    detail: 'Active recall, spaced repetition, a system that makes the hours count',
  },
  {
    id: 'examTechnique',
    label: 'Exam technique and mark scheme mastery',
    detail: 'Turning what you already know into marks under time pressure',
    detailParent: 'Turning what they already know into marks under time pressure',
  },
  {
    id: 'plan',
    label: 'A custom revision plan',
    detail: 'Exactly what to revise and when, built around your real week',
    detailParent: 'Exactly what to revise and when, built around their real week',
  },
  {
    id: 'coach',
    label: 'A personal A-level coach, all year round',
    detail: 'One person watching your grades, your plan and your progress every week',
    detailParent: 'One person watching their grades, their plan and their progress every week',
  },
  {
    id: 'freeStuff',
    label: 'Free advice and resources for now',
    detail: 'Emails, guides and the free tools, while you decide',
    detailParent: 'Emails, guides and the free tools, while you decide',
  },
  {
    id: 'unsure',
    label: 'Not sure yet',
    detail: 'Show me what the report recommends',
  },
]

export const QUESTIONS: Question[] = [
  /* ── Section 1: About you ── */
  {
    id: 'year',
    section: 0,
    title: 'Where are you in your A-levels?',
    titleParent: 'Where is your child in their A-levels?',
    type: 'single',
    layout: 'cards',
    options: [
      { id: 'y12', label: 'Year 12', detail: 'First year, or about to start Year 13' },
      { id: 'y13', label: 'Year 13', detail: 'Final year, exams at the end of it' },
      { id: 'pre', label: 'Starting A-levels soon', labelParent: 'Starting A-levels soon', detail: 'In Year 11, or just finished GCSEs' },
      { id: 'resit', label: 'Resitting', detail: 'Retaking one or more A-levels' },
    ],
  },
  {
    id: 'subjects',
    section: 0,
    title: 'Which subjects are you taking?',
    titleParent: 'Which subjects do they take?',
    help: 'Pick all of them.',
    helpParent: 'Pick all of them.',
    type: 'multi',
    layout: 'chips',
    options: SUBJECT_CHOICES.map((s) => ({ id: s, label: s })),
  },
  {
    id: 'worry',
    section: 0,
    title: 'Which one worries you most?',
    titleParent: 'Which subject worries you most for them?',
    help: "Be honest. The one you'd least want to sit an exam in tomorrow morning.",
    helpParent: "The one you'd least want them to sit an exam in tomorrow morning.",
    type: 'worry',
    layout: 'chips',
    options: [], // built at runtime from the subjects answer, plus "Not sure"
  },
  {
    id: 'currentGrades',
    section: 0,
    title: 'What grade are you working at right now, in each subject?',
    titleParent: 'What grade are they working at right now, in each subject?',
    help: 'Your latest test or mock in each one, not your best day.',
    helpParent: 'Their latest test or mock in each one, not their best day.',
    type: 'grades',
    layout: 'chips',
    options: [
      { id: 'astar', label: 'A*' },
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' },
      { id: 'd', label: 'D or below' },
      { id: 'unsure', label: 'Not sure' },
    ],
  },
  {
    id: 'targetGrades',
    section: 0,
    title: 'And what grades do you actually want on results day?',
    titleParent: 'And what grades do they need on results day?',
    help: "The honest ones. The grades your offers need, or the ones you'd be proud of.",
    helpParent: "The grades their offers need, or the ones they're aiming for.",
    type: 'grades',
    layout: 'chips',
    options: [
      { id: 'astar', label: 'A*' },
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' },
    ],
  },
  {
    id: 'support',
    section: 0,
    title: 'Do you have any extra help outside school right now?',
    titleParent: 'Does your child have any extra help outside school right now?',
    help: 'Tutoring, courses, anything beyond lessons. It changes what I recommend.',
    helpParent: 'Tutoring, courses, anything beyond lessons. It changes what I recommend.',
    type: 'single',
    layout: 'cards',
    /* Context, not scored: support tells us where they are, not how they revise */
    options: [
      { id: 'none', label: "No, it's all me", labelParent: 'No, nothing at the moment' },
      {
        id: 'tutor',
        label: 'Yes, a private tutor',
        labelParent: 'Yes, a private tutor',
        followUp: {
          kind: 'subjects',
          prompt: 'Which subjects are you getting tutored in?',
          promptParent: 'Which subjects do they get tutoring in?',
        },
      },
      {
        id: 'online',
        label: 'An online course or programme',
        labelParent: 'An online course or programme',
        followUp: {
          kind: 'text',
          prompt: 'Which course are you enrolled on?',
          promptParent: 'Which course are they enrolled on?',
          placeholder: 'The name of the course',
        },
      },
      {
        id: 'past',
        label: 'I had a tutor, but stopped',
        labelParent: 'They had a tutor, but it stopped',
        followUp: {
          kind: 'text',
          prompt: 'What made you stop?',
          promptParent: 'What made it stop?',
          placeholder: 'Cost, fit, results, timing, anything honest',
        },
      },
      {
        id: 'school',
        label: 'Extra sessions at school only',
        labelParent: 'Extra sessions at school only',
        followUp: {
          kind: 'subjects',
          prompt: 'Which subjects?',
          promptParent: 'Which subjects?',
        },
      },
    ],
  },

  /* ── Section 2: Your week ── */
  {
    id: 'hours',
    section: 1,
    title: 'In a normal week, how many hours of independent study do you really do?',
    titleParent: 'In a normal week, how many hours of independent study do they really do?',
    help: 'A typical week, not the big one just before exams.',
    helpParent: 'A typical week from what you see, not the run-up to exams.',
    type: 'single',
    layout: 'cards',
    weights: { consistency: 1 },
    options: [
      { id: 'under5', label: 'Under 5 hours', scores: { consistency: 0.2 } },
      { id: 'h5to10', label: '5 to 10 hours', scores: { consistency: 0.6 } },
      { id: 'h10to15', label: '10 to 15 hours', scores: { consistency: 0.95 } },
      { id: 'over15', label: 'More than 15 hours', scores: { consistency: 1 } },
    ],
  },
  {
    id: 'when',
    section: 1,
    title: 'When does revision actually happen for you?',
    titleParent: 'When does revision actually happen?',
    type: 'single',
    layout: 'cards',
    weights: { consistency: 2.5, retention: 1 },
    options: [
      { id: 'plan', label: 'Every day, I follow a planned timetable', labelParent: 'Every day, they follow a planned timetable', scores: { consistency: 1, retention: 0.9 } },
      { id: 'most', label: 'Most days, but with no real structure', labelParent: 'Most days, but with no real structure', scores: { consistency: 0.55, retention: 0.6 } },
      { id: 'guilt', label: 'When I start feeling guilty about my revision', labelParent: 'When they start feeling guilty, usually after reminders', scores: { consistency: 0.25, retention: 0.3 } },
      { id: 'panic', label: 'The week before a test, in a panic', labelParent: 'The week before a test, in a panic', scores: { consistency: 0.1, retention: 0.1 }, flags: ['cram'] },
    ],
  },
  /* The phone question lived here until 13 August 2026: Waleed swapped it out
     to keep the bank at 20 when the support-needs question came in. */

  /* ── Section 3: How you revise ── */
  {
    id: 'defaultActivity',
    section: 2,
    title: 'How do you revise?',
    titleParent: 'How do they revise?',
    help: 'Your default, not your best day.',
    helpParent: 'Their default, from what you see, not their best day.',
    type: 'single',
    layout: 'cards',
    weights: { method: 3, retention: 1.5 },
    options: [
      { id: 'reread', label: 'Read through my notes or the textbook', labelParent: 'Reading through notes or the textbook', scores: { method: 0.1, retention: 0.15 } },
      { id: 'rewrite', label: 'Write out notes, mind maps, summaries', labelParent: 'Writing out notes, mind maps, summaries', scores: { method: 0.3, retention: 0.3 }, flags: ['maker'] },
      { id: 'videos', label: 'Watch videos or get things explained', labelParent: 'Watching videos or getting things explained', scores: { method: 0.35, retention: 0.3 } },
      { id: 'flash', label: 'Flashcards or Anki', scores: { method: 0.8, retention: 0.9 } },
      { id: 'questions', label: 'Past paper questions', scores: { method: 0.9, retention: 0.7 } },
      { id: 'blurt', label: 'Blurting: write what I know from memory, then check', labelParent: 'Blurting: writing what they know from memory, then checking', scores: { method: 1, retention: 0.9 } },
    ],
  },
  {
    id: 'check',
    section: 2,
    title: "How do you know that you've understood a topic?",
    titleParent: "How do they know they've understood a topic?",
    helpParent: 'Worth asking them directly. The answer usually says a lot.',
    type: 'single',
    layout: 'cards',
    weights: { method: 3, retention: 1 },
    options: [
      { id: 'test', label: 'I test myself with the book closed', labelParent: 'They test themselves with the book closed', scores: { method: 1, retention: 0.8 } },
      { id: 'redo', label: 'I redo questions I got wrong', labelParent: 'They redo questions they got wrong', scores: { method: 0.85, retention: 0.7 } },
      { id: 'familiar', label: 'I reread it until it feels familiar', labelParent: 'They reread it until it feels familiar', scores: { method: 0.1, retention: 0.2 }, flags: ['recognition'] },
      { id: 'feel', label: 'I just sort of feel it', labelParent: 'They just sort of feel it', scores: { method: 0.05, retention: 0.2 }, flags: ['recognition'] },
      { id: 'quiz', label: 'Someone quizzes me', labelParent: 'Someone quizzes them, often you', scores: { method: 0.7, retention: 0.6 } },
    ],
  },
  {
    id: 'notes',
    section: 2,
    title: 'What do your notes look like?',
    titleParent: 'What do their notes look like?',
    type: 'single',
    layout: 'cards',
    weights: { method: 1.5 },
    options: [
      { id: 'beautiful', label: 'Colour coded, highlighted, honestly beautiful', scores: { method: 0.15 }, flags: ['maker'] },
      { id: 'functional', label: 'Messy, but they do the job', scores: { method: 0.7 } },
      { id: 'minimal', label: 'Barely any. I test myself instead', labelParent: 'Barely any. They test themselves instead', scores: { method: 0.95 } },
      { id: 'borrowed', label: "Mostly revision guides or other people's notes", scores: { method: 0.5 } },
    ],
  },
  {
    id: 'wrong',
    section: 2,
    title: 'What do you do if you get a question wrong?',
    titleParent: 'What do they do if they get a question wrong?',
    type: 'single',
    layout: 'cards',
    weights: { method: 2, examCraft: 1 },
    options: [
      { id: 'log', label: 'It goes in an error log and I retest it later', labelParent: 'It goes in an error log and gets retested later', scores: { method: 1, examCraft: 0.8 } },
      { id: 'scheme', label: 'I read the mark scheme answer and move on', labelParent: 'They read the mark scheme answer and move on', scores: { method: 0.5, examCraft: 0.5 } },
      { id: 'move', label: 'I feel bad about it and move on', labelParent: 'They feel bad about it and move on', scores: { method: 0.15, examCraft: 0.2 } },
      { id: 'unmarked', label: "I don't really mark my own work", labelParent: "They don't really mark their own work", scores: { method: 0.05, examCraft: 0.05 } },
    ],
  },
  {
    id: 'return',
    section: 2,
    title: 'If you revised a topic two weeks ago, when would you see it again?',
    titleParent: 'If they revised a topic two weeks ago, when would they see it again?',
    type: 'single',
    layout: 'cards',
    weights: { retention: 3 },
    options: [
      { id: 'spaced', label: "It's scheduled. I come back on set days", labelParent: "It's scheduled. They come back on set days", scores: { retention: 1 } },
      { id: 'sometimes', label: "Sometimes, if there's time left over", scores: { retention: 0.45 } },
      { id: 'rarely', label: "Rarely. There's always new content to cover", scores: { retention: 0.15 } },
      { id: 'forced', label: 'Only when an upcoming test contains that topic', scores: { retention: 0.25 } },
    ],
  },

  /* ── Section 4: Memory and targeting ── */
  {
    id: 'recall',
    section: 3,
    title: 'How well would you remember a topic that you covered three weeks ago in class?',
    titleParent: 'How well would they remember a topic covered three weeks ago in class?',
    helpParent: 'Not sure? Ask them to explain one old topic to you tonight. Two minutes tells you everything.',
    type: 'single',
    layout: 'cards',
    weights: { retention: 2.5, method: 0.5 },
    options: [
      { id: 'most', label: 'Most of it. I could explain it', labelParent: 'Most of it. They could explain it to you', scores: { retention: 0.95, method: 0.8 } },
      { id: 'recognise', label: "I recognise it, but I couldn't write an answer", labelParent: "They recognise it, but couldn't write an answer", scores: { retention: 0.35, method: 0.3 }, flags: ['recognition'] },
      { id: 'gone', label: "It's basically gone. I'd be starting again", labelParent: "It's basically gone. They'd be starting again", scores: { retention: 0.1, method: 0.3 } },
      { id: 'untested', label: 'No idea', scores: { retention: 0.3, method: 0.15 } },
    ],
  },
  {
    id: 'choose',
    section: 3,
    title: 'How do you decide what to revise each session?',
    titleParent: 'How do they decide what to revise each session?',
    type: 'single',
    layout: 'cards',
    weights: { prioritisation: 3 },
    options: [
      { id: 'weakest', label: 'I keep a list of weak topics and hit those first', labelParent: 'They keep a list of weak topics and hit those first', scores: { prioritisation: 1 } },
      { id: 'folder', label: "Whatever's next in the folder or the spec", scores: { prioritisation: 0.35 } },
      { id: 'comfort', label: "Whatever I feel like. Usually stuff I'm already ok at", labelParent: "Whatever they feel like. Usually things they're already ok at", scores: { prioritisation: 0.1 }, flags: ['comfort'] },
      { id: 'due', label: 'Whatever the next test or homework is', scores: { prioritisation: 0.4 } },
    ],
  },
  {
    id: 'awareness',
    section: 3,
    title: 'Could you name the exact topics costing you the most marks?',
    titleParent: 'Could they name the exact topics costing them the most marks?',
    type: 'single',
    layout: 'cards',
    weights: { prioritisation: 3 },
    options: [
      { id: 'list', label: 'Yes. I could list them right now', labelParent: 'Yes. They could list them right now', scores: { prioritisation: 1 } },
      { id: 'rough', label: 'Roughly. I know the general areas', labelParent: 'Roughly. They know the general areas', scores: { prioritisation: 0.55 } },
      { id: 'subject', label: 'I know which subject, not which topics', labelParent: 'They know which subject, not which topics', scores: { prioritisation: 0.25 } },
      { id: 'mood', label: 'Not really. It changes with my mood', labelParent: 'Not really. It changes with their mood', scores: { prioritisation: 0.1 } },
    ],
  },

  /* ── Section 5: Exam performance ── */
  {
    id: 'papers',
    section: 4,
    title: "What's your relationship with past papers?",
    titleParent: "What's their relationship with past papers?",
    type: 'single',
    layout: 'cards',
    weights: { examCraft: 3 },
    options: [
      { id: 'timed', label: 'I do them timed, then mark against the mark scheme', labelParent: 'They do them timed, then mark against the mark scheme', scores: { examCraft: 1 } },
      { id: 'open', label: 'I do them untimed, with my notes nearby', labelParent: 'They do them untimed, with notes nearby', scores: { examCraft: 0.45 } },
      { id: 'saving', label: "I'm saving them for closer to the exams", labelParent: "They're saving them for closer to the exams", scores: { examCraft: 0.15 } },
      { id: 'none', label: "I haven't really started them", labelParent: "They haven't really started them", scores: { examCraft: 0.05 } },
    ],
  },
  {
    id: 'schemes',
    section: 4,
    title: 'And mark schemes?',
    type: 'single',
    layout: 'cards',
    weights: { examCraft: 2.5 },
    options: [
      { id: 'study', label: "I study the exact wording of the examiner's mark scheme", labelParent: "They study the exact wording of the examiner's mark scheme", scores: { examCraft: 1 } },
      { id: 'glance', label: 'I glance at them to check answers', labelParent: 'They glance at them to check answers', scores: { examCraft: 0.5 } },
      { id: 'rarely', label: 'I rarely look at them', labelParent: 'They rarely look at them', scores: { examCraft: 0.15 } },
      { id: 'never', label: "I don't use mark schemes", labelParent: "They don't use mark schemes", scores: { examCraft: 0.05 } },
    ],
  },
  {
    id: 'examfail',
    section: 4,
    title: 'What do you struggle with the most in exams?',
    titleParent: 'What do they struggle with the most in exams?',
    helpParent: 'From results, teacher comments, or what they tell you afterwards.',
    type: 'single',
    layout: 'cards',
    weights: { examCraft: 1.5, retention: 0.5 },
    options: [
      { id: 'time', label: 'I run out of time', labelParent: 'They run out of time', scores: { examCraft: 0.3, retention: 0.7 }, flags: ['time'] },
      { id: 'blank', label: 'I blank on things I knew the night before', labelParent: 'They blank on things they knew the night before', scores: { examCraft: 0.4, retention: 0.15 }, flags: ['blank'] },
      { id: 'wording', label: 'I lose marks on wording, even when I know it', labelParent: 'They lose marks on wording, even when they know it', scores: { examCraft: 0.25, retention: 0.7 }, flags: ['wording'] },
      { id: 'panic', label: 'Misreads and panic mistakes', scores: { examCraft: 0.35, retention: 0.7 }, flags: ['panic'] },
      { id: 'fine', label: 'Exams are mostly fine. Revision is my problem', labelParent: 'Exams go fine. Revision is the problem', scores: { examCraft: 0.8, retention: 0.7 } },
    ],
  },

  /* ── Section 6: What you need ── */
  {
    id: 'supportNeeded',
    section: 5,
    title: 'Last one: what would you benefit from most right now?',
    titleParent: 'Last one: what would your child benefit from most right now?',
    help: "Pick as many as apply. Be honest about what you'd actually use.",
    helpParent: "Pick as many as apply. It tells me what to point you towards, and what not to.",
    type: 'multi',
    layout: 'cards',
    /* Context, not scored */
    options: SUPPORT_NEEDED_BASE,
  },
]

export type Answers = Record<string, string | string[]>

export function getWorryOptions(answers: Answers): Option[] {
  const subjects = (answers.subjects as string[] | undefined) ?? []
  const named = subjects.filter((s) => s !== 'Other')
  return [...named.map((s) => ({ id: s, label: s })), { id: 'unsure', label: 'Not sure' }]
}

/* The coach option names the exam level: A-level for current students, the
   neutral "academic" for those still finishing GCSEs. */
export function getSupportNeededOptions(answers: Answers): Option[] {
  const year = answers.year as string | undefined
  if (year !== 'pre') return SUPPORT_NEEDED_BASE
  return SUPPORT_NEEDED_BASE.map((o) =>
    o.id === 'coach' ? { ...o, label: 'A personal academic coach, all year round' } : o
  )
}

/* CRM labels for diag_support_needed, short and neutral */
const SUPPORT_NEEDED_CRM: Record<string, string> = {
  oneToOne: 'One-to-one subject tutoring',
  method: 'Better revision method',
  examTechnique: 'Exam technique',
  plan: 'Custom revision plan',
  coach: 'Personal coach, year round',
  freeStuff: 'Free resources first',
  unsure: 'Not sure',
}

export function supportNeededLabel(answers: Answers): string {
  return ((answers.supportNeeded as string[] | undefined) ?? [])
    .map((id) => SUPPORT_NEEDED_CRM[id] ?? id)
    .join(', ')
}

/* The follow-up detail behind the support answer, one line for the CRM */
export function supportDetailString(answers: Answers): string {
  const v = answers.supportDetail
  if (Array.isArray(v)) return v.join(', ')
  return typeof v === 'string' ? v.trim() : ''
}

/* ── Per-subject grades ──────────────────────────────────────────────────
   'grades' answers are stored as "Subject|gradeId" pairs so the Answers type
   stays a flat map of strings and arrays (and old saves stay readable). */

export function gradePairs(answers: Answers, id: string): Record<string, string> {
  const raw = (answers[id] as string[] | undefined) ?? []
  const map: Record<string, string> = {}
  for (const pair of raw) {
    const i = pair.lastIndexOf('|')
    if (i > 0) map[pair.slice(0, i)] = pair.slice(i + 1)
  }
  return map
}

/* The subjects that get a grade row ("Other" can't be named, so can't be rated) */
export function gradeRows(answers: Answers): string[] {
  return ((answers.subjects as string[] | undefined) ?? []).filter((s) => s !== 'Other')
}

export function gradesComplete(answers: Answers, id: string): boolean {
  const map = gradePairs(answers, id)
  return gradeRows(answers).every((s) => map[s] !== undefined)
}

/* "Maths B, Chemistry C": one grade per subject */
export function gradesSummary(answers: Answers, id: string): string {
  const map = gradePairs(answers, id)
  return gradeRows(answers)
    .map((s) => (map[s] ? `${s} ${gradeLabel(map[s])}` : ''))
    .filter(Boolean)
    .join(', ')
}

/* "Maths B to A, Chemistry C to B": the whole journey in one CRM line */
export function gradesToString(answers: Answers): string {
  const current = gradePairs(answers, 'currentGrades')
  const target = gradePairs(answers, 'targetGrades')
  return gradeRows(answers)
    .map((s) => {
      const now = gradeLabel(current[s])
      const want = gradeLabel(target[s])
      if (now && want) return `${s} ${now} to ${want}`
      if (now || want) return `${s} ${now || want}`
      return ''
    })
    .filter(Boolean)
    .join(', ')
}

/* The worry subject's single grade: diag_current_grade and diag_target_grade
   keep this shape because the follow-up emails embed them mid-sentence
   ("you're currently working at {$diag_current_grade}"). Empty when they were
   not sure which subject worries them, so the emails' defaults fire. */
export function worryGradeLabel(answers: Answers, id: string): string {
  const worry = answers.worry as string | undefined
  if (!worry || worry === 'unsure') return ''
  return gradeLabel(gradePairs(answers, id)[worry])
}

/* One completeness rule shared by the quiz and the app shell */
export function isAnswered(q: Question, answers: Answers): boolean {
  if (q.type === 'grades') return gradesComplete(answers, q.id)
  const v = answers[q.id]
  if (v === undefined) return false
  if (q.type === 'multi') return Array.isArray(v) && v.length > 0
  return true
}

/* ── Scoring ───────────────────────────────────────────────────────────── */

export interface Scores {
  method: number
  retention: number
  examCraft: number
  prioritisation: number
  consistency: number
}

export function computeScores(answers: Answers): { scores: Scores; flags: Set<string> } {
  const points: Record<Dim, number> = { method: 0, retention: 0, examCraft: 0, prioritisation: 0, consistency: 0 }
  const max: Record<Dim, number> = { method: 0, retention: 0, examCraft: 0, prioritisation: 0, consistency: 0 }
  const flags = new Set<string>()

  for (const q of QUESTIONS) {
    if (!q.weights) continue
    const picked = answers[q.id]
    if (typeof picked !== 'string') continue
    const opt = q.options.find((o) => o.id === picked)
    if (!opt) continue
    opt.flags?.forEach((f) => flags.add(f))
    for (const dim of DIMS) {
      const w = q.weights[dim]
      if (!w) continue
      max[dim] += w
      points[dim] += w * (opt.scores?.[dim] ?? 0)
    }
  }

  const scores = {} as Scores
  for (const dim of DIMS) {
    scores[dim] = max[dim] > 0 ? Math.round((points[dim] / max[dim]) * 100) : 50
  }
  return { scores, flags }
}

export function verdictFor(score: number): { label: string; tone: 'strong' | 'steady' | 'leaking' | 'critical' } {
  if (score >= 75) return { label: 'Strong', tone: 'strong' }
  if (score >= 55) return { label: 'Steady', tone: 'steady' }
  if (score >= 35) return { label: 'Leaking', tone: 'leaking' }
  return { label: 'Critical', tone: 'critical' }
}

/* One-line reading of each dimension at each level, in Waleed's voice. */
export function dimNote(dim: Dim, score: number, taker: Taker = 'student'): string {
  const level = score >= 75 ? 3 : score >= 55 ? 2 : score >= 35 ? 1 : 0
  const notes: Record<Dim, string[]> = {
    method: [
      'Almost all reading and watching, almost no self-testing. This is where most of the marks are being lost.',
      "More recognising than remembering. It feels learned, but it doesn't score.",
      'Some real self-testing in there. Make it the default, not the extra.',
      'Retrieval first. This is what the top 1% do.',
    ],
    retention: [
      'Topics are fading before you ever see them twice.',
      "You're re-learning old topics more than you're keeping them.",
      'Good instincts on coming back to topics. Scheduling the returns would lock it in.',
      'You come back to topics before they fade. Keep that system.',
    ],
    examCraft: [
      "The knowledge isn't turning into marks yet.",
      'Papers and mark schemes are still strangers to you.',
      'Good habits forming. Add timing and examiner wording.',
      'You train the exam as its own skill. Rare and valuable.',
    ],
    prioritisation: [
      "Your hours are going where it's comfortable, not where the marks are.",
      'You revise by routine, not by where you lose marks.',
      'You know roughly where the gaps are. Make it a written list.',
      "Weakest topics first. That's exactly right.",
    ],
    consistency: [
      'Revision is running on guilt and deadlines right now.',
      'Effort arrives in bursts. The forgetting curve loves bursts.',
      "There's a steady rhythm there. A proper plan would make it count for more.",
      'A real system, run consistently. Protect it.',
    ],
  }
  const parentNotes: Record<Dim, string[]> = {
    method: [
      'Almost all reading and watching, almost no self-testing. This is where most of the marks are being lost.',
      "More recognising than remembering. It feels learned to them, but it doesn't score.",
      'Some real self-testing in there. It needs to become the default, not the extra.',
      'Retrieval first. This is what the top 1% do.',
    ],
    retention: [
      'Topics are fading before they ever see them twice.',
      "They're re-learning old topics more than they're keeping them.",
      'Good instincts on coming back to topics. Scheduling the returns would lock it in.',
      'They come back to topics before they fade. Protect that system.',
    ],
    examCraft: [
      "The knowledge isn't turning into marks yet.",
      'Papers and mark schemes are still strangers to them.',
      'Good habits forming. Timing and examiner wording come next.',
      'They train the exam as its own skill. Rare and valuable.',
    ],
    prioritisation: [
      "Their hours are going where it's comfortable, not where the marks are.",
      'They revise by routine, not by where the marks are being lost.',
      'They know roughly where the gaps are. It needs to become a written list.',
      "Weakest topics first. That's exactly right.",
    ],
    consistency: [
      'Revision is running on guilt and deadlines right now.',
      'Effort arrives in bursts. The forgetting curve loves bursts.',
      "There's a steady rhythm there. A proper plan would make it count for more.",
      'A real system, run consistently. Protect it.',
    ],
  }
  return (taker === 'parent' ? parentNotes : notes)[dim][level]
}

/* ── Archetypes ────────────────────────────────────────────────────────── */

export interface Archetype {
  id: string
  name: string
  strapline: string
  diagnosis: string[]
  /* The same finding, written to the parent about their child */
  diagnosisParent: string[]
  clinicalNote: string
}

const ARCHETYPES: Record<string, Archetype> = {
  grinder: {
    id: 'grinder',
    name: 'The Grinder',
    strapline: 'Hours in. Marks missing.',
    diagnosis: [
      "You're not lazy. You might be one of the hardest workers in your year. The problem is where the hours go: reading, highlighting, going over notes. That work feels productive because the content starts to look familiar.",
      "But exams don't test whether you recognise something. They test whether you can produce it, from memory, against the clock. Recognising is easy. Producing is what scores, and almost none of your week is training it.",
      "This was me at 17. I got into medicine on brute force hours, and I'd never let a student of mine pay that price for the same grades.",
    ],
    diagnosisParent: [
      "Your child isn't lazy. From your answers, they might be one of the hardest workers in their year. The problem is where the hours go: reading, highlighting, going over notes. From the doorway it looks like proper revision, and it feels productive to them, because the content starts to look familiar.",
      "But exams don't test whether you recognise something. They test whether you can produce it, from memory, against the clock. Recognising is easy. Producing is what scores, and almost none of their week is training it. That's why the effort you're watching isn't showing up in the grades.",
      "This was me at 17. I got into medicine on brute force hours, and nobody should have to pay that price for the same grades. The fix here is a method change, not a character change. That matters: your child doesn't need telling to work harder.",
    ],
    clinicalNote: 'Presenting complaint: high effort, flat grades. Finding: passive method masking as productivity.',
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'The Perfectionist',
    strapline: 'Beautiful notes. Borrowed time.',
    diagnosis: [
      "Your notes could probably be sold. That's the problem. Somewhere along the way, revision turned into production: making the resource instead of using it. Neat pages feel like progress because you can see them stacking up.",
      'But the exam never asks to see your notes. It asks what you can produce with the book closed, in the wording the mark scheme rewards. Every hour spent making a page beautiful is an hour not spent testing yourself on it.',
      'I spent hours making the perfect set of notes and the perfect timetable. Such a waste of time. The students who beat me were testing themselves on ugly scraps of paper.',
    ],
    diagnosisParent: [
      "Your child works, and the evidence is probably beautiful: colour coded notes, neat folders, pages that look like they could be sold. That's the problem. Somewhere along the way, revision turned into production: making the resource instead of using it. Finished pages feel like progress because you can both see them stacking up.",
      'But the exam never asks to see the notes. It asks what they can produce with the book closed, in the wording the mark scheme rewards. Every hour spent making a page beautiful is an hour not spent testing themselves on it. This one is hard to spot from the outside, because it looks so hardworking.',
      'I did exactly this. I spent hours making the perfect set of notes and the perfect timetable, and the students who beat me were testing themselves on ugly scraps of paper. The work ethic is there. It just needs pointing at the right work.',
    ],
    clinicalNote: 'Presenting complaint: heavy workload, beautiful materials. Finding: production substituting for retrieval.',
  },
  crammer: {
    id: 'crammer',
    name: 'The Crammer',
    strapline: 'Brilliant in a panic. Inefficient without one.',
    diagnosis: [
      'Your real revision system is deadline panic. And the frustrating part is that it sort of works: you can load a test into short-term memory overnight, so the habit keeps getting rewarded.',
      "A-levels are where that stops working. Two years of content can't live in short-term memory. What you cram this week is already fading by next week, so by exam season you're paying for the same topics twice, sometimes three times.",
      "You don't need more discipline than everyone else. You need a system that makes the next session obvious, so starting stops being a negotiation.",
    ],
    diagnosisParent: [
      "Their real revision system is deadline panic, and you've probably watched it happen: quiet for a fortnight, then a frantic surge the week before a test. The frustrating part is that it sort of works. They can load a test into short-term memory overnight, so the habit keeps getting rewarded with passable results.",
      "A-levels are where that stops working. Two years of content can't live in short-term memory. What they cram this week is already fading by next week, so by exam season they're paying for the same topics twice, sometimes three times. And the panic gets more draining for everyone as the stakes go up.",
      "Here's the reframe that matters at home: this isn't a discipline problem, so more pressure won't fix it. What fixes it is a system that makes the next session obvious, so starting stops being a negotiation, with you or with themselves.",
    ],
    clinicalNote: 'Presenting complaint: burst effort, unstable results. Finding: massed practice, no spacing, mood-led scheduling.',
  },
  relearner: {
    id: 'relearner',
    name: 'The Re-Learner',
    strapline: 'Learning it again. And again.',
    diagnosis: [
      'Every time you open an old topic, it feels like the first time. So you learn it again, which takes nearly as long as it did the first time, which leaves no time to go back to anything else, which means everything fades. That loop is where your hours are going.',
      "Here's the reframe: it's not a memory problem. It's a scheduling problem. Memory fades on a curve, and you're simply never there when it fades. Come back to a topic the next day, then a few days later, and it stays. Miss both windows and it resets.",
      "That's a retrieval failure, not a knowledge failure. And retrieval failures are fixed with a calendar, not with talent.",
    ],
    diagnosisParent: [
      "Every time your child opens an old topic, it feels like the first time. So they learn it again, which takes nearly as long as it did the first time, which leaves no time to go back to anything else, which means everything fades. That loop is where their hours are going, and it's exhausting to live inside.",
      "Here's the reframe: it's not a memory problem, and it's certainly not an intelligence problem. It's a scheduling problem. Memory fades on a curve, and they're simply never there when it fades. Come back to a topic the next day, then a few days later, and it stays. Miss both windows and it resets.",
      "In clinical terms, that's a retrieval failure, not a knowledge failure. Retrieval failures are fixed with a calendar, not with talent. That's genuinely good news: it's the most mechanical fix on this whole list.",
    ],
    clinicalNote: 'Presenting complaint: topics do not stick. Finding: no spaced returns, forgetting curve running unopposed.',
  },
  scholar: {
    id: 'scholar',
    name: 'The Scholar',
    strapline: 'Knows it. Cannot score it.',
    diagnosis: [
      "You might know more than anyone in your class. Your grades don't show it, because knowing something and scoring with it are two different skills, and school only ever taught you the first one.",
      'Marks live in the specifics: the command word, the examiner phrase, the timing, answering the question that was actually asked. Right now that layer is untrained, so the knowledge stays in your head instead of landing on the page.',
      "This is the most fixable profile there is. The hard part, the knowledge, is already done. What's missing is the performance layer, and that's pure training.",
    ],
    diagnosisParent: [
      'Your child might know more than anyone in their class. Their grades don\'t show it, because knowing something and scoring with it are two different skills, and school only ever taught them the first one. If teachers keep saying "so capable" while the marks say otherwise, this is usually why.',
      'Marks live in the specifics: the command word, the examiner phrase, the timing, answering the question that was actually asked. Right now that layer is untrained, so the knowledge stays in their head instead of landing on the page.',
      "This is the most fixable profile there is. The hard part, the knowledge, is already done. What's missing is the performance layer, and that's pure training. Don't let anyone, including your child, read these grades as a ceiling.",
    ],
    clinicalNote: 'Presenting complaint: understands in class, underscores in exams. Finding: untrained exam craft on solid knowledge.',
  },
  comfort: {
    id: 'comfort',
    name: 'The Comfort Reviser',
    strapline: 'Polishing strengths. Avoiding the marks.',
    diagnosis: [
      "Your revision drifts to the topics you're already good at. It's completely human: those sessions feel smooth, the questions go well, you close the book feeling capable.",
      "But a topic you already score 80 percent on has almost no marks left to give you. The topics you avoid, and be honest, you can name them, are exactly where your next grade is hiding. Avoiding them doesn't make them smaller. It just makes them due in exam season.",
      "That discomfort you feel opening a weak topic? That's where the marks are made.",
    ],
    diagnosisParent: [
      "Your child revises, but the revision drifts to the topics they're already good at. It's completely human: those sessions feel smooth, the questions go well, they close the book feeling capable. From the outside it looks like solid, regular work, which is exactly what makes it hard to spot.",
      "But a topic they already score 80 percent on has almost no marks left to give. The topics they avoid, and they can name them, are exactly where the next grade is hiding. Avoiding them doesn't make them smaller. It just makes them due in exam season.",
      'The discomfort of opening a weak topic is where the marks are made. The most useful thing you can do with this profile is make the weak-topic list visible and celebrated, so facing it feels like progress rather than punishment.',
    ],
    clinicalNote: 'Presenting complaint: solid effort, plateaued grades. Finding: effort routed to strengths, weak topics untouched.',
  },
  optimiser: {
    id: 'optimiser',
    name: 'The Optimiser',
    strapline: 'The system works. Now compound it.',
    diagnosis: [
      "Rare profile. You test yourself, you space your returns, you go back to weak topics on purpose. Most students never get here, so first: credit where it's due.",
      "Your next grade isn't hiding in a broken habit. It's in sharpening: harder self-testing, tighter timing, knowing the mark schemes inside out, and getting ahead of content before it's taught, so lessons become your second pass instead of your first.",
      'At this level the gains are in precision and pace. The right programme now is one that stretches you, not one that fixes you.',
    ],
    diagnosisParent: [
      "Rare profile, and worth saying plainly: your child revises the way top students do. They test themselves, they space their returns, they go back to weak topics on purpose. Most students never get here. Whatever mix of their effort and your support built this, it's working.",
      "Their next grade isn't hiding in a broken habit. It's in sharpening: harder self-testing, tighter timing, knowing the mark schemes inside out, and getting ahead of content before it's taught, so lessons become their second pass instead of their first.",
      'At this level the gains are in precision and pace. The right programme now is one that stretches them, not one that fixes them. And honestly, no programme at all is a respectable choice here too.',
    ],
    clinicalNote: 'Presenting complaint: none acute. Finding: sound system, ready for sharpening and stretch.',
  },
}

export function deriveArchetype(scores: Scores, flags: Set<string>): { archetype: Archetype; bottleneck: Dim } {
  /*
   * Bottleneck = lowest dimension, but near-ties resolve upstream.
   * If method and exam craft are both on the floor, method is the root
   * cause and exam craft is its symptom (the four tiers run in order:
   * knowledge, recall, application, exam mastery). Exam craft is only
   * THE bottleneck when the foundations underneath it hold.
   */
  const lowest = Math.min(...DIMS.map((d) => scores[d]))
  const UPSTREAM_ORDER: Dim[] = ['method', 'retention', 'consistency', 'prioritisation', 'examCraft']
  const window = lowest < 55 ? 8 : 0 // near-ties only matter when something is genuinely weak
  const bottleneck = UPSTREAM_ORDER.find((d) => scores[d] <= lowest + window) ?? 'method'

  const allStrong = DIMS.every((d) => scores[d] >= 70)
  if (allStrong) return { archetype: ARCHETYPES.optimiser, bottleneck }

  let archetype: Archetype
  switch (bottleneck) {
    case 'method':
      archetype = flags.has('maker') ? ARCHETYPES.perfectionist : ARCHETYPES.grinder
      break
    case 'retention':
      archetype = flags.has('cram') ? ARCHETYPES.crammer : ARCHETYPES.relearner
      break
    case 'examCraft':
      archetype = ARCHETYPES.scholar
      break
    case 'prioritisation':
      archetype = ARCHETYPES.comfort
      break
    case 'consistency':
      archetype = ARCHETYPES.crammer
      break
  }
  return { archetype, bottleneck }
}

/* ── Hours leak ────────────────────────────────────────────────────────── */

const HOURS_META: Record<string, { mid: number; phrase: string }> = {
  under5: { mid: 4, phrase: 'under 5' },
  h5to10: { mid: 7.5, phrase: '5 to 10' },
  h10to15: { mid: 12.5, phrase: '10 to 15' },
  over15: { mid: 17, phrase: '15 or more' },
}

export interface HoursLeak {
  weeklyPhrase: string
  weeklyMid: number
  lowYieldHours: number
  highYieldHours: number
  lowYieldShare: number
}

export function computeHoursLeak(answers: Answers): HoursLeak {
  const meta = HOURS_META[(answers.hours as string) ?? 'h5to10'] ?? HOURS_META.h5to10

  const baseByActivity: Record<string, number> = {
    reread: 0.7,
    rewrite: 0.6,
    videos: 0.55,
    flash: 0.3,
    questions: 0.2,
    blurt: 0.2,
  }
  let share = baseByActivity[(answers.defaultActivity as string) ?? 'reread'] ?? 0.5

  const check = answers.check as string
  if (check === 'familiar' || check === 'feel') share += 0.1
  if (check === 'test' || check === 'redo') share -= 0.05

  const papers = answers.papers as string
  if (papers === 'none' || papers === 'saving') share += 0.05
  if (papers === 'timed') share -= 0.05

  const ret = answers.return as string
  if (ret === 'rarely' || ret === 'forced') share += 0.05

  share = Math.min(0.8, Math.max(0.15, share))
  const lowYield = Math.min(meta.mid - 1, Math.max(1, Math.round(meta.mid * share)))

  return {
    weeklyPhrase: meta.phrase,
    weeklyMid: meta.mid,
    lowYieldHours: lowYield,
    highYieldHours: Math.max(1, Math.round(meta.mid - lowYield)),
    lowYieldShare: share,
  }
}

/* ── Prescription (fix this first) ─────────────────────────────────────── */

export interface Prescription {
  headline: string
  why: string
  steps: { title: string; detail: string }[]
  articleSlug: string
  articleTitle: string
  blurtingTemplate: boolean
}

export function buildPrescription(bottleneck: Dim, answers: Answers, isOptimiser = false): Prescription {
  const worry = worrySubjectLabel(answers)
  const subjectPhrase = worry ? worry : 'your weakest subject'

  if (isOptimiser) {
    return {
      headline: 'Compound what already works',
      why: 'Nothing here needs rescuing. The gains come from making what you already do harder.',
      steps: [
        { title: 'Make retrieval harder on purpose', detail: `Blurt whole ${subjectPhrase} topics from a blank page instead of prompted cards, and explain them out loud as if you're teaching them. If you can teach it cold, you own it.` },
        { title: 'Tighten the clock', detail: 'Do timed papers at 90 percent of the official time. Exam day pressure should feel like a relief, not a shock.' },
        { title: 'Get ahead of the teaching', detail: "Look at next term's topics before they're taught, so lessons become your second time seeing them instead of your first. That's the cheapest revision there is." },
      ],
      articleSlug: 'best-way-to-revise-for-a-levels',
      articleTitle: 'What actually works for A-level revision',
      blurtingTemplate: true,
    }
  }

  switch (bottleneck) {
    case 'method':
      return {
        headline: 'Swap consumption for retrieval',
        why: 'Every hour you move from re-reading to self-testing earns more marks, because remembering under pressure is the skill the exam actually measures.',
        steps: [
          { title: 'Blurt before you re-read', detail: `Open a blank page, pick a ${subjectPhrase} topic, and write everything you know from memory. Only then open the notes and fill the gaps in a different colour. The gaps are your revision list.` },
          { title: 'End every session with the book closed', detail: "Final 10 minutes: no notes, write out the core of what you covered. If you can't produce it now, you couldn't produce it in an exam." },
          { title: 'Start an error log', detail: 'One page per subject. Every wrong answer goes on it with the corrected version. Retest the log weekly. Wrong answers are the highest-yield material you own.' },
        ],
        articleSlug: 'blurting-method-a-level-revision',
        articleTitle: 'The Blurting Method: step by step',
        blurtingTemplate: true,
      }
    case 'retention':
      return {
        headline: 'Put returns on the calendar',
        why: 'Memory fades on a predictable curve. Return the day after, then three days later, and topics stop resetting to zero.',
        steps: [
          { title: 'Day one, then day two, then day five', detail: 'After any new topic: active recall the next day (blurt it, closed book), then a short review three days after that. Two returns, under an hour total, and the topic stays.' },
          { title: 'Retire the re-learning loop', detail: `Before re-learning any ${subjectPhrase} topic from scratch, test what's actually still there. You usually know more than it feels like, and testing shows you the real gap.` },
          { title: 'Let a timetable do the remembering', detail: 'Spacing fails when it relies on willpower. Put the return days in a plan so the decision is already made.' },
        ],
        articleSlug: 'best-way-to-revise-for-a-levels',
        articleTitle: 'What actually works for A-level revision',
        blurtingTemplate: true,
      }
    case 'examCraft':
      return {
        headline: 'Train the exam as its own skill',
        why: "Marks are awarded for specific wording, under time pressure. That's a skill you can train, separate from knowing the material.",
        steps: [
          { title: 'One timed paper a week, minimum', detail: `Full exam conditions in ${subjectPhrase}: no notes, real timing, no pausing. The first few scores will sting. That's the point of doing them now and not in May.` },
          { title: 'Mark like an examiner', detail: "Mark your paper against the scheme, then rewrite every lost mark answer in the exact wording the scheme rewards. Say the phrases out loud. It's a language. Learn it like one." },
          { title: 'Decode the command words', detail: "Explain, evaluate, compare, outline: each one wants something different. Before writing, name the command word and what it's asking you to produce." },
        ],
        articleSlug: 'how-to-prepare-for-a-level-exams',
        articleTitle: 'How to prepare for A-level exams',
        blurtingTemplate: false,
      }
    case 'prioritisation':
      return {
        headline: 'Send the hours where the marks are missing',
        why: 'A topic you already score well on has few marks left to give. Your next grade lives in the topics you avoid.',
        steps: [
          { title: 'Write the avoid list', detail: `Tonight, 10 minutes: list every ${subjectPhrase} topic you'd dread seeing in an exam tomorrow. That list is your syllabus now. Everything else is maintenance.` },
          { title: 'Worst topic first, every session', detail: 'Open with 25 minutes on the topic you least want to touch, while your energy is highest. After that, the rest of the session feels easy.' },
          { title: 'Re-rate weekly', detail: 'Score each topic out of 5 for confidence every Sunday. Watch the avoided ones climb. Seeing them move is what keeps the habit going.' },
        ],
        articleSlug: 'how-to-improve-predicted-grades',
        articleTitle: 'How to improve your predicted grades',
        blurtingTemplate: false,
      }
    case 'consistency':
      return {
        headline: 'Build a system that survives your moods',
        why: 'Cramming loads short-term memory, and A-levels are a long-term memory exam. Steady beats intense, every time.',
        steps: [
          { title: 'Shrink the sessions', detail: 'Forget the 6 hour Sunday. Aim for 45 focused minutes most days. Small and daily beats big and rare, because spacing is doing half the work for you.' },
          { title: 'Make starting mindless', detail: 'Decide the night before exactly what topic and what task the next session is. The phone goes in another room before you sit down, not after.' },
          { title: 'Plan the week once', detail: 'Ten minutes on Sunday to place your sessions around your fixed commitments. When the plan exists, guilt stops being your scheduler.' },
        ],
        articleSlug: 'how-to-make-a-revision-timetable',
        articleTitle: 'How to build a timetable that actually works',
        blurtingTemplate: false,
      }
  }
}

/* ── Seven day plan ────────────────────────────────────────────────────── */

export interface PlanDay {
  day: string
  task: string
  detail: string
}

export function buildSevenDayPlan(bottleneck: Dim, answers: Answers): PlanDay[] {
  const worry = worrySubjectLabel(answers)
  const subj = worry ?? 'your weakest subject'

  const audit: PlanDay = {
    day: 'Day 1',
    task: 'Run the topic audit',
    detail: `List every ${subj} topic and rate each out of 5: how well could you answer questions on it, book closed? Anything at 3 or below goes on the priority list.`,
  }
  const blurt: PlanDay = {
    day: 'Day 2',
    task: 'First blurting session',
    detail: 'Take your worst-rated topic. Blank page, book closed, write everything you know. Fill the gaps in another colour. Keep the page.',
  }
  const recall: PlanDay = {
    day: 'Day 3',
    task: 'Return and retrieve',
    detail: 'Re-blurt the same topic from memory before anything new. Compare with the first page. The gap between them is your progress, in ink.',
  }
  const paper: PlanDay = {
    day: 'Day 5',
    task: 'One timed exam section',
    detail: `A past paper section in ${subj}, real timing, no notes. Mark it against the scheme and log every lost mark.`,
  }
  const plan: PlanDay = {
    day: 'Day 6',
    task: 'Build next week properly',
    detail: 'Use the free Revision Tracker to build the week for you: deep sessions, next-day recall and reviews, placed around your real commitments.',
  }
  const rest: PlanDay = {
    day: 'Day 7',
    task: 'Review the week, then rest',
    detail: 'Re-rate your audited topics, look at what moved, and take the evening off. Rest is part of the system, not a reward.',
  }

  if (bottleneck === 'examCraft') {
    return [
      audit,
      { day: 'Day 2', task: 'Mark scheme study session', detail: `One hour inside ${subj} mark schemes. Collect the exact phrases that earn marks in your weak topics. Write them out by hand.` },
      { day: 'Day 3', task: 'First timed section', detail: 'One exam section under real timing. Mark it like an examiner. Rewrite every lost-mark answer in scheme wording.' },
      { day: 'Day 5', task: 'Second timed section', detail: 'Same format, new questions. Pace and wording are trainable skills, and this is the training.' },
      plan,
      rest,
    ]
  }
  return [audit, blurt, recall, paper, plan, rest]
}

/* ── Programme routing ─────────────────────────────────────────────────── */

export type RouteId = 'summer' | 'subject' | 'system'

export interface Route {
  id: RouteId
  eyebrow: string
  name: string
  strap: string
  why: string
  points: string[]
  href: string
  cta: string
  meta: string
}

export interface Routing {
  primary: Route
  secondaryLine: string
}

const GRADE_ORDER: Record<string, number> = { astar: 5, a: 4, b: 3, c: 2, d: 1 }

function worrySubjectLabel(answers: Answers): string | null {
  const worry = answers.worry as string | undefined
  if (!worry || worry === 'unsure') return null
  return worry
}

/* The routing's grade gap: the worry subject's current-to-target jump, or the
   biggest jump across subjects when they weren't sure which one worries them. */
function gradeGapFrom(answers: Answers): number | null {
  const current = gradePairs(answers, 'currentGrades')
  const target = gradePairs(answers, 'targetGrades')
  const gapFor = (s: string): number | null => {
    const c = GRADE_ORDER[current[s] ?? ''] ?? null
    const t = GRADE_ORDER[target[s] ?? ''] ?? null
    return c !== null && t !== null ? t - c : null
  }
  const worry = worrySubjectLabel(answers)
  if (worry) return gapFor(worry)
  const gaps = gradeRows(answers)
    .map(gapFor)
    .filter((g): g is number => g !== null)
  return gaps.length ? Math.max(...gaps) : null
}

export function buildRouting(answers: Answers, scores: Scores, bottleneck: Dim, archetypeId: string, taker: Taker = 'student'): Routing {
  const year = (answers.year as string) ?? 'y12'
  const subjects = ((answers.subjects as string[]) ?? []).filter(Boolean)
  const worry = worrySubjectLabel(answers)
  const stemSubjects = subjects.filter((s) => SUMMER_SUBJECTS.includes(s))
  const worryIsStem = worry !== null && SUMMER_SUBJECTS.includes(worry)
  const worryIsAccel = worry !== null && SUBJECT_ACCEL_SUBJECTS.includes(worry)
  const accelSubjects = subjects.filter((s) => SUBJECT_ACCEL_SUBJECTS.includes(s))
  const p = taker === 'parent'

  const gradeGap = gradeGapFrom(answers)

  const systemSide = bottleneck === 'method' || bottleneck === 'consistency' || bottleneck === 'retention' || bottleneck === 'prioritisation'

  const summerFocus = worryIsStem ? worry! : stemSubjects.slice(0, 2).join(' and ')

  const summer = (why: string): Route => ({
    id: 'summer',
    eyebrow: p ? 'The recommended route' : 'Your recommended route',
    name: 'Summer Accelerator',
    strap: p ? 'Six weeks, live. They walk into Year 13 already ahead.' : 'Six weeks, live. Walk into Year 13 already ahead.',
    why,
    points: [
      summerFocus ? `Live sessions in ${summerFocus}, taught to the mark scheme` : 'Live sessions taught to the mark scheme',
      'Covers the high-yield Year 13 topics that decide predicted grades',
      'Every session recorded. First session risk-free',
    ],
    href: '/summer-accelerators/',
    cta: 'Explore the Summer Accelerator',
    meta: summerOnSale() ? 'Cohort starts Saturday 22nd August · from £9/hr' : 'Six weeks live · from £9/hr',
  })

  const subjectAccel = (why: string): Route => ({
    id: 'subject',
    eyebrow: p ? 'The recommended route' : 'Your recommended route',
    name: `${worryIsAccel ? worry + ' ' : ''}Subject Accelerator`,
    strap: p
      ? 'Twelve weeks of live, exam-focused teaching in their problem subject.'
      : 'Twelve weeks of live, exam-focused teaching in your problem subject.',
    why,
    points: [
      'Small groups, specialist tutors, real exam questions every session',
      'Built around mark scheme mastery, not content coverage',
      'Weekend sessions that never clash with school',
    ],
    href: '/subject-accelerators/',
    cta: 'Explore the Subject Accelerators',
    meta: 'Biology, Chemistry and Maths · next cohort starts 13th September',
  })

  const system = (why: string): Route => ({
    id: 'system',
    eyebrow: p ? 'The recommended route' : 'Your recommended route',
    name: 'Top 1% Study System',
    strap: p ? 'Fix how they study, and every subject moves at once.' : 'Fix how you study, and every subject moves at once.',
    why,
    points: [
      'Active recall, spaced repetition and exam technique, installed as habits',
      'Time management that survives real school weeks',
      'The exact system behind everything we teach',
    ],
    href: '/study-systems/',
    cta: 'Explore the Study System',
    meta: p ? 'Works alongside any subject they take' : 'Works alongside any subject you take',
  })

  const callLine = p
    ? "Not sure which fits, or whether anything does yet? Book a free 30 minute call with Dr Waleed and talk it through, parent to doctor. He'll tell you honestly, even if the answer is none of them."
    : "Not sure which fits? Book a free 30 minute call with Dr Waleed and he'll help you decide, even if the honest answer is none of them yet."

  /* Starting A-levels soon: content programmes do not fit yet, the method does. */
  if (year === 'pre') {
    return {
      primary: system(
        p
          ? "Your child is about to start the two most content-heavy years of their education. Most students spend Year 12 discovering their GCSE method doesn't survive A-levels. Getting the right system in before the content piles up is the cheapest moment to do it, and the calmest."
          : "You're about to start the two most content-heavy years of your education. Most students spend Year 12 discovering their GCSE method doesn't survive A-levels. You've got the chance to get the right system in before the content piles up, which is the cheapest moment to do it."
      ),
      secondaryLine: callLine,
    }
  }

  /* Year 12: the summer window is the biggest available move if they take a
     summer subject, but only while that cohort is still ahead of them. Once it
     has started, the honest next step is the September programmes. */
  if (year === 'y12') {
    if (stemSubjects.length > 0 && summerOnSale()) {
      const whyParts: string[] = []
      if (worryIsStem) {
        whyParts.push(
          p
            ? `${worry} is the subject worrying you most for them, and it's one of the four the Summer Accelerator covers live.`
            : `${worry} is the subject worrying you most, and it's one of the four the Summer Accelerator covers live.`
        )
      } else {
        whyParts.push(
          p
            ? `They take ${stemSubjects.join(' and ')}, and the summer before Year 13 is the one window where a student can get ahead of the content instead of chasing it.`
            : `You take ${stemSubjects.join(' and ')}, and the summer before Year 13 is the one window where you can get ahead of the content instead of chasing it.`
        )
      }
      if (gradeGap !== null && gradeGap >= 2) {
        whyParts.push(
          p
            ? "The gap between their current grade and the grade they need is real, and it won't close during term time alone. Six structured weeks now does the heavy lifting."
            : "The gap between your current grade and your target is real, and it won't close during term time alone. Six structured weeks now does the heavy lifting."
        )
      } else if (systemSide) {
        whyParts.push(
          p
            ? 'The diagnostic shows the deeper issue is how they revise, and the Accelerator trains that inside the content: every session runs on retrieval, mark schemes and structured returns, so they learn the method by using it.'
            : 'Your diagnostic shows the deeper issue is how you revise, and the Accelerator trains that inside the content: every session runs on retrieval, mark schemes and structured returns, so you learn the method by using it.'
        )
      } else {
        whyParts.push(
          p
            ? 'Their exam craft gap is exactly what the live sessions train: real questions, mark scheme wording, and feedback on their answers while there is still time to act on it.'
            : 'Your exam craft gap is exactly what the live sessions train: real questions, mark scheme wording, and feedback on your answers while there is still time to act on it.'
        )
      }
      return {
        primary: summer(whyParts.join(' ')),
        secondaryLine:
          bottleneck === 'consistency' || bottleneck === 'method'
            ? (p
                ? 'Pair it with the Top 1% Study System if you want the method installed across every subject they take, beyond the live sessions. '
                : 'Pair it with the Top 1% Study System if you want the method installed across every subject you take, beyond the live sessions. ') + callLine
            : callLine,
      }
    }
    /* Year 12 with a Subject Accelerator subject, summer gone: September is the
       next live teaching they can join, and it starts the term that decides
       their predicted grades. */
    if (accelSubjects.length > 0 && !systemSide) {
      const focus = worryIsAccel ? worry! : accelSubjects[0]
      return {
        primary: subjectAccel(
          p
            ? `${focus} is where the marks are leaking, and Year 13 starts the term that sets their predicted grades. The September cohort runs alongside school, working through real questions with a specialist every week, so the fix lands while it still counts.`
            : `${focus} is where your marks are leaking, and Year 13 starts the term that sets your predicted grades. The September cohort runs alongside school, working through real questions with a specialist every week, so the fix lands while it still counts.`
        ),
        secondaryLine: 'If the underlying habits need work too, the Top 1% Study System runs alongside it. ' + callLine,
      }
    }
    return {
      primary: system(
        p
          ? 'The diagnostic points at how they study rather than at one subject, and that transfers to every subject they take. Going into Year 13 with the method already fixed is the difference between a calm year and a frantic one.'
          : 'Your diagnostic points at how you study rather than at one subject, and that transfers to every subject you take. Going into Year 13 with the method already fixed is the difference between a calm year and a frantic one.'
      ),
      secondaryLine: accelSubjects.length > 0
        ? `And if ${accelSubjects[0]} stays stubborn once the system is in, the Subject Accelerators start in September. ` + callLine
        : callLine,
    }
  }

  /* Year 13 and resits: September programmes and the system. */
  if (worryIsAccel && bottleneck === 'examCraft') {
    return {
      primary: subjectAccel(
        p
          ? `${worry} is where their marks are leaking, and the diagnostic shows the gap is in turning knowledge into exam marks. That's exactly what the twelve weeks train: past paper questions, mark scheme wording, and feedback on their answers, every single session.`
          : `${worry} is where your marks are leaking, and your diagnostic shows the gap is in turning knowledge into exam marks. That's exactly what the twelve weeks train: past paper questions, mark scheme wording, and feedback on your answers, every single session.`
      ),
      secondaryLine: 'If the deeper habits need work too, the Top 1% Study System runs alongside it. ' + callLine,
    }
  }
  if (systemSide) {
    return {
      primary: system(
        year === 'resit'
          ? p
            ? 'They already know the content from their first attempt. What the diagnostic shows is that the method is what needs to change this time, because repeating the same revision system produces the same grade.'
            : 'You already know the content from your first attempt. What your diagnostic shows is that the method is what needs to change this time, because repeating the same revision system produces the same grade.'
          : p
            ? 'The diagnostic points at how they study, not at one subject. Fixing the system moves every grade at once, and in Year 13 the compounding starts immediately.'
            : 'Your diagnostic points at how you study, not at one subject. Fixing the system moves every grade at once, and in Year 13 the compounding starts immediately.'
      ),
      secondaryLine: accelSubjects.length > 0
        ? `And if ${accelSubjects[0]} stays stubborn once the system is in, the Subject Accelerators start in September. ` + callLine
        : callLine,
    }
  }
  if (accelSubjects.length > 0) {
    const focus = worryIsAccel ? worry! : accelSubjects[0]
    const gapLine = gradeGap !== null && gradeGap >= 2
      ? p
        ? ` With the grade jump they're chasing in ${focus}, specialist sessions every week is the honest route.`
        : ` With the grade jump you're chasing in ${focus}, specialist sessions every week is the honest route.`
      : ''
    return {
      primary: subjectAccel(
        p
          ? `Their fundamentals are solid, so the biggest available gain is subject-specific: live, exam-focused teaching in ${focus}, working through real questions with a specialist until the mark scheme wording is second nature.${gapLine}`
          : `Your fundamentals are solid, so the biggest available gain is subject-specific: live, exam-focused teaching in ${focus}, working through real questions with a specialist until the mark scheme wording is second nature.${gapLine}`
      ),
      secondaryLine: callLine,
    }
  }
  return {
    primary: system(
      p
        ? 'Their subjects sit outside our live subject programmes, but the system layer transfers to all of them: retrieval, spacing, exam technique and a week that plans itself.'
        : 'Your subjects sit outside our live subject programmes, but the system layer transfers to all of them: retrieval, spacing, exam technique and a week that plans itself.'
    ),
    secondaryLine: callLine,
  }
}

/* ── Full diagnosis ────────────────────────────────────────────────────── */

export interface Diagnosis {
  scores: Scores
  overall: number
  archetype: Archetype
  bottleneck: Dim
  bottleneckLabel: string
  hoursLeak: HoursLeak
  prescription: Prescription
  plan: PlanDay[]
  routing: Routing
}

export function diagnose(answers: Answers, taker: Taker = 'student'): Diagnosis {
  const { scores, flags } = computeScores(answers)
  const { archetype, bottleneck } = deriveArchetype(scores, flags)
  const overall = Math.round(DIMS.reduce((sum, d) => sum + scores[d], 0) / DIMS.length)
  return {
    scores,
    overall,
    archetype,
    bottleneck,
    bottleneckLabel: DIM_META[bottleneck].label,
    hoursLeak: computeHoursLeak(answers),
    prescription: buildPrescription(bottleneck, answers, archetype.id === 'optimiser'),
    plan: buildSevenDayPlan(bottleneck, answers),
    routing: buildRouting(answers, scores, bottleneck, archetype.id, taker),
  }
}

/* Score string for the CRM, human-scannable in MailerLite. Full labels, not
   letter codes, so students reading their report email know what each number is. */
export function scoresToString(scores: Scores): string {
  return `Method ${scores.method}, Retention ${scores.retention}, Exam Craft ${scores.examCraft}, Targeting ${scores.prioritisation}, Consistency ${scores.consistency}`
}

export function gradeLabel(id: string | undefined): string {
  const map: Record<string, string> = { astar: 'A*', a: 'A', b: 'B', c: 'C', d: 'D or below', unsure: 'Not sure' }
  return id ? map[id] ?? id : ''
}

export function yearLabel(id: string | undefined): string {
  const map: Record<string, string> = { y12: 'Year 12', y13: 'Year 13', pre: 'Pre A-level', resit: 'Resitting' }
  return id ? map[id] ?? id : ''
}

/* Human-readable support status for the CRM (diag_support) */
export function supportLabel(id: string | undefined): string {
  const map: Record<string, string> = {
    none: 'No outside help',
    tutor: 'Has a private tutor',
    online: 'On an online course or programme',
    past: 'Had a tutor, stopped',
    school: 'Extra school sessions only',
  }
  return id ? map[id] ?? id : ''
}

/* Landing FAQs, shared by the page and its FAQPage structured data. */
export const LANDING_FAQS = [
  {
    q: 'Why should I take it?',
    a: "Because I've seen where the marks actually go. I'm Dr Waleed, I got into medicine, and I've worked with over 1,000 A-level students. Marks leak in patterns, and the same seven profiles come up again and again. Take the diagnostic and I'll show you which one you are, where your marks are leaking, and exactly how to fix it.",
  },
  {
    q: 'Is it actually free?',
    a: 'Yes. The diagnostic, the report and the 7 day plan are free. You enter your details once, your report opens, and you also get my weekly revision email. Unsubscribe any time and the report stays yours.',
  },
  {
    q: 'How long does it take?',
    a: 'About 4 minutes. 20 quick questions, almost all one tap. Your answers save as you go, so you can leave and pick up where you stopped.',
  },
  {
    q: 'Who is it for?',
    a: "A-level students: Year 12, Year 13, resitters, and anyone starting sixth form in September. And parents: there's a version written just for you, asking about your child. You choose which at the start.",
  },
  {
    q: 'Can I take it for my son or daughter?',
    a: 'Yes, and you get your own version: choose "I\'m a parent" at the start and every question asks about your child, from your side of the kitchen table. Best done with them next to you, but answering from what you see works too. The report comes back written for you, with the same honest diagnosis.',
  },
  {
    q: 'Will you tell me my revision is fine?',
    a: 'If it is, yes. One of the seven profiles is The Optimiser, and if you land there the report says so and shows you how to sharpen rather than fix. Honesty is the whole point of a diagnostic.',
  },
  {
    q: 'How does it work out where my marks are leaking?',
    a: "The 20 questions score the five systems behind every top grade: how you plan, how you learn, how you check what stuck, how you practise for exams, and how you manage the workload. Your scores get matched against the patterns I've seen across more than 1,000 students, and the report names your profile, your weakest system, and an estimate of the hours you're spending on revision that isn't earning marks.",
  },
  {
    q: 'What should I do once I have my report?',
    a: "Start the 7 day plan the same evening: it tells you exactly what to change first, and the first change is always the biggest leak. Then use the free Revision Tracker to build the new method into your week. The report also routes you to the right next step for your profile, and if that's one of my courses, it says so and explains why. If it isn't, it says that too.",
  },
]
