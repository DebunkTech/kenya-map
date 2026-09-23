import { geoMercator, geoPath, type GeoPath, type GeoProjection } from "d3-geo";
import { select } from "d3-selection";
import { zoomTransform, ZoomTransform, type ZoomBehavior } from "d3-zoom";

/** A stable, whole-country projection: built once from the counties layer, never re-fit per drill-down level, so zooming into an area is a view transform, not a re-projection. */
export function createProjection(
  countryFeatures: GeoJSON.FeatureCollection,
  width: number,
  height: number,
): GeoProjection {
  return geoMercator().fitSize([width, height], countryFeatures);
}

export function createPathGenerator(projection: GeoProjection): GeoPath {
  return geoPath(projection);
}

const FIT_PADDING = 0.9;

/** The scale needed to fit a screen-space bounding box into a `width` x `height` viewport, with a small margin. */
function fitScale(bounds: [[number, number], [number, number]], width: number, height: number): number {
  const [[x0, y0], [x1, y1]] = bounds;
  const boundsWidth = Math.max(x1 - x0, 1e-6);
  const boundsHeight = Math.max(y1 - y0, 1e-6);
  return FIT_PADDING / Math.max(boundsWidth / width, boundsHeight / height);
}

/** Computes the zoom transform that fits `feature`'s screen-space bounds (under the fixed projection/path) into a `width` x `height` viewport, with a small margin. */
export function zoomTransformForBounds(
  path: GeoPath,
  feature: GeoJSON.Feature,
  width: number,
  height: number,
  maxScale: number,
): ZoomTransform {
  const bounds = path.bounds(feature);
  const [[x0, y0], [x1, y1]] = bounds;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const scale = Math.min(maxScale, fitScale(bounds, width, height));
  return new ZoomTransform(scale, width / 2 - scale * cx, height / 2 - scale * cy);
}

/**
 * The zoom level at which a geographic bounding box (`[minLon, minLat,
 * maxLon, maxLat]`, e.g. the country's smallest ward — see data/meta.json)
 * would fill the viewport, under the current fixed projection. Used as the
 * map's max zoom, computed from the real data instead of a guessed
 * constant: too low and the smallest areas stay tiny even at max zoom, too
 * high and you can zoom in past every area into empty space.
 */
export function maxZoomForBBox(
  path: GeoPath,
  bbox: [number, number, number, number],
  width: number,
  height: number,
): number {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  // Ring order matters: this exact corner order is required for d3-geo to
  // read this as the small bbox it is. The seemingly-equivalent order
  // (min,min -> max,min -> max,max -> min,max) instead produces a polygon
  // d3-geo reads as covering the *entire sphere minus* this bbox (verified
  // empirically: geoArea ~= 4*PI sr instead of a tiny number) — the same
  // failure mode the data pipeline's winding bug produced, see
  // scripts/lib/geometry.mjs for the fuller writeup of why d3-geo is
  // sensitive to this.
  const polygon: GeoJSON.Feature = {
    type: "Feature",
    properties: null,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [minLon, minLat],
          [minLon, maxLat],
          [maxLon, maxLat],
          [maxLon, minLat],
          [minLon, minLat],
        ],
      ],
    },
  };
  return fitScale(path.bounds(polygon), width, height);
}

function easeCubicInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Animates an SVG's d3-zoom transform to `target` over `duration`ms, by
 * hand-interpolating x/y/k each animation frame (no d3-transition
 * dependency — this package keeps its d3 footprint to geo/zoom/scale).
 */
export function tweenZoomTo(
  svg: SVGSVGElement,
  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>,
  target: ZoomTransform,
  duration = 750,
): void {
  const selection = select(svg);
  const start = zoomTransform(svg);
  const startTime = performance.now();

  function step(now: number) {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = easeCubicInOut(t);
    const interpolated = new ZoomTransform(
      start.k + (target.k - start.k) * eased,
      start.x + (target.x - start.x) * eased,
      start.y + (target.y - start.y) * eased,
    );
    zoomBehavior.transform(selection, interpolated);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
