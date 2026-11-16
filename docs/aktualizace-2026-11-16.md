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
