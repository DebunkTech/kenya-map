import { PlainDrillDown } from "./sections/PlainDrillDown";
import { DatasetsDemo } from "./sections/DatasetsDemo";
import { CustomPopupDemo } from "./sections/CustomPopupDemo";
import { PointLayersDemo } from "./sections/PointLayersDemo";
import { ControlledDemo } from "./sections/ControlledDemo";

export function App() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 4 }}>@debunktech/kenya-map</h1>
      <p style={{ color: "#525252" }}>
        Live examples of every feature. Sample data is labeled per section — most of it is real (2022 IEBC
        registered-voter figures), a few bits (party results, point locations) are made up for illustration.
      </p>
      <PlainDrillDown />
      <DatasetsDemo />
      <CustomPopupDemo />
      <PointLayersDemo />
      <ControlledDemo />
    </div>
  );
}
