# Development workflow

## Sources of truth

1. `AGENTS.md` for boundaries and workflow.
2. The approved feature checklist and frozen acceptance test.
3. `docs/contracts/backend-api-v1.yaml` for HTTP interfaces.
4. `plan.md`, `CHECKLIST.md`, and `docs/VERIFIED_CONTENT.md`.
5. Existing implementation conventions and tests.

Stop when sources conflict. Never infer content or contracts from a mockup, placeholder, or unfinished component.

## Definition of Ready

A material change needs identified ownership and consumers, inspected evidence, scope/exclusions, API effects, publication behavior, loading/empty/error states, verified content sources, accessibility criteria, observable acceptance criteria, compatibility, and rollback. Unknown facts, links, media rights, or backend fields remain unresolved.

## Approval-first TDD

Material behavior and contract changes require an approved feature checklist followed by an explicitly approved failing acceptance test. Confirm the expected failure, freeze the test, and implement against it. Test revisions require renewed approval. Documentation and behavior-neutral mechanical work may use ordinary review.

## Public-content rule

Only backend responses satisfying the published/current public contract may render as production content. Local modules are fixtures, placeholders, or explicitly approved outage essentials and must be labeled accordingly. API failures render explicit unavailable states; they do not silently promote draft fixtures.

## Definition of Done

Tests, lint, contract checks, and build pass; public filtering and failure states are covered; accessibility and responsive behavior are verified when affected; the API snapshot is synchronized; no invented fact or unlicensed media was added; and documentation records remaining risks.
