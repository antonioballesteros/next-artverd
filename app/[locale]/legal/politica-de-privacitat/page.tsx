import { LegalPageSubheader, PrivacyPolicyContent } from "@/components/legal";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { PRIVACY_POLICY_TITLE } from "@/lib/legal/privacyPolicyContent";
import type { Metadata } from "next";

interface PoliticaDePrivacitatPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PoliticaDePrivacitatPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "legal");
  return {
    title: t("privacitat.title"),
    description: t("privacitat.description"),
  };
}

export default function PoliticaDePrivacitatPage() {
  return (
    <>
      <LegalPageSubheader title={PRIVACY_POLICY_TITLE} />
      <PrivacyPolicyContent />
    </>
  );
}
