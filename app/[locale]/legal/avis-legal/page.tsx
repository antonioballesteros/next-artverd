import { LegalNoticeContent, LegalPageSubheader } from "@/components/legal";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { LEGAL_NOTICE_TITLE } from "@/lib/legal/legalNoticeContent";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface AvisLegalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AvisLegalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "legal");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("avisLegal.title"),
    description: t("avisLegal.description"),
    localizedPath: {
      ca: "/legal/avis-legal",
      es: "/legal/aviso-legal",
    },
  });
}

export default function AvisLegalPage() {
  return (
    <>
      <LegalPageSubheader title={LEGAL_NOTICE_TITLE} />
      <LegalNoticeContent />
    </>
  );
}
