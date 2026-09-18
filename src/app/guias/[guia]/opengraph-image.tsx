import { OG_SIZE, renderOg } from '@/lib/og'
import { GUIDES } from '@/data/seo/guides'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'UNIK Confecções'

export default async function Image({ params }: { params: Promise<{ guia: string }> }) {
  const { guia } = await params
  const g = GUIDES.find((x) => x.slug === guia)
  return renderOg({ kicker: g ? g.kicker : 'Guia', title: g ? g.title : 'Guias sobre uniformes' })
}
