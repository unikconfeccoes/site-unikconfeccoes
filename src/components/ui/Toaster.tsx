'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Toaster.module.css'

type Toast = { id: number; title: string; body?: string; href?: string; action?: string }

/** Dispara um aviso de qualquer lugar, sem contexto nem provider. */
export function toast(detail: Omit<Toast, 'id'>) {
  window.dispatchEvent(new CustomEvent<Omit<Toast, 'id'>>('unik:toast', { detail }))
}

/**
 * Aviso discreto no canto: "Adicionado ao orçamento". `role="status"` faz o
 * leitor de tela anunciar sem roubar o foco.
 */
export function Toaster() {
  const [current, setCurrent] = useState<Toast | null>(null)

  useEffect(() => {
    let timer = 0
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<Omit<Toast, 'id'>>).detail
      window.clearTimeout(timer)
      setCurrent({ ...detail, id: Date.now() })
      timer = window.setTimeout(() => setCurrent(null), 5200)
    }
    window.addEventListener('unik:toast', onToast)
    return () => {
      window.removeEventListener('unik:toast', onToast)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className={styles.region} role="status" aria-live="polite" data-atmosphere="noite">
      {current ? (
        <div key={current.id} className={styles.toast}>
          <span className={styles.bar} aria-hidden="true" />
          <div className={styles.text}>
            <strong className={styles.title}>{current.title}</strong>
            {current.body ? <span className={styles.body}>{current.body}</span> : null}
          </div>
          {current.href ? (
            <Link href={current.href} className={styles.action} onClick={() => setCurrent(null)}>
              {current.action ?? 'Ver'}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
