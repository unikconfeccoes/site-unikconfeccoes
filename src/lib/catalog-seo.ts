import {
  CATEGORIES,
  CATEGORY_BY_SLUG,
  PRODUCTS,
  SEGMENT_BY_SLUG,
  TECHNIQUE_BY_SLUG,
  fabricPrice,
  startingPrice,
  type CategorySlug,
  type Product,
  type SegmentSlug,
  type TechniqueSlug,
} from '@/data/catalog'
import { ATACADO_MIN } from '@/data/site'
import { CATEGORY_URL, FABRIC_ID_TO_GUIDE, ROUTES } from '@/data/seo/routes'
import type { Faq } from '@/data/seo/types'
import { formatBRL } from '@/lib/format'

/**
 * Conteúdo derivado do catálogo para SEO.
 *
 * Nada aqui é redigido à mão com números: preço, tecidos, técnicas e
 * segmentos saem dos dados. Se um modelo entrar ou um preço mudar na
 * planilha, as páginas, as FAQs e o llms.txt mudam juntos.
 */

/** Títulos de busca por linha: como as empresas procuram, não como o código chama. */
export const CATEGORY_SEO: Record<CategorySlug, { h1: string; seoTitle: string; searchName: string }> = {
  polos: { h1: 'Camisas polo personalizadas para empresas', seoTitle: 'Camisa polo personalizada para empresas', searchName: 'camisa polo personalizada' },
  camisetas: { h1: 'Camisetas personalizadas para empresas e eventos', seoTitle: 'Camisetas personalizadas para empresas', searchName: 'camiseta personalizada' },
  esportivo: { h1: 'Camisetas dry fit e uniformes esportivos', seoTitle: 'Camiseta dry fit personalizada e uniforme esportivo', searchName: 'camiseta dry fit personalizada' },
  sociais: { h1: 'Camisas sociais para uniforme corporativo', seoTitle: 'Camisa social para uniforme corporativo', searchName: 'camisa social para uniforme' },
  moletons: { h1: 'Moletons personalizados para empresas e formaturas', seoTitle: 'Moletom personalizado com capuz', searchName: 'moletom personalizado' },
  calcas: { h1: 'Calças profissionais para uniforme', seoTitle: 'Calça pied de poule e calça de tactel para uniforme', searchName: 'calça para uniforme' },
  gastronomia: { h1: 'Dólmãs e aventais personalizados para restaurantes', seoTitle: 'Dólmã e avental personalizado para restaurante', searchName: 'dólmã e avental personalizado' },
  jalecos: { h1: 'Jalecos personalizados com nome bordado', seoTitle: 'Jaleco personalizado com nome bordado', searchName: 'jaleco personalizado' },
}

export function categoryFromUrl(url: string): CategorySlug | null {
  const hit = (Object.entries(CATEGORY_URL) as [CategorySlug, string][]).find(([, u]) => u === url)
  return hit ? hit[0] : null
}

export function productsOf(category: CategorySlug): readonly Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

function unique<T>(list: readonly T[]): T[] {
  return [...new Set(list)]
}

export function categoryFacts(category: CategorySlug) {
  const products = productsOf(category)
  const prices = products.flatMap((p) => p.fabrics.map((f) => fabricPrice(f)))
  const techniques = unique(products.flatMap((p) => p.techniques)) as TechniqueSlug[]
  const segments = unique(products.flatMap((p) => p.segments)) as SegmentSlug[]
  const fabrics = unique(products.flatMap((p) => p.fabrics.map((f) => f.label)))
  const guides = unique(products.flatMap((p) => p.fabrics.map((f) => FABRIC_ID_TO_GUIDE[f.id]).filter((g) => g !== undefined)))
  return {
    products,
    min: Math.min(...prices.map((p) => p.atacado)),
    max: Math.max(...prices.map((p) => p.varejo)),
    techniques,
    segments,
    fabrics,
    guides,
  }
}

function listPt(items: readonly string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

export function categoryFaq(category: CategorySlug): Faq[] {
  const cat = CATEGORY_BY_SLUG[category]
  const seo = CATEGORY_SEO[category]
  const f = categoryFacts(category)
  const techniqueLinks = f.techniques.map((t) => `[${TECHNIQUE_BY_SLUG[t].name.toLowerCase()}](${ROUTES.tecnica(t)})`)
  return [
    {
      q: `Quanto custa ${seo.searchName} na UNIK?`,
      a: `Na linha ${cat.name}, os preços de referência começam em ${formatBRL(f.min)} por peça no atacado (a partir de ${ATACADO_MIN} peças do mesmo modelo), já com personalização simples. O valor final depende do tecido, da técnica, do número de cores e posições da arte e da quantidade. Veja a tabela completa em [quanto custa uniforme personalizado](${ROUTES.guia('quanto-custa-uniforme-personalizado')}).`,
    },
    {
      q: `Quais tecidos estão disponíveis na linha ${cat.name}?`,
      a: `Os tecidos disponíveis são: ${listPt(f.fabrics)}. Cada modelo mostra os seus tecidos com o preço de cada um, e o [guia de tecidos](${ROUTES.tecidos}) explica as diferenças de toque, caimento e durabilidade.`,
    },
    {
      q: `Como o logo da empresa é aplicado?`,
      a: `Nesta linha trabalhamos com ${listPt(techniqueLinks)}. A equipe indica a técnica mais adequada para o tecido e a quantidade, e envia um mockup para aprovação antes da produção.`,
    },
    {
      q: `A partir de quantas peças vale o preço de atacado?`,
      a: `O preço de atacado vale a partir de ${ATACADO_MIN} peças do mesmo modelo, somando todos os tamanhos da grade (do PP ao G3). Pedidos menores também são atendidos, com o preço unitário de referência.`,
    },
    {
      q: `Como faço o orçamento para a minha empresa?`,
      a: `Escolha o modelo no [catálogo](${ROUTES.catalogo}), selecione tecido, cor, quantidade por tamanho e personalização, e adicione ao [orçamento](${ROUTES.orcamento}). Com a lista pronta, um clique envia tudo organizado para o WhatsApp da UNIK, e a resposta vem com valores e prazo.`,
    },
  ]
}

export function productFaq(product: Product): Faq[] {
  const cat = CATEGORY_BY_SLUG[product.category]
  const min = startingPrice(product)
  return [
    {
      q: `Qual é o preço da ${product.name} personalizada?`,
      a: `A ${product.name} custa a partir de ${formatBRL(min)} por peça no atacado (${ATACADO_MIN}+ peças do mesmo modelo), já com personalização simples. Abaixo de ${ATACADO_MIN} peças vale o preço unitário de cada tecido, mostrado no configurador acima.`,
    },
    {
      q: `Quais tecidos a ${product.name} tem?`,
      a: product.fabrics.map((f) => `${f.label} (${f.note.replace(/ · /g, ', ')})`).join('; ') + '.',
    },
    {
      q: `Quais personalizações combinam com a ${product.name}?`,
      a: `Esta peça aceita ${listPt(product.techniques.map((t) => TECHNIQUE_BY_SLUG[t].name.toLowerCase()))}. O mockup da arte é enviado para aprovação antes da produção.`,
    },
    {
      q: `Para que tipo de empresa a ${product.name} é indicada?`,
      a: `É indicada para ${listPt(product.segments.map((s) => SEGMENT_BY_SLUG[s].name.toLowerCase()))}. Ela faz parte da linha ${cat.name} da UNIK.`,
    },
  ]
}

export const ALL_CATEGORIES = CATEGORIES
