"use client";

import * as React from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";

import { useMediaGreaterThan } from "@/lib/hooks/use-media";
import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedRoadmap — scroll-drawn milestone map.
 *
 * Desktop (`md+`): a map backdrop (next/image) with a route line whose visible
 * length follows scroll progress, plus absolutely-positioned milestone
 * markers. Mobile: a clean vertical rail of dot + label rows (map and path
 * hidden), so nothing leaks outside a real container height.
 *
 * Reduced motion: the route renders fully drawn and entrances are skipped.
 */

export type MilestoneStatus = "complete" | "in-progress" | "pending";

export interface Milestone {
  id: number;
  name: string;
  status: MilestoneStatus;
  /** Desktop-only anchor on the map (percentages). Ignored below `md`. */
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

export interface AnimatedRoadmapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  milestones: Milestone[];
  /** Map backdrop rendered with `next/image` (whitelisted host). */
  mapImageSrc: string;
}

const ROUTE_PATH = "M 50 350 Q 200 50 400 200 T 750 100";

const statusDotClasses: Record<MilestoneStatus, string> = {
  complete: "bg-success border-success/50",
  "in-progress": "bg-brand-blue border-brand-blue/50 animate-pulse",
  pending: "bg-muted border-border",
};

function MilestoneMarker({
  milestone,
  isDesktop,
  reduceMotion,
}: {
  milestone: Milestone;
  isDesktop: boolean;
  reduceMotion: boolean;
}) {
  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: milestone.id * 0.15, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.8 }}
      className="flex items-center justify-center gap-4 md:absolute md:justify-start"
      style={isDesktop ? milestone.position : undefined}
    >
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        <div
          className={cn(
            "absolute h-3 w-3 rounded-full border-2",
            statusDotClasses[milestone.status]
          )}
        />
        <div className="absolute h-full w-full rounded-full bg-primary/10" />
      </div>
      <div className="rounded-full border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm">
        {milestone.name}
      </div>
    </m.div>
  );
}

const AnimatedRoadmap = React.forwardRef<HTMLDivElement, AnimatedRoadmapProps>(
  ({ className, milestones, mapImageSrc, ...props }, ref) => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const isDesktop = useMediaGreaterThan("md");
    const reduceMotion = useReducedMotion();

    const setTargetRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        targetRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });
    const pathLength = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);

    return (
      <div
        ref={setTargetRef}
        className={cn("relative mx-auto w-full max-w-4xl py-8 md:py-12", className)}
        {...props}
      >
        {/* Map backdrop — desktop only (decorative) */}
        <m.div
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute inset-0 top-10 hidden md:block"
          aria-hidden
        >
          <Image
            src={mapImageSrc}
            alt=""
            fill
            sizes="(min-width: 768px) 896px, 100vw"
            className="object-contain"
          />
        </m.div>

        <div className="flex flex-col gap-6 md:relative md:block md:h-[400px]">
          {/* Route line — desktop only */}
          <svg
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 hidden h-full w-full md:block"
            aria-hidden
          >
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <m.path
              d={ROUTE_PATH}
              fill="none"
              stroke="hsl(var(--brand-cyan))"
              strokeWidth="3"
              strokeDasharray="10 5"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : pathLength }}
            />
          </svg>

          {milestones.map((milestone) => (
            <MilestoneMarker
              key={milestone.id}
              milestone={milestone}
              isDesktop={isDesktop}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    );
  }
);
AnimatedRoadmap.displayName = "AnimatedRoadmap";

export { AnimatedRoadmap };
