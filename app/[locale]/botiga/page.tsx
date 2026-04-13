import { ProductCard } from "@/components/shop/ProductCard";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { elsie } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SHOP_PRODUCTS } from "@/lib/shop/products";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface BotigaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BotigaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getMetadataTranslations(locale, "botiga");
  return buildPageMetadata({
    locale: localeForPage,
    title: t("title"),
    description: t("description"),
    localizedPath: {
      ca: "/botiga",
      es: "/tienda",
    },
  });
}

export default async function BotigaPage({ params }: BotigaPageProps) {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: localeForPage,
    namespace: "botiga",
  });

  return (
    <>
      <section
        className="bg-emerald-950 px-4 py-14 text-center text-white md:py-20"
        aria-labelledby="botiga-heading"
      >
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1
            id="botiga-heading"
            className={`${elsie.className} text-4xl font-normal tracking-wide md:text-6xl`}
          >
            {t("hero.title")}
          </h1>
          <div
            className="mx-auto mt-6 h-px w-32 origin-center bg-emerald-400/90 motion-safe:animate-[blog-title-line_0.9s_ease-out_both] motion-reduce:opacity-100"
            aria-hidden
          />
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/90 md:text-lg">
          {t("hero.intro")}
        </p>
      </section>

      <section
        className="bg-emerald-50/80 py-12 md:py-16"
        aria-label={t("catalogAriaLabel")}
      >
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_PRODUCTS.map((product) => (
              <ProductCard
                key={product.slugs.ca}
                product={product}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
