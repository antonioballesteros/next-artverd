import { LegalPageSubheader, PrivacyPolicyContent } from "@/components/legal";
import {
  PRIVACY_POLICY_DESCRIPTION,
  PRIVACY_POLICY_TITLE,
} from "@/lib/legal/privacyPolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE,
  description: PRIVACY_POLICY_DESCRIPTION,
};

export default function PoliticaDePrivacitatPage() {
  return (
    <>
      <LegalPageSubheader title={PRIVACY_POLICY_TITLE} />
      <PrivacyPolicyContent />
    </>
  );
}
