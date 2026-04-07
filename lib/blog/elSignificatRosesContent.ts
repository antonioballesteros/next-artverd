export type RoseAccent =
  | "vermella"
  | "blanca"
  | "groga"
  | "taronja"
  | "rosa"
  | "blava";

export interface RoseMeaningSection {
  accent: RoseAccent;
  title: string;
  paragraphs: string[];
}

import type { AppLocale } from "@/i18n/routing";

interface ElSignificatRosesContent {
  title: string;
  intro: string[];
  sections: RoseMeaningSection[];
  headerImageAlt: string;
}

const EL_SIGNIFICAT_ROSES_SECTIONS_CA: RoseMeaningSection[] = [
  {
    accent: "vermella",
    title: "Vermella: passió",
    paragraphs: [
      "A més de ser la més tradicional de Sant Jordi, la rosa vermella s’associa a l’amor romàntic i per això és ideal per a parelles enamorades. És símbol de passió, sexualitat i erotisme. Però també es pot regalar a persones molt especials en la nostra vida com a mostra de respecte. En la pintura s’utilitza molt en aquest sentit. De fet, simbolitza la sang que brolla del drac quan és ferit per Sant Jordi.",
    ],
  },
  {
    accent: "blanca",
    title: "Blanca: puresa",
    paragraphs: [
      "Les roses blanques són un símbol de puresa i innocència. Per això moltes núvies les porten als seus rams: significa que el matrimoni durarà tota la vida. Si la regalem a la nostra parella, li estem dient, implícitament, que esperem un futur sòlid amb ella. També se sol regalar de pares a fills o entre amics: a algú amb qui es manté una relació més aviat intel·lectual o espiritual o amb qui es vol començar de nou d’una manera més sincera.",
    ],
  },
  {
    accent: "groga",
    title: "Groga: amistat",
    paragraphs: [
      "Per una banda és el color del sol i significa llum, alegria, optimisme i amistat. Per això és ideal per regalar a un bon amic o amiga amb qui estem segurs que no volem anar més enllà. També podem regalar-la a algú a qui volem transmetre bona energia, com ara un familiar o amic que és a l’hospital, per demostrar que li desitgem tota la salut del món. El groc, però, també pot simbolitzar gelosia, mentida o traïció. Així que els més supersticiosos s’ho podrien prendre com una advertència.",
    ],
  },
  {
    accent: "taronja",
    title: "Taronja: creativitat",
    paragraphs: [
      "Normalment es regala als amics perquè és un color molt alegre i vistós, que simbolitza festa, plaer i diversió. En definitiva: energia positiva. Però en realitat el taronja es troba entre el groc i el vermell, i podria voler dir que es vol anar més enllà de l’amistat… Per això, també és ideal per regalar als amics que amb el pas del temps s’han convertit en les vostres actuals parelles. Una altra opció és regalar-la a una persona que està passant un mal moment: el taronja ajuda a millorar l’estat d’ànim i estimula la creativitat.",
    ],
  },
  {
    accent: "rosa",
    title: "Rosa: admiració",
    paragraphs: [
      "Regalar una flor rosada és la forma, mitjançant les flors, d’agrair un favor important. També significa absència de maldat, és a dir, que no hi ha dobles intencions. Per això, també és una manera de mostrar-li a algú que pot confiar en nosaltres. Si es tracta d’un to de rosa suau, simbolitza admiració i simpatia. La podem regalar a algú a qui admirem per la seva valentia o serenitat. Aquest color també pot significar melancolia i introversió, per això una bona opció és regalar-la a algú a qui trobem a faltar.",
    ],
  },
  {
    accent: "blava",
    title: "Blava: confiança",
    paragraphs: [
      "El blau, és símbol de confiança, harmonia i afecte. Les flors blaves aporten calma, és a dir, que són ideals per regalar a aquells que estan passant un moment d’estrès o han de prendre una decisió important. Les flors blaves són molt relaxants i tranquil·litzants. Si li regales roses blaves a algú que està angoixat, l’ajudaràs a sentir-se més calmat.",
    ],
  },
];

const EL_SIGNIFICAT_ROSES_SECTIONS_ES: RoseMeaningSection[] = [
  {
    accent: "vermella",
    title: "Roja: pasión",
    paragraphs: [
      "Además de ser la más tradicional de Sant Jordi, la rosa roja se asocia al amor romántico y por eso es ideal para parejas enamoradas. Es símbolo de pasión, sexualidad y erotismo. Pero también puede regalarse a personas muy especiales como muestra de respeto. En la pintura se utiliza mucho con este sentido. De hecho, simboliza la sangre que brota del dragón cuando Sant Jordi lo hiere.",
    ],
  },
  {
    accent: "blanca",
    title: "Blanca: pureza",
    paragraphs: [
      "Las rosas blancas son un símbolo de pureza e inocencia. Por eso muchas novias las llevan en su ramo: significa que el matrimonio durará toda la vida. Si la regalamos a nuestra pareja, le estamos diciendo implícitamente que esperamos un futuro sólido junto a ella. También suele regalarse de padres a hijos o entre amigos: a alguien con quien se mantiene una relación más intelectual o espiritual, o con quien se quiere empezar de nuevo de forma más sincera.",
    ],
  },
  {
    accent: "groga",
    title: "Amarilla: amistad",
    paragraphs: [
      "Por un lado es el color del sol y significa luz, alegría, optimismo y amistad. Por eso es ideal para regalar a un buen amigo o amiga con quien tenemos claro que no queremos ir más allá. También podemos regalarla a alguien a quien queremos transmitir buena energía, como un familiar o amigo que está en el hospital, para demostrarle que le deseamos toda la salud del mundo. El amarillo, sin embargo, también puede simbolizar celos, mentira o traición. Así que las personas más supersticiosas podrían tomarlo como una advertencia.",
    ],
  },
  {
    accent: "taronja",
    title: "Naranja: creatividad",
    paragraphs: [
      "Normalmente se regala a amigos porque es un color muy alegre y vistoso, que simboliza fiesta, placer y diversión. En definitiva: energía positiva. Pero en realidad el naranja está entre el amarillo y el rojo, y podría querer decir que se quiere ir más allá de la amistad. Por eso también es ideal para regalar a amigos que con el tiempo se han convertido en tu pareja actual. Otra opción es regalarla a una persona que está pasando por un mal momento: el naranja ayuda a mejorar el estado de ánimo y estimula la creatividad.",
    ],
  },
  {
    accent: "rosa",
    title: "Rosa: admiración",
    paragraphs: [
      "Regalar una flor rosada es una forma de agradecer un favor importante mediante las flores. También significa ausencia de maldad, es decir, que no hay dobles intenciones. Por eso también es una manera de mostrar a alguien que puede confiar en nosotros. Si se trata de un tono rosa suave, simboliza admiración y simpatía. Podemos regalarla a alguien a quien admiramos por su valentía o serenidad. Este color también puede significar melancolía e introversión, por lo que una buena opción es regalarla a alguien a quien echamos de menos.",
    ],
  },
  {
    accent: "blava",
    title: "Azul: confianza",
    paragraphs: [
      "El azul es símbolo de confianza, armonía y afecto. Las flores azules aportan calma, así que son ideales para regalar a quienes están pasando por un momento de estrés o deben tomar una decisión importante. Las flores azules son muy relajantes y tranquilizadoras. Si regalas rosas azules a alguien que está angustiado, le ayudarás a sentirse más calmado.",
    ],
  },
];

const EL_SIGNIFICAT_ROSES_CONTENT: Record<AppLocale, ElSignificatRosesContent> = {
  ca: {
    title: "El significat del color de les roses",
    intro: [
      "Més enllà del tradicional color vermell tradicional, per Sant Jordi trobem roses blanques, grogues i fins i tot blaves. Els colors transmeten sensacions i tenen un significat en l’àmbit de la psicologia i també en l’art floral. En el cas de les roses, són símbols antics d’amor i bellesa. La rosa tradicional és la vermella, és un dels símbols de Catalunya, juntament amb l’espiga de blat i, a més, simbolitza la sang del drac de Sant Jordi.",
      "El 90% de les roses que es venen són vermelles. Els colors són subjectius, ja que depenen de cada cultura. Des de l’antiguitat, les flors s’han utilitzat per donar a conèixer i transmetre sentiments, en un llenguatge no verbal. Quin significat tenen aquí?",
    ],
    sections: EL_SIGNIFICAT_ROSES_SECTIONS_CA,
    headerImageAlt: "Roses de diversos colors per Sant Jordi",
  },
  es: {
    title: "El significado del color de las rosas",
    intro: [
      "Más allá del tradicional color rojo, en Sant Jordi encontramos rosas blancas, amarillas e incluso azules. Los colores transmiten sensaciones y tienen un significado en el ámbito de la psicología y también en el arte floral. En el caso de las rosas, son símbolos antiguos de amor y belleza. La rosa tradicional es la roja, uno de los símbolos de Catalunya junto con la espiga de trigo y, además, representa la sangre del dragón de Sant Jordi.",
      "El 90% de las rosas que se venden son rojas. Los colores son subjetivos, ya que dependen de cada cultura. Desde la antigüedad, las flores se han utilizado para comunicar y transmitir sentimientos, en un lenguaje no verbal. ¿Qué significado tienen aquí?",
    ],
    sections: EL_SIGNIFICAT_ROSES_SECTIONS_ES,
    headerImageAlt: "Rosas de varios colores para Sant Jordi",
  },
};

export function getElSignificatRosesContent(locale: AppLocale) {
  return EL_SIGNIFICAT_ROSES_CONTENT[locale];
}
