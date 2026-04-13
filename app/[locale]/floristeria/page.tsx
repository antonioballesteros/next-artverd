import {
  FloristeriaContactCta,
  FloristeriaDecorIcons,
  FloristeriaHero,
  FloristeriaPageIntro,
  FloristeriaShopSection,
  FloristeriaStorySection,
  FloristeriaTourSection,
} from "@/components/floristeria";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface FloristeriaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FloristeriaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "floristeria");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/floristeria",
      es: "/floristeria",
    },
  });
}

export default function FloristeriaPage() {
  return (
    <>
      <FloristeriaHero />
      <FloristeriaPageIntro />
      <FloristeriaStorySection />
      <FloristeriaDecorIcons />
      <FloristeriaShopSection />
      <FloristeriaTourSection />
      <FloristeriaContactCta />
    </>
  );
}
