'use client'

import { Fragment, useRef } from 'react'
import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Eyebrow, Label } from '@/components/primitives/Typography'
import { CATEGORIES, PRODUCTS, TECHNIQUES } from '@/data/catalog'
import { ATACADO_MIN, SITE } from '@/data/site'
import { useGsapOn } from '@/hooks/useGsap'
import styles from './Manifesto.module.css'

/**
 * MANIFESTO — o texto acende palavra por palavra enquanto a página rola.
 *
 * É o ritmo de quem lê: cada palavra sai de 14% para 100% de opacidade quando
 * o scroll passa por ela, então a leitura e o movimento andam juntos. As duas
 * palavras que carregam a promessa ("orgulho", "compromisso") entram na didone
 * itálica — a mesma do CONFECÇÕES do logo.
 *
 * Os números do rodapé saem dos dados, nunca da mão: se um modelo entrar no
 * catálogo, a contagem muda sozinha. Números que dependem do cliente (peças
 * entregues, clientes atendidos) ficam de fora até serem informados.
 */

type Word = { text: string; serif?: true }

const TEXT: readonly Word[] = [
  ...'Desde 2016 a UNIK transforma ideias em uniformes que as pessoas têm'.split(' ').map((text) => ({ text })),
  { text: 'orgulho', serif: true },
  ...'de vestir. Tecido certo, modelagem certa, personalização impecável e o'.split(' ').map((text) => ({ text })),
  { text: 'compromisso', serif: true },
  ...'de entregar no dia combinado.'.split(' ').map((text) => ({ text })),
]

const DATA = [
  { label: 'Fundação', value: String(SITE.founded) },
  { label: 'Linhas', value: String(CATEGORIES.length).padStart(2, '0') },
  { label: 'Modelos', value: String(PRODUCTS.length) },
  { label: 'Técnicas', value: String(TECHNIQUES.length).padStart(2, '0') },
  { label: 'Atacado a partir de', value: `${ATACADO_MIN} pç` },
]

export function Manifesto() {
  const root = useRef<HTMLDivElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const words = el.querySelectorAll<HTMLElement>('[data-word]')
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el.querySelector('[data-text]'), start: 'top 78%', end: 'bottom 45%', scrub: 0.5 },
          },
        )
        gsap.fromTo(
          el.querySelectorAll('[data-datum]'),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: el.querySelector('[data-data]'), start: 'top 88%', once: true } },
        )
      })
      return () => mm.revert()
    },
    [],
  )

  return (
    <Section id="manifesto" atmosphere="atelier" labelledBy="manifesto-title">
      <div ref={root} className={`u-container ${styles.grid}`}>
        <div className={styles.head}>
          <Eyebrow index="01">Manifesto</Eyebrow>
          <h2 id="manifesto-title" className="u-visually-hidden">
            Manifesto UNIK
          </h2>
        </div>

        <p data-text className={styles.text}>
          {TEXT.map((word, i) => (
            <Fragment key={`${word.text}-${i}`}>
              {i > 0 ? ' ' : null}
              <span data-word className={word.serif ? styles.serif : undefined}>
                {word.text}
              </span>
            </Fragment>
          ))}
        </p>

        <figure className={styles.figure}>
          <Media
            photoId="criadores"
            garment="tee"
            alt="Camiseta azul-marinho com a frase Criadores do Futuro e a etiqueta UNIK na gola"
            sizes="(min-width: 1024px) 30vw, 90vw"
            parallax={12}
          />
          <figcaption className={styles.caption}>
            <Label size="xs" muted>
              Etiqueta UNIK · bordado na frente
            </Label>
          </figcaption>
        </figure>

        <dl data-data className={styles.data}>
          {DATA.map((d) => (
            <div key={d.label} data-datum className={styles.datum}>
              <dt>
                <Label size="xs" muted>
                  {d.label}
                </Label>
              </dt>
              <dd className={styles.value}>{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
