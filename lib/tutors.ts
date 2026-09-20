/* The teaching team, in one shared file so the /tutors page and the
   subject-accelerators strip stay in sync. Edit people here, once.

   PLACEHOLDER RULE: anything in [square brackets] is a slot for Waleed to
   fill with the real fact. Nothing in brackets ships live. Photos are null
   until he supplies them; the pages render an initials card meanwhile. */

export type TutorColor = {
  chip: string
  accent: string
  soft: string
}

export type Tutor = {
  slug: string
  name: string
  subject: 'Biology' | 'Chemistry' | 'Maths'
  sessionTime: string
  photo: string | null
  headline: string
  about: string[]
  studying: string
  aStar: string[]
  waleedOn: string
  /* Name of a real quote in lib/testimonials.ts WALL_QUOTES, shown on the
     tutor's card. Only ever reference real, existing quotes. */
  studentQuoteName: string
  color: TutorColor
}

export const TUTORS: Tutor[] = [
  {
    slug: 'tanya',
    name: 'Tanya',
    subject: 'Biology',
    sessionTime: 'Sundays · 10:00 to 12:00',
    photo: null,
    headline: 'Teaches the Biology Accelerator',
    about: [
      '[About Tanya, in your words: her background, her own A-level story, and what she is like to be taught by. Two or three sentences.]',
    ],
    studying: '[What Tanya is currently studying: her course and university]',
    aStar: [
      'Achieved top grades in Biology herself, and has helped hundreds of students do the same',
      'Builds every session around real exam questions and the mark scheme, not textbook re-teaching',
      'Targets the misconceptions that quietly cost Biology students marks in application questions',
    ],
    waleedOn:
      '[Your words on Tanya: why you trust her with your Biology students, and what students say about her.]',
    studentQuoteName: 'Naysa',
    color: {
      chip: 'bg-green-600',
      accent: 'text-green-700',
      soft: 'from-green-50 to-green-100',
    },
  },
  {
    slug: 'advait',
    name: 'Advait',
    subject: 'Chemistry',
    sessionTime: 'Sundays · 13:00 to 15:00',
    photo: null,
    headline: 'Teaches the Chemistry Accelerator',
    about: [
      '[About Advait, in your words: his background, his own A-level story, and what he is like to be taught by. Two or three sentences.]',
    ],
    studying: '[What Advait is currently studying: his course and university]',
    aStar: [
      'Achieved top grades in Chemistry himself, and has helped hundreds of students do the same',
      'Trains students to structure answers the way the mark scheme rewards, so understanding turns into marks',
      'Drills the calculation and mechanism errors that separate a B from an A*',
    ],
    waleedOn:
      '[Your words on Advait: why you trust him with your Chemistry students, and what students say about him.]',
    studentQuoteName: 'Maahil',
    color: {
      chip: 'bg-purple-600',
      accent: 'text-purple-700',
      soft: 'from-purple-50 to-purple-100',
    },
  },
  {
    slug: 'andrii',
    name: 'Andrii',
    subject: 'Maths',
    sessionTime: 'Saturdays · 13:00 to 15:00',
    photo: null,
    headline: 'Teaches the Maths Accelerator',
    about: [
      '[About Andrii, in your words: his background, his own A-level story, and what he is like to be taught by. Two or three sentences.]',
    ],
    studying: '[What Andrii is currently studying: his course and university]',
    aStar: [
      'Achieved top grades in Maths himself, and has helped hundreds of students do the same',
      'Teaches problem-solving as a repeatable process, so unfamiliar questions stop being scary',
      'Walks through the common pitfalls in pure and applied that cost marks under time pressure',
    ],
    waleedOn:
      '[Your words on Andrii: why you trust him with your Maths students, and what students say about him.]',
    studentQuoteName: 'Jay',
    color: {
      chip: 'bg-blue-500',
      accent: 'text-blue-600',
      soft: 'from-blue-50 to-blue-100',
    },
  },
]
