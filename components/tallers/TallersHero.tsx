import { HeroSection } from "@/components/HeroSection";
import { tallersImages } from "@/lib/tallersAssets";

export function TallersHero() {
  return (
    <HeroSection
      src={tallersImages.heroMain}
      alt="Floral workshop — working with flowers and foliage"
      ariaLabel="Tallers"
    />
  );
}
