"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedRoadmap } from "@/components/ui/animated-roadmap";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { roadmap } from "@/content/roadmap";
import { trackCTA } from "@/lib/analytics";

/**
 * CTASection — closing roadmap CTA. Brand copy + CTAs on top, scroll-drawn
 * milestone map below (`AnimatedRoadmap` driven by `src/content/roadmap.ts`).
 */
export function CTASection() {
  return (
    <Section variant="hero">
      <Container className="flex max-w-5xl flex-col items-center gap-4">
        <StaggerContainer className="flex flex-col items-center gap-4 text-center">
          <StaggerItem>
            <Badge variant="brand">Let&apos;s ship</Badge>
          </StaggerItem>
          <StaggerItem>
            <h2 className="heading-section lg:text-5xl">
              Let&apos;s Architect Your Intelligence.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Ready to move beyond basic automation? Whether you need an
              Enterprise RAG pipeline, a self-healing agentic workflow, or a
              specialized AI System — I&apos;m ready to engineer the solution.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                asChild
                variant="brand"
                size="lg"
                className="cta-pulse"
                onClick={() => trackCTA("closing_cta_primary", "/contact")}
              >
                <Link href="/contact">Book A Free Call</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="/case-studies"
                  onClick={() => trackCTA("closing_cta_secondary", "/case-studies")}
                >
                  View the work
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <AnimatedRoadmap
          className="w-full"
          milestones={roadmap.milestones}
          mapImageSrc={roadmap.mapImage}
          aria-label="Engagement roadmap from discovery to open knowledge transfer"
        />
      </Container>
    </Section>
  );
}
