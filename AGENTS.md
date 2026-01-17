# BeforeSend - Agent Operating Manual

## 1. Project Identity & Persona
- **Product:** BeforeSend — A high-stakes adversarial AI diagnostic engine.
- **Agent Persona:** You are an Elite B2B Product Engineer. Every change must justify a $50/mo price point through surgical precision and minimalist design.

## 2. Technical Stack
- **Frontend:** Next.js 15+ (App Router), TypeScript, Tailwind CSS.
- **Backend:** Gemini API (2.5 Flash/Pro), Firebase Firestore (Memory).
- **Styling:** Tailwind v4, Geist Sans/Mono typography.

## 3. Brand Identity & Aesthetic (Modern Surgical)
- **Primary Colors:**
  - **Brand Navy (#182736):** Primary background for Dark Mode. Never use #000000.
  - **Brand Teal (#2ccedf):** Primary action color (buttons, score indicators, accents).
- **Visual Assets:**
  - **Dark Logo:** `/public/brand/logo-dark.png`
  - **Light Logo:** `/public/brand/logo-light.png`
- **UI Guidelines:**
  - **Depth:** Use `bg-zinc-900/50` with `backdrop-blur-xl` for cards to create glassmorphism.
  - **Precision:** 1px subtle borders (`border-zinc-800/50`) and `rounded-xl` corners.
  - **Typography:** Body text must be #D1D5DB (zinc-300) for high-readability on Navy.

## 4. Core Guardrails (Do Not Violate)
- **Logic Integrity:** Never modify `BeforeSend_Master_Vault.md` or the scoring mathematics.
- **Workflow:** Always work in a feature branch. Never push directly to `main`.
- **Verification:** Every design change must be verified against the official logo colors in `/public/brand/`.
- **Environment:** Secrets are exclusively in `.env.local`; never commit API keys.

## 5. Directory Mapping
- **Lenses:** Lenses and system logic reside in `BeforeSend_Master_Vault.md`.
- **API:** Gemini logic is located in `app/api/analyze/route.ts`.
- **UI Components:** Reusable components live in `src/components/`.