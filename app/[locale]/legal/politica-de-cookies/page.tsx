import { CookiePolicyContent, LegalPageSubheader } from "@/components/legal";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { COOKIE_POLICY_TITLE } from "@/lib/legal/cookiePolicyContent";
import type { Metadata } from "next";

interface PoliticaDeCookiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PoliticaDeCookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "legal");
  return {
    title: t("cookies.title"),
    description: t("cookies.description"),
  };
}

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <LegalPageSubheader title={COOKIE_POLICY_TITLE} />
      <CookiePolicyContent />
    </>
  );
}
