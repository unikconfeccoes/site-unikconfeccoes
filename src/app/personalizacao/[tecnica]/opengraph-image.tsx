import { OG_SIZE, renderOg } from '@/lib/og'
import { TECHNIQUE_URL } from '@/data/seo/routes'
import { TECHNIQUE_PAGES } from '@/data/seo/techniques'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'UNIK Confecções'

export default async function Image({ params }: { params: Promise<{ tecnica: string }> }) {
  const { tecnica } = await params
  const t = TECHNIQUE_PAGES.find((x) => TECHNIQUE_URL[x.technique] === tecnica)
  return renderOg({ kicker: 'Personalização', title: t ? t.h1 : 'Personalização de uniformes' })
}
