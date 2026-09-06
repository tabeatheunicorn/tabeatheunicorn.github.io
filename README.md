# tabeatheunicorn.space

Personal profile page. Static HTML, no build step, no dependencies — GitHub Pages serves
the repository root as-is.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page, including the JSON-LD entity graph in the head. |
| `impressum.html` | Impressum (§ 5 DDG). |
| `datenschutz.html` | Privacy notice (Art. 13 GDPR). |
| `style.css` | Shared stylesheet for all three pages. |
| `theme.js` | Colour-theme toggle, shared. |
| `llms.txt` | Machine-readable profile following the [llms.txt](https://llmstxt.org/) convention. |
| `fonts/` | IBM Plex WOFF2, latin subset, SIL OFL 1.1. |
| `.nojekyll` | Disables Jekyll so files are served verbatim. |

Each page applies the saved theme with a small blocking snippet in `<head>` before first
paint; `theme.js` only wires up the button. Moving that snippet into `theme.js` would
reintroduce a flash of the wrong theme.

## Entity model

The JSON-LD graph in `index.html` and the prose in `llms.txt` express the same relations
and must stay in sync. The rule they follow:

- **Consolidated into one node** — identifiers denoting this person: the current name, the
  previous surname (Röthemeyer), git author name variants, and the GitHub account. These
  are `alternateName` and `sameAs` on `#person`. Talks and the thesis are published under
  the earlier surname, which is exactly why the consolidation is worth stating.
- **Linked as separate nodes** — everything else. Employer, collaborators, projects and
  the university each carry their own `@id` and connect through a typed edge (`worksFor`,
  `knows`, `contributor`, `alumniOf`, `performerIn`).

`sameAs` is what crawlers read as *"this URL is the same entity"*. Putting a collaborator's
or a project's domain there would assert something false and corrupt both records, so those
relations use `knows` and `contributor` instead. For the same reason "AI-Gruppe" is **not**
modelled as an employer: it is an umbrella label for a group of companies, not a legal
entity. The employer is Auto-Intern GmbH.

Every factual claim traces to a source: commit counts are deduplicated by `origin` remote,
the talks and thesis carry primary-source identifiers (GSI Indico, PANDA registry
`TH-BAC-2017-007`), and claims that could not be verified were left out rather than
approximated.

## Local preview

Root-relative links (`/llms.txt`) break under `file://`, so preview over HTTP. Any static
server works; this needs no dependencies:

```
node -e "const h=require('http'),f=require('fs'),p=require('path');h.createServer((q,s)=>{const r=q.url==='/'?'/index.html':q.url.split('?')[0];f.readFile(p.join('.',r),(e,b)=>e?s.writeHead(404).end():s.writeHead(200).end(b))}).listen(8787)"
```

## Still open

- **Postal address.** The Impressum currently names Bochum and offers the full address on
  request. § 5 DDG expects a complete, ladungsfähige address to be directly available — the
  "on request" formulation is a stopgap, not a settled reading of the rule. Add the street
  and postcode to `impressum.html` and `datenschutz.html` when ready, and have both pages
  reviewed by someone qualified before relying on them.
- **Data Privacy Framework.** `datenschutz.html` cites Microsoft's DPF certification as the
  basis for the US transfer. Certifications can be withdrawn — re-check the entry on
  dataprivacyframework.gov periodically.
- **Reciprocal link.** `maxclerkwell.tech` should link back with `rel="colleague"` (XFN)
  and/or a `knows` edge in its own JSON-LD pointing at
  `https://tabeatheunicorn.space/#person`. A mutual assertion is stronger evidence than
  a one-directional one.

  Never `rel="me"` in either direction. `rel="me"` asserts *"this URL is the same person"* —
  XFN and IndieAuth consumers treat it as an identity claim, so using it between two
  different people is precisely the conflation this model avoids. On this site `rel="me"`
  appears only on the GitHub links.
- **Headline figures** come from a scan of local checkouts, deduplicated by `origin` remote:
  5,528 commits across 30 distinct repositories. Both are floors — they only cover
  repositories cloned on one machine.
- **`knowsLanguage`** lists German and English. Add others if they belong on the page.
