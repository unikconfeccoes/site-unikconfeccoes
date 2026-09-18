import { ProductCard } from '@/components/catalog/ProductCard'
import {
  CATEGORIES,
  CATEGORY_BY_SLUG,
  PRODUCTS,
  PRODUCT_BY_SLUG,
  fabricPrice,
  startingPrice,
  type CategorySlug,
} from '@/data/catalog'
import { ATACADO_MIN } from '@/data/site'
import type { Block, ContentSection } from '@/data/seo/types'
import { ROUTES } from '@/data/seo/routes'
import { formatBRL } from '@/lib/format'
import Link from 'next/link'
import { RichText } from './RichText'
import styles from './Content.module.css'

/** Renderiza as seções editoriais. Cada seção vira um <section> com âncora. */
export function ContentSections({ sections }: { sections: readonly ContentSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-t`}>
          <h2 id={`${s.id}-t`} className={styles.h2}>
            {s.title}
          </h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </section>
      ))}
    </>
  )
}

export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className={styles.p}>
          <RichText text={block.text} />
        </p>
      )
    case 'ul':
    case 'ol': {
      const Tag = block.kind
      return (
        <Tag className={block.kind === 'ul' ? styles.ul : styles.ol}>
          {block.items.map((it, i) => (
            <li key={i}>
              <RichText text={it} />
            </li>
          ))}
        </Tag>
      )
    }
    case 'note':
      return (
        <aside className={styles.note}>
          <strong className={styles.noteTitle}>{block.title}</strong>
          <p>
            <RichText text={block.text} />
          </p>
        </aside>
      )
    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td key={j}>
                        <RichText text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'priceTable':
      return <PriceTable category={block.category} />
    case 'products': {
      const list = block.slugs.map((s) => PRODUCT_BY_SLUG[s]).filter((p) => p !== undefined)
      return (
        <ul className={styles.products}>
          {list.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} sizes="(min-width: 1024px) 18vw, 45vw" />
            </li>
          ))}
        </ul>
      )
    }
  }
}

/**
 * Tabela de preços gerada dos dados reais (planilha → prices.ts). Nenhum
 * valor é escrito à mão no conteúdo: se a planilha mudar, as tabelas de
 * todos os guias mudam juntas.
 */
export function PriceTable({ category }: { category?: CategorySlug }) {
  const cats = category ? [CATEGORY_BY_SLUG[category]] : CATEGORIES
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption>
          Preços de referência por peça, com personalização simples. &quot;Até {ATACADO_MIN - 1}&quot; vale para pedidos
          menores; &quot;{ATACADO_MIN}+&quot; é o preço de atacado, a partir de {ATACADO_MIN} peças do mesmo modelo.
        </caption>
        <thead>
          <tr>
            <th scope="col">Modelo</th>
            <th scope="col">Tecido</th>
            <th scope="col">Até {ATACADO_MIN - 1} pç</th>
            <th scope="col">{ATACADO_MIN}+ pç</th>
          </tr>
        </thead>
        <tbody>
          {cats.flatMap((c) =>
            PRODUCTS.filter((p) => p.category === c.slug).flatMap((p) =>
              p.fabrics.map((f, i) => {
                const price = fabricPrice(f)
                if (!price) return null
                return (
                  <tr key={`${p.slug}-${f.id}`}>
                    <th scope="row">{i === 0 ? <Link href={ROUTES.produto(p.slug)}>{p.name}</Link> : null}</th>
                    <td>{f.label}</td>
                    <td className="u-tnum">{formatBRL(price.varejo)}</td>
                    <td className="u-tnum">
                      <strong>{formatBRL(price.atacado)}</strong>
                    </td>
                  </tr>
                )
              }),
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}

export function minPriceOf(slugs: readonly string[]): number | null {
  const prices = slugs
    .map((s) => PRODUCT_BY_SLUG[s])
    .filter((p) => p !== undefined)
    .map(startingPrice)
    .filter((p) => p !== null)
  return prices.length ? Math.min(...prices) : null
}
