/**
 * Process section content — the "How we work" steps powering the homepage
 * process block. Swap these out per call site; the reusable `ProcessSteps`
 * component renders whatever shape this data takes.
 */

export type ProcessStep = {
  title: string;
  description: string;
  theme?: "cyan" | "blue" | "indigo";
};

export const process = {
  eyebrow: "How we work",
  heading: "From discovery to handoff, in four phases.",
  steps: [
    {
      title: "Discovery & Eval Audit",
      description:
        "Day 1. We map your stack, audit existing evals (or build an emergency golden set), and write down exactly what we will ship and what we won't.",
      theme: "cyan",
    },
    {
      title: "Reference Implementation",
      description:
        "Weeks 1–3. A working reference for the chosen practice area — RAG, eval harness, agent scaffold, MLOps topology, or strategic roadmap. Evaluated daily against the golden set.",
      theme: "blue",
    },
    {
      title: "Production Handoff",
      description:
        "Weeks 4–6. We pair with your engineers to land the system in production with on-call runbooks, dashboards, and a regression CI hook.",
      theme: "indigo",
    },
    {
      title: "Open Knowledge Transfer",
      description:
        "Throughout. Every decision is documented in your wiki. We hand off ownership, then leave.",
      theme: "cyan",
    },
  ] satisfies ProcessStep[],
} as const;
