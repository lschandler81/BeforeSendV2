import { Mail, Brain, Target, Shield, Zap, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function Features() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-brand-teal" />,
      title: "Adversarial AI Core",
      description: "Our model doesn't just read syntax. It simulates the recipient's worst-case interpretation to find risks you missed."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-teal" />,
      title: "Reputation Guard",
      description: "Prevent emotional leakage and power dynamic errors that damage your professional standing over time."
    },
    {
      icon: <Target className="w-6 h-6 text-brand-teal" />,
      title: "Persona Targeting",
      description: "Customize diagnostics for specific audiences: CFOs, CTOs, Investors, or Board Members."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-teal" />,
      title: "Instant Pivot",
      description: "Don't just get a critique. Get a surgical rewrite that fixes the tone while keeping your intent."
    },
    {
      icon: <Mail className="w-6 h-6 text-brand-teal" />,
      title: "Context Aware",
      description: "Analyzes thread history and power dynamics to understand the unsaid subtext of your message."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-teal" />,
      title: "EQ Analytics",
      description: "Track your communication patterns over time. See how your diplomatic score improves."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Enterprise-Grade Diagnostics</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Stop guessing how your email will land. Use the tool built for high-stakes communication.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-8 hover:border-brand-teal/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="mb-6 p-3 bg-brand-teal/10 w-fit rounded-lg group-hover:bg-brand-teal/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
