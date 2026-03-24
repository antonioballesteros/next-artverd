import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";
import { HomeSubtitle } from "./HomeSubtitle";
import { ScrollConvergePair } from "../ScrollConvergePair";

export function HomeWorkshops() {
  return (
    <section className="bg-emerald-50/50" aria-labelledby="workshops-heading">
      <HomeSubtitle>Tallers florals</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14"
        left={
          <div>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
              Descobreix els nostres tallers florals a ArtVerd i aprèn a crear
              arranjaments espectaculars amb les millors flors i plantes.
              T’oferim tallers per a tots els nivells, des de principiants fins
              a experts, perquè puguis gaudir de l’art floral independentment de
              la teva experiència. Vine a viure una experiència única i creativa
              amb nosaltres, a Terrassa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tallers"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                Coneix els nostres tallers
              </Link>
            </div>
          </div>
        }
        right={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
            <Image
              src={artverdImages.workshopsRams}
              alt="Rams i arranjaments florals per als tallers"
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
