/* ==========================================================================
   VIZE 2075 — ikony, úvodní ilustrace a vysvětlující diagramy (inline SVG)
   ========================================================================== */
(function () {
  "use strict";
  const S = (inner, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${inner}</svg>`;
  const ICONS = {
    sun: S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    drop: S('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>'),
    landscape: S('<path d="M2 18c3-4 5-6 8-6s4 2 6 2 3-1 6-3"/><path d="M2 21c3-1 6-1.5 10-1.5S19 20 22 21"/><path d="M7 9V5M5 7l2-2 2 2"/>'),
    leaf: S('<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/>'),
    wheat: S('<path d="M12 21V8"/><path d="M12 8c-2-1-3-3-3-5 2 0 3 2 3 5ZM12 8c2-1 3-3 3-5-2 0-3 2-3 5Z"/><path d="M12 13c-2-1-4-2-4-5 2 0 4 2 4 5ZM12 13c2-1 4-2 4-5-2 0-4 2-4 5Z"/><path d="M12 18c-2-1-4-2-4-5 2 0 4 2 4 5ZM12 18c2-1 4-2 4-5-2 0-4 2-4 5Z"/>'),
    bolt: S('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>'),
    barrel: S('<ellipse cx="12" cy="5" rx="6" ry="2"/><path d="M6 5v14c0 1.1 2.7 2 6 2s6-.9 6-2V5"/><path d="M6 10c0 1.1 2.7 2 6 2s6-.9 6-2M6 15c0 1.1 2.7 2 6 2s6-.9 6-2"/>'),
    train: S('<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2 0M8 17l-2 4M16 17l2 4"/><circle cx="9" cy="14" r=".8"/><circle cx="15" cy="14" r=".8"/>'),
    chip: S('<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
    city: S('<path d="M3 21V9l5-3v15M8 21V4h8v17M16 21v-9h5v9M2 21h20"/><path d="M11 8h2M11 12h2M11 16h2"/>'),
    heart: S('<path d="M20.8 6.6a5 5 0 0 0-8.8-2 5 5 0 0 0-8.8 2c-1 4.5 4.5 9 8.8 12.4 4.3-3.4 9.8-7.9 8.8-12.4Z"/><path d="M3 12h4l2-3 3 6 2-3h7"/>'),
    people: S('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3 0 5 2.2 5 5"/>'),
    network: S('<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M11 7.3 6.3 15.8M13 7.3l4.7 8.5M7.5 18h9"/>'),
    coins: S('<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M15 11.5c3.3 0 6 1.3 6 3v3c0 1.7-2.7 3-6 3-2 0-3.8-.5-4.9-1.2"/>'),
    book: S('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/><path d="M8 7h7"/>'),
    scale: S('<path d="M12 3v18M7 21h10M5 7h14"/><path d="M5 7 2 13a3 3 0 0 0 6 0L5 7ZM19 7l-3 6a3 3 0 0 0 6 0l-3-6Z"/>'),
    recycle: S('<path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.2L7 10"/><path d="M11 19h8.5a1.5 1.5 0 0 0 1.3-2.2L18.5 13"/><path d="m14.5 5-1.2-2.1a1.5 1.5 0 0 0-2.6 0L8 7.5"/><path d="m9 19 2 2-2 2M5 9.5 7 10l.5-2M18 9l.5 4-4 .5"/>'),
    globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    orbit: S('<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)"/><circle cx="20" cy="7.5" r="1.2"/>'),
    swan: S('<path d="M7 18c-2.5 0-4-1.5-4-3.5S5 11 8 11h6c-2-1-3-3-3-5a3 3 0 0 1 6 0c0 1-.5 2-.5 3 1.5 1 3.5 2.5 3.5 5 0 3-3 4-6 4H7Z"/><path d="M16 6.5 18.5 7"/>'),
    spark: S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/><circle cx="12" cy="12" r="2"/>'),
    clock: S('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'),
    jar: S('<path d="M8 3h8v3H8z"/><path d="M7 6h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M5 12h14"/>'),
    radio: S('<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8 17 3"/><circle cx="15.5" cy="14" r="3"/><path d="M6 12h4M6 15h4"/>'),
    bike: S('<circle cx="6" cy="16" r="4"/><circle cx="18" cy="16" r="4"/><path d="M6 16l4-8h5l3 8M10 8l2 8h-6M14 5h2"/>'),
    mind: S('<path d="M9 21v-3H7a2 2 0 0 1-2-2v-3l-2-1 2-3a7 7 0 0 1 14 1c0 2.5-1 4-3 5v6"/><path d="M12 8a2 2 0 0 1 2 2"/>'),
    shield: S('<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>'),
    tools: S('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z"/>'),
    bag: S('<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2M5 12h14M10 12v3h4v-3"/>'),
    arrow: S('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    ext: S('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>')
  };

  /* Úvodní ilustrace: soutok Labe a Orlice v topografickém stylu */
  function heroSvg() {
    let contours = "";
    for (let i = 0; i < 9; i++) {
      const o = i * 26;
      contours += `<path d="M-20 ${70 + o} C 90 ${40 + o}, 170 ${110 + o}, 260 ${80 + o} S 430 ${40 + o}, 540 ${90 + o}" fill="none" stroke="var(--line-strong)" stroke-width="1" opacity="${0.35 + (i % 3) * 0.15}"/>`;
    }
    return `
<svg viewBox="0 0 520 380" role="img" aria-labelledby="hero-svg-t">
  <title id="hero-svg-t">Schematická mapa soutoku Labe a Orlice v Hradci Králové s vrstevnicemi krajiny</title>
  <rect x="0" y="0" width="520" height="380" rx="14" fill="var(--surface)" stroke="var(--line)"/>
  <defs><clipPath id="hero-clip"><rect x="0" y="0" width="520" height="380" rx="14"/></clipPath></defs><g clip-path="url(#hero-clip)">${contours}</g>
  <!-- Labe od severu -->
  <path d="M120 -10 C 150 60, 210 90, 235 150 S 250 230, 290 270 S 360 330, 420 392" fill="none" stroke="var(--labe)" stroke-width="5" stroke-linecap="round"/>
  <!-- Orlice od východu -->
  <path d="M530 120 C 470 140, 420 130, 380 160 S 320 230, 292 268" fill="none" stroke="var(--labe)" stroke-width="3.5" stroke-linecap="round" opacity=".85"/>
  <!-- Historické jádro -->
  <circle cx="300" cy="245" r="22" fill="var(--loess-soft)" stroke="var(--loess-mark)" stroke-width="1.5"/>
  <circle cx="292" cy="268" r="5" fill="var(--surface)" stroke="var(--labe)" stroke-width="2.5"/>
  <text x="140" y="70" font-family="var(--font-mono)" font-size="12" fill="var(--labe-ink)">Labe</text>
  <text x="440" y="118" font-family="var(--font-mono)" font-size="12" fill="var(--labe-ink)">Orlice</text>
  <text x="330" y="236" font-family="var(--font-ui)" font-size="13" font-weight="600" fill="var(--ink)">Hradec Králové</text>
  <text x="330" y="253" font-family="var(--font-mono)" font-size="10.5" fill="var(--muted)">50°12′ s. š. · 15°50′ v. d. · 235 m n. m.</text>
  <text x="300" y="296" font-family="var(--font-mono)" font-size="10.5" fill="var(--muted)">soutok</text>
  <g font-family="var(--font-mono)" font-size="10.5" fill="var(--ink-2)">
    <rect x="22" y="300" width="214" height="58" rx="8" fill="var(--paper)" stroke="var(--line)"/>
    <text x="34" y="322">2026  léto 19,4 °C · srážky 78 %</text>
    <text x="34" y="342">2050  tropických dnů ≈ 22 (až 32) / rok</text>
  </g>
</svg>`;
  }

  /* Diagram: cesta dešťové kapky – dnešní vs. obnovená krajina */
  let uid = 0;
  function cestaKapky(state) {
    const restored = state === "obnovena";
    const u = "k" + (++uid);
    const zones = [
      { x: 20, name: "Střecha a dvůr", now: "okap do kanalizace", next: "sud, dešťová zahrada" },
      { x: 150, name: "Pole", now: "holá, zhutnělá půda", next: "humus, meziplodiny" },
      { x: 280, name: "Mez a remízek", now: "rozorané", next: "zpomalí a vsákne" },
      { x: 410, name: "Mokřad a tůň", now: "odvodněno", next: "zadrží a pročistí" },
      { x: 540, name: "Řeka a niva", now: "napřímený tok", next: "meandry, rozliv" }
    ];
    let g = "";
    zones.forEach((z, i) => {
      g += `<g>
        <rect x="${z.x}" y="150" width="120" height="70" rx="8" fill="${restored ? "var(--labe-soft)" : "var(--loess-soft)"}" stroke="var(--line)"/>
        <text x="${z.x + 60}" y="140" text-anchor="middle" font-size="12.5" font-weight="650" fill="var(--ink)">${z.name}</text>
        <text x="${z.x + 60}" y="178" text-anchor="middle" font-size="11" fill="var(--ink-2)">${restored ? z.next : z.now}</text>
        <path d="M${z.x + 60} 70 v28" stroke="var(--labe)" stroke-width="1.6" stroke-dasharray="0" marker-end="url(#${u}a)"/>
        <path d="M${z.x + 60} 196 v${restored ? 44 : 14}" stroke="var(--labe)" stroke-width="${restored ? 5 : 1.5}" marker-end="url(#${u}a)"/>
      </g>`;
      if (i < zones.length - 1) g += `<path d="M${z.x + 122} 185 h26" stroke="${restored ? "var(--labe)" : "var(--loess-mark)"}" stroke-width="${restored ? 1.5 : 5}" marker-end="url(#${u}b)"/>`;
    });
    return `
<svg viewBox="0 0 680 300" role="img" aria-label="Diagram: ${restored ? "obnovená krajina zadržuje vodu a vsakuje ji" : "dnešní krajina vodu rychle odvádí"}">
  <defs>
    <marker id="${u}a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--labe)"/></marker>
    <marker id="${u}b" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="${restored ? "var(--labe)" : "var(--loess-mark)"}"/></marker>
  </defs>
  <text x="20" y="40" font-size="12" fill="var(--muted)">déšť ↓</text>
  <path d="M20 60 H660" stroke="var(--line)" />
  ${g}
  <rect x="20" y="250" width="640" height="34" rx="6" fill="var(--surface-2)" stroke="var(--line)"/>
  <text x="340" y="272" text-anchor="middle" font-size="12" fill="var(--ink-2)">${restored ? "Podzemní voda se doplňuje · krajina chladne výparem · povodňová vlna je nižší" : "Podzemní voda se nedoplňuje · voda a ornice rychle odtékají · krajina se přehřívá"}</text>
  <g font-size="11" fill="var(--ink-2)">
    <text x="20" y="20"><tspan font-weight="650">Šířka šipky</tspan> = relativní množství vody: svisle dolů vsak, vodorovně povrchový odtok</text>
  </g>
</svg>`;
  }

  /* Diagram: kužel budoucností 2026–2075 */
  function kuzel() {
    return `
<svg viewBox="0 0 680 280" role="img" aria-label="Kužel možných budoucností od roku 2026 do roku 2075 se třemi scénáři">
  <path d="M60 140 L640 30 L640 250 Z" fill="var(--surface-2)" stroke="var(--line)"/>
  <g stroke="var(--line-strong)" stroke-width="1">
    <line x1="176" y1="40" x2="176" y2="250"/><line x1="292" y1="40" x2="292" y2="250"/><line x1="408" y1="40" x2="408" y2="250"/><line x1="524" y1="40" x2="524" y2="250"/>
  </g>
  <g font-size="11" fill="var(--muted)" text-anchor="middle" font-family="var(--font-mono)">
    <text x="60" y="270">2026</text><text x="176" y="270">2035</text><text x="292" y="270">2045</text><text x="408" y="270">2055</text><text x="524" y="270">2065</text><text x="640" y="270">2075</text>
  </g>
  <path d="M60 140 C 220 120, 380 80, 640 58" fill="none" stroke="var(--good)" stroke-width="2.5"/>
  <path d="M60 140 C 220 140, 400 135, 640 140" fill="none" stroke="var(--loess-mark)" stroke-width="2.5"/>
  <path d="M60 140 C 220 160, 380 205, 640 224" fill="none" stroke="var(--critical)" stroke-width="2.5"/>
  <circle cx="60" cy="140" r="6" fill="var(--ink)" stroke="var(--surface)" stroke-width="2"/>
  <g font-size="12.5" font-weight="650" fill="var(--ink)">
    <text x="500" y="52">A · Resilientní město</text>
    <text x="500" y="132">B · Město adaptace</text>
    <text x="490" y="242">C · Fragmentované město</text>
  </g>
  <g font-size="11" fill="var(--ink-2)">
    <text x="70" y="166">dnes: sucho, vedra,</text>
    <text x="70" y="180">ropný šok, války</text>
    <text x="182" y="62">okno pro adaptaci krajiny</text>
    <text x="182" y="76">a energetiky do ~2040</text>
  </g>
</svg>`;
  }

  /* Časová osa blackoutu */
  function blackout() {
    const rows = [
      ["0–4 h", "Zhasnou světla, zastaví se výtahy, semafory a pokladny.", "Mobilní síť se přetěžuje, platby kartou nefungují."],
      ["4–24 h", "Ve vyšších patrech přestává téct voda, rozmrzají mrazáky.", "Docházejí záložní zdroje vysílačů, nelze natankovat."],
      ["1–3 dny", "Kritické je zásobování vodou, léky a potravinami.", "Nucená kanalizace se může vracet do nižších pater; nemocnice běží na náhradní zdroje."],
      ["3–4 dny", "Podle modelových situací hrozí napětí u obchodů a čerpacích stanic.", "Rozhoduje sousedská organizace a informovanost."],
      ["do 10 dnů", "Obnova velkého blackoutu může trvat až deset dní.", "Po obnovení: vodu z kohoutku pijte až po pokynu vodárny."],
      ["týdny", "Plyn se po výpadku obnovuje pomalu – kontrola a natlakování sítě až 30–40 dní.", "Počítejte s náhradním vařením a teplou místností."]
    ];
    return `<ol class="timeline">${rows.map(r => `<li><span class="when">${r[0]}</span><span class="what">${r[1]}<span>${r[2]}</span></span></li>`).join("")}</ol>
    <p class="chart-foot" style="margin-top:8px">Podle: V. Cílek a kol., Nové ostrovy (2024); J. Juránek in Ruka noci podaná (2018); příručka 72 hodin (MV ČR).</p>`;
  }

  /* Postup samosprávy panelového domu */
  function panelak() {
    const rows = [
      ["1", "Zavřít jeden vchod", "U hlavního vchodu stolek se dvěma dobrovolníky – lidé mají pocit bezpečí."],
      ["2", "Obejít byty", "Zjistit, co kdo potřebuje i co může nabídnout (léky, nářadí, péče o děti, dovoz vody)."],
      ["3", "Rozdělit úkoly", "Voda, nouzové toalety, hlídání dětí, péče o seniory – aktivovat, ne jen rozdávat pomoc."],
      ["4", "Propojit okolní domy", "Pomoci sousedním domům se samosprávou, aby se zóna bezpečí rozšířila na celý okrsek."],
      ["5", "Spojení s radnicí", "Účastnit se komunikačních hodin a předávat informace zpět do domu."]
    ];
    return `<ol class="timeline">${rows.map(r => `<li><span class="when">krok ${r[0]}</span><span class="what"><strong>${r[1]}</strong><span>${r[2]}</span></span></li>`).join("")}</ol>
    <p class="chart-foot" style="margin-top:8px">Podle kapitoly Taktický urbanismus v knize V. Cílek a kol.: Nové ostrovy (2024).</p>`;
  }

  window.VizeDiagramy = { ICONS, heroSvg, cestaKapky, kuzel, blackout, panelak };
})();
