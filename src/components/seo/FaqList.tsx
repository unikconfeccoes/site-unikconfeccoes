import type { Faq } from '@/data/seo/types'
import { faqJsonLd } from '@/lib/seo'
import { JsonLd } from './JsonLd'
import { RichText } from './RichText'
import styles from './Content.module.css'

/**
 * Perguntas frequentes da página + FAQPage no JSON-LD, da mesma lista.
 * <details> nativo: a resposta está no HTML aberta ou fechada, então o
 * rastreador e o Ctrl+F encontram tudo.
 */
export function FaqList({ faq, title = 'Perguntas frequentes', withSchema = true }: { faq: readonly Faq[]; title?: string; withSchema?: boolean }) {
  if (!faq.length) return null
  return (
    <section id="perguntas" className={styles.section} aria-labelledby="perguntas-t">
      {withSchema ? <JsonLd data={faqJsonLd(faq)} /> : null}
      <h2 id="perguntas-t" className={styles.h2}>
        {title}
      </h2>
      <div className={styles.faq}>
        {faq.map((f, i) => (
          <details key={f.q} className={styles.faqItem} open={i === 0}>
            <summary className={styles.faqQ}>
              <span>{f.q}</span>
              <span className={styles.faqSign} aria-hidden="true" />
            </summary>
            <p className={styles.faqA}>
              <RichText text={f.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
