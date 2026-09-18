'use client'

import { useSyncExternalStore } from 'react'
import type { Company } from '@/lib/cnpj'

/**
 * A empresa identificada pelo atalho de CNPJ.
 *
 * Mesmo desenho do `quote-store`: localStorage + `useSyncExternalStore`. Quem
 * informa o CNPJ na página de um produto chega ao orçamento com os dados já
 * preenchidos, e o catálogo passa a sugerir os modelos do segmento dela.
 */
const KEY = 'unik:empresa:v1'

let company: Company | null = null
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const raw = window.localStorage.getItem(KEY)
    company = raw ? (JSON.parse(raw) as Company) : null
  } catch {
    company = null
  }
}

function commit(next: Company | null) {
  company = next
  try {
    if (next) window.localStorage.setItem(KEY, JSON.stringify(next))
    else window.localStorage.removeItem(KEY)
  } catch {
    // Modo privativo: a empresa vale só nesta aba.
  }
  listeners.forEach((fn) => fn())
}

function subscribe(fn: () => void) {
  load()
  listeners.add(fn)
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return
    loaded = false
    load()
    fn()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot() {
  load()
  return company
}

export function useCompany(): Company | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

export const setCompany = (c: Company) => commit(c)
export const clearCompany = () => commit(null)
