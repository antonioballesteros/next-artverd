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
import { useState } from "react";
import type { ComponentProps } from "react";

type NavHref = ComponentProps<typeof Link>["href"];

interface SiteHeaderProps {
  /** Controls visibility of admin shortcut in the header. */
  isAuthenticated?: boolean;
}

export function SiteHeader({ isAuthenticated = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const siteNavItems = getSiteNavItems(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-emerald-50/50 backdrop-blur-lg transition-[background-color,backdrop-filter,border-color] duration-300">
      <div className="flex w-full items-center gap-4 px-0 py-1 md:mx-auto md:max-w-[2400px] md:px-2 md:py-1">
        <div className="flex min-w-0 items-center gap-6 md:gap-8 lg:gap-10">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 px-2 md:px-0"
          >
            <Image
              src={artverdImages.logo}
              alt="Art Verd"
              width={640}
              height={296}
              className="h-10 shrink-0 md:h-12"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <nav
            className={"hidden items-center gap-6 text-sm font-medium md:flex"}
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
          {isAuthenticated && (
            <Button
              type="button"
              className="hidden h-10 rounded-lg border border-white/40 bg-emerald-950/5 text-emerald-950 hover:bg-emerald-950/25 md:block"
            >
              <NextLink href="/admin">Admin</NextLink>
            </Button>
          )}
          <LanguageSwitcher />
          <CartHeaderLink />
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-200/90 bg-white/90 text-emerald-950 md:hidden"
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
            {isAuthenticated && (
              <Button
                type="button"
                className="ml-auto h-10 rounded-lg border border-white/40 bg-emerald-950/5 text-emerald-950 hover:bg-emerald-950/25"
              >
                <NextLink href="/admin">Admin</NextLink>
              </Button>
            )}
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
            {isAuthenticated && (
              <Link
                href="/admin"
                className="ml-auto rounded-lg px-2 py-2 tracking-wide text-emerald-800 uppercase transition-colors hover:bg-emerald-100/70 hover:text-emerald-700"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
