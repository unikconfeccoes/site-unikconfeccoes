import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Categorias } from '@/components/sections/Categorias'
import { Processo } from '@/components/sections/Processo'
import { Tecnicas } from '@/components/sections/Tecnicas'
import { Segmentos } from '@/components/sections/Segmentos'
import { Portfolio } from '@/components/sections/Portfolio'
import { LabTeaser } from '@/components/sections/LabTeaser'
import { Perguntas } from '@/components/sections/Perguntas'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { FAQ } from '@/data/faq'
import { SITE } from '@/data/site'

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Uniformes premium em Brasília desde 2016` },
  alternates: { canonical: '/' },
}

/**
 * A jornada.
 *
 *  1. HERÓI      a marca — e a barra do "i" que se abre sobre o trabalho real
 *  2. MANIFESTO  a promessa: orgulho de vestir, compromisso de entregar
 *  3. O MIX      as oito linhas, com preço "a partir de"
 *  4. PROCESSO   como um pedido anda, do briefing à entrega
 *  5. TÉCNICAS   as cinco personalizações, cada uma com o seu uso
 *  6. SEGMENTOS  para quem — cada ofício leva ao catálogo filtrado
 *  7. PORTFÓLIO  a prova: peças reais do Instagram
 *  8. UNIK LAB   a porta para quem quer marca própria
 *  9. PERGUNTAS  o que ficou por responder
 * 10. DECISÃO    a única faixa em bronze: orçamento ou WhatsApp
 *
 * As atmosferas alternam (noite → atelier → grafite → atelier → noite …)
 * para que a página respire entre claro e escuro.
 */
export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <Manifesto />
      <Categorias />
      <Processo />
      <Tecnicas />
      <Segmentos />
      <Portfolio />
      <LabTeaser />
      <Perguntas />
      <CtaFinal />
    </>
  )
}
