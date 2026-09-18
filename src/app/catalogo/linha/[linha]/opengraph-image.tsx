import { OG_SIZE, renderOg } from '@/lib/og'
import { CATEGORY_SEO, categoryFromUrl } from '@/lib/catalog-seo'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'UNIK Confecções'

export default async function Image({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params
  const c = categoryFromUrl(linha)
  return renderOg({ kicker: 'Linha de uniformes', title: c ? CATEGORY_SEO[c].h1 : 'Uniformes' })
}
