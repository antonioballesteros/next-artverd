/**
 * Accessibility policy (Catalan), aligned with the legacy Spanish page
 * https://www.artverd.com/politica-de-accesibilidad/
 */
export const ACCESSIBILITY_POLICY_TITLE = "Política d’accessibilitat";

export type AccessibilityPart =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: readonly string[] }
  | {
      kind: "resource-links";
      items: readonly { href: string; title: string; description: string }[];
    };

export interface AccessibilitySection {
  id: string;
  heading: string;
  parts: readonly AccessibilityPart[];
}

export const ACCESSIBILITY_INTRO_PARAGRAPH =
  "En la construcció del lloc web d’Art Verd s’han adoptat mesures amb l’objectiu que el major nombre possible de persones puguin accedir a la informació que s’hi transmet, independentment de les limitacions de la persona o de les que es derivin del context d’ús.";

export const ACCESSIBILITY_MEASURES_INTRO =
  "Així, en la confecció del portal s’han tingut en compte els aspectes següents:";

export const ACCESSIBILITY_MEASURES: readonly string[] = [
  "Ús de CSS per a la presentació de la informació.",
  "Etiquetes de marcatge.",
  "Sistemes de navegació usables, intuïtius i alternatius.",
  "Descripcions alternatives a les imatges.",
  "Verificacions en la visualització amb diferents navegadors i dispositius.",
  "Utilització de formats universals i alternatius.",
  "Els enllaços ofereixen detalls de la funció o destí de l’hipervincle.",
  "Ús dels estàndards del W3C.",
  "Accés mitjançant dreceres de teclat a les principals opcions.",
];

export const ACCESSIBILITY_SECTIONS: readonly AccessibilitySection[] = [
  {
    id: "estandards",
    heading: "Compliment dels estàndards",
    parts: [
      {
        kind: "p",
        text: "Les pàgines d’aquest lloc web es proposen complir la marca AA segons la Norma UNE 139803:2004 i les Directrius d’accessibilitat al contingut web 1.0 del W3C. Els requisits de prioritat 1 i prioritat 2 i un subconjunt dels requisits de prioritat 3 s’han comprovat amb una anàlisi manual de l’accessibilitat mitjançant diferents eines semiautomàtiques i agents d’usuari. El lloc actualitzat amb tecnologies modernes continua treballant per mantenir i millorar aquest nivell de compliment.",
      },
    ],
  },
  {
    id: "dreceres-teclat",
    heading: "Dreceres de teclat",
    parts: [
      {
        kind: "p",
        text: "En aquest lloc web podeu fer salts ordenats pel contingut amb la tecla Tab.",
      },
    ],
  },
  {
    id: "mida-text",
    heading: "Mida del text",
    parts: [
      {
        kind: "p",
        text: "El disseny accessible permet que l’usuari pugui ajustar la mida de la lletra que li convingui. Aquesta acció es pot fer de maneres diferents segons el navegador web que s’utilitzi. A continuació s’indica on es troba habitualment aquesta funcionalitat als navegadors més freqüents:",
      },
      {
        kind: "ul",
        items: [
          "Mozilla Firefox: menú > Mida del text / zoom del text (o Ctrl i + / Ctrl i -).",
          "Microsoft Edge: menú ⋮ > Zoom (o Ctrl i + / Ctrl i -).",
          "Safari: menú Visualitza > Fer el text més gran / més petit (o Cmd i + / Cmd i -).",
          "Google Chrome: menú ⋮ > Zoom (o Ctrl i + / Ctrl i -).",
          "Opera: menú > Zoom (o Ctrl i + / Ctrl i -).",
        ],
      },
    ],
  },
  {
    id: "configuracio-tecnica",
    heading: "Configuració tècnica",
    parts: [
      {
        kind: "p",
        text: "Aquest lloc web públic s’implementa amb Next.js (React) i Tailwind CSS, amb components que busquen una navegació clara i previsibles pautes d’accessibilitat en el desenvolupament.",
      },
    ],
  },
  {
    id: "informacio-util",
    heading: "Informació útil sobre l’accessibilitat",
    parts: [
      {
        kind: "p",
        text: "A continuació s’ofereixen enllaços organitzats per categories útils per obtenir més informació sobre l’accessibilitat.",
      },
      { kind: "h3", text: "Accessibilitat: normes i documents tècnics" },
      {
        kind: "resource-links",
        items: [
          {
            href: "https://www.w3.org/",
            title: "W3C",
            description:
              "Consorci World Wide Web, grup de treball d’àmbit internacional que dicta línies generals relacionades amb la web.",
          },
          {
            href: "https://www.w3.org/WAI/",
            title: "WAI (Web Accessibility Initiative)",
            description: "Iniciativa d’accessibilitat web del W3C.",
          },
        ],
      },
    ],
  },
];
