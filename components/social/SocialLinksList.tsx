import { artverdImages } from "@/lib/artverdAssets";
import Image from "next/image";

interface SocialLink {
  href: string;
  label: string;
  iconSrc?: string;
}

const ARTVERD_SOCIAL_LINKS: SocialLink[] = [
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

interface SocialLinksListProps {
  className?: string;
}

export function SocialLinksList({
  className = "mx-auto mt-6 flex flex-wrap gap-4",
}: SocialLinksListProps) {
  return (
    <ul className={className}>
      {ARTVERD_SOCIAL_LINKS.map((s) => (
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
  );
}
