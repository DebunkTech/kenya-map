/** One point marker. `lat`/`lng` place it on the map; `category`, if set, is looked up in its layer's `categoryColors` to override the layer's default `color`. `data` is yours — never read by this package except by whatever `renderPointPopup` you supply. */
export interface Point {
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
export interface PointLayer {
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

export function colorForPoint(layer: PointLayer, point: Point): string {
  if (point.category) {
    const override = layer.categoryColors?.[point.category];
    if (override) return override;
  }
  return layer.color;
}
