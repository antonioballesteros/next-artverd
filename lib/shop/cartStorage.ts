/** localStorage payload for the static shop cart (no checkout). */

export const CART_STORAGE_KEY = "artverd-shop-cart";

export interface CartLine {
  slug: string;
  quantity: number;
  /** Set when `ShopProduct.price.kind === "variants"` (same id as `ProductVariant.id`). */
  variantId?: string;
  /** Set when `ShopProduct.price.kind === "variants"` (same id as `ProductComplement.id`). */
  complementId?: string;
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
          typeof (x as CartLine).complementId === "string")
    );
    return rows.map((line) => ({
      ...line,
      complementId: line.complementId ? line.complementId : undefined,
    }));
  } catch {
    return [];
  }
}

export function serializeCartLines(lines: CartLine[]): string {
  return JSON.stringify(lines);
}
