"use client";

import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { CartHeaderLink } from "@/components/shop/CartHeaderLink";
import { Button } from "@/components/ui/button";
import { artverdImages } from "@/lib/artverdAssets";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getSiteNavItems } from "@/lib/siteNav";
import { cn } from "@/lib/utils";
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
  /** Controls visibility of admin shortcut in the header. */
  isAuthenticated?: boolean;
}

export function SiteHeader({ isAuthenticated = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const siteNavItems = getSiteNavItems(locale);
  const isOverlay = pathnameMatchesOverlayHeader(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isOverlay) return;
    const onScroll = () => setScrolled(window.scrollY > OVERLAY_SCROLL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  const showSolidBar = !isOverlay || scrolled || menuOpen;

  return (
    <header
      className={cn(
        "top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        isOverlay
          ? "fixed right-0 left-0"
          : "sticky border-b border-emerald-200/80 bg-emerald-50/95",
        showSolidBar
          ? "bg-emerald-50/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="flex w-full items-center gap-4 px-0 py-1 md:mx-auto md:max-w-[2400px] md:px-2 md:py-1">
        <div className="flex min-w-0 items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src={artverdImages.logo}
              alt="Art Verd"
              width={640}
              height={296}
              className={cn(
                "h-10 shrink-0 md:h-12",
                !showSolidBar && "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
              )}
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-6 text-sm font-medium md:flex",
              isOverlay && "drop-shadow-sm"
            )}
            aria-label="Principal"
          >
            {siteNavItems.map((item) => (
              <Link
                key={String(item.href)}
                href={item.href as NavHref}
                className={cn(
                  item.href === pathname
                    ? "tracking-wide text-emerald-700 uppercase"
                    : "tracking-wide text-emerald-900/90 uppercase transition-colors hover:text-emerald-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-2">
          {isAuthenticated ? (
            <NextLink
              href="/admin"
              className={cn(
                showSolidBar
                  ? "inline-flex min-h-10 items-center rounded-lg border border-emerald-200/90 bg-white/90 px-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-100/90"
                  : "inline-flex min-h-10 items-center rounded-lg border border-white/40 bg-white/15 px-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              )}
            >
              Admin
            </NextLink>
          ) : null}
          <LanguageSwitcher overlay={isOverlay} showSolidBar={showSolidBar} />
          <CartHeaderLink overlay={isOverlay} showSolidBar={showSolidBar} />
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className={cn(
              showSolidBar
                ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-emerald-200/90 bg-white/90 text-emerald-950 md:hidden"
                : "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/40 bg-white/15 text-white backdrop-blur-sm md:hidden",
              "shrink-0"
            )}
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
          </Button>
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
                className={cn(
                  "rounded-lg px-2 py-2 tracking-wide uppercase transition-colors",
                  item.href === pathname
                    ? "bg-emerald-100/90 font-semibold text-emerald-700"
                    : "hover:bg-emerald-100/70 hover:text-emerald-700"
                )}
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
