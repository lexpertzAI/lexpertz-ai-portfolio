import { Hero, ServicesGrid } from "@/components/landing";
import { FounderSection } from "@/components/founder";
import { TimelineSection } from "@/components/timeline";
import { ProjectsSection } from "@/components/projects";
import { TechStack } from "@/components/tech-stack"; // <--- Import

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden selection:bg-cyan-500/30">
      <Hero />
      <ServicesGrid />
      <FounderSection />
      <TimelineSection />
      <ProjectsSection />
      <TechStack /> {/* <--- The Engine Room */}
    </main>
  );
}
