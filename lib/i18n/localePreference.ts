"use client";

import {
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  type AppLocale,
} from "@/i18n/routing";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function persistLocalePreference(locale: AppLocale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore quota / private mode
  }
  document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}
