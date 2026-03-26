"use client";

import {
  CART_STORAGE_KEY,
  parseCartLines,
  serializeCartLines,
  type CartLine,
} from "@/lib/shop/cartStorage";
import { getCartUnitPriceEur, getProductBySlug } from "@/lib/shop/products";
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
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(parseCartLines(localStorage.getItem(CART_STORAGE_KEY)));
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

  const addItem = useCallback(
    (slug: string, quantity = 1) => {
      if (!getProductBySlug(slug) || quantity < 1) return;
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.slug === slug);
        let next: CartLine[];
        if (idx === -1) next = [...prev, { slug, quantity }];
        else {
          next = [...prev];
          next[idx] = {
            slug,
            quantity: next[idx].quantity + quantity,
          };
        }
        localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback(
    (slug: string) => {
      setLines((prev) => {
        const next = prev.filter((l) => l.slug !== slug);
        localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
        return next;
      });
    },
    [],
  );

  const setQuantity = useCallback(
    (slug: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(slug);
        return;
      }
      if (!getProductBySlug(slug)) return;
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.slug === slug);
        if (idx === -1) {
          const next = [...prev, { slug, quantity }];
          localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
          return next;
        }
        const next = [...prev];
        next[idx] = { slug, quantity };
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
      total += getCartUnitPriceEur(product.price) * line.quantity;
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
