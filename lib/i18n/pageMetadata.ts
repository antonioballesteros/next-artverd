import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

/**
 * Loads `messages` under `metadata.<suffix>` for route-level SEO (title/description).
 */
export async function getMetadataTranslations(
  locale: string,
  suffix: string,
) {
  const localeForMetadata = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  return getTranslations({
    locale: localeForMetadata,
    namespace: `metadata.${suffix}`,
  });
}
