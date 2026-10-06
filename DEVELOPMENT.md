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

This project uses [ECC](https://github.com/affaan-m/ECC) — an agent harness that provides skills, agents, and commands. This repo targets **OpenCode V2** (`opencode@2.x`) and uses only native V2 discovery.

### How ECC Is Installed

ECC is installed **as committed repo files**, not as a global tool or npm package:

| Path | Contents | Discovery |
|---|---|---|
| `.opencode/skills/` | Skills (`<id>/SKILL.md`) | auto |
| `.opencode/agents/` | Subagents (`<id>.md`) | auto |
| `.opencode/commands/` | Slash commands (`<id>.md`) | auto |
| `skills/` | Skills (repo root) | listed in `opencode.json` |
| `opencode.json` | Model, agent overrides, skill paths, MCP, permissions |

There is no plugin and no build step. V2 changed the plugin API outright, so the upstream ECC plugin (and the custom tools it registered) do not run here — see [Why no plugin](#why-no-plugin).

### Verifying Skills Are Loaded

```bash
opencode mcp list          # MCP connection state
opencode api get /api/skill # note: reports the service's default directory, not the cwd
```

`/api/skill` is unreliable for this check — it ignores the `location` query parameter and returns the service's default directory. To verify a specific skill, load it directly in a session with the `skill` tool (e.g. ask for `@coding-standards`) and confirm the reported base directory matches the skill's path.

### Adding ECC Skills

To add a skill, copy its directory into `skills/` or `.opencode/skills/`. Both work as-is: `.opencode/skills/` is a default discovery path, and `skills/` is registered once in `opencode.json`. No further config is needed.

```markdown
---
name: my-skill
description: When the model should reach for this
---
```

The `description` is the only part advertised up front; the model loads the body when relevant. A skill with no description is never advertised. The skill ID is the path-derived directory name, not the frontmatter `name`.

### Why no plugin

The upstream ECC distribution ships `plugins/` and `tools/`. Neither is installed:

- **Plugin** — V1 plugin code does not execute under V2. The old SDK import (`@opencode-ai/plugin`) is also gone; V2 uses `@opencode/plugin` and a `Plugin.define({ id, setup(ctx) })` entrypoint. Loading the old plugin only produced a "failed to load plugin" warning. Its hooks (auto-format, typecheck-after-edit, console.log audit, secret checks) duplicated rules already written into `AGENTS.md`.
- **Custom tools** — `changed-files`, `dependency-analyzer`, `run-tests`, `lint-check`, `format-code`, `git-summary`, `security-audit`, and `check-coverage` were only reachable through that plugin. Several just returned a command string that `npm run lint` / `npm run build` already provide.

To reintroduce them, port the plugin per <https://opencode.ai/v2/docs/build/plugins/migrate-v1/>: register tools through `ctx.tool.transform` with JSON Schema `input` and a `{ content }` return value.

### Available Commands

| Command | Agent | Description |
|---|---|---|
| `/plan` | planner | Create implementation plans for complex features |
| `/tdd` | tdd-guide | Enforce TDD workflow with 80%+ coverage |
| `/code-review` | code-reviewer | Review code for quality, security, maintainability |
| `/security` | security-reviewer | Comprehensive security review |
| `/build-fix` | build-error-resolver | Fix build and TypeScript errors |
| `/refactor-clean` | refactor-cleaner | Remove dead code and consolidate duplicates |
| `/verify` | — | Run verification loop (build, types, lint, tests) |
| `/quality-gate` | code-reviewer | Run ECC quality pipeline on a file or project |
| `/update-docs` | doc-updater | Update documentation |
| `/learn` | — | Extract patterns and learnings from session |
| `/checkpoint` | — | Save verification state and progress |

### Available Agents

Registered from `.opencode/agents/`:

- **planner** — Implementation planning for complex features (read-only)
- **code-reviewer** — Code quality, security, and maintainability review (read-only)
- **security-reviewer** — Security vulnerability detection and remediation
- **tdd-guide** — Test-driven development workflow enforcement
- **build-error-resolver** — Build and TypeScript error resolution
- **refactor-cleaner** — Dead code cleanup and consolidation
- **doc-updater** — Documentation and codemap updates
- **harness-optimizer** — Agent harness configuration optimization

To add an ECC catalog agent (e.g. `database-reviewer`, `go-reviewer`), drop its Markdown file into `.opencode/agents/`. V1 used a separate prompt file under `.opencode/prompts/`; V2 uses the agent file's body as the system prompt, so there is no second file to maintain.

### Available Skills

From `skills/`:
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

From `.opencode/skills/`: `defuddle`, `graphify`, `json-canvas`, `obsidian-bases`, `obsidian-cli`, `obsidian-markdown`.

To add one, copy the directory into either location. See [Adding ECC Skills](#adding-ecc-skills).

## Codespaces / Dev Container

The repo ships a `.devcontainer/devcontainer.json` so a fresh GitHub Codespace is ready to go. Because ECC is committed repo files, it arrives automatically with the clone — the container only needs to install the runtimes.

`postCreateCommand` runs:

1. `npm install -g ctx7 opencode-ai` — global tools
2. Install + init `rtk`
3. `npm install` — project dependencies

Nothing to verify at build time — skills, agents, and commands are plain files with no plugin or build step.

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
