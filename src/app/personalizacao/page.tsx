import { ContentLayout } from '@/components/seo/ContentLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from '@/components/seo/Content.module.css'
import { TECHNIQUE_BY_SLUG } from '@/data/catalog'
import { ROUTES } from '@/data/seo/routes'
import { TECHNIQUE_PAGES } from '@/data/seo/techniques'
import { itemListJsonLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Personalização de uniformes: bordado, serigrafia, DTF e sublimação',
  description: 'Entenda as 5 técnicas para aplicar o logo da empresa no uniforme: bordado, serigrafia, DTF, sublimação e alto relevo. Quando usar cada uma.',
  path: ROUTES.personalizacao,
})

export default function PersonalizacaoPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Personalização', path: ROUTES.personalizacao }]}
      kicker="Personalização"
      title={
        <>
          Como o logo da empresa vai para o <em>uniforme</em>
        </>
      }
      lead="Personalizar é aplicar a marca na peça. Existem cinco técnicas, e cada uma tem um uso ideal: bordado para acabamento nobre, serigrafia para grandes volumes, DTF para artes coloridas, sublimação para estampa total e alto relevo para peças de assinatura. Veja qual combina com o seu pedido."
      ctaContext="personalização de uniformes"
    >
      <JsonLd data={itemListJsonLd('Técnicas de personalização', TECHNIQUE_PAGES.map((p) => ({ name: p.h1, path: ROUTES.tecnica(p.technique) })))} />
      <section className={styles.section}>
        <div className={styles.cards}>
          {TECHNIQUE_PAGES.map((p) => (
            <a key={p.technique} href={ROUTES.tecnica(p.technique)} className={styles.card}>
              <span className={styles.cardTitle}>{TECHNIQUE_BY_SLUG[p.technique].name}</span>
              <span className={styles.cardText}>{TECHNIQUE_BY_SLUG[p.technique].lead}</span>
              <span className={styles.cardText}>Ideal para: {TECHNIQUE_BY_SLUG[p.technique].ideal.toLowerCase()}</span>
            </a>
          ))}
          <a href={ROUTES.guia('serigrafia-bordado-dtf-ou-sublimacao')} className={styles.card}>
            <span className={styles.cardTitle}>Comparativo completo</span>
            <span className={styles.cardText}>Serigrafia, bordado, DTF ou sublimação: qual escolher para o uniforme da sua empresa.</span>
          </a>
        </div>
      </section>
    </ContentLayout>
  )
}
