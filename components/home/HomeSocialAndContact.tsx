import { artverdImages } from "@/lib/artverdAssets";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { HomeSubtitle } from "./HomeSubtitle";
import { ScrollConvergePair } from "../ScrollConvergePair";

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
    <section className="bg-emerald-50/50" aria-labelledby="social-heading">
      <HomeSubtitle>Contacta amb nosaltres</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-14"
        left={
          <div className="text-center">
            <h3
              id="social-heading"
              className="text-2xl font-semibold text-emerald-950 md:text-3xl"
            >
              Les nostres xarxes socials
            </h3>
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
        }
        right={
          <div>
            <h3 className="text-2xl font-semibold text-emerald-950 md:text-3xl">
              Contacta amb nosaltres per les teves comandes
            </h3>
            <ul className="mt-6 flex gap-3 text-emerald-900/90">
              <li className="flex gap-2 leading-relaxed">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                  aria-hidden
                />
                <span>
                  Artverd Floristeria
                  <br />
                  Carrer Cardaire, 11
                  <br />
                  08221 Terrassa (Barcelona)
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <a
                  href="mailto:artverd@gmail.com"
                  className="inline-flex items-center gap-2 text-emerald-800 hover:underline"
                >
                  <Mail
                    className="h-5 w-5 shrink-0 text-emerald-700"
                    aria-hidden
                  />
                  artverd@gmail.com
                </a>
                <a
                  href="tel:+34682242445"
                  className="inline-flex items-center gap-2 font-semibold text-emerald-800 hover:underline"
                >
                  <Phone
                    className="h-5 w-5 shrink-0 text-emerald-700"
                    aria-hidden
                  />
                  682 242 445
                </a>
              </li>
            </ul>
          </div>
        }
        once={false}
      />
    </section>
  );
}
