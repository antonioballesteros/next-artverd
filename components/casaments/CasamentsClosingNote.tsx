import { elsie } from "@/lib/fonts";

export function CasamentsClosingNote() {
  return (
    <section
      className="border-t border-emerald-200/60 bg-emerald-50/40 py-12 md:py-16"
      aria-label="Nota sobre la planificació del casament"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p
          className={`${elsie.className} text-lg leading-relaxed text-emerald-950 md:text-xl`}
        >
          És important que ens puguem reunir abans de l&apos;esdeveniment per
          adaptar-nos a les teves preferències i el teu pressupost, i aconseguir
          una cerimònia perfecta.
        </p>
      </div>
    </section>
  );
}
