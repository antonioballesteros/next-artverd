import { formatProductPrice } from "@/lib/shop/priceLabel";
import { elsie } from "@/lib/fonts";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import {
  getProductCategory,
  getProductName,
  getProductSlug,
  type ShopProduct,
} from "@/lib/shop/products";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

interface ProductCardProps {
  product: ShopProduct;
}

export async function ProductCard({ product }: ProductCardProps) {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("botiga.productCard");
  const cover = product.imagePaths[0] ?? "/images/products/placeholder.webp";
  const priceLabel = formatProductPrice(product.price);
  const productHref = {
    pathname: "/botiga/[slug]" as const,
    params: { slug: getProductSlug(product, locale) },
  };
  const title = getProductName(product, locale);
  const categoryLabel = getProductCategory(product, locale);

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <Link
        href={productHref}
        className="group relative block aspect-square w-full overflow-hidden bg-emerald-50"
      >
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.soldOut ? (
          <span className="absolute top-3 left-3 rounded-full bg-emerald-950/85 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
            {t("soldOut")}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <h3
          className={`${elsie.className} text-xl leading-snug font-normal text-emerald-950 md:text-2xl`}
        >
          <Link
            href={productHref}
            className="hover:text-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm text-emerald-800/80">{categoryLabel}</p>
        <p className="mt-auto pt-2 text-lg font-semibold text-emerald-700">
          {priceLabel}
        </p>
      </div>
    </li>
  );
}
