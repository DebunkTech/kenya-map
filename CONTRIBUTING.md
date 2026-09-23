# Contributing

Notes for working on this repo day to day.

## Running the demo

```bash
npm install
npm run dev
```

Opens the demo app at `http://localhost:5173`, showing every feature live
(`demo/App.tsx` and `demo/sections/`). It imports from `src/` directly
(see the alias in `demo/vite.config.ts`), so edits to the component
hot-reload immediately — no build step needed while developing. Boundary
data is served locally from this repo's own `data/` folder (also
`demo/vite.config.ts`), standing in for the jsDelivr URL a real consumer's
`boundariesBaseUrl` points at once a version is tagged.

## Rebuilding the boundary data

```bash
npm run data
```

Downloads the source shapefiles into `data/raw/` (skipped if already
present) and regenerates everything in `data/` — `counties.topojson`,
`constituencies.topojson`, `wards/*.topojson`, `codes.json`, `meta.json`.
Only needed if you're changing the pipeline itself
(`scripts/build-data.mjs`) or a source dataset changed. See
[`data/README.md`](data/README.md) for the full pipeline writeup —
it's substantial, with a lot of hard-won detail on data-quality issues
this pipeline works around.

`demo/sampleVoterData.json` (used by the demo's dataset examples) is
separate from this pipeline — regenerate it with
`node scripts/generate-demo-sample-data.mjs` if
`data/reference/iebc-2022-registered-voters-per-caw.txt` ever changes.

## Building the package

```bash
npm run build
```

Runs `tsc -b` (type-checks and emits nothing itself, just catches errors
before the real build) then `vite build` in library mode, producing
`dist/kenya-map.js` (ESM), `dist/kenya-map.cjs` (CommonJS), source maps,
and `dist/index.d.ts` (type declarations, via `vite-plugin-dts`). Both
module formats are built because consumers might use either `import` or
`require`, and `package.json`'s `exports` field points at both.

**`dist/` is committed to git**, unlike most packages — this one installs
straight from a GitHub URL/tag with no build step for the consumer (see
`package.json`'s comment-equivalent: `.gitignore` explicitly does *not*
ignore `dist/`), so whatever's committed there is exactly what a
`npm install github:DebunkTech/kenya-map#<tag>` gets. That means **`dist/`
must be rebuilt and committed as part of any change that should reach
consumers** — a source-only commit without a matching `dist/` rebuild
silently ships stale code.

Also run `npm run typecheck:demo` before committing if you've touched the
demo — it type-checks `demo/` on its own tsconfig (not part of the
library build, since the demo isn't shipped).

## Releasing a new version

1. Bump `"version"` in `package.json` (semver: patch for fixes, minor for
   new backwards-compatible props/features, major for breaking API
   changes).
2. `npm run build` — rebuild `dist/` for the new version.
3. Commit both the version bump and the rebuilt `dist/` together.
4. Tag the commit and push the tag:
   ```bash
   git tag v0.2.0
   git push origin main --tags
   ```
   The `v` prefix matches what `boundariesBaseUrl`'s default jsDelivr URL
   and the install instructions expect (`...@v0.2.0/data`,
   `#v0.2.0`) — an untagged or differently-named ref won't resolve there.
5. If `data/` changed in this release, double check the default
   `DEFAULT_BOUNDARIES_BASE_URL` in `src/KenyaMap.tsx` and the install
   command in `README.md` reference the *new* tag, not the previous one —
   they're hardcoded strings, not derived from `package.json`.

Consumers then install the new version with
`npm install github:DebunkTech/kenya-map#v0.2.0` (or whatever tag), and
`boundariesBaseUrl` defaults to fetching boundary data from that same
tagged commit on jsDelivr — no separate data release step.
