import { routing, type AppLocale } from "@/i18n/routing";

/** Single purchasable option when the legacy shop used a variable attribute (e.g. size). */
export interface ProductVariant {
  id: string;
  label: string;
  amountEur: number;
}

export interface ProductComplement {
  id: string;
  label: string;
  amountEur: number;
}
/** How the product is priced in the static catalog. */
export type ProductPrice =
  | { kind: "fixed"; amountEur: number }
  | {
      kind: "variants";
      options: ProductVariant[];
      complements?: ProductComplement[];
    };

export interface ShopProduct {
  /** URL segment per locale (`/botiga/...` and `/tienda/...`). */
  slugs: Record<AppLocale, string>;
  /** Display title per locale. */
  names: Record<AppLocale, string>;
  description: string;
  /** Shelf / section label per locale (shop listing). */
  categories: Record<AppLocale, string>;
  price: ProductPrice;
  /** Public paths served from `/public`, e.g. `/images/products/x.webp`. */
  imagePaths: string[];
  soldOut?: boolean;
}

const COMPLEMENTS = [
  { id: "cap", label: "Cap", amountEur: 0 },
  { id: "chocolate", label: "Chocolate", amountEur: 5 },
  { id: "os-de-peluix-petit", label: "Os de peluix petit", amountEur: 5 },
  { id: "os-de-peluix-mitja", label: "Os de peluix mitjà", amountEur: 12 },
  { id: "os-de-peluix-gran", label: "Os de peluix gran", amountEur: 18 },
];

/** Static catalog migrated from the legacy shop (no stock sync). */
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slugs: { ca: "planta", es: "planta" },
    names: { ca: "Planta", es: "Planta" },
    description:
      "Planta natural en test. Pregunta’ns per les varietats disponibles i les cures que necessita.",
    categories: { ca: "Plantes", es: "Plantas" },
    price: {
      kind: "variants",
      options: [
        { id: "petit", label: "Petit", amountEur: 35 },
        { id: "mitja", label: "Mitjà", amountEur: 48 },
        { id: "gran", label: "Gran", amountEur: 80 },
      ],
    },
    imagePaths: ["/images/products/planta.webp"],
  },
  {
    slugs: {
      ca: "ram-de-flors-seques-de-primavera",
      es: "ramo-de-flores-secas-de-primavera",
    },
    names: {
      ca: "Ram de flors seques de primavera",
      es: "Ramo de flores secas de primavera",
    },
    description:
      "A la primavera apareix una nova naturalesa i nous colors. Flors seques acolorides i delicades. El ram inclou, entre d’altres, civada, blat, phalaris, limonium, statice, setarea, lagurus i delphinium; la composició pot variar segons la inspiració del moment. Conserva’l en lloc sec i sense humitat directa.",
    categories: { ca: "Flors seques", es: "Flores secas" },
    price: {
      kind: "variants",
      options: [
        { id: "petit", label: "Petit", amountEur: 38 },
        { id: "mitja", label: "Mitjà", amountEur: 48 },
        { id: "gran", label: "Gran", amountEur: 68 },
      ],
      complements: COMPLEMENTS,
    },
    imagePaths: ["/images/products/ram-de-flors-seques-de-primavera.webp"],
  },
  {
    slugs: { ca: "ram", es: "ramo" },
    names: { ca: "Ram", es: "Ramo" },
    description:
      "Ram fresc per a tot tipus d’ocasions: aniversaris, felicitacions, detalls corporatius i celebracions.",
    categories: { ca: "Rams", es: "Ramos" },
    price: {
      kind: "variants",
      options: [
        { id: "petit", label: "Petit", amountEur: 38 },
        { id: "mitja", label: "Mitjà", amountEur: 48 },
        { id: "gran", label: "Gran", amountEur: 68 },
      ],
      complements: COMPLEMENTS,
    },
    imagePaths: ["/images/products/ram.webp"],
  },
  {
    slugs: { ca: "terrari", es: "terrario" },
    names: { ca: "Terrari", es: "Terrario" },
    description:
      "Terrari amb plantes i decoració. Pregunta’ns per les varietats disponibles i les cures que necessita.",
    categories: { ca: "Terraris", es: "Terrarios" },
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
    slugs: { ca: "taller-jardineria", es: "taller-jardineria" },
    names: { ca: "Taller jardineria", es: "Taller de jardinería" },
    description:
      "Taller pràctic per aprendre conceptes bàsics de jardineria i disseny d’espais verds. Consulta calendari i places a la botiga.",
    categories: { ca: "Tallers", es: "Talleres" },
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-jardineria.webp"],
  },
  {
    slugs: { ca: "taller-kokedama", es: "taller-kokedama" },
    names: { ca: "Taller Kokedama", es: "Taller Kokedama" },
    description:
      "Taller per crear la teva pròpia kokedama: bola de musgo amb planta que pots penjar o exposar sobre ceràmica.",
    categories: { ca: "Tallers", es: "Talleres" },
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-kokedama.webp"],
  },
  {
    slugs: { ca: "taller-terrari", es: "taller-terrario" },
    names: { ca: "Taller Terrari", es: "Taller de terrario" },
    description:
      "Taller per crear la teva pròpia terrari: espai tancat amb plantes i decoració. Pregunta’ns per les varietats disponibles i les cures que necessita.",
    categories: { ca: "Tallers", es: "Talleres" },
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-terrari.webp"],
  },
  {
    slugs: { ca: "os-de-peluix", es: "oso-de-peluche" },
    names: { ca: "Os de peluix", es: "Oso de peluche" },
    description:
      "Os de peluix suau, ideal com a detall per a naixements, aniversaris o qualsevol ocasió especial.",
    categories: {
      ca: "Regals i decoració",
      es: "Regalos y decoración",
    },
    price: {
      kind: "variants",
      options: [
        { id: "petit", label: "Petit", amountEur: 5 },
        { id: "mitja", label: "Mitjà", amountEur: 12 },
        { id: "gran", label: "Gran", amountEur: 18 },
      ],
    },
    imagePaths: ["/images/products/os-de-peluix.webp"],
  },
];

function buildProductBySlugMap(products: ShopProduct[]): Map<string, ShopProduct> {
  const map = new Map<string, ShopProduct>();
  for (const p of products) {
    for (const locale of routing.locales) {
      const s = p.slugs[locale];
      const existing = map.get(s);
      if (existing && existing !== p) {
        throw new Error(
          `Duplicate shop slug "${s}" (${locale}): conflicts with another product`
        );
      }
      map.set(s, p);
    }
  }
  return map;
}

const productBySlug = buildProductBySlugMap(SHOP_PRODUCTS);

const defaultLocale = routing.defaultLocale as AppLocale;

/** Stable slug stored in cart and order payloads (`defaultLocale`). */
export function getCartStorageSlug(product: ShopProduct): string {
  return product.slugs[defaultLocale];
}

export function getProductSlug(
  product: ShopProduct,
  locale: AppLocale
): string {
  return product.slugs[locale];
}

export function getProductName(
  product: ShopProduct,
  locale: AppLocale
): string {
  return product.names[locale];
}

export function getProductCategory(
  product: ShopProduct,
  locale: AppLocale
): string {
  return product.categories[locale];
}

/**
 * Workshop products share this `categories` value per locale (for filters like
 * `filterShopProductsByCategory(WORKSHOP_CATEGORY_LABEL[locale], locale)`).
 */
export const WORKSHOP_CATEGORY_LABEL: Record<AppLocale, string> = {
  ca: "Tallers",
  es: "Talleres",
};

export function getProductBySlug(slug: string): ShopProduct | undefined {
  return productBySlug.get(slug);
}

/** Slugs to prerender for one locale (used by `generateStaticParams` for `[slug]`). */
export function getProductSlugsForLocale(locale: AppLocale): { slug: string }[] {
  return SHOP_PRODUCTS.map((p) => ({ slug: p.slugs[locale] }));
}

/** Resolves the unit price for a cart line; unknown or missing variant uses the cheapest option. */
export function getLineUnitPriceEur(
  price: ProductPrice,
  variantId?: string,
  complementId?: string
): number {
  if (price.kind === "fixed") return price.amountEur;
  const match = variantId
    ? price.options.find((o) => o.id === variantId)
    : undefined;
  const base =
    match?.amountEur ?? Math.min(...price.options.map((o) => o.amountEur));
  const complement = complementId
    ? price.complements?.find((c) => c.id === complementId)
    : undefined;
  const extra = complement?.amountEur ?? 0;
  return base + extra;
}

export function getVariantLabel(
  price: ProductPrice,
  variantId?: string,
  complementId?: string
): string | undefined {
  if (price.kind !== "variants") return undefined;
  const vLabel = price.options.find((o) => o.id === variantId)?.label;
  const cLabel = complementId
    ? price.complements?.find((c) => c.id === complementId)?.label
    : undefined;
  if (vLabel && cLabel) return `${vLabel} · ${cLabel}`;
  if (vLabel) return vLabel;
  if (cLabel) return cLabel;
  return undefined;
}
