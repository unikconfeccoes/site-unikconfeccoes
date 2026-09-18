import type { ReactNode } from 'react'
import styles from './PageHero.module.css'
import { Eyebrow } from './Typography'

type PageHeroProps = {
  eyebrow: string
  index?: string
  title: ReactNode
  children?: ReactNode
  aside?: ReactNode
  id?: string
}

/**
 * Abertura das páginas internas: faixa preta curta, título grande, a barra do
 * "i" como filete vertical à esquerda. Mantém o header no tom escuro e dá a
 * cada página a mesma entrada que o herói da home, em escala menor.
 */
export function PageHero({ eyebrow, index, title, children, aside, id }: PageHeroProps) {
  return (
    <section className={styles.hero} data-atmosphere="noite" data-section="noite" aria-labelledby={id}>
      <div className={`u-container ${styles.inner}`}>
        <span className={styles.bar} aria-hidden="true" />
        <div className={styles.main}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <h1 id={id} className={styles.title}>
            {title}
          </h1>
          {children ? <div className={styles.body}>{children}</div> : null}
        </div>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>
    </section>
  )
}
