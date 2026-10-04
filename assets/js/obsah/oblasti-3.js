/* ==========================================================================
   TEMATICKÉ OBLASTI 11–15: Společnost
   (zdraví, demografie, společnost a politika, ekonomika, vzdělávání)
   ========================================================================== */
window.VIZE = window.VIZE || {};
VIZE.oblasti = VIZE.oblasti || [];

VIZE.oblasti.push(
{
  id: "zdravi", num: 11, cat: "spolecnost", icon: "heart",
  title: "Zdraví: horko, stárnutí a nové hrozby",
  shrnuti: "Zdraví obyvatel roku 2075 bude určovat kombinace stárnutí, veder, nových infekcí, rezistence na antibiotika a chemické zátěže prostředí. Medicína bude technologicky vyspělejší, ale lidská péče vzácnější.",
  fakta: [
    "Antimikrobiální rezistence: odhad 39 milionů úmrtí v letech 2025–2050, v roce 2050 asi 1,9 milionu přímých úmrtí ročně.{{ref:amr-lancet}}",
    "Mikroplasty v mozkové tkáni zemřelých: vyšší koncentrace ve vzorcích z roku 2024 než z roku 2016 (Nature Medicine 2025).{{ref:mikroplasty-mozek}}",
    "Královéhradecký kraj kvůli stárnutí výrazně navyšuje lůžka následné péče.{{ref:starnuti-khk}}"
  ],
  text: `
<h3>Horko jako tichý zabiják</h3>
<p>Vlny veder zabíjejí v Evropě více lidí než všechny ostatní přírodní katastrofy dohromady. Nejohroženější jsou senioři, chronicky nemocní, malé děti a lidé žijící osaměle v přehřátých bytech v horních patrech. Václav Cílek připomíná, že v USA umírá na následky přehřátí průměrně kolem 12 000 lidí ročně, a přesto „válku tepelnému teroru nikdo nevyhlásil“.{{ref:cilek-nove-ostrovy}} Léto 2026 s rekordními 35 tropickými nocemi na nejteplejších stanicích ukazuje, že pro Hradec Králové s vysokým podílem seniorů je ochrana před horkem otázkou veřejného zdraví.{{ref:leto-2026}}</p>

<h3>Stárnutí a péče</h3>
<p>Královéhradecký kraj patří k nejstarším regionům Česka a kraj už nyní výrazně rozšiřuje lůžka následné péče.{{ref:starnuti-khk}} Fakultní nemocnice Hradec Králové bude v roce 2075 centrem geriatrie, neurodegenerativních onemocnění, onkologie a dlouhodobé péče. Nedostatek personálu budou částečně nahrazovat roboti, senzory a AI v diagnostice. Lidský kontakt, empatie a čas se mohou stát nejvzácnějšími „zdroji“ zdravotnictví.</p>

<h3>Infekce a rezistence</h3>
<p>Studie Global Research on Antimicrobial Resistance (GRAM) publikovaná v časopise The Lancet odhaduje, že mezi lety 2025 a 2050 zemře na infekce rezistentní vůči antibiotikům přímo více než 39 milionů lidí a v roce 2050 to bude kolem 1,9 milionu úmrtí ročně; nejvíce přibude obětí mezi staršími lidmi.{{ref:amr-lancet}} Současně se s oteplením šíří komáři a klíšťata přenášející nemoci dříve v regionu neznámé (například západonilská horečka). Riziko nových pandemií zůstává vysoké – a biotechnologie zvyšují jak schopnost se jim bránit, tak riziko úniku či zneužití patogenů.{{ref:rees}}</p>

<h3>Chemická zátěž a mikroplasty</h3>
<p>Studie Nihart a kol. (Nature Medicine, 2025) zjistila v mozkové tkáni zemřelých vyšší koncentrace mikro- a nanoplastů, než jaké měřila v játrech a ledvinách, a ve vzorcích z roku 2024 výrazně vyšší než ve vzorcích z roku 2016; nejvyšší hodnoty byly u lidí s demencí. Autoři i nezávislí odborníci upozorňují, že jde o souvislost, nikoli prokázanou příčinu, a že metody měření je třeba dále zpřesňovat.{{ref:mikroplasty-mozek}} Podobně se zkoumají endokrinní disruptory, PFAS a jejich možný vliv na plodnost. Rozumná reakce je prevence: omezit ohřívání jídla v plastu, používat sklo, nerez a keramiku a filtrovat pitnou vodu tam, kde je to potřeba.{{ref:mikroplasty-pmc}}</p>

<h3>Duševní zdraví a digitální svět</h3>
<p>Nárůst úzkostí a depresí, zejména u mladých lidí, souvisí s mnoha faktory – od nejistoty budoucnosti přes osamělost až po způsob používání digitálních technologií. Hypotéza „digitální demence“, podle níž může nadměrná expozice obrazovkám v dětství zvyšovat riziko demence v dospělosti, je zatím spekulativní, ale upozorňuje na význam pohybu, spánku, čtení a skutečných vztahů pro zdravý mozek.{{ref:digitalni-demence}} Cílek v <em>Nových ostrovech</em> mluví o „epidemii únavy ze života“ a „existenční osamělosti“ a doporučuje odolnost budovat celoživotně – pohybem, spánkem, stravou a smysluplnou činností.{{ref:cilek-nove-ostrovy}}</p>
`,
  grafy: [],
  vyhled: {
    a: "Preventivní medicína, chladná a zelená města, nové antibiotické strategie. Senioři žijí déle a ve zdraví.",
    b: "Špičková péče pro movité, přetížená základní péče. Vlny veder každoročně zvyšují úmrtnost.",
    c: "Kolaps zdravotnictví při kombinaci pandemie, veder a výpadků energie. Návrat neléčitelných infekcí."
  },
  doporuceni: ["rec-zdravi", "rec-horko", "rec-psychika"]
},
{
  id: "demografie", num: 12, cat: "spolecnost", icon: "people", novy: true,
  title: "Demografie: méně dětí, více seniorů",
  shrnuti: "V roce 2025 se v Česku narodilo nejméně dětí od roku 1785. Česko bude mít v roce 2075 podle střední projekce OSN méně obyvatel a téměř každý třetí bude starší 65 let. Migrace se stane nutností i zdrojem napětí.",
  fakta: [
    "2025: 77 600 narozených, úhrnná plodnost 1,28 (2021: 1,83).{{ref:csu-2025}}",
    "Konec roku 2024: 10,91 mil. obyvatel – díky migraci nejvíce od 2. světové války.{{ref:csu-2024}}",
    "Projekce OSN (střední varianta): 2075 asi 8,8 mil. obyvatel, podíl 65+ kolem 28–30 % v letech 2050–2060.{{ref:owid-populace}}",
    "Světová banka: do roku 2050 může klimatická změna přimět k vnitřní migraci až 216 milionů lidí.{{ref:groundswell}}"
  ],
  text: `
<h3>Propad porodnosti</h3>
<p>Česko na začátku 20. let patřilo k evropským zemím s nejvyšší plodností (1,83 v roce 2021). Pak nastal rychlý pokles: v roce 2024 se narodilo 84 300 dětí a plodnost klesla na 1,37, v roce 2025 jen 77 600 dětí s plodností 1,28 – nejméně od roku 1785. Počet narozených klesl za čtyři roky o 31 %, nejvíce u žen ve věku 20–24 let.{{ref:csu-2025}}{{ref:csu-2024}} Příčin je více: drahé bydlení, inflace, nejistota budoucnosti, odkládání rodičovství a měnící se hodnoty. Klimatický a bezpečnostní pesimismus u mladých lidí podle řady průzkumů rozhodování o dětech také ovlivňuje.</p>

<h3>Stárnoucí společnost</h3>
<p>Podle střední varianty projekce OSN (World Population Prospects 2024) by Česko mělo mít kolem roku 2075 asi 8,8 milionu obyvatel a podíl lidí nad 65 let by se v letech 2050–2060 přiblížil 30 %.{{ref:owid-populace}} Projekce ČSÚ a demografické prognózy Královéhradeckého kraje ukazují stejný směr – výrazné stárnutí, které bude nejvíce patrné v okresních městech a na venkově.{{ref:projekce-csu}}{{ref:prognoza-khk}} Projekce OSN ovšem počítá s mírným návratem plodnosti k 1,5–1,6; pokud zůstane kolem 1,3, bude úbytek rychlejší.</p>
<p>Pro Hradec Králové to znamená tlak na zdravotnictví a sociální služby, změnu struktury trhu práce (nedostatek lidí v péči, řemeslech a školství) a změnu politiky – starší voliči budou mít v rozhodování větší váhu („gerontokracie“). Současně se otevírají příležitosti: aktivní senioři jako mentoři, dobrovolníci a nositelé řemeslných dovedností.</p>

<h3>Migrace</h3>
<p>Počet obyvatel Česka díky migraci roste i při rekordně nízké porodnosti – v roce 2024 dosáhl 10,91 milionu, nejvíce od konce druhé světové války.{{ref:csu-2024}} Do roku 2075 bude migrace nezbytná pro fungování ekonomiky a péče. Světová banka odhadla, že klimatické změny mohou do roku 2050 donutit až 216 milionů lidí k migraci uvnitř jejich zemí.{{ref:groundswell}} Cílek upozorňuje, že nejvíce podzemní vody dnes ubývá v pásu od Blízkého východu přes Írán po severní Indii a že odtud budou v dalších desetiletích přicházet konflikty i uprchlíci.{{ref:cilek-nove-ostrovy}} Úspěšná integrace (jazyk, vzdělání, bydlení, práce) obohacuje město, neúspěch vede k paralelním společnostem a napětí.</p>
`,
  grafy: ["seniori-cr", "obyvatele-cr", "plodnost-cr"],
  vyhled: {
    a: "Rodinná politika a dostupné bydlení zvedají plodnost k 1,6–1,7, řízená migrace a dobrá integrace. Aktivní stárnutí.",
    b: "Plodnost kolem 1,4, populace stárne, migrace řešena ad hoc. Nedostatek pracovníků v péči.",
    c: "Plodnost pod 1,3, vylidňování, odliv mladých, nekontrolované migrační vlny a sociální konflikty."
  },
  doporuceni: ["rec-komunita"]
},
{
  id: "spolecnost", num: 13, cat: "spolecnost", icon: "network",
  title: "Společnost a politika: fragmentace a nové kmeny",
  shrnuti: "Společnost je polarizovaná, informační prostor rozdrobený a důvěra v instituce nízká. Proti atomizaci vznikají „nové kmeny“ – sousedské a zájmové komunity, které v krizi drží věci pohromadě. Rozhodne kvalita vládnutí a schopnost dlouhodobého myšlení.",
  fakta: [
    "Vláda A. Babiše (ANO, SPD, Motoristé sobě) jmenována 15. 12. 2025.{{ref:vlada-2025}}",
    "Česko hlasovalo v EU proti klimatickému cíli 2040 a odkladu ETS2.{{ref:ets2-2040}}",
    "WEF 2026: polovina expertů čeká v příštích dvou letech „bouřlivé“ nebo „turbulentní“ období.{{ref:wef-2026}}"
  ],
  text: `
<h3>Polarizace a bubliny</h3>
<p>Algoritmy sociálních sítí, ekonomická nejistota a souběh krizí vedou k polarizaci. Lidé žijí v informačních bublinách, ve kterých je snadné šířit „tekutý hněv“ a jednoduchá vysvětlení složitých problémů. Koukolíkova <em>skupinová hloupost</em> a <em>relativní deprivace</em> (pocit, že se jiní mají nezaslouženě lépe) jsou živnou půdou pro populismus všech směrů.{{ref:koukolik-mocenska}} Václav Cílek v <em>Nových ostrovech</em> za hlavní vnitřní riziko společnosti považuje ztrátu soudržnosti a upozorňuje na rostoucí nerovnost a „greedflaci“ – zdražování, které výrobci a obchodníci svádějí na krize.{{ref:cilek-nove-ostrovy}}</p>

<h3>Politická situace v roce 2026</h3>
<p>Po volbách 2025 vznikla vláda hnutí ANO, SPD a Motoristů sobě v čele s Andrejem Babišem.{{ref:vlada-2025}} V roce 2026 Česko v EU hlasovalo proti klimatickému cíli pro rok 2040 a vláda omezila program vysokorychlostních tratí.{{ref:ets2-2040}}{{ref:vrt-omezeni}} Pro tento web nejde o hodnocení konkrétních stran, ale o otázku, kterou si musí položit každá vláda i zastupitelstvo: dokáže politika plánovat v horizontu desetiletí, když volební cyklus trvá čtyři roky? Sucho, stárnutí a energetika potřebují kontinuitu napříč volebními obdobími.</p>

<h3>Nerovnost a „digitální proletariát“</h3>
<p>Automatizace a AI mohou rozevřít nůžky mezi vysoce kvalifikovanou technologickou a kapitálovou elitou a lidmi, jejichž práce byla nahrazena nebo zlevněna. Hrozí vznik sociálně vyloučených lokalit i uzavřených rezidencí pro bohaté. Rozhodující budou daňová politika, kvalita veřejných služeb a dostupnost vzdělání.</p>

<h3>Nové kmeny a občanská společnost</h3>
<p>Proti atomizaci vznikají silné lokální a zájmové komunity – sousedské spolky, komunitní zahrady, energetická společenství, hasičské sbory, církevní sbory, sportovní kluby. V krizích suplují stát: první záchranáři jsou podle Cílka sousedé a nejlépe fungují komunity, které nečekají na koordinaci, ale samy se do ní pustí.{{ref:cilek-nove-ostrovy}} Hradec Králové má silnou tradici spolkového života; pro scénář Resilientní město je klíčové ji udržet a propojit s městskou správou.</p>

<h3>Demokratura, nebo participace?</h3>
<p>Do roku 2075 se rozhodne, zda se demokracie promění v „demokraturu“ – formální procedury s reálnou mocí soustředěnou v rukou úzkých skupin –, nebo zda posílí participace: participativní rozpočty, občanská shromáždění, transparentní data o vodě, energii a rozpočtu. Technologie mohou sloužit oběma cestám.</p>
`,
  grafy: [],
  vyhled: {
    a: "Vysoká důvěra, participace, dlouhodobé strategie přežívají volby. Silná občanská společnost.",
    b: "Polarizace a krátkodobé politiky, demokratura s občasnými reformami. Komunity fungují ostrůvkovitě.",
    c: "Autoritářství nebo rozpad autority, lokální „warlordi“, ovládání informací a násilí."
  },
  doporuceni: ["rec-komunita", "rec-digital"]
},
{
  id: "ekonomika", num: 14, cat: "spolecnost", icon: "coins",
  title: "Ekonomika: dluh, digitální peníze a místní odolnost",
  shrnuti: "Světová ekonomika stojí na rekordním dluhu a levné energii, které obě ztrácí jistotu. Do roku 2075 budou mít větší váhu místní ekonomika, oprava a recyklace, a schopnost domácností fungovat i při výpadku plateb.",
  fakta: [
    "Globální dluh dosáhl v 1. pololetí 2026 rekordních 365 bilionů USD.{{ref:dluh-iif}}",
    "Evropský parlament v červenci 2026 podpořil digitální euro (416 hlasů pro); spuštění nejdříve kolem roku 2029.{{ref:digitalni-euro}}",
    "Ropný šok 2026 zvýšil ceny paliv v ČR o 10 Kč/l během dvou týdnů.{{ref:nafta-2026}}"
  ],
  text: `
<h3>Dluhová ekonomika</h3>
<p>Podle Institutu mezinárodních financí (IIF) dosáhl globální dluh v prvním pololetí 2026 rekordních 365 bilionů dolarů; jen za půl roku přibylo 10 bilionů.{{ref:dluh-iif}} Vysoký dluh činí státy i firmy citlivými na růst úrokových sazeb a na šoky typu ropné krize. Václav Cílek popisuje, jak veřejné finance „připomínají vybydlený dům bez rezerv“ a jak se ve veřejném prostoru znovu objevují slova jako kolaps dolaru, měnová reforma nebo státní bankrot.{{ref:cilek-nove-ostrovy}} Ekonomika s klesající energetickou návratností (viz oblast Ropa a suroviny) bude mít menší prostor pro růst, který by dluhy „rozpustil“.</p>

<h3>Digitální peníze</h3>
<p>Evropský parlament v červenci 2026 podpořil návrh digitálního eura (416 hlasů pro, 169 proti); následují jednání s Radou a Komisí a spuštění se očekává nejdříve kolem roku 2029. Má fungovat online i offline, být pro základní použití zdarma a doplňovat, nikoli nahrazovat hotovost; strop držby je ještě předmětem jednání.{{ref:digitalni-euro}} Česko eurem neplatí a ČNB vlastní digitální korunu nezavádí, ale evropský platební prostor ovlivní i nás. Digitální měny centrálních bank přinášejí efektivitu, ale vyvolávají obavy z dohledu – proto je důležité, jak budou chráněna soukromí a offline platby. Pro odolnost domácností zůstává hotovost v drobných a schopnost platit bez elektřiny důležitou zálohou.</p>

<h3>Struktura hradecké ekonomiky</h3>
<p>Hradec Králové je dnes městem služeb, zdravotnictví, vzdělávání, výzkumu a logistiky. Do roku 2075 budou jeho ekonomickými pilíři pravděpodobně zdravotní péče a biomedicína (FN HK, lékařská a farmaceutická fakulta), vzdělávání (UHK), IT a služby. Tradiční výrobní firmy se budou transformovat; rozvoj si vyžádá energii, vodu a kvalifikované lidi – všechny tři zdroje budou vzácné.</p>

<h3>Cirkulární a místní ekonomika</h3>
<p>Oprava, repase, sdílení a recyklace se stanou běžnou součástí ekonomiky – nejen z ekologických důvodů, ale i proto, že nové zboží bude dražší. Místní výměnné systémy (LETS), časové banky a komunitní měny posilují vztahy a fungují jako doplněk oficiální měny v dobách krize, i když jejich ekonomický potenciál je v Česku zatím malý.{{ref:lets}} Platformy pro obchod s druhotnými surovinami ukazují, že odpad jedné firmy může být surovinou jiné.{{ref:cyrkl}}</p>
`,
  grafy: [],
  vyhled: {
    a: "Řízené snižování dluhu, investice do odolnosti, silná místní ekonomika, digitální peníze se zárukami soukromí.",
    b: "Opakované krize a inflace, stagnace reálných příjmů, rostoucí nerovnost. Ekonomika „nějak funguje“.",
    c: "Dluhová a měnová krize, výpadky plateb, barter a černý trh. Ekonomika se rozpadá na lokální ostrovy."
  },
  doporuceni: ["rec-finance"]
},
{
  id: "vzdelavani", num: 15, cat: "spolecnost", icon: "book",
  title: "Vzdělávání: adaptabilita jako klíčová kompetence",
  shrnuti: "AI mění, co a jak se učit. Paměťové znalosti ztrácejí hodnotu, rostou nároky na úsudek, spolupráci, praktické dovednosti a schopnost rozpoznat pravdu od manipulace. Škola se stává i místem komunitní odolnosti.",
  fakta: [
    "Přes 80 % amerických středoškoláků a vysokoškoláků používá AI ke studiu, politiky AI má jen asi polovina škol.{{ref:ai-index-2026}}",
    "Počet narozených klesl za čtyři roky o 31 % – za pár let ubyde žáků ve školách.{{ref:csu-2025}}",
    "Školy a tělocvičny se při krizích stávají prvními evakuačními centry.{{ref:cilek-nove-ostrovy}}"
  ],
  text: `
<h3>Škola v době umělé inteligence</h3>
<p>Generativní AI se ve vzdělávání rozšířila rychleji než pravidla pro její používání: více než 80 % amerických studentů ji používá ke školní práci, ale jen asi polovina škol má pro ni jasná pravidla.{{ref:ai-index-2026}} V roce 2075 bude AI osobním tutorem, který přizpůsobí výklad každému žákovi. Učitel se stane spíše průvodcem, mentorem a garantem kritického myšlení. Riziko je zřejmé: pokud za žáka „myslí“ stroj, kognitivní dovednosti nerozvíjí. Proto poroste hodnota hlubokého čtení, psaní rukou, počítání z hlavy, diskuse a projektové výuky.</p>

<h3>Kompetence pro rok 2075</h3>
<ul>
<li><strong>Kritické myšlení a mediální gramotnost</strong> – ověřování zdrojů, rozpoznání deepfakes a manipulace.</li>
<li><strong>Spolupráce a empatie</strong> – schopnosti, které stroje nenahradí a které jsou základem komunitní odolnosti.</li>
<li><strong>Praktické dovednosti</strong> – opravy, zahradničení, vaření, první pomoc, práce se dřevem a kovem.</li>
<li><strong>Systémové myšlení</strong> – porozumění souvislostem vody, energie, klimatu a ekonomiky.</li>
<li><strong>Psychická odolnost</strong> – zvládání stresu, nejistoty a změn.</li>
</ul>

<h3>Demografie a síť škol</h3>
<p>Propad porodnosti o 31 % za čtyři roky se během několika let projeví v mateřských a základních školách a do roku 2040 i na středních a vysokých školách.{{ref:csu-2025}} Současně bude chybět učitelů. Hradec Králové má jako univerzitní město (UHK, lékařská a farmaceutická fakulta UK, Fakulta vojenského zdravotnictví Univerzity obrany) výhodu: kampus Na Soutoku se rozvíjí a celoživotní vzdělávání včetně univerzity třetího věku se stane masovou záležitostí.{{ref:kampus-uhk}}</p>

<h3>Škola jako komunitní uzel</h3>
<p>Václav Cílek upozorňuje, že školy a jejich tělocvičny se všude ve světě stávají prvními evakuačními centry a že by školky a školy měly mít větší filtry na vodu, se kterými se učitelé naučí zacházet.{{ref:cilek-nove-ostrovy}} Krizová připravenost, první pomoc a péče o krajinu se proto mohou stát běžnou součástí výuky – nikoli jako strašení, ale jako praktická dovednost a výchova k odpovědnosti.</p>
`,
  grafy: [],
  vyhled: {
    a: "AI jako osobní tutor, učitel jako mentor. Školy jsou komunitní centra a učí praktické i kritické dovednosti.",
    b: "Rozdíly mezi školami se prohlubují, AI používána nekriticky, nedostatek učitelů.",
    c: "Rozpad veřejného školství, vzdělání jen pro elity, kognitivní propast ve společnosti."
  },
  doporuceni: ["rec-prace", "rec-digital"]
}
);
