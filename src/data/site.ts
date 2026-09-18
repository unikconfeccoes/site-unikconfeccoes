/**
 * Dados institucionais da UNIK.
 *
 * PROCEDÊNCIA — perfis @unik.confeccoes e @uniklab_ no Instagram e o link do
 * WhatsApp enviados pelo cliente (set/2026). O que ainda não foi informado
 * (endereço completo, CNPJ, pedido mínimo, prazo médio, números de clientes)
 * fica FORA do site até ser confirmado — ver "Pendências" no README.
 */

function resolverUrlDoSite(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]
  for (const bruto of candidatos) {
    const valor = bruto?.trim()
    if (!valor) continue
    try {
      return new URL(/^https?:\/\//.test(valor) ? valor : `https://${valor}`).origin
    } catch {
      continue
    }
  }
  return 'http://localhost:3000'
}

export const SITE = {
  name: 'UNIK Confecções',
  shortName: 'UNIK',
  tagline: 'Transformando o seu sonho em realidade.',
  description:
    'Uniformes premium em Brasília-DF desde 2016. Polos, camisetas, dólmãs, aventais, moletons e linha esportiva com serigrafia, bordado, DTF e sublimação. Monte seu orçamento online.',
  url: resolverUrlDoSite(),
  founded: 2016,
  city: 'Brasília',
  state: 'DF',
} as const

export const WHATSAPP = {
  number: '5561995510564',
  display: '+55 61 99551-0564',
} as const

export const SOCIAL = {
  instagram: { handle: '@unik.confeccoes', url: 'https://www.instagram.com/unik.confeccoes/' },
  instagramLab: { handle: '@uniklab_', url: 'https://www.instagram.com/uniklab_/' },
  linktree: { handle: 'linktr.ee/unikconfeccoes', url: 'https://linktr.ee/unikconfeccoes' },
} as const

/** Regra comercial da planilha: preço de atacado a partir de 60 peças. */
export const ATACADO_MIN = 60

export const NAV_ITEMS = [
  { id: '01', label: 'Catálogo', href: '/catalogo' },
  { id: '02', label: 'Técnicas', href: '/#tecnicas' },
  { id: '03', label: 'Segmentos', href: '/#segmentos' },
  { id: '04', label: 'Como funciona', href: '/#processo' },
  { id: '05', label: 'UNIK Lab', href: '/lab' },
  { id: '06', label: 'Orçamento', href: '/orcamento' },
] as const

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
