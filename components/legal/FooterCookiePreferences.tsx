"use client";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function FooterCookiePreferences() {
  const { openCookieSettings } = useCookieConsent();
  const t = useTranslations("site.footer");

  return (
    <Button
      type="button"
      variant="link"
      onClick={openCookieSettings}
      className="h-auto p-0 text-left text-emerald-100/90 hover:text-white"
    >
      {t("cookieSettings")}
    </Button>
  );
}
