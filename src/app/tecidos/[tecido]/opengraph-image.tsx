import { OG_SIZE, renderOg } from '@/lib/og'
import { FABRIC_GUIDES } from '@/data/seo/fabrics'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'UNIK Confecções'

export default async function Image({ params }: { params: Promise<{ tecido: string }> }) {
  const { tecido } = await params
  const f = FABRIC_GUIDES.find((x) => x.slug === tecido)
  return renderOg({ kicker: 'Guia de tecidos', title: f ? `Tecido ${f.name}` : 'Tecidos para uniforme' })
}
