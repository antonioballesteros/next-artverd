import {
  getCartStorageSlug,
  getProductBySlug,
} from "@/lib/shop/products";

/** localStorage payload for the static shop cart (no checkout). */

export const CART_STORAGE_KEY = "artverd-shop-cart";

export interface CartLine {
  slug: string;
  quantity: number;
  /** Set when `ShopProduct.price.kind === "variants"` (same id as `ProductVariant.id`). */
  variantId?: string;
  /** Set when `ShopProduct.price.kind === "variants"` (same id as `ProductComplement.id`). */
  complementId?: string;
  /** Set when `variantId` is the product custom option. */
  customAmountEur?: number;
  /** Set when `variantId` is the product custom option. */
  customDescription?: string;
}

export function parseCartLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    const rows = data.filter(
      (x): x is CartLine =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as CartLine).slug === "string" &&
        typeof (x as CartLine).quantity === "number" &&
        (x as CartLine).quantity > 0 &&
        ((x as CartLine).variantId === undefined ||
          typeof (x as CartLine).variantId === "string") &&
        ((x as CartLine).complementId === undefined ||
          typeof (x as CartLine).complementId === "string") &&
        ((x as CartLine).customAmountEur === undefined ||
          typeof (x as CartLine).customAmountEur === "number") &&
        ((x as CartLine).customDescription === undefined ||
          typeof (x as CartLine).customDescription === "string")
    );
    return rows.map((line) => ({
      ...line,
      complementId: line.complementId ? line.complementId : undefined,
      customAmountEur:
        typeof line.customAmountEur === "number" &&
        Number.isFinite(line.customAmountEur)
          ? line.customAmountEur
          : undefined,
      customDescription: line.customDescription?.trim() || undefined,
    }));
  } catch {
    return [];
  }
}

export function serializeCartLines(lines: CartLine[]): string {
  return JSON.stringify(lines);
}

/** Merges duplicate lines and normalizes slugs to `defaultLocale` segments. */
export function normalizeCartLines(lines: CartLine[]): CartLine[] {
  const merged = new Map<string, CartLine>();
  for (const line of lines) {
    const product = getProductBySlug(line.slug);
    if (!product) continue;
    const slug = getCartStorageSlug(product);
    const key = `${slug}:${line.variantId ?? ""}:${line.complementId ?? ""}:${line.customAmountEur ?? ""}:${line.customDescription ?? ""}`;
    const canon: CartLine = { ...line, slug };
    const prev = merged.get(key);
    if (prev) {
      merged.set(key, {
        ...prev,
        quantity: prev.quantity + canon.quantity,
      });
    } else {
      merged.set(key, canon);
    }
  }
  return Array.from(merged.values());
}
