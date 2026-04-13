import {
  HomeBestSeller,
  HomeHero,
  HomeIntro,
  HomeProductCategories,
  HomeSocialAndContact,
  HomeTestimonials,
  HomeWorkshops,
} from "@/components/home";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "home");

  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/",
      es: "/",
    },
  });
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return (
    <>
      <LocalBusinessJsonLd locale={localeForPage} />
      <HomeHero />
      <HomeIntro />
      <HomeProductCategories />
      <HomeBestSeller />
      <HomeWorkshops />
      <HomeTestimonials />
      <HomeSocialAndContact />
    </>
  );
}
