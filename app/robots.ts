import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/posts'

export const dynamic = 'force-static'

// AI answer engine crawlers we explicitly welcome. Listing them by name means
// a future tightening of the '*' rule can never accidentally lock them out.
const AI_ANSWER_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
]

const DISALLOWED = ['/sign-up', '/sign-in', '/*?*']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_ANSWER_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: DISALLOWED,
      })),
      // Common Crawl feeds bulk scrapes, not answer engines
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
