"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export function Hero() {
  const [typingText, setTypingText] = useState("");
  const fullText = "Subject: Update on Q3 Budget\n\nI need everyone to cut spending by 20% immediately. No exceptions.";
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [step, setStep] = useState(0); // 0: Typing, 1: Ready, 2: Analyzing, 3: Result

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setStep(1); // Ready for input
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    setStep(2);
    setTimeout(() => {
        setStep(3);
    }, 2000);
  }

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 -z-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-teal/20 blur-[120px] rounded-full -z-10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Column: Copy */}
        <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
                Don't Send That <br />
                <span className="text-brand-teal">Without A Check.</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-lg leading-relaxed">
                Adversarial email diagnostics for high-stakes communication. Detect hidden tone issues, power dynamic flaws, and emotional leakage before you hit send.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                     <Button size="lg" className="w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(44,206,223,0.4)] hover:shadow-[0_0_60px_-10px_rgba(44,206,223,0.5)]">
                        Try Free Analysis <ArrowRight className="ml-2 w-5 h-5" />
                     </Button>
                </Link>
                <Link href="#demo">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                        View Demo
                    </Button>
                </Link>
            </div>

            <div className="pt-4 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-700"></div>
                    ))}
                </div>
                <p>Trusted by 2,000+ executives</p>
            </div>
        </div>

        {/* Right Column: Terminal Simulation */}
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
            >
                {/* Terminal Header */}
                <div className="bg-zinc-900/50 px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="ml-4 text-xs font-mono text-zinc-400">beforesend-cli — diagnostics</div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 min-h-[320px] font-mono text-sm relative">
                    <div className="text-zinc-300 whitespace-pre-wrap">
                        {typingText}
                        {step === 0 && <span className="animate-pulse inline-block w-2 h-4 bg-brand-teal ml-1 align-middle"></span>}
                    </div>

                    {/* Interactive Controls */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col sm:flex-row gap-4 items-center justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <div className="text-zinc-500 text-xs uppercase tracking-wider">Target Lens:</div>
                                <div className="px-3 py-1 bg-brand-teal/10 text-brand-teal rounded-full text-xs font-bold border border-brand-teal/20">
                                    Budget Hawk CFO
                                </div>
                            </div>
                            <Button size="sm" onClick={runSimulation} className="w-full sm:w-auto animate-pulse">
                                Run Diagnostic
                            </Button>
                        </motion.div>
                    )}

                    {/* Analysis Overlay */}
                    {step === 2 && (
                        <div className="mt-8 space-y-2">
                            <div className="flex items-center gap-2 text-brand-teal">
                                <span className="animate-spin">⟳</span>
                                <span>Running heuristics...</span>
                            </div>
                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-brand-teal"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Result Overlay */}
                    {step === 3 && (
                         <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 border-t border-zinc-800 pt-6"
                         >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Diagnostic Score</span>
                                <span className="text-rose-500 font-bold text-xl">12/100</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-rose-200 font-bold mb-1 text-xs uppercase tracking-wide">Tone Critical</p>
                                        <p className="text-rose-200/80 text-xs">Authoritarian phrasing detects high risk of insubordination.</p>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-brand-teal/5 border border-brand-teal/20 rounded-lg relative overflow-hidden group cursor-pointer hover:bg-brand-teal/10 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                         <p className="text-brand-teal font-bold text-xs uppercase tracking-wide">Surgical Pivot</p>
                                         <ArrowRight className="w-4 h-4 text-brand-teal opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-zinc-300 text-sm italic">
                                        "To ensure we hit our Q3 targets, we need to optimize spend by 20%. Let's review the line items together to find the best path forward."
                                    </p>
                                </div>
                            </div>
                         </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Glow Effect behind terminal */}
            <div className="absolute -inset-4 bg-brand-teal/20 blur-xl -z-10 rounded-xl"></div>
        </div>

      </div>
    </section>
  );
}
