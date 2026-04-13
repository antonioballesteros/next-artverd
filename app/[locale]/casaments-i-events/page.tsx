import {
  CasamentsClosingNote,
  CasamentsHero,
  CasamentsIntro,
  CasamentsServiceSections,
} from "@/components/casaments";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface CasamentsIEventsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CasamentsIEventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "casamentsIEvents");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/casaments-i-events",
      es: "/bodas-y-eventos",
    },
  });
}

export default function CasamentsIEventsPage() {
  return (
    <>
      <CasamentsHero />
      <CasamentsIntro />
      <CasamentsServiceSections />
      <CasamentsClosingNote />
    </>
  );
}
