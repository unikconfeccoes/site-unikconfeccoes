import { PageHero } from '@/components/primitives/PageHero'
import { Cta } from '@/components/primitives/Cta'

export default function NotFound() {
  return (
    <PageHero
      id="nf-title"
      eyebrow="404"
      title={
        <>
          Peça <em>fora</em> do mostruário
        </>
      }
      aside={
        <Cta href="/catalogo" size="lg">
          Ver catálogo
        </Cta>
      }
    >
      A página que você procurou não existe ou mudou de lugar.
    </PageHero>
  )
}
