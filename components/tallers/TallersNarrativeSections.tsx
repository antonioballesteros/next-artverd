import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { tallersImages } from "@/lib/tallersAssets";
import Image from "next/image";
import { TallersSectionDivider } from "./TallersSectionDivider";

export function TallersNarrativeSections() {
  return (
    <div className="bg-background">
      <TallersSectionDivider />

      <section className="pb-4 md:pb-6" aria-label="Introducció als tallers">
        <ScrollConvergePair
          className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14"
          left={
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:aspect-[1564/880]">
              <Image
                src={tallersImages.heroMain}
                alt="Detall d’un taller floral amb fulles verdes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          }
          right={
            <div className="text-pretty text-emerald-900/90">
              <p className="text-base leading-relaxed md:text-lg">
                Començarem per aprendre les tècniques bàsiques de manipulació de
                flors: com tallar les tiges adequadament, com preparar els
                recipients i com crear l&apos;estructura de base per als nostres
                arranjaments. A més, descobrirem els principis del disseny
                floral, com ara l&apos;equilibri, la simetria i la proporció,
                que ens ajudaran a crear arranjaments visualment atractius.
              </p>
              <p className="mt-4 text-base leading-relaxed md:text-lg">
                A mesura que avancem, explorarem diferents estils d&apos;art
                floral, des dels clàssics i els elegants fins als moderns i
                avantguardistes. Coneixerem les diferents flors de temporada i
                aprendrem a seleccionar les més adequades per a cada ocasió, ja
                sigui un esdeveniment especial, un casament, una festa o
                simplement per decorar la nostra llar.
              </p>
            </div>
          }
          once={false}
        />
      </section>

      <TallersSectionDivider />

      <section className="pb-12 md:pb-16" aria-label="Color i conservació">
        <ScrollConvergePair
          className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14"
          left={
            <div className="text-pretty text-emerald-900/90">
              <p className="text-base leading-relaxed md:text-lg">
                A més, dedicarem temps a explorar la importància de
                l&apos;elecció dels colors en els nostres arranjaments i com
                poden evocar diferents estats d&apos;ànim i emocions. Aprendrem
                a jugar amb els contrastos i les combinacions harmonioses per
                assolir efectes visuals impactants.
              </p>
              <p className="mt-4 text-base leading-relaxed md:text-lg">
                Però l&apos;art floral no només tracta de l&apos;estètica, sinó
                també de la cura i el manteniment de les nostres creacions.
                Aprendrem tècniques de conservació per prolongar la vida de les
                flors i consells pràctics per mantenir els nostres arranjaments
                frescos i bonics durant més temps.
              </p>
            </div>
          }
          right={
            <div className="relative aspect-495/880 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:mx-auto md:max-w-none">
              <Image
                src={tallersImages.contentArrangement}
                alt="Arranjament floral en recipient de vidre"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          }
          once={false}
        />
      </section>
    </div>
  );
}
