"use client";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import { useTranslations } from "next-intl";

export function FooterCookiePreferences() {
  const { openCookieSettings } = useCookieConsent();
  const t = useTranslations("site.footer");

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-left text-emerald-100/90 underline-offset-2 hover:text-white hover:underline"
    >
      {t("cookieSettings")}
    </button>
  );
}
