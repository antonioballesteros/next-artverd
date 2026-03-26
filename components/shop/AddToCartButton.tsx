"use client";

import { useCart } from "@/components/shop/CartProvider";
import type { ShopProduct } from "@/lib/shop/products";
import { ShoppingCart } from "lucide-react";
import { useState, type ChangeEvent } from "react";

interface AddToCartButtonProps {
  product: ShopProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const n = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(n)) return;
    setQuantity(Math.min(99, Math.max(1, n)));
  };

  const handleClick = () => {
    addItem(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <label className="flex items-center gap-2 text-sm text-emerald-900">
        <span className="sr-only">Quantitat</span>
        <input
          type="number"
          min={1}
          max={9}
          value={quantity}
          onChange={handleQuantityChange}
          disabled={added}
          className="w-16 rounded border border-emerald-300 bg-white px-2 py-2 text-center text-emerald-950 disabled:opacity-60"
        />
      </label>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-emerald-800 px-6 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-md transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        disabled={added}
      >
        <ShoppingCart className="h-5 w-5" aria-hidden />
        {added ? "Afegit a la cistella" : "Afegir a la cistella"}
      </button>
    </div>
  );
}
