/**
 * Cross-checks the spatial ward->constituency join against the election
 * dataset's own ward file (ward.results.zip), which carries a
 * self-reported CONSTITUEN name per ward from the same IEBC/election
 * vintage as our constituencies.zip — see data/README.md for the full
 * writeup of why this exists and what it found.
 */

function normKey(s) {
  return s
    .trim()
    .toUpperCase()
    .replace(/\s+WARD$/i, "")
    .replace(/[^A-Z0-9]/g, "");
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
 * The election ward file's own CONSTITUEN attribute is not itself fully
 * reliable. Every ward where it disagreed with the spatial join was
 * independently checked against Wikipedia constituency/ward pages and
 * official NGCDF constituency sites; these 6 are where the election file
 * itself turned out to be wrong (confirmed by 2+ independent sources
 * each) — the spatial join already had the right answer for all of them,
 * so they're excluded here rather than overridden. See data/README.md for
 * the correct constituency for each. Keyed by normalized "COUNTY|WARDNAME".
 */
const KNOWN_ELECTION_FILE_ERRORS = new Set([
  "NAIROBI|KABIRO", // actually Dagoretti North, not Dagoretti South
  "NAIROBI|KAWANGWARE", // actually Dagoretti North, not Dagoretti South
  "MERU|KIAGU", // actually Central Imenti, not Buuri
  "KITUI|KIOMOKYETHANI", // actually Mwingi West, not Mwingi Central
  "KITUI|MULANGO", // actually Kitui Central, not Kitui Rural
  "NAROK|ILDAMAT", // actually Narok East, not Narok South
]);

/**
 * Individually verified corrections sourced from Kenya's official
 * "Registered Voters per County Assembly Ward, 2022 General Election"
 * list — the most authoritative and current source found (see
 * data/reference/README.md for provenance). Each entry was cross-checked
 * individually, not blanket-applied — the 2022 list also has its own
 * errors (see the county-name normalization pitfall in data/README.md),
 * so wholesale fuzzy-matching against it the way `resolveConstituencyByName`
 * does for ward.results.zip was deliberately not done. Two of the first 8
 * (Sabaki, Nyayo Highrise) are wards no prior pass touched; one (Fino)
 * *reverts* a wrong correction the ward.results.zip pass applied — the
 * 2022 list confirms the original spatial join had it right and
 * ward.results.zip was wrong. Takes priority over both the spatial join
 * and the ward.results.zip-based correction.
 *
 * The final 6 entries (Athi River onward) were found by a later pass
 * cross-checking every ward's *count* per constituency against the 2022
 * list (data/README.md's "Adopting official ward codes" section): each
 * constituency with a count mismatch was inspected individually, and
 * these are cases where the ward's official CAW name has an *exact*
 * match somewhere in the 2022 list, just under a different constituency
 * than the spatial/election-file join put it — not a spelling variant of
 * something already in its assigned constituency. Kalama's is the only
 * one that also crosses a county line (Makueni's Kilome -> Machakos's
 * Machakos Town).
 * Keyed by normalized "COUNTY|WARDNAME".
 */
const MANUAL_WARD_CORRECTIONS = new Map([
  ["KILIFI|SABAKI", "MAGARINI"],
  ["MANDERA|FINO", "LAFEY"],
  ["MANDERA|LIBEHIA", "MANDERA EAST"],
  ["EMBU|GATURINORTH", "RUNYENJES"],
  ["LAIKIPIA|UMANDE", "LAIKIPIA EAST"],
  ["NAKURU|LONDON", "NAKURU TOWN WEST"],
  ["KISUMU|NYALENDAA", "KISUMU EAST"],
  ["NAIROBI|NYAYOHIGHRISE", "LANGATA"],
  ["KAJIADO|ATHIRIVER", "MAVOKO"],
  ["BUSIA|BUKHAYONORTHWALATSI", "NAMBALE"],
  ["MAKUENI|KALAMA", "MACHAKOS TOWN"],
  ["BUSIA|KOYONZO", "MATUNGU"],
  ["KAKAMEGA|SHINOYISHIKOMARIESUMEIYA", "NAVAKHOLO"],
  ["NAIROBI|UPPERSAVANNA", "EMBAKASI EAST"],
]);

/**
 * Checks `wardName`/`countyName` (the ward's *current*, spatially-assigned
 * county — the key it was verified under, not necessarily its correct one)
 * against MANUAL_WARD_CORRECTIONS and resolves the named constituency
 * within `allConstituencies` (every constituency nationally, not just the
 * current county's — a small number of these corrections move a ward
 * across a county line too, e.g. Kalama from Makueni's Kilome to
 * Machakos's Machakos Town), or returns null if there's no entry (the
 * normal case for the vast majority of wards) or the entry doesn't
 * resolve to a real constituency (a bug in this function, not expected in
 * practice).
 */
export function resolveManualCorrection(wardName, countyName, allConstituencies) {
  const key = `${normKey(countyName)}|${normKey(wardName)}`;
  const claimedName = MANUAL_WARD_CORRECTIONS.get(key);
  if (!claimedName) return null;
  const claimedKey = normKey(claimedName);
  const constituency = allConstituencies.find((c) => normKey(c.name) === claimedKey);
  return constituency ? { constituency, method: "manual-2022" } : null;
}

/** Builds a lookup from the election ward file's features, keyed by normalized (county, ward name). Wards with a duplicate key (two same-named wards in one county) are kept as an array so callers can detect and skip the ambiguity. */
export function buildElectionWardIndex(features) {
  const index = new Map();
  for (const f of features) {
    const p = f.properties;
    const key = `${normKey(p.COUNTY_NAM)}|${normKey(p.NAME)}`;
    if (!index.has(key)) index.set(key, []);
    index.get(key).push({ constituencyName: p.CONSTITUEN });
  }
  return index;
}

/**
 * Resolves `wardName` (within `countyName`) to one of `countyConstituencies`
 * (this county's own constituencies, [{code,name}]) using the election
 * ward index, or returns null if there's no confident resolution — either
 * because the ward isn't in the election file (it's missing 11 of 1,450),
 * its name matched more than one election ward in this county (ambiguous),
 * or its claimed constituency name doesn't correspond to anything real
 * (the election file has its own errors — e.g. one row's CONSTITUEN field
 * is just the string "805").
 *
 * Exact name matches are trusted directly. Near-matches (edit distance <=2,
 * and unambiguously the closest of this county's constituencies) are
 * trusted too, to absorb the election file's own typos (e.g. "DAADAB" for
 * "Dadaab") — but only within the same county, specifically to avoid
 * matching across unrelated same-shaped names like "Tigania East" vs
 * "Tigania West", which are different real constituencies, not a typo of
 * each other.
 */
export function resolveConstituencyByName(wardName, countyName, electionIndex, countyConstituencies) {
  const key = `${normKey(countyName)}|${normKey(wardName)}`;
  if (KNOWN_ELECTION_FILE_ERRORS.has(key)) return null;
  const candidates = electionIndex.get(key);
  if (!candidates || candidates.length !== 1) return null;

  const claimed = candidates[0].constituencyName?.trim();
  if (!claimed || /^\d+$/.test(claimed)) return null;

  const claimedKey = normKey(claimed);
  const exact = countyConstituencies.find((c) => normKey(c.name) === claimedKey);
  if (exact) return { constituency: exact, method: "exact", claimed };

  let best = null;
  let bestDist = Infinity;
  let secondDist = Infinity;
  for (const c of countyConstituencies) {
    const dist = levenshtein(claimedKey, normKey(c.name));
    if (dist < bestDist) {
      secondDist = bestDist;
      bestDist = dist;
      best = c;
    } else if (dist < secondDist) {
      secondDist = dist;
    }
  }
  if (best && bestDist <= 2 && bestDist < secondDist) {
    return { constituency: best, method: "fuzzy", claimed };
  }
  return null;
}
