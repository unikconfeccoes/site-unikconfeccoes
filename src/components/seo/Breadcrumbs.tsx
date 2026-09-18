import Link from 'next/link'
import { breadcrumbJsonLd, type Crumb } from '@/lib/seo'
import { JsonLd } from './JsonLd'
import styles from './Breadcrumbs.module.css'

/**
 * Trilha de navegação visível + BreadcrumbList. As duas vêm da mesma lista:
 * o Google só aceita o dado estruturado quando ele corresponde ao que está
 * na tela.
 */
export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  const all: Crumb[] = [{ name: 'Início', path: '/' }, ...crumbs]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Você está em" className={styles.nav}>
        <ol className={styles.list}>
          {all.map((c, i) => (
            <li key={c.path} className={styles.item}>
              {i < all.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
