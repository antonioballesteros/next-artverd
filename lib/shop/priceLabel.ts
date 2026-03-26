import type { ProductPrice } from "@/lib/shop/products";
import { formatEur } from "@/lib/shop/formatEur";

/** Human-readable price for listings and product detail. */
export function formatProductPrice(price: ProductPrice): string {
  if (price.kind === "fixed") return formatEur(price.amountEur);
  const amounts = price.options.map((o) => o.amountEur);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  if (min === max) return formatEur(min);
  return `${formatEur(min)} – ${formatEur(max)}`;
}
