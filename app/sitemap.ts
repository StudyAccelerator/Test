import type { MetadataRoute } from 'next'
import { posts, SITE_URL } from '@/lib/posts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/subject-accelerators/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/study-systems/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/revision-diagnostic/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/revision-tracker/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/summer-accelerators/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/newsletter/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/faqs/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/parents/`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.dateModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
