'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Media } from '@/components/primitives/Media'
import { Cta } from '@/components/primitives/Cta'
import { Label } from '@/components/primitives/Typography'
import { SizeGrid } from '@/components/catalog/SizeGrid'
import { PRODUCT_BY_SLUG } from '@/data/catalog'
import { ATACADO_MIN, COMMERCIAL, PEDIDO_MINIMO, WHATSAPP, whatsappUrl } from '@/data/site'
import { clearQuote, itemTotal, quoteTotal, removeQuoteItem, updateQuoteItem, useQuote } from '@/lib/quote-store'
import { quoteCode, quoteMessage, type QuoteContact } from '@/lib/whatsapp'
import { saveQuote } from '@/lib/leads'
import { companyName, maskCnpj, type Company } from '@/lib/cnpj'
import { useCompany } from '@/lib/company-store'
import { CnpjShortcut } from './CnpjShortcut'
import styles from './QuoteView.module.css'

const EMPTY_CONTACT: QuoteContact = { nome: '', empresa: '', cnpj: '', equipe: '', whatsapp: '', email: '', cidade: '', prazo: '', observacoes: '' }

const TEAM_SIZES = ['Até 20 pessoas', '21 a 50', '51 a 200', '201 a 500', 'Mais de 500'] as const

type Errors = Partial<Record<keyof QuoteContact, string>>

function validate(c: QuoteContact): Errors {
  const errors: Errors = {}
  if (c.nome.trim().length < 2) errors.nome = 'Informe seu nome.'
  if (c.empresa.trim().length < 2) errors.empresa = 'Informe o nome da empresa, escola ou evento.'
  if (c.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe um WhatsApp com DDD.'
  if (c.email && !/^\S+@\S+\.\S+$/.test(c.email)) errors.email = 'E-mail inválido.'
  return errors
}

/** (61) 99999-9999 enquanto digita. */
function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/**
 * Dados da Receita → contato. Empresa, CNPJ e cidade vêm da empresa; e-mail e
 * WhatsApp só entram se o cliente ainda não digitou (o telefone da Receita
 * costuma ser fixo, então só vira WhatsApp quando é celular).
 */
function fillFromCompany(c: QuoteContact, co: Company): QuoteContact {
  const tel = co.telefone
  const isMobile = tel.length === 11 && tel[2] === '9'
  return {
    ...c,
    empresa: companyName(co),
    cnpj: maskCnpj(co.cnpj),
    cidade: co.municipio ? `${co.municipio}/${co.uf}` : c.cidade,
    email: c.email || co.email,
    whatsapp: c.whatsapp || (isMobile ? maskPhone(tel) : ''),
  }
}

/**
 * O orçamento.
 *
 * Não há backend nesta fase: o envio monta uma mensagem organizada e abre o
 * WhatsApp da UNIK com ela pronta, com um código de pedido para as duas
 * pontas citarem na conversa. A lista continua salva no navegador depois do
 * envio — quem fecha a aba sem querer não perde nada — e só é limpa quando o
 * cliente pede.
 */
export function QuoteView() {
  const items = useQuote()
  const [contact, setContact] = useState<QuoteContact>(EMPTY_CONTACT)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<{ code: string; url: string } | null>(null)
  const [editing, setEditing] = useState<string | null>(null)

  // A empresa pode chegar do atalho desta página ou já salva de outra (produto,
  // catálogo). Ajuste durante o render: preenche uma vez por CNPJ.
  const company = useCompany()
  const [filledFor, setFilledFor] = useState<string | null>(null)
  if (company && company.cnpj !== filledFor) {
    setFilledFor(company.cnpj)
    setContact((c) => fillFromCompany(c, company))
    setErrors((er) => ({ ...er, empresa: undefined }))
  }

  const total = quoteTotal(items)

  // Regra do pedido mínimo: 20 peças no total e pelo menos 10 iguais de cada
  // modelo. Avisa, mas não bloqueia: casos fora da regra se resolvem na conversa.
  const perModel = new Map<string, { name: string; n: number }>()
  for (const it of items) {
    const cur = perModel.get(it.productSlug) ?? { name: it.productName, n: 0 }
    perModel.set(it.productSlug, { name: cur.name, n: cur.n + itemTotal(it) })
  }
  const shortModels = [...perModel.values()].filter((m) => m.n < PEDIDO_MINIMO.porProduto)
  const belowTotal = total < PEDIDO_MINIMO.total
  const minimoOk = !belowTotal && shortModels.length === 0

  const field = (key: keyof QuoteContact) => ({
    value: contact[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = key === 'whatsapp' ? maskPhone(e.target.value) : e.target.value
      setContact((c) => ({ ...c, [key]: value }))
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    },
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `erro-${key}` : undefined,
  })

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(contact)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`campo-${Object.keys(found)[0]}`)?.focus()
      return
    }
    const code = quoteCode()
    const url = whatsappUrl(quoteMessage(code, items, contact, company))
    saveQuote(code, items, contact, company)
    setSent({ code, url })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (items.length === 0 && !sent) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyBar} aria-hidden="true" />
        <h2 className={styles.emptyTitle}>Sua lista está vazia</h2>
        <p className={styles.emptyText}>
          Escolha um modelo no catálogo, defina tecido e grade de tamanhos e adicione ao orçamento. Você pode juntar
          quantas peças quiser antes de enviar.
        </p>
        <div className={styles.emptyActions}>
          <Cta href="/catalogo" size="lg">
            Abrir o catálogo
          </Cta>
          <Cta href={whatsappUrl('Olá! Quero um orçamento de uniformes.')} external variant="line" size="lg" icon="whatsapp">
            Falar direto no WhatsApp
          </Cta>
        </div>
      </div>
    )
  }

  if (sent) {
    return (
      <div className={styles.sent}>
        <Label size="xs" muted>
          Pedido de orçamento
        </Label>
        <p className={styles.sentCode}>{sent.code}</p>
        <h2 className={styles.sentTitle}>Enviado para o WhatsApp da UNIK</h2>
        <p className={styles.emptyText}>
          A conversa abriu em outra aba com tudo organizado. Se ela não abriu, use o botão abaixo. Mande também o
          arquivo da arte por lá. A resposta vem com valores e prazo.
        </p>
        <div className={styles.emptyActions}>
          <Cta href={sent.url} external size="lg" icon="whatsapp">
            Abrir o WhatsApp de novo
          </Cta>
          <Cta
            variant="line"
            size="lg"
            icon="none"
            onClick={() => {
              clearQuote()
              setSent(null)
              setContact(EMPTY_CONTACT)
            }}
          >
            Começar nova lista
          </Cta>
          <Cta variant="ghost" icon="none" onClick={() => setSent(null)}>
            Voltar à lista
          </Cta>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.layout} onSubmit={send} noValidate>
      {/* ------------------------------------------------------------ itens */}
      <div className={styles.items}>
        <div className={styles.itemsHead}>
          <Label size="xs" muted>
            {items.length} {items.length === 1 ? 'item' : 'itens'} · {total} peças
          </Label>
          <Link href="/catalogo" className={styles.addMore}>
            + Adicionar outro modelo
          </Link>
        </div>

        <div className={styles.rule} data-ok={minimoOk || undefined} role="status">
          <strong>{minimoOk ? 'Pedido dentro do mínimo' : 'Atenção ao pedido mínimo'}</strong>
          <span>
            {minimoOk
              ? COMMERCIAL.minimo
              : belowTotal
                ? `Faltam ${PEDIDO_MINIMO.total - total} peças para o mínimo de ${PEDIDO_MINIMO.total}. ${COMMERCIAL.minimo}`
                : `Cada modelo precisa de pelo menos ${PEDIDO_MINIMO.porProduto} peças iguais: ${shortModels.map((m) => `${m.name} (${m.n})`).join(', ')}.`}
          </span>
          <span className={styles.ruleSub}>Pagamento: {COMMERCIAL.pagamento}</span>
        </div>

        <ol className={styles.list}>
          {items.map((item, i) => {
            const product = PRODUCT_BY_SLUG[item.productSlug]
            const n = itemTotal(item)
            const isEditing = editing === item.id
            return (
              <li key={item.id} className={styles.item}>
                <div className={styles.thumb}>
                  <Media garment={product?.garment ?? 'tee'} alt="" sizes="120px" ratio={1} motion="none" tone="raised" />
                </div>
                <div className={styles.itemBody}>
                  <div className={styles.itemTop}>
                    <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={styles.itemName}>
                      {product ? <Link href={`/catalogo/${product.slug}`}>{item.productName}</Link> : item.productName}
                    </h3>
                    <span className={styles.itemQty}>
                      <strong className="u-tnum">{n}</strong> pç
                    </span>
                  </div>
                  <dl className={styles.itemSpec}>
                    <div>
                      <dt>Tecido</dt>
                      <dd>{item.fabricLabel}</dd>
                    </div>
                    {item.color ? (
                      <div>
                        <dt>Cor</dt>
                        <dd>{item.color}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>Grade</dt>
                      <dd>
                        {Object.entries(item.sizes)
                          .filter(([, q]) => q > 0)
                          .map(([s, q]) => `${s} ${q}`)
                          .join(' · ')}
                      </dd>
                    </div>
                    {item.techniques.length ? (
                      <div>
                        <dt>Técnica</dt>
                        <dd>{item.techniques.join(', ')}</dd>
                      </div>
                    ) : null}
                    {item.positions.length ? (
                      <div>
                        <dt>Posição</dt>
                        <dd>{item.positions.join(', ')}</dd>
                      </div>
                    ) : null}
                    {item.notes ? (
                      <div>
                        <dt>Obs.</dt>
                        <dd>{item.notes}</dd>
                      </div>
                    ) : null}
                  </dl>

                  {isEditing && product ? (
                    <div className={styles.edit}>
                      <SizeGrid
                        compact
                        sizes={product.sizes}
                        value={item.sizes}
                        idPrefix={`edit-${item.id}`}
                        onChange={(sizes) => updateQuoteItem(item.id, { sizes })}
                      />
                    </div>
                  ) : null}

                  <div className={styles.itemActions}>
                    {n < ATACADO_MIN ? (
                      <span className={styles.atacadoHint}>Faltam {ATACADO_MIN - n} para o atacado</span>
                    ) : (
                      <span className={styles.atacadoOk}>Preço de atacado</span>
                    )}
                    {product ? (
                      <button type="button" className={styles.linkBtn} onClick={() => setEditing(isEditing ? null : item.id)} aria-expanded={isEditing}>
                        {isEditing ? 'Concluir' : 'Editar grade'}
                      </button>
                    ) : null}
                    <button type="button" className={styles.linkBtn} onClick={() => removeQuoteItem(item.id)}>
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* ---------------------------------------------------------- contato */}
      <aside className={styles.side} data-atmosphere="noite">
        <h2 className={styles.sideTitle}>Seus dados</h2>
        <p className={styles.sideText}>Para a UNIK responder com valores e prazo.</p>

        <CnpjShortcut variant="quote" onType={(cnpj) => setContact((c) => ({ ...c, cnpj }))} />

        <div className={styles.fields}>
          <Field id="nome" label="Nome*" error={errors.nome}>
            <input id="campo-nome" type="text" autoComplete="name" className={styles.input} {...field('nome')} />
          </Field>
          <Field id="empresa" label="Empresa*" error={errors.empresa}>
            <input id="campo-empresa" type="text" autoComplete="organization" className={styles.input} {...field('empresa')} />
          </Field>
          <Field id="equipe" label="Tamanho da equipe">
            <select
              id="campo-equipe"
              className={styles.input}
              value={contact.equipe}
              onChange={(e) => setContact((c) => ({ ...c, equipe: e.target.value }))}
            >
              <option value="">Selecione</option>
              {TEAM_SIZES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field id="whatsapp" label="WhatsApp*" error={errors.whatsapp}>
            <input id="campo-whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(61) 99999-9999" className={styles.input} {...field('whatsapp')} />
          </Field>
          <Field id="email" label="E-mail" error={errors.email}>
            <input id="campo-email" type="email" autoComplete="email" className={styles.input} {...field('email')} />
          </Field>
          <div className={styles.pair}>
            <Field id="cidade" label="Cidade">
              <input id="campo-cidade" type="text" autoComplete="address-level2" className={styles.input} {...field('cidade')} />
            </Field>
            <Field id="prazo" label="Para quando?">
              <input id="campo-prazo" type="text" placeholder="ex.: 15/11" className={styles.input} {...field('prazo')} />
            </Field>
          </div>
          <Field id="observacoes" label="Observações gerais">
            <textarea id="campo-observacoes" rows={3} className={styles.input} {...field('observacoes')} />
          </Field>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Itens</span>
            <strong className="u-tnum">{items.length}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Peças</span>
            <strong className="u-tnum">{total}</strong>
          </div>
        </div>

        <Cta type="submit" size="lg" icon="whatsapp" className={styles.sendBtn}>
          Enviar pelo WhatsApp
        </Cta>
        <p className={styles.sideNote}>
          Abre a conversa com {WHATSAPP.display} com a lista pronta. Nada é cobrado nesta etapa.
        </p>
      </aside>
    </form>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={`campo-${id}`} className={styles.fieldLabel}>
        {label}
      </label>
      {children}
      {error ? (
        <span id={`erro-${id}`} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
