"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { shopSettings } from "@/lib/db/schema";
import { isAllowedCurrencyLocale } from "@/lib/currencyLocales";
import { loadShopSettingsRow } from "@/lib/shop-settings-db";

const SETTINGS_ID = 1;

export async function getShopSettings() {
  return loadShopSettingsRow();
}

export async function updateShopSettings(formData: FormData) {
  const currencyLocale = String(formData.get("currencyLocale") ?? "").trim();
  const currencyCode = String(formData.get("currencyCode") ?? "").trim();
  const vatRaw = formData.get("vatRatePercent");
  const multRaw = formData.get("salePriceMultiplier");

  if (!isAllowedCurrencyLocale(currencyLocale)) {
    return { error: "Choose a currency locale from the list" };
  }
  if (!currencyCode || currencyCode.length !== 3) {
    return { error: "Currency code must be a 3-letter ISO code (e.g. EUR)" };
  }
  const vat = vatRaw != null ? parseFloat(String(vatRaw)) : NaN;
  if (Number.isNaN(vat) || vat < 0 || vat > 100) {
    return { error: "VAT must be between 0 and 100 (%)" };
  }
  const mult = multRaw != null ? parseFloat(String(multRaw)) : NaN;
  if (Number.isNaN(mult) || mult <= 0 || mult > 1000) {
    return { error: "Multiplier must be between 0 and 1000" };
  }

  await loadShopSettingsRow();
  await db
    .update(shopSettings)
    .set({
      currencyLocale,
      currencyCode: currencyCode.toUpperCase(),
      vatRatePercent: vat.toFixed(2),
      salePriceMultiplier: mult.toFixed(3),
    })
    .where(eq(shopSettings.id, SETTINGS_ID));

  revalidatePath("/admin/dashboard/settings");
  revalidatePath("/admin/dashboard/flowers");
  return { success: true };
}
