import { LocaleHtmlLang } from "@/components/site/LocaleHtmlLang";
import { LocalePreferenceSync } from "@/components/site/LocalePreferenceSync";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

interface LocaleMetadataByLanguage {
  title: string;
  description: string;
}

const metadataByLanguage: Record<string, LocaleMetadataByLanguage> = {
  ca: {
    title: "Art Verd · La teva floristeria a Terrassa",
    description:
      "Floristeria Art Verd: rams, plantes i decoració a Terrassa. Passió per les flors des de l'any 2000. Lliuraments a domicili.",
  },
  es: {
    title: "Art Verd · Tu floristeria en Terrassa",
    description:
      "Floristeria Art Verd: ramos, plantas y decoración en Terrassa. Pasión por las flores desde el año 2000. Entregas a domicilio.",
  },
};

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const localeMetadata =
    metadataByLanguage[locale] ?? metadataByLanguage[routing.defaultLocale];

  return {
    title: {
      default: localeMetadata.title,
      template: "%s · Art Verd",
    },
    description: localeMetadata.description,
  };
}

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlLang locale={locale} />
      <LocalePreferenceSync urlLocale={locale} />
      <SiteHeader />
      <main className="min-w-0 flex-1">{children}</main>
      <SiteFooter />
    </NextIntlClientProvider>
  );
}
