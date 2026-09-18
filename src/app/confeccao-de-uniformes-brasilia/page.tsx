import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { FaqList } from '@/components/seo/FaqList'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { ATACADO_MIN, COMMERCIAL, PEDIDO_MINIMO, SITE, WHATSAPP } from '@/data/site'
import { ROUTES } from '@/data/seo/routes'
import type { ContentSection, Faq } from '@/data/seo/types'
import { pageMeta } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

export const metadata = pageMeta({
  title: 'Confecção de uniformes em Brasília (DF) para empresas',
  description: 'Confecção de uniformes em Brasília desde 2016: polos, camisetas, jalecos, dólmãs e mais, com bordado, serigrafia, DTF e sublimação. Reunião presencial no DF.',
  path: ROUTES.brasilia,
  keywords: ['confecção de uniformes Brasília', 'uniformes Brasília', 'fábrica de uniformes DF', 'uniformes personalizados Brasília'],
})

const SECTIONS: ContentSection[] = [
  {
    id: 'o-que-fazemos',
    title: 'O que a UNIK produz em Brasília',
    blocks: [
      { kind: 'p', text: 'A UNIK é uma confecção especializada em uniformes profissionais. Em Brasília, produzimos o mix completo de uma empresa:' },
      {
        kind: 'ul',
        items: [
          '[Camisas polo](/catalogo/linha/camisas-polo) em piquet, PV, algodão e suedine.',
          '[Camisetas](/catalogo/linha/camisetas-personalizadas) em PV, algodão fio 30.1, suedine e algodões premium (pima, egípcio e peruano).',
          '[Linha dry fit](/catalogo/linha/camisetas-dry-fit) em poliéster e poliamida, com e sem elastano, e proteção UV.',
          '[Camisas sociais](/catalogo/linha/camisas-sociais) em tricoline, tricoline com elastano, algodão e linho.',
          '[Jalecos](/catalogo/linha/jalecos-personalizados) em brim, gabardine e oxford.',
          '[Dólmãs e aventais](/catalogo/linha/dolmas-e-aventais) para cozinha e salão.',
          '[Calças](/catalogo/linha/calcas-profissionais), [shorts](/catalogo/linha/shorts) e [casacos](/catalogo/linha/casacos-e-moletons).',
        ],
      },
    ],
  },
  {
    id: 'vantagem-local',
    title: 'A vantagem de uma confecção em Brasília',
    blocks: [
      { kind: 'p', text: 'Comprar uniforme de uma confecção da própria cidade simplifica o processo para empresas do Distrito Federal:' },
      {
        kind: 'ul',
        items: [
          '**Reunião presencial:** você vê os tecidos e as peças de perto antes de decidir.',
          '**Conversa direta:** orçamento, arte e ajustes pelo WhatsApp, com quem produz.',
          '**Reposição simples:** o modelo fica registrado para os próximos pedidos.',
        ],
      },
      {
        kind: 'note',
        title: 'Condições',
        text: `Pedido mínimo de ${PEDIDO_MINIMO.total} peças (dois produtos, pelo menos ${PEDIDO_MINIMO.porProduto} iguais de cada), atacado a partir de ${ATACADO_MIN} peças do mesmo modelo e ${COMMERCIAL.pagamento.charAt(0).toLowerCase()}${COMMERCIAL.pagamento.slice(1)}`,
      },
    ],
  },
  {
    id: 'segmentos',
    title: 'Empresas que atendemos',
    blocks: [
      {
        kind: 'p',
        text: 'Atendemos [empresas e escritórios](/uniformes/uniformes-corporativos), [restaurantes](/uniformes/uniformes-para-restaurantes), [hotéis](/uniformes/uniformes-para-hotelaria), [lojas](/uniformes/uniformes-para-lojas-e-varejo), [clínicas](/uniformes/uniformes-para-clinicas-e-saude), [escolas e formaturas](/uniformes/uniformes-escolares-e-formatura), [equipes esportivas](/uniformes/uniformes-esportivos) e [eventos](/uniformes/camisetas-para-eventos).',
      },
    ],
  },
]

const FAQ: Faq[] = [
  { q: 'Onde fica a UNIK Confecções?', a: `A UNIK Confecções fica em ${SITE.city}, no Distrito Federal, e produz uniformes profissionais desde ${SITE.founded}.` },
  { q: 'Posso visitar a UNIK para ver os produtos?', a: `Sim. ${COMMERCIAL.reuniao} Combine pelo WhatsApp ${WHATSAPP.display}.` },
  { q: 'Qual é o pedido mínimo de uniformes em Brasília?', a: COMMERCIAL.minimo },
  { q: 'Quanto tempo leva para produzir os uniformes?', a: COMMERCIAL.prazo },
]

export default function BrasiliaPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Confecção de uniformes em Brasília', path: ROUTES.brasilia }]}
      kicker={`${SITE.city}, ${SITE.state}`}
      title={
        <>
          Confecção de uniformes em <em>Brasília</em>
        </>
      }
      lead={`A UNIK Confecções é uma confecção de uniformes profissionais em ${SITE.city}, no Distrito Federal, desde ${SITE.founded}. Produzimos uniformes para empresas com bordado, serigrafia, DTF, sublimação e alto relevo, e recebemos clientes para reuniões presenciais.`}
      toc={[...SECTIONS.map((s) => ({ id: s.id, title: s.title })), { id: 'perguntas', title: 'Perguntas frequentes' }]}
      ctaContext="confecção em Brasília"
      after={<RelatedLinks title="Veja também" items={relatedFrom([ROUTES.empresas, ROUTES.catalogo, ROUTES.uniformes, ROUTES.sobre])} />}
    >
      <ContentSections sections={SECTIONS} />
      <FaqList faq={FAQ} />
    </ContentLayout>
  )
}
