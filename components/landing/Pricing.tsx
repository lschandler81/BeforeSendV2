import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Invest in your professional reputation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="p-8 flex flex-col relative overflow-hidden">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">$0</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mt-4">Perfect for occasional checks.</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                "3 Analyses per month",
                "Basic tone detection",
                "Standard support",
                "1 Persona type"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                  <Check className="w-5 h-5 text-zinc-400" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/signup">
                <Button variant="outline" className="w-full">Get Started</Button>
            </Link>
          </Card>

          {/* Pro Tier */}
          <Card className="p-8 flex flex-col relative overflow-hidden border-brand-teal/50 shadow-xl shadow-brand-teal/10">
            <div className="absolute top-0 right-0 bg-brand-teal text-brand-navy text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Professional</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">$50</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mt-4">For executives and leaders.</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Unlimited Analyses",
                "Advanced Power Dynamics",
                "All 5 Executive Personas",
                "Priority Support",
                "History & Analytics",
                "Surgical Rewrite Engine"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-900 dark:text-zinc-200 font-medium">
                  <Check className="w-5 h-5 text-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/signup">
                <Button className="w-full animate-pulse hover:animate-none">Start Free Trial</Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
