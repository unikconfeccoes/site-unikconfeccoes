'use client'

import { useRef } from 'react'
import { Section } from '@/components/primitives/Section'
import { Cta } from '@/components/primitives/Cta'
import { Display, Eyebrow, Prose, Serif } from '@/components/primitives/Typography'
import { useGsapOn } from '@/hooks/useGsap'
import { ScrollTrigger } from '@/lib/motion/gsap'
import styles from './Processo.module.css'

const STEPS = [
  { id: '01', title: 'Briefing', body: 'Você conta o que precisa: quais peças, quantas, para quando e para quem. Pelo site ou pelo WhatsApp.' },
  { id: '02', title: 'Tecido & modelagem', body: 'Indicamos a malha e o modelo certos para o uso real da equipe: cozinha quente, sol forte, escritório ou quadra.' },
  { id: '03', title: 'Arte & mockup', body: 'A arte é preparada para a técnica escolhida e você aprova o mockup antes de qualquer corte.' },
  { id: '04', title: 'Produção', body: 'Corte, costura e personalização com conferência em cada etapa, no padrão UNIK.' },
  { id: '05', title: 'Entrega', body: 'Peças conferidas uma a uma e entregues no dia combinado. Compromisso é compromisso.' },
] as const

/**
 * COMO FUNCIONA — a barra do "i" desce pela linha do tempo.
 *
 * O marcador é o mesmo retângulo do logo, em bronze: ele acompanha o scroll
 * ao longo do trilho enquanto o trilho se preenche, e cada etapa acende quando
 * o marcador chega nela. Sem movimento (ou sem JS), o trilho aparece cheio e
 * todas as etapas acesas.
 */
export function Processo() {
  const root = useRef<HTMLDivElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const list = el.querySelector<HTMLElement>('[data-list]')
      const marker = el.querySelector<HTMLElement>('[data-marker]')
      if (!list || !marker) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const trigger = { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: 0.6, invalidateOnRefresh: true }
        gsap.fromTo('[data-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: trigger })
        gsap.fromTo(marker, { y: 0 }, { y: () => list.offsetHeight - marker.offsetHeight, ease: 'none', scrollTrigger: trigger })

        const steps = Array.from(el.querySelectorAll<HTMLElement>('[data-step]'))
        for (const step of steps) {
          step.dataset.state = 'idle'
          ScrollTrigger.create({
            trigger: step,
            start: 'top 62%',
            onEnter: () => (step.dataset.state = 'on'),
            onLeaveBack: () => (step.dataset.state = 'idle'),
          })
        }
        // O estado é atributo nosso, não do GSAP: o revert não o desfaz.
        return () => steps.forEach((step) => delete step.dataset.state)
      })

      return () => mm.revert()
    },
    [],
  )

  return (
    <Section id="processo" atmosphere="atelier" labelledBy="processo-title">
      <div ref={root} className={`u-container ${styles.grid}`}>
        <div className={styles.intro}>
          <Eyebrow index="03">Como funciona</Eyebrow>
          <Display id="processo-title" size="2">
            Do briefing à <Serif>entrega</Serif>
          </Display>
          <Prose muted>
            Todo pedido passa pelas mesmas cinco etapas, com uma pessoa acompanhando do começo ao fim. Assim a sua
            empresa sabe em que ponto a produção está e quando as peças chegam.
          </Prose>
          <Cta href="/orcamento" icon="plus">
            Começar pelo orçamento
          </Cta>
        </div>

        <div className={styles.timeline}>
          <div className={styles.rail} aria-hidden="true">
            <span data-fill className={styles.fill} />
            <span data-marker className={styles.marker} />
          </div>
          <ol data-list className={styles.list}>
            {STEPS.map((step) => (
              <li key={step.id} data-step className={styles.step}>
                <span className={styles.num}>{step.id}</span>
                <div>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.body}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
