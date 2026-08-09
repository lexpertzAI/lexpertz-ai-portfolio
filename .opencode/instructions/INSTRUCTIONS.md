# OpenCode Instructions (ECC, condensed)

Repo-specific rules live in AGENTS.md. This file is the project-wide coding
floor, trimmed for a flash model. Detailed patterns (frontend, backend, API,
TDD, security) are lazy-loaded skills — invoke via the skill tool when needed.

## Security (MANDATORY before ANY commit)

- No hardcoded secrets: keys/passwords/tokens only via `process.env`, with a
  throw-if-missing guard. Never log secrets, tokens, or stack traces.
- All user input validated (Zod schemas — see `src/lib/validators/`).
- No dynamic SQL/string concatenation; use parameterized queries/builders.
- Sanitize user-provided HTML before rendering.
- Error messages are generic for users; details go to server logs only.
- If a security issue is found: STOP, fix CRITICAL issues, review the codebase
  for similar patterns, rotate any exposed secrets.

## Coding Style

- **Immutability (CRITICAL):** always spread/copy, never mutate — no
  `obj.x = y`, no `arr.push()`. Create new objects/arrays.
- **File organization:** many small focused files (200–400 lines typical, 800
  max). Extract utilities from large components. Organize by feature/domain.
- **Error handling:** wrap risky operations in try/catch; log the error; throw
  a detailed, user-friendly message. No silent failures.
- **Naming:** descriptive verb-noun functions (`fetchMarketData`), boolean
  `is*`/`has*` prefixes. No single-letter names.
- **Types:** strict TypeScript; no `any` unless absolutely necessary.

## Code Quality Checklist

Before marking work complete:

- [ ] Readable, well-named, no deep nesting (>4 levels)
- [ ] Functions < 50 lines, files < 800 lines
- [ ] Proper error handling, no `console.log`
- [ ] No hardcoded values (use named constants)
- [ ] No mutation (immutable patterns used)
- [ ] No TODO/FIXME left in committed code

## Git Workflow

Commit format: `<type>: <description>` — types: feat, fix, refactor, docs,
test, chore, perf, ci. Commit only when the user asks.

## Validation Reality (this repo)

- No test framework installed — `npm test` fails.
- `npm run build` is the only typecheck path.
- `npm run lint` for linting.
- PRs / merges gated on `build` + `lint` passing and the responsive
  two-breakpoint check from AGENTS.md.

## Formatting

- Run the repo formatter on touched files (see format-code tool).
- Remove `console.log` statements before finishing.
