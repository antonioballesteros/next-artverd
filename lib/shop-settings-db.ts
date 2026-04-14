import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { shopSettings } from "@/lib/db/schema";

const SETTINGS_ID = 1;

/**
 * Load shop settings row (server-only). Not a server action — safe to import from any server module.
 * Runs queries sequentially to avoid starving a single-connection pool during navigation/RSC.
 */
export async function loadShopSettingsRow() {
  const rows = await db
    .select()
    .from(shopSettings)
    .where(eq(shopSettings.id, SETTINGS_ID))
    .limit(1);
  if (rows.length === 0) {
    await db.insert(shopSettings).values({ id: SETTINGS_ID });
    const again = await db
      .select()
      .from(shopSettings)
      .where(eq(shopSettings.id, SETTINGS_ID))
      .limit(1);
    return again[0]!;
  }
  return rows[0]!;
}
