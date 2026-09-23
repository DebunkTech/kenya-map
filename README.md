# @debunktech/kenya-map

Interactive, boundaries-only drill-down map of Kenya for React: counties
(47) → constituencies (290) → wards (1,450). D3 + SVG, no basemap, no
tiles. Pass in your own data to color areas (choropleth), drop point
markers, and show popups on click — everything else (drill-down zoom,
pan, breadcrumb, keyboard navigation) is built in.

## Install

Installed straight from GitHub at a tagged version — no npm registry
package, no build step for you:

```bash
npm install github:DebunkTech/kenya-map#v0.1.0
```

`react` and `react-dom` (>=18) are peer dependencies; make sure your
project already has them.

## Quick start

```tsx
import { KenyaMap } from "@debunktech/kenya-map";

function App() {
  return (
    <div style={{ height: 600 }}>
      <KenyaMap />
    </div>
  );
}
```

That's it for a plain drill-down map — click a county to zoom into its
constituencies, click a constituency for its wards, use the breadcrumb or
Escape to step back up. Everything below is opt-in on top of this.

## Props reference

| Prop | Type | Description |
|---|---|---|
| `boundariesBaseUrl` | `string` | Where boundary TopoJSON files are fetched from. Defaults to a jsDelivr URL for this package's own `data/` folder — you only need this if you're self-hosting the data or pointing at a different version. |
| `selection` | `Selection` | Controlled drill-down state (`{ county?, constituency?, ward? }`). Omit for uncontrolled (the component manages its own selection). |
| `onSelect` | `(selection: Selection) => void` | Called whenever the selection changes — a click, the breadcrumb, the reset button, or Escape. Required to actually move `selection` forward in controlled mode. |
| `datasets` | `Dataset[]` | Any number of choropleth datasets. See [Datasets](#datasets) below. |
| `activeDatasetId` | `string` | Controlled: which dataset colors the map. Omit for uncontrolled (defaults to the first dataset). |
| `onDatasetChange` | `(id: string) => void` | Called when the active dataset changes (switcher click, or needed to move `activeDatasetId` forward in controlled mode). |
| `showDatasetSwitcher` | `boolean` | Shows a built-in control for picking the active dataset. |
| `showLegend` | `boolean` | Shows a built-in legend for the active dataset's gradient or categories. |
| `renderPopup` | `(area: AreaFeature, values) => ReactNode` | Customizes the popup that opens when an area is clicked. Omit for a sensible default (area name + every dataset's value). See [Popups](#popups). |
| `pointLayers` | `PointLayer[]` | Any number of point-marker layers, drawn on top of the areas. See [Point layers](#point-layers) below. |
| `showLayerToggles` | `boolean` | Shows checkboxes for hiding/showing each point layer. |
| `renderPointPopup` | `(point: Point, layer: PointLayer) => ReactNode` | Customizes the popup that opens when a marker is clicked. Omit for a default popup showing just the point's `label`. |
| `className` | `string` | Applied to the outer container. |
| `style` | `CSSProperties` | Applied to the outer container — set a height here (or on a parent) if you don't want the default `100%`. |

Every prop also has a TSDoc comment on `KenyaMapProps` itself, so your
editor's autocomplete shows the same information inline.

Clicking an area **always** both drills down and (if you've configured
`datasets` and/or `renderPopup`) opens that area's popup, at the same
time — there's no separate "just show a popup, don't navigate" click.
Clicking a point marker only ever opens its own popup; it never triggers
the area underneath it.

## Datasets

One dataset colors the map at a time; a dataset only takes effect while
the map is showing its own `level` (a county-level dataset colors nothing
once you've drilled into constituencies). Two color modes:

```tsx
<KenyaMap
  datasets={[
    {
      id: "turnout",
      label: "Voter turnout",
      level: "county",
      values: [
        { code: "047", value: 68.2 },
        { code: "001", value: 54.9 },
      ],
      colors: { scale: ["#fee8c8", "#e34a33"], noData: "#e5e5e5" },
      format: (v) => `${v}%`,
    },
    {
      id: "winner",
      label: "Winning party",
      level: "constituency",
      values: [{ code: "274", value: "UDA" }],
      colors: { categories: { ODM: "#f97316", UDA: "#facc15" }, noData: "#e5e5e5" },
    },
  ]}
  activeDatasetId="turnout"
  onDatasetChange={setActiveDatasetId}
  showDatasetSwitcher
  showLegend
/>
```

- **Numeric** (`colors.scale`, 2+ colors): areas are colored on a gradient
  between the dataset's own min and max value — there's no fixed 0–100
  assumption. More than 2 colors interpolate piecewise through all of
  them.
- **Categorical** (`colors.categories`): exact string match, e.g.
  `{ ODM: "#f97316" }`.
- Either way, an area with no matching `code` in `values` (or, for
  categorical data, a value not listed in `categories`) gets `noData`.
- `format` controls how a value is displayed (legend, popups). Defaults
  to `value.toLocaleString()` for numbers, the raw string otherwise.
- In dev builds, a console warning fires for any dataset value whose
  `code` doesn't match a known area — exact for county/constituency
  datasets, best-effort for ward-level ones (wards load one county at a
  time, so a code for a county you haven't drilled into yet may not be
  confirmed either way).

## Popups

With `datasets` and/or `renderPopup` configured, clicking an area opens a
popup anchored to it (and stays anchored through the zoom animation and
any further pan/zoom). Without `renderPopup`, the default popup shows the
area's name plus every configured dataset's label and value (or "No
data"):

```tsx
<KenyaMap
  datasets={datasets}
  renderPopup={(area, values) => (
    // values: { turnout: { value: 68.2, formatted: "68.2%" }, winner: undefined, ... }
    // — undefined where that dataset doesn't apply at this area's level
    // or has no entry for its code.
    <div>
      <strong>{area.name}</strong>
      <p>Turnout: {values.turnout?.formatted ?? "No data"}</p>
    </div>
  )}
/>
```

Popups close on their own × button, a click anywhere outside the map, a
click on empty map space (which also steps up a level), or Escape (which
closes an open popup on the first press, then steps up a level on the
next).

## Point layers

Independent of datasets/areas entirely — any number of layers, each
independently toggle-able, drawn on top of the colored areas:

```tsx
<KenyaMap
  pointLayers={[
    {
      id: "stories",
      label: "Story locations",
      color: "#2563eb",
      categoryColors: { water: "#0891b2", health: "#16a34a" },
      points: [
        {
          id: "s1",
          lat: -1.2921,
          lng: 36.8219,
          label: "Nairobi water story",
          category: "water",
          data: { url: "/stories/water" },
        },
      ],
    },
  ]}
  showLayerToggles
  renderPointPopup={(point) => <a href={point.data.url}>{point.label}</a>}
/>
```

Markers keep a constant on-screen size regardless of zoom level. A point
with a `category` listed in its layer's `categoryColors` uses that color
instead of the layer's default `color`. `data` is yours — this package
never reads it except by handing it back to `renderPointPopup`.

## Joining your data to areas, by code

Every area — county, constituency, ward — has a stable, zero-padded
string `code` (3 digits for counties/constituencies, 4 for wards), and
for constituencies/wards these are the **official IEBC codes**, so data
from other IEBC-coded sources joins directly. Your `datasets` and any
code you pass around should key off these codes, not names (names can
have spelling variants; codes don't).

[`data/codes.json`](data/codes.json) is a flat list of every area's
`code`, `name`, `level`, and parent codes (`county_code` on
constituencies, `county_code` + `constituency_code` on wards) — fetch or
import it **at data-prep time**, in your own tooling or app code, to look
up codes when building a `datasets` array or a picker UI (the demo's
["controlled mode" section](demo/sections/ControlledDemo.tsx) does
exactly this, fetching it to populate cascading county/constituency/ward
dropdowns). **`<KenyaMap />` itself never fetches this file** — it only
loads the TopoJSON boundary files it needs for whatever's currently on
screen.

See [`data/README.md`](data/README.md) for the full data pipeline
writeup, including the handful of wards that couldn't be matched to an
official code and why.

## Theming

No CSS file to import — style via CSS custom properties, on any ancestor
element (or `:root` for a global default):

| Property | Affects | Default |
|---|---|---|
| `--kenya-map-fill` | Default area fill (when no dataset colors it) | `#d4d4d8` |
| `--kenya-map-stroke` | Area/marker borders, panel borders, loading/error text | `#71717a` |
| `--kenya-map-focus-color` | Keyboard focus outline on areas/markers | `#2563eb` |
| `--kenya-map-link` | Breadcrumb link color | `#2563eb` |
| `--kenya-map-panel-bg` | Switcher/legend/layer-toggle panel background, and the reset/retry button background | `rgba(255,255,255,0.92)` (`#fff` for buttons) |
| `--kenya-map-tooltip-bg` | Hover tooltip background | `rgba(0,0,0,0.8)` |
| `--kenya-map-tooltip-color` | Hover tooltip text | `#fff` |
| `--kenya-map-popup-bg` | Area/point popup background | `#fff` |
| `--kenya-map-popup-color` | Area/point popup text | `inherit` |

```css
:root {
  --kenya-map-fill: #f3f4f6;
  --kenya-map-focus-color: #16a34a;
}
```

## Data attribution

This package's own code is MIT licensed — see [`LICENSE`](LICENSE). The
boundary data in `data/` is licensed **separately** by its original
publishers and is not MIT. Summary (full terms in
[`data/README.md`](data/README.md)):

- Ward geometry (the source of all three levels' shapes): **CC BY 4.0**,
  American Red Cross. Attribute as: *"American Red Cross, 'Administrative
  Wards in Kenya 1450', via HDX."*
- County/constituency names and codes: HDX "Other" license (legacy OCHA
  terms — non-commercial use, derivatives allowed with attribution).
  Attribute as: *"Independent Electoral and Boundaries Commission (IEBC),
  Kenya, via OCHA ROSEA / HDX."*
- Official ward codes/names, and the current spelling used for
  constituency/ward names: the 2022 IEBC "Registered Voters per County
  Assembly Ward" list — see [`data/reference/README.md`](data/reference/README.md).

If you use this package, you're also using this data, and its
license/attribution terms travel with it independently of this
package's MIT license.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to run the demo, rebuild
the boundary data, build the package, and cut a release.
