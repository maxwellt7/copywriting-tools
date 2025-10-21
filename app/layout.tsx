import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copywriting Mastery - AI Copy Generator",
  description: "Perfect your copywriting with AI-powered tools trained on legendary copywriters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
