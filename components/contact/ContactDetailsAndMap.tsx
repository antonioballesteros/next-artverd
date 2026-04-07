import { StoreGoogleMapEmbed } from "@/components/home/StoreGoogleMapEmbed";
import { elsie } from "@/lib/fonts";
import { Mail, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SocialLinksList } from "../social/SocialLinksList";

export async function ContactDetailsAndMap() {
  const t = await getTranslations("contacte.details");

  return (
    <section
      className="bg-emerald-900 pt-10 pb-16 md:pt-14 md:pb-20"
      aria-labelledby="contact-details-heading"
    >
      <h2 id="contact-details-heading" className="sr-only">
        {t("srHeading")}
      </h2>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            className="text-center motion-safe:animate-[blog-section-reveal_0.8s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "60ms", animationFillMode: "forwards" }}
          >
            <p className="text-lg font-medium text-[#f8d2a1]">{t("phoneLabel")}</p>
            <p
              className={`${elsie.className} mt-3 text-2xl text-white md:text-3xl`}
            >
              <a
                href="tel:+34682242445"
                className="transition hover:text-emerald-200/95"
              >
                682 242 445
              </a>
            </p>
          </div>
          <div
            className="text-center motion-safe:animate-[blog-section-reveal_0.8s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "140ms", animationFillMode: "forwards" }}
          >
            <p className="flex items-center justify-center gap-2 text-lg font-medium text-[#f8d2a1]">
              <Mail className="h-5 w-5 shrink-0 text-[#f8d2a1]" aria-hidden />
              {t("emailLabel")}
            </p>
            <p className={`${elsie.className} mt-3 text-2xl md:text-3xl`}>
              <a
                href="mailto:info@artverd.com"
                className="text-white transition hover:text-emerald-200/95"
              >
                info@artverd.com
              </a>
            </p>
          </div>
          <div
            className="text-center motion-safe:animate-[blog-section-reveal_0.8s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "220ms", animationFillMode: "forwards" }}
          >
            <p className="flex items-center justify-center gap-2 text-lg font-medium text-[#f8d2a1]">
              <MapPin className="h-5 w-5 shrink-0 text-[#f8d2a1]" aria-hidden />
              {t("addressLabel")}
            </p>
            <p
              className={`${elsie.className} mt-3 text-xl leading-snug text-white md:text-2xl`}
            >
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
            </p>
          </div>
        </div>
        <SocialLinksList className="mt-12 flex w-full justify-center gap-4" />

        <div
          className="mt-12 overflow-hidden rounded-2xl border border-emerald-800/50 shadow-lg motion-safe:animate-[blog-section-reveal_0.9s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:mt-14"
          style={{ animationDelay: "340ms", animationFillMode: "forwards" }}
        ></div>
      </div>
      <StoreGoogleMapEmbed className="mt-0 h-80 w-full md:h-200" />
    </section>
  );
}
