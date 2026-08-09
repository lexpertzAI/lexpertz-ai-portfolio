import { Metadata } from "next";
import { HeroCinematic } from "@/components/sections/hero-cinematic";
import { EngineeredIntelligenceSection } from "@/components/sections/engineered-intelligence-section";
import { WhatWeShipSection } from "@/components/sections/what-we-ship-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TeamSection } from "@/components/sections/team-section";
import { CaseStudiesPreview } from "@/components/sections/case-study-card";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroCinematic />
      <EngineeredIntelligenceSection />
      <WhatWeShipSection />
      <ProcessSection />
      <CaseStudiesPreview />
      <InsightsPreview />
      <TeamSection />
      <CTASection />
    </>
  );
}
