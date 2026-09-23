# Reference material

Unlike `data/raw/` (git-ignored — large downloads from stable URLs, safe to
delete and re-fetch via `npm run data`), this folder holds material that
**isn't** re-downloadable and is committed for that reason.

## `iebc-2022-registered-voters-per-caw.txt`

Kenya's official "Registered Voters per County Assembly Ward, 2022 General
Election" list, published by the Independent Electoral and Boundaries
Commission (IEBC) — every county, constituency and ward, each with its
official code and name.

Reached this project as a user-supplied PDF (no stable download URL was
found for it), transcribed verbatim into this plain-text file: one row per
ward, space-separated —

```
<county code> <county name> <const code> <const name> <CAW code> <CAW name> <registered voters>
```

— matching `scripts/lib/iebc-reference.mjs`'s parser exactly. If you have
a corrected or more complete copy (e.g. a later delimitation), replace this
file keeping the same column order and re-run `npm run data`; the parser
will pick it up automatically, and the diagnostics it prints (see
`data/README.md`'s "How wards are linked to constituencies") will show if
anything changed.

This is the source for:
- The official `code` on every county, constituency and ward in
  `codes.json` and the shipped TopoJSON files (see `data/README.md`).
- The official current spelling used as each area's `name`, with the
  source shapefiles' own name kept as `alt_names[0]` for searchability.
- Several individually-verified ward→constituency and constituency→county
  corrections documented in `data/README.md`.

It is **not** used for geometry — only for codes, names, and verification.
