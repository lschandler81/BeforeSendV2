import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-400 text-sm">
            © 2026 BeforeSend Labs. All rights reserved.
          </div>

          <div className="flex gap-8 text-sm text-zinc-400">
            <Link href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-teal transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-brand-teal transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-brand-teal transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
