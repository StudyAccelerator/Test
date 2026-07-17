/* Single source of truth for the mistake taxonomy the error log uses.
   These are the four tiers of the A* Performance Pyramid exactly as Waleed
   teaches them (Knowledge, Recall, Application, Exam Mastery), each with the
   specific causes he names in the live sessions. The form, the log book, the
   insights panel, the retest queue and the print sheet all read from here so
   the method can never drift between surfaces. Do not invent new categories. */

export type TierId = 'knowledge' | 'recall' | 'application' | 'exam'

export const TIER_ORDER: TierId[] = ['knowledge', 'recall', 'application', 'exam']

export type SubCause = { id: string; label: string }

export type Tier = {
  /* Tier number in the pyramid, 1 to 4 */
  n: number
  label: string
  /* First-person strapline shown on the picker card */
  strap: string
  /* The diagnostic question that identifies this tier */
  test: string
  /* The specific causes Waleed names in teaching, first person */
  causes: SubCause[]
  /* What actually fixes mistakes in this tier, in Waleed's voice */
  fix: string
  /* Colours: chip background, text on it, and a soft tint for cards */
  bg: string
  fg: string
  tint: string
  /* Greyscale-safe edge treatment for the print sheet */
  edge: 'solid' | 'dashed' | 'dotted' | 'double'
}

export const TIERS: Record<TierId, Tier> = {
  knowledge: {
    n: 1,
    label: 'Knowledge',
    strap: 'I didn\'t know it, or didn\'t really understand it',
    test: 'With your notes open, could you have got it right? If not, the content itself is the gap.',
    causes: [
      { id: 'never-learned', label: 'Never properly covered it' },
      { id: 'not-understood', label: 'Learned it but never really understood it' },
      { id: 'notes-gap', label: 'My notes have a hole where this should be' },
    ],
    fix: 'Relearn the gap, not the whole topic. Get it explained until it makes sense, then blurt it from memory and check what comes out.',
    bg: '#2E2557',
    fg: '#F3EBD8',
    tint: 'rgba(46,37,87,0.08)',
    edge: 'solid',
  },
  recall: {
    n: 2,
    label: 'Recall',
    strap: 'I knew it, but it wouldn\'t come out when I needed it',
    test: 'You understood it at home and blanked in the moment. Recognising it in your notes isn\'t the same as retrieving it cold.',
    causes: [
      { id: 'blanked', label: 'Blanked under pressure' },
      { id: 'mixed-up', label: 'Mixed it up with something similar' },
      { id: 'faded', label: 'Knew it a week ago, gone now' },
    ],
    fix: 'Reading it again won\'t fix this. Test it cold: closed notes, from memory, spaced out over days. That\'s exactly what the retests in this tool are for.',
    bg: '#1F6E43',
    fg: '#FFFFFF',
    tint: 'rgba(31,110,67,0.10)',
    edge: 'dashed',
  },
  application: {
    n: 3,
    label: 'Application',
    strap: 'I knew it, but couldn\'t use it on this question',
    test: 'The knowledge was in your head and the marks still didn\'t arrive. The gap is between knowing it and shaping it into the answer this question wanted.',
    causes: [
      { id: 'command-word', label: 'Missed what the command word wanted' },
      { id: 'not-included', label: 'Knew it but never wrote it down' },
      { id: 'no-context', label: 'Gave a generic answer, not one about this question' },
      { id: 'no-mechanism', label: 'Described it but didn\'t explain the mechanism' },
      { id: 'structure', label: 'Right points, wrong shape' },
    ],
    fix: 'Practise on unseen questions, not familiar ones. Read the command word first, plan where each mark comes from, then write a model answer for this question type and keep it.',
    bg: '#8A6A2F',
    fg: '#FFFFFF',
    tint: 'rgba(201,169,110,0.16)',
    edge: 'dotted',
  },
  exam: {
    n: 4,
    label: 'Exam Mastery',
    strap: 'The exam beat me: timing, wording, a misread, a slip',
    test: 'The knowledge was fine. The clock, the question wording or the pressure took the marks instead.',
    causes: [
      { id: 'timing', label: 'Ran out of time' },
      { id: 'misread', label: 'Misread the question' },
      { id: 'wording', label: 'My wording wasn\'t precise enough for the mark scheme' },
      { id: 'mark-scheme', label: 'Didn\'t know what the mark scheme rewards' },
      { id: 'slip', label: 'Careless slip under pressure' },
    ],
    fix: 'Train it like a skill of its own. Timed sections, marked harshly against the real mark scheme, until the exact wording it rewards becomes your default.',
    bg: '#7A2F3B',
    fg: '#F3EBD8',
    tint: 'rgba(122,47,59,0.10)',
    edge: 'double',
  },
}

export function causeLabel(tier: TierId, causeId: string | undefined): string | null {
  if (!causeId) return null
  const found = TIERS[tier].causes.find((c) => c.id === causeId)
  return found ? found.label : null
}

/* Where the mistake happened. Kept deliberately short: the answer changes
   nothing about the retest schedule, but it tells you (and Waleed's later
   tools) whether a student is actually doing timed work. */
export type SourceId = 'paper' | 'homework' | 'test' | 'mock' | 'other'

export const SOURCES: { id: SourceId; label: string }[] = [
  { id: 'paper', label: 'Past paper' },
  { id: 'homework', label: 'Homework' },
  { id: 'test', label: 'Class test' },
  { id: 'mock', label: 'Mock exam' },
  { id: 'other', label: 'Somewhere else' },
]

export function sourceLabel(id: SourceId): string {
  return SOURCES.find((s) => s.id === id)?.label ?? 'Somewhere else'
}

/* The retest ladder, in days after the previous pass. The numbers are the
   ones the method already teaches: redo it from scratch three days later,
   retest the log weekly, look back at 7 to 14 days, then a final check about
   a month out to prove it stuck. Get a retest wrong and the mistake goes back
   to the start of the ladder. */
export const RETEST_LADDER = [3, 7, 14, 30] as const

export const LADDER_LABELS = ['3 days later', '1 week on', '2 weeks on', '1 month on'] as const
