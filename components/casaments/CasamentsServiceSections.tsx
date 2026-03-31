import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { casamentsImages } from "@/lib/casamentsAssets";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { DecorativeIconRow } from "../DecorativeIconRow";

interface CasamentsSplitBlockProps {
  sectionId: string;
  title: string;
  paragraphs: readonly [string, string];
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
  ctaLabel: string;
}

function CasamentsSectionDivider() {
  return (
    <div className="flex justify-center py-4 md:py-6" aria-hidden>
      <div className="h-px w-16 bg-emerald-300/70 md:w-20" />
    </div>
  );
}

function CasamentsSplitBlock({
  sectionId,
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  imageSide,
  ctaLabel,
}: CasamentsSplitBlockProps) {
  const textBlock = (
    <div className="mx-4 text-pretty text-emerald-900/90 md:mx-0">
      <h2
        id={sectionId}
        className={`${elsie.className} text-2xl font-normal tracking-wide text-emerald-950 md:text-3xl`}
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed md:text-lg">
        {paragraphs[0]}
      </p>
      <p className="mt-4 text-base leading-relaxed md:text-lg">
        {paragraphs[1]}
      </p>
      <Link
        href="/contacte"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-emerald-800 px-8 py-3.5 text-xs font-semibold tracking-widest text-white uppercase shadow-md transition hover:bg-emerald-900 md:text-sm"
      >
        {ctaLabel}
      </Link>
    </div>
  );

  const imageBlock = (
    <div className="relative aspect-495/880 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:mx-auto md:max-w-none">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const eventsImageBlock = (
    <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:mx-auto md:max-w-none">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const visual =
    imageSrc === casamentsImages.eventsBestSeller
      ? eventsImageBlock
      : imageBlock;

  return (
    <section className="pb-2 md:pb-4" aria-labelledby={sectionId}>
      <ScrollConvergePair
        className={`mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14 ${imageSide === "right" && "max-md:*:first:order-2 max-md:*:last:order-1"}`}
        left={imageSide === "left" ? visual : textBlock}
        right={imageSide === "left" ? textBlock : visual}
        once={false}
      />
    </section>
  );
}

const SECTIONS: CasamentsSplitBlockProps[] = [
  {
    sectionId: "casaments-rams",
    title: "Rams de núvia",
    paragraphs: [
      "A Art Verd, la nostra floristeria a Terrassa, ens especialitzem en la creació de rams de núvia únics i personalitzats que reflecteixin el teu estil i gust. Sabem que el teu dia especial requereix una atenció minuciosa a cada detall, i les nostres expertes floristes estan aquí per ajudar-te a crear el ram de núvia perfecte utilitzant una àmplia varietat de flors de temporada.",
      "El nostre objectiu és fer realitat els teus somnis florals i oferir-te un ram de núvia que sigui veritablement especial. Treballem amb una àmplia gamma de flors de temporada, incloent delicades roses i exquisides peònies, per oferir-te una selecció diversa i bella per triar. Ja sigui que desitgis un ram de núvia clàssic i elegant o un més audaç i modern, el nostre talentós equip de dissenyadors florals s’assegurarà de captar la teva visió i crear una obra mestra floral.",
    ],
    imageSrc: casamentsImages.ramsNuvia,
    imageAlt: "Ram de núvia amb flors de temporada",
    imageSide: "right",
    ctaLabel: "Rams de núvia",
  },
  {
    sectionId: "casaments-cerimonia",
    title: "Decoració de la cerimònia",
    paragraphs: [
      "A Art Verd, la nostra floristeria a Terrassa, ens enorgulleix oferir un servei complet de decoració floral per a la cerimònia del teu esdeveniment especial. Entenem que cada detall compta i que una decoració ben dissenyada pot crear l’ambient perfecte per a la teva cerimònia. Amb el nostre equip d’experts floristes, et proporcionarem una decoració floral personalitzada i impressionant que complementarà a la perfecció el teu esdeveniment.",
      "Podem encarregar-nos de tota la decoració floral de la cerimònia, des de la creació d’arcs elegants fins a arranjaments florals per als bancs o cadires. El nostre objectiu és crear una atmosfera encantadora i romàntica que faci de la teva cerimònia un moment inoblidable. Utilitzarem una varietat de flors fresques i de temporada per aportar vida i color a l’espai, creant un ambient acollidor i sofisticat.",
    ],
    imageSrc: casamentsImages.cerimonia,
    imageAlt: "Decoració floral per a la cerimònia",
    imageSide: "left",
    ctaLabel: "Decoració de la cerimònia",
  },
  {
    sectionId: "casaments-banquet",
    title: "Decoració del banquet",
    paragraphs: [
      "A Art Verd, la nostra floristeria a Terrassa, som experts en la creació de decoracions florals per a banquets que deixaran els teus convidats impressionats. Entenem que la decoració de les taules del banquet és un aspecte essencial per a crear l’ambient perfecte per al teu esdeveniment especial. Amb la nostra atenció als detalls i el nostre toc artístic, crearem centres de taula impressionants i altres detalls florals per embellir el lloc.",
      "Els nostres dissenyadors florals treballaran estretament amb tu per entendre el teu estil i les teves preferències. Crearem centres de taula únics i personalitzats que reflectiran la temàtica o l’estil de la teva celebració. Utilitzarem una varietat de flors de temporada i combinacions de colors per crear composicions visualment impactants i harmonioses.",
    ],
    imageSrc: casamentsImages.banquet,
    imageAlt: "Centres de taula i decoració floral per al banquet",
    imageSide: "right",
    ctaLabel: "Decoració del banquet",
  },
  {
    sectionId: "casaments-ramets",
    title: "Ramets i boutonnieres",
    paragraphs: [
      "A Art Verd, la nostra floristeria a Terrassa, ens encarreguem de dissenyar ramets per a les dames d’honor i boutonnieres per al nuvi i els padrins, utilitzant flors que complementin l’estil del teu casament. Entenem la importància de cada detall en aquest dia tan especial, i amb la nostra passió per les flors i la nostra habilitat artística, crearem ramets i boutonnieres únics i encantadors.",
      "Per a les dames d’honor, dissenyarem ramets elegants i harmoniosos que complementin el seu vestit i l’estil general del casament. Utilitzarem flors de temporada que reflecteixin la temàtica i els colors del teu casament. Cada ramet serà confeccionat amb cura, tenint en compte els gustos personals de les dames d’honor per crear un detall floral perfecte que les faci sentir especials.",
    ],
    imageSrc: casamentsImages.boutonnieres,
    imageAlt: "Ramets i boutonnieres per a casament",
    imageSide: "left",
    ctaLabel: "Ramets i boutonnieres",
  },
  {
    sectionId: "casaments-pastis",
    title: "Decoració del pastís nupcial",
    paragraphs: [
      "A Art Verd, la nostra floristeria a Terrassa, som especialistes en la creació d’adorns florals per al pastís nupcial. Entenem que el pastís és una de les peces centrals i més esperades del casament, i volem assegurar-nos que estigui elegantment decorat amb flors fresques que harmonitzin amb la resta de la decoració.",
      "Amb la nostra habilitat artística i la passió per les flors, crearem adorns florals exquisits que ressaltin la bellesa del teu pastís de casament. Utilitzarem flors fresques i de qualitat per crear composicions delicades i sofisticades que s’adaptin al teu estil i preferències.",
    ],
    imageSrc: casamentsImages.pastis,
    imageAlt: "Flors decorant un pastís nupcial",
    imageSide: "right",
    ctaLabel: "Decoració del pastís nupcial",
  },
  {
    sectionId: "casaments-esdeveniments",
    title: "Esdeveniments",
    paragraphs: [
      "A Art Verd, la nostra floristeria a Terrassa, oferim serveis de decoració floral per a tot tipus d’esdeveniments. Sigui quina sigui l’ocasió, des de festes i congressos fins a presentacions i concerts, ens encarregarem de crear una ambientació floral impressionant que capti l’atenció dels convidats i afegeixi un toc de bellesa natural a l’espai.",
      "La nostra àmplia experiència en decoració floral d’esdeveniments ens permet adaptar-nos a diferents temàtiques i estils. Treballarem de prop amb tu per entendre les teves expectatives, els requisits de l’esdeveniment i el lloc on es durà a terme. A partir d’aquí, utilitzarem la nostra creativitat i coneixements florals per dissenyar una decoració floral personalitzada que compleixi els teus desitjos i reflecteixi l’essència de l’ocasió.",
    ],
    imageSrc: casamentsImages.eventsBestSeller,
    imageAlt: "Decoració floral per a esdeveniments",
    imageSide: "left",
    ctaLabel: "Esdeveniments",
  },
];

export function CasamentsServiceSections() {
  return (
    <div className="bg-background">
      <CasamentsSplitBlock {...SECTIONS[0]} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...SECTIONS[1]} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...SECTIONS[2]} />
      <DecorativeIconRow />
      <CasamentsSplitBlock {...SECTIONS[3]} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...SECTIONS[4]} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...SECTIONS[5]} />
    </div>
  );
}
