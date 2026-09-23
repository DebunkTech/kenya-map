import { CSSProperties } from 'react';
import { JSX as JSX_2 } from 'react';
import { ReactNode } from 'react';

/** A single boundary feature (county, constituency or ward) with its geometry stripped to just identity/lineage. */
export declare interface AreaFeature {
    code: string;
    name: string;
    level: AreaLevel;
    countyCode?: string;
    constituencyCode?: string;
}

/** The three drill-down levels a boundary can belong to. */
export declare type AreaLevel = "county" | "constituency" | "ward";

/** Colors a categorical (text-valued) dataset by exact match. */
export declare interface CategoricalDatasetColors {
    /** Fill per exact category value, e.g. `{ ODM: "#f97316", UDA: "#facc15" }`. */
    categories: Record<string, string>;
    /** Fill for an area with no matching value, or a value not listed in `categories`. */
    noData: string;
}

/** A single choropleth dataset. One dataset colors the map at a time (see `KenyaMapProps.activeDatasetId`); it only takes effect while the map is showing its `level`. */
export declare interface Dataset {
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

export declare type DatasetColors = NumericDatasetColors | CategoricalDatasetColors;

/** A dataset's value for one area, already formatted — what a popup receives per dataset id. `undefined` when the dataset doesn't apply at this area's level, or has no entry for this area's code. */
export declare interface DatasetPopupValue {
    value: number | string;
    formatted: string;
}

/** One area's value within a dataset. `code` matches an `AreaFeature.code` at the dataset's own `level`. */
export declare interface DatasetValueEntry {
    code: string;
    value: number | string;
}

export declare function KenyaMap(props: KenyaMapProps): JSX_2.Element;

export declare interface KenyaMapProps {
    /**
     * Base URL that boundary TopoJSON files are fetched from. Defaults to a
     * jsDelivr URL pointing at this repo's `data/` folder for the installed
     * version, so geometry is never bundled into the JavaScript.
     */
    boundariesBaseUrl?: string;
    /** Controlled drill-down state. Omit this prop entirely for uncontrolled (internal) selection. */
    selection?: Selection_2;
    /** Called whenever the drill-down selection changes, whether the change came from a click, the breadcrumb, the reset button, or Escape. */
    onSelect?: (selection: Selection_2) => void;
    /**
     * Any number of choropleth datasets. Only one colors the map at a time
     * (see `activeDatasetId`), and only while the map is showing that
     * dataset's own `level` — areas at other levels get a neutral fill.
     * Also what a popup's `values` are built from (see `renderPopup`),
     * regardless of which one is currently active.
     */
    datasets?: Dataset[];
    /** Controls which dataset colors the map. Omit for uncontrolled (defaults to the first dataset in `datasets`). */
    activeDatasetId?: string;
    /** Called when the active dataset changes, whether from the built-in switcher or (in controlled mode) needed to let the parent update `activeDatasetId`. */
    onDatasetChange?: (id: string) => void;
    /** Renders a small built-in control for picking the active dataset. Ignored if `datasets` is empty. */
    showDatasetSwitcher?: boolean;
    /** Renders a small built-in legend for the active dataset's gradient or categories. Ignored if there's no active dataset. */
    showLegend?: boolean;
    /**
     * Clicking an area always both drills down (as in the uncontrolled
     * drill-down behavior) and opens a popup for that area, anchored to
     * it. `values` has one entry per configured dataset (keyed by its
     * `id`), `undefined` where that dataset doesn't apply at this area's
     * level or has no value for its code. Omit for a sensible default
     * popup: the area's name plus every dataset's label and formatted
     * value (or "No data").
     */
    renderPopup?: (area: AreaFeature, values: Record<string, DatasetPopupValue | undefined>) => ReactNode;
    className?: string;
    style?: CSSProperties;
}

/** Colors a numeric dataset as a gradient between its own min and max value. */
export declare interface NumericDatasetColors {
    /** Gradient stops (2 or more CSS colors). Values are mapped onto this gradient between the dataset's own min and max — there's no fixed 0-100 assumption, so a turnout dataset ranging 40-70% still uses the full gradient. */
    scale: string[];
    /** Fill for an area with no matching value. */
    noData: string;
}

/**
 * Which area is currently drilled into. `undefined` (or an empty object)
 * means the whole-country view. Setting `constituency` without `county`
 * (or `ward` without `constituency`) is not a valid state — each level is
 * only reachable through its parent.
 */
declare interface Selection_2 {
    county?: string;
    constituency?: string;
    ward?: string;
}
export { Selection_2 as Selection }

export { }
