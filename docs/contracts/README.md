# Backend contract snapshot

`backend-api-v1.yaml` is a reviewed snapshot of the canonical backend `docs/api/openapi.yaml`.

- Contract revision: `content-2`
- SHA-256: `522589BFC1600C4BE047DF6FBBD557DF50B272FA4D0D814A82C75B19CE9A23F4`
- Upstream repository: `axediant02/yns-cms-api`
- Upstream commit: `ab9051eb1788a818c795b037bd9055ffc9865625`

Do not add frontend-only paths or fields. Update this snapshot only as part of a coordinated backend contract change.

Content-2 includes the existing authenticated content save/publish flow and public published-content collection, with optional leadership role and portrait fields. The Leadership tab reads this public collection without credentials; CMS preview fixtures are kept separate.
