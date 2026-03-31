import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";
import { ScrollConvergePair } from "../ScrollConvergePair";
import { HomeSubtitle } from "./HomeSubtitle";

export function HomeBestSeller() {
  return (
    <section className="bg-emerald-50/50" aria-labelledby="bestseller-heading">
      <HomeSubtitle>Novetats · Best seller</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14"
        left={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
            <Image
              src={artverdImages.bestSeller}
              alt="Selecció de productes destacats i best seller"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
        right={
          <div>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
              Els nostres productes best seller són els més venuts i apreciats
              pels nostres clients. Descobreix la nostra selecció de productes
              destacats i troba el que millor s’adapti a les teves necessitats.
              A Art Verd, t’oferim la millor qualitat i varietat de flors i
              plantes perquè el teu espai es converteixi en un lloc únic i
              especial.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/botiga"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                Botiga
              </Link>
            </div>
          </div>
        }
        once={false}
      />
    </section>
  );
}
