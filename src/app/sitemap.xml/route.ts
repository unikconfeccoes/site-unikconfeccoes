import { SITE } from '@/data/site'
import { GROUP_LABEL, type SitemapGroup } from '@/lib/site-index'

export const dynamic = 'force-static'

/**
 * Índice de sitemaps (sitemapindex).
 *
 * Um arquivo por grupo de páginas em vez de um sitemap único: no Search
 * Console cada sitemap mostra a sua própria contagem de "enviadas x
 * indexadas", então dá para ver na hora se os tecidos estão indexando e os
 * guias não, por exemplo. Envie SÓ este endereço (/sitemap.xml) no Console.
 */
export function GET() {
  const now = new Date().toISOString()
  const groups = Object.keys(GROUP_LABEL) as SitemapGroup[]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${groups.map((g) => `  <sitemap><loc>${SITE.url}/sitemaps/${g}.xml</loc><lastmod>${now}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
