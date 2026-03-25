export const ABRIL_MES_FLORS_TITLE = "Abril el mes de les flors";

export const ABRIL_MES_FLORS_DESCRIPTION =
  "Desprès d’un hivern llarg i fred, Abril marca el començament de primavera: natura que desperta, camps i jardins plens de flors, i les primeres flors del mes.";

export const ABRIL_MES_FLORS_INTRO_FIRST =
  "Desprès d’un hivern llarg i fred, Abril marca el començament de primavera. La gent surt a l’aire lliure a gaudir del clima i els dies es fan més llargs. La natura desperta i els camps i jardins s’omplen de flors de tots els colors. Les flors comencen a florir i el mon s’omple de colors.";

export const ABRIL_MES_FLORS_INTRO_LAST =
  "Les flors primerenques del mes d’abril són molt esperades pels que estimen les plantes, per decorar patis, racons, balcons i finestres, i es comencen a veure els rams acompanyant els fragants vestits de les núvies.";

/**
 * Middle paragraph with inline emphasis (legacy bold flower names).
 * Segments alternate: plain text, then highlighted word, then plain, …
 */
export const ABRIL_MES_FLORS_MIDDLE_SEGMENTS: Array<
  { type: "text"; value: string } | { type: "strong"; value: string }
> = [
  {
    type: "text",
    value:
      "Abril s’engalana amb flors fresques, i les cases s’omplen de tulipes, narcisos, margarides, crocus i liles. La ",
  },
  { type: "strong", value: "margarida" },
  {
    type: "text",
    value: " és considerada la flor del mes d’abril. També brollen els ",
  },
  { type: "strong", value: "jacints" },
  {
    type: "text",
    value: ", molt adients per decorar taules. Els ",
  },
  { type: "strong", value: "lliris blancs" },
  {
    type: "text",
    value:
      ", d’increïble aroma i bellesa, són un altre símbol d’aquesta incipient primavera. També podem collir les primeres ",
  },
  { type: "strong", value: "boronies" },
  {
    type: "text",
    value: ", una flor de color rosa, delicada i dolça. Les ",
  },
  { type: "strong", value: "liles" },
  {
    type: "text",
    value:
      " comencen a alçar-se als camps, amb la seva figura esvelta. Les fantàstiques ",
  },
  { type: "strong", value: "peònies" },
  { type: "text", value: ", " },
  { type: "strong", value: "narcisos" },
  { type: "text", value: " i " },
  { type: "strong", value: "tulipes" },
  {
    type: "text",
    value: ", germinen al mateix temps en un espectacle fantàstic.",
  },
];
