/**
 * Cookie policy copy (Catalan), aligned with the legacy Spanish page
 * https://www.artverd.com/politica-de-cookies/
 */
export const COOKIE_POLICY_TITLE = "Política de galetes";

export const COOKIE_POLICY_DESCRIPTION =
  "Política de galetes d’Art Verd: inventari de tecnologies, bàner de consentiment, Vercel Analytics i Speed Insights, emmagatzematge local de la cistella.";

export interface CookieInventoryRow {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  legalNote: string;
}

export interface CookiePolicyDocLink {
  label: string;
  href: string;
}

export type CookieSectionPart =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: readonly string[] }
  | { kind: "browser-links" }
  | { kind: "cookie-table"; rows: readonly CookieInventoryRow[] }
  | { kind: "link-list"; items: readonly CookiePolicyDocLink[] };

export interface CookiePolicySection {
  id: string;
  heading: string;
  parts: readonly CookieSectionPart[];
}

export const COOKIE_POLICY_SECTIONS: readonly CookiePolicySection[] = [
  {
    id: "que-son",
    heading: "Què són les galetes?",
    parts: [
      {
        kind: "p",
        text: 'En anglès, el terme "cookie" significa galeta, però en l’àmbit de la navegació web una "galeta" és una cosa ben diferent. Quan accedeix al nostre lloc web, al navegador del seu dispositiu s’emmagatzema una petita quantitat de text que es denomina "galeta". Aquest text conté informació variada sobre la seva navegació, hàbits, preferències, personalitzacions de continguts, etc.',
      },
      {
        kind: "p",
        text: 'Existeixen altres tecnologies que funcionen de manera similar i que també s’usen per recollir dades sobre la seva activitat de navegació. Anomenarem "galetes" totes aquestes tecnologies conjuntament.',
      },
      {
        kind: "p",
        text: "Els usos concrets que fem d’aquestes tecnologies es descriuen en el present document.",
      },
    ],
  },
  {
    id: "per-a-que",
    heading: "Per a què s’utilitzen les galetes en aquest web?",
    parts: [
      {
        kind: "p",
        text: "Les galetes són una part essencial de com funciona el lloc web. L’objectiu principal de les nostres galetes és millorar la seva experiència en la navegació. Per exemple, per recordar les seves preferències (idioma, país, etc.) durant la navegació i en futures visites. La informació recollida en les galetes ens permet a més millorar el web, adaptar-lo als seus interessos com a usuari, accelerar les cerques que realitzi, etc.",
      },
      {
        kind: "p",
        text: "En aquest lloc web no utilitzem galetes de publicitat comportamental. Les eines d’anàlisi i de rendiment de Vercel (Web Analytics i Speed Insights) només es carreguen si ho autoritzeu mitjançant el bàner de galetes.",
      },
    ],
  },
  {
    id: "per-a-que-no",
    heading: "Per a què NO s’utilitzen les galetes en aquest web?",
    parts: [
      {
        kind: "p",
        text: "En les galetes que utilitzem no s’emmagatzema informació sensible d’identificació personal com el seu nom, adreça, la seva contrasenya, etc.",
      },
    ],
  },
  {
    id: "qui-utilitza",
    heading: "Qui utilitza la informació emmagatzemada a les galetes?",
    parts: [
      {
        kind: "p",
        text: "La informació emmagatzemada a les galetes i tecnologies similars del nostre lloc web és utilitzada per nosaltres, a excepció de les gestionades per Vercel Inc. quan hàgiu acceptat l’anàlisi o el rendiment: aquestes dades les tracta Vercel com a encarregat de tractament en el marc dels serveis d’allotjament i eines del lloc.",
      },
    ],
  },
  {
    id: "com-evitar",
    heading: "Com pot evitar l’ús de galetes en aquest lloc web?",
    parts: [
      {
        kind: "p",
        text: "Si prefereix evitar l’ús de les galetes opcionals, pot REBUTJAR-les al bàner (opció «Només necessàries») o revocar el consentiment en qualsevol moment des de «Configuració de galetes» al peu de pàgina.",
      },
      {
        kind: "p",
        text: "La vostra elecció es desa al navegador (emmagatzematge local). Si actualitzem aquesta política o l’inventari de manera rellevant, podem incrementar la versió del consentiment i tornar-vos a mostrar el bàner. Si esborra les dades del lloc al navegador, tornarem a sol·licitar la vostra elecció.",
      },
      {
        kind: "p",
        text: "Si les ha acceptat, no tornarem a preguntar-li tret que obri la configuració de galetes, esborri les dades emmagatzemades o acceptem una nova versió del consentiment. Pot canviar d’opinió en qualsevol moment des del mateix bàner o l’enllaç del peu.",
      },
    ],
  },
  {
    id: "com-desactivar",
    heading: "Com desactivo i elimino l’ús de galetes?",
    parts: [
      {
        kind: "p",
        text: "El responsable mostra informació sobre la seva política de galetes al bàner de galetes accessible a totes les pàgines del lloc web. El bàner de galetes mostra informació essencial sobre el tractament de dades i permet a l’usuari realitzar les accions següents:",
      },
      {
        kind: "ul",
        items: [
          "ACCEPTAR o REBUTJAR la instal·lació de galetes, o retirar el consentiment previament atorgat.",
          "Obtenir informació addicional en la pàgina de política de galetes.",
        ],
      },
      {
        kind: "p",
        text: "Per restringir, bloquejar o esborrar les galetes d’aquest lloc web (i les usades per tercers) pot fer-ho, en qualsevol moment, modificant la configuració del seu navegador. Tingui en compte que aquesta configuració és diferent en cada navegador.",
      },
      {
        kind: "p",
        text: "En els enllaços següents trobarà instruccions per habilitar o deshabilitar les galetes als navegadors més habituals.",
      },
      { kind: "browser-links" },
    ],
  },
  {
    id: "tipus",
    heading: "Quins tipus de galetes s’utilitzen en aquesta pàgina web?",
    parts: [
      {
        kind: "p",
        text: "Cada pàgina web utilitza les seves pròpies galetes. En el nostre web utilitzem les que s’indiquen a continuació:",
      },
      { kind: "h3", text: "Segons l’entitat que les gestiona" },
      { kind: "p", text: "Galetes pròpies:" },
      {
        kind: "p",
        text: "Són aquelles que s’envien a l’equip terminal de l’usuari des d’un equip o domini gestionat pel mateix editor i des del qual es presta el servei sol·licitat per l’usuari.",
      },
      { kind: "p", text: "Galetes de tercers:" },
      {
        kind: "p",
        text: "Són aquelles que s’envien a l’equip terminal de l’usuari des d’un equip o domini que no és gestionat per l’editor, sinó per una altra entitat que tracta les dades obtingudes a través de les galetes.",
      },
      {
        kind: "p",
        text: "En el cas que les galetes es servisquen des d’un equip o domini gestionat pel mateix editor, però la informació que es reculli mitjançant aquestes sigui gestionada per un tercer, no poden considerar-se galetes pròpies si el tercer les utilitza per a les seves pròpies finalitats (per exemple, la millora dels serveis que presta o la prestació de serveis de caràcter publicitari a favor d’altres entitats).",
      },
      { kind: "h3", text: "Segons la finalitat" },
      { kind: "p", text: "Galetes tècniques:" },
      {
        kind: "p",
        text: "Són aquelles necessàries per a la navegació i el bon funcionament del nostre lloc web, com per exemple controlar el trànsit i la comunicació de dades, identificar la sessió, accedir a parts d’accés restringit, realitzar la sol·licitud d’inscripció o participació en un esdeveniment, comptar visites a efectes de la facturació de llicències del programari amb què funciona el servei del lloc web, utilitzar elements de seguretat durant la navegació, emmagatzemar continguts per a la difusió de vídeos o so, habilitar continguts dinàmics (per exemple, animació de càrrega d’un text o imatge).",
      },
      { kind: "p", text: "Galetes d’anàlisi:" },
      {
        kind: "p",
        text: "Permeten quantificar el nombre d’usuaris i així realitzar la mesura i l’anàlisi estadística de la utilització que fan els usuaris del lloc web.",
      },
      { kind: "p", text: "Galetes de preferències o personalització:" },
      {
        kind: "p",
        text: "Són aquelles que permeten recordar informació perquè l’usuari accedeixi al servei amb determinades característiques que poden diferenciar la seva experiència de la d’altres usuaris, com per exemple l’idioma, el nombre de resultats a mostrar quan l’usuari realitza una cerca, l’aspecte o el contingut del servei en funció del tipus de navegador a través del qual accedeix al servei o de la regió des de la qual hi accedeix, etc.",
      },
      { kind: "h3", text: "Segons el termini que romanen activades" },
      { kind: "p", text: "Galetes de sessió:" },
      {
        kind: "p",
        text: "Són aquelles dissenyades per recollir i emmagatzemar dades mentre l’usuari accedeix a una pàgina web. Se solen emprar per emmagatzemar informació que només interessa conservar per a la prestació del servei sol·licitat per l’usuari en una sola ocasió (per exemple, una llista de productes adquirits) i desapareixen en acabar la sessió.",
      },
      { kind: "p", text: "Galetes persistents:" },
      {
        kind: "p",
        text: "Són aquelles en què les dades continuen emmagatzemades al terminal i poden ser accedides i tractades durant un període definit pel responsable de la galeta, i que pot anar d’uns minuts a diversos anys. A aquest respecte s’ha de valorar específicament si és necessari l’ús de galetes persistents, atès que els riscos per a la privacitat es podrien reduir mitjançant l’ús de galetes de sessió. En tot cas, quan s’instal·lin galetes persistents, es recomana reduir al mínim necessari la seva durada atenent la finalitat del seu ús. A aquests efectes, el Dictamen 4/2012 del GT29 va indicar que perquè una galeta pugui estar exempta del deure de consentiment informat, la seva caducitat ha d’estar relacionada amb la seva finalitat. Per això, és molt més probable que es considerin com a exceptuades les galetes de sessió que les persistents.",
      },
      {
        kind: "p",
        text: "La relació concreta de tecnologies activa en aquest lloc web figura a l’apartat «Inventari de tecnologies».",
      },
    ],
  },
  {
    id: "inventari",
    heading: "Inventari de tecnologies (galetes i emmagatzematge local)",
    parts: [
      {
        kind: "p",
        text: "A continuació es relacionen les tecnologies que poden emmagatzemar o llegir informació al vostre dispositiu en relació amb aquest lloc. Les dues primeres files descriuen pràctiques habituals sense identificadors de galeta HTTP pròpiament dits; les de Vercel depenen del vostre consentiment al bàner.",
      },
      {
        kind: "cookie-table",
        rows: [
          {
            name: "Emmagatzematge local (localStorage) de la cistella",
            provider: "Art Verd (origen propi)",
            purpose:
              "Conservar els productes afegits a la cistella de la botiga entre visites.",
            duration:
              "Fins que es buidi la cistella, es canviï el contingut o s’esborrin les dades del lloc al navegador.",
            legalNote:
              "Necessària per a la funcionalitat de la botiga que sol·liciteu; es descriu com a tecnologia equivalent en transparència.",
          },
          {
            name: "Preferència de consentiment de galetes",
            provider: "Art Verd (origen propi)",
            purpose:
              "Recordar si heu acceptat o rebutjat les categories opcionals d’anàlisi i rendiment.",
            duration:
              "Fins que esborreu les dades del lloc, canvieu la preferència des del bàner o s’actualitzi la versió del consentiment.",
            legalNote:
              "Necessària per respectar la vostra elecció sobre les tecnologies no estrictament necessàries.",
          },
          {
            name: "Vercel Web Analytics",
            provider: "Vercel Inc. (tercer, EUA)",
            purpose:
              "Mesura agregada de visites i visualitzacions de pàgina per entendre l’ús del lloc.",
            duration: "Segons la configuració de Vercel; consulteu la seva documentació.",
            legalNote: "Només si accepteu les opcions corresponents al bàner (consentiment).",
          },
          {
            name: "Vercel Speed Insights",
            provider: "Vercel Inc. (tercer, EUA)",
            purpose:
              "Mesura de mètriques de rendiment (p. ex. Web Vitals) per millorar el lloc.",
            duration: "Segons la configuració de Vercel; consulteu la seva documentació.",
            legalNote: "Només si accepteu les opcions corresponents al bàner (consentiment).",
          },
        ],
      },
      {
        kind: "p",
        text: "Més informació sobre com Vercel tracta les dades es troba als documents següents:",
      },
      {
        kind: "link-list",
        items: [
          {
            label: "Web Analytics — privacitat",
            href: "https://vercel.com/docs/analytics/privacy-policy",
          },
          {
            label: "Speed Insights — privacitat i compliment",
            href: "https://vercel.com/docs/speed-insights/privacy-policy",
          },
          {
            label: "Avís de privacitat de Vercel",
            href: "https://vercel.com/legal/privacy-policy",
          },
        ],
      },
      {
        kind: "p",
        text: "Les transferències de dades fora de l’Espai Econòmic Europeu, si escauen, es poden basar en clàusules contractuals tipus o altres garanties previstes al RGPD; el proveïdor n’informa a la seva documentació.",
      },
    ],
  },
];
