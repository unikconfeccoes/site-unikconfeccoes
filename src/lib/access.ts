/**
 * Senha de pré-lançamento.
 *
 * A senha fica SÓ na variável de ambiente SITE_PASSWORD (painel da Vercel),
 * nunca no código. O cookie guarda um hash dela, não a senha: quem abrir os
 * cookies do navegador não descobre a senha. Para liberar o site ao público,
 * basta apagar SITE_PASSWORD na Vercel e fazer um novo deploy.
 */

export const ACCESS_COOKIE = 'unik_acesso'
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30 // 30 dias

export function accessPassword(): string | null {
  const p = process.env.SITE_PASSWORD?.trim()
  return p ? p : null
}

export async function accessToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`unik-pre-lancamento:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Só aceita caminhos internos (evita redirecionar para outro site). */
export function safeNext(next: unknown): string {
  return typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/'
}
