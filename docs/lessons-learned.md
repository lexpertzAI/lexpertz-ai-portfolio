# Lessons Learned — Bug Classes & Patterns

Field notes from bugs that shipped to `main` in the 2026 homepage refresh.
Each entry: symptom → root cause → fix. Read this before touching scroll
animations, absolute positioning, or breakpoint logic. The responsive rules
they encode are enforced in `AGENTS.md` → *Responsive Requirements*.

---

## 1. GSAP pin-spacer clipped by a fixed-height section (hero)

**Symptom:** the pinned hero stayed fixed in the background while the rest of
the site scrolled over it — the pin never released.

**Root cause:** the hero `<section>` was `h-screen overflow-hidden`.
ScrollTrigger inserts a pin-spacer (element height + scroll distance) into the
document; a fixed-height, clipping ancestor swallows that spacer, the page
never grows, and the pin's end position can never be reached.

**Fix:** the section wrapper stays plain `relative` (auto height) with
`-mt-16` to pull over the layout's `pt-16`; the **pinned element itself**
owns the viewport height (`h-svh`). Never put `h-screen`/`overflow-hidden`
on the ancestor of a `ScrollTrigger.pin` trigger.

**Where:** `src/components/ui/cinematic-hero.tsx` · `sections/hero-cinematic.tsx`.

---

## 2. Unused CSS custom property collapses an absolute layout (process zigzag)

**Symptom:** absolutely-positioned zigzag cards painted over the next section.

**Root cause:** the container got `style={{ "--md-height": "1140px" }}` — a
custom property with **no rule consuming it** (`height: var(--md-height)` was
never written). With all children `absolute`, the container collapsed to ~0
and the cards overflowed into the following section. Build, lint, and SSR-curl
all passed — the markup looked correct.

**Fix:** when absolutely-positioned children carry explicit `top` values, the
parent must get a **real height**: inline `style={{ height }}` or
`md:h-[...]`. Never rely on a bare custom property.

**Where:** `src/components/ui/process-steps.tsx`.

---

## 3. One-time `isMobile` at mount goes stale (hero)

**Symptom:** desktop/mobile scroll distances and pullback sizes were computed
from `window.innerWidth` once at mount — wrong after rotate/resize.

**Fix:** use `gsap.matchMedia()` for GSAP timelines (separate desktop/mobile
contexts, re-evaluated on breakpoint change, `prefers-reduced-motion` folded
into the queries) and `useMediaGreaterThan("md")` for React state.

**Where:** `src/components/ui/cinematic-hero.tsx` (timeline) ·
`src/components/ui/process-steps.tsx` (layout gating).

---

## 4. Inline positioning styles leak onto mobile (process cards)

**Symptom:** mobile cards rendered 280px wide instead of full-width.

**Root cause:** the zigzag card style `style={{ width: cardWidth, top: ... }}`
was applied unconditionally; the `md:` classes gated visibility but the inline
styles ran at every breakpoint.

**Fix:** gate inline sizing/positioning styles behind
`useMediaGreaterThan("md")`. It is SSR-safe (`getServerSnapshot: () => false`)
— server and first client paint agree on the mobile layout, then desktop
flips after mount (one brief, accepted reflow).

**Where:** `src/components/ui/process-steps.tsx`.

---

## 5. Hover states stick on touch

**Symptom:** `hover:scale-105` / `hover:z-30` fired on tap and stayed stuck on
mobile.

**Fix:** gate hover-dependent UI with `[@media(hover:hover)]:` prefixes —
`[@media(hover:hover)]:hover:scale-105`. CSS-only approach; no JS detection.

**Where:** `src/components/ui/process-steps.tsx` (cards).

---

## 6. `vh` shifts under the mobile URL bar

**Symptom:** above-the-fold/pinned heights jump when the browser URL bar
collapses/expands.

**Fix:** use `svh` (small viewport height) for above-the-fold and pinned
elements (`h-svh` — Tailwind 3.4+). Desktop `svh === vh`, so it's safe
everywhere.

**Where:** `src/components/ui/cinematic-hero.tsx` (pinned root).

---

## 7. SSR verification is a layout blind spot

**Observation:** both overlap bugs (#1 and #2) passed `npm run build`, `npm
run lint`, and SSR curl checks — SSR proves markup, never layout.

**Fix:** every visual change must be checked in a real browser at **~375px and
≥1280px** before done (the mandatory two-breakpoint check). Use the device
toolbar; scroll through the section and confirm the next section follows.

---

## 8. Reduced-motion gating is per-engine

**Gotcha:** the global CSS kill-switch (globals.css) only disables CSS
animations/transitions. JS-driven motion — GSAP tweens, framer `animate` —
is unaffected and must be gated explicitly:

- GSAP: fold `prefers-reduced-motion: no-preference` into the
  `gsap.matchMedia()` query (no timeline at all for reduced-motion users).
- Framer/React: `useReducedMotion()` from
  `src/components/three/use-reduced-motion.ts`.
- The cinematic hero renders a static poster (`StaticCinematicHero`) instead.

---

## 9. Misnamed asset formats

**Gotcha:** `public/logo-full.png` is actually a JPEG payload. `next/image`
serves it fine (sharp sniffs content → `image/jpeg`), but it can confuse tooling
and future replacements. Re-export as a real PNG when the logo is ever updated.

**Where:** `src/components/layout/footer.tsx` (footer display logo).
