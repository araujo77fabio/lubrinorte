import { NextResponse, type NextRequest } from 'next/server'

// Proxy simples — Auth completa será ativada em produção
// Por enquanto, apenas redireciona /login se já autenticado via cookie
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Passa direto para todas as rotas
  return NextResponse.next({ request })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
