import { elsie } from "@/lib/fonts";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!4v1686042008495!6m8!1m7!1sCAoSLEFGMVFpcFBudWpfUmZLb0cxak9Cc1BmTlR1OEkzMllKZXp6MEdlLThSU1Ri!2m2!1d41.56364871!2d2.01295596!3f245.63!4f1.9599999999999937!5f0.4000000000000002";

export function FloristeriaTourSection() {
  return (
    <section
      className="bg-emerald-50/35 py-14 md:py-20"
      aria-labelledby="floristeria-tour-heading"
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-emerald-300/80" aria-hidden />
        <h2
          id="floristeria-tour-heading"
          className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-4xl`}
        >
          Fes un tour per la nostra floristeria
        </h2>
        <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-900/15 shadow-lg">
          <iframe
            title="Tour virtual — Floristeria Artverd, Carrer Cardaire 11, Terrassa"
            src={MAP_EMBED_SRC}
            className="aspect-4/3 min-h-[320px] w-full border-0 md:min-h-[480px] lg:min-h-[560px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
