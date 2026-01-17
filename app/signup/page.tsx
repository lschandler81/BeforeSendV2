"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export default function SignupPage() {
  const [password, setPassword] = useState("");

  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 7) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const strength = getStrength(password);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
         <Link href="/" className="flex justify-center mb-6">
            <div className="relative h-10 w-40">
                <Image
                    src="/brand/logo-light.png"
                    className="dark:hidden object-contain"
                    alt="BeforeSend"
                    fill
                />
                 <Image
                    src="/brand/logo-dark.png"
                    className="hidden dark:block object-contain"
                    alt="BeforeSend"
                    fill
                />
            </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-brand-teal hover:text-brand-teal/80">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-xl sm:px-10 glass">
          <form className="space-y-6" action="#" method="POST">
             <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="Full Name"
            />

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
            />

            <div>
                <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                {/* Strength Indicator */}
                <div className="mt-2 flex gap-1 h-1">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-full transition-colors duration-300 ${
                                i <= strength
                                    ? strength < 2 ? 'bg-rose-500' : strength < 4 ? 'bg-amber-500' : 'bg-emerald-500'
                                    : 'bg-zinc-200 dark:bg-zinc-700'
                            }`}
                        />
                    ))}
                </div>
                <p className="text-xs text-zinc-500 mt-1 text-right">
                    {strength < 2 ? 'Weak' : strength < 4 ? 'Medium' : 'Strong'}
                </p>
            </div>

            <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-zinc-300 text-brand-teal focus:ring-brand-teal"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                  I agree to the <a href="#" className="text-brand-teal hover:underline">Terms</a> and <a href="#" className="text-brand-teal hover:underline">Privacy Policy</a>
                </label>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>

          <div className="mt-6">
             <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or sign up with</span>
              </div>
            </div>

             <div className="mt-6">
                <Button variant="outline" className="w-full">
                     <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                        <path
                        d="M12.0003 20.45c-4.6667 0-8.45-3.7833-8.45-8.45 0-4.6667 3.7833-8.45 8.45-8.45 4.6667 0 8.45 3.7833 8.45 8.45 0 4.6667-3.7833 8.45-8.45 8.45Z"
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
