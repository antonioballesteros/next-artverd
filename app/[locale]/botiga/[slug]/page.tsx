import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductImageGallery } from "@/components/shop/ProductImageGallery";
import { Link } from "@/i18n/navigation";
import { formatProductPrice } from "@/lib/shop/priceLabel";
import { getAllProductSlugs, getProductBySlug } from "@/lib/shop/products";
import { elsie } from "@/lib/fonts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BotigaProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BotigaProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "No trobat" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function BotigaProductPage({
  params,
}: BotigaProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

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
          <span className="text-emerald-950">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <ProductImageGallery
              productName={product.name}
              imagePaths={product.imagePaths}
            />
          </div>
          <div>
            <h1
              className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
            >
              {product.name}
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
