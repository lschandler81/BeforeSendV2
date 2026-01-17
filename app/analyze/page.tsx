"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Terminal, Loader2 } from "lucide-react";
import Link from "next/link";

interface AnalysisResult {
  score: number;
  monologue: string;
  pivot: string;
}

export default function AnalyzePage() {
  const [emailText, setEmailText] = useState("");
  const [selectedLens, setSelectedLens] = useState("CFO");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const lensOptions = [
    { value: "CFO", label: "CFO (Budget Protector)" },
    { value: "CTO", label: "CTO (Practical Gatekeeper)" },
    { value: "HR Lead", label: "HR Lead (Cultural Gatekeeper)" },
    { value: "End User", label: "End User (Practical Effort)" },
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
    if (score < 30) return "bg-rose-500";
    if (score <= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="min-h-screen bg-brand-navy">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center font-bold text-brand-navy">
              B
            </div>
            <span className="text-xl font-bold text-white">BeforeSend</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white">Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Hero Text */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Diagnostic Terminal
            </h1>
            <p className="text-zinc-400 text-lg">
              Run adversarial tone analysis on your message
            </p>
          </div>

          {/* Terminal Window */}
          <div className="bg-white/5 border border-brand-teal/20 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-slate-800/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <Terminal className="w-4 h-4 text-zinc-400 ml-2" />
              <span className="text-sm text-zinc-400 font-mono">analyze.sh</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-6">
              {/* Lens Selector */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3 font-mono">
                  &gt; Select Adversarial Lens:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {lensOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedLens(option.value)}
                      className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                        selectedLens === option.value
                          ? "bg-brand-teal text-brand-navy font-bold"
                          : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-slate-800/50"
                      }`}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3 font-mono">
                  &gt; Paste your message:
                </label>
                <textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Type or paste your email here..."
                  rows={12}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-brand-navy border border-slate-800/50 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition resize-none disabled:opacity-50 font-mono text-sm"
                />
              </div>

              {/* Run Button */}
              <Button
                onClick={handleCheck}
                disabled={loading || !emailText.trim()}
                className="w-full bg-brand-teal hover:bg-brand-teal/90 text-brand-navy font-bold text-lg py-6 rounded-xl shadow-lg shadow-brand-teal/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Simulating recipient's brain...
                  </>
                ) : (
                  "RUN DIAGNOSTIC >"
                )}
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="space-y-6 animate-fade-in">
              {/* Score Circle */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-brand-teal/20 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-6">BeforeSend Score</h2>
                <div className={`relative w-48 h-48 rounded-full ${getScoreColor(analysisResult.score)} flex items-center justify-center shadow-2xl`}>
                  <span className="text-7xl font-bold text-white">
                    {analysisResult.score}
                  </span>
                </div>
                <p className="text-zinc-400 mt-4 text-center">
                  {analysisResult.score < 30
                    ? "High Risk - Consider major revisions"
                    : analysisResult.score <= 70
                    ? "Moderate Risk - Room for improvement"
                    : "Low Risk - Good to send"}
                </p>
              </div>

              {/* Internal Monologue */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-slate-800/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-brand-teal">💭</span>
                  What they are thinking...
                </h3>
                <p className="text-zinc-300 italic text-lg leading-relaxed">
                  &ldquo;{analysisResult.monologue}&rdquo;
                </p>
              </div>

              {/* Pivot / Actionable Fix */}
              <div className="bg-gradient-to-br from-brand-teal/20 to-brand-teal/10 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-brand-teal/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-brand-teal">⚡</span>
                  Surgical Pivot
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  {analysisResult.pivot}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
