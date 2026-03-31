"use client";

import { useCart } from "@/components/shop/CartProvider";
import { Link } from "@/i18n/navigation";
import { formatEur } from "@/lib/shop/formatEur";
import { ShoppingCart } from "lucide-react";

interface CartHeaderLinkProps {
  overlay: boolean;
  showSolidBar: boolean;
  className?: string;
}

export function CartHeaderLink({
  overlay,
  showSolidBar,
  className = "",
}: CartHeaderLinkProps) {
  const { itemCount, totalEur } = useCart();

  const isOverlayLight = overlay && !showSolidBar;
  const textClass = isOverlayLight
    ? "text-white/95 hover:text-emerald-300"
    : "text-emerald-900/90 hover:text-emerald-700";

  const ariaLabel =
    itemCount === 0
      ? "Shopping cart, empty"
      : `Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}, ${formatEur(totalEur)}`;

  return (
    <Link
      href="/botiga/cistella"
      aria-label={ariaLabel}
      className={`inline-flex min-h-11 min-w-0 shrink-0 items-center gap-2.5 rounded-lg px-2 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:outline-none ${textClass} ${className}`}
    >
      <span className="relative inline-flex shrink-0">
        <ShoppingCart className="h-5 w-5" aria-hidden />
        {itemCount > 0 ? (
          <span className="absolute -top-[11px] -right-[11px] flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] leading-none font-bold text-white shadow-sm">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        ) : null}
      </span>
      <span className="text-sm font-semibold tabular-nums">
        {formatEur(totalEur)}
      </span>
    </Link>
  );
}
