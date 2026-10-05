/* The subject tutors, shown as a compact Meet the Team strip on
   /subject-accelerators (Waleed's ruling, 5 October 2026: no standalone
   tutors page; the site faces Dr Waleed, and the tutors appear only where
   a parent is deciding on the tutor-taught programme).

   Photos are null until Waleed supplies them; the strip renders an
   initials card meanwhile (components/tutors/tutor-photo.tsx). */

export type Tutor = {
  slug: string
  name: string
  subject: 'Biology' | 'Chemistry' | 'Maths'
  sessionTime: string
  photo: string | null
  color: { chip: string; accent: string }
}

export const TUTORS: Tutor[] = [
  {
    slug: 'tanya',
    name: 'Tanya',
    subject: 'Biology',
    sessionTime: 'Sundays · 10:00 to 12:00',
    photo: null,
    color: { chip: 'bg-green-600', accent: 'text-green-700' },
  },
  {
    slug: 'advait',
    name: 'Advait',
    subject: 'Chemistry',
    sessionTime: 'Sundays · 13:00 to 15:00',
    photo: null,
    color: { chip: 'bg-purple-600', accent: 'text-purple-700' },
  },
  {
    slug: 'andrii',
    name: 'Andrii',
    subject: 'Maths',
    sessionTime: 'Saturdays · 13:00 to 15:00',
    photo: null,
    color: { chip: 'bg-blue-500', accent: 'text-blue-600' },
  },
]
