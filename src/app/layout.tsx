import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-brand-black antialiased font-sans`}>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
