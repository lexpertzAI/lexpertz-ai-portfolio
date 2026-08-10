# Reusable Blocks — Catalog & Conventions

Every section on the site should be **composed from primitives**, never
hand-rolled. When a component is built from scratch and could be reused
elsewhere, it ships as a generic primitive and gets cataloged here. Check this
file **before** writing a new section or page block.

**Rule of thumb:** if a page needs a profile, stats, process/steps, CTA, card
stack, or proof metric — one of these blocks already does it. Reuse it.

---

## UI primitives (`src/components/ui/`)

| Block | File | Props / notes | Used on | Reuse candidates |
|---|---|---|---|---|
| **ProfileCard** | `ui/profile-card.tsx` | `name, title, description, imageUrl, githubUrl, twitterUrl, youtubeUrl, linkedinUrl, className` — overlap photo+card on desktop, stacked centered on mobile; socials filtered when URL missing | Homepage `TeamSection` · `/about` | Any author/team/expert spotlight page |
| **ProcessSteps** | `ui/process-steps.tsx` | `steps: Step[] {title, description, theme?, colors?}`, `layout: "zigzag" \| "stacked"`, `cardWidth`, `className` — animated dotted zigzag (desktop) / vertical stack (mobile) | Homepage `ProcessSection` · `/about` evolution | `/services/[slug]` engagement phases, case-study timelines |
| **ContainerScroll / CardSticky** | `ui/cards-stack.tsx` | `scrollHeightVh` on scroll container; `index, incrementY, incrementZ` per card — scroll-pinned card stack (pure CSS sticky + translateZ, concept-verbatim) | Homepage `ServicesGrid` | Portfolio/project galleries, product feature walks |
| **StatCard** | `ui/stat-card.tsx` | `label, value, hint?` — mono metric card | `/case-studies/[slug]` metrics · `/about` proof strip | `/products/axiom-verify`, insights KPI rows |
| **GrowthChart** | `ui/growth-chart.tsx` | `data: ChartPoint[], gradientId?` — brand-gradient recharts area chart | Homepage statbar only (signature — avoid duplicating) | `/products/axiom-verify` growth, case-study trend lines |
| **BentoCard** | `ui/bento-card.tsx` | `asChild?` + children — neon hover-glow tile | Homepage case-study cards · `/about` tenet tiles | Any feature grid |
| **StatCard + CountUp** | `ui/stat-card.tsx` + `motion/count-up.tsx` | CountUp: `value, decimals?, prefix?, suffix?` — viewport-triggered count, SSR-safe, reduced-motion aware | `/about` proof strip | Homepage statbar, product KPIs |
| **AnimatedRoadmap** | `ui/animated-roadmap.tsx` | `milestones: Milestone[] {id, name, status, position}`, `mapImageSrc` — map backdrop + scroll-drawn route; desktop map with positioned markers, mobile vertical rail; reduced-motion static | Homepage `CTASection` | Product launch roadmaps, `/services/[slug]` engagement plans |
| **Section / Container / Badge / Button** | `ui/*` | Standard section rhythm, width constraint, eyebrow, CTAs | Everywhere | Everywhere |

## Motion primitives (`src/components/motion/`)

| Block | Use |
|---|---|
| `FadeIn` / `SlideUp` | Standard entrances (viewport-triggered, once) |
| `StaggerContainer` / `StaggerItem` | Staggered list/grid entrances |
| `TiltCard` | 3D tilt on hover (`[@media(hover:hover)]` gated) — pairs with `BentoCard` |
| `CountUp` | Animated metric values (pair with `StatCard`) |
| `ScrollTransform` | Scroll-linked transforms (scroll-morph hero) |

## Section blocks (`src/components/sections/`)

| Block | Props / notes | Used on | Reuse candidates |
|---|---|---|---|
| **CTASection** | None (fixed brand copy + Book a Call / View the work) | Homepage · `/about` | Every inner page close — `/services/[slug]`, `/case-studies/[slug]`, `/insights/[slug]`, `/products/axiom-verify` |
| **TeamSection** | Wraps `ProfileCard` with founder content + heading + CTA | Homepage | — |
| **ProcessSection** | Wraps `ProcessSteps` with process content | Homepage | — |
| **ContactForm** | Zod + react-hook-form | `/contact` | — |
| **CaseStudiesPreview / InsightsPreview** | Catalog cards (BentoCard + TiltCard) | Homepage | Index pages |

---

## Conventions

1. **Extract, don't rewrite** — the second time a block would be needed, it
   becomes a primitive in `ui/` (or `motion/`), exported from the dir barrel
   (`index.ts`), with content driven from `src/content/*` — never inline page
   data.
2. **Compose sections from primitives** — a page section is a thin wrapper
   that supplies content + layout (`Section`/`Container`) and composes
   primitives. See `/about` as the reference example (ProfileCard + StatCard +
   CountUp + BentoCard + TiltCard + ProcessSteps + CTASection, zero new code).
3. **Keep the catalog in sync** — add a row when a primitive ships or gains a
   new call site, and mark it in `docs/design-concepts.md`.
4. **Brand discipline** — primitives use design tokens (cyan accent, brand
   gradients); concept files get adapted to `m.div` (LazyMotion strict) and
   repo tokens on import.
