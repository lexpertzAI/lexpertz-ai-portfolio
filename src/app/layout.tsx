import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
      <body className={`${GeistSans.variable} bg-brand-black antialiased font-sans`}>
        <Navbar />
        {/* Main padding-top added to prevent content hiding under fixed navbar */}
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
