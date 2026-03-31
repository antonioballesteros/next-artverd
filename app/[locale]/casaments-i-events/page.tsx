import {
  CasamentsClosingNote,
  CasamentsHero,
  CasamentsIntro,
  CasamentsServiceSections,
} from "@/components/casaments";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casaments i events",
  description:
    "Rams de núvia, decoració de cerimònia i banquet, ramets, pastís nupcial i esdeveniments — floristeria ArtVerd a Terrassa.",
};

export default function CasamentsIEventsPage() {
  return (
    <>
      <CasamentsHero />
      <CasamentsIntro />
      <CasamentsServiceSections />
      <CasamentsClosingNote />
    </>
  );
}
