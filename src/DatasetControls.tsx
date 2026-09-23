import type { CSSProperties } from "react";

import { defaultFormat, isNumericColors, type Dataset } from "./datasets";
import type { AreaLevel } from "./types";

const panelStyle: CSSProperties = {
  background: "var(--kenya-map-panel-bg, rgba(255,255,255,0.92))",
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  borderRadius: 6,
  padding: 8,
  fontFamily: "sans-serif",
  fontSize: 12,
};

/**
 * Lets the consumer pick which dataset colors the map. Every configured
 * dataset gets a button regardless of level — a dataset that doesn't
 * apply at the level currently on screen is still selectable (so picking
 * it ahead of drilling down works), just visibly marked as inactive here.
 */
export function DatasetSwitcher({
  datasets,
  activeDatasetId,
  currentLevel,
  onChange,
}: {
  datasets: Dataset[];
  activeDatasetId: string | undefined;
  currentLevel: AreaLevel;
  onChange: (id: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Dataset" style={{ ...panelStyle, display: "flex", flexDirection: "column", gap: 4 }}>
      {datasets.map((dataset) => {
        const applies = dataset.level === currentLevel;
        const active = dataset.id === activeDatasetId;
        return (
          <button
            key={dataset.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(dataset.id)}
            title={applies ? undefined : `Colors the map at ${dataset.level} level`}
            style={{
              font: "inherit",
              textAlign: "left",
              border: "none",
              borderRadius: 4,
              padding: "2px 6px",
              cursor: "pointer",
              background: active ? "var(--kenya-map-focus-color, #2563eb)" : "transparent",
              color: active ? "#fff" : "inherit",
              opacity: applies ? 1 : 0.6,
            }}
          >
            {dataset.label}
            {!applies && ` (${dataset.level})`}
          </button>
        );
      })}
    </div>
  );
}

/** Shows the active dataset's gradient (with its min/max) or category swatches. Always reflects `dataset`, regardless of which level is currently on screen. */
export function Legend({ dataset }: { dataset: Dataset }) {
  const format = dataset.format ?? defaultFormat;

  if (isNumericColors(dataset.colors)) {
    const nums = dataset.values.map((v) => v.value).filter((v): v is number => typeof v === "number");
    if (nums.length === 0) return null;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return (
      <div style={panelStyle}>
        <div style={{ marginBottom: 4, fontWeight: 600 }}>{dataset.label}</div>
        <div
          style={{
            width: 120,
            height: 10,
            borderRadius: 2,
            background: `linear-gradient(to right, ${dataset.colors.scale.join(",")})`,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <span>{format(min)}</span>
          <span>{format(max)}</span>
        </div>
      </div>
    );
  }

  const entries = Object.entries(dataset.colors.categories);
  return (
    <div style={panelStyle}>
      <div style={{ marginBottom: 4, fontWeight: 600 }}>{dataset.label}</div>
      {entries.map(([category, color]) => (
        <div key={category} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} aria-hidden="true" />
          <span>{category}</span>
        </div>
      ))}
    </div>
  );
}
