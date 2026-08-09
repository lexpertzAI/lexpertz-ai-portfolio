---
description: Fix build and TypeScript errors with minimal changes
---

# Build Fix Command

Fix build and TypeScript errors with minimal changes: $ARGUMENTS

## Your Task

1. **Run type check**: `npm run build` (the ONLY typecheck path — no `tsc --noEmit` script exists)
2. **Collect all errors** from the build output
3. **Fix errors one by one** with minimal changes
4. **Verify each fix** doesn't introduce new errors
5. **Run final check** to confirm all errors resolved

## Approach

### DO:
- Fix type errors with correct types
- Add missing imports
- Fix syntax errors
- Make minimal changes
- Preserve existing behavior
- Run `npm run build` after each fix

### DON'T:
- Refactor code
- Add new features
- Change architecture
- Use `any` type (unless absolutely necessary)
- Add `@ts-ignore` comments
- Change business logic

## Common Error Fixes

| Error | Fix |
|-------|-----|
| Type 'X' is not assignable to type 'Y' | Add correct type annotation |
| Property 'X' does not exist | Add property to interface or fix property name |
| Cannot find module 'X' | Install package or fix import path |
| Argument of type 'X' is not assignable | Cast or fix function signature |
| Object is possibly 'undefined' | Add null check or optional chaining |

## Verification Steps

After fixes:
1. `npm run build` - should succeed with zero errors
2. `npm run lint` - should pass

---

**IMPORTANT**: Focus on fixing errors only. No refactoring, no improvements, no architectural changes. Get the build green with minimal diff. Never run `npm test` (no test runner installed).
