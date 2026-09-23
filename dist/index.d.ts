import { CSSProperties } from 'react';
import { JSX as JSX_2 } from 'react';

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
    className?: string;
    style?: CSSProperties;
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
