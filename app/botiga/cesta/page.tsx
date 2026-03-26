import { CartPageClient } from "@/components/shop/CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cistella",
  description:
    "Revisa la teva cistella de referència: articles, quantitats i total estimat.",
};

export default function BotigaCestaPage() {
  return <CartPageClient />;
}
