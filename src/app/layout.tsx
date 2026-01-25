import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lexpertz AI | Intelligent Business Solutions",
  description: "Enterprise RAG, Logic Evaluation, and Edge AI Services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-brand-black antialiased">{children}</body>
    </html>
  );
}
