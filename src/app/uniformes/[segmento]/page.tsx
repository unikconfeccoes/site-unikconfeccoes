import { notFound } from 'next/navigation'
import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/seo/RichText'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { ProductCard } from '@/components/catalog/ProductCard'
import styles from '@/components/seo/Content.module.css'
import { PRODUCT_BY_SLUG, SEGMENT_BY_SLUG } from '@/data/catalog'
import { ROUTES, SEGMENT_URL } from '@/data/seo/routes'
import { SEGMENT_PAGES } from '@/data/seo/segments'
import { itemListJsonLd, pageMeta, serviceJsonLd } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

type Props = { params: Promise<{ segmento: string }> }

const bySlug = (url: string) => SEGMENT_PAGES.find((p) => SEGMENT_URL[p.segment] === url)

export function generateStaticParams() {
  return SEGMENT_PAGES.map((p) => ({ segmento: SEGMENT_URL[p.segment] }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const page = bySlug((await params).segmento)
  if (!page) return {}
  return pageMeta({ title: page.seoTitle, description: page.description, path: ROUTES.segmento(page.segment) })
}

/**
 * Página de SEGMENTO: a resposta para "uniforme para restaurante",
 * "uniforme corporativo em Brasília" etc. Estrutura fixa: resposta direta,
 * necessidades do setor, kit por função com produtos reais, conteúdo e FAQ.
 */
export default async function SegmentoPage({ params }: Props) {
  const page = bySlug((await params).segmento)
  if (!page) notFound()
  const seg = SEGMENT_BY_SLUG[page.segment]
  const kitProducts = [...new Set(page.kit.flatMap((k) => k.products))].map((s) => PRODUCT_BY_SLUG[s]).filter((p) => p !== undefined)

  const others = SEGMENT_PAGES.filter((p) => p.segment !== page.segment).map((p) => ROUTES.segmento(p.segment))

  return (
    <ContentLayout
      crumbs={[
        { name: 'Uniformes', path: ROUTES.uniformes },
        { name: seg.name, path: ROUTES.segmento(page.segment) },
      ]}
      kicker={`Uniformes · ${seg.name}`}
      title={page.h1}
      lead={page.lead}
      toc={[
        { id: 'necessidades', title: 'O que o setor precisa' },
        { id: 'kit', title: 'Peças por função' },
        ...page.sections.map((s) => ({ id: s.id, title: s.title })),
        { id: 'perguntas', title: 'Perguntas frequentes' },
      ]}
      ctaContext={`uniformes para ${seg.name.toLowerCase()}`}
      after={<RelatedLinks title="Outros segmentos" items={relatedFrom([...others, ROUTES.guia('como-escolher-uniforme-para-empresa'), ROUTES.empresas])} />}
    >
      <JsonLd data={serviceJsonLd({ name: page.h1, description: page.description, path: ROUTES.segmento(page.segment), serviceType: 'Confecção de uniformes profissionais' })} />
      <JsonLd data={itemListJsonLd(`Uniformes para ${seg.name}`, kitProducts.map((p) => ({ name: p.name, path: ROUTES.produto(p.slug) })))} />

      <section id="necessidades" className={styles.section} aria-labelledby="necessidades-t">
        <h2 id="necessidades-t" className={styles.h2}>
          O que o uniforme de {seg.name.toLowerCase()} precisa resolver
        </h2>
        <div className={styles.cards}>
          {page.needs.map((n) => (
            <div key={n.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{n.title}</h3>
              <p className={styles.cardText}>
                <RichText text={n.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="kit" className={styles.section} aria-labelledby="kit-t">
        <h2 id="kit-t" className={styles.h2}>
          Peças recomendadas por função
        </h2>
        {page.kit.map((k) => (
          <div key={k.role} className={styles.section}>
            <h3 className={styles.h3}>{k.role}</h3>
            <p className={styles.p}>
              <RichText text={k.note} />
            </p>
            <ul className={styles.products}>
              {k.products
                .map((s) => PRODUCT_BY_SLUG[s])
                .filter((p) => p !== undefined)
                .map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} sizes="(min-width: 1024px) 16vw, 45vw" />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <ContentSections sections={page.sections} />
      <FaqList faq={page.faq} />
    </ContentLayout>
  )
}
