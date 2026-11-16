/* ==========================================================================
   SUCHO A VODA 2026 — DATOVÝ MODEL INTERAKTIVNÍ ENVIRONMENTÁLNÍ MAPY ČR
   Součást webu Vize 2075 (svoboda-koduje.github.io/Vize-2075)

   POVAHA DAT — čtěte, než budete čísla citovat:
   Soubor obsahuje (a) reálná data z uvedených institucí (ČHMÚ, InterSucho /
   CzechGlobe, VÚV TGM, ČGS, SZÚ, Povodí, MZe, MŽP), (b) referenční síť
   klimatologických bodů, jejíž hodnoty odpovídají řádově normálům 1991–2020,
   ale nejde o oficiální staniční normály, a (c) zjednodušenou regionalizaci
   hydrogeologických struktur a povodí. Mapa je diagnosticko-prediktivní
   NÁSTROJ PRO POROVNÁNÍ SCÉNÁŘŮ, nikoli oficiální predikce. Viz Metodika.
   ========================================================================== */
var SM = window.SM = window.SM || {};

/* --------------------------------------------------------------------------
   1. REFERENČNÍ KLIMATOLOGICKÁ SÍŤ
   [lat, lon, výška m n. m., roční teplota °C, roční srážky mm]
   Hodnoty odpovídají řádově normálu 1991–2020. Pole teploty, srážek a výšky
   se mezi body interpoluje (IDW, viz sucho-mapa.js). V jednotlivém bodě se
   může skutečnost lišit o desetiny °C a o desítky mm.
   -------------------------------------------------------------------------- */
SM.stations = [
  ["Praha-Ruzyně",50.10,14.26,364,9.9,525], ["Praha-Klementinum",50.09,14.42,191,11.2,510],
  ["Doksany",50.46,14.17,158,10.0,470], ["Ústí nad Labem",50.68,14.04,375,9.5,600],
  ["Chomutov",50.47,13.42,330,9.3,500], ["Žatec",50.33,13.55,200,9.7,470],
  ["Louny",50.35,13.80,190,9.8,470], ["Most",50.50,13.64,230,9.6,480],
  ["Tušimice",50.38,13.33,322,9.5,480], ["Teplice",50.64,13.82,230,9.5,600],
  ["Děčín",50.78,14.21,140,9.9,650], ["Varnsdorf",50.91,14.62,350,8.7,750],
  ["Milešovka",50.56,13.93,833,6.6,620], ["Klínovec",50.40,12.97,1244,3.5,1000],
  ["Krušné hory – Litvínov",50.58,13.60,800,6.3,900], ["Kraslice",50.33,12.52,650,7.3,800],
  ["Karlovy Vary",50.20,12.91,603,8.2,620], ["Sokolov",50.18,12.64,400,8.5,620],
  ["Cheb",50.07,12.39,471,8.4,560], ["Mariánské Lázně",49.96,12.70,630,7.4,700],
  ["Tachov",49.80,12.63,500,8.3,620], ["Přimda",49.67,12.68,740,7.6,650],
  ["Domažlice",49.44,12.93,430,9.0,580], ["Klatovy",49.40,13.30,430,8.9,620],
  ["Plzeň-Mikulka",49.77,13.38,360,9.5,540], ["Rokycany",49.74,13.60,350,9.3,560],
  ["Plasy",49.98,13.49,400,9.0,520], ["Rakovník",50.10,13.73,320,9.4,500],
  ["Beroun",49.96,14.07,230,9.9,520], ["Příbram",49.69,14.01,500,8.6,600],
  ["Kocelovice",49.47,13.84,519,8.5,610], ["Strakonice",49.26,13.91,405,9.0,560],
  ["Písek",49.31,14.15,380,9.1,580], ["Prachatice",49.01,14.00,560,7.9,700],
  ["Vimperk",49.05,13.78,694,7.0,800], ["Churáňov",49.07,13.62,1118,5.4,1050],
  ["Kvilda",49.02,13.58,1050,4.5,1100], ["Nová Pec – Lipno",48.78,14.00,740,7.0,900],
  ["Český Krumlov",48.81,14.32,500,8.4,650], ["České Budějovice",48.95,14.47,388,9.2,620],
  ["Temelín",49.18,14.37,500,8.8,600], ["Tábor",49.41,14.66,440,8.8,620],
  ["Benešov",49.78,14.69,360,9.2,600], ["Jindřichův Hradec",49.14,15.00,490,8.6,650],
  ["Kostelní Myslová",49.16,15.44,569,8.0,640], ["Jihlava",49.40,15.59,516,8.0,670],
  ["Pelhřimov",49.43,15.22,500,8.2,650], ["Havlíčkův Brod",49.60,15.58,422,8.3,650],
  ["Třebíč",49.21,15.88,406,8.7,560], ["Dukovany",49.09,16.13,400,8.9,530],
  ["Žďár nad Sázavou",49.56,15.94,580,7.6,700], ["Svratouch",49.73,16.03,737,7.1,760],
  ["Kutná Hora",49.95,15.27,350,9.2,580], ["Čáslav",49.91,15.38,240,9.6,570],
  ["Nymburk",50.19,15.04,185,9.7,560], ["Mladá Boleslav",50.41,14.91,230,9.5,600],
  ["Semčice",50.37,15.00,234,9.4,580], ["Česká Lípa",50.69,14.54,260,9.2,620],
  ["Liberec",50.77,15.02,398,8.4,800], ["Frýdlant",50.92,15.08,280,8.6,850],
  ["Jablonec nad Nisou",50.72,15.17,500,7.9,950], ["Desná-Souš",50.78,15.32,772,6.3,1250],
  ["Labská bouda",50.77,15.55,1315,2.8,1350], ["Pec pod Sněžkou",50.69,15.73,830,5.5,1150],
  ["Trutnov",50.56,15.91,420,8.3,750], ["Náchod",50.42,16.16,350,8.8,740],
  ["Hradec Králové",50.18,15.84,278,9.5,620], ["Pardubice",50.01,15.74,225,9.6,590],
  ["Chrudim",49.95,15.80,250,9.3,620], ["Ústí nad Orlicí",49.97,16.40,400,8.5,700],
  ["Svitavy",49.76,16.47,440,8.3,650], ["Boskovice",49.49,16.66,370,8.8,600],
  ["Blansko",49.36,16.64,280,9.2,580], ["Brno-Tuřany",49.15,16.69,241,10.2,510],
  ["Brno-Žabovřesky",49.21,16.57,230,10.3,500], ["Kuchařovice (Znojmo)",48.88,16.09,334,10.0,490],
  ["Mikulov",48.81,16.64,240,10.3,520], ["Velké Pavlovice",48.90,16.82,190,10.4,500],
  ["Břeclav",48.76,16.88,160,10.5,490], ["Hodonín",48.85,17.13,167,10.4,530],
  ["Strážnice",48.90,17.32,176,10.5,520], ["Uherské Hradiště",49.07,17.46,180,10.0,580],
  ["Vyškov",49.28,17.00,245,9.7,560], ["Kroměříž",49.30,17.39,200,9.7,600],
  ["Zlín",49.22,17.67,230,9.4,680], ["Holešov",49.33,17.57,224,9.4,650],
  ["Vsetín",49.34,18.00,350,8.8,830], ["Valašské Meziříčí",49.47,17.97,290,8.9,800],
  ["Lysá hora",49.55,18.45,1324,3.1,1350], ["Rožnov pod Radhoštěm",49.46,18.14,380,8.6,900],
  ["Frýdek-Místek",49.68,18.35,300,8.9,850], ["Nový Jičín",49.59,18.01,280,9.0,760],
  ["Mošnov",49.70,18.11,251,9.2,700], ["Ostrava-Poruba",49.83,18.16,240,9.4,680],
  ["Karviná",49.85,18.54,230,9.4,650], ["Český Těšín",49.75,18.63,270,9.2,700],
  ["Opava",49.94,17.90,250,9.1,680], ["Krnov",50.09,17.70,316,8.7,650],
  ["Bruntál",49.99,17.46,547,7.6,740], ["Praděd",50.08,17.23,1491,2.5,1250],
  ["Šerák",50.18,17.11,1328,3.3,1200], ["Jeseník",50.23,17.20,420,8.5,820],
  ["Šumperk",49.97,16.97,320,8.9,700], ["Červená (Libavá)",49.78,17.54,749,7.2,700],
  ["Luká",49.65,16.95,510,8.3,640], ["Olomouc",49.59,17.27,210,9.5,580],
  ["Prostějov",49.47,17.11,215,9.6,570], ["Přerov",49.46,17.45,210,9.6,600],
  ["Hranice",49.55,17.73,260,9.1,700]
];

/* --------------------------------------------------------------------------
   2. ZJEDNODUŠENÁ HYDROGEOLOGICKÁ REGIONALIZACE
   Bod se přiřadí nejbližšímu uzlu (Voronoi). Nejde o hranice hydrogeologických
   rajonů ČGS – ty jsou mnohem členitější; jde o typ prostředí, který v daném
   místě převažuje. Typy podle regionální hydrogeologie ČR: pánev s průlinovou
   propustností / hydrogeologický masiv s puklinovou propustností / flyš /
   kvartérní náplavy.  [lat, lon, typ]
   -------------------------------------------------------------------------- */
SM.hgNodes = [
  /* Česká křídová pánev – severočeská a lužická křída */
  [50.78,14.21,"krida"],[50.69,14.54,"krida"],[50.60,14.35,"krida"],[50.90,14.45,"krida"],
  [50.75,14.80,"krida"],[50.55,14.60,"krida"],[50.45,14.90,"krida"],[50.62,15.15,"krida"],
  /* ČKP – Polabí a východní Čechy */
  [50.42,14.17,"krida"],[50.30,14.50,"krida"],[50.19,15.04,"krida"],[50.41,14.91,"krida"],
  [50.33,15.35,"krida"],[50.44,15.37,"krida"],[50.18,15.84,"krida"],[50.42,16.16,"krida"],
  [50.30,16.00,"krida"],[50.01,15.74,"krida"],[49.95,16.00,"krida"],[49.97,16.40,"krida"],
  [49.76,16.47,"krida"],[49.87,16.20,"krida"],[50.56,15.91,"krida"],[50.50,15.60,"krida"],
  [50.05,15.40,"krida"],[49.91,15.38,"krida"],
  /* Permokarbonské a terciérní pánve */
  [49.77,13.38,"panev"],[49.90,13.40,"panev"],[49.74,13.60,"panev"],[49.98,13.49,"panev"],
  [50.33,13.55,"panev"],[50.50,13.64,"panev"],[50.47,13.42,"panev"],[50.38,13.33,"panev"],
  [50.18,12.64,"panev"],[50.07,12.39,"panev"],[50.35,13.80,"panev"],[50.10,13.73,"panev"],
  [49.49,16.66,"panev"],[49.36,16.64,"panev"],[50.47,15.10,"panev"],
  /* Hydrogeologický masiv – krystalinikum a plutony */
  [49.40,15.59,"masiv"],[49.16,15.44,"masiv"],[49.21,15.88,"masiv"],[49.09,16.13,"masiv"],
  [49.56,15.94,"masiv"],[49.73,16.03,"masiv"],[49.43,15.22,"masiv"],[49.60,15.58,"masiv"],
  [49.95,15.27,"masiv"],[49.69,14.01,"masiv"],[49.78,14.69,"masiv"],[49.47,13.84,"masiv"],
  [49.31,14.15,"masiv"],[49.41,14.66,"masiv"],[49.14,15.00,"masiv"],[48.95,14.47,"masiv"],
  [48.81,14.32,"masiv"],[49.07,13.62,"masiv"],[49.02,13.58,"masiv"],[48.78,14.00,"masiv"],
  [49.05,13.78,"masiv"],[49.01,14.00,"masiv"],[49.26,13.91,"masiv"],[49.40,13.30,"masiv"],
  [49.44,12.93,"masiv"],[49.67,12.68,"masiv"],[49.80,12.63,"masiv"],[49.96,12.70,"masiv"],
  [50.20,12.91,"masiv"],[50.40,12.97,"masiv"],[50.33,12.52,"masiv"],[50.58,13.60,"masiv"],
  [50.56,13.93,"masiv"],[50.68,14.04,"masiv"],[50.77,15.02,"masiv"],[50.72,15.17,"masiv"],
  [50.78,15.32,"masiv"],[50.92,15.08,"masiv"],[50.77,15.55,"masiv"],[50.69,15.73,"masiv"],
  [50.23,17.20,"masiv"],[50.08,17.23,"masiv"],[50.18,17.11,"masiv"],[49.99,17.46,"masiv"],
  [49.97,16.97,"masiv"],[49.65,16.95,"masiv"],[49.78,17.54,"masiv"],[50.09,17.70,"masiv"],
  [49.28,17.00,"masiv"],[49.49,13.00,"masiv"],[49.96,14.07,"masiv"],[50.10,14.26,"masiv"],[50.09,14.42,"masiv"],
  /* Flyšové pásmo Vnějších Západních Karpat */
  [49.34,18.00,"flys"],[49.47,17.97,"flys"],[49.55,18.45,"flys"],[49.46,18.14,"flys"],
  [49.68,18.35,"flys"],[49.59,18.01,"flys"],[49.22,17.67,"flys"],[49.33,17.57,"flys"],
  [49.00,17.80,"flys"],[48.90,17.60,"flys"],[49.75,18.63,"flys"],[49.55,17.73,"flys"],
  /* Neogén karpatské předhlubně a vídeňské pánve */
  [49.15,16.69,"neogen"],[48.88,16.09,"neogen"],[48.81,16.64,"neogen"],[48.90,16.82,"neogen"],
  [48.76,16.88,"neogen"],[48.85,17.13,"neogen"],[48.90,17.32,"neogen"],[49.07,17.46,"neogen"],
  [49.30,17.39,"neogen"],[49.46,17.45,"neogen"],[49.47,17.11,"neogen"],[48.95,16.40,"neogen"],
  [49.21,16.57,"neogen"],
  /* Kvartérní náplavy velkých řek */
  [49.59,17.27,"kvarter"],[49.83,18.16,"kvarter"],[49.85,18.54,"kvarter"],[49.94,17.90,"kvarter"],
  [49.70,18.11,"kvarter"],[50.46,14.17,"kvarter"],[50.19,14.75,"kvarter"],[49.15,16.60,"kvarter"]
];

SM.hgTypes = {
  krida: { n:"Česká křídová pánev", kratce:"pánev s průlinovou propustností",
    setrvacnost:0.88, vydatnost:"vysoká (stovky l/s z kolektorů)", obnova:"roky až desítky let",
    popis:"Nejvýznamnější hydrogeologická struktura v Čechách. Pískovcové a slínovcové kolektory drží velké objemy vody a kolísají pomalu – sucho se tu projeví později, ale také se po něm hladiny vracejí nejdéle. Hluboké vrty do křídy byly v dubnu až srpnu 2026 v nejhorším stavu od začátku hodnocené řady v roce 1991; právě z nich se vyrábí velká část pitné vody.",
    rizika:"Setrvalý pokles hladin, protože doplňování na výchozech nestíhá odběry a výpar. Při vyčerpání se zásoba neobnoví během jedné vlhké zimy." },
  panev: { n:"Permokarbonské a terciérní pánve", kratce:"pánev s nižší vydatností",
    setrvacnost:0.72, vydatnost:"střední (jednotky až desítky l/s)", obnova:"měsíce až roky",
    popis:"Plzeňská, podkrušnohorské a boskovická pánev. Kolektory jsou méně mocné než v křídě a často zasažené hornickou činností, takže zásoba je menší a zranitelnější. Permokarbon středních a západních Čech a podkrušnohorské pánve patřily v roce 2026 k nejvíc postiženým strukturám.",
    rizika:"Nízké srážky v závětří Krušných hor a Českého lesa, místy ovlivnění hladin dobýváním." },
  masiv: { n:"Hydrogeologický masiv (krystalinikum)", kratce:"puklinové prostředí, malá zásoba",
    setrvacnost:0.35, vydatnost:"nízká (desetiny až jednotky l/s)", obnova:"týdny až měsíce",
    popis:"Vysočina, Šumava, Brdy, Krušné hory, Český les, Jeseníky a horské oblasti. Voda je jen v připovrchové rozvolněné zóně a v puklinách, proto se zásoba rychle doplní – ale ještě rychleji vyčerpá. Právě tady leží většina obcí odkázaných na vlastní mělké vrty a puklinové prameny.",
    rizika:"Nejrychlejší vysychání studní a pramenů v suchém roce. Prohlubování soukromých vrtů si navzájem strhává hladinu a problém nevyřeší." },
  flys: { n:"Flyšové pásmo Karpat", kratce:"střídání propustných a nepropustných vrstev",
    setrvacnost:0.30, vydatnost:"velmi nízká (prameny a drobné zdroje)", obnova:"dny až týdny",
    popis:"Beskydy, Vsetínsko, Bílé Karpaty. Střídání pískovců a jílovců nedovoluje vzniknout velkému zásobníku, zato je tu hodně srážek. Zásobování proto stojí na povrchové vodě z horských nádrží, ne na podzemní vodě – v roce 2026 to Moravskoslezský kraj zachránilo.",
    rizika:"Odlehlá vysoko položená místa s mělkými zdroji selhávají první (v roce 2026 cisterny na Lysou horu). Rychlý povrchový odtok a sesuvy." },
  neogen: { n:"Neogén karpatské předhlubně a vídeňské pánve", kratce:"pánev v nejsušší části státu",
    setrvacnost:0.65, vydatnost:"střední, místy zhoršená jakost", obnova:"roky",
    popis:"Jižní Morava, Hornomoravský úval a Dyjsko-svratecký úval. Kolektory jsou slušné, ale doplňování je nejmenší v celé zemi: klimatická vodní bilance je tu trvale záporná. Moravský terciér patřil v roce 2026 k nejvíc postiženým strukturám.",
    rizika:"Nejhlubší srážkový deficit, vysoké odběry pro zemědělství i sídla, koncentrace dusičnanů a vysoká mineralizace při nízkých stavech." },
  kvarter: { n:"Kvartérní náplavy velkých řek", kratce:"štěrkopísky vázané na řeku",
    setrvacnost:0.45, vydatnost:"vysoká, ale závislá na průtoku v řece", obnova:"týdny",
    popis:"Údolní náplavy Labe, Moravy, Odry, Dyje a Ohře. Dobře propustné štěrkopísky, které se ale dotují přímo z řeky – jejich stav proto kopíruje průtoky. Na tomto principu stojí i břehová infiltrace (například Káraný u Prahy).",
    rizika:"Při historicky nízkých průtocích klesá i zásoba v náplavech a zhoršuje se jakost: méně vody na ředění znečištění z čistíren a ze zemědělství." }
};

/* --------------------------------------------------------------------------
   3. POVODÍ (zjednodušeně) — bod se přiřadí nejbližšímu uzlu.
   Nejde o hydrologické hranice povodí; jde o příslušnost k vodohospodářské
   soustavě, která v daném místě rozhoduje o zásobování a nadlepšování.
   [lat, lon, kód povodí]
   -------------------------------------------------------------------------- */
SM.basinNodes = [
  [48.78,14.00,"hvltava"],[48.81,14.32,"hvltava"],[48.95,14.47,"hvltava"],[49.18,14.37,"hvltava"],
  [48.90,14.20,"hvltava"],[49.05,14.60,"hvltava"],
  [49.14,15.00,"luznice"],[49.41,14.66,"luznice"],[49.25,14.80,"luznice"],[49.16,15.44,"luznice"],
  [49.01,14.00,"otava"],[49.05,13.78,"otava"],[49.07,13.62,"otava"],[49.26,13.91,"otava"],
  [49.31,14.15,"otava"],[49.47,13.84,"otava"],[49.40,13.30,"otava"],[49.02,13.58,"otava"],
  [49.77,13.38,"berounka"],[49.74,13.60,"berounka"],[49.44,12.93,"berounka"],[49.67,12.68,"berounka"],
  [49.80,12.63,"berounka"],[49.98,13.49,"berounka"],[50.10,13.73,"berounka"],[49.96,14.07,"berounka"],
  [49.69,14.01,"berounka"],[49.96,12.70,"berounka"],
  [49.78,14.69,"sazava"],[49.95,15.27,"sazava"],[49.43,15.22,"sazava"],[49.60,15.58,"sazava"],
  [49.56,15.94,"sazava"],[49.40,15.59,"sazava"],[49.75,15.00,"sazava"],
  [49.70,14.30,"dvltava"],[50.10,14.26,"dvltava"],[50.09,14.42,"dvltava"],[49.90,14.40,"dvltava"],
  [50.35,14.50,"dlabe"],[50.46,14.17,"dlabe"],[50.68,14.04,"dlabe"],[50.78,14.21,"dlabe"],
  [50.90,14.45,"dlabe"],[50.60,14.35,"dlabe"],
  [50.33,13.55,"ohre"],[50.50,13.64,"ohre"],[50.47,13.42,"ohre"],[50.38,13.33,"ohre"],
  [50.35,13.80,"ohre"],[50.20,12.91,"ohre"],[50.18,12.64,"ohre"],[50.07,12.39,"ohre"],
  [50.40,12.97,"ohre"],[50.56,13.93,"ohre"],[50.58,13.60,"ohre"],[50.64,13.82,"ohre"],
  [50.69,14.54,"plouc"],[50.77,15.02,"plouc"],[50.92,15.08,"plouc"],[50.78,15.32,"plouc"],
  [50.72,15.17,"plouc"],[50.91,14.62,"plouc"],
  [50.41,14.91,"jizera"],[50.37,15.00,"jizera"],[50.19,15.04,"jizera"],[50.62,15.15,"jizera"],
  [50.47,15.10,"jizera"],
  [50.77,15.55,"hlabe"],[50.69,15.73,"hlabe"],[50.56,15.91,"hlabe"],[50.44,15.37,"hlabe"],
  [50.33,15.35,"hlabe"],[50.18,15.84,"hlabe"],[50.01,15.74,"hlabe"],[49.91,15.38,"hlabe"],
  [49.95,15.80,"hlabe"],[50.05,15.40,"hlabe"],
  [50.42,16.16,"orlice"],[49.97,16.40,"orlice"],[50.30,16.00,"orlice"],[49.87,16.20,"orlice"],
  [49.73,16.03,"orlice"],[50.20,16.30,"orlice"],
  [49.76,16.47,"svratka"],[49.49,16.66,"svratka"],[49.36,16.64,"svratka"],[49.15,16.69,"svratka"],
  [49.21,16.57,"svratka"],[49.21,15.88,"svratka"],[49.28,17.00,"svratka"],[49.60,16.30,"svratka"],
  [48.88,16.09,"dyje"],[48.81,16.64,"dyje"],[48.90,16.82,"dyje"],[48.76,16.88,"dyje"],
  [49.09,16.13,"dyje"],[48.95,16.40,"dyje"],
  [48.85,17.13,"dmorava"],[48.90,17.32,"dmorava"],[49.07,17.46,"dmorava"],[49.30,17.39,"dmorava"],
  [49.22,17.67,"dmorava"],[49.33,17.57,"dmorava"],[49.00,17.80,"dmorava"],[48.90,17.60,"dmorava"],
  [49.59,17.27,"hmorava"],[49.47,17.11,"hmorava"],[49.97,16.97,"hmorava"],[49.65,16.95,"hmorava"],
  [50.23,17.20,"hmorava"],[50.08,17.23,"hmorava"],[50.18,17.11,"hmorava"],[49.78,17.54,"hmorava"],
  [49.46,17.45,"becva"],[49.55,17.73,"becva"],[49.34,18.00,"becva"],[49.47,17.97,"becva"],
  [49.46,18.14,"becva"],
  [49.55,18.45,"odra"],[49.68,18.35,"odra"],[49.59,18.01,"odra"],[49.70,18.11,"odra"],
  [49.83,18.16,"odra"],[49.85,18.54,"odra"],[49.75,18.63,"odra"],[49.94,17.90,"odra"],
  [50.09,17.70,"odra"],[49.99,17.46,"odra"]
];

SM.basins = {
  hvltava:{ n:"Horní Vltava", sprava:"Povodí Vltavy", nadrze:["Lipno I","Hněvkovice","Římov (Malše)"],
    stav2026:"Lipno ≈ 47 % (12. 11.), Římov ≈ 50 % se sníženým odtokem do Malše na 250 l/s. Zásoba Římova při trvání sucha asi na 9 měsíců.", zranitelnost:5,
    role:"Zdroj pitné vody pro Jihočeskou vodárenskou soustavu (≈ 400 tis. lidí) a chladicí vody pro Temelín (přes Hněvkovice dotované z Lipna)." },
  luznice:{ n:"Lužnice a Nežárka", sprava:"Povodí Vltavy", nadrze:["Jordán","Landštejn","Nová Říše","Hejtman"],
    stav2026:"Oblast s extrémním suchem v celém půdním profilu (Jindřichohradecko, Táborsko). Tučapy opakovaně zásobovány cisternami.", zranitelnost:5,
    role:"Rybniční soustava Třeboňska – v roce 2026 ztráty objemu rybníků na Třeboňsku až 40 %." },
  otava:{ n:"Otava a Blanice", sprava:"Povodí Vltavy", nadrze:["Husinec","Nýrsko","Římov (část)"],
    stav2026:"Husinec jako první česká přehrada vyprázdnil zásobní prostor (7. 10.). Úpravna v Písku smí odebírat z Otavy i bez zachování minimálního průtoku.", zranitelnost:5,
    role:"Horská část povodí je na srážkách nejbohatší v Čechách, ale malé nádrže nemají rezervu na víceleté sucho." },
  berounka:{ n:"Berounka", sprava:"Povodí Vltavy", nadrze:["Hracholusky","Nýrsko","Lučina","Žlutice (Ohře)"],
    stav2026:"V srpnu klesly mělké vrty pod dosavadní minimum ze srpna 2018; meziročně klesla hladina v 65 % vrtů.", zranitelnost:4,
    role:"Zásobování Plzeňska; extrémní a výjimečné sucho v hlubších vrstvách půdy na Domažlicku a Klatovsku." },
  sazava:{ n:"Sázava a Želivka", sprava:"Povodí Vltavy", nadrze:["Švihov (Želivka)","Hubenov","Sedlice"],
    stav2026:"Švihov 83 % → 80 % (8. 10.) – nejstabilnější vodárenská nádrž v zemi.", zranitelnost:2,
    role:"Želivka zásobuje Prahu a střední Čechy – asi 1,5 mil. lidí. Čtvrtina průtoku ve Vraném přitéká z mezipovodí Sázavy." },
  dvltava:{ n:"Dolní Vltava (Vltavská kaskáda)", sprava:"Povodí Vltavy", nadrze:["Orlík","Slapy","Štěchovice","Vrané"],
    stav2026:"Kaskáda (Lipno + Orlík + Slapy) 39,4 % k 8. 10.; Orlík −15 m a od 4. 9. vypouští jen přítok, poprvé v historii se vypouští zásobní prostor Slap. Odtok z Vraného snížen ze 40 na 35 m³/s s možností až 20 m³/s.", zranitelnost:5,
    role:"Nadlepšená Vltava drží i Labe pod Mělníkem. Bez Orlíku a Slap by Vltava v Praze klesla na přirozených 10–15 m³/s a ohrozila odběry Elektrárny Mělník, ÚJV Řež, chemiček v Kralupech a Podolské vodárny." },
  dlabe:{ n:"Dolní Labe", sprava:"Povodí Labe", nadrze:["Nechranice (Ohře)","Káraný – břehová infiltrace"],
    stav2026:"Stav nedostatku vody na Labi a Vltavě (Středočeský kraj). V Děčíně se při nízkých stavech odhalují hladové kameny.", zranitelnost:3,
    role:"Plavba, odběry průmyslu a chemie; stav zcela závisí na nadlepšování z Vltavské kaskády a z Ohře." },
  ohre:{ n:"Ohře a podkrušnohoří", sprava:"Povodí Ohře", nadrze:["Nechranice","Přísečnice","Fláje","Žlutice","Stanovice","Podhora"],
    stav2026:"Mělké vrty v povodí Ohře klesly v srpnu pod minimum roku 2018. Nádrž Mariánské Lázně měla v srpnu 52 % zásobního prostoru.", zranitelnost:3,
    role:"Srážkový stín Krušných hor – nejmenší srážky v republice (Žatecko, Podbořansko). Chlazení uhelných elektráren Tušimice, Prunéřov a Počerady. Žlutice zásobují i obce v Plzeňském kraji." },
  plouc:{ n:"Ploučnice a Lužická Nisa", sprava:"Povodí Ohře / Labe", nadrze:["Souš","Josefův Důl","Bedřichov","Chřibská"],
    stav2026:"Nejpříznivější stav v republice – Liberecko, Jablonecko a Krkonoše jsou převážně bez půdního sucha. Silně podnormální zůstalo povodí Lužické Nisy a Stěnavy.", zranitelnost:1,
    role:"Horská prameniště Jizerských hor; obnovené Sedmihorské mokřady jako ukázka funkční retence." },
  jizera:{ n:"Jizera", sprava:"Povodí Labe", nadrze:["Josefův Důl","Káraný (náplavy Jizery)"],
    stav2026:"Část středních Čech patří k příznivější oblasti; mělké vrty v náplavech kopírují průtoky.", zranitelnost:2,
    role:"Káraný – břehová infiltrace a umělá infiltrace pro Prahu, druhý pilíř pražského zásobování po Želivce." },
  hlabe:{ n:"Horní Labe", sprava:"Povodí Labe", nadrze:["Labská","Les Království","Rozkoš","Seč","Pařížov","Křižanovice"],
    stav2026:"Labská a Les Království jsou od druhé poloviny října opět plné. Rozkoš jen ≈ 53 % – Úpa nemá vodu pro přivaděč, naposledy plnil v březnu. Pařížov dosáhl absolutního minima.", zranitelnost:2,
    role:"Rozkoš nadlepšuje Labe pro Opatovický uzel, kde odběry a minimální průtok vyžadují 14,43 m³/s. Prameniště v Krkonoších – rozhoduje zásoba vody ve sněhu." },
  orlice:{ n:"Orlice a Divoká Orlice", sprava:"Povodí Labe", nadrze:["Pastviny","Rozkoš (přes Metuji)"],
    stav2026:"Půda k 8. 11. převážně bez sucha, ale v létě velmi nízké až nulové průtoky na Bělé na Rychnovsku, Dědině a Cidlině.", zranitelnost:2,
    role:"ÚV Hradec Králové odebírá z Orlice 150 l/s. Z Bělé se při nízkých průtocích převádí nejméně 30 l/s do Dlouhé strouhy; odběr požadují ŠKODA AUTO Kvasiny a Wotan Forest." },
  svratka:{ n:"Svratka a Svitava", sprava:"Povodí Moravy", nadrze:["Vír","Brno","Boskovice","Mostiště","Hubenov"],
    stav2026:"Výrazné sucho na Svitavsku, Blanensku a Brněnsku. Rybník Rosnička u Svitav se po odbahnění téměř rok nedařilo napustit.", zranitelnost:3,
    role:"Brno je zásobováno ze dvou zdrojů: prameniště Březová nad Svitavou a nádrž Vír. Za prvních sedm měsíců 2026 tvořila podzemní voda asi 63 % a Vír asi 37 % dodávky." },
  dyje:{ n:"Dyje a Jihlava", sprava:"Povodí Moravy", nadrze:["Vranov","Nové Mlýny","Dalešice","Mohelno","Znojmo"],
    stav2026:"Vranov snížil odtok na mimořádné minimum 2,4 m³/s, v zimě až ≈ 2 m³/s. Nasycení půdy na Břeclavsku a Hodonínsku pod 10 %.", zranitelnost:5,
    role:"Dalešice (127 mil. m³) a Mohelno chladí Dukovany; dlouhodobý průměrný průtok Jihlavy pod Dalešicemi je ≈ 5,4 m³/s a dokumentace EIA počítá výhledově pod Mohelnem s ≈ 3,3 m³/s. V Nových Mlýnech se přemnožují sinice. Připravuje se závlahová soustava Hustopečsko pro ≈ 9 500 ha." },
  dmorava:{ n:"Dolní Morava", sprava:"Povodí Moravy", nadrze:["Koryčany","Ludkovice","Slušovice","Karolinka"],
    stav2026:"Mírné až výrazné sucho; v říjnu nasycení půdy na Hodonínsku pod 10 %. Nejvyšší počty tropických dní v zemi (až 50 za rok 2026).", zranitelnost:4,
    role:"Nejteplejší a nejsušší část státu, zemědělská produkce a vinice; závlahy jsou tu podmínkou pěstování některých plodin." },
  hmorava:{ n:"Horní Morava", sprava:"Povodí Moravy", nadrze:["Plumlov","Opatovice (Vyškov)","Fryšták"],
    stav2026:"V Olomouci v říjnu podle InterSucha nepršelo téměř nic. Výrazné sucho na pomezí s Olomouckým a Moravskoslezským krajem; Bečva u Grymova byla v srpnu na hranici hydrologického sucha.", zranitelnost:3,
    role:"Zemědělská produkce Hané, vydatné kvartérní náplavy Hornomoravského úvalu (zdroj Čerlinka u Litovle)." },
  becva:{ n:"Bečva", sprava:"Povodí Moravy", nadrze:["Bystřička","Karolinka","Horní Bečva"],
    stav2026:"Počátkem července 2026 spadlo při bouřkách v povodí Bečvy asi 100 mm srážek a povodňová vlna postupovala rychlostí asi 8 km/h – ukázka střídání sucha a přívalových povodní.", zranitelnost:3,
    role:"Flyšové podloží s malou zásobou podzemní vody, zato s vysokými srážkami a rychlým odtokem." },
  odra:{ n:"Odra, Opava a Olše", sprava:"Povodí Odry", nadrze:["Šance","Morávka","Kružberk","Slezská Harta","Žermanice","Těrlicko","Nové Heřminovy (plán)"],
    stav2026:"Nádrže Povodí Odry se díky jinému srážkovému režimu držely převážně na 81–95 %. Silně podnormální zůstaly mělké vrty v povodí Olše a Ostravice.", zranitelnost:2,
    role:"Ostravský oblastní vodovod – povrchová voda zásobuje asi 74 % obyvatel Moravskoslezského kraje, podzemní zdroje jen 12 %. Nové Heřminovy: stavba od 2028, provoz 2033 (≈ 4 mld. Kč)." }
};

/* --------------------------------------------------------------------------
   4. VODNÍ NÁDRŽE A VODÁRENSKÉ ZDROJE [název, lat, lon, účel, stav 2026, kód povodí]
   -------------------------------------------------------------------------- */
SM.reservoirs = [
  ["Lipno I",48.64,14.22,"kaskáda, energetika, zásoba pro Hněvkovice","≈ 47 % (12. 11.); 724,90 → 722,16 m n. m.","hvltava",5],
  ["Hněvkovice",49.21,14.37,"chladicí voda pro JE Temelín","dotováno z Lipna, provoz nebyl omezen","hvltava",3],
  ["Římov",48.85,14.49,"pitná voda pro ≈ 400 tis. Jihočechů","≈ 50 % (8.–12. 11.), odtok do Malše 250 l/s, zásoba ≈ 9 měsíců","hvltava",5],
  ["Husinec",49.05,14.05,"pitná voda, nadlepšování","zásobní prostor vyčerpán (7. 10.) – první v Česku","otava",5],
  ["Orlík",49.52,14.17,"kaskáda, energetika, nadlepšování","−15 m, od 4. 9. vypouští jen přítok","dvltava",5],
  ["Slapy",49.73,14.41,"kaskáda, nadlepšování Prahy","58 % (pol. října), −0,5 m/týden; poprvé v historii se vypouští","dvltava",5],
  ["Švihov (Želivka)",49.73,15.08,"pitná voda pro Prahu a stř. Čechy (1,5 mil. lidí)","80 % (8. 10.) – dostatečný","sazava",2],
  ["Nýrsko",49.28,13.13,"pitná voda Klatovsko","snížený","berounka",3],
  ["Hracholusky",49.78,13.14,"energetika, rekreace","snížený","berounka",3],
  ["Žlutice",50.10,13.17,"pitná voda pro dva kraje (KV + PL)","strategický zdroj, šetří se","ohre",4],
  ["Stanovice",50.17,12.82,"pitná voda Karlovy Vary","snížený","ohre",3],
  ["Podhora",49.98,12.86,"pitná voda Mariánské Lázně","52 % (srpen)","ohre",4],
  ["Nechranice",50.37,13.46,"nadlepšování Ohře, chlazení elektráren","snížený","ohre",3],
  ["Přísečnice",50.49,13.14,"pitná voda severozápadní Čechy","dostatečný","ohre",2],
  ["Fláje",50.65,13.56,"pitná voda Teplicko","dostatečný","ohre",2],
  ["Souš",50.78,15.31,"pitná voda Jablonecko","dostatečný","plouc",1],
  ["Josefův Důl",50.78,15.25,"pitná voda Liberecko","dostatečný","plouc",1],
  ["Labská",50.70,15.59,"Labe, Krkonoše","plná od 2. pol. října; letos odbahněna (36 600 m³)","hlabe",1],
  ["Les Království",50.44,15.75,"Labe, nadlepšování","plná od 2. pol. října","hlabe",1],
  ["Rozkoš",50.40,16.07,"nadlepšování Labe pro Opatovický uzel","≈ 53 % (8. 11.); přivaděč z Úpy naposledy v březnu","hlabe",3],
  ["Pastviny",50.09,16.58,"nadlepšování Divoké Orlice","snížený","orlice",2],
  ["Seč",49.84,15.65,"nadlepšování Chrudimky, rekreace","snížený","hlabe",3],
  ["Pařížov",49.83,15.57,"nadlepšování","absolutní minimum (říjen) – nižší hladina by poškodila hráz","hlabe",4],
  ["Vír",49.57,16.32,"pitná voda pro Brno (≈ 37 % dodávky)","snížený; doplňkem je prameniště Březová","svratka",3],
  ["Březová nad Svitavou",49.63,16.52,"prameniště – pitná voda pro Brno (≈ 63 %)","klesající vydatnost zdroje","svratka",3],
  ["Boskovice",49.49,16.62,"pitná voda Boskovicko","snížený","svratka",3],
  ["Mostiště",49.38,15.96,"pitná voda Žďársko","snížený","svratka",3],
  ["Vranov",48.90,15.81,"nadlepšování Dyje, závlahy","odtok snížen na 2,4 m³/s, XII–II až ≈ 2 m³/s","dyje",5],
  ["Nové Mlýny",48.88,16.63,"závlahy, nadlepšování","přemnožené sinice","dyje",4],
  ["Dalešice",49.11,15.99,"chlazení JE Dukovany (127 mil. m³)","klíčová zásoba, přísné víceleté řízení","dyje",4],
  ["Mohelno",49.10,16.19,"vyrovnávací nádrž pro Dukovany","nízké průtoky Jihlavy","dyje",4],
  ["Koryčany",49.11,17.16,"pitná voda Kroměřížsko","snížený","dmorava",4],
  ["Slušovice",49.26,17.78,"pitná voda Zlínsko","snížený","dmorava",3],
  ["Karolinka",49.36,18.25,"pitná voda Vsetínsko","snížený","becva",3],
  ["Bystřička",49.45,18.05,"nadlepšování Bečvy","snížený","becva",3],
  ["Plumlov",49.46,17.01,"rekreace, nadlepšování","snížený","hmorava",3],
  ["Šance",49.47,18.41,"pitná voda – Ostravský oblastní vodovod","81–95 % (srpen) – dostatečný","odra",2],
  ["Morávka",49.60,18.51,"pitná voda – OOV","dostatečný","odra",2],
  ["Kružberk",49.84,17.70,"pitná voda – OOV","dostatečný","odra",2],
  ["Slezská Harta",49.89,17.59,"akumulace pro Kružberk","dostatečný","odra",2],
  ["Žermanice",49.74,18.44,"průmysl Ostravsko","dostatečný","odra",2],
  ["Těrlicko",49.75,18.49,"průmysl, rekreace","dostatečný","odra",2],
  ["Jordán (Tábor)",49.40,14.66,"rekreace, nadlepšování","odbahněn 2011–14 za ≈ 400 mil. Kč","luznice",3],
  ["Landštejn",48.96,15.26,"pitná voda Jindřichohradecko","snížený","luznice",4],
  ["Nová Říše",49.12,15.52,"pitná voda Telčsko","snížený","luznice",4],
  ["Hubenov",49.39,15.47,"pitná voda Jihlava","snížený","sazava",3],
  ["Nové Heřminovy (plán)",49.94,17.51,"plánovaná nádrž – stavba 2028, provoz 2033","v přípravě (≈ 4 mld. Kč)","odra",0],
  ["Vlachovice (plán)",49.17,17.90,"plánovaná nádrž – dokončení ≈ 2031","dokumentace a EIA","dmorava",0],
  ["Kryry (plán)",50.18,13.42,"plánovaná nádrž – dokončení ≈ 2035","v přípravě","ohre",0]
];

/* --------------------------------------------------------------------------
   5. STAV SUCHA LISTOPAD 2026 — uzly přepisují textový souhrn InterSucho
   k 8.–10. 11. 2026 do mapy. 0 = bez sucha … 5 = extrémní sucho v profilu
   0–100 cm.  [lat, lon, stupeň]
   Zdroj: InterSucho (CzechGlobe AV ČR, MENDELU), souhrn k 8. 11. 2026
   a Bulletin InterSucho 45/2026 (10. 11. 2026).
   -------------------------------------------------------------------------- */
SM.drought2026 = [
  [49.44,12.93,5],[49.40,13.30,5],[48.95,14.47,5],[49.14,15.00,5],[49.60,15.58,5],
  [50.20,12.91,4],[50.18,12.64,4],[49.77,13.38,4],[49.96,12.70,4],[49.26,13.91,4],
  [49.31,14.15,4],[49.41,14.66,4],[49.16,15.44,4],[49.43,15.22,4],[49.07,13.62,2],
  [49.34,18.00,3],[49.47,17.97,3],[49.59,17.27,3],[49.46,17.45,3],[48.76,16.88,3],
  [48.85,17.13,3],[49.36,16.64,3],[49.15,16.69,3],[49.76,16.47,3],[49.21,15.88,3],
  [49.56,15.94,3],[49.22,17.67,3],[49.33,17.57,3],[48.88,16.09,3],[48.81,16.64,3],
  [49.07,17.46,2],[49.30,17.39,2],[49.47,17.11,2],[49.28,17.00,2],[49.49,16.66,2],
  [49.40,15.59,2],[49.78,14.69,2],[49.95,15.27,2],[49.69,14.01,2],[49.47,13.84,2],
  [49.74,13.60,2],[49.98,13.49,2],[50.10,13.73,2],[49.80,12.63,2],[49.67,12.68,2],
  [50.33,13.55,2],[50.50,13.64,2],[50.47,13.42,2],[49.96,14.07,2],[50.09,14.42,1],
  [50.10,14.26,1],[50.46,14.17,1],[50.19,15.04,1],[49.91,15.38,1],[50.01,15.74,1],
  [49.95,15.80,1],[49.97,16.40,2],[49.87,16.20,2],[49.97,16.97,2],[49.65,16.95,2],
  [49.99,17.46,1],[49.94,17.90,2],[49.83,18.16,1],[49.70,18.11,1],[49.85,18.54,1],
  [49.68,18.35,1],[49.59,18.01,1],[49.55,18.45,1],[50.09,17.70,1],[50.23,17.20,1],
  [50.08,17.23,0],[50.18,17.11,0],[50.56,15.91,0],[50.42,16.16,0],[50.18,15.84,0],
  [50.33,15.35,0],[50.41,14.91,0],[50.77,15.02,0],[50.72,15.17,0],[50.92,15.08,0],
  [50.77,15.55,0],[50.69,15.73,0],[50.69,14.54,0],[50.68,14.04,1],[50.78,14.21,1],
  [50.91,14.62,0],[50.64,13.82,1],[50.56,13.93,1],[50.40,12.97,1],[50.58,13.60,1],
  [48.78,14.00,3],[48.81,14.32,4],[49.18,14.37,4],[49.05,13.78,3],[49.01,14.00,3],
  [49.02,13.58,1],[49.46,18.14,2],[49.75,18.63,1],[49.78,17.54,2],[49.55,17.73,2],
  [50.35,13.80,2],[49.09,16.13,3],[48.90,17.32,3],[50.44,15.37,0],[50.30,16.00,0],
  [50.05,15.40,1],[49.73,16.03,2],[50.47,15.10,0],[50.62,15.15,0],[50.78,15.32,0]
];

/* --------------------------------------------------------------------------
   6. PROFILY KRAJŮ — rozšíření údajů z kapitoly „Ohrožení“ o dimenze
   zásobování, průmyslu, zemědělství, zdraví a regionálních programů.
   supply/soil = stupnice 1–5 (1 nízké … 5 kritické), soil = nejvyšší stupeň
   půdního sucha 0–100 cm, který InterSucho k 8. 11. 2026 v části kraje uvádí.
   zdroj: podíl obyvatel zásobovaných z povrchové / podzemní / smíšené vody
   (orientačně podle krajských plánů pro sucho, SZÚ a ČSÚ).
   -------------------------------------------------------------------------- */
SM.kraje = {
  JHC:{ n:"Jihočeský", supply:5, soil:5, propoj:3, vlastniZdroje:3, zdrojPovodi:["hvltava","otava"],
    zdroj:[70,20,10], prumysl:["potravinářství","papírenství (Větřní)","energetika – JE Temelín","rybníkářství"],
    mesta:[["České Budějovice",97000]], tropDny:24,
    problem:"Extrémní sucho v celém půdním profilu, vyčerpávající se vodárenské nádrže, vysychající obecní zdroje. Od 6. 10. platí v celém kraji stav sucha.",
    ekonomika:"Rybníkářství: na Třeboňsku dosáhly ztráty vody v rybnících skoro 40 % dřívějšího objemu, odhadované produkční ztráty u kaprů asi 20 %. Přerušená plavba po Vltavě do Českých Budějovic.",
    programy:["Napojování obcí na Jihočeskou vodárenskou soustavu (Tučapy ≈ 47 mil. Kč)","OPŽP – výzva 73 (méně rozvinuté regiony se na kraj nevztahuje; využitelné jsou výzvy 105 a 109)","Krajská komise pro sucho – stav sucha od 6. 10. 2026"] },
  JHM:{ n:"Jihomoravský", supply:5, soil:3, propoj:4, vlastniZdroje:3, zdrojPovodi:["svratka"],
    zdroj:[40,45,15], prumysl:["zemědělství a vinařství","potravinářství","strojírenství Brno","chemie"],
    mesta:[["Brno",382000]], tropDny:50,
    problem:"Dlouhodobé zemědělské sucho, v říjnu nasycení půdy pod 10 % na Břeclavsku a Hodonínsku. V létě v několika obcích na Brněnsku došla pitná voda.",
    ekonomika:"Nejvyšší počet tropických dní v zemi (v roce 2026 až 50). Chmel na Žatecku i vinice na jižní Moravě: bobule drobné, cukernaté, s méně šťávou – vinaři dnes dokupují kyselinu, ne cukr. Mladé výsadby do 4 let trpěly usycháním.",
    programy:["Závlahová soustava Hustopečsko (≈ 9 500 ha) – v přípravě","Vohančice – krajinná opatření za ≈ 80 mil. Kč a napojení na vodovod Tišnovska","Propojení Brna: prameniště Březová (≈ 63 %) + nádrž Vír (≈ 37 %)"] },
  PLK:{ n:"Plzeňský", supply:4, soil:5, propoj:3, vlastniZdroje:4, zdrojPovodi:["berounka","ohre"],
    zdroj:[45,45,10], prumysl:["automobilový a strojírenský průmysl","pivovarnictví","potravinářství"],
    mesta:[["Plzeň",186000]], tropDny:26,
    problem:"Extrémní a výjimečné sucho v hlubších vrstvách půdy, úbytek podzemních vod.",
    ekonomika:"Plzeň-Bolevec 41,5 °C (4. 8. 2026) – na dvanácti stanicích v Česku bylo přes 40 °C. Pivovarnictví je citlivé na jakost i teplotu vody a na cenu chmele.",
    programy:["Skupinový vodovod Žlutice – Toužim – Bezdružice","Propojování vodárenských soustav (MZe, 5 mld. Kč od roku 2020)"] },
  KVK:{ n:"Karlovarský", supply:4, soil:4, propoj:3, vlastniZdroje:4, zdrojPovodi:["ohre"],
    zdroj:[75,15,10], prumysl:["lázeňství a minerální vody","porcelán a sklo","energetika Sokolovsko"],
    mesta:[["Karlovy Vary",48000]], tropDny:18,
    problem:"Výjimečné sucho téměř plošně v hlubších vrstvách půdy; strategická nádrž Žlutice zásobuje i Plzeňsko.",
    ekonomika:"Lázeňství stojí na stabilitě hlubokého oběhu minerálních vod – ten je na roční sucho málo citlivý, ale závisí na dlouhodobém doplňování. Elektrárny Tisová a Vřesová jsou v kritické infrastruktuře se smluvně zajištěným zásobováním.",
    programy:["Vodní nádrž Žlutice – zdroj pro dva kraje","OPŽP výzva 73 (méně rozvinutý region) – přírodě blízká opatření","Soustava Podhora – Mariánské Lázně"] },
  ZLK:{ n:"Zlínský", supply:4, soil:3, propoj:3, vlastniZdroje:4, zdrojPovodi:["dmorava","becva"],
    zdroj:[60,30,10], prumysl:["gumárenství a plasty","strojírenství","potravinářství","obuvnictví"],
    mesta:[["Zlín",74000]], tropDny:32,
    problem:"Výrazný srážkový deficit a sucho v celém profilu, zejména na pomezí s Olomouckým a Moravskoslezským krajem.",
    ekonomika:"Flyšové podloží znamená malou zásobu podzemní vody – zásobování stojí na nádržích Slušovice, Karolinka a Ludkovice. Zpracovatelský průmysl potřebuje technologickou vodu po celý rok.",
    programy:["Plánovaná nádrž Vlachovice – dokumentace a EIA, dokončení podle plánu ≈ 2031","OPŽP výzva 73 – přírodě blízká opatření"] },
  VYS:{ n:"Vysočina", supply:3, soil:5, propoj:2, vlastniZdroje:5, zdrojPovodi:["sazava","svratka"],
    zdroj:[45,40,15], prumysl:["energetika – JE Dukovany","strojírenství","zemědělství a chov skotu","dřevozpracování"],
    mesta:[["Jihlava",51000]], tropDny:16,
    problem:"„Střecha Evropy“ – prameniště Vltavy, Moravy i Dyje. Na Havlíčkobrodsku extrémní sucho, na východě výrazné.",
    ekonomika:"Krystalinikum: lesy jsou tu podle terénních pozorování celkově méně ohrožené, ale vodárenské zdroje vázané na puklinové prameny mnohem víc. Chov skotu naráží na nedostatek objemných krmiv.",
    programy:["Herálec – Svratka vrácena do meandrů (téměř o kilometr delší tok)","JE Dukovany: nové bloky s hybridním chlazením","Pozemkové úpravy a obnova remízků v rámci OPŽP"] },
  ULK:{ n:"Ústecký", supply:3, soil:2, propoj:4, vlastniZdroje:2, zdrojPovodi:["ohre","plouc"],
    zdroj:[85,10,5], prumysl:["chemie (Litvínov, Ústí)","energetika na Ohři","chmelařství Žatecko","doprava po Labi"],
    mesta:[["Ústí nad Labem",92000],["Děčín",48000],["Most",64000],["Chomutov",48000]], tropDny:28,
    problem:"Srážkový stín Krušných hor, závislost na nádržích; mělké vrty v povodí Ohře a dolního Labe klesly v srpnu pod minimum roku 2018.",
    ekonomika:"Chmel: v klíčových oblastech na Žatecku klesla produkce až o 30 % a vysoké teploty snížily obsah hořkých látek – šišek bylo dost, ale byly drobné a lehké. Plavba po Labi je při nízkých stavech přerušována.",
    programy:["Plánovaná nádrž Kryry – dokončení podle plánu ≈ 2035","OPŽP výzva 73 (méně rozvinutý region)","Severočeská vodárenská soustava – vysoká propojenost"] },
  STC:{ n:"Středočeský", supply:3, soil:2, propoj:5, vlastniZdroje:3, zdrojPovodi:["sazava","jizera","dlabe"],
    zdroj:[70,20,10], prumysl:["automobilový průmysl","chemie Kralupy","energetika Mělník","výzkum ÚJV Řež"],
    mesta:[["Kladno",68000],["Mladá Boleslav",44000]], tropDny:26,
    problem:"Zásobování obyvatel je díky Želivce stabilní, ale na Vltavě a Labi platí stav nedostatku vody a průmysl pod kaskádou je na ní závislý.",
    ekonomika:"Nejvyšší koncentrace odběrů závislých na nadlepšované Vltavě: Elektrárna Mělník (elektřina a teplo pro Prahu), ÚJV Řež, chemické závody Kralupy a Podolská vodárna. Při poklesu Vltavy na 10–15 m³/s jsou tyto odběry ohroženy.",
    programy:["Želivka + Káraný (břehová a umělá infiltrace) – dvojitá pojistka pro Prahu a střední Čechy","Krajská komise schválila možnost snížit odtok z Vraného až na 20 m³/s","Hlásná Třebaň a další obce – omezení zalévání a bazénů"] },
  PAK:{ n:"Pardubický", supply:3, soil:3, propoj:4, vlastniZdroje:3, zdrojPovodi:["hlabe","orlice"],
    zdroj:[35,55,10], prumysl:["chemie Pardubice","energetika – Elektrárna Opatovice","strojírenství","elektrotechnika"],
    mesta:[["Pardubice",92000]], tropDny:24,
    problem:"Klesající průtoky na Labi, Chrudimce a Svitavě, podnormální podzemní vody. Zásobování je zatím stabilní, kraj zrychluje propojování soustav.",
    ekonomika:"Opatovický uzel: odběry a minimální průtok tu vyžadují 14,43 m³/s. V roce 2018 tu kvůli odběru Elektrárny Opatovice nastal kritický stav. Nádrž Pařížov na Chrudimsku dosáhla v říjnu absolutního minima.",
    programy:["Vysokomýtská synklinála – silný podzemní zdroj (až 3 000 l/s), plánované napojení Holicka","Zrychlené propojování vodárenských soustav (kraj + vodohospodáři)","OPŽP výzva 73 (méně rozvinutý region)"] },
  OLK:{ n:"Olomoucký", supply:3, soil:3, propoj:3, vlastniZdroje:3, zdrojPovodi:["hmorava"],
    zdroj:[35,55,10], prumysl:["zemědělství Hané","potravinářství","strojírenství","optika"],
    mesta:[["Olomouc",100000],["Přerov",42000]], tropDny:30,
    problem:"Sucho v povodí Moravy a v zemědělských nížinách; v Olomouci v říjnu téměř nepršelo.",
    ekonomika:"Hanácká obilnice: sklizeň obilovin byla v roce 2026 v průměru nižší o 17 %, ječmene o 24 % a jarního ovsa o 43 %. Kvartérní náplavy Hornomoravského úvalu jsou vydatný zdroj (Čerlinka u Litovle), ale jejich stav kopíruje průtoky Moravy.",
    programy:["OPŽP výzva 73 (méně rozvinutý region)","Revitalizace Bečvy a Moravy – přírodě blízká opatření","Umělá infiltrace a posilování zdrojů v Hornomoravském úvalu"] },
  MSK:{ n:"Moravskoslezský", supply:2, soil:3, propoj:5, vlastniZdroje:2, zdrojPovodi:["odra"],
    zdroj:[74,12,14], prumysl:["hutnictví a ocelářství","energetika","chemie","automobilový průmysl"],
    mesta:[["Ostrava",283000],["Havířov",70000],["Opava",55000],["Frýdek-Místek",54000]], tropDny:28,
    problem:"Paradox: silné půdní sucho na Opavsku a Osoblažsku, ale zásobování pitnou vodou drží nádrže v Beskydech a Jeseníkách.",
    ekonomika:"Nejprůmyslovější kraj s nejvyšší spotřebou technologické a chladicí vody v zemi – a zároveň s nejodolnějším zásobováním, protože stojí na povrchové vodě ze čtyř horských nádrží. Povrchová voda zásobuje asi 74 % obyvatel, podzemní jen 12 %.",
    programy:["Ostravský oblastní vodovod – Šance, Morávka, Kružberk, Slezská Harta","Nové Heřminovy – stavba od 2028, provoz 2033 (≈ 4 mld. Kč)","OPŽP výzva 73 (méně rozvinutý region)"] },
  HKK:{ n:"Královéhradecký", supply:2, soil:0, propoj:4, vlastniZdroje:3, zdrojPovodi:["orlice","hlabe"],
    zdroj:[30,60,10], prumysl:["automobilový průmysl (ŠKODA AUTO Kvasiny)","energetika – Elektrárna Poříčí","textil","dřevozpracování (Wotan Forest)"],
    mesta:[["Hradec Králové",93000],["Trutnov",30000],["Náchod",19000]], tropDny:22,
    problem:"Půda je k 8. 11. převážně bez sucha, ale nádrž Rozkoš je jen asi z poloviny plná, protože Úpa nemá vodu pro přivaděč. Na jaře 2026 sucho zasáhlo setí.",
    ekonomika:"Ze skupinových vodovodů je zásobeno asi 75 % obyvatel; ÚV Hradec Králové odebírá z Orlice 150 l/s. Nejvíc malých místních zdrojů je na Trutnovsku a Rychnovsku. Suchem jsou v létě postiženy okolí Bělé na Rychnovsku, Dědiny a Cidliny.",
    programy:["Posílení Rozkoše převodem vody z Metuje – studie","Prameniště Litá – perspektivní lokalita pro umělou infiltraci (řízené doplňování podzemní vody)","Labská přehrada odbahněna (36 600 m³ sedimentů)","Plán pro zvládání sucha Královéhradeckého kraje (GEOtest, 2022)"] },
  LBK:{ n:"Liberecký", supply:1, soil:0, propoj:4, vlastniZdroje:2, zdrojPovodi:["plouc"],
    zdroj:[80,15,5], prumysl:["automobilový průmysl","sklářství a bižuterie","strojírenství"],
    mesta:[["Liberec",107000],["Jablonec nad Nisou",45000]], tropDny:16,
    problem:"Nejpříznivější stav v republice: Krkonoše a Jizerské hory dávají dostatek srážek, půdní profil je převážně nasycený.",
    ekonomika:"Sklářství a bižuterie jsou energeticky i vodně náročné, ale zásobování z horských nádrží (Souš, Josefův Důl, Bedřichov) je stabilní. Silně podnormální zůstalo povodí Lužické Nisy a Stěnavy.",
    programy:["Sedmihorské mokřady – revitalizace jako ukázka funkční retence (ČSOP)","OPŽP výzva 73 (méně rozvinutý region)","Horské prameniště Jizery a Labe – ochranná pásma"] },
  PHA:{ n:"Praha", supply:1, soil:1, propoj:5, vlastniZdroje:1, zdrojPovodi:["sazava","jizera"],
    zdroj:[75,20,5], prumysl:["služby a administrativa","teplárenství (teplo z Mělníka)","potravinářství"],
    mesta:[["Praha",1384000]], tropDny:30,
    problem:"Pitnou vodu dodává Želivka (Švihov) a Káraný; Vltava protéká městem jen díky vypouštění z kaskády.",
    ekonomika:"Největší městský tepelný ostrov v zemi: ve městě při teplotách nad 30 °C bývá až o 8 °C víc než v okolní krajině, povrch asfaltu a tmavých střech přes 50 °C. Praha je jediné krajské město s plánem pro vlny veder.",
    programy:["Želivka + Káraný – dvojitý zdroj pro 1,5 mil. lidí","Adaptační strategie hl. m. Prahy – modrozelená infrastruktura","Podolská vodárna – záložní odběr z Vltavy"] }
};

SM.krajAbbr = { JHC:"JČ", JHM:"JM", PLK:"PL", KVK:"KV", ZLK:"ZL", VYS:"VY", ULK:"ÚL",
  STC:"SČ", PAK:"PA", OLK:"OL", MSK:"MS", HKK:"HK", LBK:"LB", PHA:"PHA" };

/* --------------------------------------------------------------------------
   7. SCÉNÁŘE A HORIZONTY
   Oteplení a změny srážek vycházejí z ansámblu CMIP6 pro Česko
   (ČHMÚ + CzechGlobe: Hodnocení změny klimatu a adaptačních potřeb ČR, 2025;
   medián +2,0 °C k roku 2045 a +3,1 °C k roku 2075 proti 1981–2010,
   roční srážky ≈ +3 %, léto −2 až −6 %, zima a jaro +3 až +12 %).
   Krizový scénář odpovídá horní části ansámblu (SSP5-8.5, ALADIN-CLIMATE/CZ
   až +5 °C), optimistický jeho dolní části spolu s obnovenou retencí krajiny.
   dT = oteplení proti normálu 1991–2020 (dnes ≈ +0,8 °C)
   dPl / dPz = změna letních / zimních srážek v %
   ret = schopnost krajiny zadržet vodu (0–100; dnešní stav ≈ 35)
   odb = odběry v % dnešní potřeby, aku = navýšení zásobního prostoru nádrží v %
   priv = přívalovost srážek (0–100; dnes ≈ 45)
   -------------------------------------------------------------------------- */
SM.horizons = [
  { id:"h2027", lbl:"2026/27", sub:"nejbližší zima a jaro", rok:2027, typ:"sezonni",
    popis:"Krátkodobý výhled. Rozhoduje zásoba vody ve sněhu a jarní srážky. Do tohoto horizontu se promítá skutečný stav z listopadu 2026." },
  { id:"h2030", lbl:"2028–2035", sub:"kumulativní dopady", rok:2032, typ:"stredni",
    popis:"Střednědobý horizont. Mělké podzemní vody, lokální vodovody, zemědělství a lesy nesou kumulativní následky řady suchých let." },
  { id:"h2040", lbl:"2040", sub:"strukturální změna", rok:2040, typ:"dlouhy",
    popis:"Posun vegetačních stupňů a pěstebních oblastí se už projevuje v krajině i ve statistikách výnosů." },
  { id:"h2050", lbl:"2050", sub:"polovina století", rok:2050, typ:"dlouhy",
    popis:"Horizont dnešních plánů a investic. Vodárenské nádrže podle vlády nebudou za 30–40 let schopné zadržovat dnešní množství vody." },
  { id:"h2075", lbl:"2075", sub:"horizont Vize 2075", rok:2075, typ:"dlouhy",
    popis:"Dlouhodobá bilance vodárenských nádrží a hlubokých zvodní. Horizont, ke kterému se vztahuje celý projekt Vize 2075." }
];

SM.scenarios = {
  opt:{ n:"Optimistický", sub:"aktivní adaptace a retence vody v krajině", barva:"ok",
    popis:"Dolní část klimatického ansámblu (blízko SSP1-2.6) spolu s tím, co je v naší moci: přestavba 1,2 mil. ha drenáží na regulační systémy, obnova mokřadů a niv, zdravá půda, úspory, propojené vodárenské soustavy a nové akumulace. Simulace z kapitoly Nádrže a simulace dává v tomto nastavení kritický stav asi ve 4 % let po roce 2030.",
    dT:{h2027:0.9,h2030:1.1,h2040:1.4,h2050:1.7,h2075:2.2},
    dPl:{h2027:-1,h2030:-2,h2040:-2,h2050:-3,h2075:-4},
    dPz:{h2027:2,h2030:3,h2040:5,h2050:7,h2075:9},
    ret:{h2027:38,h2030:48,h2040:62,h2050:72,h2075:80},
    odb:{h2027:98,h2030:94,h2040:90,h2050:86,h2075:82},
    aku:{h2027:0,h2030:4,h2040:10,h2050:15,h2075:20},
    priv:{h2027:46,h2030:47,h2040:48,h2050:50,h2075:52} },
  trend:{ n:"Realistický trend", sub:"současné tempo, dnešní krajina", barva:"warn",
    popis:"Medián ansámblu CMIP6 pro Česko a krajina, která se mění jen pozvolna. Roční srážky se téměř nemění, ale rostoucí výpar je požírá: letní srážky mírně klesají, zima a jaro přibývají. Simulace dává v tomto nastavení kritický stav asi v 19 % let po roce 2030 a od poloviny století častěji než v každém pátém roce.",
    dT:{h2027:0.9,h2030:1.2,h2040:1.8,h2050:2.3,h2075:3.1},
    dPl:{h2027:-2,h2030:-3,h2040:-4,h2050:-5,h2075:-6},
    dPz:{h2027:1,h2030:2,h2040:4,h2050:5,h2075:7},
    ret:{h2027:34,h2030:33,h2040:33,h2050:34,h2075:35},
    odb:{h2027:100,h2030:101,h2040:103,h2050:104,h2075:105},
    aku:{h2027:0,h2030:1,h2040:4,h2050:7,h2075:10},
    priv:{h2027:47,h2030:50,h2040:55,h2050:60,h2075:68} },
  kriz:{ n:"Krizový", sub:"SSP5-8.5 bez systémových opatření", barva:"crit",
    popis:"Horní část ansámblu (SSP5-8.5; ALADIN-CLIMATE/CZ dává ke konci století až +5 °C) a krajina, která dál ztrácí retenci: utužené půdy, pokračující odvodnění, rostoucí odběry. Odpovídá situaci, kdy by se roky podobné roku 2026 staly normou – v simulaci je pak kritický stav ve většině let.",
    dT:{h2027:1.1,h2030:1.5,h2040:2.3,h2050:3.1,h2075:4.6},
    dPl:{h2027:-5,h2030:-8,h2040:-11,h2050:-14,h2075:-18},
    dPz:{h2027:0,h2030:1,h2040:3,h2050:4,h2075:6},
    ret:{h2027:32,h2030:29,h2040:25,h2050:22,h2075:18},
    odb:{h2027:102,h2030:105,h2040:110,h2050:115,h2075:122},
    aku:{h2027:0,h2030:0,h2040:2,h2050:3,h2075:5},
    priv:{h2027:50,h2030:55,h2040:63,h2050:72,h2075:85} }
};

/* --------------------------------------------------------------------------
   8. VRSTVY MAPY — osm odborných dimenzí zadání
   -------------------------------------------------------------------------- */
SM.layers = [
  { id:"srazky", zkr:"Srážky", n:"Srážky a výpar", kratce:"klimatická vodní bilance",
    kap:["klima","Klima, půda, podzemí, mokřady a řeky"],
    popis:"Rozdíl mezi srážkami a potenciálním výparem (klimatická vodní bilance) a struktura srážek. Rozhoduje nejen úhrn, ale podíl přívalových dešťů, které po utužené půdě odtečou. Oteplení o 1 °C znamená podle MZe ztrátu asi 40 mm vody výparem ročně, tedy kolem 3,1 mld. m³ – i při nezměněných srážkách.",
    zdroje:["ČHMÚ – územní srážky a teploty","MZe – Punčochář, ČAZV 2024","ČHMÚ + CzechGlobe – Hodnocení změny klimatu ČR 2025"] },
  { id:"povrch", zkr:"Povrchová voda", n:"Stav povrchové vody", kratce:"průtoky, malé toky, nádrže",
    kap:["povrch","Mokřady, drobné toky a velké řeky"],
    popis:"Průtoky v tocích, riziko vysychání drobných toků (91,7 tis. km z celkových 108 tis. km) a zranitelnost vodárenských nádrží v daném povodí. V létě 2026 dosáhly průtoky na čtvrtině toků minim, která nemají za asi 60 let měření obdobu.",
    zdroje:["ČHMÚ HAMR – hydrologické povrchové sucho","Povodí Vltavy, Labe, Ohře, Moravy, Odry","VÚV TGM – projekt EKOSVYST (vysychavé toky)"] },
  { id:"podzemi", zkr:"Podzemní voda", n:"Podpovrchová a podzemní voda", kratce:"půdní vláha a zvodně",
    kap:["podzemi","Půda a podzemní voda"],
    popis:"Půdní vláha v kořenové zóně (0–40 a 40–100 cm) a stav hlubších hydrogeologických struktur. Rozdíl je zásadní: v krystaliniku se zásoba vyčerpá za týdny a doplní za měsíce, v křídové pánvi se vyčerpává roky a doplňuje desítky let.",
    zdroje:["InterSucho (CzechGlobe AV ČR, MENDELU)","ČHMÚ – mělké a hluboké vrty, vydatnost pramenů","ČGS – Rebilance zásob podzemních vod (2016)"] },
  { id:"pitna", zkr:"Pitná voda", n:"Zásobování pitnou vodou", kratce:"zdroj, propojenost, výpadky",
    kap:["obce","Tisícovka nejohroženějších území"],
    popis:"Závislost regionu na povrchové vs. podzemní vodě, propojenost vodárenských soustav a riziko lokálních výpadků. V ČR se pitná voda vyrábí přibližně z poloviny z podzemních a z poloviny z povrchových zdrojů; podle SZÚ bylo v roce 2024 z podzemních zdrojů zásobeno 38,97 % obyvatel, z povrchových 37,44 % a ze smíšených 23,59 %.",
    zdroje:["SZÚ – Zpráva o kvalitě pitné vody v ČR 2024","Krajské plány pro zvládání sucha a stavu nedostatku vody","ČHMÚ / MŽP – ≈ 1 000 nejohroženějších katastrálních území"] },
  { id:"krajina", zkr:"Krajina", n:"Krajina a péče o ni", kratce:"retence, eroze, lesy",
    kap:["puda-banka","Půda jako banka na vodu"],
    popis:"Retenční schopnost půdy, zhutnění a eroze ornice, stav lesů a podíl meliorací proti revitalizačním prvkům. Zdravá půda o mocnosti 1 m na ploše 1 km² zadrží v průměru 200 000 m³ vody; potenciál všech zemědělských a lesních půd je přes 8 mld. m³, dnes jsme asi na 5 mld. m³ – ztráta přes 3 mld. m³ je důsledek stavu půdy.",
    zdroje:["VÚV TGM – mokřady na archivních mapových podkladech (ztráta 99,5 %)","MZe – 1,2 mil. ha odvodněné zemědělské půdy","V. Cílek: Epilog: suchý rok 2026 (rukopis, 2026)"] },
  { id:"zemedelstvi", zkr:"Zemědělství", n:"Zemědělství a chov dobytka", kratce:"výnosy, závlahy, tepelný stres",
    kap:["rok2026-ukazal","Co suchý rok 2026 ukázal v krajině"],
    popis:"Ohrožení výnosů klíčových plodin, nutnost závlah, tepelný stres hospodářských zvířat a dostupnost objemných krmiv i napájecí vody. Komfortní zóna pro dojnice končí už nad 20 °C – krávy pak omezují příjem potravy a tím produkci mléka.",
    zdroje:["Agrární komora ČR, ČSÚ – sklizeň 2026","V. Cílek: Epilog: suchý rok 2026 (rukopis, 2026)","InterSucho – dopady na zemědělství"] },
  { id:"prumysl", zkr:"Průmysl", n:"Průmysl a ekonomika", kratce:"chlazení, technologická voda, HDP",
    kap:["energetika","Energetika a chlazení"],
    popis:"Zranitelnost průmyslových odvětví v regionu – energetika a chlazení, chemický, papírenský, potravinářský a zpracovatelský průmysl – a dopad vodního stresu na zaměstnanost v kraji. Riziko nevzniká v létě jednoho suchého roku, ale při vyčerpání nádrží v řadě suchých let.",
    zdroje:["Povodí Vltavy – manipulační limity kaskády","SÚJB, dokumentace EIA NJZ Dukovany","podkladová analýza Rizika sucha v ČR 2027"] },
  { id:"zdravi", zkr:"Zdraví", n:"Fyzické a psychické zdraví", kratce:"vedra, UHI, nadúmrtí",
    kap:["zdravi","Zdraví a vlny veder"],
    popis:"Počet tropických dní a nocí, efekt městských tepelných ostrovů, statistické riziko nadúmrtí při vlnách veder, kardiovaskulární zátěž a dopady na psychiku. V Česku si vedra v létě 2026 podle recenzované studie v Nature Health vyžádala ve sledovaných městech 701 nadměrných úmrtí, z toho asi 425 (62 %) je připsáno oteplování způsobenému člověkem.",
    zdroje:["Barnes et al., Nature Health (Imperial College London + LSHTM), 2026","CzechGlobe – nadúmrtí při vlnách veder červen–červenec 2026 (+573)","EuroMOMO / ECDC – nadúmrtí v Evropě","ČHMÚ + CzechGlobe – projekce tropických dní a nocí"] }
];

/* --------------------------------------------------------------------------
   9. MÍSTOPISNÝ SEZNAM PRO VYHLEDÁVÁNÍ
   [název, lat, lon, PSČ (0 = neuvedeno), obyvatel v tisících (0 = neuvedeno)]
   Seznam slouží jen k nalezení místa v mapě – model počítá pro libovolný
   bod, na který kliknete, nikoli jen pro obce ze seznamu.
   -------------------------------------------------------------------------- */
SM.places = [
  ["Praha",50.0755,14.4378,11000,1384],["Brno",49.1951,16.6068,60200,382],
  ["Ostrava",49.8209,18.2625,70200,283],["Plzeň",49.7384,13.3736,30100,186],
  ["Liberec",50.7663,15.0562,46001,107],["Olomouc",49.5938,17.2509,77900,100],
  ["České Budějovice",48.9745,14.4743,37001,97],["Hradec Králové",50.2092,15.8328,50002,93],
  ["Ústí nad Labem",50.6607,14.0323,40001,92],["Pardubice",50.0343,15.7812,53002,92],
  ["Zlín",49.2265,17.6683,76001,74],["Havířov",49.7798,18.4369,73601,70],
  ["Kladno",50.1476,14.1028,27201,68],["Most",50.5030,13.6362,43401,64],
  ["Opava",49.9387,17.9026,74601,55],["Frýdek-Místek",49.6833,18.3505,73801,54],
  ["Karviná",49.8540,18.5418,73301,51],["Jihlava",49.3961,15.5912,58601,51],
  ["Teplice",50.6404,13.8245,41501,50],["Děčín",50.7821,14.2145,40501,48],
  ["Karlovy Vary",50.2306,12.8712,36001,48],["Chomutov",50.4604,13.4176,43001,48],
  ["Jablonec nad Nisou",50.7243,15.1711,46601,45],["Mladá Boleslav",50.4114,14.9031,29301,44],
  ["Prostějov",49.4720,17.1118,79601,43],["Přerov",49.4554,17.4509,75002,42],
  ["Česká Lípa",50.6855,14.5376,47001,36],["Třebíč",49.2149,15.8814,67401,35],
  ["Třinec",49.6778,18.6708,73961,34],["Tábor",49.4144,14.6578,39001,34],
  ["Znojmo",48.8555,16.0488,66902,33],["Příbram",49.6896,14.0100,26101,32],
  ["Orlová",49.8453,18.4306,73511,28],["Cheb",50.0796,12.3700,35002,32],
  ["Trutnov",50.5610,15.9128,54101,30],["Kolín",50.0280,15.2003,28002,31],
  ["Písek",49.3088,14.1475,39701,30],["Kroměříž",49.2979,17.3931,76701,28],
  ["Šumperk",49.9652,16.9709,78701,26],["Vsetín",49.3387,17.9962,75501,25],
  ["Valašské Meziříčí",49.4719,17.9711,75701,22],["Uherské Hradiště",49.0698,17.4597,68601,25],
  ["Hodonín",48.8489,17.1327,69501,24],["Břeclav",48.7587,16.8818,69002,24],
  ["Český Těšín",49.7461,18.6264,73701,24],["Litvínov",50.6050,13.6178,43601,23],
  ["Nový Jičín",49.5945,18.0103,74101,23],["Chrudim",49.9511,15.7955,53701,23],
  ["Havlíčkův Brod",49.6078,15.5800,58001,23],["Krnov",50.0894,17.7044,79401,23],
  ["Bohumín",49.9039,18.3561,73581,21],["Strakonice",49.2610,13.9024,38601,21],
  ["Kopřivnice",49.5994,18.1447,74221,21],["Jindřichův Hradec",49.1444,15.0028,37701,21],
  ["Vyškov",49.2772,16.9992,68201,21],["Svitavy",49.7558,16.4683,56802,17],
  ["Klatovy",49.3955,13.2951,33901,22],["Žďár nad Sázavou",49.5631,15.9394,59101,21],
  ["Náchod",50.4146,16.1656,54701,19],["Kutná Hora",49.9484,15.2682,28401,21],
  ["Blansko",49.3636,16.6442,67801,20],["Pelhřimov",49.4310,15.2232,39301,16],
  ["Bruntál",49.9883,17.4647,79201,16],["Litoměřice",50.5341,14.1316,41201,23],
  ["Jirkov",50.4994,13.4472,43111,19],["Kadaň",50.3819,13.2714,43201,18],
  ["Louny",50.3550,13.7968,44001,18],["Žatec",50.3270,13.5456,43801,19],
  ["Beroun",49.9637,14.0720,26601,20],["Mělník",50.3509,14.4740,27601,19],
  ["Nymburk",50.1860,15.0410,28802,15],["Poděbrady",50.1425,15.1181,29001,14],
  ["Slaný",50.2306,14.0869,27401,16],["Rakovník",50.1038,13.7337,26901,16],
  ["Benešov",49.7816,14.6870,25601,17],["Říčany",49.9919,14.6539,25101,16],
  ["Brandýs nad Labem",50.1856,14.6619,25001,19],["Kralupy nad Vltavou",50.2411,14.3117,27801,18],
  ["Neratovice",50.2592,14.5169,27711,16],["Čelákovice",50.1631,14.7497,25088,12],
  ["Hořovice",49.8367,13.9036,26801,7],["Rokycany",49.7424,13.5951,33701,14],
  ["Sokolov",50.1811,12.6400,35601,22],["Mariánské Lázně",49.9646,12.7012,35301,13],
  ["Tachov",49.7956,12.6322,34701,13],["Domažlice",49.4408,12.9298,34401,11],
  ["Český Krumlov",48.8109,14.3151,38101,13],["Prachatice",49.0128,14.0050,38301,11],
  ["Milevsko",49.4517,14.3600,39901,8],["Sedlčany",49.6594,14.4269,26401,7],
  ["Dobříš",49.7817,14.1700,26301,9],["Soběslav",49.2603,14.7181,39201,7],
  ["Dačice",49.0808,15.4367,38001,7],["Telč",49.1844,15.4531,58856,5],
  ["Humpolec",49.5411,15.3589,39601,11],["Ledeč nad Sázavou",49.6922,15.2783,58401,5],
  ["Čáslav",49.9108,15.3908,28601,10],["Vlašim",49.7072,14.9003,25801,12],
  ["Semily",50.6033,15.3317,51301,8],["Turnov",50.5872,15.1575,51101,14],
  ["Jičín",50.4373,15.3516,50601,16],["Vrchlabí",50.6264,15.6089,54301,12],
  ["Jilemnice",50.6103,15.5064,51401,5],["Nová Paka",50.4933,15.5156,50901,9],
  ["Rychnov nad Kněžnou",50.1659,16.2756,51601,11],["Dobruška",50.2919,16.1606,51801,7],
  ["Nové Město nad Metují",50.3444,16.1522,54901,9],["Jaroměř",50.3556,15.9214,55101,12],
  ["Broumov",50.5856,16.3317,55001,7],["Vysoké Mýto",49.9527,16.1613,56601,12],
  ["Litomyšl",49.8722,16.3108,57001,10],["Česká Třebová",49.9014,16.4453,56002,15],
  ["Ústí nad Orlicí",49.9735,16.3938,56201,14],["Polička",49.7147,16.2653,57201,8],
  ["Moravská Třebová",49.7578,16.6642,57101,9],["Boskovice",49.4878,16.6594,68001,12],
  ["Bystřice nad Pernštejnem",49.5231,16.2611,59301,8],["Nové Město na Moravě",49.5614,16.0744,59231,10],
  ["Velké Meziříčí",49.3550,16.0119,59401,11],["Moravské Budějovice",49.0531,15.8094,67602,7],
  ["Tišnov",49.3489,16.4253,66601,9],["Kuřim",49.2978,16.5317,66434,11],
  ["Rosice",49.1819,16.3906,66501,6],["Ivančice",49.1017,16.3772,66491,10],
  ["Moravský Krumlov",49.0472,16.3100,67201,6],["Pohořelice",48.9733,16.5272,69123,5],
  ["Slavkov u Brna",49.1533,16.8761,68401,7],["Bučovice",49.1489,17.0003,68501,6],
  ["Mikulov",48.8056,16.6378,69201,7],["Valtice",48.7406,16.7558,69142,4],
  ["Lednice",48.8000,16.8033,69144,2],["Velké Pavlovice",48.9017,16.8172,69106,3],
  ["Lanžhot",48.7239,16.9661,69151,4],["Kyjov",49.0100,17.1222,69701,11],
  ["Veselí nad Moravou",48.9533,17.3769,69801,11],["Strážnice",48.9023,17.3171,69662,6],
  ["Bzenec",48.9722,17.2683,69681,4],["Dubňany",48.9200,17.0933,69603,6],
  ["Hustopeče",48.9400,16.7375,69301,6],["Litovel",49.7014,17.0758,78401,10],
  ["Šternberk",49.7347,17.2978,78501,13],["Uničov",49.7719,17.1211,78391,11],
  ["Zábřeh",49.8819,16.8714,78901,13],["Mohelnice",49.7778,16.9189,78985,9],
  ["Jeseník",50.2294,17.2043,79001,11],["Hranice",49.5486,17.7347,75301,18],
  ["Lipník nad Bečvou",49.5272,17.5861,75131,8],["Kojetín",49.3511,17.3011,75201,6],
  ["Holešov",49.3339,17.5783,76901,11],["Bystřice pod Hostýnem",49.3994,17.6744,76861,8],
  ["Otrokovice",49.2094,17.5375,76502,18],["Luhačovice",49.0989,17.7556,76326,5],
  ["Uherský Brod",49.0253,17.6472,68801,16],["Rožnov pod Radhoštěm",49.4583,18.1414,75661,16],
  ["Nový Hrozenkov",49.3353,18.2394,75604,2],["Karolinka",49.3550,18.2450,75605,2],
  ["Frenštát pod Radhoštěm",49.5478,18.2131,74401,10],["Kravaře",49.9297,18.0003,74721,7],
  ["Hlučín",49.8972,18.1922,74801,13],["Vítkov",49.7753,17.7514,74901,6],
  ["Rýmařov",49.9325,17.2706,79501,8],["Město Albrechtice",50.1611,17.5736,79395,3],
  ["Osoblaha",50.2819,17.7128,79399,1],["Třeboň",48.9986,14.7703,37901,8],
  ["Veselí nad Lužnicí",49.1861,14.6986,39181,6],["Bechyně",49.2947,14.4686,39165,5],
  ["Vimperk",49.0531,13.7797,38501,7],["Kašperské Hory",49.1456,13.5556,34192,1],
  ["Sušice",49.2314,13.5203,34201,10],["Horažďovice",49.3208,13.7003,34101,5],
  ["Blatná",49.4253,13.8814,38801,6],["Nepomuk",49.4858,13.5789,33501,3],
  ["Nýrsko",49.2944,13.1414,34022,4],["Horšovský Týn",49.5297,12.9433,34601,5],
  ["Stříbro",49.7531,13.0033,34901,7],["Bezdružice",49.9078,12.9683,34953,1],
  ["Toužim",50.0592,12.9867,36401,3],["Žlutice",50.0917,13.1617,36452,2],
  ["Bochov",50.1497,13.0450,36471,2],["Nejdek",50.3219,12.7289,36221,7],
  ["Kraslice",50.3283,12.5172,35801,6],["Šindelová",50.2733,12.6300,35801,0],
  ["Ostrov",50.3058,12.9403,36301,16],["Chodov",50.2403,12.7472,35735,13],
  ["Klášterec nad Ohří",50.3864,13.1706,43151,14],["Bílina",50.5486,13.7764,41801,15],
  ["Roudnice nad Labem",50.4244,14.2606,41301,6],["Lovosice",50.5147,14.0506,41002,9],
  ["Doksany",50.4578,14.1689,41182,0],["Varnsdorf",50.9114,14.6183,40747,15],
  ["Rumburk",50.9519,14.5572,40801,11],["Krásná Lípa",50.9108,14.5097,40746,3],
  ["Nový Bor",50.7589,14.5581,47301,12],["Mimoň",50.6586,14.7253,47124,6],
  ["Doksy",50.5636,14.6531,47201,5],["Frýdlant",50.9214,15.0808,46401,7],
  ["Chrastava",50.8167,14.9667,46331,6],["Tanvald",50.7389,15.3056,46841,6],
  ["Železný Brod",50.6433,15.2522,46822,6],["Pec pod Sněžkou",50.6939,15.7333,54221,1],
  ["Špindlerův Mlýn",50.7261,15.6078,54351,1],["Hlásná Třebaň",49.9203,14.2011,26718,1],
  ["Hřensko",50.8744,14.2369,40717,0],["Kvasiny",50.1450,16.2831,51719,1],
  ["Opatovice nad Labem",50.1472,15.7828,53345,2],["Chlumec nad Cidlinou",50.1544,15.4614,50351,5],
  ["Týnec nad Labem",50.0372,15.3650,28126,2],["Krásná Hora nad Vltavou",49.6089,14.2794,26256,1],
  ["Kamýk nad Vltavou",49.6319,14.2461,26263,1],["Petrovice",49.5800,14.4700,26255,1],
  ["Vranov nad Dyjí",48.8933,15.8117,67103,1],["Vohančice",49.3300,16.3900,66601,0],
  ["Herálec",49.6350,15.9700,59201,1],["Tučapy",49.2900,14.8100,39226,1],
  ["Sedmihorky",50.5519,15.1797,51101,0],["Obříství",50.2822,14.4708,27742,1],
  ["Litvínov-Janov",50.6150,13.6300,43603,0],["Dukovany",49.0850,16.1500,67550,1],
  ["Temelín",49.1800,14.3761,37301,1],["Štěchovice",49.8464,14.4017,25207,2],
  ["Vrané nad Vltavou",49.9269,14.3764,25246,2],["Řež",50.1686,14.3597,25068,0],
  ["Slapy",49.7300,14.4100,26263,0],["Zvíkovské Podhradí",49.4397,14.1908,39701,0],
  ["Sopřeč",50.1200,15.5200,53316,0],["Grymov",49.4600,17.4500,75101,0],
  ["Lysá hora",49.5464,18.4478,0,0],["Praděd",50.0831,17.2306,0,0],
  ["Sněžka",50.7358,15.7400,0,0],["Churáňov",49.0686,13.6153,0,0]
];

/* Záložní přiřazení podle prvního dvojčíslí PSČ – vede na střed oblasti,
   kterou dvojčíslí pokrývá. Přesnější je hledat podle názvu obce.          */
SM.pscPrefix = {
  "10":[50.08,14.44],"11":[50.08,14.42],"12":[50.07,14.42],"13":[50.08,14.46],
  "14":[50.04,14.44],"15":[50.05,14.37],"16":[50.09,14.35],"17":[50.11,14.45],
  "18":[50.11,14.47],"19":[50.09,14.52],"20":[50.11,14.56],
  "25":[49.99,14.47],"26":[49.78,14.10],"27":[50.20,14.20],"28":[49.99,15.27],
  "29":[50.30,14.98],"30":[49.74,13.37],"31":[49.74,13.37],"32":[49.72,13.35],
  "33":[49.78,13.45],"34":[49.42,13.10],"35":[50.12,12.55],"36":[50.21,12.88],
  "37":[48.97,14.47],"38":[49.15,14.10],"39":[49.38,14.60],"40":[50.66,14.03],
  "41":[50.49,14.00],"43":[50.46,13.45],"44":[50.34,13.68],"45":[50.56,13.80],
  "46":[50.76,15.06],"47":[50.68,14.54],"50":[50.19,15.75],"51":[50.52,15.30],
  "53":[50.03,15.78],"54":[50.52,15.86],"55":[50.38,16.10],"56":[49.94,16.30],
  "57":[49.75,16.42],"58":[49.60,15.52],"59":[49.48,16.00],"60":[49.20,16.61],
  "61":[49.21,16.59],"62":[49.17,16.58],"63":[49.21,16.56],"64":[49.23,16.58],
  "65":[49.19,16.62],"66":[49.25,16.45],"67":[48.95,15.95],"68":[49.20,17.10],
  "69":[48.85,16.95],"70":[49.83,18.27],"71":[49.80,18.25],"72":[49.82,18.20],
  "73":[49.75,18.45],"74":[49.80,17.95],"75":[49.45,17.60],"76":[49.22,17.63],
  "77":[49.59,17.25],"78":[49.80,16.95],"79":[50.05,17.45]
};

/* --------------------------------------------------------------------------
   10. PROGRAMY, DOTACE A PROJEKTY — stav k 16. 11. 2026
   kdo: "domacnost" | "obec" | "zemedelec" | "nno"
   -------------------------------------------------------------------------- */
SM.programy = [
  { id:"nzu-destovka", n:"Dešťovka: podoblast D.2 „Hospodaření s vodou“ v Nové zelené úsporám", kdo:["domacnost"],
    castka:"podle závazných pokynů pro rodinné domy platných od 28. 5. 2026 formou zvýhodněného úvěru s kompenzací úroků: nejvýše 100 000 Kč na systém „dešťová voda + WC“ a 150 000 Kč na „šedou vodu“",
    popis:"Samostatný program Dešťovka skončil a podpora se přesunula do Nové zelené úsporám jako podoblast D.2. Pozor na podmínku, kterou většina textů o dotacích neuvádí: o opatření v oblasti D nelze žádat samostatně – podporují se pouze v kombinaci s oblastí A (zateplení) nebo C (zdroje energie). Minimální objem akumulační nádrže na dešťovou vodu je 2 m³. Podporu lze na stejnou nemovitost poskytnout jen jednou za dobu trvání programů NZÚ a nelze ji získat, pokud už byla vyplacena ve starém programu Dešťovka. Výše i forma podpory se ale liší mezi variantami programu (standardní NZÚ, NZÚ Light, Oprav dům po babičce) a v posledních letech se opakovaně měnily – starší přehledy uvádějící pevnou dotaci 50 000 nebo 105 000 Kč se k dnešním pravidlům pro rodinné domy nevztahují.",
    jak:"Rozhodují závazné pokyny pro tu variantu programu, o kterou žádáte, ne přehledy na komerčních webech. Najdete je na novazelenausporam.cz v sekci Dokumenty.",
    odkaz:"https://novazelenausporam.cz/" },
  { id:"opzp-105", n:"OPŽP – 105. výzva: zachytávání srážkových a šedých vod", kdo:["obec","nno"],
    castka:"alokace 200 mil. Kč; příjem žádostí 17. 6. – 17. 12. 2026",
    popis:"Zpomalení odtoku, vsak, retence a akumulace srážkové vody včetně dalšího využití – pro obce, školy, veřejné instituce a správce budov. Právě tato výzva míří na to, čemu se v dělení vody na tři barvy říká šedá voda ve městě: dešťovou a přečištěnou vodu, která dnes z obcí odtéká kanalizací.",
    jak:"Detaily a dokumenty na opzp.cz/dotace/105-vyzva/.", odkaz:"https://opzp.cz/nabidka-dotaci/" },
  { id:"opzp-109", n:"OPŽP – 109. výzva: protipovodňová opatření a retence krajiny", kdo:["obec","nno"],
    castka:"alokace 2,6 mld. Kč; příjem žádostí 16. 7. – 17. 12. 2026",
    popis:"Ochrana před povodněmi a posílení přirozené retenční schopnosti krajiny s důrazem na přírodě blízká opatření – poldry, povodňové parky, návrat vody do niv. Pokrývá i to, co je po suchu nejpotřebnější: zpomalení a prodloužení cesty vodní kapky.",
    jak:"Detaily na opzp.cz/dotace/109-vyzva/.", odkaz:"https://opzp.cz/nabidka-dotaci/" },
  { id:"opzp-tune", n:"OPŽP – přírodě blízká opatření: tůně, mokřady, remízky, stromořadí", kdo:["obec","nno","zemedelec"],
    castka:"330 mil. Kč ve výzvách 73 a 104 (2026), u části opatření až 100 % způsobilých výdajů",
    popis:"Soustavy tůní různé velikosti a hloubky, výsadby původních dřevin, trav a bylin, drobné terénní úpravy, revitalizace toků, obnova rybníků a odstraňování starých odvodňovacích systémů. Jen z OPŽP bylo na tato opatření za posledních pět let investováno 8,6 mld. Kč. Výzva 73 míří na méně rozvinuté regiony (Ústecký, Karlovarský, Pardubický, Liberecký, Královéhradecký, Moravskoslezský, Olomoucký a Zlínský kraj), výzva 104 na přechodové regiony.",
    jak:"Přehled aktuálních výzev na opzp.cz a sfzp.gov.cz.", odkaz:"https://opzp.cz/nabidka-dotaci/" },
  { id:"mze-propojovani", n:"Propojování vodárenských soustav (MZe)", kdo:["obec"],
    castka:"5 mld. Kč od roku 2020; MZe uvádí 144 mld. Kč na boj se suchem za 8 let",
    popis:"Nejúčinnější pojistka pro malou obec na vlastním vrtu není hlubší vrt, ale napojení na velkou soustavu. Odborníci VÚV TGM varují, že prohlubování soukromých vrtů si navzájem strhává hladinu a problém nevyřeší. Ministerstvo zemědělství zároveň v listopadu 2026 navrhlo skokové zvýšení poplatků za odběr podzemní vody (nezměněných 20 let) a z výnosů chce financovat právě propojování soustav, čistírny a nové zdroje; Středočeský kraj i zemědělci s návrhem nesouhlasí.",
    jak:"Jde o krajské a státní projekty – obec se ptá u svého vodohospodáře a kraje.", odkaz:"https://mze.gov.cz/" },
  { id:"chmu-1000", n:"≈ 1 000 nejohroženějších katastrálních území (ČHMÚ / MŽP)", kdo:["obec"],
    castka:"500 mil. Kč ze SFŽP na zadržení vody v těchto územích",
    popis:"ČHMÚ v srpnu 2026 vybral asi tisíc katastrálních území podle dvou podmínek: rychlý povrchový odtok a sklon terénu spolu s indexem aridity, a zároveň kritické body, odkud při přívalu voda odteče z polí. Podle ministra zemědělství je přes 90 % obyvatel v těchto obcích odkázáno na místní studny a vrty. Zařazení na seznam neznamená, že je v obci voda omezována – jde o nástroj k cílení prevence.",
    jak:"Mapa je na webu ČHMÚ rozdělená po krajích.", odkaz:"https://www.chmi.cz/" },
  { id:"eagri-30ha", n:"Max. 30 ha jedné plodiny na erozně ohrožené půdě", kdo:["zemedelec"],
    castka:"podmínka platná od roku 2020 (bez dotace – je to pravidlo)",
    popis:"Menší lány, menší splach, lepší vsak. Doplňkem jsou zatravněné údolnice, vrstevnicové hospodaření, remízky a meze. Měření v různých terénech ukazují, že travní pásy snižují rychlost odtoku a zvětšují zasakování o 10–60 %, průměrně asi o třetinu.",
    jak:"Podmínky v podmínkách DZES a dotačních pravidlech na eagri.cz.", odkaz:"https://eagri.cz/" },
  { id:"mze-drenaze", n:"Přestavba meliorací na regulační systémy (MZe, plán do 2030)", kdo:["zemedelec","obec"],
    castka:"plán ministerstva zemědělství, financování z OPŽP a Programu rozvoje venkova",
    popis:"V Česku je melioracemi odvodněno asi 1,2 mil. ha zemědělské půdy, z toho asi 0,5 mil. ha už před rokem 1945. Cílem je přestavět drenáže na systémy, které v suchu vodu v půdě zadrží. Brání tomu roztříštěné vlastnictví: drenážní trubky v polích patří vlastníkům pozemků, hlavní kanály státu.",
    jak:"Zjistěte u pozemkového úřadu, zda na vašem pozemku meliorace jsou – často o nich vlastníci nevědí.", odkaz:"https://mze.gov.cz/" },
  { id:"pozemkove-upravy", n:"Komplexní pozemkové úpravy (SPÚ)", kdo:["obec","zemedelec"],
    castka:"hradí stát; zpravidla desítky mil. Kč na katastr",
    popis:"Nejsilnější nástroj, jak v jedné obci naráz vytvořit cesty, meze, remízky, zasakovací průlehy, tůně a protierozní prvky – a vyřešit u toho vlastnictví. Bez pozemkových úprav se většina opatření v zemědělské krajině nedá realizovat.",
    jak:"O zahájení žádá obec nebo vlastníci (nadpoloviční podíl výměry) u Státního pozemkového úřadu.", odkaz:"https://spucr.gov.cz/" },
  { id:"csop", n:"Místo pro přírodu a komunitní obnova (ČSOP a další NNO)", kdo:["nno","domacnost"],
    castka:"veřejné sbírky a dary; výkupy pozemků",
    popis:"Nestátní cesta: výkupy pozemků pro obnovu mokřadů a niv, péče o tůně a prameniště, výsadby a komunitní zahrady. Ukázkou, že obnova funguje, jsou revitalizované Sedmihorské mokřady v Českém ráji. Příklady z obcí: Vohančice s krajinnými opatřeními za ≈ 80 mil. Kč nebo Herálec, kde se Svratka vrátila do meandrů a je téměř o kilometr delší.",
    jak:"Zapojit se lze darem, dobrovolnickou prací i nabídkou vlastního pozemku.", odkaz:"https://www.csop.cz/" }
];

/* --------------------------------------------------------------------------
   11. PŘIPRAVENOST DOMÁCNOSTI — akce pro diagnostický panel
   Vychází ze sekce Připravenost na hlavní stránce Vize 2075 (příručka
   72 hodin MV ČR a HZS ČR, knihy V. Cílka Ruka noci podaná a Nové ostrovy)
   a doplňuje ji o nakládání s vodou podle aktuálních zdrojů.
   urgence: 1 = užitečné vždy … 3 = ve vaší lokalitě naléhavé
   -------------------------------------------------------------------------- */
SM.pripravenost = {
  voda:[
    ["Zásoba balené vody na tři dny","Nouzově 2 l na osobu a den, ideálně 3–4 l (pití, vaření, hygiena). Pro srovnání: běžná spotřeba domácností je 89,7 l na osobu a den, nouzový příděl od 3. dne krize 10–15 l a první dva dny 5 l.",1],
    ["Uzavíratelné kanystry na odběr z cisterny","Při rozsáhlém výpadku nelze na cisterny spoléhat – ani Správa státních hmotných rezerv jich nemá dost. Nádoby na odběr jsou proto základ.",2],
    ["Filtrace a dezinfekce vody","Gravitační nebo ruční filtr, chemické přípravky podle návodu, nebo převaření. Po obnovení dodávky po výpadku nepijte vodu z kohoutku, dokud to vodárna nepovolí.",2],
    ["Vědět, odkud vaše obec bere vodu","Zjistěte, zda jste na velké soustavě, nebo na místním vrtu, a kde jsou ve okolí studny a prameny. Voda z pramene je pro úpravu lepší než voda z rybníka.",2],
    ["U vlastní studny sledovat hladinu","Zapisujte si hladinu jednou měsíčně – dva roky měření vám řeknou víc než jakákoli mapa. Po opětovném napuštění vyschlé studny nechte vodu laboratorně ověřit, splachují se do ní nečistoty.",3],
    ["Plán náhradního zdroje","Komu zavolat, odkud dovezete vodu, kdo z rodiny nebo sousedů má funkční zdroj. Dohodnuté předem, ne až v srpnu.",2]
  ],
  zahrada:[
    ["Odpojit okap do nádrže","Sud, zahradní nebo akumulační nádrž s využitím na splachování. Odlehčí kanalizaci při přívalu a dotuje podzemní vodu. Na nádrž lze dnes žádat jen v rámci širší renovace domu – viz program Dešťovka v NZÚ.",1],
    ["Tři zásady zadržení vody","Zadržte vodu tam, kam spadla; prodlužte její cestu; zpomalte ji příčnými překážkami, aby se rozlila do velké vsakovací plochy. Začněte nahoře na pozemku a v malém.",1],
    ["Půda jako banka na vodu","Kompost, mulč a trvalý porost. Zdravá půda o mocnosti 1 m na ploše 1 km² zadrží v průměru 200 000 m³ vody; většina půd pojme 120–240 l/m³, optimální až 360 l/m³.",1],
    ["Méně dlažby, víc vsaku","Propustná dlažba, štěrk nebo zatravňovací tvárnice místo betonu. Povrch sluncem otevřené půdy se v Česku v létě běžně zahřeje na 50–52 °C.",2],
    ["Nesekat nakrátko","Vyšší tráva má povrch až o 10 °C chladnější než holá zem. Výsušné praskliny u nás běžně dosahují hloubky 30–40 cm a odvádějí vodu i z hloubky, ne jen z povrchu.",2],
    ["Zalévat ke kořenům, ráno nebo večer","A zalévat stromy před domem. Strom s dostatkem vody ochlazuje okolí o 6–12 °C; bez vody tuto funkci ztrácí a sám odumírá.",2],
    ["Podzimní výsadba","Rostliny vysazené na podzim si vybudují větší kořenový systém, lépe snášejí sucho a za vlny veder lépe uchladí nadzemní část.",1]
  ],
  horko:[
    ["Větrat v noci, stínit ve dne","Až 40 % tepla přichází okny; dobře nastavené venkovní žaluzie snižují tepelnou zátěž jižní strany až o 70 %.",2],
    ["Chlazení výparem","Ráno, dokud se beton neprohřeje, polijte vodou plochu před vchodem nebo balkon. Betonová dlažba vodu nasaje a pak chladí.",2],
    ["Režim dne a pitný režim","Aktivity na ráno a večer, v poledne se vyhýbat rozpáleným plochám, průběžně pít a doplňovat minerály. Volné světlé oblečení zakrývající tělo chrání nad 36 °C lépe než tričko a šortky.",2],
    ["Sousedská kontrola","Při vlně veder se ozvěte starším sousedům a příbuzným, kteří žijí sami. Vedra zabíjejí tiše: v Česku si vlny veder v létě 2026 vyžádaly ve sledovaných městech 701 nadměrných úmrtí a většina obětí v Evropě byla starší 65 let.",3],
    ["Zkontrolovat, zda má obec plán pro vlny veder","Z krajských měst ho má jen Praha. Je to věc, na kterou se dá na zastupitelstvu zeptat.",2]
  ],
  dum:[
    ["Rodinný krizový plán a bedna","Pravidlo 72 hodin: první tři dny bez pomoci záchranných složek. Bedna s potřebnými věcmi a nad ní pověšený evakuační plán – v krizi člověk na něco zapomene skoro vždy.",1],
    ["Pozor na praskliny ve zdivu","Vysychající jílovitá podloží sedají a způsobují statické trhliny. Drobné praskliny se objevují na mnoha místech v Polabí; banky a pojišťovny už klimatické riziko u nemovitostí hodnotí.",2],
    ["Šedá voda","Opětovné využití vody z koupelny na splachování sníží spotřebu pitné vody nejvíc ze všech opatření v domě. Podporováno v OPŽP i v NZÚ.",2],
    ["Mikroklima kolem domu","Listnatý strom na jižní straně v létě stíní a v zimě propouští světlo. Pergola, popínavá zeleň a světlá krytina sníží teplotu i náklady na chlazení.",1]
  ]
};

/* --- Plošné charakteristiky krajů pro výpočet srážkového schodku ---
   plocha: rozloha kraje v km² (ČSÚ, krajské srovnání)
   T, P:   plošný průměr roční teploty a úhrnu srážek uvnitř hranic kraje,
           spočítaný z pole 109 klimatických stanic (SM.stations) vzorkováním
           po ~0,9 km. Kontrola: součet vzorkovaných ploch dává 78 791 km²
           proti 78 868 km² podle ČSÚ, tedy odchylka 0,1 %.
   elev:   průměrná nadmořská výška vzorku v m. */
SM.krajPlocha = {
  PHA:496, STC:11016, JHC:10057, PLK:7561, KVK:3314, ULK:5335, LBK:3163, HKK:4759, PAK:4519, VYS:6796, JHM:7195, OLK:5267, ZLK:3963, MSK:5427
};
SM.krajKlima = {
  PHA:{ T:10.70, P:520, elev:240 },
  STC:{ T:9.46, P:565, elev:311 },
  JHC:{ T:8.34, P:669, elev:521 },
  PLK:{ T:8.43, P:633, elev:516 },
  KVK:{ T:7.66, P:675, elev:603 },
  ULK:{ T:8.98, P:583, elev:355 },
  LBK:{ T:7.93, P:868, elev:472 },
  HKK:{ T:8.34, P:761, elev:424 },
  PAK:{ T:8.53, P:669, elev:416 },
  VYS:{ T:8.32, P:633, elev:476 },
  JHM:{ T:9.85, P:532, elev:268 },
  OLK:{ T:8.10, P:732, elev:488 },
  ZLK:{ T:9.33, P:699, elev:263 },
  MSK:{ T:7.81, P:814, elev:511 }
};
/* Roční spotřeba pitné vody na osobu v domácnosti: 88 l/os/den (ČSÚ, data za rok
   2025) → 32,1 m³ za rok. Slouží jen k převodu objemů na představitelné měřítko. */
SM.vodaOsoba = 32.1;
/* Plošný průměr ročního úhrnu srážek ČR podle pole stanic (pro poznámku o přesnosti).
   Normál ČHMÚ 1991–2020 je asi 686 mm, pole je tedy o ~4 % níž. */
SM.srazkyCR = 658;

SM.geoKraje={"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":"PHA","name":"PHA","c":[50.0664,14.4662]},"geometry":{"type":"MultiPolygon","coordinates":[[[[14.60428,50.1284],[14.65909,50.12272],[14.65773,50.10656],[14.7051,50.08996],[14.69969,50.07205],[14.64014,50.05677],[14.6442,50.04235],[14.65367,50.04934],[14.66653,50.03842],[14.65706,50.03799],[14.66924,50.01877],[14.66179,50.00741],[14.63811,50.00567],[14.64691,49.99868],[14.64014,49.99431],[14.61037,49.99868],[14.58262,50.01615],[14.56841,50.00741],[14.52713,50.01091],[14.52104,50.00785],[14.52984,50.00086],[14.48383,49.99256],[14.48721,49.98557],[14.46623,49.98121],[14.46217,49.97072],[14.41954,49.96374],[14.40059,49.97072],[14.39586,49.9419],[14.38774,49.94976],[14.34308,49.94758],[14.32548,49.95718],[14.34511,49.96767],[14.34646,49.97465],[14.32684,49.97203],[14.34308,49.99082],[14.31804,49.98907],[14.29503,50.00217],[14.30112,50.01178],[14.31127,50.00698],[14.31601,50.02357],[14.28691,50.02794],[14.26999,50.04017],[14.27135,50.05415],[14.24834,50.05851],[14.25781,50.07162],[14.28962,50.0773],[14.2612,50.0869],[14.24969,50.1035],[14.22466,50.10307],[14.28827,50.11617],[14.30248,50.13014],[14.31601,50.12883],[14.32075,50.11529],[14.36067,50.11617],[14.3539,50.13757],[14.36541,50.14805],[14.39518,50.1415],[14.42834,50.15766],[14.4642,50.15985],[14.46691,50.16945],[14.52713,50.17732],[14.53255,50.17732],[14.5339,50.16159],[14.55082,50.16596],[14.563,50.15024],[14.59886,50.15417],[14.58804,50.14543],[14.60428,50.1284]]]]}},{"type":"Feature","properties":{"id":"STC","name":"STC","c":[50.0009,14.5528]},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.53133,49.96155],[15.53065,49.94758],[15.51577,49.94102],[15.53539,49.92748],[15.51847,49.91132],[15.5205,49.90215],[15.4975,49.89778],[15.50494,49.87463],[15.49547,49.87027],[15.50088,49.8624],[15.49208,49.85018],[15.47449,49.85105],[15.46366,49.83838],[15.44675,49.84537],[15.41629,49.8279],[15.419,49.81567],[15.4393,49.80431],[15.42509,49.79252],[15.38246,49.79995],[15.36757,49.77549],[15.3466,49.76937],[15.33509,49.77549],[15.29923,49.7685],[15.26472,49.75103],[15.24983,49.75452],[15.25389,49.76326],[15.22479,49.75714],[15.22006,49.74797],[15.2275,49.74229],[15.21464,49.7388],[15.21735,49.7257],[15.18149,49.70997],[15.18013,49.67634],[15.2072,49.6628],[15.23494,49.66542],[15.24983,49.63048],[15.22209,49.61257],[15.20111,49.61083],[15.18893,49.62],[15.18081,49.60995],[15.17066,49.61388],[15.16457,49.58899],[15.14697,49.60209],[15.11179,49.60471],[15.1172,49.61039],[15.05562,49.59423],[14.98186,49.60602],[14.96901,49.59598],[14.99337,49.582],[14.93991,49.57981],[14.93585,49.56715],[14.94668,49.55667],[14.90878,49.54313],[14.89119,49.55317],[14.88307,49.57545],[14.87563,49.57239],[14.87021,49.58462],[14.87766,49.5868],[14.85532,49.58768],[14.84517,49.57632],[14.81405,49.60209],[14.77954,49.60471],[14.76668,49.62131],[14.7633,49.60995],[14.74164,49.6034],[14.74638,49.59554],[14.72405,49.59248],[14.7342,49.5868],[14.71931,49.56933],[14.73826,49.54924],[14.6936,49.54444],[14.65097,49.51954],[14.65638,49.5143],[14.64826,49.50294],[14.63134,49.5191],[14.57382,49.52172],[14.59074,49.53395],[14.58939,49.544],[14.56097,49.5309],[14.47706,49.54618],[14.46691,49.53133],[14.4439,49.54094],[14.44323,49.5488],[14.42766,49.54225],[14.40601,49.55798],[14.40465,49.54007],[14.41345,49.53701],[14.38706,49.54313],[14.35458,49.52391],[14.34308,49.53264],[14.32481,49.52784],[14.33428,49.5392],[14.30654,49.55055],[14.29977,49.544],[14.28894,49.55099],[14.29233,49.55929],[14.26593,49.56802],[14.22669,49.56191],[14.20842,49.53177],[14.1218,49.53701],[14.12518,49.52784],[14.10759,49.52959],[14.10691,49.53701],[14.1015,49.52828],[14.07443,49.52959],[14.06428,49.54138],[14.06631,49.55536],[14.07646,49.55623],[14.03925,49.56016],[14.02436,49.5488],[14.00947,49.55142],[14.01489,49.53963],[13.99865,49.53133],[14.00541,49.5226],[13.98579,49.52697],[13.97834,49.51168],[13.94789,49.51736],[13.93233,49.5012],[13.89105,49.50731],[13.9012,49.51386],[13.88158,49.51299],[13.88158,49.5226],[13.86466,49.52566],[13.84165,49.51081],[13.82135,49.5274],[13.8085,49.51561],[13.76993,49.51081],[13.76451,49.51823],[13.77263,49.5357],[13.76248,49.53745],[13.76519,49.54618],[13.74624,49.5523],[13.73677,49.54487],[13.74557,49.55885],[13.73812,49.56147],[13.7388,49.58637],[13.75166,49.59598],[13.75369,49.61519],[13.74083,49.62218],[13.77331,49.63791],[13.76316,49.64795],[13.76722,49.66062],[13.80647,49.69294],[13.82406,49.68639],[13.8403,49.696],[13.81323,49.76064],[13.78143,49.75976],[13.7997,49.7816],[13.78887,49.80169],[13.80917,49.81261],[13.79699,49.82965],[13.80647,49.83664],[13.79767,49.8445],[13.81323,49.85367],[13.8085,49.86808],[13.83421,49.86765],[13.81865,49.9087],[13.82,49.92312],[13.83286,49.92792],[13.8085,49.92705],[13.78278,49.94146],[13.74286,49.94059],[13.75098,49.94495],[13.74827,49.96592],[13.69887,49.96199],[13.6982,49.97334],[13.67925,49.97771],[13.65624,50.00173],[13.56895,49.99431],[13.55339,50.00916],[13.50128,50.02226],[13.50805,50.031],[13.53715,50.02881],[13.53715,50.03187],[13.52294,50.03318],[13.52023,50.04061],[13.48707,50.03231],[13.47083,50.04279],[13.44512,50.04148],[13.43429,50.0275],[13.3964,50.03668],[13.41399,50.06245],[13.43023,50.0607],[13.4255,50.07642],[13.40722,50.08166],[13.40452,50.09782],[13.42956,50.10962],[13.46271,50.10569],[13.47016,50.13233],[13.49249,50.12796],[13.47895,50.14325],[13.49452,50.14718],[13.48843,50.16596],[13.51279,50.16858],[13.53579,50.18911],[13.60752,50.19173],[13.62241,50.20265],[13.61564,50.21095],[13.63188,50.20833],[13.66978,50.23846],[13.67181,50.2223],[13.75166,50.22361],[13.75978,50.24065],[13.76857,50.23235],[13.81256,50.26336],[13.82677,50.26074],[13.83962,50.24021],[13.86331,50.2437],[13.86466,50.25943],[13.87752,50.27035],[13.94045,50.27996],[13.95737,50.29219],[13.95263,50.30704],[13.9912,50.30354],[13.98173,50.33368],[14.00744,50.34635],[14.14346,50.33062],[14.18135,50.33455],[14.18338,50.34504],[14.25037,50.32844],[14.27473,50.35464],[14.36744,50.35202],[14.36744,50.37736],[14.37759,50.37605],[14.37962,50.39526],[14.36338,50.40618],[14.37759,50.41055],[14.35999,50.42977],[14.37826,50.43632],[14.41616,50.4206],[14.42225,50.42802],[14.41007,50.43108],[14.42631,50.43981],[14.4236,50.45335],[14.473,50.44942],[14.47029,50.47956],[14.45473,50.49659],[14.47368,50.49922],[14.46894,50.50926],[14.50074,50.49179],[14.51022,50.5097],[14.52375,50.51101],[14.53322,50.49747],[14.54743,50.49572],[14.54879,50.50446],[14.57856,50.51101],[14.58262,50.49834],[14.57518,50.4931],[14.59007,50.47388],[14.61037,50.4717],[14.6327,50.48699],[14.69224,50.48],[14.68818,50.49179],[14.71931,50.49834],[14.7254,50.51974],[14.75382,50.51887],[14.75044,50.55687],[14.8269,50.53852],[14.85938,50.55643],[14.8472,50.57216],[14.90878,50.58657],[14.89525,50.60186],[14.91758,50.60666],[14.90811,50.61758],[14.92367,50.61889],[14.9575,50.59356],[14.96765,50.59181],[14.97713,50.60622],[15.00419,50.60404],[15.01705,50.58701],[15.036,50.58045],[15.03938,50.5656],[15.06442,50.57085],[15.09555,50.55425],[15.09758,50.53459],[15.14697,50.52324],[15.11314,50.50533],[15.13412,50.48961],[15.12803,50.48],[15.14494,50.47519],[15.13479,50.47214],[15.12938,50.45073],[15.149,50.4468],[15.15171,50.42846],[15.16254,50.42715],[15.1551,50.40749],[15.13682,50.404],[15.14427,50.3874],[15.11788,50.38871],[15.10434,50.37605],[15.13141,50.36338],[15.12058,50.35945],[15.12938,50.34635],[15.18893,50.33979],[15.18081,50.32844],[15.19299,50.33193],[15.21803,50.31796],[15.20382,50.30878],[15.20652,50.29699],[15.23224,50.28695],[15.26404,50.29437],[15.30667,50.28127],[15.35133,50.30092],[15.35607,50.29044],[15.3784,50.28476],[15.37502,50.27035],[15.38449,50.25506],[15.3669,50.2472],[15.37096,50.22667],[15.39126,50.21794],[15.39735,50.19784],[15.37772,50.17251],[15.35607,50.16596],[15.37434,50.15591],[15.34863,50.14499],[15.38178,50.14543],[15.40344,50.13495],[15.41562,50.14063],[15.4481,50.12447],[15.43253,50.11093],[15.43727,50.10175],[15.41426,50.10787],[15.39938,50.09564],[15.4278,50.08821],[15.40411,50.08603],[15.41291,50.06288],[15.37502,50.05589],[15.40276,50.04672],[15.36284,50.04104],[15.39396,50.02052],[15.43118,50.01658],[15.42441,50.0096],[15.46028,50.01003],[15.4596,49.99737],[15.46908,50.00698],[15.47381,49.99431],[15.46096,49.98732],[15.53133,49.96155]],[[14.64014,50.05677],[14.69969,50.07205],[14.7051,50.09084],[14.65773,50.10656],[14.65909,50.12272],[14.60089,50.12927],[14.58804,50.14543],[14.59886,50.15417],[14.563,50.15024],[14.55082,50.16596],[14.5339,50.16159],[14.53255,50.17732],[14.46691,50.16945],[14.4642,50.15985],[14.42834,50.15766],[14.39518,50.1415],[14.36541,50.14805],[14.3539,50.13757],[14.36067,50.11617],[14.32075,50.11529],[14.31601,50.12883],[14.30248,50.13014],[14.28827,50.11617],[14.22466,50.10307],[14.24969,50.1035],[14.2612,50.0869],[14.28962,50.0773],[14.25781,50.07162],[14.24834,50.05851],[14.27135,50.05415],[14.26999,50.04017],[14.28691,50.02794],[14.31601,50.02357],[14.31127,50.00698],[14.30112,50.01178],[14.29503,50.00217],[14.31804,49.98907],[14.34308,49.99082],[14.32684,49.97203],[14.34646,49.97465],[14.34511,49.96767],[14.32481,49.95849],[14.34308,49.94758],[14.38774,49.94976],[14.39586,49.9419],[14.40059,49.97072],[14.41954,49.96374],[14.46217,49.97072],[14.46623,49.98121],[14.48721,49.98557],[14.48383,49.99256],[14.52984,50.00086],[14.52104,50.00785],[14.52713,50.01091],[14.56841,50.00741],[14.58262,50.01615],[14.61037,49.99868],[14.64014,49.99431],[14.64691,49.99868],[14.63811,50.00567],[14.65773,50.00436],[14.66924,50.01877],[14.65638,50.031],[14.66653,50.03842],[14.65367,50.04934],[14.6442,50.04235],[14.64014,50.05677]]]]}},{"type":"Feature","properties":{"id":"JHC","name":"JHC","c":[49.0932,14.4324]},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.03532,49.2946],[15.06239,49.27233],[15.10434,49.26971],[15.10096,49.24918],[15.07525,49.25224],[15.09893,49.24088],[15.12397,49.24787],[15.13953,49.22123],[15.1666,49.21599],[15.19164,49.23651],[15.20585,49.22603],[15.25727,49.21773],[15.25321,49.20638],[15.26539,49.21468],[15.34118,49.21817],[15.35066,49.1924],[15.33712,49.16663],[15.42374,49.11771],[15.44133,49.133],[15.4684,49.11946],[15.50291,49.11902],[15.51577,49.13125],[15.53607,49.1247],[15.53674,49.13562],[15.55501,49.13125],[15.55231,49.12557],[15.56719,49.12907],[15.5699,49.1164],[15.5496,49.11466],[15.57464,49.10199],[15.5902,49.10461],[15.58208,49.09849],[15.60374,49.08889],[15.5902,49.08452],[15.59765,49.07666],[15.55298,49.07709],[15.55501,49.06093],[15.5408,49.06006],[15.54554,49.04259],[15.52456,49.03691],[15.53404,49.02555],[15.509,49.01726],[15.48735,48.99673],[15.49479,48.9893],[15.50832,48.99847],[15.52795,48.99498],[15.52321,48.9762],[15.58005,48.96572],[15.57328,48.95611],[15.58682,48.94694],[15.57937,48.93864],[15.56719,48.94213],[15.56922,48.93209],[15.5584,48.92946],[15.5699,48.92772],[15.5496,48.92379],[15.54216,48.90763],[15.51238,48.91461],[15.50223,48.93602],[15.4684,48.95174],[15.45622,48.94519],[15.42509,48.95174],[15.3669,48.98188],[15.306,48.97795],[15.27825,48.99454],[15.28163,48.97969],[15.26133,48.95349],[15.22412,48.96004],[15.19028,48.94344],[15.16051,48.94169],[15.1551,48.94606],[15.16998,48.96222],[15.15103,48.981],[15.15645,48.99323],[15.0651,48.99978],[15.05833,49.01551],[14.99607,49.01507],[14.9981,48.99192],[14.97645,48.97096],[14.9866,48.93602],[14.97916,48.92815],[14.99269,48.90413],[14.98389,48.87487],[14.97307,48.87487],[14.97307,48.85303],[14.98457,48.84255],[14.96833,48.83687],[14.95344,48.79494],[14.97983,48.77922],[14.97577,48.76873],[14.95547,48.75825],[14.88781,48.77004],[14.88104,48.78009],[14.80863,48.77878],[14.81134,48.76131],[14.80051,48.74733],[14.80796,48.73379],[14.72676,48.68706],[14.71254,48.64993],[14.72202,48.63858],[14.7139,48.61761],[14.72134,48.60232],[14.70172,48.58267],[14.66315,48.5818],[14.65367,48.60451],[14.62661,48.60451],[14.61037,48.62809],[14.56232,48.6032],[14.54676,48.61455],[14.50345,48.61717],[14.46962,48.64862],[14.4439,48.64338],[14.45608,48.62504],[14.43172,48.58922],[14.38638,48.59272],[14.39383,48.57874],[14.38841,48.57175],[14.35796,48.57481],[14.33293,48.55166],[14.32413,48.56433],[14.27135,48.58136],[14.2409,48.57786],[14.19421,48.59272],[14.12992,48.59796],[14.11571,48.58922],[14.09541,48.59228],[14.09676,48.5997],[14.06699,48.5949],[14.06902,48.60713],[14.04195,48.61281],[14.04804,48.62722],[14.02842,48.62635],[14.01083,48.63945],[14.02436,48.65255],[14.05346,48.65299],[14.05955,48.67395],[14.03383,48.67701],[14.00338,48.70846],[13.95601,48.71457],[13.87617,48.76655],[13.81323,48.77397],[13.80308,48.78096],[13.81526,48.79712],[13.7882,48.82464],[13.79293,48.83032],[13.76451,48.83469],[13.73812,48.88622],[13.67113,48.88011],[13.62241,48.93864],[13.63053,48.94781],[13.61023,48.93864],[13.59061,48.95305],[13.58587,48.9679],[13.55068,48.96746],[13.55068,48.97882],[13.53579,48.98581],[13.55677,49.03822],[13.57098,49.05089],[13.5879,49.04477],[13.60685,49.06443],[13.59399,49.08015],[13.59873,49.08889],[13.5791,49.10417],[13.59805,49.10854],[13.58925,49.12645],[13.60076,49.14173],[13.58858,49.14654],[13.60685,49.14698],[13.62985,49.13562],[13.65895,49.16052],[13.6894,49.16008],[13.69143,49.18716],[13.71985,49.19502],[13.68872,49.22822],[13.69887,49.2387],[13.71038,49.23651],[13.70564,49.24569],[13.72662,49.2435],[13.71985,49.25049],[13.73339,49.25704],[13.70767,49.25792],[13.6982,49.27888],[13.73068,49.28019],[13.73609,49.28893],[13.72527,49.29286],[13.72188,49.31033],[13.76993,49.32343],[13.76925,49.34178],[13.78549,49.35182],[13.77872,49.35575],[13.79158,49.36842],[13.77128,49.37584],[13.77534,49.38152],[13.75842,49.39899],[13.76316,49.42214],[13.7909,49.43481],[13.76384,49.45271],[13.76857,49.47455],[13.7591,49.4811],[13.76925,49.48285],[13.7476,49.48678],[13.7476,49.49552],[13.75842,49.49727],[13.7503,49.50687],[13.76248,49.5143],[13.78414,49.50906],[13.7909,49.5191],[13.8085,49.51561],[13.82068,49.5274],[13.82677,49.52435],[13.82744,49.51867],[13.83286,49.5191],[13.83556,49.51081],[13.86737,49.52566],[13.88158,49.5226],[13.88158,49.51299],[13.9012,49.51386],[13.89105,49.50731],[13.93233,49.5012],[13.94789,49.51736],[13.97834,49.51168],[13.98579,49.52697],[14.00541,49.5226],[13.99865,49.53133],[14.01489,49.53963],[14.00947,49.55142],[14.02436,49.5488],[14.03925,49.56016],[14.07646,49.55623],[14.06631,49.55536],[14.06428,49.54138],[14.07443,49.52959],[14.1015,49.52828],[14.10691,49.53701],[14.10759,49.52959],[14.12518,49.52784],[14.1218,49.53701],[14.20842,49.53177],[14.22669,49.56191],[14.26593,49.56802],[14.29233,49.55929],[14.28894,49.55099],[14.29977,49.544],[14.30654,49.55055],[14.33428,49.5392],[14.32481,49.52784],[14.33225,49.52697],[14.34308,49.53264],[14.35458,49.52391],[14.38706,49.54313],[14.41345,49.53701],[14.40465,49.54007],[14.40601,49.55798],[14.42766,49.54225],[14.44323,49.5488],[14.4439,49.54094],[14.46691,49.53133],[14.47706,49.54618],[14.56097,49.5309],[14.58939,49.544],[14.59074,49.53395],[14.57382,49.52172],[14.63134,49.5191],[14.64826,49.50294],[14.65638,49.5143],[14.65097,49.51954],[14.6936,49.54444],[14.73826,49.54924],[14.71931,49.56933],[14.7342,49.5868],[14.72405,49.59248],[14.74638,49.59554],[14.743,49.60558],[14.7633,49.60995],[14.76736,49.62087],[14.77954,49.60471],[14.81405,49.60209],[14.84517,49.57632],[14.85532,49.58768],[14.87766,49.5868],[14.87021,49.58462],[14.87563,49.57239],[14.88307,49.57545],[14.90202,49.54444],[14.93247,49.54924],[14.92908,49.54138],[14.94397,49.52435],[14.90202,49.51648],[14.92435,49.50382],[14.93382,49.48416],[14.91758,49.47455],[14.92976,49.468],[14.92773,49.45621],[14.91284,49.44354],[14.91217,49.43044],[14.89999,49.42782],[14.91623,49.4252],[14.88848,49.37584],[14.93314,49.35619],[14.93179,49.35182],[14.90405,49.33304],[14.9778,49.27757],[14.99134,49.27495],[15.03532,49.2946]]]]}},{"type":"Feature","properties":{"id":"PLK","name":"PLK","c":[49.5982,13.2279]},"geometry":{"type":"MultiPolygon","coordinates":[[[[12.581,49.90346],[12.59453,49.89298],[12.61145,49.89866],[12.61415,49.91001],[12.64934,49.91613],[12.6649,49.91089],[12.67032,49.89167],[12.68317,49.89167],[12.6737,49.90827],[12.71295,49.9122],[12.7028,49.92574],[12.72987,49.92312],[12.76505,49.93491],[12.7752,49.92748],[12.79212,49.94102],[12.83949,49.93447],[12.85302,49.92399],[12.8943,49.93447],[12.92813,49.92093],[12.92543,49.92661],[12.9667,49.94364],[12.95858,49.9502],[12.96941,49.95849],[12.95655,49.96767],[12.95994,49.97597],[13.00054,49.97771],[13.00122,49.9799],[12.99919,49.98339],[12.99986,49.98907],[13.01746,49.98645],[13.05332,50.0096],[13.06821,50.00916],[13.06956,50.01877],[13.08377,50.01833],[13.08039,50.02532],[13.09663,50.03493],[13.11963,50.0227],[13.16024,50.02576],[13.18054,50.01003],[13.18595,50.01746],[13.20557,49.99999],[13.23196,49.99606],[13.22926,50.01353],[13.24211,50.02576],[13.23061,50.04934],[13.28001,50.05196],[13.27595,50.06201],[13.29151,50.05939],[13.29896,50.07031],[13.27663,50.07642],[13.29084,50.09258],[13.28204,50.09913],[13.32467,50.1035],[13.32399,50.08734],[13.33347,50.08647],[13.3558,50.10438],[13.35512,50.09433],[13.37068,50.09084],[13.37136,50.0773],[13.40519,50.0904],[13.40993,50.07904],[13.42753,50.07424],[13.43023,50.0607],[13.41399,50.06245],[13.39978,50.03187],[13.43429,50.0275],[13.44512,50.04148],[13.47083,50.04279],[13.48707,50.03231],[13.52023,50.04061],[13.53715,50.02881],[13.50805,50.031],[13.50128,50.02226],[13.55339,50.00916],[13.56895,49.99431],[13.65624,50.00173],[13.67925,49.97771],[13.6982,49.97334],[13.69887,49.96199],[13.74827,49.96592],[13.75098,49.94495],[13.74286,49.94059],[13.78278,49.94146],[13.8085,49.92705],[13.83286,49.92792],[13.82,49.92312],[13.81865,49.9087],[13.83421,49.86765],[13.8085,49.86808],[13.81323,49.85367],[13.79767,49.8445],[13.80647,49.83664],[13.79699,49.82965],[13.80917,49.81261],[13.78887,49.80169],[13.7997,49.7816],[13.78143,49.75976],[13.81323,49.76064],[13.8403,49.696],[13.78684,49.68158],[13.79158,49.67459],[13.77602,49.67154],[13.76384,49.6545],[13.77331,49.63791],[13.74083,49.62218],[13.75369,49.61519],[13.75166,49.59598],[13.7388,49.58637],[13.73812,49.56147],[13.74557,49.55885],[13.73677,49.54487],[13.74827,49.5523],[13.77263,49.5357],[13.76587,49.51386],[13.7503,49.50687],[13.75842,49.49727],[13.7476,49.49552],[13.7476,49.48678],[13.76925,49.48285],[13.7591,49.4811],[13.76857,49.47455],[13.76384,49.45271],[13.7909,49.43481],[13.76316,49.42214],[13.75842,49.39899],[13.77534,49.38152],[13.77128,49.37584],[13.78481,49.37497],[13.7909,49.36361],[13.76925,49.34178],[13.76993,49.32343],[13.72188,49.31033],[13.72527,49.29286],[13.73609,49.28893],[13.73068,49.28019],[13.6982,49.27888],[13.70767,49.25792],[13.73339,49.25661],[13.71985,49.25049],[13.72662,49.2435],[13.70564,49.24569],[13.71038,49.23651],[13.69887,49.2387],[13.68872,49.22822],[13.71985,49.19502],[13.69143,49.18716],[13.69414,49.16925],[13.68466,49.16532],[13.69414,49.16357],[13.65895,49.16052],[13.62985,49.13562],[13.58858,49.14654],[13.60076,49.14173],[13.58925,49.12645],[13.59805,49.10854],[13.5791,49.10417],[13.59873,49.08889],[13.59399,49.08015],[13.60685,49.06443],[13.5879,49.04477],[13.57098,49.05089],[13.54324,49.01813],[13.54662,49.00546],[13.53579,48.98581],[13.55068,48.97882],[13.55068,48.96746],[13.50737,48.96921],[13.50805,48.94213],[13.49587,48.94169],[13.40249,48.98712],[13.40925,49.00328],[13.39166,49.04215],[13.3964,49.05176],[13.28948,49.11859],[13.23602,49.11378],[13.18257,49.13431],[13.17039,49.14392],[13.17715,49.16445],[13.17106,49.17362],[13.11016,49.20332],[13.11422,49.21817],[13.08648,49.22909],[13.08106,49.24743],[13.06009,49.25005],[13.05535,49.26403],[13.0337,49.26403],[13.02558,49.27888],[13.02896,49.30421],[13.00731,49.30596],[12.97279,49.33391],[12.88889,49.35095],[12.88009,49.34876],[12.88686,49.33217],[12.84355,49.34527],[12.78603,49.34527],[12.77859,49.34833],[12.78129,49.36056],[12.75829,49.37541],[12.75761,49.39462],[12.70889,49.42476],[12.65543,49.43481],[12.65272,49.46014],[12.63378,49.4763],[12.64393,49.48504],[12.64393,49.52303],[12.63581,49.53177],[12.62092,49.52653],[12.58844,49.53832],[12.59521,49.54182],[12.57423,49.55929],[12.57694,49.58637],[12.56408,49.59685],[12.5607,49.61956],[12.52821,49.61825],[12.5343,49.62611],[12.52348,49.6283],[12.52889,49.64009],[12.51739,49.64533],[12.53024,49.6663],[12.52212,49.68639],[12.49167,49.68595],[12.44228,49.70386],[12.40032,49.75365],[12.40506,49.76282],[12.47273,49.78597],[12.46393,49.80999],[12.4734,49.81523],[12.47611,49.83751],[12.49776,49.83751],[12.49776,49.85673],[12.51197,49.85935],[12.52145,49.88162],[12.55054,49.90521],[12.581,49.90346]]]]}},{"type":"Feature","properties":{"id":"KVK","name":"KVK","c":[50.1743,12.7529]},"geometry":{"type":"MultiPolygon","coordinates":[[[[12.581,49.90346],[12.55054,49.90521],[12.54107,49.92443],[12.47814,49.93535],[12.47002,49.94845],[12.49979,49.97203],[12.48964,49.98164],[12.47679,49.98077],[12.46055,49.99475],[12.43145,49.98426],[12.43145,50.00261],[12.36716,50.01746],[12.33942,50.0393],[12.32589,50.03275],[12.31709,50.05327],[12.2616,50.05808],[12.27514,50.07642],[12.24671,50.09739],[12.23115,50.09433],[12.22844,50.10219],[12.2007,50.10874],[12.19529,50.14325],[12.21626,50.16814],[12.18852,50.19566],[12.19732,50.19915],[12.18243,50.19915],[12.17566,50.21269],[12.15942,50.21138],[12.16213,50.22361],[12.14521,50.2306],[12.1513,50.23584],[12.12694,50.23235],[12.09243,50.24982],[12.10258,50.25593],[12.09784,50.26249],[12.1398,50.27777],[12.12288,50.29088],[12.12627,50.30704],[12.10055,50.31796],[12.10664,50.32232],[12.12491,50.31534],[12.18446,50.32232],[12.18717,50.31184],[12.2007,50.30878],[12.19529,50.2935],[12.20138,50.27297],[12.25416,50.27078],[12.26566,50.25026],[12.24671,50.25724],[12.23927,50.24633],[12.29408,50.22099],[12.28258,50.21313],[12.28799,50.20309],[12.27446,50.19653],[12.28935,50.17688],[12.33198,50.1712],[12.32318,50.18212],[12.33807,50.19217],[12.32318,50.20702],[12.32656,50.21837],[12.33468,50.2175],[12.3313,50.24239],[12.35904,50.24196],[12.35228,50.26249],[12.37055,50.2852],[12.39964,50.2935],[12.39829,50.32145],[12.43077,50.32276],[12.44228,50.34198],[12.46867,50.35464],[12.48964,50.34984],[12.48626,50.3708],[12.51197,50.39745],[12.67302,50.41667],[12.70686,50.39701],[12.70754,50.40837],[12.7346,50.43239],[12.79483,50.44942],[12.81039,50.43108],[12.80633,50.44331],[12.81919,50.46034],[12.964,50.40094],[12.97415,50.38915],[13.02152,50.3957],[13.04452,50.38434],[13.06956,50.38959],[13.08039,50.38041],[13.09866,50.38216],[13.10881,50.37212],[13.09324,50.35464],[13.10948,50.35421],[13.1149,50.34504],[13.13385,50.35989],[13.18392,50.3494],[13.20896,50.36163],[13.2076,50.35464],[13.23738,50.33586],[13.23602,50.32145],[13.22046,50.31271],[13.23467,50.29655],[13.19948,50.27996],[13.22114,50.28214],[13.21505,50.27297],[13.23332,50.27253],[13.23805,50.24807],[13.22317,50.23977],[13.25565,50.22885],[13.25023,50.22056],[13.21166,50.21619],[13.24888,50.20658],[13.25023,50.19522],[13.27459,50.18561],[13.27392,50.16858],[13.28745,50.16814],[13.28407,50.15635],[13.26512,50.15722],[13.28407,50.1367],[13.25091,50.14631],[13.2279,50.13408],[13.24956,50.12403],[13.27392,50.12796],[13.30166,50.09913],[13.28136,50.09826],[13.29084,50.09258],[13.27663,50.07642],[13.2976,50.07468],[13.29287,50.06026],[13.27595,50.06201],[13.28001,50.0524],[13.25226,50.04585],[13.23061,50.04934],[13.24211,50.02576],[13.22926,50.01353],[13.23332,49.99649],[13.20557,49.99999],[13.18595,50.01746],[13.18054,50.01003],[13.16024,50.02576],[13.11963,50.0227],[13.09663,50.03493],[13.08039,50.02532],[13.08377,50.01833],[13.06956,50.01877],[13.06821,50.00916],[13.05332,50.0096],[13.01746,49.98645],[12.99986,49.98907],[13.00054,49.97771],[12.95994,49.97597],[12.95655,49.96767],[12.96941,49.95849],[12.95858,49.9502],[12.9667,49.94364],[12.92543,49.92661],[12.92813,49.92093],[12.8943,49.93447],[12.85302,49.92399],[12.83949,49.93447],[12.79212,49.94102],[12.7752,49.92748],[12.76505,49.93491],[12.72987,49.92312],[12.7028,49.92574],[12.71295,49.9122],[12.6737,49.90827],[12.68317,49.89167],[12.67032,49.89167],[12.6649,49.91089],[12.64934,49.91613],[12.61415,49.91001],[12.61145,49.89866],[12.59453,49.89298],[12.581,49.90346]]]]}},{"type":"Feature","properties":{"id":"ULK","name":"ULK","c":[50.5307,13.8457]},"geometry":{"type":"MultiPolygon","coordinates":[[[[14.35932,50.62806],[14.37894,50.61409],[14.38029,50.60098],[14.40533,50.58744],[14.43984,50.53023],[14.47029,50.52673],[14.48721,50.50577],[14.46894,50.50926],[14.47368,50.49922],[14.45473,50.49659],[14.47029,50.47956],[14.473,50.44942],[14.4236,50.45335],[14.42631,50.43981],[14.41007,50.43108],[14.42225,50.42802],[14.41616,50.4206],[14.37826,50.43632],[14.35999,50.42977],[14.37759,50.41055],[14.36338,50.40618],[14.37962,50.39526],[14.37759,50.37605],[14.36744,50.37736],[14.36744,50.35202],[14.27473,50.35464],[14.25037,50.32844],[14.18338,50.34504],[14.18135,50.33455],[14.14346,50.33062],[14.00744,50.34635],[13.98173,50.33368],[13.9912,50.30354],[13.95263,50.30704],[13.95737,50.29219],[13.94045,50.27996],[13.87752,50.27035],[13.86466,50.25943],[13.86331,50.2437],[13.83962,50.24021],[13.82677,50.26074],[13.81256,50.26336],[13.76857,50.23235],[13.75978,50.24065],[13.75166,50.22361],[13.67181,50.2223],[13.66978,50.23846],[13.63188,50.20833],[13.61564,50.21095],[13.62241,50.20265],[13.60752,50.19173],[13.53579,50.18911],[13.51279,50.16858],[13.48843,50.16596],[13.49452,50.14718],[13.47895,50.14325],[13.49249,50.12796],[13.47083,50.13233],[13.46271,50.10569],[13.4255,50.10918],[13.40452,50.09782],[13.40925,50.09258],[13.39504,50.08035],[13.37136,50.0773],[13.37068,50.09084],[13.35512,50.09433],[13.3558,50.10438],[13.32399,50.08734],[13.32467,50.1035],[13.29693,50.09957],[13.29625,50.11267],[13.28204,50.11442],[13.28948,50.11792],[13.27392,50.12796],[13.24956,50.12403],[13.2279,50.13408],[13.25091,50.14631],[13.28407,50.1367],[13.26512,50.15722],[13.28407,50.15635],[13.28745,50.16814],[13.27392,50.16858],[13.27459,50.18561],[13.25023,50.19522],[13.24888,50.20658],[13.21166,50.21619],[13.24076,50.22405],[13.25023,50.22056],[13.25565,50.22885],[13.22317,50.23977],[13.23805,50.24807],[13.23332,50.27253],[13.21505,50.27297],[13.22114,50.28214],[13.19948,50.27996],[13.23467,50.29655],[13.22046,50.31271],[13.23602,50.32145],[13.23805,50.33543],[13.22181,50.35246],[13.2076,50.35464],[13.20896,50.36163],[13.18392,50.3494],[13.13385,50.35989],[13.1149,50.34504],[13.10948,50.35421],[13.09324,50.35464],[13.10881,50.37212],[13.0973,50.3826],[13.08039,50.38041],[13.06956,50.38959],[13.04452,50.38434],[13.02152,50.3957],[12.97415,50.38915],[12.94031,50.40837],[12.98497,50.42016],[13.02016,50.44637],[13.03167,50.5097],[13.08512,50.50009],[13.13249,50.51843],[13.13655,50.5062],[13.19542,50.50315],[13.19542,50.51625],[13.22926,50.55032],[13.22317,50.56342],[13.2482,50.59225],[13.27866,50.59312],[13.29084,50.57478],[13.32332,50.58089],[13.32467,50.60841],[13.37745,50.62719],[13.37136,50.65077],[13.39166,50.64641],[13.41467,50.61671],[13.46474,50.60186],[13.4979,50.63199],[13.52429,50.63898],[13.52564,50.64946],[13.51279,50.65383],[13.54459,50.67742],[13.52497,50.7045],[13.55203,50.71367],[13.60279,50.71018],[13.66436,50.73201],[13.70699,50.71673],[13.72797,50.73376],[13.74083,50.72721],[13.75842,50.73594],[13.85519,50.72677],[13.86196,50.74293],[13.88023,50.73769],[13.8985,50.74512],[13.90256,50.75298],[13.88767,50.77001],[13.90053,50.79316],[13.9391,50.7901],[13.95466,50.80757],[13.99052,50.8198],[14.02977,50.80408],[14.07849,50.81238],[14.08932,50.82592],[14.2233,50.85911],[14.23616,50.87615],[14.23345,50.8875],[14.26729,50.89537],[14.30451,50.88401],[14.34917,50.89274],[14.34917,50.90061],[14.38774,50.8993],[14.38571,50.91633],[14.40195,50.92376],[14.39721,50.93642],[14.31127,50.95389],[14.31669,50.96044],[14.30248,50.96525],[14.32819,50.97311],[14.32345,50.98534],[14.28556,50.97704],[14.25849,50.98752],[14.26864,51.00019],[14.26052,51.00893],[14.28014,51.01417],[14.28624,51.02771],[14.27405,51.03994],[14.31601,51.05566],[14.33496,51.0395],[14.36202,51.04518],[14.383,51.03863],[14.38977,51.02421],[14.4148,51.01897],[14.45405,51.03601],[14.49262,51.02334],[14.49059,51.04343],[14.50074,51.04649],[14.50886,51.04256],[14.49871,51.02203],[14.53187,51.01679],[14.53999,51.01024],[14.53458,51.00368],[14.56435,51.01024],[14.59886,50.98709],[14.59616,50.96263],[14.56029,50.92507],[14.56435,50.91851],[14.58195,50.91371],[14.65029,50.93162],[14.653,50.90541],[14.63676,50.89799],[14.60834,50.84339],[14.56706,50.83771],[14.56097,50.79971],[14.52578,50.79535],[14.49398,50.81151],[14.47774,50.80889],[14.48383,50.81587],[14.44323,50.81107],[14.45608,50.80583],[14.44864,50.79578],[14.45879,50.79272],[14.44796,50.78443],[14.45811,50.77831],[14.42766,50.76652],[14.41683,50.74119],[14.43105,50.73638],[14.41616,50.73158],[14.4148,50.73988],[14.4033,50.7259],[14.37623,50.72066],[14.36676,50.70013],[14.37894,50.69096],[14.34308,50.66737],[14.34308,50.6582],[14.3627,50.65689],[14.35932,50.62806]]]]}},{"type":"Feature","properties":{"id":"LBK","name":"LBK","c":[50.7049,14.9995]},"geometry":{"type":"MultiPolygon","coordinates":[[[[14.3627,50.65689],[14.34308,50.6582],[14.34308,50.66737],[14.37894,50.69096],[14.36676,50.70013],[14.37623,50.72066],[14.4033,50.7259],[14.4148,50.73988],[14.41616,50.73158],[14.43105,50.73638],[14.41683,50.74119],[14.42766,50.76652],[14.45811,50.77831],[14.44796,50.78443],[14.45879,50.79272],[14.44864,50.79578],[14.45608,50.80583],[14.44323,50.81107],[14.48383,50.81587],[14.47774,50.80889],[14.48044,50.80845],[14.48518,50.8102],[14.48789,50.80932],[14.49398,50.81151],[14.54067,50.79403],[14.56097,50.79971],[14.56706,50.83815],[14.60495,50.84164],[14.61916,50.8578],[14.69021,50.83815],[14.70848,50.84077],[14.72202,50.82199],[14.74503,50.82941],[14.79307,50.8198],[14.82961,50.87265],[14.85532,50.86872],[14.87427,50.87702],[14.89728,50.86741],[14.90269,50.87571],[14.95953,50.86173],[15.00216,50.86872],[14.99404,50.89187],[15.0069,50.90716],[14.98931,50.92157],[15.01435,50.93992],[15.01096,50.96306],[15.02179,50.967],[15.00622,50.98665],[14.98863,50.97791],[14.96833,50.99014],[14.98525,51.01067],[15.0245,51.02334],[15.05562,51.01198],[15.06104,51.0229],[15.10637,51.01024],[15.10637,51.00718],[15.0969,51.00281],[15.10502,50.99145],[15.1287,50.99014],[15.14224,50.99145],[15.13344,50.99408],[15.14427,51.01329],[15.17201,51.01984],[15.17134,50.98665],[15.18013,50.98316],[15.2363,50.99888],[15.24848,50.97966],[15.27419,50.97966],[15.27419,50.96306],[15.29246,50.95258],[15.2681,50.93249],[15.2769,50.891],[15.31209,50.86042],[15.35404,50.85125],[15.36757,50.83815],[15.37637,50.82111],[15.36622,50.8019],[15.37366,50.77787],[15.39396,50.77656],[15.42103,50.80321],[15.4393,50.80889],[15.53539,50.77918],[15.53945,50.75735],[15.56922,50.74381],[15.57328,50.73551],[15.5584,50.71236],[15.56516,50.70799],[15.56178,50.68222],[15.58411,50.65252],[15.56516,50.63723],[15.60238,50.61452],[15.57125,50.58133],[15.59426,50.5739],[15.58614,50.56735],[15.60171,50.55818],[15.5902,50.55862],[15.60441,50.55643],[15.63283,50.52498],[15.58343,50.51363],[15.58208,50.5228],[15.56246,50.52673],[15.53674,50.51319],[15.51374,50.51756],[15.49479,50.53285],[15.49885,50.54115],[15.47787,50.54682],[15.4799,50.53241],[15.46637,50.53547],[15.46502,50.52586],[15.43659,50.52193],[15.44269,50.50358],[15.45419,50.5014],[15.44066,50.48655],[15.42306,50.48961],[15.4278,50.48218],[15.3899,50.48087],[15.37908,50.49135],[15.39193,50.49135],[15.37975,50.50839],[15.36825,50.49485],[15.32968,50.51538],[15.31276,50.51101],[15.26607,50.52586],[15.23833,50.50708],[15.24171,50.49747],[15.22276,50.49441],[15.14765,50.51669],[15.13344,50.52935],[15.09758,50.53459],[15.09555,50.55425],[15.06374,50.57128],[15.03938,50.5656],[15.036,50.58045],[15.01705,50.58701],[15.00419,50.60404],[14.97713,50.60622],[14.96765,50.59181],[14.94532,50.5988],[14.95683,50.59924],[14.95006,50.60666],[14.93044,50.60753],[14.93247,50.61714],[14.91217,50.61889],[14.91758,50.60666],[14.89525,50.60186],[14.90878,50.58657],[14.8472,50.57216],[14.85938,50.55643],[14.8269,50.53852],[14.75044,50.55687],[14.75382,50.51887],[14.7254,50.51974],[14.71931,50.49834],[14.68818,50.49179],[14.69224,50.48],[14.6327,50.48699],[14.61037,50.4717],[14.58195,50.48043],[14.57856,50.51101],[14.54879,50.50446],[14.54743,50.49572],[14.53322,50.49747],[14.52375,50.51101],[14.51022,50.5097],[14.50074,50.49179],[14.473,50.52498],[14.43984,50.52979],[14.40533,50.58744],[14.38029,50.60098],[14.37894,50.61409],[14.35932,50.62806],[14.3627,50.65689]]]]}},{"type":"Feature","properties":{"id":"HKK","name":"HKK","c":[50.3839,15.8656]},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.77088,50.17295],[15.74043,50.16116],[15.74043,50.14368],[15.72689,50.13364],[15.70524,50.13932],[15.68967,50.12578],[15.6484,50.14063],[15.64637,50.13277],[15.59968,50.14019],[15.59629,50.13888],[15.60306,50.1332],[15.58614,50.1332],[15.58073,50.14762],[15.56652,50.1498],[15.57125,50.14281],[15.55095,50.13451],[15.53945,50.14106],[15.52118,50.13495],[15.52253,50.1166],[15.48938,50.11442],[15.49547,50.11049],[15.45216,50.0952],[15.43456,50.11529],[15.4481,50.12447],[15.41562,50.14063],[15.40344,50.13495],[15.38178,50.14543],[15.34863,50.14456],[15.37434,50.15591],[15.35607,50.16596],[15.37772,50.17251],[15.39735,50.19784],[15.39126,50.21794],[15.37096,50.22667],[15.3669,50.2472],[15.38449,50.25506],[15.37502,50.27035],[15.3784,50.28476],[15.35607,50.29044],[15.35133,50.30092],[15.30667,50.28127],[15.26404,50.29437],[15.23224,50.28695],[15.20652,50.29699],[15.20382,50.30878],[15.21803,50.31796],[15.19299,50.33193],[15.18081,50.32844],[15.18893,50.33979],[15.12938,50.34635],[15.12058,50.35945],[15.13141,50.36338],[15.10434,50.37605],[15.11788,50.38871],[15.14427,50.3874],[15.13682,50.404],[15.1551,50.40749],[15.16254,50.42715],[15.15171,50.42846],[15.149,50.4468],[15.12938,50.45073],[15.13479,50.47214],[15.14494,50.47519],[15.12803,50.48],[15.13412,50.48961],[15.11382,50.50664],[15.14697,50.5228],[15.23562,50.49485],[15.24306,50.50184],[15.23833,50.50708],[15.26472,50.52542],[15.28569,50.52367],[15.31276,50.51101],[15.33848,50.51276],[15.36825,50.49485],[15.37975,50.50839],[15.39193,50.49135],[15.37908,50.49092],[15.40208,50.48],[15.4278,50.48218],[15.42306,50.48961],[15.4305,50.49223],[15.44133,50.48699],[15.45419,50.5014],[15.44269,50.50358],[15.43659,50.52193],[15.46502,50.52586],[15.46637,50.53547],[15.4799,50.53241],[15.47787,50.54682],[15.49885,50.54115],[15.49479,50.53285],[15.51374,50.51756],[15.53674,50.51319],[15.56246,50.52673],[15.58208,50.5228],[15.58343,50.51363],[15.63216,50.5228],[15.60441,50.55643],[15.5902,50.55862],[15.59291,50.55905],[15.60171,50.55818],[15.58614,50.56735],[15.59426,50.5739],[15.57125,50.58133],[15.60238,50.61452],[15.56516,50.63723],[15.58411,50.65252],[15.56178,50.68222],[15.56516,50.70799],[15.5584,50.71236],[15.57328,50.73594],[15.5381,50.75909],[15.53877,50.78006],[15.60171,50.777],[15.6802,50.75473],[15.70591,50.73725],[15.779,50.74206],[15.81621,50.75516],[15.83178,50.7425],[15.82975,50.72459],[15.85749,50.69664],[15.86087,50.67436],[15.88388,50.6713],[15.96102,50.69183],[15.9908,50.68353],[16.00433,50.65733],[16.00095,50.64466],[16.02193,50.63025],[15.98674,50.61365],[16.02463,50.5988],[16.0429,50.61409],[16.05576,50.60972],[16.06726,50.63986],[16.1038,50.66344],[16.17012,50.6451],[16.18433,50.62719],[16.21749,50.6333],[16.23508,50.67174],[16.27974,50.66825],[16.2838,50.66038],[16.34064,50.66213],[16.35147,50.64772],[16.36433,50.64772],[16.39478,50.61889],[16.42252,50.60666],[16.44485,50.57958],[16.40493,50.5691],[16.41102,50.5477],[16.38733,50.54202],[16.40154,50.52979],[16.36027,50.5014],[16.34403,50.49572],[16.31155,50.5062],[16.31222,50.49397],[16.29395,50.47912],[16.25876,50.48],[16.24929,50.47345],[16.25538,50.46777],[16.22019,50.45772],[16.2317,50.44331],[16.21275,50.45161],[16.19583,50.43195],[16.21004,50.42671],[16.21478,50.40924],[16.23779,50.41405],[16.25267,50.40575],[16.24726,50.39614],[16.26282,50.39352],[16.27839,50.36731],[16.30478,50.3826],[16.36094,50.37954],[16.36771,50.36687],[16.3623,50.34984],[16.38327,50.32888],[16.39951,50.31927],[16.43132,50.32451],[16.48951,50.26423],[16.54838,50.22973],[16.56192,50.20745],[16.55447,50.1961],[16.56395,50.17994],[16.56056,50.16465],[16.5856,50.15198],[16.56936,50.13844],[16.50575,50.16509],[16.48139,50.16465],[16.47192,50.1367],[16.4347,50.13058],[16.42252,50.12621],[16.42996,50.12097],[16.40763,50.11442],[16.3941,50.11792],[16.37515,50.10088],[16.34064,50.09258],[16.35756,50.07773],[16.31222,50.0607],[16.33252,50.04017],[16.28177,50.05153],[16.24794,50.04279],[16.25132,50.05284],[16.24252,50.05546],[16.23034,50.04235],[16.19719,50.03842],[16.17486,50.05939],[16.13899,50.06288],[16.11192,50.08472],[16.07538,50.08647],[16.0632,50.11267],[16.00974,50.11267],[16.00974,50.14587],[15.99215,50.14631],[15.99215,50.15722],[15.9414,50.16028],[15.91704,50.17076],[15.91636,50.16378],[15.88794,50.16247],[15.88727,50.14718],[15.85275,50.14762],[15.83448,50.13189],[15.80403,50.14063],[15.80403,50.16814],[15.77088,50.17295]]]]}},{"type":"Feature","properties":{"id":"PAK","name":"PAK","c":[49.9013,16.1925]},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.77088,50.17295],[15.80403,50.16814],[15.80403,50.14063],[15.83448,50.13189],[15.85275,50.14762],[15.88727,50.14718],[15.88794,50.16247],[15.91636,50.16378],[15.91704,50.17076],[15.9414,50.16028],[15.99215,50.15722],[15.99215,50.14631],[16.00974,50.14587],[16.00974,50.11267],[16.0632,50.11267],[16.07538,50.08647],[16.11192,50.08472],[16.13899,50.06288],[16.17486,50.05939],[16.19583,50.03842],[16.23034,50.04235],[16.24252,50.05546],[16.25132,50.05284],[16.24794,50.04279],[16.28177,50.05153],[16.33049,50.04017],[16.31222,50.0607],[16.35756,50.07773],[16.34064,50.09258],[16.37515,50.10088],[16.3941,50.11792],[16.40763,50.11442],[16.42996,50.12097],[16.42252,50.12621],[16.4347,50.13058],[16.47192,50.1367],[16.48139,50.16465],[16.50575,50.16509],[16.56936,50.13844],[16.59508,50.14063],[16.63365,50.11136],[16.70537,50.09651],[16.72364,50.10525],[16.7453,50.13451],[16.78319,50.14543],[16.81229,50.19086],[16.82312,50.18867],[16.84748,50.20745],[16.86169,50.2009],[16.86575,50.17688],[16.84815,50.16509],[16.83259,50.12709],[16.82447,50.12752],[16.82582,50.11486],[16.80485,50.10918],[16.82447,50.08559],[16.79808,50.06943],[16.81906,50.04454],[16.80688,50.03799],[16.80958,50.03143],[16.76695,50.01658],[16.76831,50.00698],[16.74868,49.99475],[16.71214,49.99955],[16.73515,49.9681],[16.73176,49.95107],[16.75071,49.93141],[16.74598,49.92486],[16.7568,49.92006],[16.75004,49.89429],[16.76898,49.8742],[16.74124,49.86415],[16.73582,49.83052],[16.76086,49.81829],[16.75613,49.80519],[16.76628,49.79165],[16.80146,49.77287],[16.79199,49.75889],[16.81297,49.74841],[16.78861,49.72919],[16.83124,49.72963],[16.84748,49.71609],[16.84003,49.7056],[16.84815,49.70255],[16.84545,49.68071],[16.80349,49.65669],[16.80011,49.63922],[16.82176,49.62349],[16.81094,49.62699],[16.80485,49.59903],[16.78252,49.59598],[16.69658,49.62655],[16.66545,49.6283],[16.67019,49.62306],[16.65056,49.61869],[16.62147,49.6331],[16.60387,49.62131],[16.55515,49.63092],[16.54026,49.58986],[16.48748,49.59991],[16.4462,49.58724],[16.45094,49.59641],[16.43538,49.5986],[16.41711,49.5951],[16.42049,49.58549],[16.40628,49.57195],[16.34809,49.61301],[16.28718,49.62],[16.26959,49.62961],[16.275,49.64009],[16.24185,49.66018],[16.20598,49.6663],[16.1938,49.67852],[16.15117,49.67809],[16.13967,49.69119],[16.10313,49.68333],[16.07538,49.71172],[16.01651,49.71914],[16.00974,49.73793],[15.99621,49.73836],[15.97253,49.71958],[15.96914,49.7008],[15.95358,49.70255],[15.95967,49.69119],[15.91772,49.68551],[15.90554,49.69818],[15.87035,49.70255],[15.84869,49.71871],[15.86493,49.73225],[15.86358,49.74448],[15.8514,49.73662],[15.80606,49.75889],[15.77494,49.75583],[15.7817,49.78029],[15.7384,49.77942],[15.70862,49.80431],[15.689,49.80126],[15.68561,49.81087],[15.66193,49.81698],[15.65381,49.80694],[15.64095,49.80606],[15.63892,49.81567],[15.59223,49.80868],[15.57464,49.82877],[15.49953,49.85935],[15.49547,49.87027],[15.50562,49.88337],[15.4975,49.89778],[15.5205,49.90215],[15.51847,49.91132],[15.53539,49.92748],[15.51577,49.94102],[15.53065,49.94758],[15.53133,49.96155],[15.46096,49.98732],[15.47381,49.99431],[15.46908,50.00698],[15.4596,49.99737],[15.46028,50.01003],[15.42441,50.0096],[15.43118,50.01658],[15.39396,50.02052],[15.36284,50.04104],[15.40276,50.04672],[15.37502,50.05589],[15.41291,50.06288],[15.40411,50.08603],[15.4278,50.08821],[15.39938,50.09564],[15.41426,50.10787],[15.42577,50.09913],[15.43862,50.10962],[15.45216,50.0952],[15.46975,50.09957],[15.49547,50.11049],[15.48938,50.11442],[15.52253,50.1166],[15.52118,50.13495],[15.53945,50.14106],[15.55095,50.13451],[15.57125,50.14281],[15.5699,50.15024],[15.58614,50.1332],[15.60306,50.1332],[15.59968,50.14019],[15.64637,50.13277],[15.6484,50.14063],[15.68967,50.12578],[15.70524,50.13932],[15.72689,50.13364],[15.74043,50.14368],[15.74043,50.16116],[15.77088,50.17295]]]]}},{"type":"Feature","properties":{"id":"VYS","name":"VYS","c":[49.4134,15.6714]},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.96847,49.03909],[15.9732,49.04608],[15.96102,49.05744],[15.94614,49.04739],[15.93125,49.05089],[15.93463,49.03866],[15.91704,49.02905],[15.88388,49.03909],[15.87509,49.00852],[15.81892,49.0107],[15.79794,48.99935],[15.80606,48.99498],[15.79185,48.98406],[15.75802,48.981],[15.75531,48.96659],[15.73772,48.96397],[15.74246,48.95873],[15.73028,48.94694],[15.70388,48.9679],[15.66058,48.96441],[15.66531,48.95611],[15.64569,48.93776],[15.62404,48.94169],[15.61118,48.95916],[15.58817,48.95523],[15.58614,48.94737],[15.57328,48.95698],[15.58005,48.96572],[15.52321,48.9762],[15.52795,48.99498],[15.50832,48.99847],[15.49479,48.9893],[15.48735,48.99673],[15.509,49.01726],[15.53404,49.02555],[15.52456,49.03691],[15.54554,49.04259],[15.5408,49.06006],[15.55501,49.06093],[15.55298,49.07709],[15.59765,49.07666],[15.5902,49.08452],[15.60374,49.08889],[15.58208,49.09849],[15.5902,49.10461],[15.57464,49.10199],[15.5496,49.11466],[15.5699,49.1164],[15.56719,49.12907],[15.55231,49.12557],[15.55501,49.13125],[15.53674,49.13562],[15.53607,49.1247],[15.51577,49.13125],[15.50291,49.11902],[15.4684,49.11946],[15.44133,49.133],[15.42374,49.11771],[15.33712,49.16663],[15.35066,49.1924],[15.34118,49.21817],[15.26539,49.21468],[15.25321,49.20638],[15.25727,49.21773],[15.20585,49.22603],[15.19164,49.23651],[15.1666,49.21599],[15.13953,49.22123],[15.12397,49.24787],[15.09893,49.24088],[15.07525,49.25224],[15.10096,49.24918],[15.10367,49.27015],[15.06239,49.27233],[15.02991,49.29679],[14.99134,49.27495],[14.97916,49.27713],[14.94803,49.30421],[14.92435,49.31033],[14.92638,49.32125],[14.90405,49.33304],[14.93314,49.35619],[14.88848,49.37584],[14.91623,49.4252],[14.89999,49.42782],[14.91217,49.43044],[14.91284,49.44354],[14.92773,49.45621],[14.92976,49.468],[14.91758,49.47455],[14.93382,49.48416],[14.9257,49.50251],[14.90202,49.51692],[14.94532,49.52653],[14.92841,49.54356],[14.93247,49.55754],[14.94668,49.55667],[14.93585,49.56715],[14.93991,49.57981],[14.99337,49.582],[14.96901,49.59598],[14.97645,49.60427],[15.00284,49.60777],[15.02111,49.59685],[15.05562,49.59423],[15.1172,49.61039],[15.11179,49.60471],[15.14697,49.60209],[15.16457,49.58899],[15.17066,49.61388],[15.18081,49.60995],[15.18419,49.61912],[15.20111,49.61083],[15.23021,49.61476],[15.24983,49.63004],[15.24983,49.64358],[15.23494,49.66542],[15.18487,49.66761],[15.17743,49.69643],[15.18216,49.71041],[15.21735,49.7257],[15.21464,49.7388],[15.2275,49.74229],[15.22006,49.74797],[15.22479,49.75714],[15.25389,49.76326],[15.24983,49.75452],[15.26472,49.75103],[15.29923,49.7685],[15.33509,49.77549],[15.3466,49.76937],[15.36757,49.77549],[15.38246,49.79995],[15.42509,49.79252],[15.4393,49.80431],[15.419,49.81567],[15.41629,49.8279],[15.44675,49.84537],[15.46502,49.83882],[15.47449,49.85105],[15.49208,49.85018],[15.49682,49.86109],[15.57464,49.82877],[15.59223,49.80868],[15.63892,49.81567],[15.64095,49.80606],[15.65381,49.80694],[15.66193,49.81698],[15.68561,49.81087],[15.689,49.80126],[15.70862,49.80431],[15.7384,49.77942],[15.7817,49.78029],[15.77494,49.75583],[15.80606,49.75889],[15.8514,49.73662],[15.86358,49.74448],[15.86493,49.73225],[15.84869,49.71871],[15.87035,49.70255],[15.90554,49.69818],[15.91772,49.68551],[15.95967,49.69119],[15.95358,49.70255],[15.96914,49.7008],[15.97253,49.71958],[15.99621,49.73836],[16.00974,49.73793],[16.01651,49.71914],[16.07538,49.71172],[16.1011,49.68377],[16.13967,49.69119],[16.15117,49.67809],[16.1938,49.67852],[16.275,49.64009],[16.26959,49.62961],[16.28718,49.62],[16.30207,49.62393],[16.37042,49.60209],[16.39342,49.57632],[16.38936,49.56016],[16.37245,49.55099],[16.38733,49.53745],[16.40831,49.53963],[16.41846,49.52522],[16.38463,49.4929],[16.35485,49.50207],[16.36297,49.48722],[16.38936,49.47586],[16.37245,49.46494],[16.38192,49.45665],[16.35215,49.44835],[16.35147,49.46975],[16.31493,49.46538],[16.29192,49.44704],[16.32576,49.44966],[16.33591,49.44005],[16.32305,49.43655],[16.32914,49.43131],[16.26215,49.42564],[16.25403,49.41428],[16.25944,49.40554],[16.22764,49.39419],[16.23711,49.37672],[16.21749,49.35532],[16.27297,49.3326],[16.26891,49.33086],[16.24388,49.33129],[16.24455,49.32343],[16.27297,49.31601],[16.28786,49.32212],[16.29395,49.31251],[16.25538,49.28325],[16.28854,49.25704],[16.25403,49.25355],[16.23508,49.22559],[16.23508,49.21074],[16.27433,49.20114],[16.26756,49.18541],[16.27568,49.1841],[16.23305,49.17449],[16.22493,49.16401],[16.24591,49.1461],[16.23373,49.13606],[16.20395,49.13868],[16.25538,49.10636],[16.22019,49.09718],[16.22696,49.08364],[16.21072,49.07141],[16.13696,49.06792],[16.12884,49.05787],[16.14643,49.04783],[16.1241,49.04565],[16.11734,49.03647],[16.08621,49.03909],[16.08553,49.0308],[16.03343,49.04696],[16.03343,49.0356],[16.02125,49.02948],[15.96847,49.03909]]]]}},{"type":"Feature","properties":{"id":"JHM","name":"JHM","c":[49.0802,16.635]},"geometry":{"type":"MultiPolygon","coordinates":[[[[16.02125,49.02948],[16.03343,49.0356],[16.03343,49.04696],[16.08553,49.0308],[16.08621,49.03909],[16.11734,49.03647],[16.1241,49.04565],[16.14643,49.04783],[16.12884,49.05787],[16.13696,49.06792],[16.21072,49.07141],[16.22696,49.08364],[16.22019,49.09718],[16.2547,49.10505],[16.20395,49.13868],[16.23373,49.13606],[16.24591,49.1461],[16.22493,49.16401],[16.23305,49.17449],[16.27568,49.1841],[16.26756,49.18541],[16.27433,49.20114],[16.23508,49.21074],[16.23508,49.22559],[16.25403,49.25355],[16.28854,49.25704],[16.25538,49.28325],[16.29395,49.31251],[16.28786,49.32212],[16.27297,49.31601],[16.23982,49.32605],[16.27297,49.3326],[16.22019,49.35095],[16.23711,49.37672],[16.22764,49.39419],[16.25944,49.40554],[16.25403,49.41428],[16.26688,49.42826],[16.32914,49.43131],[16.32305,49.43655],[16.33591,49.44005],[16.32576,49.44966],[16.29192,49.44704],[16.31493,49.46538],[16.35079,49.47019],[16.35215,49.44835],[16.37854,49.45184],[16.37245,49.46494],[16.38936,49.47586],[16.36297,49.48722],[16.35485,49.50207],[16.38463,49.4929],[16.41846,49.52522],[16.40831,49.53963],[16.38733,49.53745],[16.37245,49.55099],[16.39139,49.56234],[16.39139,49.57981],[16.40628,49.57239],[16.42049,49.58549],[16.41711,49.5951],[16.43538,49.5986],[16.45094,49.59641],[16.4462,49.58724],[16.48748,49.59991],[16.54026,49.58986],[16.55515,49.63092],[16.60387,49.62131],[16.62147,49.6331],[16.65056,49.61869],[16.67019,49.62306],[16.66545,49.6283],[16.69658,49.62655],[16.77372,49.59816],[16.80485,49.59772],[16.79334,49.59161],[16.78861,49.59161],[16.80282,49.57807],[16.79334,49.5737],[16.7453,49.58724],[16.74259,49.57326],[16.75274,49.55972],[16.73785,49.54356],[16.83327,49.53221],[16.80958,49.53046],[16.80146,49.52391],[16.80552,49.51255],[16.78793,49.50949],[16.79808,49.45621],[16.81838,49.45184],[16.81838,49.43961],[16.82921,49.43655],[16.80011,49.42869],[16.79605,49.41166],[16.85966,49.38108],[16.91582,49.42913],[16.9077,49.44354],[16.89146,49.44747],[16.90094,49.45184],[16.89755,49.46014],[16.8583,49.47979],[16.90567,49.49901],[16.93612,49.48809],[16.94695,49.49333],[16.95913,49.48154],[16.95778,49.46888],[16.98755,49.4549],[16.98755,49.42607],[17.01462,49.41777],[17.01123,49.40598],[17.02409,49.4038],[17.02274,49.37148],[17.05116,49.36536],[17.0356,49.35925],[17.14116,49.32561],[17.14319,49.29854],[17.16213,49.27801],[17.12965,49.24481],[17.14725,49.2304],[17.13574,49.21511],[17.16484,49.18978],[17.14725,49.17493],[17.18041,49.17275],[17.19597,49.18366],[17.20274,49.17537],[17.18785,49.13824],[17.1486,49.133],[17.14183,49.1033],[17.11341,49.1033],[17.1195,49.08583],[17.11003,49.07753],[17.14522,49.07316],[17.21356,49.09282],[17.23183,49.06443],[17.22236,49.03298],[17.23048,49.0404],[17.25078,49.03866],[17.25281,49.03036],[17.2677,49.03429],[17.27514,49.01376],[17.33604,49.01551],[17.36311,49.00459],[17.35161,48.97926],[17.39627,48.98057],[17.43416,48.95043],[17.49845,48.96659],[17.5086,48.95261],[17.54784,48.94781],[17.55326,48.943],[17.53837,48.92335],[17.60198,48.91025],[17.62228,48.87924],[17.6392,48.87836],[17.63514,48.86919],[17.64664,48.85434],[17.60198,48.8408],[17.58912,48.82508],[17.55461,48.83163],[17.55326,48.81984],[17.52822,48.81197],[17.51604,48.81765],[17.51875,48.82944],[17.50995,48.8194],[17.45311,48.84692],[17.39694,48.81328],[17.36108,48.81372],[17.32183,48.84517],[17.20003,48.87749],[17.15401,48.84473],[17.11071,48.83119],[17.08838,48.78533],[17.04304,48.76437],[16.9977,48.7089],[16.99702,48.69186],[16.96793,48.66871],[16.96996,48.646],[16.95642,48.62373],[16.94018,48.61674],[16.91853,48.62242],[16.92868,48.63858],[16.91921,48.64993],[16.92327,48.66959],[16.91041,48.6757],[16.91853,48.69361],[16.90229,48.71807],[16.87928,48.72287],[16.86913,48.71239],[16.83394,48.71632],[16.80011,48.70584],[16.75748,48.71719],[16.74733,48.73204],[16.725,48.73816],[16.68237,48.72768],[16.67357,48.74078],[16.67763,48.76655],[16.66342,48.78096],[16.59372,48.78271],[16.54094,48.81416],[16.51861,48.79843],[16.46042,48.80892],[16.4347,48.76568],[16.37786,48.72855],[16.35959,48.72811],[16.34267,48.74558],[16.32982,48.73117],[16.27771,48.74165],[16.10313,48.74558],[15.99418,48.77922],[15.94952,48.80542],[15.95832,48.82289],[15.94208,48.8277],[15.93463,48.81896],[15.91975,48.83862],[15.89336,48.83469],[15.89268,48.84342],[15.90486,48.83905],[15.89742,48.84823],[15.88456,48.84211],[15.87712,48.85958],[15.86426,48.85216],[15.8426,48.85958],[15.85208,48.86701],[15.84125,48.87705],[15.77967,48.87487],[15.75396,48.85216],[15.7093,48.86089],[15.69035,48.85565],[15.61389,48.89758],[15.57802,48.89583],[15.54216,48.90763],[15.5496,48.92379],[15.5699,48.92772],[15.5584,48.92946],[15.56922,48.93209],[15.56719,48.94213],[15.57937,48.93864],[15.58817,48.95523],[15.61118,48.95916],[15.62404,48.94169],[15.64569,48.93776],[15.66531,48.95611],[15.66058,48.96441],[15.70659,48.9679],[15.73028,48.94694],[15.74246,48.95873],[15.73772,48.96397],[15.75531,48.96659],[15.75802,48.981],[15.79185,48.98406],[15.80606,48.99498],[15.79794,48.99935],[15.81892,49.0107],[15.87509,49.00852],[15.88388,49.03909],[15.91704,49.02905],[15.93463,49.03866],[15.93125,49.05089],[15.94614,49.04739],[15.96102,49.05744],[15.9732,49.04608],[15.96847,49.03909],[16.02125,49.02948]]]]}},{"type":"Feature","properties":{"id":"OLK","name":"OLK","c":[49.7768,17.1912]},"geometry":{"type":"MultiPolygon","coordinates":[[[[17.20883,49.82659],[17.21559,49.81829],[17.24063,49.82615],[17.26634,49.81829],[17.26499,49.83489],[17.35567,49.86328],[17.38138,49.84843],[17.35634,49.81261],[17.38747,49.79077],[17.39288,49.81305],[17.41657,49.8148],[17.41048,49.82659],[17.42942,49.82441],[17.4301,49.83533],[17.44025,49.83227],[17.43822,49.82353],[17.45378,49.8362],[17.46258,49.83227],[17.45649,49.85498],[17.44093,49.86721],[17.47612,49.87376],[17.47273,49.85629],[17.48762,49.85236],[17.49033,49.83969],[17.48018,49.83882],[17.48356,49.82572],[17.49168,49.8148],[17.50589,49.81654],[17.49371,49.79864],[17.52484,49.79034],[17.5201,49.78073],[17.52754,49.77068],[17.54311,49.7733],[17.5607,49.75758],[17.61416,49.74491],[17.61754,49.7554],[17.65408,49.7602],[17.68115,49.75365],[17.68656,49.73181],[17.69807,49.73312],[17.68115,49.70473],[17.68927,49.67678],[17.72446,49.6628],[17.73664,49.67984],[17.74746,49.67503],[17.7725,49.65188],[17.76641,49.64577],[17.77792,49.6331],[17.81581,49.62174],[17.86385,49.58156],[17.86385,49.57108],[17.84355,49.56496],[17.85303,49.55099],[17.86318,49.54487],[17.88348,49.56802],[17.90243,49.56628],[17.91055,49.54094],[17.91799,49.54051],[17.91461,49.52915],[17.9004,49.51124],[17.88686,49.50862],[17.83746,49.52172],[17.83882,49.50425],[17.78671,49.48853],[17.80025,49.47062],[17.77792,49.45796],[17.78333,49.4549],[17.77386,49.43743],[17.71972,49.43786],[17.69198,49.4632],[17.67371,49.46101],[17.66423,49.43917],[17.64867,49.45184],[17.62431,49.44966],[17.62296,49.44092],[17.65002,49.41515],[17.63175,49.40118],[17.59115,49.39725],[17.581,49.40773],[17.5289,49.39637],[17.50454,49.40118],[17.51469,49.39812],[17.51469,49.38327],[17.47341,49.35488],[17.44972,49.38021],[17.42942,49.37453],[17.39018,49.38807],[17.37461,49.38021],[17.38544,49.40511],[17.35499,49.4086],[17.33266,49.38196],[17.35702,49.34265],[17.31506,49.33173],[17.31236,49.31775],[17.27717,49.29548],[17.25484,49.3029],[17.21221,49.28849],[17.19394,49.29722],[17.17838,49.28631],[17.17702,49.26883],[17.15604,49.27626],[17.13574,49.31557],[17.13913,49.32649],[17.04642,49.354],[17.0356,49.35925],[17.05116,49.36536],[17.02274,49.37148],[17.02409,49.4038],[17.01123,49.40598],[17.01462,49.41777],[16.98755,49.42607],[16.98755,49.4549],[16.95778,49.46888],[16.9483,49.4929],[16.93612,49.48809],[16.90567,49.49901],[16.8583,49.47979],[16.89755,49.46014],[16.90094,49.45184],[16.89146,49.44747],[16.9077,49.44354],[16.91582,49.42913],[16.85966,49.38108],[16.79605,49.41166],[16.80011,49.42869],[16.82921,49.43655],[16.81838,49.43961],[16.81838,49.45184],[16.79808,49.45621],[16.78793,49.50949],[16.80552,49.51255],[16.80146,49.52391],[16.80958,49.53046],[16.83327,49.53221],[16.73853,49.54269],[16.75274,49.55972],[16.74259,49.57501],[16.7453,49.58724],[16.78387,49.57239],[16.80282,49.57807],[16.78861,49.59161],[16.80485,49.59685],[16.81094,49.62699],[16.82176,49.62349],[16.80011,49.63922],[16.80349,49.65669],[16.84545,49.68071],[16.84815,49.70255],[16.84003,49.7056],[16.84748,49.71609],[16.83124,49.72963],[16.78861,49.72919],[16.81297,49.74841],[16.79199,49.75889],[16.80146,49.77287],[16.76628,49.79165],[16.75613,49.80519],[16.76086,49.81829],[16.73582,49.83052],[16.74124,49.86415],[16.76898,49.8742],[16.75004,49.89429],[16.7568,49.92006],[16.74598,49.92486],[16.75071,49.93141],[16.73176,49.95107],[16.73515,49.9681],[16.71214,49.99955],[16.74868,49.99475],[16.76831,50.00698],[16.76695,50.01658],[16.80958,50.03143],[16.80688,50.03799],[16.81906,50.04454],[16.79808,50.06943],[16.82447,50.08559],[16.80485,50.10918],[16.82582,50.11486],[16.82447,50.12752],[16.83259,50.12709],[16.84815,50.16509],[16.86575,50.17688],[16.86304,50.19828],[16.88267,50.20003],[16.89891,50.22274],[16.95642,50.22274],[16.97605,50.24502],[16.99838,50.21575],[17.02815,50.23017],[17.00176,50.25637],[17.02003,50.27821],[17.00244,50.30223],[16.94627,50.31534],[16.93409,50.32975],[16.93748,50.34241],[16.91515,50.36294],[16.91109,50.38915],[16.86033,50.40793],[16.88131,50.44287],[16.9077,50.44942],[16.97402,50.41754],[16.99838,50.42759],[17.05251,50.40706],[17.11071,50.40487],[17.11138,50.39352],[17.14319,50.38041],[17.20341,50.38653],[17.20138,50.36382],[17.24807,50.33193],[17.29003,50.31752],[17.3489,50.32844],[17.3374,50.31315],[17.35364,50.30791],[17.34822,50.28738],[17.33807,50.28345],[17.34958,50.26423],[17.36243,50.26423],[17.36582,50.28214],[17.38612,50.28301],[17.42063,50.27734],[17.43145,50.26292],[17.4213,50.21007],[17.3983,50.2092],[17.37664,50.22274],[17.34822,50.18998],[17.30897,50.18649],[17.30288,50.17339],[17.28461,50.17295],[17.2589,50.14762],[17.23928,50.14194],[17.24943,50.12097],[17.22033,50.10219],[17.23454,50.06376],[17.16755,50.01134],[17.17364,49.99344],[17.15537,49.98295],[17.19326,49.96461],[17.20341,49.94932],[17.18988,49.93272],[17.16213,49.92137],[17.16146,49.91263],[17.17499,49.91089],[17.14725,49.87813],[17.18514,49.8445],[17.22507,49.85935],[17.20883,49.82659]]]]}},{"type":"Feature","properties":{"id":"MSK","name":"MSK","c":[49.8205,17.9796]},"geometry":{"type":"MultiPolygon","coordinates":[[[[17.22507,49.85935],[17.18514,49.8445],[17.14657,49.88075],[17.17499,49.91089],[17.16146,49.91263],[17.16213,49.92137],[17.18988,49.93272],[17.20341,49.94932],[17.19326,49.96461],[17.15537,49.98295],[17.17364,49.99344],[17.16755,50.01134],[17.23454,50.06376],[17.22033,50.10219],[17.24943,50.12097],[17.23928,50.14194],[17.2589,50.14762],[17.28461,50.17295],[17.30288,50.17339],[17.30897,50.18649],[17.34822,50.18998],[17.37664,50.22274],[17.3983,50.2092],[17.4213,50.21007],[17.42942,50.25419],[17.45446,50.25637],[17.45649,50.26991],[17.56408,50.27035],[17.59183,50.27908],[17.61754,50.26685],[17.68589,50.29917],[17.69265,50.32713],[17.72107,50.31927],[17.72919,50.30311],[17.7522,50.29961],[17.72581,50.27297],[17.72513,50.25681],[17.76506,50.23628],[17.75829,50.20658],[17.71769,50.20571],[17.70483,50.18474],[17.60469,50.17076],[17.5925,50.15985],[17.61078,50.14019],[17.64055,50.13058],[17.65002,50.11093],[17.67641,50.10307],[17.68318,50.11748],[17.69671,50.11704],[17.73055,50.09695],[17.72919,50.08821],[17.74882,50.07861],[17.77115,50.04847],[17.77724,50.02052],[17.82799,50.01134],[17.83679,50.00348],[17.82664,49.99387],[17.86859,49.97247],[17.91867,49.97815],[17.95385,50.00523],[17.98295,50.00523],[18.0046,50.01833],[18.00731,50.01091],[18.04521,50.00523],[18.04453,50.03668],[18.0249,50.03886],[18.0134,50.03012],[18.00393,50.03886],[18.00528,50.05371],[18.0337,50.06594],[18.08919,50.0441],[18.08581,50.03187],[18.1034,50.0227],[18.0946,50.01222],[18.11558,49.99475],[18.13453,49.99737],[18.15415,49.98252],[18.16904,49.98645],[18.1731,50.00042],[18.20626,49.9978],[18.21438,49.97203],[18.27663,49.96461],[18.27934,49.94015],[18.31791,49.91569],[18.33009,49.93054],[18.34971,49.92967],[18.3328,49.94932],[18.37678,49.93578],[18.43091,49.93797],[18.43294,49.92836],[18.46339,49.92224],[18.49114,49.90346],[18.52362,49.89953],[18.5473,49.90914],[18.53918,49.92574],[18.57302,49.92181],[18.57978,49.90565],[18.56625,49.88293],[18.56963,49.87332],[18.6055,49.86153],[18.58384,49.85236],[18.58993,49.84581],[18.56896,49.82921],[18.59264,49.80169],[18.61362,49.75496],[18.62918,49.7471],[18.62512,49.7222],[18.66843,49.70342],[18.70971,49.70429],[18.71715,49.68333],[18.74083,49.67634],[18.78076,49.68551],[18.80444,49.67896],[18.82474,49.60034],[18.83895,49.5951],[18.83354,49.57326],[18.85925,49.55055],[18.85722,49.53788],[18.83692,49.52347],[18.85113,49.51736],[18.80783,49.51517],[18.75437,49.48853],[18.6779,49.50775],[18.61768,49.49508],[18.60279,49.49727],[18.59738,49.51037],[18.55272,49.50294],[18.53445,49.48984],[18.54798,49.468],[18.48979,49.43306],[18.49385,49.42826],[18.47558,49.4086],[18.44986,49.39331],[18.40385,49.39681],[18.36663,49.40554],[18.3734,49.42127],[18.36663,49.43219],[18.34971,49.4466],[18.32129,49.4514],[18.30708,49.46494],[18.30099,49.48984],[18.26783,49.4929],[18.25362,49.48242],[18.20355,49.48897],[18.16362,49.51692],[18.13588,49.50949],[18.12573,49.52041],[17.99784,49.50338],[17.99378,49.52172],[17.97348,49.53788],[17.91055,49.54094],[17.90243,49.56628],[17.88348,49.56802],[17.8625,49.54487],[17.84288,49.56322],[17.86656,49.57632],[17.83814,49.60602],[17.78739,49.63528],[17.77792,49.6331],[17.76641,49.64577],[17.7725,49.65188],[17.73867,49.67984],[17.72446,49.6628],[17.68589,49.68115],[17.68115,49.70473],[17.69874,49.73268],[17.68656,49.73181],[17.68115,49.75365],[17.65476,49.7602],[17.61754,49.7554],[17.61416,49.74491],[17.58574,49.75016],[17.54311,49.7733],[17.52754,49.77068],[17.5201,49.78073],[17.52484,49.79034],[17.49371,49.79864],[17.50589,49.81654],[17.49168,49.8148],[17.48356,49.82572],[17.48018,49.83882],[17.49033,49.83969],[17.48762,49.85236],[17.47273,49.85629],[17.47612,49.87376],[17.44093,49.86721],[17.45649,49.85498],[17.46258,49.83227],[17.45378,49.8362],[17.43822,49.82353],[17.44025,49.83227],[17.4301,49.83533],[17.42942,49.82441],[17.41048,49.82659],[17.41657,49.8148],[17.39288,49.81305],[17.38747,49.79077],[17.35634,49.81261],[17.38138,49.84843],[17.35567,49.86328],[17.26499,49.83489],[17.26634,49.81829],[17.24063,49.82615],[17.21559,49.81829],[17.20883,49.82659],[17.22507,49.85935]]]]}},{"type":"Feature","properties":{"id":"ZLK","name":"ZLK","c":[49.2199,17.7468]},"geometry":{"type":"MultiPolygon","coordinates":[[[[17.14522,49.07316],[17.11003,49.07753],[17.1195,49.08583],[17.11341,49.1033],[17.14183,49.1033],[17.1486,49.133],[17.18785,49.13824],[17.20274,49.17537],[17.19597,49.18366],[17.18041,49.17275],[17.14725,49.17493],[17.16484,49.18978],[17.13574,49.21511],[17.14725,49.2304],[17.13101,49.24743],[17.15875,49.27539],[17.17702,49.26883],[17.17838,49.28631],[17.19394,49.29722],[17.21221,49.28849],[17.25484,49.3029],[17.27717,49.29548],[17.31236,49.31775],[17.31506,49.33173],[17.35702,49.34265],[17.33266,49.38196],[17.35499,49.4086],[17.38544,49.40511],[17.37461,49.38021],[17.39018,49.38807],[17.42942,49.37453],[17.44972,49.38021],[17.47341,49.35488],[17.51469,49.38327],[17.51469,49.39812],[17.50454,49.40118],[17.5289,49.39637],[17.581,49.40773],[17.59115,49.39725],[17.63175,49.40118],[17.65002,49.41515],[17.62296,49.44092],[17.62431,49.44966],[17.64867,49.45184],[17.66423,49.43917],[17.67371,49.46101],[17.69198,49.4632],[17.71972,49.43786],[17.77521,49.43743],[17.78333,49.4549],[17.77792,49.45796],[17.80025,49.47062],[17.78671,49.48853],[17.83882,49.50425],[17.84288,49.52391],[17.88686,49.50862],[17.90107,49.51168],[17.91664,49.53832],[17.95656,49.53963],[17.99242,49.52303],[17.99784,49.50338],[18.12573,49.52041],[18.13588,49.50949],[18.16362,49.51692],[18.20355,49.48897],[18.25362,49.48242],[18.26783,49.4929],[18.30099,49.48984],[18.30708,49.46451],[18.36595,49.43306],[18.3734,49.42127],[18.36595,49.40598],[18.40385,49.39681],[18.41535,49.36754],[18.36595,49.3243],[18.18393,49.28718],[18.1846,49.26971],[18.14671,49.24787],[18.14468,49.22909],[18.15618,49.22953],[18.15483,49.21599],[18.13114,49.18891],[18.13656,49.16095],[18.10678,49.13431],[18.12235,49.11815],[18.11017,49.11334],[18.11558,49.0902],[18.08175,49.04608],[18.05739,49.02861],[18.02423,49.02119],[17.99107,49.02861],[17.92408,49.01988],[17.91393,49.0107],[17.88551,48.92772],[17.7813,48.9251],[17.78265,48.9168],[17.70348,48.86002],[17.64664,48.85434],[17.63514,48.86919],[17.6392,48.87836],[17.62228,48.87924],[17.60198,48.91025],[17.53837,48.92335],[17.55326,48.943],[17.54784,48.94781],[17.5086,48.95261],[17.49845,48.96659],[17.43416,48.95043],[17.39627,48.98057],[17.35702,48.97707],[17.36176,49.00546],[17.33604,49.01551],[17.27514,49.01376],[17.2677,49.03429],[17.25146,49.0308],[17.25078,49.03866],[17.22168,49.03342],[17.23183,49.06443],[17.21356,49.09282],[17.14522,49.07316]]]]}}]};
