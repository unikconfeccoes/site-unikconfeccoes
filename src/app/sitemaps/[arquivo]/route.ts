import { SITE } from '@/data/site'
import { GROUP_LABEL, siteIndex, type SitemapGroup } from '@/lib/site-index'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return (Object.keys(GROUP_LABEL) as SitemapGroup[]).map((g) => ({ arquivo: `${g}.xml` }))
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Sitemap de um grupo: /sitemaps/produtos.xml, /sitemaps/tecidos.xml … */
export async function GET(_req: Request, { params }: { params: Promise<{ arquivo: string }> }) {
  const { arquivo } = await params
  const group = arquivo.replace(/\.xml$/, '') as SitemapGroup
  if (!(group in GROUP_LABEL)) return new Response('Not found', { status: 404 })
  const now = new Date().toISOString()
  const urls = siteIndex().filter((p) => p.group === group)
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${escape(`${SITE.url}${u.path === '/' ? '' : u.path}`)}</loc><lastmod>${now}</lastmod><changefreq>${u.changeFrequency}</changefreq><priority>${u.priority.toFixed(2)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
