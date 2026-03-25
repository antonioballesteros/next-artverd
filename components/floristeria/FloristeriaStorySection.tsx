import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { floristeriaImages } from "@/lib/floristeriaAssets";
import Image from "next/image";

export function FloristeriaStorySection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14"
        left={
          <div className="text-pretty">
            <p className="text-base leading-relaxed text-emerald-900/90 md:text-lg">
              Artverd és un lloc màgic on pots trobar arranjaments florals,
              plantes, així com amb una varietat de complements, per fer el
              regal perfecte per cada persona.
            </p>
            <p className="mt-4 text-base leading-relaxed text-emerald-900/90 md:text-lg">
              Fundada l’any 2000, la floristeria Artverd està ubicada la zona
              peatonal del Centre històric de Terrassa en un local espaiós i
              acollidor, amb una decoració rústica escandinava, que ressalta la
              bellesa de les flors, que creen un ambient encantador i
              relaxant.
            </p>
          </div>
        }
        right={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl">
            <Image
              src={floristeriaImages.bouquetHero}
              alt="Ramo de flors i espai de la floristeria"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
        once={false}
      />
    </section>
  );
}
