# Community Website Project Rules

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

- This repository must be safe when checked out independently. Resolve guidance in this order: this `AGENTS.md`, an approved feature checklist and frozen acceptance test, the vendored OpenAPI contract snapshot, `plan.md`/`CHECKLIST.md`, then existing code conventions. Stop and report contradictions instead of guessing.
- Inspect current code, tests, lockfiles, environment examples, and contracts before proposing implementation. Record verified facts separately from assumptions.
- Behavior, API, data, security, publication, dependency, and runtime-configuration changes require an approved feature checklist and an explicitly approved failing acceptance test. Freeze the approved test before implementation.
- Documentation and demonstrably behavior-neutral mechanical changes may use ordinary review and verification.
- Never invent endpoints, response fields, community facts, publication status, links, consent, licensing, deployment values, or package APIs.
- If a required tool, skill, or documentation source is unavailable, disclose it and use repository evidence plus official documentation. Never fabricate results.
- Work is complete only when relevant tests, lint, and build checks pass; API snapshots are synchronized when applicable; public unpublished-content boundaries are tested; and documentation and remaining risks are current.
