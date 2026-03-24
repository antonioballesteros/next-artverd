import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";

export function HomeBestSeller() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-14 md:py-20"
      aria-labelledby="bestseller-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-md lg:order-first">
          <Image
            src={artverdImages.bestSeller}
            alt="Selecció de productes destacats i best seller"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="lg:order-last">
          <h2
            id="bestseller-heading"
            className="text-2xl font-semibold text-emerald-950 md:text-3xl"
          >
            Novetats · Best seller
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
            Els nostres productes best seller són els més venuts i apreciats
            pels nostres clients. Descobreix la nostra selecció de productes
            destacats i troba el que millor s’adapti a les teves necessitats. A
            ArtVerd, t’oferim la millor qualitat i varietat de flors i plantes
            perquè el teu espai es converteixi en un lloc únic i especial.
          </p>
          <p className="mt-8">
            <Link
              href="/categoria/best-seller"
              className="inline-flex rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
            >
              Botiga
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
