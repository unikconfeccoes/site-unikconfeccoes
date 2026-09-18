'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Logo } from '@/components/brand/Logo'
import { useGsapOn } from '@/hooks/useGsap'
import styles from './Preloader.module.css'

const neverChanges = () => () => {}

/** Decide no cliente, sem efeito, se a abertura roda: uma vez por aba, nunca sob reduced-motion. */
function useShouldPlayIntro(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      try {
        return sessionStorage.getItem('unik:intro') !== 'done'
      } catch {
        return true
      }
    },
    () => false,
  )
}

/**
 * Abertura da marca, ~1,5 s e sai. Nunca espera carregamento, nunca finge
 * progresso. As letras U, N e K sobem de trás de uma máscara; a barra do "i"
 * CAI por último, como o alfinete que prende a peça — e é essa mesma barra que
 * o herói transforma em janela logo depois.
 */
export function Preloader() {
  const shouldPlay = useShouldPlayIntro()
  const [finished, setFinished] = useState(false)
  const root = useRef<HTMLDivElement | null>(null)
  const active = shouldPlay && !finished

  useEffect(() => {
    if (!shouldPlay) return
    try {
      sessionStorage.setItem('unik:intro', 'done')
    } catch {
      // Sem storage, a intro roda a cada navegação. Aceitável.
    }
  }, [shouldPlay])

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      if (!active) return
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const release = () => {
        document.body.style.overflow = previous
        setFinished(true)
        window.dispatchEvent(new Event('unik:intro-done'))
      }

      gsap
        .timeline({ onComplete: release })
        .fromTo(
          el.querySelectorAll('[data-logo-part]'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.07, ease: 'power4.out' },
          0.15,
        )
        .fromTo(
          el.querySelector('[data-logo-bar]'),
          { yPercent: -160, scaleY: 1.4 },
          { yPercent: 0, scaleY: 1, duration: 0.6, ease: 'expo.out' },
          0.5,
        )
        .fromTo(el.querySelector('[data-intro-line]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0.2)
        .to(el.querySelector('[data-intro-mark]'), { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' }, 1.25)
        .to(el, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, 1.35)

      return () => {
        document.body.style.overflow = previous
      }
    },
    [active],
  )

  if (!active) return null

  return (
    <div ref={root} className={styles.preloader} data-atmosphere="noite" aria-hidden="true">
      <div data-intro-mark className={styles.mark}>
        <div className={styles.clip}>
          <Logo variant="mark" height="clamp(3.5rem, 12vw, 8rem)" labelled={false} />
        </div>
        <span data-intro-line className={styles.line} />
        <span className={styles.tag}>Confecções · desde 2016</span>
      </div>
    </div>
  )
}
