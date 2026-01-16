"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            </div>
            </div>
        </header>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
            {resolvedTheme === "dark" ? (
                 <div className="relative h-10 w-auto aspect-[3/1]">
                     {/* Using a text fallback since images are placeholders */}
                     <span className="sr-only">BeforeSend</span>
                    <Image
                        src="/brand/logo-dark.png"
                        alt="BeforeSend Logo"
                        width={120}
                        height={40}
                        className="object-contain max-h-[40px] w-auto"
                        priority
                    />
                 </div>
            ) : (
                <div className="relative h-10 w-auto aspect-[3/1]">
                     <span className="sr-only">BeforeSend</span>
                     <Image
                        src="/brand/logo-light.png"
                        alt="BeforeSend Logo"
                        width={120}
                        height={40}
                        className="object-contain max-h-[40px] w-auto"
                        priority
                    />
                </div>
            )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          aria-label="Toggle Theme"
        >
          {resolvedTheme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
