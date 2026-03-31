"use client";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  type StoredCookieConsent,
  parseStoredCookieConsent,
} from "@/lib/cookieConsent/storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CookieConsentContextValue {
  ready: boolean;
  analyticsAllowed: boolean;
  showBanner: boolean;
  /** True once the user has saved a choice (can close the panel without picking again). */
  hasSavedPreferences: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openCookieSettings: () => void;
  closeSettingsWithoutChanges: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [ready, setReady] = useState(false);
  const [stored, setStored] = useState<StoredCookieConsent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    const parsed = parseStoredCookieConsent(raw);
    queueMicrotask(() => {
      setStored(parsed);
      setReady(true);
    });
  }, []);

  const persist = useCallback((analytics: boolean) => {
    const next: StoredCookieConsent = {
      version: COOKIE_CONSENT_VERSION,
      analytics,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(next));
    setStored(next);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(true), [persist]);
  const rejectNonEssential = useCallback(() => persist(false), [persist]);

  const openCookieSettings = useCallback(() => setSettingsOpen(true), []);

  const closeSettingsWithoutChanges = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const hasValidConsent =
    stored !== null && stored.version === COOKIE_CONSENT_VERSION;

  const showBanner =
    ready && (!hasValidConsent || (hasValidConsent && settingsOpen));

  const analyticsAllowed =
    ready &&
    hasValidConsent &&
    stored !== null &&
    stored.analytics === true;

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ready,
      analyticsAllowed,
      showBanner,
      hasSavedPreferences: hasValidConsent,
      acceptAll,
      rejectNonEssential,
      openCookieSettings,
      closeSettingsWithoutChanges,
    }),
    [
      ready,
      analyticsAllowed,
      showBanner,
      hasValidConsent,
      acceptAll,
      rejectNonEssential,
      openCookieSettings,
      closeSettingsWithoutChanges,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
