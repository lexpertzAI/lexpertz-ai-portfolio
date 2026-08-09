"use client";

import { LazyMotion, domMax } from "framer-motion";
import type { ReactNode } from "react";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Wraps the app in Framer Motion's `LazyMotion` (strict mode) loaded with the
 * `domMax` feature bundle. This enables layout projection (needed by the
 * cards-stack `layout="position"` primitives) plus animations, gestures, and
 * drag — at a modest bundle cost over `domAnimation`.
 *
 * Components under this provider MUST use `<m.div>` (not `<motion.div>`) to
 * stay within the strict bundle.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion strict features={domMax}>
      {children}
    </LazyMotion>
  );
}
