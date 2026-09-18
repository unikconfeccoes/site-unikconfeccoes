'use client'

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import { useGsapOn } from '@/hooks/useGsap'
import { PHOTO_BY_ID } from '@/data/generated/photos'
import type { GarmentKind } from '@/data/catalog'
import { Garment } from '@/components/brand/Garment'
import styles from './Media.module.css'

type MediaProps = {
  /** id do manifesto de fotos. Sem foto, entra a silhueta da peça. */
  photoId?: string
  garment: GarmentKind
  alt: string
  sizes: string
  ratio?: number
  priority?: boolean
  /** `mask` desliza uma cortina que descobre a imagem; `none` entra parada. */
  motion?: 'mask' | 'none'
  /** Parallax interno, em % de deslocamento total. */
  parallax?: number
  /** Legenda de ficha técnica no quadro da silhueta ("Foto em produção"). */
  caption?: string
  tone?: 'raised' | 'sunken'
  className?: string
  children?: ReactNode
}

/**
 * Imagem com revelação editorial — foto real ou silhueta técnica.
 *
 * Toda imagem do site passa por aqui. Enquanto o ensaio de produto não
 * existe, o quadro mostra a silhueta da peça no estilo de ficha de modelagem;
 * quando uma foto entrar no manifesto com o mesmo id, ela assume o quadro sem
 * mudar uma linha de layout — a proporção é declarada, então o CLS é zero
 * nos dois casos.
 *
 * O gesto é de máscara (cortina que sai + imagem que assenta), nunca fade:
 * fade é o que faz uma foto parecer banner.
 */
export function Media({
  photoId,
  garment,
  alt,
  sizes,
  ratio = 4 / 5,
  priority = false,
  motion = 'mask',
  parallax = 0,
  caption,
  tone = 'sunken',
  className,
  children,
}: MediaProps) {
  const root = useRef<HTMLDivElement | null>(null)
  const photo = photoId ? PHOTO_BY_ID[photoId] : undefined

  useGsapOn(
    root,
    ({ gsap, root: el }) => {
      const curtain = el.querySelector<HTMLElement>('[data-curtain]')
      const media = el.querySelector<HTMLElement>('[data-media]')
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced || !media) {
        if (curtain) curtain.style.display = 'none'
        return
      }

      if (motion === 'mask' && curtain) {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          .fromTo(media, { scale: 1.16 }, { scale: 1, duration: 1.3, ease: 'power3.out' }, 0)
          .to(curtain, { yPercent: -101, duration: 1.05, ease: 'power4.inOut' }, 0)
      }

      if (parallax !== 0) {
        gsap.fromTo(
          media,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }

      /*
       * Rede de segurança: a cortina começa COBRINDO, então um ScrollTrigger
       * que falhe (start medido antes de a seção ganhar altura) deixaria a
       * imagem invisível para sempre. Se um segundo depois de o quadro estar
       * na tela a cortina ainda não saiu, ela é removida.
       */
      if (motion === 'mask' && curtain) {
        let timer = 0
        const guard = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return
            window.clearTimeout(timer)
            timer = window.setTimeout(() => {
              const t = window.getComputedStyle(curtain).transform
              if (t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)') curtain.style.display = 'none'
              guard.disconnect()
            }, 1200)
          },
          { threshold: 0.25 },
        )
        guard.observe(el)
        return () => {
          window.clearTimeout(timer)
          guard.disconnect()
        }
      }
      return undefined
    },
    [photoId, motion, parallax],
  )

  return (
    <div
      ref={root}
      className={[styles.frame, styles[tone], className].filter(Boolean).join(' ')}
      style={{ aspectRatio: ratio }}
      {...(photo ? {} : { role: 'img', 'aria-label': alt })}
    >
      <div data-media className={styles.media} style={parallax ? { inset: `-${parallax / 2}% 0` } : undefined}>
        {photo ? (
          <Image
            src={photo.src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            className={styles.img}
          />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.grid} aria-hidden="true" />
            <Garment kind={garment} className={styles.garment} />
          </div>
        )}
      </div>
      {!photo && caption ? (
        <span className={styles.caption} aria-hidden="true">
          {caption}
        </span>
      ) : null}
      {motion === 'mask' ? <div data-curtain className={styles.curtain} aria-hidden="true" /> : null}
      {children}
    </div>
  )
}
