import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeforeSend - Check Message Tone",
  description: "Premium SaaS for checking message tone before sending",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
