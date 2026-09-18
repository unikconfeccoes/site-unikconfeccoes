import type { Metadata } from 'next'
import { PageHero } from '@/components/primitives/PageHero'
import { Section } from '@/components/primitives/Section'
import { CatalogExplorer } from '@/components/catalog/CatalogExplorer'
import { CnpjShortcut } from '@/components/quote/CnpjShortcut'
import { Label } from '@/components/primitives/Typography'
import { CATEGORIES, PRODUCTS, SEGMENTS, type CategorySlug, type SegmentSlug } from '@/data/catalog'
import { ATACADO_MIN } from '@/data/site'

export const metadata: Metadata = {
  title: 'Catálogo de uniformes',
  description: `${PRODUCTS.length} modelos de uniformes profissionais em ${CATEGORIES.length} linhas: polos, camisetas, dry fit, sociais, jalecos, dólmãs, aventais, calças, shorts e casacos. Atacado a partir de ${ATACADO_MIN} peças.`,
  alternates: { canonical: '/catalogo' },
}

const isCategory = (v: unknown): v is CategorySlug => CATEGORIES.some((c) => c.slug === v)
const isSegment = (v: unknown): v is SegmentSlug => SEGMENTS.some((s) => s.slug === v)

export default async function CatalogoPage({ searchParams }: PageProps<'/catalogo'>) {
  const params = await searchParams
  const categoria = params.categoria
  const segmento = params.segmento
  const busca = typeof params.busca === 'string' ? params.busca.slice(0, 80) : ''

  return (
    <>
      <PageHero
        id="catalogo-title"
        eyebrow="Catálogo"
        title={
          <>
            O mix <em>completo</em>
          </>
        }
        aside={
          <>
            <Label size="xs" muted>
              {PRODUCTS.length} modelos · {CATEGORIES.length} linhas
            </Label>
            <Label size="xs" muted>
              Preços de referência por peça, a partir do atacado ({ATACADO_MIN}+ pç)
            </Label>
          </>
        }
      >
        Escolha o modelo, o tecido e a grade de tamanhos. Monte a lista e envie o orçamento completo pelo WhatsApp em
        um clique.
      </PageHero>

      <Section atmosphere="atelier" tight>
        <div className="u-container">
          <div style={{ maxInlineSize: '40rem', marginBlockEnd: 'var(--space-lg)' }}>
            <CnpjShortcut variant="catalog" />
          </div>
          <CatalogExplorer
            initialCategory={isCategory(categoria) ? categoria : null}
            initialSegment={isSegment(segmento) ? segmento : null}
            initialQuery={busca}
          />
        </div>
      </Section>
    </>
  )
}
