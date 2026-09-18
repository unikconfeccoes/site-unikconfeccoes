import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

/**
 * Texto com os dois marcadores do conteúdo editorial: [link](/rota) e
 * **negrito**. Links internos viram <Link> (prefetch e navegação do app);
 * é assim que cada página de conteúdo distribui autoridade para o catálogo.
 */
const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g

export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN)
  return parts.map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      const [, label, href] = link
      return href?.startsWith('/') ? (
        <Link key={i} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    }
    const bold = /^\*\*([^*]+)\*\*$/.exec(part)
    if (bold) return <strong key={i}>{bold[1]}</strong>
    return <Fragment key={i}>{part}</Fragment>
  })
}
