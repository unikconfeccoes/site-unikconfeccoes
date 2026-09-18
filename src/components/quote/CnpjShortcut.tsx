'use client'

import Link from 'next/link'
import { useId, useRef, useState } from 'react'
import { PRODUCTS, SEGMENT_BY_SLUG } from '@/data/catalog'
import { companyName, isValidCnpj, maskCnpj, onlyDigits, type Company } from '@/lib/cnpj'
import { clearCompany, setCompany, useCompany } from '@/lib/company-store'
import styles from './CnpjShortcut.module.css'

type Variant = 'product' | 'catalog' | 'quote'

/**
 * Atalho da proposta: o cliente digita o CNPJ e o site busca a empresa na
 * Receita (via /api/cnpj). Com isso o orçamento chega preenchido — empresa,
 * CNPJ, cidade, contato — e o catálogo sugere os modelos do ramo dela (pelo
 * CNAE). A empresa fica salva no navegador e vale em todas as páginas.
 *
 * A busca dispara sozinha quando o 14º dígito entra e o CNPJ é válido.
 */
export function CnpjShortcut({
  variant,
  currentSlug,
  onType,
}: {
  variant: Variant
  /** Na página do produto: não sugerir o próprio modelo. */
  currentSlug?: string
  /** No orçamento: o CNPJ digitado vale mesmo se a consulta falhar. */
  onType?: (masked: string) => void
}) {
  const uid = useId().replace(/:/g, '')
  const company = useCompany()
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const pending = useRef<AbortController | null>(null)

  const lookup = async (digits: string) => {
    pending.current?.abort()
    const ctrl = new AbortController()
    pending.current = ctrl
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(`/api/cnpj/${digits}`, { signal: ctrl.signal })
      const data = (await res.json()) as Company | { error: string }
      if (!res.ok || 'error' in data) throw new Error('error' in data ? data.error : 'Não foi possível consultar o CNPJ.')
      setCompany(data)
      setStatus('idle')
    } catch (e) {
      if (ctrl.signal.aborted) return
      setStatus('error')
      setError(e instanceof Error && e.message ? e.message : 'Não foi possível consultar o CNPJ.')
    }
  }

  const onChange = (raw: string) => {
    const masked = maskCnpj(raw)
    setValue(masked)
    onType?.(masked)
    const digits = onlyDigits(masked)
    if (digits.length < 14) {
      pending.current?.abort()
      setStatus('idle')
      setError('')
      return
    }
    if (!isValidCnpj(digits)) {
      setStatus('error')
      setError('CNPJ inválido. Confira os números.')
      return
    }
    void lookup(digits)
  }

  if (company) {
    const segment = SEGMENT_BY_SLUG[company.segmento]
    const suggestions = PRODUCTS.filter((p) => p.segments.includes(company.segmento) && p.slug !== currentSlug).slice(0, 4)
    const ativa = company.situacao.toUpperCase() === 'ATIVA'

    return (
      <section className={styles.box} data-found aria-labelledby={`${uid}-empresa`}>
        <div className={styles.head}>
          <span className={styles.kicker}>Proposta para</span>
          <button
            type="button"
            className={styles.link}
            onClick={() => {
              clearCompany()
              setValue('')
              onType?.('')
            }}
          >
            Trocar CNPJ
          </button>
        </div>
        <p className={styles.name} id={`${uid}-empresa`}>
          {companyName(company)}
        </p>
        <p className={styles.meta}>
          {company.nomeFantasia ? <>{company.razaoSocial} · </> : null}
          <span className="u-tnum">{maskCnpj(company.cnpj)}</span>
          {company.municipio ? ` · ${company.municipio}/${company.uf}` : null}
        </p>
        {!ativa && company.situacao ? (
          <p className={styles.warn}>Situação na Receita: {company.situacao.toLowerCase()}. A UNIK confirma os dados na conversa.</p>
        ) : null}
        <p className={styles.meta}>
          Segmento: <strong>{segment.name}</strong>
          {company.cnaeDescricao ? <span className={styles.cnae}> ({company.cnaeDescricao})</span> : null}
        </p>

        {variant === 'product' ? (
          <>
            {suggestions.length ? (
              <div className={styles.suggest}>
                <span className={styles.kicker}>Indicados para {segment.name.toLowerCase()}</span>
                <ul className={styles.list}>
                  {suggestions.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/catalogo/${p.slug}`}>{p.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className={styles.note}>
              Seus dados já vão preenchidos no <Link href="/orcamento">orçamento</Link>. Monte a grade abaixo e adicione.
            </p>
          </>
        ) : null}

        {variant === 'catalog' ? (
          // <a> e não <Link>: o filtro do catálogo lê a URL só ao carregar.
          <a className={styles.cta} href={`/catalogo?segmento=${company.segmento}`}>
            Ver os modelos para {segment.name.toLowerCase()} →
          </a>
        ) : null}

        {variant === 'quote' ? (
          <p className={styles.note}>Empresa, CNPJ e cidade foram preenchidos a partir da Receita. Confira abaixo.</p>
        ) : null}
      </section>
    )
  }

  return (
    <section className={styles.box} aria-labelledby={`${uid}-titulo`}>
      {variant === 'quote' ? (
        <>
          <label htmlFor={`${uid}-cnpj`} className={styles.title} id={`${uid}-titulo`}>
            <span className={styles.kicker}>Atalho</span>
            Digite seu CNPJ
          </label>
          <p className={styles.note}>Buscamos a empresa na Receita e preenchemos os dados da proposta.</p>
        </>
      ) : (
        <label htmlFor={`${uid}-cnpj`} className={styles.title} id={`${uid}-titulo`}>
          Inicie agora sua cotação
          <span className="u-visually-hidden">: digite o CNPJ da empresa</span>
        </label>
      )}
      <div className={styles.row}>
        <input
          id={`${uid}-cnpj`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="00.000.000/0000-00"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={`${uid}-status`}
          aria-busy={status === 'loading' || undefined}
        />
        {status === 'error' && onlyDigits(value).length === 14 && isValidCnpj(value) ? (
          <button type="button" className={styles.retry} onClick={() => void lookup(onlyDigits(value))}>
            Tentar de novo
          </button>
        ) : null}
      </div>
      <p id={`${uid}-status`} className={status === 'error' ? styles.error : styles.status} aria-live="polite">
        {status === 'loading' ? 'Buscando na Receita Federal…' : status === 'error' ? error : ''}
      </p>
    </section>
  )
}
