import { CartPageClient } from "@/components/shop/CartPageClient";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import type { Metadata } from "next";

interface BotigaCistellaPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ sent?: string }>;
}

export async function generateMetadata({
  params,
}: Pick<BotigaCistellaPageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "cart");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BotigaCistellaPage({
  searchParams,
}: BotigaCistellaPageProps) {
  const sp = (await searchParams) ?? {};
  const orderSent = sp.sent === "1";

  return <CartPageClient orderSent={orderSent} />;
}
