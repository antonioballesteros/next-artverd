"use client";

import { CartOrderForm } from "@/components/shop/CartOrderForm";
import { useCart } from "@/components/shop/CartProvider";
import { Link } from "@/i18n/navigation";
import { formatEur } from "@/lib/shop/formatEur";
import { elsie } from "@/lib/fonts";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export function CartCheckoutPageClient() {
  const { lines, totalEur } = useCart();
  const t = useTranslations("botiga.cartOrderPage");
  const tCart = useTranslations("botiga.cartPage");

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1
          className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
        >
          {tCart("emptyTitle")}
        </h1>
        <p className="mt-4 text-emerald-900/85">{t("emptyDescription")}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/botiga/cistella"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-emerald-700 bg-transparent px-6 py-2.5 text-sm font-semibold tracking-wide text-emerald-900 uppercase transition hover:bg-emerald-50"
          >
            {t("backToCart")}
          </Link>
          <Link
            href="/botiga"
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-emerald-800 px-6 py-2.5 text-sm font-semibold tracking-wide text-white uppercase shadow-md transition hover:bg-emerald-900"
          >
            {tCart("goToShop")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link
        href="/botiga/cistella"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 underline-offset-4 hover:text-emerald-950 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        {t("backToCart")}
      </Link>

      <h1
        className={`${elsie.className} mt-6 text-3xl font-normal text-emerald-950 md:text-4xl`}
      >
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-emerald-800/85">{t("intro")}</p>

      <div className="mt-8 rounded-xl border border-emerald-200/90 bg-emerald-50/50 px-4 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-wide text-emerald-800/80">
          {t("estimatedTotalLabel")}
        </p>
        <p className={`${elsie.className} mt-1 text-2xl text-emerald-950`}>
          {formatEur(totalEur)}
        </p>
        <p className="mt-2 text-xs text-emerald-800/75">
          {lines.length === 1
            ? t("itemsInCartOne")
            : t("itemsInCartMany", { count: lines.length })}
        </p>
      </div>

      <CartOrderForm formClassName="relative mt-10 pt-2" />
    </div>
  );
}
