"use client";

import * as React from "react";
import { useScroll, useSpring } from "framer-motion";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ScrollTransform, StaggerContainer, StaggerItem } from "@/components/motion";

/** ProcessTimeline — left-aligned phases with numeric markers. */
const phases = [
  {
    n: 1,
    title: "Discovery & Eval Audit",
    body:
      "Day 1. We map your stack, audit existing evals (or build an emergency golden set), and write down exactly what we will ship and what we won’t.",
  },
  {
    n: 2,
    title: "Reference Implementation",
    body:
      "Weeks 1-3. A working reference for the chosen practice area — RAG, eval harness, agent scaffold, MLOps topology, or strategic roadmap. Evaluated daily against golden set.",
  },
  {
    n: 3,
    title: "Production Handoff",
    body:
      "Weeks 4-6. We pair with your engineers to land the system in production with on-call runbooks, dashboards, and a regression CI hook.",
  },
  {
    n: 4,
    title: "Open Knowledge Transfer",
    body:
      "Throughout. Every decision is documented in your wiki. We hand off ownership, then leave.",
  },
];

export function ProcessTimeline() {
  const listRef = React.useRef<HTMLDivElement>(null);

  // Draws the connector as the phase list scrolls into view.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
  });

  return (
    <Section id="process">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            How we work
          </Badge>
          <h2 className="heading-section">
            From discovery to handoff, in four phases.
          </h2>
        </div>

        <div ref={listRef} className="relative">
          {/* Track + animated progress connector behind the number markers */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 w-px bg-border"
          />
          <ScrollTransform
            aria-hidden="true"
            scaleY={lineScale}
            className="absolute bottom-8 left-5 top-8 w-px origin-top bg-gradient-to-b from-brand-cyan to-brand-blue"
          />

          <StaggerContainer className="relative flex flex-col gap-6">
            {phases.map((phase) => (
              <StaggerItem
                key={phase.n}
                className="relative grid grid-cols-[40px_1fr] gap-6"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-cyan/40 bg-background font-mono text-sm font-semibold text-brand-cyan">
                  {String(phase.n).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6">
                  <h3 className="heading-card">
                    {phase.title}
                  </h3>
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    {phase.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </Section>
  );
}
