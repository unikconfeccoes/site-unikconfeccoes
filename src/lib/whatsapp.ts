import type { QuoteItem } from '@/lib/quote-store'
import { itemTotal, quoteTotal } from '@/lib/quote-store'

export type QuoteContact = {
  nome: string
  empresa: string
  whatsapp: string
  email: string
  cidade: string
  prazo: string
  observacoes: string
}

/** Código curto e legível para o cliente citar na conversa: UNK-260918-4F2A. */
export function quoteCode(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase()
  return `UNK-${yy}${mm}${dd}-${rand}`
}

function sizesLine(sizes: Record<string, number>): string {
  return Object.entries(sizes)
    .filter(([, n]) => n > 0)
    .map(([size, n]) => `${size}: ${n}`)
    .join(' · ')
}

/**
 * A mensagem que chega no WhatsApp da UNIK. Formatada para ser lida no
 * celular por quem vai orçar: cabeçalho, uma seção por item, contato no fim.
 * O WhatsApp interpreta *negrito*.
 */
export function quoteMessage(code: string, items: readonly QuoteItem[], contact: QuoteContact): string {
  const lines: string[] = [
    `*Pedido de orçamento ${code}*`,
    `${items.length} ${items.length === 1 ? 'item' : 'itens'} · ${quoteTotal(items)} peças`,
    '',
  ]

  items.forEach((item, i) => {
    lines.push(`*${i + 1}. ${item.productName}*, ${item.fabricLabel}`)
    if (item.color) lines.push(`Cor: ${item.color}`)
    lines.push(`Tamanhos: ${sizesLine(item.sizes)} (total ${itemTotal(item)})`)
    if (item.techniques.length) lines.push(`Personalização: ${item.techniques.join(', ')}`)
    if (item.positions.length) lines.push(`Posições: ${item.positions.join(', ')}`)
    if (item.notes) lines.push(`Obs.: ${item.notes}`)
    lines.push('')
  })

  lines.push('*Contato*')
  lines.push(`Nome: ${contact.nome}`)
  if (contact.empresa) lines.push(`Empresa: ${contact.empresa}`)
  lines.push(`WhatsApp: ${contact.whatsapp}`)
  if (contact.email) lines.push(`E-mail: ${contact.email}`)
  if (contact.cidade) lines.push(`Cidade: ${contact.cidade}`)
  if (contact.prazo) lines.push(`Prazo desejado: ${contact.prazo}`)
  if (contact.observacoes) lines.push(`Observações: ${contact.observacoes}`)

  return lines.join('\n')
}
