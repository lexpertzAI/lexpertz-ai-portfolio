# Design Concepts — Progress Tracker

Tracks the component concepts dropped into this codebase and the ones
queued for modernization. The goal: every section and primitive on the site
meets the quality bar set by the hero and featured-stats section (distinctive
visual identity, semantic tokens, layered motion, clean composition).

**Status legend**

- ✅ **Shipped** — merged to `main` and live on the site.
- 🔲 **Pending** — concept agreed, not yet implemented.
- 📋 **Proposed** — idea documented, awaiting review.
- ❌ **Dropped** — considered and intentionally skipped.

---

## Shipped

### 1. Cinematic Hero ✅

| | |
|---|---|
| Concept | Replace the WebGL particle hero and the scroll-morph flip-card hero with a GSAP ScrollTrigger pin scene. |
| Behavior | `CinematicHero` renders a scroll-pinned `h-svh` scene with brand-material content; desktop/mobile branching via `gsap.matchMedia()`; `-mt-16` on the section pulls over the layout `pt-16`. |
| Content | Badge, headline, copy, CTAs, card heading — same messaging as predecessor. |
| Fallback | `prefers-reduced-motion` → static poster (`StaticCinematicHero`) with full content and `cinematic-hero` material styles (film-grain, bg-grid-theme, 3D matte text, btn-tactile utilities). |
| Files | `src/components/ui/cinematic-hero.tsx` · `src/components/sections/hero-cinematic.tsx` |
| Commit | current |

### 2. Featured Stats Section ✅

| | |
|---|---|
| Concept | Replace the removed placeholder `StatsBar` with a headline stats strip + growth chart. |
| Behavior | `Section variant="muted"` after the hero; staggered metric grid + brand-gradient recharts area chart that fades in; custom token-styled tooltip. |
| Content | Headline, 4 metrics, 7-month growth series (`src/content/featured-stats.ts`). |
| Files | `src/components/ui/growth-chart.tsx` · `src/components/sections/featured-stats-section.tsx` · `src/content/featured-stats.ts` |
| Commit | `80ee2f8` |

### 3. Cards-Stack Scroll Sections ✅

| | |
|---|---|
| Concept | Replace the flat bento grid ("What we ship") and stats strip ("Engineered Intelligence") with a scroll-pinned sticky card stack — the cards-stack pattern from the design concept. |
| Behavior | Desktop: cards pin at growing `top` offsets and recede in depth (`translateZ` under a 1000px `perspective`). Mobile + reduced-motion: static vertical stack. Pure CSS sticky — no Framer layout projection, stays inside `LazyMotion strict` + `domAnimation`. |
| Content | `src/content/what-we-ship.ts` (5 service cards, each linking to its spec page) · `src/content/engineered-intelligence.ts` (4 brand-tinted stat cards). |
| Files | `src/components/ui/cards-stack.tsx` (primitive) · `src/components/sections/what-we-ship-section.tsx` · `src/components/sections/engineered-intelligence-section.tsx` |
| Notes | Lessons applied: real inline `minHeight` in `svh` (#2/#6), inline offsets gated behind `useMediaGreaterThan("md")` (#4), `useReducedMotion` static fallback (#8). Rotation on stat cards is desktop-only. |
| Commit | current |

---

## Pending

### 4. ServicesGrid — Signature Card Interaction ❌ Dropped (superseded)

**Why:** the bento grid was replaced by the cards-stack "What we ship" section
(entry #3) — five scroll-pinned service cards, each linking to its spec page.
The old `services-grid.tsx` / `featured-stats-section.tsx` were moved to
`src/components/.old/`; the `GrowthChart` primitive and
`src/content/featured-stats.ts` (its `ChartPoint` type source) remain live for
detail pages.

~~### 5. ProcessTimeline — Living Pipeline~~ ❌ Dropped (superseded)

The old `process-timeline.tsx` was replaced by a server component
`process-section.tsx` wrapping the reusable `ProcessSteps` primitive
(`ui/process-steps.tsx`). Shipped as part of the homepage refresh.

**Key implementation notes:**
- Steps are driven by `src/content/process.ts` (brand themes: cyan/blue/indigo).
- `useMediaGreaterThan("md")` gates the zigzag card layout; hover states
  are gated to `@media(hover:hover)`.
- The zigzag container height is set via inline `style={{ height }}` so
  absolutely-positioned card children don't collapse. **Pitfall:** an
  unused `--md-height` custom property previously caused the container to
  collapse and cards to overlap the next section — always pass a real
  pixel/`svh` value to the height prop.
### 6. TeamSection — Founder Anchor 🔲

**Why:** single `SlideUp` only; the founder is the brand anchor.

**Concept:** interactive expertise tags (physics, ML, quant) + scroll-reveal
bio chunks or a radial skill chart echoing the growth-chart aesthetic.

**New primitive:** `RadialProgress` (ui).

### 7. InsightsPreview — Case-Study Cards 🔲

**Why:** flat `glow-border` cards; read as generic blog tiles.

**Concept:** hover reveals a "problem → approach → result" triple; category
color coding; optional reading-progress ring.

### 8. CTASection — Entrance Choreography 🔲

**Why:** uses the hero gradient but has no scroll-triggered entrance.

**Concept:** materialize on scroll (opacity + scale + gradient sweep) synced
with the hero's scroll-release handoff.

### 9. ContactForm — Interaction Polish 🔲

**Why:** functional but static.

**Concept:** focus spring on inputs (brand-cyan ring), submit success burst,
field-level motion using existing motion tokens.

---

## Proposed

- **`ScrollReveal` (ui)** — consolidated `whileInView` + spring + stagger
  config to replace ad-hoc `FadeIn`/`SlideUp`/`Stagger` usage.
- **`MetricSparkline` (ui)** — tiny `GrowthChart` variant (no tooltip, fixed
  height) for inline KPIs on case-study detail pages and process phases.

---

## Roadmap

| # | Concept | Priority | Status |
|---|---------|----------|--------|
| 1 | Cinematic Hero | — | ✅ Shipped |
| 2 | Featured Stats Section | — | ✅ Shipped |
| 3 | Cards-Stack scroll sections | Tier 1 | ✅ Shipped |
| 4 | ProcessSteps (replaces ProcessTimeline) | — | ✅ Shipped |
| 5 | TeamSection founder anchor | Tier 2 | 🔲 Pending |
| 6 | InsightsPreview case cards | Tier 2 | 🔲 Pending |
| 7 | CTASection entrance | Tier 2 | 🔲 Pending |
| 8 | ContactForm polish | Tier 3 | 🔲 Pending |

**How to add a concept:** append a numbered entry to its status section
(pick ✅ / 🔲 / 📋 / ❌), fill the "Concept / Behavior / Files" table, and add
a row to the Roadmap. Keep this file in sync when a PR ships — update status
to ✅ with the commit hash.
