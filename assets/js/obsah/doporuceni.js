/* ==========================================================================
   DOPORUČENÍ PRO JEDNOTLIVCE A DOMÁCNOSTI
   Vychází z: příručky 72 hodin (MV ČR, HZS ČR), knih V. Cílka a kol.
   Ruka noci podaná (2018) a Nové ostrovy (2024), Pravidel krizového chování
   a dalších podkladů v sekci Dokumenty.
   ========================================================================== */
window.VIZE = window.VIZE || {};

VIZE.doporuceniUvod = `Připravenost není strach z konce světa. Václav Cílek ji nazývá „něžným preperstvím“: hlavním motivem je láska k blízkým, ne panika. Platí přitom jeho „závažné varování“ – připravte se i na to, že krize třeba nikdy nepřijde. Většina kroků níže zlepšuje život i v běžných časech: šetří peníze, vodu a energii, posiluje zdraví a vztahy se sousedy. Doporučení jsou seřazena od prvních 72 hodin krize po dlouhodobou adaptaci na život v teplejší a nejistější době.`;

/* Interaktivní kontrolní seznam podle příručky 72 hodin (MV ČR, HZS ČR) */
VIZE.checklist72 = [
  { skupina: "Voda", polozky: [
    "Balená pitná voda: nouzově 2 litry na osobu a den, ideálně 3–4 litry (pití, vaření, hygiena)",
    "Uzavíratelné nádoby nebo kanystry na odběr vody z cisterny",
    "Filtr na vodu nebo přípravek k dezinfekci vody"
  ]},
  { skupina: "Jídlo a vaření", polozky: [
    "Trvanlivé potraviny na 3 dny, které jíte i běžně (a jejich rotace)",
    "Plynový nebo lihový vařič, zápalky či zapalovač (používat jen s větráním)",
    "Krmivo pro zvířata"
  ]},
  { skupina: "Energie, světlo a informace", polozky: [
    "Rádio na baterie nebo na kliku",
    "Svítilna nebo čelovka a náhradní baterie",
    "Nabitá powerbanka a kabely k telefonu",
    "Plná nádrž v autě (nabitý elektromobil)"
  ]},
  { skupina: "Zdraví a hygiena", polozky: [
    "Lékárnička a léky, které užíváte, nejméně na týden",
    "Dezinfekce na ruce, toaletní papír, hygienické potřeby",
    "Silné pytle na odpadky (využití i pro nouzovou toaletu)"
  ]},
  { skupina: "Peníze, dokumenty a nářadí", polozky: [
    "Hotovost v mincích a menších bankovkách",
    "Kopie důležitých dokumentů (papírově i v telefonu)",
    "Multifunkční nůž, pevná lepicí páska",
    "Hasicí přístroj nebo hasicí deka"
  ]},
  { skupina: "Rodinný plán", polozky: [
    "Domluvené místo setkání, pokud nebude fungovat telefon",
    "Kdo vyzvedne děti a kdo se postará o seniory a lidi se specifickými potřebami",
    "Důležitá čísla uložená v telefonu i na papíře (112, 150, 155, 158)"
  ]}
];

VIZE.doporuceni = [
{
  id: "rec-plan", title: "Prvních 72 hodin: rodinný krizový plán", icon: "clock",
  shrnuti: "Každý by měl zvládnout první tři dny bez pomoci záchranných složek – jen s tím, co má doma. Záchranáři se pak mohou věnovat těm, kdo jsou v ohrožení života.",
  text: `
<p>Pravidlo 72 hodin z oficiální příručky Ministerstva vnitra a Hasičského záchranného sboru říká, že v krizi – při výpadku elektřiny, vody nebo zásobování – by měl každý zvládnout první tři dny sám.{{ref:72h}} Při přímém ohrožení života (úraz, nehoda, akutní nemoc) přijde pomoc rychle; pravidlo se týká situací, kdy vážné nebezpečí nehrozí, ale běžné služby nefungují.</p>
<p>Co se může změnit: z kohoutku nepoteče voda, nepůjde elektřina, telefon ani internet, nezaplatíte kartou, nenatankujete, nebude jezdit hromadná doprava a toaletu spláchnete jen jednou. Proto se vyplatí tři věci: domluvit se předem, kde se rodina sejde, kdo se postará o koho, a mít důležitá čísla a kopie dokumentů v telefonu i na papíře.{{ref:72h}}</p>
<p>Václav Cílek doporučuje mít doma „bednu“ s potřebnými věcmi a nad ní pověšený evakuační plán – krátký seznam, na co nezapomenout (léky, nabíječky, krmivo pro psa, vypnutí vody, plynu a elektřiny, náhradní klíč, vzkaz pro příbuzné). V krizi totiž člověk na něco zapomene skoro vždy.{{ref:cilek-ruka}}{{ref:cilek-radiozurnal}} Další informace o varování obyvatel, evakuaci a ukrytí nabízí Hasičský záchranný sbor ČR.{{ref:hzs-ochrana}}</p>
<div class="callout"><strong>Interaktivní seznam:</strong> níže najdete kontrolní seznam 72 hodin. Zaškrtnuté položky si prohlížeč zapamatuje (jen ve vašem zařízení).</div>`,
  checklist: true
},
{
  id: "rec-voda", title: "Voda doma: zásoba, úprava a šetření", icon: "drop",
  shrnuti: "Voda je důležitější než elektřina. Malé děti ji potřebují dřív než dospělí a znečištěná voda způsobí víc problémů než žádná.",
  text: `
<ul>
<li><strong>Zásoba.</strong> Mějte balenou vodu nejméně na tři dny (nouzově 2 l na osobu a den) a uzavíratelné nádoby na odběr z cisterny.{{ref:72h}} Cílek upozorňuje, že při rozsáhlém blackoutu nelze spoléhat na cisterny – ani Správa státních hmotných rezerv jich nemá dost.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Úprava vody.</strong> Po prvních hodinách je nutné vodu převařit (stačí uvést do varu), filtrovat nebo dezinfikovat. Vhodný je gravitační nebo ruční filtr; chemické přípravky používejte přesně podle návodu výrobce. Po obnovení dodávky po blackoutu nepijte vodu z kohoutku bez úpravy, dokud to vodárna nepovolí – do potrubí mohla proniknout kontaminace.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Toaleta bez vody.</strong> Kbelík s víkem a dvěma pytli, posyp pilinami nebo hlínou; oddělení moči a výkalů výrazně omezí zápach. Zásoba pytlů a toaletního papíru se vyplatí.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Šetření v suchu.</strong> Při omezeních odběru (jako v létě 2026 v řadě obcí) pomáhá sprcha místo vany, zachytávání „studené“ vody před sprchováním na zálivku, myčka plně naložená, zalévání ráno nebo večer a ke kořenům. Sledujte stav sucha na <a href="https://www.intersucho.cz/cs/" target="_blank" rel="noopener">InterSucho</a>.{{ref:intersucho}}</li>
<li><strong>Dešťová voda.</strong> Sud na okapu, zahradní nádrž nebo akumulační nádrž s využitím na splachování snižují spotřebu pitné vody a odlehčí kanalizaci při přívalech.{{ref:pocitame-s-vodou}}</li>
<li><strong>Náhradní zdroje.</strong> Zjistěte, kde jsou ve vašem okolí studny a prameny a jakou mají kvalitu; voda z pramene je pro úpravu lepší než voda z rybníka.{{ref:cilek-nove-ostrovy}}</li>
</ul>`
},
{
  id: "rec-jidlo", title: "Jídlo a spižírna: zásoba, kterou opravdu jíte", icon: "jar",
  shrnuti: "V samoobsluze dojde jídlo za pár hodin. Rozumná zásoba na dva týdny až tři měsíce není hromadění, ale pojistka – pokud ji průběžně spotřebováváte a doplňujete.",
  text: `
<ul>
<li><strong>Rotující zásoba.</strong> Skladujte potraviny, které běžně jíte, a spotřebovávejte nejstarší jako první. Základ tvoří rýže, luštěniny, těstoviny, ovesné vločky, konzervy, olej, sůl, cukr a med. Podklad <em>6 potravin pro zásoby</em> v sekci Dokumenty uvádí potraviny s velmi dlouhou trvanlivostí.</li>
<li><strong>Délka zásoby.</strong> Minimum jsou tři dny podle příručky 72 hodin,{{ref:72h}} Cílek doporučuje nejméně dva týdny – za dva až tři týdny se zásobování po krizi obvykle obnoví.{{ref:cilek-nove-ostrovy}} Rozumný cíl domácnosti je jeden až tři měsíce u základních potravin.</li>
<li><strong>Vaření bez elektřiny a plynu.</strong> Plynový vařič na kartuši nebo lihový vařič a palivo. Vařič na plynovou láhev patří mimo obytné místnosti; nikdy nepoužívejte gril ani venkovní vařič v bytě – hrozí otrava oxidem uhelnatým.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Konzervace bez elektřiny.</strong> Sušení, kvašení, zavařování a uzení jsou dovednosti, které se vyplatí umět – a zlepšují i kvalitu běžné stravy.</li>
<li><strong>Strava pro teplejší svět.</strong> Více luštěnin, zeleniny a obilovin, méně masa. V suchých letech ubývá krmiva a maso zdražuje; polovegetariánská strava je zdravější i odolnější.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Místní zdroje.</strong> Nakupujte u místních zemědělců, zapojte se do komunitní zahrady nebo pěstujte alespoň bylinky a zeleninu na balkoně.{{ref:zahrada-strelak}}</li>
</ul>`
},
{
  id: "rec-energie", title: "Energie a teplo: blackout, zima a výpadek plynu", icon: "bolt",
  shrnuti: "Malé výpadky elektřiny se obvykle opraví do dvou tří dnů, velký blackout může trvat až deset dní. Výpadek plynu může trvat týdny. Klíčem je teplo, světlo, informace a voda.",
  text: `
<ul>
<li><strong>Co se při blackoutu stane.</strong> Během hodin přestane téct voda ve vyšších patrech, vypadnou mobilní sítě, zastaví se výtahy, nepůjde platit kartou a nenatankujete. Problémem může být i kanalizace s čerpadly.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Světlo a informace.</strong> Svítilna, čelovka, baterie, powerbanka a rádio na baterie nebo na kliku. Autorádio funguje i při výpadku sítě.</li>
<li><strong>Teplá místnost.</strong> V zimě vyberte jednu menší místnost, kterou lze utěsnit a udržet v teple; kvalitní spací pytle a vrstvené oblečení jsou spolehlivější než generátor, který potřebuje palivo a láká zloděje.{{ref:cilek-ruka}}</li>
<li><strong>Výpadek plynu.</strong> Po přerušení dodávek může jejich obnovení ve městě trvat 30–40 dní, protože se musí znovu natlakovat síť a zkontrolovat spotřebiče. Mějte náhradní způsob vaření a ohřevu.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Výtah.</strong> Při bouřce a vichřici výtah nepoužívejte. Pokud uvíznete, zachovejte klid, vzduch vám nedojde; volejte o pomoc (150 nebo 112) a nepokoušejte se vylézt sami, pokud nehrozí přímé nebezpečí.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Dlouhodobě.</strong> Zateplení, fotovoltaika s baterií, zapojení do energetického společenství a úsporné spotřebiče snižují účty i závislost na síti.{{ref:komunitni-energetika}}</li>
</ul>`
},
{
  id: "rec-horko", title: "Horko v bytě a ve městě", icon: "sun",
  shrnuti: "Vedra zabíjejí tiše, hlavně seniory a osamělé lidi. Pasivní chlazení je levnější a spolehlivější než klimatizace a funguje i při výpadku proudu.",
  text: `
<ul>
<li><strong>Větrání a stínění.</strong> Větrejte v noci a brzy ráno, pak zavřete okna a zatáhněte závěsy nebo venkovní žaluzie. Až 40 % tepla přichází okny; dobře nastavené žaluzie snižují tepelnou zátěž jižní strany až o 70 %.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Chlazení výparem.</strong> Ráno, dokud se beton neprohřeje, polijte vodou plochu před vchodem nebo balkon – betonová dlažba vodu nasaje a pak chladí. Navlhčené závěsy pomáhají jen při suchém vzduchu.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Režim dne.</strong> Aktivity přesuňte na ráno a večer, v poledne se vyhýbejte rozpáleným plochám. Pijte průběžně a doplňujte minerály. Volné světlé oblečení zakrývající tělo chrání nad 36 °C lépe než tričko a šortky.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Stromy a zeleň.</strong> Strom s dostatkem vody ochlazuje okolí o 6–12 °C. Zalévejte stromy před domem v suchu, nesekejte trávník nakrátko (vyšší tráva má povrch až o 10 °C chladnější než holá zem).{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Sousedská kontrola.</strong> Při vlně veder se ozvěte starším sousedům a příbuzným, kteří žijí sami. Sledujte výstrahy ČHMÚ.</li>
</ul>`
},
{
  id: "rec-zdravi", title: "Zdraví a lékárnička", icon: "heart",
  shrnuti: "Když je lékař daleko, rozhoduje prevence, základní znalosti první pomoci a dobře vybavená lékárnička. Odolnost těla se buduje celoživotně.",
  text: `
<ul>
<li><strong>Léky.</strong> Mějte zásobu léků, které užíváte, nejméně na týden, ideálně na měsíc (po domluvě s lékařem).{{ref:72h}}</li>
<li><strong>Lékárnička.</strong> Obvazy, náplasti, dezinfekce, škrtidlo, izotermická fólie, teploměr, léky na bolest a horečku, rehydratační roztok. Kapitola „Když je lékař daleko“ v knize <em>Nové ostrovy</em> popisuje osobní lékárničku typu IFAK a léčbu dehydratace a podchlazení.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>První pomoc.</strong> Kurz první pomoci je nejlepší investicí do odolnosti. Hlavní zásady najdete v příručce 72 hodin.{{ref:72h}}</li>
<li><strong>Antibiotika.</strong> Užívejte je jen na předpis a celou kúru – rezistence na antibiotika patří k největším zdravotním hrozbám příštích desetiletí.{{ref:amr-lancet}}</li>
<li><strong>Čtyři pilíře odolnosti.</strong> Spánek („jedna noc bez spánku je deset dní potíží“), pohyb (chůze je nejlepší lék), strava a psychická pohoda.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Méně plastů.</strong> Neohřívejte jídlo v plastu, preferujte sklo, nerez a keramiku.{{ref:mikroplasty-mozek}}</li>
</ul>`
},
{
  id: "rec-komunikace", title: "Komunikace a informace v krizi", icon: "radio",
  shrnuti: "Nedostatek informací živí strach a paniku. V krizi je potřeba spolehlivý informační kanál, domluvené postupy v rodině a chladná hlava vůči fámám.",
  text: `
<ul>
<li><strong>Jeden spolehlivý kanál.</strong> Zkušenost z evakuace Kábulu i z povodní ukazuje, že je nutné mít jeden ověřený zdroj informací.{{ref:cilek-nove-ostrovy}} Při výpadku internetu to bývá rozhlas, výstražný systém a informace obce.</li>
<li><strong>Rádio.</strong> Rádio na baterie nebo kliku a autorádio fungují i při blackoutu.</li>
<li><strong>Komunikační hodiny.</strong> Obce mohou při krizi pořádat pravidelná setkání před radnicí, kde se sdílí informace – zjistěte, jak to má vaše obec nebo městský obvod naplánováno.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Fámy a dezinformace.</strong> Cílek uvádí příklad falešné zprávy o protržení přehrady, která by mohla vyvolat paniku; prevencí je „digitální očkování“ – vědět předem, jaké zprávy jsou typickou manipulací.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Rodinná pravidla.</strong> Domluvené místo setkání, vzkaz na domluveném místě, jednoduchá šifra pro citlivé informace.{{ref:cilek-ruka}}</li>
</ul>`
},
{
  id: "rec-komunita", title: "Sousedé, panelový dům a komunita", icon: "people",
  shrnuti: "První záchranáři jsou sousedé. Komunita, která se zná a umí se zorganizovat, je nejsilnějším zdrojem odolnosti – zvlášť v panelovém domě.",
  text: `
<ul>
<li><strong>Znejte sousedy.</strong> Vědět, kdo je zdravotník, kdo má nářadí, kdo žije sám a potřebuje pomoc, je v krizi strategická informace.</li>
<li><strong>Samospráva domu.</strong> Při krizi v panelovém domě doporučují autoři <em>Nových ostrovů</em> zavřít jeden vchod, u hlavního vchodu zřídit stolek s dobrovolníky, obejít byty a zjistit nejen potřeby, ale i co kdo může nabídnout (dovoz vody, péče o děti, údržba nouzových toalet), a navázat spolupráci s okolními domy. Pouhé rozdávání pomoci vytváří závislost; cílem je, aby si komunita pomohla sama.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Nečekat na koordinaci.</strong> Nejlépe fungují lidé, kteří nečekají, až je někdo zorganizuje, ale sami se do organizace pustí.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Místní spolky.</strong> Hasiči, komunitní zahrady, energetická společenství, sportovní a církevní spolky – zapojení v nich vytváří sítě, které v krizi drží.</li>
<li><strong>Občanská aktivita.</strong> Zajímejte se o krizové a adaptační plány obce, o zadržování vody a o zeleň. Podporujte dlouhodobá řešení před jednoduchými sliby.</li>
</ul>`
},
{
  id: "rec-finance", title: "Finance a ekonomická odolnost", icon: "coins",
  shrnuti: "Ekonomickou odolnost domácnosti tvoří nízké fixní náklady, finanční rezerva, hotovost pro výpadek plateb a dovednosti, které mají hodnotu i bez peněz. (Nejde o investiční doporučení.)",
  text: `
<ul>
<li><strong>Rezerva.</strong> Finanční polštář na několik měsíců výdajů a minimum spotřebitelských dluhů snižují zranitelnost vůči inflaci a ztrátě příjmu.</li>
<li><strong>Hotovost.</strong> Při blackoutu nefungují terminály ani bankomaty; mějte hotovost v mincích a menších bankovkách.{{ref:72h}}</li>
<li><strong>Nízké fixní náklady.</strong> Úspory energie a vody, zateplení a opravy věcí snižují dopad zdražování – rok 2026 ukázal, jak rychle mohou podražit paliva.{{ref:nafta-2026}}</li>
<li><strong>Dovednosti jako kapitál.</strong> Oprava kola, pěstování zeleniny, zdravotnické nebo technické znalosti mají v krizi hodnotu, kterou lze směnit i v místních výměnných systémech (LETS, časové banky).{{ref:lets}}</li>
<li><strong>Pozor na krizové zdražování.</strong> Cílek upozorňuje na „greedflaci“ – zdražování, které obchodníci svádějí na aktuální krize. Srovnávejte ceny a nakupujte s rozmyslem.{{ref:cilek-nove-ostrovy}}</li>
</ul>
<p><em>Tento web neposkytuje investiční ani finanční poradenství. Konkrétní finanční rozhodnutí konzultujte s odborníkem.</em></p>`
},
{
  id: "rec-doprava", title: "Mobilita: kolo, nohy a plná nádrž", icon: "bike",
  shrnuti: "Nejodolnější dopravní prostředek je ten, který nepotřebuje palivo ani síť. Pro delší cesty je dobré mít zálohu a znát cestu bez navigace.",
  text: `
<ul>
<li><strong>Kolo.</strong> Spolehlivé mechanické kolo, náhradní duše a základní nářadí. Elektrokolo je skvělé, ale při delším blackoutu se nenabije.</li>
<li><strong>Plná nádrž.</strong> Jezděte s nádrží spíše plnou – při blackoutu nefungují čerpací stanice a přednost dostanou záchranné složky.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Navigace bez satelitu.</strong> Papírová mapa okolí a znalost tras pěšky a na kole. Výpadek GPS může nastat při sluneční bouři nebo rušení.</li>
<li><strong>Dobrá obuv.</strong> Při evakuaci nebo výpadku dopravy se mohou jít desítky kilometrů.</li>
<li><strong>Dlouhodobě.</strong> Bydlení blízko práce, školy a služeb a hromadná doprava snižují závislost na drahých palivech.</li>
</ul>`
},
{
  id: "rec-psychika", title: "Psychická odolnost: jak zvládnout krizi v hlavě", icon: "mind",
  shrnuti: "Krize má dvě složky – materiální a psychickou. Mnoho lidí selhává v té druhé. Odolnost lze trénovat a dá se předávat dětem.",
  text: `
<ul>
<li><strong>Fáze krize.</strong> Na začátku krize řada lidí realitu popírá a na varování nereaguje. Přijměte včas, že se „něco děje“, a jednejte podle připraveného plánu.{{ref:cilek-ruka}}</li>
<li><strong>Jednoduché úkoly.</strong> V chaosu pomáhá řád – pravidelné jídlo, hygiena, úklid, péče o druhé. Drobné praktické činnosti vracejí pocit kontroly.{{ref:cilek-ruka}}</li>
<li><strong>Děti.</strong> Martina Hrnčířová v <em>Nových ostrovech</em> připomíná, že dospělí mají psychology, ale děti mají hry. S dětmi mluvte pravdivě a přiměřeně jejich věku, dejte jim úkoly a „ochránce“ (oblíbenou věc), buďte jim zrcadlem.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Strach z neviditelného.</strong> U radiace i epidemií bývá strach horší než skutečná dávka – po Fukušimě měla deprese horší dopady než ozáření. Spolehlivé informace strach zmenšují.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Klimatická úzkost.</strong> Nejlepší lék na úzkost z budoucnosti je činnost: péče o zeleň, zapojení do komunity, praktická příprava. Naděje je disciplína, ne nálada.</li>
<li><strong>Pomoc.</strong> Pokud vás úzkost nebo smutek dlouhodobě ochromují, obraťte se na odborníka nebo linku pomoci.</li>
</ul>`
},
{
  id: "rec-digital", title: "Digitální hygiena a kybernetická odolnost", icon: "shield",
  shrnuti: "Technologie je dobrý sluha a zlý pán. Chraňte svá data, svou pozornost i schopnost myslet bez asistenta.",
  text: `
<ul>
<li><strong>Zálohy.</strong> „Zálohovat, zálohovat, zálohovat“ – fotografie a dokumenty mějte ve více kopiích, alespoň jednu offline. Klíčové dokumenty (doklady, vlastnictví, zdravotní záznamy) také na papíře.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Bezpečnost účtů.</strong> Silná hesla ve správci hesel a dvoufázové ověření. Počítejte s tím, že informace na internetu mizí („hniloba internetu“).{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Kritické myšlení.</strong> Ověřujte zdroje, pozor na emoční spouštěče, podvodné hovory s napodobeným hlasem a deepfake videa.</li>
<li><strong>Kognitivní suverenita.</strong> Dopřejte si „analogové chvíle“ – čtení knih, psaní rukou, počítání z hlavy, procházky bez telefonu. AI používejte jako pomocníka, ne jako náhradu vlastního myšlení.</li>
<li><strong>Soukromí.</strong> Minimalizujte digitální stopu a chraňte biometrická data.</li>
</ul>`
},
{
  id: "rec-prace", title: "Práce a vzdělání: řemeslo a přizpůsobivost", icon: "tools",
  shrnuti: "Trh práce mění umělá inteligence. Nejodolnější je kombinace lidských dovedností, praktického řemesla a ochoty se celoživotně učit.",
  text: `
<ul>
<li><strong>Řemeslo.</strong> Opravy, elektro a instalatérství, šití, zahradničení, vaření – dovednosti, které mají hodnotu, když nefungují dodavatelské řetězce.</li>
<li><strong>Lidské dovednosti.</strong> Empatie, péče, komunikace, řešení konfliktů a etické úsudky AI nenahradí.</li>
<li><strong>Celoživotní učení.</strong> Využívejte kurzy, univerzitu třetího věku a mezigenerační předávání znalostí.{{ref:kampus-uhk}}</li>
<li><strong>Práce s AI.</strong> Naučte se AI používat kriticky a efektivně – kdo jí rozumí, má výhodu; kdo na ní závisí bez porozumění, je zranitelný.</li>
</ul>`
},
{
  id: "rec-krajina", title: "Zahrada, dvůr a ulice: zadržte vodu tam, kde spadne", icon: "landscape",
  shrnuti: "Každý pozemek, dvůr i balkon může pomoci krajině. Drobná opatření, opakovaná tisíci lidmi, mění vodní bilanci celého města.",
  text: `
<ul>
<li><strong>Odpojte okap.</strong> Svedením dešťové vody do sudu, nádrže, dešťové zahrady nebo vsakovacího průlehu ulevíte kanalizaci a dotujete podzemní vodu.{{ref:pocitame-s-vodou}}</li>
<li><strong>Tři zásady.</strong> Zadržte vodu tam, kam spadla; prodlužte její cestu; zpomalte ji příčnými překážkami, aby se rozlila do velké vsakovací plochy. Začněte nahoře na pozemku a v malém.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Půda a mulč.</strong> Kompost, mulč a trvalý porost chrání půdu před vysycháním a zvyšují obsah humusu, který drží vodu.</li>
<li><strong>Méně dlažby.</strong> Propustná dlažba, štěrk nebo zatravňovací tvárnice místo betonu a asfaltu.</li>
<li><strong>Stromy a keře.</strong> Listnatý strom na jižní straně domu v létě stíní a v zimě propouští světlo.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Nesekejte nakrátko.</strong> Vyšší tráva a květnaté louky lépe snášejí sucho a podporují hmyz.</li>
<li><strong>Zapojte se.</strong> Výsadby stromů, péče o tůně a mokřady a komunitní zahrady propojují osobní příklad s veřejným prostorem.{{ref:zahrada-strelak}}</li>
</ul>`
},
{
  id: "rec-zavazadlo", title: "Evakuační zavazadlo (BOB)", icon: "bag",
  shrnuti: "Při povodni, požáru nebo jiné hrozbě může být nutné opustit domov během minut. Sbalené zavazadlo šetří čas a nervy.",
  text: `
<ul>
<li><strong>Doklady a peníze.</strong> Občanský průkaz, pas, kartička pojištěnce, kopie důležitých dokumentů, hotovost.{{ref:72h}}</li>
<li><strong>Léky a hygiena.</strong> Léky na několik dní, lékárnička, hygienické potřeby.</li>
<li><strong>Voda a jídlo.</strong> Láhev s vodou, filtr, trvanlivé jídlo na 1–3 dny.</li>
<li><strong>Oblečení a spaní.</strong> Náhradní oblečení ve vrstvách, pláštěnka, spací pytel nebo deka.{{ref:cilek-nove-ostrovy}}</li>
<li><strong>Světlo a komunikace.</strong> Svítilna, nabíječka a powerbanka, rádio, papír a tužka.</li>
<li><strong>Pro děti a zvířata.</strong> Oblíbená hračka, plenky, krmivo, vodítko a přepravka.</li>
</ul>
<p>Podrobný seznam najdete v podkladu <em>Vzor vybavení evakuačního zavazadla</em> a v příručce <em>Pravidla krizového chování</em> v sekci Dokumenty. Při evakuaci vypněte vodu, plyn a elektřinu a nechte vzkaz, kam odcházíte.{{ref:cilek-ruka}}</p>`
}
];
