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
    if (score < 30) return { bg: "bg-red-500", ring: "ring-red-500/30" };
    if (score <= 70) return { bg: "bg-yellow-500", ring: "ring-yellow-500/30" };
    return { bg: "bg-green-500", ring: "ring-green-500/30" };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-navy via-[#0f1e2a] to-brand-navy">
      {/* Header */}
      <header className="bg-brand-navy/80 backdrop-blur-sm shadow-lg border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white">BeforeSend</h1>
          <p className="text-zinc-300 mt-1">Check your message tone before sending</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="bg-brand-navy/50 backdrop-blur-xl rounded-xl shadow-2xl p-8 space-y-6 border border-brand-teal/20">
            {/* Dropdown */}
            <div>
              <label htmlFor="lens-select" className="block text-sm font-medium text-zinc-300 mb-2">
                Select Lens
              </label>
              <select
                id="lens-select"
                value={selectedLens}
                onChange={(e) => setSelectedLens(e.target.value)}
                className="w-full px-4 py-3 bg-brand-navy border border-zinc-800 rounded-xl text-white focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition"
              >
                {lensOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Area */}
            <div>
              <label htmlFor="email-input" className="block text-sm font-medium text-zinc-300 mb-2">
                Your Email
              </label>
              <textarea
                id="email-input"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Type your email here..."
                rows={12}
                disabled={loading}
                className="w-full px-4 py-3 bg-brand-navy border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition resize-none disabled:opacity-50"
              />
            </div>

            {/* Check Button */}
            <button
              onClick={handleCheck}
              disabled={loading || !emailText.trim()}
              className="w-full bg-brand-teal hover:bg-brand-teal/90 disabled:bg-zinc-700 disabled:cursor-not-allowed text-brand-navy disabled:text-zinc-400 font-bold py-4 px-6 rounded-xl transition duration-200 shadow-lg hover:shadow-brand-teal/50"
            >
              {loading ? "Simulating recipient's brain..." : "Check Tone"}
            </button>
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="space-y-6 animate-fade-in">
              {/* Score Circle */}
              <div className="bg-brand-navy/50 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-brand-teal/20 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-6">BeforeSend Score</h2>
                <div
                  className={`relative w-48 h-48 rounded-full ${
                    getScoreColor(analysisResult.score).bg
                  } flex items-center justify-center shadow-2xl ring-8 ${
                    getScoreColor(analysisResult.score).ring
                  }`}
                >
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
              <div className="bg-brand-navy/50 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-brand-teal/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-brand-teal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  What they are thinking...
                </h3>
                <p className="text-zinc-300 italic text-lg leading-relaxed">
                  "{analysisResult.monologue}"
                </p>
              </div>

              {/* Pivot / Actionable Fix */}
              <div className="bg-gradient-to-br from-brand-teal/20 to-brand-teal/10 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-brand-teal/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-brand-teal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Actionable Fix
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  {analysisResult.pivot}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy/80 backdrop-blur-sm border-t border-zinc-800/50 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-zinc-400">
          © 2026 BeforeSend. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
