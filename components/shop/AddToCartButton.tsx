"use client";

import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [customAmount, setCustomAmount] = useState("");
  const [customDescription, setCustomDescription] = useState("");

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

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleCustomDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCustomDescription(e.target.value);
  };

  const customOption = product.price.kind === "variants" ? product.price.customOption : undefined;
  const isCustomSelected = customOption ? variantId === customOption.id : false;
  const parsedCustomAmount = Number.parseFloat(customAmount);
  const hasValidCustomAmount =
    customOption &&
    Number.isFinite(parsedCustomAmount) &&
    parsedCustomAmount >= customOption.minAmountEur &&
    parsedCustomAmount <= customOption.maxAmountEur;
  const hasCustomDescription = customDescription.trim().length > 0;

  const handleClick = () => {
    if (product.price.kind === "variants") {
      if (!variantId) return;
      if (isCustomSelected) {
        if (!hasValidCustomAmount || !hasCustomDescription) return;
        addItem(
          getCartStorageSlug(product),
          quantity,
          variantId,
          complementId,
          parsedCustomAmount,
          customDescription.trim()
        );
      } else {
        addItem(getCartStorageSlug(product), quantity, variantId, complementId);
      }
    } else {
      addItem(getCartStorageSlug(product), quantity);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const canAdd =
    product.price.kind !== "variants" ||
    (variantId !== "" && (!isCustomSelected || (hasValidCustomAmount && hasCustomDescription)));
  const customValidationMessage =
    customOption && isCustomSelected
      ? !hasValidCustomAmount
        ? t("customAmountInvalid", {
            min: formatEur(customOption.minAmountEur),
            max: formatEur(customOption.maxAmountEur),
          })
        : !hasCustomDescription
          ? t("customDescriptionRequired")
          : null
      : null;

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
              {customOption ? (
                <option value={customOption.id}>
                  {customOption.labels[locale]} (
                  {formatEur(customOption.minAmountEur)} -{" "}
                  {formatEur(customOption.maxAmountEur)})
                </option>
              ) : null}
            </select>
          </label>

          {customOption && isCustomSelected ? (
            <>
              <label className="flex max-w-md flex-col gap-2 text-sm text-emerald-900">
                <span className="font-medium">
                  {t("customAmountLabel", {
                    min: formatEur(customOption.minAmountEur),
                    max: formatEur(customOption.maxAmountEur),
                  })}
                </span>
                <Input
                  type="number"
                  min={customOption.minAmountEur}
                  max={customOption.maxAmountEur}
                  step="0.01"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  disabled={added}
                  className="rounded border border-emerald-300 bg-white px-3 py-2.5 text-emerald-950 disabled:opacity-60"
                />
              </label>
              <label className="flex max-w-md flex-col gap-2 text-sm text-emerald-900">
                <span className="font-medium">
                  {customOption.descriptionLabels[locale]}
                </span>
                <Textarea
                  rows={4}
                  maxLength={400}
                  value={customDescription}
                  onChange={handleCustomDescriptionChange}
                  disabled={added}
                  placeholder={t("customDescriptionPlaceholder")}
                  className="rounded border border-emerald-300 bg-white px-3 py-2.5 text-emerald-950 disabled:opacity-60"
                />
              </label>
            </>
          ) : null}
          {customValidationMessage ? (
            <p className="max-w-md text-sm text-red-700" role="status">
              {customValidationMessage}
            </p>
          ) : null}

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
