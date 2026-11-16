/* ==========================================================================
   SUCHO A VODA 2026 — DIAGNOSTICKÝ PANEL A SEKCE „CO TO ZNAMENÁ PRO MĚ?“
   Z profilu lokality a osmi indexů skládá srozumitelné odpovědi na devět
   praktických otázek. Čísla označená jako modelový odhad vycházejí z modelu
   v sucho-model.js, ostatní z institucionálních zdrojů uvedených u textu.
   ========================================================================== */
(function () {
  "use strict";
  var SM = window.SM;
  var M = SM.model;
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  var pct = function (v) { return Math.round(v) + " %"; };
  /* česká čísla: desetinná čárka a typografické minus */
  var cis = function (v, d) {
    return Number(v).toLocaleString("cs-CZ", { minimumFractionDigits: d === undefined ? 1 : d,
                                               maximumFractionDigits: d === undefined ? 1 : d })
      .replace("-", "\u2212");
  };
  var cel = function (v) { return Math.round(v).toLocaleString("cs-CZ").replace("-", "\u2212"); };

  /* slovní stupeň pro index */
  function stupen(v) { return M.kat(v)[3]; }
  function klz(v) { return M.kat(v)[2]; }

  /* mini sloupcový graf vývoje indexu přes horizonty */
  function spark(p, layer, scKey) {
    var vals = SM.horizons.map(function (h) { return M.indexy(p, scKey, h.id)[layer]; });
    var out = '<span class="sm-spark" role="img" aria-label="Vývoj: '
      + vals.map(function (v, i) { return SM.horizons[i].lbl + " " + v; }).join(", ") + '">';
    vals.forEach(function (v, i) {
      out += '<i class="k-' + klz(v) + '" style="height:' + Math.max(8, v) + '%" title="'
        + SM.horizons[i].lbl + ": " + v + '"></i>';
    });
    return out + "</span>";
  }

  /* řádek jednoho indexu */
  function radek(p, lay, ix, scKey, active) {
    var v = ix[lay.id];
    return '<button class="sm-row' + (active === lay.id ? " on" : "") + '" data-lay="' + lay.id + '">'
      + '<span class="sm-row-n">' + esc(lay.n) + '<small>' + esc(lay.kratce) + '</small></span>'
      + spark(p, lay.id, scKey)
      + '<span class="sm-row-v k-' + klz(v) + '"><b>' + v + '</b><small>' + stupen(v) + '</small></span>'
      + '</button>';
  }

  /* ---------- DEVĚT OTÁZEK ---------- */
  function otazky(p, ix, scKey, hId) {
    var kr = SM.kraje[p.kraj], k = ix.k, h = ix.h, sc = ix.sc, hg = p.hgT, bs = p.basinT;
    var zdrPov = (kr.zdrojPovodi || [p.basin]).map(function (b) { return SM.basins[b]; });
    var zdrNadrze = [], _vid = {};
    zdrPov.forEach(function (b) {
      b.nadrze.forEach(function (n) {
        var zk = n.replace(/\s*\(.*\)\s*$/, "");
        if (!_vid[zk]) { _vid[zk] = 1; zdrNadrze.push(n); }
      });
    });
    var rok = h.lbl;
    var Q = [];

    /* 1 — voda v kohoutku */
    var mix = kr.zdroj;
    var mixText = mix[0] >= 60 ? "převážně z povrchové vody (nádrže a řeky)"
      : (mix[1] >= 55 ? "převážně z podzemní vody (vrty a prameniště)" : "ze smíšených zdrojů");
    Q.push({
      ic: "drop", t: "Budu mít ve vodovodu vodu?",
      lead: "Riziko pro zásobování: <b class=\"k-" + klz(ix.pitna) + "\">" + stupen(ix.pitna)
        + "</b> (index " + ix.pitna + " ze 100) pro horizont " + rok + ".",
      body: "<p>" + esc(kr.n + " kraj je zásobován " + mixText + " – orientačně, podle krajských plánů pro sucho a statistik SZÚ a ČSÚ, je to asi "
        + mix[0] + " % obyvatel z povrchové, " + mix[1] + " % z podzemní a " + mix[2] + " % ze smíšené vody.")
        + " Vaše lokalita spadá do vodohospodářské soustavy <b>" + esc(zdrPov.map(function (b) { return b.n; }).join(" / "))
        + "</b>; klíčová vodní díla a zdroje v této soustavě jsou " + esc(zdrNadrze.slice(0, 5).join(", ")) + ".</p>"
        + "<p><b>Stav zdroje teď:</b> " + esc(zdrPov[0].stav2026) + "</p>"
        + "<p><b>Propojenost soustav</b> v kraji je "
        + ["", "velmi nízká", "nízká", "střední", "dobrá", "vysoká"][kr.propoj]
        + ". " + (kr.propoj >= 4
          ? "To je nejsilnější pojistka, jakou obec může mít: když selže jeden zdroj, voda přijde odjinud."
          : "Právě to je slabé místo – při selhání místního zdroje není odkud vodu přivést. Odborníci VÚV TGM proto upozorňují, že řešením není prohlubování soukromých vrtů, které si navzájem strhávají hladinu, ale propojování vodárenských soustav.") + "</p>"
        + (kr.vlastniZdroje >= 4
          ? "<p class=\"sm-warn\">V tomto kraji je mimořádně mnoho malých obcí na vlastních mělkých vrtech a studnách. Podle ministra zemědělství je v nejohroženějších obcích přes 90 % obyvatel odkázáno na místní zdroje, nikoli na velké soustavy.</p>" : "")
    });

    /* 2 — vlastní studna a vrt */
    var studnaRisk = ix.zvoden;
    Q.push({
      ic: "well", t: "Mám vlastní studnu nebo vrt – vyschne?",
      lead: "Riziko poklesu hladiny: <b class=\"k-" + klz(studnaRisk) + "\">" + stupen(studnaRisk)
        + "</b> (index " + studnaRisk + ") pro horizont " + rok + ".",
      body: "<p>Vaše lokalita leží v prostředí <b>" + esc(hg.n) + "</b> – " + esc(hg.kratce)
        + ". Vydatnost: " + esc(hg.vydatnost) + ". Doba obnovy zásoby: <b>" + esc(hg.obnova) + "</b>.</p>"
        + "<p>" + esc(hg.popis) + "</p>"
        + "<p><b>Co to znamená pro studnu:</b> " + esc(hg.rizika) + "</p>"
        + (hg.setrvacnost < 0.5
          ? "<p>V puklinovém prostředí jde obvykle o mělké vrty a studny 10–15 m hluboko. Dobrá zpráva: po vydatných srážkách se hladina vrací během týdnů až měsíců. Špatná: v suchém roce vyschne jako první a prohloubení vrtu problém nevyřeší, protože vody tu není víc – jen se posune hranice, kdo ji vyčerpá dřív.</p>"
          : "<p>V pánevním prostředí je zásoba velká a kolísá pomalu, takže sucho poznáte později. Jenže právě proto se nedoplní jednou vlhkou zimou: podle hydrologů VÚV TGM by k obnově muselo pršet mírně a vsakovatelně, zhruba 10–30 mm denně, několik týdnů v kuse. Václav Cílek upozorňuje, že se zásobníky podzemních vod běžně zaklesávají o 20–40 m.</p>")
        + "<p class=\"sm-tip\"><b>Praktický krok:</b> zapisujte si hladinu ve studni jednou měsíčně. Dva roky vlastního měření vám o vašem zdroji řeknou víc než jakákoli mapa. Po opětovném napuštění vyschlé studny nechte vodu laboratorně ověřit – splachují se do ní nečistoty.</p>"
    });

    /* 3 — kvalita vody a regulace */
    var sinice = zdrNadrze.some(function (n) { return /Nové Mlýny|Vranov|Jordán|Plumlov|Brno/.test(n); });
    var dusicnany = p.nizina > 0.55 && (p.hg === "neogen" || p.hg === "kvarter" || p.hg === "krida");
    var zakazP = Math.round(Math.min(95, ix.pitna * 0.75 + ix.povrch * 0.25));
    Q.push({
      ic: "flask", t: "Zhorší se kvalita vody? Hrozí zákazy zalévání?",
      lead: "Modelový odhad pravděpodobnosti úředních omezení (zákaz zalévání, napouštění bazénů, omezení odběrů) v horizontu "
        + rok + ": <b class=\"k-" + klz(zakazP) + "\">" + (zakazP < 25 ? "malá" : zakazP < 50 ? "nezanedbatelná" : zakazP < 72 ? "vysoká" : "velmi vysoká") + "</b>.",
      body: "<p>V roce 2026 omezila řada obcí napouštění bazénů a zalévání pitnou vodou; Šindelová na Sokolovsku povolila bazény jen po dohodě s úřadem pod pokutou až 50 tisíc korun. Na jižní Moravě platily zákazy nadbytečného odběru pitné vody. Zákaz vyhlašuje obec nebo kraj, ne stát – sledujte proto web obce a krajskou komisi pro sucho.</p>"
        + (sinice ? "<p><b>Sinice.</b> Zdroje ve vašem povodí zahrnují mělčí nádrže, kde se při vysokých teplotách a nízkých průtocích přemnožují sinice (v roce 2026 například Nové Mlýny). Mělké nádrže navíc ztrácejí v teple vodu výparem a zhoršuje se jakost – proto samotné stavění nádrží problém s jakostí neřeší.</p>" : "")
        + (dusicnany ? "<p><b>Dusičnany a polutanty.</b> Jste v nížinné zemědělské krajině nad propustným kolektorem. Při nízkých průtocích tvoří v tocích podstatnou část vody vyčištěná voda z čistíren; bez ředění a při vysoké teplotě klesá obsah kyslíku a hromadí se znečištění. V podzemní vodě roste koncentrace dusičnanů, protože stejné množství látek se rozpouští v menším objemu vody.</p>" : "")
        + "<p class=\"sm-tip\"><b>Co pomůže vám:</b> dešťová voda na zálivku a splachování (vodě z nádrže nevadí, že není pitná), zalévání ráno nebo večer a ke kořenům, plně naložená myčka, sprcha místo vany. Zachytávání „studené“ vody před sprchováním do kbelíku na zálivku je drobnost, která v suchém srpnu v obci rozhoduje.</p>"
    });

    /* 4 — ceny potravin a životní náklady */
    var cenyIdx = Math.round((ix.zemedelstvi * 0.6 + ix.pitna * 0.4));
    Q.push({
      ic: "coins", t: "O kolik se mi zdraží potraviny a vodné?",
      lead: "Tlak na ceny ve vašem regionu v horizontu " + rok + ": <b class=\"k-" + klz(cenyIdx) + "\">"
        + stupen(cenyIdx) + "</b>.",
      body: "<p><b>Doložená čísla roku 2026.</b> Agrární komora odhaduje výpadek tržeb zemědělství kolem 20 mld. Kč a sklizeň označila za nejhorší za 15 let; produkce zeleniny měla klesnout asi o 30 %. Sklizeň obilovin byla v průměru nižší o 17 %, ječmene o 24 % a jarního ovsa o 43 %. Chmel na Žatecku klesl až o 30 % a ztratil část hořkých látek.</p>"
        + "<p><b>Co zdražuje nejvíc.</b> Nejde o obilí – to sucho zvládne se ztrátami, hlad nehrozí. Zdražuje <b>maso</b>, protože vyrostlo méně objemných krmiv: někteří farmáři začali skrmovat zimní zásoby už v srpnu, a nedostatek píce vede k podzimním porážkám a pak k vyšším cenám. Vodní stopa 1 kg pšenice je v průměru asi 1 800 litrů, 1 kg vepřového asi 6 000 litrů a 1 kg hovězího asi 15 000 litrů – proto hovězí zdražuje rychleji než vepřové.</p>"
        + "<p><b>Vodné a stočné.</b> Ministerstvo zemědělství v listopadu 2026 navrhlo skokové zvýšení poplatků za odběr podzemní vody, které se neměnily 20 let, a z výnosů chce financovat propojování soustav, čistírny a nové zdroje. Proti návrhu se postavil Středočeský kraj i zemědělci. Dražší bude i úprava vody: při nízkých průtocích je surová voda horší a vyžaduje náročnější technologii.</p>"
        + "<p>Studie vedená M. Trnkou ukazuje, že při globálním oteplení o 3 °C by průměrná cena pšenice mohla být až trojnásobná proti roku 2010.</p>"
    });

    /* 5 — krajina, požáry a bleskové povodně */
    var wN = { h2027: 0.62, h2030: 0.3, h2040: 0.14, h2050: 0.07, h2075: 0.03 }[h.id];
    var pozar = Math.round(Math.min(96, ix.srazky * 0.50 + ix.zdravi * 0.20 + 8 + wN * 18 * (p.d26 / 5) * 5));
    var blesk = Math.round(Math.min(96, 24 + (k.priv - 40) * 0.9 + p.sklon * 1.1 + (100 - k.ret) * 0.28));
    Q.push({
      ic: "fire", t: "Hrozí mi blesková povodeň nebo požár?",
      lead: "Požární riziko vegetace: <b class=\"k-" + klz(pozar) + "\">" + stupen(pozar)
        + "</b> · Riziko bleskové povodně a splachu: <b class=\"k-" + klz(blesk) + "\">" + stupen(blesk) + "</b>.",
      body: "<p>Vyschlá a utužená půda je obojí naráz: v suchu hoří, při přívalu nevsákne. Sklon terénu ve vašem okolí je podle modelu asi "
        + cel(p.sklon) + " m na kilometr"
        + (p.nizina > 0.5 ? " a jde o nížinnou zemědělskou krajinu – splach ornice a bahna do obce je tu typickým rizikem" : " – v členitém terénu se voda soustředí do úžlabin a odteče rychle") + ".</p>"
        + "<p><b>Proč déšť nepomůže.</b> Nechybí déšť, ale déšť použitelný. Výsušné praskliny u nás běžně dosahují hloubky 30–40 cm, takže půda ztrácí vodu i z hloubky, ne jen z povrchu, a zvětšuje se odparná plocha. Po suché, utužené půdě pak přívalová srážka odteče, způsobí erozi a do hloubky pod 40 cm se nedostane.</p>"
        + "<p><b>Nový typ povodní.</b> Evropští meteorologové rozlišují povodně říční a dešťové; těch druhých přibývá a tvoří už asi polovinu všech povodňových událostí. Počátkem července 2026 spadlo při bouřkách v povodí Bečvy asi 100 mm srážek a povodňová vlna postupovala rychlostí asi 8 km/h – z běžného toku se stal povodňový během minut. Platí staré pravidlo: za sucha mysli na povodeň.</p>"
        + "<p><b>Stav lesa.</b> V srpnu 2026 trpělo 60 % lesů vysokým nedostatkem vody a u stromů se zastavila tvorba dřeva; v polovině října mělo podle sítě DendroNetwork nějaký vodní deficit čtyři pětiny porostů a uspokojivé podmínky jen 6 % lesů. Nejběžnější příčinou oslabení lesa je sucho – kůrovec a vítr přicházejí teprve potom.</p>"
    });

    /* 6 — lokální ekonomika a práce */
    Q.push({
      ic: "factory", t: "Může nedostatek vody ohrozit práci v regionu?",
      lead: "Zranitelnost regionálního hospodářství: <b class=\"k-" + klz(ix.prumysl) + "\">"
        + stupen(ix.prumysl) + "</b> (index " + ix.prumysl + ") v horizontu " + rok + ".",
      body: "<p><b>Na vodě závislá odvětví ve vašem kraji:</b> " + esc(kr.prumysl.join(", ")) + ".</p>"
        + "<p>" + esc(kr.ekonomika) + "</p>"
        + "<p><b>Vodohospodářský kontext povodí.</b> " + esc(bs.role) + "</p>"
        + "<p>Riziko nevzniká v létě jednoho suchého roku, ale při vyčerpání nádrží v řadě suchých let. Přednost mají podle plánů pro sucho pitná voda pro obyvatele a provoz kritické infrastruktury; průmysl a zemědělství jsou na konci řady. Banky a pojišťovny už klimatické riziko u nemovitostí a pozemků hodnotí – pokud se oblast stane obtížně pojistitelnou, projeví se to v cenách.</p>"
    });

    /* 7 — zdraví a vlny veder */
    Q.push({
      ic: "heart", t: "Jak mi horko a sucho ohrozí zdraví?",
      lead: "Zdravotní riziko z vln veder: <b class=\"k-" + klz(ix.zdravi) + "\">" + stupen(ix.zdravi)
        + "</b> · modelový odhad pro horizont " + rok + ": <b>" + cel(k.tropDny) + "</b> tropických dní a <b>"
        + cis(k.tropNoci) + "</b> tropických nocí za rok.",
      body: "<p><b>Městský tepelný ostrov</b> ve vaší lokalitě je podle modelu asi <b>+"
        + cis(p.uhi) + " °C</b> proti okolní krajině. "
        + (p.uhi > 3.5 ? "Ve městě při teplotách nad 30 °C bývá až o 8 °C víc než na meteorologické stanici za městem; povrch tmavých střech přesahuje 70 °C a vypasená nebo holá země 52 °C. Měřicí stanice jsou mimo zastavěné plochy, takže oficiální čísla to, co zažíváte na ulici, nepopisují."
          : "Jste mimo velké město, takže tepelný ostrov je malý – rozhoduje u vás spíš stav krajiny v okolí. Platí přitom jednoduchá rovnice: teplota místa = teplota regionu minus chlazení, a chladit umí jen krajina, která má vodu. Zastíněný trávník měl při měření 24 °C, betonový chodník o několik metrů dál 45 °C.") + "</p>"
        + "<p><b>Co je doloženo.</b> Vlny veder v létě 2026 si v Evropě podle recenzované studie v Nature Health (Imperial College London a LSHTM) vyžádaly v 854 městech přes 50 tisíc nadměrných úmrtí – nejvíc v historii měření a téměř dvojnásobek let 2003 a 2022. Asi dvě třetiny z toho studie připisuje oteplování způsobenému člověkem. V českých sledovaných městech jde o 701 nadměrných úmrtí, z toho asi 425 (62 %) spojených se změnou klimatu. CzechGlobe uvádí, že během červnové a červencové vlny veder zemřelo v Česku o 573 lidí víc než obvykle. Podle dlouhodobých statistických řad pokračuje zvýšená úmrtnost několik měsíců až půl roku po odeznění vlny veder.</p>"
        + "<p><b>Kdo je ohrožen.</b> Více než devět z deseti obětí v Evropě byli lidé nad 65 let. Rizikem jsou osamělí senioři, lidé s kardiovaskulárním onemocněním, malé děti a lidé pracující venku. Z krajských měst má plán pro vlny veder jen Praha.</p>"
        + "<p><b>Psychika.</b> Environmentální stres a solastalgie – tíseň ze ztráty známé krajiny – nejsou módní pojmy: farmářka pod Kašperkem popsala, jak se místo, kde šlo utopit traktor, změnilo za pět let na běžnou louku a dnes je vyprahlé. Na úzkost z budoucnosti funguje nejlépe činnost: péče o zeleň, zapojení do komunity, praktická příprava. Pokud vás úzkost nebo smutek dlouhodobě ochromují, obraťte se na odborníka nebo linku pomoci.</p>"
        + "<p class=\"sm-tip\"><b>Hospodářská zvířata to mají horší než vy.</b> Komfortní zóna dojnic končí už nad 20 °C – pak omezují příjem potravy a klesá produkce mléka. Prasata a drůbež jsou na teplotu velmi citlivé a ve velkochovech může dojít k hromadnému úhynu. Pomáhají mlžítka, světlá krytina stájí a dostatek napájecí vody.</p>"
    });

    /* 8 — dotace, projekty a řešení */
    var prog = SM.programy.filter(function (g) {
      if (ix.pitna > 50 && g.id === "mze-propojovani") return true;
      if (ix.krajina > 50 && (g.id === "opzp-tune" || g.id === "pozemkove-upravy" || g.id === "mze-drenaze")) return true;
      if (p.nizina > 0.5 && g.id === "eagri-30ha") return true;
      return ["nzu-destovka", "opzp-105", "opzp-109", "csop", "chmu-1000"].indexOf(g.id) >= 0;
    });
    Q.push({
      ic: "seed", t: "Jaké programy a projekty mohu využít nebo podpořit?",
      lead: "Konkrétní programy pro " + esc(kr.n) + " kraj a pro vaši domácnost – stav k 16. 11. 2026.",
      body: "<p><b>Co se připravuje a děje přímo ve vašem kraji:</b></p><ul class=\"sm-ul\">"
        + kr.programy.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"
        + "<p><b>Programy, o které lze žádat:</b></p>"
        + prog.map(function (g) {
          return '<div class="sm-prog"><b>' + esc(g.n) + '</b><span class="sm-prog-c">' + esc(g.castka) + '</span>'
            + '<p>' + esc(g.popis) + '</p><p class="sm-prog-j">' + esc(g.jak)
            + ' <a href="' + g.odkaz + '" target="_blank" rel="noopener">oficiální web ↗</a></p></div>';
        }).join("")
        + "<p class=\"sm-tip\">Když expertní komise navrhovaly asi 400 opatření, jak zlepšit vodní hospodářství, a dostaly otázku, který jediný faktor je nejdůležitější, odpověď byla: <b>zlepšit stav půdy</b>. Zdravá půda o mocnosti 1 m na ploše 1 km² zadrží v průměru 200 000 m³ vody. Potenciální retence všech našich zemědělských a lesních půd je asi 8,4 mld. m³, dnes jsme asi na 5 mld. m³ – ztráta přes 3 mld. m³ je důsledek stavu půdy, ne klimatu. Pro srovnání: první nová plánovaná přehrada má mít objem v řádu 15 mil. m³.</p>"
    });

    /* 9 — osobní a rodinná připravenost */
    var akce = [];
    function pridej(sk, min) {
      SM.pripravenost[sk].forEach(function (a) { if (a[2] >= min) akce.push([sk, a]); });
    }
    pridej("voda", ix.pitna > 55 ? 1 : 2);
    pridej("zahrada", ix.krajina > 55 ? 1 : 2);
    pridej("horko", ix.zdravi > 45 ? 1 : 2);
    pridej("dum", 1);
    var SKN = { voda: "Voda", zahrada: "Zahrada, dvůr a ulice", horko: "Horko doma a ve městě", dum: "Dům a domácnost" };
    var grp = {};
    akce.forEach(function (x) { (grp[x[0]] = grp[x[0]] || []).push(x[1]); });
    Q.push({
      ic: "shield", t: "Jak zabezpečím sebe, dům a zahradu?",
      lead: "Akční seznam pro vaši lokalitu. Vychází ze sekce <a href=\"index.html#pripravenost\">Připravenost</a> na hlavní stránce Vize 2075 a je upravený podle rizik, která u vás vycházejí nejvýš.",
      body: Object.keys(grp).map(function (s) {
        return "<h5>" + SKN[s] + "</h5><ul class=\"sm-check\">" + grp[s].map(function (a) {
          return '<li' + (a[2] >= 3 ? ' class="hi"' : '') + '><b>' + esc(a[0]) + '</b> ' + esc(a[1]) + '</li>';
        }).join("") + "</ul>";
      }).join("")
        + "<p class=\"sm-tip\"><b>Tři zásady, které platí na každém pozemku:</b> zadržte vodu tam, kam spadla; prodlužte její cestu; zpomalte ji příčnými překážkami, aby se rozlila do velké vsakovací plochy. Plánování začíná nahoře – na střeše nebo na svahu nad pozemkem – a pokračuje dolů. Začněte v malém a pozorujte, jak se to osvědčí.</p>"
        + "<p class=\"sm-tip\">A připomínka k míře: připravenost není strach z konce světa. Václav Cílek ji nazývá „něžným prepperstvím“ – hlavním motivem je láska k blízkým, ne panika. Většina kroků výše zlepšuje život i v běžných časech: šetří peníze, vodu a energii a posiluje vztahy se sousedy.</p>"
    });
    return Q;
  }

  /* ---------- SESTAVENÍ PANELU ---------- */
  function render(el, p, scKey, hId, activeLayer, onLayer) {
    if (!p || !p.kraj) {
      el.innerHTML = '<div class="sm-empty"><h3>Klepněte do mapy</h3>'
        + '<p>Vyberte místo na území České republiky – nebo vyhledejte obec či PSČ. '
        + 'Zobrazí se profil lokality, osm indexů ohrožení a odpovědi na devět praktických otázek '
        + 'pro zvolený rok a scénář.</p>'
        + '<p class="sm-note">Mapa počítá pro libovolný bod, ne jen pro obce ze seznamu.</p></div>';
      return;
    }
    var ix = M.indexy(p, scKey, hId);
    var kr = SM.kraje[p.kraj], k = ix.k;
    var nazev = p.obecKm <= 3 ? p.obec[0] : (p.obec[0] + " – " + p.obecKm + " km");
    var kc = M.kat(ix.celkem);

    var html = '<div class="sm-head">'
      + '<div class="sm-head-t"><h3>' + esc(nazev) + '</h3>'
      + '<p>' + esc(kr.n) + ' kraj · ' + p.elev + ' m n. m. · ' + p.la.toFixed(4) + ' N, ' + p.lo.toFixed(4) + ' E</p></div>'
      + '<div class="sm-score k-' + kc[2] + '"><b>' + ix.celkem + '</b><small>' + kc[3] + '<br>souhrnné riziko</small></div>'
      + '</div>';

    /* klimatický profil */
    html += '<div class="sm-grid4">'
      + '<div><b>' + cel(k.P) + ' mm</b><small>roční srážky (' + rozdil(k.P, p.P) + ' proti normálu 1991–2020)</small></div>'
      + '<div><b>' + cis(k.T) + ' °C</b><small>roční teplota (+' + cis(k.dT) + ' °C proti normálu)</small></div>'
      + '<div><b>' + (k.kvb > 0 ? "+" : "") + cel(k.kvb) + ' mm</b><small>klimatická vodní bilance (srážky − výpar)</small></div>'
      + '<div><b>' + cel(k.tropDny) + ' / ' + cis(k.tropNoci) + '</b><small>tropických dní / nocí za rok</small></div>'
      + '</div>';

    html += '<div class="sm-ctx"><span><b>Hydrogeologie:</b> ' + esc(p.hgT.n) + '</span>'
      + '<span><b>Povodí:</b> ' + esc(p.basinT.n) + ' (' + esc(p.basinT.sprava) + ')</span>'
      + '<span><b>Nejbližší vodní dílo:</b> ' + esc(p.nadrz[0]) + ' – ' + p.nadrzKm + ' km</span>'
      + (hId === "h2027" ? '<span><b>Sucho 0–100 cm nyní:</b> ' + stupenSucha(p.d26) + ' (InterSucho, 8.–10. 11. 2026)</span>' : '')
      + '</div>';

    /* osm indexů */
    html += '<h4 class="sm-h4">Osm dimenzí ohrožení <small>klepnutím přepnete vrstvu mapy; sloupce vpravo ukazují vývoj 2027 → 2075</small></h4>';
    html += '<div class="sm-rows">' + SM.layers.map(function (l) {
      return radek(p, l, ix, scKey, activeLayer);
    }).join("") + '</div>';

    /* devět otázek */
    html += '<h4 class="sm-h4">Co to znamená pro mě? <small>odpovědi pro tuto lokalitu, rok ' + esc(ix.h.lbl) + ' a scénář „' + esc(ix.sc.n) + '“</small></h4>';
    html += '<div class="sm-qs">' + otazky(p, ix, scKey, hId).map(function (q, i) {
      return '<details class="sm-q"' + (i === 0 ? " open" : "") + '><summary><span class="sm-qi i-' + q.ic + '"></span>'
        + '<span class="sm-qt">' + esc(q.t) + '</span></summary>'
        + '<div class="sm-qb"><p class="sm-lead">' + q.lead + '</p>' + q.body + '</div></details>';
    }).join("") + '</div>';

    html += '<p class="sm-disc">Hodnoty jsou výstupem konceptuálního modelu, nikoli oficiální předpovědí. '
      + 'Slouží k porovnání lokalit, scénářů a časových horizontů. Pro rozhodování o konkrétním zdroji vody '
      + 'použijte data ČHMÚ, InterSucho a krajský plán pro zvládání sucha. '
      + '<a href="#sm-metodika">Jak model počítá →</a></p>';

    el.innerHTML = html;
    el.querySelectorAll(".sm-row").forEach(function (b) {
      b.addEventListener("click", function () { onLayer(b.dataset.lay); });
    });
  }

  function rozdil(a, b) {
    var d = Math.round(a - b);
    return (d > 0 ? "+" : "") + cel(d) + " mm";
  }
  function stupenSucha(d) {
    var n = ["bez sucha", "počínající", "mírné", "výrazné", "výjimečné", "extrémní"];
    var i = Math.round(d);
    return n[Math.max(0, Math.min(5, i))];
  }

  SM.panel = { render: render, otazky: otazky, spark: spark };
})();
