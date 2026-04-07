import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { artverdImages } from "@/lib/artverdAssets";
import {
  getProductBySlug,
  getProductSlug,
} from "@/lib/shop/products";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { LocalizedCategoryLink } from "./LocalizedCategoryLink";
import { HomeSubtitle } from "./HomeSubtitle";

type CategoryCopyKey = "rams" | "plantes" | "accesoris" | "events";

interface ProductCategory {
  href: "/botiga" | "/casaments-i-events" | { caSlug: "ram" | "planta" };
  copyKey: CategoryCopyKey;
  imageSrc: string;
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    href: { caSlug: "ram" },
    copyKey: "rams",
    imageSrc: artverdImages.categoryRams,
  },
  {
    href: { caSlug: "planta" },
    copyKey: "plantes",
    imageSrc: artverdImages.categoryPlantes,
  },
  {
    href: "/botiga",
    copyKey: "accesoris",
    imageSrc: artverdImages.categoryAccesoris,
  },
  {
    href: "/casaments-i-events",
    copyKey: "events",
    imageSrc: artverdImages.categoryEvents,
  },
];

export async function HomeProductCategories() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("home.productCategories");

  return (
    <section className="bg-emerald-50/50" aria-labelledby="products-heading">
      <HomeSubtitle>{t("subtitle")}</HomeSubtitle>
      <div className="mx-auto max-w-6xl">
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.map((cat) => {
            const inner = (
              <>
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={cat.imageSrc}
                    alt={t(`${cat.copyKey}.imageAlt`)}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-lg font-semibold text-emerald-950 group-hover:text-emerald-800">
                    {t(`${cat.copyKey}.title`)}
                  </span>
                  <span className="mt-2 text-sm text-emerald-900/75">
                    {t(`${cat.copyKey}.description`)}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-emerald-800">
                    {t("seeMore")}
                  </span>
                </div>
              </>
            );

            if (typeof cat.href === "object" && "caSlug" in cat.href) {
              const product = getProductBySlug(cat.href.caSlug);
              if (!product) return null;
              return (
                <li key={cat.href.caSlug}>
                  <Link
                    href={{
                      pathname: "/botiga/[slug]",
                      params: { slug: getProductSlug(product, locale) },
                    }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {inner}
                  </Link>
                </li>
              );
            }

            return (
              <li key={cat.href}>
                <LocalizedCategoryLink
                  href={cat.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {inner}
                </LocalizedCategoryLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
