import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || "segredo_falso_do_nextauth" })
  const { pathname } = request.nextUrl

  // Se o usuário não estiver logado e tentar acessar uma rota protegida (aqui apenas /painel-admin)
  if (!token) {
    if (pathname.startsWith('/painel-admin')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  // Lógica de Autorização (RBAC) para quem ESTÁ logado
  const role = token.role as string

  if (pathname.startsWith('/painel-admin/mentorias')) {
    // Apenas Gestores de Mentoria ou Admins podem acessar
    if (role !== 'gestor_mentorias' && role !== 'admin') {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  } else if (pathname.startsWith('/painel-admin')) {
    // Qualquer outra rota do painel admin geral (como criar users) requer admin
    // (A menos que existam rotas específicas já tratadas acima)
    if (role !== 'admin') {
      // Se não for admin, restrinja o acesso geral
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  }

  // OBS: Proteja rotas de API sensíveis também, se necessário aqui ou internamente na API

  return NextResponse.next()
}

export const config = {
  matcher: ['/painel-admin/:path*'],
}
