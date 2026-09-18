'use client'

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { Media } from '@/components/primitives/Media'
import { Cta } from '@/components/primitives/Cta'
import { Chip } from '@/components/ui/Chip'
import { toast } from '@/components/ui/Toaster'
import { SizeGrid } from '@/components/catalog/SizeGrid'
import {
  CATEGORY_BY_SLUG,
  POSITIONS,
  SEGMENT_BY_SLUG,
  TECHNIQUE_BY_SLUG,
  fabricPrice,
  startingPrice,
  type Product,
} from '@/data/catalog'
import { ATACADO_MIN, whatsappUrl } from '@/data/site'
import { formatBRL } from '@/lib/format'
import { addQuoteItem, itemTotal } from '@/lib/quote-store'
import styles from './ProductView.module.css'

const COLOR_SUGGESTIONS = ['Preto', 'Branco', 'Marinho', 'Royal', 'Cinza', 'Vinho', 'Verde', 'Bege'] as const

/**
 * Página do modelo + configurador.
 *
 * O configurador é o formulário de orçamento, quebrado em cinco decisões na
 * ordem em que um comprador de uniforme pensa: tecido → cor → quantos de cada
 * tamanho → como personalizar → observações. Nada é obrigatório além de ter
 * ao menos uma peça: o resto a UNIK confirma na conversa.
 *
 * A barra de atacado é o gatilho comercial da planilha (60+ peças): mostrar
 * quanto falta é o que faz 52 peças virarem 60.
 */
export function ProductView({ product }: { product: Product }) {
  const uid = useId().replace(/:/g, '')
  const category = CATEGORY_BY_SLUG[product.category]
  const [fabricId, setFabricId] = useState(product.fabrics[0]?.id ?? '')
  const [color, setColor] = useState('')
  const [sizes, setSizes] = useState<Record<string, number>>({})
  const [techniques, setTechniques] = useState<string[]>([])
  const [positions, setPositions] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const fabric = product.fabrics.find((f) => f.id === fabricId) ?? product.fabrics[0]
  const price = fabric ? fabricPrice(fabric) : null
  const total = itemTotal({ sizes })
  const toAtacado = Math.max(0, ATACADO_MIN - total)
  const progress = Math.min(1, total / ATACADO_MIN)
  const isAtacado = total >= ATACADO_MIN

  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const techniqueNames = useMemo(() => product.techniques.map((t) => TECHNIQUE_BY_SLUG[t].name), [product.techniques])

  const add = () => {
    if (!fabric || total === 0) return
    addQuoteItem({
      productSlug: product.slug,
      productName: product.name,
      fabricLabel: fabric.label,
      color: color.trim(),
      sizes: Object.fromEntries(Object.entries(sizes).filter(([, n]) => n > 0)),
      techniques,
      positions,
      notes: notes.trim(),
    })
    toast({
      title: `${product.name} no orçamento`,
      body: `${total} ${total === 1 ? 'peça' : 'peças'} · ${fabric.label}`,
      href: '/orcamento',
      action: 'Ver orçamento',
    })
    setSizes({})
    setNotes('')
  }

  return (
    <div className={styles.layout}>
      {/* ---------------------------------------------------- coluna visual */}
      <div className={styles.visual}>
        <div className={styles.visualSticky}>
          <Media
            garment={product.garment}
            alt={`Silhueta do modelo ${product.name}`}
            sizes="(min-width: 1024px) 45vw, 100vw"
            tone="raised"
            priority
            caption="Foto em produção"
          />
          <dl className={styles.spec}>
            <div>
              <dt>Linha</dt>
              <dd>{category.name}</dd>
            </div>
            <div>
              <dt>Tecidos</dt>
              <dd>{product.fabrics.map((f) => f.label).join(' · ')}</dd>
            </div>
            <div>
              <dt>Personalização</dt>
              <dd>{techniqueNames.join(' · ')}</dd>
            </div>
            <div>
              <dt>Tamanhos</dt>
              <dd>{product.sizes.length > 1 ? `${product.sizes[0]} ao ${product.sizes[product.sizes.length - 1]}` : product.sizes[0]}</dd>
            </div>
            <div>
              <dt>Indicado para</dt>
              <dd>{product.segments.map((s) => SEGMENT_BY_SLUG[s].name).join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ------------------------------------------------- coluna de compra */}
      <div className={styles.buy}>
        <header className={styles.head}>
          <nav aria-label="Trilha" className={styles.crumbs}>
            <Link href="/catalogo">Catálogo</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/catalogo?categoria=${product.category}`}>{category.name}</Link>
          </nav>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.summary}>{product.summary}</p>
          <p className={styles.from}>
            <span>a partir de</span>
            <strong className="u-tnum">{formatBRL(startingPrice(product))}</strong>
            <span>/ peça no atacado</span>
          </p>
          <ul className={styles.highlights}>
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </header>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            add()
          }}
        >
          {/* 01 — tecido */}
          <fieldset className={styles.step}>
            <legend className={styles.legend}>
              <span className={styles.stepNum}>01</span> Tecido
            </legend>
            <div className={styles.fabrics}>
              {product.fabrics.map((f) => {
                const p = fabricPrice(f)
                return (
                  <label key={f.id} className={styles.fabric} data-checked={f.id === fabricId || undefined}>
                    <input
                      type="radio"
                      name={`${uid}-fabric`}
                      value={f.id}
                      checked={f.id === fabricId}
                      onChange={() => setFabricId(f.id)}
                      className="u-visually-hidden"
                    />
                    <span className={styles.fabricName}>{f.label}</span>
                    <span className={styles.fabricNote}>{f.note}</span>
                    <span className={styles.fabricPrice}>
                      a partir de <strong className="u-tnum">{formatBRL(p.atacado)}</strong>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {/* 02 — cor */}
          <fieldset className={styles.step}>
            <legend className={styles.legend}>
              <span className={styles.stepNum}>02</span> Cor
            </legend>
            <div className={styles.chips}>
              {COLOR_SUGGESTIONS.map((c) => (
                <Chip key={c} size="sm" pressed={color === c} onClick={() => setColor(color === c ? '' : c)}>
                  {c}
                </Chip>
              ))}
            </div>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Ou descreva a cor (ex.: azul da marca, Pantone 2945 C)</span>
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className={styles.input} maxLength={80} />
            </label>
            <p className={styles.hint}>A disponibilidade de cor por tecido é confirmada no orçamento.</p>
          </fieldset>

          {/* 03 — tamanhos */}
          <fieldset className={styles.step}>
            <legend className={styles.legend}>
              <span className={styles.stepNum}>03</span> Quantidade por tamanho
            </legend>
            <SizeGrid sizes={product.sizes} value={sizes} onChange={setSizes} idPrefix={`${uid}-size`} />

            <div className={styles.atacado} data-done={isAtacado || undefined}>
              <div className={styles.atacadoHead}>
                <span className={styles.atacadoTotal}>
                  <strong className="u-tnum">{total}</strong> {total === 1 ? 'peça' : 'peças'}
                </span>
                <span className={styles.atacadoMsg} aria-live="polite">
                  {total === 0
                    ? `Atacado a partir de ${ATACADO_MIN} peças`
                    : isAtacado
                      ? 'Preço de atacado liberado'
                      : `Faltam ${toAtacado} para o preço de atacado`}
                </span>
              </div>
              <div className={styles.meter} aria-hidden="true">
                <span className={styles.meterFill} style={{ transform: `scaleX(${progress})` }} />
                {/* A barra do "i" marca a linha de chegada. */}
                <span className={styles.meterGoal} />
              </div>
              {price ? (
                <p className={styles.unitPrice}>
                  <span>
                    Até {ATACADO_MIN - 1} pç <strong className="u-tnum">{formatBRL(price.varejo)}</strong>
                  </span>
                  <span data-active={isAtacado || undefined}>
                    {ATACADO_MIN}+ pç <strong className="u-tnum">{formatBRL(price.atacado)}</strong>
                  </span>
                  <span className={styles.unitNote}>por peça, com personalização simples</span>
                </p>
              ) : null}
            </div>
          </fieldset>

          {/* 04 — personalização */}
          <fieldset className={styles.step}>
            <legend className={styles.legend}>
              <span className={styles.stepNum}>04</span> Personalização
            </legend>
            <span className={styles.fieldLabel}>Técnica</span>
            <div className={styles.chips}>
              {product.techniques.map((t) => (
                <Chip key={t} size="sm" pressed={techniques.includes(TECHNIQUE_BY_SLUG[t].name)} onClick={() => setTechniques(toggle(techniques, TECHNIQUE_BY_SLUG[t].name))}>
                  {TECHNIQUE_BY_SLUG[t].name}
                </Chip>
              ))}
              <Chip size="sm" pressed={techniques.includes('Sem personalização')} onClick={() => setTechniques(toggle(techniques, 'Sem personalização'))}>
                Sem personalização
              </Chip>
            </div>
            <span className={styles.fieldLabel}>Onde vai a arte</span>
            <div className={styles.chips}>
              {POSITIONS.map((pos) => (
                <Chip key={pos} size="sm" pressed={positions.includes(pos)} onClick={() => setPositions(toggle(positions, pos))}>
                  {pos}
                </Chip>
              ))}
            </div>
          </fieldset>

          {/* 05 — observações */}
          <fieldset className={styles.step}>
            <legend className={styles.legend}>
              <span className={styles.stepNum}>05</span> Observações
            </legend>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Nomes bordados, detalhes da arte, prazo, referência…</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={styles.textarea} rows={3} maxLength={600} />
            </label>
            <p className={styles.hint}>O arquivo da arte você envia na conversa do WhatsApp, junto com o orçamento.</p>
          </fieldset>

          <div className={styles.submit}>
            <Cta type="submit" size="lg" icon="plus" disabled={total === 0}>
              Adicionar ao orçamento
            </Cta>
            <Cta href={whatsappUrl(`Olá! Tenho uma dúvida sobre o modelo ${product.name}.`)} external variant="ghost" icon="whatsapp">
              Tirar dúvida
            </Cta>
            {total === 0 ? <p className={styles.hint}>Informe a quantidade de pelo menos um tamanho.</p> : null}
          </div>
        </form>
      </div>
    </div>
  )
}
