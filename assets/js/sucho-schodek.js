/* ==========================================================================
   SUCHO A VODA 2026 — SRÁŽKOVÝ SCHODEK PŘI OTEPLENÍ O 2 °C

   Odpovídá na otázku „kolik ročních srážek bude scházet“. Počítá se stejným
   jádrem jako zbytek mapy (sucho-model.js), jen s pevně nastaveným oteplením
   o 2 °C proti normálu 1991–2020.

   Postup pro libovolný bod i pro celý kraj:
     1) dnešní stav:   srážky P, výpar PET(T), vláhová bilance KVB = P − PET
     2) při +2 °C:     PET(T+2), srážky podle scénáře (letní a zimní zvlášť)
     3) schodek:       o kolik mm srážek za rok by muselo spadnout navíc,
                       aby bilance zůstala na dnešní hodnotě

   PET je REFERENČNÍ výpar, tedy poptávka atmosféry po vodě, ne množství, které
   se skutečně vypaří. V modelu roste o 36 mm na každý stupeň a je to PŘEDPOKLAD
   MODELU, ne hodnota doložená měřením: nezávislé ověření právě téhle citlivosti
   studie nemá. Schodek se s ní mění přímo úměrně, takže je to hlavní nejistota
   celého výpočtu. Údaje o lesních povodích GEOMON (Hruška a kol., Ochrana přírody
   6/2020) se k tomu NESMÍ používat jako potvrzení – jde o skutečnou (vodou
   limitovanou) evapotranspiraci dopočtenou z vodní bilance, a navíc jen pro
   povodí nad 600 m n. m.; v nižších polohách transpirace naopak klesla.
   ========================================================================== */
(function () {
  "use strict";
  var SM = window.SM, M = SM.model;
  var DT = 2;                       /* o kolik °C se otepluje */
  var LETO = 0.61, ZIMA = 0.39;     /* podíl letního a zimního půlroku na ročním úhrnu */

  function cl(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* ---------- kdy daný scénář dosáhne +2 °C ---------- */
  function rok2C(scKey) {
    var sc = SM.scenarios[scKey], H = SM.horizons;
    var i, a, b, t;
    for (i = 1; i < H.length; i++) {
      a = sc.dT[H[i - 1].id]; b = sc.dT[H[i].id];
      if (b >= DT) {
        t = b === a ? 0 : (DT - a) / (b - a);
        t = cl(t, 0, 1);
        return {
          rok: Math.round(H[i - 1].rok + t * (H[i].rok - H[i - 1].rok)),
          dPl: sc.dPl[H[i - 1].id] + t * (sc.dPl[H[i].id] - sc.dPl[H[i - 1].id]),
          dPz: sc.dPz[H[i - 1].id] + t * (sc.dPz[H[i].id] - sc.dPz[H[i - 1].id]),
          vRozsahu: true
        };
      }
    }
    /* scénář +2 °C v žádném horizontu nedosáhne – vezmeme poslední */
    var last = H[H.length - 1].id;
    return { rok: H[H.length - 1].rok, dPl: sc.dPl[last], dPz: sc.dPz[last], vRozsahu: false };
  }

  /* ---------- jádro výpočtu pro dvojici (teplota, srážky) ---------- */
  function spocti(T, P, scKey) {
    var r = rok2C(scKey);
    var pet0 = M.PET0(T), pet2 = M.PET0(T + DT);
    var P2 = LETO * P * (1 + r.dPl / 100) + ZIMA * P * (1 + r.dPz / 100);
    var kvb0 = P - pet0, kvb2 = P2 - pet2;
    var dP = P2 - P, dPET = pet2 - pet0;
    return {
      rok: r.rok, dPl: r.dPl, dPz: r.dPz, vRozsahu: r.vRozsahu,
      T: T, T2: T + DT, P: P, P2: P2, dP: dP, dPpct: dP / P * 100,
      pet: pet0, pet2: pet2, dPET: dPET,
      kvb: kvb0, kvb2: kvb2,
      schodek: kvb0 - kvb2,                 /* = dPET − dP: kolik mm srážek schází */
      schodekPct: (kvb0 - kvb2) / P * 100,
      m3ha: (kvb0 - kvb2) * 10,             /* 1 mm na 1 ha = 10 m³ */
      chybiDoVyparu: Math.max(0, pet2 - P2) /* kolik mm chybí do pokrytí výparu */
    };
  }

  /* ---------- rychlý výpočet bilance pro mapové pole ----------
     Vrací vláhovou bilanci v mm; pri2C=true přidá oteplení o 2 °C a změnu
     srážek podle scénáře. Záměrně nevytváří objekt – volá se pro každý
     vzorkovaný bod mapy. */
  var cache = { key: "", f: 1, pet: 0 };
  function kvbAt(la, lo, scKey, pri2C) {
    var p = M.profilBase(la, lo);
    if (!p) return null;
    if (!pri2C) return p.P - M.PET0(p.T);
    if (cache.key !== scKey) {
      var r = rok2C(scKey);
      cache.key = scKey;
      cache.f = LETO * (1 + r.dPl / 100) + ZIMA * (1 + r.dPz / 100);
    }
    return p.P * cache.f - M.PET0(p.T + DT);
  }

  /* ---------- pro vybraný bod ---------- */
  function bod(p, scKey) {
    var o = spocti(p.T, p.P, scKey);
    o.kraj = p.kraj || null;
    return o;
  }

  /* ---------- pro kraj (plošný průměr) ---------- */
  function kraj(id, scKey) {
    var k = SM.krajKlima[id], plocha = SM.krajPlocha[id];
    var o = spocti(k.T, k.P, scKey);
    o.id = id; o.n = SM.kraje[id].n; o.plocha = plocha;
    o.objemMil = o.schodek * plocha / 1000;            /* mm × km² → mil. m³ */
    o.lidi = o.objemMil * 1e6 / SM.vodaOsoba;          /* roční spotřeba domácností */
    return o;
  }

  function kraje(scKey, razeni) {
    var out = Object.keys(SM.krajPlocha).map(function (id) { return kraj(id, scKey); });
    out.sort(function (a, b) {
      if (razeni === "objem") return b.objemMil - a.objemMil;
      if (razeni === "bilance") return a.kvb2 - b.kvb2;
      return b.schodekPct - a.schodekPct;
    });
    return out;
  }

  function cr(scKey) {
    var ks = kraje(scKey), i, plocha = 0, objem = 0, sP = 0, sT = 0;
    for (i = 0; i < ks.length; i++) {
      plocha += ks[i].plocha; objem += ks[i].objemMil;
      sP += ks[i].P * ks[i].plocha; sT += ks[i].T * ks[i].plocha;
    }
    return {
      plocha: plocha, objemMil: objem, P: sP / plocha, T: sT / plocha,
      schodek: objem * 1000 / plocha, lidi: objem * 1e6 / SM.vodaOsoba,
      rok: ks[0].rok, zaporna: ks.filter(function (k) { return k.kvb2 < 0; }).length,
      zapornaDnes: ks.filter(function (k) { return k.kvb < 0; }).length
    };
  }

  /* ---------- formátování ---------- */
  function cis(v, d) {
    var s = (Math.abs(v)).toLocaleString("cs-CZ", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
    return (v < 0 ? "−" : "") + s;
  }
  function sign(v, d) { return (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toLocaleString("cs-CZ", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* barva pro vláhovou bilanci (mm) – stejná stupnice jako riziko v mapě */
  function kvbRisk(kvb) { return cl(Math.round(50 - kvb / 5.5), 1, 99); }

  /* ---------- výpočet pro vybrané místo ---------- */
  function renderBod(el, p, scKey) {
    if (!el) return;
    var sc = SM.scenarios[scKey];
    if (!p) {
      el.innerHTML = '<p class="sch-empty">Klepněte do mapy nebo vyhledejte obec – výpočet se spočítá přímo pro vaše místo. '
        + 'Tabulka krajů níže platí i bez výběru.</p>';
      return;
    }
    var o = bod(p, scKey);
    var kraj_ = o.kraj ? kraj(o.kraj, scKey) : null;
    var misto = p.obec ? (p.obecKm <= 3 ? p.obec[0] : p.obec[0] + " \u2013 " + p.obecKm + " km") : "vybraný bod";
    var h = "";

    h += '<p class="sch-kde"><b>' + esc(misto) + '</b>'
      + (o.kraj ? ' · ' + esc(SM.kraje[o.kraj].n) + " kraj" : "")
      + ' · scénář <b>' + esc(sc.n.toLowerCase()) + '</b> dosáhne +2 °C kolem roku <b>' + o.rok + "</b></p>";

    h += '<table class="sch-tab"><thead><tr><th>Stav</th><th>Srážky</th><th>Výpar</th><th>Vláhová bilance</th></tr></thead><tbody>';
    h += '<tr><th scope="row">Dnes<small>' + cis(o.T, 1) + " °C</small></th>"
      + "<td>" + cis(o.P) + ' <small>mm</small></td>'
      + "<td>" + cis(o.pet) + ' <small>mm</small></td>'
      + '<td class="' + (o.kvb < 0 ? "sch-zap" : "sch-kla") + '">' + sign(o.kvb) + ' <small>mm</small></td></tr>';
    h += '<tr><th scope="row">Při +2 °C<small>' + cis(o.T2, 1) + " °C</small></th>"
      + "<td>" + cis(o.P2) + ' <small>mm</small><i>' + sign(Math.round(o.dP)) + "</i></td>"
      + "<td>" + cis(o.pet2) + ' <small>mm</small><i>' + sign(Math.round(o.dPET)) + "</i></td>"
      + '<td class="' + (o.kvb2 < 0 ? "sch-zap" : "sch-kla") + '">' + sign(Math.round(o.kvb2)) + ' <small>mm</small></td></tr>';
    h += "</tbody></table>";

    h += '<div class="sch-vysl"><div class="sch-big"><b>' + cis(Math.round(o.schodek)) + " mm</b>"
      + "<span>srážek navíc za rok by bylo potřeba, aby bilance zůstala dnešní</span></div>"
      + '<ul class="sch-prevod">'
      + "<li><b>" + cis(o.schodekPct, 1) + " %</b> dnešního ročního úhrnu</li>"
      + "<li><b>" + cis(Math.round(o.m3ha)) + " m³</b> na hektar</li>"
      + "<li><b>" + cis(Math.round(o.schodek)) + " litrů</b> na každý m² zahrady</li>"
      + "</ul></div>";

    h += '<p class="sch-pocet">Výpočet: výpar poroste o ' + cis(Math.round(o.dPET))
      + " mm (2 × 36 mm na každý stupeň), srážky se podle tohoto scénáře změní o "
      + sign(Math.round(o.dP)) + " mm (" + sign(+o.dPpct.toFixed(1), 1) + " %: léto "
      + sign(+o.dPl.toFixed(1), 1) + " %, zima " + sign(+o.dPz.toFixed(1), 1) + " %). "
      + "Rozdíl " + cis(Math.round(o.dPET)) + " − (" + sign(Math.round(o.dP)) + ") = <b>"
      + cis(Math.round(o.schodek)) + " mm</b>.</p>";

    if (kraj_) {
      h += '<p class="sch-kraj">Na celý <b>' + esc(kraj_.n) + " kraj</b> (" + cis(kraj_.plocha)
        + " km²) to je <b>" + cis(Math.round(kraj_.objemMil)) + " milionů m³</b> vody ročně – "
        + "tolik pitné vody spotřebují domácnosti " + cis(kraj_.lidi / 1e6, 1) + " milionu lidí za rok."
        + (kraj_.kvb >= 0 && kraj_.kvb2 < 0
          ? ' <b>Kraj se tím překlápí z vláhového přebytku do schodku.</b>' : "")
        + "</p>";
    }
    el.innerHTML = h;
  }

  /* ---------- tabulka krajů ---------- */
  function renderKraje(el, scKey, zvyraznit, razeni) {
    if (!el) return;
    var ks = kraje(scKey, razeni), i, k, h = "";
    var max = 0;
    for (i = 0; i < ks.length; i++) max = Math.max(max, ks[i].schodekPct);

    h += '<table class="sch-kraje"><caption class="sch-cap">Kolik srážek schází v jednotlivých krajích při oteplení o 2 °C</caption>'
      + "<thead><tr><th>Kraj</th><th>Srážky dnes</th><th>Bilance dnes</th><th>Bilance při +2 °C</th>"
      + '<th>Schází za rok</th><th>Podíl úhrnu</th><th>Celkem za kraj</th></tr></thead><tbody>';
    for (i = 0; i < ks.length; i++) {
      k = ks[i];
      h += '<tr' + (k.id === zvyraznit ? ' class="on"' : "") + ">"
        + '<th scope="row">' + esc(k.n) + "</th>"
        + '<td data-l="Srážky dnes">' + cis(k.P) + " mm</td>"
        + '<td data-l="Bilance dnes" class="' + (k.kvb < 0 ? "sch-zap" : "sch-kla") + '">' + sign(Math.round(k.kvb)) + " mm</td>"
        + '<td data-l="Bilance při +2 °C" class="' + (k.kvb2 < 0 ? "sch-zap" : "sch-kla") + '">' + sign(Math.round(k.kvb2)) + " mm</td>"
        + '<td data-l="Schází za rok">' + cis(Math.round(k.schodek)) + " mm</td>"
        + '<td data-l="Podíl ročního úhrnu" class="sch-bar"><span class="sch-wrap"><span class="trk"><i style="width:'
        + (k.schodekPct / max * 100).toFixed(1) + "%;background:" + SM.ramp(kvbRisk(k.kvb2))
        + '"></i></span><b>' + cis(k.schodekPct, 1) + " %</b></span></td>"
        + '<td data-l="Celkem za kraj">' + cis(Math.round(k.objemMil)) + " mil. m³</td></tr>";
    }
    h += "</tbody></table>";
    h += '<p class="sch-pozn">Nárůst výparu je po celé republice skoro stejný, proto se sloupec '
      + "„Schází mm/rok“ mezi kraji liší jen málo. Rozdíl dělá to, <b>z jak velkého ročního úhrnu se "
      + "schodek ukrajuje</b> a jak je na tom kraj už dnes: v Praze a na jižní Moravě jde o sedminu "
      + "ročních srážek a bilance byla záporná i předtím, v Jizerských horách o desetinu a s velkou rezervou.</p>";
    el.innerHTML = h;
  }

  /* ---------- shrnutí za ČR ---------- */
  function renderCR(el, scKey) {
    if (!el) return;
    var c = cr(scKey), sc = SM.scenarios[scKey];
    el.innerHTML = '<p>Ve scénáři <b>' + esc(sc.n.toLowerCase()) + "</b> dosáhne Česko průměrného oteplení o 2 °C "
      + "proti normálu 1991–2020 kolem roku <b>" + c.rok + "</b>. Aby krajina zůstala na dnešní vláhové bilanci, "
      + "muselo by na celém území ročně spadnout o <b>" + cis(Math.round(c.schodek)) + " mm</b> srážek víc – "
      + "to je <b>" + cis(c.objemMil / 1000, 1) + " miliardy m³</b> vody za rok – tolik pitné vody "
      + "by za rok spotřebovaly domácnosti " + cis(c.lidi / 1e6, 0) + " milionů lidí. "
      + "Záporná vláhová bilance platí dnes pro <b>" + c.zapornaDnes + "</b> ze čtrnácti krajů, "
      + "při +2 °C pro <b>" + c.zaporna + "</b>.</p>";
  }

  SM.schodek = {
    DT: DT, rok2C: rok2C, bod: bod, kraj: kraj, kraje: kraje, cr: cr, kvbAt: kvbAt,
    kvbRisk: kvbRisk, renderBod: renderBod, renderKraje: renderKraje, renderCR: renderCR
  };
})();
