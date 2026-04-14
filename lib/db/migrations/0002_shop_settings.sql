CREATE TABLE "shop_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"currency_locale" text DEFAULT 'es-ES' NOT NULL,
	"currency_code" text DEFAULT 'EUR' NOT NULL,
	"vat_rate_percent" numeric(5, 2) DEFAULT '21' NOT NULL,
	"sale_price_multiplier" numeric(8, 3) DEFAULT '2' NOT NULL
);

INSERT INTO "shop_settings" DEFAULT VALUES;
