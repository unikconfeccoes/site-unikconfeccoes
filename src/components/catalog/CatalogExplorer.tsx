'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Chip } from '@/components/ui/Chip'
import { Cta } from '@/components/primitives/Cta'
import {
  CATEGORIES,
  PRODUCTS,
  SEGMENTS,
  startingPrice,
  type CategorySlug,
  type Product,
  type SegmentSlug,
} from '@/data/catalog'
import { whatsappUrl } from '@/data/site'
import { ensureGsap, Flip } from '@/lib/motion/gsap'
import styles from './CatalogExplorer.module.css'

type Sort = 'relevancia' | 'menor' | 'maior'

type Props = {
  initialCategory: CategorySlug | null
  initialSegment: SegmentSlug | null
  initialQuery?: string
}

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function matches(product: Product, category: CategorySlug | null, segment: SegmentSlug | null, query: string) {
  if (category && product.category !== category) return false
  if (segment && !product.segments.includes(segment)) return false
  if (query) {
    const hay = normalize([product.name, product.summary, ...product.fabrics.map((f) => f.label)].join(' '))
    if (!normalize(query).split(/\s+/).every((term) => hay.includes(term))) return false
  }
  return true
}

/**
 * O explorador do catálogo.
 *
 * TODOS os cards ficam montados; o filtro só troca `hidden`. É o que permite
 * ao GSAP Flip animar a reorganização — ele captura a posição de cada card
 * antes da troca e, depois do render, anima do lugar antigo para o novo, com
 * os que saem encolhendo e os que entram crescendo. Desmontar e remontar
 * perderia a identidade dos nós e a animação viraria um corte seco.
 *
 * Os filtros vivem na URL (replaceState): um link para "polos para
 * gastronomia" é compartilhável, e voltar da página do produto mantém a busca.
 */
export function CatalogExplorer({ initialCategory, initialSegment, initialQuery = '' }: Props) {
  const [category, setCategory] = useState<CategorySlug | null>(initialCategory)
  const [segment, setSegment] = useState<SegmentSlug | null>(initialSegment)
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState<Sort>('relevancia')
  const grid = useRef<HTMLUListElement | null>(null)
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null)

  const ordered = useMemo(() => {
    if (sort === 'relevancia') return PRODUCTS
    // Sob consulta vai sempre para o fim, nos dois sentidos.
    const priced = PRODUCTS.filter((p) => startingPrice(p) !== null)
    const rest = PRODUCTS.filter((p) => startingPrice(p) === null)
    const list = [...priced].sort((a, b) => (startingPrice(a) ?? 0) - (startingPrice(b) ?? 0))
    return [...(sort === 'menor' ? list : list.reverse()), ...rest]
  }, [sort])

  const visible = useMemo(
    () => new Set(ordered.filter((p) => matches(p, category, segment, query.trim())).map((p) => p.slug)),
    [ordered, category, segment, query],
  )

  // Captura o estado ANTES de o React aplicar a mudança.
  const capture = () => {
    if (!grid.current) return
    ensureGsap()
    flipState.current = Flip.getState(grid.current.querySelectorAll('[data-flip]'))
  }

  const update = <T,>(setter: (v: T) => void) => (value: T) => {
    capture()
    setter(value)
  }

  useLayoutEffect(() => {
    const state = flipState.current
    flipState.current = null
    if (!state || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = Flip.from(state, {
      duration: 0.7,
      ease: 'power3.inOut',
      absolute: true,
      nested: true,
      prune: true,
      onEnter: (els) => gsapFrom(els),
      onLeave: (els) => gsapTo(els),
    })
    return () => {
      tl.progress(1)
    }
  }, [visible, ordered])

  useLayoutEffect(() => {
    const params = new URLSearchParams()
    if (category) params.set('categoria', category)
    if (segment) params.set('segmento', segment)
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `/catalogo?${qs}` : '/catalogo')
  }, [category, segment])

  const clear = () => {
    capture()
    setCategory(null)
    setSegment(null)
    setQuery('')
  }

  const countFor = (slug: CategorySlug) => PRODUCTS.filter((p) => matches(p, slug, segment, query.trim())).length

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Linha</span>
          <div className={styles.chips} role="group" aria-label="Filtrar por linha">
            <Chip pressed={category === null} onClick={() => update(setCategory)(null)}>
              Todas
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c.slug} pressed={category === c.slug} onClick={() => update(setCategory)(category === c.slug ? null : c.slug)} count={countFor(c.slug)}>
                {c.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.rowLabel}>Para</span>
          <div className={styles.chips} role="group" aria-label="Filtrar por segmento">
            <Chip size="sm" pressed={segment === null} onClick={() => update(setSegment)(null)}>
              Todos
            </Chip>
            {SEGMENTS.map((s) => (
              <Chip key={s.slug} size="sm" pressed={segment === s.slug} onClick={() => update(setSegment)(segment === s.slug ? null : s.slug)}>
                {s.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className={styles.tools}>
          <label className={styles.search}>
            <span className="u-visually-hidden">Buscar no catálogo</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.searchIcon}>
              <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M13 13l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              placeholder="Buscar: polo, dry, avental, pima…"
              onChange={(e) => update(setQuery)(e.target.value)}
              className={styles.searchInput}
            />
          </label>

          <label className={styles.sort}>
            <span>Ordenar</span>
            <select value={sort} onChange={(e) => update(setSort)(e.target.value as Sort)} className={styles.select}>
              <option value="relevancia">Relevância</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>
          </label>

          <p className={styles.status} aria-live="polite">
            <strong className="u-tnum">{visible.size}</strong> {visible.size === 1 ? 'modelo' : 'modelos'}
          </p>
        </div>
      </div>

      <ul ref={grid} className={styles.grid}>
        {ordered.map((product, i) => (
          <li key={product.slug} data-flip data-flip-id={product.slug} hidden={!visible.has(product.slug)} className={styles.cell}>
            <ProductCard product={product} index={i} />
          </li>
        ))}
      </ul>

      {visible.size === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nenhum modelo com esses filtros.</p>
          <p className={styles.emptyText}>Tente outra combinação ou conte o que precisa, e a gente indica a peça.</p>
          <div className={styles.emptyActions}>
            <Cta variant="line" onClick={clear} icon="none">
              Limpar filtros
            </Cta>
            <Cta href={whatsappUrl(`Olá! Procuro um uniforme${query ? ` (${query})` : ''} e não encontrei no catálogo.`)} external icon="whatsapp">
              Perguntar no WhatsApp
            </Cta>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function gsapFrom(els: Element[]) {
  const { gsap } = ensureGsap()
  return gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.55, delay: 0.15, ease: 'power3.out' })
}

function gsapTo(els: Element[]) {
  const { gsap } = ensureGsap()
  return gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' })
}
