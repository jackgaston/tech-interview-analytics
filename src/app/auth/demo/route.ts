import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' 
    : process.env.VERCEL_URL || 'http://localhost:3001';

  return NextResponse.redirect(`${baseUrl}/dashboard`);
} 