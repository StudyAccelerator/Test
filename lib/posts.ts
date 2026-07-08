export type Post = {
  slug: string
  title: string
  description: string
  datePublished: string // ISO date
  dateModified: string // ISO date
  readingMinutes: number
  category: 'Revision Techniques' | 'Predicted Grades & UCAS' | 'Study Planning' | 'For Parents' | 'Results & Clearing' | 'Subject Guides'
  keywords: string[]
}

export const SITE_URL = 'https://alevelaccelerators.com'

// Newest first. Add new posts to the top; /blog and sitemap.xml pick them up automatically.
export const posts: Post[] = [
  {
    slug: 'how-to-improve-predicted-grades',
    title: 'How to Improve Your A-Level Predicted Grades Before UCAS',
    description:
      'Predicted grades are set early in Year 13 — and yes, you can change them. A doctor and former top A-level student explains exactly what evidence teachers need, and the timeline to build it.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 9,
    category: 'Predicted Grades & UCAS',
    keywords: [
      'how to improve predicted grades',
      'a level predicted grades',
      'ucas predicted grades',
      'can predicted grades be changed',
      'predicted grades year 13',
    ],
  },
  {
    slug: 'year-12-summer-revision',
    title: 'Should You Revise Over the Year 12 Summer? What Top Students Actually Do',
    description:
      'The summer between Year 12 and Year 13 decides more than most students realise — predicted grades are set within weeks of returning. Here is what to do (and what to skip).',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 8,
    category: 'Study Planning',
    keywords: [
      'year 12 summer revision',
      'what to do summer before year 13',
      'year 12 to year 13 summer',
      'a level summer study',
      'get ahead for year 13',
    ],
  },
  {
    slug: 'blurting-method-a-level-revision',
    title: 'The Blurting Method: How to Use It for A-Level Revision (Step-by-Step)',
    description:
      'Blurting is the revision technique top students swear by — and most people do it wrong. A step-by-step guide from a doctor and former top A-level student, plus a free printable template.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 8,
    category: 'Revision Techniques',
    keywords: [
      'blurting method',
      'blurting revision technique',
      'how to do blurting',
      'active recall a level',
      'blurting template',
    ],
  },
  {
    slug: 'how-many-hours-revision-a-level',
    title: 'How Many Hours a Day Should You Revise for A-Levels?',
    description:
      'The honest answer from a doctor who got top A-level grades: 3–5 focused hours beats 8 distracted ones. Exact hour targets by year group and time of year, and why more isn’t better.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 7,
    category: 'Study Planning',
    keywords: [
      'how many hours revision a level',
      'how many hours should i revise',
      'a level revision hours per day',
      'how long to revise for a levels',
    ],
  },
  {
    slug: 'how-to-make-a-revision-timetable',
    title: 'How to Make an A-Level Revision Timetable That Actually Works',
    description:
      'Most revision timetables fail within a week because they ignore how memory works. Build one around spaced repetition and active recall instead — full method, plus a free tool that does it for you.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 9,
    category: 'Study Planning',
    keywords: [
      'revision timetable a level',
      'how to make a revision timetable',
      'revision timetable template',
      'spaced repetition timetable',
      'weekly revision plan',
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
