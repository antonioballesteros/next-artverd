"use client";

import { persistLocalePreference } from "@/lib/i18n/localePreference";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  getBlogPostByAnyLocalizedSlug,
  getLocalizedBlogSlug,
} from "@/lib/blog/blogPosts";
import { getProductBySlug, getProductSlug } from "@/lib/shop/products";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

const LABELS: Record<AppLocale, string> = {
  ca: "CA",
  es: "ES",
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = useLocale() as AppLocale;

  const buttonBase =
    "inline-flex min-h-10 min-w-[2.25rem] items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-bold tracking-wide transition-[background-color,color,box-shadow,border-color] duration-200";

  const buttonInactive = "border border-white/35 bg-white/12 text-emerald-900";

  const buttonActive =
    "border border-white bg-white text-emerald-900 shadow-md shadow-emerald-950/25";

  const onSelect = (next: AppLocale) => {
    if (next === current) return;
    persistLocalePreference(next);

    const slugParam = params.slug;
    const slug = typeof slugParam === "string" ? slugParam : undefined;
    if (pathname === "/botiga/[slug]" && slug) {
      const product = getProductBySlug(slug);
      if (product) {
        router.replace(
          {
            pathname: "/botiga/[slug]",
            params: { slug: getProductSlug(product, next) },
          },
          { locale: next }
        );
        return;
      }
    }

    if (pathname === "/blog/[slug]" && slug) {
      const post = getBlogPostByAnyLocalizedSlug(slug);
      if (post) {
        router.replace(
          {
            pathname: "/blog/[slug]",
            params: { slug: getLocalizedBlogSlug(post.id, next) },
          },
          { locale: next }
        );
        return;
      }
    }

    router.replace(
      { pathname, params } as Parameters<typeof router.replace>[0],
      { locale: next }
    );
  };

  return (
    <div
      className="flex shrink-0 items-center gap-1 drop-shadow-sm"
      role="group"
      aria-label="Language"
    >
      <Languages className="h-4 w-4 shrink-0 text-emerald-800" aria-hidden />
      {routing.locales.map((code) => (
        <Button
          key={code}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onSelect(code)}
          className={cn(
            buttonBase,
            current === code ? buttonActive : buttonInactive
          )}
          aria-pressed={current === code}
        >
          {LABELS[code]}
        </Button>
      ))}
    </div>
  );
}
