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
    /** One entry per area you have data for — areas you omit just render with `colors.noData`. */
    values: DatasetValueEntry[];
    /** Numeric (gradient) or categorical (exact match) — see `NumericDatasetColors`/`CategoricalDatasetColors`. */
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
    /**
     * Any number of point-marker layers, drawn on top of the coloured areas
     * (and unaffected by them — layers stay visible at every drill-down
     * level, they're just repositioned by the same pan/zoom). Markers keep
     * a constant on-screen size regardless of zoom.
     */
    pointLayers?: PointLayer[];
    /** Renders checkboxes for showing/hiding each point layer. Ignored if `pointLayers` is empty. Visibility is internal (uncontrolled) — there's no equivalent to `selection`/`activeDatasetId` for it. */
    showLayerToggles?: boolean;
    /** Clicking a marker always opens its popup (separate from an area's popup — the two can be open at once). Omit for a default popup showing just the point's `label`. */
    renderPointPopup?: (point: Point, layer: PointLayer) => ReactNode;
    /** Applied to the outer container div. */
    className?: string;
    /** Applied to the outer container div — set `width`/`height` here (or on a parent) if you're not relying on the default `width: 100%; height: 100%`. */
    style?: CSSProperties;
}

/** Colors a numeric dataset as a gradient between its own min and max value. */
export declare interface NumericDatasetColors {
    /** Gradient stops (2 or more CSS colors). Values are mapped onto this gradient between the dataset's own min and max — there's no fixed 0-100 assumption, so a turnout dataset ranging 40-70% still uses the full gradient. */
    scale: string[];
    /** Fill for an area with no matching value. */
    noData: string;
}

/** One point marker. `lat`/`lng` place it on the map; `category`, if set, is looked up in its layer's `categoryColors` to override the layer's default `color`. `data` is yours — never read by this package except by whatever `renderPointPopup` you supply. */
export declare interface Point {
    /** Stable identifier — must be unique within its layer (used as the React key). */
    id: string;
    lat: number;
    lng: number;
    /** Shown on hover, in the default popup, and as the marker's aria-label. */
    label: string;
    category?: string;
    data?: unknown;
}

/** A togglable group of point markers, drawn on top of the coloured areas. */
export declare interface PointLayer {
    /** Stable identifier — must be unique across `pointLayers` (used as the React key and by `showLayerToggles`). */
    id: string;
    /** Shown next to its checkbox in the layer toggles. */
    label: string;
    /** Default marker color for every point in this layer. */
    color: string;
    /** Per-category color override, keyed by `Point.category`. A point whose category isn't listed here (or has none) uses `color`. */
    categoryColors?: Record<string, string>;
    points: Point[];
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
