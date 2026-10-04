# Vize 2075 – Hradec Králové

Webová analýza budoucnosti Hradce Králové do roku 2075: klima, sucho a voda v krajině, energetika, společnost, technologie, geopolitika, tři scénáře vývoje a doporučení pro krizovou připravenost.

Autor: Jaroslav Svoboda · technická podpora SPŠE a VOŠ Pardubice
Poslední aktualizace: říjen 2026 (odkazy ověřeny 4. 10. 2026)

## Struktura

```
index.html                    kostra stránky (hlavička, navigace, čtecí panel, patička)
assets/css/vize.css           vzhled webu (barvy, písma, světlý a tmavý režim, rozvržení)
assets/js/obsah/              TEXTY WEBU – zde se upravuje obsah
  zdroje.js                   seznam zdrojů a stav ověření odkazů
  uvod.js                     úvod, metodika, teorie (Koukolík, Cílek, Rees), Rok 2026, ukazatele, odborné weby
  oblasti-1.js … oblasti-4.js 21 tematických oblastí
  doporuceni.js               doporučení a kontrolní seznam 72 hodin
  scenare.js                  scénáře A/B/C, srovnávací tabulka, signposty
  slovnik.js                  výkladový slovník
  dokumenty.js                PDF a MP3 ke stažení
assets/js/data-grafy.js       data pro grafy (se zdroji)
assets/js/grafy.js            vykreslování interaktivních grafů (bez externích knihoven)
assets/js/diagramy.js         ikony, úvodní ilustrace a vysvětlující diagramy
assets/js/app.js              navigace, vyhledávání, čtecí panel, motiv
docs/overeni-odkazu-2026-10.md protokol kontroly odkazů
*.pdf, *.mp3                  dokumenty a audio ke stažení
```

## Jak upravit text

Texty jsou v souborech `assets/js/obsah/*.js` jako obyčejné HTML uvnitř zpětných apostrofů (`` ` ``). Citace se zapisují značkou `{{ref:klíč}}`, kde klíč odpovídá položce v `zdroje.js`; číslo zdroje se doplní automaticky.

Nový zdroj přidáte do `zdroje.js` (klíč, kategorie, název, popis, adresa, stav). Nový graf přidáte do `data-grafy.js` a jeho identifikátor uvedete v poli `grafy` u příslušné oblasti.

## Spuštění

Web je statický – stačí otevřít `index.html` v prohlížeči nebo jej publikovat přes GitHub Pages. Pro náhled se všemi funkcemi doporučujeme jednoduchý lokální server (např. `python -m http.server`).
