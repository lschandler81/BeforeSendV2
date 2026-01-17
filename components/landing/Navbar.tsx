"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-32">
                <Image
                    src={resolvedTheme === "dark" ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
                    alt="BeforeSend"
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-brand-teal transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-brand-teal transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
            <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
                <Button size="sm">Start Analysis</Button>
            </Link>
        </div>
      </div>
    </nav>
  );
}
