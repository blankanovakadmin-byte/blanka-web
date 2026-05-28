import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'blanka_admin_session';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  const session = req.cookies.get(SESSION_COOKIE);
  const adminToken = process.env.ADMIN_TOKEN;

  if (!session || !adminToken || session.value !== adminToken) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
