## Lexpertz AI Portfolio — Repo Guide

**Stack:** Next.js 16 (App Router, Turbopack) · shadcn/ui (base-nova) · Tailwind CSS 3 · Framer Motion (LazyMotion strict) · recharts (stats area chart) · Lenis (smooth scroll) · Zod + react-hook-form · TypeScript 5 strict

**Fonts:** Space Grotesk (display) · Geist Sans (body) · Geist Mono (technical labels) — loaded via `next/font/google` in `src/app/layout.tsx`. See `docs/design-system.md` for the full token system.

### Commands

| Action | Command |
|---|---|
| Dev server | `npm run dev` (port 3000) |
| Build + typecheck | `npm run build` |
| Lint | `npm run lint` |
| Add shadcn/ui component | `npx shadcn@latest add <name>` |

No test framework is installed — `npm test` will fail. `npm run build` is the only typecheck path (no separate `tsc --noEmit`).

### Architecture

- **Path alias:** `@/` maps to `./src/*`
- **Pages:** Homepage is a single-page marketing site. Section components live in `src/components/sections/`. Other routes under `src/app/(marketing)/` (about, case-studies, contact, insights, services) and `src/app/products/axiom-verify/`.
- **Content:** `src/content/` holds static TypeScript data files (services, case-studies, team, insights, featured-stats) — not backed by a CMS or database. Drives the generated sitemap (`src/app/sitemap.ts`).
- **UI components:** shadcn/ui primitives in `src/components/ui/` (Button, Badge, Card, BentoCard, Container, Section, StatCard, GrowthChart, ScrollMorphHero). Custom layout in `src/components/layout/`. Motion primitives in `src/components/motion/` (FadeIn/SlideUp/Stagger + CountUp, ScrollTransform, TiltCard).
- **Hero:** `src/components/sections/hero-scroll-morph.tsx` (content + reduced-motion poster) wraps `ScrollMorphHero` in `src/components/ui/scroll-morph-hero.tsx`. Client-only Framer Motion scene: 20 flip-cards assemble scatter → line → circle, morph to a bottom arc on a captured virtual scroll (wheel/touch, released at bounds so the page scrolls on), then shuffle. Cards use `next/image` against `images.unsplash.com` (see `next.config.mjs` remotePatterns). Must stay `m.div` (LazyMotion strict). `prefers-reduced-motion` → static gradient poster, no JS scene.
- **Charts:** recharts powers `GrowthChart` (`src/components/ui/growth-chart.tsx`) — brand-gradient area chart + custom token-styled tooltip. Data comes from `src/content/featured-stats.ts`; see `FeaturedStatsSection`.
- **3D scene (dormant):** `src/components/three/` — WebGL particle field (`SceneCanvas`) previously used by the hero. No longer mounted; kept for a possible future ambient layer. If reintroduced: dynamically import (`ssr: false`), unmount off-screen, respect `prefers-reduced-motion`, `frameloop="demand"`, DPR-capped.
- **Providers:** `src/components/providers/` — ThemeProvider, MotionProvider (LazyMotion strict — components must use `<m.div>`), SmoothScrollProvider (Lenis, reduced-motion aware).
- **Design tokens:** HSL CSS vars in `src/app/globals.css` (colors + type-scale utilities `.heading-page`/`.heading-section`/`.heading-card`/`.eyebrow`). Mirror types in `src/lib/design-tokens.ts` (colors + typography). Motion tokens in `src/lib/motion-tokens.ts`. Full documentation in `docs/design-system.md`.
- **Forms:** Zod schemas in `src/lib/validators/`. useForm + zodResolver pattern (see `src/components/sections/contact-form.tsx`).
- **Barrel exports:** Each module dir has `index.ts` re-exporting public API.
- **Stale code:** `src/components/.old/` — do not import from.

### MCP Available

- **shadcn** — add components
- **Context7** — fetch current library/framework/API docs

### Skills Available

Skills are loaded automatically via `opencode.json`. Use `/plan` for complex features, `/tdd` for test-driven workflow, `/code-review` after writing code, `/security` before commits, `/build-fix` for build errors, `/graphify <path>` to map a codebase into a knowledge graph.

### Tools

- **Defuddle** — `defuddle parse <url> --md` (prefer over WebFetch for standard web pages)

<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->

## Responsive Requirements (MANDATORY — mobile + desktop)

Every component, section, and design shipped to this repo must be authored
**mobile-first** and verified at **both** ~375px mobile and ≥1280px desktop
before it is considered done.

- **Mobile-first authoring**: base Tailwind classes = mobile layout; `sm:` /
  `md:` / `lg:` classes are progressive desktop upgrades. Do not design
  desktop-first and squeeze down.
- **Mandatory two-breakpoint check**: before marking work complete, verify the
  component visually at ~375px and ≥1280px (device toolbar / real device).
- **Touch targets ≥ 44px**; no hover-dependent UI without
  `[@media(hover:hover)]:` gating (hover states get stuck on touch).
- **Never let fixed/absolute positioning leak**: absolute/fixed children with
  explicit `top`/`height` must be contained by a real height on their parent
  (e.g. inline `height`, `md:h-[...]`), or they will paint over adjacent
  sections. This bug class has bitten the hero pin and the process zigzag —
  always confirm the container actually grows.
- **Viewport units**: prefer `svh` (or `dvh`) over `vh` for above-the-fold /
  pinned sections so the mobile browser URL bar doesn't shift layout.
- **Responsive scroll animations**: use `gsap.matchMedia()` (or
  `useMediaGreaterThan` for React state) to run different scroll distances /
  sizes per breakpoint; never compute `isMobile` once at mount.
- **Decorative layers** (gradients, textures, connector SVGs) that exist for
  desktop ambiance should be `hidden md:block`.
- **Reduced motion** stays gated everywhere (`prefers-reduced-motion` /
  `useReducedMotion`) at every breakpoint.