import { CartPageClient } from "@/components/shop/CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cistella",
  description:
    "Revisa la teva cistella: articles, quantitats i total estimat. Continua cap a la sol·licitud de comanda quan estiguis llest.",
};

interface BotigaCistellaPageProps {
  searchParams?: Promise<{ sent?: string }>;
}

export default async function BotigaCistellaPage({
  searchParams,
}: BotigaCistellaPageProps) {
  const sp = (await searchParams) ?? {};
  const orderSent = sp.sent === "1";

  return <CartPageClient orderSent={orderSent} />;
}
