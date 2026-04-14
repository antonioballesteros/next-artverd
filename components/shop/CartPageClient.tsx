"use client";

import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { formatEur } from "@/lib/shop/formatEur";
import type { AppLocale } from "@/i18n/routing";
import {
  getLineUnitPriceEur,
  getProductBySlug,
  getProductName,
  getProductSlug,
  getVariantLabel,
} from "@/lib/shop/products";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

interface CartPageClientProps {
  /** Set when the user landed after a successful cart order email (`?sent=1`). */
  orderSent?: boolean;
}

export function CartPageClient({ orderSent = false }: CartPageClientProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("botiga.cartPage");
  const { lines, totalEur, removeItem, setQuantity, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        {orderSent ? (
          <p
            className="mb-8 rounded-xl border border-emerald-400/50 bg-emerald-50 px-4 py-3 text-sm text-emerald-950"
            role="status"
          >
            {t("orderSentMessage")}
          </p>
        ) : null}
        <h1
          className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
        >
          {t("emptyTitle")}
        </h1>
        <p className="mt-4 text-emerald-900/85">{t("emptyDescription")}</p>
        <Link
          href="/botiga"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-emerald-800 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-md transition hover:bg-emerald-900"
        >
          {t("goToShop")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1
          className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
        >
          {t("title")}
        </h1>
        <Button
          type="button"
          variant="link"
          onClick={clearCart}
          className="self-start px-0 text-sm font-medium text-emerald-800 hover:text-emerald-950"
        >
          {t("clearCart")}
        </Button>
      </div>

      <ul className="mt-10 divide-y divide-emerald-200/90 border-y border-emerald-200/90">
        {lines.map((line) => {
          const product = getProductBySlug(line.slug);
          if (!product) return null;
          const lineTitle = getProductName(product, locale);
          const unit = getLineUnitPriceEur(
            product.price,
            line.variantId,
            line.complementId,
          );
          const lineTotal = unit * line.quantity;
          const cover = product.imagePaths[0];
          const variantLabel = getVariantLabel(
            product.price,
            locale,
            line.variantId,
            line.complementId,
          );
          const lineKey = `${line.slug}:${line.variantId ?? ""}:${line.complementId ?? ""}`;
          const lineHref = {
            pathname: "/botiga/[slug]" as const,
            params: { slug: getProductSlug(product, locale) },
          };

          return (
            <li
              key={lineKey}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
            >
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-emerald-50 sm:h-24 sm:w-24">
                {cover ? (
                  <Image
                    src={cover}
                    alt={lineTitle}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={lineHref}
                  className={`${elsie.className} text-xl font-normal text-emerald-950 hover:text-emerald-800`}
                >
                  {lineTitle}
                </Link>
                <p className="mt-1 text-sm text-emerald-800/80">
                  {product.price.kind === "variants" ? (
                    <>
                      {t("pricePerUnitVariants", {
                        variant: variantLabel ?? t("sizeFallback"),
                        price: formatEur(unit),
                      })}
                    </>
                  ) : (
                    <>{t("pricePerUnitSimple", { price: formatEur(unit) })}</>
                  )}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-emerald-900">
                    <span className="sr-only">{t("quantityLabel")}</span>
                    <Input
                      type="number"
                      min={1}
                      max={99}
                      value={line.quantity}
                      onChange={(e) => {
                        const n = Number.parseInt(e.target.value, 10);
                        if (Number.isNaN(n)) return;
                        setQuantity(
                          line.slug,
                          n,
                          line.variantId,
                          line.complementId,
                        );
                      }}
                      className="w-16 rounded border border-emerald-300 bg-white px-2 py-1 text-center text-emerald-950"
                    />
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      removeItem(
                        line.slug,
                        line.variantId,
                        line.complementId,
                      )
                    }
                    className="text-red-700 hover:bg-red-50 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    {t("remove")}
                  </Button>
                </div>
              </div>
              <div className="text-right sm:pl-4">
                <p className="text-sm text-emerald-800/80">{t("subtotal")}</p>
                <p className="text-lg font-semibold text-emerald-950">
                  {formatEur(lineTotal)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col items-end gap-2 border-t border-emerald-200/90 pt-6">
        <p className="text-sm uppercase tracking-wide text-emerald-800/80">
          {t("estimatedTotal")}
        </p>
        <p className={`${elsie.className} text-3xl text-emerald-950`}>
          {formatEur(totalEur)}
        </p>
        <p className="max-w-md text-right text-sm text-emerald-800/75">
          {t("noOnlinePaymentNote")}
        </p>
        <div className="mt-6 flex w-full max-w-md flex-col gap-3 self-end sm:flex-row sm:justify-end">
          <Link
            href="/botiga"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm border border-emerald-700 bg-transparent px-6 py-2.5 text-sm font-semibold tracking-wide text-emerald-900 uppercase transition hover:bg-emerald-50 sm:flex-initial"
          >
            {t("continueShopping")}
          </Link>
          <Link
            href="/botiga/cistella/comanda"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm bg-emerald-800 px-6 py-2.5 text-sm font-semibold tracking-wide text-white uppercase shadow-md transition hover:bg-emerald-900 sm:flex-initial"
          >
            {t("placeOrder")}
          </Link>
        </div>
      </div>
    </div>
  );
}
