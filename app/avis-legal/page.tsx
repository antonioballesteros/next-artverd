import { LegalNoticeContent, LegalPageSubheader } from "@/components/legal";
import { LEGAL_NOTICE_TITLE } from "@/lib/legal/legalNoticeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: LEGAL_NOTICE_TITLE,
  description:
    "Avís legal d’Art Verd: dades del titular, condicions d’ús, continguts, enllaços, propietat intel·lectual i legislació aplicable.",
};

export default function AvisLegalPage() {
  return (
    <>
      <LegalPageSubheader title={LEGAL_NOTICE_TITLE} />
      <LegalNoticeContent />
    </>
  );
}
