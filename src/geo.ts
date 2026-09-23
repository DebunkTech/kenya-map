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
  const boundsWidth = Math.max(x1 - x0, 1e-6);
  const boundsHeight = Math.max(y1 - y0, 1e-6);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const scale = Math.min(maxScale, 0.9 / Math.max(boundsWidth / width, boundsHeight / height));
  return new ZoomTransform(scale, width / 2 - scale * cx, height / 2 - scale * cy);
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
