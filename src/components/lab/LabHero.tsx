'use client'

import { useRef } from 'react'
import { Cta } from '@/components/primitives/Cta'
import { Label } from '@/components/primitives/Typography'
import { useGsapOn } from '@/hooks/useGsap'
import styles from './LabHero.module.css'

/**
 * Abertura do UNIK LAB.
 *
 * O logo do @uniklab_ escreve "Lab" à mão por cima do UNIK. Aqui o gesto é o
 * mesmo: o UNIK sobe pesado, e o "Lab" em didone itálica é revelado da
 * esquerda para a direita por uma máscara — como se fosse escrito na hora.
 */
export function LabHero() {
  const root = useRef<HTMLElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let introPending = false
        try {
          introPending = sessionStorage.getItem('unik:intro') !== 'done'
        } catch {
          introPending = false
        }
        gsap
          .timeline({ delay: introPending ? 1.5 : 0.1 })
          .fromTo('[data-unik-letter]', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07, ease: 'power4.out' })
          .fromTo('[data-lab]', { clipPath: 'inset(-20% 100% -20% 0%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', duration: 1.2, ease: 'power2.inOut' }, 0.45)
          .fromTo('[data-lab-in]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.9)

        gsap.to('[data-lab-word]', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    [],
  )

  return (
    <section ref={root} className={styles.hero} data-atmosphere="noite" data-section="noite" aria-labelledby="lab-hero-title">
      <div className={`u-container ${styles.inner}`}>
        <div data-lab-in>
          <Label size="xs" className={styles.kicker}>
            UNIK Lab · Private label · Brasília
          </Label>
        </div>

        <h1 id="lab-hero-title" className={styles.word} data-lab-word>
          <span className="u-visually-hidden">UNIK Lab: private label para marcas de roupa</span>
          <span className={styles.unik} aria-hidden="true">
            {'UNIK'.split('').map((l, i) => (
              <span key={i} className={styles.mask}>
                <span data-unik-letter className={styles.letter}>
                  {l}
                </span>
              </span>
            ))}
          </span>
          <span data-lab className={styles.lab} aria-hidden="true">
            Lab.
          </span>
        </h1>

        <div className={styles.bottom}>
          <p data-lab-in className={styles.lead}>
            A sua marca de roupa, do tecido à etiqueta. Malhas premium, modelagem personalizada e estampa com assinatura,
            desenvolvidas junto com você até a peça-piloto.
          </p>
          <div data-lab-in className={styles.ctas}>
            <Cta href="#ideia" size="lg">
              Enviar minha ideia
            </Cta>
            <Cta href="#tecidos" variant="line" size="lg">
              Ver tecidos
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
