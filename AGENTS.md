## Lexpertz AI Portfolio — Repo Guide

**Model:** DeepSeek V4 Flash (`deepseek/deepseek-v4-flash`) via direct DeepSeek API. Be concise; the instruction budget is tight. Skills are lazy-loaded — invoke them via the skill tool only when the task matches.

**Stack:** Next.js 16 (App Router, Turbopack) · shadcn/ui (base-nova) · Tailwind CSS 3 · Framer Motion (LazyMotion strict) · recharts · Lenis · Zod + react-hook-form · TypeScript 5 strict

**Fonts:** Space Grotesk (display) · Geist Sans (body) · Geist Mono (labels) — loaded via `next/font/google` in `src/app/layout.tsx`. See `docs/design-system.md`.

### Commands

| Action | Command |
|---|---|
| Dev server | `npm run dev` (port 3000) |
| Build + typecheck | `npm run build` |
| Lint | `npm run lint` |
| Add shadcn/ui component | `npx shadcn@latest add <name>` |

**No test framework is installed — `npm test` fails.** `npm run build` is the ONLY typecheck path (no `tsc --noEmit`).

### Architecture

- **Path alias:** `@/` maps to `./src/*`
- **Pages:** Homepage is a single-page marketing site; sections in `src/components/sections/`. Other routes: `src/app/(marketing)/` (about, case-studies, contact, insights, services), `src/app/products/axiom-verify/`.
- **Content:** `src/content/` = static TS data files (services, case-studies, team, insights, featured-stats). No CMS. Drives `src/app/sitemap.ts`.
- **UI primitives:** `src/components/ui/` (Button, Badge, Card, BentoCard, Container, Section, StatCard, GrowthChart, ScrollMorphHero). Layout in `src/components/layout/`. Motion primitives in `src/components/motion/` (FadeIn/SlideUp/Stagger + CountUp, ScrollTransform, TiltCard).
- **Hero:** `src/components/sections/hero-scroll-morph.tsx` wraps `ScrollMorphHero`. Client-only Framer Motion scene (20 flip-cards: scatter → line → circle → bottom arc → shuffle). Must stay `m.div` (LazyMotion strict). `next/image` against `images.unsplash.com` (see `next.config.mjs` remotePatterns). `prefers-reduced-motion` → static gradient poster, no JS scene.
- **Charts:** recharts in `GrowthChart` — brand-gradient area chart, token-styled tooltip, data from `src/content/featured-stats.ts`.
- **3D (dormant):** `src/components/three/` — not mounted. If reintroduced: dynamic import (`ssr: false`), unmount off-screen, reduced-motion, `frameloop="demand"`, DPR-capped.
- **Providers:** `src/components/providers/` — ThemeProvider, MotionProvider (LazyMotion), SmoothScrollProvider (Lenis, reduced-motion aware).
- **Design tokens:** HSL CSS vars in `src/app/globals.css` + `.heading-page`/`.heading-section`/`.heading-card`/`.eyebrow` utilities. Mirror types in `src/lib/design-tokens.ts`. Motion tokens in `src/lib/motion-tokens.ts`. See `docs/design-system.md`.
- **Forms:** Zod schemas in `src/lib/validators/`; useForm + zodResolver (see `src/components/sections/contact-form.tsx`).
- **Barrels:** each module dir has `index.ts` re-exporting the public API.
- **Stale code:** `src/components/.old/` — never import from it.

### Reusability Mandate (MANDATORY)

Before writing any new section/page block, check `docs/reusable-blocks.md`. If a primitive exists, **reuse it** — compose, don't rewrite.

- New reusable component → generic primitive: `src/components/ui/` (UI) or `src/components/motion/` (motion), exported from the dir barrel, content driven from `src/content/*` (never inline page data).
- Page sections are thin wrappers composing primitives + content (reference: `CTASection`, `TeamSection`, `/about` page).
- Keep `docs/reusable-blocks.md` in sync when a primitive ships or gains a call site.

### Skills & MCP

- Skills load on demand via the skill tool (paths registered: `skills/`, `.opencode/skills/`). Do not dump skill contents into output unless loaded.
- **shadcn** + **Context7** MCP servers available (permission `ask`).
- Available workflow commands: `/plan`, `/tdd`, `/code-review`, `/security`, `/build-fix`, `/refactor-clean`, `/quality-gate`, `/update-docs`, `/verify`, `/checkpoint`, `/learn`.

## Responsive Requirements (MANDATORY — mobile + desktop)

Every component/design ships **mobile-first** and is verified at both ~375px and ≥1280px before done.

- **Mobile-first**: base Tailwind classes = mobile layout; `sm:`/`md:`/`lg:` are progressive upgrades. Never desktop-first then squeeze down.
- **Mandatory two-breakpoint check**: verify visually at ~375px and ≥1280px before marking complete.
- **Touch targets ≥ 44px**; no hover-dependent UI without `[@media(hover:hover)]:` gating.
- **Never let fixed/absolute positioning leak**: absolute/fixed children with explicit `top`/`height` must be contained by a real height on their parent (inline `height`, `md:h-[...]`) or they paint over adjacent sections. This bug class has bitten the hero pin and process zigzag — always confirm the container grows. See `docs/lessons-learned.md`.
- **Viewport units**: prefer `svh`/`dvh` over `vh` for above-the-fold/pinned sections.
- **Responsive scroll animations**: `gsap.matchMedia()` (or `useMediaGreaterThan`) for per-breakpoint scroll distances; never compute `isMobile` once at mount.
- **Decorative layers** (gradients, textures, connector SVGs): `hidden md:block`.
- **Reduced motion** stays gated everywhere (`prefers-reduced-motion` / `useReducedMotion`) at every breakpoint.

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
