/* ==========================================================================
   SUCHO A VODA 2026 — VÝPOČETNÍ JÁDRO LOKÁLNÍ DIAGNOSTIKY
   Pro libovolný bod na území ČR spočítá profil lokality a osm indexů
   ohrožení pro zvolený scénář a časový horizont.

   Model je KONCEPTUÁLNÍ a slouží k POROVNÁNÍ SCÉNÁŘŮ A REGIONŮ, nikoli
   k předpovědi konkrétního roku v konkrétní obci. Je postaven tak, aby
   (a) v dnešním stavu odpovídal pozorovanému rozložení sucha podle
   InterSucho a ČHMÚ a (b) každý parametr působil fyzikálně logickým
   směrem. Všechny vstupy a jejich zdroje jsou v sucho-mapa-data.js.
   ========================================================================== */
(function () {
  "use strict";
  var SM = window.SM;

  /* ---------- pomocné funkce ---------- */
  var cl = function (v, a, b) { return v < a ? a : (v > b ? b : v); };
  var cl01 = function (v) { return cl(v, 0, 1); };
  var cl100 = function (v) { return Math.round(cl(v, 1, 99)); };
  /* přibližná vzdálenost v km (ČR: 1° lat ≈ 111 km, 1° lon ≈ 71 km) */
  function dist2(la1, lo1, la2, lo2) {
    var dy = (la1 - la2) * 111, dx = (lo1 - lo2) * 71;
    return dx * dx + dy * dy;
  }

  /* inverzní vážení vzdálenosti z k nejbližších bodů */
  function idw(la, lo, pts, k, pow, cols) {
    var best = [], i, d, j;
    for (i = 0; i < pts.length; i++) {
      d = dist2(la, lo, pts[i][1], pts[i][2]);
      if (best.length < k) { best.push([d, i]); best.sort(function (a, b) { return a[0] - b[0]; }); }
      else if (d < best[k - 1][0]) { best[k - 1] = [d, i]; best.sort(function (a, b) { return a[0] - b[0]; }); }
    }
    var out = cols.map(function () { return 0; }), wsum = 0, w;
    for (j = 0; j < best.length; j++) {
      d = Math.sqrt(best[j][0]);
      if (d < 0.4) return cols.map(function (c) { return pts[best[j][1]][c]; });
      w = 1 / Math.pow(d, pow); wsum += w;
      for (i = 0; i < cols.length; i++) out[i] += w * pts[best[j][1]][cols[i]];
    }
    return out.map(function (v) { return v / wsum; });
  }

  /* totéž pro pole [lat, lon, hodnota] */
  function idw3(la, lo, pts, k, pow) {
    var best = [], i, d;
    for (i = 0; i < pts.length; i++) {
      d = dist2(la, lo, pts[i][0], pts[i][1]);
      if (best.length < k) { best.push([d, i]); best.sort(function (a, b) { return a[0] - b[0]; }); }
      else if (d < best[k - 1][0]) { best[k - 1] = [d, i]; best.sort(function (a, b) { return a[0] - b[0]; }); }
    }
    var v = 0, wsum = 0, w, j;
    for (j = 0; j < best.length; j++) {
      d = Math.sqrt(best[j][0]);
      if (d < 0.4) return pts[best[j][1]][2];
      w = 1 / Math.pow(d, pow); wsum += w; v += w * pts[best[j][1]][2];
    }
    return v / wsum;
  }

  function nearest(la, lo, pts) {
    var bd = Infinity, bi = 0, i, d;
    for (i = 0; i < pts.length; i++) {
      d = dist2(la, lo, pts[i][0], pts[i][1]);
      if (d < bd) { bd = d; bi = i; }
    }
    return pts[bi];
  }

  /* bod v polygonu (ray casting) */
  function inRing(lo, la, ring) {
    var c = false, i, j, n = ring.length;
    for (i = 0, j = n - 1; i < n; j = i++) {
      var xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      if (((yi > la) !== (yj > la)) && (lo < (xj - xi) * (la - yi) / (yj - yi) + xi)) c = !c;
    }
    return c;
  }
  function inMulti(lo, la, coords) {
    var p, r, insideOuter;
    for (p = 0; p < coords.length; p++) {
      insideOuter = inRing(lo, la, coords[p][0]);
      if (!insideOuter) continue;
      for (r = 1; r < coords[p].length; r++) if (inRing(lo, la, coords[p][r])) { insideOuter = false; break; }
      if (insideOuter) return true;
    }
    return false;
  }

  /* kraj pro daný bod (null = mimo ČR) — s hrubým bbox filtrem */
  var _kbox = null;
  function krajAt(la, lo) {
    var fs = SM.geoKraje.features, i, f, b;
    if (!_kbox) {
      _kbox = fs.map(function (f) {
        var x0 = 999, x1 = -999, y0 = 999, y1 = -999;
        f.geometry.coordinates.forEach(function (p) {
          p[0].forEach(function (c) {
            if (c[0] < x0) x0 = c[0]; if (c[0] > x1) x1 = c[0];
            if (c[1] < y0) y0 = c[1]; if (c[1] > y1) y1 = c[1];
          });
        });
        return [x0, x1, y0, y1];
      });
    }
    for (i = 0; i < fs.length; i++) {
      b = _kbox[i];
      if (lo < b[0] || lo > b[1] || la < b[2] || la > b[3]) continue;
      f = fs[i];
      if (inMulti(lo, la, f.geometry.coordinates)) return f.properties.id;
    }
    return null;
  }
  SM.krajAt = krajAt;

  /* sklon terénu: rozdíl interpolované výšky na krátké vzdálenosti (m/km) */
  function sklon(la, lo) {
    var e = function (a, o) { return idw(a, o, SM.stations, 4, 2.2, [3])[0]; };
    var d = 0.08;
    var gx = (e(la, lo + d) - e(la, lo - d)) / (2 * d * 71);
    var gy = (e(la + d, lo) - e(la - d, lo)) / (2 * d * 111);
    return Math.sqrt(gx * gx + gy * gy);
  }

  /* největší město v okolí → odhad městského tepelného ostrova (°C) */
  var _cities = null;
  function uhiAt(la, lo) {
    var best = 0, i, p, d, w;
    if (!_cities) _cities = SM.places.filter(function (q) { return q[4] > 0; })
      .map(function (q) { return [q[0], q[1], q[2], 0, q[4],
        2 + Math.sqrt(q[4]) * 0.9, cl(1.05 * Math.log(q[4] + 1) / Math.LN10 * 2.6 - 0.6, 0, 8)]; });
    for (i = 0; i < _cities.length; i++) {
      p = _cities[i];
      d = Math.sqrt(dist2(la, lo, p[1], p[2]));
      if (d > p[5]) continue;             /* dosah ostrova roste s velikostí města */
      w = 1 - d / p[5];
      if (p[6] * w > best) best = p[6] * w;
    }
    return best;
  }

  /* ---------- 1. ZÁKLADNÍ PROFIL LOKALITY ---------- */
  /* profilBase = jen to, co potřebuje výpočet indexů (kreslení mapového pole).
     Výsledky se ukládají do cache na mřížce ≈ 1,5 km, aby překreslení mapy
     nepočítalo stejný bod znovu. */
  var _pc = {}, _pcN = 0;
  function profilBase(la, lo) {
    var key = (Math.round(la / 0.013) * 1000 + Math.round(lo / 0.018));
    var c = _pc[key];
    if (c !== undefined) return c;
    var kraj = krajAt(la, lo);
    if (!kraj) { if (_pcN < 240000) { _pc[key] = null; _pcN++; } return null; }
    var st = idw(la, lo, SM.stations, 6, 2.4, [3, 4, 5]);
    var elev = st[0], T = st[1], P = st[2];
    var sk = sklon(la, lo);
    var o = {
      la: la, lo: lo, elev: Math.round(elev), T: T, P: Math.round(P),
      kraj: kraj, krajN: SM.kraje[kraj].n,
      hg: nearest(la, lo, SM.hgNodes)[2], basin: nearest(la, lo, SM.basinNodes)[2],
      d26: idw3(la, lo, SM.drought2026, 4, 2.0), sklon: sk, uhi: uhiAt(la, lo),
      nizina: cl01((500 - elev) / 320) * cl01((22 - sk) / 18),
      kont: cl01((lo - 15.0) / 2.6) * cl01((49.5 - la) / 0.9)
    };
    o.hgT = SM.hgTypes[o.hg]; o.basinT = SM.basins[o.basin];
    if (_pcN < 240000) { _pc[key] = o; _pcN++; }
    return o;
  }

  /* plný profil pro diagnostický panel – doplní nejbližší nádrž a obec */
  function profil(la, lo) {
    var b = profilBase(la, lo);
    if (!b) return { la: la, lo: lo, kraj: null };
    var o = {}, kk;
    for (kk in b) o[kk] = b[kk];
    o.la = la; o.lo = lo;
    var nr = null, nrd = Infinity, i, d;
    for (i = 0; i < SM.reservoirs.length; i++) {
      d = dist2(la, lo, SM.reservoirs[i][1], SM.reservoirs[i][2]);
      if (d < nrd) { nrd = d; nr = SM.reservoirs[i]; }
    }
    var np = null, npd = Infinity;
    for (i = 0; i < SM.places.length; i++) {
      d = dist2(la, lo, SM.places[i][1], SM.places[i][2]);
      if (d < npd) { npd = d; np = SM.places[i]; }
    }
    o.nadrz = nr; o.nadrzKm = Math.round(Math.sqrt(nrd));
    o.obec = np; o.obecKm = Math.round(Math.sqrt(npd));
    return o;
  }

  /* ---------- 2. KLIMA PRO SCÉNÁŘ A HORIZONT ---------- */
  var PET0 = function (T) { return Math.max(350, 560 + 36 * (T - 8)); };

  function klima(p, sc, h) {
    var dT = sc.dT[h.id], dPl = sc.dPl[h.id], dPz = sc.dPz[h.id];
    var Pl = 0.61 * p.P * (1 + dPl / 100), Pz = 0.39 * p.P * (1 + dPz / 100);
    var P = Pl + Pz, T = p.T + dT, PET = PET0(T);
    return {
      dT: dT, T: T, P: Math.round(P), PET: Math.round(PET),
      kvb: Math.round(P - PET),
      kvbLeto: Math.round(Pl - 0.78 * PET),       /* IV–IX nese většinu výparu */
      dotace: Math.round(Pz - 0.22 * PET),        /* X–III: co může vsáknout do podzemí */
      ret: sc.ret[h.id], odb: sc.odb[h.id], aku: sc.aku[h.id], priv: sc.priv[h.id],
      tropDny: Math.round(Math.max(0, (p.T - 7.0) * 5.5) + 7.4 * dT + p.uhi * 0.4
        + 6 * p.kont * (1 + 0.25 * dT)),
      tropNoci: +(Math.max(0, (p.T - 9.3) * 1.2 + p.uhi * 0.4) * (1 + 0.55 * dT) + 0.22 * dT * dT).toFixed(1)
    };
  }

  /* kumulativní deficit: jak dlouho a jak silně bilance chybí */
  var YRS = { h2027: 1, h2030: 7, h2040: 14, h2050: 24, h2075: 49 };
  function cumDef(k, h) {
    var yrs = YRS[h.id];
    var stress = cl01((120 - k.kvb) / 400);
    var retF = 1 - (k.ret - 18) / 130;
    var akuF = 1 - k.aku / 170;
    return cl01(stress * retF * akuF * (0.34 + 0.66 * Math.log(1 + yrs) / Math.log(50)));
  }

  /* ---------- 3. OSM INDEXŮ OHROŽENÍ (1–99) ---------- */
  function indexy(p, scKey, hId) {
    var sc = SM.scenarios[scKey];
    var h = SM.horizons.filter(function (x) { return x.id === hId; })[0];
    var k = klima(p, sc, h);
    var cd = cumDef(k, h);
    var kr = p.kraj ? SM.kraje[p.kraj] : null;
    var bs = p.basinT, hg = p.hgT;
    /* váha aktuálního stavu: v nejbližším horizontu rozhoduje, dál slábne */
    var wNow = { h2027: 0.62, h2030: 0.3, h2040: 0.14, h2050: 0.07, h2075: 0.03 }[h.id];
    var now = p.d26 / 5;                                  /* 0–1 podle InterSucho 11/2026 */
    var retRel = (k.ret - 35) / 65;                       /* <0 horší, >0 lepší než dnes */

    /* 1 — Srážky a výpar */
    var srazky = cl100(5 + (400 - k.kvb) / 650 * 90 + (k.priv - 45) * 0.28);

    /* 2 — Povrchová voda */
    var zranN = cl(bs.zranitelnost + (k.dT - 0.9) * 0.55 - retRel * 0.9, 1, 5);
    var maleToky = (hg === "flys" || hg === "masiv") ? 68 : (hg === "krida" ? 38 : 50);
    var povrch = cl100(0.40 * srazky + 0.34 * (zranN - 1) / 4 * 95
      + 0.26 * (maleToky + 30 * cd - 22 * retRel)
      + wNow * 22 * now - 10 * k.aku / 20);

    /* 3 — Podpovrchová a podzemní voda */
    var pudaIdx = cl100(6 + (240 - k.kvbLeto) / 520 * 92 - 16 * retRel + wNow * 34 * now);
    /* zvodeň: rychle reaguje masiv a flyš, křída se vyčerpává pomalu a dlouho */
    var citlivost = 1 - hg.setrvacnost;                   /* masiv 0.65, křída 0.12 */
    /* puklinové prostředí je ohrožené okamžitě (studny vysychají už v prvním suchém roce),
       pánev s velkou setrvačností se vyčerpává roky – ale pak se neobnoví desítky let.
       Poslední člen zajišťuje, že s prohlubujícím se deficitem se zhoršuje každé prostředí. */
    var kratke = citlivost * (0.60 + 0.40 * (1 - cl01(k.dotace / 110)));
    var zvoden = cl100(10 + 78 * cl01(0.42 * kratke + 1.50 * hg.setrvacnost * cd + 0.35 * cd)
      + wNow * 20 * now);
    var podzemi = cl100(0.45 * pudaIdx + 0.55 * zvoden);

    /* 4 — Zásobování pitnou vodou */
    var mixPov = kr ? kr.zdroj[0] / 100 : 0.5, mixPod = kr ? kr.zdroj[1] / 100 : 0.4;
    /* povrchová složka se počítá z povodí, ze kterého kraj vodu skutečně bere:
       Praha nebere pitnou vodu z Vltavy, ale ze Želivky a z Káraného. */
    var zdrPov = (kr && kr.zdrojPovodi) ? kr.zdrojPovodi : [p.basin];
    var zrSum = 0, zi;
    for (zi = 0; zi < zdrPov.length; zi++) {
      var bz = SM.basins[zdrPov[zi]];
      zrSum += cl(bz.zranitelnost + (k.dT - 0.9) * 0.55 - retRel * 0.9, 1, 5);
    }
    var povrchZdroj = cl100(0.42 * srazky + 0.58 * ((zrSum / zdrPov.length) - 1) / 4 * 95
      + 24 * cd - 18 * retRel - 10 * k.aku / 20);
    var zavislost = mixPov * povrchZdroj + mixPod * zvoden
      + (1 - mixPov - mixPod) * (0.5 * povrchZdroj + 0.5 * zvoden);
    var pitna = cl100(0.56 * zavislost
      + 0.18 * (kr ? (kr.supply - 1) / 4 * 95 : 50)
      + 0.14 * (kr ? (6 - kr.propoj) / 5 * 95 : 50)
      + 0.12 * (kr ? (kr.vlastniZdroje - 1) / 4 * 95 : 50)
      + (k.odb - 100) * 0.45 - k.aku * 0.5);

    /* 5 — Krajina a péče o ni */
    var erozeRisk = cl01(p.sklon / 28) * p.nizina;
    var krajina = cl100(52 - retRel * 44 + 26 * p.nizina + 24 * erozeRisk
      + 0.22 * (k.priv - 45) + 18 * cd - 0.12 * (100 - srazky));

    /* 6 — Zemědělství a chov dobytka */
    var tepelnyStres = cl01((k.tropDny - 12) / 45);
    var zemedelstvi = cl100(0.44 * pudaIdx + 0.2 * (100 * p.nizina * 0.6 + 20)
      + 0.2 * tepelnyStres * 100 + 0.16 * (krajina) - 8 * retRel);

    /* 7 — Průmysl a ekonomika */
    var vodniNarocnost = kr ? ({ MSK: 1.0, ULK: 0.95, STC: 0.9, PAK: 0.85, JHM: 0.8, PLK: 0.75,
      ZLK: 0.75, VYS: 0.8, OLK: 0.7, JHC: 0.7, HKK: 0.7, KVK: 0.6, LBK: 0.6, PHA: 0.5 }[p.kraj] || 0.7) : 0.7;
    var prumysl = cl100(0.46 * povrch * vodniNarocnost + 0.18 * (zranN - 1) / 4 * 95
      + 0.2 * zavislost + 0.16 * 100 * vodniNarocnost + (k.odb - 100) * 0.35);

    /* 8 — Fyzické a psychické zdraví */
    var zdravi = cl100(8 + cl01((k.tropDny - 8) / 48) * 52 + cl01(k.tropNoci / 16) * 22
      + p.uhi * 3.1 + cl01((300 - k.kvb) / 500) * 10);

    return {
      k: k, cd: cd, h: h, sc: sc, scKey: scKey,
      srazky: srazky, povrch: povrch, podzemi: podzemi, pitna: pitna,
      krajina: krajina, zemedelstvi: zemedelstvi, prumysl: prumysl, zdravi: zdravi,
      puda: pudaIdx, zvoden: zvoden, zranN: zranN,
      celkem: Math.round((srazky + povrch + podzemi * 1.3 + pitna * 1.3 + krajina
        + zemedelstvi + prumysl + zdravi) / 8.6)
    };
  }

  /* hodnota jedné vrstvy — používá mapa pro vykreslení pole */
  function hodnota(la, lo, layer, scKey, hId) {
    var p = profilBase(la, lo);
    if (!p) return null;
    return indexy(p, scKey, hId)[layer];
  }

  /* kategorie rizika pro barvu a slovní hodnocení */
  var KAT = [
    [0, 20, "ok", "nízké"],
    [20, 38, "low", "zvýšené"],
    [38, 56, "mid", "střední"],
    [56, 74, "warn", "vysoké"],
    [74, 101, "crit", "kritické"]
  ];
  function kat(v) {
    for (var i = 0; i < KAT.length; i++) if (v >= KAT[i][0] && v < KAT[i][1]) return KAT[i];
    return KAT[4];
  }

  SM.model = {
    profil: profil, profilBase: profilBase, klima: klima, indexy: indexy, hodnota: hodnota,
    kat: kat, KAT: KAT, YRS: YRS, uhiAt: uhiAt, dist2: dist2
  };
})();
