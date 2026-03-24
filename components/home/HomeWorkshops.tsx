import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";

export function HomeWorkshops() {
  return (
    <section
      className="border-t border-emerald-900/10 bg-white px-4 py-14 md:py-20"
      aria-labelledby="workshops-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="workshops-heading"
              className="text-2xl font-semibold text-emerald-950 md:text-3xl"
            >
              Tallers florals
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
              Descobreix els nostres tallers florals a ArtVerd i aprèn a crear
              arranjaments espectaculars amb les millors flors i plantes.
              T’oferim tallers per a tots els nivells, des de principiants fins
              a experts, perquè puguis gaudir de l’art floral independentment de
              la teva experiència. Vine a viure una experiència única i creativa
              amb nosaltres, a Terrassa.
            </p>
            <p className="mt-8">
              <Link
                href="/tallers"
                className="inline-flex font-semibold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-950"
              >
                Coneix els nostres tallers
              </Link>
            </p>
          </div>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-md">
            <Image
              src={artverdImages.workshopsRams}
              alt="Rams i arranjaments florals per als tallers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
