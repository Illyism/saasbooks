import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;

  // If not authenticated and trying to access a protected route under /app
  if (!sessionToken && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only apply to /app routes
    '/app/:path*',
  ],
};

