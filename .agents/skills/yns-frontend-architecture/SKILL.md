---
name: yns-frontend-architecture
description: "Implement or refactor YNS CMS and public website frontend code with focused UI components, reusable hooks/services, stable data models, and efficient requests. Use for frontend structure and behavior changes; excludes backend implementation."
---

# YNS frontend architecture

Work inside the affected frontend repository. Read its `AGENTS.md`, development guide, relevant feature record, and shared architecture rules if present. Preserve CMS React/strict TypeScript and website React/JavaScript; references to composables mean the equivalent hooks in this stack.

## Separate responsibilities

- Keep page/component files focused on UI and composition. Extract substantial form coordination, timers, subscriptions, and query state into hooks; transport and response mapping into API services; pure preparation into utilities/libraries.
- Keep feature-specific code beside its feature. Promote code to shared folders when reuse is real or separation materially clarifies the current component.
- Put editable UI content and configuration in named content/constants modules. Production community records come from the API; do not introduce invented content or local fixtures as production data.
- Aim for short, readable files with one responsibility. Split independent sections or behavior; do not minify code, add forwarding wrappers, or over-generalize merely to shrink a file.
- Preserve public interfaces and existing behavior during structural work. Reuse regression tests; add tests for new important behavior rather than file shape.

## Request and render work

- Fetch at the collection boundary through existing services and cache/query infrastructure. Reuse collection results in children; do not fetch per row, repeat identical calls, or send requests during render.
- Use only existing pagination/bulk contracts. Report backend N+1 or missing API capabilities without changing backend code or inventing an endpoint.
- Prepare stable offsets, lookup maps, and display models once when practical. Avoid repeated prefix scans and unnecessary work on inactive content.
- Keep effect dependencies stable, clean up subscriptions/timers, and avoid self-triggering effect cycles. Intentional typing loops and ordinary list rendering are allowed.
- Memoize specific repeated work when justified; preserve clarity and correctness first.

The backend remains authoritative for authentication, permissions, publication, and sensitive validation. Frontend checks support navigation and feedback. Do not change backend files, contracts, security behavior, or credential handling under this skill.

Finish with affected tests, lint, CMS typecheck, and build. Keep the diff scoped and report unavailable verification honestly.
