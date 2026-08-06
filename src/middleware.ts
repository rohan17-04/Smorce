import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('admin-session')?.value;

  const isLoginPage = pathname === '/admin/login';
  const isAdminDashboard = pathname.startsWith('/admin') && !isLoginPage;

  // 1. Strict protection for all /admin routes (except login)
  if (isAdminDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      // Invalid/expired token: clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('admin-session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
