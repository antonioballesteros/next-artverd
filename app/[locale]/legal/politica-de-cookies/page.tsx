import { CookiePolicyContent, LegalPageSubheader } from "@/components/legal";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { COOKIE_POLICY_TITLE } from "@/lib/legal/cookiePolicyContent";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface PoliticaDeCookiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PoliticaDeCookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "legal");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("cookies.title"),
    description: t("cookies.description"),
    localizedPath: {
      ca: "/legal/politica-de-cookies",
      es: "/legal/politica-de-cookies",
    },
  });
}

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <LegalPageSubheader title={COOKIE_POLICY_TITLE} />
      <CookiePolicyContent />
    </>
  );
}
