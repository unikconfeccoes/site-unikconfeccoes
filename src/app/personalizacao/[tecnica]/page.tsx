import { notFound } from 'next/navigation'
import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/seo/RichText'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { Media } from '@/components/primitives/Media'
import styles from '@/components/seo/Content.module.css'
import { TECHNIQUE_BY_SLUG } from '@/data/catalog'
import { ROUTES, TECHNIQUE_URL } from '@/data/seo/routes'
import { TECHNIQUE_PAGES } from '@/data/seo/techniques'
import { pageMeta, serviceJsonLd } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

type Props = { params: Promise<{ tecnica: string }> }

const bySlug = (url: string) => TECHNIQUE_PAGES.find((p) => TECHNIQUE_URL[p.technique] === url)

export function generateStaticParams() {
  return TECHNIQUE_PAGES.map((p) => ({ tecnica: TECHNIQUE_URL[p.technique] }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const page = bySlug((await params).tecnica)
  if (!page) return {}
  return pageMeta({ title: page.seoTitle, description: page.description, path: ROUTES.tecnica(page.technique) })
}

/** Página de TÉCNICA: o que é, como funciona, prós e limites, ficha comparativa, FAQ. */
export default async function TecnicaPage({ params }: Props) {
  const page = bySlug((await params).tecnica)
  if (!page) notFound()
  const tech = TECHNIQUE_BY_SLUG[page.technique]
  const others = TECHNIQUE_PAGES.filter((p) => p.technique !== page.technique).map((p) => ROUTES.tecnica(p.technique))

  return (
    <ContentLayout
      crumbs={[
        { name: 'Personalização', path: ROUTES.personalizacao },
        { name: tech.name, path: ROUTES.tecnica(page.technique) },
      ]}
      kicker={`Personalização · ${tech.name}`}
      title={page.h1}
      lead={page.lead}
      toc={[
        { id: 'como-funciona', title: 'Como funciona' },
        { id: 'vantagens', title: 'Vantagens e limites' },
        { id: 'ficha', title: 'Ficha rápida' },
        ...page.sections.map((s) => ({ id: s.id, title: s.title })),
        { id: 'perguntas', title: 'Perguntas frequentes' },
      ]}
      ctaContext={`personalização em ${tech.name.toLowerCase()}`}
      after={<RelatedLinks title="Compare com outras técnicas" items={relatedFrom([ROUTES.guia('serigrafia-bordado-dtf-ou-sublimacao'), ...others])} />}
    >
      <JsonLd data={serviceJsonLd({ name: page.h1, description: page.description, path: ROUTES.tecnica(page.technique), serviceType: `Personalização de uniformes: ${tech.name}` })} />

      <div style={{ maxInlineSize: '30rem' }}>
        <Media photoId={tech.photoId} garment={tech.garment} alt={`Exemplo de ${tech.name.toLowerCase()} em uniforme produzido pela UNIK`} sizes="30rem" caption="Foto em produção" />
      </div>

      <section id="como-funciona" className={styles.section} aria-labelledby="como-funciona-t">
        <h2 id="como-funciona-t" className={styles.h2}>
          Como funciona {tech.name.toLowerCase() === 'dtf' ? 'o DTF' : `a técnica de ${tech.name.toLowerCase()}`}
        </h2>
        <ol className={styles.ol}>
          {page.howItWorks.map((s, i) => (
            <li key={i}>
              <RichText text={s} />
            </li>
          ))}
        </ol>
      </section>

      <section id="vantagens" className={styles.section} aria-labelledby="vantagens-t">
        <h2 id="vantagens-t" className={styles.h2}>
          Vantagens e limites
        </h2>
        <div className={styles.twoCols}>
          <div className={styles.section}>
            <h3 className={styles.h3}>Vantagens</h3>
            <ul className={styles.ul}>
              {page.pros.map((p, i) => (
                <li key={i}>
                  <RichText text={p} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <h3 className={styles.h3}>Limites</h3>
            <ul className={styles.ul}>
              {page.limits.map((p, i) => (
                <li key={i}>
                  <RichText text={p} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="ficha" className={styles.section} aria-labelledby="ficha-t">
        <h2 id="ficha-t" className={styles.h2}>
          Ficha rápida
        </h2>
        <dl className={styles.specs}>
          {page.compare.map((c) => (
            <div key={c.label} className={styles.spec}>
              <dt className={styles.specLabel}>{c.label}</dt>
              <dd className={styles.specValue}>{c.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ContentSections sections={page.sections} />
      <FaqList faq={page.faq} />
    </ContentLayout>
  )
}
