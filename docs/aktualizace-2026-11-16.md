# Aktualizace webu o suchu k 16. 11. 2026

Rozšíření stránky `sucho-a-voda-2026.html` o interaktivní environmentální mapu ČR,
manuál připravenosti a obsah z nových odborných zdrojů.

## Co se změnilo

### Nové soubory

| Soubor | Velikost | K čemu je |
|---|---|---|
| `assets/css/sucho-mapa.css` | 15 kB | styl mapy, diagnostického panelu a sekce Připravenost |
| `assets/js/sucho-mapa-data.js` | 138 kB | datový model: hranice krajů (GeoJSON), referenční klimatická síť, hydrogeologie, povodí, nádrže, kraje, scénáře, programy |
| `assets/js/sucho-model.js` | 14 kB | výpočetní jádro – profil lokality a osm indexů ohrožení |
| `assets/js/sucho-panel.js` | 24 kB | diagnostický panel a devět odpovědí „Co to znamená pro mě?“ |
| `assets/js/sucho-mapa.js` | 14 kB | mapa (Leaflet), ovládání vrstev, scénářů, časové osy a vyhledávání |
| `assets/js/sucho-prip.js` | 6 kB | kontrolní seznam 72 hodin a filtr programů |
| `assets/vendor/leaflet/*` | 165 kB | knihovna Leaflet 1.9.4 (lokálně, ne z CDN – web funguje i bez cizích serverů) |

Celkem asi **0,8 MB** – limit GitHubu (100 MB) to nijak neohrožuje.

### Změněný soubor
`sucho-a-voda-2026.html` – 350 kB → 435 kB (+21 %). Původní verze je uložena vedle
jako `sucho-a-voda-2026.zaloha-13-11-2026.html`; po kontrole ji můžete smazat.

**Ze stávajícího obsahu nebylo nic odstraněno.** Kontrola porovnáním vět staré a nové
verze: ze 731 textových fragmentů chybí 8 a všech osm je záměrná úprava
(přečíslování kapitol a místa, kde se mezi text vložil nový blok).

## Nové kapitoly a sekce

1. **03 · Mapový simulátor** (nový panel) – interaktivní mapa ČR, klepnutím kamkoli
   se zobrazí profil lokality, osm indexů a devět odpovědí. Vyhledávání podle obce,
   PSČ nebo vodního díla. Pět časových horizontů (2026/27, 2028–2035, 2040, 2050, 2075)
   a tři scénáře (optimistický / realistický trend / krizový). Součástí je i metodika mapy.
2. **08 · Zdraví a vlny veder** (nová karta v kapitole Energetika) – nadúmrtí v roce 2026,
   městský tepelný ostrov, tepelný stres zvířat, psychické dopady.
3. **10 · Připravenost** (nový panel) – voda v domácnosti, pozemek a vsak, horko a zdraví,
   programy a dotace. Kontrolní seznam 72 hodin si pamatuje prohlížeč.
4. **Doplnění do stávajících kapitol:** neviditelné sucho a data z družic GRACE,
   kontinentální vysušování, Clausius-Clapeyronova rovnice a chybějící srážky, atlantský
   výměník a „chladná skvrna“, klimatické riziko v bankovnictví, půda jako banka na vodu,
   půdní past, rybníky a dva typy povodní, terénní bilance roku 2026 a sklizeň po plodinách.

## Nové zdroje (17 položek)

Barnes et al., *Nature Health* 2026 (nadúmrtí v evropských městech) · iROZHLAS 23. 10. 2026 ·
CzechGlobe · ČHMÚ + CzechGlobe *Hodnocení změny klimatu a adaptačních potřeb ČR 2025* (CMIP6) ·
MŽP *Politika ochrany klimatu* · ČGS *Rebilance zásob podzemních vod* · SZÚ *Zpráva o kvalitě
pitné vody 2024* · OPŽP (výzvy 73, 104, 105, 109) · Nová zelená úsporám – Závazné pokyny RD od 28. 5. 2026 · ČTK
(poplatky za odběr podzemní vody) · iROZHLAS (ředitel ČHMÚ, 7. 11.) · INFO.CZ (zdroje Brna) ·
Plán pro sucho MSK · Plán pro sucho KHK · **V. Cílek, Epilog: suchý rok 2026 (rukopis, 2026)**.

> Kniha se necituje jako publikace (vychází až v roce 2027). Odkazuje se na jednotlivé
> kapitoly rukopisu a autorství je u každého převzatého údaje uvedeno v textu.

## Na co si dát pozor

- **Mapa je model, ne předpověď.** V textu stránky je to napsané na třech místech
  (úvodní callout, metodika mapy, patička panelu). Prosím neměňte tyto formulace na
  jistější – čísla, která model vydává, jsou relativní míra ohrožení, ne procenta.
- **Referenční klimatická síť** (109 bodů v `sucho-mapa-data.js`) odpovídá řádově
  normálům 1991–2020, ale **nejsou to oficiální staniční normály ČHMÚ**. V metodice je
  to uvedené. Kdybyste je chtěl nahradit skutečnými normály, stačí přepsat pole
  `SM.stations` – formát je `["název", lat, lon, výška, teplota, srážky]`.
- **Hydrogeologie a povodí** jsou zjednodušená regionalizace podle nejbližšího uzlu,
  ne hranice rajonů ČGS.
- **Datum vydání.** Stránka na čtyřech místech uvádí aktualizaci k 16. 11. 2026
  a programy „stav k 16. 11. 2026“ – při další aktualizaci je potřeba změnit obojí.
- **Programy a dotace stárnou nejrychleji.** Výzvy OPŽP 105 a 109 mají příjem žádostí
  do 17. 12. 2026 – po tomto datu je vhodné položky v `SM.programy` zkontrolovat.
  U Dešťovky je text postavený na *Závazných pokynech NZÚ pro rodinné domy platných
  od 28. 5. 2026* (podoblast D.2): opatření v oblasti D nelze podpořit samostatně, jen
  v kombinaci s oblastí A (zateplení) nebo C (zdroje energie), a to formou zvýhodněného
  úvěru s kompenzací úroků (max. 100 000 Kč dešťová voda + WC, 150 000 Kč šedá voda).
  **Pozor:** komerční weby stále uvádějí starší pevné dotace 50 000 nebo 105 000 Kč –
  ty se k dnešním pravidlům pro rodinné domy nevztahují. Podmínky se liší i mezi
  variantami programu (standardní NZÚ, NZÚ Light, Oprav dům po babičce).

## Jak přidat obec do vyhledávání

V `assets/js/sucho-mapa-data.js` v poli `SM.places` přidejte řádek ve tvaru
`["Název", lat, lon, PSČ, počet obyvatel v tisících]`. PSČ i počet obyvatel mohou být `0`.
Model počítá pro libovolný bod, seznam slouží jen k vyhledání místa.

## Jak to otestovat lokálně

Stránka načítá skripty relativně, takže otevření přes `file://` funguje.
Jistější je spustit v adresáři repozitáře jednoduchý server:

```
python -m http.server 8000
```

a otevřít `http://localhost:8000/sucho-a-voda-2026.html`.

Otestováno v Chrome na šířkách 390, 820, 1440 a 1920 px, ve světlém i tmavém režimu,
bez chyb v konzoli.

## Přestavba rozvržení (druhá iterace, 16. 11. 2026 odpoledne)

Mapa je teď **první obsah stránky**:

- **Mapový simulátor je panel 01** a otevírá se jako výchozí. Číslování kapitol se posunulo:
  01 Mapový simulátor, 02 Přehled, 03 Stav teď, 04 Mapa ohrožení; zbytek beze změny.
- **Hlavička je kompaktní.** KPI dlaždice, audio shrnutí, ilustrace a řádek s metadaty se
  přesunuly z hlavičky do panelu Přehled (nic se nesmazalo). Na mapovém panelu se perex
  a stavové odznaky skládají vedle titulku. Mapa tak začíná **509–601 px** od horního
  okraje místo původních 1570 px – při načtení je podle velikosti okna vidět 43–100 % mapy
  (naměřeno na 390, 768, 1024, 1280, 1440, 1600, 1920 a 2560 px).
- **Mapa na maximální ergonomické šířce.** Do 1279 px je rozvržení jednosloupcové a mapa
  zabírá celou šířku (958 px při okně 1040 px, 1158 px při 1279 px). Od 1280 px se dashboard
  rozšiřuje mimo hlavní sloupec textu na `min(1760px, 100vw − 72px)` a mapa dostává
  1,5–1,62 dílu šířky proti 1 dílu diagnostického panelu, který je tak vidět vedle mapy
  bez posouvání (708 px při 1280, 804 px při 1440, 1071 px od 1920 px výš). Vyhledávání se přesunulo dovnitř mapového rámu,
  ovládání měřítka je vpravo nahoře.
- **Prostor na popisky a nápovědu.** Pod mapou je blok „Jak mapu používat“ se čtyřmi kroky,
  legenda barevné stupnice, popis vrstvy s odkazem na kapitolu a teprve pak ovládání
  scénářů a času. Prázdný diagnostický panel nabízí pět ukázkových lokalit.
- **Vazby na kapitoly.** Každá vrstva má odkaz „Podrobně v kapitole …“, panel ukazuje,
  která kapitola vysvětluje vrstvu s nejvyšším rizikem, a pod mapou je mřížka osmi
  dlaždic „Odkud se čísla v mapě berou“ se štítkem, kterou vrstvu kapitola vysvětluje.
- **Nadpis vs. tlačítko.** Názvy částí studie v navigaci jsou šedé verzálky s oddělovačem
  a `cursor:default`; kapitoly jsou orámovaná tlačítka se stínem. Nad menu je vysvětlivka
  „Šedé popisky jsou názvy částí studie, rámečky jsou kapitoly“. Dlaždice kapitol mají
  výzvu „Otevřít kapitolu →“.

Kontrola po přestavbě: 0 chyb v konzoli v **11 konfiguracích** – 390, 768, 1024, 1280,
1440, 1920 a 2560 px, z toho 390, 1280, 1440 a 1920 px i v tmavém režimu. V každé z nich
se prošlo všech 11 panelů a 16 podkaret, všech 8 vrstev mapy, 3 scénáře a 5 časových
horizontů. Všech 8 dlaždic kapitol vede na správný panel i podkartu, 0 nefunkčních kotev,
HTML bez nepárových značek, žádné vodorovné přetečení stránky.

## Kontrola překryvů a čitelnosti (16. 11. 2026, druhé kolo)

### Co se opravovalo
1. **Blok „Jak mapu používat" vyčníval přes sousední prvky.** Při přestavbě
   rozvržení se nápověda přesunula dovnitř sloupce mapy (`.sm-app`), ale pravidlo
   pro rozšíření mimo textový sloupec na ni stále mířilo. Posun
   `margin-left:50%; transform:translateX(-50%)` se tak uplatnil podruhé a blok
   přesahoval doleva přes rámeček s popisem vrstvy i přes upozornění pod ním.
   Pravidlo je nově omezeno na přímé potomky panelu:
   `#p-simulator>.sm-app, #p-simulator>.sm-navazky`.
2. **Rozbalená nabídka na mobilu přetékala pod spodní okraj okna.** Poslední
   položka (11 · Metodika a zdroje) byla nedosažitelná. Nabídka se nyní při
   otevření přišpendlí k hornímu okraji a má `max-height:calc(100dvh - 150px)`
   s vlastním rolováním.
3. **Drobné popisky pod hranicí čitelnosti.** Zvětšeno: `.sm-laystrip-l` a
   `.sm-find-l` z .62 na .68 rem, `.sm-score small` a `.sm-row-v small` z .64 na
   .69 rem, mobilní `.kpi .s` z .6 na .68 rem (9,6 → 10,9 px).

### Jak se to ověřovalo
- `test/audit.py` – 11 panelů × 16 podkaret při 1920 tmavý / 1440 / 1280 / 1024 /
  390 px, s rozbalenými všemi `<details>` a všemi devíti otázkami. Sleduje
  překryvy textu, vyjetí z okna, ořezaný text a písmo pod 10,5 px.
  Výsledek: **0 nálezů.** (Jediný zbylý údaj – text 10 jednotek v ilustraci
  v Přehledu – je planý poplach: SVG se zvětšuje, text se vykresluje na 15,1 px
  při 1920 px a 12,2 px při 1024 px, na mobilu je ilustrace skrytá.)
- `test/overlay.py` – výsuvné a plovoucí prvky: nabídka vyhledávání nad mapou,
  bublina vodního díla, tlačítko Nahoru, lepivá navigace, mobilní nabídka
  a diagnostický panel vůči lepivému sloupci mapy, ve čtyřech kombinacích šířky
  a světlého/tmavého režimu. Výsledek: **0 problémů.**
- `test/reg2.py` – plná regrese na 11 konfiguracích: 0 chyb konzole, 11 panelů /
  16 podkaret / 9 otázek / 8 řádků / 8 dlaždic všude.

### Známé chování, které není chyba
Na hranici 1279/1280 px se rozvržení přepíná z jednoho sloupce na dva. Mapa se
přitom zúží (1158 → 708 px), protože vedle ní nastoupí diagnostický panel.
Je to záměr: od 1280 px výš vidí uživatel mapu i výsledky najednou bez rolování.

## Srážkový schodek při oteplení o 2 °C (16. 11. 2026, třetí kolo)

Mapa dostala druhou polohu a pod ní přibyl samostatný výpočet. Odpovídá na otázku
„o kolik srážek ročně přijdeme“, aniž by předstíral, že roční úhrny budou klesat –
podstatou schodku je rostoucí výpar.

### Co přibylo
1. **Dva nové režimy mapy** – přepínač „Mapa ukazuje“ v liště pod mapou, u legendy:
   *riziko ve vrstvě* (dosavadní chování), *vláhová bilance dnes* a *bilance při
   +2 °C*. V režimu bilance se barví rozdíl srážek a výparu v mm (stejná stupnice
   jako u rizika, zelená = přebytek, karmínová = schodek), legenda se přepíše na
   „přebytek +270 mm … schodek −270 mm“, pruh vrstev se ztlumí a u časové osy se
   objeví poznámka, že se v tomto režimu neuplatní. Klepnutí na vrstvu vrátí mapu
   zpět na riziko.
2. **Sekce „Kolik srážek bude scházet při oteplení o 2 °C“** pod ovládáním mapy:
   shrnutí za ČR, čtyřřádkový výpočet pro vybrané místo (srážky / výpar / bilance
   dnes a při +2 °C), převod na procenta úhrnu, m³ na hektar a litry na m², objem
   za celý kraj a tabulka všech 14 krajů. Vše reaguje na zvolený scénář i na
   vybrané místo; rozbalovací blok „Jak se k číslům dochází“ popisuje metodu
   a meze výpočtu.

### Jak se počítá
- `rok2C(scénář)` najde interpolací mezi horizonty rok, kdy scénář dosáhne +2 °C:
  **optimistický 2065, realistický trend 2044, krizový 2037** – a k němu
  odpovídající změnu letních a zimních srážek.
- Výpar: `PET = max(350; 560 + 36 × (T − 8))`, tedy **+72 mm za 2 °C**. Hodnota
  36 mm na stupeň je **předpoklad modelu**, ne číslo doložené měřením, a je to
  hlavní nejistota výpočtu: schodek se s ní mění přímo úměrně (při 45 mm/°C vyjde
  o 23 % vyšší, při 30 mm/°C o 15 % nižší). Údaje z lesních povodí GEOMON
  (Hruška a kol., Ochrana přírody 6/2020) **nelze** brát jako potvrzení této
  hodnoty – viz oprava níže.
- Srážky: roční úhrn se dělí na letní (61 %) a zimní (39 %) půlrok, každý se mění
  podle scénáře zvlášť (stejně jako ve zbytku modelu).
- **Schodek = ΔPET − ΔP**, tedy o kolik mm srážek by muselo ročně spadnout navíc,
  aby vláhová bilance zůstala na dnešní hodnotě.
- Objem: 1 mm na 1 km² = 1 000 m³. Plošné průměry T a P uvnitř krajů se spočítaly
  vzorkováním pole 109 stanic po ~0,9 km; součet vzorkovaných ploch vyšel
  78 791 km² proti 78 868 km² podle ČSÚ (0,1 %).

### Výsledky (realistický trend, +2 °C kolem roku 2044)
| | schodek | podíl úhrnu | za kraj |
|---|---|---|---|
| Praha | 77 mm | 14,8 % | 38 mil. m³ |
| Jihomoravský | 77 mm | 14,5 % | 555 mil. m³ |
| Středočeský | 77 mm | 13,7 % | 853 mil. m³ |
| Liberecký | 80 mm | 9,3 % | 254 mil. m³ |
| **ČR celkem** | **78 mm** | | **6,2 mld. m³** |

Záporná vláhová bilance platí dnes pro 4 ze 14 krajů, při +2 °C pro 6
(v krizovém scénáři pro 9). Nárůst výparu je po celé republice skoro stejný –
rozdíl mezi kraji dělá to, z jak velkého úhrnu se schodek ukrajuje a jak je na tom
kraj dnes. Tato věta je v sekci explicitně uvedena, aby skoro shodný sloupec
„Schází za rok“ nemátl.

### Nové soubory a zdroje
- `assets/js/sucho-schodek.js` (12 kB) – výpočet i vykreslení, `SM.schodek`
- `SM.krajPlocha`, `SM.krajKlima`, `SM.vodaOsoba`, `SM.srazkyCR` v datech
- `SM.model.PET0` nově vystaven ven
- zdroje `z-geomon`, `z-nas`, `z-csu-voda`, `z-csu-plocha` v Metodice

### Ověření
- Mapa je při otevření stejně vysoko jako před úpravou (509–601 px od horního
  okraje, 43–100 % výšky vidět) – přepínač je proto pod mapou, ne nad ní.
- Plná regrese na 11 konfiguracích: 0 chyb konzole, 11 panelů / 16 podkaret /
  9 otázek / 8 řádků / 8 dlaždic, 14 řádků tabulky krajů.
- Kontrola překryvů a čitelnosti: 0 nálezů; na mobilu se tabulka krajů mění
  na karty, takže nikde nevzniká vodorovné rolování.
- Překreslení mapy po přepnutí režimu: 230–330 ms.


### Oprava po nezávislé kontrole zdroje (16. 11. 2026)
Nezávislá kontrola článku Hruška, Oulehle, Lamačová (*Ochrana přírody* 6/2020)
našla v první verzi textu tři vady, všechny opravené:

1. **Neplatné odůvodnění.** Text tvrdil, že 36 mm/°C je „spíš opatrný odhad",
   protože skutečný výpar nemůže překročit potenciální. Nerovnost mezi hodnotami
   ale neříká nic o jejich derivacích, a hlavně jde o nesouměřitelné veličiny:
   článek uvádí skutečnou (vodou limitovanou) evapotranspiraci lesních povodí,
   model referenční výpar. Článek žádnou citlivost potenciálního výparu v mm/°C
   neudává, takže model nepotvrzuje ani nevyvrací. Tvrzení je ze stránky
   odstraněno a nahrazeno přiznáním, že jde o nejistý předpoklad modelu.
2. **„Měření dávají"** – evapotranspirace v povodích GEOMON se neměří, dopočítává
   se z vodní bilance (srážky minus odtok). Opraveno.
3. **Chybné srovnávací období a chybějící výhrady.** Pokles srážek o 14 % je
   proti „období před 25 lety, kdy monitoring začal", ne proti 1994–1999 (to
   platí jen pro pokles odtoku o 42 %). Doplněno také, že autoři nenašli
   v srážkách statisticky významný trend, že pokles průtoků přisuzují kombinaci
   nižších srážek a vyšší teploty a že nárůst nároků na transpiraci platí pro
   povodí nad 600 m n. m., zatímco pod 600 m transpirace v letech 2014–2018
   klesla kvůli chřadnutí porostů.
