# YNS D6 Community Website Plan

## Summary

Build a frontend-only, English, one-page community website for **Youth Nation Shakers District 6**, based in **Toledo City, Cebu**.

The website advertises the community and invites visitors to attend the weekly gathering:

- Every Sunday
- 10:00 AM–12:00 noon
- Venue: placeholder until confirmed
- Primary CTA: **Join us this Sunday**
- Contact destination: Facebook/Messenger placeholder until the official link is provided

The design takes structural inspiration from Street Level Ministries, especially its identity statement, weekly gathering information, leadership, and community-focused sections. It does not copy its content or visual assets.

## Planned Sections

The homepage uses anchor navigation with these sections:

1. **Hero** — YNS D6 name, welcoming statement, Sunday details, and the primary CTA.
2. **About YNS D6** — Community identity with temporary lorem placeholders for mission, vision, and core values.
3. **Weekly Gathering** — Sunday schedule, first-time visitor guidance, and a directory of eight approximate YNS D6 locations across Cebu with map previews and directions links.
4. **Stories** — Content-ready structure; publish only verified stories, testimonials, and photos.
5. **Leadership** — Content-ready structure; publish only verified names, roles, biographies, and photos.
6. **Contact** — Facebook/Messenger CTA, temporary placeholder destination, and future social links.
7. **Footer** — YNS D6 identity, location, anchor links, future social links, and basic copyright text.

### Gallery addition

The Gallery includes a homepage event-album preview and a full event index with responsive bento photo grids, stacked event thumbnails, dedicated event views, and an accessible lightbox/photo detail view with close and previous/next controls scoped to each event.

Missions, resources, an events calendar, news, membership forms, and CMS functionality are not part of the first release unless documented here later.

### Label clarity pass

The interface uses direct section labels instead of numbered metaphors. Repeated status, placeholder, and metadata labels should be consolidated so the main headings and actions carry the hierarchy. Temporary content remains unchanged.

## Implementation Rules

- Use React, Vite, Tailwind CSS, and shadcn/ui.
- Use the shadcn CLI for every shadcn component:

  ```bash
  npx shadcn@latest add <component>
  ```

- Never manually create or copy components inside `src/components/ui`.
- Import generated components through the `@/components/ui/...` alias.
- Use focused folders:

  ```text
  src/
    components/
      ui/          # shadcn-generated components only
      layout/      # header, navigation, footer
      sections/    # homepage sections
      common/      # reusable site components
    data/          # structured community content
    hooks/         # reusable React hooks
    lib/           # browser-facing integrations
    utils/         # pure helper functions
    assets/        # supplied logo and community photos
  ```

- Keep content separate from visual components using structured local data modules.
- Design the data boundary so editorial content can later be replaced by a CMS.
- Do not add backend code, authentication, database logic, custom forms, analytics, or server routes.
- Avoid god components. The page composes focused sections rather than containing all content and behavior in one file.
- Use supplied logo and community photos when provided. Do not invent branding assets, testimonials, leaders, or events.
- Use the existing brand colors once provided. Until then, use temporary design tokens clearly marked for replacement.
- Use English for the first release.
- Use a bold, youthful editorial design direction with strong typography, energetic composition, and mobile-first responsiveness.
- Keep the primary navigation fixed at the top while scrolling, with a compact visual state after the page moves away from the hero.
- Use a restrained load-in animation for the hero and scroll-triggered reveal animations for sections. Respect `prefers-reduced-motion` by disabling movement and showing content immediately.

## SEO and Accessibility

The first release must include:

- Descriptive page title and meta description
- Open Graph and Twitter card metadata
- Viewport, language, and canonical URL placeholder metadata
- Semantic page landmarks and one primary `h1`
- Descriptive image `alt` text
- Keyboard-accessible navigation and buttons
- Visible focus states, responsive layouts, and reduced-motion support
- Accurate structured data only when verified information is available

Pending information must use explicit placeholders rather than fabricated content.

## Documentation Gate

`plan.md` is the source of truth for the project.

Before implementing any feature:

1. Check whether the feature is documented in `plan.md`.
2. If it is not documented, stop and ask for clarification.
3. Update `plan.md` with the approved feature and decisions.
4. Only then implement the feature.

Future changes must preserve the frontend-only scope and shadcn CLI requirement.

## Current Pending Information

- Mission statement
- Vision statement
- Core values
- Gathering venue
- Exact coordinates or verified map pins for the eight temporary locations
- Facebook/Messenger URL
- Instagram or other social links
- Final brand colors
- Final logo and approved photo assets
- Verified leadership information
- Verified community stories or testimonials
- Final SEO description and social preview image
- Final hosting provider and domain

## Testing and Acceptance Criteria

- `npm run build` succeeds.
- `npm run lint` is run and new issues are addressed without manually modifying generated shadcn components.
- All navigation anchors work.
- The main CTA has a verified destination before public launch.
- The Sunday schedule is visible and accurate.
- Placeholder content is clearly distinguishable from final content.
- The layout works on mobile, tablet, and desktop.
- Images have appropriate alt text.
- Keyboard navigation works.
- Metadata is present and accurate.
- No undocumented features are added.

## Assumptions

- The audience is anyone interested in YNS D6; there is no defined age restriction.
- The primary conversion goal is attending the Sunday gathering.
- Content is initially maintained by a developer through local data files.
- A CMS may be added later, but no CMS is implemented in v1.
- The site remains deployment-agnostic and suitable for static hosting.
- Official links and factual content are supplied before public launch.
