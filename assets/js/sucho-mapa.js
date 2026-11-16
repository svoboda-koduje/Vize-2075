/* ==========================================================================
   SUCHO A VODA 2026 — INTERAKTIVNÍ ENVIRONMENTÁLNÍ MAPA ČR (Leaflet)
   Mapové pole se počítá v prohlížeči z modelu v sucho-model.js. Podkladová
   dlaždicová mapa je vypnutá – mapa funguje i bez připojení k mapovým
   serverům, hranice krajů jsou součástí stránky.
   ========================================================================== */
(function () {
  "use strict";
  var SM = window.SM, M = SM.model;
  var $ = function (s) { return document.querySelector(s); };

  var state = { layer: "podzemi", sc: "trend", hz: "h2027", p: null, marker: null, mode: "risk" };

  /* ---------- barevná stupnice rizika ---------- */
  var STOPS = [[8, [31, 122, 92]], [28, [122, 160, 58]], [46, [216, 164, 22]],
               [64, [224, 108, 42]], [86, [166, 18, 58]]];
  function ramp(v) {
    if (v <= STOPS[0][0]) return STOPS[0][1];
    for (var i = 1; i < STOPS.length; i++) {
      if (v <= STOPS[i][0]) {
        var a = STOPS[i - 1], b = STOPS[i], t = (v - a[0]) / (b[0] - a[0]);
        return [0, 1, 2].map(function (j) { return Math.round(a[1][j] + t * (b[1][j] - a[1][j])); });
      }
    }
    return STOPS[STOPS.length - 1][1];
  }
  function rgba(v, al) { var c = ramp(v); return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + al + ")"; }
  SM.ramp = function (v) { var c = ramp(v); return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")"; };

  /* ---------- mapa ---------- */
  var map, fieldLayer, borders, resLayer, labelLayer, baseLayer = null;
  var BOUNDS = L.latLngBounds([48.50, 12.02], [51.10, 18.92]);

  function initMap() {
    map = L.map("sm-map", {
      center: [49.82, 15.47], zoom: 7, minZoom: 5.5, maxZoom: 12,
      zoomSnap: 0.1, zoomDelta: 0.5, wheelPxPerZoomLevel: 90,
      maxBounds: BOUNDS.pad(0.45), zoomControl: false, attributionControl: false,
      preferCanvas: true
    });
    L.control.zoom({ position: 'topright' }).addTo(map);
    prog++; map.fitBounds(BOUNDS, { padding: [6, 6], animate: false });
    setTimeout(function () { prog = Math.max(0, prog - 1); }, 60);

    /* mapové pole modelu */
    var Field = L.GridLayer.extend({
      createTile: function (coords) {
        var tile = document.createElement("canvas"), size = this.getTileSize();
        tile.width = size.x; tile.height = size.y;
        var ctx = tile.getContext("2d"), step = 6;
        var org = coords.scaleBy(size);
        for (var y = 0; y < size.y; y += step) {
          for (var x = 0; x < size.x; x += step) {
            var ll = map.unproject(org.add([x + step / 2, y + step / 2]), coords.z);
            var v;
            if (state.mode === "risk") {
              v = M.hodnota(ll.lat, ll.lng, state.layer, state.sc, state.hz);
            } else {
              var kv = SM.schodek.kvbAt(ll.lat, ll.lng, state.sc, state.mode === "kvb2");
              v = kv === null ? null : SM.schodek.kvbRisk(kv);
            }
            if (v === null) continue;
            ctx.fillStyle = rgba(v, 0.82);
            ctx.fillRect(x, y, step + 1, step + 1);
          }
        }
        return tile;
      }
    });
    fieldLayer = new Field({ tileSize: 256, opacity: 1, className: "sm-field", pane: "overlayPane" });
    fieldLayer.addTo(map);
    SM.map = map; SM.fieldLayer = fieldLayer;

    /* hranice krajů */
    borders = L.geoJSON(SM.geoKraje, {
      style: function () {
        return { color: "#0d1b24", weight: 1.1, opacity: 0.55, fill: true,
                 fillColor: "#000", fillOpacity: 0, interactive: true };
      },
      onEachFeature: function (f, l) {
        l.bindTooltip(f.properties.name + " kraj", { sticky: true, className: "sm-tip-k" });
        l.on("click", function (e) { select(e.latlng.lat, e.latlng.lng); });
      }
    }).addTo(map);

    /* vodní díla */
    resLayer = L.layerGroup().addTo(map);
    SM.reservoirs.forEach(function (r) {
      var zr = r[6], planned = zr === 0;
      var mk = L.circleMarker([r[1], r[2]], {
        radius: planned ? 4 : 4 + zr * 0.9,
        color: "#07141c", weight: 1.2,
        fillColor: planned ? "#6b7f8c" : SM.ramp(zr * 19 + 6),
        fillOpacity: planned ? 0.55 : 0.95, dashArray: planned ? "2,2" : null
      });
      mk.bindPopup('<b>' + r[0] + '</b><br><span class="sm-pop-u">' + r[3] + '</span><br>'
        + '<span class="sm-pop-s">' + r[4] + '</span>', { className: "sm-pop" });
      mk.addTo(resLayer);
    });

    /* názvy měst */
    labelLayer = L.layerGroup().addTo(map);
    function drawLabels() {
      labelLayer.clearLayers();
      /* pozor: zoom je desetinný (zoomSnap 0.1), proto porovnáváme intervaly */
      var z = map.getZoom();
      var lim = z < 7.6 ? 90 : z < 8.6 ? 40 : z < 9.6 ? 18 : z < 10.6 ? 6 : 0;
      SM.places.forEach(function (pl) {
        if (pl[4] < lim) return;
        L.marker([pl[1], pl[2]], {
          interactive: false, keyboard: false,
          icon: L.divIcon({ className: "sm-lab" + (pl[4] >= 90 ? " big" : ""), html: pl[0],
                            iconSize: null, iconAnchor: [0, 0] })
        }).addTo(labelLayer);
      });
    }
    drawLabels();
    map.on("zoomend", drawLabels);
    map.on("resize", drawLabels);

    map.on("click", function (e) { select(e.latlng.lat, e.latlng.lng); });
    /* Dokud uživatel mapou sám nepohnul, drží se výřez na celé ČR. Panel se
       zobrazuje až po klepnutí v menu, takže do té doby nemá kontejner konečné
       rozměry a první výpočet výřezu by byl špatně. Programové posuny (fit)
       se za pohyb uživatele nepočítají – hlídá je čítač prog. */
    map.on("zoomstart movestart", function () { if (!prog) userMoved = true; });
    SM.fit = function () {
      if (!map) return;
      prog++;
      map.invalidateSize(true);
      if (!userMoved) map.fitBounds(BOUNDS, { padding: [8, 8], animate: false });
      setTimeout(function () { prog = Math.max(0, prog - 1); }, 60);
    };
    setTimeout(SM.fit, 60); setTimeout(SM.fit, 400); setTimeout(SM.fit, 1200);
    addEventListener("resize", function () { if (!userMoved) SM.fit(); });
  }
  var userMoved = false, prog = 0;

  /* ---------- výběr lokality ---------- */
  function select(la, lo, zoomTo) {
    var p = M.profil(la, lo);
    if (!p.kraj) {
      flash("Toto místo leží mimo území České republiky. Model počítá jen pro ČR.");
      return;
    }
    state.p = p;
    if (state.marker) map.removeLayer(state.marker);
    state.marker = L.marker([la, lo], {
      icon: L.divIcon({ className: "sm-pin", html: '<i></i>', iconSize: [22, 22], iconAnchor: [11, 11] }),
      keyboard: false
    }).addTo(map);
    if (zoomTo) { userMoved = true; map.setView([la, lo], Math.max(map.getZoom(), 9)); }
    renderPanel();
    renderSchodek();
    var pw = $("#sm-panel-wrap");
    if (pw && window.matchMedia("(max-width:900px)").matches) pw.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  SM.selectPoint = select;

  function renderPanel() {
    SM.panel.render($("#sm-panel"), state.p, state.sc, state.hz, state.layer, function (lay) {
      setLayer(lay);
    });
  }

  function flash(msg) {
    var e = $("#sm-flash"); if (!e) return;
    e.textContent = msg; e.classList.add("on");
    setTimeout(function () { e.classList.remove("on"); }, 4200);
  }

  /* ---------- ovládání ---------- */
  /* Režim mapy: riziko ve zvolené vrstvě, nebo vláhová bilance (dnes / při +2 °C).
     Bilance je pevně vázaná na oteplení o 2 °C, časová osa se v ní neuplatní. */
  function setMode(m) {
    state.mode = m;
    $$(".sm-mode").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === m ? "true" : "false"); });
    var lay = $("#sm-layers");
    if (lay) lay.classList.toggle("dim", m !== "risk");
    var hz = $("#sm-hz-note");
    if (hz) hz.hidden = (m === "risk");
    layerInfo();
    refresh();
  }

  function layerInfo() {
    var box = $("#sm-layerinfo");
    if (!box) return;
    if (state.mode !== "risk") {
      var pri2 = state.mode === "kvb2";
      var r = SM.schodek.rok2C(state.sc);
      box.innerHTML = "<b>Vláhová bilance " + (pri2 ? "při oteplení o 2 °C" : "dnes") + ".</b> "
        + "Rozdíl mezi ročním úhrnem srážek a výparem v mm. Modrozelená znamená přebytek, "
        + "karmínová schodek – tedy o kolik milimetrů srážek ročně nestačí na pokrytí výparu."
        + (pri2 ? " Platí pevně oteplení o 2 °C proti normálu 1991–2020; zvolený scénář určuje jen"
            + " změnu srážek a rok, kdy k oteplení dojde (" + r.rok + ")." : "")
        + ' <a class="sm-kaplink" href="#sm-schodek">Celý výpočet i tabulka krajů ↓</a>'
        + '<span class="sm-src">Zdroje: ČHMÚ – normály teploty a srážek 1991–2020 · '
        + 'CzechGlobe/InterSucho – vláhová bilance · Hruška a kol., Ochrana přírody 6/2020 – '
        + 'nárůst výparu s teplotou</span>';
      return;
    }
    var l = SM.layers.filter(function (x) { return x.id === state.layer; })[0];
    box.innerHTML = "<b>" + l.n + ".</b> " + l.popis
      + (l.kap ? '<br><a class="sm-kaplink" href="#' + l.kap[0] + '">Podrobně v kapitole '
          + l.kap[1] + '</a>' : "")
      + '<span class="sm-src">Zdroje vrstvy: ' + l.zdroje.join(" · ") + "</span>";
  }

  function setLayer(id) {
    state.layer = id;
    if (state.mode !== "risk") setMode("risk");
    $$(".sm-lay").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lay === id ? "true" : "false"); });
    layerInfo();
    refresh();
  }
  function setSc(id) {
    state.sc = id;
    $$(".sm-sc").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.sc === id ? "true" : "false"); });
    var s = SM.scenarios[id];
    $("#sm-scinfo").innerHTML = "<b>" + s.n + " – " + s.sub + ".</b> " + s.popis;
    refresh();
  }
  function setHz(i) {
    var h = SM.horizons[i];
    state.hz = h.id;
    $("#sm-hz-lbl").innerHTML = "<b>" + h.lbl + "</b> <span>" + h.sub + "</span>";
    $("#sm-hzinfo").textContent = h.popis;
    $$(".sm-hz-t").forEach(function (t, j) { t.classList.toggle("on", j === i); });
    refresh();
  }
  function refresh() {
    if (fieldLayer) fieldLayer.redraw();
    updateLegend();
    if (state.p) renderPanel();
    renderSchodek();
  }

  /* blok „kolik srážek bude scházet“ pod mapou */
  function renderSchodek() {
    if (!SM.schodek) return;
    SM.schodek.renderCR($("#sm-sch-cr"), state.sc);
    SM.schodek.renderBod($("#sm-sch-bod"), state.p, state.sc);
    SM.schodek.renderKraje($("#sm-sch-kraje"), state.sc, state.p && state.p.kraj);
  }
  SM.renderSchodek = renderSchodek;
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  function updateLegend() {
    var g = $("#sm-legend-bar");
    if (!g) return;
    var st = [];
    for (var v = 0; v <= 100; v += 2) st.push(rgba(v, 1) + " " + v + "%");
    g.style.background = "linear-gradient(90deg," + st.join(",") + ")";
    var a = $("#sm-leg-a"), b = $("#sm-leg-b");
    if (a && b) {
      var bil = state.mode !== "risk";
      a.textContent = bil ? "přebytek +270 mm" : "nízké riziko";
      b.textContent = bil ? "schodek \u2212270 mm" : "kritické";
    }
  }

  /* ---------- vyhledávání ---------- */
  function norm(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function initSearch() {
    var inp = $("#sm-search"), box = $("#sm-results");
    if (!inp) return;
    function hide() { box.innerHTML = ""; box.classList.remove("on"); }
    inp.addEventListener("input", function () {
      var q = inp.value.trim();
      if (q.length < 2) { hide(); return; }
      var res = [];
      /* PSČ */
      var dig = q.replace(/\s+/g, "");
      if (/^\d{3,5}$/.test(dig)) {
        SM.places.forEach(function (pl) {
          if (pl[3] && String(pl[3]).indexOf(dig) === 0) res.push([pl[0] + " (" + fmtPsc(pl[3]) + ")", pl[1], pl[2]]);
        });
        if (!res.length && dig.length >= 2) {
          var pf = SM.pscPrefix[dig.slice(0, 2)];
          if (pf) res.push(["PSČ " + dig + " – přibližný střed oblasti", pf[0], pf[1]]);
        }
      }
      /* název obce */
      var nq = norm(q);
      SM.places.forEach(function (pl) {
        if (norm(pl[0]).indexOf(nq) === 0) res.push([pl[0], pl[1], pl[2]]);
      });
      SM.places.forEach(function (pl) {
        if (norm(pl[0]).indexOf(nq) > 0) res.push([pl[0], pl[1], pl[2]]);
      });
      /* nádrže */
      SM.reservoirs.forEach(function (r) {
        if (norm(r[0]).indexOf(nq) >= 0) res.push([r[0] + " (vodní dílo)", r[1], r[2]]);
      });
      var seen = {}, out = [];
      res.forEach(function (r) { if (!seen[r[0]]) { seen[r[0]] = 1; out.push(r); } });
      out = out.slice(0, 9);
      if (!out.length) {
        box.innerHTML = '<div class="sm-res-no">Nenalezeno. Zkuste jiný zápis, nebo klepněte přímo do mapy – model počítá pro libovolný bod.</div>';
        box.classList.add("on"); return;
      }
      box.innerHTML = out.map(function (r, i) {
        return '<button data-i="' + i + '">' + r[0] + "</button>";
      }).join("");
      box.classList.add("on");
      box.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          var r = out[+b.dataset.i];
          inp.value = r[0].replace(/ \(.*\)$/, "");
          hide(); select(r[1], r[2], true);
        });
      });
    });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { var b = box.querySelector("button"); if (b) b.click(); }
      if (e.key === "Escape") hide();
    });
    document.addEventListener("click", function (e) {
      if (!box.contains(e.target) && e.target !== inp) hide();
    });
  }
  function fmtPsc(p) { var s = String(p); return s.slice(0, 3) + " " + s.slice(3); }

  /* ---------- podkladová mapa (volitelně) ---------- */
  function toggleBase(on) {
    if (on && !baseLayer) {
      baseLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 12, opacity: 0.55, className: "sm-base",
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      map.attributionControl || map.addControl(L.control.attribution({ prefix: false }));
    }
    if (on) { baseLayer.addTo(map); baseLayer.bringToBack(); }
    else if (baseLayer) map.removeLayer(baseLayer);
    document.getElementById("sm-map").classList.toggle("has-base", !!on);
  }

  /* ---------- start ---------- */
  function boot() {
    if (typeof L === "undefined") {
      var w = $("#sm-map");
      if (w) w.innerHTML = '<div class="sm-nol"><b>Mapovou knihovnu Leaflet se nepodařilo načíst.</b>'
        + ' Interaktivní mapa potřebuje připojení k internetu. Veškerý text, tabulky, grafy a kapitoly'
        + ' studie fungují i bez ní – pokračujte prosím níže.</div>';
      return;
    }
    initMap();
    /* vrstvy */
    var lb = $("#sm-layers");
    lb.innerHTML = SM.layers.map(function (l, i) {
      return '<button class="sm-lay" data-lay="' + l.id + '" aria-pressed="false" title="' + l.n
        + '" aria-label="Vrstva ' + (i + 1) + ': ' + l.n + '"><b>'
        + (i + 1) + '</b> ' + (l.zkr || l.n) + "</button>";
    }).join("");
    $$(".sm-lay").forEach(function (b) {
      b.addEventListener("click", function () { setLayer(b.dataset.lay); });
    });
    /* co mapa ukazuje */
    $$(".sm-mode").forEach(function (b) {
      b.addEventListener("click", function () { setMode(b.dataset.mode); });
    });
    /* scénáře */
    var sb = $("#sm-scen");
    sb.innerHTML = Object.keys(SM.scenarios).map(function (k) {
      var s = SM.scenarios[k];
      return '<button class="sm-sc k-' + s.barva + '" data-sc="' + k + '" aria-pressed="false">'
        + s.n + "</button>";
    }).join("");
    $$(".sm-sc").forEach(function (b) {
      b.addEventListener("click", function () { setSc(b.dataset.sc); });
    });
    /* časová osa */
    var hr = $("#sm-hz");
    hr.max = String(SM.horizons.length - 1);
    hr.addEventListener("input", function () { setHz(+hr.value); });
    $("#sm-hz-ticks").innerHTML = SM.horizons.map(function (h, i) {
      return '<button class="sm-hz-t" data-i="' + i + '">' + h.lbl + "</button>";
    }).join("");
    $$(".sm-hz-t").forEach(function (t) {
      t.addEventListener("click", function () { hr.value = t.dataset.i; setHz(+t.dataset.i); });
    });
    /* podkladová mapa */
    var bm = $("#sm-basemap");
    if (bm) bm.addEventListener("change", function () { toggleBase(bm.checked); });

    initSearch();
    setLayer("podzemi"); setSc("trend"); setHz(0); setMode("risk");
    SM.panel.render($("#sm-panel"), null);
  }

  /* Mapa se staví teprve tehdy, až je její panel vidět (Leaflet potřebuje
     kontejner se známými rozměry). Stránku obsluhuje hook onShow; pokud by
     nebyl k dispozici, mapa se postaví sama, jen co je panel viditelný. */
  var booted = false;
  SM.boot = function () { if (booted) return; booted = true; boot(); };
  function tryBoot() {
    var el = document.getElementById("sm-map");
    if (!el) return;
    var pan = el.closest(".panel");
    if (!pan || pan.classList.contains("on")) SM.boot();
    else if (!window.__suchoOnShow) setTimeout(tryBoot, 400);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryBoot);
  else tryBoot();
})();
