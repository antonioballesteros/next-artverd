import {
  ContactDetailsAndMap,
  ContactFormSection,
  ContactPageSubheader,
} from "@/components/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacte",
  description:
    "Contacta amb Art Verd: formulari, telèfon, correu i adreça a Terrassa.",
};

export default function ContactePage() {
  return (
    <>
      <ContactPageSubheader />
      <ContactFormSection />
      <ContactDetailsAndMap />
    </>
  );
}
