"""Read the live Google Forms and write data/forms/<key>.json for the site's own form pages.

Runs daily on GitHub (.github/workflows/sync-forms.yml) and can be run by hand:
    python3 scripts/sync_forms.py
Only the standard library is used. Question text, options and required flags come from Google;
English labels and extras (hints, conditional fields) come from data/forms/i18n.json.
"""
import json, re, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FORMS_DIR = ROOT / "data" / "forms"

# Google Forms item types
TEXT, PARAGRAPH, RADIO, DROPDOWN, CHECKBOX, SCALE, SECTION = 0, 1, 2, 3, 4, 5, 8
DISPLAY_ONLY = {6, 11, 12}  # text blocks, images, videos: nothing to answer


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (SANAD form sync)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8")


def clean(s):
    return re.sub(r"\s+", " ", (s or "").replace("\\", "/")).strip().strip(":").strip()


def input_type(title):
    t = title.lower()
    if "بريد" in title or "email" in t: return "email"
    if "هاتف" in title or "phone" in t: return "tel"
    if "سنة الولادة" in title or "birth" in t: return "year"
    return "text"


def parse(html):
    m = re.search(r"FB_PUBLIC_LOAD_DATA_ = (.*?);</script>", html, re.S)
    if not m:
        raise ValueError("form data not found (is the form public and not requiring sign-in?)")
    items = json.loads(m.group(1))[1][1] or []
    groups, unsupported = [{"title": None, "fields": []}], []
    for q in items:
        qtype, title = q[3], q[1] or ""
        if qtype == SECTION:
            groups.append({"title": clean(title), "fields": []})
            continue
        if qtype in DISPLAY_ONLY or not q[4]:
            continue
        entry = q[4][0]
        eid, opts, required = str(entry[0]), entry[1] or [], bool(entry[2])
        field = {"id": eid, "label": clean(title), "required": required}
        if q[2]:
            field["hint"] = q[2].strip()
        if qtype == TEXT:
            field["type"] = input_type(title)
        elif qtype == PARAGRAPH:
            field["type"] = "textarea"
        elif qtype in (RADIO, DROPDOWN, CHECKBOX, SCALE):
            if any(len(o) > 4 and o[4] for o in opts):  # "Other: ___" free-text option
                unsupported.append(f"{title} (other option)")
            field["type"] = {RADIO: "radio", DROPDOWN: "select", CHECKBOX: "checkbox", SCALE: "radio"}[qtype]
            field["options"] = [o[0] for o in opts if o and o[0] not in (None, "")]
        else:
            unsupported.append(f"{title} (type {qtype})")
            continue
        groups[-1]["fields"].append(field)
    groups = [g for g in groups if g["fields"]]
    pages = 1 + sum(1 for q in items if q[3] == SECTION)
    return groups, pages, unsupported


def main():
    sources = json.loads((FORMS_DIR / "sources.json").read_text())["forms"]
    changed, failed = [], []
    for src in sources:
        try:
            groups, pages, unsupported = parse(fetch(src["url"]))
        except Exception as e:  # keep the last good copy if Google is unreachable
            failed.append(f"{src['key']}: {e}")
            continue
        out = {
            "action": re.sub(r"/viewform.*$", "/formResponse", src["url"]),
            "embed": re.sub(r"/viewform.*$", "/viewform?embedded=true", src["url"]),
            "google": src["google"],
            "pageHistory": ",".join(str(i) for i in range(pages)),
            "unsupported": unsupported,
            "groups": groups,
        }
        path = FORMS_DIR / f"{src['key']}.json"
        text = json.dumps(out, ensure_ascii=False, indent=2) + "\n"
        if not path.exists() or path.read_text() != text:
            path.write_text(text)
            changed.append(src["key"])
        print(f"{src['key']}: {sum(len(g['fields']) for g in groups)} questions, {pages} page(s)"
              + (f", unsupported: {unsupported}" if unsupported else ""))
    print("changed:", ", ".join(changed) or "none")
    if failed:
        print("failed:", *failed, sep="\n  ")
        sys.exit(1 if len(failed) == len(sources) else 0)


if __name__ == "__main__":
    main()
