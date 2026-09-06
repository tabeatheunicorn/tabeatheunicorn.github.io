# tabeatheunicorn.github.io

Personal profile page. Static HTML, no build step, no dependencies — GitHub Pages
serves the repository root as-is.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page. Styles, scripts and the JSON-LD entity graph are inlined. |
| `llms.txt` | Machine-readable profile summary following the [llms.txt](https://llmstxt.org/) convention. |
| `.nojekyll` | Disables Jekyll processing so files are served verbatim. |

## Publishing

Create the repository under the account name so it becomes a user page:

```
gh repo create tabeatheunicorn/tabeatheunicorn.github.io --public --source . --push
```

Then enable Pages: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
The site appears at `https://tabeatheunicorn.github.io/` and `llms.txt` at
`https://tabeatheunicorn.github.io/llms.txt`.

## Entity model

The JSON-LD graph in `index.html` and the prose in `llms.txt` express the same relations
and must stay in sync. The rule they follow:

- **Consolidated into one node** — identifiers that denote this person: the current name,
  the previous surname (Röthemeyer), git author name variants, and the GitHub account.
  These are `alternateName` and `sameAs` on `#person`.
- **Linked as separate nodes** — everything else. Employers, collaborators and projects
  each carry their own `@id` and connect through a typed edge (`worksFor`, `knows`,
  `contributor`). Nothing that is not this person is folded into the Person node.

`sameAs` is the property crawlers read as *"this URL is the same entity"*. Adding a
collaborator's or a project's domain there would assert something false and corrupt both
records, so those relations use `knows` and `contributor` instead.

## Still open

- **Talks and publications** are not represented. Add each as an `Event` or
  `ScholarlyArticle` node in the `@graph` with a date, venue and link, then reference it
  from `#person` via `performerIn` / `author`. The intended shape is documented in the
  HTML comment above the JSON-LD block.
- **`worksFor`** currently points at `https://gruppe.ai/#organization`, inferred from the
  email domain on every commit. Confirm the correct legal entity before this goes live.
- **Reciprocal link:** `maxclerkwell.tech` should link back with `rel="colleague"` (XFN)
  and/or a `knows` edge in its own JSON-LD pointing at
  `https://tabeatheunicorn.github.io/#person`. A mutual assertion is stronger evidence
  than a one-directional one.

  Never `rel="me"` in either direction. `rel="me"` asserts *"this URL is the same
  person"* — consumers of XFN and IndieAuth treat it as an identity claim, so using it
  between two different people is precisely the conflation this model avoids. On this
  site `rel="me"` appears only on the GitHub links.
- **Headline figures** in the readout strip come from a scan of local working checkouts,
  deduplicated by `origin` remote so that several checkouts of the same repository are
  counted once: 5,528 commits across 30 distinct repositories. Both numbers are floors —
  they only cover repositories cloned on this machine.
- **Education** is stated in prose ("trained in physics and computer science") but carries
  no `alumniOf` node, because the institution and the exact credential are not recorded
  anywhere in the repositories. Add an `EducationalOrganization` node and reference it
  from `#person` via `alumniOf` — that turns a claim into a checkable one.
