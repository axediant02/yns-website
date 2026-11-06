# Feature Checklist: Homepage events section

- Date: 2026-11-06
- Status: Complete (placeholder content)
- Request: Add an events section to the home page with three event cards showing a poster or image and the event details.
- User decisions: public website home page; placeholder cards only; branded placeholder art for posters.
- Authorization: Direct user instruction; reversible frontend UI work. No backend, contract, dependency, or API changes.

## Evidence

- `App.jsx` renders `components/pages/home-page.jsx` as the live home page. The section is placed after Gathering and before Gallery.
- The CMS event record (backend `ContentFields`, CMS contract `content-1`) has `title`, `description`, `startsAt`, `endsAt`, and `location`. Times are `YYYY-MM-DDTHH:mm` in Asia/Manila.
- **Backend gap:** there is no event poster/image field and no event file upload. Real posters require a backend contract change.
- The website has no public content client yet, and its contract snapshot (`dashboard-1`) does not include `GET /api/v1/public/content`.

## Implementation

- `data/upcoming-events.js`: three clearly labelled placeholder fixtures mirroring the contract fields, plus `kind`, `tone`, and `poster: null`. No invented titles, dates, venues, or locations.
- `components/sections/events-section.jsx`: heading, three cards (accepts an `events` prop and shows at most three), a placeholder notice, and a `See all events` link to `/events`.
- `components/common/event-card.jsx` and `event-poster.jsx`: poster image when provided (with alt text), otherwise decorative branded art. The date badge shows month/day or `TBA`; the details show the date/time and location, or "to be confirmed".
- `utils/event-schedule.js`: shared Philippine-time formatting. `event-details.jsx` now uses it, with unchanged output.
- No Event JSON-LD is added, because the details are not verified.

## Verification

- New: `events-section.test.jsx` (placeholder labelling and no invented facts; real data, poster alt text, and the three-card limit) and `event-schedule.test.js`. All 4 tests pass.
- Build passes; lint passes for all touched files.
- Pre-existing, unrelated: 9 failing tests in `public-homepage.test.jsx`/`preview.test.jsx`, 5 lint errors in `events-page.jsx`/`location-page.jsx`, and an intermittently failing `renders gathering seed content` test (also fails on the unmodified baseline).
- Headless Chrome at 1440, 820, 390, and 320px: no horizontal overflow; the tablet layout centres the third card.

## Follow-up

- Add a backend poster field and upload support (requires backend approval), then a public content service with loading, empty, and error states to replace the fixtures.

## Rollback

Remove the events section import/render from `home-page.jsx` and the new files; revert `event-details.jsx` and `home-content.js`.
