"use client";

import {
  CART_STORAGE_KEY,
  normalizeCartLines,
  parseCartLines,
  serializeCartLines,
  type CartLine,
} from "@/lib/shop/cartStorage";
import {
  getCartStorageSlug,
  getLineUnitPriceEur,
  getProductBySlug,
} from "@/lib/shop/products";
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
  addItem: (
    slug: string,
    quantity?: number,
    variantId?: string,
    complementId?: string,
    customAmountEur?: number,
    customDescription?: string
  ) => void;
  removeItem: (
    slug: string,
    variantId?: string,
    complementId?: string,
    customAmountEur?: number,
    customDescription?: string
  ) => void;
  setQuantity: (
    slug: string,
    quantity: number,
    variantId?: string,
    complementId?: string,
    customAmountEur?: number,
    customDescription?: string
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = parseCartLines(raw);
    const normalized = normalizeCartLines(parsed);
    const serialized = serializeCartLines(normalized);
    if (serialized !== (raw ?? "[]")) {
      localStorage.setItem(CART_STORAGE_KEY, serialized);
    }
    queueMicrotask(() => {
      setLines(normalized);
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

  const addItem = useCallback(
    (
      slug: string,
      quantity = 1,
      variantId?: string,
      complementId?: string,
      customAmountEur?: number,
      customDescription?: string
    ) => {
      const product = getProductBySlug(slug);
      if (!product || quantity < 1) return;
      const storageSlug = getCartStorageSlug(product);
      if (product.price.kind === "variants") {
        if (
          !variantId ||
          (!product.price.options.some((o) => o.id === variantId) &&
            product.price.customOption?.id !== variantId)
        ) {
          return;
        }
        const customOption =
          product.price.customOption &&
          variantId === product.price.customOption.id
            ? product.price.customOption
            : undefined;
        if (customOption) {
          const validCustomAmount =
            typeof customAmountEur === "number" &&
            Number.isFinite(customAmountEur) &&
            customAmountEur >= customOption.minAmountEur &&
            customAmountEur <= customOption.maxAmountEur;
          if (!validCustomAmount) return;
          const normalizedDescription = customDescription?.trim();
          if (!normalizedDescription) return;
        } else if (customAmountEur !== undefined || customDescription?.trim()) {
          return;
        }
        if (
          complementId &&
          !product.price.complements?.some((c) => c.id === complementId)
        ) {
          return;
        }
      }
      const lineVariant =
        product.price.kind === "variants" ? variantId : undefined;
      const lineComplement =
        product.price.kind === "variants" &&
        product.price.complements &&
        product.price.complements.length > 0 &&
        complementId
          ? complementId
          : undefined;
      const customOption =
        product.price.kind === "variants" &&
        product.price.customOption &&
        variantId === product.price.customOption.id
          ? product.price.customOption
          : undefined;
      const lineCustomAmount =
        customOption &&
        typeof customAmountEur === "number" &&
        Number.isFinite(customAmountEur)
          ? customAmountEur
          : undefined;
      const lineCustomDescription = customOption ? customDescription?.trim() : undefined;
      setLines((prev) => {
        const idx = prev.findIndex(
          (l) =>
            l.slug === storageSlug &&
            (l.variantId ?? "") === (lineVariant ?? "") &&
            (l.complementId ?? "") === (lineComplement ?? "") &&
            (l.customAmountEur ?? -1) === (lineCustomAmount ?? -1) &&
            (l.customDescription ?? "") === (lineCustomDescription ?? "")
        );
        let next: CartLine[];
        if (idx === -1)
          next = [
            ...prev,
            {
              slug: storageSlug,
              quantity,
              variantId: lineVariant,
              complementId: lineComplement,
              customAmountEur: lineCustomAmount,
              customDescription: lineCustomDescription,
            },
          ];
        else {
          next = [...prev];
          next[idx] = {
            slug: storageSlug,
            variantId: lineVariant,
            complementId: lineComplement,
            customAmountEur: lineCustomAmount,
            customDescription: lineCustomDescription,
            quantity: next[idx].quantity + quantity,
          };
        }
        localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
        return next;
      });
    },
    []
  );

  const removeItem = useCallback(
    (
      slug: string,
      variantId?: string,
      complementId?: string,
      customAmountEur?: number,
      customDescription?: string
    ) => {
      setLines((prev) => {
        const next = prev.filter(
          (l) =>
            !(
              l.slug === slug &&
              (l.variantId ?? "") === (variantId ?? "") &&
              (l.complementId ?? "") === (complementId ?? "") &&
              (l.customAmountEur ?? -1) === (customAmountEur ?? -1) &&
              (l.customDescription ?? "") === (customDescription ?? "")
            )
        );
        localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
        return next;
      });
    },
    []
  );

  const setQuantity = useCallback(
    (
      slug: string,
      quantity: number,
      variantId?: string,
      complementId?: string,
      customAmountEur?: number,
      customDescription?: string
    ) => {
      const product = getProductBySlug(slug);
      if (!product) return;
      const lineVariant =
        product.price.kind === "variants" ? variantId : undefined;
      const lineComplement =
        product.price.kind === "variants" &&
        product.price.complements &&
        product.price.complements.length > 0 &&
        complementId
          ? complementId
          : undefined;
      const customOption =
        product.price.kind === "variants" &&
        product.price.customOption &&
        variantId === product.price.customOption.id
          ? product.price.customOption
          : undefined;
      const lineCustomAmount =
        customOption &&
        typeof customAmountEur === "number" &&
        Number.isFinite(customAmountEur)
          ? customAmountEur
          : undefined;
      const lineCustomDescription = customOption ? customDescription?.trim() : undefined;
      if (quantity < 1) {
        removeItem(
          slug,
          lineVariant,
          lineComplement,
          lineCustomAmount,
          lineCustomDescription
        );
        return;
      }
      if (product.price.kind === "variants") {
        if (
          !variantId ||
          (!product.price.options.some((o) => o.id === variantId) &&
            product.price.customOption?.id !== variantId)
        ) {
          return;
        }
        if (customOption) {
          const validCustomAmount =
            typeof customAmountEur === "number" &&
            Number.isFinite(customAmountEur) &&
            customAmountEur >= customOption.minAmountEur &&
            customAmountEur <= customOption.maxAmountEur;
          if (!validCustomAmount) return;
          if (!customDescription?.trim()) return;
        }
        if (
          complementId &&
          !product.price.complements?.some((c) => c.id === complementId)
        ) {
          return;
        }
      }
      setLines((prev) => {
        const idx = prev.findIndex(
          (l) =>
            l.slug === slug &&
            (l.variantId ?? "") === (lineVariant ?? "") &&
            (l.complementId ?? "") === (lineComplement ?? "") &&
            (l.customAmountEur ?? -1) === (lineCustomAmount ?? -1) &&
            (l.customDescription ?? "") === (lineCustomDescription ?? "")
        );
        if (idx === -1) {
          const next = [
            ...prev,
            {
              slug,
              quantity,
              variantId: lineVariant,
              complementId: lineComplement,
              customAmountEur: lineCustomAmount,
              customDescription: lineCustomDescription,
            },
          ];
          localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
          return next;
        }
        const next = [...prev];
        next[idx] = {
          slug,
          quantity,
          variantId: lineVariant,
          complementId: lineComplement,
          customAmountEur: lineCustomAmount,
          customDescription: lineCustomDescription,
        };
        localStorage.setItem(CART_STORAGE_KEY, serializeCartLines(next));
        return next;
      });
    },
    [removeItem]
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
        getLineUnitPriceEur(
          product.price,
          line.variantId,
          line.complementId,
          line.customAmountEur
        ) *
        line.quantity;
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
    [lines, itemCount, totalEur, addItem, removeItem, setQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
