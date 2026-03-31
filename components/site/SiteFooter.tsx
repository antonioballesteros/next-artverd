import { FooterCookiePreferences } from "@/components/legal/FooterCookiePreferences";
import { artverdImages } from "@/lib/artverdAssets";
import { SITE_NAV_ITEMS } from "@/lib/siteNav";
import Image from "next/image";
import Link from "next/link";

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

export function SiteFooter() {
  return (
    <footer className="relative mt-8 flex w-full flex-col items-center justify-center md:mt-80">
      <Image
        src={artverdImages.logo}
        alt="Flower footer background"
        width={640}
        height={296}
      />
      <div className="w-full border bg-emerald-950 px-4 py-10 text-emerald-50">
        <div className="flex flex-col gap-8 md:flex-row md:justify-center-safe md:gap-40">
          <div>
            <p className="mt-2 max-w-sm text-sm text-emerald-100/90">
              Carrer Cardaire, 11 <br /> 08221 Terrassa (Barcelona)
            </p>
            <p className="mt-3 text-sm">
              <a
                href="tel:+34682242445"
                className="text-emerald-100 underline-offset-2 hover:underline"
              >
                682 242 445
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a
                href="mailto:artverd@gmail.com"
                className="text-emerald-100 underline-offset-2 hover:underline"
              >
                artverd@gmail.com
              </a>
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm" aria-label="Principal">
            {SITE_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-emerald-100/90 underline-offset-2 hover:text-white hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            className="flex flex-col gap-2 text-sm"
            aria-label="Informació legal"
          >
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
