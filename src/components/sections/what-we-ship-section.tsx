"use client";

import Link from "next/link";
import Image from "next/image";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { whatWeShip } from "@/content/what-we-ship";
import { trackCTA } from "@/lib/analytics";

/**
 * WhatWeShipSection — homepage "What we ship" block.
 *
 * The five service practices render as a scroll-pinned card stack on desktop
 * (`ContainerScroll` + `CardSticky`): each card pins at a growing offset and
 * recedes in depth under the container's perspective. Mobile and
 * `prefers-reduced-motion` get a plain vertical stack with no JS motion.
 */
export function WhatWeShipSection() {
  return (
    <Section id="services" variant="muted">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            {whatWeShip.eyebrow}
          </Badge>
          <h2 className="heading-section">{whatWeShip.heading}</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {whatWeShip.description}
          </p>
        </div>

        <ContainerScroll scrollHeightVh={500} className="mt-12 space-y-8">
          {whatWeShip.projects.map((project, index) => (
            <CardSticky
              key={project.id}
              index={index}
              incrementY={56}
              incrementZ={8}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_10px_20px_0px_hsl(var(--foreground)/0.08)]"
            >
              <Link
                href={`/services/${project.slug}`}
                onClick={() => trackCTA("service_card", `/services/${project.slug}`)}
                className="block"
              >
                <div className="flex items-start justify-between gap-4 px-6 py-4 sm:px-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="heading-card">{project.title}</h3>
                    <p className="max-w-prose text-sm text-muted-foreground">
                      {project.tagline}
                    </p>
                  </div>
                  <span className="hidden shrink-0 pt-5 text-sm font-medium text-brand-cyan sm:block">
                    Read the spec →
                  </span>
                </div>

                <p className="px-6 pb-4 text-sm text-muted-foreground sm:px-8">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 px-6 pb-5 sm:px-8">
                  {project.deliverables.map((deliverable) => (
                    <Badge key={deliverable} variant="outline">
                      {deliverable}
                    </Badge>
                  ))}
                </div>

                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1280px) 1152px, (min-width: 768px) 80vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Link>
            </CardSticky>
          ))}
        </ContainerScroll>
      </Container>
    </Section>
  );
}
