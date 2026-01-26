import { Hero, ServicesGrid } from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden selection:bg-cyan-500/30">
      <Hero />
      <ServicesGrid />
      
      {/* 
         Legacy footer removed. 
         The Global Footer is now handled automatically by layout.tsx 
      */}
    </main>
  );
}
