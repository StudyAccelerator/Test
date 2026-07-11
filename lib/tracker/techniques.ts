/* Single source of truth for the study techniques the tracker schedules.
   Labels, durations, colours and how-to copy are read from here by the form,
   the week grid, the day cards, the legend, the print sheet and the PNG
   renderer, so the method can never drift between surfaces. */

export type SessionType = 'blurt' | 'recall' | 'review'

export type Technique = {
  label: string
  shortLabel: string
  mins: number
  breakAfter: number
  /* One-line description shown inside the plan */
  strap: string
  /* Full how-to, in Waleed's voice, shown in the method cards and print sheet */
  howTo: string[]
  /* Colours: slot background, text on it, and a soft tint for cards */
  bg: string
  fg: string
  tint: string
  /* Greyscale-safe left-edge treatment used in print and the PNG */
  edge: 'solid' | 'dashed' | 'dotted'
}

export const TECHNIQUES: Record<SessionType, Technique> = {
  blurt: {
    label: 'Blurt and Fix',
    shortLabel: 'Blurt',
    mins: 90,
    breakAfter: 20,
    strap: 'Find the gaps, then fix only the gaps.',
    howTo: [
      'Phone in another room. Blurt first: 15 to 20 minutes writing everything you know about the topic from memory, notes closed.',
      'Check against your notes or the spec in a different colour, about 15 minutes. The red is your gap list.',
      'Short break. Then relearn only the red, roughly 30 minutes. Not the whole topic, just the gaps.',
      'Finish by re-blurting the red bits from memory. Keep the sheet. The page is a diagnosis, and you will re-test it later in the week.',
    ],
    bg: '#2E2557',
    fg: '#F3EBD8',
    tint: 'rgba(46,37,87,0.08)',
    edge: 'solid',
  },
  recall: {
    label: 'Active Recall',
    shortLabel: 'Recall',
    mins: 45,
    breakAfter: 15,
    strap: 'Test yourself cold. No notes open.',
    howTo: [
      'Past paper questions on this topic, done cold. No notes, no re-reading first.',
      'Mark against the mark scheme straight after each question, not at the end.',
      'Mix the question types rather than doing ten of the same kind in a row. Mixed practice is harder, and that is the point.',
      'Every dropped mark goes on a list. That list is what you restudy. No past papers for this topic yet? Flashcards or textbook questions work too.',
    ],
    bg: '#1F6E43',
    fg: '#FFFFFF',
    tint: 'rgba(31,110,67,0.10)',
    edge: 'dashed',
  },
  review: {
    label: 'Spaced Review',
    shortLabel: 'Review',
    mins: 30,
    breakAfter: 10,
    strap: 'A short revisit, days later. That is the trick.',
    howTo: [
      'Re-test yourself on whatever you got wrong earlier in the week: the red bits of your blurt sheet, or the questions you dropped marks on.',
      'From memory, on a fresh page, about ten minutes. Then check.',
      'Still wrong? Restudy it and it goes on next week\'s audit. Right this time? It\'s sticking. Move on.',
      'Finish with a handful of flashcards or one past paper question on the topic.',
    ],
    bg: '#C9A96E',
    fg: '#2E2557',
    tint: 'rgba(201,169,110,0.16)',
    edge: 'dotted',
  },
}

export type Rating = 'struggling' | 'shaky' | 'solid'

export const RATINGS: Record<
  Rating,
  { label: string; strap: string; dot: string }
> = {
  struggling: { label: 'Struggling', strap: 'Most sessions', dot: '#C0392B' },
  shaky: { label: 'Shaky', strap: 'Full cycle', dot: '#C9822B' },
  solid: { label: 'Solid', strap: 'Kept warm', dot: '#1F6E43' },
}

/* The weekly dose per rating: session type + preferred day offset from the
   anchor day, with fallback offsets if that day is full. Same rhythm as the
   blurting guide on the blog: blurt today, recall it tomorrow, come back to
   it days later. Weak topics get visibly more of the week. */
export type DoseStep = { type: SessionType; offset: number; fallbacks: number[] }

export const DOSES: Record<Rating, DoseStep[]> = {
  struggling: [
    { type: 'blurt', offset: 0, fallbacks: [] },
    { type: 'recall', offset: 1, fallbacks: [2] },
    { type: 'recall', offset: 3, fallbacks: [4, 2] },
    { type: 'review', offset: 5, fallbacks: [6, 4] },
  ],
  shaky: [
    { type: 'blurt', offset: 0, fallbacks: [] },
    { type: 'recall', offset: 1, fallbacks: [2] },
    { type: 'review', offset: 3, fallbacks: [4, 5] },
  ],
  solid: [
    { type: 'recall', offset: 0, fallbacks: [] },
    { type: 'review', offset: 3, fallbacks: [4, 2, 5] },
  ],
}

/* Study minutes (excluding breaks) a topic of each rating costs for the week */
export function doseStudyMins(rating: Rating): number {
  return DOSES[rating].reduce((sum, step) => sum + TECHNIQUES[step.type].mins, 0)
}

/* Study + break minutes: what a topic really takes out of the week */
export function doseFullMins(rating: Rating): number {
  return DOSES[rating].reduce(
    (sum, step) => sum + TECHNIQUES[step.type].mins + TECHNIQUES[step.type].breakAfter,
    0
  )
}
