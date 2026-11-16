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
