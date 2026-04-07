import type { AppLocale } from "@/i18n/routing";

interface SiteNavItemLabel {
  ca: string;
  es: string;
}

interface SiteNavItem {
  href: string;
  label: SiteNavItemLabel;
}

interface LocalizedSiteNavItem {
  href: string;
  label: string;
}

/** Main site navigation (header and footer). */
export const SITE_NAV_ITEMS: SiteNavItem[] = [
  {
    href: "/",
    label: { ca: "Inici", es: "Inicio" },
  },
  {
    href: "/floristeria",
    label: { ca: "Floristeria", es: "Floristeria" },
  },
  {
    href: "/tallers",
    label: { ca: "Tallers", es: "Talleres" },
  },
  {
    href: "/casaments-i-events",
    label: { ca: "Casaments i events", es: "Bodas y eventos" },
  },
  {
    href: "/botiga",
    label: { ca: "Botiga online", es: "Tienda online" },
  },
  {
    href: "/blog",
    label: { ca: "Blog", es: "Blog" },
  },
  {
    href: "/contacte",
    label: { ca: "Contacte", es: "Contacto" },
  },
];

export function getSiteNavItems(locale: AppLocale): LocalizedSiteNavItem[] {
  return SITE_NAV_ITEMS.map((item) => ({
    href: item.href,
    label: item.label[locale],
  }));
}
