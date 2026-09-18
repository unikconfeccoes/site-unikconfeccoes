import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { Label } from '@/components/primitives/Typography'
import { CATEGORIES, SEGMENTS, TECHNIQUES } from '@/data/catalog'
import { COMMERCIAL, SITE, SOCIAL, WHATSAPP, whatsappUrl } from '@/data/site'
import { GUIDES } from '@/data/seo/guides'
import { ROUTES, type GuideSlug } from '@/data/seo/routes'
import styles from './Footer.module.css'

/**
 * Rodapé = hub de links internos.
 *
 * Várias páginas de conteúdo não estão no menu principal (seria poluição
 * visual), mas TODAS são alcançáveis a partir daqui ou do mapa do site. É
 * assim que o Google descobre e distribui relevância para elas, sem nenhuma
 * página escondida do visitante.
 */
export function Footer() {
  return (
    <footer className={styles.footer} data-atmosphere="noite" data-section="noite">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.pitch}>
            {COMMERCIAL.especialidade} Uniformes para empresas em {SITE.city} desde {SITE.founded}.
          </p>
          <p className={styles.rules}>
            {COMMERCIAL.minimo} Pagamento: {COMMERCIAL.pagamento.charAt(0).toLowerCase()}
            {COMMERCIAL.pagamento.slice(1)}
          </p>
        </div>

        <div className={styles.grid}>
          <nav className={styles.col} aria-label="Uniformes por segmento">
            <Label size="xs" muted as="h2">
              Uniformes para
            </Label>
            <ul className={styles.list}>
              {SEGMENTS.map((s) => (
                <li key={s.slug}>
                  <Link href={ROUTES.segmento(s.slug)} className={styles.link}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Linhas do catálogo">
            <Label size="xs" muted as="h2">
              Catálogo
            </Label>
            <ul className={styles.list}>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={ROUTES.linha(c.slug)} className={styles.link}>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.catalogo} className={styles.link}>
                  Todos os modelos
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Personalização e tecidos">
            <Label size="xs" muted as="h2">
              Personalização
            </Label>
            <ul className={styles.list}>
              {TECHNIQUES.map((t) => (
                <li key={t.slug}>
                  <Link href={ROUTES.tecnica(t.slug)} className={styles.link}>
                    {t.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.tecidos} className={styles.link}>
                  Guia de tecidos
                </Link>
              </li>
              <li>
                <Link href={ROUTES.glossario} className={styles.link}>
                  Glossário
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Guias">
            <Label size="xs" muted as="h2">
              Guias
            </Label>
            <ul className={styles.list}>
              {GUIDES.slice(0, 6).map((g) => (
                <li key={g.slug}>
                  <Link href={ROUTES.guia(g.slug as GuideSlug)} className={styles.link}>
                    {g.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.guias} className={styles.link}>
                  Todos os guias
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Institucional">
            <Label size="xs" muted as="h2">
              UNIK
            </Label>
            <ul className={styles.list}>
              <li>
                <Link href={ROUTES.empresas} className={styles.link}>
                  Para empresas
                </Link>
              </li>
              <li>
                <Link href={ROUTES.brasilia} className={styles.link}>
                  Confecção em Brasília
                </Link>
              </li>
              <li>
                <Link href={ROUTES.lab} className={styles.link}>
                  UNIK Lab (private label)
                </Link>
              </li>
              <li>
                <Link href={ROUTES.sobre} className={styles.link}>
                  Sobre
                </Link>
              </li>
              <li>
                <Link href={ROUTES.faq} className={styles.link}>
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link href={ROUTES.mapa} className={styles.link}>
                  Mapa do site
                </Link>
              </li>
            </ul>
          </nav>

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
              <li className={styles.where}>
                {SITE.city}, {SITE.state}
              </li>
            </ul>
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
