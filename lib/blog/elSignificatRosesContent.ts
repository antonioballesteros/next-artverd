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

export const EL_SIGNIFICAT_ROSES_TITLE = "El significat del color de les roses";

/** Open Graph / meta description (Catalan, matches article focus). */
export const EL_SIGNIFICAT_ROSES_DESCRIPTION =
  "Més enllà del color vermell tradicional, per Sant Jordi trobem roses de molts colors. Què signifiquen el vermell, el blanc, el groc, el taronja, el rosa i el blau?";

export const EL_SIGNIFICAT_ROSES_INTRO: string[] = [
  "Més enllà del tradicional color vermell tradicional, per Sant Jordi trobem roses blanques, grogues i fins i tot blaves. Els colors transmeten sensacions i tenen un significat en l’àmbit de la psicologia i també en l’art floral. En el cas de les roses, són símbols antics d’amor i bellesa. La rosa tradicional és la vermella, és un dels símbols de Catalunya, juntament amb l’espiga de blat i, a més, simbolitza la sang del drac de Sant Jordi.",
  "El 90% de les roses que es venen són vermelles. Els colors són subjectius, ja que depenen de cada cultura”. Des de l’antiguitat, les flors s’han utilitzat per donar a conèixer i transmetre sentiments, en un llenguatge no verbal. Quin significat tenen aquí?",
];

export const EL_SIGNIFICAT_ROSES_SECTIONS: RoseMeaningSection[] = [
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
