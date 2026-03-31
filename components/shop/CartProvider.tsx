"use client";

import {
  CART_STORAGE_KEY,
  parseCartLines,
  serializeCartLines,
  type CartLine,
} from "@/lib/shop/cartStorage";
import { getLineUnitPriceEur, getProductBySlug } from "@/lib/shop/products";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  totalEur: number;
  addItem: (slug: string, quantity?: number, variantId?: string) => void;
  removeItem: (slug: string, variantId?: string) => void;
  setQuantity: (slug: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    queueMicrotask(() => {
      setLines(parseCartLines(raw));
    });
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue !== null) {
        setLines(parseCartLines(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((slug: string, quantity = 1, variantId?: string) => {
    const product = getProductBySlug(slug);
    if (!product || quantity < 1) return;
    if (product.price.kind === "variants") {
      if (
        !variantId ||
        !product.price.options.some((o) => o.id === variantId)
      ) {
        return;
      }
    }
    const lineVariant =
      product.price.kind === "variants" ? variantId : undefined;
    setLines((prev) => {
      const idx = prev.findIndex(
        (l) =>
          l.slug === slug && (l.variantId ?? "") === (lineVariant ?? ""),
      );
      let next: CartLine[];
      if (idx === -1) next = [...prev, { slug, quantity, variantId: lineVariant }];
      else {
        next = [...prev];
        next[idx] = {
          slug,
          variantId: lineVariant,
          quantity: next[idx].quantity + quantity,
        };
      }
      localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((slug: string, variantId?: string) => {
    setLines((prev) => {
      const next = prev.filter(
        (l) =>
          !(
            l.slug === slug &&
            (l.variantId ?? "") === (variantId ?? "")
          ),
      );
      localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
      return next;
    });
  }, []);

  const setQuantity = useCallback(
    (slug: string, quantity: number, variantId?: string) => {
      const product = getProductBySlug(slug);
      if (!product) return;
      const lineVariant =
        product.price.kind === "variants" ? variantId : undefined;
      if (quantity < 1) {
        removeItem(slug, lineVariant);
        return;
      }
      if (product.price.kind === "variants") {
        if (
          !variantId ||
          !product.price.options.some((o) => o.id === variantId)
        ) {
          return;
        }
      }
      setLines((prev) => {
        const idx = prev.findIndex(
          (l) =>
            l.slug === slug && (l.variantId ?? "") === (lineVariant ?? ""),
        );
        if (idx === -1) {
          const next = [...prev, { slug, quantity, variantId: lineVariant }];
          localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
          return next;
        }
        const next = [...prev];
        next[idx] = { slug, quantity, variantId: lineVariant };
        localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
        return next;
      });
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    localStorage.setItem(CART_STORAGE_KEY, serializeCartLines([]));
    setLines([]);
  }, []);

  const { itemCount, totalEur } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const line of lines) {
      const product = getProductBySlug(line.slug);
      if (!product) continue;
      count += line.quantity;
      total +=
        getLineUnitPriceEur(product.price, line.variantId) * line.quantity;
    }
    return { itemCount: count, totalEur: total };
  }, [lines]);

  const value = useMemo(
    (): CartContextValue => ({
      lines,
      itemCount,
      totalEur,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [
      lines,
      itemCount,
      totalEur,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
