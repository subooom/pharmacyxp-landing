# AGENTS.md: MedicineXP landing site

Next.js (app router, Turbopack) marketing site + pharmacy sign-up (`/get-started`) for MedicineXP.
Backend: `../server` (Laravel `/api`). Rep app: `../medicinexp-affiliates`.

## Hard rules
- Git here needs `git -c safe.directory=*` (dubious ownership on this drive).
- PRs go into `main` (no `production` branch).
- The owner keeps unrelated work uncommitted (rack survey: `OnboardingWizard.tsx`,
  `RackQuoteCalculator.tsx`, `package.json`, `yarn.lock`, `(landing)/page.tsx`): stage files by
  name, never `git add -A`.
- Sign-up must stay usable at 375px width (no sideways scroll on any step).

## agents/ directory: read only what you need
| File | Read when |
|---|---|
| `agents/overview.md` | Where things live, the sign-up flow, commands, gotchas |
| `agents/log.md` | What changed recently (newest first). **Append a line when you finish work.** |
| `../server/agents/decisions.md` | Business rules (codes, invites, earning model) |
