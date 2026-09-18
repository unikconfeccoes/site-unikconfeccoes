const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatBRL(value: number): string {
  return BRL.format(value)
}

/** Preço de referência ou "sob consulta" quando a planilha não tem valor. */
export function formatPrice(value: number | null): string {
  return value === null ? 'Sob consulta' : BRL.format(value)
}

/** "R$ 32,84" → { currency: 'R$', value: '32,84' } — para compor o preço em dois pesos. */
export function splitBRL(value: number): { currency: string; value: string } {
  const [currency = 'R$', ...rest] = BRL.format(value).split(/\s/)
  return { currency, value: rest.join(' ') }
}
