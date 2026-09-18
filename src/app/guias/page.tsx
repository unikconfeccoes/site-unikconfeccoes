import { ContentLayout } from '@/components/seo/ContentLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from '@/components/seo/Content.module.css'
import { GUIDES } from '@/data/seo/guides'
import { ROUTES, type GuideSlug } from '@/data/seo/routes'
import { itemListJsonLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Guias sobre uniformes para empresas',
  description: 'Como escolher uniforme, quanto custa, qual técnica de personalização usar, como montar a grade de tamanhos e como comprar no atacado.',
  path: ROUTES.guias,
})

export default function GuiasPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Guias', path: ROUTES.guias }]}
      kicker="Guias"
      title={
        <>
          Tudo o que você precisa saber para comprar <em>uniformes</em>
        </>
      }
      lead="Guias práticos para quem compra uniformes para empresas: compras, RH, marketing e gestores. Cada um responde uma dúvida real do processo, do tecido ao pedido."
      ctaContext="guias"
    >
      <JsonLd data={itemListJsonLd('Guias sobre uniformes', GUIDES.map((g) => ({ name: g.title, path: ROUTES.guia(g.slug as GuideSlug) })))} />
      <section className={styles.section}>
        <div className={styles.cards}>
          {GUIDES.map((g) => (
            <a key={g.slug} href={ROUTES.guia(g.slug as GuideSlug)} className={styles.card}>
              <span className={styles.specLabel}>
                {g.kicker} · {g.readingMinutes} min
              </span>
              <span className={styles.cardTitle}>{g.title}</span>
              <span className={styles.cardText}>{g.description}</span>
            </a>
          ))}
        </div>
      </section>
    </ContentLayout>
  )
}
