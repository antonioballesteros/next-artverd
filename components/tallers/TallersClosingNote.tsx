import { elsie } from "@/lib/fonts";
import { TallersSectionDivider } from "./TallersSectionDivider";

export function TallersClosingNote() {
  return (
    <section
      className="bg-background py-12 md:py-16"
      aria-label="Reflexió final sobre els tallers"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <TallersSectionDivider />
        <p
          className={`${elsie.className} text-base leading-relaxed text-emerald-900/90 md:text-lg`}
        >
          Espero que aquests tallers siguin una experiència enriquidora i que
          t&apos;inspirin a seguir explorant l&apos;apassionant món de l&apos;art
          floral.
        </p>
        <p
          className={`${elsie.className} mt-6 text-base leading-relaxed text-emerald-900/90 md:text-lg`}
        >
          I encara hi ha una cosa millor que fer un taller, es regalar un taller
          pel teu esser estimat.
        </p>
        <div className="mt-10">
          <TallersSectionDivider />
        </div>
      </div>
    </section>
  );
}
