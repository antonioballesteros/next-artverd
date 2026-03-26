/**
 * Terms and conditions (Catalan), aligned with the legacy Spanish page
 * https://www.artverd.com/terminos-y-condiciones/
 */
export const TERMS_AND_CONDITIONS_TITLE = "Termes i condicions";

export const TERMS_AND_CONDITIONS_DESCRIPTION =
  "Termes i condicions d’ús de la botiga Art Verd: compres en línia, llicències, cancel·lacions, reemborsaments, garanties i privacitat.";

export type TermsSectionPart =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: readonly string[] }
  | { kind: "privacy-link" };

export interface TermsSection {
  id: string;
  heading: string;
  parts: readonly TermsSectionPart[];
}

export const TERMS_AND_CONDITIONS_SECTIONS: readonly TermsSection[] = [
  {
    id: "informacio-rellevant",
    heading: "Informació rellevant",
    parts: [
      {
        kind: "p",
        text: "És requisit necessari, per a l’adquisició dels productes que s’ofereixen en aquest lloc, llegir i acceptar els termes i condicions següents. L’ús dels nostres serveis així com la compra dels nostres productes implicarà que ha llegit i acceptat els termes i condicions d’ús del present document. Tots els productes oferts pel nostre lloc web poden ser creats, cobrats, enviats o presentats per una pàgina web de tercers i, en aquest cas, estarien subjectes als seus propis termes i condicions. En alguns casos, per adquirir un producte, serà necessari el registre per part de l’usuari, amb introducció de dades personals fidelines i definició d’una contrasenya.",
      },
      {
        kind: "p",
        text: "L’usuari pot triar i canviar la clau per a l’accés d’administració del compte en qualsevol moment, en cas que s’hagi registrat i que sigui necessari per a la compra d’algun dels nostres productes. https://www.artverd.com/ no assumeix la responsabilitat en cas que lliuri aquesta clau a tercers.",
      },
      {
        kind: "p",
        text: "Totes les compres i transaccions que es duen a terme per mitjà d’aquest lloc web estan subjectes a un procés de confirmació i verificació, que podria incloure la verificació de l’estoc i la disponibilitat del producte, la validació de la forma de pagament, la validació de la factura (en cas d’existir) i el compliment de les condicions requerides pel mitjà de pagament seleccionat. En alguns casos pot ser necessària una verificació per correu electrònic.",
      },
      {
        kind: "p",
        text: "Els preus dels productes oferts en aquesta botiga online són vàlids únicament per a les compres realitzades en aquest lloc web.",
      },
    ],
  },
  {
    id: "llicencia",
    heading: "Llicència",
    parts: [
      {
        kind: "p",
        text: "Susana Fernandez Ballester, a través del seu lloc web, concedeix una llicència perquè els usuaris utilitzin els productes venuts en aquest lloc web d’acord amb els termes i condicions descrits en aquest document.",
      },
    ],
  },
  {
    id: "us-no-autoritzat",
    heading: "Ús no autoritzat",
    parts: [
      {
        kind: "p",
        text: "En cas que apliqui (per a venda de programari, plantilles o un altre producte de disseny i programació), no pot col·locar cap dels nostres productes, modificat o sense modificar, en un CD, lloc web o cap altre mitjà i oferir-los per a la redistribució o la revenda de cap mena.",
      },
    ],
  },
  {
    id: "propietat",
    heading: "Propietat",
    parts: [
      {
        kind: "p",
        text: "No pot declarar propietat intel·lectual o exclusiva sobre cap dels nostres productes, modificats o sense modificar. Tots els productes són propietat dels proveïdors del contingut. En cas que no s’especifiqui el contrari, els nostres productes es proporcionen sense cap tipus de garantia, expressa o implícita. En cap cas aquesta empresa serà responsable de cap dany, incloent-hi, sense limitació, danys directes, indirectes, especials, fortuïts o conseqüents o altres pèrdues resultants de l’ús o de la impossibilitat d’utilitzar els nostres productes.",
      },
    ],
  },
  {
    id: "cancelacions",
    heading: "Política de cancel·lacions",
    parts: [
      {
        kind: "p",
        text: "Actualment, a la nostra botiga online no disposem de productes tangibles i, per tant, no hi ha opció de cancel·lar una comanda ja que tot el contingut és descarregable o digital. Al apartat següent trobarà més informació sobre el reemborsament i la garantia dels nostres productes.",
      },
    ],
  },
  {
    id: "reemborsament-garantia",
    heading: "Política de reemborsament i garantia",
    parts: [
      {
        kind: "p",
        text: "En el cas de productes que siguin mercaderies irrevocables no tangibles, no fem reemborsaments després que s’enviï el producte; vostè té la responsabilitat d’entendre-ho abans de comprar-lo. Li demanem que ho llegeixi amb cura abans de comprar. Fem només excepcions a aquesta regla quan la descripció no s’ajusta al producte. Alguns productes poden tenir garantia i possibilitat de reemborsament, però això s’especificarà en comprar el producte. En tals casos la garantia només cobreix fallades de fàbrica i només es fa efectiva quan el producte s’ha usat correctament. La garantia no cobreix avaries o danys ocasionats per un ús indegut. Els termes de la garantia estan associats a fallades de fabricació i funcionament en condicions normals dels productes i només es faran efectius aquests termes si l’equip s’ha usat correctament. Això inclou:",
      },
      {
        kind: "ul",
        items: [
          "D’acord amb les especificacions tècniques indicades per a cada producte.",
          "En condicions ambientals d’acord amb les especificacions indicades pel fabricant.",
          "En ús específic per a la funció amb què va ser dissenyat de fàbrica.",
          "En condicions de funcionament elèctriques d’acord amb les especificacions i toleràncies indicades.",
        ],
      },
      {
        kind: "p",
        text: "La nostra política dura 30 dies. Si han passat 30 dies des de la compra, malauradament no podem oferir-li un reemborsament ni un canvi.",
      },
      {
        kind: "p",
        text: "Per ser elegible per a una devolució, el seu article ha d’estar sense usar i en el mateix estat en què el va rebre. També ha d’estar en l’embalatge original.",
      },
      {
        kind: "p",
        text: "Diversos tipus de productes estan exempts de devolució. Els productes peribles, com aliments, flors, diaris o revistes no es poden retornar. Tampoc acceptem productes íntims o sanitaris, materials perillosos ni líquids o gasos inflamables.",
      },
      {
        kind: "p",
        text: "Elements addicionals que no es poden retornar:",
      },
      {
        kind: "ul",
        items: [
          "Targetes regal",
          "Productes de programari descarregables",
          "Alguns articles de salut i cura personal",
        ],
      },
      {
        kind: "p",
        text: "Per completar la devolució, necessitem un rebut o comprovant de compra. No retorni la compra al fabricant.",
      },
      {
        kind: "h3",
        text: "Situacions amb reemborsaments parcials (si escau)",
      },
      {
        kind: "ul",
        items: [
          "Llibre amb signes evidents d’ús.",
          "CD, DVD, cinta VHS, programari, videojoc, cinta de casset o disc de vinil que s’hagi obert.",
          "Qualsevol article que no es trobi en el seu estat original, estigui danyat o li faltin peces per raons que no es deguin al nostre error.",
          "Qualsevol article retornat més de 30 dies després del lliurament.",
        ],
      },
      {
        kind: "h3",
        text: "Reemborsaments (si escau)",
      },
      {
        kind: "p",
        text: "Un cop rebuda i inspeccionada la devolució, li enviarem un correu electrònic per notificar-li que hem rebut l’article que ha retornat. També li notificarem l’aprovació o el rebuig del seu reemborsament. Si s’aprova, es processarà el reemborsament i s’aplicarà un crèdit automàticament a la seva targeta de crèdit o mètode de pagament original, dins d’un cert termini de dies.",
      },
      {
        kind: "h3",
        text: "Reemborsaments tardans o faltants (si escau)",
      },
      {
        kind: "p",
        text: "Si encara no ha rebut un reemborsament, primer revisi de nou el seu compte bancari. Després, posi’s en contacte amb l’empresa de la seva targeta de crèdit: pot trigar una estona abans que el reemborsament es reflecteixi oficialment. A continuació, contacti amb el seu banc: sovint cal un temps de processament abans de poder veure reflectit un reemborsament. Si ja ha fet tot l’anterior i encara no ha rebut el reemborsament, pot contactar-nos escrivint a lareprow3@gmail.com.",
      },
      {
        kind: "h3",
        text: "Articles en oferta (si escau)",
      },
      {
        kind: "p",
        text: "Només es poden reemborsar els articles de preu normal. Malauradament, no es poden reemborsar els articles en oferta.",
      },
      {
        kind: "h3",
        text: "Canvis (si escau)",
      },
      {
        kind: "p",
        text: "Només substituïm els articles si estan defectuosos o danyats. Si necessita canviar-lo pel mateix article, enviï un correu electrònic a artverd@gmail.com i enviï el seu article a: Carrer del Cardaire, 11, 08221 Terrassa, Barcelona, Espanya.",
      },
      {
        kind: "h3",
        text: "Regals",
      },
      {
        kind: "p",
        text: "Si l’article estava marcat com a regal quan es va comprar i se li va enviar directament, rebrà un crèdit de regal pel valor de la devolució. Un cop rebem l’article retornat, se li enviarà un certificat de regal per correu.",
      },
      {
        kind: "p",
        text: "Si l’article no estava marcat com a regal quan es va comprar, o si la persona que va fer el regal va decidir que li enviessin la comanda per donar-li després, enviarem un reemborsament a la persona que va fer el regal i en tindrà coneixement de la devolució.",
      },
      {
        kind: "h3",
        text: "Enviament",
      },
      {
        kind: "p",
        text: "Per retornar el seu producte, ha d’enviar-lo per correu a: Carrer del Cardaire, 11, 08221 Terrassa, Barcelona, Espanya.",
      },
      {
        kind: "p",
        text: "Els costos d’enviament per retornar el seu article van a càrrec seu. Els costos d’enviament no són reemborsables. Si rep un reemborsament, el cost d’enviament de la devolució es deduirà del seu reemborsament.",
      },
      {
        kind: "p",
        text: "Segons on visqui, el temps que trigui a rebre el canvi del seu producte pot variar.",
      },
      {
        kind: "p",
        text: "Si envia un article de més de 75 €, es recomana usar un servei d’enviament amb seguiment o contractar una assegurança d’enviament. No garantim que rebrem la devolució del seu article.",
      },
    ],
  },
  {
    id: "antifrau",
    heading: "Comprovació antifrau",
    parts: [
      {
        kind: "p",
        text: "La compra del client pot ser ajornada per a la comprovació antifrau. També pot ser suspesa més temps per a una investigació més rigorosa, per evitar transaccions fraudulentes.",
      },
    ],
  },
  {
    id: "privacitat",
    heading: "Privacitat",
    parts: [
      {
        kind: "p",
        text: "Aquest lloc (https://www.artverd.com/) garanteix que la informació personal que envia compta amb la seguretat necessària. Les dades introduïdes per l’usuari o, en cas de requerir una validació de les comandes, no seran lliurades a tercers, tret que hagin de ser revelades en compliment d’una ordre judicial o requeriments legals.",
      },
      {
        kind: "p",
        text: "La subscripció a butlletins de correus electrònics publicitaris és voluntària i pot ser seleccionada en crear el seu compte.",
      },
      {
        kind: "p",
        text: "Susana Fernandez Ballester es reserva els drets de canviar o modificar aquests termes sense previ avís.",
      },
      { kind: "privacy-link" },
    ],
  },
];
