'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { Label } from '@/components/primitives/Typography'
import { NAV_ITEMS, SITE, SOCIAL, WHATSAPP, whatsappUrl } from '@/data/site'
import { useGsapOn } from '@/hooks/useGsap'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { quoteTotal, useQuote } from '@/lib/quote-store'
import styles from './Header.module.css'

const DARK = new Set(['noite', 'grafite'])

/**
 * Cabeçalho.
 *
 * O topo carrega o essencial — marca, três destinos, o orçamento com contador
 * e o menu. O índice completo mora num overlay em tipografia grande.
 *
 * O TOM ACOMPANHA A SEÇÃO DE BAIXO: o site alterna preto e osso, e um header
 * de cor fixa desapareceria em metade das seções. Um IntersectionObserver
 * olha só a faixa do topo da viewport e o header troca de tom junto.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const [tone, setTone] = useState<'dark' | 'light'>('dark')
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const reduced = usePrefersReducedMotion()
  const items = useQuote()
  const count = quoteTotal(items)

  const close = useCallback(() => setOpen(false), [])

  // Rota nova, menu fechado — ajuste durante o render, não em efeito.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    if (open) setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]')
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const atm = entry.target.getAttribute('data-section') ?? ''
          setTone(DARK.has(atm) ? 'dark' : 'light')
        }
      },
      // Só a faixa onde o header mora: os primeiros ~6% da tela.
      { rootMargin: '0px 0px -94% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab' || !overlayRef.current) return
      const focusables = overlayRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    overlayRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      previouslyFocused?.focus()
    }
  }, [open, close])

  useGsapOn(
    overlayRef,
    ({ gsap, root }) => {
      if (!open || reduced) return
      gsap
        .timeline()
        .fromTo(root, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
        .fromTo(
          root.querySelectorAll('[data-nav-row]'),
          { yPercent: 115 },
          { yPercent: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
          0.25,
        )
        .fromTo(root.querySelectorAll('[data-nav-meta]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.5)
    },
    [open, reduced],
  )

  return (
    <>
      <header
        className={[styles.header, condensed && styles.condensed].filter(Boolean).join(' ')}
        data-tone={open ? 'dark' : tone}
        data-open={open || undefined}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.brand} aria-label={`${SITE.name}: página inicial`} onClick={close}>
            <Logo variant="mark" height="clamp(1.35rem, 2vw, 1.7rem)" labelled={false} />
          </Link>

          <nav className={styles.inline} aria-label="Navegação principal">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.inlineLink}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/lab" className={styles.inlineLink} aria-current={pathname === '/lab' ? 'page' : undefined}>
              UNIK Lab
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/orcamento" className={styles.quote} aria-label={`Orçamento: ${count} peças`}>
              <span className={styles.quoteLabel}>Orçamento</span>
              <span className={styles.quoteCount} data-filled={count > 0 || undefined} key={count}>
                {count}
              </span>
            </Link>

            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="menu-principal"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.toggleLabel}>{open ? 'Fechar' : 'Menu'}</span>
              <span className={styles.toggleIcon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="menu-principal"
        className={styles.overlay}
        data-atmosphere="noite"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className={styles.overlayInner}>
          <nav className={styles.index} aria-label="Seções do site">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={styles.indexItem}>
                  <span className={styles.rowMask}>
                    <Link href={item.href} className={styles.indexLink} data-nav-row onClick={close}>
                      <Label size="xs" numeric className={styles.indexNumber}>
                        {item.id}
                      </Label>
                      <span className={styles.indexLabel}>{item.label}</span>
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.aside}>
            <p className={styles.asideCopy} data-nav-meta>
              Transformando o seu <em>sonho</em> em realidade.
            </p>
            <div className={styles.asideContacts} data-nav-meta>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.asideLink}>
                <Label size="xs" muted>
                  WhatsApp
                </Label>
                <span>{WHATSAPP.display}</span>
              </a>
              <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.asideLink}>
                <Label size="xs" muted>
                  Instagram
                </Label>
                <span>{SOCIAL.instagram.handle}</span>
              </a>
              <a href={SOCIAL.instagramLab.url} target="_blank" rel="noopener noreferrer" className={styles.asideLink}>
                <Label size="xs" muted>
                  UNIK Lab
                </Label>
                <span>{SOCIAL.instagramLab.handle}</span>
              </a>
            </div>
            <div data-nav-meta>
              <Label size="xs" muted>
                {SITE.city}, {SITE.state} · Desde {SITE.founded}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
