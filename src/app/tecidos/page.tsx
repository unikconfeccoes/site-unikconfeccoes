import { ContentLayout } from '@/components/seo/ContentLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from '@/components/seo/Content.module.css'
import { FABRIC_GUIDES } from '@/data/seo/fabrics'
import { ROUTES, type FabricSlug } from '@/data/seo/routes'
import { absoluteUrl, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Guia de tecidos para uniforme: PV, piquet, dry fit, algodão e mais',
  description: `Os ${FABRIC_GUIDES.length} tecidos mais usados em uniformes profissionais explicados: composição, toque, durabilidade, cuidados e quando usar cada um.`,
  path: ROUTES.tecidos,
})

export default function TecidosPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Tecidos', path: ROUTES.tecidos }]}
      kicker="Guia de tecidos"
      title={
        <>
          Tecidos para uniforme, <em>explicados</em>
        </>
      }
      lead={`O tecido decide conforto, durabilidade e aparência do uniforme depois de muitas lavagens. Este guia explica os ${FABRIC_GUIDES.length} tecidos que a UNIK usa, em linguagem simples, para você escolher com segurança. Para uma visão geral, leia [qual tecido escolher para uniforme](/guias/tecidos-para-uniforme).`}
      ctaContext="guia de tecidos"
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Tecidos para uniforme',
          url: absoluteUrl(ROUTES.tecidos),
          hasDefinedTerm: FABRIC_GUIDES.map((f) => ({
            '@type': 'DefinedTerm',
            name: f.name,
            description: f.summary,
            url: absoluteUrl(ROUTES.tecido(f.slug as FabricSlug)),
          })),
        }}
      />
      <section className={styles.section}>
        <div className={styles.cards}>
          {FABRIC_GUIDES.map((f) => (
            <a key={f.slug} href={ROUTES.tecido(f.slug as FabricSlug)} className={styles.card}>
              <span className={styles.cardTitle}>{f.name}</span>
              <span className={styles.cardText}>{f.summary}</span>
            </a>
          ))}
        </div>
      </section>
    </ContentLayout>
  )
}
