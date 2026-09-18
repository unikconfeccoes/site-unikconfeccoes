import { OG_SIZE, renderOg } from '@/lib/og'
import { SEGMENT_URL } from '@/data/seo/routes'
import { SEGMENT_PAGES } from '@/data/seo/segments'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'UNIK Confecções'

export default async function Image({ params }: { params: Promise<{ segmento: string }> }) {
  const { segmento } = await params
  const s = SEGMENT_PAGES.find((x) => SEGMENT_URL[x.segment] === segmento)
  return renderOg({ kicker: 'Uniformes por segmento', title: s ? s.h1 : 'Uniformes profissionais' })
}
