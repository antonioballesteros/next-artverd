/** Static blog listing migrated from the legacy WordPress site (artverd.com/blog). */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Original article on the legacy site until individual posts are migrated. */
  legacyUrl: string;
  imageSrc?: string;
  imageAlt: string;
  /** PNG / artwork with transparency: use contain + soft background. */
  imageObjectFit?: "cover" | "contain";
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "perque-triar-artverd-pels-teus-events-especials",
    title: "¿Perqué triar Artverd pels teus events especials?",

    excerpt:
      "Les flors són un element essencial en qualsevol celebració: casaments, batejos, comunions, aniversaris i molt més. No només decoren els espais i aporten color i vida, sinó que creen un ambient acollidor i elegant.",
    legacyUrl:
      "https://www.artverd.com/2023/04/17/por-que-elegir-flores-de-art-verd-para-tus-eventos-especiales/",
    imageSrc: "/images/legacy/blog-triar-art-verd.jpg",
    imageAlt: "Flors i decoració per a esdeveniments especials",
  },
  {
    slug: "el-significat-del-color-de-les-roses",
    title: "El significat del color de les roses",

    excerpt:
      "Més enllà del tradicional color vermell tradicional, per Sant Jordi trobem roses blanques, grogues i fins i tot blaves. Els colors transmeten sensacions i tenen un significat propi.",
    legacyUrl:
      "https://www.artverd.com/2023/04/22/el-significat-del-color-de-les-roses/",
    imageSrc: "/images/legacy/blog-el-color-de-les-roses.jpg",
    imageAlt: "Roses de colors per Sant Jordi",
  },
  {
    slug: "abril-el-mes-de-les-flors",
    title: "Abril el mes de les flors",

    excerpt:
      "Desprès d’un hivern llarg i fred, Abril marca el començament de primavera. La gent surt a l’aire lliure a gaudir del clima i els dies es fan més llargs i assolellats.",
    legacyUrl: "https://www.artverd.com/2023/04/17/abril-el-mes-de-les-flors/",
    imageAlt: "Il·lustració floral",
    imageObjectFit: "contain",
  },
];
