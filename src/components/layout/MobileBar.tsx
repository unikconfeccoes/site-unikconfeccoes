'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WhatsappGlyph } from '@/components/primitives/Cta'
import { whatsappUrl } from '@/data/site'
import { quoteTotal, useQuote } from '@/lib/quote-store'
import styles from './MobileBar.module.css'

/**
 * No celular a conversão fica sempre a um polegar de distância: orçamento e
 * WhatsApp numa barra fixa. Some na própria página de orçamento, onde o botão
 * de envio já é a ação principal.
 */
export function MobileBar() {
  const pathname = usePathname()
  const count = quoteTotal(useQuote())
  if (pathname === '/orcamento') return null

  return (
    <nav className={styles.bar} aria-label="Ações rápidas" data-atmosphere="noite">
      <Link href={count > 0 ? '/orcamento' : '/catalogo'} className={styles.primary}>
        {count > 0 ? (
          <>
            Ver orçamento <span className={styles.count}>{count} pç</span>
          </>
        ) : (
          'Montar orçamento'
        )}
      </Link>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.whats} aria-label="Conversar no WhatsApp">
        <WhatsappGlyph className={styles.icon} />
      </a>
    </nav>
  )
}
