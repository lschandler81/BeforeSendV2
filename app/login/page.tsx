import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
            <div className="relative h-10 w-40">
                <Image
                    src="/brand/logo-light.png" // Using light logic for both since dark mode brand logo is likely white text
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
        <Card className="py-8 px-4 shadow sm:rounded-xl sm:px-10 glass">
          <form className="space-y-6" action="#" method="POST">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
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

            <div>
              <Button type="submit" className="w-full">
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
