import type { AppLocale } from "@/i18n/routing";
import { getBlogSlugsForLocale } from "@/lib/blog/blogPosts";
import { getSiteUrl } from "@/lib/seo/metadata";
import { getProductSlugsForLocale } from "@/lib/shop/products";
import type { MetadataRoute } from "next";

const STATIC_PATHS_BY_LOCALE: Record<AppLocale, string[]> = {
  ca: [
    "",
    "/blog",
    "/botiga",
    "/botiga/cistella",
    "/botiga/cistella/comanda",
    "/contacte",
    "/casaments-i-events",
    "/floristeria",
    "/tallers",
    "/legal/avis-legal",
    "/legal/politica-d-accessibilitat",
    "/legal/politica-de-cookies",
    "/legal/politica-de-privacitat",
    "/legal/termes-i-condicions",
  ],
  es: [
    "",
    "/blog",
    "/tienda",
    "/tienda/cesta",
    "/tienda/cesta/pedido",
    "/contacto",
    "/bodas-y-eventos",
    "/floristeria",
    "/talleres",
    "/legal/aviso-legal",
    "/legal/politica-de-accesibilidad",
    "/legal/politica-de-cookies",
    "/legal/politica-de-privacidad",
    "/legal/terminos-y-condiciones",
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = (["ca", "es"] as const).flatMap((locale) =>
    STATIC_PATHS_BY_LOCALE[locale].map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.7,
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = (["ca", "es"] as const).flatMap((locale) =>
    getBlogSlugsForLocale(locale).map((slug) => ({
      url: `${siteUrl}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  const productEntries: MetadataRoute.Sitemap = (["ca", "es"] as const).flatMap((locale) =>
    getProductSlugsForLocale(locale).map(({ slug }) => ({
      url: `${siteUrl}/${locale}/${locale === "ca" ? "botiga" : "tienda"}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...blogEntries, ...productEntries];
}
