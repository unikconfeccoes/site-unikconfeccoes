'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Cta } from '@/components/primitives/Cta'
import { Display, Eyebrow, Label, Serif } from '@/components/primitives/Typography'
import { CATEGORIES, categoryStartingPrice, productsInCategory } from '@/data/catalog'
import { formatBRL } from '@/lib/format'
import { useGsapOn } from '@/hooks/useGsap'
import { scheduleRefresh } from '@/lib/motion/refresh'
import styles from './Categorias.module.css'

/**
 * O MIX — as oito linhas numa arara que corre na horizontal.
 *
 * No desktop com mouse a seção prende e o scroll vertical vira deslocamento
 * horizontal da arara (pin + scrub). Em toque, a arara é um carrossel nativo
 * com scroll-snap: o dedo já sabe rolar de lado, sequestrar o gesto só
 * atrapalharia.
 */

const PINNED = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function Categorias() {
  const root = useRef<HTMLDivElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const track = el.querySelector<HTMLElement>('[data-track]')
      const viewport = el.querySelector<HTMLElement>('[data-viewport]')
      if (!track || !viewport) return
      const mm = gsap.matchMedia()

      mm.add(PINNED, () => {
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Cada cartão inclina levemente conforme atravessa a tela: a arara
        // balança, não desliza como esteira.
        el.querySelectorAll<HTMLElement>('[data-card-media]').forEach((media) => {
          gsap.fromTo(
            media,
            { rotate: 2.5, yPercent: 4 },
            {
              rotate: -2.5,
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: media,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        gsap.to('[data-progress]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        })

        scheduleRefresh()
      })

      return () => mm.revert()
    },
    [],
  )

  return (
    <Section id="catalogo" atmosphere="grafite" bleed labelledBy="categorias-title">
      <div ref={root} className={styles.root}>
        <div className={`u-container ${styles.head}`}>
          <div className={styles.titleBlock}>
            <Eyebrow index="02">O mix</Eyebrow>
            <Display id="categorias-title" size="2">
              Oito linhas, <Serif>uma</Serif> assinatura
            </Display>
          </div>
          <div className={styles.headAside}>
            <Label size="xs" muted>
              Preços de referência por peça · atacado
            </Label>
            <Cta href="/catalogo" variant="line">
              Catálogo completo
            </Cta>
          </div>
        </div>

        <div data-viewport className={styles.viewport}>
          <ul data-track className={styles.track}>
            {CATEGORIES.map((cat, i) => {
              const price = categoryStartingPrice(cat.slug)
              const models = productsInCategory(cat.slug).length
              return (
                <li key={cat.slug} className={styles.item}>
                  <Link href={`/catalogo?categoria=${cat.slug}`} className={styles.card} data-cursor="Ver linha">
                    <div className={styles.cardTop}>
                      <Label size="xs" numeric className={styles.index}>
                        {String(i + 1).padStart(2, '0')} / {String(CATEGORIES.length).padStart(2, '0')}
                      </Label>
                      <Label size="xs" muted>
                        {models} {models === 1 ? 'modelo' : 'modelos'}
                      </Label>
                    </div>
                    <div data-card-media className={styles.cardMedia}>
                      <Media garment={cat.garment} alt={`Silhueta da linha ${cat.name}`} sizes="(min-width: 1024px) 22vw, 75vw" ratio={1} tone="raised" motion="none" caption="Foto em produção" />
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.name}>{cat.name}</h3>
                      <p className={styles.desc}>{cat.description}</p>
                      {price !== null ? (
                        <p className={styles.price}>
                          <span>a partir de</span> <strong className="u-tnum">{formatBRL(price)}</strong>
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              )
            })}
            <li className={`${styles.item} ${styles.end}`}>
              <Link href="/catalogo" className={styles.endCard}>
                <span className={styles.endTitle}>
                  Ver todos os <Serif>modelos</Serif>
                </span>
                <span className={styles.endArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={`u-container ${styles.progressWrap}`} aria-hidden="true">
          <span className={styles.progressTrack}>
            <span data-progress className={styles.progress} />
          </span>
        </div>
      </div>
    </Section>
  )
}
