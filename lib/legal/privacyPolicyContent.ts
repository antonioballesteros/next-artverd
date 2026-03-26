/**
 * Privacy policy copy (Catalan), aligned with the legacy Spanish legal page
 * https://www.artverd.com/politica-de-privacidad/
 */
export const PRIVACY_POLICY_TITLE = "Política de privacitat";

export const PRIVACY_POLICY_INTRO = [
  "El responsable l’informa sobre la seva política de privacitat respecte del tractament i protecció de les dades de caràcter personal dels usuaris que puguin ser recollides durant la navegació a través del lloc web:",
  "En aquest sentit, el responsable garanteix el compliment de la normativa vigent en matèria de protecció de dades personals, reflectida en la Llei Orgànica 3/2018, de 5 de desembre, de Protecció de Dades Personals i de Garantia de Drets Digitals (LOPDGDD). També compleix el Reglament (UE) 2016/679 del Parlament Europeu i del Consell de 27 d’abril de 2016 relatiu a la protecció de les persones físiques (RGPD).",
] as const;

/** Closing intro line (legal notice link rendered in the page). */
export const PRIVACY_POLICY_INTRO_CLOSING_BEFORE_LINK =
  "L’ús del lloc web implica l’acceptació d’aquesta política de privacitat així com les condicions incloses a l’";

export const PRIVACY_POLICY_FINALITAT_LEAD =
  "Quan es connecta al lloc web per enviar un correu al responsable, subscriure’s al butlletí o facilitar informació de caràcter personal, el responsable del tractament és el titular. Aquesta informació pot incloure dades com l’adreça IP, nom i cognoms, adreça física, correu electrònic, número de telèfon i altra informació. En facilitar aquesta informació, dóna el seu consentiment perquè la seva informació sigui recollida, utilitzada, gestionada i emmagatzemada per ROSA MARIA MARTI ESCAYOL només com es descriu a les pàgines:";

export interface PrivacyPolicySection {
  id: string;
  heading: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
  /** Paragraphs after optional list */
  trailingParagraphs?: readonly string[];
}

export const PRIVACY_POLICY_SECTIONS: readonly PrivacyPolicySection[] = [
  {
    id: "identitat",
    heading: "Identitat del responsable",
    listItems: [
      "Responsable: ROSA MARIA MARTI ESCAYOL.",
      "NIF: 39166313G",
      "Domicili: Carrer del Cardaire, 11, 08221 Terrassa, Barcelona, Barcelona — Espanya.",
      "Correu electrònic: artverd@gmail.com",
      "Lloc web: https://www.artverd.com",
    ],
  },
  {
    id: "principis",
    heading: "Principis aplicats en el tractament de dades",
    paragraphs: [
      "En el tractament de les seves dades personals, el responsable aplicarà els principis següents, que s’ajusten a les exigències del nou reglament europeu de protecció de dades (RGPD):",
    ],
    listItems: [
      "Principi de licitud, lleialtat i transparència: el responsable sempre requerirà el consentiment per al tractament de les dades personals, que pot ser per un o diversos fins específics sobre els quals informarà l’usuari prèviament amb absoluta transparència.",
      "Principi de minimització de dades: el responsable sol·licitarà només les dades estrictament necessàries per al fi o els fins que les sol·licita.",
      "Principi de limitació del termini de conservació: el responsable mantindrà les dades personals recollides durant el temps estrictament necessari per al fi o els fins del tractament. Informarà l’usuari del termini de conservació corresponent segons la finalitat. En el cas de subscripcions, el responsable revisarà periòdicament les llistes i eliminarà aquells registres inactius durant un temps considerable.",
      "Principi d’integritat i confidencialitat: les dades personals recollides es tractaran de manera que la seva seguretat, confidencialitat i integritat estiguin garantides. El responsable pren les precaucions necessàries per evitar l’accés no autoritzat o l’ús indegut de les dades dels seus usuaris per part de tercers.",
    ],
  },
  {
    id: "obtencio",
    heading: "Obtenció de dades personals",
    paragraphs: [
      "Per navegar pel lloc web no és necessari que faciliti cap dada personal.",
    ],
  },
  {
    id: "drets",
    heading: "Drets",
    paragraphs: [
      "El responsable l’informa que sobre les seves dades personals té dret a:",
    ],
    listItems: [
      "Sol·licitar l’accés a les dades emmagatzemades.",
      "Sol·licitar una rectificació o la supressió.",
      "Sol·licitar la limitació del seu tractament.",
      "Oposar-se al tractament.",
    ],
    trailingParagraphs: [
      "No pot exercir el dret a la portabilitat de les dades.",
      "L’exercici d’aquests drets és personal i, per tant, ha de ser exercit directament per l’interessat, sol·licitant-ho directament al responsable; això significa que qualsevol client, subscriptor o col·laborador que hagi facilitat les seves dades en algun moment pot adreçar-se al responsable i demanar informació sobre les dades que té emmagatzemades i com les ha obtingut, sol·licitar-ne la rectificació, oposar-se al tractament, limitar-ne l’ús o sol·licitar-ne la supressió als fitxers del responsable.",
      "Per exercir els seus drets ha d’enviar la seva petició juntament amb una fotocòpia del document nacional d’identitat o equivalent a la bústia de correu electrònic: artverd@gmail.com",
      "L’exercici d’aquests drets no inclou cap dada que el responsable estigui obligat a conservar amb fins administratius, legals o de seguretat.",
      "Té dret a la tutela judicial efectiva i a presentar una reclamació davant l’autoritat de control, en aquest cas l’Agència Espanyola de Protecció de Dades, si considera que el tractament de dades personals que li concerneixen infringeix el Reglament.",
    ],
  },
  {
    id: "finalitat",
    heading: "Finalitat del tractament de dades personals",
    paragraphs: [
      "Les dades personals i la finalitat del tractament per part del responsable són diferents segons el sistema de captura d’informació.",
      "Existeixen altres finalitats per les quals el responsable tracta dades personals:",
    ],
    listItems: [
      "Per garantir el compliment de les condicions recollides a la pàgina d’avís legal i de la llei aplicable. Això pot incloure el desenvolupament d’eines i algoritmes que ajudin el lloc web a garantir la confidencialitat de les dades personals que recull.",
      "Per donar suport i millorar els serveis que ofereix aquest lloc web.",
      "Per analitzar la navegació dels usuaris. El responsable recull altres dades no identificatives que s’obtenen mitjançant l’ús de galetes que es descarreguen a l’ordinador de l’usuari quan navega pel lloc web; les característiques i la finalitat estan detallades a la pàgina de política de galetes.",
    ],
  },
  {
    id: "seguretat",
    heading: "Seguretat de les dades personals",
    paragraphs: [
      "Per protegir les seves dades personals, el responsable pren totes les precaucions raonables i segueix les millors pràctiques del sector per evitar-ne la pèrdua, mal ús, accés indegut, divulgació, alteració o destrucció.",
      "Les seves dades podran ser incorporades a un fitxer de llista de correu, del qual el responsable en és responsable de la gestió i el tractament. La seguretat de les seves dades està garantida, ja que el responsable pren totes les mesures de seguretat necessàries i li garanteix que les dades personals només s’usaran per a les finalitats indicades.",
      "El responsable informa l’usuari que les seves dades personals no seran cedides a terceres organitzacions, amb la salvedat que aquesta cessió de dades estigui emparada en una obligació legal o quan la prestació d’un servei impliqui la necessitat d’una relació contractual amb un encarregat del tractament. En aquest últim cas, només es durà a terme la cessió de dades al tercer quan el responsable disposi del consentiment exprés de l’usuari.",
      "Tanmateix, en alguns casos es poden realitzar col·laboracions amb altres professionals; en aquests casos es requerirà consentiment a l’usuari informant sobre la identitat del col·laborador i la finalitat de la col·laboració. Sempre es realitzarà amb els estàndards de seguretat més estrictes.",
    ],
  },
  {
    id: "altres-sitios",
    heading: "Contingut d’altres llocs web",
    paragraphs: [
      "Les pàgines d’aquest lloc web poden incloure contingut incrustat (per exemple, vídeos, imatges, articles, etc.). El contingut incrustat d’altres webs es comporta exactament de la mateixa manera que si hagués visitat l’altra web.",
      "Aquests llocs web poden recollir dades sobre vostè, utilitzar galetes, incrustar un codi de seguiment addicional de tercers i supervisar la seva interacció amb aquest codi.",
    ],
  },
  {
    id: "galetes",
    heading: "Política de galetes",
    paragraphs: [
      "Perquè aquest lloc web funcioni correctament cal utilitzar galetes, que són informació que s’emmagatzema al navegador web.",
    ],
  },
  {
    id: "legitimacio",
    heading: "Legitimació per al tractament de dades",
    paragraphs: ["La base legal per al tractament de les seves dades és:"],
    listItems: ["El consentiment de l’interessat."],
  },
  {
    id: "categories",
    heading: "Categories de dades personals",
    paragraphs: ["Les categories de dades personals que tracta el responsable són:"],
    listItems: [
      "Dades identificatives.",
      "No es tracten categories de dades especialment protegides.",
    ],
  },
  {
    id: "conservacio",
    heading: "Conservació de dades personals",
    paragraphs: [
      "Les dades personals facilitades al responsable es conservaran fins que sol·liciti la seva supressió.",
    ],
  },
  {
    id: "navegacio",
    heading: "Navegació web",
    paragraphs: [
      "En navegar pel lloc web es poden recollir dades no identificatives, que poden incloure l’adreça IP, geolocalització, un registre de com s’utilitzen els serveis i llocs, hàbits de navegació i altres dades que no poden ser utilitzades per identificar-lo.",
      "El lloc web utilitza els serveis d’anàlisi de tercers següents:",
      "El responsable utilitza la informació obtinguda per obtenir dades estadístiques, analitzar tendències, administrar el lloc, estudiar patrons de navegació i per recollir informació demogràfica.",
      "El responsable no es fa responsable del tractament de dades personals que facin les pàgines web a les quals pugui accedir a través dels diferents enllaços que conté el lloc web.",
    ],
  },
  {
    id: "exactitud",
    heading: "Exactitud i veracitat de les dades personals",
    paragraphs: [
      "Vostè es compromet a que les dades facilitades al responsable siguin correctes, completes, exactes i vigents, així com a mantenir-les degudament actualitzades.",
      "Com a usuari del lloc web és l’únic responsable de la veracitat i correcció de les dades remeses al lloc web, exonerant el responsable de qualsevol responsabilitat al respecte.",
    ],
  },
  {
    id: "acceptacio",
    heading: "Acceptació i consentiment",
    paragraphs: [
      "Com a usuari del lloc web declara haver estat informat de les condicions sobre protecció de dades de caràcter personal, accepta i consent el tractament d’aquestes per part del responsable de la forma i per a les finalitats indicades en aquesta política de privacitat.",
      "Per contactar amb el responsable, subscriure’s a un butlletí o fer comentaris en aquest lloc web ha d’acceptar la present política de privacitat.",
    ],
  },
  {
    id: "canvis",
    heading: "Canvis en la política de privacitat",
    paragraphs: [
      "El responsable es reserva el dret a modificar la present política de privacitat per adaptar-la a novetats legislatives o jurisprudencials, així com a pràctiques del sector.",
      "Aquestes polítiques estaran vigents fins que siguin modificades per altres degudament publicades.",
    ],
  },
];
