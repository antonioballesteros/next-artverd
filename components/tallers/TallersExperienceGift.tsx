import { Link } from "@/i18n/navigation";
import { elsie } from "@/lib/fonts";
import { filterShopProductsByCategory } from "@/lib/shop/filterProductsByCategory";
import { formatProductPrice } from "@/lib/shop/priceLabel";
import Image from "next/image";

const TALLERS_CATEGORY = "Tallers";

const tallerWorkshopProducts = filterShopProductsByCategory(TALLERS_CATEGORY);

interface TallersWorkshopCardProps {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  priceLabel: string;
}

function productHref(slug: string) {
  return { pathname: "/botiga/[slug]" as const, params: { slug } };
}

function TallersWorkshopCard({
  slug,
  imageSrc,
  imageAlt,
  title,
  priceLabel,
}: TallersWorkshopCardProps) {
  const href = productHref(slug);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link
        href={href}
        className="relative aspect-square w-full overflow-hidden bg-emerald-50/50"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6 text-center">
        <h3
          className={`${elsie.className} text-lg text-emerald-950 md:text-xl`}
        >
          <Link
            href={href}
            className="transition-colors hover:text-emerald-700"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-sm font-semibold text-emerald-800/90">
          {priceLabel}
        </p>
      </div>
    </article>
  );
}

export function TallersExperienceGift() {
  return (
    <section
      className="bg-emerald-50/35 pt-4 pb-16 md:pb-24"
      aria-labelledby="tallers-gift-heading"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2
          id="tallers-gift-heading"
          className={`${elsie.className} text-center text-2xl text-emerald-950 md:text-6xl`}
        >
          Regala una experiència
        </h2>
        <ul className="mt-10 grid list-none gap-8 md:grid-cols-2 md:gap-10">
          {tallerWorkshopProducts.map((product) => {
            const imageSrc = product.imagePaths[0];
            if (!imageSrc) return null;
            return (
              <li key={product.slug}>
                <TallersWorkshopCard
                  slug={product.slug}
                  imageSrc={imageSrc}
                  imageAlt={product.name}
                  title={product.name}
                  priceLabel={formatProductPrice(product.price)}
                />
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-center">
          <Link
            href="/botiga"
            className="inline-flex items-center justify-center rounded-full border border-emerald-800/30 bg-white px-8 py-3 text-sm font-semibold text-emerald-900 shadow-sm transition hover:border-emerald-700 hover:bg-emerald-50"
          >
            Botiga
          </Link>
        </p>
      </div>
    </section>
  );
}
