import { elsie } from "@/lib/fonts";

export function TallersIntro() {
  return (
    <section
      className="bg-background py-12 md:py-16"
      aria-labelledby="tallers-page-title"
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-emerald-300/80" aria-hidden />
        <h1
          id="tallers-page-title"
          className={`${elsie.className} text-3xl font-normal tracking-wide text-emerald-950 md:text-5xl lg:text-8xl`}
        >
          Tallers a ArtVerd
        </h1>
        <p
          className={`${elsie.className} mx-auto mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg`}
        >
          Als tallers ens endinsarem en el meravellós món de les flors i les
          plantes i aprendrem a crear belles composicions florals, kokedamas i
          terraris.
        </p>
      </div>
    </section>
  );
}
