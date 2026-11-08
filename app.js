(async function () {
  const C = window.SANAD;
  // Content lives in data/*.json (edited through Pages CMS); merge it in before rendering
  const DATA_FILES = ["site", "team", "programs", "communities", "spotlight", "faq", "home", "news", "meetups", "map"];
  try {
    const parts = await Promise.all(DATA_FILES.map((f) => fetch(`data/${f}.json`, { cache: "no-cache" }).then((r) => {
      if (!r.ok) throw new Error(f);
      return r.json();
    })));
    parts.forEach((p) => Object.assign(C, p));
  } catch (e) {
    document.body.insertAdjacentHTML("afterbegin", '<p style="margin:0;padding:12px 16px;background:#fbeed6;color:#7a4b00;text-align:center">Content could not be loaded. Open the site through a web server (e.g. <code>python3 -m http.server</code>), not as a file.</p>');
    return;
  }
  // A person counts only if they have a name; empty leads/members from the editor are dropped
  const named = (p) => p && p.name && (p.name.ar || p.name.en);
  C.teams.forEach((tm) => { tm.lead = named(tm.lead) ? tm.lead : null; tm.members = (tm.members || []).filter(named); });
  let lang = "ar";
  try { lang = localStorage.getItem("sanad-lang") || "ar"; } catch (e) {}

  const t = (v) => (v && typeof v === "object" ? v[lang] || v.ar : v || "");
  const ui = (k) => t(C.ui[k]);
  const $ = (s) => document.querySelector(s);
  // Pages share this script; sections missing from the current page are skipped.
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // external links open in a new tab; links inside the site (e.g. form.html?f=mentee) stay in this one
  const ext = (href, label, cls) => `<a${cls ? ` class="${cls}"` : ""} href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ""}>${esc(label)}</a>`;

  const STATUS = { active: "statusActive", forming: "statusForming", planned: "statusPlanned" };
  const badge = (s) => `<span class="badge badge-${s}">${esc(ui(STATUS[s]))}</span>`;

  const ICONS = {
    community: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M14 14.5c.9-.6 1.9-1 3-1 2.5 0 4 2 4 4.5"/>',
    mentor: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/>',
    network: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="12" cy="10" r="2"/><path d="M6.7 7l3.6 2M17.3 7l-3.6 2M12 12v4"/>',
    growth: '<path d="M4 20h16M7 16v-4M12 16V8M17 16V5"/>',
    spotlight: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    directory: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7.5 17.5c.8-2 2.5-3 4.5-3s3.7 1 4.5 3"/>',
    handshake: '<path d="M3 11l4-4 3 2 3-2 4 0 4 4"/><path d="M7 7l-4 4 6 6c.8.8 2 .8 2.8 0l5.7-5.7"/><path d="M10 14l2 2M12.5 11.5l2 2"/>',
    gathering: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'
  };
  const SOCIAL_ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.5-3s2.5 1 2.5 3V17"/>',
    youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>'
  };
  const socialIcon = (k) => `<svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SOCIAL_ICONS[k]}</svg>`;

  const icon = (k) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ""}</svg>`;


  // Short university name for narrow cards (e.g. "HUJI"), matched by the university's English name
  const shortAffiliation = (aff) => {
    if (!aff) return "";
    const c = C.communities.find((x) => x.name.en === aff.en);
    return c && c.short ? t(c.short) : t(aff);
  };

  // Accepts a name (string or {ar,en}) or a member object
  const asMember = (p) => (p && p.name ? p : { name: p });
  // Photo with the initial underneath; a missing or broken image falls back to the initial
  const photo = (m, cls) => `<span class="${cls}"><span class="initial">${esc(t(m.name).charAt(0))}</span>${
    m.photo ? `<img src="${esc(m.photo)}" alt="${esc(t(m.name))}" loading="lazy" onerror="this.remove()">` : ""}</span>`;

  // Personal website or LinkedIn link shown next to a person's name
  function profileLink(m) {
    const href = m.link || m.linkedin;
    if (!href) return "";
    const isLinkedIn = /linkedin\.com/.test(href);
    const label = `${t(m.name)} — ${isLinkedIn ? "LinkedIn" : ui("website")}`;
    return `<a class="profile-link" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(label)}" title="${esc(label)}">${socialIcon(isLinkedIn ? "linkedin" : "globe")}</a>`;
  }

  // Compact person row (homepage)
  function person(p, sub, extraClass) {
    const m = asMember(p);
    const name = t(m.name);
    const avatar = photo(m, "avatar");
    const lines = [sub, t(m.role), shortAffiliation(m.affiliation)].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("");
    return `<div class="person${extraClass ? " " + extraClass : ""}">${avatar}<div><strong>${esc(name)}${profileLink(m)}</strong>${lines}</div></div>`;
  }

  // Photo card (team page)
  function member(p, tag, extraClass) {
    const m = asMember(p);
    const name = t(m.name);
    const lines = [t(m.role), shortAffiliation(m.affiliation)].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("");
    return `<figure class="member${extraClass ? " " + extraClass : ""}">
      ${photo(m, "member-photo")}
      ${tag ? `<span class="member-tag">${esc(tag)}</span>` : ""}
      <figcaption><strong>${esc(name)}${profileLink(m)}</strong>${lines}</figcaption>
    </figure>`;
  }

  function renderHome() {

    // News: first item featured with image, the rest as a compact list
    const news = C.news || [];
    const newsSection = $("#news");
    if (newsSection) newsSection.hidden = !news.length;
    if (news.length) {
      const [top, ...rest] = news;
      const meta = (n) => `<div class="news-meta"><span class="news-tag">${esc(t(n.tag))}</span>${t(n.date) ? `<span class="news-date">${esc(t(n.date))}</span>` : ""}</div>`;
      set("#newsList", `
        <a class="news-featured" href="${esc(top.link || "#")}">
          ${top.image ? `<div class="news-featured-img"><img src="${esc(top.image)}" alt="" loading="lazy"></div>` : ""}
          <div class="news-featured-body">
            ${t(top.badge) ? `<span class="announce-badge"><span class="pulse" aria-hidden="true"></span>${esc(t(top.badge))}</span>` : ""}
            ${meta(top)}
            <h3>${esc(t(top.title))}</h3>
            <p>${esc(t(top.text))}</p>
            <span class="btn btn-primary">${esc(t(top.linkLabel) || ui("readMore"))}</span>
          </div>
        </a>
        <ul class="news-list">${rest.map((n) => `
          <li><a class="news-item" href="${esc(n.link || "#")}">
            <span class="news-icon">${icon(n.icon)}</span>
            <span class="news-item-body">${meta(n)}<strong>${esc(t(n.title))}</strong><span class="news-text">${esc(t(n.text))}</span></span>
            <span class="news-arrow" aria-hidden="true">←</span>
          </a></li>`).join("")}
        </ul>`);
    }

    set("#audience", C.audience.map((a) => `<li>${esc(t(a))}</li>`).join(""));
    set("#values", C.values.map((v) => `<li><strong>${esc(t(v.name))}</strong><span>${esc(t(v.text))}</span></li>`).join(""));

    set("#communityList", C.communities.map((c) => `
      <article class="card card-${c.status}">
        <div class="card-top">${badge(c.status)}</div>
        <h3>${esc(t(c.name))}</h3>
        ${t(c.note) ? `<p class="card-note">${esc(t(c.note))}</p>` : ""}
      </article>`).join(""));

    set("#programList", C.programs.map(programCard).join(""));


    set("#faqList", (C.faq || []).map((f) => {
      const href = f.link && f.link.href && (f.link.href === "joinForm" ? "join.html" : f.link.href);
      const external = href && /^https?:/.test(href);
      return `<details class="faq-item">
        <summary>${esc(t(f.q))}</summary>
        <div class="faq-answer"><p>${esc(t(f.a))}</p>${href
          ? external ? ext(href, t(f.link.label), "card-link") : `<a class="card-link" href="${esc(href)}">${esc(t(f.link.label))}</a>`
          : ""}</div>
      </details>`;
    }).join(""));

    // Team overview: overlapping avatars + counts, computed from the team data
    const people = [C.founder, ...C.teams.flatMap((tm) => [tm.lead, ...tm.members].filter(Boolean))].map(asMember);
    const unis = new Set(people.map((p) => p.affiliation && p.affiliation.en).filter(Boolean));
    const teamsWithPeople = C.teams.filter((tm) => tm.lead || tm.members.length);
    // Founder, team leads and Jolan first; the others with photos in a random order (once per page load) so everyone gets a turn
    const firstNames = ["Jolan Nassir"];
    const isFirst = (p) => p === people[0] || C.teams.some((tm) => tm.lead && asMember(tm.lead).name.en === p.name.en) || firstNames.includes(p.name.en);
    if (!window.__avatarOrder) window.__avatarOrder = Object.fromEntries(people.map((p) => [p.name.en, Math.random()]));
    const rest = people.filter((p) => p.photo && !isFirst(p)).sort((a, b) => window.__avatarOrder[a.name.en] - window.__avatarOrder[b.name.en]);
    const firsts = people.filter((p) => isFirst(p) && p.photo).sort((a, b) => firstNames.includes(a.name.en) - firstNames.includes(b.name.en));
    const shown = [...firsts, ...rest, ...people.filter((p) => !p.photo)].slice(0, 9);
    set("#teamList", `
      <div class="avatar-stack">${shown.map((p) => photo(p, "avatar")).join("")}${people.length > shown.length ? `<span class="avatar avatar-more">+${people.length - shown.length}</span>` : ""}</div>
      <div class="team-stats">
        <div><strong>${people.length}</strong><span>${esc(ui("statVolunteers"))}</span></div>
        <div><strong>${teamsWithPeople.length}</strong><span>${esc(ui("statTeams"))}</span></div>
        <div><strong>${unis.size}</strong><span>${esc(ui("statUniversities"))}</span></div>
      </div>
      <ul class="chips team-chips">${teamsWithPeople.map((tm) => `<li><a href="team.html#team-${esc(tm.id)}">${esc(t(tm.name))}</a></li>`).join("")}</ul>`);
  }

  // Whole card links to the program's page
  const programHref = (p) => `program.html?p=${encodeURIComponent(p.id)}`;
  function programCard(p) {
    return `<a class="card program card-${p.status}" href="${programHref(p)}">
        <div class="card-top">${icon(p.icon)}${badge(p.status)}</div>
        <h3>${esc(t(p.name))}</h3>
        <p>${esc(t(p.text))}</p>
        <span class="card-link">${esc(ui("learnMore"))}</span>
      </a>`;
  }

  // Shared call-to-action buttons
  function buttons() {
    const L = C.links;
    return {
      join: `<a class="btn btn-primary" href="join.html">${esc(ui("joinForm"))}</a>`,
      whatsapp: L.whatsapp ? ext(L.whatsapp, ui("joinWhatsapp"), L.joinForm ? "btn btn-ghost" : "btn btn-primary") : "",
      ig: ext(L.instagram, ui("contactInstagram"), "btn btn-ghost"),
      mail: L.email ? `<a class="btn btn-ghost" href="mailto:${esc(L.email)}">${esc(ui("contactEmail"))}</a>` : ""
    };
  }

  // Highlighted call-out with an optional poster (opens in the lightbox)
  function announcement(an) {
    return `<div class="announce">
      ${an.poster ? `<div class="announce-poster"><button type="button" class="gallery-item" data-index="0" data-src="${esc(an.poster)}" data-caption="${esc(t(an.title))}"><img src="${esc(an.poster)}" alt="${esc(t(an.title))}"></button></div>` : ""}
      <div class="announce-body">
        ${t(an.badge) ? `<span class="announce-badge"><span class="pulse" aria-hidden="true"></span>${esc(t(an.badge))}</span>` : ""}
        <h2>${esc(t(an.title))}</h2>
        <p>${esc(t(an.text))}</p>
        <div class="announce-actions">
          ${an.embed ? `<button type="button" class="btn btn-primary form-open" data-embed="${esc(an.embed)}" data-title="${esc(t(an.title))}" data-link="${esc(an.link || "")}">${esc(ui("fillHere"))}</button>` : ""}
          ${an.link ? (an.link.startsWith("mailto:") ? `<a class="btn ${an.embed ? "btn-ghost" : "btn-primary"}" href="${esc(an.link)}">${esc(t(an.label))}</a>` : ext(an.link, an.embed ? ui("openInGoogle") : t(an.label), `btn ${an.embed ? "btn-ghost" : "btn-primary"}`)) : ""}
        </div>
      </div>
    </div>`;
  }

  function renderPrograms() {
    set("#allPrograms", C.programs.map(programCard).join(""));

    if (!$("#programHead")) return;
    const id = new URLSearchParams(location.search).get("p");
    const p = C.programs.find((x) => x.id === id);
    if (!p) {
      set("#programHead", `<h1>${esc(ui("programNotFound"))}</h1>`);
      set("#otherPrograms", C.programs.map(programCard).join(""));
      return;
    }
    document.title = `${t(p.name)} | SANAD`;

    const note = { forming: "noteForming", planned: "notePlanned" }[p.status];
    set("#programHead", `
      <div class="program-head-top">${icon(p.icon)}${badge(p.status)}</div>
      <h1>${esc(t(p.name))}</h1>
      <p class="lead narrow">${esc(t(p.intro || p.text))}</p>
      ${note ? `<p class="status-note status-note-${p.status}">${esc(ui(note))}</p>` : ""}
      ${(p.announcements || []).map(announcement).join("")}`);

    const team = p.team && C.teams.find((tm) => tm.id === p.team);
    const unis = C.communities;
    set("#programBody", [
      p.showCommunities && (C.meetups || []).some((m) => m.date) ? `<div class="program-block" id="meetupCal"></div>` : "",
      p.gallery && p.gallery.length ? `<div class="program-block">${gallery(p.gallery)}</div>` : "",
      (p.sections || []).length ? `<div class="program-sections">${p.sections.map((sec) => `
        <div class="program-section">
          <h2>${esc(t(sec.title))}</h2>
          <ul class="check-list">${sec.items.map((it) => `<li>${esc(t(it))}</li>`).join("")}</ul>
        </div>`).join("")}</div>` : "",
      p.showCommunities ? `<div class="program-block"><h2>${esc(ui("programUniversities"))}</h2>
        <ul class="uni-list">${unis.map((c) => `<li><span>${esc(t(c.name))}${t(c.note) ? `<small class="uni-note">${esc(t(c.note))}</small>` : ""}</span>${badge(c.status)}</li>`).join("")}</ul></div>` : "",
      p.showVideos ? `<div class="program-block"><h2>${esc(ui("spotlightEpisodes"))}</h2><div id="episodes"></div></div>` : "",
      team && team.lead ? `<div class="program-block"><h2>${esc(ui("programTeam"))}</h2>
        <div class="team">${person(team.lead, `${ui("teamLead")} · ${t(team.name)}`)}</div>
        <div class="actions"><a class="btn btn-ghost btn-small" href="team.html#team-${esc(team.id)}">${esc(ui("seeFullTeam"))}</a></div></div>` : ""
    ].join(""));

    const b = buttons();
    const join = p.cta !== "contact";
    set("#programCta", `
      <h2>${esc(t(p.ctaTitle) || ui(join ? "ctaJoinTitle" : "ctaContactTitle"))}</h2>
      <p>${esc(t(p.ctaText) || ui(join ? "ctaJoinText" : "ctaContactText"))}</p>
      <div class="actions">${p.ctaLink && p.ctaLink.href ? ext(p.ctaLink.href, t(p.ctaLink.label), "btn btn-primary") + b.ig : join ? b.join + b.whatsapp + b.ig : b.ig + b.mail}</div>`);

    set("#otherPrograms", C.programs.filter((x) => x !== p).map(programCard).join(""));
    drawMeetupCalendar();
  }

  // "SANAD around the world" map (data/map.json, switched on/off in Pages CMS).
  // The land outline (data/world.json) uses the Equal Earth projection; dots use the same formula.
  let world = null;
  const equalEarth = (lng, lat) => {
    const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
    const l = (lng * Math.PI) / 180, th = Math.asin(M * Math.sin((lat * Math.PI) / 180)), t2 = th * th, t6 = t2 * t2 * t2;
    return [(l * Math.cos(th)) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2))) * 100, -th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2)) * 100];
  };
  async function renderWorldMap() {
    const sec = $("#world");
    if (!sec) return;
    const places = ((C.worldMap && C.worldMap.places) || []).filter((p) => p.lat != null && p.lng != null && p.city);
    sec.hidden = !(C.worldMap && C.worldMap.enabled && places.length);
    if (sec.hidden) return;
    if (!world) {
      try { world = await (await fetch("data/world.json")).json(); } catch (e) { sec.hidden = true; return; }
    }
    const abroad = places.filter((p) => p.kind !== "home");
    const people = abroad.reduce((n, p) => n + (Number(p.count) || 0), 0);
    const countries = new Set(abroad.map((p) => t(p.country))).size;
    const label = (p) => `${t(p.city)}${p.kind === "home" ? "" : `، ${t(p.country)}`} · ${p.kind === "home" && t(p.note) ? t(p.note) : `${Number(p.count) || 0} ${ui("worldPeople")}`}`;
    const dots = places.slice().sort((a, b) => (b.count || 0) - (a.count || 0)).map((p) => {
      const [x, y] = equalEarth(Number(p.lng), Number(p.lat));
      const r = p.kind === "home" ? 5 : 2.6 + Math.sqrt(Number(p.count) || 1) * 1.3;
      return `<g class="wm-dot wm-${p.kind === "home" ? "home" : "abroad"}" tabindex="0" data-label="${esc(label(p))}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
        ${p.kind === "home" ? `<circle class="wm-pulse" r="${r}"/>` : ""}<circle r="${r.toFixed(1)}"/><title>${esc(label(p))}</title></g>`;
    }).join("");
    // places grouped by country, abroad only
    const byCountry = {};
    abroad.forEach((p) => { (byCountry[t(p.country)] = byCountry[t(p.country)] || []).push(p); });
    const home = places.filter((p) => p.kind === "home");
    $("#worldMap").innerHTML = `
      <p class="wm-stats"><strong>${people}</strong> ${esc(ui("worldStats"))} <strong>${countries}</strong> ${esc(ui("worldCountries"))}</p>
      <div class="wm-frame">
        <svg class="wm-svg" viewBox="${world.viewBox.join(" ")}" role="img" aria-label="${esc(ui("worldKicker"))}">
          <path class="wm-land" d="${world.land}"/>${dots}
        </svg>
        <div class="wm-tip" hidden></div>
      </div>
      <div class="wm-list">
        ${home.length ? `<div class="wm-group"><h3>${esc(ui("worldHome"))}</h3><ul>${home.map((p) => `<li><span>${esc(t(p.city))}</span><span class="wm-count">${esc(t(p.note) || p.count || "")}</span></li>`).join("")}</ul></div>` : ""}
        <div class="wm-group wm-group-wide"><h3>${esc(ui("worldAbroad"))}</h3><ul>${Object.keys(byCountry).sort((a, b) => a.localeCompare(b, lang)).map((c) =>
          `<li><span><strong>${esc(c)}</strong> · ${byCountry[c].map((p) => esc(t(p.city))).join("، ")}</span><span class="wm-count">${byCountry[c].reduce((n, p) => n + (Number(p.count) || 0), 0)}</span></li>`).join("")}</ul></div>
      </div>`;
    // tooltip on hover / tap / keyboard focus
    const frame = $("#worldMap .wm-frame"), tip = frame.querySelector(".wm-tip");
    const show = (g) => {
      const fr = frame.getBoundingClientRect(), r = g.getBoundingClientRect();
      tip.textContent = g.dataset.label; tip.hidden = false;
      tip.style.left = `${r.left + r.width / 2 - fr.left}px`; tip.style.top = `${r.top - fr.top}px`;
    };
    frame.querySelectorAll(".wm-dot").forEach((g) => {
      g.addEventListener("mouseenter", () => show(g));
      g.addEventListener("focus", () => show(g));
      g.addEventListener("click", () => show(g));
      g.addEventListener("mouseleave", () => { tip.hidden = true; });
      g.addEventListener("blur", () => { tip.hidden = true; });
    });
  }

  // Local meetups (data/meetups.json, edited in Pages CMS). Each one gets a registration page,
  // meetup.html?m=<date>-<university>; forms.js and the Google Apps Script build the same id.
  const slug = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "meetup";
  const meetupUni = (m) => C.communities.find((c) => c.name.ar === m.university);
  const meetupId = (m) => { const c = meetupUni(m); return `${m.date}-${slug(c && (c.short.en || c.name.en))}`; };
  const dayOf = (d) => { const [y, mo, da] = String(d).split("-").map(Number); return new Date(y, mo - 1, da); };
  const today = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
  const meetupOpen = (m) => m.date && m.open !== false && dayOf(m.date) >= today() && (!m.deadline || dayOf(m.deadline) >= today());
  const fmtDay = (d, opts) => dayOf(d).toLocaleDateString(lang === "en" ? "en-GB" : "ar-u-nu-latn", opts);

  // Monthly calendar of meetups (past ones included) + the chosen month's meetups as cards
  let calMonth = null; // first day of the month on show
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  function drawMeetupCalendar() {
    const box = $("#meetupCal");
    if (!box) return;
    const all = (C.meetups || []).filter((m) => m.date).sort((a, b) => (a.date + (a.start || "")).localeCompare(b.date + (b.start || "")));
    const months = all.map((m) => dayOf(m.date)).map((d) => new Date(d.getFullYear(), d.getMonth(), 1));
    const first = months[0], last = new Date(Math.max(months[months.length - 1], new Date(today().getFullYear(), today().getMonth(), 1)));
    if (!calMonth) { // open on the next meetup's month, else the current month
      const next = all.find(meetupOpen);
      const d = next ? dayOf(next.date) : today();
      calMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const y = calMonth.getFullYear(), mo = calMonth.getMonth();
    const loc = lang === "en" ? "en-GB" : "ar-u-nu-latn";
    const state = (m) => (meetupOpen(m) ? "open" : dayOf(m.date) < today() ? "past" : "closed");
    const inMonth = all.filter((m) => { const d = dayOf(m.date); return d.getFullYear() === y && d.getMonth() === mo; });
    const byDay = {};
    inMonth.forEach((m) => { (byDay[m.date] = byDay[m.date] || []).push(m); });
    const short = (m) => { const c = meetupUni(m); return c ? t(c.short) : m.university; };
    const weekdays = [...Array(7)].map((_, i) => new Date(2026, 1, 1 + i).toLocaleDateString(loc, { weekday: "short" })); // 1 Feb 2026 is a Sunday
    const lead = new Date(y, mo, 1).getDay(), days = new Date(y, mo + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(`<div class="cal-cell cal-empty"></div>`);
    for (let d = 1; d <= days; d++) {
      const key = ymd(new Date(y, mo, d)), list = byDay[key] || [];
      cells.push(`<div class="cal-cell${key === ymd(today()) ? " cal-today" : ""}${list.length ? " cal-has" : ""}">
        <span class="cal-num">${d}</span>
        ${list.map((m) => state(m) === "open"
          ? `<a class="cal-ev cal-open" href="meetup.html?m=${esc(meetupId(m))}" title="${esc(t(m.title) || short(m))}">${esc(short(m))}</a>`
          : `<span class="cal-ev cal-${state(m)}" title="${esc(t(m.title) || short(m))}">${esc(short(m))}</span>`).join("")}
      </div>`);
    }
    const canPrev = calMonth > first, canNext = calMonth < last;
    box.innerHTML = `
      <div class="cal-head">
        <h2>${esc(ui("meetupsCalendar"))}</h2>
        <div class="cal-nav">
          <button type="button" class="cal-btn" data-cal="-1" ${canPrev ? "" : "disabled"} aria-label="${esc(ui("calPrev"))}">‹</button>
          <strong>${esc(calMonth.toLocaleDateString(loc, { month: "long", year: "numeric" }))}</strong>
          <button type="button" class="cal-btn" data-cal="1" ${canNext ? "" : "disabled"} aria-label="${esc(ui("calNext"))}">›</button>
        </div>
      </div>
      <div class="cal-grid">${weekdays.map((w) => `<div class="cal-wd">${esc(w)}</div>`).join("")}${cells.join("")}</div>
      <div class="cal-legend"><span class="cal-key cal-open"></span>${esc(ui("calOpen"))}<span class="cal-key cal-past"></span>${esc(ui("calPast"))}</div>
      <div class="meetup-list">${inMonth.length ? inMonth.map((m) => {
        const c = meetupUni(m), st = state(m);
        const where = [c ? t(c.short) : m.university, t(m.place)].filter(Boolean).join(" · ");
        return `<div class="meetup-card meetup-${st}">
          <div class="meetup-date"><strong>${esc(fmtDay(m.date, { day: "numeric" }))}</strong><span>${esc(fmtDay(m.date, { month: "short" }))}</span></div>
          <div class="meetup-info">
            <h3>${esc(t(m.title) || `${ui("meetupDefault")} ${c ? t(c.short) : m.university}`)}</h3>
            <p>${esc([fmtDay(m.date, { weekday: "long" }), [m.start, m.end].filter(Boolean).join("–")].filter(Boolean).join(" · "))}</p>
            ${where ? `<p>${esc(where)}</p>` : ""}
            ${st === "open" && m.deadline ? `<p class="meetup-deadline">${esc(ui("meetupDeadline"))} ${esc(fmtDay(m.deadline, { day: "numeric", month: "long" }))}</p>` : ""}
          </div>
          ${st === "open" ? `<a class="btn btn-primary btn-small" href="meetup.html?m=${esc(meetupId(m))}">${esc(ui("meetupRegister"))}</a>`
            : `<span class="meetup-state">${esc(ui(st === "past" ? "calPast" : "calClosed"))}</span>`}
        </div>`;
      }).join("") : `<p class="muted">${esc(ui("calNone"))}</p>`}</div>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cal]");
    if (!b || !calMonth) return;
    calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + Number(b.dataset.cal), 1);
    drawMeetupCalendar();
  });

  // Mosaic photo gallery; items are paths or { src, caption: {ar,en} }. Clicking opens the lightbox.
  function gallery(photos) {
    if (!photos || !photos.length) return "";
    const items = photos.map((p) => (typeof p === "string" ? { src: p } : p));
    return `<div class="gallery-block">
      <div class="gallery-head">
        <h2>${esc(ui("galleryTitle"))}</h2>
        <span class="gallery-count">${items.length} ${esc(ui("photos"))}</span>
      </div>
      <div class="gallery">${items.map((it, i) => `
        <button type="button" class="gallery-item" data-index="${i}" data-src="${esc(it.src)}" data-caption="${esc(t(it.caption))}">
          <img src="${esc(it.src)}" alt="${esc(t(it.caption))}" loading="lazy">
          ${it.caption ? `<span class="gallery-caption">${esc(t(it.caption))}</span>` : ""}
        </button>`).join("")}</div>
    </div>`;
  }

  function renderTeamPage() {
    const teams = C.teams.filter((tm) => tm.lead || (tm.members || []).length || tm.showEmpty);

    set("#teamJump", teams.map((tm) => `<a href="#team-${esc(tm.id)}">${esc(t(tm.name))}</a>`).join(""));

    set("#founder", member(C.founder, ui("founder"), "member-founder"));

    set("#teamGroups", teams.map((tm) => `
      <section class="team-group" id="team-${esc(tm.id)}">
        <div class="team-group-head">
          <h2>${esc(t(tm.name))}</h2>
          <p class="muted">${esc(t(tm.text))}</p>
        </div>
        <div class="members">
          ${tm.lead ? member(tm.lead, ui("teamLead"), "member-lead") : ""}
          ${tm.members.map((m) => member(m)).join("")}
          ${tm.members.length ? "" : `<a class="member member-empty" href="#volunteerActions"><span class="member-photo"><span class="initial">+</span></span><figcaption><span>${esc(ui("teamEmpty"))}</span></figcaption></a>`}
        </div>
      </section>`).join(""));

  }

  function renderPastVolunteers() {
    const list = C.pastVolunteers || [];
    const section = $("#past-volunteers");
    if (section) section.hidden = !list.length;
    set("#pastVolunteers", list.map((p) => `<li>
      <span class="avatar">${esc(t(p.name).charAt(0))}</span>
      <span><strong>${esc(t(p.name))}</strong>${t(p.team) ? `<small>${esc(t(p.team))}</small>` : ""}</span>
    </li>`).join(""));
  }

  function renderSpotlight() {
    const eps = (C.videos || []).filter((v) => v.video);
    // Returns { src, kind } for YouTube (video or Shorts) and Instagram links
    const embed = (url) => {
      const u = String(url || "");
      let m = u.match(/youtube\.com\/shorts\/([\w-]{6,})/);
      if (m) return { src: `https://www.youtube-nocookie.com/embed/${m[1]}`, kind: "vertical" };
      m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
      if (m) return { src: `https://www.youtube-nocookie.com/embed/${m[1]}`, kind: "wide" };
      m = u.match(/instagram\.com\/(reel|p|tv)\/([\w-]+)/);
      if (m) return { src: `https://www.instagram.com/${m[1]}/${m[2]}/embed`, kind: "instagram" };
      return null;
    };
    const slides = eps.map((e, i) => {
      const v = embed(e.video || e.youtube || e.instagram);
      const cap = [t(e.field), t(e.affiliation)].filter(Boolean).map(esc).join(" · ");
      const frame = v
        ? `<div class="reel-frame reel-${v.kind}"><iframe src="${esc(v.src)}" loading="lazy" scrolling="no" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="${esc(t(e.name) || `${ui("episode")} ${i + 1}`)}"></iframe></div>`
        : "";
      const igLink = v && v.kind === "instagram" ? ext(e.video || e.instagram, ui("watchOnInstagram"), "episode-link") : "";
      return `<figure class="episode${v ? " episode-" + v.kind : ""}" data-index="${i}">
        ${frame}
        <figcaption>
          <span class="episode-num">${esc(ui("episode"))} ${i + 1}</span>
          ${t(e.name) ? `<strong>${esc(t(e.name))}</strong>` : ""}
          ${cap ? `<span class="episode-meta">${cap}</span>` : ""}
          ${igLink}
        </figcaption>
      </figure>`;
    });
    set("#episodes", eps.length
      ? `<div class="reel-carousel">
          <div class="rc-track">${slides.join("")}</div>
          ${eps.length > 1 ? `
          <button type="button" class="rc-btn rc-prev" aria-label="${esc(ui("previous"))}">‹</button>
          <button type="button" class="rc-btn rc-next" aria-label="${esc(ui("next"))}">›</button>
          <div class="rc-nav">
            <div class="rc-dots">${eps.map((_, i) => `<button type="button" class="rc-dot" data-index="${i}" aria-label="${esc(ui("episode"))} ${i + 1}"></button>`).join("")}</div>
            <span class="rc-counter"></span>
          </div>` : ""}
        </div>`
      : `<div class="empty"><p>${esc(ui("spotlightEmpty"))}</p>${ext(C.links.instagram, ui("spotlightWatch"), "btn btn-small btn-primary")}</div>`);
  }

  // Reel carousel: centre one slide at a time; arrows, dots and swipe move between slides
  function initCarousels() {
    document.querySelectorAll(".reel-carousel").forEach((root) => {
      const track = root.querySelector(".rc-track");
      const slides = [...track.querySelectorAll(".episode")];
      let active = 0;
      const mark = (i) => {
        active = i;
        slides.forEach((s, j) => s.classList.toggle("is-active", j === i));
        root.querySelectorAll(".rc-dot").forEach((d, j) => d.setAttribute("aria-current", j === i ? "true" : "false"));
        const counter = root.querySelector(".rc-counter");
        if (counter) counter.textContent = `${i + 1} ${ui("of")} ${slides.length}`;
        const prev = root.querySelector(".rc-prev"), next = root.querySelector(".rc-next");
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === slides.length - 1;
      };
      const goTo = (i) => {
        i = Math.max(0, Math.min(slides.length - 1, i));
        const s = slides[i];
        track.scrollTo({ left: track.scrollLeft + (s.getBoundingClientRect().left + s.offsetWidth / 2) - (track.getBoundingClientRect().left + track.clientWidth / 2), behavior: "smooth" });
        mark(i);
      };
      // the slide nearest the track's centre is the active one
      let raf;
      track.addEventListener("scroll", () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
          let best = 0, bestD = Infinity;
          slides.forEach((s, j) => {
            const r = s.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - mid);
            if (d < bestD) { bestD = d; best = j; }
          });
          if (best !== active) mark(best);
        });
      });
      root.querySelector(".rc-prev")?.addEventListener("click", () => goTo(active - 1));
      root.querySelector(".rc-next")?.addEventListener("click", () => goTo(active + 1));
      root.querySelectorAll(".rc-dot").forEach((d) => d.addEventListener("click", () => goTo(+d.dataset.index)));
      // clicking a side slide brings it to the centre
      slides.forEach((s, j) => s.addEventListener("click", (e) => { if (j !== active && !e.target.closest("a")) { e.preventDefault(); goTo(j); } }));
      mark(0);
    });
  }

  function renderShared() {
    const L = C.links;
    const b = buttons();
    set("#joinActions", b.join + b.whatsapp + b.ig + b.mail);
    set("#volunteerActions", L.volunteerForm ? ext(L.volunteerForm, ui("volunteerCta"), "btn btn-primary") : b.join + b.mail);

    const channels = [
      L.instagram && { k: "instagram", href: L.instagram, label: "Instagram", handle: "@we.are.sanad" },
      L.linkedin && { k: "linkedin", href: L.linkedin, label: "LinkedIn", handle: "SANAD Community" },
      L.youtube && { k: "youtube", href: L.youtube, label: "YouTube", handle: "SANAD" },
      L.email && { k: "email", href: "mailto:" + L.email, label: "Email", handle: L.email }
    ].filter(Boolean);
    const link = (c, inner, cls) => `<a class="${cls}" href="${esc(c.href)}"${c.k === "email" ? "" : ' target="_blank" rel="noopener"'}>${inner}</a>`;
    const COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';
    set("#findUs", channels.map((c) => {
      const inner = `${socialIcon(c.k)}<span><strong>${esc(c.label)}</strong><small>${esc(c.handle)}</small></span>`;
      // Email card gets a copy button next to the mailto link (a button can't sit inside a link)
      if (c.k === "email") return `<div class="find-card find-card-email">
          ${link(c, inner, "find-card-main")}
          <button type="button" class="copy-btn" data-copy="${esc(L.email)}" aria-label="${esc(ui("copyEmail"))}" title="${esc(ui("copyEmail"))}">${COPY}<span class="copy-label">${esc(ui("copy"))}</span></button>
        </div>`;
      return link(c, inner, "find-card");
    }).join(""));
    set("#social", channels.map((c) => link(c, `${socialIcon(c.k)}<span>${esc(c.label)}</span>`, "social-link")).join(""));
  }

  function render() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = ui(el.dataset.t); });
    // logos in the page's language: stacked on the homepage (logo.svg / logo-en.svg),
    // horizontal in the footer (logo-h-ar.svg / logo-h-en.svg)
    document.querySelectorAll("img.hero-logo, img.footer-logo").forEach((img) => {
      const wide = img.classList.contains("footer-logo");
      img.src = `images/brand/${wide ? "logo-h-" : "logo"}${lang === "en" ? (wide ? "en" : "-en") : (wide ? "ar" : "")}.svg`;
      img.alt = lang === "en" ? "Sanad Community for Researchers — SANAD" : "مجتمع سند للباحثات والباحثين — SANAD";
      if (img.hasAttribute("width")) { img.width = lang === "en" ? 457 : 396; img.height = lang === "en" ? 616 : 606; }
    });
    renderHome();
    renderWorldMap();
    renderTeamPage();
    renderPastVolunteers();
    renderPrograms(); // before renderSpotlight: the program page creates #episodes
    renderSpotlight();
    initCarousels();
    renderShared();
  }

  document.querySelector(".lang").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    try { localStorage.setItem("sanad-lang", lang); } catch (e) {}
    render();
    updateThemeButton();
  });

  // Embedded Google Form in a dialog (announcement boxes with an "embed" link)
  const formDialog = document.createElement("dialog");
  formDialog.className = "form-dialog";
  formDialog.innerHTML = `<div class="fd-head"><strong class="fd-title"></strong><a class="fd-ext" target="_blank" rel="noopener"></a><button type="button" class="fd-close">×</button></div><iframe title=""></iframe>`;
  document.body.appendChild(formDialog);
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".form-open");
    if (btn) {
      formDialog.querySelector(".fd-title").textContent = btn.dataset.title;
      const extLink = formDialog.querySelector(".fd-ext");
      extLink.hidden = !btn.dataset.link;
      extLink.href = btn.dataset.link || "#";
      extLink.textContent = ui("openInGoogle") + " ↗";
      formDialog.querySelector(".fd-close").setAttribute("aria-label", ui("close"));
      const frame = formDialog.querySelector("iframe");
      frame.title = btn.dataset.title;
      if (frame.src !== btn.dataset.embed) frame.src = btn.dataset.embed;
      formDialog.showModal();
    } else if (e.target === formDialog || e.target.classList.contains("fd-close")) formDialog.close();
  });

  // Lightbox for gallery photos, with previous/next
  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `<figure><img alt=""><figcaption></figcaption></figure>
    <button type="button" class="lb-btn lb-close">×</button>
    <button type="button" class="lb-btn lb-prev">‹</button>
    <button type="button" class="lb-btn lb-next">›</button>
    <span class="lb-counter"></span>`;
  document.body.appendChild(lightbox);
  let lbItems = [], lbIndex = 0;
  function showPhoto(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIndex];
    const img = lightbox.querySelector("img");
    img.classList.remove("lb-in"); void img.offsetWidth; img.classList.add("lb-in");
    img.src = it.dataset.src;
    lightbox.querySelector("figcaption").textContent = it.dataset.caption || "";
    lightbox.querySelector(".lb-counter").textContent = `${lbIndex + 1} ${ui("of")} ${lbItems.length}`;
    const multi = lbItems.length > 1;
    lightbox.querySelector(".lb-prev").hidden = !multi;
    lightbox.querySelector(".lb-next").hidden = !multi;
  }
  // In RTL the "next" arrow sits on the left, so visual direction follows reading direction
  const step = (dir) => showPhoto(lbIndex + dir);
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) {
      lbItems = [...item.closest(".gallery, .announce-poster").querySelectorAll(".gallery-item")];
      lightbox.querySelector(".lb-close").setAttribute("aria-label", ui("close"));
      showPhoto(+item.dataset.index);
      lightbox.showModal();
    } else if (e.target === lightbox || e.target.classList.contains("lb-close")) lightbox.close();
    else if (e.target.classList.contains("lb-next")) step(1);
    else if (e.target.classList.contains("lb-prev")) step(-1);
  });
  lightbox.addEventListener("keydown", (e) => {
    const rtl = document.documentElement.dir === "rtl";
    if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    if (e.key === "ArrowRight") step(rtl ? -1 : 1);
  });

  // Copy buttons (e.g. the email address)
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      // fallback for pages opened as local files
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) {}
      ta.remove();
      return ok;
    }
  }
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;
    const ok = await copyText(btn.dataset.copy);
    const label = btn.querySelector(".copy-label");
    label.textContent = ui(ok ? "copied" : "copyFailed");
    btn.classList.toggle("is-copied", ok);
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { label.textContent = ui("copy"); btn.classList.remove("is-copied"); }, 2000);
  });

  // Homepage popup promoting a program; shown once per visitor (per announcement title)
  function initPopup() {
    const cfg = C.popup;
    if (!cfg || !cfg.enabled || !document.querySelector(".hero")) return;
    const p = C.programs.find((x) => x.id === cfg.program);
    const an = p && (p.announcements || [])[0];
    if (!an) return;
    // Shown on up to maxShows visits; clicking through to the program stops it for good
    const key = "sanad-popup-" + (an.title && an.title.en || p.id);
    const max = cfg.maxShows || 5;
    let shown = 0;
    try { shown = parseInt(localStorage.getItem(key) || "0", 10) || 0; } catch (e) {}
    if (shown >= max) return;
    try { localStorage.setItem(key, String(shown + 1)); } catch (e) {}
    const box = document.createElement("aside");
    box.className = "promo";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-live", "polite");
    const dismiss = (forGood) => {
      box.classList.remove("is-open");
      if (forGood) try { localStorage.setItem(key, String(max)); } catch (e) {}
      setTimeout(() => box.remove(), 400);
    };
    const draw = () => {
      box.setAttribute("aria-label", t(an.title));
      box.innerHTML = `
        ${an.poster ? `<img class="promo-poster" src="${esc(an.poster)}" alt="">` : ""}
        <div class="promo-body">
          ${t(an.badge) ? `<span class="announce-badge"><span class="pulse" aria-hidden="true"></span>${esc(t(an.badge))}</span>` : ""}
          <strong>${esc(t(an.title))}</strong>
          <div class="promo-actions">
            ${an.link ? ext(an.link, t(an.label), "btn btn-primary btn-small promo-go") : ""}
            <a class="promo-more" href="program.html?p=${esc(p.id)}">${esc(ui("popupDetails"))}</a>
          </div>
        </div>
        <button type="button" class="promo-close" aria-label="${esc(ui("close"))}">×</button>`;
    };
    draw();
    box.addEventListener("click", (e) => {
      if (e.target.closest(".promo-go, .promo-more")) dismiss(true);
      else if (e.target.closest(".promo-close")) dismiss(false);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && box.isConnected) dismiss(false); });
    document.querySelector(".lang").addEventListener("click", () => box.isConnected && draw());
    document.body.appendChild(box);
    setTimeout(() => box.classList.add("is-open"), (cfg.delaySeconds || 3) * 1000);
  }

  // Floating light/dark toggle; follows the system setting until the visitor picks a theme
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const themeBtn = document.createElement("button");
  themeBtn.type = "button";
  themeBtn.className = "theme-toggle";
  document.body.appendChild(themeBtn);
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : darkQuery.matches);
  function updateThemeButton() {
    const dark = isDark();
    themeBtn.innerHTML = dark ? SUN : MOON;
    const label = ui(dark ? "lightMode" : "darkMode");
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
  }
  themeBtn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("sanad-theme", next); } catch (e) {}
    updateThemeButton();
  });
  darkQuery.addEventListener("change", updateThemeButton);

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
  });

  render();
  updateThemeButton();
  initPopup();

  // Sections are filled after the data loads, so the browser's own jump to
  // #faq (etc.) lands too early when arriving from another page. Redo it, and
  // keep it aligned while images and embeds load, until the visitor scrolls.
  const hashTarget = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (hashTarget) {
    const align = () => hashTarget.scrollIntoView({ behavior: "instant" });
    const ro = new ResizeObserver(align);
    const stop = () => { ro.disconnect(); ["wheel", "touchstart", "keydown", "mousedown"].forEach((ev) => removeEventListener(ev, stop)); };
    ["wheel", "touchstart", "keydown", "mousedown"].forEach((ev) => addEventListener(ev, stop, { passive: true }));
    ro.observe(document.body);
    requestAnimationFrame(align);
    setTimeout(stop, 4000);
  }
})();
