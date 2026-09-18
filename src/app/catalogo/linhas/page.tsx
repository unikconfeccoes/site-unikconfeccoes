import { ContentLayout } from '@/components/seo/ContentLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from '@/components/seo/Content.module.css'
import { CATEGORIES, PRODUCTS } from '@/data/catalog'
import { ATACADO_MIN } from '@/data/site'
import { ROUTES } from '@/data/seo/routes'
import { CATEGORY_SEO, categoryFacts } from '@/lib/catalog-seo'
import { formatBRL } from '@/lib/format'
import { itemListJsonLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Linhas de uniformes: polos, camisetas, dólmãs, jalecos e mais',
  description: `As ${CATEGORIES.length} linhas de uniformes da UNIK, com ${PRODUCTS.length} modelos e preços de referência no atacado. Confecção para empresas em Brasília.`,
  path: ROUTES.linhas,
})

export default function LinhasPage() {
  return (
    <ContentLayout
      crumbs={[
        { name: 'Catálogo', path: ROUTES.catalogo },
        { name: 'Linhas', path: ROUTES.linhas },
      ]}
      kicker="Catálogo por linha"
      title="Linhas de uniformes para empresas"
      lead={`A UNIK organiza o catálogo em ${CATEGORIES.length} linhas, uma para cada tipo de peça. Todas são produzidas com o logo da sua empresa, com preço de atacado a partir de ${ATACADO_MIN} peças do mesmo modelo.`}
      ctaContext="linhas de uniformes"
    >
      <JsonLd data={itemListJsonLd('Linhas de uniformes UNIK', CATEGORIES.map((c) => ({ name: CATEGORY_SEO[c.slug].h1, path: ROUTES.linha(c.slug) })))} />
      <section className={styles.section}>
        <div className={styles.cards}>
          {CATEGORIES.map((c) => {
            const f = categoryFacts(c.slug)
            return (
              <a key={c.slug} href={ROUTES.linha(c.slug)} className={styles.card}>
                <span className={styles.cardTitle}>{CATEGORY_SEO[c.slug].h1}</span>
                <span className={styles.cardText}>{c.description}</span>
                <span className={styles.cardText}>
                  {f.products.length} modelos · a partir de <strong>{formatBRL(f.min)}</strong>
                </span>
              </a>
            )
          })}
        </div>
      </section>
    </ContentLayout>
  )
}
