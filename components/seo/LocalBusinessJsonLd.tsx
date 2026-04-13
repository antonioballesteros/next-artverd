import type { AppLocale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo/metadata";

interface LocalBusinessJsonLdProps {
  locale: AppLocale;
}

export function LocalBusinessJsonLd({ locale }: LocalBusinessJsonLdProps) {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: "Art Verd",
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/icon.png`,
    telephone: "+34 937 888 600",
    email: "info@artverd.cat",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer Cardaire, 11",
      addressLocality: "Terrassa",
      addressRegion: "Barcelona",
      postalCode: "08221",
      addressCountry: "ES",
    },
    sameAs: [
      "https://www.instagram.com/art.verd/?hl=es",
      "https://www.facebook.com/artverdflors/?locale=es_ES",
      "https://www.tiktok.com/@Art.verd",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
