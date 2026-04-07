import type { AppLocale } from "@/i18n/routing";

interface RichTextSegment {
  type: "text" | "strong";
  value: string;
}

interface AbrilMesFlorsContent {
  title: string;
  introFirst: string;
  introLast: string;
  middleSegments: RichTextSegment[];
}

const ABRIL_MES_FLORS_CONTENT: Record<AppLocale, AbrilMesFlorsContent> = {
  ca: {
    title: "Abril el mes de les flors",
    introFirst:
      "Desprès d’un hivern llarg i fred, Abril marca el començament de primavera. La gent surt a l’aire lliure a gaudir del clima i els dies es fan més llargs. La natura desperta i els camps i jardins s’omplen de flors de tots els colors. Les flors comencen a florir i el mon s’omple de colors.",
    introLast:
      "Les flors primerenques del mes d’abril són molt esperades pels que estimen les plantes, per decorar patis, racons, balcons i finestres, i es comencen a veure els rams acompanyant els fragants vestits de les núvies.",
    middleSegments: [
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
    ],
  },
  es: {
    title: "Abril, el mes de las flores",
    introFirst:
      "Después de un invierno largo y frío, abril marca el comienzo de la primavera. La gente sale al aire libre para disfrutar del clima y los días se hacen más largos. La naturaleza despierta y los campos y jardines se llenan de flores de todos los colores. Las flores empiezan a florecer y el mundo se llena de color.",
    introLast:
      "Las flores tempranas del mes de abril son muy esperadas por quienes aman las plantas, para decorar patios, rincones, balcones y ventanas, y empiezan a verse los ramos acompañando los fragantes vestidos de las novias.",
    middleSegments: [
      {
        type: "text",
        value:
          "Abril se engalana con flores frescas, y las casas se llenan de tulipanes, narcisos, margaritas, crocus y lilas. La ",
      },
      { type: "strong", value: "margarita" },
      {
        type: "text",
        value: " está considerada la flor del mes de abril. También brotan los ",
      },
      { type: "strong", value: "jacintos" },
      {
        type: "text",
        value: ", muy adecuados para decorar mesas. Los ",
      },
      { type: "strong", value: "lirios blancos" },
      {
        type: "text",
        value:
          ", de increíble aroma y belleza, son otro símbolo de esta primavera incipiente. También podemos recoger las primeras ",
      },
      { type: "strong", value: "peonías" },
      {
        type: "text",
        value: ", una flor de color rosa, delicada y dulce. Las ",
      },
      { type: "strong", value: "lilas" },
      {
        type: "text",
        value:
          " empiezan a alzarse en los campos con su figura esbelta. Las fantásticas ",
      },
      { type: "strong", value: "peonías" },
      { type: "text", value: ", " },
      { type: "strong", value: "narcisos" },
      { type: "text", value: " y " },
      { type: "strong", value: "tulipanes" },
      {
        type: "text",
        value: ", germinan al mismo tiempo en un espectáculo fantástico.",
      },
    ],
  },
};

export function getAbrilMesFlorsContent(locale: AppLocale) {
  return ABRIL_MES_FLORS_CONTENT[locale];
}
