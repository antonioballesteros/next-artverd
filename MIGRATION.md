# WordPress → Next.js migration (static phase)

Tracks public routes migrated from the legacy WordPress site to this App Router project. Update this file when a page is migrated or scope changes.

**Migrated routes** are implemented here with static content. **Pending routes** are linked from the site but not built yet (track in-progress work in branches or PRs if needed).

## Migrated routes

| Next.js route | Legacy URL | Notes |
| ------------- | ---------- | ----- |
| `/` | https://www.artverd.com/ | Hero, intro, products, tallers, quotes, contact. |
| `/floristeria` | https://www.artverd.com/floristeria | Florist page; content on legacy escuela-de-flores. |
| `/tallers` | https://www.artverd.com/tallers | Workshops landing; mirror legacy tallers. |
| `/casaments-i-events` | https://www.artverd.com/casaments-i-events | Weddings & events; hero, alternating sections, icon row, CTA to contact. |
| `/blog` | https://www.artverd.com/blog | Blog home page. |
| `/blog/el-significat-del-color-de-les-roses` | https://www.artverd.com/2023/04/22/el-significat-del-color-de-les-roses/ | Blog page |
| `/blog/abril-el-mes-de-les-flors` | https://www.artverd.com/2023/04/17/abril-el-mes-de-les-flors/ | Blog page |
| `/blog/perque-triar-art-verd-pels-teus-events-especials` | https://www.artverd.com/2023/04/17/por-que-elegir-flores-de-art-verd-para-tus-eventos-especiales/ | Blog page |
| `/legal/politica-de-privacitat` | https://www.artverd.com/politica-de-privacidad | Privacy policy; source politica-de-privacidad. |
| `/legal/politica-de-cookies` | https://www.artverd.com/politica-de-cookies | Cookie policy; slug matches WordPress. |
| `/legal/politica-d-accessibilitat` | https://www.artverd.com/politica-de-accesibilidad | Accessibility statement; legacy politica-de-accesibilidad. |
| `/legal/avis-legal` | https://www.artverd.com/avis-legal | Company legal notice; slug matches legacy. |
| `/legal/termes-i-condicions` | https://www.artverd.com/terminos-y-condiciones | Terms; legacy terminos-y-condiciones URL. |
| `/contacte` | https://www.artverd.com/contact/ | Contact form, details, map; Catalan route slug `contacte`. |

## Pending routes

_(None.)_

## Next phase routes
| Next.js route | Legacy URL | Notes |
| ------------- | ---------- | ----- |
| `/botiga` | https://www.artverd.com/botiga | Shop intro static only; source legacy tienda. |



When adding rows, keep legacy URLs as full `https://` links for easy checking.
