import { artverdImages } from "@/lib/artverdAssets";
import { elsie } from "@/lib/fonts";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Home } from "lucide-react";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
};

interface NotFoundCopy {
  title: string;
  body: string;
  homeLabel: string;
  contactLabel: string;
}

const notFoundCopyByLocale: Record<AppLocale, NotFoundCopy> = {
  ca: {
    title: "Pagina no trobada",
    body: "La pagina que cerques no existeix o s'ha mogut. Comprova l'adreca o torna a l'inici.",
    homeLabel: "Inici",
    contactLabel: "Contacte",
  },
  es: {
    title: "Pagina no encontrada",
    body: "La pagina que buscas no existe o se ha movido. Comprueba la direccion o vuelve al inicio.",
    homeLabel: "Inicio",
    contactLabel: "Contacto",
  },
};

export default async function NotFound() {
  const locale = (await getLocale()) as AppLocale;
  const copy =
    notFoundCopyByLocale[locale] ??
    notFoundCopyByLocale[routing.defaultLocale as AppLocale];
  const homeHref = locale === "es" ? "/es" : "/";
  const contactHref = locale === "es" ? "/es/contacto" : "/contacte";

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
          className={`${elsie.className} text-7xl leading-none font-normal text-emerald-200/35 tabular-nums md:text-9xl`}
          aria-hidden
        >
          404
        </p>
        <h1
          id="not-found-title"
          className={`${elsie.className} mt-3 text-3xl font-normal tracking-wide text-white md:mt-4 md:text-5xl`}
        >
          {copy.title}
        </h1>
        <div
          className="mx-auto mt-6 h-px w-28 bg-emerald-300/90 md:mt-8"
          aria-hidden
        />
        <p className="mt-6 text-base leading-relaxed text-emerald-50/95 md:mt-8 md:text-lg">
          {copy.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300/90 bg-emerald-950/35 px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:border-emerald-200 hover:bg-emerald-900/55 focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:outline-none md:text-base"
          >
            <Home className="h-5 w-5 shrink-0 text-emerald-200" aria-hidden />
            {copy.homeLabel}
          </Link>
          <Link
            href={contactHref}
            className="text-sm font-medium text-emerald-200/95 underline decoration-emerald-400/80 underline-offset-4 transition-colors hover:text-white hover:decoration-emerald-200 md:text-base"
          >
            {copy.contactLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
