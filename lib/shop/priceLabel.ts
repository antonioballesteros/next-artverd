import type { ProductPrice } from "@/lib/shop/products";
import { formatEur } from "@/lib/shop/formatEur";

/** Human-readable price for listings and product detail. */
export function formatProductPrice(price: ProductPrice): string {
  if (price.kind === "fixed") return formatEur(price.amountEur);
  return `${formatEur(price.minEur)} – ${formatEur(price.maxEur)}`;
}
