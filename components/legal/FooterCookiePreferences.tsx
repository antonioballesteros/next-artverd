"use client";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";

export function FooterCookiePreferences() {
  const { openCookieSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-left text-emerald-100/90 underline-offset-2 hover:text-white hover:underline"
    >
      Configuració de galetes
    </button>
  );
}
