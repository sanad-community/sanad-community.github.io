(function () {
  const C = window.SANAD;
  let lang = "ar";
  try { lang = localStorage.getItem("sanad-lang") || "ar"; } catch (e) {}

  const t = (v) => (v && typeof v === "object" ? v[lang] || v.ar : v || "");
  const ui = (k) => t(C.ui[k]);
  const $ = (s) => document.querySelector(s);
  // Pages share this script; sections missing from the current page are skipped.
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = (href, label, cls) => `<a${cls ? ` class="${cls}"` : ""} href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;

  const STATUS = { active: "statusActive", forming: "statusForming", planned: "statusPlanned" };
  const badge = (s) => `<span class="badge badge-${s}">${esc(ui(STATUS[s]))}</span>`;

  const ICONS = {
    community: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M14 14.5c.9-.6 1.9-1 3-1 2.5 0 4 2 4 4.5"/>',
    mentor: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/>',
    network: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="12" cy="10" r="2"/><path d="M6.7 7l3.6 2M17.3 7l-3.6 2M12 12v4"/>',
    growth: '<path d="M4 20h16M7 16v-4M12 16V8M17 16V5"/>',
    spotlight: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
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

  const fmtDate = (d) => {
    try { return new Date(d + "T00:00:00").toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "long", year: "numeric" }); }
    catch (e) { return d; }
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
    const lines = [sub, t(m.role), t(m.affiliation)].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("");
    return `<div class="person${extraClass ? " " + extraClass : ""}">${avatar}<div><strong>${esc(name)}${profileLink(m)}</strong>${lines}</div></div>`;
  }

  // Photo card (team page)
  function member(p, tag, extraClass) {
    const m = asMember(p);
    const name = t(m.name);
    const lines = [t(m.role), t(m.affiliation)].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("");
    return `<figure class="member${extraClass ? " " + extraClass : ""}">
      ${photo(m, "member-photo")}
      ${tag ? `<span class="member-tag">${esc(tag)}</span>` : ""}
      <figcaption><strong>${esc(name)}${profileLink(m)}</strong>${lines}</figcaption>
    </figure>`;
  }

  function renderHome() {

    set("#audience", C.audience.map((a) => `<li>${esc(t(a))}</li>`).join(""));
    set("#values", C.values.map((v) => `<li><strong>${esc(t(v.name))}</strong><span>${esc(t(v.text))}</span></li>`).join(""));

    set("#communityList", C.communities.map((c) => `
      <article class="card card-${c.status}">
        <div class="card-top">${badge(c.status)}</div>
        <h3>${esc(t(c.name))}</h3>
      </article>`).join(""));

    set("#programList", C.programs.map(programCard).join(""));

    const up = C.events.upcoming;
    set("#upcoming", up.length
      ? up.map((e) => `
        <article class="event">
          ${e.date ? `<time>${esc(fmtDate(e.date))}</time>` : ""}
          <h4>${esc(t(e.title))}</h4>
          ${e.place ? `<p class="muted">${esc(t(e.place))}</p>` : ""}
          ${e.text ? `<p>${esc(t(e.text))}</p>` : ""}
          ${e.link ? ext(e.link, ui("register"), "btn btn-small btn-primary") : ""}
        </article>`).join("")
      : `<div class="empty"><p>${esc(ui("upcomingEmpty"))}</p>${ext(C.links.instagram, "@we.are.sanad", "btn btn-small btn-ghost")}</div>`);

    set("#past", C.events.past.map((e) => `
      <li><h4>${esc(t(e.title))}</h4><p class="muted">${esc(t(e.place))}${e.date ? " · " + esc(fmtDate(e.date)) : ""}</p><p>${esc(t(e.text))}</p></li>`).join(""));

    set("#faqList", (C.faq || []).map((f) => {
      const href = f.link && (f.link.href === "joinForm" ? C.links.joinForm : f.link.href);
      const external = href && /^https?:/.test(href);
      return `<details class="faq-item">
        <summary>${esc(t(f.q))}</summary>
        <div class="faq-answer"><p>${esc(t(f.a))}</p>${href
          ? external ? ext(href, t(f.link.label), "card-link") : `<a class="card-link" href="${esc(href)}">${esc(t(f.link.label))}</a>`
          : ""}</div>
      </details>`;
    }).join(""));

    set("#teamList",
      person(C.founder, ui("founder")) +
      C.teams.filter((tm) => tm.lead).map((tm) => person(tm.lead, t(tm.name))).join(""));
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
      join: L.joinForm ? ext(L.joinForm, ui("joinForm"), "btn btn-primary") : "",
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
        ${an.badge ? `<span class="announce-badge"><span class="pulse" aria-hidden="true"></span>${esc(t(an.badge))}</span>` : ""}
        <h2>${esc(t(an.title))}</h2>
        <p>${esc(t(an.text))}</p>
        ${an.link ? ext(an.link, t(an.label), "btn btn-primary") : ""}
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
      ${p.announcement ? announcement(p.announcement) : ""}`);

    const team = p.team && C.teams.find((tm) => tm.id === p.team);
    const unis = C.communities;
    set("#programBody", [
      p.gallery ? `<div class="program-block">${gallery(p.gallery)}</div>` : "",
      (p.sections || []).length ? `<div class="program-sections">${p.sections.map((sec) => `
        <div class="program-section">
          <h2>${esc(t(sec.title))}</h2>
          <ul class="check-list">${sec.items.map((it) => `<li>${esc(t(it))}</li>`).join("")}</ul>
        </div>`).join("")}</div>` : "",
      p.showCommunities ? `<div class="program-block"><h2>${esc(ui("programUniversities"))}</h2>
        <ul class="uni-list">${unis.map((c) => `<li><span>${esc(t(c.name))}</span>${badge(c.status)}</li>`).join("")}</ul></div>` : "",
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
      <div class="actions">${p.ctaLink ? ext(p.ctaLink.href, t(p.ctaLink.label), "btn btn-primary") + b.ig : join ? b.join + b.whatsapp + b.ig : b.ig + b.mail}</div>`);

    set("#otherPrograms", C.programs.filter((x) => x !== p).map(programCard).join(""));
  }

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
    const teams = C.teams.filter((tm) => tm.lead || tm.members.length);

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

  function renderSpotlight() {
    const eps = C.spotlight || [];
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
          ${e.name ? `<strong>${esc(t(e.name))}</strong>` : ""}
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
    set("#findUs", channels.map((c) => link(c, `${socialIcon(c.k)}<span><strong>${esc(c.label)}</strong><small>${esc(c.handle)}</small></span>`, "find-card")).join(""));
    set("#social", channels.map((c) => link(c, `${socialIcon(c.k)}<span>${esc(c.label)}</span>`, "social-link")).join(""));
  }

  function render() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = ui(el.dataset.t); });
    renderHome();
    renderTeamPage();
    renderPrograms(); // before renderSpotlight: the program page creates #episodes
    renderSpotlight();
    initCarousels();
    renderShared();
  }

  document.querySelector(".lang").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    try { localStorage.setItem("sanad-lang", lang); } catch (e) {}
    render();
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
})();
