/* ==========================================================================
   VIZE 2075 — aplikační logika (navigace, čtecí panel, vyhledávání, grafy)
   ========================================================================== */
(function () {
  "use strict";
  const V = window.VIZE;
  const D = window.VizeDiagramy;
  const G = window.VizeGrafy;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const strip = (html) => String(html).replace(/\{\{ref:[^}]+\}\}/g, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* bez úložiště */ } }
  };

  const CATS = {
    prostredi: "Prostředí a krajina",
    technika: "Infrastruktura a technologie",
    spolecnost: "Společnost a člověk",
    rizika: "Rizika a svět"
  };
  const SC = { a: "Resilientní město", b: "Město adaptace", c: "Fragmentované město" };

  // Oblasti seřadit podle čísla
  V.oblasti.sort((a, b) => a.num - b.num);

  /* ---------- Citace ---------- */
  const REF = {};
  V.zdroje.forEach((r, i) => { REF[r.key] = Object.assign({ n: i + 1 }, r); });
  function cite(html, mode, collect) {
    return String(html).replace(/\{\{ref:([a-z0-9\-]+)\}\}/gi, (m, key) => {
      const r = REF[key];
      if (!r) { console.warn("Chybí zdroj:", key); return ""; }
      if (collect) collect.add(key);
      const href = mode === "reader" ? `#r-ref-${key}` : `#zdroj-${key}`;
      return `<sup class="cite"><a href="${href}" data-ref="${key}" title="${esc(r.title)}">[${r.n}]</a></sup>`;
    });
  }
  function refItem(key, idPrefix) {
    const r = REF[key];
    if (!r) return "";
    return `<li id="${idPrefix}${key}" value="${r.n}"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a> <span class="meta">– ${esc(r.meta)}</span></li>`;
  }

  /* ---------- Pomocné prvky ---------- */
  const icon = (k, cls = "ico") => `<span class="${cls}" aria-hidden="true">${D.ICONS[k] || D.ICONS.spark}</span>`;
  function chartSlot(id) { return `<div class="chart-slot" data-chart="${id}"></div>`; }
  function mountCharts(root) {
    $$(".chart-slot[data-chart]:not([data-done])", root).forEach((el) => {
      el.setAttribute("data-done", "1");
      G.mount(el, el.dataset.chart);
    });
  }
  function diagramBlock(kind) {
    if (kind === "cesta-kapky") {
      return `<div class="panel diagram" data-diagram="kapka">
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;margin-bottom:10px">
          <h4 style="font-size:1.05rem">Cesta dešťové kapky krajinou</h4>
          <div class="filter-row" role="group" aria-label="Přepnout stav krajiny">
            <button class="chip" type="button" data-state="dnes" aria-pressed="true">Dnešní krajina</button>
            <button class="chip" type="button" data-state="obnovena" aria-pressed="false">Obnovená krajina</button>
          </div>
        </div>
        <div class="diagram-svg" style="overflow-x:auto">${D.cestaKapky("dnes")}</div>
      </div>`;
    }
    if (kind === "blackout") return `<div class="panel"><h4 style="font-size:1.05rem;margin-bottom:6px">Co se děje při rozsáhlém výpadku elektřiny</h4>${D.blackout()}</div>`;
    if (kind === "panelak") return `<div class="panel"><h4 style="font-size:1.05rem;margin-bottom:6px">Panelový dům jako komunita: postup při krizi</h4>${D.panelak()}</div>`;
    return "";
  }
  function wireDiagrams(root) {
    $$('[data-diagram="kapka"]', root).forEach((box) => {
      $$("button[data-state]", box).forEach((b) => b.addEventListener("click", () => {
        $$("button[data-state]", box).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        $(".diagram-svg", box).innerHTML = D.cestaKapky(b.dataset.state);
      }));
    });
  }
  function scLine(v) {
    return `<div class="table-wrap"><table><thead><tr><th>Scénář</th><th>Jak by oblast vypadala v roce 2075</th></tr></thead><tbody>
      <tr><td style="white-space:nowrap"><span class="sc-dot a"></span>${SC.a}</td><td>${esc(v.a)}</td></tr>
      <tr><td style="white-space:nowrap"><span class="sc-dot b"></span>${SC.b}</td><td>${esc(v.b)}</td></tr>
      <tr><td style="white-space:nowrap"><span class="sc-dot c"></span>${SC.c}</td><td>${esc(v.c)}</td></tr>
    </tbody></table></div>`;
  }

  /* ---------- Pohled: Přehled ---------- */
  function renderPrehled() {
    const el = $("#view-prehled");
    const stats = V.ukazatele.map((u) => `
      <div class="stat${u.warn ? " warn" : ""}">
        <span class="tag">${esc(u.tag)}</span>
        <span class="value">${esc(u.value)}${u.unit ? `<small>${esc(u.unit)}</small>` : ""}</span>
        <span class="label">${esc(u.label)}</span>
        <span class="note">${esc(u.note)}${cite(`{{ref:${u.ref}}}`, "page")}</span>
      </div>`).join("");
    const catCards = Object.keys(CATS).map((c) => {
      const items = V.oblasti.filter((o) => o.cat === c);
      return `<div class="panel" style="display:grid;gap:10px;align-content:start">
        <h4 style="font-size:1.05rem">${CATS[c]}</h4>
        <ul class="factlist">${items.map((o) => `<li><a href="#oblast-${o.id}">${o.num}. ${esc(o.title.split(":")[0])}</a></li>`).join("")}</ul>
      </div>`;
    }).join("");
    el.innerHTML = `
      <div class="wrap">
        <div class="hero">
          <div>
            <p class="eyebrow">Strategický výhled · aktualizace ${esc(V.aktualizace)}</p>
            <h1 id="h-prehled">Hradec Králové <span class="yr">2075</span></h1>
            <p class="lede">Jak se bude žít ve městě na soutoku Labe a Orlice za padesát let? Web propojuje klimatická, demografická a energetická data s poznatky o lidském rozhodování a skládá z nich tři scénáře budoucnosti a praktická doporučení. Aktualizace reaguje na sucho, rekordní vedra a geopolitické otřesy roku 2026.</p>
            <div class="hero-actions">
              <a class="btn primary" href="#rok-2026">Co změnil rok 2026 ${D.ICONS.arrow.replace("<svg", '<svg width="18" height="18"')}</a>
              <a class="btn" href="#oblasti">21 tematických oblastí</a>
              <a class="btn" href="#pripravenost">Jak se připravit</a>
            </div>
          </div>
          <figure class="hero-figure" style="margin:0">${D.heroSvg()}<figcaption>Schéma soutoku Labe a Orlice. Údaje: ČHMÚ (léto 2026), projekce OAZK 2025.</figcaption></figure>
        </div>

        <section class="section" aria-labelledby="h-stav">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:10px">
            <h3 id="h-stav">Stav světa a Česka na podzim 2026</h3>
            <a href="#grafy">Všechny grafy a data →</a>
          </div>
          <div class="stat-grid">${stats}</div>
        </section>

        <section class="section" aria-labelledby="h-sucho">
          <div class="two-col" style="align-items:start">
            <div class="panel" style="display:grid;gap:14px">
              <p class="eyebrow">Sledujte sucho v reálném čase</p>
              <h3 id="h-sucho" style="font-size:var(--step-3)">InterSucho: kolik vody chybí v půdě</h3>
              <p class="section-intro">Rok 2026 přinesl nejsušší jaro od začátku měření a v srpnu mělo asi 70 % území Česka nasycení půdy pod 10 %. Denně aktualizované mapy půdní vláhy, intenzity sucha a desetidenní výhled publikuje CzechGlobe s Mendelovou univerzitou.${cite("{{ref:intersucho-akt}}", "page")}</p>
              <div><a class="btn primary" href="https://www.intersucho.cz/cs/" target="_blank" rel="noopener">Otevřít InterSucho ${D.ICONS.ext.replace("<svg", '<svg width="16" height="16"')}</a></div>
            </div>
            ${chartSlot("cr-2026-srazky")}
          </div>
        </section>

        <section class="section" aria-labelledby="h-obl">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:10px">
            <h3 id="h-obl">Dvacet jedna oblastí budoucnosti</h3>
            <a href="#oblasti">Zobrazit karty oblastí →</a>
          </div>
          <p class="section-intro">Každá oblast obsahuje shrnutí, klíčová fakta roku 2026, odborný rozbor, grafy, výhled ve třech scénářích a doporučení. Nově přibyly oblasti <a href="#oblast-krajina">Krajina a zadržování vody</a>, <a href="#oblast-demografie">Demografie</a> a <a href="#oblast-geopolitika">Geopolitika a bezpečnost</a>.</p>
          <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))">${catCards}</div>
        </section>

        <section class="section" aria-labelledby="h-scen">
          <h3 id="h-scen">Tři scénáře pro rok 2075</h3>
          <div class="panel diagram">${D.kuzel()}</div>
          <div class="three-col">${V.scenare.map((s) => `
            <a class="card scenario-card ${s.key}" href="#scenare" style="text-decoration:none">
              <div class="card-top"><span class="num">${esc(s.label)}</span></div>
              <h4>${esc(s.title)}</h4>
              <p>${esc(s.shrnuti)}</p>
              <span class="more">Číst scénář →</span>
            </a>`).join("")}</div>
        </section>

        <section class="section" aria-labelledby="h-ramec">
          <h3 id="h-ramec">Interpretační rámec</h3>
          <div class="three-col">${["koukolik", "cilek", "rees"].map((k) => `
            <a class="card" href="#teorie-${k}" style="text-decoration:none">
              <div class="card-top"><span class="num">${esc(V.teorie[k].author)}</span></div>
              <h4>${esc(V.teorie[k].title)}</h4>
              <p>${esc(V.teorie[k].shrnuti)}</p>
              <span class="more">Číst →</span>
            </a>`).join("")}</div>
        </section>
      </div>`;
  }

  /* ---------- Pohled: Rok 2026 ---------- */
  function renderRok() {
    const el = $("#view-rok-2026");
    const toc = V.rok2026.bloky.map((b) => `<a class="chip" href="#rok-2026" data-jump="rk-${b.id}">${esc(b.title.split(":")[0])}</a>`).join("");
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Aktualizace ${esc(V.aktualizace)}</p>
        <h2>Rok 2026: zatěžkávací zkouška</h2>
        <p class="lede">${esc(V.rok2026.uvod)}</p>
        <div class="filter-row">${toc}</div>
      </div>
      ${V.rok2026.bloky.map((b) => `
        <section class="section" id="rk-${b.id}">
          <h3>${esc(b.title)}</h3>
          <div class="${b.graf ? "two-col" : ""}" style="align-items:start">
            <div class="prose">${cite(b.text, "page")}</div>
            ${b.graf ? `<div style="display:grid;gap:16px">${b.graf.map(chartSlot).join("")}</div>` : ""}
          </div>
        </section>`).join("")}
      <section class="section">
        <div class="callout dry"><strong>Co si z roku 2026 odnést:</strong> sucho, horko, energetický šok a konflikty nepřicházejí odděleně. Odolnost proto nevzniká v jediném sektoru, ale v propojení vody, krajiny, energie a lidí. Konkrétní kroky najdete v sekci <a href="#pripravenost">Připravenost</a>, souvislosti v oblastech <a href="#oblast-krajina">Krajina a zadržování vody</a>, <a href="#oblast-voda">Voda</a> a <a href="#oblast-geopolitika">Geopolitika</a>.</div>
      </section>
    </div>`;
    $$("[data-jump]", el).forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const t = document.getElementById(a.dataset.jump); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }));
  }

  /* ---------- Pohled: Oblasti ---------- */
  let catFilter = "vse";
  function renderOblasti() {
    const el = $("#view-oblasti");
    const chips = [["vse", "Všechny"]].concat(Object.entries(CATS)).map(([k, l]) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${k === catFilter}">${l}</button>`).join("");
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Analýza</p>
        <h2>21 tematických oblastí</h2>
        <p class="lede">Kliknutím na kartu otevřete úplný rozbor: fakta roku 2026, odborný text, grafy, výhled do roku 2075 ve třech scénářích a odkazy na zdroje.</p>
        <div class="filter-row" role="group" aria-label="Filtrovat podle kategorie">${chips}</div>
      </div>
      <div class="card-grid" id="topic-grid"></div>
    </div>`;
    const draw = () => {
      $("#topic-grid").innerHTML = V.oblasti.filter((o) => catFilter === "vse" || o.cat === catFilter).map((o) => `
        <button class="card${o.novy ? " new" : ""}" type="button" data-topic="${o.id}">
          <div class="card-top">${icon(o.icon)}<span class="cat">${CATS[o.cat]}</span></div>
          <h4><span class="num">${o.num}.</span> ${esc(o.title)}</h4>
          <p>${esc(o.shrnuti)}</p>
          <span class="more">Číst rozbor ${D.ICONS.arrow.replace("<svg", '<svg width="16" height="16"')}</span>
        </button>`).join("");
      $$("[data-topic]", el).forEach((b) => b.addEventListener("click", () => { location.hash = "oblast-" + b.dataset.topic; }));
    };
    $$("[data-cat]", el).forEach((b) => b.addEventListener("click", () => {
      catFilter = b.dataset.cat;
      $$("[data-cat]", el).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      draw();
    }));
    draw();
  }

  /* ---------- Pohled: Grafy ---------- */
  function renderGrafy() {
    const el = $("#view-grafy");
    const groups = [
      ["Klima a voda", ["teplota-cr-svet", "co2", "cr-2026-teplota", "cr-2026-srazky", "tropicke-dny"]],
      ["Energie a suroviny", ["elektrina-cr", "ropa-svet"]],
      ["Obyvatelstvo", ["obyvatele-cr", "seniori-cr", "plodnost-cr"]],
      ["Bezpečnost", ["konflikty-pocet", "konflikty-obeti"]]
    ];
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Data</p>
        <h2>Grafy vývoje</h2>
        <p class="lede">Interaktivní grafy z veřejných datových řad. Najeďte myší nebo prstem na graf pro přesné hodnoty, klávesami šipek se lze pohybovat po letech. Pod každým grafem je tlačítko pro zobrazení tabulky a odkaz na zdroj dat.</p>
      </div>
      ${groups.map(([t, ids]) => `<section class="section"><h3>${t}</h3><div class="chart-grid">${ids.map(chartSlot).join("")}</div></section>`).join("")}
      <section class="section"><h3>Krajina a voda: vysvětlující diagram</h3>${diagramBlock("cesta-kapky")}</section>
    </div>`;
    wireDiagrams(el);
  }

  /* ---------- Pohled: Připravenost ---------- */
  function renderPripravenost() {
    const el = $("#view-pripravenost");
    const saved = JSON.parse(store.get("vize-72h") || "{}");
    let k = 0;
    const list = V.checklist72.map((g) => `
      <div style="display:grid;gap:4px"><h4 style="font-size:.98rem;margin-top:6px">${esc(g.skupina)}</h4>
      <ul class="checklist">${g.polozky.map((p) => { const id = "c72-" + (k++); return `<li><label for="${id}"><input type="checkbox" id="${id}" ${saved[id] ? "checked" : ""}><span>${esc(p)}</span></label></li>`; }).join("")}</ul></div>`).join("");
    const total = k;
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Doporučení pro jednotlivce a domácnosti</p>
        <h2>Připravenost a odolnost</h2>
        <p class="lede">${esc(V.doporuceniUvod)}</p>
      </div>
      <section class="section">
        <div class="two-col" style="align-items:start">
          <div class="panel" style="display:grid;gap:12px">
            <h3 style="font-size:1.3rem">Kontrolní seznam 72 hodin</h3>
            <p class="section-intro" style="font-size:.95rem">Podle oficiální příručky Ministerstva vnitra a HZS ČR.${cite("{{ref:72h}}", "page")} Zaškrtnutí se ukládá jen ve vašem prohlížeči.</p>
            <div class="progress" aria-hidden="true"><i id="p72"></i></div>
            <span class="progress-label" id="p72-label"></span>
            ${list}
            <div><button class="btn" id="c72-reset" type="button">Vymazat zaškrtnutí</button></div>
          </div>
          <div style="display:grid;gap:16px">
            ${diagramBlock("blackout")}
            ${diagramBlock("panelak")}
          </div>
        </div>
      </section>
      <section class="section">
        <h3>Doporučení podle oblastí</h3>
        <div style="display:grid;gap:10px" id="rec-list">
          ${V.doporuceni.map((r) => `
          <details class="panel rec" id="${r.id}" style="padding:0">
            <summary style="list-style:none;cursor:pointer;padding:16px 18px;display:grid;grid-template-columns:36px 1fr auto;gap:12px;align-items:center">
              ${icon(r.icon)}
              <span style="display:grid;gap:4px"><strong style="font-family:var(--font-display);font-size:1.08rem">${esc(r.title)}</strong><span style="font-size:.92rem;color:var(--ink-2)">${esc(r.shrnuti)}</span></span>
              <span aria-hidden="true" style="color:var(--muted)">▾</span>
            </summary>
            <div class="prose" style="padding:0 18px 18px 66px">${cite(r.text, "page")}</div>
          </details>`).join("")}
        </div>
      </section>
    </div>`;
    const upd = () => {
      const boxes = $$(".checklist input", el);
      const done = boxes.filter((b) => b.checked).length;
      $("#p72").style.width = Math.round((done / total) * 100) + "%";
      $("#p72-label").textContent = `Připraveno ${done} z ${total} položek`;
      const o = {}; boxes.forEach((b) => { if (b.checked) o[b.id] = 1; });
      store.set("vize-72h", JSON.stringify(o));
    };
    $$(".checklist input", el).forEach((b) => b.addEventListener("change", upd));
    $("#c72-reset").addEventListener("click", () => { $$(".checklist input", el).forEach((b) => (b.checked = false)); upd(); });
    upd();
    $$(".rec .ico", el).forEach((i) => { i.style.width = "32px"; i.style.height = "32px"; i.style.color = "var(--labe)"; });
  }

  /* ---------- Pohled: Scénáře ---------- */
  function renderScenare() {
    const el = $("#view-scenare");
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Syntéza</p>
        <h2>Scénáře vývoje do roku 2075</h2>
        <p class="lede">Tři vnitřně konzistentní obrazy budoucnosti vymezují prostor možného vývoje. Nejsou to předpovědi; skutečnost bude pravděpodobně kombinací všech tří, s různou vahou v různých oblastech a čtvrtích města.</p>
      </div>
      <div class="panel diagram">${D.kuzel()}</div>
      ${V.scenare.map((s) => `
      <section class="section" id="sc-${s.key}">
        <div class="panel scenario-card ${s.key}" style="display:grid;gap:16px">
          <div><p class="eyebrow">${esc(s.label)}</p><h3 style="font-size:var(--step-3);margin-top:4px">Scénář ${s.key.toUpperCase()}: ${esc(s.title)}</h3><p style="color:var(--ink-2);margin-top:4px">${esc(s.motto)}</p></div>
          <div class="two-col" style="align-items:start">
            <div class="prose">${s.text}</div>
            <div class="callout${s.key === "c" ? " dry" : ""}" style="font-family:var(--font-text);font-size:1rem;line-height:1.6"><strong style="font-family:var(--font-ui)">Jeden den v roce 2075</strong><br>${esc(s.den)}</div>
          </div>
        </div>
      </section>`).join("")}
      <section class="section">
        <h3>Srovnávací tabulka</h3>
        <div class="table-wrap"><table><thead><tr><th>Oblast</th><th><span class="sc-dot a"></span>${SC.a}</th><th><span class="sc-dot b"></span>${SC.b}</th><th><span class="sc-dot c"></span>${SC.c}</th></tr></thead>
        <tbody>${V.scenareTabulka.map((r) => `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody></table></div>
      </section>
      <section class="section">
        <h3>Signposty: podle čeho poznáme, kam směřujeme</h3>
        <p class="section-intro">Tyto ukazatele lze sledovat každý rok. Pokud se vyvíjejí jako ve sloupci „směr A“, blížíme se resilientnímu městu; pokud jako „směr C“, roste riziko fragmentace.</p>
        <div class="table-wrap"><table><thead><tr><th>Ukazatel</th><th>Kde sledovat</th><th><span class="sc-dot a"></span>Směr A</th><th><span class="sc-dot c"></span>Směr C</th></tr></thead>
        <tbody>${V.signposty.map((s) => `<tr><td><strong>${esc(s.ukazatel)}</strong></td><td>${esc(s.kde)}</td><td>${esc(s.a)}</td><td>${esc(s.c)}</td></tr>`).join("")}</tbody></table></div>
      </section>
    </div>`;
  }

  /* ---------- Pohled: Rámec ---------- */
  function renderRamec() {
    const el = $("#view-ramec");
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Úvod a metodika</p>
        <h2>Teoretický a metodologický rámec</h2>
      </div>
      <section class="section"><div class="prose">${cite(V.intro, "page")}</div></section>
      <section class="section"><div class="prose">${cite(V.metodika, "page")}</div></section>
      <section class="section">
        <h3>Tři autoři, tři optiky</h3>
        <div class="three-col">${["koukolik", "cilek", "rees"].map((k) => `
          <button class="card" type="button" data-theory="${k}">
            <div class="card-top"><span class="num">${esc(V.teorie[k].author)}</span></div>
            <h4>${esc(V.teorie[k].title)}</h4>
            <p>${esc(V.teorie[k].shrnuti)}</p>
            <span class="more">Číst celý text →</span>
          </button>`).join("")}</div>
      </section>
    </div>`;
    $$("[data-theory]", el).forEach((b) => b.addEventListener("click", () => { location.hash = "teorie-" + b.dataset.theory; }));
  }

  /* ---------- Pohled: Slovník ---------- */
  function renderSlovnik() {
    const el = $("#view-slovnik");
    const items = V.slovnik.slice().sort((a, b) => a.t.localeCompare(b.t, "cs"));
    const letters = "AÁBCČDĎEÉFGHIJKLMNOPQRŘSŠTŤUÚVWXYZŽ0123456789".split("");
    const firstL = (t) => t.trim()[0].toUpperCase();
    const present = new Set(items.map((i) => firstL(i.t)));
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">${items.length} pojmů</p>
        <h2>Výkladový slovník</h2>
        <div class="dict-tools">
          <label class="visually-hidden" for="dict-q">Filtrovat pojmy</label>
          <input id="dict-q" type="search" placeholder="Filtrovat pojmy…">
          <label style="display:inline-flex;gap:6px;align-items:center;font-size:.9rem"><input type="checkbox" id="dict-new"> jen nové pojmy 2026</label>
        </div>
        <div class="alpha" aria-label="Abecední rejstřík">${letters.filter((l) => /[A-ZÁČĎÉŘŠŤÚŽ]/.test(l)).map((l) => `<button type="button" data-l="${l}" ${present.has(l) ? "" : "disabled"}>${l}</button>`).join("")}</div>
      </div>
      <dl class="dict" id="dict"></dl>
    </div>`;
    const draw = () => {
      const q = $("#dict-q").value.toLowerCase().trim();
      const onlyNew = $("#dict-new").checked;
      $("#dict").innerHTML = items.filter((i) => (!q || (i.t + " " + i.d).toLowerCase().includes(q)) && (!onlyNew || i.n))
        .map((i) => `<div class="dict-item" id="pojem-${slug(i.t)}" data-l="${firstL(i.t)}"><dt>${esc(i.t)}${i.n ? ' <span class="status fix" style="margin-left:6px">nové</span>' : ""}</dt><dd>${esc(i.d)}</dd></div>`).join("") || `<p class="search-empty">Žádný pojem neodpovídá filtru.</p>`;
    };
    $("#dict-q").addEventListener("input", draw);
    $("#dict-new").addEventListener("change", draw);
    $$(".alpha button", el).forEach((b) => b.addEventListener("click", () => {
      $("#dict-q").value = ""; $("#dict-new").checked = false; draw();
      const t = $(`.dict-item[data-l="${b.dataset.l}"]`, el); if (t) t.scrollIntoView({ behavior: "smooth", block: "center" });
    }));
    draw();
  }
  const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  /* ---------- Pohled: Zdroje ---------- */
  function renderZdroje() {
    const el = $("#view-zdroje");
    const stat = { ok: "ověřeno", fix: "opraveno", kniha: "kniha" };
    const cls = { ok: "ok", fix: "fix", kniha: "book" };
    const nOk = V.zdroje.filter((r) => r.stav === "ok").length;
    const nFix = V.zdroje.filter((r) => r.stav === "fix").length;
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Literatura a odkazy</p>
        <h2>Zdroje a odborné weby</h2>
        <p class="lede">Všechny webové odkazy byly ověřeny ${esc(V.overeno)}: ${nOk} funkčních, ${nFix} opravených nebo nahrazených. Čísla odpovídají odkazům v textech.</p>
      </div>
      <section class="section">
        <h3>Kde sledovat vývoj</h3>
        <p class="section-intro">Odborné weby s průběžně aktualizovanými daty, na jejichž základě lze vývoj do roku 2075 sledovat a extrapolovat.</p>
        <div class="link-grid">${V.odkazy.map((o) => `<a class="link-card${o.feature ? " feature" : ""}" href="${esc(o.url)}" target="_blank" rel="noopener"><strong>${esc(o.name)}</strong><span>${esc(o.popis)}</span><em>${esc(o.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</em></a>`).join("")}</div>
      </section>
      ${V.zdrojeSkupiny.map(([g, name]) => {
        const rs = V.zdroje.filter((r) => r.cat === g);
        if (!rs.length) return "";
        return `<section class="section ref-group"><h4>${esc(name)}</h4><ol class="refs">${rs.map((r) => `
          <li id="zdroj-${r.key}"><span class="rid">[${REF[r.key].n}]</span>
          <span><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a><span class="rmeta">${esc(r.meta)}${r.pozn ? " · " + esc(r.pozn) : ""}</span></span>
          <span class="status ${cls[r.stav] || "ok"}">${stat[r.stav] || r.stav}</span></li>`).join("")}</ol></section>`;
      }).join("")}
    </div>`;
  }

  /* ---------- Pohled: Dokumenty ---------- */
  function renderDokumenty() {
    const el = $("#view-dokumenty");
    el.innerHTML = `<div class="wrap">
      <div class="view-head">
        <p class="eyebrow">Ke stažení</p>
        <h2>Dokumenty a audio</h2>
        <p class="lede">Podkladové studie, příručky krizové připravenosti a komentovaná audio shrnutí ve formátu PDF a MP3.</p>
      </div>
      <section class="section"><h3>Studie a příručky (PDF)</h3>
        <div class="dl-grid">${V.dokumenty.map((d) => `
          <div class="dl"><span class="kind">${esc(d.kind)}${d.novy ? " · nové" : ""}</span><h4>${esc(d.title)}</h4><p>${esc(d.popis)}</p>
          <div class="actions"><a href="${encodeURI(d.file)}" target="_blank" rel="noopener">Číst</a><a href="${encodeURI(d.file)}" download>Stáhnout</a></div></div>`).join("")}
        </div></section>
      <section class="section"><h3>Audio shrnutí (MP3)</h3>
        <div class="dl-grid">${V.audio.map((a) => `
          <div class="dl"><span class="kind">Audio${a.novy ? " · nové" : ""}</span><h4>${esc(a.title)}</h4><p>${esc(a.popis)}</p>
          <audio controls preload="none" src="${encodeURI(a.file)}"></audio>
          <div class="actions"><a href="${encodeURI(a.file)}" download>Stáhnout MP3</a></div></div>`).join("")}
        </div></section>
    </div>`;
  }

  /* ---------- Čtecí panel ---------- */
  const reader = $("#reader"), backdrop = $("#reader-backdrop");
  let readerCtx = null, lastFocus = null;
  function openReader(kind, id) {
    lastFocus = document.activeElement;
    const body = $("#reader-body");
    const refs = new Set();
    let eyebrow = "", title = "", html = "";
    if (kind === "oblast") {
      const o = V.oblasti.find((x) => x.id === id);
      if (!o) return false;
      eyebrow = `Oblast ${o.num} z ${V.oblasti.length} · ${CATS[o.cat]}`;
      title = o.title;
      const fakta = o.fakta.map((f) => `<li><span>${cite(f, "reader", refs)}</span></li>`).join("");
      const text = cite(o.text, "reader", refs);
      html = `
        <p class="summary">${esc(o.shrnuti)}</p>
        <div class="callout${["klima", "voda", "krajina", "zemedelstvi"].includes(o.id) ? " dry" : ""}"><strong>Stav 2026 v číslech</strong><ul class="factlist${["klima", "voda", "krajina", "zemedelstvi"].includes(o.id) ? " dry" : ""}" style="margin-top:10px">${fakta}</ul></div>
        <div class="prose">${text}</div>
        ${o.diagram ? diagramBlock(o.diagram) : ""}
        ${(o.grafy || []).length ? `<div style="display:grid;gap:16px">${o.grafy.map(chartSlot).join("")}</div>` : ""}
        <div style="display:grid;gap:10px"><h3 class="block-title">Výhled do roku 2075 ve třech scénářích</h3>${scLine(o.vyhled)}</div>
        ${(o.doporuceni || []).length ? `<div style="display:grid;gap:8px"><h3 class="block-title">Co může udělat jednotlivec</h3><div class="filter-row">${o.doporuceni.map((r) => { const rec = V.doporuceni.find((x) => x.id === r); return rec ? `<a class="chip" href="#rec-${r}">${esc(rec.title)}</a>` : ""; }).join("")}</div></div>` : ""}`;
      const i = V.oblasti.indexOf(o);
      readerCtx = { kind, list: V.oblasti.map((x) => x.id), i };
    } else if (kind === "teorie") {
      const t = V.teorie[id];
      if (!t) return false;
      eyebrow = "Interpretační rámec · " + t.author;
      title = t.title;
      html = `<p class="summary">${esc(t.shrnuti)}</p><div class="prose">${cite(t.text, "reader", refs)}</div>`;
      const list = ["koukolik", "cilek", "rees"];
      readerCtx = { kind, list, i: list.indexOf(id) };
    }
    const refHtml = refs.size ? `<div style="display:grid;gap:8px"><h3 class="block-title">Zdroje</h3><ol class="ref-list">${[...refs].sort((a, b) => REF[a].n - REF[b].n).map((k) => refItem(k, "r-ref-")).join("")}</ol></div>` : "";
    $("#reader-eyebrow").textContent = eyebrow;
    $("#reader-title").textContent = title;
    body.innerHTML = html + refHtml;
    body.scrollTop = 0;
    // Navigace předchozí / další
    const prev = $("#reader-prev"), next = $("#reader-next");
    const nameOf = (k) => readerCtx.kind === "oblast" ? V.oblasti.find((x) => x.id === k).title.split(":")[0] : V.teorie[k].author;
    const pi = readerCtx.i - 1, ni = readerCtx.i + 1;
    prev.hidden = pi < 0; next.hidden = ni >= readerCtx.list.length;
    if (!prev.hidden) { prev.querySelector("span").textContent = "← " + nameOf(readerCtx.list[pi]); prev.onclick = () => (location.hash = readerCtx.kind + "-" + readerCtx.list[pi]); }
    if (!next.hidden) { next.querySelector("span").textContent = nameOf(readerCtx.list[ni]) + " →"; next.onclick = () => (location.hash = readerCtx.kind + "-" + readerCtx.list[ni]); }
    reader.hidden = false; backdrop.hidden = false;
    document.body.classList.add("reader-open");
    requestAnimationFrame(() => { mountCharts(body); wireDiagrams(body); });
    $("#reader-close").focus({ preventScroll: true });
    return true;
  }
  function closeReader(updateHash = true) {
    if (reader.hidden) return;
    reader.hidden = true; backdrop.hidden = true;
    document.body.classList.remove("reader-open");
    if (updateHash && readerCtx) history.replaceState(null, "", readerCtx.kind === "oblast" ? "#oblasti" : "#ramec");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $("#reader-close").addEventListener("click", () => closeReader());
  backdrop.addEventListener("click", () => closeReader());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !reader.hidden) closeReader();
    if (e.key === "Tab" && !reader.hidden) {
      const f = $$('a[href], button:not([hidden]), input, [tabindex="0"], summary', reader).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { f[f.length - 1].focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { f[0].focus(); e.preventDefault(); }
    }
  });
  // Odkazy na citace uvnitř panelu
  $("#reader-body").addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#r-ref-']");
    if (a) { e.preventDefault(); const t = document.getElementById(a.getAttribute("href").slice(1)); if (t) { t.scrollIntoView({ behavior: "smooth", block: "center" }); t.style.background = "var(--labe-soft)"; setTimeout(() => (t.style.background = ""), 1600); } }
  });

  /* ---------- Směrování ---------- */
  const VIEWS = ["prehled", "rok-2026", "oblasti", "grafy", "pripravenost", "scenare", "ramec", "slovnik", "zdroje", "dokumenty"];
  function showView(name) {
    if (!VIEWS.includes(name)) name = "prehled";
    $$(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + name));
    $$(".main-nav a").forEach((a) => { if (a.dataset.view === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    const v = $("#view-" + name);
    requestAnimationFrame(() => { mountCharts(v); });
    const cur = $(`.main-nav a[data-view="${name}"]`); if (cur) cur.scrollIntoView({ block: "nearest", inline: "nearest" });
    return v;
  }
  function flash(el) { if (!el) return; el.classList.add("flash"); el.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => el.classList.remove("flash"), 2200); }
  function route() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (h.startsWith("oblast-")) { showView("oblasti"); if (!openReader("oblast", h.slice(7))) closeReader(false); return; }
    if (h.startsWith("teorie-")) { showView("ramec"); openReader("teorie", h.slice(7)); return; }
    closeReader(false);
    if (h.startsWith("zdroj-")) { showView("zdroje"); flash(document.getElementById(h)); return; }
    if (h.startsWith("pojem-")) { showView("slovnik"); flash(document.getElementById(h)); return; }
    if (h.startsWith("rec-")) {
      showView("pripravenost");
      const d = document.getElementById(h.slice(4)) || document.getElementById(h);
      if (d) { d.open = true; setTimeout(() => d.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }
      return;
    }
    const prev = $(".view.active");
    showView(h || "prehled");
    if (prev !== $(".view.active")) window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", route);

  /* ---------- Vyhledávání ---------- */
  const INDEX = [];
  V.oblasti.forEach((o) => INDEX.push({ type: "Oblast " + o.num, title: o.title, text: strip(o.shrnuti + " " + o.fakta.join(" ") + " " + o.text), go: "#oblast-" + o.id }));
  V.doporuceni.forEach((r) => INDEX.push({ type: "Doporučení", title: r.title, text: strip(r.shrnuti + " " + r.text), go: "#rec-" + r.id }));
  V.rok2026.bloky.forEach((b) => INDEX.push({ type: "Rok 2026", title: b.title, text: strip(b.text), go: "#rok-2026" }));
  V.scenare.forEach((s) => INDEX.push({ type: "Scénář", title: "Scénář " + s.key.toUpperCase() + ": " + s.title, text: strip(s.text + " " + s.den), go: "#scenare" }));
  Object.entries(V.teorie).forEach(([k, t]) => INDEX.push({ type: "Rámec", title: t.title + " (" + t.author + ")", text: strip(t.text), go: "#teorie-" + k }));
  V.slovnik.forEach((s) => INDEX.push({ type: "Slovník", title: s.t, text: s.d, go: "#pojem-" + slug(s.t) }));
  V.zdroje.forEach((r) => INDEX.push({ type: "Zdroj [" + REF[r.key].n + "]", title: r.title, text: r.meta, go: "#zdroj-" + r.key }));
  INDEX.push({ type: "Rámec", title: "Úvod a metodika", text: strip(V.intro + " " + V.metodika), go: "#ramec" });
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  INDEX.forEach((it) => { it.nt = norm(it.title); it.nx = norm(it.text); });

  const qEl = $("#q"), resEl = $("#search-results");
  let sTimer = null;
  qEl.addEventListener("input", () => { clearTimeout(sTimer); sTimer = setTimeout(doSearch, 120); });
  qEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { qEl.value = ""; resEl.hidden = true; }
    if (e.key === "ArrowDown") { const f = $("button", resEl); if (f) { f.focus(); e.preventDefault(); } }
  });
  resEl.addEventListener("keydown", (e) => {
    const bs = $$("button", resEl); const i = bs.indexOf(document.activeElement);
    if (e.key === "ArrowDown" && i < bs.length - 1) { bs[i + 1].focus(); e.preventDefault(); }
    if (e.key === "ArrowUp") { (i > 0 ? bs[i - 1] : qEl).focus(); e.preventDefault(); }
    if (e.key === "Escape") { resEl.hidden = true; qEl.focus(); }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) resEl.hidden = true; });
  function doSearch() {
    const raw = qEl.value.trim();
    const q = norm(raw);
    if (q.length < 2) { resEl.hidden = true; return; }
    const terms = q.split(/\s+/);
    const hits = [];
    INDEX.forEach((it) => {
      let score = 0;
      for (const t of terms) {
        const inT = it.nt.includes(t);
        const occ = it.nx.split(t).length - 1;
        if (!inT && !occ) { score = 0; break; }
        score += (inT ? 6 : 0) + Math.min(occ, 6);
      }
      if (score) {
        const w = /^Oblast|^Doporučení|^Rok 2026/.test(it.type) ? 1.4 : /^Zdroj/.test(it.type) ? 0.5 : 1;
        hits.push({ it, score: score * w });
      }
    });
    hits.sort((a, b) => b.score - a.score);
    resEl.innerHTML = "";
    if (!hits.length) { resEl.innerHTML = `<div class="search-empty">Nic nenalezeno pro „${esc(raw)}“.</div>`; resEl.hidden = false; return; }
    hits.slice(0, 12).forEach(({ it }) => {
      const b = document.createElement("button"); b.type = "button";
      const pos = it.nx.indexOf(terms[0]);
      let snip = pos >= 0 ? it.text.substr(Math.max(0, pos - 50), 150) : it.text.substr(0, 120);
      const ty = document.createElement("span"); ty.className = "r-type"; ty.textContent = it.type;
      const ti = document.createElement("span"); ti.className = "r-title"; ti.textContent = it.title;
      const sn = document.createElement("span"); sn.className = "r-snip";
      // zvýraznění bez innerHTML z dat
      const ns = norm(snip); let idx = ns.indexOf(terms[0]);
      if (idx >= 0) { sn.append(document.createTextNode("…" + snip.slice(0, idx))); const m = document.createElement("mark"); m.textContent = snip.substr(idx, terms[0].length); sn.append(m, document.createTextNode(snip.slice(idx + terms[0].length) + "…")); }
      else sn.textContent = snip + "…";
      b.append(ty, ti, sn);
      b.addEventListener("click", () => { resEl.hidden = true; qEl.blur(); if (location.hash === it.go) route(); else location.hash = it.go; });
      resEl.appendChild(b);
    });
    resEl.hidden = false;
  }

  /* ---------- Motiv, menu, nahoru, překlad, počítadlo ---------- */
  $("#theme-btn").addEventListener("click", () => {
    const root = document.documentElement;
    const cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); store.set("vize-theme", next);
    setTimeout(() => G.redrawAll(), 30);
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => G.redrawAll());
  const toTop = $("#to-top");
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600), { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  $("#translate-btn").addEventListener("click", () => {
    if (window.google && window.google.translate) return;
    window.initGoogleTranslate = function () {
      new google.translate.TranslateElement({ pageLanguage: "cs", includedLanguages: "cs,en,de,pl,fr,es,uk", layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, "google_translate_element");
      $("#translate-btn").hidden = true;
    };
    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate";
    document.body.appendChild(s);
  });

  $("#upd").textContent = V.aktualizace;
  $("#chk").textContent = V.overeno;
  fetch("https://api.counterapi.dev/v1/vize-2075-hk/visits/up").then((r) => r.json()).then((d) => { $("#visit-count").textContent = d.count; }).catch(() => { $("#visit-count").textContent = "–"; });

  /* ---------- Start ---------- */
  renderPrehled(); renderRok(); renderOblasti(); renderGrafy(); renderPripravenost();
  renderScenare(); renderRamec(); renderSlovnik(); renderZdroje(); renderDokumenty();
  // Citace na stránkách (mimo panel): přejít na zdroj
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#zdroj-']");
    if (a && location.hash === a.getAttribute("href")) { e.preventDefault(); route(); }
  });
  route();
})();
