import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Next.js handles compression automatically - don't set Accept-Encoding manually
  
  // Only set no-cache for API routes, not HTML pages
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  } else if (request.nextUrl.pathname.startsWith('/_next/static')) {
    // Static assets - long cache
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML pages - short cache with revalidation for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

