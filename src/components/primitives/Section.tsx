import type { ReactNode } from 'react'
import styles from './Section.module.css'

export type Atmosphere = 'atelier' | 'noite' | 'grafite' | 'bronze'

type SectionProps = {
  children: ReactNode
  /** A pele da seção. A alternância claro/escuro é o ritmo da página. */
  atmosphere?: Atmosphere
  id?: string
  label?: string
  labelledBy?: string
  bleed?: boolean
  tight?: boolean
  className?: string
}

/**
 * Faixa da narrativa. `data-atmosphere` redefine os papéis de cor para tudo
 * dentro; `data-section` é o gancho do AtmosphereObserver, que pinta o <body>
 * conforme o scroll (o overscroll do iOS nunca aparece na cor errada).
 */
export function Section({
  children,
  atmosphere = 'atelier',
  id,
  label,
  labelledBy,
  bleed = false,
  tight = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      data-atmosphere={atmosphere}
      data-section={atmosphere}
      className={[styles.section, bleed && styles.bleed, tight && styles.tight, className].filter(Boolean).join(' ')}
    >
      {children}
    </section>
  )
}
