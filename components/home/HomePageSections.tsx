import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";

export { HomeHero } from "./HomeHero";

export function HomeIntro() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-14 md:py-20"
      aria-labelledby="intro-heading"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2
            id="intro-heading"
            className="text-2xl font-semibold text-emerald-950 md:text-3xl"
          >
            Floristeria ArtVerd
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-emerald-900/90 md:text-lg">
            <p>
              A la floristeria ArtVerd trobaràs rams, plantes i objectes de
              decoració per fer un regal únic i personalitzat, per cada ocasió.
              Sigui un ram de flors per un ésser estimat, per celebrar un
              naixement o un aniversari, o per organitzar el teu casament.
              Regala flors per a qualsevol ocasió.
            </p>
            <p>
              La teva floristeria a Terrassa: estem al centre, molt a prop de
              Mútua de Terrassa. Fem lliuraments a domicili.
            </p>
          </div>
          <ul className="mt-8 max-w-2xl list-disc space-y-2 pl-5 text-emerald-900/90 md:text-lg">
            <li>
              Àmplia varietat de plantes per cada racó, així com l’assessorament
              per tenir-ne cura.
            </li>
            <li>
              Accessoris per decorar la teva llar amb estil i personalitat.
            </li>
            <li>Events florals.</li>
          </ul>
          <p className="mt-8">
            <Link
              href="/botiga"
              className="inline-flex font-semibold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-950"
            >
              Coneix la botiga
            </Link>
          </p>
        </div>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
          <Image
            src={artverdImages.tenda}
            alt="Interior de la floristeria ArtVerd a Terrassa"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

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
                <div className="relative aspect-[4/3] w-full overflow-hidden">
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

export function HomeBestSeller() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-14 md:py-20"
      aria-labelledby="bestseller-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-md lg:order-first">
          <Image
            src={artverdImages.bestSeller}
            alt="Selecció de productes destacats i best seller"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="lg:order-last">
          <h2
            id="bestseller-heading"
            className="text-2xl font-semibold text-emerald-950 md:text-3xl"
          >
            Novetats · Best seller
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
            Els nostres productes best seller són els més venuts i apreciats
            pels nostres clients. Descobreix la nostra selecció de productes
            destacats i troba el que millor s’adapti a les teves necessitats. A
            ArtVerd, t’oferim la millor qualitat i varietat de flors i plantes
            perquè el teu espai es converteixi en un lloc únic i especial.
          </p>
          <p className="mt-8">
            <Link
              href="/categoria/best-seller"
              className="inline-flex rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
            >
              Botiga
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomeWorkshops() {
  return (
    <section
      className="border-t border-emerald-900/10 bg-white px-4 py-14 md:py-20"
      aria-labelledby="workshops-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="workshops-heading"
              className="text-2xl font-semibold text-emerald-950 md:text-3xl"
            >
              Tallers florals
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
              Descobreix els nostres tallers florals a ArtVerd i aprèn a crear
              arranjaments espectaculars amb les millors flors i plantes.
              T’oferim tallers per a tots els nivells, des de principiants fins
              a experts, perquè puguis gaudir de l’art floral independentment de
              la teva experiència. Vine a viure una experiència única i creativa
              amb nosaltres, a Terrassa.
            </p>
            <p className="mt-8">
              <Link
                href="/tallers"
                className="inline-flex font-semibold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-950"
              >
                Coneix els nostres tallers
              </Link>
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-md">
            <Image
              src={artverdImages.workshopsRams}
              alt="Rams i arranjaments florals per als tallers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface Testimonial {
  quote: string;
  author: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Flores y ramos muy bonitos; por Sant Jordi les compré el ramo de Sant Jordi más bonito que había visto nunca y muy bien de precio.",
    author: "Max Power",
  },
  {
    quote:
      "Una noia amb molt traça i molt bon gust. No és pas una floristeria convencional!",
    author: "ramon grimalt",
  },
  {
    quote:
      "Flors i rams preciosos i a més mil detalls per inspirar-te! Hi tornaré segur!",
    author: "Ariadna Orriols",
  },
  {
    quote:
      "Tienen plantas exóticas, artículos preciosos de decoración y arreglos florales preciosos; además de ser muy amable y profesional.",
    author: "Andrea M.",
  },
  {
    quote:
      "Una botiga molt variada i una dependenta amb molt bon gust. Un plaer.",
    author: "Guillem Miralles",
  },
  {
    quote: "Un magnífic espai a Terrassa… deixeu-vos sorprendre i aconsellar.",
    author: "Áran GV",
  },
];

export function HomeTestimonials() {
  return (
    <section
      className="relative border-t border-emerald-900/10 bg-emerald-50/50 px-4 py-14 md:py-20"
      aria-labelledby="reviews-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: `url(${artverdImages.flowerSectionBg})` }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <h2
          id="reviews-heading"
          className="text-2xl font-semibold text-emerald-950 md:text-3xl"
        >
          Els nostres clients opinen
        </h2>
        <p className="mt-2 text-sm text-emerald-800/80">
          Opinions recollides de ressenyes públiques sobre la botiga (contingut
          estàtic en aquesta fase).
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.author}
              className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm"
            >
              <p className="leading-relaxed text-emerald-900/90">“{t.quote}”</p>
              <p className="mt-4 font-semibold text-emerald-950">{t.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface SocialLink {
  href: string;
  label: string;
  iconSrc?: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.instagram.com/art.verd/?hl=es",
    label: "Instagram",
    iconSrc: artverdImages.socialInstagram,
  },
  {
    href: "https://www.facebook.com/artverdflors/?locale=es_ES",
    label: "Facebook",
    iconSrc: artverdImages.socialFacebook,
  },
  { href: "https://www.tiktok.com/@Art.verd", label: "TikTok" },
];

export function HomeSocialAndContact() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-14 md:py-20"
      aria-labelledby="social-heading"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2
            id="social-heading"
            className="text-2xl font-semibold text-emerald-950 md:text-3xl"
          >
            Les nostres xarxes socials
          </h2>
          <ul className="mt-6 flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-5 py-2 font-medium text-emerald-900 transition hover:border-emerald-700 hover:bg-emerald-50"
                >
                  {s.iconSrc ? (
                    <Image
                      src={s.iconSrc}
                      alt=""
                      width={22}
                      height={22}
                      className="size-[22px] shrink-0"
                      aria-hidden
                    />
                  ) : null}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-emerald-950 md:text-3xl">
            Contacta amb nosaltres per les teves comandes
          </h2>
          <ul className="mt-6 space-y-3 text-emerald-900/90">
            <li>
              <a
                href="tel:+34682242445"
                className="font-semibold text-emerald-800 hover:underline"
              >
                682 242 445
              </a>
            </li>
            <li className="leading-relaxed">
              Artverd Floristeria
              <br />
              Carrer Cardaire, 11
              <br />
              08221 Terrassa (Barcelona)
            </li>
            <li>
              <a
                href="mailto:artverd@gmail.com"
                className="text-emerald-800 hover:underline"
              >
                artverd@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
