import {
  HomeBestSeller,
  HomeHero,
  HomeIntro,
  HomeProductCategories,
  HomeSocialAndContact,
  HomeTestimonials,
  HomeWorkshops,
} from "@/components/home";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "home");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Home() {
  return (
    <>
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
