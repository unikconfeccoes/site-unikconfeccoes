import { ContentLayout } from '@/components/seo/ContentLayout'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQ_ALL, FAQ_GROUPS } from '@/data/seo/faq-full'
import { ROUTES } from '@/data/seo/routes'
import { faqJsonLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Perguntas frequentes sobre uniformes personalizados',
  description: 'Pedido mínimo, preço de atacado, pagamento, prazo, personalização, tecidos e reunião presencial: todas as respostas sobre uniformes da UNIK.',
  path: ROUTES.faq,
})

/** Todas as perguntas, agrupadas por tema. Um FAQPage único cobre a página. */
export default function FaqPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Perguntas frequentes', path: ROUTES.faq }]}
      kicker="Perguntas frequentes"
      title={
        <>
          Tudo o que as empresas <em>perguntam</em>
        </>
      }
      lead={`As ${FAQ_ALL.length} dúvidas mais comuns sobre pedido, preço, pagamento, produção e personalização de uniformes, respondidas de forma direta.`}
      toc={FAQ_GROUPS.map((g) => ({ id: `faq-${g.id}`, title: g.title }))}
      ctaContext="perguntas frequentes"
    >
      <JsonLd data={faqJsonLd(FAQ_ALL)} />
      {FAQ_GROUPS.map((g) => (
        <div key={g.id} id={`faq-${g.id}`}>
          <FaqList faq={g.items} title={g.title} withSchema={false} />
        </div>
      ))}
    </ContentLayout>
  )
}
