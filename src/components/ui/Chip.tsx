import type { ReactNode } from 'react'
import styles from './Chip.module.css'

type ChipProps = {
  children: ReactNode
  pressed: boolean
  onClick: () => void
  count?: number
  size?: 'md' | 'sm'
}

/** Botão de alternância (filtro, técnica, posição). `aria-pressed` diz o estado. */
export function Chip({ children, pressed, onClick, count, size = 'md' }: ChipProps) {
  return (
    <button type="button" className={`${styles.chip} ${styles[size]}`} aria-pressed={pressed} onClick={onClick}>
      <span>{children}</span>
      {typeof count === 'number' ? <span className={styles.count}>{count}</span> : null}
    </button>
  )
}
