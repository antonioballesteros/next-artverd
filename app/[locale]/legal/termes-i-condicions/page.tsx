import { LegalPageSubheader, TermsAndConditionsContent } from "@/components/legal";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { TERMS_AND_CONDITIONS_TITLE } from "@/lib/legal/termsAndConditionsContent";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface TermesICondicionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermesICondicionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "legal");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("termes.title"),
    description: t("termes.description"),
    localizedPath: {
      ca: "/legal/termes-i-condicions",
      es: "/legal/terminos-y-condiciones",
    },
  });
}

export default function TermesICondicionsPage() {
  return (
    <>
      <LegalPageSubheader title={TERMS_AND_CONDITIONS_TITLE} />
      <TermsAndConditionsContent />
    </>
  );
}
