import { FooterCookiePreferences } from "@/components/legal/FooterCookiePreferences";
import { artverdImages } from "@/lib/artverdAssets";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getSiteNavItems } from "@/lib/siteNav";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import type { ComponentProps } from "react";

type NavHref = ComponentProps<typeof Link>["href"];

const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: "/legal/politica-de-privacitat", label: "Política de privacitat" },
  { href: "/legal/politica-de-cookies", label: "Política de cookies" },
  {
    href: "/legal/politica-d-accessibilitat",
    label: "Política d’accessibilitat",
  },
  { href: "/legal/avis-legal", label: "Avís legal" },
  { href: "/legal/termes-i-condicions", label: "Termes i condicions" },
];

export async function SiteFooter() {
  const locale = (await getLocale()) as AppLocale;
  const siteNavItems = getSiteNavItems(locale);

  return (
    <footer className="relative mt-8 flex w-full flex-col items-center justify-center md:mt-20">
      <Image
        src={artverdImages.logo}
        alt="Flower footer background"
        width={640}
        height={296}
        className="px-2"
      />
      <div className="mt-8 w-full bg-emerald-950 px-4 py-10 text-emerald-50">
        <div className="flex flex-col gap-8 md:flex-row md:justify-center-safe md:gap-40">
          <div>
            <p className="mt-2 max-w-sm text-center text-sm text-emerald-100/90 md:text-left">
              Carrer Cardaire, 11 <br /> 08221 Terrassa (Barcelona)
            </p>
            <p className="mt-3 text-center text-sm md:text-left">
              <a
                href="tel:+34682242445"
                className="text-emerald-100 underline-offset-2 hover:underline"
              >
                682 242 445
              </a>
            </p>
            <p className="mt-1 text-center text-sm md:text-left">
              <a
                href="mailto:artverd@gmail.com"
                className="text-emerald-100 underline-offset-2 hover:underline"
              >
                artverd@gmail.com
              </a>
            </p>
          </div>

          <nav
            className="flex flex-col items-center gap-2 border-t border-emerald-800/80 pt-6 text-sm md:border-none md:pt-0"
            aria-label="Principal"
          >
            {siteNavItems.map((item) => (
              <Link
                key={String(item.href)}
                href={item.href as NavHref}
                className="text-emerald-100/90 underline-offset-2 hover:text-white hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            className="flex flex-col items-center gap-2 border-t border-emerald-800/80 pt-6 text-sm md:border-none md:pt-0"
            aria-label="Informació legal"
          >
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href as NavHref}
                className="text-emerald-100/90 underline-offset-2 hover:text-white hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <FooterCookiePreferences />
          </nav>
        </div>

        <p className="mt-10 border-t border-emerald-800/80 pt-6 text-center text-xs text-emerald-200/80">
          © {new Date().getFullYear()} ArtVerd. Tots els drets reservats.
        </p>
      </div>
    </footer>
  );
}
