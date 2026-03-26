import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatProductPrice } from "@/lib/shop/priceLabel";
import { formatEur } from "@/lib/shop/formatEur";
import { getAllProductSlugs, getProductBySlug } from "@/lib/shop/products";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BotigaProductPageProps {
  params: Promise<{ slug: string }>;
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
          <div className="space-y-4">
            {product.imagePaths.map((src, index) => (
              <div
                key={src}
                className={`relative w-full overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm ${
                  index === 0 ? "aspect-square" : "aspect-4/3 max-h-80"
                }`}
              >
                <Image
                  src={src}
                  alt={
                    product.imagePaths.length > 1
                      ? `${product.name} (${index + 1})`
                      : product.name
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-medium tracking-wide text-emerald-700 uppercase">
              {product.category}
            </p>
            <h1
              className={`${elsie.className} mt-2 text-3xl font-normal text-emerald-950 md:text-4xl lg:text-5xl`}
            >
              {product.name}
            </h1>
            {product.soldOut ? (
              <p className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-900 uppercase">
                Esgotat a la web anterior (referència)
              </p>
            ) : null}
            <p className="mt-6 text-2xl font-semibold text-emerald-800">
              {priceLabel}
            </p>
            {product.price.kind === "range" ? (
              <p className="mt-2 text-sm text-emerald-800/80">
                La cistella usa l’import mínim (
                {formatEur(product.price.minEur)}) per calcular el total.
              </p>
            ) : null}
            <div className="mt-8 max-w-none text-base leading-relaxed text-emerald-900/95">
              <p>{product.description}</p>
            </div>
            <div className="mt-10">
              <AddToCartButton product={product} />
            </div>
            <p className="mt-6 text-sm text-emerald-800/75">
              Sense pagament en línia. Per reservar o demanar pressupost,{" "}
              <Link
                href="/contacte"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline"
              >
                contacta amb nosaltres
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
