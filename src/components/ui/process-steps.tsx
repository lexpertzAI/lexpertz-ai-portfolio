"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Pin } from "lucide-react";

import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { useMediaGreaterThan } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * ProcessSteps — reusable process/steps block.
 *
 * Renders numbered, theme-tinted note cards in a desktop zigzag with an
 * animated dotted connector (mobile stacks vertically). Fully configurable:
 *
 * - `steps` — any step count; cards and the connector path are generated
 *   from the data (no hardcoded positions).
 * - `cardWidth` — resize the cards (px); the connector geometry follows.
 * - `layout` — "zigzag" (default, desktop) or "stacked" (single column).
 *
 * Renders nothing when `steps` is empty.
 */

export type StepTheme = "cyan" | "blue" | "indigo";

export interface Step {
  title: string;
  description: string;
  theme?: StepTheme;
  /** Escape hatch for fully custom card palette (overrides `theme`). */
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface ProcessStepsProps {
  steps?: Step[];
  layout?: "zigzag" | "stacked";
  /** Card width in px on desktop. Connector geometry follows. Default 280. */
  cardWidth?: number;
  className?: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    title: "Discovery & Eval Audit",
    description:
      "Day 1. We map your stack, audit existing evals (or build an emergency golden set), and write down exactly what we will ship and what we won't.",
    theme: "cyan",
  },
  {
    title: "Reference Implementation",
    description:
      "Weeks 1–3. A working reference for the chosen practice area, evaluated daily against the golden set.",
    theme: "blue",
  },
  {
    title: "Production Handoff",
    description:
      "Weeks 4–6. We pair with your engineers to land the system in production with runbooks, dashboards, and a regression CI hook.",
    theme: "indigo",
  },
  {
    title: "Open Knowledge Transfer",
    description:
      "Throughout. Every decision is documented in your wiki. We hand off ownership, then leave.",
    theme: "cyan",
  },
];

const THEMES: Record<
  StepTheme,
  { inner: string; icon: string; number: string }
> = {
  cyan: {
    inner: "border-brand-cyan/25 bg-brand-cyan/10",
    icon: "text-brand-cyan",
    number: "text-brand-cyan",
  },
  blue: {
    inner: "border-brand-blue/25 bg-brand-blue/10",
    icon: "text-brand-blue",
    number: "text-brand-blue",
  },
  indigo: {
    inner: "border-indigo-400/25 bg-indigo-500/10 dark:bg-indigo-500/10",
    icon: "text-indigo-500 dark:text-indigo-400",
    number: "text-indigo-500 dark:text-indigo-400",
  },
};

/** Vertical stride per card row; generous enough to avoid same-side overlap. */
const ROW_HEIGHT = 280;
/** Nominal card height used for connector geometry (content may vary). */
const CARD_HEIGHT = 300;

function buildZigzag(count: number, cardWidth: number) {
  const containerWidth = 1000;
  const leftX = cardWidth / 2;
  const rightX = containerWidth - cardWidth / 2;

  const centers = Array.from({ length: count }, (_, i) => ({
    x: i % 2 === 0 ? leftX : rightX,
    y: i * ROW_HEIGHT + CARD_HEIGHT / 2,
  }));

  let d = "";
  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i];
    const b = centers[i + 1];
    const midY = (a.y + b.y) / 2;
    if (i === 0) d = `M ${a.x} ${a.y}`;
    d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
  }

  return {
    height: (count - 1) * ROW_HEIGHT + CARD_HEIGHT,
    d,
  };
}

export function ProcessSteps({
  steps,
  layout = "zigzag",
  cardWidth = 280,
  className,
}: ProcessStepsProps) {
  const reducedMotion = useReducedMotion();
  const data = steps && steps.length > 0 ? steps : DEFAULT_STEPS;
  const isZigzag = layout === "zigzag";
  // SSR-safe: false on server + first client paint, flips to true on desktop
  // after mount. Keeps the mobile stacked layout intact on phones.
  const isDesktop = useMediaGreaterThan("md");
  const applyZigzag = isZigzag && isDesktop;

  const { height, d } = React.useMemo(
    () => (isZigzag ? buildZigzag(data.length, cardWidth) : { height: 0, d: "" }),
    [isZigzag, data.length, cardWidth]
  );

  if (data.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      {/* Paper-rule texture (desktop ambiance only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.08] dark:opacity-[0.15] md:block"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
          backgroundSize: "100% 32px",
          marginTop: "4px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-0 dark:opacity-[0.1] md:block"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "100% 32px",
          marginTop: "4px",
        }}
      />

      {/* Edge fades into the page background (desktop only) */}
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r md:block"
      />
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l md:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1000px]">
        <div
          className={cn(
            "relative mx-auto flex w-full max-w-[1000px] flex-col space-y-8 md:space-y-0",
            isZigzag ? "md:block" : "md:flex md:flex-col md:space-y-8"
          )}
          style={applyZigzag ? { height: `${height + 32}px` } : undefined}
        >
          {isZigzag && data.length > 1 ? (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full md:block"
              viewBox={`0 0 1000 ${height}`}
              preserveAspectRatio="none"
            >
              <m.path
                d={d}
                stroke="currentColor"
                className="text-brand-cyan/40 dark:text-brand-cyan/30"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ strokeDashoffset: 0 }}
                animate={reducedMotion ? undefined : { strokeDashoffset: -140 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </svg>
          ) : null}

          {data.map((step, index) => {
            const theme = THEMES[step.theme ?? "cyan"];
            const rotate = isZigzag
              ? index % 2 === 0
                ? "md:rotate-3"
                : "md:-rotate-3"
              : "";
            const side = isZigzag
              ? index % 2 === 0
                ? "md:left-0"
                : "md:right-0"
              : "";

            return (
              <div
                key={step.title}
                className={cn(
                  "relative w-full transition-transform duration-300",
                  "[@media(hover:hover)]:hover:z-30 [@media(hover:hover)]:hover:scale-105",
                  isZigzag && "md:absolute md:w-[280px]",
                  rotate,
                  side
                )}
                style={
                  applyZigzag
                    ? ({ top: index * ROW_HEIGHT, width: cardWidth } as React.CSSProperties)
                    : undefined
                }
              >
                <div className="rounded-[25px] border border-border bg-card p-2 shadow-[0_10px_20px_0px_hsl(var(--foreground)/0.08)]">
                  <Pin
                    aria-hidden="true"
                    className={cn(
                      "mx-auto mb-6 h-8 w-8",
                      step.colors?.text ?? theme.icon
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px]",
                      step.colors?.bg ?? theme.inner,
                      step.colors?.border ?? "border-transparent"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mb-5 font-display text-4xl font-bold leading-none",
                        step.colors?.text ?? theme.number
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="heading-card mb-2.5">{step.title}</h3>
                    <p className="text-sm leading-5 tracking-tight text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
