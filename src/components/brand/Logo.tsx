import { LOGO } from '@/data/generated/logo'
import styles from './Logo.module.css'

type LogoProps = {
  /** `mark` são só as letras U N i K; `full` inclui o CONFECÇÕES. */
  variant?: 'mark' | 'full'
  height?: string
  /** `true` quando o logo é o nome acessível do elemento. */
  labelled?: boolean
  /**
   * Barra do "i" sólida (como no avatar do Instagram) em vez de vazada (como
   * no vetor). Sólida lê melhor em tamanho pequeno e sobre fundo escuro.
   */
  solidBar?: boolean
  className?: string
}

/**
 * O logo oficial, inline.
 *
 * São os paths do PDF vetorial (scripts/build-logo.mjs), sem redesenho. Inline
 * para pintar com as variáveis da atmosfera e para animar peça a peça: cada
 * letra carrega `data-logo-part`, e a barra do "i" — o elemento gráfico que o
 * site inteiro reaproveita — carrega `data-logo-bar`.
 *
 * Cores: letras em `--logo-letters` e barra em `--logo-bar`, ambas caindo em
 * currentColor quando não definidas.
 */
export function Logo({ variant = 'mark', height = '1em', labelled = true, solidBar = true, className }: LogoProps) {
  const box = LOGO[variant]
  const { bar, parts } = LOGO

  return (
    <svg
      className={className ? `${styles.logo} ${className}` : styles.logo}
      viewBox={box.viewBox}
      style={{ height, width: `calc(${height} * ${box.ratio})` }}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? 'UNIK Confecções' : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <g className={styles.letters}>
        {/* Cada letra num <g> próprio: o GSAP anima grupos SVG com transform
            estável; direto no <path>, o estado se perdia no remount do Strict Mode. */}
        <g data-logo-part="u">
          <path d={parts.u} />
        </g>
        <g data-logo-part="n">
          <path d={parts.n} />
        </g>
        <g data-logo-part="k">
          <path d={parts.k} />
        </g>
      </g>
      <g className={styles.bar} data-logo-bar>
        {solidBar ? (
          <rect x={bar.x0} y={bar.y0} width={bar.x1 - bar.x0} height={bar.y1 - bar.y0} />
        ) : (
          <path d={parts.i} fillRule="evenodd" />
        )}
      </g>
      {variant === 'full' ? (
        <g data-logo-part="tag">
          <path d={parts.tag} className={styles.tag} />
        </g>
      ) : null}
    </svg>
  )
}
