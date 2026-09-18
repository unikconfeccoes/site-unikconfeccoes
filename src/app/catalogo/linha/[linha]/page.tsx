import { notFound } from 'next/navigation'
import { ContentLayout } from '@/components/seo/ContentLayout'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { PriceTable } from '@/components/seo/ContentBlocks'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { ProductCard } from '@/components/catalog/ProductCard'
import styles from '@/components/seo/Content.module.css'
import { CATEGORIES, CATEGORY_BY_SLUG, SEGMENT_BY_SLUG, TECHNIQUE_BY_SLUG } from '@/data/catalog'
import { ATACADO_MIN } from '@/data/site'
import { CATEGORY_URL, ROUTES } from '@/data/seo/routes'
import { CATEGORY_SEO, categoryFacts, categoryFaq, categoryFromUrl } from '@/lib/catalog-seo'
import { formatPrice } from '@/lib/format'
import { itemListJsonLd, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ linha: CATEGORY_URL[c.slug] }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params
  const slug = categoryFromUrl(linha)
  if (!slug) return {}
  const f = categoryFacts(slug)
  return pageMeta({
    title: `${CATEGORY_SEO[slug].seoTitle} em Brasília`,
    description: `${CATEGORY_BY_SLUG[slug].description} ${f.products.length} modelos${f.min !== null ? `, a partir de ${formatPrice(f.min)} por peça no atacado` : ''}. Orçamento online para empresas.`,
    path: ROUTES.linha(slug),
  })
}

/**
 * Página de LINHA (categoria) com URL de busca: /catalogo/linha/camisas-polo.
 * É a página que responde "camisa polo personalizada para empresa": modelos,
 * preço de referência, tecidos, técnicas, para quem serve e FAQ, tudo
 * derivado dos dados do catálogo.
 */
export default async function LinhaPage({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params
  const slug = categoryFromUrl(linha)
  if (!slug) notFound()
  const cat = CATEGORY_BY_SLUG[slug]
  const seo = CATEGORY_SEO[slug]
  const f = categoryFacts(slug)
  const faq = categoryFaq(slug)

  return (
    <ContentLayout
      crumbs={[
        { name: 'Catálogo', path: ROUTES.catalogo },
        { name: 'Linhas', path: ROUTES.linhas },
        { name: cat.name, path: ROUTES.linha(slug) },
      ]}
      kicker={`Linha ${cat.name}`}
      title={seo.h1}
      lead={`${cat.description} São ${f.products.length} ${f.products.length === 1 ? 'modelo' : 'modelos'} produzidos em Brasília com o logo da sua empresa${f.min !== null ? `, com preço de referência a partir de **${formatPrice(f.min)} por peça** no atacado (${ATACADO_MIN}+ peças do mesmo modelo)` : ', com preço sob consulta'}.`}
      meta={
        <>
          <span>{f.products.length} modelos</span>
          <span>{f.fabrics.length} tecidos</span>
          <span>{f.techniques.length} técnicas</span>
        </>
      }
      toc={[
        { id: 'modelos', title: 'Modelos' },
        ...(f.min !== null ? [{ id: 'precos', title: 'Preços de referência' }] : []),
        { id: 'personalizacao', title: 'Personalização' },
        { id: 'para-quem', title: 'Para quais empresas' },
        { id: 'perguntas', title: 'Perguntas frequentes' },
      ]}
      ctaContext={`linha ${cat.name}`}
      after={
        <RelatedLinks
          title="Outras linhas"
          items={CATEGORIES.filter((c) => c.slug !== slug).map((c) => ({
            href: ROUTES.linha(c.slug),
            kicker: 'Linha',
            title: CATEGORY_SEO[c.slug].h1,
            text: c.description,
          }))}
        />
      }
    >
      <JsonLd data={itemListJsonLd(seo.h1, f.products.map((p) => ({ name: p.name, path: ROUTES.produto(p.slug) })))} />

      <section id="modelos" className={styles.section} aria-labelledby="modelos-t">
        <h2 id="modelos-t" className={styles.h2}>
          Modelos da linha {cat.name}
        </h2>
        <p className={styles.p}>
          Clique no modelo para escolher tecido, cor, quantidade por tamanho e personalização, e adicionar ao orçamento.
        </p>
        <ul className={styles.products}>
          {f.products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} sizes="(min-width: 1024px) 18vw, 45vw" />
            </li>
          ))}
        </ul>
      </section>

      {f.min !== null ? (
      <section id="precos" className={styles.section} aria-labelledby="precos-t">
        <h2 id="precos-t" className={styles.h2}>
          Preços de referência
        </h2>
        <p className={styles.p}>
          A tabela mostra o valor por peça de cada tecido. O preço de atacado vale a partir de {ATACADO_MIN} peças do mesmo
          modelo, somando todos os tamanhos. O valor final é confirmado no orçamento, conforme técnica, cores e posições da
          arte.
        </p>
        <PriceTable category={slug} />
      </section>
      ) : null}

      <section id="personalizacao" className={styles.section} aria-labelledby="personalizacao-t">
        <h2 id="personalizacao-t" className={styles.h2}>
          Como o logo é aplicado
        </h2>
        <div className={styles.cards}>
          {f.techniques.map((t) => (
            <a key={t} href={ROUTES.tecnica(t)} className={styles.card}>
              <span className={styles.cardTitle}>{TECHNIQUE_BY_SLUG[t].name}</span>
              <span className={styles.cardText}>{TECHNIQUE_BY_SLUG[t].lead} Ideal para: {TECHNIQUE_BY_SLUG[t].ideal.toLowerCase()}.</span>
            </a>
          ))}
        </div>
      </section>

      <section id="para-quem" className={styles.section} aria-labelledby="para-quem-t">
        <h2 id="para-quem-t" className={styles.h2}>
          Para quais empresas
        </h2>
        <div className={styles.cards}>
          {f.segments.map((s) => (
            <a key={s} href={ROUTES.segmento(s)} className={styles.card}>
              <span className={styles.cardTitle}>{SEGMENT_BY_SLUG[s].name}</span>
              <span className={styles.cardText}>{SEGMENT_BY_SLUG[s].line}</span>
            </a>
          ))}
        </div>
      </section>

      <FaqList faq={faq} />
    </ContentLayout>
  )
}
