import { CartCheckoutPageClient } from "@/components/shop/CartCheckoutPageClient";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";

interface BotigaCistellaComandaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BotigaCistellaComandaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "cartOrder");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/botiga/cistella/comanda",
      es: "/tienda/cesta/pedido",
    },
  });
}

export default function BotigaCistellaComandaPage() {
  return <CartCheckoutPageClient />;
}
