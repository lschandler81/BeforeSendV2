"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Sidebar } from "@/components/dashboard/Sidebar"; // Optional: keep sidebar for persistence? Prompt implies it stays.
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { ArrowLeft, Copy, Check, AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ResultPage() {
  const { id } = useParams();
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter();

  // Use 'as string' because id from useParams can be string or array, but here it's likely string
  const docId = Array.isArray(id) ? id[0] : id;

  const [snapshot, loading, error] = useDocument(
    user && docId ? doc(db, "users", user.uid, "analyses", docId) : null
  );

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
        router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleCopy = () => {
    if (snapshot?.data()?.pivot) {
        navigator.clipboard.writeText(snapshot.data()?.pivot);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  }

  const data = snapshot?.data();

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-rose-500 border-rose-500";
    if (score <= 70) return "text-amber-500 border-amber-500";
    return "text-emerald-500 border-emerald-500";
  };

  const getRiskLabel = (score: number) => {
     if (score < 30) return { label: "CRITICAL", color: "text-rose-500 bg-rose-500/10 border-rose-500/20", icon: <ShieldAlert className="w-5 h-5"/> };
     if (score <= 70) return { label: "MODERATE", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", icon: <AlertTriangle className="w-5 h-5"/> };
     return { label: "LOW", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle2 className="w-5 h-5"/> };
  }

  if (authLoading || loading) {
      return (
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin"></div>
          </div>
      )
  }

  if (!data) {
       return (
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4">
              <p className="text-zinc-500">Analysis not found.</p>
              <Link href="/dashboard"><Button>Return to Dashboard</Button></Link>
          </div>
      )
  }

  const score = data.score || 0;
  const risk = getRiskLabel(score);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-brand-teal/30">
      <Header />

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 lg:p-12 relative">
             {/* Breadcrumb */}
             <div className="max-w-6xl mx-auto mb-8">
                 <Link href="/dashboard" className="inline-flex items-center text-sm text-zinc-500 hover:text-brand-teal transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                 </Link>
             </div>

             <div className="max-w-6xl mx-auto space-y-8">

                {/* Hero Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Score */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold ${getScoreColor(score)}`}>
                            {score}
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider font-mono">Tone Score</p>
                            <p className="text-sm text-zinc-400 mt-1">out of 100</p>
                        </div>
                    </div>

                    {/* Risk */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex items-center gap-6">
                         <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${risk.color} border`}>
                            {risk.icon}
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider font-mono">Risk Level</p>
                            <p className={`text-xl font-bold mt-1 ${risk.color.split(" ")[0]}`}>{risk.label}</p>
                        </div>
                    </div>

                    {/* Confidence */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex items-center gap-6">
                         <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-brand-teal/10 border border-brand-teal/20 text-brand-teal">
                            <span className="font-bold text-lg">94%</span>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider font-mono">AI Confidence</p>
                            <p className="text-sm text-zinc-400 mt-1">Based on {data.lensType}</p>
                        </div>
                    </div>
                </div>

                {/* Split View */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Internal Monologue (Problem) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                             <h2 className="font-bold text-lg">Internal Monologue</h2>
                        </div>
                        <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-8 relative">
                             <span className="absolute top-4 left-4 text-rose-500/20 text-4xl font-serif">"</span>
                             <p className="relative z-10 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
                                {data.monologue}
                             </p>
                        </div>
                        <div className="text-sm text-zinc-500">
                            The recipient is likely to interpret your message this way due to the power dynamic.
                        </div>
                    </div>

                    {/* Surgical Pivot (Solution) */}
                    <div className="space-y-4">
                         <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                                <h2 className="font-bold text-lg text-brand-teal">Surgical Pivot</h2>
                             </div>
                             <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy Draft"}
                             </Button>
                        </div>
                        <div className="bg-brand-teal/5 border border-brand-teal/10 rounded-xl p-8 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 relative group">
                             <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <div className="text-[10px] text-brand-teal bg-brand-teal/10 px-2 py-1 rounded">OPTIMIZED</div>
                             </div>
                             {data.pivot}
                        </div>
                        <div className="text-sm text-zinc-500">
                            This version maintains your intent but corrects the tonal risks.
                        </div>
                    </div>
                </div>

             </div>
        </main>
      </div>
    </div>
  );
}
