import type { CSSProperties } from "react";

import type { PointLayer } from "./points";

const panelStyle: CSSProperties = {
  background: "var(--kenya-map-panel-bg, rgba(255,255,255,0.92))",
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  borderRadius: 6,
  padding: 8,
  fontFamily: "sans-serif",
  fontSize: 12,
};

/** Checkboxes for showing/hiding each point layer — unlike the dataset switcher, this is a multi-select (any number of layers can be visible at once), so checkboxes rather than radio buttons. */
export function PointLayerToggles({
  layers,
  hiddenLayerIds,
  onToggle,
}: {
  layers: PointLayer[];
  hiddenLayerIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div style={{ ...panelStyle, display: "flex", flexDirection: "column", gap: 4 }}>
      {layers.map((layer) => (
        <label key={layer.id} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={!hiddenLayerIds.has(layer.id)}
            onChange={() => onToggle(layer.id)}
          />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: layer.color, flexShrink: 0 }} aria-hidden="true" />
          {layer.label}
        </label>
      ))}
    </div>
  );
}
