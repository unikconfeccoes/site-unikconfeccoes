'use client'

import { useLayoutEffect, type RefObject } from 'react'
import { ensureGsap, gsap } from '@/lib/motion/gsap'

type GsapSetup<T extends Element> = (context: { gsap: typeof gsap; root: T }) => void | (() => void)

/**
 * Executa uma rotina GSAP dentro de um `gsap.context` com escopo no elemento
 * e cleanup automático.
 *
 * Sem o contexto, cada remount do Strict Mode deixa tweens e ScrollTriggers
 * órfãos apontando para nós que já saíram do DOM. `ctx.revert()` desfaz
 * também as propriedades inline, devolvendo o elemento ao estado do CSS.
 *
 * useLayoutEffect para que o estado inicial seja aplicado antes do primeiro
 * paint — com useEffect há um flash do conteúdo na posição final.
 */
export function useGsapOn<T extends Element>(
  target: RefObject<T | null>,
  setup: GsapSetup<T>,
  deps: readonly unknown[] = [],
): void {
  useLayoutEffect(() => {
    const root = target.current
    if (!root) return
    ensureGsap()
    const ctx = gsap.context(() => setup({ gsap, root }), root)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
