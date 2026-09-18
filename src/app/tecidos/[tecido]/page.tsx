import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/seo/RichText'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { ProductCard } from '@/components/catalog/ProductCard'
import styles from '@/components/seo/Content.module.css'
import { PRODUCTS, TECHNIQUE_BY_SLUG } from '@/data/catalog'
import { FABRIC_GUIDES } from '@/data/seo/fabrics'
import { FABRIC_ID_TO_GUIDE, ROUTES, type FabricSlug } from '@/data/seo/routes'
import { absoluteUrl, pageMeta } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

type Props = { params: Promise<{ tecido: string }> }

const bySlug = (slug: string) => FABRIC_GUIDES.find((f) => f.slug === slug)

export function generateStaticParams() {
  return FABRIC_GUIDES.map((f) => ({ tecido: f.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const f = bySlug((await params).tecido)
  if (!f) return {}
  return pageMeta({
    title: `Tecido ${f.name}: o que é e quando usar em uniformes`,
    description: f.summary,
    path: ROUTES.tecido(f.slug as FabricSlug),
    keywords: [f.name, ...f.aka],
  })
}

/**
 * Página de TECIDO: responde "o que é malha PV", "piquet é bom para
 * uniforme?". Os modelos que usam o tecido saem do catálogo (via
 * FABRIC_ID_TO_GUIDE), então a página sempre mostra o que existe de fato.
 */
export default async function TecidoPage({ params }: Props) {
  const f = bySlug((await params).tecido)
  if (!f) notFound()
  const path = ROUTES.tecido(f.slug as FabricSlug)
  const products = PRODUCTS.filter((p) => p.fabrics.some((fab) => FABRIC_ID_TO_GUIDE[fab.id] === f.slug))
  const others = FABRIC_GUIDES.filter((x) => x.slug !== f.slug)
    .slice(0, 6)
    .map((x) => ROUTES.tecido(x.slug as FabricSlug))

  return (
    <ContentLayout
      crumbs={[
        { name: 'Tecidos', path: ROUTES.tecidos },
        { name: f.name, path },
      ]}
      kicker="Guia de tecidos"
      title={`Tecido ${f.name}`}
      lead={f.definition}
      meta={f.aka.length ? <span>Também chamado de: {f.aka.join(', ')}</span> : undefined}
      toc={[
        { id: 'ficha', title: 'Ficha do tecido' },
        { id: 'uso', title: 'Quando usar' },
        { id: 'cuidados', title: 'Cuidados' },
        ...(products.length ? [{ id: 'modelos', title: 'Modelos neste tecido' }] : []),
        ...f.sections.map((s) => ({ id: s.id, title: s.title })),
        { id: 'perguntas', title: 'Perguntas frequentes' },
      ]}
      ctaContext={`tecido ${f.name}`}
      after={<RelatedLinks title="Outros tecidos" items={relatedFrom([ROUTES.guia('tecidos-para-uniforme'), ...others])} />}
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: f.name,
          alternateName: f.aka,
          description: f.summary,
          url: absoluteUrl(path),
          inDefinedTermSet: absoluteUrl(ROUTES.tecidos),
        }}
      />

      <section id="ficha" className={styles.section} aria-labelledby="ficha-t">
        <h2 id="ficha-t" className={styles.h2}>
          Ficha do tecido {f.name}
        </h2>
        <p className={styles.p}>
          <strong>Composição:</strong> {f.composition}
        </p>
        <dl className={styles.specs}>
          {f.traits.map((t) => (
            <div key={t.label} className={styles.spec}>
              <dt className={styles.specLabel}>{t.label}</dt>
              <dd className={styles.specValue}>{t.value}</dd>
            </div>
          ))}
        </dl>
        {f.techniques.length ? (
          <p className={styles.p}>
            <strong>Personalização indicada:</strong>{' '}
            {f.techniques.map((t, i) => (
              <span key={t}>
                {i > 0 ? ', ' : ''}
                <Link href={ROUTES.tecnica(t)}>{TECHNIQUE_BY_SLUG[t].name}</Link>
              </span>
            ))}
            .
          </p>
        ) : null}
      </section>

      <section id="uso" className={styles.section} aria-labelledby="uso-t">
        <h2 id="uso-t" className={styles.h2}>
          Quando usar {f.name} no uniforme
        </h2>
        <div className={styles.twoCols}>
          <div className={styles.section}>
            <h3 className={styles.h3}>Indicado para</h3>
            <ul className={styles.ul}>
              {f.idealFor.map((x, i) => (
                <li key={i}>
                  <RichText text={x} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <h3 className={styles.h3}>Evite para</h3>
            <ul className={styles.ul}>
              {f.avoidFor.map((x, i) => (
                <li key={i}>
                  <RichText text={x} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="cuidados" className={styles.section} aria-labelledby="cuidados-t">
        <h2 id="cuidados-t" className={styles.h2}>
          Cuidados de lavagem
        </h2>
        <ul className={styles.ul}>
          {f.care.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      {products.length ? (
        <section id="modelos" className={styles.section} aria-labelledby="modelos-t">
          <h2 id="modelos-t" className={styles.h2}>
            Modelos da UNIK em {f.name}
          </h2>
          <ul className={styles.products}>
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} sizes="(min-width: 1024px) 16vw, 45vw" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ContentSections sections={f.sections} />
      <FaqList faq={f.faq} />
    </ContentLayout>
  )
}
