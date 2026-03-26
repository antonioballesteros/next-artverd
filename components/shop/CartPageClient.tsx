"use client";

import { useCart } from "@/components/shop/CartProvider";
import { formatEur } from "@/lib/shop/formatEur";
import {
  getLineUnitPriceEur,
  getProductBySlug,
  getVariantLabel,
} from "@/lib/shop/products";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export function CartPageClient() {
  const { lines, totalEur, removeItem, setQuantity, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1
          className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
        >
          La cistella és buida
        </h1>
        <p className="mt-4 text-emerald-900/85">
          Explora la botiga i afegeix productes per veure’ls aquí.
        </p>
        <Link
          href="/botiga"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-emerald-800 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-md transition hover:bg-emerald-900"
        >
          Anar a la botiga
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
          Cistella
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="self-start text-sm font-medium text-emerald-800 underline-offset-4 hover:text-emerald-950 hover:underline"
        >
          Buidar la cistella
        </button>
      </div>

      <ul className="mt-10 divide-y divide-emerald-200/90 border-y border-emerald-200/90">
        {lines.map((line) => {
          const product = getProductBySlug(line.slug);
          if (!product) return null;
          const unit = getLineUnitPriceEur(product.price, line.variantId);
          const lineTotal = unit * line.quantity;
          const cover = product.imagePaths[0];
          const variantLabel = getVariantLabel(product.price, line.variantId);
          const lineKey = `${line.slug}:${line.variantId ?? ""}`;

          return (
            <li
              key={lineKey}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
            >
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-emerald-50 sm:h-24 sm:w-24">
                {cover ? (
                  <Image
                    src={cover}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/botiga/${product.slug}`}
                  className={`${elsie.className} text-xl font-normal text-emerald-950 hover:text-emerald-800`}
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-emerald-800/80">
                  {product.price.kind === "variants" ? (
                    <>
                      {variantLabel ?? "Mida"} · {formatEur(unit)} / unitat
                    </>
                  ) : (
                    <>{formatEur(unit)} / unitat</>
                  )}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-emerald-900">
                    <span className="sr-only">Quantitat</span>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={line.quantity}
                      onChange={(e) => {
                        const n = Number.parseInt(e.target.value, 10);
                        if (Number.isNaN(n)) return;
                        setQuantity(line.slug, n, line.variantId);
                      }}
                      className="w-16 rounded border border-emerald-300 bg-white px-2 py-1 text-center text-emerald-950"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeItem(line.slug, line.variantId)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-red-700 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="text-right sm:pl-4">
                <p className="text-sm text-emerald-800/80">Subtotal</p>
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
          Total estimat
        </p>
        <p className={`${elsie.className} text-3xl text-emerald-950`}>
          {formatEur(totalEur)}
        </p>
        <p className="max-w-md text-right text-sm text-emerald-800/75">
          La compra online no està activa; aquesta cistella és només de referència.
        </p>
        <Link
          href="/botiga"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-sm border border-emerald-700 bg-transparent px-6 py-2.5 text-sm font-semibold tracking-wide text-emerald-900 uppercase transition hover:bg-emerald-50"
        >
          Seguir comprant
        </Link>
      </div>
    </div>
  );
}
