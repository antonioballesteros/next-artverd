import { pgTable, serial, text, integer, numeric } from "drizzle-orm/pg-core";

/**
 * Flower catalogue: name, stock, unit cost (purchase), and unit sale price.
 * Used for bouquet pricing and stock-aware proposals.
 */
export const flowers = pgTable("flowers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  stock: integer("stock").notNull().default(0),
  /** Unit cost in currency (e.g. euros per unit). Stored as numeric for precision. */
  cost: numeric("cost", { precision: 10, scale: 2 }).notNull(),
  /** Unit sale price in currency (e.g. euros per unit). */
  salePrice: numeric("sale_price", { precision: 10, scale: 2 }).notNull(),
});

export type Flower = typeof flowers.$inferSelect;
export type NewFlower = typeof flowers.$inferInsert;

/**
 * Single-row shop configuration: currency display, VAT rate, and margin multiplier
 * for suggested sale price (cost × multiplier). Editable from dashboard settings.
 */
export const shopSettings = pgTable("shop_settings", {
  /** Always 1 — one logical row per deployment / shop. */
  id: integer("id").primaryKey().default(1),
  /** BCP 47 locale for Intl currency (e.g. es-ES, en-GB). */
  currencyLocale: text("currency_locale").notNull().default("es-ES"),
  /** ISO 4217 code (e.g. EUR, GBP). */
  currencyCode: text("currency_code").notNull().default("EUR"),
  /** VAT percentage (e.g. 21 for 21%). For quotes and future tax display. */
  vatRatePercent: numeric("vat_rate_percent", {
    precision: 5,
    scale: 2,
  })
    .notNull()
    .default("21"),
  /** Suggested sale price = unit cost × multiplier (before VAT unless you model otherwise). */
  salePriceMultiplier: numeric("sale_price_multiplier", {
    precision: 8,
    scale: 3,
  })
    .notNull()
    .default("2"),
});

export type ShopSettings = typeof shopSettings.$inferSelect;
