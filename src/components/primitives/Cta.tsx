'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { useHasPointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import styles from './Cta.module.css'

type CommonProps = {
  children: ReactNode
  variant?: 'solid' | 'line' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
  ariaLabel?: string
  /** Ícone à direita. Padrão: seta. `none` remove. */
  icon?: 'arrow' | 'whatsapp' | 'plus' | 'none'
}

type LinkProps = CommonProps & { href: string; external?: boolean; onClick?: () => void; type?: never; disabled?: never }
type ButtonProps = CommonProps & { href?: never; external?: never; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }

/**
 * Chamada para ação.
 *
 * Atração magnética só em ponteiro fino e sem reduced-motion, e pequena de
 * propósito (máx. 6 px): a sensação tem de ser física, não elástica. Com
 * `href` é sempre um <a> real — teclado, nova aba e menu de contexto funcionam.
 */
export function Cta(props: LinkProps | ButtonProps) {
  const { children, variant = 'solid', size = 'md', className, ariaLabel, icon = 'arrow' } = props
  const ref = useRef<HTMLElement | null>(null)
  const hasPointer = useHasPointer()
  const reduced = usePrefersReducedMotion()
  const magnetic = hasPointer && !reduced

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!magnetic || !el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--pull-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 12}px`)
    el.style.setProperty('--pull-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 12}px`)
  }

  const handleLeave = () => {
    ref.current?.style.setProperty('--pull-x', '0px')
    ref.current?.style.setProperty('--pull-y', '0px')
  }

  const classes = [styles.cta, styles[variant], styles[size], className].filter(Boolean).join(' ')
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon !== 'none' ? (
        <span className={styles.icon} aria-hidden="true">
          <CtaIcon icon={icon} />
        </span>
      ) : null}
    </>
  )

  const shared = {
    className: classes,
    'aria-label': ariaLabel,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick: props.onClick,
  }

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a ref={(n) => void (ref.current = n)} href={props.href} target="_blank" rel="noopener noreferrer" {...shared}>
          {content}
        </a>
      )
    }
    return (
      <Link ref={(n) => void (ref.current = n)} href={props.href} {...shared}>
        {content}
      </Link>
    )
  }

  return (
    <button ref={(n) => void (ref.current = n)} type={props.type ?? 'button'} disabled={props.disabled} {...shared}>
      {content}
    </button>
  )
}

function CtaIcon({ icon }: { icon: 'arrow' | 'whatsapp' | 'plus' }) {
  if (icon === 'plus') {
    return (
      <svg viewBox="0 0 16 16" fill="none" focusable="false" className={styles.plus}>
        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'whatsapp') return <WhatsappGlyph className={styles.whats} />
  return (
    <svg viewBox="0 0 24 12" fill="none" focusable="false" className={styles.arrow}>
      <path d="M0 6h21M16 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}
