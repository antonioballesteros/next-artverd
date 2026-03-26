import { artverdImages } from "@/lib/artverdAssets";
import { elsie } from "@/lib/fonts";
import type { Metadata } from "next";
import { Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pàgina no trobada",
  description:
    "La pàgina no existeix o l’adreça no és correcta. Torna a l’inici d’Art Verd.",
};

export default function NotFound() {
  return (
    <section
      className="relative flex min-h-[calc(100dvh-10rem)] flex-col justify-center overflow-hidden bg-emerald-900 px-4 py-16 md:min-h-[calc(100dvh-12rem)] md:py-24"
      aria-labelledby="not-found-title"
    >
      <div
        className="absolute inset-0 origin-[center_top] bg-cover bg-top bg-no-repeat motion-safe:animate-[legal-subheader-bg_16s_ease-out_forwards] motion-reduce:animate-none"
        style={{
          backgroundImage: `url(${artverdImages.flowerSectionBg})`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-emerald-900/88 via-emerald-950/82 to-emerald-900/90"
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <p
          className={`${elsie.className} text-7xl font-normal leading-none text-emerald-200/35 tabular-nums md:text-9xl`}
          aria-hidden
        >
          404
        </p>
        <h1
          id="not-found-title"
          className={`${elsie.className} mt-3 text-3xl font-normal tracking-wide text-white md:mt-4 md:text-5xl`}
        >
          Pàgina no trobada
        </h1>
        <div
          className="mx-auto mt-6 h-px w-28 bg-emerald-300/90 md:mt-8"
          aria-hidden
        />
        <p className="mt-6 text-base leading-relaxed text-emerald-50/95 md:mt-8 md:text-lg">
          La pàgina que cerques no existeix o s’ha mogut. Comprova l’adreça o
          torna a l’inici.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300/90 bg-emerald-950/35 px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:border-emerald-200 hover:bg-emerald-900/55 focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:outline-none md:text-base"
          >
            <Home className="h-5 w-5 shrink-0 text-emerald-200" aria-hidden />
            Inici
          </Link>
          <Link
            href="/contacte"
            className="text-sm font-medium text-emerald-200/95 underline decoration-emerald-400/80 underline-offset-4 transition-colors hover:text-white hover:decoration-emerald-200 md:text-base"
          >
            Contacte
          </Link>
        </div>
      </div>
    </section>
  );
}
