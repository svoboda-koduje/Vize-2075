/* ==========================================================================
   ZDROJE — seznam literatury a webových zdrojů
   key  = interní klíč pro citace v textech ({{ref:key}})
   stav = výsledek kontroly odkazu 4. 10. 2026:
          "ok" funkční, "fix" opravená/nahrazená adresa, "kniha" tištěná publikace
   ========================================================================== */
window.VIZE = window.VIZE || {};
VIZE.overeno = "4. 10. 2026";
VIZE.zdrojeSkupiny = [
  ["klima", "Klima, voda a sucho"],
  ["krajina", "Krajina, zemědělství a biosféra"],
  ["energie", "Energie, suroviny a ekonomika"],
  ["spolecnost", "Společnost, demografie a zdraví"],
  ["technologie", "Technologie, doprava a vesmír"],
  ["bezpecnost", "Geopolitika a bezpečnost"],
  ["pripravenost", "Krizová připravenost"],
  ["region", "Hradec Králové a region"],
  ["knihy", "Knihy a odborné publikace"]
];
VIZE.zdroje = [
  /* --- Klima, voda a sucho --- */
  { key: "intersucho", cat: "klima", title: "InterSucho – monitoring a předpověď sucha", meta: "Ústav výzkumu globální změny AV ČR (CzechGlobe) a Mendelova univerzita v Brně", url: "https://www.intersucho.cz/cs/", stav: "ok" },
  { key: "intersucho-akt", cat: "klima", title: "InterSucho – aktuality a hodnocení sezony 2026", meta: "CzechGlobe, průběžně 2026", url: "https://www.intersucho.cz/cs/aktuality/", stav: "ok" },
  { key: "chmu-uzemni", cat: "klima", title: "Územní teplota a srážky (měsíční tabulky 2025–2026)", meta: "Český hydrometeorologický ústav", url: "https://www.chmi.cz/namerena-data/historicka-data/uzemni-teplota-a-srazky", stav: "ok" },
  { key: "chmu-sucho-2026", cat: "klima", title: "Sucho se znovu výrazně prohlubuje", meta: "ČHMÚ, 27. 5. 2026", url: "https://www.chmi.cz/-/o-chmu/aktuality/sucho-se-znovu-v%C3%BDrazn%C4%9B-prohlubuje", stav: "ok" },
  { key: "sucho-65let", cat: "klima", title: "Ještě horší, než se čekalo. Sucho v Česku je největší za 65 let", meta: "TN.cz podle ČHMÚ, jaro 2026", url: "https://tn.nova.cz/zpravodajstvi/clanek/646780-jeste-horsi-nez-se-cekalo-sucho-v-cesku-je-nejvetsi-za-65-let", stav: "ok" },
  { key: "leto-2026", cat: "klima", title: "Letošní léto bylo druhé nejteplejší od roku 1961, vyskytly se dvě extrémní vlny veder", meta: "In-počasí, 2. 9. 2026", url: "https://www.in-pocasi.cz/clanky/vyznacne/letosni-leto-bylo-druhe-2-9-2026/", stav: "ok" },
  { key: "oazk-2025", cat: "klima", title: "Hodnocení změny klimatu a adaptačních potřeb ČR 2025", meta: "MŽP, ČHMÚ a CzechGlobe (projekty PERUN a SustES), 3/2026", url: "https://mzp.gov.cz/system/files/2026-03/OAZK_Hodnoceni_zmeny_klimatu_a_adaptacnich_potreb_CR_2025-20260301.pdf", stav: "fix", pozn: "nahrazuje nefunkční článek ČT24 o modelu klimatu (chyba 404)" },
  { key: "rok-2025-cr", cat: "klima", title: "Rok 2025 byl v Česku třináctý nejteplejší za 65 let", meta: "Seznam Zprávy podle ČHMÚ, 1/2026", url: "https://www.seznamzpravy.cz/clanek/domaci-zivot-v-cesku-rok-2025-byl-v-cesku-trinacty-nejteplejsi-za-65-let-295277", stav: "ok" },
  { key: "chmu-rocenka-2024", cat: "klima", title: "Rok 2024 byl nejteplejším rokem na území Česka (tisková zpráva ke klimatologické ročence)", meta: "ČHMÚ, 2025", url: "https://intranet.chmi.cz/files/portal/docs/tiskove_zpravy/2025/TZ_rocenka_klimatologie_2024.pdf", stav: "ok" },
  { key: "c3s-2025", cat: "klima", title: "2025 was the third-warmest year on record", meta: "Copernicus Climate Change Service / ECMWF, 1/2026", url: "https://www.ecmwf.int/en/about/media-centre/news/2025/2025-third-warmest-year", stav: "ok" },
  { key: "c3s-srpen-2026", cat: "klima", title: "August 2026 joint hottest month on record: Copernicus", meta: "Down To Earth, 9/2026", url: "https://www.downtoearth.org.in/climate-change/august-2026-joint-hottest-month-on-record-copernicus", stav: "ok" },
  { key: "co2-432", cat: "klima", title: "Annual Carbon Dioxide Peak Reaches 432 Parts per Million", meta: "UC San Diego – Scripps Institution of Oceanography, 11. 6. 2026", url: "https://today.ucsd.edu/story/annual-carbon-dioxide-peak-reaches-432-parts-per-million", stav: "ok" },
  { key: "noaa-co2", cat: "klima", title: "Trends in Atmospheric Carbon Dioxide", meta: "NOAA Global Monitoring Laboratory", url: "https://gml.noaa.gov/ccgg/trends/", stav: "ok" },
  { key: "owid-teplota", cat: "klima", title: "Annual temperature anomalies (ERA5)", meta: "Our World in Data podle Copernicus", url: "https://ourworldindata.org/grapher/annual-temperature-anomalies", stav: "ok" },
  { key: "amoc-2025", cat: "klima", title: "Shutdown of northern Atlantic overturning after 2100 following deep mixing collapse in CMIP6 projections", meta: "Drijfhout S. a kol., Environmental Research Letters 20 (2025)", url: "https://doi.org/10.1088/1748-9326/adfa3b", stav: "ok" },
  { key: "ipcc-ar6", cat: "klima", title: "AR6 Synthesis Report: Climate Change 2023", meta: "Mezivládní panel pro změnu klimatu (IPCC)", url: "https://www.ipcc.ch/report/ar6/syr/", stav: "ok" },
  { key: "uhi-plos", cat: "klima", title: "Innovate green building for urban heat mitigation and adaptation", meta: "PLOS Climate, 2024", url: "https://journals.plos.org/climate/article?id=10.1371/journal.pclm.0000352", stav: "ok" },
  { key: "pocitame-s-vodou", cat: "klima", title: "Definice modro-zelené infrastruktury", meta: "Počítáme s vodou", url: "https://www.pocitamesvodou.cz/definice-modro-zelene-infrastruktury/", stav: "ok" },
  { key: "povodi-labe", cat: "klima", title: "Povodí Labe, státní podnik – hydrologické informace a správa toků", meta: "Povodí Labe, s. p.", url: "https://www.pla.cz/", stav: "fix", pozn: "nahrazuje odkaz na vyhledávání Google" },
  { key: "sucho-pla-2026", cat: "klima", title: "Sucho zasáhlo více než polovinu území Povodí Labe", meta: "Vodárenství.cz, 7. 8. 2026", url: "https://www.vodarenstvi.cz/2026/08/07/sucho-zasahlo-vice-nez-polovinu-uzemi-povodi-labe/", stav: "ok" },

  /* --- Krajina, zemědělství a biosféra --- */
  { key: "krajina-retence", cat: "krajina", title: "Krajina zvládá zadržet jen zlomek vody z přívalových srážek", meta: "ČT24 (VÚV T. G. Masaryka, Lesy ČR), 4. 7. 2024", url: "https://ct24.ceskatelevize.cz/clanek/veda/krajina-zvlada-zadrzet-jen-zlomek-vody-z-privalovych-srazek-350854", stav: "ok" },
  { key: "bobri-brdy", cat: "krajina", title: "Bobři od Rokycan světovými mediálními hvězdami: proč ušetřili za mokřady desítky milionů", meta: "České stavby, 2025", url: "https://www.ceskestavby.cz/clanky/bobri-od-rokycan-svetovymi-medialnimi-hvezdami-proc-usetrili-za-mokrady-desitky-milionu-35583.html", stav: "ok" },
  { key: "planetarni-hranice", cat: "krajina", title: "Planetary Health Check 2025: seven of nine planetary boundaries now breached", meta: "Stockholm Resilience Centre / PIK, 24. 9. 2025", url: "https://www.stockholmresilience.org/news--events/general-news/2025-09-24-seven-of-nine-planetary-boundaries-now-breached", stav: "ok" },
  { key: "body-zlomu-2025", cat: "krajina", title: "Global Tipping Points Report 2025: pivotal moment for humanity", meta: "The Open University / University of Exeter, 10/2025", url: "https://www.open.ac.uk/blogs/news/science-mct/pivotal-moment-for-humanity-as-global-tipping-points-edge-closer-to-irreversible-change/", stav: "ok" },
  { key: "sklizen-2026", cat: "krajina", title: "Sklizeň 2026: sucho a vlny veder sráží výnosy v celé Evropě", meta: "Českomoravský svaz zemědělských podnikatelů, 4. 8. 2026", url: "https://cmszp.cz/mze/2026/sklizen-2026-sucho-a-vlny-veder-srazi-vynosy-v-cele-evrope-v-cesku-je-vetsina-obili-i-repky-pod-strechou/", stav: "ok" },
  { key: "csu-odhad-2026", cat: "krajina", title: "Sklizeň základních obilovin klesne o 15,9 % a řepky o 17,1 %, odhaduje ČSÚ", meta: "Zemědělec.cz podle ČSÚ, 3. 7. 2026", url: "https://zemedelec.cz/sklizen-zakladnich-obilovin-klesne-o-159-a-repky-o-171-odhaduje-csu/", stav: "ok" },
  { key: "sav21", cat: "krajina", title: "Zdravé a dostupné potraviny, které nezničí krajinu. Nový program Strategie AV21", meta: "Akademie věd ČR, 21. 1. 2025", url: "https://www.avcr.cz/cs/o-nas/aktuality/Zdrave-a-dostupne-potraviny-ktere-neznici-krajinu.-Novy-program-SAV21/", stav: "ok" },
  { key: "vertikalni-farmy", cat: "krajina", title: "What if we grew plants vertically?", meta: "Evropský parlament – EPRS, 2022", url: "https://www.europarl.europa.eu/RegData/etudes/ATAG/2022/737130/EPRS_ATAG_737130_What_if_vertical_farming_final.pdf", stav: "ok" },
  { key: "zahrada-strelak", cat: "krajina", title: "Komunitní zahrada Na Střeláku", meta: "Nadace Via", url: "https://www.nadacevia.cz/project/komunitni-zahrada-na-strelaku/", stav: "ok" },

  /* --- Energie, suroviny a ekonomika --- */
  { key: "owid-elektrina", cat: "energie", title: "Share of electricity production by source – Czechia", meta: "Our World in Data podle Ember a Energy Institute", url: "https://ourworldindata.org/grapher/share-elec-by-source", stav: "ok" },
  { key: "owid-ropa", cat: "energie", title: "Oil production by country", meta: "Our World in Data podle Energy Institute Statistical Review", url: "https://ourworldindata.org/grapher/oil-production-by-country", stav: "ok" },
  { key: "konec-uhli", cat: "energie", title: "Konec uhlí v Česku (analýza)", meta: "Fakta o klimatu, J. Krčál, 1/2026", url: "https://faktaoklimatu.cz/assets-local/publications/2026-konec-uhli-v-cesku.pdf", stav: "ok" },
  { key: "dukovany", cat: "energie", title: "Dukovany jedou podle plánu, potvrdili Havlíček i korejský ministr", meta: "oEnergetice.cz, 6/2026", url: "https://oenergetice.cz/jaderne-elektrarny/dukovany-jedou-podle-planu-potvrdili-havlicek-i-korejsky-ministr", stav: "ok" },
  { key: "ceps-2030", cat: "energie", title: "ČEPS: ČR bude od roku 2030 závislá na dovozu elektřiny, může jí být i nedostatek", meta: "oEnergetice.cz, 2023", url: "https://oenergetice.cz/energetika-v-cr/ceps-cr-bude-od-roku-2030-zavisla-na-dovozu-elektriny-muze-ji-byt-i-nedostatek", stav: "ok" },
  { key: "eop-2030", cat: "energie", title: "Elektrárny Opatovice po roce 2030", meta: "Elektrárny Opatovice, a. s.", url: "https://www.eop.cz/novinka-elektrarny-opatovice-po-roce-2030", stav: "ok" },
  { key: "zevo-2030", cat: "energie", title: "Elektrárna Opatovice posunula spuštění spalovny odpadu na rok 2030", meta: "Třetí ruka, 6. 10. 2025", url: "https://www.tretiruka.cz/news/elektrarna-opatovice-posunula-spusteni-spalovny-odpadu-na-rok-2030/", stav: "ok" },
  { key: "net4gas-h2", cat: "energie", title: "Hydrogen projects (Czech Hydrogen Backbone)", meta: "NET4GAS", url: "https://www.net4gas.cz/en/projects/hydrogen-projects/", stav: "ok" },
  { key: "geotermie", cat: "energie", title: "Česká republika je zemí s velkým geotermálním potenciálem", meta: "Ringen, 20. 9. 2024", url: "https://rin-gen.cz/cz/aktualne/ceska-republika-velky-geotermalni-potencial", stav: "ok" },
  { key: "komunitni-energetika", cat: "energie", title: "Energetické společenství: Nová éra komunitní energetiky", meta: "Salonky HK", url: "https://www.salonkyhk.cz/energeticke-spolecenstvi-nova-era-komunitni-energetiky/", stav: "ok" },
  { key: "iea-ai", cat: "energie", title: "Energy and AI – Executive summary", meta: "Mezinárodní energetická agentura (IEA), 2025", url: "https://www.iea.org/reports/energy-and-ai/executive-summary", stav: "ok" },
  { key: "ropna-krize-2026", cat: "energie", title: "2026 Iran war fuel crisis", meta: "Wikipedie (anglicky), přehledový článek se zdroji", url: "https://en.wikipedia.org/wiki/2026_Iran_war_fuel_crisis", stav: "ok" },
  { key: "nafta-2026", cat: "energie", title: "První okres, kde nafta podražila o víc než 10 korun", meta: "Seznam Zprávy, 16. 3. 2026", url: "https://www.seznamzpravy.cz/clanek/ekonomika-finance-byznys-komodity-dluhopisy-prvni-okres-kde-nafta-podrazila-o-vic-nez-10-korun-301717", stav: "ok" },
  { key: "ets2-2040", cat: "energie", title: "Je rozhodnuto: emisní povolenky se odkládají, klimatické cíle zmírní", meta: "Seznam Zprávy, 5. 3. 2026", url: "https://www.seznamzpravy.cz/clanek/ekonomika-je-rozhodnuto-emisni-povolenky-se-odkladaji-klimaticke-cile-zmirni-300612", stav: "ok" },
  { key: "dluh-iif", cat: "energie", title: "Global debt surpasses $365T, hitting a new record, IIF report says", meta: "Stock Analysis podle Institute of International Finance, 24. 9. 2026", url: "https://stockanalysis.com/news/global-debt-hits-365-trillion/", stav: "ok" },
  { key: "digitalni-euro", cat: "energie", title: "Digital euro proposal advances to final EU negotiations", meta: "Sumsub, 13. 7. 2026", url: "https://sumsub.com/media/news/digital-euro-proposal-advances-to-final-eu-negotiations/", stav: "ok" },
  { key: "lets", cat: "energie", title: "LETS go? Lokální systémy výměnného obchodu a jejich přínos pro lokální komunity", meta: "Š. Bartůšková, diplomová práce UK, 2007", url: "https://dspace.cuni.cz/handle/20.500.11956/10549", stav: "ok" },
  { key: "cyrkl", cat: "energie", title: "Cyrkl – cirkulární řešení a trh s druhotnými surovinami", meta: "Cyrkl", url: "https://cyrkl.com/", stav: "ok" },

  /* --- Společnost, demografie a zdraví --- */
  { key: "csu-2025", cat: "spolecnost", title: "Počet narozených byl loni nejnižší za posledních 240 let", meta: "Český statistický úřad, 31. 3. 2026", url: "https://csu.gov.cz/produkty/pocet-narozenych-byl-loni-nejnizsi-za-poslednich-240-let", stav: "ok" },
  { key: "csu-2024", cat: "spolecnost", title: "Pohyb obyvatelstva – 4. čtvrtletí 2024", meta: "Český statistický úřad, 2025", url: "https://csu.gov.cz/rychle-informace/pohyb-obyvatelstva-4-ctvrtleti-2024", stav: "ok" },
  { key: "owid-populace", cat: "spolecnost", title: "Population by age group, with UN projections", meta: "Our World in Data podle OSN World Population Prospects 2024", url: "https://ourworldindata.org/grapher/population-by-age-group-with-projections", stav: "ok" },
  { key: "projekce-csu", cat: "spolecnost", title: "Projekce obyvatelstva České republiky 2023–2100", meta: "Česká demografická společnost a ČSÚ, 12/2023", url: "https://www.czechdemography.cz/akce/kulate-stoly/projekce-obyvatelstva-ceske-republiky-2023-2100-predpoklady-vysledky-souvislosti/", stav: "ok" },
  { key: "prognoza-khk", cat: "spolecnost", title: "Demografická prognóza Královéhradeckého kraje do roku 2050", meta: "Centrum investic, rozvoje a inovací (Rozvoj KHK)", url: "https://www.rozvojkhk.cz/prognoza-2050", stav: "ok" },
  { key: "starnuti-khk", cat: "spolecnost", title: "Hradecký kraj kvůli stárnutí populace výrazně zvýší počet lůžek následné péče", meta: "Salonky HK", url: "https://www.salonkyhk.cz/hradecky-kraj-kvuli-starnuti-populace-vyrazne-zvysi-pocet-luzek-nasledne-pece/", stav: "ok" },
  { key: "mikroplasty-mozek", cat: "spolecnost", title: "Bioaccumulation of microplastics in decedent human brains", meta: "Nihart A. J. a kol., Nature Medicine, 3. 2. 2025", url: "https://doi.org/10.1038/s41591-024-03453-1", stav: "ok" },
  { key: "mikroplasty-pmc", cat: "spolecnost", title: "Detection of microplastics in human tissues and organs: A scoping review", meta: "Roslan N. S. a kol., Journal of Global Health 14 (2024), PubMed Central", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11342020/", stav: "ok" },
  { key: "amr-lancet", cat: "spolecnost", title: "Study forecasts more than 39 million deaths from antimicrobial resistance by 2050", meta: "CIDRAP o studii GRAM v časopise The Lancet, 9/2024", url: "https://www.cidrap.umn.edu/antimicrobial-stewardship/study-forecasts-more-39-million-deaths-antimicrobial-resistance-2050", stav: "ok" },
  { key: "digitalni-demence", cat: "spolecnost", title: "Digital dementia in the internet generation", meta: "Journal of Integrative Neuroscience, 2022 (PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/35164464/", stav: "ok" },
  { key: "groundswell", cat: "spolecnost", title: "Climate Change Could Force 216 Million People to Migrate Within Their Own Countries by 2050", meta: "Světová banka (Groundswell), 13. 9. 2021", url: "https://www.worldbank.org/en/news/press-release/2021/09/13/climate-change-could-force-216-million-people-to-migrate-within-their-own-countries-by-2050", stav: "ok" },
  { key: "vlada-2025", cat: "spolecnost", title: "Přehledně: noví ministři vlády Andreje Babiše", meta: "E15, 12/2025", url: "https://www.e15.cz/ministri-nova-vlada", stav: "ok" },

  /* --- Technologie, doprava a vesmír --- */
  { key: "ai-index-2026", cat: "technologie", title: "Stanford AI Index 2026 – hlavní zjištění", meta: "Lumenova AI (shrnutí zprávy Stanford HAI), 8/2026", url: "https://www.lumenova.ai/blog/stanford-2026-ai-index-report-findings/", stav: "ok" },
  { key: "agi-predikce", cat: "technologie", title: "AGI/Singularity: 10,000 Predictions Analyzed", meta: "AIMultiple, aktualizace 10/2026", url: "https://aimultiple.com/artificial-general-intelligence-singularity-timing", stav: "fix", pozn: "původní adresa research.aimultiple.com přesměrovává" },
  { key: "singularita-etc", cat: "technologie", title: "When Will AI Surpass Humanity and What Happens After That?", meta: "ETC Journal, 11. 10. 2025", url: "https://etcjournal.com/2025/10/11/when-will-ai-surpass-humanity-and-what-happens-after-that/", stav: "ok" },
  { key: "autonomni-mobilita", cat: "technologie", title: "Autonomní mobilita", meta: "Ministerstvo dopravy ČR", url: "https://md.gov.cz/Uzitecne-odkazy/Autonomni-mobilita", stav: "ok" },
  { key: "vrt-omezeni", cat: "technologie", title: "Česko chce vysokorychlostní tratě omezit, Polsko už objednává rychlovlaky", meta: "Seznam Zprávy, 5. 1. 2026", url: "https://www.seznamzpravy.cz/clanek/ekonomika-byznys-doprava-cesko-chce-vysokorychlostni-trate-omezit-polsko-uz-objednava-rychlovlaky-295262", stav: "ok" },
  { key: "vrt-prvni", cat: "technologie", title: "320 kilometrů za hodinu. První vysokorychlostní trať v Česku dostala zelenou", meta: "Ekonomický deník, 3. 6. 2025", url: "https://ekonomickydenik.cz/prvni-vysokorychlostni-trat-ma-razitko/", stav: "ok" },
  { key: "aaro-ndaa", cat: "technologie", title: "UAP provisions in the FY2026 NDAA", meta: "DefenseScoop, 10. 12. 2025", url: "https://defensescoop.com/2025/12/10/uap-ufo-military-intercepts-north-america-fy-2026-ndaa/", stav: "ok" },
  { key: "fermi-yt", cat: "technologie", title: "Fermiho paradox: Velký filtr", meta: "Jirka vysvětluje věci (YouTube), 2025", url: "https://www.youtube.com/watch?v=Y0LPl2hG12c", stav: "ok" },
  { key: "synbio", cat: "technologie", title: "Global guidance framework for the responsible use of the life sciences: mitigating biorisks and governing dual-use research", meta: "Světová zdravotnická organizace (WHO), 2022", url: "https://www.who.int/publications/i/item/9789240056107", stav: "fix", pozn: "nahrazuje článek CDC o syntetické biologii (chyba 404)" },

  /* --- Geopolitika a bezpečnost --- */
  { key: "valka-iran", cat: "bezpecnost", title: "2026 Iran war", meta: "Wikipedie (anglicky), přehledový článek se zdroji", url: "https://en.wikipedia.org/wiki/2026_Iran_war", stav: "ok" },
  { key: "ukrajina-zari-2026", cat: "bezpecnost", title: "The Russia-Ukraine War Report Card, Sept. 30, 2026", meta: "Russia Matters (Harvard Kennedy School)", url: "https://www.russiamatters.org/news/russia-ukraine-war-report-card/russia-ukraine-war-report-card-sept-30-2026", stav: "ok" },
  { key: "primeri-2026", cat: "bezpecnost", title: "2026 Russo-Ukrainian truce", meta: "Wikipedie (anglicky)", url: "https://en.wikipedia.org/wiki/2026_Russo-Ukrainian_truce", stav: "ok" },
  { key: "doomsday-2026", cat: "bezpecnost", title: "It is now 85 seconds to midnight (Doomsday Clock 2026)", meta: "Nuclear Watch New Mexico podle Bulletin of the Atomic Scientists, 1/2026", url: "https://nukewatch.org/new-and-updated-item/it-is-now-85-seconds-to-midnight/", stav: "ok" },
  { key: "wef-2026", cat: "bezpecnost", title: "Global Risks Report 2026: an age of competition and growing uncertainty", meta: "DKKV podle Světového ekonomického fóra, 1/2026", url: "https://dkkv.org/en/global-risks-report-2026-an-age-of-competition-and-growing-uncertainty/", stav: "ok" },
  { key: "owid-konflikty", cat: "bezpecnost", title: "Number of armed conflicts; Deaths in armed conflicts by type", meta: "Our World in Data podle UCDP/PRIO", url: "https://ourworldindata.org/grapher/number-of-armed-conflicts", stav: "ok" },
  { key: "obrana-2026", cat: "bezpecnost", title: "Babiš: Česko letos nesplní závazek obranných výdajů, i loni NATO uznalo méně", meta: "Seznam Zprávy, 26. 4. 2026", url: "https://www.seznamzpravy.cz/clanek/domaci-zivot-v-cesku-babis-cesko-letos-nesplni-vydaje-2-procenta-hdp-na-obranu-304858", stav: "ok" },

  /* --- Krizová připravenost --- */
  { key: "72h", cat: "pripravenost", title: "72 hodin – jak se připravit na krizové situace", meta: "Ministerstvo vnitra ČR a HZS ČR", url: "https://www.72h.gov.cz/", stav: "ok" },
  { key: "cilek-radiozurnal", cat: "pripravenost", title: "Blackout, epidemie nebo povodeň. Václav Cílek vysvětluje, jak se připravit na krizové scénáře", meta: "Radiožurnál, 23. 11. 2018", url: "https://radiozurnal.rozhlas.cz/blackout-epidemie-nebo-povoden-vaclav-cilek-vysvetluje-jak-se-pripravit-na-7687891", stav: "ok" },
  { key: "cilek-krajske", cat: "pripravenost", title: "Rozhovor s Václavem Cílkem o migraci, preperech a možném rozpadu infrastruktury", meta: "Krajské listy, 17. 12. 2015", url: "https://www.krajskelisty.cz/praha/11644-migrace-kterou-nekdo-pouziva-jako-zbran-a-muslimske-deti-jez-odmala-uci-nenavisti-ke-krestanum-geolog-a-klimatolog-cilek-ceka-konec-sveta-jak-ho-zname.htm", stav: "ok" },
  { key: "hzs-ochrana", cat: "pripravenost", title: "Ochrana obyvatelstva – prevence a příprava před hrozbami", meta: "Hasičský záchranný sbor ČR", url: "https://hzscr.gov.cz/ochrana-obyvatelstva", stav: "ok" },

  /* --- Hradec Králové a region --- */
  { key: "uv-orlice", cat: "region", title: "Úpravna vody Hradec Králové", meta: "Vodovody a kanalizace Hradec Králové, a. s.", url: "https://www.vakhk.cz/Upravna-vody-Hradec-Kralove.html", stav: "ok" },
  { key: "plan-sucho-khk", cat: "region", title: "Plán pro zvládání sucha a stavu nedostatku vody na území Královéhradeckého kraje", meta: "Krajský úřad KHK (zpracoval GEOtest), 2022, zveřejněno 2025", url: "https://www.khk.cz/system/files/2025-03/Pl__n_pro_sucho_Khkraj_text.pdf", stav: "ok" },
  { key: "adaptace-hk", cat: "region", title: "Adaptační strategie statutárního města Hradec Králové", meta: "Fondy EHP a Norska", url: "https://eeagrants.cz/en/programmes/environment/approved-projects/adaptation-strategy-for-the-statutory-ci-4056", stav: "ok" },
  { key: "sousedstvi", cat: "region", title: "V Hradci vznikne nová čtvrť Sousedství, nabídne 150 bytů", meta: "HKCity, 27. 2. 2023", url: "https://www.hkcity.cz/2023/02/27/v-hradci-vznikne-nova-ctvrt-sousedstvi-nabidne-150-bytu/", stav: "ok" },
  { key: "kampus-uhk", cat: "region", title: "Hradecká univerzita investuje do rozvoje kampusu Na Soutoku stamiliony", meta: "Salonky HK", url: "https://www.salonkyhk.cz/hradecka-univerzita-investuje-do-rozvoje-kampusu-na-soutoku-stamiliony/", stav: "ok" },

  /* --- Knihy a odborné publikace --- */
  { key: "cilek-nove-ostrovy", cat: "knihy", title: "Nové ostrovy. Oheň dál hoří a my neznáme jeho konec. Texty o odvaze, připravenosti a odolnosti", meta: "Cílek V., Ibrahim A. a kol., Dokořán 2024", url: "https://www.databazeknih.cz/prehled-knihy/nove-ostrovy-texty-o-odvaze-pripravenosti-a-odolnosti-542737", stav: "kniha" },
  { key: "cilek-ruka", cat: "knihy", title: "Ruka noci podaná. Základy rodinné a krizové připravenosti", meta: "Cílek V., Šmikmátor F. a kol., Dokořán 2018", url: "https://www.databazeknih.cz/prehled-knihy/ruka-noci-podana-zaklady-rodinne-a-krizove-pripravenosti-391257", stav: "kniha" },
  { key: "cilek-vek", cat: "knihy", title: "Jak přežít globální změnu klimatu (recenze knihy Věk nerovnováhy)", meta: "iLiteratura, 18. 8. 2019", url: "https://www.iliteratura.cz/clanek/41963-cilek-vaclav-vek-nerovnovahy", stav: "ok" },
  { key: "koukolik-mocenska", cat: "knihy", title: "Mocenská posedlost", meta: "Koukolík F., Karolinum 2010", url: "https://www.databazeknih.cz/prehled-knihy/mocenska-posedlost-38581", stav: "kniha" },
  { key: "koukolik-eseje", cat: "knihy", title: "Homo sapiens stupidus – eseje ze třetí kultury v roce 2002–2003", meta: "Koukolík F., 2003", url: "https://www.databazeknih.cz/prehled-knihy/homo-sapiens-stupidus-eseje-ze-treti-kultury-v-roce-2002-2003-25440", stav: "kniha" },
  { key: "koukolik-hry", cat: "knihy", title: "Jak si lidé hrají?", meta: "Koukolík F., 1991", url: "https://www.databazeknih.cz/prehled-knihy/jak-si-lide-hraji-34666", stav: "kniha" },
  { key: "rees", cat: "knihy", title: "Naše poslední hodina", meta: "Rees M., Dokořán 2005", url: "https://www.databazeknih.cz/prehled-knihy/nase-posledni-hodina-18756", stav: "kniha" },
  { key: "taleb", cat: "knihy", title: "Černá labuť. Následky vysoce nepravděpodobných událostí", meta: "Taleb N. N., Paseka 2011", url: "https://www.databazeknih.cz/prehled-knihy/cerna-labut-94648", stav: "kniha" },
  { key: "veda-kolem-nas", cat: "knihy", title: "Edice Věda kolem nás", meta: "Nakladatelství Academia", url: "https://www.academia.cz/veda-kolem-nas/", stav: "ok" }
];
