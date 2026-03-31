import { CookiePolicyContent, LegalPageSubheader } from "@/components/legal";
import {
  COOKIE_POLICY_DESCRIPTION,
  COOKIE_POLICY_TITLE,
} from "@/lib/legal/cookiePolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: COOKIE_POLICY_TITLE,
  description: COOKIE_POLICY_DESCRIPTION,
};

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <LegalPageSubheader title={COOKIE_POLICY_TITLE} />
      <CookiePolicyContent />
    </>
  );
}
