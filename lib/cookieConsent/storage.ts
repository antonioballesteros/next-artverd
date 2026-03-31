/**
 * Stored in localStorage when the user chooses cookie preferences.
 * Increment when the cookie inventory or categories change so users re-confirm.
 */
export const COOKIE_CONSENT_STORAGE_KEY = "artverd.cookieConsent";

export const COOKIE_CONSENT_VERSION = 1;

export interface StoredCookieConsent {
  version: number;
  analytics: boolean;
  updatedAt: string;
}

export function parseStoredCookieConsent(
  raw: string | null,
): StoredCookieConsent | null {
  if (!raw) {
    return null;
  }
  try {
    const data = JSON.parse(raw) as unknown;
    if (typeof data !== "object" || data === null) {
      return null;
    }
    const record = data as Record<string, unknown>;
    if (
      record.version === COOKIE_CONSENT_VERSION &&
      typeof record.analytics === "boolean"
    ) {
      return {
        version: COOKIE_CONSENT_VERSION,
        analytics: record.analytics,
        updatedAt:
          typeof record.updatedAt === "string"
            ? record.updatedAt
            : new Date().toISOString(),
      };
    }
  } catch {
    return null;
  }
  return null;
}
