import { OG_SIZE, renderOg } from '@/lib/og'
import { CATEGORY_BY_SLUG, PRODUCT_BY_SLUG } from '@/data/catalog'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'UNIK Confecções'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = PRODUCT_BY_SLUG[slug]
  return renderOg({ kicker: p ? CATEGORY_BY_SLUG[p.category].name : 'Catálogo', title: p ? `${p.name} personalizada` : 'Uniformes' })
}
