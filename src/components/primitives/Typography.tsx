import type { ElementType, ReactNode } from 'react'
import styles from './Typography.module.css'

type DisplaySize = 'mega' | '1' | '2' | '3' | '4'

type DisplayProps = {
  children: ReactNode
  as?: ElementType
  size?: DisplaySize
  align?: 'start' | 'center' | 'end'
  className?: string
  id?: string
}

/**
 * Título em Archivo expandida e pesada — o mesmo corpo geométrico do "UNK".
 * Para inflexão, envolva a palavra em <Serif>: a didone itálica do
 * "CONFECÇÕES" entra no meio da frase, nunca como título inteiro.
 */
export function Display({ children, as: Tag = 'h2', size = '2', align = 'start', className, id }: DisplayProps) {
  return (
    <Tag id={id} className={[styles.display, styles[`size${size}`], styles[`align-${align}`], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}

/** Palavra em Bodoni itálica, na cor de destaque da atmosfera. */
export function Serif({ children, plain = false }: { children: ReactNode; plain?: boolean }) {
  return <em className={plain ? styles.serifPlain : styles.serif}>{children}</em>
}

type LabelProps = {
  children: ReactNode
  as?: ElementType
  size?: 'lg' | 'md' | 'sm' | 'xs'
  muted?: boolean
  numeric?: boolean
  className?: string
}

/** Rótulo em mono, caixa alta — o vocabulário de ficha técnica. */
export function Label({ children, as: Tag = 'span', size = 'sm', muted = false, numeric = false, className }: LabelProps) {
  return (
    <Tag
      className={[styles.mono, styles[`mono${size}`], muted && styles.muted, numeric && styles.numeric, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}

type ProseProps = {
  children: ReactNode
  as?: ElementType
  size?: 'xl' | 'lg' | 'md' | 'sm'
  measured?: boolean
  muted?: boolean
  className?: string
}

export function Prose({ children, as: Tag = 'p', size = 'md', measured = true, muted = false, className }: ProseProps) {
  return (
    <Tag
      className={[styles.prose, styles[`prose${size}`], measured && styles.measured, muted && styles.muted, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}

/**
 * Cabeçalho de seção: filete + número + rótulo, como o cabeçalho de uma
 * página de ficha técnica. Sempre em cima do título.
 */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <div className={[styles.eyebrow, className].filter(Boolean).join(' ')}>
      <span className={styles.eyebrowRule} aria-hidden="true" />
      {index ? (
        <Label size="xs" numeric className={styles.eyebrowIndex}>
          {index}
        </Label>
      ) : null}
      <Label size="xs" muted>
        {children}
      </Label>
    </div>
  )
}
