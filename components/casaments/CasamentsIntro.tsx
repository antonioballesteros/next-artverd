import { elsie } from "@/lib/fonts";

export function CasamentsIntro() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby="casaments-page-title"
    >
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-emerald-300/80" aria-hidden />
        <h1
          id="casaments-page-title"
          className={`${elsie.className} text-3xl font-normal tracking-wide text-emerald-950 md:text-5xl lg:text-6xl`}
        >
          Casaments i events
        </h1>
        <p
          className={`${elsie.className} mx-auto mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg`}
        >
          A la nostra floristeria pots trobar tots els arranjaments florals pel
          teu casaments, banquets, aniversaris, festes d&apos;aniversari i
          altres esdeveniments.
        </p>
      </div>
    </section>
  );
}
