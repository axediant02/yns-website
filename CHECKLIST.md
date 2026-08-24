# YNS D6 Website Checklist

This is the working checklist for the YNS D6 community website. Use it to decide what to build next and to keep completed work visible.

When a new feature is requested, update this file first with the approved scope and acceptance checks. Keep the checklist updated in the same change as the implementation.

Status: `[x]` complete · `[ ]` pending · `[~]` intentionally placeholder or waiting for verified content

## Current page map

- [x] Hero — welcome message, YNS D6 identity, Sunday details, and primary CTA.
- [x] About YNS D6 — community identity, pillars, mission, vision, and core values.
- [x] Weekly Gathering — Sunday schedule, multi-location directory, map previews, and first-time guidance.
- [x] Location directory — eight approximate Cebu locations with directions links.
- [x] Gallery preview — responsive event-album preview with stacked thumbnails.
- [x] Full Gallery — dedicated `#gallery-all` event index with event-specific photo views.
- [x] Stories — content-ready cards for verified community stories.
- [x] Leadership — content-ready cards for verified leaders and community voices.
- [x] Contact — contact CTA with a disabled state until the official link is available.
- [x] Footer — identity, navigation links, gathering details, and copyright text.
- [x] Label hierarchy — direct section labels with consolidated status and metadata copy.

- [~] Location pages — route scaffold and shared layout are ready; verified local content is pending.

## Homepage sections

### Hero

- [x] Show “Find your people. Follow Jesus.” headline.
- [x] Show Toledo City, Cebu context.
- [x] Show Sunday gathering day and location details.
- [x] Link “Join us this Sunday” to the Gathering section.
- [x] Link “Get to know us” to the About section.
- [x] Include restrained entrance animation.
- [x] Respect reduced-motion preferences.

### About

- [x] Explain the community in welcoming, accessible language.
- [x] Show the three identity pillars.
- [x] Show temporary lorem mission content.
- [x] Show temporary lorem vision content.
- [x] Show temporary lorem core value content.
- [~] Replace temporary lorem content with approved mission, vision, and core values.

### Weekly Gathering

- [x] Show weekly day: Every Sunday.
- [x] Show weekly time: 10:00 AM–12:00 noon.
- [x] Show location: Toledo City, Cebu.
- [~] Replace “Venue details coming soon” with the verified venue.
- [x] Show who the gathering is for.
- [x] Show first-time visitor guidance.
- [x] Link “Ask a question” to Contact.
- [x] Show all eight temporary YNS D6 locations.
- [x] Show a map preview and directions link for each location.
- [~] Replace approximate location searches with verified venue names and map pins.

### Gallery

- [x] Show event album previews in the homepage flow.
- [x] Use stacked thumbnail imagery for each event group.
- [x] Use responsive bento layouts on desktop, tablet, and mobile.
- [x] Show “Go to gallery” CTA.
- [x] Show “See all photos” CTA.
- [x] Open the dedicated gallery through `#gallery-all`.
- [x] Provide a “Back to home” action.
- [x] Update document title and description for the event index and selected event view.
- [x] Support browser back/forward behavior for the gallery and event hash views.
- [x] Keep lightbox previous/next navigation scoped to the selected event.
- [x] Use 16 illustrative stock images across event albums while approved YNS D6 photos are unavailable.
- [~] Replace stock images with approved community photos before public launch.
- [ ] Confirm image licensing/attribution requirements for final photo assets.

### Stories

- [x] Provide a clear structure for story cards.
- [x] Use honest placeholder copy until stories are verified.
- [~] Add approved stories, testimonials, or reflections.
- [ ] Add an approved story submission destination if the community wants submissions.
- [ ] Add final story photos only with permission and descriptive alt text.

### Leadership

- [x] Provide a leadership section structure.
- [x] Use placeholder state for unverified information.
- [~] Add verified leadership names.
- [~] Add verified roles and biographies.
- [~] Add approved leadership photos and alt text.

### Contact

- [x] Show a clear contact CTA.
- [x] Keep the CTA disabled while the official destination is unknown.
- [~] Add the verified Facebook/Messenger URL.
- [ ] Add approved Instagram or other social links.
- [ ] Verify that all public contact links open the intended destination.

### Footer

- [x] Show YNS D6 identity and Toledo City, Cebu location.
- [x] Provide anchor links to homepage sections.
- [x] Include gathering time and location.
- [x] Include copyright text.
- [ ] Add verified social links when available.

## Location pages

### Page structure

- [x] Create location-specific URLs such as `/locations/bato-toledo-city`.
- [x] Add location selection to the desktop and mobile navigation.
- [x] Close the location dropdown after selection.
- [x] Show a location-specific page shell with map, schedule, and CTA.
- [ ] Replace draft location-page copy with approved local content.
- [x] Add a unique title and meta description for every location page.
- [ ] Add a canonical URL strategy for location pages after the final domain is confirmed.
- [ ] Add location-specific Open Graph metadata when final social preview assets are available.
- [x] Show a useful not-found state for invalid location URLs.

### Required information for every location

- [ ] Verify the location name.
- [ ] Verify the city or municipality.
- [ ] Verify the exact venue name.
- [ ] Verify the complete public address.
- [ ] Verify the Google Maps pin or directions query.
- [ ] Verify the weekly gathering day.
- [ ] Verify the weekly gathering time.
- [ ] Verify arrival, parking, access, or meeting-point instructions.
- [ ] Verify the local contact person or official contact link.
- [ ] Approve the short local welcome message.
- [ ] Approve descriptive image alt text if local photos are added.

### Location content matrix

- [ ] Bato â€” Toledo City, Cebu
- [ ] Mainggit â€” Toledo City, Cebu
- [ ] Nangka â€” Balamban, Cebu
- [ ] Bairan â€” Asturias, Cebu
- [ ] Camp 3 â€” Talisay, Cebu
- [ ] Minolos â€” Matab-ang, Toledo City, Cebu
- [ ] Ylaya â€” Toledo City, Cebu
- [ ] Pandacan â€” Pinamungajan, Cebu

### Location events and photos

- [x] Add a location-specific photo timeline to each location page.
- [x] Filter future real events by `locationIds`.
- [x] Reuse the accessible photo lightbox for location photos.
- [x] Show a clearly labeled illustrative preview until real local albums are available.
- [ ] Add verified event names and dates for each location.
- [ ] Add approved local event photos for each location.
- [ ] Confirm photo permissions, licensing, and community consent.
- [ ] Add descriptive alt text for every approved local photo.
- [ ] Sort verified local events newest first.
- [ ] Show an empty state when a location has no verified event photos.

### Optional enhancements

- [ ] Add one approved local gathering photo.
- [ ] Add a verified local leader or coordinator.
- [ ] Add local accessibility or transportation notes.
- [ ] Add a location-specific FAQ only when real recurring questions are known.
- [ ] Add location-specific events only after event details are verified.
- [ ] Add local gallery albums only with approved community photos and permissions.

### Acceptance checks

- [x] Selecting a location updates the URL and page content without a full reload.
- [x] The selected location is visibly identified in the navigation.
- [ ] Every location page displays verified venue and schedule information.
- [ ] Every map and directions link points to the correct location.
- [x] Every page has one clear `h1`.
- [ ] Every page works on phone, tablet, and desktop.
- [ ] No invented venue, leader, event, testimonial, or community claim is published.
- [ ] Draft placeholders are removed before public launch.

## Full gallery event groups

- [x] Show a `Youth Camp 2026` event group.
- [x] Show neutral `Event album coming soon` placeholder groups.
- [x] Make each event group open its dedicated event photo view.
- [x] Show three stacked cover thumbnails per event group.
- [x] Provide all event photos in the dedicated event view.
- [x] Add descriptive alt text to every gallery image.
- [x] Lazy-load gallery images and use async decoding.
- [x] Support responsive bento spans for standard, wide, and tall cards.
- [x] Add an accessible lightbox/photo detail view with previous/next controls.
- [ ] Add pagination or load-more behavior only if the final gallery grows beyond the first curated set.

## Navigation and interactions

- [x] Keep the primary navigation fixed at the top.
- [x] Add compact scrolled-header styling.
- [x] Provide a mobile navigation menu.
- [x] Close the mobile menu after navigation.
- [x] Keep navigation links descriptive and anchor-based.
- [x] Keep the primary “Join us” CTA visible in the header.
- [x] Add scroll-triggered section reveals.
- [x] Respect `prefers-reduced-motion`.
- [x] Keep event index and event detail navigation stateful through URL hashes.
- [x] Reduce repeated section, status, and placeholder labels without changing page scope.

## Content and brand readiness

- [~] Mission statement verified.
- [~] Vision statement verified.
- [~] Core values verified.
- [~] Gathering venue verified.
- [~] Eight location names, venue details, and map pins verified.
- [~] Facebook/Messenger URL verified.
- [ ] Instagram and other social URLs verified.
- [ ] Final brand colors approved.
- [ ] Final logo/brand assets supplied and approved.
- [ ] Final community photo assets supplied and approved.
- [~] Leadership information verified.
- [~] Community stories/testimonials verified.
- [ ] Final SEO description approved.
- [ ] Social preview image supplied and approved.
- [ ] Final domain and hosting details confirmed.

## SEO and accessibility

- [x] Set document language and viewport metadata.
- [x] Include title and meta description metadata.
- [x] Include canonical, Open Graph, and Twitter metadata placeholders.
- [x] Use semantic page landmarks.
- [x] Keep one primary `h1` per rendered view.
- [x] Add meaningful alt text to informative images.
- [x] Hide decorative visual elements from assistive technology where appropriate.
- [x] Provide keyboard-accessible navigation and buttons.
- [x] Preserve visible focus styles from the UI system.
- [x] Support reduced-motion preferences.
- [ ] Replace placeholder canonical URL with the final domain.
- [ ] Verify metadata and social preview content against the final public copy.
- [ ] Add structured data only after Organization/Event details are verified.

## Quality and release checks

- [x] `npm run build` passes.
- [x] `npm run lint` passes.
- [ ] Manually test homepage anchors on desktop.
- [ ] Manually test homepage anchors on mobile.
- [ ] Manually test `#gallery-all` and browser back/forward behavior.
- [ ] Manually test event album cards, dedicated event views, and back navigation.
- [ ] Manually test keyboard navigation and focus visibility.
- [ ] Manually test reduced-motion behavior.
- [ ] Test layout at phone, tablet, and desktop widths.
- [ ] Check external image loading and replace any failed URLs.
- [ ] Confirm all factual public content before launch.
- [ ] Confirm the primary CTA has a verified destination before launch.

## Scope guardrails

- [x] Keep the project frontend-only and suitable for static hosting.
- [x] Keep content in local data modules until a CMS is explicitly approved.
- [x] Use React, Vite, Tailwind CSS, and shadcn/ui.
- [x] Keep generated shadcn primitives in `src/components/ui`.
- [ ] Do not add backend routes, databases, authentication, payments, or CMS functionality without explicit approval.
- [ ] Do not publish invented events, leaders, testimonials, locations, statistics, or community claims.
- [ ] Do not add an events calendar, news system, resources hub, or membership flow unless added to this checklist first.

## Change log

- 2026-08-24 — Added location-specific photo timelines, illustrative preview rules, and event-photo verification checks.

- 2026-08-24 — Added the location-page content plan, verification matrix, optional enhancements, and acceptance checks.

- 2026-08-22 — Added the responsive Gallery preview, full gallery view, Kids/Youth categories, bento grids, and gallery CTAs.
- 2026-08-22 — Added the accessible gallery lightbox with close, previous/next, and keyboard arrow controls.
- 2026-08-22 — Added active Kids/Youth gallery category navigation that updates while scrolling.
- 2026-08-22 — Approved replacing Kids/Youth gallery categories with event-based albums and dedicated event views.
- 2026-08-22 — Implemented event-based gallery albums with stacked thumbnails and event-scoped photo lightboxes.
- 2026-08-22 — Created this checklist as the ongoing guide for page scope, feature status, content readiness, and release checks.
- 2026-08-23 — Added temporary lorem mission, vision, and core value content to the About section.
- 2026-08-23 — Added the eight-location directory with map previews and directions links.
- 2026-08-23 — Simplified section labels and consolidated repeated UI status copy.
