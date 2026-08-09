/**
 * Engineered Intelligence section content — proof metrics rendered as a
 * scroll-pinned, rotated stat-card stack on the homepage. Mirrors the hero's
 * artifacts (p95 latency, source verification) so the section reads as the
 * hero's evidence bar.
 *
 * `theme` maps to brand-tinted card surfaces in the section component
 * (cyan / blue / indigo / success) — never raw hex.
 */

export type IntelligenceTheme = "cyan" | "blue" | "indigo" | "success";

export type IntelligenceStat = {
  id: string;
  value: string;
  label: string;
  /** Brand theme — drives the card bg/border/text tint. */
  theme: IntelligenceTheme;
  /** Lucide icon name, rendered at reduced opacity on the card. */
  icon: "Zap" | "FileText" | "Boxes" | "ShieldCheck";
};

export const engineeredIntelligence = {
  eyebrow: "Engineered Intelligence",
  heading: "Proof over promises.",
  highlight:
    "Every system we ship is scored the way your stakeholders will audit it — retrieval latency, source fidelity, and uptime. The numbers behind the hero.",
  stats: [
    {
      id: "stat-latency",
      value: "0.9s",
      label: "p95 Retrieval Latency",
      theme: "cyan",
      icon: "Zap",
    },
    {
      id: "stat-sources",
      value: "4",
      label: "Sources Cited per Answer",
      theme: "blue",
      icon: "FileText",
    },
    {
      id: "stat-pipelines",
      value: "250+",
      label: "RAG Pipelines in Production",
      theme: "indigo",
      icon: "Boxes",
    },
    {
      id: "stat-uptime",
      value: "99.9%",
      label: "Uptime Guarantee",
      theme: "success",
      icon: "ShieldCheck",
    },
  ] satisfies IntelligenceStat[],
} as const;
