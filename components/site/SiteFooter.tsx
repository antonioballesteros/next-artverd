import { artverdImages } from "@/lib/artverdAssets";
import Link from "next/link";

const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: "/politica-de-privacitat", label: "Política de privacitat" },
  { href: "/politica-de-cookies", label: "Política de cookies" },
  { href: "/politica-d-accessibilitat", label: "Política d’accessibilitat" },
  { href: "/avis-legal", label: "Avís legal" },
  { href: "/termes-i-condicions", label: "Termes i condicions" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-emerald-900/10 bg-emerald-950 text-emerald-50">
      <div
        className="pointer-events-none absolute inset-0 bg-contain bg-bottom bg-no-repeat opacity-[0.07]"
        style={{ backgroundImage: `url(${artverdImages.flowerFooterBg})` }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-12">
          <div>
            <p className="text-lg font-semibold text-white">ArtVerd</p>
            <p className="mt-2 max-w-sm text-sm text-emerald-100/90">
              La teva floristeria a Terrassa. Carrer Cardaire, 11 · 08221
              Terrassa (Barcelona)
            </p>
            <p className="mt-3 text-sm">
              <a
                href="tel:+34682242445"
                className="text-emerald-100 underline-offset-2 hover:underline"
              >
                682 242 445
              </a>
              <span className="mx-2 text-emerald-400/80">·</span>
              <a
                href="tel:+34937861675"
                className="text-emerald-100 underline-offset-2 hover:underline"
              >
                937 86 16 75
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

          <nav
            className="flex flex-col gap-2 text-sm"
            aria-label="Peu de pàgina"
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
          </nav>
        </div>

        <p className="mt-10 border-t border-emerald-800/80 pt-6 text-center text-xs text-emerald-200/80">
          © {new Date().getFullYear()} ArtVerd. Tots els drets reservats.
        </p>
      </div>
    </footer>
  );
}
