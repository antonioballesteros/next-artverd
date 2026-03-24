"use client";

import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const OVERLAY_SCROLL_PX = 24;

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "Inici" },
  { href: "/floristeria", label: "Floristeria" },
  { href: "/tallers", label: "Tallers" },
  { href: "/casaments-i-events", label: "Casaments i events" },
  { href: "/botiga", label: "Botiga online" },
  { href: "/blog", label: "Blog" },
  { href: "/contacte", label: "Contacte" },
];

interface SiteHeaderProps {
  currentPath?: string;
  /** When set, the bar sits over the first viewport (e.g. full-bleed hero) and gains a solid background after scroll. */
  variant?: "default" | "overlay";
}

export function SiteHeader({
  currentPath = "/",
  variant = "default",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant !== "overlay") return;
    const onScroll = () => setScrolled(window.scrollY > OVERLAY_SCROLL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isOverlay = variant === "overlay";
  const showSolidBar = !isOverlay || scrolled || menuOpen;

  const headerShell = isOverlay
    ? `fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        showSolidBar
          ? "bg-emerald-900 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`
    : "sticky top-0 z-50 border-b border-emerald-200/80 bg-emerald-50/95 backdrop-blur-sm";

  const navLinkBase = isOverlay
    ? `text-white/95 visited:text-white/95 uppercase tracking-wide transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
        showSolidBar ? "hover:text-emerald-300" : "hover:text-emerald-700"
      }`
    : "text-emerald-900/90 uppercase tracking-wide transition-colors hover:text-emerald-700";

  const navLinkActive = showSolidBar
    ? "text-emerald-300 uppercase tracking-wide"
    : "text-emerald-700 uppercase tracking-wide";

  const menuButtonClass = showSolidBar
    ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-emerald-200/90 bg-white/90 text-emerald-950 md:hidden"
    : "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/40 bg-white/15 text-white backdrop-blur-sm md:hidden";

  return (
    <header className={headerShell}>
      <div className="flex w-full items-center gap-4 py-1 px-4 md:py-1 md:px-2">
        <div className="flex min-w-0 items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src={artverdImages.logo}
              alt="ArtVerd"
              width={160}
              height={48}
              className={`h-10 w-auto md:h-12 ${!showSolidBar ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]" : ""}`}
              priority
            />
          </Link>

          <nav
            className={`hidden items-center gap-6 text-sm font-medium md:flex ${isOverlay ? "drop-shadow-sm" : ""}`}
            aria-label="Principal"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.href === currentPath ? navLinkActive : navLinkBase
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          type="button"
          className={`${menuButtonClass} ml-auto shrink-0`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {menuOpen ? "Tancar menú" : "Obrir menú"}
          </span>
          {menuOpen ? (
            <span className="text-lg leading-none" aria-hidden>
              ✕
            </span>
          ) : (
            <span className="text-lg leading-none" aria-hidden>
              ☰
            </span>
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-emerald-200/80 bg-emerald-50 px-4 py-4 md:hidden"
        >
          <nav
            className="flex flex-col gap-3 text-base font-medium text-emerald-950"
            aria-label="Principal mòbil"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2 py-2 uppercase tracking-wide transition-colors ${
                  item.href === currentPath
                    ? "bg-emerald-100/90 font-semibold text-emerald-700"
                    : "hover:bg-emerald-100/70 hover:text-emerald-700"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
