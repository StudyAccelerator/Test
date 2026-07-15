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

export const DIMS: Dim[] = ['method', 'retention', 'examCraft', 'prioritisation', 'consistency']

export const DIM_META: Record<Dim, { label: string; short: string; question: string }> = {
  method: {
    label: 'Method',
    short: 'M',
    question: 'Is your revision retrieval, or recognition?',
  },
  retention: {
    label: 'Retention',
    short: 'R',
    question: 'Does what you learn stay learned?',
  },
  examCraft: {
    label: 'Exam Craft',
    short: 'E',
    question: 'Can you turn knowledge into marks under exam conditions?',
  },
  prioritisation: {
    label: 'Targeting',
    short: 'T',
    question: 'Do your hours go where the marks are missing?',
  },
  consistency: {
    label: 'Consistency',
    short: 'C',
    question: 'Does your revision run on a system, or on mood?',
  },
}

/* ── Questions ─────────────────────────────────────────────────────────── */

export interface Option {
  id: string
  label: string
  detail?: string
  scores?: Partial<Record<Dim, number>> // 0 to 1: how healthy this behaviour is
  flags?: string[]
}

export interface Question {
  id: string
  section: number
  title: string
  help?: string
  type: 'single' | 'multi' | 'worry'
  layout: 'cards' | 'chips'
  weights?: Partial<Record<Dim, number>>
  options: Option[]
}

export const SECTIONS = [
  'About you',
  'Your week',
  'How you revise',
  'Memory and targeting',
  'Exam performance',
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

const SUMMER_SUBJECTS = ['Biology', 'Chemistry', 'Maths', 'Physics']
const SUBJECT_ACCEL_SUBJECTS = ['Biology', 'Chemistry', 'Maths']

export const QUESTIONS: Question[] = [
  /* ── Section 1: About you ── */
  {
    id: 'year',
    section: 0,
    title: 'Where are you in your A-levels?',
    type: 'single',
    layout: 'cards',
    options: [
      { id: 'y12', label: 'Year 12', detail: 'First year, or about to start Year 13' },
      { id: 'y13', label: 'Year 13', detail: 'Final year, exams at the end of it' },
      { id: 'pre', label: 'Starting A-levels soon', detail: 'In Year 11, or just finished GCSEs' },
      { id: 'resit', label: 'Resitting', detail: 'Retaking one or more A-levels' },
    ],
  },
  {
    id: 'subjects',
    section: 0,
    title: 'Which subjects are you taking?',
    help: 'Pick all of them. This shapes your plan.',
    type: 'multi',
    layout: 'chips',
    options: SUBJECT_CHOICES.map((s) => ({ id: s, label: s })),
  },
  {
    id: 'worry',
    section: 0,
    title: 'Which one worries you most?',
    help: 'Be honest. The one you would least like an exam in tomorrow morning.',
    type: 'worry',
    layout: 'chips',
    options: [], // built at runtime from the subjects answer, plus "Not sure"
  },
  {
    id: 'currentGrade',
    section: 0,
    title: 'What grade are you working at right now?',
    help: 'In the subject that worries you most. Your latest test or mock, not your best day.',
    type: 'single',
    layout: 'chips',
    options: [
      { id: 'astar', label: 'A*' },
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' },
      { id: 'd', label: 'D or below' },
      { id: 'unsure', label: 'Not sure yet' },
    ],
  },
  {
    id: 'targetGrade',
    section: 0,
    title: 'And what grade do you actually want on results day?',
    help: 'The honest one. The grade your offer needs, or the one you would be proud of.',
    type: 'single',
    layout: 'chips',
    options: [
      { id: 'astar', label: 'A*' },
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' },
    ],
  },

  /* ── Section 2: Your week ── */
  {
    id: 'hours',
    section: 1,
    title: 'In a normal week, how many hours of independent study do you really do?',
    help: 'Not the number you tell people. The real one.',
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
    type: 'single',
    layout: 'cards',
    weights: { consistency: 2.5, retention: 1 },
    options: [
      { id: 'plan', label: 'I follow a planned timetable', scores: { consistency: 1, retention: 0.9 } },
      { id: 'most', label: 'Most days, but with no real structure', scores: { consistency: 0.55, retention: 0.6 } },
      { id: 'guilt', label: 'When the guilt gets loud enough', scores: { consistency: 0.25, retention: 0.3 } },
      { id: 'panic', label: 'The week before a test, in a panic', scores: { consistency: 0.1, retention: 0.1 }, flags: ['cram'] },
    ],
  },
  {
    id: 'phone',
    section: 1,
    title: 'Where is your phone while you study?',
    type: 'single',
    layout: 'cards',
    weights: { consistency: 2 },
    options: [
      { id: 'away', label: 'Another room, or switched off', scores: { consistency: 1 } },
      { id: 'desk', label: 'On the desk, face down', scores: { consistency: 0.55 } },
      { id: 'hand', label: 'In my hand every few minutes', scores: { consistency: 0.1 } },
      { id: 'using', label: 'I revise on it, so it is always there', scores: { consistency: 0.35 } },
    ],
  },
  {
    id: 'focus',
    section: 1,
    title: 'How long can you genuinely focus before you drift?',
    type: 'single',
    layout: 'cards',
    weights: { consistency: 2 },
    options: [
      { id: 'f90', label: '90 minutes or more', scores: { consistency: 1 } },
      { id: 'f45', label: 'About 45 minutes', scores: { consistency: 0.75 } },
      { id: 'f20', label: 'Maybe 20 minutes', scores: { consistency: 0.4 } },
      { id: 'f10', label: 'I drift within 10', scores: { consistency: 0.15 } },
    ],
  },

  /* ── Section 3: How you revise ── */
  {
    id: 'defaultActivity',
    section: 2,
    title: 'It is 7pm and you sit down to revise. What do you actually do?',
    help: 'Your default, not your best day.',
    type: 'single',
    layout: 'cards',
    weights: { method: 3, retention: 1.5 },
    options: [
      { id: 'reread', label: 'Read through my notes or the textbook', scores: { method: 0.1, retention: 0.15 } },
      { id: 'rewrite', label: 'Write out notes, mind maps, summaries', scores: { method: 0.3, retention: 0.3 }, flags: ['maker'] },
      { id: 'videos', label: 'Watch videos or get things explained', scores: { method: 0.35, retention: 0.3 } },
      { id: 'flash', label: 'Flashcards or Anki', scores: { method: 0.8, retention: 0.9 } },
      { id: 'questions', label: 'Past paper questions', scores: { method: 0.9, retention: 0.7 } },
      { id: 'blurt', label: 'Blurting: write what I know from memory, then check', scores: { method: 1, retention: 0.9 } },
    ],
  },
  {
    id: 'check',
    section: 2,
    title: 'How do you know when you have learned something?',
    type: 'single',
    layout: 'cards',
    weights: { method: 3, retention: 1 },
    options: [
      { id: 'test', label: 'I test myself with the book closed', scores: { method: 1, retention: 0.8 } },
      { id: 'redo', label: 'I redo questions I got wrong', scores: { method: 0.85, retention: 0.7 } },
      { id: 'familiar', label: 'I reread it until it feels familiar', scores: { method: 0.1, retention: 0.2 }, flags: ['recognition'] },
      { id: 'feel', label: 'I just sort of feel it', scores: { method: 0.05, retention: 0.2 }, flags: ['recognition'] },
      { id: 'quiz', label: 'Someone quizzes me', scores: { method: 0.7, retention: 0.6 } },
    ],
  },
  {
    id: 'notes',
    section: 2,
    title: 'Which is closest to your notes?',
    type: 'single',
    layout: 'cards',
    weights: { method: 1.5 },
    options: [
      { id: 'beautiful', label: 'Colour coded, highlighted, honestly beautiful', scores: { method: 0.15 }, flags: ['maker'] },
      { id: 'functional', label: 'Messy, but they do the job', scores: { method: 0.7 } },
      { id: 'minimal', label: 'Barely any. I test myself instead', scores: { method: 0.95 } },
      { id: 'borrowed', label: "Mostly revision guides or other people's notes", scores: { method: 0.5 } },
    ],
  },
  {
    id: 'wrong',
    section: 2,
    title: 'You get a question wrong. What happens next?',
    type: 'single',
    layout: 'cards',
    weights: { method: 2, examCraft: 1 },
    options: [
      { id: 'log', label: 'It goes in an error log and I retest it later', scores: { method: 1, examCraft: 0.8 } },
      { id: 'scheme', label: 'I read the mark scheme answer and move on', scores: { method: 0.5, examCraft: 0.5 } },
      { id: 'move', label: 'I feel bad about it and move on', scores: { method: 0.15, examCraft: 0.2 } },
      { id: 'unmarked', label: 'I do not really mark my own work', scores: { method: 0.05, examCraft: 0.05 } },
    ],
  },
  {
    id: 'return',
    section: 2,
    title: 'You revised a topic two weeks ago. When do you see it again?',
    type: 'single',
    layout: 'cards',
    weights: { retention: 3 },
    options: [
      { id: 'spaced', label: 'It is scheduled. I come back on set days', scores: { retention: 1 } },
      { id: 'sometimes', label: 'Sometimes, if there is time left over', scores: { retention: 0.45 } },
      { id: 'rarely', label: 'Rarely. There is always new content to cover', scores: { retention: 0.15 } },
      { id: 'forced', label: 'Only when a test forces me to', scores: { retention: 0.25 } },
    ],
  },

  /* ── Section 4: Memory and targeting ── */
  {
    id: 'recall',
    section: 3,
    title: 'A topic from three weeks ago comes up in class. How much is still there?',
    help: 'Be honest. Nobody is watching.',
    type: 'single',
    layout: 'cards',
    weights: { retention: 2.5, method: 0.5 },
    options: [
      { id: 'most', label: 'Most of it. I could explain it', scores: { retention: 0.95, method: 0.8 } },
      { id: 'recognise', label: 'I recognise it, but I could not write an answer', scores: { retention: 0.35, method: 0.3 }, flags: ['recognition'] },
      { id: 'gone', label: 'It is basically gone. I would be starting again', scores: { retention: 0.1, method: 0.3 } },
      { id: 'untested', label: 'No idea. I have never tested it', scores: { retention: 0.3, method: 0.15 } },
    ],
  },
  {
    id: 'choose',
    section: 3,
    title: 'How do you decide what to revise each session?',
    type: 'single',
    layout: 'cards',
    weights: { prioritisation: 3 },
    options: [
      { id: 'weakest', label: 'I keep a list of weak topics and hit those first', scores: { prioritisation: 1 } },
      { id: 'folder', label: 'Whatever is next in the folder or the spec', scores: { prioritisation: 0.35 } },
      { id: 'comfort', label: 'Whatever I feel like. Usually things I am ok at', scores: { prioritisation: 0.1 }, flags: ['comfort'] },
      { id: 'due', label: 'Whatever the next test or homework is', scores: { prioritisation: 0.4 } },
    ],
  },
  {
    id: 'awareness',
    section: 3,
    title: 'Could you name the exact topics costing you the most marks?',
    type: 'single',
    layout: 'cards',
    weights: { prioritisation: 3 },
    options: [
      { id: 'list', label: 'Yes. I could list them right now', scores: { prioritisation: 1 } },
      { id: 'rough', label: 'Roughly. I know the general areas', scores: { prioritisation: 0.55 } },
      { id: 'subject', label: 'I know which subject, not which topics', scores: { prioritisation: 0.25 } },
      { id: 'mood', label: 'Not really. It changes with my mood', scores: { prioritisation: 0.1 } },
    ],
  },

  /* ── Section 5: Exam performance ── */
  {
    id: 'papers',
    section: 4,
    title: 'What is your relationship with past papers?',
    type: 'single',
    layout: 'cards',
    weights: { examCraft: 3 },
    options: [
      { id: 'timed', label: 'I do them timed, then mark against the mark scheme', scores: { examCraft: 1 } },
      { id: 'open', label: 'I do them untimed, with my notes nearby', scores: { examCraft: 0.45 } },
      { id: 'saving', label: 'I am saving them for closer to the exams', scores: { examCraft: 0.15 } },
      { id: 'none', label: 'I have not really started them', scores: { examCraft: 0.05 } },
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
      { id: 'study', label: 'I study the exact wording they reward', scores: { examCraft: 1 } },
      { id: 'glance', label: 'I glance at them to check answers', scores: { examCraft: 0.5 } },
      { id: 'rarely', label: 'I rarely look at them', scores: { examCraft: 0.15 } },
      { id: 'never', label: 'Honestly? Never met one', scores: { examCraft: 0.05 } },
    ],
  },
  {
    id: 'examfail',
    section: 4,
    title: 'In an actual exam, what hurts you most?',
    type: 'single',
    layout: 'cards',
    weights: { examCraft: 1.5, retention: 0.5 },
    options: [
      { id: 'time', label: 'I run out of time', scores: { examCraft: 0.3, retention: 0.7 }, flags: ['time'] },
      { id: 'blank', label: 'I blank on things I knew the night before', scores: { examCraft: 0.4, retention: 0.15 }, flags: ['blank'] },
      { id: 'wording', label: 'I lose marks on wording, even when I know it', scores: { examCraft: 0.25, retention: 0.7 }, flags: ['wording'] },
      { id: 'panic', label: 'Misreads and panic mistakes', scores: { examCraft: 0.35, retention: 0.7 }, flags: ['panic'] },
      { id: 'fine', label: 'Exams are mostly fine. Revision is my problem', scores: { examCraft: 0.8, retention: 0.7 } },
    ],
  },
]

export type Answers = Record<string, string | string[]>

export function getWorryOptions(answers: Answers): Option[] {
  const subjects = (answers.subjects as string[] | undefined) ?? []
  const named = subjects.filter((s) => s !== 'Other')
  return [...named.map((s) => ({ id: s, label: s })), { id: 'unsure', label: 'Not sure' }]
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
export function dimNote(dim: Dim, score: number): string {
  const level = score >= 75 ? 3 : score >= 55 ? 2 : score >= 35 ? 1 : 0
  const notes: Record<Dim, string[]> = {
    method: [
      'Almost all consumption, almost no retrieval. This is the expensive one.',
      'More recognising than retrieving. Feels learned, does not score.',
      'Some real self-testing in there. Make it the default, not the extra.',
      'Retrieval first. This is what the top 1% do.',
    ],
    retention: [
      'Topics are fading before you ever see them twice.',
      'You are re-learning old topics more than you are keeping them.',
      'Decent spacing instincts. Scheduling them would lock it in.',
      'You return to topics before they fade. Keep that system.',
    ],
    examCraft: [
      'Knowledge is not being converted into marks yet.',
      'Papers and mark schemes are still strangers to you.',
      'Good habits forming. Add timing and examiner wording.',
      'You train the exam as its own skill. Rare and valuable.',
    ],
    prioritisation: [
      'Your hours are going where it is comfortable, not where the marks are.',
      'You revise by routine, not by where you lose marks.',
      'You know roughly where the gaps are. Make it a written list.',
      'Weakest topics first. That is exactly right.',
    ],
    consistency: [
      'Revision is running on guilt and deadlines right now.',
      'Effort arrives in bursts. The forgetting curve loves bursts.',
      'A steady rhythm is there. Structure would compound it.',
      'A real system, run consistently. Protect it.',
    ],
  }
  return notes[dim][level]
}

/* ── Archetypes ────────────────────────────────────────────────────────── */

export interface Archetype {
  id: string
  name: string
  strapline: string
  diagnosis: string[]
  clinicalNote: string
}

const ARCHETYPES: Record<string, Archetype> = {
  grinder: {
    id: 'grinder',
    name: 'The Grinder',
    strapline: 'Hours in. Marks missing.',
    diagnosis: [
      'You are not lazy. You might be one of the hardest workers in your year. The problem is where the hours go: reading, highlighting, going over notes. That work feels productive because the content starts to look familiar.',
      'But exams do not test whether you recognise something. They test whether you can produce it, from memory, under time. Recognition is cheap. Retrieval is what scores, and almost none of your week is building it.',
      'This was me at 17. I got into medicine on brute force hours, and I would never let a student of mine pay that price for the same grades.',
    ],
    clinicalNote: 'Presenting complaint: high effort, flat grades. Finding: passive method masking as productivity.',
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'The Perfectionist',
    strapline: 'Beautiful notes. Borrowed time.',
    diagnosis: [
      'Your notes could probably be sold. That is the problem. Somewhere along the way, revision turned into production: making the resource instead of using it. Neat pages feel like progress because you can see them stacking up.',
      'But the exam never asks to see your notes. It asks what you can produce with the book closed, in the wording the mark scheme rewards. Every hour spent perfecting a page is an hour not spent retrieving from it.',
      'I spent hours making the perfect set of notes and the perfect timetable. Such a waste of time. The students who beat me were testing themselves on ugly scraps of paper.',
    ],
    clinicalNote: 'Presenting complaint: heavy workload, beautiful materials. Finding: production substituting for retrieval.',
  },
  crammer: {
    id: 'crammer',
    name: 'The Crammer',
    strapline: 'Brilliant in a panic. Broken without one.',
    diagnosis: [
      'Your real revision system is deadline panic. And the frustrating part is that it sort of works: you can load a test into short-term memory overnight, so the habit keeps getting rewarded.',
      'A-levels are where that stops working. Two years of content cannot live in short-term memory. What you cram this week is measurably fading within days, so by exam season you are paying for the same topics twice, sometimes three times.',
      'You do not need more discipline than everyone else. You need a system that makes the next session obvious, so starting stops being a negotiation.',
    ],
    clinicalNote: 'Presenting complaint: burst effort, unstable results. Finding: massed practice, no spacing, mood-led scheduling.',
  },
  relearner: {
    id: 'relearner',
    name: 'The Re-Learner',
    strapline: 'Learning it again. And again.',
    diagnosis: [
      'Every time you open an old topic, it feels like the first time. So you re-learn it, which takes almost as long as it did originally, which leaves no time to return to anything else, which means everything fades. That loop is where your hours are going.',
      'Here is the reframe: that is not a memory problem. It is a scheduling problem. Memory fades on a curve, and you are simply never there when it fades. Return to a topic the day after, then a few days later, and it stays. Miss both windows and it resets.',
      'That is a retrieval failure, not a knowledge failure. And retrieval failures are fixable with a calendar, not with talent.',
    ],
    clinicalNote: 'Presenting complaint: topics do not stick. Finding: no spaced returns, forgetting curve running unopposed.',
  },
  scholar: {
    id: 'scholar',
    name: 'The Scholar',
    strapline: 'Knows it. Cannot score it.',
    diagnosis: [
      'You might know more than anyone in your class. Your grades do not show it, because knowing something and performing with it are two different skills, and school only ever taught you the first one.',
      'Marks live in specifics: the command word, the examiner phrase, the timing, the discipline of answering the question that was actually asked. Right now that layer is untrained, so the knowledge stays in your head instead of landing on the page.',
      'This is the most fixable profile there is. The hard part, the knowledge, is already done. What is missing is a performance layer, and that is pure training.',
    ],
    clinicalNote: 'Presenting complaint: understands in class, underscores in exams. Finding: untrained exam craft on solid knowledge.',
  },
  comfort: {
    id: 'comfort',
    name: 'The Comfort Reviser',
    strapline: 'Polishing strengths. Avoiding the marks.',
    diagnosis: [
      'Your revision drifts to the topics you are already good at. It is completely human: those sessions feel smooth, the questions go well, you close the book feeling capable.',
      'But a topic you already score 80 percent on has almost no marks left to give you. The topics you avoid, and be honest, you can name them, are exactly where your next grade is hiding. Avoiding them does not make them smaller. It makes them due in August.',
      'That discomfort you feel opening a weak topic? That discomfort is where the marks are made.',
    ],
    clinicalNote: 'Presenting complaint: solid effort, plateaued grades. Finding: effort routed to strengths, weak topics untouched.',
  },
  optimiser: {
    id: 'optimiser',
    name: 'The Optimiser',
    strapline: 'The system works. Now compound it.',
    diagnosis: [
      'Rare profile. You test yourself, you space your returns, you go back to weak topics on purpose. Most students never get here, so first: credit where it is due.',
      'Your next grade is not hiding in a broken habit. It is in sharpening: harder retrieval, tighter timing, mark scheme fluency, and getting ahead of content before it is taught so lessons become your second pass, not your first.',
      'At this level the gains are in precision and pace. The right programme now is the one that stretches you, not the one that fixes you.',
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
      why: 'Nothing here needs rescuing, so the gains come from raising the difficulty of what you already do.',
      steps: [
        { title: 'Make retrieval harder on purpose', detail: `Blurt whole ${subjectPhrase} topics from a blank page instead of prompted cards, and explain them out loud as if teaching. If you can teach it cold, you own it.` },
        { title: 'Tighten the clock', detail: 'Do timed papers at 90 percent of the official time. Exam day pressure should feel like a relief, not a shock.' },
        { title: 'Get ahead of the teaching', detail: 'Preview next term topics so lessons become your second exposure. First passes are expensive. Make school do your reviews.' },
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
        why: 'Every hour you move from re-reading to self-testing scores more, because retrieval is the skill the exam actually measures.',
        steps: [
          { title: 'Blurt before you re-read', detail: `Open a blank page, pick a ${subjectPhrase} topic, and write everything you know from memory. Only then open the notes and fill the gaps in a different colour. The gaps are your revision list.` },
          { title: 'End every session with the book closed', detail: 'Final 10 minutes: no notes, reproduce the core of what you covered. If you cannot produce it now, you could not produce it in an exam.' },
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
          { title: 'Retire the re-learning loop', detail: `Before re-learning any ${subjectPhrase} topic from scratch, test what is actually left first. You usually know more than it feels like, and testing tells you the real gap.` },
          { title: 'Let a timetable do the remembering', detail: 'Spacing fails when it relies on willpower. Put the return days in a plan so the decision is already made.' },
        ],
        articleSlug: 'best-way-to-revise-for-a-levels',
        articleTitle: 'What actually works for A-level revision',
        blurtingTemplate: true,
      }
    case 'examCraft':
      return {
        headline: 'Train the exam as its own skill',
        why: 'Marks are awarded for specific wording, under time. That is a trainable skill, separate from knowing the material.',
        steps: [
          { title: 'One timed paper a week, minimum', detail: `Full exam conditions in ${subjectPhrase}: no notes, real timing, no pausing. The first few scores will sting. That is the point of doing them now and not in May.` },
          { title: 'Mark like an examiner', detail: 'Mark your paper against the scheme, then rewrite every lost mark answer in the exact wording the scheme rewards. Say the phrases out loud. It is a language, learn it like one.' },
          { title: 'Decode the command words', detail: 'Explain, evaluate, compare, outline: each one has a mark pattern. Before writing, name the command word and what it is asking you to produce.' },
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
          { title: 'Write the avoid list', detail: `Tonight, 10 minutes: list every ${subjectPhrase} topic you would dread in an exam tomorrow. That list is your syllabus now. Everything else is maintenance.` },
          { title: 'Worst topic first, every session', detail: 'Open with 25 minutes on the topic you least want to touch, while your energy is highest. Then the session can soften.' },
          { title: 'Re-rate weekly', detail: 'Score each topic out of 5 for confidence every Sunday. Watch the avoided ones climb. That visible movement is what keeps the habit alive.' },
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
    detail: `List every ${subj} topic and rate each out of 5 for closed-book confidence. Anything at 3 or below goes on your priority list.`,
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
    detail: 'Use the free Revision Tracker to place deep work, next-day recall and spaced reviews around your real commitments.',
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

export function buildRouting(answers: Answers, scores: Scores, bottleneck: Dim, archetypeId: string): Routing {
  const year = (answers.year as string) ?? 'y12'
  const subjects = ((answers.subjects as string[]) ?? []).filter(Boolean)
  const worry = worrySubjectLabel(answers)
  const stemSubjects = subjects.filter((s) => SUMMER_SUBJECTS.includes(s))
  const worryIsStem = worry !== null && SUMMER_SUBJECTS.includes(worry)
  const worryIsAccel = worry !== null && SUBJECT_ACCEL_SUBJECTS.includes(worry)
  const accelSubjects = subjects.filter((s) => SUBJECT_ACCEL_SUBJECTS.includes(s))

  const current = GRADE_ORDER[(answers.currentGrade as string) ?? ''] ?? null
  const target = GRADE_ORDER[(answers.targetGrade as string) ?? ''] ?? null
  const gradeGap = current !== null && target !== null ? target - current : null

  const systemSide = bottleneck === 'method' || bottleneck === 'consistency' || bottleneck === 'retention' || bottleneck === 'prioritisation'

  const summerFocus = worryIsStem ? worry! : stemSubjects.slice(0, 2).join(' and ')

  const summer = (why: string): Route => ({
    id: 'summer',
    eyebrow: 'Your recommended route',
    name: 'Summer Accelerator',
    strap: 'Six weeks, live. Walk into Year 13 already ahead.',
    why,
    points: [
      summerFocus ? `Live sessions in ${summerFocus}, taught to the mark scheme` : 'Live sessions taught to the mark scheme',
      'Covers the high-yield Year 13 topics that decide predicted grades',
      'Every session recorded. First session risk-free',
    ],
    href: '/summer-accelerators/',
    cta: 'Explore the Summer Accelerator',
    meta: 'Cohort starts Saturday 25th July · from £289 per subject',
  })

  const subjectAccel = (why: string): Route => ({
    id: 'subject',
    eyebrow: 'Your recommended route',
    name: `${worryIsAccel ? worry + ' ' : ''}Subject Accelerator`,
    strap: 'Twelve weeks of live, exam-focused teaching in your problem subject.',
    why,
    points: [
      'Small groups, specialist tutors, real exam questions every session',
      'Built around mark scheme mastery, not content coverage',
      'Weekend sessions that never clash with school',
    ],
    href: '/subject-accelerators/',
    cta: 'Explore the Subject Accelerators',
    meta: 'Biology, Chemistry and Maths · next cohort starts 6th September',
  })

  const system = (why: string): Route => ({
    id: 'system',
    eyebrow: 'Your recommended route',
    name: 'Top 1% Study System',
    strap: 'Fix how you study, and every subject moves at once.',
    why,
    points: [
      'Active recall, spaced repetition and exam technique, installed as habits',
      'Time management that survives real school weeks',
      'The exact system behind everything we teach',
    ],
    href: '/study-systems/',
    cta: 'Explore the Study System',
    meta: 'Works alongside any subject · start with the free workshop',
  })

  const callLine = 'Not sure it is the right fit? Book a free 15 minute call with Dr Waleed and he will tell you honestly, even if the answer is neither.'

  /* Starting A-levels soon: content programmes do not fit yet, the method does. */
  if (year === 'pre') {
    return {
      primary: system(
        'You are about to start the two most content-heavy years of your education. Most students spend Year 12 discovering their GCSE method does not survive contact with A-levels. You have the chance to install the right system before the content piles up, which is the cheapest moment to do it.'
      ),
      secondaryLine: callLine,
    }
  }

  /* Year 12: the summer window is the biggest available move if they take a summer subject. */
  if (year === 'y12') {
    if (stemSubjects.length > 0) {
      const whyParts: string[] = []
      if (worryIsStem) {
        whyParts.push(`${worry} is the subject worrying you most, and it is one of the four the Summer Accelerator covers live.`)
      } else {
        whyParts.push(`You take ${stemSubjects.join(' and ')}, and the summer before Year 13 is the one window where you can get ahead of the content instead of chasing it.`)
      }
      if (gradeGap !== null && gradeGap >= 2) {
        whyParts.push('The gap between your current grade and your target is real, and it will not close during term time alone. Six structured weeks now does the heavy lifting.')
      } else if (systemSide) {
        whyParts.push('Your diagnostic shows the deeper issue is how you revise, and the Accelerator trains that inside the content: every session runs on retrieval, mark schemes and structured returns, so you learn the method by using it.')
      } else {
        whyParts.push('Your exam craft gap is exactly what the live sessions train: real questions, mark scheme wording, and feedback on your answers while there is still time to act on it.')
      }
      return {
        primary: summer(whyParts.join(' ')),
        secondaryLine:
          bottleneck === 'consistency' || bottleneck === 'method'
            ? 'Pair it with the Top 1% Study System if you want the method installed across every subject you take, beyond the live sessions. ' + callLine
            : callLine,
      }
    }
    return {
      primary: system(
        'Your subjects sit outside our live summer courses, but your diagnostic points at the system itself, and that transfers to every subject you take. Fix the method this summer and September becomes a different experience.'
      ),
      secondaryLine: callLine,
    }
  }

  /* Year 13 and resits: September programmes and the system. */
  if (worryIsAccel && bottleneck === 'examCraft') {
    return {
      primary: subjectAccel(
        `${worry} is where your marks are leaking, and your diagnostic shows the gap is in converting knowledge into exam marks. That is precisely what the twelve weeks train: past paper questions, mark scheme wording, and feedback on your answers, every single session.`
      ),
      secondaryLine: 'If the deeper habits need work too, the Top 1% Study System runs alongside it. ' + callLine,
    }
  }
  if (systemSide) {
    return {
      primary: system(
        year === 'resit'
          ? 'You already know the content from your first attempt. What your diagnostic shows is that the method is what needs to change this time, because repeating the same revision system produces the same grade.'
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
      ? ` With the grade jump you are chasing in ${focus}, specialist sessions every week is the honest route.`
      : ''
    return {
      primary: subjectAccel(
        `Your fundamentals are solid, so the biggest available gain is subject-specific: live, exam-focused teaching in ${focus}, working through real questions with a specialist until the mark scheme wording is second nature.${gapLine}`
      ),
      secondaryLine: callLine,
    }
  }
  return {
    primary: system(
      'Your subjects sit outside our live subject programmes, but the system layer transfers to all of them: retrieval, spacing, exam technique and a week that plans itself.'
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

export function diagnose(answers: Answers): Diagnosis {
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
    routing: buildRouting(answers, scores, bottleneck, archetype.id),
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

/* Landing FAQs, shared by the page and its FAQPage structured data. */
export const LANDING_FAQS = [
  {
    q: 'Why should I take it?',
    a: "Because I've seen where the marks actually go. I'm Dr Waleed, I got into medicine, and I've worked with over 1,000 A-level students. Marks leak in patterns, and the same seven profiles come up again and again. Take the diagnostic and I'll show you which one you are, where your marks are leaking, and exactly how to fix it.",
  },
  {
    q: 'Is it actually free?',
    a: 'Yes. The diagnostic, the report and the 7 day plan are free. You enter your email once, your report opens, and you also get my weekly revision email. Unsubscribe any time and the report stays yours.',
  },
  {
    q: 'How long does it take?',
    a: 'About 4 minutes. 20 questions, one tap each. Your answers save as you go, so you can leave and pick up where you stopped.',
  },
  {
    q: 'Who is it for?',
    a: 'A-level students: Year 12, Year 13, resitters, and anyone starting sixth form in September. The questions adapt to where you are, and so does the recommendation at the end.',
  },
  {
    q: 'Can I take it for my son or daughter?',
    a: 'Yes, plenty of parents do. Answer each question the way your child actually revises, honest rather than hopeful, and the diagnosis holds. The report is written to the student, so the best move is to read it together. It starts a much better conversation than asking whether they have revised.',
  },
  {
    q: 'Will you tell me my revision is fine?',
    a: 'If it is, yes. One of the seven profiles is The Optimiser, and if you land there the report says so and shows you how to sharpen rather than fix. Honesty is the whole point of a diagnostic.',
  },
]
