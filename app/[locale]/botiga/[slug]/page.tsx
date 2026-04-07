import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductImageGallery } from "@/components/shop/ProductImageGallery";
import { Link } from "@/i18n/navigation";
import { formatProductPrice } from "@/lib/shop/priceLabel";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  getProductBySlug,
  getProductName,
  getProductSlugsForLocale,
} from "@/lib/shop/products";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { elsie } from "@/lib/fonts";
import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BotigaProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}): { slug: string }[] {
  if (!hasLocale(routing.locales, locale)) return [];
  return getProductSlugsForLocale(locale as AppLocale);
}

export async function generateMetadata({
  params,
}: BotigaProductPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  const t = await getMetadataTranslations(locale, "botigaProduct");

  if (!product) {
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    };
  }

  const loc = locale as AppLocale;
  return {
    title: getProductName(product, loc),
    description: product.description.slice(0, 160),
  };
}

export default async function BotigaProductPage({
  params,
}: BotigaProductPageProps) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const loc = locale as AppLocale;
  const productTitle = getProductName(product, loc);
  const priceLabel = formatProductPrice(product.price);

  return (
    <article className="bg-emerald-50/80 pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className="text-sm text-emerald-800/90"
          aria-label="Camí de navegació"
        >
          <Link
            href="/botiga"
            className="hover:text-emerald-950 hover:underline"
          >
            Botiga
          </Link>
          <span className="mx-2 text-emerald-600/80" aria-hidden>
            /
          </span>
          <span className="text-emerald-950">{productTitle}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <ProductImageGallery
              productName={productTitle}
              imagePaths={product.imagePaths}
            />
          </div>
          <div>
            <h1
              className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
            >
              {productTitle}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-emerald-900/90">
              {product.description}
            </p>
            <p className="mt-6 text-2xl font-semibold text-emerald-800">
              {priceLabel}
            </p>
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
