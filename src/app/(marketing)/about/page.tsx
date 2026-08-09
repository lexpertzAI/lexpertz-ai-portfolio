import type { Metadata } from "next";
import { Atom, ShieldCheck, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { BentoCard } from "@/components/ui/bento-card";
import { ProfileCard } from "@/components/ui/profile-card";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { CTASection } from "@/components/sections/cta-section";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  CountUp,
} from "@/components/motion";
import { team } from "@/content/team";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.founderName} — Physics undergraduate turned AI Architect. Building deterministic LangGraph systems, physics-informed MLOps, and zero-hallucination RAG pipelines.`,
  openGraph: {
    title: "About Lexpertz",
    description: siteConfig.description,
    images: [{ url: "/founder.jpg", width: 800, height: 800 }],
  },
};

/** Proof metrics — mirror the homepage statbar values for consistency. */
const PROOF_STATS = [
  {
    label: "p95 Retrieval Latency",
    value: <CountUp value={0.9} decimals={1} suffix="s" />,
  },
  {
    label: "Sources Cited per Answer",
    value: <CountUp value={4} />,
  },
  {
    label: "RAG Pipelines in Production",
    value: <CountUp value={250} suffix="+" />,
  },
  {
    label: "Uptime Guarantee",
    value: <CountUp value={99.9} decimals={1} suffix="%" />,
  },
];

/** Tenet tiles — claims extracted verbatim from the mission paragraph. */
const TENETS = [
  {
    icon: ShieldCheck,
    title: "Verifiable",
    body: "Every system I ship is measured against RAGAS telemetry and validated by a prosecutor node that forces retries until faithfulness exceeds 90%.",
  },
  {
    icon: Atom,
    title: "Physics-Informed",
    body: "Physics-informed anomaly detection and enterprise RAG pipelines that cite their sources line-by-line.",
  },
  {
    icon: Workflow,
    title: "Self-Correcting",
    body: "Deterministic multi-agent LangGraph systems with adversarial verification. No black boxes. No magic. Just verifiable, auditable intelligence.",
  },
];

/** The evolution journey — same phases, rendered as the ProcessSteps zigzag. */
const evolutionPhases: Step[] = [
  {
    title: "2018 · The Foundation",
    description:
      "Launched Lexpertz Technologies — focused on SEO, digital marketing, and web architecture. The seed of entrepreneurship was planted during what I now call the 'Passive Learning' phase.",
    theme: "cyan",
  },
  {
    title: "2023 · The Catalyst: 2 Weeks to 3 Days",
    description:
      "Facing a complex Physics concept that traditionally required 14 days to master, I used Generative AI to deconstruct and internalize it in just 72 hours. That moment made the power of AI as a force multiplier undeniable — it became the pivot point of my career.",
    theme: "blue",
  },
  {
    title: "2024 · The Strategic Pivot",
    description:
      "Shifted focus from general tech to deep AI Engineering. Began architecting Enterprise RAG pipelines, LangGraph-orchestrated agentic systems, and decision-making AI. Transitioned from using tools to building the intelligence behind them.",
    theme: "indigo",
  },
  {
    title: "2025-2026 · Lexpertz AI: The Visionary Phase",
    description:
      "The evolution is complete. Architecting SOTA agentic workflows with adversarial verification, physics-informed MLOps, and zero-hallucination RAG pipelines. Shipping open-source projects that prove AI can reason, act, and self-correct — not just generate.",
    theme: "cyan",
  },
];

export default function AboutPage() {
  const founder = team[0];
  if (!founder) return null;

  return (
    <>
      <Container className="py-16 md:py-24">
        <SlideUp className="mx-auto max-w-3xl">
          <Badge variant="outline" className="mb-4 w-fit">
            Founder & Lead AI Engineer
          </Badge>
          <h1 className="heading-page">
            Built by a physicist who makes AI systems reason, act, and
            self-correct.
          </h1>
        </SlideUp>

        <div className="mt-12">
          <ProfileCard
            name={founder.name}
            title={founder.role}
            description={founder.bio}
            imageUrl={founder.avatar}
            githubUrl={founder.socials?.github}
            twitterUrl={founder.socials?.x}
            linkedinUrl={founder.socials?.linkedin}
          />
        </div>

        <FadeIn className="mt-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {PROOF_STATS.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </FadeIn>

        <Section id="mission" className="mx-auto max-w-3xl">
          <h2 className="heading-section">Physics-Informed Intelligence</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Lexpertz exists because standard LLMs hallucinate, drift, and break
            silently in production. I bridge theoretical physics and production
            MLOps — building deterministic multi-agent LangGraph systems with
            adversarial verification, physics-informed anomaly detection, and
            enterprise RAG pipelines that cite their sources line-by-line.
          </p>

          <StaggerContainer className="mt-8 grid gap-4 md:grid-cols-3">
            {TENETS.map((tenet) => {
              const Icon = tenet.icon;
              return (
                <StaggerItem key={tenet.title}>
                  <TiltCard className="h-full">
                    <BentoCard className="h-full">
                      <div className="flex h-full flex-col gap-3">
                        <Icon
                          aria-hidden="true"
                          className="h-6 w-6 text-brand-cyan"
                        />
                        <h3 className="heading-card">{tenet.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tenet.body}
                        </p>
                      </div>
                    </BentoCard>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Section>

        <Section
          id="evolution"
          className="mx-auto w-full max-w-[1000px]"
        >
          <Badge variant="outline" className="mb-6 w-fit">
            The Evolution Journey
          </Badge>
          <h2 className="heading-section">
            From digital marketing to Physics-informed AI architecture.
          </h2>
          <ProcessSteps steps={evolutionPhases} className="mt-8" />
        </Section>
      </Container>

      <CTASection />
    </>
  );
}
