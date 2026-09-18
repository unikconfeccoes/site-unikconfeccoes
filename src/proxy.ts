import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_COOKIE, accessPassword, accessToken } from '@/lib/access'

/**
 * Porteiro do pré-lançamento. Sem SITE_PASSWORD definida, não faz nada: o
 * site fica público. Com ela, toda página exige o cookie de acesso; quem não
 * tem vai para /acesso e volta para onde estava depois de digitar a senha.
 */
export async function proxy(request: NextRequest) {
  const password = accessPassword()
  if (!password) return NextResponse.next()

  const cookie = request.cookies.get(ACCESS_COOKIE)?.value
  if (cookie && cookie === (await accessToken(password))) return NextResponse.next()

  const { pathname, search } = request.nextUrl
  const url = request.nextUrl.clone()
  url.pathname = '/acesso'
  url.search = `?next=${encodeURIComponent(pathname + search)}`
  const res = NextResponse.redirect(url)
  // Enquanto fechado, nada disso deve entrar no Google.
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = {
  // Tudo, menos a própria tela de senha, os arquivos do Next e os
  // arquivos de marca que a tela de senha usa.
  matcher: ['/((?!acesso|api/acesso|_next/static|_next/image|brand/|icon.svg|apple-icon.png|favicon.ico|manifest.webmanifest).*)'],
}
