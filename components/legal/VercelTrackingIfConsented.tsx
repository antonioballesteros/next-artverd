"use client";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function VercelTrackingIfConsented() {
  const { analyticsAllowed } = useCookieConsent();

  if (!analyticsAllowed) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
