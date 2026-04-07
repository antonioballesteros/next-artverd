import {
  AccessibilityPolicyContent,
  LegalPageSubheader,
} from "@/components/legal";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { ACCESSIBILITY_POLICY_TITLE } from "@/lib/legal/accessibilityPolicyContent";
import type { Metadata } from "next";

interface PoliticaDAccessibilitatPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PoliticaDAccessibilitatPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "legal");
  return {
    title: t("accessibilitat.title"),
    description: t("accessibilitat.description"),
  };
}

export default function PoliticaDAccessibilitatPage() {
  return (
    <>
      <LegalPageSubheader title={ACCESSIBILITY_POLICY_TITLE} />
      <AccessibilityPolicyContent />
    </>
  );
}
