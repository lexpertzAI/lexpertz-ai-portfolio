"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { trackCTA } from "@/lib/analytics";
import type { InsightSurface } from "@/content/types";

/**
 * InsightsPreview — published technical blog tiles on the homepage.
 *
 * "Dispatch ledger" layout: the newest post is the lead story (cover art +
 * byline + CTA), and the next posts stack in a narrow index rail. One focal
 * point, one card style, and mono metadata carry the editorial hierarchy.
 *
 * Posts arrive as props rather than being read here: the catalog is read from
 * markdown on the filesystem (`@/lib/insights`), and this is a client
 * component for `trackCTA`, so the server component that renders it
 * (`app/page.tsx`) does the read and passes the result down.
 */
export function InsightsPreview({ insights }: { insights: InsightSurface[] }) {
  const [featured, ...rest] = insights;

  if (!featured) return null;

  return (
    <Section id="insights">
      <Container>
        <div className="mb-8 flex flex-col gap-6 border-b border-border pb-8 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <Badge variant="outline" className="w-fit">
              Field Notes
            </Badge>
            <h2 className="heading-section">
              Architecture decisions, physics-informed MLOps, and agentic
              patterns.
            </h2>
            <p className="max-w-xl text-lg text-muted-foreground">
              Deep technical writing on what I build and why — no listicles,
              no half-baked takes.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-fit shrink-0"
          >
            <Link
              href="/insights"
              onClick={() => trackCTA("insights_all", "/insights")}
            >
              All insights
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid gap-4 lg:grid-cols-12">
          <StaggerItem
            className={rest.length > 0 ? "h-full lg:col-span-8" : "h-full lg:col-span-12"}
          >
            <BlogPostCard
              variant="featured"
              category={featured.category}
              publishedAt={featured.publishedAt}
              title={featured.title}
              summary={featured.summary}
              imageUrl={featured.coverImage}
              href={`/insights/${featured.slug}`}
              readingTimeMinutes={featured.readingTimeMinutes}
              author={featured.author}
              onClick={() =>
                trackCTA("insight_card", `/insights/${featured.slug}`)
              }
              className="h-full"
            />
          </StaggerItem>

          {rest.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:auto-rows-fr">
              {rest.map((insight, i) => (
                <StaggerItem key={insight.slug} className="h-full">
                  <BlogPostCard
                    category={insight.category}
                    publishedAt={insight.publishedAt}
                    title={insight.title}
                    summary={insight.summary}
                    href={`/insights/${insight.slug}`}
                    readingTimeMinutes={insight.readingTimeMinutes}
                    index={String(i + 2).padStart(2, "0")}
                    onClick={() =>
                      trackCTA("insight_card", `/insights/${insight.slug}`)
                    }
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </div>
          ) : null}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
