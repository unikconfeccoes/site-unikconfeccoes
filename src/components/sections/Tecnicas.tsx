'use client'

import { useRef } from 'react'
import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Display, Eyebrow, Label, Serif } from '@/components/primitives/Typography'
import { TECHNIQUES } from '@/data/catalog'
import { useGsapOn } from '@/hooks/useGsap'
import Link from 'next/link'
import { ROUTES } from '@/data/seo/routes'
import styles from './Tecnicas.module.css'

const STACK = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/**
 * AS TÉCNICAS — cartões que se empilham como peças dobradas na bancada.
 *
 * Cada cartão é `position: sticky` com um degrau de topo maior que o anterior;
 * quando o próximo sobe e cobre, o de baixo recua (escala e escurece) por
 * scrub. O empilhamento é do CSS — o GSAP só cuida do recuo — então sem JS a
 * pilha continua funcionando, só sem a profundidade.
 */
export function Tecnicas() {
  const root = useRef<HTMLDivElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
      const mm = gsap.matchMedia()
      mm.add(STACK, () => {
        cards.slice(0, -1).forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          gsap.to(card.querySelector('[data-card-inner]'), {
            scale: 0.92,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    [],
  )

  return (
    <Section id="tecnicas" atmosphere="noite" labelledBy="tecnicas-title">
      <div ref={root} className="u-container">
        <header className={styles.head}>
          <Eyebrow index="04">Personalização</Eyebrow>
          <Display id="tecnicas-title" size="1">
            Cinco <Serif>técnicas</Serif>
          </Display>
          <p className={styles.lead}>
            Personalização é a forma de aplicar o logo na peça. Cada técnica tem um uso ideal, e a gente indica a
            certa para o tecido, a quantidade e o orçamento da sua empresa.
          </p>
        </header>

        <ol className={styles.stack}>
          {TECHNIQUES.map((t, i) => (
            <li key={t.slug} data-card className={styles.card} style={{ '--i': i } as React.CSSProperties}>
              <article data-card-inner className={styles.inner}>
                <div className={styles.text}>
                  <div className={styles.meta}>
                    <Label size="xs" numeric className={styles.num}>
                      {String(i + 1).padStart(2, '0')}
                    </Label>
                    <Label size="xs" muted>
                      Técnica
                    </Label>
                  </div>
                  <h3 className={styles.name}>{t.name}</h3>
                  <p className={styles.tLead}>{t.lead}</p>
                  <p className={styles.body}>{t.body}</p>
                  <div className={styles.ideal}>
                    <Label size="xs" muted>
                      Ideal para
                    </Label>
                    <span>{t.ideal}</span>
                  </div>
                  <Link href={ROUTES.tecnica(t.slug)} className={styles.more}>
                    Entenda como funciona {t.name.toLowerCase() === 'dtf' ? 'o DTF' : `a ${t.name.toLowerCase()}`} →
                  </Link>
                </div>
                <div className={styles.media}>
                  <Media
                    photoId={t.photoId}
                    garment={t.garment}
                    alt={`Exemplo de ${t.name.toLowerCase()} em peça produzida pela UNIK`}
                    sizes="(min-width: 1024px) 34vw, 90vw"
                    tone="raised"
                    caption="Foto em produção"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
