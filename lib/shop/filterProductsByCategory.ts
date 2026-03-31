import {
  SHOP_PRODUCTS,
  type ShopProduct,
} from "@/lib/shop/products";

/** Returns catalog products whose `category` matches exactly (case-sensitive). */
export function filterShopProductsByCategory(category: string): ShopProduct[] {
  return SHOP_PRODUCTS.filter((product) => product.category === category);
}
