---
description: Run verification loop (build + lint)
---

# Verify Command

Run the repo's actual validation gates for: $ARGUMENTS

## Repo Reality

- **No test framework — `npm test` fails. Do not run it.**
- `npm run build` is the ONLY typecheck path.
- `npm run lint` for linting.

## Verification Steps

1. **Build (typecheck)**: `npm run build` — must succeed, zero errors.
2. **Lint**: `npm run lint` — must pass.
3. **Security scan**: grep for hardcoded secrets (`sk-`, `api_key`, `password`) in touched files.
4. **Console check**: no `console.log` statements left in `src/`.
5. **Diff review**: `git diff --stat` — confirm only intended files changed.
6. **Responsive check** (UI work only): visually verify ~375px and ≥1280px.

## Verification Report

```
VERIFICATION REPORT
==================
Build:     [PASS/FAIL]
Lint:      [PASS/FAIL]
Secrets:   [PASS/FAIL] (X issues)
Console:   [PASS/FAIL]
Diff:      [X files changed]

Overall:   [READY/NOT READY]
```

### Action Items
[If FAIL, list what needs to be fixed]

---

**NOTE**: Run before every commit and PR. Never substitute `npx tsc --noEmit` for `npm run build`.
