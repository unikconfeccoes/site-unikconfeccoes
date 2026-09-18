'use client'

import styles from './SizeGrid.module.css'

type SizeGridProps = {
  sizes: readonly string[]
  value: Record<string, number>
  onChange: (next: Record<string, number>) => void
  compact?: boolean
  idPrefix: string
}

const MAX = 9999

/**
 * Grade de tamanhos: um contador por tamanho, com −/+ e campo digitável.
 * O pedido de uniforme é pensado assim — "12 M, 20 G, 8 GG" — e não como um
 * único campo de quantidade que obrigaria a separar a grade depois.
 */
export function SizeGrid({ sizes, value, onChange, compact = false, idPrefix }: SizeGridProps) {
  const set = (size: string, n: number) => {
    const clean = Math.max(0, Math.min(MAX, Math.floor(Number.isFinite(n) ? n : 0)))
    onChange({ ...value, [size]: clean })
  }

  return (
    <div className={`${styles.grid} ${compact ? styles.compact : ''}`}>
      {sizes.map((size) => {
        const n = value[size] ?? 0
        const id = `${idPrefix}-${size}`
        return (
          <div key={size} className={styles.cell} data-filled={n > 0 || undefined}>
            <label htmlFor={id} className={styles.size}>
              {size}
            </label>
            <div className={styles.stepper}>
              <button type="button" className={styles.btn} onClick={() => set(size, n - 1)} disabled={n === 0} aria-label={`Diminuir ${size}`}>
                −
              </button>
              <input
                id={id}
                type="number"
                inputMode="numeric"
                min={0}
                max={MAX}
                value={n === 0 ? '' : n}
                placeholder="0"
                onChange={(e) => set(size, Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                className={styles.input}
              />
              <button type="button" className={styles.btn} onClick={() => set(size, n + 1)} aria-label={`Aumentar ${size}`}>
                +
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
