'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Logo } from '@/components/brand/Logo'
import { Cta } from '@/components/primitives/Cta'
import { Label } from '@/components/primitives/Typography'
import { PHOTO_BY_ID, type Photo } from '@/data/generated/photos'
import { SITE } from '@/data/site'
import { useGsapOn } from '@/hooks/useGsap'
import { ScrollTrigger } from '@/lib/motion/gsap'
import styles from './Hero.module.css'

/**
 * ABERTURA EM TRÊS ATOS — a barra do "i" vira janela.
 *
 *   ATO 1 · A MARCA    o logo sozinho, grande. As letras sobem de uma máscara
 *                      e a barra do "i" cai por último.
 *   ATO 2 · A JANELA   ao rolar, U e N saem pela esquerda, K pela direita, e a
 *                      barra do "i" se ABRE: vira uma janela que cresce até a
 *                      tela inteira, mostrando o trabalho real da UNIK.
 *   ATO 3 · A PROMESSA sobre as fotos, "Uniformes que vestem a sua marca." e
 *                      as duas saídas: catálogo e orçamento.
 *
 * A barra é o único elemento do logo que é uma forma pura — um retângulo. Por
 * isso ela pode virar interface sem deformar a marca: o site inteiro a
 * reaproveita (preloader, cursor da seção de processo, filete das seções).
 *
 * O palco fica preso por `position: sticky` (não pelo `pin` do GSAP): o
 * navegador já posiciona, o GSAP só anima. Pin + sticky juntos fazem o palco
 * soltar cedo e a seção seguinte invadir o último ato.
 *
 * SÓ EXISTE SEQUÊNCIA EM TELA LARGA COM MOUSE. Em toque, o sticky longo briga
 * com a barra de endereço do Safari — lá a mesma narrativa vem empilhada, cada
 * bloco revelado ao entrar na tela. Sob reduced-motion, tudo parado e visível.
 */

const PINNED = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const STACKED =
  '(prefers-reduced-motion: no-preference) and (max-width: 1023px),' +
  '(prefers-reduced-motion: no-preference) and (pointer: coarse)'

/** Três colunas de trabalho real, em alturas desencontradas. */
const COLUMNS: readonly (readonly string[])[] = [
  ['versa', 'polos', 'dtf', 'instituto-federal'],
  ['instituto-federal', 'criadores', 'lab-serigrafia', 'versa'],
  ['polos', 'dtf', 'criadores', 'lab-serigrafia'],
]

export function Hero() {
  const root = useRef<HTMLElement | null>(null)

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const stage = el.querySelector<HTMLElement>('[data-stage]')
      const bar = el.querySelector<SVGGElement>('[data-mark] [data-logo-bar]')
      const portal = el.querySelector<HTMLElement>('[data-portal]')
      if (!stage || !bar || !portal) return

      // Se o preloader ainda vai tocar, a entrada do logo espera por ele.
      let introPending = false
      try {
        introPending = sessionStorage.getItem('unik:intro') !== 'done'
      } catch {
        introPending = false
      }
      const entranceDelay = introPending ? 1.55 : 0.15

      // A entrada anima o <path> de cada letra; a rolagem anima o <g> que o
      // envolve. Alvos separados: se os dois tweens mexessem no mesmo nó, o
      // refresh do ScrollTrigger regravaria a posição inicial da entrada.
      const letters = el.querySelectorAll('[data-mark] [data-logo-part] > path')
      const mm = gsap.matchMedia()

      /* ------------------------------------------------ desktop: sequência */
      mm.add(PINNED, () => {
        gsap
          // A janela é medida a partir da barra; a medida só vale com a barra
          // já pousada, então a entrada termina pedindo um refresh.
          .timeline({ delay: entranceDelay, onComplete: () => ScrollTrigger.refresh() })
          .fromTo(letters, { yPercent: 105 }, { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out' })
          .fromTo(bar, { yPercent: -140, scaleY: 1.3 }, { yPercent: 0, scaleY: 1, duration: 0.8, ease: 'expo.out' }, 0.35)
          .fromTo('[data-kicker] > *', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.6)
          .fromTo('[data-cue]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1)

        /*
         * A janela nasce do retângulo exato da barra. O inset é medido em
         * relação ao palco a cada refresh (função + invalidateOnRefresh), então
         * sobrevive a resize sem cálculo à mão.
         */
        const insetFromBar = () => {
          const s = stage.getBoundingClientRect()
          const b = bar.getBoundingClientRect()
          return `inset(${b.top - s.top}px ${s.right - b.right}px ${s.bottom - b.bottom}px ${b.left - s.left}px)`
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // ATO 1 → 2: as letras abrem caminho, a barra vira janela.
        tl.to('[data-kicker]', { autoAlpha: 0, y: -20, duration: 0.12 }, 0)
          .to('[data-cue]', { autoAlpha: 0, duration: 0.08 }, 0)
          .to('[data-mark] [data-logo-part="u"], [data-mark] [data-logo-part="n"]', { xPercent: -60, autoAlpha: 0, duration: 0.34, ease: 'power2.in' }, 0.02)
          .to('[data-mark] [data-logo-part="k"]', { xPercent: 60, autoAlpha: 0, duration: 0.34, ease: 'power2.in' }, 0.02)
          .set(portal, { autoAlpha: 1 }, 0.02)
          .fromTo(portal, { clipPath: insetFromBar }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.42, ease: 'power2.inOut' }, 0.02)
          // O véu tem a cor da barra: no primeiro quadro a janela É a barra.
          .fromTo('[data-veil]', { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0.1)
          .set(bar, { autoAlpha: 0 }, 0.03)

        // ATO 2 → 3: a promessa sobe de trás da máscara, as saídas aparecem.
        tl.fromTo('[data-phrase-line]', { yPercent: 115 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: 'power3.out' }, 0.46)
          .fromTo('[data-phrase]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.46)
          .fromTo('[data-outro]', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power2.out' }, 0.68)
          .to({}, { duration: 0.12 }, 0.88)

        // As colunas de fotos atravessam a sequência em sentidos opostos.
        el.querySelectorAll<HTMLElement>('[data-col]').forEach((col, i) => {
          tl.fromTo(col, { yPercent: i % 2 ? -18 : 4 }, { yPercent: i % 2 ? 4 : -22, duration: 1 }, 0)
        })
      })

      /* ---------------------------------------------- toque: empilhado */
      mm.add(STACKED, () => {
        gsap
          .timeline({ delay: entranceDelay })
          .fromTo(letters, { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power4.out' })
          .fromTo(bar, { yPercent: -140 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, 0.3)
          .fromTo('[data-kicker] > *', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: 0.08 }, 0.5)

        gsap.fromTo(
          portal,
          { clipPath: 'inset(0% 46% 0% 46%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: portal, start: 'top 80%', once: true },
          },
        )
        gsap.fromTo(
          '[data-phrase-line]',
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: '[data-phrase]', start: 'top 85%', once: true } },
        )
        gsap.fromTo(
          '[data-outro]',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: '[data-outro]', start: 'top 90%', once: true } },
        )
      })

      return () => mm.revert()
    },
    [],
  )

  return (
    <section ref={root} className={styles.hero} data-atmosphere="noite" data-section="noite" aria-labelledby="hero-title">
      <div data-stage className={styles.stage}>
        <h1 id="hero-title" className="u-visually-hidden">
          UNIK Confecções: confecção de uniformes profissionais para empresas, em Brasília desde 2016.
        </h1>

        {/* ------------------------------------------------ ATO 1 · a marca */}
        <div className={styles.markWrap} aria-hidden="true">
          <div data-mark className={styles.mark}>
            <Logo variant="mark" height="var(--mark-h)" labelled={false} />
          </div>
          <div data-kicker className={styles.kicker}>
            <span>Uniformes para empresas</span>
            <span className={styles.kickerRule} />
            <span>
              {SITE.city} · desde {SITE.founded}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------- ATO 2 · a janela */}
        <div data-portal className={styles.portal} aria-hidden="true">
          <div className={styles.mosaic}>
            {COLUMNS.map((ids, i) => (
              <div key={i} data-col className={styles.col}>
                {[...ids, ...ids].map((id, j) => {
                  const photo = PHOTO_BY_ID[id]
                  return photo ? <Tile key={`${id}-${j}`} photo={photo} priority={j < 2} /> : null
                })}
              </div>
            ))}
          </div>
          <div className={styles.scrim} />
          <div data-veil className={styles.veil} />
        </div>

        {/* ------------------------------------------- ATO 3 · a promessa */}
        <div className={styles.front}>
          <p data-phrase className={styles.phrase} aria-hidden="true">
            <span className={styles.lineMask}>
              <span data-phrase-line className={styles.line}>
                Uniformes
              </span>
            </span>
            <span className={styles.lineMask}>
              <span data-phrase-line className={`${styles.line} ${styles.lineIndent}`}>
                que vestem
              </span>
            </span>
            <span className={styles.lineMask}>
              <span data-phrase-line className={styles.line}>
                a sua <span className={styles.lineSerif}>marca.</span>
              </span>
            </span>
          </p>

          <div data-outro className={styles.outro}>
            <p className={styles.outroText}>
              Confecção de uniformes para empresas: polos, camisetas, dólmãs, jalecos, moletons e linha esportiva,
              produzidos em volume com o logo da sua marca. Monte o orçamento em poucos minutos.
            </p>
            <div className={styles.ctas}>
              <Cta href="/catalogo" size="lg">
                Ver catálogo
              </Cta>
              <Cta href="/orcamento" variant="line" size="lg" icon="plus">
                Montar orçamento
              </Cta>
            </div>
            <Label size="xs" muted className={styles.techs}>
              Serigrafia · Bordado · DTF · Sublimação · Alto relevo
            </Label>
          </div>
        </div>

        <a href="#manifesto" data-cue className={styles.cue}>
          <Label size="xs">Role para abrir</Label>
          <span className={styles.cueLine} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function Tile({ photo, priority }: { photo: Photo; priority: boolean }) {
  return (
    <div className={styles.tile}>
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 50vw"
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        priority={priority}
        className={styles.tileImg}
      />
    </div>
  )
}
