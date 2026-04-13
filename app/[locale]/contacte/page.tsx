import {
  ContactDetailsAndMap,
  ContactFormSection,
  ContactPageSubheader,
} from "@/components/contact";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface ContactePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactePageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "contacte");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/contacte",
      es: "/contacto",
    },
  });
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
