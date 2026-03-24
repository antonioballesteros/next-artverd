import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";

export function HomeIntro() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-14 md:py-20"
      aria-labelledby="intro-heading"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2
            id="intro-heading"
            className="text-2xl font-semibold text-emerald-950 md:text-3xl"
          >
            Floristeria ArtVerd
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-emerald-900/90 md:text-lg">
            <p>
              A la floristeria ArtVerd trobaràs rams, plantes i objectes de
              decoració per fer un regal únic i personalitzat, per cada ocasió.
              Sigui un ram de flors per un ésser estimat, per celebrar un
              naixement o un aniversari, o per organitzar el teu casament.
              Regala flors per a qualsevol ocasió.
            </p>
            <p>
              La teva floristeria a Terrassa: estem al centre, molt a prop de
              Mútua de Terrassa. Fem lliuraments a domicili.
            </p>
          </div>
          <ul className="mt-8 max-w-2xl list-disc space-y-2 pl-5 text-emerald-900/90 md:text-lg">
            <li>
              Àmplia varietat de plantes per cada racó, així com l’assessorament
              per tenir-ne cura.
            </li>
            <li>
              Accessoris per decorar la teva llar amb estil i personalitat.
            </li>
            <li>Events florals.</li>
          </ul>
          <p className="mt-8">
            <Link
              href="/botiga"
              className="inline-flex font-semibold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-950"
            >
              Coneix la botiga
            </Link>
          </p>
        </div>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
          <Image
            src={artverdImages.tenda}
            alt="Interior de la floristeria ArtVerd a Terrassa"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
