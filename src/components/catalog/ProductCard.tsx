import Link from 'next/link'
import { Media } from '@/components/primitives/Media'
import { CATEGORY_BY_SLUG, startingPrice, type Product } from '@/data/catalog'
import { formatBRL } from '@/lib/format'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  product: Product
  index?: number
  sizes?: string
}

/**
 * Card de modelo. A silhueta assume o quadro até as fotos chegarem; o preço
 * é sempre "a partir de" — o menor valor de atacado entre os tecidos.
 */
export function ProductCard({ product, index, sizes = '(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 50vw' }: ProductCardProps) {
  const category = CATEGORY_BY_SLUG[product.category]
  return (
    <Link href={`/catalogo/${product.slug}`} className={styles.card} data-cursor="Ver peça">
      <div className={styles.media}>
        <Media garment={product.garment} alt={`Silhueta do modelo ${product.name}`} sizes={sizes} motion="none" tone="raised" />
        {typeof index === 'number' ? <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span> : null}
        <span className={styles.fabrics}>
          {product.fabrics.length} {product.fabrics.length === 1 ? 'tecido' : 'tecidos'}
        </span>
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{category.name}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.summary}>{product.summary}</p>
        <p className={styles.price}>
          <span className={styles.from}>a partir de</span>
          <strong className="u-tnum">{formatBRL(startingPrice(product))}</strong>
          <span className={styles.unit}>/ peça</span>
        </p>
      </div>
    </Link>
  )
}
