import { LegalPageSubheader, TermsAndConditionsContent } from "@/components/legal";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { TERMS_AND_CONDITIONS_TITLE } from "@/lib/legal/termsAndConditionsContent";
import type { Metadata } from "next";

interface TermesICondicionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermesICondicionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "legal");
  return {
    title: t("termes.title"),
    description: t("termes.description"),
  };
}

export default function TermesICondicionsPage() {
  return (
    <>
      <LegalPageSubheader title={TERMS_AND_CONDITIONS_TITLE} />
      <TermsAndConditionsContent />
    </>
  );
}
