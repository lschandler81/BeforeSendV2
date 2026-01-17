"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user || googleUser) {
        Cookies.set('auth-token', 'true', { expires: 7 });
        router.push('/dashboard');
    }
  }, [user, googleUser, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  };

  const isLoading = loading || googleLoading;
  const authError = error || googleError;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
            <div className="relative h-10 w-40">
                <Image
                    src="/brand/logo-light.svg" // Using light logic for both since dark mode brand logo is likely white text
                    className="dark:hidden object-contain"
                    alt="BeforeSend"
                    fill
                />
                 <Image
                    src="/brand/logo-dark.svg"
                    className="hidden dark:block object-contain"
                    alt="BeforeSend"
                    fill
                />
            </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Or{' '}
          <Link href="/signup" className="font-medium text-brand-teal hover:text-brand-teal/80">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-xl sm:px-10 glass relative overflow-hidden">
          {isLoading && (
              <div className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin"></div>
                      <span className="text-sm font-medium text-brand-teal">Signing in...</span>
                  </div>
              </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-300 text-brand-teal focus:ring-brand-teal"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand-teal hover:text-brand-teal/80">
                  Forgot your password?
                </a>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
                {authError.message.replace('Firebase: ', '')}
              </div>
            )}

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
                <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()} disabled={isLoading}>
                    <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                        <path
                        d="M12.0003 20.45c-4.6667 0-8.45-3.7833-8.45-8.45 0-4.6667 3.7833-8.45 8.45-8.45 4.6667 0 8.45 3.7833 8.45 8.45 0 4.6667-3.7833 8.45-8.45 8.45Z"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                        <path
                         d="M20.45 12h-8.45"
                         stroke="currentColor"
                         fill="none"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                        />
                         {/* Mock Google G */}
                         <text x="8" y="16" fontSize="12" fill="currentColor" fontWeight="bold">G</text>
                    </svg>
                    Google
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
