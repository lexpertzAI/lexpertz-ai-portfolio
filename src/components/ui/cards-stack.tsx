"use client";

import * as React from "react";
import { m, type HTMLMotionProps } from "framer-motion";

import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { useMediaGreaterThan } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * cards-stack — scroll-pinned card stack.
 *
 * On desktop (`md`+), cards pin at increasing `top` offsets inside a tall
 * scroll container, producing the classic stacked-fan effect. The stack is
 * pure CSS: `position: sticky` + `translateZ` under a `perspective` root —
 * no Framer layout projection (stays inside `LazyMotion strict` +
 * `domAnimation`, and avoids the projection tree entirely).
 *
 * Mobile and `prefers-reduced-motion` fall back to a static vertical stack
 * (no sticky, no transforms, no extra scroll height).
 *
 * Pitfalls guarded (see `docs/lessons-learned.md`):
 * - #2  — scroll room is a real inline `minHeight` (`vh`svh), never a class.
 * - #4  — all inline offsets are gated behind `useMediaGreaterThan("md")`.
 * - #6  — scroll height uses `svh`, stable under the mobile URL bar.
 * - #8  — reduced-motion users get a static stack.
 */

interface ContainerScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Extra scroll room in viewport heights (e.g. 400 → 400svh). Desktop only. */
  scrollHeightVh?: number;
}

const ContainerScroll = React.forwardRef<HTMLDivElement, ContainerScrollProps>(
  ({ children, className, style, scrollHeightVh, ...props }, ref) => {
    const isDesktop = useMediaGreaterThan("md");
    const reducedMotion = useReducedMotion();
    const applyScrollRoom = !reducedMotion && isDesktop && !!scrollHeightVh;

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        style={{
          perspective: "1000px",
          minHeight: applyScrollRoom ? `${scrollHeightVh}svh` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContainerScroll.displayName = "ContainerScroll";

interface CardStickyProps extends HTMLMotionProps<"div"> {
  /** Sequential card index — drives the sticky offset and depth. */
  index: number;
  /** Vertical pin offset per card in px (desktop). Default 10. */
  incrementY?: number;
  /** Depth (`translateZ`) per card in px under the 1000px perspective. Default 10. */
  incrementZ?: number;
}

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 10,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isDesktop = useMediaGreaterThan("md");
    const reducedMotion = useReducedMotion();
    const sticky = !reducedMotion && isDesktop;

    if (!sticky) {
      return (
        <m.div ref={ref} className={cn(className)} style={style} {...props}>
          {children}
        </m.div>
      );
    }

    return (
      <m.div
        ref={ref}
        style={{
          top: index * incrementY,
          // `z` is a Framer transform token → translateZ, composed with any
          // caller-supplied transforms (e.g. `rotate`) in one transform.
          z: index * incrementZ,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn("sticky", className)}
        {...props}
      >
        {children}
      </m.div>
    );
  }
);
CardSticky.displayName = "CardSticky";

export { ContainerScroll, CardSticky };
