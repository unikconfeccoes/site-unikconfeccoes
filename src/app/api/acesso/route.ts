import { NextResponse } from 'next/server'
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessPassword, accessToken, safeNext } from '@/lib/access'

/** Recebe o formulário da tela /acesso e, se a senha confere, grava o cookie. */
export async function POST(request: Request) {
  const form = await request.formData()
  const next = safeNext(form.get('next'))
  const typed = String(form.get('senha') ?? '').trim()
  const password = accessPassword()

  if (!password || typed !== password) {
    // Atraso fixo em toda senha errada: torna inviável testar senhas em massa.
    await new Promise((r) => setTimeout(r, 1200))
    const back = new URL('/acesso', request.url)
    back.searchParams.set('erro', '1')
    back.searchParams.set('next', next)
    return NextResponse.redirect(back, 303)
  }

  const res = NextResponse.redirect(new URL(next, request.url), 303)
  res.cookies.set(ACCESS_COOKIE, await accessToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_MAX_AGE,
  })
  return res
}
