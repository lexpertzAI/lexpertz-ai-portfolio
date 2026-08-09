# Lexpertz AI — Design System

Dark-first typography + color system for lexpertzai.cc.
Source of truth: `src/app/globals.css` (CSS variables + utilities),
`tailwind.config.ts` (token mapping), `src/lib/design-tokens.ts` (typed mirrors).

## Typography

| Role | Family | Weights | Usage |
|---|---|---|---|
| Display | **Space Grotesk** (variable) | 500 / 600 / 700 | All headings (h1–h6 via base rule) |
| Sans | **Geist Sans** (variable) | variable | Body, UI, navigation, buttons |
| Mono | **Geist Mono** (variable) | variable | Badges/eyebrows, metric values, indexes, micro-headers |

Loaded via `next/font/google` in `src/app/layout.tsx` (`display: swap`, latin
subset, auto size-adjust → zero CLS). Three variable fonts total; no static
weight files.

**Why Space Grotesk over Geist for headlines:** headlines set in the same face
as body is the generic AI-template look. Space Grotesk is a single free
variable font with a technical, geometric character that matches the
physicist-engineer brand, while Geist Sans (already loaded) carries body/UI.
No purple gradients, no decorative faces — the mono-label system is the
differentiator.

### Type scale (utilities in `globals.css`)

| Token / class | Size | Weight | Tracking | Used for |
|---|---|---|---|---|
| `.heading-page` | 2.25rem → 3rem | 700 | -0.025em | Page h1 (detail pages) |
| `.heading-section` | 1.875rem → 2.25rem | 600 | -0.02em | Section h2 |
| `.heading-card` | 1.125rem → 1.25rem | 600 | -0.01em | Card h3 |
| hero h1 (inline) | clamp(2.5rem, 5vw, 4rem) | 700 | -0.03em, lh 1.06 | Hero headline |
| `.eyebrow` | 0.75rem | 500 | 0.14em, uppercase, mono | Badges, micro-headers |
| body / lede | 0.875–1.25rem | 400 | lh 1.6 | Paragraphs |

## Color tokens (dark, primary)

| Token | Value (dark) | Purpose |
|---|---|---|
| `--background` | hsl(240 10% 2%) `#050505` | Void canvas |
| `--card` | hsl(240 10% 4%) `#0a0a0a` | Cards / surfaces |
| `--surface-raised` | hsl(240 5% 8%) `#141417` | Hover elevation |
| `--secondary` / `--muted` | `#1a1a1a` / `#1f1f1f` | Raised fills |
| `--foreground` | `#fafafa` (≈19.5:1) | Primary text |
| `--muted-foreground` | `#a6a6ad` (≈8.9:1) | Secondary text |
| `--border` | hsl(240 6% 14%) `#212127` | Hairlines (crisp, restrained) |
| `--border-strong` | hsl(240 5% 22%) | Emphasis borders / hover |
| `--brand-cyan` | `#06b6d4` (≈8:1 on void) | **The single semantic accent** |
| `--brand-blue` | `#2563eb` | Gradient partner only — never text |
| `--success` | hsl(152 48% 55%) emerald | Positive outcomes only |
| `--ring` | brand cyan | Focus states |
| `--scrim` | bg @ 0.8 | Text-over-3D overlays |

**Accent discipline:** cyan is the only accent used for text/interactive
elements (links, key metrics, focus ring, chart stroke). Blue appears only
inside the cyan→blue gradient (brand identity: buttons, badges, glow, hero
gradient text) and the existing scenes by construction.

**Success token** is defined and used only where a positive outcome reads
semantically (contact-form confirmation). Homepage metrics stay cyan to
preserve single-accent restraint.

## Hero (cinematic)

`CinematicHero` (`src/components/ui/cinematic-hero.tsx`) drives the
homepage hero: a GSAP `ScrollTrigger.pin` scene whose content responds to
the captured virtual scroll. Composition:

- `sections/hero-cinematic.tsx` owns content (badge, headline, copy, CTAs)
  and pulls the section up over the layout's `pt-16` via `className="relative -mt-16"`.
  Under `prefers-reduced-motion` it renders a static poster (`StaticCinematicHero`)
  with the same messaging and no JS motion.
- The pinned root is `h-svh` so the pin-spacer is not clipped by a
  fixed/short container. The container itself is plain `relative -mt-16`
  (no `h-screen overflow-hidden`).
- Desktop/mobile branching is done with `gsap.matchMedia()` — never with a one-time
  `isMobile` flag at mount.
- Responsive breakpoints are verified at ~375px mobile and ≥1280px desktop.
  Hover-dependent UI is gated with `@media(hover:hover)`.
- Touch targets are ≥44px. Decorative layers are `hidden md:block`.

## Growth chart

`GrowthChart` (`src/components/ui/growth-chart.tsx`) renders a recharts
`AreaChart` with a cyan→transparent gradient fill and a token-styled tooltip
(`popover` surface, mono value). Data and height sizing come from the caller
(`sections/featured-stats-section.tsx` consumes `content/featured-stats.ts`).
Pass a stable `gradientId` when more than one chart mounts.

## Conventions

- All headings get the display family via a base-layer rule — never restyle
  families per-page.
- Metric values and section indexes are mono (`font-mono`), uppercase labels
  use `.eyebrow`.
- Light mode exists as a fallback only; tokens remain functional, not tuned.
- Reduced motion: global CSS kill-switch + JS gates (3D canvas,
  counters, tilt) — unchanged by this system. The cinematic hero provides
  a static poster fallback automatically.
