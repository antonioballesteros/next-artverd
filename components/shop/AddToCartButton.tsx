"use client";

import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatEur } from "@/lib/shop/formatEur";
import type { AppLocale } from "@/i18n/routing";
import {
  getCartStorageSlug,
  type ShopProduct,
} from "@/lib/shop/products";
import { ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type ChangeEvent } from "react";

interface AddToCartButtonProps {
  product: ShopProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("botiga.addToCart");
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState("");
  const [complementId, setComplementId] = useState("");

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const n = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(n)) return;
    setQuantity(Math.min(99, Math.max(1, n)));
  };

  const handleVariantChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVariantId(e.target.value);
  };

  const handleComplementChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setComplementId(e.target.value);
  };

  const handleClick = () => {
    if (product.price.kind === "variants") {
      if (!variantId) return;
      addItem(getCartStorageSlug(product), quantity, variantId, complementId);
    } else {
      addItem(getCartStorageSlug(product), quantity);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const canAdd = product.price.kind !== "variants" || variantId !== "";

  return (
    <div className="flex flex-col gap-4">
      {product.price.kind === "variants" ? (
        <>
          <p className="mt-2 text-sm text-emerald-800/80">
            {t("pickSizeBeforeCart")}
          </p>

          <label className="flex max-w-md flex-col gap-2 text-sm text-emerald-900">
            <span className="font-medium">{t("size")}</span>
            <select
              value={variantId}
              onChange={handleVariantChange}
              disabled={added}
              className="rounded border border-emerald-300 bg-white px-3 py-2.5 text-emerald-950 disabled:opacity-60"
            >
              <option value="">{t("chooseOption")}</option>
              {product.price.options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.labels[locale]} ({formatEur(o.amountEur)})
                </option>
              ))}
            </select>
          </label>

          {product.price.complements && product.price.complements.length > 0 ? (
            <label className="flex max-w-md flex-col gap-2 text-sm text-emerald-900">
              <span className="font-medium">{t("complement")}</span>
              <select
                value={complementId}
                onChange={handleComplementChange}
                disabled={added}
                className="rounded border border-emerald-300 bg-white px-3 py-2.5 text-emerald-950 disabled:opacity-60"
              >
                <option value="">{t("chooseComplement")}</option>
                {product.price.complements?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.labels[locale]} ({formatEur(e.amountEur)})
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex items-center gap-2 text-sm text-emerald-900">
          <span className="sr-only">{t("quantity")}</span>
          <Input
            type="number"
            min={1}
            max={9}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={added}
            className="w-16 rounded border border-emerald-300 bg-white px-2 py-2 text-center text-emerald-950 disabled:opacity-60"
          />
        </label>
        <Button
          type="button"
          size="lg"
          onClick={handleClick}
          className="min-h-12 w-full rounded-sm bg-emerald-800 px-6 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-md hover:bg-emerald-900 sm:w-auto"
          disabled={added || !canAdd}
        >
          <ShoppingCart className="h-5 w-5" aria-hidden />
          {added ? t("addedToCart") : t("addToCart")}
        </Button>
      </div>
    </div>
  );
}
