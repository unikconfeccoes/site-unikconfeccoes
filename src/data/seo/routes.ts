import type { CategorySlug, SegmentSlug, TechniqueSlug } from '@/data/catalog'

/**
 * O mapa de URLs do site, em um lugar só.
 *
 * Slugs de SEO são escritos como as pessoas buscam ("camisas-polo",
 * "uniformes-para-restaurantes"), não como o código chama as coisas
 * ("polos", "gastronomia"). Todo link interno e todo sitemap sai daqui.
 */

export const CATEGORY_URL: Record<CategorySlug, string> = {
  polos: 'camisas-polo',
  camisetas: 'camisetas-personalizadas',
  esportivo: 'camisetas-dry-fit',
  sociais: 'camisas-sociais',
  moletons: 'moletons-personalizados',
  calcas: 'calcas-profissionais',
  gastronomia: 'dolmas-e-aventais',
  jalecos: 'jalecos-personalizados',
}

export const SEGMENT_URL: Record<SegmentSlug, string> = {
  corporativo: 'uniformes-corporativos',
  gastronomia: 'uniformes-para-restaurantes',
  hotelaria: 'uniformes-para-hotelaria',
  varejo: 'uniformes-para-lojas-e-varejo',
  educacao: 'uniformes-escolares-e-formatura',
  esporte: 'uniformes-esportivos',
  eventos: 'camisetas-para-eventos',
  saude: 'uniformes-para-clinicas-e-saude',
}

export const TECHNIQUE_URL: Record<TechniqueSlug, string> = {
  serigrafia: 'serigrafia',
  bordado: 'bordado',
  dtf: 'dtf',
  sublimacao: 'sublimacao',
  'alto-relevo': 'alto-relevo',
}

export const FABRIC_SLUGS = [
  'malha-pv',
  'malha-pp',
  'algodao',
  'algodao-pima',
  'suedine',
  'piquet',
  'dry-fit',
  'uv-fluid',
  'tricoline',
  'fustao',
  'linho',
  'moletom',
  'tactel',
  'pied-de-poule',
  'two-way',
  'gabardine',
  'brim',
  'jeans',
] as const
export type FabricSlug = (typeof FABRIC_SLUGS)[number]

export const GUIDE_SLUGS = [
  'como-escolher-uniforme-para-empresa',
  'serigrafia-bordado-dtf-ou-sublimacao',
  'quanto-custa-uniforme-personalizado',
  'como-montar-grade-de-tamanhos',
  'uniforme-para-restaurante',
  'como-criar-marca-de-roupa-private-label',
  'uniformes-no-atacado',
  'tecidos-para-uniforme',
] as const
export type GuideSlug = (typeof GUIDE_SLUGS)[number]

/** Tecido do produto (id em catalog.ts) → página do guia de tecidos. */
export const FABRIC_ID_TO_GUIDE: Record<string, FabricSlug> = {
  pv: 'malha-pv',
  pp: 'malha-pp',
  algodao: 'algodao',
  'algodao-elastano': 'algodao',
  pima: 'algodao-pima',
  suedine: 'suedine',
  'piquet-pv': 'piquet',
  'piquet-pa': 'piquet',
  'piquet-conforto': 'piquet',
  'dry-selecao': 'dry-fit',
  dry: 'dry-fit',
  'dry-elastano': 'dry-fit',
  'dry-texturizado': 'dry-fit',
  'dry-poliamida': 'dry-fit',
  'uv-poliamida': 'uv-fluid',
  'uv-poliester': 'uv-fluid',
  tricoline: 'tricoline',
  fustao: 'fustao',
  'linho-ml': 'linho',
  'linho-mc': 'linho',
  'cores-base': 'moletom',
  'cores-especiais': 'moletom',
  tactel: 'tactel',
  classica: 'pied-de-poule',
  premium: 'pied-de-poule',
  'twoway-220': 'two-way',
  'twoway-247': 'two-way',
  gabardine: 'gabardine',
  jeans: 'jeans',
  'brim-leve': 'brim',
}

export const ROUTES = {
  home: '/',
  catalogo: '/catalogo',
  produto: (slug: string) => `/catalogo/${slug}`,
  linhas: '/catalogo/linhas',
  linha: (c: CategorySlug) => `/catalogo/linha/${CATEGORY_URL[c]}`,
  uniformes: '/uniformes',
  segmento: (s: SegmentSlug) => `/uniformes/${SEGMENT_URL[s]}`,
  personalizacao: '/personalizacao',
  tecnica: (t: TechniqueSlug) => `/personalizacao/${TECHNIQUE_URL[t]}`,
  tecidos: '/tecidos',
  tecido: (f: FabricSlug) => `/tecidos/${f}`,
  guias: '/guias',
  guia: (g: GuideSlug) => `/guias/${g}`,
  empresas: '/empresas',
  brasilia: '/confeccao-de-uniformes-brasilia',
  glossario: '/glossario',
  faq: '/perguntas-frequentes',
  sobre: '/sobre',
  lab: '/lab',
  orcamento: '/orcamento',
  mapa: '/mapa-do-site',
} as const
