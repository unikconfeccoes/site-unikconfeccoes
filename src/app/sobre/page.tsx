import { ContentLayout } from '@/components/seo/ContentLayout'
import { ContentSections } from '@/components/seo/ContentBlocks'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { COMMERCIAL, SITE, SOCIAL } from '@/data/site'
import { ROUTES } from '@/data/seo/routes'
import type { ContentSection } from '@/data/seo/types'
import { pageMeta } from '@/lib/seo'
import { relatedFrom } from '@/lib/site-index'

export const metadata = pageMeta({
  title: 'Sobre a UNIK Confecções',
  description: `A UNIK Confecções é especializada em uniformes profissionais em ${SITE.city} desde ${SITE.founded}, e mantém o UNIK Lab, sua área de private label.`,
  path: ROUTES.sobre,
})

const SECTIONS: ContentSection[] = [
  {
    id: 'quem-somos',
    title: 'Quem somos',
    blocks: [
      { kind: 'p', text: `A UNIK Confecções é uma empresa especializada em uniformes profissionais, fundada em ${SITE.founded} em ${SITE.city}. O lema da casa resume o trabalho: transformar o seu sonho em realidade, peça por peça.` },
      { kind: 'p', text: 'Produzimos uniformes para empresas de todos os portes: polos, camisetas, camisas sociais, jalecos, dólmãs, aventais, calças, shorts e casacos, personalizados com bordado, serigrafia, DTF, sublimação e alto relevo.' },
    ],
  },
  {
    id: 'pilares',
    title: 'Nossos pilares',
    blocks: [
      {
        kind: 'ul',
        items: [
          '**Uniformes premium:** tecido certo e modelagem certa para o uso real de cada equipe.',
          '**Personalização completa:** cinco técnicas para aplicar a marca. Veja [personalização](/personalizacao).',
          '**Compromisso com a entrega:** o prazo é combinado no orçamento e cumprido.',
          `**Atendimento próximo:** ${COMMERCIAL.reuniao.charAt(0).toLowerCase()}${COMMERCIAL.reuniao.slice(1)}`,
        ],
      },
    ],
  },
  {
    id: 'duas-marcas',
    title: 'Duas marcas, uma confecção',
    blocks: [
      { kind: 'p', text: '**UNIK Confecções** cuida dos uniformes profissionais para empresas. **UNIK Lab** é a área de private label, que desenvolve roupas com a etiqueta de marcas próprias, do tecido à peça-piloto. Conheça o [UNIK Lab](/lab).' },
      { kind: 'p', text: `Acompanhe o trabalho no Instagram: [${SOCIAL.instagram.handle}](${SOCIAL.instagram.url}) e [${SOCIAL.instagramLab.handle}](${SOCIAL.instagramLab.url}).` },
    ],
  },
]

export default function SobrePage() {
  return (
    <ContentLayout
      crumbs={[{ name: 'Sobre', path: ROUTES.sobre }]}
      kicker="Sobre a UNIK"
      title={
        <>
          Especialistas em <em>uniformes</em> desde {SITE.founded}
        </>
      }
      lead={`A UNIK Confecções é especializada em uniformes profissionais para empresas, em ${SITE.city}, desde ${SITE.founded}.`}
      toc={SECTIONS.map((s) => ({ id: s.id, title: s.title }))}
      ctaContext="página sobre"
      after={<RelatedLinks title="Conheça mais" items={relatedFrom([ROUTES.empresas, ROUTES.brasilia, ROUTES.lab, ROUTES.catalogo])} />}
    >
      <ContentSections sections={SECTIONS} />
    </ContentLayout>
  )
}
