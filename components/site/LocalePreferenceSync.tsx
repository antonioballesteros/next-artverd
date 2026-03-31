"use client";

import {
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  routing,
} from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { useEffect } from "react";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function readCookieLocale(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE_NAME}=([^;]*)`),
  );
  const raw = match?.[1];
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

interface LocalePreferenceSyncProps {
  /** Locale from the current URL (server-validated). */
  urlLocale: string;
}

/**
 * Keeps the locale cookie aligned with localStorage so the middleware can read the
 * user's choice on the next full navigation (e.g. visiting `/` again).
 */
export function LocalePreferenceSync({ urlLocale }: LocalePreferenceSyncProps) {
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      return;
    }
    if (!stored || !hasLocale(routing.locales, stored)) return;

    const cookieLocale = readCookieLocale();
    if (cookieLocale === stored) return;

    document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(stored)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
  }, [urlLocale]);

  useEffect(() => {
    try {
      if (
        !localStorage.getItem(LOCALE_STORAGE_KEY) &&
        hasLocale(routing.locales, urlLocale)
      ) {
        localStorage.setItem(LOCALE_STORAGE_KEY, urlLocale);
      }
    } catch {
      // ignore
    }
  }, [urlLocale]);

  return null;
}
