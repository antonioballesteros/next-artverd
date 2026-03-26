import { LegalNoticeContent, LegalPageSubheader } from "@/components/legal";
import {
  LEGAL_NOTICE_DESCRIPTION,
  LEGAL_NOTICE_TITLE,
} from "@/lib/legal/legalNoticeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: LEGAL_NOTICE_TITLE,
  description: LEGAL_NOTICE_DESCRIPTION,
};

export default function AvisLegalPage() {
  return (
    <>
      <LegalPageSubheader title={LEGAL_NOTICE_TITLE} />
      <LegalNoticeContent />
    </>
  );
}
