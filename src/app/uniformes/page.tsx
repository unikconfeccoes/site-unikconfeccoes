import { ContentLayout } from '@/components/seo/ContentLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from '@/components/seo/Content.module.css'
import { SEGMENT_BY_SLUG } from '@/data/catalog'
import { ROUTES } from '@/data/seo/routes'
import { SEGMENT_PAGES } from '@/data/seo/segments'
import { itemListJsonLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Uniformes profissionais por segmento',
  description: 'Uniformes para empresas, restaurantes, hotéis, lojas, clínicas, escolas, esporte e eventos. Confecção especializada em Brasília.',
  path: ROUTES.uniformes,
})

export default function UniformesPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Uniformes', path: ROUTES.uniformes }]}
      kicker="Uniformes por segmento"
      title={
        <>
          Uniformes profissionais para cada <em>tipo de empresa</em>
        </>
      }
      lead="Cada setor pede um uniforme diferente: a cozinha precisa aguentar calor e lavagem pesada, a recepção precisa de elegância, a equipe de campo precisa de proteção do sol. Escolha o seu segmento para ver as peças, os tecidos e a personalização indicados."
      ctaContext="uniformes por segmento"
    >
      <JsonLd data={itemListJsonLd('Uniformes por segmento', SEGMENT_PAGES.map((p) => ({ name: p.h1, path: ROUTES.segmento(p.segment) })))} />
      <section className={styles.section}>
        <div className={styles.cards}>
          {SEGMENT_PAGES.map((p) => (
            <a key={p.segment} href={ROUTES.segmento(p.segment)} className={styles.card}>
              <span className={styles.cardTitle}>{p.h1}</span>
              <span className={styles.cardText}>{SEGMENT_BY_SLUG[p.segment].line}</span>
            </a>
          ))}
        </div>
      </section>
    </ContentLayout>
  )
}
