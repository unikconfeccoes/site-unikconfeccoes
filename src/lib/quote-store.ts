'use client'

import { useSyncExternalStore } from 'react'

/**
 * A lista de orçamento.
 *
 * Um store de 60 linhas em vez de uma biblioteca: o estado é uma lista de
 * itens, persiste no localStorage e precisa ser lido por três lugares
 * (header, página do produto, página do orçamento). `useSyncExternalStore`
 * resolve a leitura sem hydration mismatch — o servidor sempre vê a lista
 * vazia, o cliente lê a real — e o evento `storage` sincroniza abas abertas.
 */

export type QuoteItem = {
  id: string
  productSlug: string
  productName: string
  fabricLabel: string
  color: string
  sizes: Record<string, number>
  techniques: string[]
  positions: string[]
  notes: string
}

const KEY = 'unik:orcamento:v1'
const EMPTY: readonly QuoteItem[] = []

let items: readonly QuoteItem[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (Array.isArray(parsed)) items = parsed as QuoteItem[]
  } catch {
    // Storage bloqueado ou JSON corrompido: começa vazio, sem quebrar a página.
  }
}

function commit(next: readonly QuoteItem[]) {
  items = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Modo privativo: a lista vive só nesta aba.
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
  return items
}

export function useQuote(): readonly QuoteItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}

export function addQuoteItem(item: Omit<QuoteItem, 'id'>): QuoteItem {
  load()
  const full = { ...item, id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}` }
  commit([...items, full])
  return full
}

export function updateQuoteItem(id: string, patch: Partial<Omit<QuoteItem, 'id'>>) {
  commit(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
}

export function removeQuoteItem(id: string) {
  commit(items.filter((it) => it.id !== id))
}

export function clearQuote() {
  commit(EMPTY)
}

export function itemTotal(item: Pick<QuoteItem, 'sizes'>): number {
  return Object.values(item.sizes).reduce((sum, n) => sum + (Number.isFinite(n) ? n : 0), 0)
}

export function quoteTotal(list: readonly QuoteItem[]): number {
  return list.reduce((sum, it) => sum + itemTotal(it), 0)
}
