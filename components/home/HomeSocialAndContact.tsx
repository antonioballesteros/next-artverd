import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SocialLinksList } from "../social/SocialLinksList";
import { ScrollConvergePair } from "../ScrollConvergePair";
import { HomeSubtitle } from "./HomeSubtitle";
import { StoreGoogleMapEmbed } from "./StoreGoogleMapEmbed";

export async function HomeSocialAndContact() {
  const t = await getTranslations("home.socialAndContact");

  return (
    <section className="bg-emerald-50/50" aria-labelledby="social-heading">
      <HomeSubtitle>{t("subtitle")}</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-14"
        left={
          <div className="flex flex-col gap-2 text-center">
            <h3
              id="social-heading"
              className="text-2xl font-semibold text-emerald-950 md:text-3xl"
            >
              {t("socialHeading")}
            </h3>
            <SocialLinksList />
          </div>
        }
        right={
          <div className="flex flex-col text-center">
            <h3 className="text-2xl font-semibold text-emerald-950 md:text-3xl">
              {t("contactHeading")}
            </h3>
            <ul className="mx-auto mt-6 flex flex-wrap gap-3 text-emerald-900/90">
              <li className="flex gap-2 leading-relaxed">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                  aria-hidden
                />
                <span>
                  {t("addressName")}
                  <br />
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
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
      <StoreGoogleMapEmbed />
    </section>
  );
}
