import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";

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
