import { Link } from "@/i18n/navigation";
import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { casamentsImages } from "@/lib/casamentsAssets";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { DecorativeIconRow } from "../DecorativeIconRow";

type CasamentsSectionTranslationKey =
  | "ramsNuvia"
  | "cerimonia"
  | "banquet"
  | "ramets"
  | "pastis"
  | "esdeveniments";

interface CasamentsSplitBlockProps {
  sectionId: string;
  title: string;
  paragraphs: readonly [string, string];
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
  ctaLabel: string;
  imageVariant: "tall" | "square";
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
  imageVariant,
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

  const tallImageBlock = (
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

  const squareImageBlock = (
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

  const visual = imageVariant === "square" ? squareImageBlock : tallImageBlock;

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

const SECTION_LAYOUT: readonly {
  sectionId: string;
  translationKey: CasamentsSectionTranslationKey;
  imageSrc: string;
  imageSide: "left" | "right";
  imageVariant: "tall" | "square";
}[] = [
  {
    sectionId: "casaments-rams",
    translationKey: "ramsNuvia",
    imageSrc: casamentsImages.ramsNuvia,
    imageSide: "right",
    imageVariant: "tall",
  },
  {
    sectionId: "casaments-cerimonia",
    translationKey: "cerimonia",
    imageSrc: casamentsImages.cerimonia,
    imageSide: "left",
    imageVariant: "tall",
  },
  {
    sectionId: "casaments-banquet",
    translationKey: "banquet",
    imageSrc: casamentsImages.banquet,
    imageSide: "right",
    imageVariant: "tall",
  },
  {
    sectionId: "casaments-ramets",
    translationKey: "ramets",
    imageSrc: casamentsImages.boutonnieres,
    imageSide: "left",
    imageVariant: "tall",
  },
  {
    sectionId: "casaments-pastis",
    translationKey: "pastis",
    imageSrc: casamentsImages.pastis,
    imageSide: "right",
    imageVariant: "tall",
  },
  {
    sectionId: "casaments-esdeveniments",
    translationKey: "esdeveniments",
    imageSrc: casamentsImages.eventsBestSeller,
    imageSide: "left",
    imageVariant: "square",
  },
];

export async function CasamentsServiceSections() {
  const t = await getTranslations("casamentsIEvents.sections");

  function buildSectionProps(
    layout: (typeof SECTION_LAYOUT)[number],
  ): CasamentsSplitBlockProps {
    const key = layout.translationKey;
    return {
      sectionId: layout.sectionId,
      title: t(`${key}.title`),
      paragraphs: [t(`${key}.p1`), t(`${key}.p2`)] as const,
      imageSrc: layout.imageSrc,
      imageAlt: t(`${key}.imageAlt`),
      imageSide: layout.imageSide,
      ctaLabel: t(`${key}.ctaLabel`),
      imageVariant: layout.imageVariant,
    };
  }

  const s0 = buildSectionProps(SECTION_LAYOUT[0]);
  const s1 = buildSectionProps(SECTION_LAYOUT[1]);
  const s2 = buildSectionProps(SECTION_LAYOUT[2]);
  const s3 = buildSectionProps(SECTION_LAYOUT[3]);
  const s4 = buildSectionProps(SECTION_LAYOUT[4]);
  const s5 = buildSectionProps(SECTION_LAYOUT[5]);

  return (
    <div className="bg-background">
      <CasamentsSplitBlock {...s0} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...s1} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...s2} />
      <DecorativeIconRow />
      <CasamentsSplitBlock {...s3} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...s4} />
      <CasamentsSectionDivider />
      <CasamentsSplitBlock {...s5} />
    </div>
  );
}
