/* ==========================================================================
   TEMATICKÉ OBLASTI 16–21: Správa, rizika a smysl
   (právo, odpady, geopolitika, vesmír, černé labutě, spiritualita)
   ========================================================================== */
window.VIZE = window.VIZE || {};
VIZE.oblasti = VIZE.oblasti || [];

VIZE.oblasti.push(
{
  id: "pravo", num: 16, cat: "spolecnost", icon: "scale",
  title: "Právo a správa: regulace neznámého",
  shrnuti: "Legislativa zaostává za technologiemi i za klimatem. Do roku 2075 se právo bude muset vyrovnat s odpovědností umělé inteligence, právy přírody, klimatickými spory a s rozdělováním vody v době sucha.",
  fakta: [
    "Řízení v době nedostatku vody přebírá krajská komise pro sucho v čele s hejtmanem.{{ref:plan-sucho-khk}}",
    "Zpráva Stanford AI Index 2026: vládnutí a regulace nedrží krok s vývojem AI.{{ref:ai-index-2026}}"
  ],
  text: `
<h3>Darwinova past v právu</h3>
<p>Zákony vznikají roky, technologie se mění během měsíců. Tento rozpor – „Darwinova past“ – vytváří právní vakuum v oblasti umělé inteligence, autonomních vozidel, biotechnologií i digitálních měn.{{ref:ai-index-2026}} Evropská unie přijala akt o umělé inteligenci, ale jeho uplatnění v praxi a vymáhání teprve začíná. Do roku 2075 bude nutné vyřešit odpovědnost za škody způsobené AI, ochranu osobních a biometrických dat a právo člověka na lidské rozhodnutí v klíčových věcech (zdraví, soud, sociální dávky).</p>

<h3>Voda jako právní téma</h3>
<p>V době sucha se z vody stává předmět sporů – mezi zemědělci, průmyslem, obcemi a ekosystémy. Plány pro zvládání sucha stanovují, kdo a kdy omezuje odběry; v Královéhradeckém kraji řízení přebírá krajská komise pro sucho.{{ref:plan-sucho-khk}} Do roku 2075 lze očekávat přísnější pravidla pro zadržování srážkové vody na pozemcích (vodní neutralita), pro odvodnění zemědělské půdy a pro ochranu podzemních vod. Diskutuje se i o „právech přírody“ – přiznání právní subjektivity řekám, jak se to stalo na Novém Zélandu či ve Španělsku.</p>

<h3>Klimatické spory</h3>
<p>Soudy v Evropě rozhodují spory o nedostatečnou ochranu klimatu (například rozsudek Evropského soudu pro lidská práva ve věci švýcarských seniorek z roku 2024). Do roku 2075 budou klimatické spory, odpovědnost za škody ze sucha a povodní a pojistitelnost majetku běžnou agendou soudů.</p>

<h3>Automatizace justice a správy</h3>
<p>Běžné správní agendy a drobné spory bude pravděpodobně vyřizovat software. To zrychlí proces, ale vyvolává otázky spravedlnosti, transparentnosti a možnosti odvolání k člověku. Odolný právní systém musí fungovat i při výpadku digitálních služeb – papírové zálohy rejstříků a krizové postupy úřadů zůstávají důležité.</p>
`,
  grafy: [],
  vyhled: {
    a: "Pružná a transparentní regulace, voda jako společný statek, právo na lidské rozhodnutí.",
    b: "Regulace dobíhá krize se zpožděním, spory o vodu a odpovědnost přetěžují soudy.",
    c: "Právní vakuum, privatizace zdrojů, vymáhání práva silou místo institucí."
  },
  doporuceni: ["rec-digital"]
},
{
  id: "odpady", num: 17, cat: "technika", icon: "recycle",
  title: "Odpady a cirkulární ekonomika",
  shrnuti: "Odpad je surovina na špatném místě. Do roku 2075 skončí skládkování, staré skládky se budou těžit a výrobky se budou navrhovat k opravě. Spalovna v Opatovicích bude zpracovávat jen to, co nelze materiálově využít.",
  fakta: [
    "Zákaz skládkování využitelných odpadů v ČR od roku 2030; ZEVO Opatovice plánováno na rok 2030.{{ref:zevo-2030}}",
    "Trh s druhotnými surovinami propojuje firmy, pro které je odpad jiného surovinou.{{ref:cyrkl}}"
  ],
  text: `
<h3>Konec skládek</h3>
<p>Česká legislativa počítá s koncem skládkování recyklovatelných a energeticky využitelných odpadů v roce 2030. Pro region Hradce Králové a Pardubic s tím souvisí plánované zařízení pro energetické využití odpadu (ZEVO) v areálu Elektrárny Opatovice, jehož spuštění bylo kvůli povolovacím řízením posunuto na rok 2030.{{ref:zevo-2030}} V minulosti proti němu protestovaly okolní obce; debata ukazuje typický střet mezi potřebou infrastruktury a obavami místních obyvatel (efekt NIMBY). Rozhodující bude, aby spalovna nespalovala to, co lze recyklovat.</p>

<h3>Městská těžba</h3>
<p>S rostoucí cenou kovů a vzácných prvků se vyplatí těžit staré skládky, vraky a elektroodpad. Stavební suť se bude třídit a znovu používat jako recyklované kamenivo, cihly a beton. Elektronika bude navrhována tak, aby šla rozebrat; právo na opravu se stane standardem v celé EU.</p>

<h3>Plasty a chemická recyklace</h3>
<p>Plasty se budou recyklovat mechanicky i chemicky a nahrazovat materiály z obnovitelných zdrojů. Mikroplasty a jejich zdravotní dopady (viz oblast Zdraví) jsou silným argumentem pro omezení jednorázových plastů a syntetických textilií.</p>

<h3>Bioodpad a půda</h3>
<p>Biologicky rozložitelný odpad je pro krajinu cennou surovinou: kompost zvyšuje obsah humusu a tím schopnost půdy zadržet vodu (viz oblast Krajina a zadržování vody). Komunitní a domácí kompostování, bioplynové stanice a kompostárny propojují město s okolními poli.</p>
`,
  grafy: [],
  vyhled: {
    a: "Téměř uzavřené materiálové cykly, městská těžba, kompost vrací humus do půdy.",
    b: "Recyklace roste, ale spotřeba také. Spalování a skládky v šedé zóně přetrvávají.",
    c: "Rozpad svozu a třídění, černé skládky, spalování odpadu v domácnostech a toxický vzduch."
  },
  doporuceni: ["rec-krajina"]
},
{
  id: "geopolitika", num: 18, cat: "rizika", icon: "globe", novy: true,
  title: "Geopolitika a bezpečnost: věk soupeření",
  shrnuti: "Svět v roce 2026 prožívá nejvíce ozbrojených konfliktů od konce studené války. Válka na Ukrajině, válka s Íránem a soupeření velmocí přímo zasahují ceny energie, potravin i bezpečnost Česka. Rok 2075 bude formován tím, zda se podaří obnovit pravidla.",
  fakta: [
    "2025: 65 státních ozbrojených konfliktů (57 vnitrostátních, 8 mezistátních) – nejvíce od roku 1989.{{ref:owid-konflikty}}",
    "Ukrajina: Rusko kontroluje asi 19 % území (9/2026); dubnové příměří 2026 nevydrželo.{{ref:ukrajina-zari-2026}}{{ref:primeri-2026}}",
    "Válka s Íránem od 28. 2. 2026, uzavření Hormuzského průlivu, boje obnoveny v červenci.{{ref:valka-iran}}",
    "Hodiny posledního soudu 2026: 85 sekund do půlnoci.{{ref:doomsday-2026}}"
  ],
  text: `
<h3>Svět konfliktů</h3>
<p>Podle databáze UCDP probíhalo v roce 2025 65 ozbrojených konfliktů s účastí státu, z toho osm mezistátních – nejvíce od konce studené války.{{ref:owid-konflikty}} Paradoxně počet obětí v přepočtu na obyvatele zůstává hluboko pod úrovní 20. století; tento rozpor („přibývá válek, ale ubývá obětí“) podrobně rozebírá podkladová studie <em>Analýza globálních konfliktů a predikce</em>, kterou najdete v sekci Dokumenty. Válka se mění: drony, rakety dlouhého doletu, kybernetické útoky a útoky na civilní infrastrukturu (energetika, odsolovací zařízení, vodárny) se stávají běžnými nástroji.</p>

<h3>Ukrajina</h3>
<p>Válka na Ukrajině pokračuje pátým rokem. Koncem září 2026 kontrolovalo Rusko asi 19 % ukrajinského území, ale fronta se posouvá jen o desítky kilometrů čtverečních měsíčně. Západní odhady počítají ruské ztráty na zhruba milion mrtvých a raněných, ukrajinské na 250–300 tisíc; ruské údery zničily přes 80 % ukrajinské výrobní kapacity elektřiny. Dubnové příměří v roce 2026 trvalo jen 32 hodin. Většina Ukrajinců i Rusů si podle průzkumů přeje jednání o konci války.{{ref:ukrajina-zari-2026}}{{ref:primeri-2026}} Zkušenosti ukrajinských měst – výpadky elektřiny, „body nezlomnosti“ s teplem a nabíjením, role samospráv a sousedů – popisují autoři <em>Nových ostrovů</em> jako přímé poučení pro české obce.{{ref:cilek-nove-ostrovy}}</p>

<h3>Válka s Íránem</h3>
<p>Údery USA a Izraele na Írán 28. února 2026 rozpoutaly regionální válku: Írán zaútočil na Izrael, americké základny i státy Perského zálivu, zablokoval Hormuzský průliv a zasáhl energetickou infrastrukturu včetně katarského komplexu na zkapalňování plynu. Dvoutýdenní příměří z 8. dubna se zhroutilo, memorandum z Islámábádu z června vydrželo do července, kdy Írán napadl obchodní lodě v průlivu a boje se obnovily.{{ref:valka-iran}} Pro Evropu to znamenalo energetický šok a debatu o zapojení NATO.</p>

<h3>Česko a NATO</h3>
<p>Česká republika je členem NATO a EU, ale v roce 2026 podle premiéra nesplní závazek vydávat na obranu 2 % HDP – vláda vykazuje 2,06 %, NATO uznává 1,78 % – natož vyšší cíle dohodnuté v rámci aliance pro příští dekádu.{{ref:obrana-2026}} Světové ekonomické fórum hodnotí geoekonomickou konfrontaci a ozbrojené konflikty mezi státy jako nejvážnější krátkodobá globální rizika.{{ref:wef-2026}} Václav Cílek v knize <em>Nové ostrovy</em> klade otázku „víc tanků, nebo soudržná společnost?“ a odpovídá, že bez soudržnosti a připravenosti obyvatel nepomohou ani zbraně.{{ref:cilek-nove-ostrovy}}</p>

<h3>Výhled do roku 2075</h3>
<p>Mezi klíčové proměnné patří vztahy USA, Číny a Ruska, stabilita Blízkého východu, migrace z klimaticky postižených oblastí a šíření jaderných zbraní. Hodiny posledního soudu ukazují v roce 2026 jen 85 sekund do půlnoci.{{ref:doomsday-2026}} Pro Hradec Králové jako vnitrozemské město střední Evropy je nejpravděpodobnějším dopadem nepřímé působení – ceny energie a potravin, kybernetické útoky, dezinformace a migrace – spíše než přímé vojenské ohrožení. Odolnost proto znamená hlavně spolehlivé zásobování, informovanost a soudržnost.</p>
`,
  grafy: ["konflikty-pocet", "konflikty-obeti"],
  vyhled: {
    a: "Nová bezpečnostní architektura, odzbrojení a spolupráce na klimatu. Konflikty ustupují.",
    b: "Studená válka 2.0, regionální konflikty, vysoké výdaje na obranu a opakované energetické šoky.",
    c: "Válka velmocí nebo kaskáda regionálních válek, útoky na infrastrukturu v Evropě, masová migrace."
  },
  doporuceni: ["rec-plan", "rec-komunikace"]
},
{
  id: "vesmir", num: 19, cat: "rizika", icon: "orbit",
  title: "Vesmír: závislost na orbitě a otázka jiných civilizací",
  shrnuti: "Navigace, komunikace, předpověď počasí i zemědělství závisí na satelitech. Sluneční bouře a zahlcení oběžné dráhy jsou reálná rizika. Otázka mimozemského života a fenoménu UAP zůstává otevřená a vyžaduje střízlivý vědecký přístup.",
  fakta: [
    "Úřad AARO (Pentagon) eviduje přes 2 000 případů neidentifikovaných jevů; zákon NDAA 2026 rozšiřuje povinnost informovat Kongres.{{ref:aaro-ndaa}}",
    "Silná geomagnetická bouře v květnu 2024 (G5) ukázala citlivost satelitů a sítí; vrchol 25. slunečního cyklu nastal kolem roku 2024–2025."
  ],
  text: `
<h3>Závislost na oběžné dráze</h3>
<p>Satelitní navigace (GPS, Galileo), synchronizace času v energetických a platebních sítích, komunikace, předpověď počasí a precizní zemědělství závisí na družicích. Výpadek by město paralyzoval rychleji, než si většina lidí uvědomuje. Hrozbou je <strong>Kesslerův syndrom</strong> – řetězová srážka trosek, která by znemožnila využívat některé dráhy –, protidružicové zbraně a <strong>extrémní sluneční bouře</strong>. Událost srovnatelná s Carringtonovou bouří z roku 1859 by mohla poškodit transformátory a satelity na celém světě; podkladová studie <em>Pravděpodobnost velké sluneční erupce</em> v sekci Dokumenty rozebírá její pravděpodobnost a dopady.</p>

<h3>Hledání života</h3>
<p>Do roku 2075 budou teleskopy schopné hledat biosignatury v atmosférách planet podobných Zemi. Objev mikrobiálního života mimo Zemi je v tomto horizontu reálný; kontakt s technologickou civilizací je mnohem méně pravděpodobný. Fermiho paradox – proč nevidíme stopy jiných civilizací, když galaxie obsahuje stovky miliard hvězd – vede k úvahám o „velkých filtrech“, které mohou civilizace ukončit.{{ref:fermi-yt}} Pro lidstvo je z toho poučení: přežití technologické civilizace není samozřejmé.</p>

<h3>Fenomén UAP</h3>
<p>Neidentifikované anomální jevy (UAP) se staly předmětem oficiálního zkoumání. Americký úřad AARO eviduje přes 2 000 případů a zákon o obranném rozpočtu na rok 2026 mu ukládá informovat Kongres o zachyceních neidentifikovaných objektů systémy NORAD od roku 2004 a přezkoumat přehnané utajování.{{ref:aaro-ndaa}} Většina hlášení má po prošetření běžné vysvětlení (drony, balony, satelity, optické jevy); menší část zůstává nevysvětlena kvůli nedostatku dat. Z vědeckého hlediska dosud neexistuje veřejně ověřený důkaz mimozemského původu. Případný kontakt s jinou civilizací – nebo „pomoc zvenčí“ – proto řadíme mezi černé labutě: nelze ji vyloučit, ale nelze na ni spoléhat při plánování.</p>
`,
  grafy: [],
  vyhled: {
    a: "Bezpečná a regulovaná oběžná dráha, odolné sítě s pozemními zálohami, otevřený vědecký výzkum UAP.",
    b: "Rostoucí zahlcení orbity a militarizace vesmíru, občasné výpadky navigace a komunikace.",
    c: "Kesslerův syndrom nebo extrémní sluneční bouře, dlouhodobý výpadek satelitních služeb."
  },
  doporuceni: ["rec-komunikace", "rec-doprava"]
},
{
  id: "cerne-labute", num: 20, cat: "rizika", icon: "swan",
  title: "Černé labutě: nepravděpodobné události s obřím dopadem",
  shrnuti: "Na konkrétní černou labuť se připravit nelze. Lze ale budovat obecnou odolnost – zásoby, dovednosti, rezervy a soudržnost –, která pomáhá v jakékoli krizi. Rok 2026 ukázal, že „nepravděpodobné“ události mohou přijít současně.",
  fakta: [
    "AMOC: ve všech modelech s vysokými emisemi se hluboké atlantické proudění po roce 2100 zastaví; bod zlomu může přijít dříve.{{ref:amoc-2025}}",
    "Krize „chodí spolu“: blackouty nejčastěji provázejí vedra, námrazu a vichřice.{{ref:cilek-nove-ostrovy}}"
  ],
  text: `
<h3>Co je černá labuť</h3>
<p>Nassim Nicholas Taleb označuje jako černé labutě události, které jsou vzácné, mají obrovský dopad a zpětně se zdají předvídatelné.{{ref:taleb}} V plánování do roku 2075 je nutné s nimi počítat – ne proto, že víme, která nastane, ale proto, že v horizontu padesáti let je velmi pravděpodobné, že nastane alespoň jedna.</p>

<h3>Katalog možných černých labutí</h3>
<ul>
<li><strong>Kolaps AMOC</strong> – zastavení atlantického převratného proudění by ochladilo severozápadní Evropu, změnilo srážky a zvedlo hladinu moří na pobřeží Atlantiku. Studie z roku 2025 ukazuje zastavení po roce 2100 ve všech scénářích s vysokými emisemi a pozorované oslabení konvekce v posledních letech.{{ref:amoc-2025}}</li>
<li><strong>Velká sopečná erupce</strong> – erupce typu Tambora (1815) by způsobila „rok bez léta“, neúrodu a cenový šok potravin na celém světě.</li>
<li><strong>Extrémní sluneční bouře</strong> – výpadek elektrických sítí a satelitů na rozsáhlém území (viz oblast Vesmír).</li>
<li><strong>Pandemie</strong> – přirozená nebo uniklá z laboratoře, případně syntetický patogen.{{ref:rees}}</li>
<li><strong>Selhání AI nebo kybernetický útok</strong> na kritickou infrastrukturu.</li>
<li><strong>Jaderná válka nebo terorismus.</strong></li>
<li><strong>Souběh krizí</strong> – například dlouhé sucho, vlna veder, blackout a energetický šok zároveň. Rok 2026 ukázal, že takový souběh není teoretický.</li>
<li><strong>Pozitivní černé labutě</strong> – technologický průlom (levné ukládání energie, fúze), objev mimozemského života nebo nečekaná vlna mezinárodní spolupráce.</li>
</ul>

<h3>Jak se připravit na nepředvídatelné</h3>
<p>Václav Cílek připomíná, že krize mívají společný vzorec – chaotický začátek, nedostatek vody, energie, potravin a informací – a že se na ně lze připravit obecnými kroky, nikoli dokonalou předpovědí.{{ref:cilek-ruka}} Patří sem rezervy (zásoby, finanční polštář), redundance (více zdrojů vody, energie a informací), dovednosti (první pomoc, opravy, vaření bez elektřiny) a vztahy (sousedé, rodina, komunita). Totéž platí pro město: rezervy ve vodárenství, energetické ostrovy, krizové plány a nacvičené postupy.</p>
`,
  grafy: [],
  diagram: "blackout",
  vyhled: {
    a: "Černá labuť přijde, ale město ji díky rezervám a soudržnosti zvládne a poučí se z ní.",
    b: "Krize způsobí značné škody, obnova trvá roky, poučení je jen částečné.",
    c: "Souběh černých labutí spustí kaskádový rozpad systémů."
  },
  doporuceni: ["rec-plan", "rec-energie", "rec-psychika"]
},
{
  id: "spiritualita", num: 21, cat: "spolecnost", icon: "spark",
  title: "Spiritualita a smysl: kotvy ve věku nerovnováhy",
  shrnuti: "Ve světě nejistoty roste potřeba smyslu, rituálu a společenství. Spiritualita – náboženská i sekulární – může být zdrojem odolnosti, ale i útěkem z reality nebo nástrojem manipulace.",
  fakta: [
    "Nové ostrovy (2024) věnují samostatnou kapitolu duchovním krizovým strategiím – rituálu, modlitbě a meditaci.{{ref:cilek-nove-ostrovy}}"
  ],
  text: `
<h3>Spiritualita jako nástroj odolnosti</h3>
<p>Václav Cílek opakovaně zdůrazňuje, že vnější proměna krajiny musí být doprovázena proměnou vnitřní. V knize <em>Nové ostrovy</em> popisuje Tomáš Sax duchovní krizové strategie – soucitnou přítomnost, rituál, modlitbu a meditaci – a roli vděčnosti a kaplanů v krizových situacích.{{ref:cilek-nove-ostrovy}} Zkušenost z válek a katastrof ukazuje, že lidé, kteří vidí v utrpení smysl a mají oporu ve společenství, se zotavují rychleji.</p>
<ul>
<li><strong>Sakrální ekologie.</strong> V reakci na klimatické změny sílí vnímání řek, lesů a krajiny jako něčeho, co má hodnotu samo o sobě. Pro Hradec Králové na soutoku dvou řek to může znamenat nový vztah k Labi a Orlici.</li>
<li><strong>Rituály a společenství.</strong> Tradiční poutě, svátky, ale i sekulární setkání (společné sázení stromů, slavnosti vody) posilují identitu a psychickou odolnost.</li>
<li><strong>Smysl v době zjednodušování.</strong> Spiritualita poskytuje příběh, který umožňuje najít smysl i v podmínkách stagnace či skromnosti.</li>
</ul>

<h3>Etická brzda moci</h3>
<p>František Koukolík varuje před mocenskou pýchou a „debilizací“ společnosti. Etické a duchovní tradice, které zdůrazňují pokoru, službu a odpovědnost, fungují jako protiváha syndromu hybris. Koukolíkova „třetí kultura“ propojuje vědecké poznání s humanitním a duchovním rozměrem.{{ref:koukolik-eseje}}</p>

<h3>Technologie a víra</h3>
<p>Kolem roku 2075 se může umělá inteligence stát objektem „digitálního náboženství“ – vírou, že superinteligence vyřeší všechny problémy. To nese riziko technokratické slepoty a manipulace. Současně se rozvíjí i opačný proud: duchovní praxe jako meditace a digitální půst jsou chápány jako prevence kognitivního úpadku a vyhoření.</p>

<h3>Kosmická perspektiva</h3>
<p>Diskuse o mimozemském životě, Fermiho paradoxu a fenoménu UAP (viz oblast Vesmír) otevírá otázky o místě člověka ve vesmíru. Ať už výsledky výzkumu budou jakékoli, pohled na Zemi jako na křehký „ostrov“ v kosmu může posilovat pocit odpovědnosti za planetu – za předpokladu, že se nestane únikem od řešení pozemských problémů.</p>
`,
  grafy: [],
  vyhled: {
    a: "Spiritualita jako integrující síla, etika služby a péče o krajinu, mezináboženský a sekulární dialog.",
    b: "Rozmanité duchovní proudy, část lidí utíká do virtuálních světů a ezoteriky.",
    c: "Fanatismus, sekty a radikalizace, zneužití víry k ospravedlnění násilí."
  },
  doporuceni: ["rec-psychika", "rec-komunita"]
}
);
