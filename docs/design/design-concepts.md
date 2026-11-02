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

|          |                                                                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Concept  | Replace the WebGL particle hero and the scroll-morph flip-card hero with a GSAP ScrollTrigger pin scene.                                                                                    |
| Behavior | `CinematicHero` renders a scroll-pinned `h-svh` scene with brand-material content; desktop/mobile branching via `gsap.matchMedia()`; `-mt-16` on the section pulls over the layout `pt-16`. |
| Content  | Badge, headline, copy, CTAs, card heading — same messaging as predecessor.                                                                                                                  |
| Fallback | `prefers-reduced-motion` → static poster (`StaticCinematicHero`) with full content and `cinematic-hero` material styles (film-grain, bg-grid-theme, 3D matte text, btn-tactile utilities).  |
| Files    | `src/components/ui/cinematic-hero.tsx` · `src/components/sections/hero-cinematic.tsx`                                                                                                       |
| Commit   | current                                                                                                                                                                                     |

### 2. Featured Stats Section ✅

|          |                                                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Concept  | Replace the removed placeholder `StatsBar` with a headline stats strip + growth chart.                                                           |
| Behavior | `Section variant="muted"` after the hero; staggered metric grid + brand-gradient recharts area chart that fades in; custom token-styled tooltip. |
| Content  | Headline, 4 metrics, 7-month growth series (`src/content/featured-stats.ts`).                                                                    |
| Files    | `src/components/ui/growth-chart.tsx` · `src/components/sections/featured-stats-section.tsx` · `src/content/featured-stats.ts`                    |
| Commit   | `80ee2f8`                                                                                                                                        |

---

## Pending

### 3. ServicesGrid — Cards-Stack Concept ✅

**Why:** the flat `BentoCard` + `TiltCard` grid read as generic tiles. The
dropped cards-stack concept (Work panel) was applied verbatim: a scroll-pinned
indigo card stack with title + deliverable chips. No photos — each card renders
a spec-card SVG built from the service content (title, tagline, deliverables,
duration) in the concept's palette.

**Implementation notes:**

- Primitive is the dropped code as-is (`motion.div` → `m.div` for LazyMotion
  strict; `layout="position"` requires `domMax`, so `MotionProvider` now loads
  `domMax` instead of `domAnimation`).
- Laptop layout is two-block (the concept's Process pattern): sticky headline
  column on the left (`md:sticky md:top-16 md:h-[calc(100svh-4rem)]`), card
  stack scrolling on the right. Mobile is a single column.
- Cards carry the full service content (title, duration, tagline, summary,
  deliverables check-list) plus a slim decorative spec-card SVG strip.
- Cards are `position: sticky` at every breakpoint (concept behavior) with
  `top: index * 60` and `translateZ(index * 5)` under the 1000px perspective;
  `space-y-[40vh] md:space-y-[65vh]` keeps each card readable before the next
  pins over it.
- The featured-stats section (statbar) is untouched and remains on the homepage.

**Files:** `src/components/ui/cards-stack.tsx` ·
`src/components/sections/services-grid.tsx`

~~### 4. ProcessTimeline — Living Pipeline~~ ❌ Dropped (superseded)

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

### 5. TeamSection — Founder Anchor ✅

|          |                                                                                                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Concept  | Replace the single `SlideUp` founder grid with the dropped `ProfileCard` concept: overlapping photo + info card on desktop, stacked centered card on mobile, circular social icon row.                                   |
| Behavior | `ProfileCard` (ui) driven by `team[0]` content (name, role, bio, `/founder.jpg`, socials — X maps to the Twitter icon; missing socials are filtered out). Keeps the "Read the full story →" `/about` CTA below the card. |
| Notes    | `motion.div` → `m.div` for LazyMotion strict (domMax); `plus.unsplash.com` added to `next.config.mjs` remotePatterns for the primitive's default image.                                                                  |
| Files    | `src/components/ui/profile-card.tsx` · `src/components/sections/team-section.tsx`                                                                                                                                        |
| Commit   | current                                                                                                                                                                                                                  |

### 6. InsightsPreview — Dispatch Ledger ✅

**Why:** flat `glow-border` cards; read as generic blog tiles.

**Concept:** one lead story, one index rail. The newest post becomes an
8-column featured card with its full 1200×630 cover, byline, reading time, and a
single brand CTA. The next two posts stack in a 4-column rail as compact cards
with mono order labels (`02`, `03`) and no image, so the lead story keeps the
only focal point. The section header closes on a hairline with an "All insights"
link.

**Implementation notes:**

- `BlogPostCard` (ui) is an adaptation of `card-18`: `motion.div` hover replaced
  with CSS (`[@media(hover:hover)]`) so the global reduced-motion kill-switch
  applies; the whole card is one `next/link` (the original nested an overlay
  anchor around a `Button`, which produced competing interactive targets).
- Covers are designed 1200×630 posters, so the featured variant puts the image
  full-width above the content. A center crop in a side-by-side panel cut the
  artwork's own headline.
- Dates are formatted by splitting the ISO string, not `Intl`/`new Date()`,
  keeping server and client renders identical in every timezone.
- `Badge` gained a `brand-outline` variant (cyan on dark, brand-blue on light)
  for the category chip.
- Data maps from `InsightSurface`; `readingTimeMinutes` and `author` are
  optional on the primitive.
- The `media` variant carries the same card to the `/insights` index: cover art
  plus compact type in a 1/2/3-column grid, numbered `01`–`05`.

**Files:** `src/components/ui/blog-post-card.tsx` ·
`src/components/sections/insights-preview.tsx` ·
`src/app/(marketing)/insights/page.tsx` · `src/components/ui/badge.tsx`

### 7. CTASection — Roadmap CTA ✅

**Why:** the old CTA reused the hero gradient but had no scroll-triggered
entrance or distinctive visual. Concept #7 (entrance choreography) shipped as
a full redesign: brand copy + CTAs on top, `AnimatedRoadmap` below — a map
backdrop with a scroll-drawn route line and staggered milestone markers.

**Implementation notes:**

- `AnimatedRoadmap` (ui) is a generic primitive: `milestones` + `mapImageSrc`
  props, driven from `src/content/roadmap.ts` (mirrors the process phases with
  editorial statuses). Exported from the ui barrel.
- Desktop (`md+`): scroll-linked `pathLength` route draw (`useScroll` +
  `useTransform`), map + markers absolutely positioned inside
  `md:h-[400px]` (contained — no paint leak). Mobile: vertical milestone rail,
  map/path hidden (`hidden md:block`).
- `m.div`/`m.path` under LazyMotion strict (domMax). `useReducedMotion`
  (repo hook) draws the route fully and skips entrances; the `animate-pulse`
  on the in-progress dot is killed by the global reduced-motion block.
- Status dots use repo tokens: `success` (complete), `brand-blue`
  (in-progress), `muted`/`border` (pending). Map is `next/image` from
  `images.unsplash.com` (already whitelisted — no config change).
- Headline + CTAs get a staggered entrance via `StaggerContainer`/`StaggerItem`
  (reuse); both CTAs keep `trackCTA`.

**Files:** `src/components/ui/animated-roadmap.tsx` ·
`src/components/sections/cta-section.tsx` · `src/content/roadmap.ts`

### 8. ContactForm — Interaction Polish 🔲

**Why:** functional but static.

**Concept:** focus spring on inputs (brand-cyan ring), submit success burst,
field-level motion using existing motion tokens.

### 9. Footer — Dual-Card Footer Dock ✅

**Why:** the old footer was a flat three-column strip. Replaced with the
dropped `footer-section-4` concept: two rounded cards — a solid brand-blue card
(left) and a light link/newsletter card (right).

**Implementation notes:**

- Brand card (`bg-brand-blue`, film-grain noise overlay at 12% multiply,
  `rounded-2xl` overflow-hidden): logo in a white chip + wordmark up top;
  brand line, `SocialCloud` (company socials), and © below.
- Light card (`bg-card` + `border-border`): `footerColumns` real-link grid
  (`grid-cols-2 md:grid-cols-3`) driven from `src/lib/constants.ts`; bottom
  block hosts the official Substack signup iframe (`siteConfig.newsletterEmbedUrl`,
  `max-w-[480px]`, taller on mobile `h-[380px]` so the stacked widget doesn't clip).
- `SocialCloud` (ui) is a new generic primitive: color-agnostic circular chips
  (`text-current` icons on `border-current/25 bg-current/10`), caller tints via
  `className`; missing links filtered. Exported from the ui barrel.
- Concept adapted: `motion/react` → framer-motion strict `m.*` via
  `StaggerContainer`/`StaggerItem` reuse; Tailwind v4 syntax → repo tokens;
  hardcoded demo links → real routes; `min-h` tuned (560px desktop) to stay a
  footer, not a section.
- Company socials and Substack URL live in `src/lib/constants.ts` (no URLs in
  components). GitHub org page used — the provided `settings/profile` URL is a
  private page, not public.

**Files:** `src/components/layout/footer.tsx` ·
`src/components/ui/social-cloud.tsx` · `src/lib/constants.ts`

---

## Proposed

- **`ScrollReveal` (ui)** — consolidated `whileInView` + spring + stagger
  config to replace ad-hoc `FadeIn`/`SlideUp`/`Stagger` usage.
- **`MetricSparkline` (ui)** — tiny `GrowthChart` variant (no tooltip, fixed
  height) for inline KPIs on case-study detail pages and process phases.

---

## Roadmap

| #   | Concept                                 | Priority | Status     |
| --- | --------------------------------------- | -------- | ---------- |
| 1   | Cinematic Hero                          | —        | ✅ Shipped |
| 2   | Featured Stats Section                  | —        | ✅ Shipped |
| 3   | ServicesGrid card interaction           | Tier 1   | ✅ Shipped |
| 4   | ProcessSteps (replaces ProcessTimeline) | —        | ✅ Shipped |
| 5   | TeamSection founder anchor              | Tier 2   | ✅ Shipped |
| 6   | InsightsPreview dispatch ledger          | Tier 2   | ✅ Shipped |
| 7   | CTASection roadmap CTA                  | Tier 2   | ✅ Shipped |
| 8   | ContactForm polish                      | Tier 3   | 🔲 Pending |
| 9   | Footer dual-card dock                   | Tier 2   | ✅ Shipped |

**How to add a concept:** append a numbered entry to its status section
(pick ✅ / 🔲 / 📋 / ❌), fill the "Concept / Behavior / Files" table, and add
a row to the Roadmap. Keep this file in sync when a PR ships — update status
to ✅ with the commit hash.

**Reusable blocks:** shipped primitives and their call sites are cataloged in
`docs/standards/reusable-blocks.md` — check it before building any new page block.
