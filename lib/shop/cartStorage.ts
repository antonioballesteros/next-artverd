/** localStorage payload for the static shop cart (no checkout). */

export const CART_STORAGE_KEY = "artverd-shop-cart-v1";

export interface CartLine {
  slug: string;
  quantity: number;
}

export function parseCartLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (x): x is CartLine =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as CartLine).slug === "string" &&
        typeof (x as CartLine).quantity === "number" &&
        (x as CartLine).quantity > 0,
    );
  } catch {
    return [];
  }
}

export function serializeCartLines(lines: CartLine[]): string {
  return JSON.stringify(lines);
}
