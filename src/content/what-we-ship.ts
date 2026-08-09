/**
 * What we ship section content — the five service practices rendered as a
 * scroll-pinned card stack on the homepage. Mirrors `src/content/services.ts`
 * (same slugs/titles/summaries) plus a visual per card.
 */

export type ShippedProject = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Deliverable chips shown on the card. */
  deliverables: string[];
  imageUrl: string;
};

export const whatWeShip = {
  eyebrow: "What we ship",
  heading: "Five practices. One engineering culture.",
  description:
    "Pick a single engagement or compose them into a quarterly program — every effort ends with your team owning the system.",
  projects: [
    {
      id: "ship-enterprise-rag",
      slug: "enterprise-rag",
      title: "Enterprise RAG & AI Auditing",
      tagline: "Evidence-gated retrieval with zero-hallucination guarantees.",
      summary:
        "Multi-agent LangGraph pipelines that cross-reference documents line-by-line. Our adversarial prosecutor node forces cyclical retries if faithfulness drops below 90% — delivering 99.9% verifiable output.",
      deliverables: [
        "Hybrid retrieval (pgvector + semantic)",
        "Adversarial verification node",
        "CI regression hook",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "ship-agentic-workflows",
      slug: "agentic-workflows",
      title: "Agentic Workflows",
      tagline: "Autonomous multi-agent systems with self-correction loops.",
      summary:
        "From research agents that write and design content in under 60 seconds to structured extraction agents that parse raw text into validated JSON — LangGraph-orchestrated systems with critic-agent feedback loops.",
      deliverables: [
        "Agent orchestration + tool registry",
        "Critic-agent feedback loop",
        "Trace-based observability",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "ship-mlops-infrastructure",
      slug: "mlops-infrastructure",
      title: "MLOps & Self-Healing Infra",
      tagline: "Physics-informed monitoring that detects drift before it breaks.",
      summary:
        "Z-score thresholds (>2.5σ) for anomaly detection, automated RAG-powered root cause analysis, and containerized FastAPI microservices with lazy-loaded ML singletons — sub-second cold boots, 2.5GB container savings.",
      deliverables: [
        "Physics-informed drift detection",
        "Automated RAG investigation agent",
        "Optimized deployment topology",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "ship-ai-evaluation",
      slug: "ai-evaluation",
      title: "AI Evaluation & Testing",
      tagline: "Risk-aware automated QA that finds edge cases humans miss.",
      summary:
        "Gemini 2.5-powered test generation using Z-Score and Isolation Forest for risk prioritization. We build frameworks that evaluate chain-of-thought reasoning and validate model outputs against golden benchmarks.",
      deliverables: [
        "Risk-aware test generation",
        "Golden dataset curation",
        "Pre-deploy regression CI",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "ship-specialized-ai",
      slug: "specialized-ai",
      title: "Specialized AI Systems",
      tagline: "From deepfake detection to quant arbitrage — purpose-built AI.",
      summary:
        "Physics-informed CNNs for audio forensics, XGBoost models for prediction market arbitrage, and unbiased LLM-powered recruitment screening. Niche AI that general-purpose models can't touch.",
      deliverables: [
        "Domain-specific model architecture",
        "Training pipeline + benchmarks",
        "Production API wrapping",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ] satisfies ShippedProject[],
} as const;
