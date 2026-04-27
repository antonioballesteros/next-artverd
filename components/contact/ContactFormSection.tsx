import { artverdImages } from "@/lib/artverdAssets";
import { elsie } from "@/lib/fonts";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactMessageForm } from "./ContactMessageForm";

export async function ContactFormSection() {
  const t = await getTranslations("contacte.formSection");

  return (
    <section
      className="border-t border-emerald-900/10 bg-[#f3f3f3] pt-0 pb-16 md:pb-20"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div
          className="overflow-hidden rounded-[15px] bg-white bg-size-[min(55%,auto)] bg-position-[left_center] bg-no-repeat px-6 py-14 shadow-sm md:bg-size-[min(48%,auto)] md:px-12 md:py-20"
          style={{
            backgroundImage: `url(${artverdImages.flowerFooterBg})`,
          }}
        >
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
            <div className="md:pr-4">
              <h2
                id="contact-form-heading"
                className={`${elsie.className} text-3xl font-normal text-emerald-900 md:text-4xl`}
              >
                {t("heading")}
              </h2>
              <div className="mt-8">
                <ContactMessageForm />
              </div>
            </div>
            <div
              className="relative flex animate-[decorative-icon-zoom-in-up_0.95s_ease-out_both] justify-center opacity-0 md:justify-end"
              style={{ animationDelay: "120ms", animationFillMode: "forwards" }}
            >
              <Image
                src={artverdImages.artverd}
                alt=""
                width={734}
                height={340}
                className="h-auto w-full max-w-md object-contain md:max-w-lg"
                sizes="(min-width: 768px) 28rem, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
