import { artverdImages } from "@/lib/artverdAssets";
import { artverdSignature } from "@/lib/fonts";
import { HomeSubtitle } from "./HomeSubtitle";

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
    author: "Ramon Grimalt",
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
    <section className="bg-emerald-50/50" aria-labelledby="reviews-heading">
      <HomeSubtitle>Els nostres clients opinen</HomeSubtitle>
      <div
        className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: `url(${artverdImages.flowerSectionBg})` }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.author}
              className="flex flex-col rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm"
            >
              <p className="leading-relaxed text-emerald-900/90">“{t.quote}”</p>
              <p
                className={`${artverdSignature.className} mt-auto text-right text-xl text-emerald-950`}
              >
                {t.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
