import { notFound } from 'next/navigation'
import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { GUIDES } from '@/data/seo/guides'
import { ROUTES, type GuideSlug } from '@/data/seo/routes'
import { articleJsonLd, pageMeta } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

type Props = { params: Promise<{ guia: string }> }

const bySlug = (slug: string) => GUIDES.find((g) => g.slug === slug)

export function generateStaticParams() {
  return GUIDES.map((g) => ({ guia: g.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const g = bySlug((await params).guia)
  if (!g) return {}
  return {
    ...pageMeta({ title: g.seoTitle, description: g.description, path: ROUTES.guia(g.slug as GuideSlug), type: 'article' }),
    other: { 'article:modified_time': g.updated },
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

/** GUIA: artigo longo, com Article + FAQPage no JSON-LD e data de atualização visível. */
export default async function GuiaPage({ params }: Props) {
  const g = bySlug((await params).guia)
  if (!g) notFound()
  const path = ROUTES.guia(g.slug as GuideSlug)

  return (
    <ContentLayout
      crumbs={[
        { name: 'Guias', path: ROUTES.guias },
        { name: g.title, path },
      ]}
      kicker={g.kicker}
      title={g.title}
      lead={g.lead}
      meta={
        <>
          <span>Leitura de {g.readingMinutes} min</span>
          <span>
            Atualizado em <time dateTime={g.updated}>{formatDate(g.updated)}</time>
          </span>
          <span>Por UNIK Confecções</span>
        </>
      }
      toc={[...g.sections.map((s) => ({ id: s.id, title: s.title })), { id: 'perguntas', title: 'Perguntas frequentes' }]}
      ctaContext={g.title}
      after={<RelatedLinks title="Leia também" items={relatedFrom(g.related)} />}
    >
      <JsonLd data={articleJsonLd({ title: g.title, description: g.description, path, updated: g.updated, section: g.kicker })} />
      <ContentSections sections={g.sections} />
      <FaqList faq={g.faq} />
    </ContentLayout>
  )
}
