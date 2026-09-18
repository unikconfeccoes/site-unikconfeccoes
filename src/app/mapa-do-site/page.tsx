import Link from 'next/link'
import { ContentLayout } from '@/components/seo/ContentLayout'
import styles from '@/components/seo/Content.module.css'
import { ROUTES } from '@/data/seo/routes'
import { pageMeta } from '@/lib/seo'
import { GROUP_LABEL, siteIndex, type SitemapGroup } from '@/lib/site-index'

export const metadata = pageMeta({
  title: 'Mapa do site',
  description: 'Todas as páginas do site da UNIK Confecções: catálogo, modelos, segmentos, personalização, tecidos e guias.',
  path: ROUTES.mapa,
})

/**
 * Mapa do site em HTML. Garante que TODA página tenha pelo menos um link
 * interno apontando para ela (nenhuma página órfã), mesmo as que não estão
 * no menu principal.
 */
export default function MapaPage() {
  const pages = siteIndex()
  const groups = Object.keys(GROUP_LABEL) as SitemapGroup[]
  return (
    <ContentLayout
      crumbs={[{ name: 'Mapa do site', path: ROUTES.mapa }]}
      kicker="Mapa do site"
      title="Todas as páginas"
      lead={`O site da UNIK tem ${pages.length} páginas, organizadas por tema.`}
      toc={groups.map((g) => ({ id: `grupo-${g}`, title: GROUP_LABEL[g] }))}
    >
      {groups.map((g) => (
        <section key={g} id={`grupo-${g}`} className={styles.section} aria-labelledby={`grupo-${g}-t`}>
          <h2 id={`grupo-${g}-t`} className={styles.h2}>
            {GROUP_LABEL[g]}
          </h2>
          <ul className={styles.ul}>
            {pages
              .filter((p) => p.group === g)
              .map((p) => (
                <li key={p.path}>
                  <Link href={p.path}>{p.title}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </ContentLayout>
  )
}
