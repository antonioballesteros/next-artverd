import {
  TallersCapturesGallery,
  TallersClosingNote,
  TallersExperienceGift,
  TallersHero,
  TallersIntro,
  TallersNarrativeSections,
  TallersStatementSlider,
} from "@/components/tallers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tallers",
  description:
    "Tallers florals a ArtVerd a Terrassa: composicions, kokedames i terraris. Regala una experiència creativa amb flors i plantes.",
};

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
