import {
  TallersCapturesGallery,
  TallersClosingNote,
  TallersExperienceGift,
  TallersHero,
  TallersIntro,
  TallersNarrativeSections,
  TallersStatementSlider,
} from "@/components/tallers";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface TallersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TallersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "tallers");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/tallers",
      es: "/talleres",
    },
  });
}

export default function TallersPage() {
  return (
    <>
      <TallersHero />
      <TallersIntro />
      <TallersNarrativeSections />
      <TallersCapturesGallery />
      <TallersStatementSlider />
      <TallersClosingNote />
      <TallersExperienceGift />
    </>
  );
}
