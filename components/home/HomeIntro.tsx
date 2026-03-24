import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { artverdImages } from "@/lib/artverdAssets";
import { elsie } from "@/lib/fonts";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IntroCheckListItemProps {
  children: React.ReactNode;
}

function IntroCheckListItem({ children }: IntroCheckListItemProps) {
  return (
    <li className="flex gap-1">
      <Check
        className="mt-1.5 h-5 w-5 shrink-0 text-emerald-600"
        aria-hidden
        strokeWidth={2}
      />
      <span>{children}</span>
    </li>
  );
}

export function HomeIntro() {
  return (
    <section className="bg-emerald-50/50" aria-labelledby="intro-heading">
      <h2
        className={`${elsie.className} bg-background px-4 py-14 text-center text-2xl text-emerald-950 md:py-20 md:text-6xl`}
      >
        Floristeria Art Verd
      </h2>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14"
        left={
          <div>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-emerald-900/90 md:text-lg">
              <p>
                A la floristeria Art Verd trobaràs rams, plantes i objectes de
                decoració per fer un regal únic i personalitzat, per cada
                ocasió. Sigui un ram de flors per un ésser estimat, per celebrar
                un naixement o un aniversari, o per organitzar el teu casament.
                Regala flors per a qualsevol ocasió.
              </p>
              <p>
                La teva floristeria a Terrassa: estem al centre, molt a prop de
                Mútua de Terrassa. Fem lliuraments a domicili.
              </p>
            </div>
            <ul className="mt-8 max-w-2xl list-none space-y-3 text-emerald-900/90 md:text-lg">
              <IntroCheckListItem>
                Àmplia varietat de plantes per cada racó, així com
                l’assessorament per tenir-ne cura.
              </IntroCheckListItem>
              <IntroCheckListItem>
                Accessoris per decorar la teva llar amb estil i personalitat.
              </IntroCheckListItem>
              <IntroCheckListItem>Events florals.</IntroCheckListItem>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/botiga"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                Coneix la botiga
              </Link>
              <Link
                href="/contacte"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                Contacte
              </Link>
            </div>
          </div>
        }
        right={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
            <Image
              src={artverdImages.tenda}
              alt="Interior de la floristeria ArtVerd a Terrassa"
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
