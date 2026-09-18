import type { CategorySlug, SegmentSlug, TechniqueSlug } from '@/data/catalog'

/**
 * Tipos do conteúdo editorial (SEO).
 *
 * Texto inline aceita dois marcadores, e só eles:
 *   [texto do link](/rota-interna)   link interno (renderizado com next/link)
 *   **negrito**
 * Nada de HTML, nada de travessão (— ou –): a regra do site é vírgula,
 * dois-pontos ou parênteses.
 */
export type Inline = string

export type Block =
  | { kind: 'p'; text: Inline }
  | { kind: 'ul'; items: Inline[] }
  | { kind: 'ol'; items: Inline[] }
  | { kind: 'table'; caption: string; head: string[]; rows: string[][] }
  /** Destaque didático ("Na prática", "Resumo"). */
  | { kind: 'note'; title: string; text: Inline }
  /** Tabela de preços "a partir de" gerada dos dados da planilha. */
  | { kind: 'priceTable'; category?: CategorySlug }
  /** Cards de produtos do catálogo, pelo slug. */
  | { kind: 'products'; slugs: string[] }

export type ContentSection = {
  /** âncora, kebab-case */
  id: string
  title: string
  blocks: Block[]
}

export type Faq = { q: string; a: string }

export type FabricGuide = {
  slug: string
  name: string
  /** Outros nomes pelos quais o tecido é procurado. */
  aka: string[]
  /** Frase de resposta direta, até 160 caracteres. Vira meta description. */
  summary: string
  /** Parágrafo "o que é", que responde a pergunta na primeira frase. */
  definition: Inline
  composition: string
  /** Ficha comparável: Toque, Caimento, Respirabilidade, Durabilidade, Custo. */
  traits: { label: string; value: string }[]
  idealFor: Inline[]
  avoidFor: Inline[]
  care: string[]
  techniques: TechniqueSlug[]
  sections: ContentSection[]
  faq: Faq[]
}

export type Guide = {
  slug: string
  /** H1 */
  title: string
  /** <title>, até ~60 caracteres, palavra-chave primeiro */
  seoTitle: string
  /** meta description, até 160 caracteres */
  description: string
  kicker: string
  readingMinutes: number
  /** ISO, AAAA-MM-DD */
  updated: string
  lead: Inline
  sections: ContentSection[]
  faq: Faq[]
  /** rotas internas relacionadas */
  related: string[]
}

export type SegmentPage = {
  segment: SegmentSlug
  h1: string
  seoTitle: string
  description: string
  lead: Inline
  needs: { title: string; body: Inline }[]
  kit: { role: string; products: string[]; note: Inline }[]
  sections: ContentSection[]
  faq: Faq[]
}

export type TechniquePage = {
  technique: TechniqueSlug
  h1: string
  seoTitle: string
  description: string
  lead: Inline
  howItWorks: Inline[]
  pros: Inline[]
  limits: Inline[]
  compare: { label: string; value: string }[]
  sections: ContentSection[]
  faq: Faq[]
}

export type GlossaryTerm = {
  slug: string
  term: string
  definition: Inline
  /** rota interna para aprofundar, se houver */
  href?: string
}
