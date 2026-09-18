'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Display, Eyebrow, Serif } from '@/components/primitives/Typography'
import { PRODUCTS, SEGMENTS, type SegmentSlug } from '@/data/catalog'
import { useGsapOn } from '@/hooks/useGsap'
import { useHasPointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { ROUTES } from '@/data/seo/routes'
import styles from './Segmentos.module.css'

const COUNT: Record<SegmentSlug, number> = Object.fromEntries(
  SEGMENTS.map((s) => [s.slug, PRODUCTS.filter((p) => p.segments.includes(s.slug)).length]),
) as Record<SegmentSlug, number>

/**
 * PARA QUEM — um índice editorial em tipografia grande.
 *
 * No mouse, a imagem do segmento flutua junto ao cursor enquanto a linha está
 * sob ele (gsap.quickTo, que reaproveita um só tween em vez de criar um por
 * movimento). Em toque não há hover: cada linha mostra a própria miniatura.
 */
export function Segmentos() {
  const root = useRef<HTMLDivElement | null>(null)
  const preview = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState<SegmentSlug | null>(null)
  const hasPointer = useHasPointer()
  const reduced = usePrefersReducedMotion()
  const floating = hasPointer && !reduced
  const movers = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  useGsapOn(
    root,
    ({ gsap: g, root: el }) => {
      if (preview.current) {
        movers.current = {
          x: g.quickTo(preview.current, 'x', { duration: 0.55, ease: 'power3.out' }),
          y: g.quickTo(preview.current, 'y', { duration: 0.55, ease: 'power3.out' }),
        }
      }
      const mm = g.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        g.fromTo(
          el.querySelectorAll('[data-row-inner]'),
          { yPercent: 100 },
          { yPercent: 0, duration: 1, stagger: 0.07, ease: 'power4.out', scrollTrigger: { trigger: el.querySelector('[data-rows]'), start: 'top 80%', once: true } },
        )
      })
      return () => mm.revert()
    },
    [],
  )

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!floating || !root.current || !movers.current) return
    const rect = root.current.getBoundingClientRect()
    movers.current.x(event.clientX - rect.left)
    movers.current.y(event.clientY - rect.top)
  }

  return (
    <Section id="segmentos" atmosphere="atelier" labelledBy="segmentos-title">
      <div ref={root} className={`u-container ${styles.root}`} onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
        <header className={styles.head}>
          <Eyebrow index="05">Para quem</Eyebrow>
          <Display id="segmentos-title" size="2">
            Uniforme para cada <Serif>ofício</Serif>
          </Display>
        </header>

        <ul data-rows className={styles.rows}>
          {SEGMENTS.map((seg, i) => (
            <li key={seg.slug} className={styles.row}>
              <Link
                href={ROUTES.segmento(seg.slug)}
                className={styles.link}
                data-active={active === seg.slug || undefined}
                data-dim={(active !== null && active !== seg.slug) || undefined}
                onMouseEnter={() => setActive(seg.slug)}
                onFocus={() => setActive(seg.slug)}
                onBlur={() => setActive(null)}
                data-cursor="Ver peças"
              >
                <span className={styles.mask}>
                  <span data-row-inner className={styles.rowInner}>
                    <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.name}>{seg.name}</span>
                    <span className={styles.line}>{seg.line}</span>
                    <span className={styles.count}>{COUNT[seg.slug]} modelos →</span>
                  </span>
                </span>
                <span className={styles.thumb} aria-hidden="true">
                  <Media photoId={seg.photoId} garment={seg.garment} alt="" sizes="96px" ratio={1} motion="none" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* O quadro flutuante: todas as imagens montadas, só a ativa aparece —
            trocar de linha não espera download nenhum. */}
        <div ref={preview} className={styles.preview} data-visible={(floating && active !== null) || undefined} aria-hidden="true">
          {SEGMENTS.map((seg) => (
            <div key={seg.slug} className={styles.previewItem} data-on={active === seg.slug || undefined}>
              <Media photoId={seg.photoId} garment={seg.garment} alt="" sizes="20rem" motion="none" tone="raised" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
