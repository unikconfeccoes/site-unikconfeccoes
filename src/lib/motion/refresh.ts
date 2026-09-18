'use client'

import { ScrollTrigger } from '@/lib/motion/gsap'

/**
 * Recálculo coordenado do ScrollTrigger: várias seções pedindo refresh ao
 * montar viram UM refresh no próximo quadro ocioso, em vez de uma cascata de
 * layouts durante a hidratação.
 */
let pending = false

export function scheduleRefresh(): void {
  if (typeof window === 'undefined' || pending) return
  pending = true

  const run = () => {
    pending = false
    ScrollTrigger.refresh()
  }

  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 400 })
  else requestAnimationFrame(run)
}
