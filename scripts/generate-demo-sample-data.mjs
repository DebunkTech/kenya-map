/**
 * One-off generator for the demo app's sample dataset: real registered-
 * voter counts from the same 2022 IEBC list the data pipeline itself uses
 * for official codes/names (data/reference/iebc-2022-registered-voters-per-caw.txt
 * — see that file's README for provenance). This is *not* part of the
 * build-data.mjs pipeline and doesn't touch anything under data/ — it only
 * produces demo/sampleVoterData.json, so the demo can show a real,
 * correctly-attributed choropleth instead of made-up numbers. Re-run with
 * `node scripts/generate-demo-sample-data.mjs` if the reference file ever
 * changes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROW_RE = /^(\d{3})\s+(.+?)\s+(\d{3})\s+(.+?)\s+(\d{4})\s+(.+?)\s+([\d,]+)$/;

const text = readFileSync(join(ROOT, "data/reference/iebc-2022-registered-voters-per-caw.txt"), "utf8");
const countyVotersByCode = new Map();
const constVotersByCode = new Map();
const wardVoters = [];

for (const line of text.trim().split("\n")) {
  const m = line.match(ROW_RE);
  if (!m) throw new Error(`Could not parse line: ${line}`);
  const [, countyCode, , constCode, , cawCode, , votersStr] = m;
  const voters = Number(votersStr.replace(/,/g, ""));
  countyVotersByCode.set(countyCode, (countyVotersByCode.get(countyCode) ?? 0) + voters);
  constVotersByCode.set(constCode, (constVotersByCode.get(constCode) ?? 0) + voters);
  wardVoters.push({ code: cawCode, value: voters });
}

const toEntries = (map) =>
  [...map.entries()].map(([code, value]) => ({ code, value })).sort((a, b) => a.code.localeCompare(b.code));

const output = {
  countyVoters: toEntries(countyVotersByCode),
  constituencyVoters: toEntries(constVotersByCode),
  wardVoters: wardVoters.sort((a, b) => a.code.localeCompare(b.code)),
};

writeFileSync(join(ROOT, "demo/sampleVoterData.json"), JSON.stringify(output));
console.log(
  `Wrote demo/sampleVoterData.json: ${output.countyVoters.length} counties, ` +
    `${output.constituencyVoters.length} constituencies, ${output.wardVoters.length} wards.`,
);
