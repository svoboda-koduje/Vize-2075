/* ==========================================================================
   SCÉNÁŘE VÝVOJE DO ROKU 2075, SROVNÁVACÍ TABULKA A SIGNPOSTY
   ========================================================================== */
window.VIZE = window.VIZE || {};

VIZE.scenare = [
{
  id: "a", key: "a", title: "Resilientní město", label: "Optimistický scénář",
  motto: "Vítězství rozumu, spolupráce a adaptace",
  shrnuti: "Krize 20. a 30. let fungovaly jako katalyzátor. Hradec Králové je „modro-zelené“ město s decentralizovanou energetikou, obnovenou krajinou a silnou komunitou.",
  text: `
<p>V tomto scénáři se společnosti podařilo překonat krátkozrakost a „stupiditu moci“. Sucho roku 2026 a následující suché roky se staly impulsem: obce, zemědělci a stát začali systematicky obnovovat schopnost krajiny zadržet vodu. Do roku 2045 se zvýšil obsah humusu v půdách Polabí, vrátily se meze, remízky a mokřady a podzemní vody se postupně doplňují.</p>
<p>V roce 2075 je Hradec Králové „modro-zeleným městem“. Náměstí stíní stromy a plachty, dešťová voda se zachycuje v parcích a vnitroblocích, zelený prstenec Městských lesů, niv Labe a Orlice a zahrad ochlazuje přicházející vzduch. Vedra jsou častá, ale město je díky stínu, vodě a pasivnímu chlazení budov obyvatelné; počet úmrtí z horka klesá.</p>
<p>Energetika je decentralizovaná: čtvrti fungují jako energetická společenství s fotovoltaikou, bateriemi a tepelnými čerpadly, jádro z Dukovan a Temelína zajišťuje základ. Město vyrobí třetinu své spotřeby a výpadky jsou krátké a lokální. Doprava stojí na taktové elektrifikované železnici, kolech a sdílené mobilitě; VRT do Prahy byla dokončena po roce 2040.</p>
<p>Společnost stárne, ale aktivní senioři jsou mentory, dobrovolníky a nositeli řemesel. Rodinná politika a dostupné bydlení zvedly porodnost k 1,6–1,7 a integrace migrantů je úspěšná. Umělá inteligence je veřejnou infrastrukturou pod demokratickou kontrolou a slouží vzdělání a zdraví.</p>
<p><strong>Klíčové faktory:</strong> včasná adaptace (do roku 2040), investice do krajiny a lidí, důvěra v instituce, kontinuita politik napříč volebními obdobími, etické využití technologií.</p>`,
  den: `Je 7. července 2075, ráno 6:30. Šedesátičtyřletý učitel z Moravského Předměstí otevírá okna, aby dovnitř pustil noční chlad, a pak zatahuje venkovní žaluzie; dům má zelenou střechu a baterie ve sklepě sdílené s celou ulicí. Na kole po stinné cyklostezce podél Orlice dojede za deset minut na nádraží a taktovým vlakem každých 15 minut je za 20 minut v Pardubicích. Škola má vlastní fotovoltaiku, zahradu s jezírkem a „krizový kout“, kde žáci v prvním ročníku cvičí první pomoc a obsluhu filtru na vodu. Výuka probíhá s osobními AI tutory, ale odpoledne patří diskusi, dílně a terénu. Na zpáteční cestě se zastaví v komunitní zahradě Na Střeláku, kde se domlouvá zálivka z podzemní nádrže. Večer je 34 °C, ale park u domu je díky stromům a vodě o šest stupňů chladnější.`
},
{
  id: "b", key: "b", title: "Město adaptace", label: "Realistický scénář",
  motto: "„Muddling through“ – nějak to proplácáme",
  shrnuti: "Společnost se nezhroutila, ale ani nevyřešila své strukturální problémy. Hradec Králové je městem kontrastů, drahé vody a energie, technokracie a polarizace.",
  text: `
<p>Toto je scénář pokračování současných trendů s reaktivním řešením problémů. Opatření proti suchu přicházejí po každé krizi, ale realizují se pomalu a nesystematicky. Krajina se zlepšuje ostrůvkovitě: vedle obnovených mokřadů a sadů zůstávají velké odvodněné lány. Sucho se opakuje každé dva až tři roky, státní kompenzace zemědělcům jsou pravidelnou položkou rozpočtu.</p>
<p>Hradec Králové v roce 2075 je městem kontrastů. Historické centrum a nové čtvrti mají stín, zeleň a klimatizaci; starší sídliště trpí tepelným stresem a chátrají. Voda je dostupná, ale drahá a v létě opakovaně omezovaná. Energetika kombinuje staré a nové zdroje, ceny jsou vysoké a část domácností žije v energetické chudobě; v zimě se elektřina dováží.</p>
<p>Zdravotnictví je technicky špičkové, ale plně dostupné jen s připojištěním. Populace stárne a zmenšuje se, nedostatek pracovníků v péči řeší migrace bez dobré integrace. Společnost je polarizovaná, informační prostor ovládají platformy a politika je krátkodobá. Lidé se často utíkají do virtuálních světů.</p>
<p><strong>Klíčové faktory:</strong> reaktivní řízení krizí, technologický optimismus bez sociálního rozměru, dominance krátkodobých ekonomických zájmů, setrvačnost institucí.</p>`,
  den: `Ráno 7. července 2075 ukazuje teploměr na balkoně v panelovém domě už 27 °C. Klimatizace v bytě jede na noční tarif, přes den je kvůli špičce v síti omezená. Učitel jede do práce elektrobusem a regionálním vlakem; spoje jsou modernější než v roce 2026, ale v létě se kvůli přehřátým trakčním zařízením zpožďují. Ve škole chybí kolegové, třídy jsou spojené a výuku z velké části vede AI platforma, kterou škola nemá prostředky kontrolovat. Žáci ji používají obratně, ale delší text přečte jen menšina. Odpoledne přijde SMS od vodárny: od zítřka platí zákaz zalévání zahrad. Večer v televizi debata o dalším odkladu klimatického plánu kraje.`
},
{
  id: "c", key: "c", title: "Fragmentované město", label: "Pesimistický scénář",
  motto: "Vítězství hybris a entropie",
  shrnuti: "Kaskádové selhání systémů – nezvládnutá klimatická změna, energetické šoky, konflikty a ztráta soudržnosti – rozdělilo město na izolované enklávy.",
  text: `
<p>Scénář kolapsu v důsledku souběhu krizí. Varování vědců byla ignorována, adaptace se odkládala a investice šly do krátkodobých projektů. Série suchých let po roce 2030 vyčerpala podzemní vody, zemědělství v Polabí ustoupilo a krajina se mění ve step s prašnými bouřemi. Energetické šoky a geopolitické konflikty opakovaně narušily zásobování.</p>
<p>V roce 2075 Hradec Králové jako jednotný a funkční celek fakticky neexistuje. Bohaté enklávy mají vlastní vodu, energii, výrobu potravin a soukromou ochranku. Zbytek města trpí výpadky vody, elektřiny a tepla; část sídlišť je bez funkčních výtahů a čerpadel. Centrální infrastruktura se neopravuje, lidé spalují, co najdou, a vzduch je v zimě toxický.</p>
<p>Pitná voda se stává předmětem černého trhu, zdravotnictví kolabuje při každé vlně veder nebo epidemii, rezistentní infekce jsou běžné. Moc přebírají lokální „warlordi“ a autoritářské struktury, informace kontrolují ti, kdo ovládají sítě. Přežívají malé, soudržné a odolné komunity, které se vrátily k jednodušším formám života.</p>
<p><strong>Klíčové faktory:</strong> ignorování vědy, neschopnost elit vzdát se moci a zisku, křehkost hyperoptimalizovaných systémů, ztráta solidarity a důvěry.</p>`,
  den: `7. července 2075, 5:00. Voda v sedmém patře teče jen dvě hodiny ráno, takže učitel plní kanystry. Elektřina je na příděl, výtah nefunguje od jara. Vlak do Pardubic jezdí dvakrát denně a jen tehdy, když je proud; dnes ne. Jede tedy 25 km na kole po silnici, kde je bezpečnější jet ve skupině. Škola funguje tři dny v týdnu, polovina žáků chybí, protože pomáhají rodinám se sháněním vody a jídla. Učí bez techniky, z vlastních knih – a překvapivě to funguje: děti se učí první pomoc, pěstování a opravy. Večer se dům schází na dvoře a domlouvá hlídky u vchodu. „Jsme ostrov,“ říká soused, „ale ostrov, který drží spolu.“`
}
];

/* Srovnávací tabulka: oblast, A, B, C */
VIZE.scenareTabulka = [
  ["Klima a horko", "Oteplení ~2 °C, město díky zeleni a vodě obyvatelné", "Oteplení 2,5–3 °C, vedra zvládána klimatizací", "Přes 3 °C, centrum v létě přes den neobyvatelné"],
  ["Voda a krajina", "Obnovená krajina, doplněné podzemní vody", "Drahá voda, opakovaná omezení, ostrůvky obnovy", "Vyčerpané zdroje, cisterny a černý trh"],
  ["Potraviny", "Regenerativní zemědělství a lokální produkce", "Kolísající výnosy, drahé potraviny", "Neúrody, příděly"],
  ["Energetika", "Energetické komunity, jádro + OZE", "Mix zdrojů, vysoké ceny, dovoz", "Nedostatek, dlouhé blackouty"],
  ["Doprava", "Taktová železnice, VRT po 2040, kola", "Auto dominantní a drahé", "Kolo a pěší jako jediná jistota"],
  ["Společnost", "Solidarita, aktivní stáří, úspěšná integrace", "Polarizace a nerovnost", "Rozvrat, násilí, enklávy"],
  ["Technologie a AI", "Veřejná infrastruktura pod kontrolou", "Všudypřítomná, ovládaná korporacemi", "Selhání a zneužití, kolaps důvěry"],
  ["Politika", "Participace a dlouhodobé strategie", "Demokratura, krátkodobost", "Autoritářství, lokální warlordi"],
  ["Zdraví", "Prevence, chladná města, dlouhověkost", "Špičková péče pro movité", "Kolaps zdravotnictví, epidemie"],
  ["Spiritualita", "Integrující síla, etika péče", "Únik do virtuálních světů", "Fanatismus a radikalizace"]
];

/* Signposty – ukazatele, podle kterých lze sledovat směr vývoje */
VIZE.signposty = [
  { ukazatel: "Zásoby podzemní vody a půdní vláha", kde: "ČHMÚ, InterSucho", a: "Hladiny v hlubokých vrtech se po suchých letech vracejí k normálu", c: "Každé sucho začíná z nižší výchozí hladiny než předchozí" },
  { ukazatel: "Obsah humusu a eroze zemědělské půdy", kde: "Výzkumné ústavy, MZe", a: "Plocha s meziplodinami, mezemi a stromy roste", c: "Pokračuje eroze a zábor půdy" },
  { ukazatel: "Tropické noci a úmrtnost ve vlnách veder", kde: "ČHMÚ, ČSÚ", a: "Úmrtnost při vedrech klesá i přes rostoucí teploty", c: "Úmrtnost roste rychleji než počet veder" },
  { ukazatel: "Podíl elektřiny vyrobené ve městě a komunitách", kde: "ERÚ, město", a: "Roste počet energetických společenství a baterií", c: "Rostou výpadky a energetická chudoba" },
  { ukazatel: "Úhrnná plodnost a integrace migrantů", kde: "ČSÚ", a: "Plodnost se stabilizuje nad 1,5, migranti se integrují", c: "Plodnost pod 1,3, napětí a paralelní společnosti" },
  { ukazatel: "Důvěra v instituce a volební účast", kde: "Sociologické průzkumy", a: "Důvěra a participace rostou", c: "Rostou polarizace, apatie a násilí" },
  { ukazatel: "Kontinuita dlouhodobých plánů (voda, energie, doprava)", kde: "Vláda, kraj, město", a: "Plány přežívají změny vlád", c: "Každá vláda ruší plány předchůdců" },
  { ukazatel: "Počet ozbrojených konfliktů a cena ropy", kde: "UCDP, IEA", a: "Konflikty ubývají, ceny se stabilizují", c: "Konflikty a cenové šoky se opakují a prohlubují" }
];
