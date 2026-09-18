import type { QuoteItem } from '@/lib/quote-store'
import { quoteTotal } from '@/lib/quote-store'
import type { QuoteContact } from '@/lib/whatsapp'
import type { Company } from '@/lib/cnpj'

/**
 * Cópia de cada envio no Supabase (tabelas `orcamentos` e `lab_briefings`).
 *
 * O WhatsApp continua sendo o canal: a gravação é "fire and forget", com
 * `keepalive` para sobreviver à troca de aba, e nunca bloqueia nem quebra o
 * envio. Sem as variáveis de ambiente, simplesmente não grava. A chave é a
 * publicável; o RLS só permite INSERT.
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

function insert(table: string, row: Record<string, unknown>) {
  if (!URL_BASE || !KEY) return
  fetch(`${URL_BASE}/rest/v1/${table}`, {
    method: 'POST',
    keepalive: true,
    headers: { apikey: KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  }).catch(() => {
    // Falha de rede não afeta o cliente: a mensagem já foi para o WhatsApp.
  })
}

const orNull = (s: string) => s.trim() || null

export function saveQuote(code: string, items: readonly QuoteItem[], c: QuoteContact, company?: Company | null) {
  const cnpj = c.cnpj.replace(/\D/g, '')
  insert('orcamentos', {
    codigo: code,
    nome: c.nome.trim(),
    empresa: orNull(c.empresa),
    cnpj: cnpj.length === 14 ? cnpj : null,
    equipe: orNull(c.equipe),
    // Snapshot da Receita só quando o CNPJ do formulário é o da empresa consultada.
    dados_empresa: company && company.cnpj === cnpj ? company : null,
    whatsapp: c.whatsapp,
    email: orNull(c.email),
    cidade: orNull(c.cidade),
    prazo: orNull(c.prazo),
    observacoes: orNull(c.observacoes),
    itens: items.map(({ id: _id, ...rest }) => rest),
    total_pecas: quoteTotal(items),
  })
}

export type LabBriefing = {
  nome: string
  marca: string
  instagram: string
  whatsapp: string
  email: string
  estagio: string
  pecas: string[]
  quantidade: string
  tecnicas: string[]
  prazo: string
  ideia: string
}

export function saveLabBriefing(code: string, f: LabBriefing, refs: number) {
  insert('lab_briefings', {
    codigo: code,
    nome: f.nome.trim(),
    marca: orNull(f.marca),
    instagram: orNull(f.instagram),
    whatsapp: f.whatsapp,
    email: orNull(f.email),
    estagio: f.estagio,
    pecas: f.pecas,
    quantidade: orNull(f.quantidade),
    tecnicas: f.tecnicas,
    prazo: orNull(f.prazo),
    ideia: f.ideia.trim(),
    qtd_referencias: refs,
  })
}
