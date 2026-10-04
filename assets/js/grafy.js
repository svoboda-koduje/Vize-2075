/* ==========================================================================
   VIZE 2075 — jednoduchý vlastní grafický modul (SVG, bez externích knihoven)
   Typy: "line" (čáry, volitelně s projekcí), "columns" (sloupce; skládané,
   divergentní, s rozpětím) a kombinace sloupců s čarou na téže ose.
   Každý graf má: legendu (≥ 2 řady), tooltip s křížem, ovládání klávesnicí
   a přepínač tabulkového zobrazení.
   ========================================================================== */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || name;
  const colorOf = (c) => (c && c.startsWith("--")) ? css(c) : (c || css("--series-1"));
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const fmtNum = (v, dec = 1) => {
    if (v === null || v === undefined || Number.isNaN(v)) return "–";
    return Number(v).toLocaleString("cs-CZ", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  };
  function niceTicks(min, max, count = 5) {
    if (min === max) { min -= 1; max += 1; }
    const span = max - min;
    const step0 = span / count;
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const lo = Math.floor(min / step) * step;
    const hi = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = lo; v <= hi + step / 2; v += step) ticks.push(+v.toFixed(10));
    return { lo, hi, ticks, step };
  }

  function render(card, spec) {
    const box = card.querySelector(".chart-box");
    const legendBox = card.querySelector(".chart-legend");
    box.innerHTML = "";
    const W = Math.max(300, Math.round(box.clientWidth || 640));
    const narrow = W < 520;
    const H = spec.height ? (narrow ? Math.round(spec.height * 0.95) : spec.height) : (narrow ? 250 : 300);
    const m = { t: spec.yLabel ? 24 : 16, r: narrow ? 16 : 24, b: 30, l: narrow ? 40 : 52 };
    if (spec.endLabels && !narrow) m.r = 110;
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": spec.title, tabindex: "0" }, box);
    const xs = spec.x;
    const n = xs.length;

    // Rozsah osy Y
    let vals = [];
    spec.series.forEach((s, si) => {
      if (spec.stacked && s.kind !== "line") return;
      s.values.forEach((v) => { if (v !== null && v !== undefined) vals.push(v); });
      if (s.low) s.low.forEach((v) => v != null && vals.push(v));
      if (s.high) s.high.forEach((v) => v != null && vals.push(v));
    });
    if (spec.stacked) {
      for (let i = 0; i < n; i++) {
        let sum = 0;
        spec.series.forEach((s) => { if (s.kind !== "line" && s.values[i] != null) sum += s.values[i]; });
        vals.push(sum);
      }
    }
    if (spec.refLine) vals.push(spec.refLine.y);
    let yMin = spec.yMin !== undefined ? spec.yMin : Math.min(0, ...vals);
    let yMax = spec.yMax !== undefined ? spec.yMax : Math.max(...vals);
    if (spec.yMin === undefined && Math.min(...vals) > 0 && spec.zeroBase === false) yMin = Math.min(...vals) * 0.95;
    const t = niceTicks(yMin, yMax, narrow ? 4 : 5);
    if (spec.yMin === undefined) yMin = t.lo; if (spec.yMax === undefined) yMax = t.hi;
    const y = (v) => m.t + ih - ((v - yMin) / (yMax - yMin)) * ih;
    const isCols = spec.type === "columns";
    const band = iw / n;
    const numX = !isCols && xs.every((v) => typeof v === "number") && n > 1;
    const x = (i) => isCols ? m.l + band * (i + 0.5) : numX ? m.l + iw * (xs[i] - xs[0]) / (xs[n - 1] - xs[0]) : m.l + (n === 1 ? iw / 2 : (iw * i) / (n - 1));

    // Mřížka
    const g = el("g", { class: "grid" }, svg);
    t.ticks.forEach((tv) => {
      if (tv < yMin - 1e-9 || tv > yMax + 1e-9) return;
      el("line", { x1: m.l, x2: m.l + iw, y1: y(tv), y2: y(tv) }, g);
      const tx = el("text", { x: m.l - 8, y: y(tv) + 4, "text-anchor": "end" }, svg);
      tx.textContent = (spec.yFormat ? spec.yFormat(tv) : fmtNum(tv, t.step < 1 ? 1 : 0));
    });
    if (spec.yLabel) {
      const yl = el("text", { x: m.l - 8, y: 10, "text-anchor": "end" }, svg);
      yl.textContent = spec.yLabel;
    }
    // Základní linie (nula)
    const baseV = (yMin <= 0 && yMax >= 0) ? 0 : yMin;
    el("line", { class: "base", x1: m.l, x2: m.l + iw, y1: y(baseV), y2: y(baseV) }, svg);

    // Popisky osy X
    const numericX = xs.every((v) => typeof v === "number");
    if (numericX && spec.xStep !== 1) {
      const span = xs[n - 1] - xs[0];
      const step = spec.xStep || (span > 120 ? 25 : span > 60 ? (narrow ? 20 : 10) : span > 25 ? (narrow ? 10 : 5) : (narrow ? 4 : 2));
      if (numX) {
        for (let yv = Math.ceil(xs[0] / step) * step; yv <= xs[n - 1]; yv += step) {
          const px = m.l + iw * (yv - xs[0]) / (xs[n - 1] - xs[0]);
          const tx = el("text", { x: px, y: H - 8, "text-anchor": "middle" }, svg);
          tx.textContent = yv;
        }
      } else xs.forEach((xv, i) => {
        if (xv % step !== 0) return;
        const tx = el("text", { x: x(i), y: H - 8, "text-anchor": "middle" }, svg);
        tx.textContent = xv;
      });
    } else {
      const every = spec.xEvery ? (narrow ? spec.xEvery * 2 : spec.xEvery) : Math.max(1, Math.ceil(n / (narrow ? 5 : 9)));
      xs.forEach((xv, i) => {
        if (i % every !== 0 && i !== n - 1) return;
        if (i === n - 1 && i % every !== 0 && (i % every) < every * 0.6) return;
        const tx = el("text", { x: x(i), y: H - 8, "text-anchor": "middle" }, svg);
        tx.textContent = spec.xFormat ? spec.xFormat(xv) : xv;
      });
    }

    // Referenční čára
    if (spec.refLine) {
      el("line", { x1: m.l, x2: m.l + iw, y1: y(spec.refLine.y), y2: y(spec.refLine.y), stroke: css("--ink-2"), "stroke-width": 1, opacity: .55 }, svg);
      const rl = el("text", { x: m.l + iw - 4, y: y(spec.refLine.y) - 6, "text-anchor": "end", class: "lbl" }, svg);
      rl.textContent = spec.refLine.label;
    }
    // Zvýrazněná období (např. projekce)
    if (spec.shadeFrom !== undefined) {
      const i0 = xs.indexOf(spec.shadeFrom);
      if (i0 >= 0) {
        const x0 = x(i0);
        el("rect", { x: x0, y: m.t, width: m.l + iw - x0, height: ih, fill: css("--surface-2"), opacity: .7 }, svg).parentNode.insertBefore(svg.lastChild, svg.firstChild);
        const st = el("text", { x: x0 + 6, y: m.t + 12, "text-anchor": "start", class: "lbl" }, svg);
        st.textContent = spec.shadeLabel || "projekce";
      }
    }

    // Sloupce
    const barW = Math.min(24, Math.max(2, band * (spec.stacked ? .62 : .7) / (spec.stacked ? 1 : Math.max(1, spec.series.filter(s => s.kind !== "line").length))));
    const colSeries = spec.series.filter((s) => s.kind !== "line");
    const colGroup = el("g", {}, svg);
    if (isCols) {
      const stackPos = new Array(n).fill(0);
      const stackNeg = new Array(n).fill(0);
      colSeries.forEach((s, si) => {
        s.values.forEach((v, i) => {
          if (v === null || v === undefined) return;
          let fill = colorOf(s.color);
          if (spec.diverging) fill = v >= 0 ? css("--div-warm") : css("--div-cool");
          let x0, w = barW, y0, y1;
          if (spec.stacked) {
            x0 = x(i) - barW / 2;
            if (v >= 0) { y0 = y(stackPos[i] + v); y1 = y(stackPos[i]); stackPos[i] += v; }
            else { y0 = y(stackNeg[i]); y1 = y(stackNeg[i] + v); stackNeg[i] += v; }
          } else {
            const k = colSeries.length;
            x0 = x(i) - (barW * k) / 2 + barW * si;
            y0 = Math.min(y(v), y(0 < yMin ? yMin : 0));
            y1 = Math.max(y(v), y(0 < yMin ? yMin : 0));
            if (yMin > 0) { y0 = y(v); y1 = y(yMin); }
          }
          const h = Math.max(0.5, y1 - y0);
          const gap = spec.stacked ? 1 : 0;
          const r = Math.min(4, w / 2, h / 2);
          // Zaoblení jen na datovém konci
          const up = v >= 0;
          const p = up
            ? `M${x0},${y1} V${y0 + r + gap} Q${x0},${y0 + gap} ${x0 + r},${y0 + gap} H${x0 + w - r} Q${x0 + w},${y0 + gap} ${x0 + w},${y0 + r + gap} V${y1} Z`
            : `M${x0},${y0} V${y1 - r} Q${x0},${y1} ${x0 + r},${y1} H${x0 + w - r} Q${x0 + w},${y1} ${x0 + w},${y1 - r} V${y0} Z`;
          const isTop = !spec.stacked || si === colSeries.length - 1;
          const path = el("path", { d: (spec.stacked && !isTop) ? `M${x0},${y0 + gap} H${x0 + w} V${y1} H${x0} Z` : p, fill, class: "mark", "data-i": i, opacity: (s.dimFrom !== undefined && i >= s.dimFrom) ? .55 : 1 }, colGroup);
          // Rozpětí (vous)
          if (s.low && s.high && s.low[i] != null) {
            const cx = x0 + w / 2;
            el("line", { x1: cx, x2: cx, y1: y(s.high[i]), y2: y(s.low[i]), stroke: css("--ink-2"), "stroke-width": 1.5 }, colGroup);
            el("line", { x1: cx - 6, x2: cx + 6, y1: y(s.high[i]), y2: y(s.high[i]), stroke: css("--ink-2"), "stroke-width": 1.5 }, colGroup);
            el("line", { x1: cx - 6, x2: cx + 6, y1: y(s.low[i]), y2: y(s.low[i]), stroke: css("--ink-2"), "stroke-width": 1.5 }, colGroup);
          }
          if (spec.valueLabels) {
            const lt = el("text", { x: x0 + w / 2, y: up ? y0 - 6 : y1 + 13, "text-anchor": "middle", class: "lbl" }, colGroup);
            lt.textContent = (spec.valueFormat ? spec.valueFormat(v) : fmtNum(v, spec.dec ?? 0));
          }
        });
      });
    }

    // Čáry
    const lineSeries = spec.series.filter((s) => s.kind === "line" || spec.type === "line");
    lineSeries.forEach((s) => {
      const col = colorOf(s.color);
      let dSolid = "", dProj = "";
      let started = false, startedP = false;
      s.values.forEach((v, i) => {
        if (v === null || v === undefined) { started = false; return; }
        const pt = `${x(i).toFixed(1)},${y(v).toFixed(1)}`;
        const inProj = s.projFrom !== undefined && i >= s.projFrom;
        if (!inProj || i === s.projFrom) { dSolid += (started ? "L" : "M") + pt; started = true; }
        if (inProj || (s.projFrom !== undefined && i === s.projFrom - 1)) { dProj += (startedP ? "L" : "M") + pt; startedP = true; }
      });
      if (s.area) {
        const firstI = s.values.findIndex(v => v != null);
        const lastI = s.values.length - 1 - [...s.values].reverse().findIndex(v => v != null);
        el("path", { d: dSolid + `L${x(lastI)},${y(baseV)} L${x(firstI)},${y(baseV)} Z`, fill: col, opacity: .1 }, svg);
      }
      if (dSolid) el("path", { d: dSolid, fill: "none", stroke: col, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
      if (dProj) el("path", { d: dProj, fill: "none", stroke: col, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: .45 }, svg);
      // Koncový bod + popisek
      const lastI = s.values.length - 1 - [...s.values].reverse().findIndex(v => v != null);
      if (lastI >= 0 && lastI < s.values.length && s.values[lastI] != null) {
        el("circle", { cx: x(lastI), cy: y(s.values[lastI]), r: 4, fill: col, stroke: css("--surface"), "stroke-width": 2 }, svg);
        if (spec.endLabels && !narrow) {
          const et = el("text", { x: x(lastI) + 8, y: y(s.values[lastI]) + 4, class: "lbl" }, svg);
          et.textContent = s.endLabel || s.name;
        }
      }
    });

    // Anotace
    (spec.annotations || []).forEach((a) => {
      const i = xs.indexOf(a.x);
      if (i < 0) return;
      if (narrow && a.hideNarrow) return;
      const ay = a.y !== undefined ? y(a.y) : m.t + 10;
      el("line", { x1: x(i), x2: x(i), y1: ay + 4, y2: a.toY !== undefined ? y(a.toY) - 4 : ay + 22, stroke: css("--muted"), "stroke-width": 1 }, svg);
      const anchor = x(i) > W * 0.7 ? "end" : (x(i) < W * 0.25 ? "start" : "middle");
      const at = el("text", { x: x(i), y: ay, "text-anchor": anchor, class: "lbl" }, svg);
      at.textContent = a.text;
    });

    // Interakce: kříž + tooltip
    const tip = document.createElement("div");
    tip.className = "chart-tip"; tip.hidden = true; tip.setAttribute("role", "status");
    box.appendChild(tip);
    const xh = el("line", { class: "xhair", y1: m.t, y2: m.t + ih, x1: m.l, x2: m.l, visibility: "hidden" }, svg);
    const hit = el("rect", { class: "hit", x: m.l, y: m.t, width: iw, height: ih }, svg);
    let cur = -1;
    const show = (i) => {
      if (i < 0 || i >= n) return;
      cur = i;
      xh.setAttribute("x1", x(i)); xh.setAttribute("x2", x(i)); xh.setAttribute("visibility", "visible");
      colGroup.querySelectorAll(".mark").forEach((p) => p.classList.toggle("hl", +p.dataset.i === i));
      tip.innerHTML = "";
      const head = document.createElement("div"); head.className = "t-head";
      head.textContent = spec.xFormat ? spec.xFormat(xs[i]) : String(xs[i]);
      if (spec.xNote && spec.xNote[i]) head.textContent += " · " + spec.xNote[i];
      tip.appendChild(head);
      spec.series.forEach((s) => {
        const v = s.values[i];
        if (v === null || v === undefined) return;
        const row = document.createElement("div"); row.className = "t-row";
        const key = document.createElement("span"); key.className = "t-key";
        key.style.borderColor = spec.diverging && s.kind !== "line" ? (v >= 0 ? css("--div-warm") : css("--div-cool")) : colorOf(s.color);
        const b = document.createElement("b");
        b.textContent = (spec.valueFormat ? spec.valueFormat(v) : fmtNum(v, spec.dec ?? 1)) + (spec.unit ? " " + spec.unit : "");
        const nm = document.createElement("span"); nm.textContent = s.name + ((s.projFrom !== undefined && i >= s.projFrom) ? " (projekce)" : "");
        nm.style.color = css("--ink-2");
        row.append(key, b, nm);
        if (s.low && s.high && s.low[i] != null) {
          const rg = document.createElement("span"); rg.style.color = css("--muted");
          rg.textContent = ` (${fmtNum(s.low[i], spec.dec ?? 0)}–${fmtNum(s.high[i], spec.dec ?? 0)})`;
          row.appendChild(rg);
        }
        tip.appendChild(row);
      });
      if (spec.stacked) {
        let sum = 0; spec.series.forEach(s => { if (s.kind !== "line" && s.values[i] != null) sum += s.values[i]; });
        const row = document.createElement("div"); row.className = "t-row"; row.style.marginTop = "4px";
        row.textContent = "Celkem: " + (spec.valueFormat ? spec.valueFormat(sum) : fmtNum(sum, spec.dec ?? 1)) + (spec.unit ? " " + spec.unit : "");
        tip.appendChild(row);
      }
      tip.hidden = false;
      const bw = box.clientWidth;
      const tw = tip.offsetWidth;
      let left = x(i) * (bw / W) + 12;
      if (left + tw > bw) left = x(i) * (bw / W) - tw - 12;
      tip.style.left = Math.max(0, left) + "px";
      tip.style.top = (m.t + 4) + "px";
    };
    const hide = () => { tip.hidden = true; xh.setAttribute("visibility", "hidden"); cur = -1; colGroup.querySelectorAll(".hl").forEach(p => p.classList.remove("hl")); };
    const idxFromEvent = (ev) => {
      const r = svg.getBoundingClientRect();
      const px = (ev.clientX - r.left) * (W / r.width);
      if (isCols) return Math.max(0, Math.min(n - 1, Math.floor((px - m.l) / band)));
      if (numX) { let best = 0, bd = Infinity; for (let i = 0; i < n; i++) { const d = Math.abs(x(i) - px); if (d < bd) { bd = d; best = i; } } return best; }
      return Math.max(0, Math.min(n - 1, Math.round(((px - m.l) / iw) * (n - 1))));
    };
    svg.addEventListener("pointermove", (ev) => show(idxFromEvent(ev)));
    svg.addEventListener("pointerleave", hide);
    svg.addEventListener("focus", () => show(cur >= 0 ? cur : n - 1));
    svg.addEventListener("blur", hide);
    svg.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowRight") { show(Math.min(n - 1, cur + 1)); ev.preventDefault(); }
      if (ev.key === "ArrowLeft") { show(Math.max(0, cur - 1)); ev.preventDefault(); }
      if (ev.key === "Escape") hide();
    });

    // Legenda (jen pro ≥ 2 řady)
    if (legendBox) {
      legendBox.innerHTML = "";
      const items = spec.legend || (spec.series.length > 1 ? spec.series.map((s) => ({ name: s.name, color: s.color, line: s.kind === "line" || spec.type === "line" })) : []);
      items.forEach((it) => {
        const k = document.createElement("span"); k.className = "key";
        const sw = document.createElement("span");
        sw.className = it.line ? "ln" : "sw";
        if (it.line) sw.style.borderColor = colorOf(it.color); else sw.style.background = colorOf(it.color);
        const tx = document.createElement("span"); tx.textContent = it.name;
        k.append(sw, tx); legendBox.appendChild(k);
      });
      legendBox.hidden = items.length === 0;
    }
  }

  function tableFor(spec) {
    const wrap = document.createElement("div"); wrap.className = "chart-table table-wrap";
    const tb = document.createElement("table");
    const thead = tb.createTHead().insertRow();
    const th0 = document.createElement("th"); th0.textContent = spec.xName || "Rok"; thead.appendChild(th0);
    spec.series.forEach((s) => { const th = document.createElement("th"); th.className = "num"; th.textContent = s.name + (spec.unit ? ` (${spec.unit})` : ""); thead.appendChild(th); });
    const body = tb.createTBody();
    spec.x.forEach((xv, i) => {
      const r = body.insertRow();
      const c0 = r.insertCell(); c0.textContent = spec.xFormat ? spec.xFormat(xv) : xv;
      spec.series.forEach((s) => {
        const c = r.insertCell(); c.className = "num";
        const v = s.values[i];
        c.textContent = (v === null || v === undefined) ? "–" : (spec.valueFormat ? spec.valueFormat(v) : fmtNum(v, spec.dec ?? 1));
        if (s.low && s.high && s.low[i] != null) c.textContent += ` (${fmtNum(s.low[i], spec.dec ?? 0)}–${fmtNum(s.high[i], spec.dec ?? 0)})`;
      });
    });
    wrap.appendChild(tb);
    return wrap;
  }

  /** Vytvoří kartu grafu podle id ze souboru data-grafy.js */
  function mount(target, id) {
    const spec = (window.VIZE_GRAFY || {})[id];
    if (!spec) return;
    const card = document.createElement("figure");
    card.className = "chart-card";
    card.style.margin = "0";
    card.innerHTML = `<div><h4></h4><p class="sub"></p></div><div class="chart-legend"></div><div class="chart-box"></div><figcaption class="chart-foot"><span class="src"></span><button type="button" aria-expanded="false">Zobrazit tabulku</button></figcaption>`;
    card.querySelector("h4").textContent = spec.title;
    card.querySelector(".sub").textContent = spec.subtitle || "";
    const src = card.querySelector(".src");
    src.textContent = "Zdroj: ";
    (spec.sources || []).forEach((s, k) => {
      if (k) src.appendChild(document.createTextNode("; "));
      if (s.url) { const a = document.createElement("a"); a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = s.name; src.appendChild(a); }
      else src.appendChild(document.createTextNode(s.name));
    });
    const btn = card.querySelector("button");
    let tableEl = null;
    btn.addEventListener("click", () => {
      if (!tableEl) { tableEl = tableFor(spec); card.appendChild(tableEl); tableEl.hidden = true; }
      tableEl.hidden = !tableEl.hidden;
      btn.textContent = tableEl.hidden ? "Zobrazit tabulku" : "Skrýt tabulku";
      btn.setAttribute("aria-expanded", String(!tableEl.hidden));
    });
    target.appendChild(card);
    const draw = () => render(card, spec);
    requestAnimationFrame(draw);
    if ("ResizeObserver" in window) {
      let last = 0;
      new ResizeObserver(() => { const w = card.clientWidth; if (Math.abs(w - last) > 8) { last = w; draw(); } }).observe(card);
    }
    card._redraw = draw;
  }

  function redrawAll() { document.querySelectorAll(".chart-card").forEach((c) => c._redraw && c._redraw()); }

  window.VizeGrafy = { mount, redrawAll };
})();
