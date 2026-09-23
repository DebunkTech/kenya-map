import { geoCentroid, geoContains, geoDistance } from "d3-geo";

/**
 * Finds which of `parentFeatures` geometrically contains `childFeature`,
 * using the child's spherical centroid as the test point. Used to assign a
 * ward its constituency (the wards source has no constituency code of its
 * own — see data/README.md).
 *
 * A centroid can fall just outside its own (concave) polygon, so if no
 * parent claims it by containment, this falls back to the parent whose
 * centroid is nearest, and reports that it did so — the caller should log
 * these so they can be spot-checked, not just trusted silently.
 */
export function findContainingParent(childFeature, parentFeatures) {
  const point = geoCentroid(childFeature);

  const contained = parentFeatures.find((parent) => geoContains(parent, point));
  if (contained) {
    return { parent: contained, point, fallback: false };
  }

  let nearest = null;
  let nearestDistance = Infinity;
  for (const parent of parentFeatures) {
    const distance = geoDistance(point, geoCentroid(parent));
    if (distance < nearestDistance) {
      nearest = parent;
      nearestDistance = distance;
    }
  }
  return { parent: nearest, point, fallback: true };
}
