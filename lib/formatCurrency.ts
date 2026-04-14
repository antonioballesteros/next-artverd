/**
 * Currency formatting from shop locale + ISO code (server or client).
 */
export interface CurrencyFormatOptions {
  locale: string;
  currencyCode: string;
}

export function createCurrencyFormatter(options: CurrencyFormatOptions) {
  const { locale, currencyCode } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrencyAmount(
  value: string | number,
  options: CurrencyFormatOptions
): string {
  const formatter = createCurrencyFormatter(options);
  const n =
    typeof value === "number" ? value : Number.parseFloat(String(value));
  if (Number.isNaN(n)) {
    return formatter.format(0);
  }
  return formatter.format(n);
}
