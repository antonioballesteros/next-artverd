"use client";

import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import { useEffect } from "react";

export function CookieConsentBanner() {
  const {
    ready,
    showBanner,
    hasSavedPreferences,
    acceptAll,
    rejectNonEssential,
    closeSettingsWithoutChanges,
  } = useCookieConsent();

  useEffect(() => {
    if (!ready) {
      return;
    }
    document.body.style.paddingBottom = showBanner ? "11rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [ready, showBanner]);

  if (!ready || !showBanner) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-100 border-t border-emerald-900/15 bg-[#f8faf8] px-4 py-4 shadow-[0_-8px_30px_rgba(6,78,59,0.12)] md:px-6 md:py-5"
      role="region"
      aria-label="Consentiment de galetes"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 md:max-w-4xl md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="min-w-0 text-[0.9rem] leading-relaxed text-emerald-950/90 md:text-[0.95rem]">
          <p className="font-medium text-emerald-900">
            Galetes i mesura d’audiència
          </p>
          <p className="mt-2">
            Utilitzem tecnologies necessàries per al funcionament de la botiga
            (com l’emmagatzematge local de la cistella) i, només si ho accepteu,
            eines de Vercel per analitzar visites i rendiment del lloc. Podeu
            rebutjar aquestes últimes sense perjudicar la navegació bàsica.
          </p>
          <p className="mt-2">
            Més informació a la{" "}
            <Link
              href="/legal/politica-de-cookies"
              className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
            >
              política de galetes
            </Link>{" "}
            i la{" "}
            <Link
              href="/legal/politica-de-privacitat"
              className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
            >
              política de privacitat
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          {hasSavedPreferences ? (
            <button
              type="button"
              onClick={closeSettingsWithoutChanges}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-emerald-800/80 underline-offset-2 hover:text-emerald-900 hover:underline"
            >
              Tancar
            </button>
          ) : null}
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-full border border-emerald-800/25 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-900 shadow-sm transition hover:border-emerald-700/40 hover:bg-emerald-50"
          >
            Només necessàries
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
          >
            Acceptar totes
          </button>
        </div>
      </div>
    </div>
  );
}
