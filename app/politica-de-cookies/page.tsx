import { CookiePolicyContent, LegalPageSubheader } from "@/components/legal";
import { COOKIE_POLICY_TITLE } from "@/lib/legal/cookiePolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: COOKIE_POLICY_TITLE,
  description:
    "Política de galetes d’Art Verd: tipus de galetes, finalitat, com gestionar-les al navegador i informació sobre el bàner de consentiment.",
};

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <LegalPageSubheader title={COOKIE_POLICY_TITLE} />
      <CookiePolicyContent />
    </>
  );
}
