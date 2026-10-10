# Development workflow

## Shared workspace guidance

When working in the YNS workspace, follow the [shared rules index](../../docs/rules/README.md) alongside this repository's [AGENTS.md](../AGENTS.md). It defines required architecture, approval, and verification reading. In an independent checkout without workspace documents, the local policies below and `AGENTS.md` remain applicable.

## Sources of truth

1. `AGENTS.md` for boundaries and workflow.
2. The applicable feature record, authorization, and acceptance criteria.
3. `docs/contracts/backend-api-v1.yaml` for HTTP interfaces.
4. `plan.md`, `CHECKLIST.md`, and `docs/VERIFIED_CONTENT.md`.
5. Existing implementation conventions and tests.

Stop when sources conflict. Never infer content or contracts from a mockup, placeholder, or unfinished component.

## Definition of Ready

A material change needs identified ownership and consumers, inspected evidence, scope/exclusions, API effects, publication behavior, loading/empty/error states, verified content sources, accessibility criteria, observable acceptance criteria, compatibility, and rollback. Unknown facts, links, media rights, or backend fields remain unresolved.

## Risk-based approval and verification

Follow the approval policy in `../AGENTS.md`. Reads, research, read-only diagnostics, documentation, local verification, frontend tests, and reversible frontend work within the request proceed without extra approval. Routine local frontend configuration is safe when it does not affect network exposure, backend trust, authentication, or deployment.

Obtain approval for existing-file deletion, destructive Git operations, API or backend changes, security/publication/privacy changes, dependency additions/removals/upgrades, deployment, publishing, external writes, or irreversible effects unless the exact action or bounded scope is already explicitly authorized. Backend documentation and read-only backend inspection are safe. Tool permissions remain separate; report the actual restriction if escalation is needed.

For substantial features and crucial changes, record scope, evidence, acceptance criteria or test plan, risks, and rollback. Prepare a concrete proposal before asking. One approval covers the bounded implementation and its tests; there is no mandatory separate test approval. Use meaningful tests, confirm expected failures when practical, and never weaken tests just to pass. Renew approval only for material scope or risk changes.

## Public-content rule

Only backend responses satisfying the published/current public contract may render as production content. Local modules are fixtures, placeholders, or explicitly approved outage essentials and must be labeled accordingly. API failures render explicit unavailable states; they do not silently promote draft fixtures.

## Definition of Done

Tests, lint, contract checks, and build pass; public filtering and failure states are covered; accessibility and responsive behavior are verified when affected; the API snapshot is synchronized; no invented fact or unlicensed media was added; and documentation records remaining risks.
