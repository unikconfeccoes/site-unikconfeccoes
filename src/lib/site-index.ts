import { CATEGORIES, CATEGORY_BY_SLUG, PRODUCTS, SEGMENT_BY_SLUG, TECHNIQUE_BY_SLUG } from '@/data/catalog'
import { FABRIC_GUIDES } from '@/data/seo/fabrics'
import { GUIDES } from '@/data/seo/guides'
import { ROUTES } from '@/data/seo/routes'
import { SEGMENT_PAGES } from '@/data/seo/segments'
import { TECHNIQUE_PAGES } from '@/data/seo/techniques'
import { CATEGORY_SEO } from '@/lib/catalog-seo'
import type { FabricSlug, GuideSlug } from '@/data/seo/routes'

/**
 * O índice de TODAS as páginas públicas do site.
 *
 * Uma lista só alimenta os sitemaps XML (um por grupo, para acompanhar a
 * indexação por seção no Search Console), o mapa do site em HTML, o llms.txt
 * e os "leia também". Página nova que não entra aqui não é rastreada: por
 * isso as rotas dinâmicas são geradas dos mesmos dados das páginas.
 */

export type SitemapGroup = 'paginas' | 'catalogo' | 'produtos' | 'segmentos' | 'personalizacao' | 'tecidos' | 'guias'

export type IndexedPage = {
  path: string
  title: string
  description: string
  group: SitemapGroup
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}

export const GROUP_LABEL: Record<SitemapGroup, string> = {
  paginas: 'Institucional',
  catalogo: 'Linhas do catálogo',
  produtos: 'Modelos',
  segmentos: 'Uniformes por segmento',
  personalizacao: 'Personalização',
  tecidos: 'Guia de tecidos',
  guias: 'Guias e artigos',
}

export function siteIndex(): IndexedPage[] {
  const pages: IndexedPage[] = [
    { path: ROUTES.home, title: 'Confecção de uniformes para empresas', description: 'Uniformes profissionais em Brasília desde 2016.', group: 'paginas', priority: 1, changeFrequency: 'weekly' },
    { path: ROUTES.empresas, title: 'Uniformes para empresas', description: 'Como a UNIK atende empresas: pedido mínimo, atacado, pagamento, reunião e produção.', group: 'paginas', priority: 0.95, changeFrequency: 'monthly' },
    { path: ROUTES.catalogo, title: 'Catálogo de uniformes', description: 'Todos os modelos com filtros por linha e segmento.', group: 'paginas', priority: 0.95, changeFrequency: 'weekly' },
    { path: ROUTES.brasilia, title: 'Confecção de uniformes em Brasília', description: 'Fábrica de uniformes profissionais no Distrito Federal.', group: 'paginas', priority: 0.9, changeFrequency: 'monthly' },
    { path: ROUTES.uniformes, title: 'Uniformes por segmento', description: 'Uniformes para cada tipo de empresa.', group: 'paginas', priority: 0.9, changeFrequency: 'monthly' },
    { path: ROUTES.personalizacao, title: 'Personalização de uniformes', description: 'Bordado, serigrafia, DTF, sublimação e alto relevo.', group: 'paginas', priority: 0.85, changeFrequency: 'monthly' },
    { path: ROUTES.tecidos, title: 'Guia de tecidos para uniforme', description: 'Os tecidos de uniforme explicados.', group: 'paginas', priority: 0.85, changeFrequency: 'monthly' },
    { path: ROUTES.guias, title: 'Guias sobre uniformes', description: 'Artigos para quem compra uniformes para empresas.', group: 'paginas', priority: 0.8, changeFrequency: 'monthly' },
    { path: ROUTES.linhas, title: 'Linhas de uniformes', description: 'O catálogo organizado por tipo de peça.', group: 'paginas', priority: 0.8, changeFrequency: 'monthly' },
    { path: ROUTES.faq, title: 'Perguntas frequentes', description: 'Pedido mínimo, preços, pagamento, prazo e personalização.', group: 'paginas', priority: 0.8, changeFrequency: 'monthly' },
    { path: ROUTES.glossario, title: 'Glossário de confecção', description: 'Os termos de uniforme e confecção explicados.', group: 'paginas', priority: 0.7, changeFrequency: 'monthly' },
    { path: ROUTES.lab, title: 'UNIK Lab: private label', description: 'Criação de marca de roupa, do tecido à peça-piloto.', group: 'paginas', priority: 0.8, changeFrequency: 'monthly' },
    { path: ROUTES.sobre, title: 'Sobre a UNIK', description: 'A confecção de uniformes profissionais de Brasília.', group: 'paginas', priority: 0.6, changeFrequency: 'yearly' },
    { path: ROUTES.mapa, title: 'Mapa do site', description: 'Todas as páginas do site.', group: 'paginas', priority: 0.4, changeFrequency: 'monthly' },
  ]

  for (const c of CATEGORIES) {
    pages.push({ path: ROUTES.linha(c.slug), title: CATEGORY_SEO[c.slug].h1, description: c.description, group: 'catalogo', priority: 0.85, changeFrequency: 'weekly' })
  }
  for (const p of PRODUCTS) {
    pages.push({ path: ROUTES.produto(p.slug), title: `${p.name} personalizada`, description: p.summary, group: 'produtos', priority: 0.8, changeFrequency: 'weekly' })
  }
  for (const s of SEGMENT_PAGES) {
    pages.push({ path: ROUTES.segmento(s.segment), title: s.h1, description: s.description, group: 'segmentos', priority: 0.85, changeFrequency: 'monthly' })
  }
  for (const t of TECHNIQUE_PAGES) {
    pages.push({ path: ROUTES.tecnica(t.technique), title: t.h1, description: t.description, group: 'personalizacao', priority: 0.75, changeFrequency: 'monthly' })
  }
  for (const f of FABRIC_GUIDES) {
    pages.push({ path: ROUTES.tecido(f.slug as FabricSlug), title: `Tecido ${f.name}`, description: f.summary, group: 'tecidos', priority: 0.7, changeFrequency: 'monthly' })
  }
  for (const g of GUIDES) {
    pages.push({ path: ROUTES.guia(g.slug as GuideSlug), title: g.title, description: g.description, group: 'guias', priority: 0.75, changeFrequency: 'monthly' })
  }
  return pages
}

/** Título e descrição de uma rota interna, para cards de "leia também". */
export function pageInfo(path: string): IndexedPage | undefined {
  const clean = path.split('#')[0] ?? path
  return siteIndex().find((p) => p.path === clean)
}

/** Nomes legíveis usados nos cards de relacionados. */
export const NAMES = {
  category: (slug: keyof typeof CATEGORY_BY_SLUG) => CATEGORY_BY_SLUG[slug].name,
  segment: (slug: keyof typeof SEGMENT_BY_SLUG) => SEGMENT_BY_SLUG[slug].name,
  technique: (slug: keyof typeof TECHNIQUE_BY_SLUG) => TECHNIQUE_BY_SLUG[slug].name,
}

/** Converte rotas internas em cards de relacionados, pulando rotas desconhecidas. */
export function relatedFrom(paths: readonly string[]): { href: string; title: string; text: string; kicker: string }[] {
  return paths
    .map((p) => {
      const info = pageInfo(p)
      return info ? { href: p, title: info.title, text: info.description, kicker: GROUP_LABEL[info.group] } : null
    })
    .filter((x) => x !== null)
}
