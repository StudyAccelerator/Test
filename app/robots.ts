import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/posts'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/sign-up', '/sign-in', '/*?*'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
