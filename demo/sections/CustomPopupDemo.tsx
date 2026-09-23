import { KenyaMap } from "@debunktech/kenya-map";
import { DemoSection } from "../DemoSection";
import { voterDatasets } from "../sampleData";

/** Same registered-voter dataset as the previous section, but with a custom `renderPopup` — a styled card instead of the default name+value-list layout, to show what replacing it looks like. `renderPopup` receives the clicked area and a `values` record (one entry per configured dataset, `undefined` where it doesn't apply), and returns whatever JSX you want. */
export function CustomPopupDemo() {
  return (
    <DemoSection
      title="Custom popup"
      description="Same county-level voter data, but renderPopup replaces the default name+value-list popup with a styled card."
    >
      <KenyaMap
        boundariesBaseUrl="/data"
        datasets={voterDatasets.filter((d) => d.level === "county")}
        renderPopup={(area, values) => {
          const voters = values["voters-county"];
          return (
            <div style={{ minWidth: 160 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{area.name}</div>
              <div style={{ fontSize: 11, color: "#737373", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {area.level}
              </div>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 700, color: "#1d4ed8" }}>
                {voters?.formatted ?? "—"}
              </div>
              <div style={{ fontSize: 12, color: "#525252" }}>registered voters (2022)</div>
            </div>
          );
        }}
      />
    </DemoSection>
  );
}
