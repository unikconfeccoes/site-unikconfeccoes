/**
 * Recortes do Instagram → fotos de portfólio.
 *
 * Enquanto as fotos de estúdio não chegam, o único acervo real da UNIK são os
 * posts do @unik.confeccoes e do @uniklab_. As capturas de tela do perfil
 * (_fontes/2.png e 3.png) têm a grade em ~376×501 px por post; aqui cada post
 * útil é recortado, perde a faixa de cima (onde o Instagram desenha o ícone de
 * vídeo/carrossel) e sai em 4:5.
 *
 * Posts que são arte gráfica com texto (abadá, "3 dicas", promoções) ficam de
 * fora de propósito: no site eles competiriam com a tipografia da página.
 *
 * Saídas:
 *   public/img/portfolio/*.jpg
 *   src/data/generated/photos.ts   dimensões + LQIP para next/image
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

// Grade do perfil em 2.png: colunas e linhas em pixels do arquivo original.
const COLS = [265, 645, 1024, 1404, 1784]
const ROWS = [70, 575, 1080]
const TOP_CUT = 58 // faixa do ícone do Instagram

const cell = (row, col) => ({
  left: COLS[col] + 2,
  top: ROWS[row] + 2 + TOP_CUT,
  width: COLS[col + 1] - COLS[col] - 4,
  height: ROWS[row + 1] - ROWS[row] - 4 - TOP_CUT,
})

const SHOTS = [
  { id: 'versa', src: '_fontes/2.png', box: cell(0, 0), alt: 'Bordado do logo do restaurante Versá em dólmã preta, com nome do chef executivo' },
  { id: 'instituto-federal', src: '_fontes/2.png', box: cell(0, 1), alt: 'Moletons do terceirão do Instituto Federal, em azul e branco, com serigrafia nas costas' },
  { id: 'criadores', src: '_fontes/2.png', box: cell(0, 2), alt: 'Camiseta azul-marinho com a frase Criadores do Futuro e etiqueta UNIK na gola' },
  { id: 'polos', src: '_fontes/2.png', box: cell(0, 3), alt: 'Camisas polo azul royal e preta com bandeira do Brasil bordada na manga' },
  { id: 'dtf', src: '_fontes/2.png', box: cell(1, 0), alt: 'Mão retirando o filme de uma estampa DTF recém-aplicada em camiseta preta' },
  { id: 'lab-serigrafia', src: '_fontes/3.png', box: { left: 267, top: 824 + TOP_CUT, width: 375, height: 351 - TOP_CUT }, alt: 'Camisetas bege enfileiradas com estampa vermelha em serigrafia, produção UNIK LAB' },
]

mkdirSync('public/img/portfolio', { recursive: true })
mkdirSync('src/data/generated', { recursive: true })

const manifest = []

for (const shot of SHOTS) {
  const base = sharp(shot.src).extract(shot.box)
  const meta = await base.clone().toBuffer({ resolveWithObject: true })
  const { width, height } = meta.info

  // 4:5 centrado — a proporção de toda a grade de portfólio.
  const targetW = Math.min(width, Math.round(height * 0.8))
  const targetH = Math.round(targetW / 0.8)
  const cropped = sharp(meta.data).extract({
    left: Math.round((width - targetW) / 2),
    top: Math.round((height - targetH) / 2),
    width: targetW,
    height: targetH,
  })

  const out = `public/img/portfolio/${shot.id}.jpg`
  await cropped.clone().sharpen({ sigma: 0.6 }).jpeg({ quality: 88, progressive: true, mozjpeg: true }).toFile(out)

  const blur = await cropped.clone().resize(12).jpeg({ quality: 50 }).toBuffer()
  manifest.push({
    id: shot.id,
    src: `/img/portfolio/${shot.id}.jpg`,
    width: targetW,
    height: targetH,
    alt: shot.alt,
    blurDataURL: `data:image/jpeg;base64,${blur.toString('base64')}`,
  })
}

writeFileSync(
  'src/data/generated/photos.ts',
  `/* Gerado por scripts/build-images.mjs. Não editar à mão. */

export type Photo = {
  id: string
  src: string
  width: number
  height: number
  alt: string
  blurDataURL: string
}

export const PHOTOS: readonly Photo[] = ${JSON.stringify(manifest, null, 2)}

export const PHOTO_BY_ID: Record<string, Photo> = Object.fromEntries(PHOTOS.map((p) => [p.id, p]))
`,
)

console.log('images ok', manifest.map((m) => `${m.id} ${m.width}×${m.height}`))
