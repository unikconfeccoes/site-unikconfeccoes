import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/primitives/Typography'
import type { Crumb } from '@/lib/seo'
import { Breadcrumbs } from './Breadcrumbs'
import { RichText } from './RichText'
import { B2BCta } from './B2BCta'
import styles from './Content.module.css'

type TocItem = { id: string; title: string }

type ContentLayoutProps = {
  crumbs: readonly Crumb[]
  kicker: string
  title: ReactNode
  lead: string
  meta?: ReactNode
  toc?: readonly TocItem[]
  /** Contexto para a mensagem do WhatsApp da caixa lateral. */
  ctaContext?: string
  children: ReactNode
  /** Conteúdo em largura total depois do artigo (relacionados, grades). */
  after?: ReactNode
}

/**
 * O esqueleto de TODA página de conteúdo (segmentos, técnicas, tecidos,
 * guias, institucionais). Um só layout garante o mesmo padrão de SEO em
 * todas: trilha + H1 único + resposta direta no primeiro parágrafo + sumário
 * com âncoras + caixa de orçamento + FAQ + links relacionados.
 */
export function ContentLayout({ crumbs, kicker, title, lead, meta, toc, ctaContext, children, after }: ContentLayoutProps) {
  return (
    <>
      <header className={styles.hero} data-atmosphere="noite" data-section="noite">
        <div className={`u-container ${styles.heroInner}`}>
          <Breadcrumbs crumbs={crumbs} />
          <Eyebrow>{kicker}</Eyebrow>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.lead}>
            <RichText text={lead} />
          </p>
          {meta ? <div className={styles.meta}>{meta}</div> : null}
        </div>
      </header>

      <div className={styles.body} data-atmosphere="atelier" data-section="atelier">
        <div className={`u-container ${styles.grid}`}>
          <article className={styles.article}>{children}</article>
          <div className={styles.aside}>
            <div className={styles.asideSticky}>
              {toc && toc.length > 1 ? (
                <nav className={styles.toc} aria-label="Nesta página">
                  <p className={styles.tocTitle}>Nesta página</p>
                  <ol>
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>{t.title}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <B2BCta context={ctaContext} />
            </div>
          </div>
        </div>
        {after ? <div className={`u-container ${styles.after}`}>{after}</div> : null}
      </div>
    </>
  )
}
