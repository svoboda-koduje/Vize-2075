/* ==========================================================================
   SUCHO A VODA 2026 — SEKCE PŘIPRAVENOSTI
   Kontrolní seznam 72 hodin (podle příručky MV ČR a HZS ČR, shodný se sekcí
   Připravenost na hlavní stránce Vize 2075) a filtrovatelný přehled programů.
   ========================================================================== */
(function () {
  "use strict";
  var SM = window.SM;
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

  SM.checklist72 = [
    { g: "Voda", i: [
      "Balená pitná voda: nouzově 2 litry na osobu a den, ideálně 3–4 litry (pití, vaření, hygiena)",
      "Uzavíratelné nádoby nebo kanystry na odběr vody z cisterny",
      "Filtr na vodu nebo přípravek k dezinfekci vody",
      "Kbelík s víkem a pytle pro nouzovou toaletu"
    ] },
    { g: "Jídlo a vaření", i: [
      "Trvanlivé potraviny na 3 dny, které jíte i běžně (a jejich rotace)",
      "Plynový nebo lihový vařič, zápalky či zapalovač (používat jen s větráním)",
      "Krmivo pro zvířata a dostatek napájecí vody"
    ] },
    { g: "Energie, světlo a informace", i: [
      "Rádio na baterie nebo na kliku",
      "Svítilna nebo čelovka a náhradní baterie",
      "Nabitá powerbanka a kabely k telefonu",
      "Plná nádrž v autě (nabitý elektromobil)"
    ] },
    { g: "Zdraví a hygiena", i: [
      "Lékárnička a léky, které užíváte, nejméně na týden",
      "Dezinfekce na ruce, toaletní papír, hygienické potřeby",
      "Silné pytle na odpadky (využití i pro nouzovou toaletu)"
    ] },
    { g: "Peníze, dokumenty a nářadí", i: [
      "Hotovost v mincích a menších bankovkách",
      "Kopie důležitých dokumentů (papírově i v telefonu)",
      "Multifunkční nůž, pevná lepicí páska",
      "Hasicí přístroj nebo hasicí deka"
    ] },
    { g: "Rodinný plán", i: [
      "Domluvené místo setkání, pokud nebude fungovat telefon",
      "Kdo vyzvedne děti a kdo se postará o seniory a lidi se specifickými potřebami",
      "Důležitá čísla uložená v telefonu i na papíře (112, 150, 155, 158)"
    ] },
    { g: "Voda v suchu (navíc k příručce)", i: [
      "Vím, odkud bere moje obec pitnou vodu a jak je ten zdroj zranitelný",
      "U vlastní studny nebo vrtu si zapisuji hladinu jednou měsíčně",
      "Mám plán náhradního zdroje vody (kdo, kam, čím)",
      "Nádrž nebo sud na dešťovou vodu na zálivku, ideálně i na splachování",
      "Zahrada a dvůr: mulč, propustné povrchy, zálivka ke kořenům ráno nebo večer"
    ] }
  ];

  var KEY = "sucho2026-check";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  }
  function save(st) {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* soukromý režim */ }
  }

  function renderCheck(el) {
    var st = load(), total = 0, done = 0;
    SM.checklist72.forEach(function (g, gi) {
      g.i.forEach(function (_, ii) { total++; if (st[gi + "-" + ii]) done++; });
    });
    var html = '<div class="prip-prog"><div class="prip-prog-bar"><i style="width:'
      + Math.round(done / total * 100) + '%"></i></div><span>' + done + " z " + total + " položek</span></div>";
    html += '<div class="prip-grid">' + SM.checklist72.map(function (g, gi) {
      return '<div class="prip-g"><h4>' + esc(g.g) + "</h4>" + g.i.map(function (it, ii) {
        var k = gi + "-" + ii;
        return '<label class="prip-it"><input type="checkbox" data-k="' + k + '"'
          + (st[k] ? " checked" : "") + "> <span>" + esc(it) + "</span></label>";
      }).join("") + "</div>";
    }).join("") + "</div>";
    html += '<p class="fig-src">Stav se ukládá jen ve vašem prohlížeči (localStorage), nikam se neposílá. '
      + '<button type="button" class="prip-reset">Vymazat zaškrtnutí</button></p>';
    el.innerHTML = html;
    el.querySelectorAll('input[type=checkbox]').forEach(function (c) {
      c.addEventListener("change", function () {
        var s = load();
        if (c.checked) s[c.dataset.k] = 1; else delete s[c.dataset.k];
        save(s); renderCheck(el);
      });
    });
    var rb = el.querySelector(".prip-reset");
    if (rb) rb.addEventListener("click", function () { save({}); renderCheck(el); });
  }

  var KDO = { domacnost: "Domácnost", obec: "Obec a instituce", zemedelec: "Zemědělec a vlastník", nno: "Spolky a NNO" };
  function renderProg(el, filtr) {
    var list = SM.programy.filter(function (g) { return filtr === "vse" || g.kdo.indexOf(filtr) >= 0; });
    el.innerHTML = list.map(function (g) {
      return '<article class="prip-prog-c"><header><h4>' + esc(g.n) + "</h4>"
        + '<span class="prip-kdo">' + g.kdo.map(function (k) { return KDO[k]; }).join(" · ") + "</span></header>"
        + '<p class="prip-castka">' + esc(g.castka) + "</p>"
        + "<p>" + esc(g.popis) + "</p>"
        + '<p class="prip-jak">' + esc(g.jak) + ' <a href="' + g.odkaz + '" target="_blank" rel="noopener">oficiální web ↗</a></p>'
        + "</article>";
    }).join("");
  }

  function boot() {
    var ce = document.getElementById("prip-check");
    if (ce) renderCheck(ce);
    var pe = document.getElementById("prog-list"), pf = document.getElementById("prog-filter");
    if (pe) {
      renderProg(pe, "vse");
      if (pf) pf.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          pf.querySelectorAll("button").forEach(function (x) {
            x.setAttribute("aria-pressed", x === b ? "true" : "false");
          });
          renderProg(pe, b.dataset.kdo);
        });
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
