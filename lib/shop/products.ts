/** How the product is priced in the static catalog. */
export type ProductPrice =
  | { kind: "fixed"; amountEur: number }
  | { kind: "range"; minEur: number; maxEur: number };

export interface ShopProduct {
  slug: string;
  name: string;
  description: string;
  category: string;
  price: ProductPrice;
  /** Public paths served from `/public`, e.g. `/images/products/x.jpg`. */
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
    imagePaths: ["/images/products/planta.jpg"],
  },
  {
    slug: "ram-de-flors-seques-de-primavera",
    name: "Ram de flors seques de primavera",
    description:
      "A la primavera apareix una nova naturalesa i nous colors. Flors seques acolorides i delicades. El ram inclou, entre d’altres, civada, blat, phalaris, limonium, statice, setarea, lagurus i delphinium; la composició pot variar segons la inspiració del moment. Conserva’l en lloc sec i sense humitat directa.",
    category: "Flors seques",
    price: { kind: "range", minEur: 38, maxEur: 73 },
    imagePaths: ["/images/products/ram-de-flors-seques-de-primavera.jpg"],
  },
  {
    slug: "ram",
    name: "Ram",
    description:
      "Ram fresc per a tot tipus d’ocasions: aniversaris, felicitacions, detalls corporatius i celebracions.",
    category: "Rams",
    price: { kind: "range", minEur: 38, maxEur: 73 },
    imagePaths: ["/images/products/ram.jpg"],
  },
  {
    slug: "taller-jardineria",
    name: "Taller jardineria",
    description:
      "Taller pràctic per aprendre conceptes bàsics de jardineria i disseny d’espais verds. Consulta calendari i places a la botiga.",
    category: "Tallers",
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-jardineria.jpg"],
  },
  {
    slug: "taller-kokedama",
    name: "Taller Kokedama",
    description:
      "Taller per crear la teva pròpia kokedama: bola de musgo amb planta que pots penjar o exposar sobre ceràmica.",
    category: "Tallers",
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-kokedama.jpg"],
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

/** Unit price used for cart line totals (range products use the minimum). */
export function getCartUnitPriceEur(price: ProductPrice): number {
  if (price.kind === "fixed") return price.amountEur;
  return price.minEur;
}
