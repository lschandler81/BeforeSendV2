"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Play, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [emailText, setEmailText] = useState("");
  const [selectedLens, setSelectedLens] = useState("CFO (Budget Protector)");
  const [loading, setLoading] = useState(false);

  const lensOptions = [
    "CFO (Budget Protector)",
    "CTO (Practical Gatekeeper)",
    "HR Lead (Cultural Gatekeeper)",
    "End User (Practical Effort)",
    "Board Member (Strategic Risk)",
    "Investor (Growth & ROI)"
  ];

  const handleAnalyze = async () => {
    if (!emailText.trim() || !user) return;

    setLoading(true);

    try {
      // 1. Call Analysis API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailText,
          lensType: selectedLens,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      // 2. Save to Firestore
      const docRef = await addDoc(collection(db, "users", user.uid, "analyses"), {
        timestamp: serverTimestamp(),
        originalText: emailText,
        lensType: selectedLens,
        score: result.score,
        monologue: result.monologue,
        pivot: result.pivot,
      });

      // 3. Redirect to Results
      router.push(`/results/${docRef.id}`);

    } catch (error) {
      console.error("Error analyzing email:", error);
      alert("Failed to run diagnostics. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-brand-teal/30">
      <Header />

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 lg:p-12 relative">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Diagnostic Terminal</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Select a target persona and input your draft for adversarial analysis.</p>
                </div>

                <div className="space-y-6 flex-1 max-h-[600px] flex flex-col">
                    {/* Persona Selector */}
                    <div className="flex flex-wrap gap-2">
                        {lensOptions.map((lens) => (
                            <button
                                key={lens}
                                onClick={() => setSelectedLens(lens)}
                                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                                    selectedLens === lens
                                    ? "bg-brand-teal text-white border-brand-teal shadow-[0_0_15px_rgba(44,206,223,0.3)]"
                                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-brand-teal/50"
                                }`}
                            >
                                {lens}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="relative flex-1 group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-200 to-zinc-200 dark:from-zinc-800 dark:to-zinc-800 rounded-xl opacity-50 blur group-hover:opacity-75 transition duration-500"></div>
                         <textarea
                            value={emailText}
                            onChange={(e) => setEmailText(e.target.value)}
                            placeholder="// Paste your draft here..."
                            disabled={loading}
                            className="relative w-full h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors resize-none font-mono text-sm leading-relaxed"
                        />
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !emailText.trim()}
                            className="bg-brand-teal hover:bg-brand-teal/90 text-zinc-900 font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(44,206,223,0.4)] hover:shadow-[0_0_30px_-5px_rgba(44,206,223,0.6)] flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin"></span>
                                    Running Diagnostics...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Run Analysis
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
