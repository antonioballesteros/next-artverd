/** Single purchasable option when the legacy shop used a variable attribute (e.g. size). */
export interface ProductVariant {
  /** Stable id stored in the cart (ASCII). */
  id: string;
  label: string;
  amountEur: number;
}

/** How the product is priced in the static catalog. */
export type ProductPrice =
  | { kind: "fixed"; amountEur: number }
  | { kind: "variants"; options: ProductVariant[] };

export interface ShopProduct {
  slug: string;
  name: string;
  description: string;
  category: string;
  price: ProductPrice;
  /** Public paths served from `/public`, e.g. `/images/products/x.webp`. */
  imagePaths: string[];
  soldOut?: boolean;
}

/** Static catalog migrated from the legacy shop (no stock sync). */
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "planta",
    name: "Planta",
    description:
      "Planta natural en test. Pregunta’ns per les varietats disponibles i les cures que necessita.",
    category: "Plantes",
    price: { kind: "fixed", amountEur: 35 },
    imagePaths: ["/images/products/planta.webp"],
  },
  {
    slug: "ram-de-flors-seques-de-primavera",
    name: "Ram de flors seques de primavera",
    description:
      "A la primavera apareix una nova naturalesa i nous colors. Flors seques acolorides i delicades. El ram inclou, entre d’altres, civada, blat, phalaris, limonium, statice, setarea, lagurus i delphinium; la composició pot variar segons la inspiració del moment. Conserva’l en lloc sec i sense humitat directa.",
    category: "Flors seques",
    price: {
      kind: "variants",
      options: [
        { id: "petit", label: "Petit", amountEur: 38 },
        { id: "mitja", label: "Mitjà", amountEur: 48 },
        { id: "gran", label: "Gran", amountEur: 68 },
      ],
    },
    imagePaths: ["/images/products/ram-de-flors-seques-de-primavera.webp"],
  },
  {
    slug: "ram",
    name: "Ram",
    description:
      "Ram fresc per a tot tipus d’ocasions: aniversaris, felicitacions, detalls corporatius i celebracions.",
    category: "Rams",
    price: {
      kind: "variants",
      options: [
        { id: "petit", label: "Petit", amountEur: 38 },
        { id: "mitja", label: "Mitjà", amountEur: 48 },
        { id: "gran", label: "Gran", amountEur: 68 },
      ],
    },
    imagePaths: ["/images/products/ram.webp"],
  },
  {
    slug: "terrari",
    name: "Terrari",
    description:
      "Terrari amb plantes i decoració. Pregunta’ns per les varietats disponibles i les cures que necessita.",
    category: "Terraris",
    price: {
      kind: "variants",
      options: [
        { id: "mini", label: "Mini", amountEur: 35 },
        { id: "petit", label: "Petit", amountEur: 43 },
        { id: "mitja", label: "Mitjà", amountEur: 58 },
        { id: "gran", label: "Gran", amountEur: 68 },
        { id: "xl", label: "Xl", amountEur: 98 },
      ],
    },
    imagePaths: ["/images/products/terrari.webp"],
  },
  {
    slug: "taller-jardineria",
    name: "Taller jardineria",
    description:
      "Taller pràctic per aprendre conceptes bàsics de jardineria i disseny d’espais verds. Consulta calendari i places a la botiga.",
    category: "Tallers",
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-jardineria.webp"],
  },
  {
    slug: "taller-kokedama",
    name: "Taller Kokedama",
    description:
      "Taller per crear la teva pròpia kokedama: bola de musgo amb planta que pots penjar o exposar sobre ceràmica.",
    category: "Tallers",
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-kokedama.webp"],
  },
  {
    slug: "os-de-peluix",
    name: "Os de peluix",
    description:
      "Os de peluix suau, ideal com a detall per a naixements, aniversaris o qualsevol ocasió especial.",
    category: "Regals i decoració",
    price: { kind: "fixed", amountEur: 18 },
    imagePaths: ["/images/products/os-de-peluix.webp"],
  },
];

const productBySlug = new Map(SHOP_PRODUCTS.map((p) => [p.slug, p]));

export function getProductBySlug(slug: string): ShopProduct | undefined {
  return productBySlug.get(slug);
}

export function getAllProductSlugs(): string[] {
  return SHOP_PRODUCTS.map((p) => p.slug);
}

/** Resolves the unit price for a cart line; unknown or missing variant uses the cheapest option. */
export function getLineUnitPriceEur(
  price: ProductPrice,
  variantId?: string
): number {
  if (price.kind === "fixed") return price.amountEur;
  const match = variantId
    ? price.options.find((o) => o.id === variantId)
    : undefined;
  if (match) return match.amountEur;
  return Math.min(...price.options.map((o) => o.amountEur));
}

export function getVariantLabel(
  price: ProductPrice,
  variantId?: string
): string | undefined {
  if (price.kind !== "variants") return undefined;
  return price.options.find((o) => o.id === variantId)?.label;
}
