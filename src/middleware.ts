import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In demo mode, all routes are accessible
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
}; 