"use client";

import { Check } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { services } from "@/content/services";

/**
 * ServicesGrid — "What we ship" block, styled on the dropped cards-stack
 * concept (Work panel): dark indigo card stack that pins on scroll.
 *
 * Laptop layout is two-block (the concept's Process pattern): the section
 * headline sticks on the left while the cards scroll on the right. Each card
 * carries the full existing service content (title, duration, tagline,
 * summary, deliverables) plus a slim spec-card SVG strip. Cards are spaced
 * so each stays readable before the next pins over it.
 */
export function ServicesGrid() {
  return (
    <Section id="services" className="bg-slate-900 text-stone-50">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:gap-8 xl:gap-12">
          <div className="md:sticky md:top-16 md:flex md:h-[calc(100svh-4rem)] md:flex-col md:justify-center">
            <h5 className="text-xs uppercase tracking-wide text-indigo-400">
              What we ship
            </h5>
            <h2 className="mb-4 mt-1 text-4xl font-bold tracking-tight">
              <span className="text-indigo-500">Five practices.</span> One
              engineering culture.
            </h2>
            <p className="max-w-prose text-sm text-muted-foreground/80">
              Pick a single engagement or compose them into a quarterly program —
              every effort ends with your team owning the system.
            </p>
          </div>

          <ContainerScroll className="min-h-[450vh] space-y-[40vh] py-12 md:min-h-[550vh] md:space-y-[65vh]">
            {services.map((service, index) => (
              <CardSticky
                key={service.slug}
                index={index}
                incrementY={60}
                incrementZ={5}
                className="w-full overflow-hidden rounded-sm border border-x-indigo-900 border-y-indigo-500 bg-indigo-950"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 pt-5 sm:px-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-indigo-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold tracking-tighter sm:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wide text-cyan-400">
                    ~{service.durationWeeks ?? 6} weeks
                  </span>
                </div>

                <p className="px-5 pt-3 text-sm font-medium text-indigo-200/90 sm:px-6">
                  {service.tagline}
                </p>

                <p className="px-5 pt-2 text-sm leading-6 text-stone-300/90 sm:px-6">
                  {service.summary}
                </p>

                <ul className="flex flex-col gap-2 px-5 pt-4 sm:px-6">
                  {service.deliverables?.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                      />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5">
                  <SpecCardStrip service={service} index={index} />
                </div>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </Container>
    </Section>
  );
}

type SpecCardStripProps = {
  service: (typeof services)[number];
  index: number;
};

/**
 * SpecCardStrip — slim decorative spec-card graphic in the concept's indigo
 * palette. Purely visual (aria-hidden); all readable content lives in the
 * card's HTML above it.
 */
function SpecCardStrip({ service, index }: SpecCardStripProps) {
  const num = String(index + 1).padStart(2, "0");
  const uid = service.slug;

  return (
    <svg
      viewBox="0 0 800 150"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`strip-border-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id={`strip-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <pattern
          id={`strip-dots-${uid}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="#4338ca" opacity="0.35" />
        </pattern>
      </defs>

      {/* Backdrop panel */}
      <rect
        x="8"
        y="8"
        width="784"
        height="134"
        rx="16"
        fill="#1e1b4b"
        stroke="#3730a3"
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="8"
        width="784"
        height="134"
        rx="16"
        fill={`url(#strip-dots-${uid})`}
      />

      {/* Ghost index */}
      <text
        x="760"
        y="104"
        textAnchor="end"
        className="font-mono"
        fontSize="80"
        fontWeight="700"
        fill="#6366f1"
        opacity="0.14"
      >
        {num}
      </text>

      {/* Spec card */}
      <rect
        x="150"
        y="16"
        width="500"
        height="118"
        rx="14"
        fill={`url(#strip-fill-${uid})`}
        stroke={`url(#strip-border-${uid})`}
        strokeWidth="2"
      />

      {/* Corner ticks */}
      <path
        d="M150 16 L150 40 M150 16 L174 16"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M650 16 L650 40 M626 16 L650 16"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M150 134 L150 110 M150 134 L174 134"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M650 134 L650 110 M626 134 L650 134"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Code bars */}
      <rect x="178" y="36" width="96" height="8" rx="4" fill="#22d3ee" opacity="0.85" />
      <rect x="178" y="56" width="250" height="10" rx="5" fill="#e0e7ff" opacity="0.9" />
      <rect x="178" y="78" width="210" height="8" rx="4" fill="#a5b4fc" opacity="0.6" />
      <rect x="178" y="98" width="150" height="8" rx="4" fill="#a5b4fc" opacity="0.35" />

      {/* Verified check */}
      <circle
        cx="612"
        cy="75"
        r="20"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        d="m604 75 5 5 10-11"
        stroke="#22d3ee"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
