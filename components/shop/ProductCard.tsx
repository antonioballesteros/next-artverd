import { formatProductPrice } from "@/lib/shop/priceLabel";
import type { ShopProduct } from "@/lib/shop/products";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: ShopProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const cover = product.imagePaths[0] ?? "/images/products/placeholder.webp";
  const priceLabel = formatProductPrice(product.price);

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <Link
        href={`/botiga/${product.slug}`}
        className="group relative block aspect-square w-full overflow-hidden bg-emerald-50"
      >
        <Image
          src={cover}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.soldOut ? (
          <span className="absolute top-3 left-3 rounded-full bg-emerald-950/85 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
            Esgotat
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <h3
          className={`${elsie.className} text-xl leading-snug font-normal text-emerald-950 md:text-2xl`}
        >
          <Link
            href={`/botiga/${product.slug}`}
            className="hover:text-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-emerald-800/80">{product.category}</p>
        <p className="mt-auto pt-2 text-lg font-semibold text-emerald-700">
          {priceLabel}
        </p>
      </div>
    </li>
  );
}
