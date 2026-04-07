import { LegalNoticeContent, LegalPageSubheader } from "@/components/legal";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { LEGAL_NOTICE_TITLE } from "@/lib/legal/legalNoticeContent";
import type { Metadata } from "next";

interface AvisLegalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AvisLegalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "legal");
  return {
    title: t("avisLegal.title"),
    description: t("avisLegal.description"),
  };
}

export default function AvisLegalPage() {
  return (
    <>
      <LegalPageSubheader title={LEGAL_NOTICE_TITLE} />
      <LegalNoticeContent />
    </>
  );
}
