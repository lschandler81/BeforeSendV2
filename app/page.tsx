"use client";

import { useState } from "react";

interface AnalysisResult {
  score: number;
  monologue: string;
  pivot: string;
}

export default function Home() {
  const [emailText, setEmailText] = useState("");
  const [selectedLens, setSelectedLens] = useState("CFO (Budget Protector)");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const lensOptions = [
    "CFO (Budget Protector)",
    "CTO (Practical Gatekeeper)",
    "HR Lead (Cultural Gatekeeper)",
    "End User (Practical Effort)",
  ];

  const handleCheck = async () => {
    if (!emailText.trim()) return;

    setLoading(true);
    setAnalysisResult(null);

    try {
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
        console.error("API Error:", result);
        alert(`Analysis failed: ${result.error}\n\nDetails: ${result.details || "Unknown error"}`);
        return;
      }

      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing email:", error);
      alert("Failed to analyze email. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-red-500 border-red-500 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]";
    if (score <= 70) return "text-amber-400 border-amber-400 shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)]";
    return "text-emerald-400 border-emerald-400 shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)]";
  };

  const getScoreBadge = (score: number) => {
     if (score < 30) return { label: "CRITICAL", color: "bg-red-500/10 text-red-500 border-red-500/20" };
     if (score <= 70) return { label: "CAUTION", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
     return { label: "OPTIMAL", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-zinc-800">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-zinc-100 rounded-full"></div>
            <h1 className="font-mono text-sm tracking-widest uppercase text-zinc-400">BeforeSend <span className="text-zinc-600">//</span> Terminal</h1>
          </div>
          <div className="text-xs text-zinc-600 font-mono hidden sm:block">
            V2.0.0 // READY
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Input Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
                <div>
                    <h2 className="text-xl font-medium tracking-tight">Message Diagnostics</h2>
                    <p className="text-zinc-500 mt-1">Select a target persona and input your draft.</p>
                </div>
                <div className="sm:w-72">
                    <label htmlFor="lens-select" className="sr-only">Lens</label>
                    <div className="relative">
                        <select
                            id="lens-select"
                            value={selectedLens}
                            onChange={(e) => setSelectedLens(e.target.value)}
                            className="w-full appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg px-4 py-2.5 pr-10 hover:border-zinc-700 focus:border-zinc-600 focus:ring-0 transition-colors cursor-pointer text-sm"
                        >
                            {lensOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-zinc-800 rounded-xl opacity-50 blur group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                    <textarea
                        id="email-input"
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder="Paste your message here for analysis..."
                        rows={10}
                        disabled={loading}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors resize-y font-mono text-sm leading-relaxed"
                    />
                    <div className="absolute bottom-4 right-4">
                         <button
                            onClick={handleCheck}
                            disabled={loading || !emailText.trim()}
                            className="bg-zinc-100 hover:bg-white text-zinc-950 font-medium py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-zinc-950 rounded-full animate-bounce"></span>
                                    Processing...
                                </span>
                            ) : "Run Diagnostics"}
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="animate-fade-in space-y-8 border-t border-zinc-900 pt-12">
              <div className="flex items-center gap-4">
                  <div className="h-px bg-zinc-900 flex-1"></div>
                  <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Analysis Report</span>
                  <div className="h-px bg-zinc-900 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Score Card */}
                <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${getScoreColor(analysisResult.score).includes("red") ? "from-red-500/20" : getScoreColor(analysisResult.score).includes("amber") ? "from-amber-500/20" : "from-emerald-500/20"} to-transparent pointer-events-none`}></div>
                    <span className="text-zinc-300 text-sm font-medium mb-6 uppercase tracking-wider">Tone Score</span>

                    <div className={`relative w-40 h-40 rounded-full border-4 flex items-center justify-center ${getScoreColor(analysisResult.score)} transition-all duration-500`}>
                        <div className="text-center">
                            <span className="text-5xl font-bold tracking-tighter block">{analysisResult.score}</span>
                            <span className="text-xs text-zinc-300 font-mono">/ 100</span>
                        </div>
                    </div>

                    <div className={`mt-6 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${getScoreBadge(analysisResult.score).color} uppercase`}>
                        {getScoreBadge(analysisResult.score).label}
                    </div>
                </div>

                {/* Monologue Card */}
                <div className="lg:col-span-2 bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-400">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                        </div>
                        <h3 className="text-lg font-medium text-zinc-200">Internal Monologue</h3>
                    </div>
                    <div className="relative">
                         <div className="absolute top-0 left-0 w-1 h-full bg-zinc-700 rounded-full"></div>
                         <p className="pl-6 text-zinc-400 text-lg italic leading-relaxed">
                            "{analysisResult.monologue}"
                         </p>
                    </div>
                </div>

                {/* Pivot Card */}
                <div className="lg:col-span-3 bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-8">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-lg font-medium text-blue-100">Recommended Pivot</h3>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                        {analysisResult.pivot}
                    </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono">
          <div>© 2026 BEFORESEND LABS</div>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-zinc-400">PRIVACY</span>
            <span className="cursor-pointer hover:text-zinc-400">TERMS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
