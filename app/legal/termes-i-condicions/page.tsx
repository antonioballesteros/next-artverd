import { LegalPageSubheader, TermsAndConditionsContent } from "@/components/legal";
import {
  TERMS_AND_CONDITIONS_DESCRIPTION,
  TERMS_AND_CONDITIONS_TITLE,
} from "@/lib/legal/termsAndConditionsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: TERMS_AND_CONDITIONS_TITLE,
  description: TERMS_AND_CONDITIONS_DESCRIPTION,
};

export default function TermesICondicionsPage() {
  return (
    <>
      <LegalPageSubheader title={TERMS_AND_CONDITIONS_TITLE} />
      <TermsAndConditionsContent />
    </>
  );
}
