import type { AppLocale } from "@/i18n/routing";

interface EventReason {
  title: string;
  body: string;
}

interface RichTextSegment {
  type: "text" | "strong";
  value: string;
}

interface PerqueTriarArtVerdContent {
  title: string;
  intro: string;
  leadIn: string;
  reasons: EventReason[];
  closingSegments: RichTextSegment[];
  headerImageAlt: string;
}

const PERQUE_TRIAR_ARTVERD_CONTENT: Record<AppLocale, PerqueTriarArtVerdContent> = {
  ca: {
    title: "¿Perqué triar Artverd pels teus events especials?",
    intro:
      "Les flors són un element essencial en qualsevol celebració: casaments, batejos, comunions, aniversaris i molt més. No només decoren els espais i aporten color i vida, sinó que també transmeten emocions i sentiments. A Artverd, la floristeria de Terrassa des de l’any 2000, ens apassiona crear arranjaments florals únics i personalitzats per a cada ocasió, perquè sabem com n’és d’important que els teus esdeveniments especials siguin inoblidables.",
    leadIn:
      "Aquí et presentem algunes de les raons per les quals hauríeu de triar flors d’Artverd per a les vostres celebracions:",
    reasons: [
      {
        title: "Varietat i qualitat",
        body: "A Artverd comptem amb una àmplia selecció de flors fresques i de qualitat, de temporada i d’importació, que ens permeten crear arranjaments florals espectaculars i duradors. A més, disposem de varietats exòtiques i exclusives que no trobaràs a altres floristeries de Terrassa.",
      },
      {
        title: "Disseny personalitzat",
        body: "Ens agrada escoltar els nostres clients i entendre els seus gustos i preferències, per poder crear arranjaments florals que reflecteixin la seva personalitat i estil. Ja sigui un ram de núvia, un centre de taula, un ram pels cabells o qualsevol altre tipus d’arranjament, a Artverd ens assegurem que sigui únic i especial.",
      },
      {
        title: "Servei integral",
        body: "A Artverd ens encarreguem de tot el necessari perquè les flors del teu esdeveniment llueixin perfectes: des de la selecció i compra de les flors, fins al disseny, la preparació i el muntatge dels arranjaments. A més, oferim servei de lliurament a domicili a Terrassa i rodalies, perquè puguis gaudir de les teves flors sense preocupacions.",
      },
      {
        title: "Experiència i passió",
        body: "El nostre equip de professionals fa anys que treballa al món de les flors i la decoració, i compta amb una àmplia experiència en la creació d’arranjaments florals per a tot tipus d’esdeveniments. Però més enllà de l’experiència, allò que ens mou és la passió per la nostra feina i el desig de fer realitat els teus somnis i emocions a través de les flors.",
      },
    ],
    closingSegments: [
      { type: "text", value: "En definitiva, si cerques " },
      { type: "strong", value: "una floristeria a Terrassa" },
      {
        type: "text",
        value:
          " que t’ofereixi varietat, qualitat, disseny personalitzat, servei integral, experiència i passió, no dubtis en contactar amb Art Verd. Estarem encantats d’ajudar-te a crear un esdeveniment inoblidable i ple de flors.",
      },
    ],
    headerImageAlt: "Flors i decoració per a esdeveniments especials",
  },
  es: {
    title: "¿Por qué elegir Artverd para tus eventos especiales?",
    intro:
      "Las flores son un elemento esencial en cualquier celebración: bodas, bautizos, comuniones, aniversarios y mucho más. No solo decoran los espacios y aportan color y vida, también transmiten emociones y sentimientos. En Artverd, floristería de Terrassa desde el año 2000, nos apasiona crear arreglos florales únicos y personalizados para cada ocasión, porque sabemos lo importante que es que tus eventos especiales sean inolvidables.",
    leadIn:
      "Aquí te presentamos algunas de las razones por las que deberías elegir flores de Artverd para tus celebraciones:",
    reasons: [
      {
        title: "Variedad y calidad",
        body: "En Artverd contamos con una amplia selección de flores frescas y de calidad, de temporada y de importación, que nos permiten crear arreglos florales espectaculares y duraderos. Además, disponemos de variedades exóticas y exclusivas que no encontrarás en otras floristerías de Terrassa.",
      },
      {
        title: "Diseño personalizado",
        body: "Nos gusta escuchar a nuestros clientes y entender sus gustos y preferencias para crear arreglos florales que reflejen su personalidad y estilo. Ya sea un ramo de novia, un centro de mesa, un tocado floral o cualquier otro tipo de arreglo, en Artverd nos aseguramos de que sea único y especial.",
      },
      {
        title: "Servicio integral",
        body: "En Artverd nos encargamos de todo lo necesario para que las flores de tu evento luzcan perfectas: desde la selección y compra de flores hasta el diseño, la preparación y el montaje de los arreglos. Además, ofrecemos servicio de entrega a domicilio en Terrassa y alrededores para que disfrutes de tus flores sin preocupaciones.",
      },
      {
        title: "Experiencia y pasión",
        body: "Nuestro equipo de profesionales lleva años trabajando en el mundo de las flores y la decoración, y cuenta con una amplia experiencia en la creación de arreglos florales para todo tipo de eventos. Pero más allá de la experiencia, lo que nos mueve es la pasión por nuestro trabajo y el deseo de hacer realidad tus sueños y emociones a través de las flores.",
      },
    ],
    closingSegments: [
      { type: "text", value: "En definitiva, si buscas " },
      { type: "strong", value: "una floristería en Terrassa" },
      {
        type: "text",
        value:
          " que te ofrezca variedad, calidad, diseño personalizado, servicio integral, experiencia y pasión, no dudes en contactar con Art Verd. Estaremos encantados de ayudarte a crear un evento inolvidable y lleno de flores.",
      },
    ],
    headerImageAlt: "Flores y decoración para eventos especiales",
  },
};

export function getPerqueTriarArtVerdContent(locale: AppLocale) {
  return PERQUE_TRIAR_ARTVERD_CONTENT[locale];
}
