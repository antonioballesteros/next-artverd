import { loadShopSettingsRow } from "@/lib/shop-settings-db";
import { getFlowers } from "./actions";
import { FlowersCatalogue } from "./FlowersCatalogue";

export const dynamic = "force-dynamic";

export default async function FlowersPage() {
  // Sequential DB access avoids hanging when the pool has a single connection
  // (parallel RSC + prefetch + postgres max:1 can deadlock with some poolers).
  const flowers = await getFlowers();
  const settings = await loadShopSettingsRow();
  const shopSettings = {
    currencyLocale: settings.currencyLocale,
    currencyCode: settings.currencyCode,
    vatRatePercent: Number.parseFloat(String(settings.vatRatePercent)),
    salePriceMultiplier: Number.parseFloat(
      String(settings.salePriceMultiplier)
    ),
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold">Flower catalogue</h1>
      <p className="text-muted-foreground mt-1">
        Manage flowers: name, unit cost, and stock. Used for bouquet pricing and
        availability.
      </p>
      <p className="text-muted-foreground mt-2 text-sm">
        Currency and suggested sale multiplier:{" "}
        <a
          href="/dashboard/settings"
          className="text-foreground font-medium underline underline-offset-4 hover:no-underline"
        >
          Settings
        </a>
        .
      </p>
      <div className="mt-6">
        <FlowersCatalogue flowers={flowers} shopSettings={shopSettings} />
      </div>
    </div>
  );
}
