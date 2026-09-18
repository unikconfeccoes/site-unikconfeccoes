import Link from 'next/link'
import { ContentLayout } from '@/components/seo/ContentLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/seo/RichText'
import styles from '@/components/seo/Content.module.css'
import { GLOSSARY } from '@/data/seo/glossary'
import { ROUTES } from '@/data/seo/routes'
import { absoluteUrl, pageMeta, stripMarkup } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Glossário de confecção e uniformes',
  description: `${GLOSSARY.length} termos de confecção explicados: gramatura, ribana, piquet, DTF, sublimação, private label, grade de tamanhos e mais.`,
  path: ROUTES.glossario,
})

/**
 * Glossário: definições curtas, com âncora própria (#termo). É o formato que
 * assistentes de IA mais citam: pergunta direta, resposta em uma frase.
 */
export default function GlossarioPage() {
  const letters = [...new Set(GLOSSARY.map((t) => t.term[0]?.toUpperCase() ?? ''))]
  return (
    <ContentLayout
      crumbs={[{ name: 'Glossário', path: ROUTES.glossario }]}
      kicker="Glossário"
      title={
        <>
          Glossário de <em>confecção</em>
        </>
      }
      lead={`Os ${GLOSSARY.length} termos que aparecem quando uma empresa compra uniformes, explicados em uma ou duas frases. Clique no termo para aprofundar.`}
      meta={<span>{letters.join(' · ')}</span>}
      ctaContext="glossário"
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Glossário de confecção e uniformes',
          url: absoluteUrl(ROUTES.glossario),
          hasDefinedTerm: GLOSSARY.map((t) => ({
            '@type': 'DefinedTerm',
            name: t.term,
            description: stripMarkup(t.definition),
            url: absoluteUrl(`${ROUTES.glossario}#${t.slug}`),
          })),
        }}
      />
      <dl className={styles.section}>
        {GLOSSARY.map((t) => (
          <div key={t.slug} id={t.slug} className={styles.note} style={{ scrollMarginTop: '7rem' }}>
            <dt className={styles.cardTitle}>{t.href ? <Link href={t.href}>{t.term}</Link> : t.term}</dt>
            <dd className={styles.cardText}>
              <RichText text={t.definition} />
            </dd>
          </div>
        ))}
      </dl>
    </ContentLayout>
  )
}
