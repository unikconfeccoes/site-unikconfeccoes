import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/primitives/Section'
import { ProductView } from '@/components/catalog/ProductView'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Display, Eyebrow, Serif } from '@/components/primitives/Typography'
import { CATEGORY_BY_SLUG, PRODUCTS, PRODUCT_BY_SLUG, startingPrice } from '@/data/catalog'
import { formatPrice } from '@/lib/format'
import { SITE } from '@/data/site'
import styles from './page.module.css'
import seoStyles from '@/components/seo/Content.module.css'
import Link from 'next/link'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { SEGMENT_BY_SLUG, TECHNIQUE_BY_SLUG } from '@/data/catalog'
import { FABRIC_ID_TO_GUIDE, ROUTES } from '@/data/seo/routes'
import { productFaq } from '@/lib/catalog-seo'
import { absoluteUrl, breadcrumbJsonLd, ORG_ID } from '@/lib/seo'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/catalogo/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCT_BY_SLUG[slug]
  if (!product) return {}
  return {
    title: `${product.name} personalizada`,
    description: `${product.summary} ${product.fabrics.length} opções de tecido, ${startingPrice(product) === null ? 'Preço sob consulta.' : `A partir de ${formatPrice(startingPrice(product))} por peça no atacado.`}`,
    alternates: { canonical: `/catalogo/${product.slug}` },
  }
}

export default async function ProductPage({ params }: PageProps<'/catalogo/[slug]'>) {
  const { slug } = await params
  const product = PRODUCT_BY_SLUG[slug]
  if (!product) notFound()

  // Relacionados: primeiro a mesma linha, depois quem serve o mesmo segmento.
  const related = [
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category !== product.category && p.segments.some((s) => product.segments.includes(s))),
  ].slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.summary,
    category: CATEGORY_BY_SLUG[product.category].name,
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@id': ORG_ID },
    url: absoluteUrl(ROUTES.produto(product.slug)),
    image: absoluteUrl(`${ROUTES.produto(product.slug)}/opengraph-image`),
    material: product.fabrics.map((f) => f.label).join(', '),
    ...(startingPrice(product) !== null
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BRL',
            lowPrice: startingPrice(product)?.toFixed(2),
            offerCount: product.fabrics.length,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Faixa escura curta: mantém o header no tom de sempre e dá à página o
          mesmo começo das outras. */}
      <div className={styles.band} data-atmosphere="noite" data-section="noite" aria-hidden="true" />
      <Section atmosphere="atelier" tight>
        <div className="u-container">
          <ProductView product={product} />
        </div>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Catálogo', path: ROUTES.catalogo },
          { name: CATEGORY_BY_SLUG[product.category].name, path: ROUTES.linha(product.category) },
          { name: product.name, path: ROUTES.produto(product.slug) },
        ])}
      />

      {/* Sobre o modelo: texto rastreável e links para os guias. O
          configurador acima é interativo; esta parte é a que o Google lê. */}
      <Section atmosphere="atelier" tight className={styles.related}>
        <div className={`u-container ${styles.about}`}>
          <section className={seoStyles.section} aria-labelledby="sobre-modelo-t">
            <h2 id="sobre-modelo-t" className={seoStyles.h2}>
              Sobre a {product.name}
            </h2>
            <p className={seoStyles.p}>
              {product.summary} Faz parte da linha{' '}
              <Link href={ROUTES.linha(product.category)}>{CATEGORY_BY_SLUG[product.category].name}</Link> e é produzida pela
              UNIK em Brasília, com o logo da sua empresa.
            </p>
            <ul className={seoStyles.ul}>
              <li>
                <strong>Tecidos:</strong>{' '}
                {product.fabrics.map((f, i) => {
                  const guide = FABRIC_ID_TO_GUIDE[f.id]
                  return (
                    <span key={f.id}>
                      {i > 0 ? ', ' : ''}
                      {guide ? <Link href={ROUTES.tecido(guide)}>{f.label}</Link> : f.label}
                    </span>
                  )
                })}
                .
              </li>
              <li>
                <strong>Personalização:</strong>{' '}
                {product.techniques.map((t, i) => (
                  <span key={t}>
                    {i > 0 ? ', ' : ''}
                    <Link href={ROUTES.tecnica(t)}>{TECHNIQUE_BY_SLUG[t].name}</Link>
                  </span>
                ))}
                .
              </li>
              <li>
                <strong>Indicado para:</strong>{' '}
                {product.segments.map((s, i) => (
                  <span key={s}>
                    {i > 0 ? ', ' : ''}
                    <Link href={ROUTES.segmento(s)}>{SEGMENT_BY_SLUG[s].name}</Link>
                  </span>
                ))}
                .
              </li>
              <li>
                <strong>Tamanhos:</strong> {product.sizes.join(', ')}.
              </li>
            </ul>
          </section>
          <FaqList faq={productFaq(product)} />
        </div>
      </Section>

      {related.length ? (
        <Section atmosphere="atelier" tight className={styles.related}>
          <div className="u-container">
            <header className={styles.relatedHead}>
              <Eyebrow>Combina com</Eyebrow>
              <Display size="3">
                Monte o <Serif>kit</Serif>
              </Display>
            </header>
            <ul className={styles.relatedGrid}>
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </>
  )
}
