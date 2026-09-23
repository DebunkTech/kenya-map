import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior } from "d3-zoom";
import type { GeoPath } from "d3-geo";

import { useTopoJson } from "./useTopoJson";
import { useMapMeta } from "./useMeta";
import { createPathGenerator, createProjection, maxZoomForBBox, tweenZoomTo, zoomTransformForBounds } from "./geo";
import type { AreaLevel, RawAreaProperties, Selection } from "./types";

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
  className?: string;
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

interface HoverInfo {
  name: string;
  x: number;
  y: number;
}

function AreaLayer({
  features,
  path,
  opacity,
  focusable,
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
            fill="var(--kenya-map-fill, #d4d4d8)"
            stroke="var(--kenya-map-stroke, #71717a)"
            strokeWidth={0.75}
            tabIndex={focusable ? 0 : -1}
            role="button"
            aria-label={properties.name}
            style={{ cursor: "pointer", outline: "none" }}
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

  // A click always selects the clicked area at *its own* level, regardless
  // of which layer it's in or how faded it currently is — a sibling
  // constituency, a faded county, or another ward in the same constituency
  // are all just "select this area, drop anything below it, zoom to it."
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
      zoomTo(feature);
    },
    [setSelection, zoomTo],
  );
  const goToConstituency = useCallback(() => {
    if (!selection.county || !selection.constituency) return;
    setSelection({ county: selection.county, constituency: selection.constituency });
    zoomTo(
      findFeature(
        constituenciesState.status === "ready" ? constituenciesState.data : undefined,
        selection.constituency,
      ),
    );
  }, [setSelection, zoomTo, selection.county, selection.constituency, constituenciesState]);
  const goToCounty = useCallback(() => {
    if (!selection.county) return;
    setSelection({ county: selection.county });
    zoomTo(findFeature(countiesState.status === "ready" ? countiesState.data : undefined, selection.county));
  }, [setSelection, zoomTo, selection.county, countiesState]);
  const goToCountry = useCallback(() => {
    setSelection({});
    zoomTo(undefined);
  }, [setSelection, zoomTo]);
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

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 300, ...props.style }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          goUp();
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
              if (moved < 4) goUp();
            }}
          />
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
            <AreaLayer
              features={countyFeatures}
              path={path}
              opacity={selection.county ? 0.25 : 1}
              focusable={!selection.county}
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
                onHover={handleHover}
                onLeave={handleLeave}
                onActivate={(feature) => selectArea(feature, "ward")}
              />
            )}
          </g>
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
  background: "var(--kenya-map-fill, #fff)",
  cursor: "pointer",
};
