/**
 * Allowed BCP 47 locales for currency display (Intl). Extend when adding more.
 */
export const CURRENCY_LOCALE_OPTIONS = [
  { value: "es-ES", label: "Spanish (Spain) — es-ES" },
  { value: "en-GB", label: "English (UK) — en-GB" },
] as const;

export type CurrencyLocaleOption =
  (typeof CURRENCY_LOCALE_OPTIONS)[number]["value"];

export const ALLOWED_CURRENCY_LOCALES: readonly CurrencyLocaleOption[] =
  CURRENCY_LOCALE_OPTIONS.map((o) => o.value);

export function isAllowedCurrencyLocale(
  value: string
): value is CurrencyLocaleOption {
  return (ALLOWED_CURRENCY_LOCALES as readonly string[]).includes(value);
}
