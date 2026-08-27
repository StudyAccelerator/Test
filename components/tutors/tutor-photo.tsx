import Image from 'next/image'
import type { Tutor } from '@/lib/tutors'

/* Renders the tutor's photo when one exists, and an honest branded
   placeholder card meanwhile. Swap in a real photo by setting the tutor's
   `photo` field in lib/tutors.ts to a path under /public/photos. */

export function TutorPortrait({ tutor }: { tutor: Tutor }) {
  if (tutor.photo) {
    return (
      <Image
        src={tutor.photo}
        alt={`${tutor.name}, A-Level ${tutor.subject} tutor`}
        width={640}
        height={800}
        className="h-full w-full rounded-2xl object-cover"
        unoptimized
      />
    )
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${tutor.color.soft} ring-1 ring-inset ring-brand-purple/10`}
    >
      <span
        aria-hidden="true"
        className={`flex h-24 w-24 items-center justify-center rounded-full ${tutor.color.chip} font-serif text-5xl font-bold text-white shadow-lg`}
      >
        {tutor.name.charAt(0)}
      </span>
      <span className="rounded-full border border-dashed border-brand-purple/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-purple/60">
        Photo coming soon
      </span>
    </div>
  )
}

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
