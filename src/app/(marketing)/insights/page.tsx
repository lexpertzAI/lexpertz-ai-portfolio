import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { getPublishedInsights } from "@/content/insights";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Sharp opinions on RAG, evals, and agents — mostly after we ship them.",
};

export default async function InsightsPage() {
  const insights = await getPublishedInsights();
  return (
    <Container className="py-16 md:py-24">
      <SlideUp className="mb-10 border-b border-border pb-8">
        <Badge variant="outline" className="mb-4 w-fit">Field notes</Badge>
        <h1 className="heading-page">
          Engineering notes from production ML.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          No listicles. No half-baked takes. Just things we learned building
          retrievers, agents, and eval harnesses for real clients.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span>{String(insights.length).padStart(2, "0")} dispatches</span>
          <span aria-hidden="true">·</span>
          <span>Newest first</span>
        </div>
      </SlideUp>

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <StaggerItem key={insight.slug} className="h-full">
            <BlogPostCard
              variant="media"
              category={insight.category}
              publishedAt={insight.publishedAt}
              title={insight.title}
              summary={insight.summary}
              imageUrl={insight.coverImage}
              href={`/insights/${insight.slug}`}
              readingTimeMinutes={insight.readingTimeMinutes}
              index={String(i + 1).padStart(2, "0")}
              className="h-full"
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Container>
  );
}
