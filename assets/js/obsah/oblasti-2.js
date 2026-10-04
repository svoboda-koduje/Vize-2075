/* ==========================================================================
   TEMATICKÉ OBLASTI 6–10: Infrastruktura a technika
   (energetika, ropa a suroviny, doprava, technologie a AI, urbanismus)
   ========================================================================== */
window.VIZE = window.VIZE || {};
VIZE.oblasti = VIZE.oblasti || [];

VIZE.oblasti.push(
{
  id: "energetika", num: 6, cat: "technika", icon: "bolt",
  title: "Energetika: od uhlí k decentralizované odolnosti",
  shrnuti: "Česko opouští uhlí rychleji, než se čekalo – ne kvůli politice, ale kvůli ceně povolenek a levnějším zdrojům. Do roku 2075 bude elektřina páteří dopravy i vytápění. Odolnost města určí, zda umí část energie vyrobit a uložit samo.",
  fakta: [
    "Výroba elektřiny v ČR 2025: jádro 42 %, uhlí 35 %, obnovitelné zdroje asi 17 %, plyn 5 %.{{ref:owid-elektrina}}",
    "Uhelné elektrárny Počerady a Chvaletice se mají přestat komerčně vyplácet kolem roku 2027.{{ref:konec-uhli}}",
    "Dva nové bloky Dukovany (KHNP): smlouva 6/2025, 407 mld. Kč, stavba od 2029, první blok 2036.{{ref:dukovany}}",
    "Spalovna odpadu (ZEVO) v Opatovicích posunuta na rok 2030.{{ref:zevo-2030}}"
  ],
  text: `
<h3>Výchozí stav</h3>
<p>Elektřinu v Česku dnes vyrábějí především jaderné elektrárny (42 % v roce 2025) a uhlí (35 %). Podíl uhlí klesl ze tří čtvrtin v roce 1990 na třetinu, roste podíl fotovoltaiky (téměř 6 %) a biomasy a bioplynu.{{ref:owid-elektrina}} Pro Hradec Králové má zásadní význam Elektrárna Opatovice, která dodává teplo do soustavy zásobující Hradec, Pardubice i Chrudim. Provozovatel deklaruje přechod z uhlí na nízkoemisní paliva do roku 2030; součástí je zařízení na energetické využití odpadu (ZEVO), jehož spuštění bylo kvůli povolovacím řízením posunuto na rok 2030.{{ref:eop-2030}}{{ref:zevo-2030}}</p>

<h3>Konec uhlí a jeho náhrada</h3>
<p>Analýza Fakta o klimatu z ledna 2026 ukazuje, že s cenou emisních povolenek kolem 90 eur za tunu se elektrárny skupiny Sev.en (Počerady, Chvaletice) přestanou vyplácet kolem roku 2027 a že jejich uzavření zvýší velkoobchodní cenu elektřiny jen mírně (o 0–2 €/MWh).{{ref:konec-uhli}} Přenosová soustava ČEPS však dříve varovala, že po roce 2030 bude Česko bez nových zdrojů závislé na dovozu.{{ref:ceps-2030}} Klíčovou investicí jsou dva nové jaderné bloky v Dukovanech: smlouva s korejskou KHNP byla podepsána v červnu 2025, náklady jsou odhadovány na 407 miliard korun (v cenách 2025), stavba prvního bloku má začít v roce 2029 a provoz v roce 2036.{{ref:dukovany}} V horizontu 2075 se diskutují i malé modulární reaktory, mimo jiné pro výrobu tepla.</p>

<h3>Ropa, plyn a geopolitika</h3>
<p>Válka s Íránem v roce 2026 připomněla, jak zranitelný je systém závislý na dovozu fosilních paliv. Uzavření Hormuzského průlivu znamenalo výpadek zhruba pětiny světových dodávek ropy a významné části zkapalněného plynu, cena Brent vystoupala na 118 USD a nafta v Česku podražila během dvou týdnů o 10 Kč na litr.{{ref:ropna-krize-2026}}{{ref:nafta-2026}} EU zároveň odložila emisní povolenky pro domácnosti a dopravu (ETS2) na rok 2028.{{ref:ets2-2040}} Pro domácnosti v Hradci Králové to znamená dlouhodobě vyšší a kolísavější ceny paliv i plynu.</p>

<h3>Decentralizace a komunitní energetika</h3>
<p>Nejsilnějším trendem do roku 2075 bude odklon od závislosti na jednom velkém zdroji. Energetická společenství – sdílení elektřiny mezi domácnostmi, školami a firmami – umožňuje česká legislativa od roku 2024 a v Hradci se postupně rozvíjejí.{{ref:komunitni-energetika}} Autoři kapitoly o energetice v knize <em>Nové ostrovy</em> rozlišují tři typy soběstačnosti: ostrovní provoz (nákladný, vhodný pro odlehlá místa), „bilanční“ soběstačnost, která je spíše účetní fikcí, a skutečnou schopnost spotřebovat energii tam a tehdy, kdy vzniká. Nejlépe podle nich vychází soběstačnost ulic a čtvrtí, nikoli jednotlivých domácností.{{ref:cilek-nove-ostrovy}} Václav Cílek doporučuje, aby město dokázalo vyrobit aspoň třetinu energie, kterou spotřebuje.</p>
<p>Do roku 2075 budou střechy veřejných budov, škol a bytových domů pokryty fotovoltaikou, sídliště jako Moravské Předměstí projdou hlubokými renovacemi a budou fungovat jako „aktivní budovy“ s bateriemi a tepelnými čerpadly. Mikrosítě (microgrids) umožní při výpadku páteřní sítě udržet v omezeném režimu čerpadla vody, nemocnici, komunikaci a teplou místnost. Geotermální energie a tepelná čerpadla země–voda budou vytápět a chladit velké areály, například fakultní nemocnici a univerzitní kampus; Česko má podle odborníků značný geotermální potenciál.{{ref:geotermie}}</p>

<h3>Vodík a nové technologie</h3>
<p>Vodík bude mít roli v průmyslu a těžké dopravě, plynárenská soustava připravuje vodíkovou páteř.{{ref:net4gas-h2}} Pro vytápění domácností je ale drahý a technicky problematický – autoři <em>Nových ostrovů</em> upozorňují na nevyřešené skladování, korozi potrubí a bezpečnost.{{ref:cilek-nove-ostrovy}} Rostoucím spotřebitelem elektřiny budou datová centra a umělá inteligence; IEA odhaduje zdvojnásobení jejich spotřeby do roku 2030.{{ref:iea-ai}}</p>

<h3>Zranitelnost</h3>
<p>Plně digitalizovaná energetická síť je efektivní, ale zranitelná kybernetickými útoky a geomagnetickými bouřemi. Blackouty nejčastěji přicházejí v kombinaci s extrémním počasím – za veder, námrazy nebo vichřice.{{ref:cilek-nove-ostrovy}} U plynu je obnova dodávek po výpadku pomalá: opětovné natlakování a kontrola spotřebičů ve městě může trvat 30–40 dní. Proto patří k odolnosti domácností i záložní způsob vaření a „teplá místnost“ pro zimu.</p>
`,
  grafy: ["elektrina-cr"],
  vyhled: {
    a: "Jádro, slunce, vítr a baterie, čtvrti jako energetické komunity. Město vyrobí třetinu své spotřeby, výpadky jsou lokální a krátké.",
    b: "Mix starých a nových zdrojů, vysoké ceny a energetická chudoba části domácností. Dovoz elektřiny v zimě.",
    c: "Nedostatek kapacit, řízené odpojování spotřebitelů, dlouhé blackouty a spalování odpadu a dřeva v domácnostech."
  },
  doporuceni: ["rec-energie", "rec-finance"]
},
{
  id: "ropa", num: 7, cat: "technika", icon: "barrel",
  title: "Ropa a suroviny: konec levné energie",
  shrnuti: "Ropa nekončí, ale končí ropa levná. Klesá energetická návratnost její těžby, rostou geopolitická rizika a s nimi ceny paliv, hnojiv, plastů a léčiv. Do roku 2075 se změní celé řetězce, které na ropě stojí.",
  fakta: [
    "Světová těžba ropy v roce 2025 dosáhla rekordu (asi 54,7 tis. TWh).{{ref:owid-ropa}}",
    "2026: největší výpadek nabídky v historii ropného trhu, uvolnění 400 mil. barelů ze zásob IEA.{{ref:ropna-krize-2026}}",
    "Energetická návratnost (EROI) ropy klesla z ~50:1 (1950) na zhruba 17:1 a u nekonvenčních zdrojů pod 10:1."
  ],
  text: `
<h3>Ropa jako páteř průmyslové civilizace</h3>
<p>Ropa není jen palivo. Je surovinou pro plasty, syntetická vlákna, léčiva, kosmetiku, asfalt, maziva a – prostřednictvím zemního plynu – pro dusíkatá hnojiva. Většina průmyslově vyráběného zboží ji na některém místě dodavatelského řetězce potřebuje. Těžba přitom stále roste a v roce 2025 dosáhla historického maxima.{{ref:owid-ropa}} Problém není v tom, že by ropa „došla“, ale v tom, kolik energie a peněz stojí její získání.</p>

<h3>Energetický útes</h3>
<p>Ukazatel EROI (energetická návratnost investice) vyjadřuje, kolik energie získáme za jednotku energie vloženou do těžby. V polovině 20. století dosahoval u konvenční ropy hodnot 50:1 i více, dnes se odhaduje kolem 17:1 a u dehtových písků, břidlic či hlubokomořských vrtů klesá pod 10:1. Některé modely předpokládají, že do roku 2050 může těžba sama spotřebovat podstatnou část energie, kterou přinese. Společnost s klesajícím energetickým přebytkem musí stále větší část zdrojů investovat do udržení vlastního provozu, což se projevuje inflací, tlakem na veřejné rozpočty a nižší životní úrovní. Tuto tezi podrobně rozvíjí podkladová studie <em>Civilizační trajektorie v post-ropné sféře</em> (ke stažení v sekci Dokumenty).</p>

<h3>Rok 2026: zkouška závislosti</h3>
<p>Válka s Íránem ukázala, jak rychle se zranitelnost mění v krizi. Mezinárodní energetická agentura označila uzavření Hormuzského průlivu za největší narušení nabídky v dějinách ropného trhu a koordinovala uvolnění 400 milionů barelů ze strategických zásob. Ropa Brent vystoupala na 118 USD za barel, Slovinsko zavedlo příděly pohonných hmot a Írán zasáhl katarský komplex na zkapalňování plynu Ras Laffan.{{ref:ropna-krize-2026}} Mezinárodní měnový fond přitom konstatoval, že dopad šoku na světovou ekonomiku tlumí investice do umělé inteligence – ekonomika se tak stává ještě citlivější na dodávky energie a čipů.</p>

<h3>Kritické suroviny</h3>
<p>Energetická transformace mění závislost na ropě v závislost na kovech: lithiu, niklu, kobaltu, mědi, grafitu a prvcích vzácných zemin. Jejich těžba a zpracování jsou soustředěny v několika zemích (zejména v Číně), což vytváří nové geopolitické páky. Do roku 2075 proto poroste význam recyklace („městské těžby“), náhradních materiálů (sodíkové baterie, železo-fosfátové články) a jednoduchých, opravitelných technologií.</p>

<h3>Co to znamená pro Hradec Králové</h3>
<p>Doprava, zásobování a zemědělství v regionu budou v příštích desetiletích čelit vyšším a kolísavějším cenám paliv. Výhodu získají čtvrti, kde lze většinu cest ujít pěšky nebo na kole, a domácnosti s nízkými fixními náklady. Elektrifikace městské dopravy (trolejbusy a elektrobusy), železnice a nákladní kola sníží zranitelnost. Plasty se budou recyklovat a nahrazovat, léčiva vyráběná z ropných derivátů nezmizí, ale jejich výroba se bude přesouvat k biotechnologickým postupům.</p>
`,
  grafy: ["ropa-svet"],
  vyhled: {
    a: "Řízený energetický sestup: elektrifikace, recyklace a efektivita snížily závislost na ropě na zlomek dnešní úrovně.",
    b: "Ropa zůstává drahou a nestálou komoditou; opakované cenové šoky zpomalují ekonomiku a zvyšují nerovnost.",
    c: "Neřízený sestup: přídělové systémy, rozpad dodavatelských řetězců, nedostatek hnojiv a léčiv."
  },
  doporuceni: ["rec-doprava", "rec-finance"]
},
{
  id: "doprava", num: 8, cat: "technika", icon: "train",
  title: "Doprava: kolo, vlak a sdílená mobilita",
  shrnuti: "Rovinatý Hradec Králové je přirozeně městem cyklistů. Vysokorychlostní trať do Prahy byla v roce 2026 odsunuta za horizont 2040. Mobilita roku 2075 bude elektrická, sdílená a méně závislá na vlastním autě – ale i zranitelnější vůči výpadkům sítí.",
  fakta: [
    "Leden 2026: vláda zúžila program VRT na páteř Drážďany–Praha–Brno–Ostrava; trasa Praha–Hradec–Vratislav odsunuta.{{ref:vrt-omezeni}}",
    "První česká VRT Prosenice–Ostrava získala souhlas EIA (2025), dokončení se předpokládá kolem roku 2033.{{ref:vrt-prvni}}",
    "Březen 2026: nafta během dvou týdnů dražší až o 10 Kč/l.{{ref:nafta-2026}}"
  ],
  text: `
<h3>Vysokorychlostní železnice: odklad</h3>
<p>Původní vize počítala s vysokorychlostní tratí RS5 Praha – Hradec Králové – Vratislav, která by zkrátila cestu do Prahy na zhruba půl hodiny. V lednu 2026 však vicepremiér Karel Havlíček oznámil, že vláda bude pokračovat jen v páteřní síti Drážďany – Praha – Brno s odbočkami na Ostravu a Břeclav; trasy RS3 do Mnichova a RS5 do Vratislavi byly kvůli poměru nákladů a přínosů odsunuty. Zahájení stavby páteře se posouvá na rok 2028 a první vlaky se čekají na začátku 30. let.{{ref:vrt-omezeni}} Polská strana přitom své rychlovlaky už objednává. Pro Hradec Králové to znamená, že realistický scénář do roku 2075 počítá spíše s modernizací stávajících tratí a s VRT nejdříve po roce 2040.</p>

<h3>Konec automobilové éry?</h3>
<p>Vlastní auto zůstane v roce 2075 pro část obyvatel důležité, hlavně na venkově. Ve městě však poroste význam mobility jako služby (MaaS): sdílených elektromobilů, autonomních minibusů na objednávku, městské hromadné dopravy a jednotné jízdenky v aplikaci. Ministerstvo dopravy připravuje legislativní a technický rámec pro automatizovaná vozidla.{{ref:autonomni-mobilita}} Autonomní doprava však přináší i riziko: při výpadku sítě, satelitní navigace nebo kybernetickém útoku se může zastavit celý systém. Proto si musí město zachovat i „hloupé“ záložní varianty – trolejbusy, které jezdí i bez dat, cyklostezky a chodník.</p>

<h3>Kolo a pěší město</h3>
<p>Hradec má díky rovinatému terénu, tradici a síti cyklostezek výborné podmínky. Elektrokola a nákladní kola rozšíří dojezdovou vzdálenost i pro seniory a zásobování. Do roku 2075 se ulice v centru budou navrhovat primárně pro chodce, cyklisty a stín stromů. Koncept „města krátkých vzdáleností“, kde jsou služby, škola a obchod do patnácti minut chůze, je zároveň nejlevnější adaptací na drahou energii.</p>

<h3>Dojíždění učitele do Pardubic</h3>
<p>Modelový obyvatel z původního zadání – učitel bydlící na jihovýchodním okraji Hradce a dojíždějící vlakem do Pardubic – bude v roce 2075 pravděpodobně využívat elektrifikovanou regionální železnici s vyšší frekvencí spojů a městskou dopravu s návazností na vlak. V optimistickém scénáři jezdí taktově každých 15 minut, v pesimistickém jsou spoje kvůli úsporám a výpadkům nespolehlivé a kolo se stává nejjistějším dopravním prostředkem.</p>

<h3>Doprava a energie</h3>
<p>Doprava je největším spotřebitelem ropy. Rok 2026 ukázal, že stačí několik týdnů blokády Hormuzského průlivu a nafta podraží o čtvrtinu.{{ref:nafta-2026}} Elektrifikace osobní, veřejné i lehké nákladní dopravy proto není jen klimatickým, ale i bezpečnostním opatřením. Při blackoutu však nejedou ani čerpací stanice, ani nabíječky – odolná mobilita kombinuje elektřinu, kolo a pěší dostupnost.</p>
`,
  grafy: [],
  vyhled: {
    a: "Taktová elektrifikovaná železnice, VRT po roce 2040, ulice pro chodce a kola, sdílená mobilita dostupná všem.",
    b: "Auto zůstává dominantní, ale drahé. Hromadná doprava se modernizuje pomalu, kongesce a nehody přetrvávají.",
    c: "Drahá a nedostupná paliva, rozpadající se infrastruktura. Kolo a chůze jako jediná spolehlivá doprava."
  },
  doporuceni: ["rec-doprava"]
},
{
  id: "technologie", num: 9, cat: "technika", icon: "chip",
  title: "Technologie a umělá inteligence",
  shrnuti: "Umělá inteligence se za tři roky stala běžnou součástí života většiny lidí. Do roku 2075 bude prostupovat správu města, medicínu, vzdělávání i práci. Rozhodující otázkou není, co AI dokáže, ale kdo ji ovládá a jak závislí na ní budeme.",
  fakta: [
    "Generativní AI dosáhla 53% rozšíření v populaci za tři roky; používá ji 88 % organizací.{{ref:ai-index-2026}}",
    "Zdokumentované incidenty s AI: 233 (2024) → 362 (2025).{{ref:ai-index-2026}}",
    "Spotřeba elektřiny datových center se má do roku 2030 zhruba zdvojnásobit (asi 945 TWh).{{ref:iea-ai}}",
    "Experti v průměru přisuzují 50% pravděpodobnost obecné AI (AGI) období 2040–2061, podnikatelé dřívějším letům.{{ref:agi-predikce}}"
  ],
  text: `
<h3>Rychlost změny</h3>
<p>Zpráva Stanford AI Index 2026 popisuje bezprecedentní tempo: generativní umělá inteligence dosáhla za tři roky 53% rozšíření v populaci, používá ji 88 % organizací a přes 80 % amerických středoškoláků a vysokoškoláků. Nejlepší modely se v řadě náročných testů vyrovnají lidským expertům; v programování se úspěšnost v testu SWE-bench Verified zvedla během roku z přibližně 60 % téměř na 100 %. Odstup mezi americkými a čínskými modely se zúžil na necelá 3 %. Současně vzrostl počet zdokumentovaných incidentů a zpráva konstatuje, že bezpečnost a vládnutí nedrží krok s technologickým pokrokem.{{ref:ai-index-2026}}</p>

<h3>Umělá inteligence ve správě města</h3>
<p>Do roku 2075 bude řada rozhodovacích procesů – řízení dopravy, distribuce energie a vody, správa budov, triáž ve zdravotnictví – automatizována. To přinese efektivitu, ale také riziko „technokratické slepoty“: algoritmy optimalizují podle zadaných kritérií, která nemusí odpovídat lidským hodnotám, a jejich chyby se šíří rychle a ve velkém. Martin Rees varuje před ztrátou lidské kontroly, výzkumníci popisují scénář <em>postupného zbavování moci</em> (gradual disempowerment), kdy lidstvo nepředá rozhodování strojům najednou, ale v řadě drobných, ekonomicky racionálních kroků.{{ref:rees}}</p>

<h3>Singularita a obecná AI</h3>
<p>Kdy a zda vznikne obecná umělá inteligence (AGI), zůstává nejisté. Analýza více než deseti tisíc předpovědí ukazuje, že podnikatelé a predikční trhy očekávají AGI kolem roku 2030, akademičtí experti s 50% pravděpodobností spíše v období 2040–2061.{{ref:agi-predikce}}{{ref:singularita-etc}} Pro rok 2075 je tedy reálné, že budeme žít ve světě, kde stroje překonávají lidi ve většině kognitivních úloh. Otázkou je, zda budou sloužit široké společnosti, nebo úzkým elitám.</p>

<h3>Fyzická stopa digitálního světa</h3>
<p>Digitální svět stojí na fyzických zdrojích: čipech vyráběných v několika továrnách světa, vzácných kovech, elektřině a vodě na chlazení. Mezinárodní energetická agentura odhaduje, že spotřeba elektřiny datových center se do roku 2030 zhruba zdvojnásobí.{{ref:iea-ai}} Výpadek elektřiny, sítě nebo dodávek čipů proto může ochromit „chytré město“ rychleji než město s jednoduchými, ručně ovladatelnými zálohami.</p>

<h3>Kybernetická bezpečnost a kvantové počítače</h3>
<p>Kvantové počítače mohou v příštích desetiletích prolomit dnes používané šifrování, proto se už nyní přechází na postkvantovou kryptografii. Kybernetické útoky na nemocnice, vodárny a energetiku se stávají běžnou součástí hybridních konfliktů. Jan K. Šípek v <em>Nových ostrovech</em> doporučuje jednoduché zásady: zálohovat, zálohovat, zálohovat; počítat s „hnilobou internetu“ (mizením obsahu); decentralizovat komunikaci a mít offline zálohy klíčových dokumentů.{{ref:cilek-nove-ostrovy}}</p>
`,
  grafy: [],
  vyhled: {
    a: "AI jako veřejná infrastruktura pod demokratickou kontrolou, posiluje vzdělání, zdraví a správu; lidé si udržují kognitivní dovednosti.",
    b: "AI všudypřítomná, ale ovládaná několika korporacemi; dohled, manipulace a závislost; propast mezi uživateli a tvůrci.",
    c: "Selhání nebo zneužití AI v kritické infrastruktuře, kybernetické války, kolaps důvěry v informace."
  },
  doporuceni: ["rec-digital", "rec-prace"]
},
{
  id: "urbanismus", num: 10, cat: "technika", icon: "city",
  title: "Urbanismus a bydlení: město, které přežije vedra",
  shrnuti: "Hradec Králové, kdysi „salon republiky“, se musí stát „klimatickým salonem“: městem stínu, vody a krátkých vzdáleností. Panelová sídliště mají v sobě velký potenciál odolnosti, pokud se z nich stanou fungující sousedství.",
  fakta: [
    "Adaptační strategie města Hradec Králové vznikla s podporou Fondů EHP.{{ref:adaptace-hk}}",
    "Cílek: polévání betonových ploch ráno a zatažené závěsy snižují teplotu v domě; stromy chladí o 6–12 °C.{{ref:cilek-nove-ostrovy}}",
    "Projekt Sousedství v areálu bývalé koželužny: 150 bytů v pasivním standardu se sdílením energie.{{ref:sousedstvi}}"
  ],
  text: `
<h3>Klimatický urbanismus</h3>
<p>Hradec Králové, proslulý Gočárovým urbanismem, bude v roce 2075 potřebovat novou vrstvu plánování: stín, vodu a vítr. Václav Cílek připomíná, že plánování nových čtvrtí v teplých oblastech začíná analýzou převládajícího větru, podle něhož se orientují ulice, aby se město provětrávalo a ochlazovalo.{{ref:cilek-nove-ostrovy}} Velké zpevněné plochy – náměstí, parkoviště, křižovatky – potřebují stínění stromy a plachtami, propustné povrchy a vodní prvky. Tmavé fasády a střechy, které se v létě ohřívají až na 70 °C, budou nahrazeny světlými a zelenými.</p>
<p>Pasivní ochlazování budov je levnější než klimatizace a nespotřebovává energii: až 40 % tepla přichází okny, proto stačí ráno vyvětrat a přes den zatáhnout závěsy či venkovní žaluzie; dobře nastavené žaluzie snižují tepelnou zátěž na jižní straně až o 70 %.{{ref:cilek-nove-ostrovy}} Velké klimatizační jednotky naopak ohřívají venkovní vzduch a zhoršují tepelný ostrov.</p>

<h3>Město dovnitř, ne do krajiny</h3>
<p>Zábor zemědělské půdy je v době sucha a klesajících výnosů neudržitelný. Město se proto bude rozvíjet hlavně „dovnitř“ – na brownfieldech bývalých továren (ZVU, koželužna v Kuklenách, severní průmyslová zóna) a dostavbou proluk. Projekt Sousedství v areálu bývalé koželužny počítá se 150 byty v pasivním standardu a se sdílením energie mezi domy.{{ref:sousedstvi}} Cílem je město krátkých vzdáleností, kde se většina cest dá ujít nebo ujet na kole.</p>

<h3>Panelová sídliště: slabina, nebo síla?</h3>
<p>Zhruba polovina bytů v Česku je v bytových domech, často panelových, které jsou při krizi považovány za nejzranitelnější: závisí na výtazích, čerpadlech vody, dálkovém teple a nucené kanalizaci. <em>Nové ostrovy</em> však ukazují, že panelový dům může být i „pevností“ – pokud má fungující samosprávu. Doporučují při krizi zavřít jeden vchod, u hlavního vchodu zřídit stolek s dobrovolníky, obejít byty a zjistit nejen potřeby, ale i to, co kdo může nabídnout, a navázat spolupráci se sousedními domy.{{ref:cilek-nove-ostrovy}} Sídliště jako Moravské Předměstí, Slezské Předměstí nebo Labská kotlina mají hustotu, která umožňuje sdílet energii, vodu i služby.</p>

<h3>Dostupné bydlení a stárnutí</h3>
<p>Ceny bydlení rostou rychleji než příjmy. Do roku 2075 poroste význam družstevního, obecního a sdíleného bydlení (co-housing), komunitních domů pro seniory a bezbariérových úprav. Stárnoucí populace potřebuje služby v docházkové vzdálenosti, lavičky ve stínu, veřejné toalety a pitné fontány.</p>

<h3>Taktický urbanismus pro krize</h3>
<p>Cílek navrhuje, aby města měla krizové kouty a pravidelné komunikační hodiny, kdy se před radnicí sdělují informace; aby školy a knihovny fungovaly jako informační a evakuační centra; aby školky a školy měly větší filtry na vodu a aby byla zajištěna alespoň jedna otevřená a chráněná lékárna.{{ref:cilek-nove-ostrovy}} Tyto nízkonákladové kroky jsou součástí scénáře „Resilientní město“ a lze je zavádět už dnes.</p>
`,
  grafy: [],
  diagram: "panelak",
  vyhled: {
    a: "Modro-zelené město se stínem a vodou na každém náměstí, sídliště jako energetické a sousedské komunity.",
    b: "Bohaté čtvrti s klimatizací a zelení, chátrající sídliště s tepelným stresem. Gentrifikace a vytlačování.",
    c: "Rozpad na izolované enklávy, opevněné rezidence a neudržované sídliště bez výtahů, vody a tepla."
  },
  doporuceni: ["rec-komunita", "rec-horko"]
}
);
