/* ==========================================================================
   ÚVOD, TEORETICKÝ RÁMEC, METODIKA, ROK 2026 A UKAZATELE
   Citace se zapisují jako {{ref:klíč}} — klíče jsou v souboru zdroje.js.
   ========================================================================== */
window.VIZE = window.VIZE || {};

VIZE.aktualizace = "říjen 2026";

/* Ukazatele na úvodní stránce (stav k 4. 10. 2026) */
VIZE.ukazatele = [
  { label: "Globální oteplení v roce 2025 nad předindustriální úrovní", value: "1,47", unit: "°C", note: "Průměr let 2023–2025 poprvé nad 1,5 °C", ref: "c3s-2025", tag: "svět" },
  { label: "Koncentrace CO₂ na Mauna Loa, květen 2026", value: "432", unit: "ppm", note: "Meziročně +1,8 ppm; předindustriálně ~280 ppm", ref: "co2-432", tag: "svět" },
  { label: "Srážky v Česku za březen a duben 2026", value: "32", unit: "mm", note: "Normál 85 mm – nejsušší jaro od roku 1961", ref: "sucho-65let", tag: "sucho 2026", warn: true },
  { label: "Absolutní teplotní rekord Česka, Doksany 28. 6. 2026", value: "41,9", unit: "°C", note: "Léto 2026 druhé nejteplejší od 1961 (+1,8 °C)", ref: "leto-2026", tag: "vedra 2026", warn: true },
  { label: "Narozené děti v Česku v roce 2025", value: "77 600", unit: "", note: "Nejméně od roku 1785; plodnost 1,28 dítěte na ženu", ref: "csu-2025", tag: "demografie" },
  { label: "Nejvyšší cena ropy Brent během války s Íránem", value: "118", unit: "USD/barel", note: "31. 3. 2026; uzavření Hormuzského průlivu", ref: "ropna-krize-2026", tag: "energie", warn: true },
  { label: "Probíhající státní ozbrojené konflikty ve světě (2025)", value: "65", unit: "", note: "57 vnitrostátních a 8 mezistátních (UCDP)", ref: "owid-konflikty", tag: "bezpečnost" },
  { label: "Globální dluh v 1. pololetí 2026", value: "365", unit: "bil. USD", note: "Nový rekord, +10 bilionů za půl roku", ref: "dluh-iif", tag: "ekonomika" }
];

VIZE.intro = `
<p>Rok 2075 leží pro Hradec Králové za hranicí běžného strategického plánování, ale stále v dosahu života dnešních dětí a studentů. Ti, kdo dnes nastupují na střední školu, budou v roce 2075 v důchodovém věku. Tento web proto nehledá jedinou „správnou“ předpověď. Mapuje síly, které už dnes působí, odhaduje jejich směr a sílu a skládá z nich tři obhajitelné scénáře vývoje krajského města na soutoku Labe a Orlice.</p>
<p>Aktualizace z října 2026 vychází z roku, který se do klimatické a bezpečnostní historie zapíše jako zlomový. Jaro 2026 bylo v Česku nejsušší od roku 1961, v červnu padl absolutní teplotní rekord 41,9 °C a v létě trpěla půdním suchem většina území.{{ref:sucho-65let}}{{ref:leto-2026}} Válka USA a Izraele s Íránem uzavřela na několik týdnů Hormuzský průliv a vyvolala největší výpadek nabídky ropy v dějinách trhu.{{ref:ropna-krize-2026}} Válka na Ukrajině pokračuje pátým rokem, počet narozených dětí v Česku klesl na historické minimum a umělá inteligence se za tři roky stala běžným nástrojem většiny populace.{{ref:csu-2025}}{{ref:ai-index-2026}} Žádný z těchto jevů není izolovaný. Sucho zdražuje potraviny, drahá ropa zdražuje dopravu a hnojiva, stárnoucí společnost hůř snáší vedra a napětí ve světě oslabuje ochotu financovat dlouhodobou adaptaci.</p>
<p>Analýza pracuje se dvaceti tematickými oblastmi – od vody, krajiny a energetiky přes zdraví, demografii a technologie až po geopolitiku a duchovní život. Tvrdá data (klimatické řady ČHMÚ a Copernicus, demografické projekce ČSÚ a OSN, energetické statistiky) propojuje se „měkkými“ faktory lidského rozhodování. Interpretačním rámcem zůstávají tři autoři: neuropatolog František Koukolík (patologie moci a skupinová hloupost), geolog Václav Cílek (kolaps, regenerace a odolnost) a astrofyzik Martin Rees (technologická a existenční rizika).</p>
<p>Město tu chápeme jako živý sociálně-ekologický organismus. Jeho budoucnost neurčují jen fyzikální limity – kolik vody zadrží krajina, kolik energie vyrobíme, jak horká budou léta –, ale i kvalita kolektivního rozhodování. Právě na průsečíku tvrdých dat a lidské psychiky se rozhoduje, zda se Hradec Králové stane odolným „modro-zeleným“ městem, městem nekonečného improvizování, nebo souostrovím izolovaných enkláv.</p>
`;

VIZE.metodika = `
<h3>Jak lze rozumně „extrapolovat“ padesát let dopředu</h3>
<p>Přímá extrapolace trendů selhává už po několika letech, protože složité systémy procházejí zlomy, zpětnými vazbami a nečekanými událostmi. Strategický foresight proto kombinuje čtyři vrstvy poznání s odlišnou mírou jistoty:</p>
<ul>
<li><strong>Fyzikální setrvačnost (vysoká jistota).</strong> Oteplení, které už „je v potrubí“ oceánu, pokles zásob podzemní vody nebo věková struktura obyvatel se do roku 2075 nezmění rozhodnutím jedné vlády. Teplota do poloviny století poroste téměř ve všech scénářích emisí; projekce pro Česko počítají s oteplením o 1,2–2,5 °C do roku 2050 oproti období 1981–2010.{{ref:oazk-2025}}</li>
<li><strong>Strukturální trendy (střední jistota).</strong> Stárnutí populace, digitalizace, přechod od uhlí, zdražování vody a ropy. Jejich směr známe, rychlost závisí na politice a ekonomice.</li>
<li><strong>Rozhodnutí a hodnoty (nízká jistota).</strong> Investice do adaptace, kvalita vládnutí, míra solidarity. Zde se jednotlivé scénáře nejvíc rozcházejí.</li>
<li><strong>Divoké karty a černé labutě (neznámá pravděpodobnost).</strong> Kolaps oceánského proudění AMOC, extrémní sluneční bouře, pandemie syntetického patogenu, velká sopečná erupce, válka velmocí.</li>
</ul>
<h3>Scénáře, ne proroctví</h3>
<p>Tři scénáře (Resilientní město, Město adaptace a Fragmentované město) neříkají, co se stane, ale vymezují prostor, ve kterém se budoucnost pravděpodobně odehraje. Každý scénář je vnitřně konzistentní kombinací hodnot klíčových proměnných. U každé oblasti uvádíme, jak by vypadala v jednotlivých scénářích, a v sekci Scénáře doplňujeme takzvané <em>signposty</em> – pozorovatelné ukazatele, podle kterých lze v příštích letech poznat, kterým směrem se vývoj ubírá. Sucho roku 2026 je dobrým příkladem: jde o „zkoušku nanečisto“, která ukazuje, jak region obstojí v podmínkách, které budou kolem roku 2050 běžné.</p>
<h3>Teorie her a pravděpodobnost</h3>
<p>Řada problémů roku 2075 má strukturu <em>tragédie obecní pastviny</em>: každý jednotlivec, obec i stát má krátkodobý zájem čerpat vodu, levnou energii a půdu, i když společný zdroj tím vyčerpává. Spolupráce vzniká tam, kde se hra opakuje, kde jsou pravidla vymahatelná a kde lidé vidí výsledky svého úsilí – tedy spíš v obcích, sousedstvích a povodích než v abstraktní „globální“ rovině. Proto web klade důraz na lokální odolnost: na úrovni domu, ulice a povodí jsou účinky vlastních rozhodnutí vidět nejrychleji.</p>
<h3>Míra jistoty a jazyk</h3>
<p>Formulace „téměř jistě“, „pravděpodobně“ a „možná“ používáme v duchu konvencí IPCC.{{ref:ipcc-ar6}} Fakta ze současnosti jsou doložena zdroji; popisy roku 2075 jsou scénářové úvahy, nikoli předpovědi.</p>
`;

VIZE.teorie = {
  koukolik: {
    title: "Homo sapiens stupidus a patologie moci",
    author: "František Koukolík",
    shrnuti: "Technologický pokrok neznamená pokrok morální ani kognitivní. Krize přitahují k moci lidi, kteří ji umí získat, ne nutně ty, kdo ji umí dobře užít.",
    text: `
<p>Neuropatolog František Koukolík ve svých knihách <em>Mocenská posedlost</em>, <em>Vzpoura deprivantů</em>, <em>Jak si lidé hrají?</em> a v esejích ze „třetí kultury“ popisuje mechanismy, které formují politické rozhodování nezávisle na letopočtu.{{ref:koukolik-mocenska}}{{ref:koukolik-eseje}}{{ref:koukolik-hry}} Klíčový je pro něj <strong>syndrom mocenské pýchy (hybris)</strong> – ztráta kontaktu s realitou, přehnané sebevědomí a neschopnost sebereflexe u lidí, kteří dlouho drží moc. Druhým pojmem jsou <strong>deprivanti</strong>, jedinci s rysy antisociální poruchy osobnosti, kteří v dobách nejistoty umějí nabídnout jednoduchá řešení a soustředit moc.</p>
<p>Pro Hradec Králové v horizontu padesáti let z toho plyne riziko, že ani dostupnost kvalitních dat o suchu, klimatu či demografii nemusí vést k racionálním rozhodnutím. Koukolík popisuje <strong>skupinovou hloupost</strong>: kolektiv, který nedokáže využít inteligenci svých členů, protože konformita, strach nebo zájmové sítě převáží nad poznáním. Sucho roku 2026 je pro tuto tezi testem – zda se z něj stane impuls k systematickému zadržování vody, nebo jen další mediální vlna, která odezní s prvním deštěm.</p>
<p>Fenomén <strong>demokratury</strong>, tedy formální demokracie, v níž o zásadních věcech rozhodují úzké ekonomické a mediální skupiny, je pro město roku 2075 rizikem hlavně v územním plánování, kde se střetávají zájmy developerů s potřebou chránit vodu, zeleň a půdu. Koukolík ale nabízí i protilék: vzdělání, kritické myšlení, nezávislé instituce a kulturu, která si váží expertů, aniž by jim slepě věřila.</p>
<p>Nejnovější vývoj – rostoucí polarizace, informační války, deepfakes a tlak na zjednodušování složitých témat – Koukolíkova varování spíše potvrzuje. Neuroplasticita ale funguje oběma směry: prostředí, které odměňuje pozornost, spolupráci a ověřování faktů, dokáže kognitivní kulturu společnosti zlepšit.</p>`
  },
  cilek: {
    title: "Kolaps, regenerace a odolnost",
    author: "Václav Cílek",
    shrnuti: "Kolaps není konec, ale zjednodušení systému, který narazil na své meze. Odolnost vzniká v rodinách, sousedstvích a obcích – a začíná péčí o vodu a krajinu.",
    text: `
<p>Geolog a klimatolog Václav Cílek poskytuje historický a filozofický rámec pro chápání cyklické povahy civilizací. Kolaps pro něj není katastrofický konec, ale zjednodušení příliš složitého systému, který vyčerpal své zdroje. Klíčovým pojmem je <strong>resilience</strong> – schopnost absorbovat šok, reorganizovat se a zachovat si základní funkce i identitu.{{ref:cilek-vek}}</p>
<p>V knize <em>Ruka noci podaná</em> (2018) Cílek s Ferdinandem Šmikmátorem formuloval program <strong>„něžného preperství“</strong>: rodinná připravenost bez militantní izolace, motivovaná láskou, ne strachem.{{ref:cilek-ruka}} Navazující kolektivní kniha <em>Nové ostrovy</em> (2024) přesouvá důraz od jednotlivce ke společenství.{{ref:cilek-nove-ostrovy}} Za hlavní vnitřní riziko považuje ztrátu soudržnosti, za hlavní vnější riziko sociální dopady klimatické změny. Popisuje, že krize „chodí spolu“ – blackouty nejčastěji přicházejí za veder, námrazy nebo vichřic, nedostatek vody vede k rabování – a že přírodní katastrofy jsou vždy zároveň sociálními krizemi.</p>
<p>Pro města navrhuje <strong>taktický urbanismus</strong>: krizové kouty a pravidelné „komunikační hodiny“ na radnicích, školy a knihovny jako informační a evakuační centra, větší filtry na vodu ve školkách a školách, alespoň jednu chráněnou otevřenou lékárnu a samosprávu panelových domů. Města by měla umět vyrobit aspoň třetinu spotřebované energie, přičemž lépe než soběstačné domácnosti fungují soběstačné ulice a čtvrti. Pro vodu doporučuje zátěžový test: jak by město zvládlo <strong>tříleté sucho a třicetiprocentní omezení dodávek vody</strong>.</p>
<p>Krajinu Cílek chápe jako paměť i zdroj odolnosti. Jeho „úplně nejjednodušší návod“ na zadržování vody shrnuje tři zásady: vodu zadržet tam, kam spadla; prodloužit „cestu vodní kapky“; a zpomalit ji příčnými překážkami, které ji rozlijí do větší vsakovací plochy. Jako nejlepší místa k životu do budoucna označuje spíše menší a střední města s vlastními zdroji vody a dobrým začleněním do krajiny – což je pro Hradec Králové výzva i příležitost.</p>`
  },
  rees: {
    title: "Technologická rizika a „Naše poslední hodina“",
    author: "Martin Rees",
    shrnuti: "Poprvé v dějinách má jeden druh schopnost zničit sám sebe i biosféru. Rizika nevycházejí jen ze zlého úmyslu, ale i z omylu a z rychlosti, s jakou technologie předbíhají instituce.",
    text: `
<p>Britský kosmolog Martin Rees v knize <em>Naše poslední hodina</em> varuje, že 21. století je prvním obdobím, kdy má člověk schopnost zničit biosféru i sám sebe – omylem nebo zlým úmyslem.{{ref:rees}} Za zvlášť nebezpečnou považuje <strong>demokratizaci destrukce</strong>: malá skupina nebo jednotlivec může díky biotechnologiím, kybernetickým nástrojům nebo umělé inteligenci způsobit škody, které dříve vyžadovaly státní aparát.</p>
<p>Pro Hradec Králové jako univerzitní, lékařské a farmaceutické centrum to znamená specifická rizika i odpovědnost. Biologická bezpečnost laboratoří, kybernetická ochrana nemocnice a vodárny či odolnost energetických sítí jsou lokální témata se širokými dopady. Syntetická biologie zároveň umožňuje léky na míru a rychlý vývoj vakcín – stejný nástroj slouží oběma stranám.{{ref:synbio}}</p>
<p>Od vydání knihy se Reesova varování v mnohém zpřesnila. Umělá inteligence se za tři roky stala běžným nástrojem více než poloviny populace a schopnosti nejvýkonnějších modelů v některých testech dosahují úrovně odborníků, zatímco regulace a bezpečnostní výzkum zaostávají.{{ref:ai-index-2026}} Hodiny posledního soudu Bulletinu atomových vědců ukazují v roce 2026 jen 85 sekund do půlnoci, nejméně v historii.{{ref:doomsday-2026}}</p>
<p>Rees přesto není fatalista. Zdůrazňuje, že stejná věda, která rizika vytváří, umožňuje jejich zvládnutí – pokud se společnost naučí myslet v dlouhých časových horizontech, investovat do prevence a podporovat mezinárodní spolupráci. Pro jednotlivce z toho plyne jednoduchý závěr: odolnost není jen otázkou zásob, ale i porozumění technologiím, které denně používáme.</p>`
  }
};

/* Rok 2026 – samostatná stránka */
VIZE.rok2026 = {
  uvod: `Rok 2026 nebyl katastrofou, ale zatěžkávací zkouškou. Na několika místech současně ukázal, jak blízko jsme k mezím systémů, na kterých stojí běžný život – vody v krajině, dodávek energie, potravin i bezpečnosti. Pro vizi roku 2075 je cenný tím, že předvedl podmínky, které budou kolem poloviny století běžné, a reakce, které na ně společnost má.`,
  bloky: [
    {
      id: "sucho",
      title: "Sucho: nejsušší jaro od roku 1961",
      dry: true,
      text: `
<p>Už předchozí rok 2025 byl srážkově podprůměrný (83 % normálu) a teplejší než normál.{{ref:rok-2025-cr}} Na jaře 2026 pak v Česku za březen a duben spadlo v průměru jen 32 mm srážek proti normálu 85 mm; duben 2026 byl nejsušším dubnem od začátku územních řad v roce 1961.{{ref:sucho-65let}} ČHMÚ koncem května uvedl, že hladiny v hlubokých vrtech podzemní vody byly v dubnu a květnu nejnižší od roku 1991 a sucho signalizovalo přes 80 profilů na tocích.{{ref:chmu-sucho-2026}}</p>
<p>V létě se sucho prohloubilo. Podle InterSucha mělo v srpnu asi 70 % území nasycení půdy pod 10 % a přes polovinu území postihlo extrémní sucho; vysoký vodní stres vykazovalo kolem 60 % lesů. Délka období s nedostatkem půdní vláhy byla rekordní a krajině chyběly stovky milimetrů srážek.{{ref:intersucho-akt}} Povodí Labe hlásilo mimořádné sucho na více než polovině svého území.{{ref:sucho-pla-2026}} Za leden až srpen spadlo v Česku asi 72 % normálního srážkového úhrnu.{{ref:chmu-uzemni}}</p>
<p>Dopady na zemědělství byly výrazné: ČSÚ v prvním odhadu na začátku července očekával pokles sklizně základních obilovin o 15,9 % a řepky o 17,1 % proti roku 2025, InterSucho odhadovalo škody v řádu 20 miliard korun a propad produkce zeleniny o 30 %.{{ref:csu-odhad-2026}}{{ref:intersucho-akt}} Sucho přitom nebylo jen české – sklizeň pšenice v EU se podle odhadů snížila zhruba ze 135 na 126 milionů tun.{{ref:sklizen-2026}}</p>`,
      graf: ["cr-2026-srazky"]
    },
    {
      id: "vedra",
      title: "Vedra: 41,9 °C v Doksanech",
      dry: true,
      text: `
<p>Léto 2026 bylo s průměrnou teplotou 19,4 °C (o 1,8 °C nad normálem 1991–2020) druhé nejteplejší od roku 1961, jen o desetinu stupně za létem 2019. Přišly dvě extrémní vlny veder, v nichž se na nejteplejších místech překročilo 40 °C. Dne 28. června naměřila stanice Doksany 41,9 °C, což je nový absolutní teplotní rekord Česka a vůbec první překročení čtyřicítky v červnu. Na nejteplejších stanicích se vyskytlo až 51 tropických dnů a rekordních 35 tropických nocí.{{ref:leto-2026}}</p>
<p>Celosvětově byl srpen 2026 nejteplejším srpnem v historii měření (1,65 °C nad předindustriální úrovní) za přispění jedné z nejsilnějších epizod El Niño. Západní Evropa zažila nejteplejší léto, Rýn, Dunaj i Dněpr měly kriticky nízké průtoky.{{ref:c3s-srpen-2026}} Rozvíjející se El Niño naznačuje, že rok 2027 může přinést nové globální rekordy.</p>`,
      graf: ["cr-2026-teplota"]
    },
    {
      id: "ropa",
      title: "Ropný šok: válka s Íránem a Hormuzský průliv",
      text: `
<p>Dne 28. února 2026 zahájily USA a Izrael údery na Írán; při nich zahynul i nejvyšší vůdce Alí Chameneí. Írán odpověděl raketovými a dronovými útoky na Izrael, americké základny a státy Perského zálivu a zablokoval Hormuzský průliv, kudy běžně prochází zhruba pětina světových dodávek ropy a velká část zkapalněného plynu.{{ref:valka-iran}} Mezinárodní energetická agentura označila výpadek za největší narušení nabídky v dějinách ropného trhu a koordinovala uvolnění 400 milionů barelů ze strategických zásob.{{ref:ropna-krize-2026}}</p>
<p>Cena ropy Brent vystoupala 31. března na 118 USD za barel. V Česku nafta během dvou březnových týdnů podražila v některých okresech o více než 10 Kč na litr; Slovinsko jako první země EU zavedlo přídělový systém pohonných hmot.{{ref:nafta-2026}}{{ref:ropna-krize-2026}} Křehké příměří z dubna a červnové memorandum z Islámábádu vydržely jen do července, kdy boje kolem průlivu obnovily.{{ref:valka-iran}} Pro vizi roku 2075 je ponaučení jasné: závislost dopravy, zemědělství (hnojiva, nafta) a chemie na ropě je zranitelnost, kterou nelze odstranit přes noc, ale lze ji systematicky zmenšovat.</p>`
    },
    {
      id: "bezpecnost",
      title: "Bezpečnost: konflikty na rekordní úrovni",
      text: `
<p>Válka na Ukrajině pokračuje. Rusko ke konci září 2026 kontrolovalo přibližně 19 % území Ukrajiny, fronta se však pohybuje jen nepatrně. Krátké velikonoční příměří v dubnu 2026 nevydrželo. Ztráty se podle západních odhadů počítají na stovky tisíc mrtvých a raněných na obou stranách a ruské útoky zničily většinu ukrajinské výrobní kapacity elektřiny.{{ref:ukrajina-zari-2026}}{{ref:primeri-2026}}</p>
<p>Podle databáze UCDP probíhalo v roce 2025 65 státních ozbrojených konfliktů, nejvíce od konce studené války, z toho osm mezistátních.{{ref:owid-konflikty}} Světové ekonomické fórum označilo za nejvážnější krátkodobé riziko geoekonomickou konfrontaci a hned za ní ozbrojené konflikty mezi státy.{{ref:wef-2026}} Česko podle vlády vykazuje na obranu 2,06 % HDP, NATO však uznává jen 1,78 %; závazek 2 % tak v roce 2026 podle premiéra splněn nebude.{{ref:obrana-2026}}</p>`,
      graf: ["konflikty-pocet"]
    },
    {
      id: "spolecnost",
      title: "Společnost a politika: demografický propad a nová vláda",
      text: `
<p>V roce 2025 se v Česku narodilo jen 77 600 dětí, nejméně od roku 1785, a úhrnná plodnost klesla na 1,28 dítěte na ženu (v roce 2021 to bylo 1,83).{{ref:csu-2025}} Populace přesto díky migraci dosáhla 10,9 milionu obyvatel.{{ref:csu-2024}} Stárnutí se tak zrychluje z obou stran: přibývá seniorů a ubývá dětí.</p>
<p>Po volbách na podzim 2025 vznikla vláda Andreje Babiše tvořená hnutím ANO, SPD a Motoristy sobě, jmenovaná 15. prosince 2025.{{ref:vlada-2025}} Česko v EU hlasovalo proti klimatickému cíli pro rok 2040 i proti dohodě, která odkládá emisní povolenky pro domácnosti (ETS2) na rok 2028.{{ref:ets2-2040}} Vláda zúžila program vysokorychlostních tratí na páteř Drážďany – Praha – Brno – Ostrava; trasa Praha – Hradec Králové – Vratislav byla odsunuta.{{ref:vrt-omezeni}} Pro Hradec Králové to znamená, že rychlé spojení s Prahou, se kterým počítala původní vize, se posouvá za horizont 2040.</p>`,
      graf: ["plodnost-cr"]
    },
    {
      id: "technologie",
      title: "Technologie: AI všude, vládnutí pozadu",
      text: `
<p>Podle zprávy Stanford AI Index 2026 dosáhla generativní umělá inteligence za tři roky 53% rozšíření v populaci a používá ji 88 % organizací. Výkon nejlepších modelů v programování vzrostl během jednoho roku z přibližně 60 % na téměř 100 % v referenčním testu SWE-bench Verified. Počet zdokumentovaných incidentů s AI vzrostl z 233 (2024) na 362 (2025). Závěr zprávy je, že bezpečnost a vládnutí nedrží krok s technologickým pokrokem.{{ref:ai-index-2026}}</p>
<p>Spotřeba elektřiny datových center se má podle IEA do roku 2030 přibližně zdvojnásobit na zhruba 945 TWh.{{ref:iea-ai}} Umělá inteligence se tak stává i energetickým a vodním tématem – chlazení datových center soutěží o vodu s krajinou, zemědělstvím a městy.</p>`
    }
  ]
};

/* Odborné weby pro sledování vývoje */
VIZE.odkazy = [
  { name: "InterSucho", url: "https://www.intersucho.cz/cs/", popis: "Denně aktualizované mapy sucha, půdní vláhy a desetidenní předpovědi pro Česko a střední Evropu (CzechGlobe a MENDELU).", feature: true },
  { name: "ČHMÚ – výstrahy a data", url: "https://www.chmi.cz/", popis: "Výstrahy před vedry, bouřkami a povodněmi, územní teploty a srážky, hydrologická situace." },
  { name: "Povodí Labe", url: "https://www.pla.cz/", popis: "Stav nádrží, průtoky a hydrologické informace pro povodí Labe a Orlice." },
  { name: "Klimatická změna (CzechGlobe)", url: "https://www.klimatickazmena.cz/", popis: "Projekce klimatu pro Česko, dopady na zemědělství, lesy a vodu." },
  { name: "Fakta o klimatu", url: "https://faktaoklimatu.cz/", popis: "Nezávislé datové přehledy a infografiky o klimatu a energetice v češtině." },
  { name: "Počítáme s vodou", url: "https://www.pocitamesvodou.cz/", popis: "Praktické návody na hospodaření s dešťovou vodou a modro-zelenou infrastrukturu ve městech." },
  { name: "72 hodin (MV ČR a HZS ČR)", url: "https://www.72h.gov.cz/", popis: "Oficiální příručka a návody, jak zvládnout první tři dny krizové situace." },
  { name: "Copernicus Climate Change Service", url: "https://climate.copernicus.eu/", popis: "Měsíční bulletiny o globální teplotě, mořském ledu a srážkách." },
  { name: "NOAA – oxid uhličitý", url: "https://gml.noaa.gov/ccgg/trends/", popis: "Měření koncentrace CO₂ na observatoři Mauna Loa (Keelingova křivka)." },
  { name: "IPCC", url: "https://www.ipcc.ch/", popis: "Hodnotící zprávy Mezivládního panelu pro změnu klimatu, shrnutí i v češtině." },
  { name: "Our World in Data", url: "https://ourworldindata.org/", popis: "Dlouhé datové řady o populaci, energii, klimatu, zdraví a konfliktech." },
  { name: "Stockholm Resilience Centre", url: "https://www.stockholmresilience.org/", popis: "Planetární hranice a výzkum odolnosti sociálně-ekologických systémů." },
  { name: "Český statistický úřad", url: "https://csu.gov.cz/", popis: "Demografie, sklizně, ceny a regionální statistiky." },
  { name: "UCDP – Uppsala Conflict Data Program", url: "https://ucdp.uu.se/", popis: "Nejpoužívanější databáze ozbrojených konfliktů a jejich obětí." },
  { name: "NOAA Space Weather Prediction Center", url: "https://www.spaceweather.gov/", popis: "Předpovědi slunečních bouří a geomagnetické aktivity." },
  { name: "Mezinárodní energetická agentura (IEA)", url: "https://www.iea.org/", popis: "Analýzy trhu s ropou, plynem a elektřinou, včetně dopadů AI na energetiku." }
];
