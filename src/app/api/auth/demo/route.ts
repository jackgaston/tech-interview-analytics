import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    // Check if already authenticated
    const session = await getServerSession();
    if (session) {
      return NextResponse.redirect('/dashboard');
    }

    // Set demo session cookie
    const response = NextResponse.redirect('/dashboard');
    response.cookies.set({
      name: 'next-auth.session-token',
      value: 'demo-session',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Demo authentication error:', error);
    return NextResponse.redirect('/auth/signin');
  }
} 