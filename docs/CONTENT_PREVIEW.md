# Unsaved CMS content preview

The CMS edits content at `/content`. Its embedded frame loads this website's `/cms-preview` page. The website owns starting content, field descriptions, templates, fonts, and styles. The full homepage template is retained for authoring previews and future public API rendering. The public homepage currently shows unavailable states instead of local content because its public contents endpoint/schema is missing. Neither frontend imports sibling source code.

## Setup

Run `npm.cmd run dev -- --configLoader native` in both frontend repositories. Development defaults use the existing ports: CMS 5173 and website 5174. Example environment files document:

- CMS: `VITE_WEBSITE_PREVIEW_URL=http://localhost:5174/cms-preview`
- Website: `VITE_CMS_PREVIEW_ORIGIN=http://localhost:5173`

Set both explicitly for production builds; no production defaults exist. Use an exact CMS origin without a path, query, or fragment, and the website URL with exactly `/cms-preview`. Hostnames must match consistently: `localhost` and `127.0.0.1` are different origins. Static hosting must serve the website SPA for `/cms-preview`. Backend/API origins, authentication, and sessions are unchanged.

## Browser-message interface, version 2

Messages include `channel: 'yns-editor-preview-v2'` and a `session` identifier generated for the editor. Both sides check exact configured origins and window sources. The website accepts messages only from its embedding parent. No wildcard target origins are used. Both frontends must use version 2; version-1 messages do not update this preview.

| Direction | Type | Extra fields | Purpose |
| --- | --- | --- | --- |
| CMS to website | `hello` | — | Start connection. |
| Website to CMS | `ready` | `catalog` | Supply fields and current local website values. |
| CMS to website | `render-site` | `requestId`, `active`, `patches` | Render all current drafts in the complete website and locate the selected section. |
| Website to CMS | `rendered` | `requestId` | Acknowledge the committed preview. |
| Website to CMS | `invalid` | `requestId` | Reject malformed input. |

Catalog modules have `id`, `label`, `mode` (`singleton` or `collection`), `notice`, `fields`, and `records`. Fields have `key`, `label`, `type`, and optional `required`. Types are `text`, `textarea`, `link`, `image`, `photos`, and `datetime-local`. Records have `id`, `label`, and string-valued `values`. Photo values are a JSON string containing an ordered array of `{ src, alt, title, size }`; other existing photo metadata is ignored by rendering. Existing location values also carry a validated `locationId` for timeline context. Duplicate locations copy editable fields without album associations. Dates use Asia/Manila. This is a preview interface, not a persisted API schema.

`active` contains `{ moduleId, recordId, view, scrollRevision }`. `recordId` is a record identifier or null when no item exists. `view` is `section` or `detail`. `scrollRevision` is a nonnegative safe integer that changes on explicit selection/locate actions, not text edits. `patches` is an array of `{ moduleId, recordId, values }` for every changed existing record and every new/duplicated collection item. Untouched records come from the website's own catalog. A snapshot is validated atomically: unknown modules/selected records, duplicate record patches, malformed values, and extra singleton records are rejected. Up to 300 patches are accepted per snapshot.

CMS updates debounce for 250 ms. Connection attempts stop after 10 seconds; render acknowledgments time out after 5 seconds. Reconnect remounts the frame. Superseded acknowledgments are ignored. Listeners and timers are cleaned up on unmount.

## Content and privacy boundaries

- The route starts empty, has no public navigation entry, and adds `noindex, nofollow, noarchive`. It does not retrieve private or saved drafts.
- Draft transport uses browser messages, not query strings, storage, logs, or API requests. It sends no backend credentials. The correlation session identifier is not authentication. External image/map resources load as they do on the website.
- Values render as text. Links accept HTTPS, site paths, or anchors; images accept HTTPS. Unsafe links/media are removed before rendering. Preview clicks cannot navigate away; the frame allows no popups or top navigation.
- The full homepage retains every section and record, with all unsaved patches applied together. Selecting homepage content scrolls the iframe window to its section or card. Text edits preserve scroll and internal page navigation. The CMS exposes Go to selected section to return to the active edit target. Scrolling respects reduced motion and does not move the CMS window.
- Events selection opens the real full Events page. Location/album editors offer explicit detail-page actions and return-to-homepage actions. Preview website links navigate between home, gallery, album, location, and event pages using local state without changing browser URLs/history or losing drafts. External destinations remain blocked. The frame stays mounted while fields/page state change.
- Shared gathering values update the homepage, detail pages, and footer; edited location names/areas update the directory and menus. Hero day text follows the gathering day unless separately edited. This preview does not simulate backend publication rules. Reveal transitions remain disabled so long sections are visible inside the frame.
- Current placeholder mission/vision, stories/leaders, approximate locations, and illustrative photos retain verification notices. Copying does not approve or publish them.
- Drafts survive section/item switching, but refresh or navigation loses them. Save, Publish, and uploads require backend contracts and implementation. Authenticated persisted-draft access is not implemented.

Update descriptors, mapping/validation, and parity tests together when changing a website template. Deploy matching version-2 frontends together. OpenAPI snapshots remain unchanged.
