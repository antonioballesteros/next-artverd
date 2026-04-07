import {
  CasamentsClosingNote,
  CasamentsHero,
  CasamentsIntro,
  CasamentsServiceSections,
} from "@/components/casaments";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface CasamentsIEventsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CasamentsIEventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "casamentsIEvents");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CasamentsIEventsPage() {
  return (
    <>
      <CasamentsHero />
      <CasamentsIntro />
      <CasamentsServiceSections />
      <CasamentsClosingNote />
    </>
  );
}
