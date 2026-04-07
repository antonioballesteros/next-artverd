import {
  ContactDetailsAndMap,
  ContactFormSection,
  ContactPageSubheader,
} from "@/components/contact";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface ContactePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "contacte");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContactePage() {
  return (
    <>
      <ContactPageSubheader />
      <ContactFormSection />
      <ContactDetailsAndMap />
    </>
  );
}
