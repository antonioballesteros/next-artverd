import {
  TallersCapturesGallery,
  TallersClosingNote,
  TallersExperienceGift,
  TallersHero,
  TallersIntro,
  TallersNarrativeSections,
  TallersStatementSlider,
} from "@/components/tallers";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface TallersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TallersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "tallers");
  return {
    title: t("title"),
    description: t("description"),
  };
}

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
