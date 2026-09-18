import type { GarmentKind } from '@/data/catalog'
import styles from './Garment.module.css'

/**
 * Silhuetas técnicas das peças — o desenho de ficha de modelagem.
 *
 * Ocupam o lugar das fotografias enquanto o ensaio de produto não chega: em
 * vez de uma foto genérica repetida em todo card (que faria o catálogo parecer
 * um banco de imagens), cada modelo mostra o próprio desenho, em traço fino,
 * no vocabulário de ficha técnica que a confecção já usa. Quando as fotos
 * chegarem, `Media` passa a preferir a foto e isto some sozinho.
 *
 * viewBox 200×220, traço sem escala (`non-scaling-stroke`): a linha tem a
 * mesma espessura num card de 200 px e num herói de 900 px.
 */

type Shape = { outline: string; details: string; buttons?: readonly (readonly [number, number])[] }

const SHAPES: Record<GarmentKind, Shape> = {
  tee: {
    outline: 'M70 22 L86 16 C92 26 108 26 114 16 L130 22 L166 42 L154 76 L138 70 L138 204 L62 204 L62 70 L46 76 L34 42 Z',
    details: 'M86 16 C90 31 110 31 114 16 M62 194 L138 194 M48 70 L57 73 M152 70 L143 73',
  },
  polo: {
    outline: 'M70 22 L86 16 L100 30 L114 16 L130 22 L166 42 L154 76 L138 70 L138 204 L62 204 L62 70 L46 76 L34 42 Z',
    details: 'M86 16 L80 31 L96 35 L100 30 M114 16 L120 31 L104 35 L100 30 M96 35 L96 64 L104 64 L104 35 M62 194 L138 194 M48 70 L57 73 M152 70 L143 73',
    buttons: [[100, 44], [100, 55]],
  },
  oversized: {
    outline: 'M64 24 L86 16 C92 26 108 26 114 16 L136 24 L176 58 L162 94 L144 86 L146 204 L54 204 L56 86 L38 94 L24 58 Z',
    details: 'M86 16 C90 31 110 31 114 16 M54 194 L146 194 M42 86 L52 90 M158 86 L148 90',
  },
  'tee-long': {
    outline: 'M70 22 L86 16 C92 26 108 26 114 16 L130 22 L154 36 L174 150 L158 154 L140 78 L138 204 L62 204 L60 78 L42 154 L26 150 L46 36 Z',
    details: 'M86 16 C90 31 110 31 114 16 M62 194 L138 194 M157 144 L172 140 M28 140 L43 144',
  },
  hoodie: {
    outline: 'M68 30 L84 24 L116 24 L132 30 L154 42 L174 154 L158 158 L140 86 L140 204 L60 204 L60 86 L42 158 L26 154 L46 42 Z',
    details:
      'M84 24 C80 2 120 2 116 24 M90 26 C94 40 106 40 110 26 M96 38 L95 60 M104 38 L105 60 M76 150 L124 150 L132 186 L68 186 Z M60 194 L140 194 M157 148 L172 144 M28 144 L43 148',
  },
  shirt: {
    outline: 'M70 22 L88 14 L112 14 L130 22 L152 36 L172 150 L156 154 L140 78 L140 206 L60 206 L60 78 L44 154 L28 150 L48 36 Z',
    details: 'M88 14 L84 29 L100 31 L116 29 L112 14 M100 31 L100 206 M70 60 L86 60 L86 78 L70 78 Z M155 144 L170 140 M30 140 L45 144',
    buttons: [[100, 50], [100, 80], [100, 110], [100, 140], [100, 170]],
  },
  dolma: {
    outline: 'M70 24 L86 18 L114 18 L130 24 L152 38 L172 150 L156 154 L140 80 L140 206 L60 206 L60 80 L44 154 L28 150 L48 38 Z',
    details: 'M86 18 L86 9 L114 9 L114 18 M118 20 C120 60 120 120 120 206 M155 144 L170 140 M30 140 L45 144 M70 62 L84 62',
    buttons: [[92, 46], [110, 46], [92, 74], [110, 74], [92, 102], [110, 102], [92, 130], [110, 130]],
  },
  pants: {
    outline: 'M64 16 L136 16 L146 206 L110 206 L100 76 L90 206 L54 206 Z',
    details: 'M64 27 L136 27 M100 27 L100 62 M70 27 C73 40 79 45 85 45 M130 27 C127 40 121 45 115 45 M56 196 L90 196 M110 196 L144 196',
  },
  apron: {
    outline: 'M80 22 L120 22 L120 60 C140 62 148 70 150 80 L146 206 L54 206 L50 80 C52 70 60 62 80 60 Z',
    details: 'M80 22 C80 0 120 0 120 22 M50 82 L26 94 M150 82 L174 94 M70 120 L130 120 L130 152 L70 152 Z M100 120 L100 152 M54 196 L146 196',
  },
  shorts: {
    outline: 'M58 40 L142 40 L152 170 L110 176 L100 96 L90 176 L48 170 Z',
    details: 'M58 52 L142 52 M100 52 L100 84 M92 44 L92 60 M108 44 L108 60 M50 160 L90 166 M110 166 L150 160',
  },
  jacket: {
    outline: 'M68 26 L86 18 L114 18 L132 26 L154 40 L174 152 L158 156 L140 82 L140 204 L60 204 L60 82 L42 156 L26 152 L46 40 Z',
    details:
      'M86 18 L86 8 L114 8 L114 18 M100 8 L100 204 M72 150 L90 132 M128 150 L110 132 M60 192 L140 192 M157 146 L172 142 M28 142 L43 146',
  },
  coat: {
    outline: 'M70 22 L86 16 L114 16 L130 22 L152 36 L172 150 L156 154 L142 80 L144 214 L56 214 L58 80 L44 154 L28 150 L48 36 Z',
    details:
      'M86 16 L100 62 L114 16 M86 16 L78 40 L95 52 M114 16 L122 40 L105 52 M100 62 L100 214 M64 150 L86 150 L86 174 L64 174 Z M114 150 L136 150 L136 174 L114 174 Z M112 74 L130 74 M155 144 L170 140 M30 140 L45 144',
    buttons: [[100, 84], [100, 114], [100, 144]],
  },
}

type GarmentProps = {
  kind: GarmentKind
  className?: string
}

export function Garment({ kind, className }: GarmentProps) {
  const shape = SHAPES[kind]
  return (
    <svg
      viewBox="0 0 200 220"
      className={className ? `${styles.garment} ${className}` : styles.garment}
      aria-hidden="true"
      focusable="false"
    >
      <path d={shape.outline} className={styles.outline} />
      <path d={shape.details} className={styles.details} />
      {shape.buttons?.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" className={styles.button} />
      ))}
    </svg>
  )
}
