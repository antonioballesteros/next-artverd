import type { AppLocale } from "@/i18n/routing";
import {
  SHOP_PRODUCTS,
  getProductCategory,
  type ShopProduct,
} from "@/lib/shop/products";

/** Returns catalog products whose localized category label matches (case-sensitive). */
export function filterShopProductsByCategory(
  categoryLabel: string,
  locale: AppLocale
): ShopProduct[] {
  return SHOP_PRODUCTS.filter(
    (product) => getProductCategory(product, locale) === categoryLabel
  );
}
