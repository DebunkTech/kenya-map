import { scaleLinear } from "d3-scale";

import type { AreaFeature, AreaLevel } from "./types";

/** One area's value within a dataset. `code` matches an `AreaFeature.code` at the dataset's own `level`. */
export interface DatasetValueEntry {
  code: string;
  value: number | string;
}

/** Colors a numeric dataset as a gradient between its own min and max value. */
export interface NumericDatasetColors {
  /** Gradient stops (2 or more CSS colors). Values are mapped onto this gradient between the dataset's own min and max — there's no fixed 0-100 assumption, so a turnout dataset ranging 40-70% still uses the full gradient. */
  scale: string[];
  /** Fill for an area with no matching value. */
  noData: string;
}

/** Colors a categorical (text-valued) dataset by exact match. */
export interface CategoricalDatasetColors {
  /** Fill per exact category value, e.g. `{ ODM: "#f97316", UDA: "#facc15" }`. */
  categories: Record<string, string>;
  /** Fill for an area with no matching value, or a value not listed in `categories`. */
  noData: string;
}

export type DatasetColors = NumericDatasetColors | CategoricalDatasetColors;

export function isNumericColors(colors: DatasetColors): colors is NumericDatasetColors {
  return "scale" in colors;
}

/** A single choropleth dataset. One dataset colors the map at a time (see `KenyaMapProps.activeDatasetId`); it only takes effect while the map is showing its `level`. */
export interface Dataset {
  /** Stable identifier — used in `activeDatasetId`, `onDatasetChange`, and as the key in a popup's `values` record. */
  id: string;
  /** Display label, used in the dataset switcher and the default popup. */
  label: string;
  /** Which drill-down level this dataset's `values` codes belong to. */
  level: AreaLevel;
  values: DatasetValueEntry[];
  colors: DatasetColors;
  /** Formats a raw value for display (legend, tooltip, default popup). Defaults to `value.toLocaleString()` for numbers and the raw string otherwise. */
  format?: (value: number | string) => string;
}

/** A dataset's value for one area, already formatted — what a popup receives per dataset id. `undefined` when the dataset doesn't apply at this area's level, or has no entry for this area's code. */
export interface DatasetPopupValue {
  value: number | string;
  formatted: string;
}

export function defaultFormat(value: number | string): string {
  return typeof value === "number" ? value.toLocaleString() : value;
}

/**
 * Builds a `code -> CSS color` lookup for one dataset, ready to call once
 * per area while rendering. Computing the numeric domain (min/max of the
 * dataset's own values) and constructing the d3 scale happens once here,
 * not per-area — callers should memoize this per dataset.
 */
export function buildColorLookup(dataset: Dataset): (code: string) => string {
  const byCode = new Map(dataset.values.map((v) => [v.code, v.value]));

  if (isNumericColors(dataset.colors)) {
    const { scale, noData } = dataset.colors;
    const nums = dataset.values
      .map((v) => v.value)
      .filter((v): v is number => typeof v === "number" && !Number.isNaN(v));

    if (nums.length === 0 || scale.length === 0) {
      return () => noData;
    }
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    if (min === max) {
      // A degenerate (single-value or all-equal) domain has no gradient to
      // speak of — every area with data gets the scale's last color.
      const flat = scale[scale.length - 1];
      return (code) => (byCode.has(code) ? flat : noData);
    }
    // Evenly-spaced domain stops between min and max, one per color, so
    // `scaleLinear` interpolates piecewise through all of them (not just
    // the first/last) for scales with more than 2 stops.
    const domain = scale.map((_, i) => min + (i / (scale.length - 1)) * (max - min));
    const colorScale = scaleLinear<string>().domain(domain).range(scale).clamp(true);
    return (code) => {
      const v = byCode.get(code);
      return typeof v === "number" ? colorScale(v) : noData;
    };
  }

  const { categories, noData } = dataset.colors;
  return (code) => {
    const v = byCode.get(code);
    if (v === undefined) return noData;
    return categories[String(v)] ?? noData;
  };
}

/** Every configured dataset's value for one clicked area, keyed by dataset id — what `renderPopup` and the default popup receive. */
export function buildPopupValues(
  area: AreaFeature,
  datasets: Dataset[],
): Record<string, DatasetPopupValue | undefined> {
  const result: Record<string, DatasetPopupValue | undefined> = {};
  for (const dataset of datasets) {
    if (dataset.level !== area.level) {
      result[dataset.id] = undefined;
      continue;
    }
    const entry = dataset.values.find((v) => v.code === area.code);
    if (!entry) {
      result[dataset.id] = undefined;
      continue;
    }
    result[dataset.id] = {
      value: entry.value,
      formatted: dataset.format ? dataset.format(entry.value) : defaultFormat(entry.value),
    };
  }
  return result;
}

// Vite (and most other bundlers) replace `process.env.NODE_ENV` at build
// time even in library output, so this works for consumers without this
// package needing its own build-time env handling — but browsers don't
// define a `process` global at all outside a bundler, hence the typeof
// guard.
const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

// Module-level (not component state) so a warning is only ever printed
// once per dataset+code for the lifetime of the page, even across
// remounts or multiple <KenyaMap /> instances.
const warnedUnmatched = new Set<string>();

// Every ward code seen so far in this session, across every county's
// wards/{code}.topojson fetched by any <KenyaMap /> instance — ward files
// load one county at a time, so this only ever grows, never shrinks, and
// never represents the full 1,450 unless every county's been visited. See
// `warnUnmatchedCodes`.
const knownWardCodes = new Set<string>();

export function accumulateKnownWardCodes(features: GeoJSON.Feature[]): Set<string> {
  for (const f of features) {
    const code = (f.properties as { code?: string } | null)?.code;
    if (code) knownWardCodes.add(code);
  }
  return knownWardCodes;
}

/**
 * Dev-only console warning for dataset values whose `code` doesn't match
 * any area `knownCodes` currently knows about — see
 * `KenyaMapProps.datasets` and the "codes.json" section of data/README.md
 * for how codes are meant to line up.
 *
 * For county and constituency datasets `knownCodes` can be the *complete*
 * set (both files are fetched in full — county always, constituency once
 * any county is selected), so this is exact. Ward files load one county
 * at a time, so `knownCodes` for a ward-level dataset is whatever's been
 * fetched *so far* in this session — a code for a county the visitor
 * hasn't drilled into yet will look unmatched until they do. `caveat`
 * carries that distinction into the message so it isn't mistaken for a
 * confirmed bad code.
 */
export function warnUnmatchedCodes(
  dataset: Pick<Dataset, "id" | "level" | "values">,
  knownCodes: Set<string>,
  caveat: "exact" | "wards load per-county, so this may just not be visited yet",
): void {
  if (!isDev) return;
  for (const { code } of dataset.values) {
    if (knownCodes.has(code)) continue;
    const key = `${dataset.id}:${dataset.level}:${code}`;
    if (warnedUnmatched.has(key)) continue;
    warnedUnmatched.add(key);
    console.warn(
      `[@debunktech/kenya-map] Dataset "${dataset.id}" has a value for ${dataset.level} code "${code}", ` +
        `which doesn't match any currently-known ${dataset.level}${caveat === "exact" ? "" : ` (${caveat})`}.`,
    );
  }
}
