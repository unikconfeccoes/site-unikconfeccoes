import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { FaqList } from '@/components/seo/FaqList'
import { JsonLd } from '@/components/seo/JsonLd'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import styles from '@/components/seo/Content.module.css'
import { CATEGORIES, PRODUCTS } from '@/data/catalog'
import { ATACADO_MIN, COMMERCIAL, PEDIDO_MINIMO, SITE } from '@/data/site'
import { ROUTES } from '@/data/seo/routes'
import type { ContentSection, Faq } from '@/data/seo/types'
import { pageMeta, serviceJsonLd } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

export const metadata = pageMeta({
  title: 'Uniformes para empresas: confecção B2B em Brasília',
  description: `Confecção especializada em uniformes profissionais para empresas. Pedido mínimo de ${PEDIDO_MINIMO.total} peças, atacado a partir de ${ATACADO_MIN}, 50% de entrada e reunião presencial em Brasília.`,
  path: ROUTES.empresas,
})

const PILLARS = [
  { title: 'Especializada em uniformes', text: 'A UNIK produz uniformes profissionais desde 2016. Não é uma gráfica que também faz camiseta: é uma confecção com foco em equipe uniformizada.' },
  { title: 'Volume com padrão', text: 'Mesma cor, mesmo tom de logo e mesma modelagem em todo o lote, para a equipe inteira parecer uma equipe só.' },
  { title: 'Um mix completo', text: `${PRODUCTS.length} modelos em ${CATEGORIES.length} linhas: polos, camisetas, sociais, jalecos, dólmãs, aventais, calças, shorts e casacos. Um fornecedor para todos os setores.` },
  { title: 'Aprovação antes de produzir', text: 'Toda arte recebe um mockup mostrando posição, tamanho e cores do logo. A produção só começa com a sua aprovação.' },
]

const SECTIONS: ContentSection[] = [
  {
    id: 'como-funciona',
    title: 'Como funciona o pedido para empresas',
    blocks: [
      { kind: 'p', text: 'O pedido corporativo segue cinco passos simples. Você acompanha cada um, e uma pessoa da UNIK cuida do seu pedido do começo ao fim.' },
      {
        kind: 'ol',
        items: [
          '**Levantamento:** você define quais funções recebem quais peças e coleta os tamanhos da equipe. O guia [como montar a grade de tamanhos](/guias/como-montar-grade-de-tamanhos) ajuda nessa etapa.',
          '**Orçamento:** monte a lista no [catálogo](/catalogo) (modelo, tecido, cor, tamanhos e personalização) e envie pelo site. A resposta vem com valores e prazo.',
          '**Reunião, se preferir:** a UNIK recebe clientes para reuniões presenciais em Brasília, para ver tecidos e peças de perto e tirar todas as dúvidas.',
          '**Arte e aprovação:** a equipe prepara a arte para a técnica escolhida e envia o mockup. Com a aprovação e a entrada de 50%, o pedido entra em produção.',
          '**Produção e entrega:** corte, costura e personalização com conferência em cada etapa. O restante do pagamento é feito na entrega.',
        ],
      },
    ],
  },
  {
    id: 'condicoes',
    title: 'Condições comerciais',
    blocks: [
      { kind: 'p', text: 'As regras são poucas e claras, para o seu setor de compras planejar com segurança.' },
      {
        kind: 'table',
        caption: 'Condições comerciais da UNIK para pedidos de uniformes.',
        head: ['Item', 'Como funciona'],
        rows: [
          ['Pedido mínimo', `${PEDIDO_MINIMO.total} peças no total. Pode combinar ${PEDIDO_MINIMO.produtos} produtos, com pelo menos ${PEDIDO_MINIMO.porProduto} peças iguais de cada.`],
          ['Preço de atacado', `A partir de ${ATACADO_MIN} peças do mesmo modelo, somando todos os tamanhos.`],
          ['Pagamento', COMMERCIAL.pagamento],
          ['Prazo', COMMERCIAL.prazo],
          ['Tamanhos', 'Grade do PP ao G3 na maioria dos modelos.'],
          ['Atendimento', `Orçamento pelo site ou WhatsApp e reunião presencial em ${SITE.city}.`],
        ],
      },
      {
        kind: 'note',
        title: 'Exemplo prático',
        text: `Uma empresa com 45 pessoas pede 30 polos para o comercial e 15 camisas sociais para a recepção: o pedido atende o mínimo. Se pedir 60 polos do mesmo modelo, as polos entram no preço de atacado. Veja [uniformes no atacado](/guias/uniformes-no-atacado).`,
      },
    ],
  },
  {
    id: 'por-setor',
    title: 'Um uniforme para cada setor da empresa',
    blocks: [
      { kind: 'p', text: 'Empresas grandes raramente usam uma peça só. O mais comum é combinar peças por função, mantendo a mesma identidade visual:' },
      {
        kind: 'ul',
        items: [
          'Comercial e administrativo: [camisa polo](/catalogo/linha/camisas-polo) com logo bordado.',
          'Recepção e atendimento: [camisa social](/catalogo/linha/camisas-sociais) em tricoline.',
          'Operação e campo: [camiseta dry fit](/catalogo/linha/camisetas-dry-fit), [calça de brim](/catalogo/calca-brim) e [corta-vento](/catalogo/jaqueta-corta-vento).',
          'Saúde e laboratório: [jaleco profissional](/catalogo/jaleco-brim) com nome bordado.',
          'Cozinha e refeitório: [dólmã e avental](/catalogo/linha/dolmas-e-aventais).',
          'Eventos e endomarketing: [camisetas personalizadas](/catalogo/linha/camisetas-personalizadas) e [moletons](/catalogo/linha/casacos-e-moletons).',
        ],
      },
    ],
  },
  {
    id: 'reposicao',
    title: 'Reposição e novos funcionários',
    blocks: [
      { kind: 'p', text: 'Depois do primeiro pedido, o modelo, o tecido, a cor e a arte já estão definidos. Para repor peças ou uniformizar novos funcionários, basta informar os modelos e os tamanhos, respeitando o pedido mínimo.' },
    ],
  },
]

const FAQ: Faq[] = [
  { q: 'A UNIK atende empresas de grande porte?', a: 'Sim. A UNIK é especializada em uniformes profissionais e atende empresas que precisam uniformizar equipes inteiras, com peças diferentes por setor e padronização em todo o lote.' },
  { q: 'Qual é o pedido mínimo para empresas?', a: `${COMMERCIAL.minimo} Exemplo: 10 polos e 10 camisetas.` },
  { q: 'Como é o pagamento de um pedido corporativo?', a: `O pagamento é dividido em duas partes: ${COMMERCIAL.pagamento}` },
  { q: 'Posso fazer uma reunião antes de fechar o pedido?', a: `Sim. ${COMMERCIAL.reuniao} Combine o horário pelo WhatsApp.` },
  { q: 'Vocês fazem uniformes para vários setores no mesmo pedido?', a: 'Sim. Um mesmo pedido pode reunir polos, camisas sociais, jalecos, dólmãs e outras peças, todas com a mesma identidade visual.' },
]

export default function EmpresasPage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Para empresas', path: ROUTES.empresas }]}
      kicker="B2B · Uniformes para empresas"
      title={
        <>
          Uniformes profissionais para <em>empresas</em>
        </>
      }
      lead={`A UNIK Confecções é especializada em uniformes profissionais e atende empresas que precisam vestir equipes inteiras, com padrão, volume e prazo combinado. Produzimos em ${SITE.city} desde ${SITE.founded}, com pedido mínimo de ${PEDIDO_MINIMO.total} peças e preço de atacado a partir de ${ATACADO_MIN} peças do mesmo modelo.`}
      meta={
        <>
          <span>Desde {SITE.founded}</span>
          <span>{PRODUCTS.length} modelos</span>
          <span>Reunião presencial</span>
        </>
      }
      toc={[
        { id: 'por-que', title: 'Por que a UNIK' },
        ...SECTIONS.map((s) => ({ id: s.id, title: s.title })),
        { id: 'perguntas', title: 'Perguntas frequentes' },
      ]}
      ctaContext="página para empresas"
      after={
        <RelatedLinks
          title="Próximos passos"
          items={relatedFrom([ROUTES.uniformes, ROUTES.guia('como-escolher-uniforme-para-empresa'), ROUTES.guia('quanto-custa-uniforme-personalizado'), ROUTES.personalizacao, ROUTES.faq])}
        />
      }
    >
      <JsonLd data={serviceJsonLd({ name: 'Confecção de uniformes para empresas', description: SITE.description, path: ROUTES.empresas, serviceType: 'Confecção de uniformes profissionais' })} />
      <section id="por-que" className={styles.section} aria-labelledby="por-que-t">
        <h2 id="por-que-t" className={styles.h2}>
          Por que empresas escolhem a UNIK
        </h2>
        <div className={styles.cards}>
          {PILLARS.map((p) => (
            <div key={p.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardText}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <ContentSections sections={SECTIONS} />
      <FaqList faq={FAQ} />
    </ContentLayout>
  )
}
