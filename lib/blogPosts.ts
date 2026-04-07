/** Static blog listing migrated from the legacy WordPress site (artverd.com/blog). */
import type { AppLocale } from "@/i18n/routing";

export interface BlogPostListItem {
  slug: string;
  title: string;
  excerpt: string;
  imageSrc?: string;
  imageAlt: string;
  /** PNG / artwork with transparency: use contain + soft background. */
  imageObjectFit?: "cover" | "contain";
}

const BLOG_POSTS_BY_LOCALE: Record<AppLocale, BlogPostListItem[]> = {
  ca: [
    {
      slug: "perque-triar-art-verd-pels-teus-events-especials",
      title: "¿Perqué triar Artverd pels teus events especials?",
      excerpt:
        "Les flors són un element essencial en qualsevol celebració: casaments, batejos, comunions, aniversaris i molt més. No només decoren els espais i aporten color i vida, sinó que creen un ambient acollidor i elegant.",
      imageSrc: "/images/legacy/blog-triar-art-verd.webp",
      imageAlt: "Flors i decoració per a esdeveniments especials",
    },
    {
      slug: "el-significat-del-color-de-les-roses",
      title: "El significat del color de les roses",
      excerpt:
        "Més enllà del tradicional color vermell tradicional, per Sant Jordi trobem roses blanques, grogues i fins i tot blaves. Els colors transmeten sensacions i tenen un significat propi.",
      imageSrc: "/images/legacy/blog-el-color-de-les-roses.webp",
      imageAlt: "Roses de colors per Sant Jordi",
    },
    {
      slug: "abril-el-mes-de-les-flors",
      title: "Abril el mes de les flors",
      excerpt:
        "Desprès d’un hivern llarg i fred, Abril marca el començament de primavera. La gent surt a l’aire lliure a gaudir del clima i els dies es fan més llargs i assolellats.",
      imageAlt: "Il·lustració floral",
      imageObjectFit: "contain",
    },
  ],
  es: [
    {
      slug: "por-que-elegir-art-verd-para-tus-eventos-especiales",
      title: "¿Por qué elegir Artverd para tus eventos especiales?",
      excerpt:
        "Las flores son un elemento esencial en cualquier celebración: bodas, bautizos, comuniones, aniversarios y mucho más. No solo decoran los espacios y aportan color y vida, también crean un ambiente acogedor y elegante.",
      imageSrc: "/images/legacy/blog-triar-art-verd.webp",
      imageAlt: "Flores y decoración para eventos especiales",
    },
    {
      slug: "el-significado-del-color-de-las-rosas",
      title: "El significado del color de las rosas",
      excerpt:
        "Más allá del tradicional color rojo, en Sant Jordi encontramos rosas blancas, amarillas e incluso azules. Los colores transmiten sensaciones y tienen un significado propio.",
      imageSrc: "/images/legacy/blog-el-color-de-les-roses.webp",
      imageAlt: "Rosas de colores para Sant Jordi",
    },
    {
      slug: "abril-el-mes-de-las-flores",
      title: "Abril, el mes de las flores",
      excerpt:
        "Después de un invierno largo y frío, abril marca el comienzo de la primavera. La gente sale al aire libre para disfrutar del clima y los días se hacen más largos y soleados.",
      imageAlt: "Ilustración floral",
      imageObjectFit: "contain",
    },
  ],
};

export function getBlogPosts(locale: AppLocale): BlogPostListItem[] {
  return BLOG_POSTS_BY_LOCALE[locale];
}
