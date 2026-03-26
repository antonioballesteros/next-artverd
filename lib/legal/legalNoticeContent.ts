/**
 * Legal notice copy (Catalan), aligned with the legacy Spanish page
 * https://www.artverd.com/avis-legal/
 */
export const LEGAL_NOTICE_TITLE = "Avís legal";

export const LEGAL_NOTICE_DESCRIPTION =
  "Avís legal d’Art Verd: dades del titular, condicions d’ús, continguts, enllaços, propietat intel·lectual i legislació aplicable.";

export interface LegalNoticeSection {
  id: string;
  heading: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
  trailingParagraphs?: readonly string[];
}

export const LEGAL_NOTICE_IDENTIFICACIO_INTRO =
  "En compliment de l’article 10 de la Llei 34/2002, d’11 de juliol, de serveis de la societat de la informació i el comerç electrònic, el titular exposa les seves dades identificatives:";

export const LEGAL_NOTICE_IDENTIFICACIO_LIST: readonly string[] = [
  "Titular: Susana Fernandez Ballester.",
  "NIF: 45462053T",
  "Domicili: Carrer del Cardaire, 11, 08221 Terrassa, Barcelona, Barcelona — Espanya.",
  "Correu electrònic: artverd@gmail.com",
  "Lloc web: https://www.artverd.com",
];

export const LEGAL_NOTICE_SECTIONS: readonly LegalNoticeSection[] = [
  {
    id: "condicions-us",
    heading: "Condicions d’ús",
    paragraphs: [
      "La utilització del lloc web li atorga la condició d’usuari i implica l’acceptació completa de totes les clàusules i condicions d’ús incloses a les pàgines:",
    ],
    trailingParagraphs: [
      "Si no estigués conforme amb totes i cadascuna d’aquestes clàusules i condicions, abstingui’s d’utilitzar el lloc web.",
      "L’accés al lloc web no suposa, en cap cas, l’inici d’una relació comercial amb el titular.",
      "A través del lloc web, el titular li facilita l’accés i la utilització de diversos continguts que el titular i/o els seus col·laboradors han publicat per mitjà d’Internet.",
      "Amb aquesta finalitat, està obligat i es compromet a NO utilitzar cap dels continguts del lloc web amb fins o efectes il·lícits, prohibits en aquest avís legal o per la legislació vigent, lesius dels drets i interessos de tercers, o que de qualsevol forma puguin danyar, inutilitzar, sobrecarregar, deteriorar o impedir la normal utilització dels continguts, els equips informàtics o els documents, arxius i tota mena de continguts emmagatzemats en qualsevol equip informàtic propi o contractat pel titular, d’altres usuaris o de qualsevol usuari d’Internet.",
    ],
  },
  {
    id: "mesures-seguretat",
    heading: "Mesures de seguretat",
    paragraphs: [
      "Les dades personals que faciliti al titular poden ser emmagatzemades en bases de dades automatitzades o no, la titularitat de les quals correspon en exclusiva al titular, que assumeix totes les mesures d’índole tècnica, organitzativa i de seguretat que garanteixen la confidencialitat, integritat i qualitat de la informació continguda en elles d’acord amb el que estableix la normativa vigent en protecció de dades.",
      "No obstant això, ha de ser conscient que les mesures de seguretat dels sistemes informàtics a Internet no són enterament fiables i que, per tant, el titular no pot garantir la inexistència de virus ni d’altres elements que puguin produir alteracions en els sistemes informàtics (programari i maquinari) de l’usuari o en els seus documents electrònics i fitxers continguts en els mateixos, encara que el titular posa tots els mitjans necessaris i pren les mesures de seguretat oportunes per evitar la presència d’aquests elements nocius.",
    ],
  },
  {
    id: "tractament-dades",
    heading: "Tractament de dades personals",
    paragraphs: [
      "Pot consultar tota la informació relativa al tractament de dades personals que recull el titular a la pàgina de política de privacitat.",
    ],
  },
  {
    id: "continguts",
    heading: "Continguts",
    paragraphs: [
      "El titular ha obtingut la informació, el contingut multimèdia i els materials inclosos al lloc web de fonts que considera fiables, però, tot i haver pres totes les mesures raonables per assegurar que la informació continguda és correcta, el titular no garanteix que sigui exacta, completa o actualitzada. El titular declina expressament qualsevol responsabilitat per error o omissió en la informació continguda a les pàgines del lloc web.",
      "Queda prohibit transmetre o enviar a través del lloc web cap contingut il·legal o il·lícit, virus informàtics o missatges que, en general, afectin o violin drets del titular o de tercers.",
      "Els continguts del lloc web tenen únicament una finalitat informativa i en cap circumstància no s’han d’usar ni considerar com una oferta de venda, sol·licitud d’una oferta de compra ni recomanació per realitzar cap altra operació, tret que així s’indiqui expressament.",
      "El titular es reserva el dret a modificar, suspendre, cancel·lar o restringir el contingut del lloc web, els vincles o la informació obtinguda a través del lloc web, sense necessitat de previ avís.",
      "El titular no és responsable dels danys i perjudicis que poguessin derivar-se de la utilització de la informació del lloc web.",
    ],
  },
  {
    id: "galetes",
    heading: "Política de galetes",
    paragraphs: [
      "Pot consultar tota la informació relativa a la política de recollida i tractament de les galetes a la pàgina de política de galetes.",
    ],
  },
  {
    id: "enllacos",
    heading: "Enllaços a altres llocs web",
    paragraphs: [
      "El titular pot proporcionar-li accés a llocs web de tercers mitjançant enllaços amb la finalitat exclusiva d’informar sobre l’existència d’altres fonts d’informació a Internet en què podrà ampliar les dades ofertes al lloc web.",
      "Aquests enllaços a altres llocs web no suposen en cap cas un suggeriment o recomanació perquè visiti les pàgines web de destinació, que queden fora del control del titular, per la qual cosa el titular no és responsable del contingut dels llocs web vinculats ni del resultat que obtingui en seguir els enllaços. Així mateix, el titular no respon dels enllaços ubicats als llocs web vinculats als quals li proporciona accés.",
      "L’establiment de l’enllaç no implica en cap cas l’existència de relacions entre el titular i el propietari del lloc en què s’estableixi l’enllaç, ni l’acceptació o aprovació per part del titular dels seus continguts o serveis.",
      "Si accedeix a un lloc web extern des d’un enllaç que trobi al lloc web, haurà de llegir la pròpia política de privacitat de l’altre lloc web, que pot ser diferent de la d’aquest lloc web.",
    ],
  },
  {
    id: "propietat-intellectual",
    heading: "Propietat intel·lectual i industrial",
    paragraphs: [
      "Tots els drets estan reservats.",
      "Tot accés a aquest lloc web està subjecte a les condicions següents: la reproducció, l’emmagatzematge permanent i la difusió dels continguts o qualsevol altre ús que tingui finalitat pública o comercial queda expressament prohibit sense el consentiment previ exprés i per escrit del titular.",
    ],
  },
  {
    id: "limitacio-responsabilitat",
    heading: "Limitació de responsabilitat",
    paragraphs: [
      "El titular declina qualsevol responsabilitat en cas que hi hagi interrupcions o un mal funcionament dels serveis o continguts oferts a Internet, sigui quina en sigui la causa. Així mateix, el titular no es fa responsable per caigudes de la xarxa, pèrdues de negoci a conseqüència d’aquestes caigudes, suspensions temporals de fluid elèctric o qualsevol altre tipus de dany indirecte que li pugui ser causat per causes alienes al titular.",
      "Abans de prendre decisions i/o accions amb base a la informació inclosa al lloc web, el titular li recomana comprovar i contrastar la informació rebuda amb altres fonts.",
    ],
  },
  {
    id: "jurisdiccio",
    heading: "Jurisdicció",
    paragraphs: [
      "Aquest avís legal es regeix íntegrament per la legislació espanyola.",
    ],
  },
  {
    id: "contacte",
    heading: "Contacte",
    paragraphs: [
      "En cas que tingui qualsevol dubte sobre aquest avís legal o vulgui fer qualsevol comentari sobre el lloc web, pot enviar un missatge de correu electrònic a l’adreça: artverd@gmail.com",
    ],
  },
];
