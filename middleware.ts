import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Admin sayfalarına erişim kontrolü
  if (pathname.startsWith('/admin')) {
    // Admin giriş sayfası hariç
    if (pathname === '/admin/login') {
      if (token) {
         try {
           const secret = new TextEncoder().encode(process.env.JWT_SECRET);
           const { payload } = await jwtVerify(token, secret);
           if (payload.role === 'ADMIN') {
             return NextResponse.redirect(new URL('/admin', request.url));
           }
         } catch(e) {}
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== 'ADMIN') {
        // Admin değilse anasayfaya at
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Token geçersizse giriş sayfasına at
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
