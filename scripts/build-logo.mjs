/**
 * PDF vetorial do logo → paths SVG tipados.
 *
 * O arquivo oficial é um PDF exportado do CorelDRAW com o logo DUAS vezes na
 * página (uma cópia deslocada 165 pt para cima). Usamos só o primeiro
 * conjunto: U, N, K, a barra vazada do "i" e o lettering CONFECÇÕES.
 *
 * Não há dependência de conversor (inkscape, pdftocairo): o stream de conteúdo
 * é inflado com zlib e os operadores de path (m, l, c, h) são traduzidos
 * direto para SVG, com o eixo Y invertido — no PDF ele cresce para cima.
 *
 * Saídas:
 *   src/data/generated/logo.ts   paths por letra, para animar peça a peça
 *   public/brand/unik.svg        logo completo (preto)
 *   public/brand/unik-mark.svg   só as letras
 *   src/app/icon.svg             favicon
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { inflateSync } from 'node:zlib'

const SRC = '_fontes/LOGOS UNIK CONFECÇÕES VETOR.pdf'
const pdf = readFileSync(SRC)
const text = pdf.toString('latin1')

const match = /10 0 obj[\s\S]*?stream\r?\n?([\s\S]*?)endstream/.exec(text)
if (!match) throw new Error('Stream de conteúdo (obj 10) não encontrado no PDF.')
const raw = Buffer.from(match[1].replace(/^[\r\n]+/, ''), 'latin1')
const stream = inflateSync(raw).toString('latin1')

/* ---------------------------------------------------------------- parse */

const shapes = []
let current = []
let nums = []

for (const tok of stream.split(/\s+/)) {
  if (/^-?\d+(\.\d+)?$/.test(tok)) {
    nums.push(Number(tok))
    continue
  }
  if (tok === 'm') current.push(['M', nums.slice(-2)])
  else if (tok === 'l') current.push(['L', nums.slice(-2)])
  else if (tok === 'c') current.push(['C', nums.slice(-6)])
  else if (tok === 'h') current.push(['Z', []])
  else if (['f', 'f*', 'b', 'b*', 'B', 'B*'].includes(tok)) {
    shapes.push({ evenOdd: tok.endsWith('*'), cmds: current })
    current = []
  }
  nums = []
}

// Primeiro conjunto: as cinco primeiras formas (U, N, K, i, CONFECÇÕES).
const [u, n, k, i, tag] = shapes.slice(0, 5)
if (!tag) throw new Error(`Esperava 5 formas, encontrei ${shapes.length}.`)

/* ------------------------------------------------------------- geometria */

const allPts = [u, n, k, i, tag].flatMap((s) => s.cmds.flatMap(([, a]) => chunk(a)))
const minX = Math.min(...allPts.map((p) => p[0]))
const maxY = Math.max(...allPts.map((p) => p[1]))

function chunk(arr) {
  const out = []
  for (let j = 0; j < arr.length; j += 2) out.push([arr[j], arr[j + 1]])
  return out
}

const r = (v) => Math.round(v * 100) / 100

function toD(shape) {
  return shape.cmds
    .map(([op, a]) => {
      if (op === 'Z') return 'Z'
      const pts = chunk(a).map(([x, y]) => `${r(x - minX)} ${r(maxY - y)}`)
      return `${op}${pts.join(' ')}`
    })
    .join('')
}

function bbox(shapesList) {
  const pts = shapesList.flatMap((s) => s.cmds.flatMap(([, a]) => chunk(a)))
  const xs = pts.map((p) => p[0] - minX)
  const ys = pts.map((p) => maxY - p[1])
  return { x0: r(Math.min(...xs)), y0: r(Math.min(...ys)), x1: r(Math.max(...xs)), y1: r(Math.max(...ys)) }
}

const full = bbox([u, n, k, i, tag])
const mark = bbox([u, n, k, i])
const iBox = bbox([i])

const parts = {
  u: toD(u),
  n: toD(n),
  i: toD(i),
  k: toD(k),
  tag: toD(tag),
}

/* ----------------------------------------------------------------- saídas */

mkdirSync('src/data/generated', { recursive: true })
mkdirSync('public/brand', { recursive: true })

const vb = (b) => `${b.x0} ${b.y0} ${r(b.x1 - b.x0)} ${r(b.y1 - b.y0)}`

writeFileSync(
  'src/data/generated/logo.ts',
  `/* Gerado por scripts/build-logo.mjs a partir de ${SRC}. Não editar à mão. */

export const LOGO = {
  /** Caixa do logo completo (letras + CONFECÇÕES). */
  full: { viewBox: '${vb(full)}', ratio: ${r((full.x1 - full.x0) / (full.y1 - full.y0))} },
  /** Caixa só das letras U N i K. */
  mark: { viewBox: '${vb(mark)}', ratio: ${r((mark.x1 - mark.x0) / (mark.y1 - mark.y0))} },
  /** Caixa da barra do "i" — o elemento gráfico recorrente do site. */
  bar: ${JSON.stringify(iBox)},
  parts: ${JSON.stringify(parts, null, 4).replace(/\n}/, '\n  }')},
} as const
`,
)

const svg = (b, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(b)}" fill="currentColor">${body}</svg>\n`
// O PDF pinta com preenchimento + contorno de 0,216 pt; sem o contorno, a
// junção do U com o N mostra uma fresta de 1 px.
const letters = `<g stroke="currentColor" stroke-width="0.22"><path d="${parts.u}"/><path d="${parts.n}"/><path d="${parts.k}"/></g><path fill-rule="evenodd" d="${parts.i}"/>`

writeFileSync('public/brand/unik.svg', svg(full, letters + `<path d="${parts.tag}"/>`).replaceAll('currentColor', '#0b0b0b'))
writeFileSync('public/brand/unik-mark.svg', svg(mark, letters).replaceAll('currentColor', '#0b0b0b'))

// Favicon: as letras em bronze sobre quadrado preto.
const pad = 18
const side = r(mark.x1 - mark.x0 + pad * 2)
writeFileSync(
  'src/app/icon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(mark.x0 - pad)} ${r(mark.y0 - (side - (mark.y1 - mark.y0)) / 2)} ${side} ${side}"><rect x="${r(mark.x0 - pad)}" y="${r(mark.y0 - (side - (mark.y1 - mark.y0)) / 2)}" width="${side}" height="${side}" rx="40" fill="#0b0b0b"/><g fill="#b39b68" stroke="#b39b68" stroke-width="0.4"><path d="${parts.u}"/><path d="${parts.n}"/><path d="${parts.k}"/></g><rect x="${iBox.x0}" y="${iBox.y0}" width="${r(iBox.x1 - iBox.x0)}" height="${r(iBox.y1 - iBox.y0)}" fill="#f3efe7"/></svg>\n`,
)

console.log('logo ok', { full: vb(full), mark: vb(mark), bar: iBox })
