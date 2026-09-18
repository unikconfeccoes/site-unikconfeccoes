import type { SegmentSlug } from '@/data/catalog'

/** Os dados da empresa que o atalho de CNPJ usa para montar a proposta. */
export type Company = {
  cnpj: string // só dígitos
  razaoSocial: string
  nomeFantasia: string
  municipio: string
  uf: string
  email: string
  telefone: string // só dígitos, com DDD
  cnae: number
  cnaeDescricao: string
  situacao: string
  segmento: SegmentSlug
}

export const onlyDigits = (s: string) => s.replace(/\D/g, '')

/** 00.000.000/0000-00 enquanto digita. */
export function maskCnpj(raw: string): string {
  const d = onlyDigits(raw).slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

/** Dígitos verificadores: evita ir à API com um CNPJ digitado errado. */
export function isValidCnpj(raw: string): boolean {
  const d = onlyDigits(raw)
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const check = (len: number) => {
    let sum = 0
    let weight = len - 7
    for (let i = 0; i < len; i++) {
      sum += Number(d[i]) * weight--
      if (weight < 2) weight = 9
    }
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  return check(12) === Number(d[12]) && check(13) === Number(d[13])
}

/** "BRASILIA" → "Brasilia"; mantém siglas curtas (SA, LTDA, ME) em caixa alta. */
export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w, i) => {
      if (/^(ltda|s\/?a|me|epp|eireli|mei)\.?$/.test(w)) return w.toUpperCase()
      if (i > 0 && /^(de|da|do|das|dos|e)$/.test(w)) return w
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')
}

/**
 * CNAE principal → segmento do catálogo. A divisão (dois primeiros dígitos)
 * resolve quase tudo; algumas subclasses pedem regra própria (eventos,
 * estética, academias). O que não casar vira "corporativo".
 */
export function segmentFromCnae(cnae: number): SegmentSlug {
  const code = String(cnae).padStart(7, '0')
  const div = Number(code.slice(0, 2))
  const group = code.slice(0, 4)

  if (group === '8230') return 'eventos' // organização de feiras e eventos
  if (group === '9602') return 'saude' // cabeleireiros, estética
  if (group === '9313' || group === '9311' || group === '9312' || group === '9319') return 'esporte'
  if (div === 55) return 'hotelaria'
  if (div === 56) return 'gastronomia'
  if (div >= 45 && div <= 47) return 'varejo'
  if (div === 85) return 'educacao'
  if (div === 75 || (div >= 86 && div <= 88)) return 'saude'
  if (div === 90 || div === 93) return 'eventos'
  return 'corporativo'
}

/** Nome para exibir: o fantasia quando existe, senão a razão social. */
export const companyName = (c: Pick<Company, 'nomeFantasia' | 'razaoSocial'>) => c.nomeFantasia || c.razaoSocial
