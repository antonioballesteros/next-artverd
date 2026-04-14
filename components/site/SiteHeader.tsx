"use client";

import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { CartHeaderLink } from "@/components/shop/CartHeaderLink";
import { artverdImages } from "@/lib/artverdAssets";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getSiteNavItems } from "@/lib/siteNav";
import Image from "next/image";
import NextLink from "next/link";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

type NavHref = ComponentProps<typeof Link>["href"];

const OVERLAY_SCROLL_PX = 24;

/** Pathnames without locale prefix (internal paths used by next-intl). */
const OVERLAY_HEADER_PATHS = [
  "/",
  "/tallers",
  "/casaments-i-events",
  "/blog",
  "/contacte",
  "/legal",
] as const;

function pathnameMatchesOverlayHeader(pathname: string): boolean {
  return OVERLAY_HEADER_PATHS.some((prefix) => {
    if (prefix === "/") return pathname === "/";
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

interface SiteHeaderProps {
  /** When omitted, the active nav item follows the current URL. */
  currentPath?: string;
  /** Controls visibility of admin shortcut in the header. */
  isAuthenticated?: boolean;
  /**
   * When omitted, uses overlay on routes listed in OVERLAY_HEADER_PATHS, otherwise sticky default bar.
   * When set, forces that behavior regardless of path.
   */
  variant?: "default" | "overlay";
}

export function SiteHeader({
  currentPath,
  isAuthenticated = false,
  variant,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const siteNavItems = getSiteNavItems(locale);
  const resolvedPath = currentPath ?? pathname;
  const resolvedVariant =
    variant !== undefined
      ? variant
      : pathnameMatchesOverlayHeader(pathname)
        ? "overlay"
        : "default";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (resolvedVariant !== "overlay") return;
    const onScroll = () => setScrolled(window.scrollY > OVERLAY_SCROLL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [resolvedVariant]);

  const isOverlay = resolvedVariant === "overlay";
  const showSolidBar = !isOverlay || scrolled || menuOpen;

  const headerShell = isOverlay
    ? `fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        showSolidBar
          ? "bg-emerald-950 backdrop-blur-sm"
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
  const adminLinkClass = showSolidBar
    ? "inline-flex min-h-10 items-center rounded-lg border border-emerald-200/90 bg-white/90 px-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-100/90"
    : "inline-flex min-h-10 items-center rounded-lg border border-white/40 bg-white/15 px-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25";

  return (
    <header className={headerShell}>
      <div className="flex w-full items-center gap-4 px-0 py-1 md:mx-auto md:max-w-[2400px] md:px-2 md:py-1">
        <div className="flex min-w-0 items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src={artverdImages.logo}
              alt="Art Verd"
              width={640}
              height={296}
              className={`h-10 shrink-0 md:h-12 ${!showSolidBar ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]" : ""}`}
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <nav
            className={`hidden items-center gap-6 text-sm font-medium md:flex ${isOverlay ? "drop-shadow-sm" : ""}`}
            aria-label="Principal"
          >
            {siteNavItems.map((item) => (
              <Link
                key={String(item.href)}
                href={item.href as NavHref}
                className={
                  item.href === resolvedPath ? navLinkActive : navLinkBase
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-2">
          {isAuthenticated ? (
            <NextLink href="/admin" className={adminLinkClass}>
              Admin
            </NextLink>
          ) : null}
          <LanguageSwitcher overlay={isOverlay} showSolidBar={showSolidBar} />
          <CartHeaderLink overlay={isOverlay} showSolidBar={showSolidBar} />
          <button
            type="button"
            className={`${menuButtonClass} shrink-0`}
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
            {siteNavItems.map((item) => (
              <Link
                key={String(item.href)}
                href={item.href as NavHref}
                className={`rounded-lg px-2 py-2 tracking-wide uppercase transition-colors ${
                  item.href === resolvedPath
                    ? "bg-emerald-100/90 font-semibold text-emerald-700"
                    : "hover:bg-emerald-100/70 hover:text-emerald-700"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/botiga/cistella"
              className="rounded-lg px-2 py-2 tracking-wide text-emerald-800 uppercase transition-colors hover:bg-emerald-100/70 hover:text-emerald-700"
              onClick={() => setMenuOpen(false)}
            >
              Cistella
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
