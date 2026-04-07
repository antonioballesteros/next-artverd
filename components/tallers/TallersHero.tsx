import { HeroSection } from "@/components/HeroSection";
import { tallersImages } from "@/lib/tallersAssets";
import { getTranslations } from "next-intl/server";

export async function TallersHero() {
  const t = await getTranslations("tallers.hero");
  return (
    <HeroSection
      src={tallersImages.heroMain}
      alt={t("imageAlt")}
      ariaLabel={t("ariaLabel")}
    />
  );
}
