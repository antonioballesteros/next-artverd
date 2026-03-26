/** Catalan-formatted EUR for shop UI. */
export function formatEur(amount: number): string {
  return new Intl.NumberFormat("ca-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
