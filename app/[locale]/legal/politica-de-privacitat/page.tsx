import { LegalPageSubheader, PrivacyPolicyContent } from "@/components/legal";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { PRIVACY_POLICY_TITLE } from "@/lib/legal/privacyPolicyContent";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface PoliticaDePrivacitatPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PoliticaDePrivacitatPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "legal");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("privacitat.title"),
    description: t("privacitat.description"),
    localizedPath: {
      ca: "/legal/politica-de-privacitat",
      es: "/legal/politica-de-privacidad",
    },
  });
}

export default function PoliticaDePrivacitatPage() {
  return (
    <>
      <LegalPageSubheader title={PRIVACY_POLICY_TITLE} />
      <PrivacyPolicyContent />
    </>
  );
}
