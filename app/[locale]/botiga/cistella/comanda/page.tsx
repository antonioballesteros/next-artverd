import { CartCheckoutPageClient } from "@/components/shop/CartCheckoutPageClient";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface BotigaCistellaComandaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BotigaCistellaComandaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "cartOrder");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function BotigaCistellaComandaPage() {
  return <CartCheckoutPageClient />;
}
