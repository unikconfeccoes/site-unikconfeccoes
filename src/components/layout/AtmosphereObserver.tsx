'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Sincroniza a cor do <body> com a atmosfera da seção no meio da tela, para o
 * overscroll elástico do iOS nunca aparecer na cor errada. Um único
 * IntersectionObserver com a raiz reduzida a uma faixa central.
 */
export function AtmosphereObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const atmosphere = winner?.target.getAttribute('data-section')
        if (atmosphere) document.body.dataset.atmosphere = atmosphere
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
