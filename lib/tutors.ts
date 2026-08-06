/*
 * The team on the /tutors/ page, one entry per person.
 *
 * Honesty rule: every credential and bio line here must be true and supplied by
 * Waleed. Entries with `placeholder: true` render as clearly unfinished cards and
 * are excluded from structured data; the page must not merge to main until the
 * placeholders are replaced with real details.
 *
 * Headshots live in /public/photos/tutors/ (e.g. /photos/tutors/<slug>.jpg).
 * Set `headshot: null` until the file exists and the card shows a neutral
 * silhouette instead.
 */

export type TeamMember = {
  slug: string
  name: string
  role: string
  subjects: string[]
  headshot: string | null
  /** Width/height of the headshot file, for next/image. Ignored while headshot is null. */
  headshotSize?: { width: number; height: number }
  credentials: string[]
  bio: string[]
  placeholder?: boolean
}

export const founder: TeamMember = {
  slug: 'dr-waleed-ahmad',
  name: 'Dr Waleed Ahmad',
  role: 'Founder. The method is his.',
  subjects: [],
  headshot: '/photos/waleed-portrait-wide.jpg',
  headshotSize: { width: 1200, height: 913 },
  credentials: [
    'MBBS · NHS Foundation Doctor',
    'Former top-performing A-level student',
    '1,000+ students worked with over 6 years',
  ],
  bio: [
    'I built A-Level Accelerators around the revision and exam method I used to earn my place in medicine, after doing everything school said and watching it nearly fall short. Every programme we run has that method at the centre, whoever is at the front of the class.',
    'I still teach, I run the free tools and the parent calls, and I pick every tutor on this page myself.',
  ],
}

export const tutors: TeamMember[] = [
  {
    slug: 'biology-chemistry-tutor',
    name: '[Biology and Chemistry tutor: full name]',
    role: 'Biology and Chemistry tutor',
    subjects: ['Biology', 'Chemistry'],
    headshot: null,
    credentials: [
      '[Degree and university]',
      '[A-level grades or teaching experience, if they want them shown]',
    ],
    bio: [
      '[Two or three sentences from Waleed: who they are, what they studied, how long they have taught, and one human line about how they teach.]',
    ],
    placeholder: true,
  },
  {
    slug: 'maths-tutor',
    name: '[Maths tutor: full name]',
    role: 'Maths tutor',
    subjects: ['Maths'],
    headshot: null,
    credentials: [
      '[Degree and university]',
      '[A-level grades or teaching experience, if they want them shown]',
    ],
    bio: [
      '[Two or three sentences from Waleed: who they are, what they studied, how long they have taught, and one human line about how they teach.]',
    ],
    placeholder: true,
  },
]
