import {
  AccessibilityPolicyContent,
  LegalPageSubheader,
} from "@/components/legal";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { ACCESSIBILITY_POLICY_TITLE } from "@/lib/legal/accessibilityPolicyContent";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface PoliticaDAccessibilitatPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PoliticaDAccessibilitatPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "legal");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("accessibilitat.title"),
    description: t("accessibilitat.description"),
    localizedPath: {
      ca: "/legal/politica-d-accessibilitat",
      es: "/legal/politica-de-accesibilidad",
    },
  });
}

export default function PoliticaDAccessibilitatPage() {
  return (
    <>
      <LegalPageSubheader title={ACCESSIBILITY_POLICY_TITLE} />
      <AccessibilityPolicyContent />
    </>
  );
}
