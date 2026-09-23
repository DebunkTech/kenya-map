/**
 * Parses and indexes data/reference/iebc-2022-registered-voters-per-caw.txt
 * — Kenya's official "Registered Voters per CAW, 2022 General Election"
 * list. See data/reference/README.md for provenance. Used to verify our
 * county/constituency codes match official IEBC numbering, and to resolve
 * official ward codes/names — see data/README.md for the full writeup.
 */

const ROW_RE = /^(\d{3})\s+(.+?)\s+(\d{3})\s+(.+?)\s+(\d{4})\s+(.+?)\s+([\d,]+)$/;

export function parseIebcReference(text) {
  const rows = [];
  const lines = text.trim().split("\n");
  for (const line of lines) {
    const m = line.match(ROW_RE);
    if (!m) throw new Error(`Could not parse IEBC reference line: ${line}`);
    rows.push({
      countyCode: m[1],
      countyName: m[2],
      constCode: m[3],
      constName: m[4],
      cawCode: m[5],
      cawName: m[6],
    });
  }
  return rows;
}

/** Word-order-independent normalization: catches both spelling-adjacent differences (WARD/CITY/COUNTY as noise words) and reordered compound names ("Ganjoni Ward-Shimanzi" vs "Shimanzi/Ganjoni"). */
export function normKey(s) {
  const tokens = s
    .trim()
    .toUpperCase()
    .replace(/\b(WARD|CITY|COUNTY)\b/g, "")
    .split(/[^A-Z0-9]+/)
    .filter(Boolean)
    .sort();
  return tokens.join("");
}

/** Squashes to bare alphanumerics with no word-splitting/sorting — unlike normKey, this also catches a single compound word on one side matching the same word split by a separator on the other ("Oldonyiro" vs "OLDO/NYIRO"), which token-sorting alone doesn't, since sorting only reorders whole tokens. */
function squash(s) {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Verifies every one of our county and constituency codes matches the
 * IEBC reference's numbering for the same real-world area (matched by
 * normalized name, since names are what were originally used to establish
 * this — codes are the thing being verified, not assumed). Throws with a
 * clear diagnostic on any mismatch, rather than silently trusting code
 * alignment the rest of the pipeline then depends on.
 *
 * `nameAliases` (optional, Map<normKey(sourceName), normKey(iebcName)>)
 * covers source-shapefile names that don't match the IEBC spelling/naming
 * directly — typos, and pre-2022 names for since-renamed/split
 * constituencies — purely so codes can still be paired up for this check.
 * It doesn't affect any name actually written out.
 */
export function verifyCodesMatchIebc(counties, constituencies, iebcRows, nameAliases = new Map()) {
  const iebcCountyByName = new Map();
  const iebcConstByName = new Map();
  for (const r of iebcRows) {
    iebcCountyByName.set(normKey(r.countyName), r.countyCode);
    iebcConstByName.set(normKey(r.constName), r.constCode);
  }

  const lookupKey = (name) => {
    const k = normKey(name);
    return nameAliases.get(k) ?? k;
  };

  const countyMismatches = [];
  for (const c of counties) {
    const iebcCode = iebcCountyByName.get(lookupKey(c.properties.name));
    if (iebcCode === undefined) {
      countyMismatches.push(`${c.properties.name} (${c.properties.code}): no matching name in IEBC reference`);
    } else if (iebcCode !== c.properties.code) {
      countyMismatches.push(`${c.properties.name}: ours=${c.properties.code} IEBC=${iebcCode}`);
    }
  }

  const constMismatches = [];
  for (const c of constituencies) {
    const iebcCode = iebcConstByName.get(lookupKey(c.properties.name));
    if (iebcCode === undefined) {
      constMismatches.push(`${c.properties.name} (${c.properties.code}): no matching name in IEBC reference`);
    } else if (iebcCode !== c.properties.code) {
      constMismatches.push(`${c.properties.name}: ours=${c.properties.code} IEBC=${iebcCode}`);
    }
  }

  if (countyMismatches.length > 0 || constMismatches.length > 0) {
    throw new Error(
      `County/constituency codes don't match IEBC numbering — the ward code-adoption pass below assumes they do:\n` +
        [...countyMismatches, ...constMismatches].map((m) => `  ${m}`).join("\n"),
    );
  }
}

/**
 * Resolves official CAW codes/names for `ourWards` ([{id, name}]) within a
 * *single* constituency, against that same constituency's official ward
 * list `iebcWards` ([{cawCode, cawName}]) — matching is scoped to one
 * constituency at a time by the caller, using the verified constituency
 * code, never across constituencies or by fuzzy constituency-name
 * matching (the pitfall the earlier ward.results.zip cross-check had).
 * Being scoped to one (usually 3-9 ward) constituency at a time is also
 * what makes the fuzzy pass below safe — the same edit-distance threshold
 * would risk false positives compared across all 1,450 wards nationally.
 *
 * Four passes, each only touching what's left unmatched by the one before:
 * 1. Exact match (normalized, word-order independent).
 * 2. Squash match: same idea, but without splitting into words at all —
 *    catches a compound word on one side matching the same word split by
 *    a separator on the other ("Oldonyiro" vs official "OLDO/NYIRO"),
 *    which word-sorting alone doesn't fix since it only reorders whole
 *    tokens.
 * 3. Fuzzy match: edit distance <=3 on the squashed name, only when
 *    there's a single unambiguous closest candidate (strictly closer than
 *    the second-closest) — absorbs typos/transliteration drift between
 *    the source shapefile and the official list ("Kaagari North" vs
 *    official "KAGAARI NORTH", "Chemundu/kapng'etunyi" vs official
 *    "CHEMUNDU/KAPNG'ETUNY").
 * 4. Elimination: if exactly one ward is left unmatched on *both* sides
 *    after 1-3, they're paired regardless of name similarity — not a
 *    guess: with every other ward in the constituency already confidently
 *    matched and the official and our ward counts equal, the one
 *    remaining pair must correspond (this also catches outright renames,
 *    not just spelling drift). Only ever applied for exactly-one-vs-one;
 *    two or more simultaneous leftovers on each side are ambiguous and
 *    are reported unmatched rather than guessed at.
 */
export function matchWardsWithinConstituency(ourWards, iebcWards) {
  const matches = new Map();
  const usedIebcCodes = new Set();
  const available = () => iebcWards.filter((iw) => !usedIebcCodes.has(iw.cawCode));

  let remainingOurs = [];
  for (const ow of ourWards) {
    const candidates = available().filter((iw) => normKey(iw.cawName) === normKey(ow.name));
    if (candidates.length === 1) {
      matches.set(ow.id, { ...candidates[0], method: "exact" });
      usedIebcCodes.add(candidates[0].cawCode);
    } else {
      remainingOurs.push(ow);
    }
  }

  const afterSquash = [];
  for (const ow of remainingOurs) {
    const candidates = available().filter((iw) => squash(iw.cawName) === squash(ow.name));
    if (candidates.length === 1) {
      matches.set(ow.id, { ...candidates[0], method: "squash" });
      usedIebcCodes.add(candidates[0].cawCode);
    } else {
      afterSquash.push(ow);
    }
  }
  remainingOurs = afterSquash;

  const afterFuzzy = [];
  for (const ow of remainingOurs) {
    const ourKey = squash(ow.name);
    let best = null;
    let bestDist = Infinity;
    let secondDist = Infinity;
    for (const iw of available()) {
      const dist = levenshtein(ourKey, squash(iw.cawName));
      if (dist < bestDist) {
        secondDist = bestDist;
        bestDist = dist;
        best = iw;
      } else if (dist < secondDist) {
        secondDist = dist;
      }
    }
    if (best && bestDist <= 3 && bestDist < secondDist) {
      matches.set(ow.id, { ...best, method: "fuzzy" });
      usedIebcCodes.add(best.cawCode);
    } else {
      afterFuzzy.push(ow);
    }
  }
  remainingOurs = afterFuzzy;
  const remainingIebc = available();

  if (remainingOurs.length === 1 && remainingIebc.length === 1) {
    matches.set(remainingOurs[0].id, { ...remainingIebc[0], method: "elimination" });
    return { matches, unmatchedOurs: [], unmatchedIebc: [] };
  }

  return { matches, unmatchedOurs: remainingOurs, unmatchedIebc: remainingIebc };
}
