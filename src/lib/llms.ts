import { CATEGORIES, PRODUCTS, TECHNIQUE_BY_SLUG, fabricPrice, startingPrice } from '@/data/catalog'
import { ATACADO_MIN, COMMERCIAL, PEDIDO_MINIMO, SITE, SOCIAL, WHATSAPP } from '@/data/site'
import { FABRIC_GUIDES } from '@/data/seo/fabrics'
import { FAQ_GROUPS } from '@/data/seo/faq-full'
import { GLOSSARY } from '@/data/seo/glossary'
import { GUIDES } from '@/data/seo/guides'
import { ROUTES } from '@/data/seo/routes'
import type { Block, ContentSection } from '@/data/seo/types'
import { CATEGORY_SEO } from '@/lib/catalog-seo'
import { formatPrice } from '@/lib/format'
import { stripMarkup } from '@/lib/seo'
import { GROUP_LABEL, siteIndex, type SitemapGroup } from '@/lib/site-index'

/**
 * llms.txt: o site explicado para assistentes de IA (padrão llmstxt.org).
 *
 * Markdown puro, com os FATOS primeiro (quem é, onde, desde quando, regras
 * comerciais), porque é isso que um assistente cita ao responder "onde
 * comprar uniforme para empresa em Brasília". Tudo gerado dos mesmos dados
 * do site: se o catálogo mudar, o arquivo muda junto.
 */

const url = (path: string) => `${SITE.url}${path === '/' ? '' : path}`

function facts(): string[] {
  return [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    '## Fatos',
    '',
    `- ${COMMERCIAL.especialidade} Atende empresas (B2B).`,
    `- Localização: ${SITE.city}, ${SITE.state}, Brasil. Fundada em ${SITE.founded}.`,
    `- Pedido mínimo: ${PEDIDO_MINIMO.total} peças, podendo combinar ${PEDIDO_MINIMO.produtos} produtos com pelo menos ${PEDIDO_MINIMO.porProduto} peças iguais de cada.`,
    `- Preço de atacado: a partir de ${ATACADO_MIN} peças do mesmo modelo.`,
    `- Pagamento: ${COMMERCIAL.pagamento}`,
    `- Prazo: ${COMMERCIAL.prazo}`,
    `- Atendimento: ${COMMERCIAL.reuniao}`,
    `- Personalização: ${Object.values(TECHNIQUE_BY_SLUG).map((t) => t.name).join(', ')}.`,
    `- Tamanhos: PP ao G3.`,
    `- Contato: WhatsApp ${WHATSAPP.display} (${`https://wa.me/${WHATSAPP.number}`}). Instagram ${SOCIAL.instagram.handle}.`,
    `- Private label: UNIK Lab (${url(ROUTES.lab)}), Instagram ${SOCIAL.instagramLab.handle}.`,
    '',
  ]
}

export function llmsIndex(): string {
  const lines = facts()
  const pages = siteIndex()
  for (const g of Object.keys(GROUP_LABEL) as SitemapGroup[]) {
    lines.push(`## ${GROUP_LABEL[g]}`, '')
    for (const p of pages.filter((x) => x.group === g)) lines.push(`- [${p.title}](${url(p.path)}): ${p.description}`)
    lines.push('')
  }
  lines.push('## Opcional', '', `- [Conteúdo completo em texto](${url('/llms-full.txt')}): catálogo com preços, FAQ, tecidos, guias e glossário.`, '')
  return lines.join('\n')
}

function blockText(b: Block): string[] {
  switch (b.kind) {
    case 'p':
      return [stripMarkup(b.text), '']
    case 'ul':
    case 'ol':
      return [...b.items.map((it, i) => `${b.kind === 'ol' ? `${i + 1}.` : '-'} ${stripMarkup(it)}`), '']
    case 'note':
      return [`${b.title}: ${stripMarkup(b.text)}`, '']
    case 'table':
      return [`| ${b.head.join(' | ')} |`, `| ${b.head.map(() => '---').join(' | ')} |`, ...b.rows.map((r) => `| ${r.map(stripMarkup).join(' | ')} |`), '']
    default:
      return []
  }
}

function sectionsText(sections: readonly ContentSection[]): string[] {
  return sections.flatMap((s) => [`### ${s.title}`, '', ...s.blocks.flatMap(blockText)])
}

export function llmsFull(): string {
  const lines = facts()

  lines.push('## Catálogo e preços de referência', '')
  lines.push(`Preços por peça, com personalização simples. "Atacado" vale a partir de ${ATACADO_MIN} peças do mesmo modelo. "Sob consulta" = valor calculado no orçamento.`, '')
  for (const c of CATEGORIES) {
    lines.push(`### ${CATEGORY_SEO[c.slug].h1}`, '', `${c.description} Página: ${url(ROUTES.linha(c.slug))}`, '')
    for (const p of PRODUCTS.filter((x) => x.category === c.slug)) {
      lines.push(`- **${p.name}** (${url(ROUTES.produto(p.slug))}): ${p.summary} A partir de: ${formatPrice(startingPrice(p))}.`)
      for (const f of p.fabrics) {
        const price = fabricPrice(f)
        lines.push(`  - ${f.label}: ${price ? `${formatPrice(price.varejo)} (unitário), ${formatPrice(price.atacado)} (atacado)` : 'sob consulta'}`)
      }
    }
    lines.push('')
  }

  lines.push('## Perguntas frequentes', '')
  for (const g of FAQ_GROUPS) {
    lines.push(`### ${g.title}`, '')
    for (const f of g.items) lines.push(`**${f.q}**`, stripMarkup(f.a), '')
  }

  lines.push('## Tecidos para uniforme', '')
  for (const f of FABRIC_GUIDES) {
    lines.push(`### ${f.name}`, '', stripMarkup(f.definition), '', `Composição: ${f.composition}`, `Indicado para: ${f.idealFor.map(stripMarkup).join('; ')}`, `Página: ${url(`/tecidos/${f.slug}`)}`, '')
  }

  lines.push('## Guias', '')
  for (const g of GUIDES) {
    lines.push(`### ${g.title}`, '', `Fonte: ${url(`/guias/${g.slug}`)}`, '', stripMarkup(g.lead), '', ...sectionsText(g.sections))
  }

  lines.push('## Glossário', '')
  for (const t of GLOSSARY) lines.push(`- **${t.term}:** ${stripMarkup(t.definition)}`)
  lines.push('')

  return lines.join('\n')
}
