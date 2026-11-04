# Code floor (mandatory)

Three rules that used to be enforced by ECC plugin hooks. The plugin does not run under OpenCode V2, so they are unconditional here, not gated behind a lazy-loaded skill.

## 1. No hardcoded secrets

- Keys, passwords, and tokens come from `process.env` only, read through a throw-if-missing guard.
- Never commit a `.env`; `.env.example` documents the variables instead.
- Never log secrets, tokens, or stack traces.
- Validate all user input with Zod (`src/lib/validators/`).

## 2. Immutability (critical)

- Spread or copy. Never `obj.x = y` on shared state, never `arr.push()`.
- Create new objects and arrays.
- No nesting deeper than 4 levels.
- Functions stay under 50 lines.

## 3. No `console.log`

- Zero occurrences in `src/`; keep it that way.
- Use a project logger if one is added. `console.warn` / `console.error` in a server route for an operational failure are the narrow exception, and they must not include user data.

Detailed checklists live in the lazy-loaded `security-review` and `coding-standards` skills.

## Check

`grep -rn "console\.log" src` returns nothing, and `npm run build` passes.
