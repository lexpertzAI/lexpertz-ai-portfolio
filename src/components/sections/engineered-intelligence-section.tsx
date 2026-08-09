"use client";

import { Boxes, FileText, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { useMediaGreaterThan } from "@/lib/hooks/use-media";
import { engineeredIntelligence, type IntelligenceTheme } from "@/content/engineered-intelligence";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { Zap, FileText, Boxes, ShieldCheck };

/** Brand-tinted card surfaces — never raw hex (design-system accent discipline). */
const THEMES: Record<IntelligenceTheme, string> = {
  cyan: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
  blue: "border-brand-blue/30 bg-brand-blue/10 text-brand-blue",
  indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
  success: "border-success/30 bg-success/10 text-success",
};

/**
 * EngineeredIntelligenceSection — homepage "Proof over promises" block.
 *
 * The four headline metrics render as a scroll-pinned stack of rotated stat
 * cards on desktop. Rotation is gated to `md+` (inline style leak guard),
 * so mobile and reduced-motion users get a clean static stack.
 */
export function EngineeredIntelligenceSection() {
  const isDesktop = useMediaGreaterThan("md");

  return (
    <Section id="impact" variant="muted">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <p className="eyebrow">{engineeredIntelligence.eyebrow}</p>
          <h2 className="heading-section">{engineeredIntelligence.heading}</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {engineeredIntelligence.highlight}
          </p>
        </div>

        <ContainerScroll scrollHeightVh={400} className="mt-12 space-y-8">
          {engineeredIntelligence.stats.map((stat, index) => {
            const Icon = ICONS[stat.icon];
            return (
              <CardSticky
                key={stat.id}
                index={index + 2}
                incrementY={24}
                incrementZ={6}
                className={cn(
                  "mx-auto flex h-56 w-[min(100%,420px)] flex-col justify-between rounded-2xl border p-6 md:h-72 md:p-8",
                  THEMES[stat.theme]
                )}
                style={isDesktop ? { rotate: `${index + 2}deg` } : undefined}
              >
                {Icon ? <Icon aria-hidden="true" className="h-8 w-8 opacity-70" /> : null}
                <p className="font-mono text-4xl font-semibold tracking-tight md:text-6xl">
                  {stat.value}
                </p>
                <h3 className="text-sm font-medium text-muted-foreground md:text-lg">
                  {stat.label}
                </h3>
              </CardSticky>
            );
          })}
        </ContainerScroll>
      </Container>
    </Section>
  );
}
