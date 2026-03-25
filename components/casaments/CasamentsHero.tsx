import { HeroSection } from "@/components/HeroSection";
import { casamentsImages } from "@/lib/casamentsAssets";

export function CasamentsHero() {
  return (
    <HeroSection
      src={casamentsImages.heroMain}
      alt="Decoració floral per a casaments i esdeveniments"
      ariaLabel="Casaments i events"
    />
  );
}
