import { LegalPageSubheader, TermsAndConditionsContent } from "@/components/legal";
import { TERMS_AND_CONDITIONS_TITLE } from "@/lib/legal/termsAndConditionsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: TERMS_AND_CONDITIONS_TITLE,
  description:
    "Termes i condicions d’ús de la botiga Art Verd: compres en línia, llicències, cancel·lacions, reemborsaments, garanties i privacitat.",
};

export default function TermesICondicionsPage() {
  return (
    <>
      <LegalPageSubheader title={TERMS_AND_CONDITIONS_TITLE} />
      <TermsAndConditionsContent />
    </>
  );
}
