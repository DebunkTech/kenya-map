import { geoArea } from "d3-geo";

/**
 * mapshaper's shapefile -> GeoJSON conversion (at least in the version this
 * pipeline uses) does not flip Esri Shapefile's clockwise-exterior-ring
 * convention to match GeoJSON/RFC 7946's counter-clockwise convention. Every
 * feature we've inspected from all three source shapefiles comes out with
 * every ring wound the wrong way, which d3-geo reads as "this polygon is
 * the rest of the sphere minus Kenya" (geoArea ~= 4*PI instead of a tiny
 * number). That silently breaks every d3-geo spherical predicate
 * (geoContains, geoCentroid, ...) on the affected feature, so it has to be
 * fixed here rather than worked around per call site.
 *
 * A feature's total area can only exceed half the sphere (2*PI sr) if its
 * rings are wound backwards — no single Kenyan county/constituency/ward
 * comes close to that — so that's used as the signal to reverse every ring.
 */
export function fixRingWinding(feature) {
  if (geoArea(feature) <= 2 * Math.PI) {
    return feature;
  }
  const { geometry } = feature;
  const reverseRings = (rings) => rings.map((ring) => ring.slice().reverse());
  const coordinates =
    geometry.type === "Polygon"
      ? reverseRings(geometry.coordinates)
      : geometry.coordinates.map(reverseRings);
  return { ...feature, geometry: { ...geometry, coordinates } };
}
