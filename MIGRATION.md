# WordPress → Next.js migration (static phase)

Tracks public routes migrated from the legacy WordPress site to this App Router project. Update this file when a page is migrated or scope changes.

**Migrated routes** are implemented here with static content. **Pending routes** are linked from the site but not built yet (track in-progress work in branches or PRs if needed).

## Migrated routes

| Next.js route | Legacy URL | Notes |
| ------------- | ---------- | ----- |
| `/` | https://www.artverd.com/ | Hero, intro, products, tallers, quotes, contact. |
| `/floristeria` | https://www.artverd.com/floristeria | Florist page; content on legacy escuela-de-flores. |

## Pending routes

| Next.js route | Legacy URL | Notes |
| ------------- | ---------- | ----- |
| `/tallers` | https://www.artverd.com/tallers | Workshops landing; mirror legacy tallers. |
| `/casaments-i-events` | https://www.artverd.com/casaments-i-events | Weddings and events overview; static layout only. |
| `/contacte` | https://www.artverd.com/contacte | Contact info and form; legacy slug is contact. |
| `/politica-de-privacitat` | https://www.artverd.com/politica-de-privacidad | Privacy policy; source politica-de-privacidad. |
| `/politica-de-cookies` | https://www.artverd.com/politica-de-cookies | Cookie policy; slug matches WordPress. |
| `/politica-d-accessibilitat` | https://www.artverd.com/politica-de-accesibilidad | Accessibility statement; legacy politica-de-accesibilidad. |
| `/avis-legal` | https://www.artverd.com/avis-legal | Company legal notice; slug matches legacy. |
| `/termes-i-condicions` | https://www.artverd.com/terminos-y-condiciones | Terms; legacy terminos-y-condiciones URL. |


## Next phase routes
| Next.js route | Legacy URL | Notes |
| ------------- | ---------- | ----- |
| `/blog` | https://www.artverd.com/blog | Blog listing and posts as static pages. |
| `/botiga` | https://www.artverd.com/botiga | Shop intro static only; source legacy tienda. |



When adding rows, keep legacy URLs as full `https://` links for easy checking.
