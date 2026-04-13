import { CartPageClient } from "@/components/shop/CartPageClient";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface BotigaCistellaPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ sent?: string }>;
}

export async function generateMetadata({
  params,
}: Pick<BotigaCistellaPageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "cart");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/botiga/cistella",
      es: "/tienda/cesta",
    },
  });
}

export default async function BotigaCistellaPage({
  searchParams,
}: BotigaCistellaPageProps) {
  const sp = (await searchParams) ?? {};
  const orderSent = sp.sent === "1";

  return <CartPageClient orderSent={orderSent} />;
}
