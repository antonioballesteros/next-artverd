import {
  AccessibilityPolicyContent,
  LegalPageSubheader,
} from "@/components/legal";
import {
  ACCESSIBILITY_POLICY_DESCRIPTION,
  ACCESSIBILITY_POLICY_TITLE,
} from "@/lib/legal/accessibilityPolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ACCESSIBILITY_POLICY_TITLE,
  description: ACCESSIBILITY_POLICY_DESCRIPTION,
};

export default function PoliticaDAccessibilitatPage() {
  return (
    <>
      <LegalPageSubheader title={ACCESSIBILITY_POLICY_TITLE} />
      <AccessibilityPolicyContent />
    </>
  );
}
