'use client'

import { useMemo, useState } from 'react'
import { Chip } from '@/components/ui/Chip'
import { LAB_FABRICS } from '@/data/lab'
import styles from './LabFabrics.module.css'

/** Agrupa os usos da planilha em famílias legíveis para o filtro. */
function family(use: string): string {
  const u = use.toLowerCase()
  // Corta-vento primeiro: o Treek é "corta-vento e short" e cairia em shorts.
  if (u.includes('corta')) return 'Corta-vento'
  if (u.includes('short') || u.includes('compress')) return 'Shorts & compressão'
  if (u.includes('polo') || u.includes('social')) return 'Social & polo'
  return 'Camisetas'
}

const FAMILIES = ['Camisetas', 'Shorts & compressão', 'Social & polo', 'Corta-vento'] as const

/**
 * Tecidos técnicos — lida como ficha de mostruário: nome, uso, composição e
 * gramatura em colunas mono. A gramatura ganha uma barra proporcional ao mais
 * pesado da lista: o olho compara 100 g com 290 g sem ler os números.
 */
export function LabFabrics() {
  const [filter, setFilter] = useState<string | null>(null)
  const max = Math.max(...LAB_FABRICS.map((f) => f.weight))
  const rows = useMemo(() => LAB_FABRICS.filter((f) => !filter || family(f.use) === filter), [filter])

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="group" aria-label="Filtrar tecidos por uso">
        <Chip size="sm" pressed={filter === null} onClick={() => setFilter(null)} count={LAB_FABRICS.length}>
          Todos
        </Chip>
        {FAMILIES.map((f) => (
          <Chip key={f} size="sm" pressed={filter === f} onClick={() => setFilter(filter === f ? null : f)} count={LAB_FABRICS.filter((x) => family(x.use) === f).length}>
            {f}
          </Chip>
        ))}
      </div>

      <table className={styles.table}>
        <caption className="u-visually-hidden">Tecidos técnicos do UNIK Lab com uso, composição e gramatura</caption>
        <thead>
          <tr>
            <th scope="col">Tecido</th>
            <th scope="col">Uso</th>
            <th scope="col">Composição</th>
            <th scope="col" className={styles.num}>
              Gramatura
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.name}>
              <th scope="row" className={styles.fabricName}>
                {f.name}
              </th>
              <td>{f.use}</td>
              <td className={styles.mono}>{f.composition}</td>
              <td className={styles.num}>
                <span className={styles.weight}>
                  <span className={styles.weightBar} style={{ inlineSize: `${(f.weight / max) * 100}%` }} aria-hidden="true" />
                  <span className="u-tnum">{f.weight} g</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
