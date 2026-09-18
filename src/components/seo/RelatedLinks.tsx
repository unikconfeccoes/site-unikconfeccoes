import Link from 'next/link'
import styles from './Content.module.css'

export type RelatedItem = { href: string; title: string; text?: string; kicker?: string }

/** Grade de links internos com contexto: o "leia também" que também é rastreável. */
export function RelatedLinks({ title = 'Continue lendo', items }: { title?: string; items: readonly RelatedItem[] }) {
  if (!items.length) return null
  return (
    <section className={styles.section} aria-labelledby="relacionados-t">
      <h2 id="relacionados-t" className={styles.h2}>
        {title}
      </h2>
      <ul className={styles.related}>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className={styles.relatedCard}>
              {it.kicker ? <span className={styles.relatedKicker}>{it.kicker}</span> : null}
              <span className={styles.relatedTitle}>{it.title}</span>
              {it.text ? <span className={styles.relatedText}>{it.text}</span> : null}
              <span className={styles.relatedArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
