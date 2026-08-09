# Development Guide

## Prerequisites

- **Node.js** 22+ (`>=22.12.0` per `package.json` `engines`; also `.nvmrc` / `.tool-versions`)
- **npm** 10+
- **Git** 2.30+

## Quick Start

```bash
# Clone and install
git clone <repo-url>
cd lexpertz-ai-portfolio
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Turbopack dev server (port 3000) |
| `npm run build` | Build + typecheck (Vercel CI path) |
| `npm run lint` | Run ESLint |
| `npm run start` | Serve the production build |

## Agent Harness (ECC)

This project uses [ECC](https://github.com/affaan-m/ECC) — an agent harness optimization system that provides skills, agents, commands, hooks, and security scanning.

### How ECC Is Installed

ECC is installed **as committed repo files**, not as a global tool or npm package:

| Path | Contents |
|---|---|
| `.opencode/plugins/` | Plugin entry (`ecc-hooks.ts`) + changed-files store — auto-loaded by OpenCode |
| `.opencode/tools/` | Custom tools (`changed-files`, `dependency-analyzer`, etc.) |
| `.opencode/prompts/` | Subagent prompts |
| `.opencode/commands/` | Slash command templates |
| `skills/` | Skill definitions (SKILL.md) loaded via `opencode.json` |
| `opencode.json` | Plugin wiring, agents, commands, skills, MCP config |

OpenCode auto-scans `.opencode/plugins/*.{ts,js}` and loads each file as a plugin — there is **no** `plugin:` config entry and no `npm install ecc-universal` needed. The plugin's `@opencode-ai/plugin` SDK import resolves against the SDK bundled with OpenCode itself.

### Verifying ECC Is Loaded

```bash
# Redirect to a file — piping truncates the output at the 64KB pipe buffer,
# so grepping for ecc-hooks.ts through a pipe will falsely report it missing.
opencode debug config > /tmp/ecc-check.json 2>/dev/null
grep -q 'ecc-hooks.ts' /tmp/ecc-check.json && echo 'ECC plugin OK' || echo 'ECC plugin MISSING'
```

In the output, `plugin` and `plugin_origins` must list `ecc-hooks.ts` (scope: local). On a fresh session, the `session.created` hook logs `[ECC] Session started`.

### Hook Profile & Tuning

The ECC plugin behavior is controlled by two environment variables:

| Variable | Values | Effect |
|---|---|---|
| `ECC_HOOK_PROFILE` | `minimal`, `standard` (default), `strict` | Higher profiles enable more hooks — e.g. auto-format on edit and `tsc --noEmit` after edits only run under `strict`; console.log warnings run from `standard` |
| `ECC_DISABLED_HOOKS` | comma-separated hook IDs | Disable specific hooks, e.g. `post:edit:console-warn,pre:write:doc-file-warning` |

### Building / Type-Checking the Plugin

The plugin has its own package manifest under `.opencode/` (for `tsc`-level type-checking of the hooks and tools — **not** needed at runtime, since OpenCode bundles the SDK):

```bash
cd .opencode && npm install && npm run build
```

The compiled output goes to the gitignored `.opencode/dist/`.

### Adding ECC Skills

To add a skill, copy its directory into `skills/` and append the `SKILL.md` path to the `instructions` array in `opencode.json`.

### Available Commands

| Command | Agent | Description |
|---|---|---|
| `/plan` | planner | Create implementation plans for complex features |
| `/tdd` | tdd-guide | Enforce TDD workflow with 80%+ coverage |
| `/code-review` | code-reviewer | Review code for quality, security, maintainability |
| `/security` | security-reviewer | Comprehensive security review |
| `/build-fix` | build-error-resolver | Fix build and TypeScript errors |
| `/e2e` | e2e-runner | Generate and run E2E tests |
| `/refactor-clean` | refactor-cleaner | Remove dead code and consolidate duplicates |
| `/orchestrate` | planner | Multi-agent orchestration for complex tasks |
| `/verify` | — | Run verification loop (build, types, lint, tests) |
| `/quality-gate` | code-reviewer | Run ECC quality pipeline on a file or project |
| `/test-coverage` | tdd-guide | Analyze and improve test coverage |
| `/update-docs` | doc-updater | Update documentation |
| `/update-codemaps` | doc-updater | Update codemaps |
| `/loop-start` | loop-operator | Start a managed autonomous agent loop |
| `/loop-status` | — | Inspect active loop state |
| `/learn` | — | Extract patterns and learnings from session |
| `/checkpoint` | — | Save verification state and progress |
| `/eval` | — | Run evaluation against criteria |
| `/setup-pm` | — | Configure package manager preference |
| `/skill-create` | — | Generate skills from git history |

### Available Agents

Only the agents defined in `opencode.json` are registered:

- **planner** — Implementation planning for complex features
- **architect** — System design and architectural decisions
- **code-reviewer** — Code quality, security, and maintainability review
- **security-reviewer** — Security vulnerability detection and remediation
- **tdd-guide** — Test-driven development workflow enforcement
- **build-error-resolver** — Build and TypeScript error resolution
- **e2e-runner** — End-to-end testing with Playwright
- **doc-updater** — Documentation and codemap updates
- **docs-lookup** — Documentation specialist using Context7 MCP
- **refactor-cleaner** — Dead code cleanup and consolidation
- **harness-optimizer** — Agent harness configuration optimization
- **loop-operator** — Autonomous agent loop operation

Agents from the ECC catalog (e.g. `database-reviewer`, `go-reviewer`) are **not** registered unless added to `opencode.json` with a matching prompt file in `.opencode/prompts/agents/`.

### Available Skills

Skills are loaded automatically. The 11 installed skills are:
- `coding-standards` — Naming, readability, immutability, code quality
- `api-design` — REST conventions, validation, response formats
- `backend-patterns` — Repository/service layers, backend architecture
- `frontend-patterns` — React, Next.js, state management, performance
- `frontend-slides` — Slide/deck build patterns
- `tdd-workflow` — Test-driven development with 80%+ coverage
- `e2e-testing` — End-to-end testing with Playwright
- `security-review` — Security checklist and patterns
- `verification-loop` — Comprehensive verification system
- `eval-harness` — Eval-driven development framework
- `strategic-compact` — Context-compaction guidance

To add a skill: copy its directory into `skills/` and append the `SKILL.md` path to the `instructions` array in `opencode.json`.

## Codespaces / Dev Container

The repo ships a `.devcontainer/devcontainer.json` so a fresh GitHub Codespace is ready to go. Because ECC is committed repo files, it arrives automatically with the clone — the container only needs to install the runtimes.

`postCreateCommand` runs:

1. `npm install -g ctx7 opencode-ai` — global tools
2. Install + init `rtk`
3. `npm install` — project dependencies
4. Verification — `opencode debug config` must show `ecc-hooks.ts`; prints `ECC plugin OK` / `ECC plugin MISSING`

**Package manager:** npm everywhere (CI, devcontainer, local). `pnpm` is intentionally not used — the project is a single-package Next.js app on Vercel, and CI already caches `npm`, so a pnpm lockfile would add migration cost for no benefit.

## Models & Providers (OpenCode)

`opencode.json` configures the agents' model access:

- **Default model:** `nvidia/deepseek-ai/deepseek-v4-pro` (small: `nvidia/stepfun-ai/step-3.7-flash`)
- **Providers:** `nvidia` plus a `headroom` OpenAI-compatible proxy at `http://127.0.0.1:8787/v1`

The `headroom` proxy is a **local process** — it does not exist in a fresh Codespace. If agent sessions hang or error with "provider unavailable," one of these is needed:

1. Start the local headroom proxy (used when developing on the host machine), or
2. Override the provider/model for the environment, e.g.:

```bash
export OPENCODE_PROVIDER=nvidia
opencode
```

or point `opencode.json`'s `headroom` baseURL at a reachable endpoint. Model/provider changes are intentionally environment-specific and should not be hardcoded into the repo.

## Context7 MCP

[Context7](https://context7.com) provides up-to-date library documentation for AI coding assistants.

### MCP Tools

- `resolve-library-id` — Resolve a library name to a Context7 library ID
- `query-docs` — Retrieve documentation for a library

### Setup

Context7 runs via remote HTTP transport (defined in `opencode.json`) to avoid
local `npx` STDIO issues in GitHub Codespaces containers:

```json
"context7": {
  "type": "remote",
  "url": "https://mcp.context7.com/mcp",
  "enabled": true,
  "oauth": false,
  "headers": {
    "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}"
  }
}
```

The `CONTEXT7_API_KEY` secret is read from the environment (`~/.bashrc` or a
Codespaces secret) and is never committed to the repo.

The standalone CLI remains available:

```bash
# Install CLI
npm install -g ctx7

# Search for libraries
ctx7 library "next.js" "middleware authentication"

# Fetch documentation
ctx7 docs /vercel/next.js "middleware authentication redirect"
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Avoid `any` — use proper types
- Prefer immutability (spread operator, no direct mutation)
- Use Zod schemas for input validation

### React

- Functional components with typed props
- Composition over inheritance
- Custom hooks for reusable logic
- Memoization for performance (`useMemo`, `useCallback`, `React.memo`)

### File Organization

- Many small files (200-400 lines typical, 800 max)
- High cohesion, low coupling
- Organize by feature/domain, not by type
- Barrel exports (`index.ts`) for module public API

### Error Handling

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('User-friendly message')
}
```

## Testing

This project uses `npm run build` as the primary typecheck path. No separate test framework is currently installed.

For new features, use the `/tdd` command to enforce test-driven development with 80%+ coverage.

## Project Structure

```
lexpertz-ai-portfolio/
├── src/
│   ├── app/              # Next.js App Router (layouts, pages, route groups)
│   │   ├── (marketing)/  # Marketing routes (about, case-studies, contact, etc.)
│   │   ├── products/     # Product pages (axiom-verify)
│   │   ├── sitemap.ts    # Generated sitemap (all routes, incl. content slugs)
│   │   └── globals.css   # Global styles: HSL design tokens + type-scale utilities
│   ├── components/
│ │ ├── ui/ # shadcn/ui primitives (+ CinematicHero, GrowthChart, ProcessSteps)
│   │   ├── layout/       # Custom layout components (navbar, footer, mobile-menu)
│   │   ├── sections/     # Homepage section components
│   │   ├── motion/       # Motion primitives (FadeIn, SlideUp, Stagger, CountUp, ScrollTransform, TiltCard)
│   │   ├── three/        # Dormant WebGL particle scene (no longer mounted)
│   │   ├── forms/        # Form components
│ │ └── providers/ # Theme, Motion (LazyMotion)
│   ├── content/          # Static TypeScript data (services, case-studies, team, insights, featured-stats)
│   └── lib/
│       ├── validators/   # Zod schemas
│       ├── design-tokens.ts  # Color + typography token mirrors
│       ├── motion-tokens.ts  # Animation tokens
│       └── utils/        # Utility functions
├── docs/                 # Design docs (design-system.md, design-concepts.md)
├── .opencode/            # ECC plugin (plugins/, tools/, prompts/, commands/)
├── .devcontainer/        # GitHub Codespaces dev container
├── skills/               # OpenCode agent skills
├── public/               # Static assets (robots.txt — sitemap.xml is generated)
├── AGENTS.md             # Agent guide (commands, architecture, tools)
├── DEVELOPMENT.md        # This file
└── README.md             # Project overview
```

## Useful Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com)
- [Recharts](https://recharts.org)
- [ECC Repository](https://github.com/affaan-m/ECC)
- [Context7](https://context7.com)
