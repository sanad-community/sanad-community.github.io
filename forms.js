/*
  Forms in the site's design (join, Sanadak mentees, Sanadak mentors).
  Answers are sent straight to the matching Google Form (and its Google Sheet); the website stores nothing.

  The questions come from data/forms/<key>.json, which scripts/sync_forms.py refreshes daily from the
  live Google Forms, so changes made in Google Forms reach the site by themselves.
  English labels, hints and page texts live in data/forms/i18n.json (editable in Pages CMS);
  a question without an English label is shown in Arabic.
  If a form uses a question type this page can't show, the embedded Google Form is shown instead.
  Which form a page shows: <div id="siteForm" data-form="join"> or form.html?f=mentee
*/
(async function () {
  const TEXT = {
    optional: { ar: "اختياري", en: "Optional" },
    choose: { ar: "اختاروا…", en: "Choose…" },
    submit: { ar: "إرسال", en: "Submit" },
    sending: { ar: "جارٍ الإرسال…", en: "Sending…" },
    errRequired: { ar: "يرجى تعبئة هذا الحقل", en: "Please fill in this field" },
    errEmail: { ar: "يرجى كتابة بريد إلكتروني صحيح", en: "Please enter a valid email" },
    errYear: { ar: "يرجى كتابة سنة صحيحة (مثلًا 1998)", en: "Please enter a valid year (e.g. 1998)" },
    errSend: { ar: "تعذّر الإرسال. يمكنكم المحاولة مجددًا أو استخدام نموذج Google.", en: "Couldn't send. Please try again or use the Google Form." },
    doneTitle: { ar: "شكرًا لكم! 💚", en: "Thank you! 💚" },
    doneHome: { ar: "العودة إلى الرئيسية", en: "Back to home" },
    privacy: { ar: "تُرسل الإجابات مباشرة إلى نموذج Google الخاص بمجتمع سند، ولا يحفظ الموقع أي معلومات.", en: "Answers go directly to SANAD's Google Form; the website stores nothing." },
    google: { ar: "تفضّلون نموذج Google؟", en: "Prefer the Google Form?" },
    notFound: { ar: "لم نجد هذا النموذج.", en: "We couldn't find this form." },
  };

  const root = document.getElementById("siteForm");
  if (!root) return;
  const key = root.dataset.form || new URLSearchParams(location.search).get("f");
  const lang = () => (document.documentElement.lang === "en" ? "en" : "ar");
  const L = (o) => o[lang()] || o.ar;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // bilingual text node: swapped in place when the language changes, so typed answers are kept
  const bi = (o) => `<span data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</span>`;
  const relabel = () => document.querySelectorAll("#siteForm [data-ar], .form-hero [data-ar], title[data-ar]").forEach((el) => { el.textContent = el.dataset[lang()] || el.dataset.ar; });
  new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  // Build the form from the synced Google Form + translations
  let F;
  try {
    const [synced, i18n] = await Promise.all([`data/forms/${key}.json`, "data/forms/i18n.json"].map((u) => fetch(u, { cache: "no-cache" }).then((r) => {
      if (!r.ok) throw new Error(u);
      return r.json();
    })));
    const tr = (i18n.forms || []).find((x) => x.key === key) || {};
    const trFields = Object.fromEntries((tr.fields || []).map((f) => [f.id, f]));
    const pair = (o, fallbackAr) => ({ ar: (o && o.ar) || fallbackAr || (o && o.en) || "", en: (o && o.en) || (o && o.ar) || fallbackAr || "" });
    const tidy = (v) => String(v).replace(/\\/g, "/").replace(/\s+/g, " ").trim();
    F = {
      ...synced,
      kicker: pair(tr.kicker), title: pair(tr.title), intro: pair(tr.intro), done: pair(tr.done),
      groups: synced.groups.map((g, gi) => ({
        ...pair((tr.groups || [])[gi], g.title || ((tr.groups || [])[gi] || {}).ar),
        fields: g.fields.map((f) => {
          const x = trFields[f.id] || {};
          const opts = Object.fromEntries((x.options || []).map((o) => [o.value, o]));
          return {
            ...f, ar: f.label, en: x.en || f.label, hint: x.hint || (f.hint ? { ar: f.hint, en: f.hint } : null),
            showIf: x.showIf, wide: x.wide,
            options: f.options && f.options.map((v) => ({ value: v, ar: (opts[v] && opts[v].ar) || tidy(v), en: (opts[v] && opts[v].en) || tidy(v) })),
          };
        }),
      })),
    };
  } catch (e) {
    root.innerHTML = `<p class="lead">${bi(TEXT.notFound)}</p>`;
    return;
  }
  document.getElementById("formKicker").innerHTML = bi(F.kicker);
  // Safety net: a question type we can't render -> show the Google Form itself
  if (F.unsupported && F.unsupported.length) {
    document.getElementById("formTitle").innerHTML = bi(F.title);
    document.getElementById("formIntro").innerHTML = bi(F.intro);
    root.innerHTML = `<iframe class="jf-embed" src="${esc(F.embed)}" title="${esc(L(F.title))}"></iframe>`;
    return;
  }
  document.getElementById("formTitle").innerHTML = bi(F.title);
  document.getElementById("formIntro").innerHTML = bi(F.intro);
  const titleEl = document.querySelector("title");
  titleEl.dataset.ar = `${F.title.ar} | SANAD`; titleEl.dataset.en = `${F.title.en} | SANAD`;
  titleEl.textContent = titleEl.dataset[lang()];

  function fieldHtml(f) {
    const name = `entry.${f.id}`;
    const star = f.required ? ' <span class="jf-req" aria-hidden="true">*</span>' : ` <span class="jf-opt">(${bi(TEXT.optional)})</span>`;
    const hint = f.hint ? `<span class="jf-hint">${bi(f.hint)}</span>` : "";
    const req = f.required ? " required" : "";
    const cls = `jf-field${f.wide || f.type === "textarea" || f.type === "radio" ? " jf-wide" : ""}`;
    if (f.type === "checkbox") {
      return `<fieldset class="${cls} jf-wide" data-id="${f.id}"${f.showIf ? " hidden" : ""}><legend class="jf-label">${bi(f)}${star}</legend>${hint}
        <div class="jf-choices">${f.options.map((o) => `<label class="jf-choice"><input type="checkbox" name="${name}" value="${esc(o.value)}"><span data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</span></label>`).join("")}</div>
        <p class="jf-error" aria-live="polite"></p></fieldset>`;
    }
    if (f.type === "radio") {
      return `<fieldset class="${cls}" data-id="${f.id}"${f.showIf ? " hidden" : ""}><legend class="jf-label">${bi(f)}${star}</legend>${hint}
        <div class="jf-choices">${f.options.map((o, i) => `<label class="jf-choice"><input type="radio" name="${name}" value="${esc(o.value)}"${i === 0 ? req : ""}><span data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</span></label>`).join("")}</div>
        <p class="jf-error" aria-live="polite"></p></fieldset>`;
    }
    let input;
    if (f.type === "select") {
      input = `<select id="f${f.id}" name="${name}"${req}><option value="" data-ar="${esc(TEXT.choose.ar)}" data-en="${esc(TEXT.choose.en)}">${esc(L(TEXT.choose))}</option>${f.options.map((o) => `<option value="${esc(o.value)}" data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</option>`).join("")}</select>`;
    } else if (f.type === "textarea") {
      input = `<textarea id="f${f.id}" name="${name}" rows="3"${req}></textarea>`;
    } else {
      const type = f.type === "year" ? "text" : f.type;
      const extra = f.type === "year" ? ' inputmode="numeric" maxlength="4"' : f.type === "tel" ? ' inputmode="tel" dir="ltr"' : f.type === "email" ? ' dir="ltr"' : "";
      input = `<input id="f${f.id}" name="${name}" type="${type}"${f.auto ? ` autocomplete="${f.auto}"` : ""}${extra}${req}>`;
    }
    return `<div class="${cls}" data-id="${f.id}"${f.showIf ? " hidden" : ""}><label class="jf-label" for="f${f.id}">${bi(f)}${star}</label>${hint}${input}<p class="jf-error" aria-live="polite"></p></div>`;
  }

  root.innerHTML = `
    <form class="jf" novalidate>
      ${F.groups.map((g, i) => `
        <section class="jf-group">
          <h2><span class="jf-step">${i + 1}</span>${bi(g)}</h2>
          <div class="jf-grid">${g.fields.map(fieldHtml).join("")}</div>
        </section>`).join("")}
      <div class="jf-footer">
        <button type="submit" class="btn btn-primary jf-submit">${bi(TEXT.submit)}</button>
        <p class="jf-send-error" aria-live="polite"></p>
        <p class="jf-privacy">${bi(TEXT.privacy)} <a href="${F.google}" target="_blank" rel="noopener">${bi(TEXT.google)}</a></p>
      </div>
    </form>
    <div class="jf-done" hidden>
      <div class="jf-done-icon" aria-hidden="true">✓</div>
      <h2>${bi(TEXT.doneTitle)}</h2>
      <p>${bi(F.done)}</p>
      <a class="btn btn-primary" href="index.html">${bi(TEXT.doneHome)}</a>
    </div>`;

  const form = root.querySelector("form");
  const all = F.groups.flatMap((g) => g.fields);

  // conditional fields (e.g. "other institution")
  const syncConditional = () => all.filter((f) => f.showIf).forEach((f) => {
    const src = form.elements[`entry.${f.showIf.id}`];
    const show = !!src && src.value === f.showIf.value;
    const box = form.querySelector(`.jf-field[data-id="${f.id}"]`);
    box.hidden = !show;
  });
  form.addEventListener("change", syncConditional);

  // all chosen/typed values of a question (checkboxes can have several)
  const values = (f) => {
    if (f.type === "checkbox") return [...form.querySelectorAll(`input[name="entry.${f.id}"]:checked`)].map((i) => i.value);
    const el = form.elements[`entry.${f.id}`];
    const v = ((el && el.value) || "").trim();
    return v ? [v] : [];
  };

  function check(f) {
    const box = form.querySelector(`.jf-field[data-id="${f.id}"]`);
    if (box.hidden) return true;
    const value = values(f).join(",");
    let err = "";
    if (f.required && !value) err = L(TEXT.errRequired);
    else if (value && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = L(TEXT.errEmail);
    else if (value && f.type === "year" && !/^(19|20)\d{2}$/.test(value)) err = L(TEXT.errYear);
    box.classList.toggle("has-error", !!err);
    box.querySelector(".jf-error").textContent = err;
    return !err;
  }
  form.addEventListener("focusout", (e) => {
    const box = e.target.closest(".jf-field");
    if (box && box.classList.contains("has-error")) check(all.find((f) => f.id === box.dataset.id));
  });
  form.addEventListener("change", (e) => {
    const box = e.target.closest(".jf-field");
    if (box && box.classList.contains("has-error")) check(all.find((f) => f.id === box.dataset.id));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bad = all.filter((f) => !check(f));
    if (bad.length) {
      const first = form.querySelector(`.jf-field[data-id="${bad[0].id}"]`);
      first.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = first.querySelector("input, select, textarea");
      if (input) input.focus({ preventScroll: true });
      return;
    }
    const btn = form.querySelector(".jf-submit");
    btn.disabled = true;
    btn.innerHTML = bi(TEXT.sending);
    const body = new URLSearchParams();
    all.forEach((f) => {
      if (form.querySelector(`.jf-field[data-id="${f.id}"]`).hidden) return;
      values(f).forEach((v) => body.append(`entry.${f.id}`, v));
    });
    // Google Forms with section breaks expect every page in the history
    body.append("pageHistory", F.pageHistory);
    body.append("fvv", "1");
    try {
      // Google doesn't allow reading the response cross-origin; a network error is the only failure we can see
      await fetch(F.action, { method: "POST", mode: "no-cors", body });
      form.hidden = true;
      const done = root.querySelector(".jf-done");
      done.hidden = false;
      done.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = bi(TEXT.submit);
      form.querySelector(".jf-send-error").textContent = L(TEXT.errSend);
    }
  });
})();
