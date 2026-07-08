export type Post = {
  slug: string
  title: string
  description: string
  datePublished: string // ISO date
  dateModified: string // ISO date
  readingMinutes: number
  category: 'Revision Techniques' | 'Predicted Grades & UCAS' | 'Study Planning' | 'For Parents' | 'Results & Clearing' | 'Subject Guides' | 'Tutoring & Support' | 'Exam Technique'
  keywords: string[]
}

export const SITE_URL = 'https://alevelaccelerators.com'

// Newest first. Add new posts to the top; /blog and sitemap.xml pick them up automatically.
export const posts: Post[] = [
  {
    slug: 'how-to-choose-an-a-level-tutor',
    title: 'How to Choose an Online A-Level Tutor in the UK',
    description:
      'Most parents pick an A-level tutor on price and a friendly first call. Here is what actually predicts results: the questions to ask, the red flags, and when group teaching beats one-to-one.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 8,
    category: 'Tutoring & Support',
    keywords: [
      'online a level tutors in uk',
      'qualified a level tutor in uk',
      'private a level tutors online in uk',
      'how to choose a level tutor',
      'a level tutor cost',
    ],
  },
  {
    slug: 'one-to-one-a-level-tutoring',
    title: 'One-to-One A-Level Tutoring: Does It Actually Improve Grades?',
    description:
      'A doctor who has worked with over 1,000 A-level students gives the honest answer: one-to-one tutoring helps with understanding, but it usually caps out around a B. Here is why, and what to do about it.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 8,
    category: 'Tutoring & Support',
    keywords: [
      'one on one a level tutoring',
      'one to one tutoring a level',
      'does tutoring improve grades',
      'online a level tutoring',
      'is a level tutoring worth it',
    ],
  },
  {
    slug: 'how-to-prepare-for-a-level-exams',
    title: 'How to Prepare for A-Level Exams: The Complete Guide',
    description:
      'A step-by-step A-level exam preparation plan from a doctor and former top student: when to start, how to plan, which revision techniques earn marks, and the mistakes that quietly cost grades.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 10,
    category: 'Study Planning',
    keywords: [
      'how to prepare for a level exams',
      'a level exam preparation',
      'a level examination preparation',
      'when to start revising for a levels',
      'a level exam tips',
    ],
  },
  {
    slug: 'resitting-a-levels',
    title: 'Resitting A-Levels: How It Works, What It Costs and Key Deadlines',
    description:
      'Everything you need to know about A-level resits: who can retake, when exams run, realistic costs, how resits affect UCAS and university offers, and how to make the retake year count.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 9,
    category: 'Results & Clearing',
    keywords: [
      'a level resits',
      'resit a levels',
      'resitting a levels',
      'can you resit a level exams',
      'a level resit cost',
    ],
  },
  {
    slug: 'best-way-to-revise-for-a-levels',
    title: 'What Is the Best Way to Revise for A-Levels?',
    description:
      'The revision methods that actually move grades, ranked by a doctor and former top A-level student, plus subject-specific advice for maths, chemistry, physics and biology.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 9,
    category: 'Revision Techniques',
    keywords: [
      'a level revision',
      'how to revise for a levels',
      'best way to revise for a levels',
      'how to revise a level maths',
      'how to revise a level chemistry',
      'how to revise a level physics',
    ],
  },
  {
    slug: 'a-level-exam-confidence',
    title: 'How to Feel Confident Before A-Level Exams (Without Cramming)',
    description:
      'Exam confidence is built, not felt. A doctor explains how to beat A-level exam anxiety with a simple routine: mocks, sleep, and proof you can perform, so the night before feels calm instead of chaotic.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    readingMinutes: 8,
    category: 'Exam Technique',
    keywords: [
      'a level exam preparation',
      'a level exam anxiety',
      'how to feel confident before exams',
      'how to stop cramming for exams',
      'a level exam tips',
    ],
  },
  {
    slug: 'how-to-improve-predicted-grades',
    title: 'How to Improve Your A-Level Predicted Grades Before UCAS',
    description:
      'Predicted grades get set early in Year 13, and yes, you can change them. A doctor and former top A-level student explains exactly what evidence teachers need, and how long it takes to build.',
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
      'The summer between Year 12 and Year 13 decides more than most students realise. Predicted grades get set within weeks of returning. Here is what to do, and what to skip.',
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
      'Blurting is the revision technique top students swear by, and most people do it wrong. A step-by-step guide from a doctor and former top A-level student, plus a free printable template.',
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
      'The honest answer from a doctor who got top A-level grades: 3 to 5 focused hours beats 8 distracted ones. Exact hour targets by year group and time of year, and why more is often worse.',
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
      'Most revision timetables fail within a week because they ignore how memory works. Build one around spaced repetition and active recall instead. Full method, plus a free tool that does it for you.',
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
