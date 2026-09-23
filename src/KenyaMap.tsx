import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior, type ZoomTransform } from "d3-zoom";
import type { GeoPath, GeoProjection } from "d3-geo";

import { useTopoJson } from "./useTopoJson";
import { useMapMeta } from "./useMeta";
import { createPathGenerator, createProjection, maxZoomForBBox, tweenZoomTo, zoomTransformForBounds } from "./geo";
import {
  accumulateKnownWardCodes,
  buildColorLookup,
  buildPopupValues,
  warnUnmatchedCodes,
  type Dataset,
  type DatasetPopupValue,
} from "./datasets";
import { DatasetSwitcher, Legend } from "./DatasetControls";
import { colorForPoint, type Point, type PointLayer } from "./points";
import { PointLayerToggles } from "./PointLayerControls";
import type { AreaFeature, AreaLevel, RawAreaProperties, Selection } from "./types";

export interface KenyaMapProps {
  /**
   * Base URL that boundary TopoJSON files are fetched from. Defaults to a
   * jsDelivr URL pointing at this repo's `data/` folder for the installed
   * version, so geometry is never bundled into the JavaScript.
   */
  boundariesBaseUrl?: string;
  /** Controlled drill-down state. Omit this prop entirely for uncontrolled (internal) selection. */
  selection?: Selection;
  /** Called whenever the drill-down selection changes, whether the change came from a click, the breadcrumb, the reset button, or Escape. */
  onSelect?: (selection: Selection) => void;
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

const DEFAULT_BOUNDARIES_BASE_URL = "https://cdn.jsdelivr.net/gh/DebunkTech/kenya-map@v0.1.0/data";
// Used only until data/meta.json loads (typically milliseconds — it's a
// ~200 byte fetch issued alongside counties.topojson) or if it fails to.
const FALLBACK_MAX_ZOOM = 12;

function useElementSize(ref: RefObject<HTMLElement | null>): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function areaProps(feature: GeoJSON.Feature): RawAreaProperties {
  return feature.properties as RawAreaProperties;
}

function findFeature(
  collection: GeoJSON.FeatureCollection | undefined,
  code: string | undefined,
): GeoJSON.Feature | undefined {
  if (!collection || !code) return undefined;
  return collection.features.find((f) => areaProps(f).code === code);
}

function toAreaFeature(feature: GeoJSON.Feature, level: AreaLevel): AreaFeature {
  const p = areaProps(feature);
  return { code: p.code, name: p.name, level, countyCode: p.county_code, constituencyCode: p.constituency_code };
}

interface HoverInfo {
  name: string;
  x: number;
  y: number;
}

interface PopupState {
  area: AreaFeature;
  /** The clicked area's centroid in path-space (untransformed) — screen position is `transform.apply([cx, cy])`, recomputed every render, so the popup stays glued to the area through the zoom-in tween and any further pan/zoom. */
  cx: number;
  cy: number;
}

interface PointPopupState {
  point: Point;
  layer: PointLayer;
  /** The point's projected path-space position (untransformed) — same `transform.apply` treatment as PopupState's cx/cy. */
  x: number;
  y: number;
}

function AreaLayer({
  features,
  path,
  opacity,
  focusable,
  getFill,
  onHover,
  onLeave,
  onActivate,
}: {
  features: GeoJSON.Feature[];
  path: GeoPath;
  opacity: number;
  /**
   * Whether this layer takes tab stops. Every layer is clickable
   * (including faded ones — clicking a faded area switches to it, per
   * user testing feedback), but keyboard Tab only reaches the current,
   * unfaded layer — faded areas stay reachable by mouse only.
   */
  focusable: boolean;
  /** Per-area fill, from the active dataset's color lookup. Omitted (falls back to the CSS custom property) when no dataset applies at this layer's level. */
  getFill?: (code: string) => string;
  onHover: (name: string, clientX: number, clientY: number) => void;
  onLeave: () => void;
  onActivate: (feature: GeoJSON.Feature) => void;
}) {
  return (
    <g opacity={opacity} style={{ transition: "opacity 300ms ease" }}>
      {features.map((feature) => {
        const properties = areaProps(feature);
        const d = path(feature);
        if (!d) return null;
        return (
          <path
            key={properties.code}
            className="kenya-map-area"
            d={d}
            fill={getFill ? getFill(properties.code) : "var(--kenya-map-fill, #d4d4d8)"}
            stroke="var(--kenya-map-stroke, #71717a)"
            strokeWidth={0.75}
            tabIndex={focusable ? 0 : -1}
            role="button"
            aria-label={properties.name}
            style={{ cursor: "pointer", outline: "none", transition: "fill 200ms ease" }}
            onMouseEnter={(event) => onHover(properties.name, event.clientX, event.clientY)}
            onMouseMove={(event) => onHover(properties.name, event.clientX, event.clientY)}
            onMouseLeave={onLeave}
            onFocus={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              onHover(properties.name, rect.left + rect.width / 2, rect.top + rect.height / 2);
            }}
            onBlur={onLeave}
            onClick={() => onActivate(feature)}
            onKeyDown={(event) => {
              if (focusable && event.key === "Enter") {
                event.preventDefault();
                onActivate(feature);
              }
            }}
          />
        );
      })}
    </g>
  );
}

const MARKER_RADIUS = 5;

/**
 * Point markers, rendered as a sibling of the areas' transformed `<g>`
 * rather than inside it — each marker's *position* is computed by hand
 * (`transform.apply(projection([lng, lat]))`, recomputed every render) so
 * it moves with the map exactly like an area does, but its own `<circle>`
 * radius is never inside a `scale(k)` transform, so it stays a constant
 * size on screen regardless of zoom — unlike area strokes, which use
 * `vector-effect: non-scaling-stroke` for the same visual effect because
 * they *do* need to live inside that scaled group (their fill/outline is
 * the zoomed shape itself).
 */
function PointMarkers({
  layers,
  hiddenLayerIds,
  projection,
  transform,
  onHover,
  onLeave,
  onActivate,
}: {
  layers: PointLayer[];
  hiddenLayerIds: Set<string>;
  projection: GeoProjection;
  transform: ZoomTransform;
  onHover: (name: string, clientX: number, clientY: number) => void;
  onLeave: () => void;
  onActivate: (point: Point, layer: PointLayer) => void;
}) {
  return (
    <g>
      {layers
        .filter((layer) => !hiddenLayerIds.has(layer.id))
        .flatMap((layer) =>
          layer.points.map((point) => {
            const projected = projection([point.lng, point.lat]);
            if (!projected) return null;
            const [x, y] = transform.apply(projected);
            return (
              <circle
                key={`${layer.id}:${point.id}`}
                cx={x}
                cy={y}
                r={MARKER_RADIUS}
                fill={colorForPoint(layer, point)}
                stroke="#fff"
                strokeWidth={1.5}
                tabIndex={0}
                role="button"
                aria-label={point.label}
                style={{ cursor: "pointer", outline: "none" }}
                onMouseEnter={(event) => onHover(point.label, event.clientX, event.clientY)}
                onMouseMove={(event) => onHover(point.label, event.clientX, event.clientY)}
                onMouseLeave={onLeave}
                onFocus={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  onHover(point.label, rect.left + rect.width / 2, rect.top + rect.height / 2);
                }}
                onBlur={onLeave}
                onClick={(event) => {
                  event.stopPropagation();
                  onActivate(point, layer);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    onActivate(point, layer);
                  }
                }}
              />
            );
          }),
        )}
    </g>
  );
}

function DefaultPointPopupContent({ point }: { point: Point }) {
  return <div>{point.label}</div>;
}

function Popup({ x, y, onClose, children }: { x: number; y: number; onClose: () => void; children: ReactNode }) {
  return (
    <div
      role="dialog"
      aria-label="Area details"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, calc(-100% - 10px))",
        zIndex: 3,
        background: "var(--kenya-map-popup-bg, #fff)",
        color: "var(--kenya-map-popup-color, inherit)",
        border: "1px solid var(--kenya-map-stroke, #71717a)",
        borderRadius: 6,
        padding: "8px 28px 8px 10px",
        fontFamily: "sans-serif",
        fontSize: 13,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        maxWidth: 240,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 4,
          right: 6,
          border: "none",
          background: "none",
          cursor: "pointer",
          font: "inherit",
          fontSize: 16,
          lineHeight: 1,
          padding: 4,
          color: "inherit",
        }}
      >
        ×
      </button>
      {children}
    </div>
  );
}

function DefaultPopupContent({
  area,
  values,
  datasets,
}: {
  area: AreaFeature;
  values: Record<string, DatasetPopupValue | undefined>;
  datasets: Dataset[];
}) {
  return (
    <div>
      <div style={{ fontWeight: 600, marginBottom: datasets.length ? 4 : 0 }}>{area.name}</div>
      {datasets.map((dataset) => (
        <div key={dataset.id}>
          {dataset.label}: {values[dataset.id]?.formatted ?? "No data"}
        </div>
      ))}
    </div>
  );
}

function LayerMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: 14,
        color: "var(--kenya-map-stroke, #71717a)",
        textAlign: "center",
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}

export function KenyaMap(props: KenyaMapProps) {
  const boundariesBaseUrl = props.boundariesBaseUrl ?? DEFAULT_BOUNDARIES_BASE_URL;

  const [internalSelection, setInternalSelection] = useState<Selection>({});
  const isControlled = props.selection !== undefined;
  const selection = isControlled ? props.selection! : internalSelection;
  const onSelectRef = useRef(props.onSelect);
  onSelectRef.current = props.onSelect;
  const setSelection = useCallback(
    (next: Selection) => {
      if (!isControlled) setInternalSelection(next);
      onSelectRef.current?.(next);
    },
    [isControlled],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(containerRef);

  const [countiesState, retryCounties] = useTopoJson(`${boundariesBaseUrl}/counties.topojson`);
  const [constituenciesState, retryConstituencies] = useTopoJson(
    selection.county ? `${boundariesBaseUrl}/constituencies.topojson` : null,
  );
  const [wardsState, retryWards] = useTopoJson(
    selection.county ? `${boundariesBaseUrl}/wards/${selection.county}.topojson` : null,
  );
  const metaState = useMapMeta(boundariesBaseUrl);

  const countyFeatures = countiesState.status === "ready" ? countiesState.data.features : [];
  const constituencyFeatures = useMemo(() => {
    if (constituenciesState.status !== "ready" || !selection.county) return [];
    return constituenciesState.data.features.filter((f) => areaProps(f).county_code === selection.county);
  }, [constituenciesState, selection.county]);
  const wardFeatures = useMemo(() => {
    if (wardsState.status !== "ready" || !selection.constituency) return [];
    return wardsState.data.features.filter((f) => areaProps(f).constituency_code === selection.constituency);
  }, [wardsState, selection.constituency]);

  // Which level is on screen right now — not the same as `selection` having
  // a `ward` set: once a constituency is picked, its wards are what's
  // showing, whether or not one of them is itself selected yet.
  const currentLevel: AreaLevel = !selection.county ? "county" : !selection.constituency ? "constituency" : "ward";

  const datasets = props.datasets;
  const [internalActiveDatasetId, setInternalActiveDatasetId] = useState<string | undefined>(() => datasets?.[0]?.id);
  const isDatasetControlled = props.activeDatasetId !== undefined;
  const activeDatasetId = isDatasetControlled ? props.activeDatasetId : internalActiveDatasetId;
  const onDatasetChangeRef = useRef(props.onDatasetChange);
  onDatasetChangeRef.current = props.onDatasetChange;
  const setActiveDatasetId = useCallback(
    (id: string) => {
      if (!isDatasetControlled) setInternalActiveDatasetId(id);
      onDatasetChangeRef.current?.(id);
    },
    [isDatasetControlled],
  );
  // Covers datasets arriving after mount (e.g. the consumer's own async
  // fetch) in uncontrolled mode — without this, a `datasets` prop that's
  // empty on first render would leave no dataset ever active, since the
  // `useState` initializer above only runs once. Skipped once the visitor
  // (or the consumer, in controlled mode) has actually picked one.
  useEffect(() => {
    if (!isDatasetControlled && internalActiveDatasetId === undefined && datasets && datasets.length > 0) {
      setInternalActiveDatasetId(datasets[0].id);
    }
  }, [isDatasetControlled, internalActiveDatasetId, datasets]);

  const activeDataset = datasets?.find((d) => d.id === activeDatasetId);
  // Rebuilding this touches every one of the dataset's values to compute
  // its color domain, so it's worth memoizing rather than doing that on
  // every area while rendering the layer below.
  const colorLookup = useMemo(() => (activeDataset ? buildColorLookup(activeDataset) : null), [activeDataset]);

  // Dev-only: warn about dataset values whose code matches no area this
  // component currently knows about. County/constituency datasets can be
  // checked exhaustively (both files load in full); a ward-level dataset
  // can only be checked against whichever counties' wards have loaded so
  // far this session — see warnUnmatchedCodes.
  useEffect(() => {
    if (!datasets) return;
    const codes = new Set(countyFeatures.map((f) => areaProps(f).code));
    for (const dataset of datasets) {
      if (dataset.level === "county") warnUnmatchedCodes(dataset, codes, "exact");
    }
  }, [datasets, countyFeatures]);
  useEffect(() => {
    if (!datasets || constituenciesState.status !== "ready") return;
    const codes = new Set(constituenciesState.data.features.map((f) => areaProps(f).code));
    for (const dataset of datasets) {
      if (dataset.level === "constituency") warnUnmatchedCodes(dataset, codes, "exact");
    }
  }, [datasets, constituenciesState]);
  useEffect(() => {
    if (!datasets || wardsState.status !== "ready") return;
    const known = accumulateKnownWardCodes(wardsState.data.features);
    for (const dataset of datasets) {
      if (dataset.level === "ward") {
        warnUnmatchedCodes(dataset, known, "wards load per-county, so this may just not be visited yet");
      }
    }
  }, [datasets, wardsState]);

  const projection = useMemo(() => {
    if (countiesState.status !== "ready" || width === 0 || height === 0) return null;
    return createProjection(countiesState.data, width, height);
  }, [countiesState, width, height]);
  const path = useMemo(() => (projection ? createPathGenerator(projection) : null), [projection]);

  // The max zoom level: computed so the country's smallest ward can just
  // fill the viewport, using the bounds shipped in data/meta.json. Falls
  // back to a fixed default only until that tiny fetch resolves.
  const maxZoom = useMemo(() => {
    if (!path || width === 0 || height === 0 || metaState.status !== "ready") return FALLBACK_MAX_ZOOM;
    return Math.max(1, maxZoomForBBox(path, metaState.data.maxZoomWard.bbox, width, height));
  }, [path, width, height, metaState]);

  const svgRef = useRef<SVGSVGElement>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const [transform, setTransform] = useState(zoomIdentity);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || width === 0 || height === 0) return;
    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, maxZoom])
      .on("zoom", (event: D3ZoomEvent<SVGSVGElement, unknown>) => setTransform(event.transform));
    zoomBehaviorRef.current = behavior;
    select(svg).call(behavior);
    return () => {
      select(svg).on(".zoom", null);
    };
    // maxZoom changes at most once in practice (fallback -> real value,
    // once meta.json resolves), so this only rebinds twice on mount, not
    // continuously — see the comment on FALLBACK_MAX_ZOOM.
  }, [width, height, maxZoom]);

  const zoomTo = useCallback(
    (feature: GeoJSON.Feature | undefined) => {
      const svg = svgRef.current;
      const behavior = zoomBehaviorRef.current;
      if (!svg || !behavior || !path) return;
      // Same maxZoom as the wheel/pinch scaleExtent above, so a click-zoom
      // never lands somewhere scrolling would then snap back from.
      const target = feature ? zoomTransformForBounds(path, feature, width, height, maxZoom) : zoomIdentity;
      tweenZoomTo(svg, behavior, target);
    },
    [path, width, height, maxZoom],
  );

  // Keeps the camera in sync with `selection`, regardless of *what*
  // changed it — a click, the breadcrumb, or (in controlled mode) the
  // consumer setting a new `selection` prop directly from outside, e.g.
  // from external dropdowns, which has no click of its own to trigger a
  // zoom otherwise. Whichever collection the deepest selected level's
  // feature lives in might still be loading; this re-fires once it
  // becomes ready, since that collection's state is a dependency.
  useEffect(() => {
    const feature = selection.ward
      ? findFeature(wardsState.status === "ready" ? wardsState.data : undefined, selection.ward)
      : selection.constituency
        ? findFeature(constituenciesState.status === "ready" ? constituenciesState.data : undefined, selection.constituency)
        : selection.county
          ? findFeature(countiesState.status === "ready" ? countiesState.data : undefined, selection.county)
          : undefined;
    zoomTo(feature);
  }, [selection.county, selection.constituency, selection.ward, countiesState, constituenciesState, wardsState, zoomTo]);

  // Whether clicking an area should also open a popup for it — only when
  // there's something to put in one, so a consumer who hasn't touched any
  // Phase 4 props sees exactly the Phase 3 click behavior (drill down,
  // nothing else).
  const popupsEnabled = Boolean(props.renderPopup) || Boolean(datasets && datasets.length > 0);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const closePopup = useCallback(() => setPopup(null), []);

  // Closes the popup on a click anywhere outside this component. A click
  // on an area (which opens/replaces the popup) is *inside* the
  // container, so `contains` correctly leaves it alone — this only fires
  // for clicks on the rest of the host page.
  const pointLayers = props.pointLayers;
  const [pointPopup, setPointPopup] = useState<PointPopupState | null>(null);
  const closePointPopup = useCallback(() => setPointPopup(null), []);
  // Visibility per layer is internal-only (no controlled equivalent to
  // `selection`/`activeDatasetId`) — a checkbox toggling a layer on/off is
  // squarely local UI state, not something a parent needs to drive.
  const [hiddenLayerIds, setHiddenLayerIds] = useState<Set<string>>(() => new Set());
  const toggleLayer = useCallback((id: string) => {
    setHiddenLayerIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  // A marker's own popup is separate from an area's (per PointLayer docs
  // above) — clicking one always opens it, no gating like `popupsEnabled`
  // above, since there's no pre-Phase-5 click behavior on markers to
  // preserve.
  const activatePoint = useCallback(
    (point: Point, layer: PointLayer) => {
      if (!projection) return;
      const projected = projection([point.lng, point.lat]);
      if (!projected) return;
      setPointPopup({ point, layer, x: projected[0], y: projected[1] });
    },
    [projection],
  );

  useEffect(() => {
    if (!popup && !pointPopup) return;
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closePopup();
        closePointPopup();
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [popup, pointPopup, closePopup, closePointPopup]);

  // A click always selects the clicked area at *its own* level, regardless
  // of which layer it's in or how faded it currently is — a sibling
  // constituency, a faded county, or another ward in the same constituency
  // are all just "select this area, drop anything below it, zoom to it
  // (via the selection-driven effect above)." With datasets/popups
  // configured, it also opens that area's popup.
  const selectArea = useCallback(
    (feature: GeoJSON.Feature, level: AreaLevel) => {
      const p = areaProps(feature);
      const next: Selection =
        level === "county"
          ? { county: p.code }
          : level === "constituency"
            ? { county: p.county_code, constituency: p.code }
            : { county: p.county_code, constituency: p.constituency_code, ward: p.code };
      setSelection(next);
      if (popupsEnabled && path) {
        const [cx, cy] = path.centroid(feature);
        setPopup({ area: toAreaFeature(feature, level), cx, cy });
      }
    },
    [setSelection, popupsEnabled, path],
  );
  const goToConstituency = useCallback(() => {
    if (!selection.county || !selection.constituency) return;
    setSelection({ county: selection.county, constituency: selection.constituency });
    closePopup();
  }, [setSelection, closePopup, selection.county, selection.constituency]);
  const goToCounty = useCallback(() => {
    if (!selection.county) return;
    setSelection({ county: selection.county });
    closePopup();
  }, [setSelection, closePopup, selection.county]);
  const goToCountry = useCallback(() => {
    setSelection({});
    closePopup();
  }, [setSelection, closePopup]);
  const goUp = useCallback(() => {
    if (selection.ward) goToConstituency();
    else if (selection.constituency) goToCounty();
    else if (selection.county) goToCountry();
  }, [selection.ward, selection.constituency, selection.county, goToConstituency, goToCounty, goToCountry]);

  const [hover, setHover] = useState<HoverInfo | null>(null);
  const handleHover = useCallback((name: string, clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setHover({ name, x: clientX - rect.left, y: clientY - rect.top });
  }, []);
  const handleLeave = useCallback(() => setHover(null), []);

  const countyName = findFeature(countiesState.status === "ready" ? countiesState.data : undefined, selection.county)
    ?.properties?.name as string | undefined;
  const constituencyName = findFeature(
    constituenciesState.status === "ready" ? constituenciesState.data : undefined,
    selection.constituency,
  )?.properties?.name as string | undefined;

  const popupValues = useMemo(
    () => (popup ? buildPopupValues(popup.area, datasets ?? []) : {}),
    [popup, datasets],
  );
  // Screen position each render, from the transform in effect right now —
  // this is what keeps the popup glued to its area through the zoom-in
  // tween and any further pan/zoom, see PopupState's cx/cy comment.
  const [popupScreenX, popupScreenY] = popup ? transform.apply([popup.cx, popup.cy]) : [0, 0];
  const [pointPopupScreenX, pointPopupScreenY] = pointPopup ? transform.apply([pointPopup.x, pointPopup.y]) : [0, 0];

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 300, ...props.style }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          // Escape closes the topmost thing first: a marker's popup, then
          // an area's, then (once neither is open) steps up a drill-down
          // level.
          if (pointPopup) closePointPopup();
          else if (popup) closePopup();
          else goUp();
        }
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "sans-serif",
          fontSize: 13,
        }}
      >
        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button type="button" onClick={goToCountry} style={breadcrumbButtonStyle(!selection.county)}>
            Kenya
          </button>
          {selection.county && (
            <>
              <span aria-hidden="true">›</span>
              <button
                type="button"
                onClick={goToCounty}
                style={breadcrumbButtonStyle(!selection.constituency)}
              >
                {countyName ?? selection.county}
              </button>
            </>
          )}
          {selection.constituency && (
            <>
              <span aria-hidden="true">›</span>
              <button
                type="button"
                onClick={goToConstituency}
                style={breadcrumbButtonStyle(!selection.ward)}
              >
                {constituencyName ?? selection.constituency}
              </button>
            </>
          )}
        </nav>
        {(selection.county || selection.constituency) && (
          <button type="button" onClick={goToCountry} style={resetButtonStyle}>
            Reset
          </button>
        )}
      </div>

      {props.showDatasetSwitcher && datasets && datasets.length > 0 && (
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
          <DatasetSwitcher
            datasets={datasets}
            activeDatasetId={activeDatasetId}
            currentLevel={currentLevel}
            onChange={setActiveDatasetId}
          />
        </div>
      )}
      {props.showLegend && activeDataset && (
        <div style={{ position: "absolute", bottom: 8, right: 8, zIndex: 1 }}>
          <Legend dataset={activeDataset} />
        </div>
      )}
      {props.showLayerToggles && pointLayers && pointLayers.length > 0 && (
        <div style={{ position: "absolute", bottom: 8, left: 8, zIndex: 1 }}>
          <PointLayerToggles layers={pointLayers} hiddenLayerIds={hiddenLayerIds} onToggle={toggleLayer} />
        </div>
      )}

      {countiesState.status === "loading" && <LayerMessage>Loading map…</LayerMessage>}
      {countiesState.status === "error" && (
        <LayerMessage>
          Failed to load county boundaries: {countiesState.error.message}
          <br />
          <button type="button" onClick={retryCounties} style={resetButtonStyle}>
            Retry
          </button>
        </LayerMessage>
      )}
      {selection.county && constituenciesState.status === "error" && (
        <LayerMessage>
          Failed to load constituency boundaries: {constituenciesState.error.message}
          <br />
          <button type="button" onClick={retryConstituencies} style={resetButtonStyle}>
            Retry
          </button>
        </LayerMessage>
      )}
      {selection.constituency && wardsState.status === "error" && (
        <LayerMessage>
          Failed to load ward boundaries: {wardsState.error.message}
          <br />
          <button type="button" onClick={retryWards} style={resetButtonStyle}>
            Retry
          </button>
        </LayerMessage>
      )}

      {path && (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Map of Kenya"
        >
          <style>{`
            .kenya-map-area {
              vector-effect: non-scaling-stroke;
            }
            .kenya-map-area:focus-visible {
              stroke: var(--kenya-map-focus-color, #2563eb);
              stroke-width: 3;
            }
          `}</style>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            onPointerDown={(event) => {
              dragStartRef.current = { x: event.clientX, y: event.clientY };
            }}
            onClick={(event) => {
              const start = dragStartRef.current;
              const moved = start ? Math.hypot(event.clientX - start.x, event.clientY - start.y) : 0;
              // Distinguish a genuine click on empty space from the mouseup
              // that ends a pan/zoom drag — both fire a click event here.
              if (moved < 4) {
                closePopup();
                closePointPopup();
                goUp();
              }
            }}
          />
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
            <AreaLayer
              features={countyFeatures}
              path={path}
              opacity={selection.county ? 0.25 : 1}
              focusable={!selection.county}
              getFill={activeDataset?.level === "county" && colorLookup ? colorLookup : undefined}
              onHover={handleHover}
              onLeave={handleLeave}
              onActivate={(feature) => selectArea(feature, "county")}
            />
            {selection.county && (
              <AreaLayer
                features={constituencyFeatures}
                path={path}
                opacity={selection.constituency ? 0.25 : 1}
                focusable={!selection.constituency}
                getFill={activeDataset?.level === "constituency" && colorLookup ? colorLookup : undefined}
                onHover={handleHover}
                onLeave={handleLeave}
                onActivate={(feature) => selectArea(feature, "constituency")}
              />
            )}
            {selection.constituency && (
              <AreaLayer
                features={wardFeatures}
                path={path}
                opacity={1}
                focusable={true}
                getFill={activeDataset?.level === "ward" && colorLookup ? colorLookup : undefined}
                onHover={handleHover}
                onLeave={handleLeave}
                onActivate={(feature) => selectArea(feature, "ward")}
              />
            )}
          </g>
          {pointLayers && pointLayers.length > 0 && projection && (
            <PointMarkers
              layers={pointLayers}
              hiddenLayerIds={hiddenLayerIds}
              projection={projection}
              transform={transform}
              onHover={handleHover}
              onLeave={handleLeave}
              onActivate={activatePoint}
            />
          )}
        </svg>
      )}

      {hover && (
        <div
          style={{
            position: "absolute",
            left: hover.x + 12,
            top: hover.y + 12,
            zIndex: 2,
            pointerEvents: "none",
            background: "var(--kenya-map-tooltip-bg, rgba(0,0,0,0.8))",
            color: "var(--kenya-map-tooltip-color, #fff)",
            padding: "4px 8px",
            borderRadius: 4,
            fontFamily: "sans-serif",
            fontSize: 12,
            whiteSpace: "nowrap",
          }}
        >
          {hover.name}
        </div>
      )}

      {popup && (
        <Popup x={popupScreenX} y={popupScreenY} onClose={closePopup}>
          {props.renderPopup ? (
            props.renderPopup(popup.area, popupValues)
          ) : (
            <DefaultPopupContent area={popup.area} values={popupValues} datasets={datasets ?? []} />
          )}
        </Popup>
      )}

      {pointPopup && (
        <Popup x={pointPopupScreenX} y={pointPopupScreenY} onClose={closePointPopup}>
          {props.renderPointPopup ? (
            props.renderPointPopup(pointPopup.point, pointPopup.layer)
          ) : (
            <DefaultPointPopupContent point={pointPopup.point} />
          )}
        </Popup>
      )}
    </div>
  );
}

function breadcrumbButtonStyle(isCurrent: boolean): CSSProperties {
  return {
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    color: isCurrent ? "inherit" : "var(--kenya-map-link, #2563eb)",
    fontWeight: isCurrent ? 600 : 400,
    cursor: isCurrent ? "default" : "pointer",
    textDecoration: isCurrent ? "none" : "underline",
  };
}

const resetButtonStyle: CSSProperties = {
  font: "inherit",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 4,
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  background: "var(--kenya-map-panel-bg, #fff)",
  cursor: "pointer",
};
