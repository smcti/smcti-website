import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { getRedirectPathByRole } from '@/lib/auth/redirectByRole'

// Mapa exato de quais prefixos cada role tem permissão de acessar
const ROLE_ALLOWED_PREFIXES: Record<string, string[]> = {
  admin:            ['/painel-admin', '/admin'],
  gestor_mentorias: ['/painel-admin/mentorias', '/painel-admin/mentores'],
  empresario:       ['/painel'],
  empresa:          ['/painel'],
  usuario:          [],
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = request.nextUrl

  // 1. Sem sessão → vai para login
  if (!token || !token.role) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const role = token.role as string
  const allowedPrefixes = ROLE_ALLOWED_PREFIXES[role] ?? []
  const hasAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix))

  // 2. Role sem permissão para esta rota → redireciona silenciosamente para o painel correto
  if (!hasAccess) {
    const destination = getRedirectPathByRole(role)
    return NextResponse.redirect(new URL(destination, request.url))
  }

  // 3. Acesso autorizado
  return NextResponse.next()
}

export const config = {
  // Apenas rotas de painel protegidas — rotas de API são validadas internamente
  matcher: ['/painel-admin/:path*', '/painel/:path*', '/admin/:path*'],
}
