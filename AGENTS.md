# Community Website Project Rules

## Active frontend-only agreement

- Follow the user's frontend-only scope and [shared frontend rules](../docs/rules/README.md). Do not modify the backend or move authoritative security into this client.
- Keep JSX focused on UI; extract reusable hooks, services, data preparation, and form orchestration. Keep files short through clear responsibilities and reuse, not compressed formatting.
- For implementation use [YNS frontend architecture](.agents/skills/yns-frontend-architecture/SKILL.md); for UI composition use [YNS shadcn UI](.agents/skills/yns-shadcn-ui/SKILL.md); for review/verification use [YNS frontend verification](.agents/skills/yns-frontend-verification/SKILL.md). Read only the relevant skills.

## Workspace rules and required reading

- Before editing, read this file and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md), plus any feature or content documents required below.
- When this repository is part of the YNS workspace, also read [the shared rules index](../docs/rules/README.md), [architecture rules](../docs/rules/architecture.md), and [approval rules](../docs/rules/approvals.md). Read [testing rules](../docs/rules/testing.md) before changing behavior or choosing verification.
- These workspace links are documentation references, not application dependencies. In an independent checkout where they are absent, follow the local policies in this file and the development guide; report the missing workspace context for cross-application work.
- Keep future detailed shared procedures in the workspace rules folder and update its index. Retain essential local policies for standalone use; report material conflicts instead of assuming an exception.

## Project purpose

- This is a frontend-only React/Vite website for advertising and representing a Christian community of young people who follow Jesus.
- This is the public, read-only client of the shared backend API. CMS-managed content such as photos and events must be retrieved from the backend API once the integration is implemented.
- The site should feel welcoming, hopeful, honest, modern, and Christ-centered.
- Keep content respectful and accessible to people who are curious about the community, regardless of their current level of faith.
- Do not add a backend, database, authentication system, server routes, payment processing, or other server-side product functionality inside this application. Use the shared backend API for remote content.

## Technology rules

- Use React with Vite, JavaScript/JSX, Tailwind CSS, and shadcn/ui.
- Prefer the existing project dependencies and patterns before introducing a new dependency.
- Keep the application client-side and suitable for a static frontend deployment.
- Read public content through dedicated API/service modules using environment-configured API URLs; never access the CMS source or database directly.
- Render published content only and provide meaningful loading, empty, unavailable-API, and error states for remote content.
- Use Tailwind utility classes for styling. Keep custom CSS limited to global tokens, typography, resets, animations, and styles that cannot be expressed clearly with utilities.

## shadcn/ui rules

- Use the shadcn CLI for every shadcn component:

  ```bash
  npx shadcn@latest add <component>
  ```

- Never manually create a shadcn component in `src/components/ui`.
- Never manually copy shadcn component source from documentation or another project.
- Import generated components from their project alias, for example:

  ```jsx
  import { Button } from "@/components/ui/button"
  ```

- Before adding a custom UI primitive, check whether shadcn already provides the required component.
- Keep generated shadcn primitives in `src/components/ui`. Compose them in other component folders instead of modifying their generated implementation.
- If a generated component needs behavior or styling specific to this site, wrap or compose it outside `src/components/ui`.
- Use the shadcn CLI for updates or additional components as well as initial installation.

## Component architecture

- Every component should have one clear responsibility and a small, understandable public interface.
- Avoid god components. Page components should compose sections and pass data/handlers; they should not contain all markup, styling, state, content, and utilities in one file.
- Split a component when it has multiple independent visual sections, complex conditional branches, reusable logic, or becomes difficult to scan.
- Prefer composition and data-driven rendering over deeply nested conditional JSX.
- Keep components focused on presentation and React behavior. Move reusable non-visual logic into the appropriate library, hook, utility, or data module.
- Use dedicated folders for reusable components:

  ```text
  src/
    components/
      ui/          # shadcn-generated primitives only
      common/      # reusable site-wide visual components
      layout/      # header, footer, navigation, page shells
      sections/    # reusable marketing sections
      pages/       # page-level composition only, when needed
    hooks/         # reusable React hooks
    lib/           # browser-facing libraries, integrations, and adapters
    utils/         # pure helpers such as formatting and validation
    constants/     # shared static values and configuration
    data/          # temporary fixtures/placeholders only; production content comes from the API
    assets/        # images, icons, and other imported assets
  ```

- Do not place hooks, utility functions, data, or service code inside visual component files unless it is truly local and trivial.
- Keep API calls, response mapping, and remote-content state outside visual components where they can be reused and tested.
- Use the `@/` alias for imports from `src`.
- Keep page-specific components close to their page when they are not reusable elsewhere.

## Content and visual direction

- Prioritize clear calls to action such as learning more, joining a gathering, connecting with the community, or attending an event.
- Keep copy concise, warm, transparent, and free of manipulative urgency or exaggerated spiritual promises.
- Use real community information and real links. Do not invent testimonials, events, locations, ministries, statistics, or claims.
- Treat people and faith-related content with dignity. Avoid stereotypes, shame-based language, and exclusionary assumptions.
- Design mobile-first and ensure the experience works well across phone, tablet, and desktop sizes.

## SEO and discoverability

- Treat SEO as part of every public page, not as a final polish step.
- Every page needs a unique, descriptive title and meta description aligned with its visible content.
- Include the essential document metadata: language, viewport, canonical URL when known, Open Graph metadata, and Twitter card metadata.
- Use semantic HTML landmarks and a logical heading hierarchy. Use one primary `h1` per page.
- Give informative images meaningful `alt` text; use empty alt text for purely decorative images.
- Use descriptive link text instead of vague labels such as “click here.”
- Add structured data only when the content is accurate and supported by the page, such as Organization, Event, or WebSite JSON-LD.
- Keep URLs, titles, descriptions, social preview images, and visible page copy consistent.
- Avoid duplicate metadata, keyword stuffing, hidden text, and claims intended only to manipulate search rankings.
- For multiple client-rendered pages, use a consistent head-management approach and keep page metadata with the page definition.

## Accessibility and quality

- Use semantic HTML before adding ARIA. Add ARIA only when native semantics are insufficient.
- Ensure keyboard access, visible focus states, sufficient color contrast, reduced-motion support, and usable touch targets.
- Do not use color as the only way to communicate meaning.
- Provide accessible labels for icon-only buttons and meaningful loading, empty, and error states where applicable.
- Optimize images and avoid unnecessary client-side work, large bundles, and layout shifts.

## Change and verification rules

- Make the smallest focused change that satisfies the request.
- Do not rewrite unrelated existing styles, content, or components.
- Before adding a dependency, explain why an existing dependency or browser API is insufficient.
- After meaningful changes, run the relevant checks, at minimum `npm run build`; run `npm run lint` when the current lint baseline allows it.
- Do not add backend or server-side code under the assumption that it may be useful later; backend changes belong in `backend/`.

## Evidence-first, risk-based workflow

- This repository must be safe when checked out independently. Resolve guidance in this order: the user's current instructions and existing authorization, this `AGENTS.md`, the applicable feature record and acceptance criteria, the vendored OpenAPI contract snapshot, `plan.md`/`CHECKLIST.md`, then existing code conventions. Historical feature records preserve past decisions; their old approval gates do not override the current approval policy. Report material contradictions instead of guessing.
- Inspect current code, tests, lockfiles, environment examples, and contracts before proposing implementation. Record verified facts separately from assumptions.
- For substantial features and crucial changes, document evidence, scope, consumers, acceptance criteria, tests, risks, and rollback in a feature record. Routine safe work does not need a separate record. Follow the risk-based approval policy below; no separate test approval is required unless the user requests it. Never weaken tests merely to make implementation pass; material changes to approved outcomes require renewed approval.
- Documentation and demonstrably behavior-neutral mechanical changes may use ordinary review and verification.
- Never invent endpoints, response fields, community facts, publication status, links, consent, licensing, deployment values, or package APIs.
- If a required tool, skill, or documentation source is unavailable, disclose it and use repository evidence plus official documentation. Never fabricate results.
- Work is complete only when relevant tests, lint, and build checks pass; API snapshots are synchronized when applicable; public unpublished-content boundaries are tested; and documentation and remaining risks are current.

## Risk-based approval policy

- Safe actions are pre-authorized within the user's requested scope. Proceed without asking for a checklist approval or separate test approval.
- Safe actions include reading files and documentation, repository searches, read-only Git inspection, read-only local diagnostics, planning, and drafting reviewable proposals or patches without applying crucial changes to implementation files. Avoid exposing secrets in diagnostic output.
- Also proceed with documentation updates, creating or editing relevant frontend tests, running local tests/lint/typecheck/build/contract validation, and reversible frontend UI, styling, accessibility, or refactoring work that preserves existing API contracts and security behavior. Verification must use local or isolated test resources, not mutate shared or production data.
- Routine local frontend configuration changes, such as assigning development ports, are safe only when they do not broaden network exposure or change backend trust, authentication, or deployment settings. Restoring locked dependencies is safe; adding, removing, or upgrading dependencies requires approval.
- Obtain explicit approval before deleting existing project files or tests; destructive Git operations; changing API endpoints, methods, payloads, schemas, or contracts; changing backend implementation, tests, dependencies, configuration, migrations, jobs, storage, or persisted data; or changing authentication, authorization, CORS/CSRF, secrets, publication rules, or privacy boundaries in any application.
- Also obtain approval before deployments, production configuration changes, publishing, external writes or messages, or actions with irreversible effects. Creating/editing backend documentation and reading backend files are safe; exercising existing APIs read-only is safe when it does not expose private information or change data.
- Approval already given for an exact action or clearly bounded scope remains valid. An explicit instruction to perform a crucial action counts as authorization for that stated action; a broad goal does not authorize incidental destructive or backend changes. Do not ask again unless the scope or risk materially changes.
- Before requesting approval, complete all safe preparation and present the concrete affected files/actions, acceptance criteria or test plan, risks, and rollback. One approval may cover that entire bounded change; do not impose a second test-approval gate unless the user requests it.
- Cleanup of temporary artifacts created by the agent during the current task is safe when confined to the verified task location and cannot remove pre-existing files. Other file deletion requires approval.
- This policy does not override tool, sandbox, network, or operating-system restrictions. Use the normal sandbox first. If escalation is required, explain the actual restriction or error rather than implying that ordinary reading needs project approval.
