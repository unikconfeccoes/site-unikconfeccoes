'use client'

import { useRef } from 'react'
import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Cta } from '@/components/primitives/Cta'
import { Display, Eyebrow, Label, Serif } from '@/components/primitives/Typography'
import { SOCIAL } from '@/data/site'
import { useGsapOn } from '@/hooks/useGsap'
import styles from './Portfolio.module.css'

const WORKS = [
  { photoId: 'versa', client: 'Restaurante Versá', detail: 'Bordado em dólmã' },
  { photoId: 'instituto-federal', client: 'Instituto Federal', detail: 'Serigrafia · terceirão 2026' },
  { photoId: 'polos', client: 'Polos corporativas', detail: 'Bordado e bandeira na manga' },
  { photoId: 'criadores', client: 'Criadores do Futuro', detail: 'Camiseta com etiqueta UNIK' },
  { photoId: 'dtf', client: 'Coleção autoral', detail: 'DTF em camiseta preta' },
  { photoId: 'lab-serigrafia', client: 'UNIK Lab', detail: 'Serigrafia em malha bege' },
] as const

const ROW_A = [...WORKS, ...WORKS]
const ROW_B = [...WORKS.slice(3), ...WORKS, ...WORKS.slice(0, 3)]

/**
 * FEITO PELA UNIK — duas faixas de trabalho real que correm em sentidos
 * opostos conforme a página rola. O movimento é do scroll (scrub), não de um
 * relógio: parar de rolar para a faixa, e quem quer olhar uma peça consegue.
 */
export function Portfolio() {
  const root = useRef<HTMLDivElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const trigger = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        gsap.fromTo('[data-row="a"]', { xPercent: 0 }, { xPercent: -28, ease: 'none', scrollTrigger: trigger })
        gsap.fromTo('[data-row="b"]', { xPercent: -28 }, { xPercent: 0, ease: 'none', scrollTrigger: trigger })
      })
      return () => mm.revert()
    },
    [],
  )

  return (
    <Section id="portfolio" atmosphere="grafite" labelledBy="portfolio-title">
      <div ref={root} className={styles.root}>
        <header className={`u-container ${styles.head}`}>
          <div className={styles.titleBlock}>
            <Eyebrow index="06">Portfólio</Eyebrow>
            <Display id="portfolio-title" size="2">
              Feito pela <Serif>UNIK</Serif>
            </Display>
          </div>
          <Cta href={SOCIAL.instagram.url} external variant="line">
            Ver mais no Instagram
          </Cta>
        </header>

        {(['a', 'b'] as const).map((row) => (
          <div key={row} className={styles.band}>
            <ul data-row={row} className={styles.row}>
              {(row === 'a' ? ROW_A : ROW_B).map((w, i) => (
                <li key={`${w.photoId}-${i}`} className={styles.item} aria-hidden={i >= WORKS.length || undefined}>
                  <Media photoId={w.photoId} garment="tee" alt={`${w.client}: ${w.detail}`} sizes="(min-width: 1024px) 20vw, 60vw" motion="none" />
                  <div className={styles.caption}>
                    <span className={styles.client}>{w.client}</span>
                    <Label size="xs" muted>
                      {w.detail}
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
