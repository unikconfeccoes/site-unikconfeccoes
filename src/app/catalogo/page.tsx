import type { Metadata } from 'next'
import { PageHero } from '@/components/primitives/PageHero'
import { Section } from '@/components/primitives/Section'
import { CatalogExplorer } from '@/components/catalog/CatalogExplorer'
import { Label } from '@/components/primitives/Typography'
import { CATEGORIES, PRODUCTS, SEGMENTS, type CategorySlug, type SegmentSlug } from '@/data/catalog'
import { ATACADO_MIN } from '@/data/site'

export const metadata: Metadata = {
  title: 'Catálogo de uniformes',
  description: `${PRODUCTS.length} modelos em ${CATEGORIES.length} linhas: polos, camisetas, dry fit, sociais, moletons, calças, dólmãs, aventais e jalecos. Preços a partir do atacado (${ATACADO_MIN}+ peças).`,
  alternates: { canonical: '/catalogo' },
}

const isCategory = (v: unknown): v is CategorySlug => CATEGORIES.some((c) => c.slug === v)
const isSegment = (v: unknown): v is SegmentSlug => SEGMENTS.some((s) => s.slug === v)

export default async function CatalogoPage({ searchParams }: PageProps<'/catalogo'>) {
  const params = await searchParams
  const categoria = params.categoria
  const segmento = params.segmento

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
          <CatalogExplorer
            initialCategory={isCategory(categoria) ? categoria : null}
            initialSegment={isSegment(segmento) ? segmento : null}
          />
        </div>
      </Section>
    </>
  )
}
