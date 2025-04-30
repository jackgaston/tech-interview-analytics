'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoSigningIn, setIsAutoSigningIn] = useState(false);

  // Handle demo credentials
  useEffect(() => {
    const isDemo = searchParams.get('demo');
    if (isDemo && !isAutoSigningIn && !loading) {
      const demoEmail = searchParams.get('email');
      const demoPassword = searchParams.get('password');
      if (demoEmail && demoPassword) {
        setIsAutoSigningIn(true);
        setEmail(demoEmail);
        setPassword(demoPassword);
        // Add a small delay to ensure state updates are processed
        setTimeout(() => {
          handleSignIn(demoEmail, demoPassword);
        }, 100);
      }
    }
  }, [searchParams, isAutoSigningIn, loading]);

  const handleSignIn = async (emailValue: string, passwordValue: string) => {
    if (loading) return;
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: emailValue,
        password: passwordValue,
        redirect: false,
        callbackUrl: '/dashboard'
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsAutoSigningIn(false);
      } else if (result?.url) {
        // Use window.location for a full page navigation
        window.location.href = result.url;
      } else {
        // Fallback to router push if no URL is provided
        await router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An error occurred. Please try again.');
      setIsAutoSigningIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get('email') as string;
    const passwordValue = formData.get('password') as string;
    await handleSignIn(emailValue, passwordValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isAutoSigningIn ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Signing you in...</p>
          {error && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
        </div>
      ) : (
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 