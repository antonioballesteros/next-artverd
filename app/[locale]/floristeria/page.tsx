import {
  FloristeriaContactCta,
  FloristeriaDecorIcons,
  FloristeriaHero,
  FloristeriaPageIntro,
  FloristeriaShopSection,
  FloristeriaStorySection,
  FloristeriaTourSection,
} from "@/components/floristeria";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface FloristeriaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FloristeriaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "floristeria");
  return {
    title: t("title"),
    description: t("description"),
  };
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
