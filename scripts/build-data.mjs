import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { geoBounds } from "d3-geo";

import { runMapshaper } from "./lib/mapshaper-run.mjs";
import { titleCaseName, padCode } from "./lib/text.mjs";
import { findContainingParent } from "./lib/spatial-join.mjs";
import { fixRingWinding } from "./lib/geometry.mjs";
import {
  buildElectionWardIndex,
  resolveConstituencyByName,
  resolveManualCorrection,
} from "./lib/election-ward-crosscheck.mjs";
import { parseIebcReference, verifyCodesMatchIebc, matchWardsWithinConstituency, normKey } from "./lib/iebc-reference.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const RAW_DIR = join(ROOT, "data", "raw");
const WORK_DIR = join(RAW_DIR, "_work");
const DATA_DIR = join(ROOT, "data");
const WARDS_DIR = join(DATA_DIR, "wards");
const REFERENCE_DIR = join(ROOT, "data", "reference");

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
  // The election dataset's own ward file (same "Kenya Elections" HDX
  // dataset as counties/constituencies) — not used for geometry (it's
  // missing 11 of 1,450 wards and has 2 pairs sharing an un-split polygon,
  // see data/README.md), but its CONSTITUEN attribute is a same-vintage,
  // independent cross-check for the ward->constituency spatial join below.
  electionWards: {
    url: "https://data.humdata.org/dataset/4da920dc-c1dc-4889-b06c-66ecb65e2b94/resource/e77739a3-c921-4690-8d3b-62249e26324e/download/ward.results.zip",
    file: "ward.results.zip",
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
  runMapshaper([
    join(RAW_DIR, "ward.results.zip"),
    "-filter",
    "CONST_CODE != 0",
    "-proj",
    "wgs84",
    "-o",
    join(WORK_DIR, "electionWards.raw.geojson"),
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

  // The source shapefile has a verified error: constituency 148 (Marakwet
  // West) carries COUNTY_NAM/COUNTY_COD "WEST POKOT"/24, though it's really
  // in Elgeyo-Marakwet (28) — its sibling Marakwet East (147) correctly
  // shows Elgeyo-Marakwet, and Kenya's official "Registered Voters per CAW,
  // 2022 General Election" list confirms county 028 for const 148. Left
  // uncorrected, every ward genuinely inside Marakwet West's shape (Arror,
  // Cherangany, Kapsowar, Moiben/Kuserwo, Sengwer, and one of two wards
  // named "Lelan" — West Pokot's Pokot South also has a ward called Lelan,
  // a real coincidental name match) would inherit the wrong county via the
  // spatial join, and the two same-named-but-different Lelan wards would
  // collide under the same (wrong) county during the name cross-check
  // below, both landing in Pokot South instead of one correctly resolving
  // to Marakwet West.
  const CONSTITUENCY_COUNTY_CODE_FIXES = new Map([["148", "028"]]);

  const constituenciesRaw = readGeoJson(join(WORK_DIR, "constituencies.raw.geojson"));
  const constituencies = constituenciesRaw.features.map((f) => {
    const code = padCode(f.properties.CONST_CODE, 3);
    const county_code = CONSTITUENCY_COUNTY_CODE_FIXES.get(code) ?? padCode(f.properties.COUNTY_COD, 3);
    return {
      type: "Feature",
      properties: {
        code,
        // Source name, kept temporarily — replaced with the official 2022
        // name (and demoted to alt_names) once the reference list is
        // loaded and verified below. Constituency renames (e.g. "Mbita" ->
        // "Suba North") and source typos (e.g. "WEBUTE WEST", even the
        // county-level "ELEGEYO-MARAKWET") are corrected this way rather
        // than as one-off hardcoded fixes.
        name: titleCaseName(f.properties.CONSTITUEN),
        county_code,
      },
      geometry: fixRingWinding(f).geometry,
    };
  });
  for (const c of constituencies) {
    if (!countyCodes.has(c.properties.county_code)) {
      throw new Error(
        `Constituency ${c.properties.name} (${c.properties.code}) references unknown county_code ${c.properties.county_code}`,
      );
    }
  }

  console.log("\n3b. Verifying codes against the IEBC 2022 official reference list");
  // See data/reference/README.md for what this file is and why it isn't
  // auto-downloaded like the other sources. Everything from here on that
  // uses it (code verification, ward code/name adoption below) depends on
  // our county/constituency codes already matching IEBC's numbering —
  // verified explicitly rather than assumed, since it was only confirmed
  // by spot-checking Nairobi's 17 constituencies before this pipeline
  // trusted it more broadly.
  const iebcRows = parseIebcReference(
    readFileSync(join(REFERENCE_DIR, "iebc-2022-registered-voters-per-caw.txt"), "utf8"),
  );
  // Source-shapefile names that don't match the IEBC reference's naming
  // directly: two typos (Elegeyo-Marakwet, Webute West) and two
  // pre-2022 names for constituencies later renamed/split (Mbita -> Suba
  // North, Suba -> Suba South) — purely so codes can be paired for
  // verification; the actual display names are overwritten with the
  // official IEBC spelling below regardless.
  const NAME_ALIASES = new Map([
    [normKey("Elegeyo-Marakwet"), normKey("Elgeyo Marakwet")],
    [normKey("Webute West"), normKey("Webuye West")],
    [normKey("Mbita"), normKey("Suba North")],
    [normKey("Suba"), normKey("Suba South")],
  ]);
  verifyCodesMatchIebc(counties, constituencies, iebcRows, NAME_ALIASES);
  console.log(`  all 47 county codes and 290 constituency codes match IEBC numbering`);

  // Adopt the official 2022 name for every constituency, keeping the
  // source (constituencies.zip) name as alt_names[0] when it differs —
  // covers renames (Mbita -> Suba North, Suba -> Suba South) and typos
  // (WEBUTE WEST -> Webuye West) with one mechanism instead of one-off
  // fixes. Deliberately NOT done for counties — see data/README.md.
  const iebcConstNameByCode = new Map();
  for (const r of iebcRows) {
    if (!iebcConstNameByCode.has(r.constCode)) iebcConstNameByCode.set(r.constCode, titleCaseName(r.constName));
  }
  for (const c of constituencies) {
    const sourceName = c.properties.name;
    const officialName = iebcConstNameByCode.get(c.properties.code);
    if (!officialName) {
      throw new Error(`No IEBC reference name found for constituency ${c.properties.code} (${sourceName})`);
    }
    c.properties.name = officialName;
    c.properties.alt_names = normKey(officialName) === normKey(sourceName) ? [] : [sourceName];
  }

  console.log("\n4. Assigning each ward to its constituency");
  // Primary method: spatial join. The wards source has no constituency
  // identifier of its own (only a free-text "subcounty" name that doesn't
  // match constituencies 1:1 - 302 unique subcounty names vs 290
  // constituencies), so we test each ward's centroid against every
  // constituency polygon with d3-geo.
  //
  // This alone was found to misassign a real, non-trivial number of wards
  // (38 of 1,450 checked against the election file below) — not spatial-
  // join bugs, but genuine boundary misalignment between the two different-
  // vintage datasets (2016 wards vs 2018 constituencies): a ward's centroid
  // can legitimately fall inside a neighboring constituency's polygon from
  // the *other* dataset, especially for oddly-shaped/elongated wards near a
  // border. See data/README.md's "Ward assignment" section for the full
  // writeup, including why geometry alone (even area-of-overlap, not just
  // centroid) can't fully fix this for some wards, and why a name-based
  // cross-check against the election dataset's own ward file is needed.
  const wardsRaw = readGeoJson(join(WORK_DIR, "wards.raw.geojson"));
  const electionWardsRaw = readGeoJson(join(WORK_DIR, "electionWards.raw.geojson"));
  const electionWardIndex = buildElectionWardIndex(electionWardsRaw.features);
  const countyNameByCode = new Map(counties.map((c) => [c.properties.code, c.properties.name]));
  const constituenciesByCounty = new Map();
  for (const c of constituencies) {
    if (!constituenciesByCounty.has(c.properties.county_code)) constituenciesByCounty.set(c.properties.county_code, []);
    constituenciesByCounty.get(c.properties.county_code).push({ code: c.properties.code, name: c.properties.name });
  }
  const allConstituenciesFlat = constituencies.map((c) => ({ code: c.properties.code, name: c.properties.name }));

  let fallbackCount = 0;
  let nameOverrideCount = 0;
  const nameOverrides = [];
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

    let constituencyCode = parent.properties.code;
    let countyCode = parent.properties.county_code;

    // Name-based cross-check/override: trust the election dataset's own
    // CONSTITUEN attribute for this ward when we can confidently identify
    // it (exact or close name match, within the same county, to exactly
    // one election-file ward — see resolveConstituencyByName). This is a
    // more reliable source than centroid geometry for wards right on a
    // misaligned boundary, since it's the constituency IEBC's own data
    // says this ward belongs to, not just where its shape happens to sit
    // relative to a different dataset's boundary line.
    const spatialCountyName = countyNameByCode.get(countyCode);
    const resolved = resolveConstituencyByName(
      f.properties.ward,
      spatialCountyName,
      electionWardIndex,
      constituenciesByCounty.get(countyCode) ?? [],
    );
    if (resolved && resolved.constituency.code !== constituencyCode) {
      nameOverrideCount++;
      nameOverrides.push({
        ward: f.properties.ward,
        county: spatialCountyName,
        from: constituencies.find((c) => c.properties.code === constituencyCode).properties.name,
        to: resolved.constituency.name,
        method: resolved.method,
        claimed: resolved.claimed,
      });
      constituencyCode = resolved.constituency.code;
      // The resolved constituency is always in the same county in
      // practice (Kenya's wards don't cross county lines), but derive
      // county_code from it rather than assume, for safety.
      const resolvedConstituencyFeature = constituencies.find((c) => c.properties.code === resolved.constituency.code);
      countyCode = resolvedConstituencyFeature.properties.county_code;
    }

    // Individually-verified corrections from the 2022 official list take
    // priority over both the spatial join and the ward.results.zip-based
    // correction above — see MANUAL_WARD_CORRECTIONS for why.
    const manualFix = resolveManualCorrection(f.properties.ward, spatialCountyName, allConstituenciesFlat);
    if (manualFix && manualFix.constituency.code !== constituencyCode) {
      nameOverrideCount++;
      nameOverrides.push({
        ward: f.properties.ward,
        county: spatialCountyName,
        from: constituencies.find((c) => c.properties.code === constituencyCode).properties.name,
        to: manualFix.constituency.name,
        method: manualFix.method,
      });
      constituencyCode = manualFix.constituency.code;
      const manualConstituencyFeature = constituencies.find((c) => c.properties.code === manualFix.constituency.code);
      countyCode = manualConstituencyFeature.properties.county_code;
    }

    // Source-data bug: the raw wards.zip has two separate features both
    // named "Kisii Central Ward" (Kisii county) — the genuine Nyaribari
    // Chache ward of that name, and a second one whose own `subcounty`
    // attribute reads "Kitutu Chache South Sub County", not "Nyaribari
    // Chache". The 2022 official list has exactly one "Kisii Central"
    // ward nationally (in Nyaribari Chache) and lists Kitutu Chache
    // South's 5th ward as "Kitutu Central" — a ward missing entirely from
    // this dataset otherwise. Ward name alone can't disambiguate the two
    // identical-name features (MANUAL_WARD_CORRECTIONS is keyed by name),
    // so this is keyed on the source's own subcounty attribute instead.
    let wardName = f.properties.ward;
    if (normKey(wardName) === normKey("Kisii Central") && /Kitutu Chache South/i.test(f.properties.subcounty ?? "")) {
      wardName = "Kitutu Central Ward";
      const kitutuChacheSouth = constituencies.find((c) => normKey(c.properties.name) === normKey("Kitutu Chache South"));
      constituencyCode = kitutuChacheSouth.properties.code;
      countyCode = kitutuChacheSouth.properties.county_code;
    }

    return {
      type: "Feature",
      properties: {
        // 1,364 of 1,450 source names end in " Ward" (redundant given
        // level: "ward"); strip only that clean, space-delimited suffix.
        // A handful of names run "ward" straight into the name with no
        // space ("Rurumaward") — left as-is, since guessing where to split
        // would be inventing data rather than formatting it.
        name: titleCaseName(wardName.replace(/\s+ward$/i, "")),
        constituency_code: constituencyCode,
        county_code: countyCode,
      },
      geometry: f.geometry,
    };
  });
  console.log(`  spatial join done (${fallbackCount} ward(s) used the nearest-centroid fallback)`);
  console.log(`  name-based cross-check overrode ${nameOverrideCount} ward(s) the spatial join got wrong:`);
  for (const o of nameOverrides) {
    console.log(`    ${o.ward} (${o.county}): ${o.from} -> ${o.to}` + (o.method === "fuzzy" ? ` (election file spelled it "${o.claimed}")` : ""));
  }

  console.log("\n4b. Adopting official IEBC ward codes and names");
  // Matches each ward to its official CAW code/name, scoped one
  // constituency at a time using the now-verified-correct constituency
  // code (never by fuzzy cross-constituency name matching) — see
  // matchWardsWithinConstituency for the exact-match + single-leftover-
  // elimination method, and data/README.md for the full writeup and the
  // final tally. The source (Red Cross wards.zip) name is kept as
  // alt_names[0] whenever it differs from the adopted official name.
  const iebcWardsByConst = new Map();
  for (const r of iebcRows) {
    if (!iebcWardsByConst.has(r.constCode)) iebcWardsByConst.set(r.constCode, []);
    iebcWardsByConst.get(r.constCode).push({ cawCode: r.cawCode, cawName: r.cawName });
  }
  const ourWardsByConst = new Map();
  for (const w of wardsJoined) {
    const code = w.properties.constituency_code;
    if (!ourWardsByConst.has(code)) ourWardsByConst.set(code, []);
    ourWardsByConst.get(code).push(w);
  }

  const countMismatchConstituencies = [];
  const unresolvedWards = [];
  let matchedCount = 0;
  let eliminationCount = 0;

  for (const c of constituencies) {
    const ours = ourWardsByConst.get(c.properties.code) ?? [];
    const iebcList = iebcWardsByConst.get(c.properties.code) ?? [];
    if (ours.length !== iebcList.length) {
      countMismatchConstituencies.push({ code: c.properties.code, name: c.properties.name, ours: ours.length, iebc: iebcList.length });
    }

    const { matches, unmatchedOurs } = matchWardsWithinConstituency(
      ours.map((w) => ({ id: w, name: w.properties.name })),
      iebcList,
    );
    for (const [wardFeature, m] of matches) {
      const officialName = titleCaseName(m.cawName);
      wardFeature.properties.alt_names =
        normKey(officialName) === normKey(wardFeature.properties.name) ? [] : [wardFeature.properties.name];
      wardFeature.properties.name = officialName;
      wardFeature.properties.code = m.cawCode;
      matchedCount++;
      if (m.method === "elimination") eliminationCount++;
    }
    for (const u of unmatchedOurs) unresolvedWards.push(u.id);
  }

  console.log(`  matched ${matchedCount} of 1,450 wards to an official CAW code (${eliminationCount} by elimination)`);
  if (countMismatchConstituencies.length > 0) {
    console.log(`  ${countMismatchConstituencies.length} constituencies have a ward-count mismatch vs the official list:`);
    for (const m of countMismatchConstituencies) {
      console.log(`    ${m.name} (${m.code}): ours=${m.ours} IEBC=${m.iebc}`);
    }
  }

  // Wards left unmatched (hopefully none — see the log above) get a
  // clearly-non-official fallback code: an "X" prefix so it can never
  // collide with, or be mistaken for, a real CAW code — every 4-digit
  // "0001".."1450" is used by some real ward, so any numeric fallback in
  // that shape risks silently joining an external IEBC dataset to the
  // wrong ward. Sorted for a stable, deterministic assignment.
  unresolvedWards.sort((a, b) => a.properties.name.localeCompare(b.properties.name));
  unresolvedWards.forEach((w, i) => {
    w.properties.code = `X${padCode(i + 1, 3)}`;
    w.properties.alt_names = [];
  });
  if (unresolvedWards.length > 0) {
    console.log(`  ${unresolvedWards.length} ward(s) could not be matched to an official code (given a fallback "X..." code instead):`);
    for (const w of unresolvedWards) {
      const c = constituencies.find((c) => c.properties.code === w.properties.constituency_code);
      console.log(`    ${w.properties.name} (${c.properties.name}, ${w.properties.code})`);
    }
  }

  const wards = wardsJoined;

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
  // alt_names is dropped here — it's for codes.json only (step 10), not
  // the shipped topojson the component fetches, so it isn't carried
  // through the dissolve/simplify pipeline below.
  writeFileSync(
    join(WORK_DIR, "wards.normalized.geojson"),
    JSON.stringify({
      type: "FeatureCollection",
      features: wards.map((f) => ({
        ...f,
        properties: { code: f.properties.code, name: f.properties.name, constituency_code: f.properties.constituency_code, county_code: f.properties.county_code },
      })),
    }),
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

  // 7b. Contiguity check: a MultiPolygon feature here means the dissolve
  // (driven entirely by each ward's constituency_code/county_code, which
  // is exactly what the corrections above changed) produced two or more
  // disconnected land areas for one constituency/county — worth a human
  // look, since most of Kenya's constituencies/counties are single
  // contiguous areas, though a few genuinely are not (e.g. islands).
  // This isn't a bug check on its own; it's a report for item 5.
  const nonContiguousCounties = finalCounties.features
    .filter((f) => f.geometry.type === "MultiPolygon")
    .map((f) => `${f.properties.name} (${f.properties.code}): ${f.geometry.coordinates.length} parts`);
  const nonContiguousConstituencies = finalConstituencies.features
    .filter((f) => f.geometry.type === "MultiPolygon")
    .map((f) => `${f.properties.name} (${f.properties.code}), county ${f.properties.county_code}: ${f.geometry.coordinates.length} parts`);
  console.log(`\n7b. Contiguity check (dissolved fresh from the corrected ward assignments above)`);
  console.log(`  Non-contiguous counties: ${nonContiguousCounties.length}`);
  nonContiguousCounties.forEach((m) => console.log(`    - ${m}`));
  console.log(`  Non-contiguous constituencies: ${nonContiguousConstituencies.length}`);
  nonContiguousConstituencies.forEach((m) => console.log(`    - ${m}`));

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

  console.log("\n9. Finding the smallest ward (for the component's max zoom level)");
  // The component needs to know how far to let people zoom in — far enough
  // that even the smallest ward can fill the view, but no further. That
  // requires knowing the smallest ward's real-world size, which isn't
  // otherwise available at runtime (wards are fetched lazily, one county
  // at a time, specifically so the whole country's 1,450 ward shapes are
  // never all loaded at once — see data/README.md). So it's computed once
  // here, from the real data, and shipped as a tiny standalone file
  // instead: data/meta.json.
  //
  // "Smallest" means smallest bounding-box span (its longer side), not
  // smallest area — a long thin sliver ward can have a small area but
  // still need very little extra zoom to fill the view, while a small
  // round one needs a lot. Span is what actually determines the zoom
  // level needed to fit it in the viewport (see zoomTransformForBounds in
  // src/geo.ts, which this mirrors). Ranked using raw longitude/latitude
  // degree-spans rather than a projected distance — accurate enough here
  // since Kenya sits within a few degrees of the equator, where Mercator's
  // latitude distortion is under 1%.
  let smallestWard = null;
  let smallestSpan = Infinity;
  for (const w of wards) {
    const [[minLon, minLat], [maxLon, maxLat]] = geoBounds(w);
    const span = Math.max(maxLon - minLon, maxLat - minLat);
    if (span < smallestSpan) {
      smallestSpan = span;
      smallestWard = { feature: w, bbox: [minLon, minLat, maxLon, maxLat] };
    }
  }
  console.log(
    `  smallest ward: ${smallestWard.feature.properties.name} (${smallestWard.feature.properties.code}), ` +
      `span ${(smallestSpan * 111).toFixed(2)} km`,
  );
  writeFileSync(
    join(DATA_DIR, "meta.json"),
    JSON.stringify(
      {
        maxZoomWard: {
          code: smallestWard.feature.properties.code,
          name: smallestWard.feature.properties.name,
          bbox: smallestWard.bbox,
        },
      },
      null,
      2,
    ),
  );

  console.log("\n10. Writing data/codes.json");
  const codes = [
    ...counties.map((f) => ({ code: f.properties.code, name: f.properties.name, level: "county" })),
    ...constituencies.map((f) => ({
      code: f.properties.code,
      name: f.properties.name,
      level: "constituency",
      county_code: f.properties.county_code,
      ...(f.properties.alt_names.length > 0 ? { alt_names: f.properties.alt_names } : {}),
    })),
    ...wards.map((f) => ({
      code: f.properties.code,
      name: f.properties.name,
      level: "ward",
      county_code: f.properties.county_code,
      constituency_code: f.properties.constituency_code,
      ...(f.properties.alt_names.length > 0 ? { alt_names: f.properties.alt_names } : {}),
    })),
  ];
  writeFileSync(join(DATA_DIR, "codes.json"), JSON.stringify(codes, null, 2));

  console.log("\n11. Output file sizes");
  console.log(`  data/counties.topojson: ${fileSizeKb(join(DATA_DIR, "counties.topojson"))} KB`);
  console.log(`  data/constituencies.topojson: ${fileSizeKb(join(DATA_DIR, "constituencies.topojson"))} KB`);
  let wardsTotalKb = 0;
  for (const countyCode of wardsByCounty.keys()) {
    wardsTotalKb += Number(fileSizeKb(join(WARDS_DIR, `${countyCode}.topojson`)));
  }
  console.log(`  data/wards/*.topojson: ${wardsTotalKb.toFixed(1)} KB total across ${wardsByCounty.size} files`);
  console.log(`  data/codes.json: ${fileSizeKb(join(DATA_DIR, "codes.json"))} KB`);
  console.log(`  data/meta.json: ${fileSizeKb(join(DATA_DIR, "meta.json"))} KB`);

  rmSync(WORK_DIR, { recursive: true, force: true });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
