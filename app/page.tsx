import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}>
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
