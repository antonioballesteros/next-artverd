import { routing, type AppLocale } from "@/i18n/routing";

/** Single purchasable option when the legacy shop used a variable attribute (e.g. size). */
export interface ProductVariant {
  id: string;
  labels: Record<AppLocale, string>;
  amountEur: number;
}

export interface ProductComplement {
  id: string;
  labels: Record<AppLocale, string>;
  amountEur: number;
}

export interface ProductCustomOption {
  id: string;
  labels: Record<AppLocale, string>;
  minAmountEur: number;
  maxAmountEur: number;
  descriptionLabels: Record<AppLocale, string>;
}
/** How the product is priced in the static catalog. */
export type ProductPrice =
  | { kind: "fixed"; amountEur: number }
  | {
      kind: "variants";
      options: ProductVariant[];
      complements?: ProductComplement[];
      customOption?: ProductCustomOption;
    };

export interface ShopProduct {
  /** URL segment per locale (`/botiga/...` and `/tienda/...`). */
  slugs: Record<AppLocale, string>;
  /** Display title per locale. */
  names: Record<AppLocale, string>;
  descriptions: Record<AppLocale, string>;
  /** Shelf / section label per locale (shop listing). */
  categories: Record<AppLocale, string>;
  price: ProductPrice;
  /** Public paths served from `/public`, e.g. `/images/products/x.webp`. */
  imagePaths: string[];
  soldOut?: boolean;
}

const COMPLEMENTS: ProductComplement[] = [
  { id: "cap", labels: { ca: "Cap", es: "Ninguno" }, amountEur: 0 },
  {
    id: "chocolate",
    labels: { ca: "Chocolate", es: "Chocolate" },
    amountEur: 5,
  },
  {
    id: "os-de-peluix-petit",
    labels: { ca: "Os de peluix petit", es: "Oso de peluche pequeño" },
    amountEur: 5,
  },
  {
    id: "os-de-peluix-mitja",
    labels: { ca: "Os de peluix mitjà", es: "Oso de peluche mediano" },
    amountEur: 12,
  },
  {
    id: "os-de-peluix-gran",
    labels: { ca: "Os de peluix gran", es: "Oso de peluche grande" },
    amountEur: 18,
  },
];

/** Static catalog migrated from the legacy shop (no stock sync). */
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slugs: { ca: "planta", es: "planta" },
    names: { ca: "Planta", es: "Planta" },
    descriptions: {
      ca: "Planta natural en test. Pregunta’ns per les varietats disponibles i les cures que necessita.",
      es: "Planta natural en maceta. Consúltanos por las variedades disponibles y los cuidados que necesita.",
    },
    categories: { ca: "Plantes", es: "Plantas" },
    price: {
      kind: "variants",
      options: [
        {
          id: "petit",
          labels: { ca: "Petit", es: "Pequeño" },
          amountEur: 35,
        },
        {
          id: "mitja",
          labels: { ca: "Mitjà", es: "Mediano" },
          amountEur: 48,
        },
        {
          id: "gran",
          labels: { ca: "Gran", es: "Grande" },
          amountEur: 80,
        },
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
    descriptions: {
      ca: "A la primavera apareix una nova naturalesa i nous colors. Flors seques acolorides i delicades. El ram inclou, entre d’altres, civada, blat, phalaris, limonium, statice, setarea, lagurus i delphinium; la composició pot variar segons la inspiració del moment. Conserva’l en lloc sec i sense humitat directa.",
      es: "En primavera aparece una nueva naturaleza y nuevos colores. Flores secas delicadas y coloridas. El ramo incluye, entre otras, avena, trigo, phalaris, limonium, statice, setaria, lagurus y delphinium; la composición puede variar según la inspiración del momento. Consérvalo en un lugar seco y sin humedad directa.",
    },
    categories: { ca: "Flors seques", es: "Flores secas" },
    price: {
      kind: "variants",
      options: [
        {
          id: "petit",
          labels: { ca: "Petit", es: "Pequeño" },
          amountEur: 38,
        },
        {
          id: "mitja",
          labels: { ca: "Mitjà", es: "Mediano" },
          amountEur: 48,
        },
        {
          id: "gran",
          labels: { ca: "Gran", es: "Grande" },
          amountEur: 68,
        },
      ],
      complements: COMPLEMENTS,
      customOption: {
        id: "personalized",
        labels: { ca: "Personalitzat", es: "Personalizar" },
        minAmountEur: 25,
        maxAmountEur: 80,
        descriptionLabels: {
          ca: "Descriu com vols el teu ram personalitzat",
          es: "Describe como quieres tu ramo personalizado",
        },
      },
    },
    imagePaths: ["/images/products/ram-de-flors-seques-de-primavera.webp"],
  },
  {
    slugs: { ca: "ram", es: "ramo" },
    names: { ca: "Ram", es: "Ramo" },
    descriptions: {
      ca: "Ram fresc per a tot tipus d’ocasions: aniversaris, felicitacions, detalls corporatius i celebracions.",
      es: "Ramo fresco para todo tipo de ocasiones: aniversarios, felicitaciones, detalles corporativos y celebraciones.",
    },
    categories: { ca: "Rams", es: "Ramos" },
    price: {
      kind: "variants",
      options: [
        {
          id: "petit",
          labels: { ca: "Petit", es: "Pequeño" },
          amountEur: 38,
        },
        {
          id: "mitja",
          labels: { ca: "Mitjà", es: "Mediano" },
          amountEur: 48,
        },
        {
          id: "gran",
          labels: { ca: "Gran", es: "Grande" },
          amountEur: 68,
        },
      ],
      complements: COMPLEMENTS,
      customOption: {
        id: "personalized",
        labels: { ca: "Personalitzat", es: "Personalizar" },
        minAmountEur: 25,
        maxAmountEur: 80,
        descriptionLabels: {
          ca: "Descriu com vols el teu ram personalitzat",
          es: "Describe como quieres tu ramo personalizado",
        },
      },
    },
    imagePaths: ["/images/products/ram.webp"],
  },
  {
    slugs: { ca: "terrari", es: "terrario" },
    names: { ca: "Terrari", es: "Terrario" },
    descriptions: {
      ca: "Terrari amb plantes i decoració. Pregunta’ns per les varietats disponibles i les cures que necessita.",
      es: "Terrario con plantas y decoración. Consúltanos por las variedades disponibles y los cuidados que necesita.",
    },
    categories: { ca: "Terraris", es: "Terrarios" },
    price: {
      kind: "variants",
      options: [
        {
          id: "mini",
          labels: { ca: "Mini", es: "Mini" },
          amountEur: 35,
        },
        {
          id: "petit",
          labels: { ca: "Petit", es: "Pequeño" },
          amountEur: 43,
        },
        {
          id: "mitja",
          labels: { ca: "Mitjà", es: "Mediano" },
          amountEur: 58,
        },
        {
          id: "gran",
          labels: { ca: "Gran", es: "Grande" },
          amountEur: 68,
        },
        {
          id: "xl",
          labels: { ca: "Xl", es: "XL" },
          amountEur: 98,
        },
      ],
    },
    imagePaths: ["/images/products/terrari.webp"],
  },
  {
    slugs: { ca: "taller-jardineria", es: "taller-jardineria" },
    names: { ca: "Taller jardineria", es: "Taller de jardinería" },
    descriptions: {
      ca: "Taller pràctic per aprendre conceptes bàsics de jardineria i disseny d’espais verds. Consulta calendari i places a la botiga.",
      es: "Taller práctico para aprender conceptos básicos de jardinería y diseño de espacios verdes. Consulta calendario y plazas en la tienda.",
    },
    categories: { ca: "Tallers", es: "Talleres" },
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-jardineria.webp"],
  },
  {
    slugs: { ca: "taller-kokedama", es: "taller-kokedama" },
    names: { ca: "Taller Kokedama", es: "Taller Kokedama" },
    descriptions: {
      ca: "Taller per crear la teva pròpia kokedama: bola de musgo amb planta que pots penjar o exposar sobre ceràmica.",
      es: "Taller para crear tu propia kokedama: bola de musgo con planta que puedes colgar o exponer sobre cerámica.",
    },
    categories: { ca: "Tallers", es: "Talleres" },
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-kokedama.webp"],
  },
  {
    slugs: { ca: "taller-terrari", es: "taller-terrario" },
    names: { ca: "Taller Terrari", es: "Taller de terrario" },
    descriptions: {
      ca: "Taller per crear la teva pròpia terrari: espai tancat amb plantes i decoració. Pregunta’ns per les varietats disponibles i les cures que necessita.",
      es: "Taller para crear tu propio terrario: espacio cerrado con plantas y decoración. Consúltanos por las variedades disponibles y los cuidados que necesita.",
    },
    categories: { ca: "Tallers", es: "Talleres" },
    price: { kind: "fixed", amountEur: 50 },
    imagePaths: ["/images/products/taller-terrari.webp"],
  },
  {
    slugs: { ca: "os-de-peluix", es: "oso-de-peluche" },
    names: { ca: "Os de peluix", es: "Oso de peluche" },
    descriptions: {
      ca: "Os de peluix suau, ideal com a detall per a naixements, aniversaris o qualsevol ocasió especial.",
      es: "Oso de peluche suave, ideal como detalle para nacimientos, aniversarios o cualquier ocasión especial.",
    },
    categories: {
      ca: "Regals i decoració",
      es: "Regalos y decoración",
    },
    price: {
      kind: "variants",
      options: [
        {
          id: "petit",
          labels: { ca: "Petit", es: "Pequeño" },
          amountEur: 5,
        },
        {
          id: "mitja",
          labels: { ca: "Mitjà", es: "Mediano" },
          amountEur: 12,
        },
        {
          id: "gran",
          labels: { ca: "Gran", es: "Grande" },
          amountEur: 18,
        },
      ],
    },
    imagePaths: ["/images/products/os-de-peluix.webp"],
  },
];

function buildProductBySlugMap(
  products: ShopProduct[]
): Map<string, ShopProduct> {
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

export function getProductDescription(
  product: ShopProduct,
  locale: AppLocale
): string {
  return product.descriptions[locale];
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
export function getProductSlugsForLocale(
  locale: AppLocale
): { slug: string }[] {
  return SHOP_PRODUCTS.map((p) => ({ slug: p.slugs[locale] }));
}

/** Resolves the unit price for a cart line; unknown or missing variant uses the cheapest option. */
export function getLineUnitPriceEur(
  price: ProductPrice,
  variantId?: string,
  complementId?: string,
  customAmountEur?: number
): number {
  if (price.kind === "fixed") return price.amountEur;
  const custom =
    price.customOption && variantId === price.customOption.id
      ? price.customOption
      : undefined;
  const match = variantId
    ? price.options.find((o) => o.id === variantId)
    : undefined;
  const minOptionAmount = Math.min(...price.options.map((o) => o.amountEur));
  const base = custom
    ? customAmountEur &&
      Number.isFinite(customAmountEur) &&
      customAmountEur >= custom.minAmountEur &&
      customAmountEur <= custom.maxAmountEur
      ? customAmountEur
      : custom.minAmountEur
    : (match?.amountEur ?? minOptionAmount);
  const complement = complementId
    ? price.complements?.find((c) => c.id === complementId)
    : undefined;
  const extra = complement?.amountEur ?? 0;
  return base + extra;
}

export function getVariantLabel(
  price: ProductPrice,
  locale: AppLocale,
  variantId?: string,
  complementId?: string,
  customDescription?: string
): string | undefined {
  if (price.kind !== "variants") return undefined;
  const complement = complementId
    ? price.complements?.find((c) => c.id === complementId)
    : undefined;
  const cLabel = complement?.labels[locale];
  const custom =
    price.customOption && variantId === price.customOption.id
      ? price.customOption
      : undefined;
  if (custom) {
    const baseLabel = custom.labels[locale];
    if (customDescription && cLabel)
      return `${baseLabel} · ${customDescription} · ${cLabel}`;
    if (customDescription) return `${baseLabel} · ${customDescription}`;
    if (cLabel) return `${baseLabel} · ${cLabel}`;
    return baseLabel;
  }
  const variant = price.options.find((o) => o.id === variantId);
  const vLabel = variant?.labels[locale];
  if (vLabel && cLabel) return `${vLabel} · ${cLabel}`;
  if (vLabel) return vLabel;
  if (cLabel) return cLabel;
  return undefined;
}
