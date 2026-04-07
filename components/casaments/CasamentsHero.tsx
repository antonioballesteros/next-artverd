import { HeroSection } from "@/components/HeroSection";
import { casamentsImages } from "@/lib/casamentsAssets";
import { getTranslations } from "next-intl/server";

export async function CasamentsHero() {
  const t = await getTranslations("casamentsIEvents.hero");

  return (
    <HeroSection
      src={casamentsImages.heroMain}
      alt={t("imageAlt")}
      ariaLabel={t("ariaLabel")}
    />
  );
}
