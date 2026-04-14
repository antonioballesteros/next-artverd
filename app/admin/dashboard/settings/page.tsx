import { getShopSettings } from "./actions";
import { ShopSettingsForm } from "./ShopSettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const row = await getShopSettings();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-muted-foreground mt-1">
        Locale, VAT, and pricing rules used across the dashboard.
      </p>
      <div className="mt-6">
        <ShopSettingsForm
          currencyLocale={row.currencyLocale}
          currencyCode={row.currencyCode}
          vatRatePercent={String(row.vatRatePercent)}
          salePriceMultiplier={String(row.salePriceMultiplier)}
        />
      </div>
    </div>
  );
}
