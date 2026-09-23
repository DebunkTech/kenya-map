import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { runMapshaper } from "./lib/mapshaper-run.mjs";
import { titleCaseName, padCode } from "./lib/text.mjs";
import { findContainingParent } from "./lib/spatial-join.mjs";
import { fixRingWinding } from "./lib/geometry.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const RAW_DIR = join(ROOT, "data", "raw");
const WORK_DIR = join(RAW_DIR, "_work");
const DATA_DIR = join(ROOT, "data");
const WARDS_DIR = join(DATA_DIR, "wards");

// All three files come from HDX (data.humdata.org). Counties and
// constituencies are the same "Kenya Admin Boundaries - Election Polling
// stations" dataset (source: IEBC, via OCHA ROSEA) so their edges share a
// single digitization and line up exactly. Wards come from a different,
// dedicated dataset ("Administrative Wards in Kenya 1450", American Red
// Cross/DHIS2, 2016) because it is the only source with a clean, complete
// count of 1,450 — see data/README.md for the full trade-off writeup.
const SOURCES = {
  counties: {
    url: "https://data.humdata.org/dataset/4da920dc-c1dc-4889-b06c-66ecb65e2b94/resource/0d7c191e-35b4-42cd-9df6-bb3b9add3467/download/counties.zip",
    file: "counties.zip",
  },
  constituencies: {
    url: "https://data.humdata.org/dataset/4da920dc-c1dc-4889-b06c-66ecb65e2b94/resource/8c78dafe-f9f4-4dd3-b6be-a4e57ea7ac22/download/constituencies.zip",
    file: "constituencies.zip",
  },
  wards: {
    url: "https://data.humdata.org/dataset/e8d06ae7-740b-4491-8749-43f81700cf41/resource/858129b2-7197-4ffe-b34f-c2091b307b2c/download/kenya_wards.zip",
    file: "wards.zip",
  },
};

async function downloadIfMissing(url, destPath) {
  if (existsSync(destPath)) {
    console.log(`  already downloaded: ${destPath}`);
    return;
  }
  console.log(`  downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed (${res.status} ${res.statusText}): ${url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
  console.log(`  saved ${destPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

function readGeoJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function fileSizeKb(path) {
  return (statSync(path).size / 1024).toFixed(1);
}

async function main() {
  mkdirSync(RAW_DIR, { recursive: true });
  mkdirSync(WORK_DIR, { recursive: true });
  mkdirSync(WARDS_DIR, { recursive: true });

  console.log("\n1. Downloading raw boundary files (skipped if already present)");
  for (const source of Object.values(SOURCES)) {
    await downloadIfMissing(source.url, join(RAW_DIR, source.file));
  }

  console.log("\n2. Extracting to GeoJSON, filtering junk records");
  // Both counties.zip and constituencies.zip contain a handful of tiny,
  // unattributed sliver polygons (digitizing artifacts) alongside the real
  // records, all with their code field left at 0 — see data/README.md.
  runMapshaper([
    join(RAW_DIR, "counties.zip"),
    "-filter",
    "COUNTY_COD != 0",
    "-proj",
    "wgs84",
    "-o",
    join(WORK_DIR, "counties.raw.geojson"),
    "format=geojson",
    "force",
  ]);
  runMapshaper([
    join(RAW_DIR, "constituencies.zip"),
    "-filter",
    "CONST_CODE != 0",
    "-proj",
    "wgs84",
    "-o",
    join(WORK_DIR, "constituencies.raw.geojson"),
    "format=geojson",
    "force",
  ]);
  runMapshaper([
    join(RAW_DIR, "wards.zip"),
    "-proj",
    "wgs84",
    "-o",
    join(WORK_DIR, "wards.raw.geojson"),
    "format=geojson",
    "force",
  ]);

  console.log("\n3. Normalising properties");

  const countiesRaw = readGeoJson(join(WORK_DIR, "counties.raw.geojson"));
  const counties = countiesRaw.features.map((f) => ({
    type: "Feature",
    properties: {
      code: padCode(f.properties.COUNTY_COD, 3),
      name: titleCaseName(f.properties.COUNTY_NAM),
    },
    geometry: fixRingWinding(f).geometry,
  }));
  const countyCodes = new Set(counties.map((f) => f.properties.code));

  const constituenciesRaw = readGeoJson(join(WORK_DIR, "constituencies.raw.geojson"));
  const constituencies = constituenciesRaw.features.map((f) => ({
    type: "Feature",
    properties: {
      code: padCode(f.properties.CONST_CODE, 3),
      name: titleCaseName(f.properties.CONSTITUEN),
      county_code: padCode(f.properties.COUNTY_COD, 3),
    },
    geometry: fixRingWinding(f).geometry,
  }));
  for (const c of constituencies) {
    if (!countyCodes.has(c.properties.county_code)) {
      throw new Error(
        `Constituency ${c.properties.name} (${c.properties.code}) references unknown county_code ${c.properties.county_code}`,
      );
    }
  }

  console.log("\n4. Assigning each ward to its constituency (spatial join)");
  // The wards source has no constituency identifier of its own (only a
  // free-text "subcounty" name that doesn't match constituencies 1:1 - 302
  // unique subcounty names vs 290 constituencies). Instead we test each
  // ward's centroid against every constituency polygon with d3-geo.
  const wardsRaw = readGeoJson(join(WORK_DIR, "wards.raw.geojson"));
  let fallbackCount = 0;
  const wardsJoined = wardsRaw.features.map((rawFeature) => {
    const f = fixRingWinding(rawFeature);
    const { parent, fallback } = findContainingParent(f, constituencies);
    if (fallback) {
      fallbackCount++;
      console.warn(
        `  [warn] ward "${f.properties.ward}" centroid fell outside every constituency; ` +
          `assigned to nearest: ${parent.properties.name} (${parent.properties.code})`,
      );
    }
    return {
      type: "Feature",
      properties: {
        // 1,364 of 1,450 source names end in " Ward" (redundant given
        // level: "ward"); strip only that clean, space-delimited suffix.
        // A handful of names run "ward" straight into the name with no
        // space ("Rurumaward") — left as-is, since guessing where to split
        // would be inventing data rather than formatting it.
        name: titleCaseName(f.properties.ward.replace(/\s+ward$/i, "")),
        constituency_code: parent.properties.code,
        county_code: parent.properties.county_code,
      },
      geometry: f.geometry,
    };
  });
  console.log(`  spatial join done (${fallbackCount} ward(s) used the nearest-centroid fallback)`);

  // Assign our own stable, sequential ward codes (the source has no usable
  // official code) in a deterministic order, so re-running the pipeline on
  // the same input always produces the same codes.
  wardsJoined.sort((a, b) => {
    const pa = a.properties;
    const pb = b.properties;
    return (
      pa.county_code.localeCompare(pb.county_code) ||
      pa.constituency_code.localeCompare(pb.constituency_code) ||
      pa.name.localeCompare(pb.name)
    );
  });
  const wards = wardsJoined.map((f, i) => ({
    ...f,
    properties: { code: padCode(i + 1, 4), ...f.properties },
  }));

  console.log("\n5. Verifying counts");
  const counts = { counties: counties.length, constituencies: constituencies.length, wards: wards.length };
  const expected = { counties: 47, constituencies: 290, wards: 1450 };
  for (const level of Object.keys(expected)) {
    const ok = counts[level] === expected[level];
    console.log(`  ${level}: ${counts[level]} (expected ${expected[level]}) ${ok ? "OK" : "MISMATCH"}`);
    if (!ok) {
      console.warn(`  [warn] ${level} count does not match the expected total — see output above for why.`);
    }
  }
  // Every county/constituency has to have received at least one ward from
  // the spatial join, or dissolving wards up (next step) would silently
  // drop it instead of producing an empty/missing shape.
  const wardConstituencyCodes = new Set(wards.map((w) => w.properties.constituency_code));
  const wardCountyCodes = new Set(wards.map((w) => w.properties.county_code));
  const constituenciesWithNoWards = constituencies.filter((c) => !wardConstituencyCodes.has(c.properties.code));
  const countiesWithNoWards = counties.filter((c) => !wardCountyCodes.has(c.properties.code));
  if (constituenciesWithNoWards.length > 0 || countiesWithNoWards.length > 0) {
    throw new Error(
      `Cannot dissolve wards up: constituencies with no wards: ${constituenciesWithNoWards.map((c) => c.properties.name).join(", ") || "none"}; ` +
        `counties with no wards: ${countiesWithNoWards.map((c) => c.properties.name).join(", ") || "none"}`,
    );
  }

  console.log("\n6. Simplifying wards, then dissolving them into constituencies and counties");
  // Counties and constituencies are built by dissolving the simplified ward
  // layer, rather than using counties.zip/constituencies.zip's own geometry,
  // so every level shares the exact same borders — a county's edge is
  // literally made of the same simplified ward edges as the wards inside
  // it, not a separately-digitized, separately-simplified shape that only
  // approximately lines up. Names and codes still come from the election
  // dataset (looked up by the code each dissolved group already carries);
  // only the geometry changes.
  const dissolveDir = join(WORK_DIR, "dissolved");
  mkdirSync(dissolveDir, { recursive: true });
  writeFileSync(
    join(WORK_DIR, "wards.normalized.geojson"),
    JSON.stringify({ type: "FeatureCollection", features: wards }),
  );
  runMapshaper([
    "-i",
    join(WORK_DIR, "wards.normalized.geojson"),
    "name=wards",
    // Same reasoning as before: clean before simplify, to avoid the
    // hundreds/thousands of unrepairable self-intersections that
    // simplifying pre-existing slivers directly produces.
    "-clean",
    "target=wards",
    // 3% (not 10%) after measuring the trade-off: county/constituency/ward
    // area stays stable to 4-5 significant figures even at 2%, and this
    // cuts total gzipped size by more than half (733 KB -> 315 KB) with a
    // comfortable margin under the ~100 KB initial-load target — see
    // data/README.md for the full before/after.
    "-simplify",
    "3%",
    "keep-shapes",
    "target=wards",
    "-clean",
    "target=wards",
    // "+" keeps the source "wards" layer around after each dissolve, so
    // the next command can dissolve from it again (default behaviour
    // would replace it with the dissolve output).
    "-dissolve",
    "fields=constituency_code",
    "copy-fields=county_code",
    "name=constituencies",
    "target=wards",
    "+",
    "-dissolve",
    "fields=county_code",
    "name=counties",
    "target=wards",
    "+",
    "-clean",
    "target=constituencies,counties",
    "-o",
    dissolveDir + "/",
    "format=geojson",
    "singles",
    "target=wards,constituencies,counties",
    "force",
  ]);

  const countyNameByCode = new Map(counties.map((c) => [c.properties.code, c.properties.name]));
  const constituencyNameByCode = new Map(constituencies.map((c) => [c.properties.code, c.properties.name]));

  console.log("\n7. Attaching names and writing TopoJSON");
  const dissolvedCounties = readGeoJson(join(dissolveDir, "counties.json"));
  const finalCounties = {
    type: "FeatureCollection",
    features: dissolvedCounties.features.map((f) => {
      const code = f.properties.county_code;
      return { type: "Feature", properties: { code, name: countyNameByCode.get(code) }, geometry: f.geometry };
    }),
  };
  writeFileSync(join(WORK_DIR, "counties.final.geojson"), JSON.stringify(finalCounties));
  runMapshaper([
    join(WORK_DIR, "counties.final.geojson"),
    "-o",
    join(DATA_DIR, "counties.topojson"),
    "format=topojson",
    // Counties, constituencies and wards are each written to a *separate*
    // TopoJSON file, and TopoJSON quantizes coordinates to a per-file grid
    // by default (auto-picked from that file's own bounding box) — so even
    // though the dissolve above gives every level identical source
    // coordinates at shared borders, each file's independent quantization
    // grid could in principle snap those shared vertices to very slightly
    // different positions. Measured worst case here: ~7m (counties/
    // constituencies) to ~5m (wards) — see data/README.md for why that's
    // an acceptable trade-off against the ~3.7x file size of disabling
    // quantization to make it byte-exact instead.
    "force",
  ]);

  const dissolvedConstituencies = readGeoJson(join(dissolveDir, "constituencies.json"));
  const finalConstituencies = {
    type: "FeatureCollection",
    features: dissolvedConstituencies.features.map((f) => {
      const code = f.properties.constituency_code;
      return {
        type: "Feature",
        properties: {
          code,
          name: constituencyNameByCode.get(code),
          county_code: f.properties.county_code,
        },
        geometry: f.geometry,
      };
    }),
  };
  writeFileSync(join(WORK_DIR, "constituencies.final.geojson"), JSON.stringify(finalConstituencies));
  runMapshaper([
    join(WORK_DIR, "constituencies.final.geojson"),
    "-o",
    join(DATA_DIR, "constituencies.topojson"),
    "format=topojson",
    "force",
  ]);

  console.log("\n8. Splitting the simplified wards layer per county and writing TopoJSON");
  // This reads the *simplified* wards layer written above (dissolveDir's
  // wards.json), not the pre-simplify `wards` array, so its geometry is the
  // same simplified arcs the counties/constituencies layers were dissolved
  // from — no further simplification here, just a format conversion.
  const simplifiedWards = readGeoJson(join(dissolveDir, "wards.json"));
  const wardsByCounty = new Map();
  for (const w of simplifiedWards.features) {
    const code = w.properties.county_code;
    if (!wardsByCounty.has(code)) wardsByCounty.set(code, []);
    wardsByCounty.get(code).push(w);
  }
  for (const [countyCode, features] of wardsByCounty) {
    const workFile = join(WORK_DIR, `wards.${countyCode}.final.geojson`);
    writeFileSync(workFile, JSON.stringify({ type: "FeatureCollection", features }));
    runMapshaper([
      workFile,
      "-o",
      join(WARDS_DIR, `${countyCode}.topojson`),
      "format=topojson",
      "force",
    ]);
  }

  console.log("\n9. Writing data/codes.json");
  const codes = [
    ...counties.map((f) => ({ code: f.properties.code, name: f.properties.name, level: "county" })),
    ...constituencies.map((f) => ({
      code: f.properties.code,
      name: f.properties.name,
      level: "constituency",
      county_code: f.properties.county_code,
    })),
    ...wards.map((f) => ({
      code: f.properties.code,
      name: f.properties.name,
      level: "ward",
      county_code: f.properties.county_code,
      constituency_code: f.properties.constituency_code,
    })),
  ];
  writeFileSync(join(DATA_DIR, "codes.json"), JSON.stringify(codes, null, 2));

  console.log("\n10. Output file sizes");
  console.log(`  data/counties.topojson: ${fileSizeKb(join(DATA_DIR, "counties.topojson"))} KB`);
  console.log(`  data/constituencies.topojson: ${fileSizeKb(join(DATA_DIR, "constituencies.topojson"))} KB`);
  let wardsTotalKb = 0;
  for (const countyCode of wardsByCounty.keys()) {
    wardsTotalKb += Number(fileSizeKb(join(WARDS_DIR, `${countyCode}.topojson`)));
  }
  console.log(`  data/wards/*.topojson: ${wardsTotalKb.toFixed(1)} KB total across ${wardsByCounty.size} files`);
  console.log(`  data/codes.json: ${fileSizeKb(join(DATA_DIR, "codes.json"))} KB`);

  rmSync(WORK_DIR, { recursive: true, force: true });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
