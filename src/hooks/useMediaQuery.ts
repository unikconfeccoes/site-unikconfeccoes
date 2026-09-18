'use client'

import { useSyncExternalStore } from 'react'

/**
 * Media query reativa sem hydration mismatch: o servidor responde o fallback
 * explícito e o React reconcilia sem aviso.
 */
function subscribe(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }
}

export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  )
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false)
}

/** Mouse preciso — liga hover e cursor contextual, nunca decide layout. */
export function useHasPointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)', false)
}
