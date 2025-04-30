import { NextResponse } from 'next/server';

export async function GET() {
  // In demo mode, redirect directly to dashboard
  return NextResponse.redirect('http://localhost:3001/dashboard');
} 