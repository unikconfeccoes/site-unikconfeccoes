import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/primitives/Section'
import { ProductView } from '@/components/catalog/ProductView'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Display, Eyebrow, Serif } from '@/components/primitives/Typography'
import { CATEGORY_BY_SLUG, PRODUCTS, PRODUCT_BY_SLUG, startingPrice } from '@/data/catalog'
import { formatBRL } from '@/lib/format'
import { SITE } from '@/data/site'
import styles from './page.module.css'

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
    description: `${product.summary} ${product.fabrics.length} opções de tecido, a partir de ${formatBRL(startingPrice(product))} por peça no atacado.`,
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
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: startingPrice(product).toFixed(2),
      offerCount: product.fabrics.length,
    },
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
