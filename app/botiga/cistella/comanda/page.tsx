import { CartCheckoutPageClient } from "@/components/shop/CartCheckoutPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sol·licitud de comanda",
  description:
    "Envia la teva cistella i les dades de contacte per confirmar la comanda per correu o telèfon.",
};

export default function BotigaCistellaComandaPage() {
  return <CartCheckoutPageClient />;
}
