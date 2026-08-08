import { Metadata } from "next";
import { HeroCinematic } from "@/components/sections/hero-cinematic";
import { FeaturedStatsSection } from "@/components/sections/featured-stats-section";
import { ServicesGrid } from "@/components/sections/services-grid";
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
      <FeaturedStatsSection />
      <ServicesGrid />
      <ProcessSection />
      <CaseStudiesPreview />
      <InsightsPreview />
      <TeamSection />
      <CTASection />
    </>
  );
}
