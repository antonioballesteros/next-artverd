import { ProductCard } from "@/components/shop/ProductCard";
import { elsie } from "@/lib/fonts";
import { SHOP_PRODUCTS } from "@/lib/shop/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botiga",
  description:
    "Botiga online Art Verd: rams, plantes, flors seques, regals i tallers. Consulta el catàleg i la cistella de referència.",
};

export default function BotigaPage() {
  return (
    <>
      <section
        className="bg-emerald-950 px-4 py-14 text-center text-white md:py-20"
        aria-labelledby="botiga-heading"
      >
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1
            id="blog-page-title"
            className={`${elsie.className} text-4xl font-normal tracking-wide md:text-6xl`}
          >
            Botiga
          </h1>
          <div
            className="mx-auto mt-6 h-px w-32 origin-center bg-emerald-400/90 motion-safe:animate-[blog-title-line_0.9s_ease-out_both] motion-reduce:opacity-100"
            aria-hidden
          />
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/90 md:text-lg">
          Descobreix una selecció de productes i experiències de la floristeria.
          Els preus són orientatius; la cistella és només de referència (sense
          pagament en línia).
        </p>
      </section>

      <section className="bg-emerald-50/80 py-12 md:py-16" aria-label="Catàleg">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
