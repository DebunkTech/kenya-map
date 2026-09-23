/** The three drill-down levels a boundary can belong to. */
export type AreaLevel = "county" | "constituency" | "ward";

/**
 * Which area is currently drilled into. `undefined` (or an empty object)
 * means the whole-country view. Setting `constituency` without `county`
 * (or `ward` without `constituency`) is not a valid state — each level is
 * only reachable through its parent.
 */
export interface Selection {
  county?: string;
  constituency?: string;
  ward?: string;
}

/** A single boundary feature (county, constituency or ward) with its geometry stripped to just identity/lineage. */
export interface AreaFeature {
  code: string;
  name: string;
  level: AreaLevel;
  countyCode?: string;
  constituencyCode?: string;
}

/** The raw `properties` shape on features straight out of data/*.topojson — see data/README.md. */
export interface RawAreaProperties {
  code: string;
  name: string;
  county_code?: string;
  constituency_code?: string;
}
