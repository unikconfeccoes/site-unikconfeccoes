import type { Metadata } from 'next'
import { PageHero } from '@/components/primitives/PageHero'
import { Section } from '@/components/primitives/Section'
import { QuoteView } from '@/components/quote/QuoteView'
import { Label } from '@/components/primitives/Typography'
import { ATACADO_MIN } from '@/data/site'

export const metadata: Metadata = {
  title: 'Orçamento',
  description: 'Monte a lista de uniformes com modelo, tecido, grade de tamanhos e personalização e envie o orçamento pelo WhatsApp.',
  alternates: { canonical: '/orcamento' },
  // Página de estado do visitante: não há o que indexar.
  robots: { index: false, follow: true },
}

export default function OrcamentoPage() {
  return (
    <>
      <PageHero
        id="orcamento-title"
        eyebrow="Orçamento"
        title={
          <>
            Sua <em>lista</em>
          </>
        }
        aside={
          <>
            <Label size="xs" muted>
              Resposta com valores e prazo
            </Label>
            <Label size="xs" muted>
              Atacado a partir de {ATACADO_MIN} peças do mesmo modelo
            </Label>
          </>
        }
      >
        Revise os itens, ajuste a grade de tamanhos e envie tudo organizado para o WhatsApp da UNIK.
      </PageHero>
      <Section atmosphere="atelier" tight>
        <div className="u-container">
          <QuoteView />
        </div>
      </Section>
    </>
  )
}
