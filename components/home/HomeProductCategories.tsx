import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";

interface ProductCategory {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    href: "/categoria/rams",
    title: "Rams",
    description: "Rams i composicions per a cada moment.",
    imageSrc: artverdImages.categoryRams,
    imageAlt: "Rams i flors naturals",
  },
  {
    href: "/categoria/plantes",
    title: "Plantes",
    description: "Verd per casa i assessorament.",
    imageSrc: artverdImages.categoryPlantes,
    imageAlt: "Plantes en test i decoració verda",
  },
  {
    href: "/categoria/accesoris",
    title: "Accessoris",
    description: "Detalls per decorar amb encant.",
    imageSrc: artverdImages.categoryAccesoris,
    imageAlt: "Accessoris i objectes de decoració",
  },
  {
    href: "/categoria/events",
    title: "Events",
    description: "Flors per celebracions i esdeveniments.",
    imageSrc: artverdImages.categoryEvents,
    imageAlt: "Flors i decoració per a esdeveniments",
  },
];

export function HomeProductCategories() {
  return (
    <section
      className="border-y border-emerald-900/10 bg-emerald-50/60 px-4 py-14 md:py-20"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="products-heading"
          className="text-2xl font-semibold text-emerald-950 md:text-3xl"
        >
          Els nostres productes
        </h2>
        <p className="mt-2 max-w-2xl text-emerald-900/80">
          Explora les línies principals de la botiga. Els enllaços es
          completaran a mesura que migrem cada secció.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={cat.imageSrc}
                    alt={cat.imageAlt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-lg font-semibold text-emerald-950 group-hover:text-emerald-800">
                    {cat.title}
                  </span>
                  <span className="mt-2 text-sm text-emerald-900/75">
                    {cat.description}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-emerald-800">
                    Veure més →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
