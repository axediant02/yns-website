# YNS Public Website

Public, read-only React/Vite client for Youth Nation Shakers District 6. It is suitable for static deployment and may render only published content returned by the backend API.

## Requirements and setup

- Node.js 24 LTS and npm
- A local YNS backend URL when testing API-backed modules

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Set `VITE_API_BASE_URL` to the backend origin. Never put credentials in frontend environment variables.

## Required reading

Read `AGENTS.md`, `docs/DEVELOPMENT.md`, `plan.md`, and `CHECKLIST.md`. `docs/contracts/backend-api-v1.yaml` is the reviewed frontend snapshot of the backend contract. Local data is limited to explicit fixtures, placeholders, and approved outage essentials; it is not a second production source of truth.

## Verification

```powershell
npm run lint
npm run test:run
npm run contract:check
npm run build
```

Do not publish placeholder facts, illustrative media, or unverified links. Track factual readiness in `docs/VERIFIED_CONTENT.md`.
