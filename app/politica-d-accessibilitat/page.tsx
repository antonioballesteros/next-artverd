import {
  AccessibilityPolicyContent,
  LegalPageSubheader,
} from "@/components/legal";
import { ACCESSIBILITY_POLICY_TITLE } from "@/lib/legal/accessibilityPolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ACCESSIBILITY_POLICY_TITLE,
  description:
    "Política d’accessibilitat d’Art Verd: estàndards, navegació per teclat, mida del text, configuració tècnica i enllaços al W3C i la WAI.",
};

export default function PoliticaDAccessibilitatPage() {
  return (
    <>
      <LegalPageSubheader title={ACCESSIBILITY_POLICY_TITLE} />
      <AccessibilityPolicyContent />
    </>
  );
}
