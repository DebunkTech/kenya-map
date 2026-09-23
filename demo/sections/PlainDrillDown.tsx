import { KenyaMap } from "@debunktech/kenya-map";
import { DemoSection } from "../DemoSection";

/** No datasets, no points, no popups — just Phase 3's drill-down: click to zoom in, breadcrumb/Escape/Reset to step back up. Uncontrolled (the component owns its own selection state). */
export function PlainDrillDown() {
  return (
    <DemoSection
      title="Plain drill-down"
      description="No datasets or point layers configured — clicking an area only drills down and zooms, it doesn't open a popup. This is the whole map's behavior with zero extra props."
    >
      <KenyaMap boundariesBaseUrl="/data" />
    </DemoSection>
  );
}
