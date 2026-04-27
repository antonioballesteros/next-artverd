import { defineRouting } from "next-intl/routing";

/** Synced with `localeCookie.name` for client-side preference persistence. */
export const LOCALE_COOKIE_NAME = "ARTVERD_LOCALE";

export const LOCALE_STORAGE_KEY = "artverd-locale";

export const routing = defineRouting({
  locales: ["ca", "es"],
  defaultLocale: "ca",
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/floristeria": "/floristeria",
    "/tallers": {
      ca: "/tallers",
      es: "/talleres",
    },
    "/casaments-i-events": {
      ca: "/casaments-i-events",
      es: "/bodas-y-eventos",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/contacte": {
      ca: "/contacte",
      es: "/contacto",
    },
    "/legal/avis-legal": {
      ca: "/legal/avis-legal",
      es: "/legal/aviso-legal",
    },
    "/legal/politica-d-accessibilitat": {
      ca: "/legal/politica-d-accessibilitat",
      es: "/legal/politica-de-accesibilidad",
    },
    "/legal/politica-de-cookies": "/legal/politica-de-cookies",
    "/legal/politica-de-privacitat": {
      ca: "/legal/politica-de-privacitat",
      es: "/legal/politica-de-privacidad",
    },
    "/legal/termes-i-condicions": {
      ca: "/legal/termes-i-condicions",
      es: "/legal/terminos-y-condiciones",
    },
    "/botiga": {
      ca: "/botiga",
      es: "/tienda",
    },
    "/botiga/cistella": {
      ca: "/botiga/cistella",
      es: "/tienda/cesta",
    },
    "/botiga/cistella/comanda": {
      ca: "/botiga/cistella/comanda",
      es: "/tienda/cesta/pedido",
    },
    "/botiga/[slug]": {
      ca: "/botiga/[slug]",
      es: "/tienda/[slug]",
    },
    "/admin": {
      ca: "/admin",
      es: "/admin",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
