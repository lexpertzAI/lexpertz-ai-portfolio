"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem, TiltCard } from "@/components/motion";
import { services } from "@/content/services";
import { trackCTA } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * ServicesGrid — 3-column Bento grid showcasing the five core services plus
 * one CTA tile. The CTA breaks the rank visually by taking a `col-span-2`
 * slot on `lg` to anchor the eye.
 */
export function ServicesGrid() {
  return (
    <Section id="services" variant="muted">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            What we ship
          </Badge>
          <h2 className="heading-section">
            Five practices. One engineering culture.
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Pick a single engagement or compose them into a quarterly program —
            every effort ends with your team owning the system.
          </p>
        </div>

        <StaggerContainer className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <TiltCard className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  onClick={() =>
                    trackCTA("service_card", `/services/${service.slug}`)
                  }
                  className={cn(
                    "block h-full",
                    i === services.length - 1 && "md:col-span-2 lg:col-span-1"
                  )}
                >
                  <BentoCard className="h-full">
                    <div className="flex h-full flex-col gap-3">
                    <div className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="heading-card">
                      {service.title}
                    </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.summary}
                      </p>
                      <div className="mt-auto pt-3 text-sm font-medium text-brand-cyan">
                        Read the spec →
                      </div>
                    </div>
                  </BentoCard>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}

          {/* CTA tile */}
          <StaggerItem>
            <TiltCard className="h-full">
              <Link
                href="/contact"
                onClick={() => trackCTA("services_cta", "/contact")}
                className="block h-full"
              >
                <BentoCard className="h-full bg-brand-gradient">
                  <div className="flex h-full flex-col gap-3 text-brand-cyan-foreground">
                    <div className="font-mono text-xs font-medium uppercase tracking-[0.14em] opacity-80">
                      Next step
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
                      Build a 90-day plan together
                    </h3>
                    <p className="text-sm opacity-90">
                      Tell us your stack, your stack of tickets, and your goals —
                      we’ll come back with a build-vs-buy matrix.
                    </p>
                    <div className="mt-auto pt-3 text-sm font-medium">
                      Book a call →
                    </div>
                  </div>
                </BentoCard>
              </Link>
            </TiltCard>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </Section>
  );
}
