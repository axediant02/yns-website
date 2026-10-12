---
name: yns-frontend-verification
description: "Review and verify YNS frontend changes for behavior, component boundaries, API compatibility, request/render efficiency, accessibility, and regression coverage. Use after meaningful UI or structural changes, or for requested frontend reviews; excludes backend security audits."
---

# YNS frontend verification

Read the affected repository's `AGENTS.md`, development guide, and relevant acceptance criteria. Inspect the actual diff and preserve pre-existing edits.

## Review the changed surface

- Confirm changes stay in frontend code/documentation and preserve existing API endpoints, payloads, session behavior, publication/privacy boundaries, and generated shadcn primitives.
- Check UI files for embedded transport, repeated form/timer logic, duplicated styling, unnecessary abstractions, and independent responsibilities that should be split.
- Check for requests in render/per-item loops, duplicate subscriptions, unstable effects, repeated prefix scans, inactive content rerenders, and missing cleanup.
- Confirm authoritative security stays in the backend. Keep client navigation/visibility/validation as user-experience feedback; never claim they enforce permissions.
- Check labels, keyboard/focus behavior, responsive wrapping, themes, loading/error/empty/success states when affected, and reduced-motion fallbacks.
- Do not fix unrelated or backend findings automatically; report the concrete dependency or propose a scoped frontend change.

## Verify and report

- Reuse relevant tests for structural refactors. Add meaningful behavior tests when a regression or important new state needs coverage.
- CMS: affected tests, lint, typecheck, build. Website code: affected tests, lint, build. Run contract checks when contract tooling or mapping is affected.
- On this Windows workspace use `npm.cmd` / `npx.cmd` if `.ps1` wrappers are blocked. Use Vite's `--configLoader native` for the known config-bundling restriction; use Vitest `--pool threads` when process workers are restricted.
- Use only available browser capabilities and local/isolated resources for visual checks. A build or DOM test does not prove appearance; never submit real credentials or mutate shared data to verify UI.
- Check diff whitespace and final scope. Distinguish passing checks, baseline failures, missing tools, and backend dependencies.
- Skill/rule files guide decisions; they do not replace the environment's permissions or enforce server security.
