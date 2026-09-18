import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { Label } from '@/components/primitives/Typography'
import { CATEGORIES } from '@/data/catalog'
import { NAV_ITEMS, SITE, SOCIAL, WHATSAPP, whatsappUrl } from '@/data/site'
import styles from './Footer.module.css'

/**
 * Encerramento. O logo ocupa a largura inteira da página, como a assinatura
 * bordada na etiqueta — é a última coisa que se vê, e a mais estável.
 * Server Component: nada aqui precisa de interatividade.
 */
export function Footer() {
  return (
    <footer className={styles.footer} data-atmosphere="noite" data-section="noite">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <Label size="xs" muted as="h2">
              Catálogo
            </Label>
            <ul className={styles.list}>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/catalogo?categoria=${c.slug}`} className={styles.link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <Label size="xs" muted as="h2">
              Navegar
            </Label>
            <ul className={styles.list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <Label size="xs" muted as="h2">
              Contato
            </Label>
            <ul className={styles.list}>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  WhatsApp {WHATSAPP.display}
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {SOCIAL.instagram.handle}
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagramLab.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {SOCIAL.instagramLab.handle}
                </a>
              </li>
              <li>
                <a href={SOCIAL.linktree.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {SOCIAL.linktree.handle}
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <Label size="xs" muted as="h2">
              Onde
            </Label>
            <p className={styles.where}>
              {SITE.city}, {SITE.state}
              <br />
              Uniformes premium desde {SITE.founded}
            </p>
          </div>
        </div>

        <div className={styles.signature}>
          <Logo variant="full" height="auto" labelled className={styles.logo} />
        </div>

        <div className={styles.base}>
          <Label size="xs" muted>
            © {new Date().getFullYear()} {SITE.name}
          </Label>
          <Label size="xs" muted>
            {SITE.tagline}
          </Label>
        </div>
      </div>
    </footer>
  )
}
