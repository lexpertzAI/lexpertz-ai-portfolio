"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { GrowthChart } from "@/components/ui/growth-chart";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { featuredStats } from "@/content/featured-stats";

/**
 * FeaturedStatsSection — homepage stats strip: headline, headline metrics,
 * and the growth chart. Sits after the hero and hands off to services.
 */
export function FeaturedStatsSection() {
  return (
    <Section
      variant="muted"
      id="impact"
      className="pt-20 lg:pt-32"
    >
      <Container>
        <FadeIn>
          <p className="eyebrow mb-5">By the numbers</p>
          <h2 className="heading-section">
            {featuredStats.heading}{" "}
            <span className="text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
              {featuredStats.highlight}
            </span>
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-12" staggerChildren={0.1}>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {featuredStats.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div>
                  <p className="font-mono text-3xl font-semibold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn delay={0.15}>
          <GrowthChart data={featuredStats.chart} className="mt-8" />
        </FadeIn>
      </Container>
    </Section>
  );
}
