'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

/**
 * Registro único do GSAP para toda a aplicação. Os defaults de easing e
 * duração vêm da marca: um gsap.to() sem ease herda o sotaque certo.
 */
let registered = false

export function ensureGsap() {
  if (registered || typeof window === 'undefined') return { gsap, ScrollTrigger, Flip }
  gsap.registerPlugin(ScrollTrigger, Flip)

  gsap.defaults({ ease: 'power3.out', duration: 0.72 })

  // No iOS a barra de endereço que recolhe dispara resize a cada scroll e
  // provoca refresh em loop. Ignorar mudanças só de altura elimina o jank.
  ScrollTrigger.config({ ignoreMobileResize: true })

  registered = true
  return { gsap, ScrollTrigger, Flip }
}

export { gsap, ScrollTrigger, Flip }
