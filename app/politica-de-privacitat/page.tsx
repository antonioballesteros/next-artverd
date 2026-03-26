import { LegalPageSubheader, PrivacyPolicyContent } from "@/components/legal";
import { PRIVACY_POLICY_TITLE } from "@/lib/legal/privacyPolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE,
  description:
    "Política de privacitat d’Art Verd: tractament de dades personals, drets dels interessats i informació del responsable, ROSA MARIA MARTI ESCAYOL.",
};

export default function PoliticaDePrivacitatPage() {
  return (
    <>
      <LegalPageSubheader title={PRIVACY_POLICY_TITLE} />
      <PrivacyPolicyContent />
    </>
  );
}
