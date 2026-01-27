import { Hero, ServicesGrid } from "@/components/landing";
import { FounderSection } from "@/components/founder"; // <--- Importing the missing section

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden selection:bg-cyan-500/30">
      {/* 1. The Hero Section */}
      <Hero />
      
      {/* 2. The Services Grid */}
      <ServicesGrid />
      
      {/* 3. The Founder Profile (This was missing) */}
      <FounderSection /> 
    </main>
  );
}
