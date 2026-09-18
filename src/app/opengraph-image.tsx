import { OG_SIZE, renderOg } from '@/lib/og'

export const alt = 'UNIK Confecções: uniformes profissionais para empresas em Brasília'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderOg({ kicker: 'Confecção de uniformes', title: 'Uniformes que vestem a sua marca' })
}
