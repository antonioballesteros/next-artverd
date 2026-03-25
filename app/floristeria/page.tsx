import {
  FloristeriaContactCta,
  FloristeriaDecorIcons,
  FloristeriaHero,
  FloristeriaPageIntro,
  FloristeriaShopSection,
  FloristeriaStorySection,
  FloristeriaTourSection,
} from "@/components/floristeria";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floristeria",
  description:
    "Floristeria Artverd a Terrassa: rams, plantes naturals i decoració. Qualitat, assessorament personalitzat i comanda online.",
};

export default function FloristeriaPage() {
  return (
    <>
      <SiteHeader currentPath="/floristeria" variant="overlay" />
      <main>
        <FloristeriaHero />
        <FloristeriaPageIntro />
        <FloristeriaStorySection />
        <FloristeriaDecorIcons />
        <FloristeriaShopSection />
        <FloristeriaTourSection />
        <FloristeriaContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
