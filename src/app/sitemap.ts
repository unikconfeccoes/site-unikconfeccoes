import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/data/catalog'
import { SITE } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/catalogo`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/lab`, lastModified: now, priority: 0.8 },
    ...PRODUCTS.map((p) => ({ url: `${SITE.url}/catalogo/${p.slug}`, lastModified: now, priority: 0.7 })),
  ]
}
