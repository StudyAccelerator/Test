import Image from 'next/image'
import type { Tutor } from '@/lib/tutors'

/* The tutor's photo when one exists, and a branded initials card meanwhile.
   Swap in a real photo by setting the tutor's `photo` field in lib/tutors.ts
   to a path under /public/photos. */

export function TutorAvatar({ tutor }: { tutor: Tutor }) {
  if (tutor.photo) {
    return (
      <Image
        src={tutor.photo}
        alt={`${tutor.name}, A-Level ${tutor.subject} tutor`}
        width={160}
        height={160}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-white shadow-md"
        unoptimized
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`flex h-20 w-20 items-center justify-center rounded-full ${tutor.color.chip} font-serif text-3xl font-bold text-white ring-2 ring-white shadow-md`}
    >
      {tutor.name.charAt(0)}
    </span>
  )
}
