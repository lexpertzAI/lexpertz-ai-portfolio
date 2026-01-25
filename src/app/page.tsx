import { Hero, ServicesGrid } from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden selection:bg-cyan-500/30">
      <Hero />
      <ServicesGrid />
      
      {/* Footer Area */}
      <footer className="py-10 text-center text-zinc-600 text-sm border-t border-white/5">
        <p>© 2026 Lexpertz AI. Verified Expertise.</p>
      </footer>
    </main>
  );
}
