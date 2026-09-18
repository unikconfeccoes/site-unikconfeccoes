import type { NextRequest } from 'next/server'
import { isValidCnpj, onlyDigits, segmentFromCnae, titleCase, type Company } from '@/lib/cnpj'

/**
 * Consulta de CNPJ para o atalho da proposta.
 *
 * Passa pelo servidor em vez de o navegador chamar a BrasilAPI direto: a
 * resposta volta enxuta (sem quadro societário), o CDN da Vercel guarda cada
 * CNPJ por um dia e trocar de provedor é mudar só este arquivo.
 */
const UPSTREAM = 'https://brasilapi.com.br/api/cnpj/v1/'
const DAY = 60 * 60 * 24

type BrasilApiCnpj = {
  cnpj: string
  razao_social: string
  nome_fantasia: string | null
  municipio: string
  uf: string
  email: string | null
  ddd_telefone_1: string | null
  cnae_fiscal: number
  cnae_fiscal_descricao: string
  descricao_situacao_cadastral: string
}

const fail = (status: number, error: string) => Response.json({ error }, { status })

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/cnpj/[cnpj]'>) {
  const cnpj = onlyDigits((await ctx.params).cnpj)
  if (!isValidCnpj(cnpj)) return fail(400, 'CNPJ inválido. Confira os números.')

  let res: Response
  try {
    res = await fetch(`${UPSTREAM}${cnpj}`, {
      // Sem User-Agent próprio a BrasilAPI responde 429 para o fetch do Node.
      headers: { 'User-Agent': 'unik-site/1.0 (+https://site-unikconfeccoes.vercel.app)', Accept: 'application/json' },
      next: { revalidate: DAY },
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    return fail(504, 'A consulta à Receita demorou demais. Tente de novo.')
  }
  if (res.status === 404) return fail(404, 'CNPJ não encontrado na Receita Federal.')
  if (res.status === 429) return fail(429, 'Muitas consultas agora. Aguarde um instante e tente de novo.')
  if (!res.ok) return fail(502, 'A consulta de CNPJ está indisponível agora. Preencha os dados manualmente.')

  const d = (await res.json()) as BrasilApiCnpj
  const company: Company = {
    cnpj,
    razaoSocial: d.razao_social ?? '',
    nomeFantasia: d.nome_fantasia ?? '',
    municipio: titleCase(d.municipio ?? ''),
    uf: d.uf ?? '',
    email: (d.email ?? '').toLowerCase(),
    telefone: onlyDigits(d.ddd_telefone_1 ?? ''),
    cnae: d.cnae_fiscal,
    cnaeDescricao: d.cnae_fiscal_descricao ?? '',
    situacao: d.descricao_situacao_cadastral ?? '',
    segmento: segmentFromCnae(d.cnae_fiscal),
  }

  return Response.json(company, {
    headers: { 'Cache-Control': `public, s-maxage=${DAY}, stale-while-revalidate=${DAY}` },
  })
}
