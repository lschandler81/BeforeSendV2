# BeforeSend

A premium SaaS application for checking message tone before sending.

## Features

- Large central text area for message input
- Tone checker dropdown with 4 persona options:
  - CFO (Budget Protector)
  - CTO (Practical Gatekeeper)
  - HR Lead (Cultural Gatekeeper)
  - End User (Practical Effort)
- Clean, professional UI design
- "Check Tone" button for analysis

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React 19** for UI components

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
BeforeSendV2/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page with tone checker
│   └── globals.css      # Global styles
├── public/              # Static assets
├── .github/             # GitHub configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Build for Production

```bash
npm run build
npm start
```

## License

ISC
